const crypto = require('node:crypto');

const RANKS = '23456789TJQKA';
const SUITS = 'cdhs';
const HAND_NAMES = ['高牌', '一对', '两对', '三条', '顺子', '同花', '葫芦', '四条', '同花顺'];

function deck() { return [...RANKS].flatMap(r => [...SUITS].map(s => r + s)); }
function shuffle(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = crypto.randomInt(i + 1);
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}
function combinations(a, k) {
  const out = [];
  function walk(start, picked) {
    if (picked.length === k) return out.push(picked.slice());
    for (let i = start; i <= a.length - (k - picked.length); i++) walk(i + 1, [...picked, a[i]]);
  }
  walk(0, []); return out;
}
function rankFive(cards) {
  const vals = cards.map(c => RANKS.indexOf(c[0]) + 2).sort((a,b) => b-a);
  const counts = new Map(); vals.forEach(v => counts.set(v, (counts.get(v) || 0) + 1));
  const unique = [...counts.keys()].sort((a,b) => b-a);
  const flush = new Set(cards.map(c => c[1])).size === 1;
  let straight = 0;
  if (unique.length === 5) {
    if (unique.join(',') === '14,5,4,3,2') straight = 5;
    else if (unique[0] - unique[4] === 4) straight = unique[0];
  }
  const groups = [...counts].map(([v,n]) => [n,v]).sort((a,b) => b[0]-a[0] || b[1]-a[1]);
  if (flush && straight) return [8, straight];
  if (groups[0][0] === 4) return [7, groups[0][1], groups[1][1]];
  if (groups[0][0] === 3 && groups[1][0] === 2) return [6, groups[0][1], groups[1][1]];
  if (flush) return [5, ...vals];
  if (straight) return [4, straight];
  if (groups[0][0] === 3) return [3, groups[0][1], ...groups.filter(g=>g[0]===1).map(g=>g[1]).sort((a,b)=>b-a)];
  const pairs = groups.filter(g => g[0] === 2).map(g => g[1]).sort((a,b)=>b-a);
  if (pairs.length === 2) return [2, ...pairs, groups.find(g=>g[0]===1)[1]];
  if (pairs.length === 1) return [1, pairs[0], ...groups.filter(g=>g[0]===1).map(g=>g[1]).sort((a,b)=>b-a)];
  return [0, ...vals];
}
function compareRank(a,b) { for (let i=0;i<Math.max(a.length,b.length);i++) if ((a[i]||0)!==(b[i]||0)) return (a[i]||0)-(b[i]||0); return 0; }
function handRank(cards) { return combinations(cards,5).map(rankFive).sort(compareRank).at(-1); }

class PokerGame {
  constructor({smallBlind=10, bigBlind=20, initialChips=1000, blindIntervalMinutes=0}={}) {
    this.baseSmallBlind=Math.max(1,Number(smallBlind)||10);this.baseBigBlind=Math.max(this.baseSmallBlind*2,Number(bigBlind)||20);this.smallBlind=this.baseSmallBlind;this.bigBlind=this.baseBigBlind;this.blindIntervalMinutes=Math.max(0,Math.min(120,Number(blindIntervalMinutes)||0));this.startedAt=Date.now();this.blindLevel=0;this.initialChips=Math.max(this.bigBlind*20,Number(initialChips)||1000);this.players=[];this.dealer=-1;
    this.status='waiting'; this.handNo=0; this.log=[];this.history=[];this.seatsRandomized=false;this.seatCount=0;this.eliminated=[];
  }
  addPlayer({id,name,isBot=false,avatar=1}) {
    if (this.status !== 'waiting') throw new Error('牌局进行中，暂时不能加入');
    if (this.players.length >= 10) throw new Error('房间已满');
    if (this.players.some(p=>p.id===id)) return;
    const safeAvatar=Math.max(1,Math.min(6,Math.floor(Number(avatar)||1)));
    this.players.push({id,name:String(name||'玩家').slice(0,12),isBot,avatar:safeAvatar,chips:this.initialChips,hole:[],bet:0,totalBet:0,folded:false,allIn:false,acted:false,lastAction:null,connected:true});
  }
  startHand() {
    // 座位在本桌第一手即锁定。必须在移除零筹码玩家前补齐旧房间的座位资料，
    // 否则旧房间会把“剩余人数”误当成座位总数，造成淘汰后重新排位。
    if(!this.seatCount)this.seatCount=this.players.length;
    this.players.forEach((p,index)=>{if(!Number.isInteger(p.seatIndex))p.seatIndex=index});
    const live=this.players.filter(p=>p.chips>0);
    if (live.length<2) throw new Error('至少需要两名有筹码的玩家');
    const previousDealerId=this.players[this.dealer]?.id;
    const newlyEliminated=this.players.filter(p=>p.chips<=0);for(const p of newlyEliminated)if(!this.eliminated.some(x=>x.id===p.id))this.eliminated.push(p);
    this.players=this.players.filter(p=>p.chips>0);
    if(!this.seatsRandomized){shuffle(this.players);this.players.forEach((p,index)=>p.seatIndex=index);this.seatsRandomized=true;}
    else if(previousDealerId)this.dealer=this.players.findIndex(p=>p.id===previousDealerId);
    if(this.blindIntervalMinutes>0){this.blindLevel=Math.min(10,Math.floor((Date.now()-this.startedAt)/(this.blindIntervalMinutes*60000)));const multiplier=2**this.blindLevel;this.smallBlind=this.baseSmallBlind*multiplier;this.bigBlind=this.baseBigBlind*multiplier;}
    this.handStartChips=new Map(this.players.map(p=>[p.id,p.chips]));
    this.handNo++; this.dealer=(this.dealer+1)%this.players.length; this.status='playing'; this.street='preflop';
    this.board=[]; this.pot=0; this.currentBet=0; this.minRaise=this.bigBlind; this.deck=shuffle(deck()); this.log=[]; this.winners=[];
    for(const p of this.players) Object.assign(p,{hole:[this.deck.pop(),this.deck.pop()],bet:0,totalBet:0,folded:false,allIn:false,acted:false,lastAction:null});
    const sb=this.players.length===2?this.dealer:this.nextSeat(this.dealer), bb=this.nextSeat(sb); this.smallBlindSeat=sb; this.bigBlindSeat=bb;
    this.postBlind(sb,this.smallBlind,'小盲'); this.postBlind(bb,this.bigBlind,'大盲');
    this.currentBet=Math.max(...this.players.map(p=>p.bet)); this.turn=this.nextActive(bb); this.log.unshift(`第 ${this.handNo} 手牌开始`);
  }
  nextSeat(i){return (i+1)%this.players.length;}
  nextActive(i){ for(let n=1;n<=this.players.length;n++){const j=(i+n)%this.players.length,p=this.players[j];if(!p.folded&&!p.allIn&&p.chips>0)return j;} return -1; }
  postBlind(i,amount,label){const p=this.players[i],paid=Math.min(p.chips,amount);p.chips-=paid;p.bet+=paid;p.totalBet+=paid;if(!p.chips)p.allIn=true;p.lastAction=`${label} ${paid}${p.allIn?' · ALL IN':''}`;this.log.unshift(`${p.name} 投入${label} ${paid}`);}
  legal(playerId){const i=this.players.findIndex(p=>p.id===playerId);if(this.status!=='playing'||i!==this.turn)return null;const p=this.players[i],toCall=Math.max(0,this.currentBet-p.bet),opponents=this.players.filter((x,j)=>j!==i&&!x.folded),matchable=Math.max(0,...opponents.map(x=>x.bet+x.chips)),maxRaiseTo=Math.min(p.bet+p.chips,matchable),minRaiseTo=Math.min(maxRaiseTo,this.currentBet+this.minRaise);return {fold:toCall>0,check:toCall===0,call:toCall>0,callAmount:Math.min(toCall,p.chips),raise:maxRaiseTo>this.currentBet&&p.chips>toCall,minRaiseTo,maxRaiseTo};}
  action(playerId,type,amount=0){
    const i=this.players.findIndex(p=>p.id===playerId),p=this.players[i],legal=this.legal(playerId);if(!legal)throw new Error('现在还不能操作');
    const toCall=Math.max(0,this.currentBet-p.bet); let label='';
    if(type==='fold'){p.folded=true;label='弃牌';}
    else if(type==='check'&&toCall===0) label='过牌';
    else if(type==='call'&&toCall>0){const paid=Math.min(toCall,p.chips);this.pay(p,paid);label=`跟注 ${paid}`;}
    else if(type==='raise'&&legal.raise){let target=Math.floor(Number(amount));if(target<legal.minRaiseTo&&target!==legal.maxRaiseTo)throw new Error(`至少加注到 ${legal.minRaiseTo}`);target=Math.min(target,legal.maxRaiseTo);const old=this.currentBet;this.pay(p,target-p.bet);this.currentBet=p.bet;this.minRaise=Math.max(this.bigBlind,this.currentBet-old);this.players.forEach((x,j)=>{if(j!==i&&!x.folded&&!x.allIn)x.acted=false});label=`加注到 ${target}`;}
    else throw new Error('无效操作');
    if(p.allIn)label+=' · ALL IN';p.lastAction=label;p.acted=true; this.log.unshift(`${p.name} ${label}`); this.advance(i);
  }
  pay(p,n){n=Math.max(0,Math.min(n,p.chips));p.chips-=n;p.bet+=n;p.totalBet+=n;if(!p.chips)p.allIn=true;}
  advance(from){
    const contenders=this.players.filter(p=>!p.folded);if(contenders.length===1)return this.awardLast(contenders[0]);
    const active=contenders.filter(p=>!p.allIn);
    const roundDone=active.length===0||active.every(p=>p.acted&&p.bet===this.currentBet);
    if(roundDone)return this.nextStreet(); this.turn=this.nextActive(from);
  }
  nextStreet(){
    this.pot+=this.players.reduce((s,p)=>s+p.bet,0);this.players.forEach(p=>{p.bet=0;p.acted=false});this.currentBet=0;this.minRaise=this.bigBlind;
    if(this.street==='preflop'){this.street='flop';this.deck.pop();this.board.push(this.deck.pop(),this.deck.pop(),this.deck.pop());}
    else if(this.street==='flop'){this.street='turn';this.deck.pop();this.board.push(this.deck.pop());}
    else if(this.street==='turn'){this.street='river';this.deck.pop();this.board.push(this.deck.pop());}
    else return this.showdown();
    this.log.unshift({flop:'翻牌',turn:'转牌',river:'河牌'}[this.street]);
    const active=this.players.filter(p=>!p.folded&&!p.allIn);if(active.length<=1)return this.nextStreet();
    this.turn=this.nextActive(this.dealer);
  }
  awardLast(p){this.pot+=this.players.reduce((s,x)=>s+x.bet,0);this.players.forEach(x=>x.bet=0);p.chips+=this.pot;this.log.unshift(`${p.name} 赢得 ${this.pot}`);this.winners=[{id:p.id,amount:this.pot,name:p.name,hand:'其他玩家弃牌',pot:'底池'}];this.status='finished';this.turn=-1;this.recordHistory();}
  showdown(){
    const ranks=new Map(this.players.filter(p=>!p.folded).map(p=>[p.id,handRank([...p.hole,...this.board])]));
    const levels=[...new Set(this.players.map(p=>p.totalBet).filter(Boolean))].sort((a,b)=>a-b);let previous=0,potNo=0;this.winners=[];
    for(const level of levels){const participants=this.players.filter(p=>p.totalBet>=level),amount=(level-previous)*participants.length;previous=level;if(!amount)continue;const eligible=participants.filter(p=>!p.folded);if(!eligible.length)continue;const best=eligible.map(p=>ranks.get(p.id)).sort(compareRank).at(-1),won=eligible.filter(p=>compareRank(ranks.get(p.id),best)===0),share=Math.floor(amount/won.length);let odd=amount-share*won.length;const potName=potNo++===0?'主池':`边池 ${potNo-1}`;for(const p of won){const gain=share+(odd-->0?1:0),rank=ranks.get(p.id);p.chips+=gain;this.winners.push({id:p.id,name:p.name,amount:gain,hand:HAND_NAMES[rank[0]],handLevel:rank[0],pot:potName});}}
    this.log.unshift(this.winners.map(w=>`${w.name} 以${w.hand}赢得${w.pot} ${w.amount}`).join('，'));this.status='finished';this.turn=-1;this.recordHistory();
  }
  recordHistory(){const results=this.players.map(p=>({id:p.id,name:p.name,delta:p.chips-(this.handStartChips?.get(p.id)??p.chips)})),hands=this.players.filter(p=>!p.folded).map(p=>({id:p.id,name:p.name,hole:[...p.hole]}));this.history.unshift({handNo:this.handNo,smallBlind:this.smallBlind,bigBlind:this.bigBlind,board:[...(this.board||[])],hands,results,winners:this.winners.map(w=>({id:w.id,name:w.name,amount:w.amount,hand:w.hand,pot:w.pot}))});this.history=this.history.slice(0,5);}
  resetTournament(){const all=[...this.players,...this.eliminated],seen=new Set();this.players=all.filter(p=>!seen.has(p.id)&&seen.add(p.id));this.eliminated=[];for(const p of this.players)Object.assign(p,{chips:this.initialChips,hole:[],bet:0,totalBet:0,folded:false,allIn:false,acted:false,lastAction:null});this.dealer=-1;this.handNo=0;this.history=[];this.winners=[];this.board=[];this.pot=0;this.currentBet=0;this.smallBlind=this.baseSmallBlind;this.bigBlind=this.baseBigBlind;this.blindLevel=0;this.startedAt=Date.now();this.seatsRandomized=false;this.seatCount=0;this.status='waiting';}
  view(viewerId,room){
    const viewerIndex=this.players.findIndex(p=>p.id===viewerId),viewer=this.players[viewerIndex],reveal=this.status==='finished',seatCount=this.seatCount||this.players.length,viewerSeat=viewer?.seatIndex;
    const ordered=viewerIndex>=0?this.players.map((_,n)=>(viewerIndex+n)%this.players.length):this.players.map((_,n)=>n);
    const nextBlindAt=this.blindIntervalMinutes>0?this.startedAt+(this.blindLevel+1)*this.blindIntervalMinutes*60000:null;
    return {room,viewerId,status:this.status,handNo:this.handNo,street:this.street,board:this.board||[],pot:(this.pot||0)+this.players.reduce((s,p)=>s+p.bet,0),currentBet:this.currentBet||0,dealer:this.dealer,turn:this.turn,smallBlind:this.smallBlind,bigBlind:this.bigBlind,blindLevel:this.blindLevel,blindIntervalMinutes:this.blindIntervalMinutes,nextBlindAt,initialChips:this.initialChips,seatCount,players:ordered.map((i,displayIndex)=>{const p=this.players[i],showHole=reveal?!p.folded:p.id===viewerId,seatPosition=Number.isInteger(viewerSeat)&&Number.isInteger(p.seatIndex)?(p.seatIndex-viewerSeat+seatCount)%seatCount:(Number.isInteger(p.seatIndex)?p.seatIndex:displayIndex);return{id:p.id,name:p.name,isBot:p.isBot,avatar:p.avatar||1,chips:p.chips,bet:p.bet,lastAction:p.lastAction,folded:p.folded,allIn:p.allIn,connected:p.connected,seatPosition,isDealer:i===this.dealer,isSmallBlind:i===this.smallBlindSeat,isBigBlind:i===this.bigBlindSeat,isTurn:i===this.turn,hole:showHole?p.hole:p.hole.map(()=>null)}}),legal:viewer?this.legal(viewerId):null,winners:this.winners||[],history:this.history,log:this.log.slice(0,12)};
  }
}

module.exports={PokerGame,rankFive,handRank,compareRank};
