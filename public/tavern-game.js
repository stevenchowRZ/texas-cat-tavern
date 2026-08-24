/* 猫猫酒吧：与德州牌局隔离，只共享 catCoins 余额。 */
(()=>{
  const $=s=>document.querySelector(s);
  const KEY='moonTailTavernV4';

  const recipes=[
    {id:'gin-tonic',name:'Gin & Tonic',cn:'金汤力',level:1,base:'金酒',need:{gin:1,tonic:1,lime:1},price:62,art:0},
    {id:'mojito',name:'Mojito',cn:'莫吉托',level:2,base:'白朗姆',need:{rum:1,lime:1,mint:1,soda:1,syrup:1},price:72,art:1},
    {id:'daiquiri',name:'Daiquiri',cn:'黛绮莉',level:3,base:'白朗姆',need:{rum:1,lime:1,syrup:1},price:78,art:2},
    {id:'margarita',name:'Margarita',cn:'玛格丽特',level:4,base:'龙舌兰',need:{tequila:1,orange:1,lime:1,salt:1},price:86,art:3},
    {id:'whiskey-sour',name:'Whiskey Sour',cn:'威士忌酸',level:5,base:'波本威士忌',need:{bourbon:1,lemon:1,syrup:1,eggwhite:1},price:94,art:4},
    {id:'old-fashioned',name:'Old Fashioned',cn:'古典',level:6,base:'波本威士忌',need:{bourbon:1,syrup:1,bitters:1,orangepeel:1},price:102,art:5},
    {id:'negroni',name:'Negroni',cn:'尼格罗尼',level:7,base:'金酒',need:{gin:1,campari:1,vermouth:1,orangepeel:1},price:110,art:6},
    {id:'manhattan',name:'Manhattan',cn:'曼哈顿',level:8,base:'黑麦威士忌',need:{rye:1,vermouth:1,bitters:1,cherry:1},price:118,art:7},
    {id:'long-island-iced-tea',name:'Long Island Iced Tea',cn:'长岛冰茶',level:9,base:'综合基酒',need:{gin:1,rum:1,vodka:1,tequila:1,orange:1,lemon:1,syrup:1,cola:1},price:132,art:8},
    {id:'cosmopolitan',name:'Cosmopolitan',cn:'宇宙大都会',level:10,base:'柑橘伏特加',need:{vodka:1,orange:1,cranberry:1,lime:1},price:126,art:9},
    {id:'moscow-mule',name:'Moscow Mule',cn:'莫斯科骡子',level:11,base:'伏特加',need:{vodka:1,lime:1,gingerbeer:1,mint:1},price:128,art:10},
    {id:'bloody-mary',name:'Bloody Mary',cn:'血腥玛丽',level:12,base:'伏特加',need:{vodka:1,tomato:1,lemon:1,hotsauce:1,worcestershire:1,pepper:1},price:136,art:11},
    {id:'pina-colada',name:'Piña Colada',cn:'椰林飘香',level:13,base:'白朗姆',need:{rum:1,pineapplejuice:1,coconut:1,lime:1},price:142,art:12},
    {id:'espresso-martini',name:'Espresso Martini',cn:'浓缩咖啡马天尼',level:14,base:'伏特加',need:{vodka:1,coffee:1,liqueur:1,syrup:1},price:148,art:13},
    {id:'aperol-spritz',name:'Aperol Spritz',cn:'阿佩罗橙光',level:15,base:'开胃酒',need:{prosecco:1,aperol:1,soda:1,orangeslice:1},price:145,art:14},
    {id:'tequila-sunrise',name:'Tequila Sunrise',cn:'龙舌兰日出',level:16,base:'龙舌兰',need:{tequila:1,orangejuice:1,grenadine:1,orangeslice:1},price:150,art:15},
    {id:'blue-lagoon',name:'Blue Lagoon',cn:'蓝色泻湖',level:17,base:'伏特加',need:{vodka:1,bluecuracao:1,lemon:1,lemonsoda:1},price:156,art:16},
    {id:'blue-hawaiian',name:'Blue Hawaiian',cn:'蓝色夏威夷',level:18,base:'白朗姆',need:{rum:1,vodka:1,bluecuracao:1,pineapplejuice:1,coconut:1},price:164,art:17},
    {id:'swimming-pool',name:'Swimming Pool',cn:'游泳池',level:19,base:'伏特加',need:{vodka:1,rum:1,bluecuracao:1,pineapplejuice:1,coconut:1,cream:1},price:172,art:18},
    {id:'electric-lemonade',name:'Electric Lemonade',cn:'电光柠檬水',level:20,base:'伏特加',need:{vodka:1,bluecuracao:1,lemon:1,syrup:1,soda:1},price:168,art:19},
    {id:'blue-margarita',name:'Blue Margarita',cn:'蓝色玛格丽特',level:21,base:'龙舌兰',need:{tequila:1,bluecuracao:1,lime:1,salt:1},price:174,art:20},
    {id:'aqua-velva',name:'Aqua Velva',cn:'水天使',level:22,base:'综合基酒',need:{gin:1,vodka:1,bluecuracao:1,lemon:1,soda:1},price:178,art:21},
    {id:'blue-motorcycle',name:'Blue Motorcycle',cn:'蓝色摩托车',level:23,base:'综合基酒',need:{vodka:1,gin:1,rum:1,tequila:1,bluecuracao:1,lemon:1,syrup:1,lemonsoda:1},price:190,art:22},
    {id:'blue-monday',name:'Blue Monday',cn:'蓝色星期一',level:24,base:'伏特加',need:{vodka:1,bluecuracao:1,orange:1,orangepeel:1},price:185,art:23}
  ];

  const ingredients={
    gin:{name:'金酒',cost:20,art:0,group:'基酒'},rum:{name:'白朗姆',cost:19,art:1,group:'基酒'},vodka:{name:'伏特加',cost:19,art:2,group:'基酒'},bourbon:{name:'波本威士忌',cost:27,art:3,group:'基酒'},tequila:{name:'龙舌兰',cost:24,art:4,group:'基酒'},rye:{name:'黑麦威士忌',cost:28,art:5,group:'基酒'},
    orange:{name:'橙味利口酒',cost:18,art:7,group:'利口酒与苦味剂'},vermouth:{name:'甜味美思',cost:18,art:14,group:'利口酒与苦味剂'},campari:{name:'金巴利',cost:25,art:15,group:'利口酒与苦味剂'},liqueur:{name:'咖啡利口酒',cost:21,art:17,group:'利口酒与苦味剂'},bitters:{name:'芳香苦精',cost:12,art:18,group:'利口酒与苦味剂'},bluecuracao:{name:'蓝橙力娇酒',cost:22,art:16,group:'利口酒与苦味剂'},aperol:{name:'阿佩罗',cost:23,art:6,group:'利口酒与苦味剂'},
    tonic:{name:'汤力水',cost:8,art:8,group:'调和剂'},soda:{name:'苏打水',cost:7,art:9,group:'调和剂'},cola:{name:'可乐',cost:7,art:10,group:'调和剂'},gingerbeer:{name:'姜汁啤酒',cost:9,art:11,group:'调和剂'},lemonsoda:{name:'柠檬汽水',cost:8,art:12,group:'调和剂'},prosecco:{name:'普罗塞克',cost:22,art:13,group:'调和剂'},syrup:{name:'糖浆',cost:5,art:21,group:'调和剂'},coffee:{name:'浓缩咖啡',cost:10,art:29,group:'调和剂'},cranberry:{name:'蔓越莓汁',cost:9,art:23,group:'调和剂'},tomato:{name:'番茄汁',cost:8,art:24,group:'调和剂'},pineapplejuice:{name:'菠萝汁',cost:9,art:25,group:'调和剂'},orangejuice:{name:'橙汁',cost:8,art:26,group:'调和剂'},coconut:{name:'椰浆',cost:12,art:27,group:'调和剂'},cream:{name:'淡奶油',cost:11,art:28,group:'调和剂'},grenadine:{name:'红石榴糖浆',cost:8,art:22,group:'调和剂'},hotsauce:{name:'辣椒汁',cost:6,art:20,group:'调和剂'},worcestershire:{name:'伍斯特酱',cost:6,art:19,group:'调和剂'},
    lemon:{name:'柠檬',cost:6,art:32,group:'鲜果与香草'},lime:{name:'青柠',cost:6,art:35,group:'鲜果与香草'},mint:{name:'薄荷',cost:5,art:40,group:'鲜果与香草'},orangeslice:{name:'橙片',cost:5,art:38,group:'鲜果与香草'},orangepeel:{name:'橙皮',cost:4,art:39,group:'鲜果与香草'},cherry:{name:'酒渍樱桃',cost:7,art:44,group:'鲜果与香草'},eggwhite:{name:'蛋清',cost:5,art:30,group:'鲜果与香草'},salt:{name:'海盐',cost:3,art:31,group:'鲜果与香草'},pepper:{name:'盐与黑胡椒',cost:4,art:46,group:'鲜果与香草'}
  };
  const groupOrder=['基酒','利口酒与苦味剂','调和剂','鲜果与香草'];
  const stoolX=[8,20,32,44,56,68,80,92];
  const guestNames=['团子','麻薯','奶盖','芝麻','布丁','栗子','小满','可可','雪饼','米粒','桃酥','乌龙','柚子','豆包','月饼','橘糖'];
  const heartTalks=[
    {role:'bartender',guest:'明明很想他，却不敢发消息。',reply:'想念可以承认，但别把快乐全交给一条回复。'},
    {role:'server',guest:'我总担心让别人失望。',reply:'照顾别人前，也要给自己的感受留一张凳子。'},
    {role:'bartender',guest:'分开以后，还能重新开始吗？',reply:'先问问现在的你们，是否真的学会了好好相爱。'},
    {role:'server',guest:'喜欢一个人，为什么这么累？',reply:'好的喜欢会有心动，也应该让你感到安心。'},
    {role:'bartender',guest:'我好像总是不够好。',reply:'你不必完美，真诚地长成自己就已经很珍贵。'},
    {role:'server',guest:'朋友渐渐疏远，是我的错吗？',reply:'有些同行会走散，不代表一起走过的路是假的。'},
    {role:'bartender',guest:'要怎样才能放下过去？',reply:'不必催自己忘记，先把今天过得柔软一点。'},
    {role:'server',guest:'我不知道该不该表白。',reply:'如果答案能让你向前，就坦诚又尊重地说出来。'}
  ];
  const TIMELINE_KEY='louisDayTimelineV1';

  function loadTimeline(){
    try{
      const saved=JSON.parse(localStorage.getItem(TIMELINE_KEY)||'null');
      if(saved&&['day','night'].includes(saved.phase))return{day:Math.max(1,Number(saved.day)||1),phase:saved.phase,dayPoker:!!saved.dayPoker,skipped:!!saved.skipped};
      if(saved&&['morning','afternoon','night'].includes(saved.phase)){
        if(saved.phase==='morning')return{day:Math.max(1,Number(saved.day)||1),phase:'day',dayPoker:false,skipped:false};
        return{day:Math.max(1,Number(saved.day)||1),phase:'night',dayPoker:true,skipped:false};
      }
    }catch{}
    return{day:1,phase:'day',dayPoker:false,skipped:false};
  }

  let game=loadGame();
  let timeline=loadTimeline();
  let panelView=null;
  let settlement=null;
  let nightLedger={made:0,sales:0,revenue:0,tips:0,cost:0};
  let tickTimer=null,arrivalTimer=null,brewTimer=null,walkTimer=null,serviceTimer=null,autoTimer=null,chatTimer=null,chatClearTimer=null,glowTimer=null,timelineReturnTimer=null,bartenderSpeechTimer=null,bartenderSpeechClearTimer=null,serverSpeechTimer=null,serverSpeechClearTimer=null,phaseBannerTimer=null;
  let servingDrink=false;
  let soundContext=null;
  const BGM_MUTED_KEY='tavernBgmMutedV1',tavernBgm=new Audio('/assets/audio/tavern-bgm.mp3');
  tavernBgm.loop=true;tavernBgm.preload='auto';tavernBgm.volume=.2;
  let bgmUnlocked=false,bgmMuted=localStorage.getItem(BGM_MUTED_KEY)==='1',bgmFadeTimer=null;
  let chatState=null,chatIndex=0;
  let bartenderSpeech='',serverSpeech='',bartenderSpeechIndex=0,serverSpeechIndex=0,lastPhaseBanner=null;
  const staffLines={
    day:{bartender:['白天先把杯子擦亮，夜里才会闪闪发光。','我在检查今晚的材料，每一杯都要照真实配方。','菜单不用贪多，备得齐、做得稳才重要。'],server:['白天可以先去打一局德州。','右边的联机对战，随时可以约朋友。','今天也慢慢来，别把好运气催跑了。','我先熟悉一下吧台的位置。']},
    night:{bartender:['客人点什么，我就按订单做什么。','摇壶响起来，今晚正式开始了。','这杯完成了，记得趁香气还在时送到。','心事可以慢慢说，酒也要慢慢摇。'],server:['我来取酒，你安心调制。','同款鸡尾酒可以送给任何点了它的客人。','忙的时候也要记得听客人把话说完。','慢一点没关系，今晚还很长。','杯子端稳了，我这就送过去。']}
  };

  function initialState(){return{
    coins:Number(localStorage.getItem('catCoins')||480),
    stock:{gin:2,tonic:2,tequila:2,orange:2,lime:4,rum:0,mint:0,soda:0,campari:0,vermouth:0,bourbon:0,sugar:0,bitters:0,vodka:0,coffee:0,liqueur:0},
    menu:['gin-tonic'],served:0,night:false,time:30,queue:[],ready:null,brewing:null,carrying:null,servedTonight:0,serverX:28,autoServe:false
  }}
  function loadGame(){try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved)return normalize(saved)}catch{}return initialState()}
  function levelForServed(served){return Math.min(24,1+Math.floor((Number(served)||0)/3))}
  function normalize(saved){const base=initialState(),result={...base,...saved,stock:{...base.stock,...(saved.stock||{})},night:false,time:30,queue:[],ready:null,brewing:null,carrying:null,serverX:Number.isFinite(saved.serverX)?saved.serverX:28,autoServe:!!saved.autoServe};const savedLevel=levelForServed(result.served);result.menu=(result.menu||[]).filter(id=>recipes.some(recipe=>recipe.id===id&&recipe.level<=savedLevel));if(!result.menu.length)result.menu=['gin-tonic'];return result}
  function saveGame(){localStorage.setItem(KEY,JSON.stringify(game));localStorage.setItem('catCoins',String(game.coins))}
  function saveTimeline(){localStorage.setItem(TIMELINE_KEY,JSON.stringify(timeline))}
  function level(){return levelForServed(game.served)}
  function unlocked(recipe){return recipe.level<=level()}
  function purchasableIngredient(id){return recipes.some(recipe=>unlocked(recipe)&&id in recipe.need)}
  function recipeById(id){return recipes.find(r=>r.id===id)}
  function canMake(recipe){return recipe&&Object.entries(recipe.need).every(([id,count])=>(game.stock[id]||0)>=count)}
  function coin(value){return `${value} 猫猫币`}
  function coinMarkup(value){return `<span class="coin-inline"><i class="cat-coin-icon" aria-hidden="true"></i>${Number(value).toLocaleString()}</span>`}
  function recipeCost(recipe){return Object.entries(recipe.need).reduce((total,[id,count])=>total+(ingredients[id]?.cost||0)*count,0)}
  function notify(message){const toast=$('#toast');toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1600)}
  function showScreen(id){document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));$(id).classList.add('active')}

  function canPoker(){return !game.night&&timeline.phase==='day'}

  function renderTimeline(){
    const el=$('#dayTimeline');if(!el)return;
    const phases=[['day','白天','德州牌桌赛 / 可跳过'],['night','夜晚','鸡尾酒吧营业']];
    el.innerHTML=`<b>第 ${timeline.day} 天 · 路易的时间线</b><div>${phases.map(([id,label,task])=>{const done=id==='day'&&timeline.phase==='night';const doneText=timeline.skipped?'✓ 已跳过':'✓ 牌局完成';return `<i class="${timeline.phase===id?'active':''} ${done?'done':''}"><span>${label}</span><small>${done?doneText:task}</small></i>`}).join('<em>›</em>')}</div>`;
    const hint=$('#pokerDayHint');if(hint)hint.textContent=`第 ${timeline.day} 天 · 白天 · 赢光全桌筹码或输光筹码，也可以跳过`;
    $('#pokerNeon')?.classList.add('open');
    $('#friendNeon')?.classList.add('open');
  }

  function enterRandomPoker(){
    game.serverX=88;paintServer();renderTimeline();
    if(window.startRandomSoloPoker)window.startRandomSoloPoker();else showScreen('#home');
  }

  function enterFriendPoker(){
    if(window.openFriendPokerSetup)window.openFriendPokerSetup();else showScreen('#home');
  }

  function skipDay(){
    if(!canPoker())return;
    timeline.phase='night';timeline.dayPoker=false;timeline.skipped=true;saveTimeline();game.serverX=32;notify('已跳过白天 · 夜晚酒吧营业已解锁');renderAll();
  }

  function finishPokerStage(event){
    if(!canPoker())return;
    timeline.dayPoker=true;timeline.skipped=false;timeline.phase='night';saveTimeline();renderTimeline();notify(event?.detail?.outcome==='win'?'路易赢下整桌 · 夜晚酒吧营业已解锁':'路易筹码归零 · 夜晚酒吧营业已解锁');
    clearTimeout(timelineReturnTimer);timelineReturnTimer=setTimeout(()=>{if(window.leavePokerForTimeline)window.leavePokerForTimeline();else{showScreen('#tavern');game.serverX=32;renderAll()}},2800);
  }

  function finishFreePoker(){
    notify('本局德州扑克结束 · 返回猫猫酒馆');
    clearTimeout(timelineReturnTimer);timelineReturnTimer=setTimeout(()=>{if(window.leavePokerForTimeline)window.leavePokerForTimeline();else{showScreen('#tavern');game.serverX=32;renderAll()}},2200);
  }

  function startNextDay(){timeline={day:timeline.day+1,phase:'day',dayPoker:false,skipped:false};saveTimeline();game.serverX=28}

  function unlockSound(){
    const AudioEngine=window.AudioContext||window.webkitAudioContext;
    if(!AudioEngine)return null;
    if(!soundContext)soundContext=new AudioEngine();
    if(soundContext.state==='suspended')soundContext.resume().catch(()=>{});
    return soundContext;
  }

  function updateMusicControl(){
    const button=$('#tavernMusic');if(!button)return;
    button.textContent=bgmMuted?'♪×':'♫';button.classList.toggle('muted',bgmMuted);button.setAttribute('aria-pressed',String(!bgmMuted));button.title=`Chasing What's Gone — Loom Room · ${bgmMuted?'已静音':'播放中'}`;
  }

  function fadeBgm(target,pauseAfter=false){
    clearInterval(bgmFadeTimer);
    const begin=()=>{const start=tavernBgm.volume,steps=12;let step=0;bgmFadeTimer=setInterval(()=>{step++;tavernBgm.volume=Math.max(0,Math.min(1,start+(target-start)*step/steps));if(step>=steps){clearInterval(bgmFadeTimer);bgmFadeTimer=null;if(pauseAfter)tavernBgm.pause()}},40)};
    if(target>0&&tavernBgm.paused){tavernBgm.volume=0;tavernBgm.play().then(begin).catch(()=>{})}else if(!tavernBgm.paused)begin();
  }

  function syncTavernBgm(){
    const shouldPlay=bgmUnlocked&&!bgmMuted&&!document.hidden&&$('#tavern')?.classList.contains('active');
    if(shouldPlay)fadeBgm(.2);else if(!tavernBgm.paused)fadeBgm(0,true);
    updateMusicControl();
  }

  function unlockTavernBgm(){if(!bgmUnlocked)bgmUnlocked=true;syncTavernBgm()}
  function toggleTavernBgm(){bgmMuted=!bgmMuted;if(!bgmMuted)bgmUnlocked=true;localStorage.setItem(BGM_MUTED_KEY,bgmMuted?'1':'0');syncTavernBgm()}

  function withSound(callback){
    const context=unlockSound();
    if(!context)return;
    if(context.state==='running'){callback(context);return}
    context.resume().then(()=>callback(context)).catch(()=>{});
  }

  function playButtonSound(){
    withSound(context=>{
      const now=context.currentTime;
      [720,340].forEach((frequency,index)=>{
        const oscillator=context.createOscillator(),gain=context.createGain();
        oscillator.type=index?'triangle':'sine';oscillator.frequency.setValueAtTime(frequency,now);oscillator.frequency.exponentialRampToValueAtTime(index?120:210,now+.085);
        gain.gain.setValueAtTime(index ? .012 : .026,now);gain.gain.exponentialRampToValueAtTime(.0001,now+.09);
        oscillator.connect(gain);gain.connect(context.destination);oscillator.start(now);oscillator.stop(now+.1);
      });
    });
  }

  function playReadySound(){
    withSound(context=>{
      const now=context.currentTime;
      [784,988,1175,1568].forEach((frequency,index)=>{
        const oscillator=context.createOscillator(),gain=context.createGain(),start=now+index*.07;
        oscillator.type=index%2?'triangle':'sine';oscillator.frequency.setValueAtTime(frequency,start);
        gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(.052,start+.018);gain.gain.exponentialRampToValueAtTime(.0001,start+.62);
        oscillator.connect(gain);gain.connect(context.destination);oscillator.start(start);oscillator.stop(start+.65);
      });
    });
  }

  function playRecipeUnlockSound(){
    withSound(context=>{
      const now=context.currentTime;
      [523,659,784,1047,1319].forEach((frequency,index)=>{
        const oscillator=context.createOscillator(),gain=context.createGain(),start=now+index*.09;
        oscillator.type=index===4?'triangle':'sine';oscillator.frequency.setValueAtTime(frequency,start);
        gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(.075,start+.02);gain.gain.exponentialRampToValueAtTime(.0001,start+.48);
        oscillator.connect(gain);gain.connect(context.destination);oscillator.start(start);oscillator.stop(start+.52);
      });
    });
  }

  function celebrateRecipeUnlock(recipe,currentLevel){
    const popup=$('#recipeCelebration');
    if(!popup||!recipe)return;
    popup.innerHTML=`<div class="recipe-celebration-card" role="status"><i class="celebration-burst" aria-hidden="true">✦ ✦ ✦</i><span>LEVEL UP · Lv.${currentLevel}</span><strong>新配方研究成功！</strong>${sprite('cocktail',recipe.art,'celebration-drink')}<b>${recipe.cn}</b><small>${recipe.name} · 新材料现已可采购</small><button type="button">太棒了！</button></div>`;
    popup.hidden=false;popup.classList.remove('show');void popup.offsetWidth;popup.classList.add('show');
    playRecipeUnlockSound();
    const close=()=>{popup.classList.remove('show');setTimeout(()=>{popup.hidden=true;popup.innerHTML=''},180)};
    popup.querySelector('button').onclick=close;
    clearTimeout(popup._timer);popup._timer=setTimeout(close,4800);
  }

  function celebrateDrinkReady(){
    const bartender=$('#bartenderCat');
    bartender.classList.remove('drink-ready-glow');void bartender.offsetWidth;bartender.classList.add('drink-ready-glow');
    clearTimeout(glowTimer);glowTimer=setTimeout(()=>bartender.classList.remove('drink-ready-glow'),900);
    playReadySound();
  }

  function sprite(kind,index,className=''){
    const rows=kind==='cocktail'?3:6,col=index%8,row=Math.floor(index/8);
    return `<i class="atlas-sprite ${kind} ${className}" style="--atlas-x:${col/7*100}%;--atlas-y:${row/(rows-1)*100}%"></i>`
  }
  function pixelCat(tone='gray',role='guest'){
    const guestArt={gray:'/assets/character-flower-v2.png',cream:'/assets/character-adventure-v2.png',orange:'/assets/character-musician-v2.png',black:'/assets/character-redhood-v2.png',tabby:'/assets/character-formal-v2.png',pink:'/assets/character-pink-bow-v3.png'};
    const art=role==='bartender'?'/assets/bartender-shaker-1s-loop.gif':role==='server'?'/assets/character-formal-v2.png':guestArt[tone];
    return `<div class="pixel-cat image-character tone-${tone} role-${role}" style="--character-image:url('${art}')" aria-hidden="true"><i class="character-shadow"></i></div>`
  }

  function announcePhase(phase){
    if(lastPhaseBanner===phase)return;
    lastPhaseBanner=phase;
    const banner=$('#phaseBanner');if(!banner)return;
    clearTimeout(phaseBannerTimer);banner.textContent=phase==='day'?'白天':'夜晚';banner.className=`phase-banner ${phase}`;void banner.offsetWidth;banner.classList.add('show');
    phaseBannerTimer=setTimeout(()=>banner.classList.remove('show'),2400);
  }

  function renderHud(){
    $('#tavernCoins').textContent=game.coins.toLocaleString();
    $('#tavernLevel').textContent=level();
    renderTimeline();
    const visualPhase=timeline.phase==='day'&&!game.night?'day':'night';$('.tavern-scene').classList.toggle('daytime',visualPhase==='day');announcePhase(visualPhase);
    const phaseLabel=timeline.phase==='day'?'白天':'夜晚';$('#tavernBack').textContent=phaseLabel;
    if(!game.night){const phaseText={day:'白天 · 德州时间',night:'夜晚 21:30 · 开业准备'}[timeline.phase];$('#nightStatus').textContent=`第 ${timeline.day} 天 · ${phaseText}`;return}
    const passed=30-game.time,hour=(22+Math.floor(passed/7.5))%24,minute=Math.floor((passed%7.5)/7.5*60);
    $('#nightStatus').textContent=`${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')} · 剩余 ${game.time}s`;
  }

  function renderCharacters(){
    $('#bartenderCat').innerHTML=pixelCat('silver','bartender')+(bartenderSpeech?`<i class="cloud-dialog staff-dialog">${bartenderSpeech}</i>`:'');
    $('#serverCat').innerHTML=pixelCat('louis','server')+(serverSpeech?`<i class="cloud-dialog staff-dialog">${serverSpeech}</i>`:'');
    const line=$('#guestLine');
    line.innerHTML=stoolX.map((x,seat)=>{
      const order=game.queue.find(item=>item.seat===seat),talking=order&&chatState?.guestId===order.id,walkDistance=(8-seat)*11;
      const walkMs=order?.walkMs||Math.max(2600,Math.round(walkDistance/18*1000));
      const walkElapsed=order?Math.min(walkMs,Math.max(0,Date.now()-(order.walkStartedAt||Date.now()))):0;
      const sitElapsed=order?.sitting?Math.min(960,Math.max(0,Date.now()-(order.sitStartedAt||Date.now()))):0;
      const guestLayer=20+Math.max(0,order?game.queue.indexOf(order):0);
      const status=order?.recipe?.cn||(order?.fresh?order.name:order?.seated?'正在看菜单…':'');
      const statusClass=order?.recipe?'':order?.fresh?'guest-name':'choosing';
      return `<div class="bar-seat seat-${seat+1}" style="--stool-x:${x}%"><i class="pixel-stool"></i>${order?`<div class="guest-seat ${order.fresh?'arriving':''} ${order.sitting?'sitting':''} ${order.seated?'seated':''}" style="--guest-walk:${walkDistance}cqw;--guest-walk-duration:${walkMs}ms;--guest-walk-delay:-${walkElapsed}ms;--guest-sit-delay:-${sitElapsed}ms;--guest-layer:${guestLayer}" data-order="${order.id}">${talking?`<i class="cloud-dialog guest-dialog">${chatState.guest}</i>`:''}${order.recipe?sprite('cocktail',order.recipe.art,'order-drink'):''}${pixelCat(order.tone,'guest')}${status?`<small class="${statusClass}">${status}</small>`:''}</div>`:''}</div>`
    }).join('');
    $('#barAction').classList.toggle('speech-hidden',!!bartenderSpeech);
    $('#bartenderCat').querySelector('.pixel-cat')?.classList.toggle('mixing',!!game.brewing);
    paintServer();
  }

  function speechPeriod(role){return role==='bartender'?20000:8000}
  function showStaffSpeech(role){
    const phase=timeline.phase==='day'&&!game.night?'day':'night',lines=staffLines[phase][role],index=role==='bartender'?bartenderSpeechIndex++:serverSpeechIndex++,line=lines[index%lines.length];
    if(role==='bartender'){serverSpeech='';clearTimeout(serverSpeechClearTimer);bartenderSpeech=line;clearTimeout(bartenderSpeechClearTimer);bartenderSpeechClearTimer=setTimeout(()=>{bartenderSpeech='';renderCharacters()},5000)}else{bartenderSpeech='';clearTimeout(bartenderSpeechClearTimer);serverSpeech=line;clearTimeout(serverSpeechClearTimer);serverSpeechClearTimer=setTimeout(()=>{serverSpeech='';renderCharacters()},5000)}
    renderCharacters();
  }

  function startStaffSpeech(){
    clearInterval(bartenderSpeechTimer);clearInterval(serverSpeechTimer);clearTimeout(bartenderSpeechClearTimer);clearTimeout(serverSpeechClearTimer);bartenderSpeech='';serverSpeech='';
    showStaffSpeech('bartender');
    bartenderSpeechTimer=setInterval(()=>showStaffSpeech('bartender'),speechPeriod('bartender'));
    serverSpeechTimer=setInterval(()=>showStaffSpeech('server'),speechPeriod('server'));
  }

  function showNextChat(){
    if(!game.night)return;
    const guests=game.queue.filter(order=>order.seated&&order.recipe&&order.chatEligible&&!order.hasSpoken);
    if(!guests.length)return;
    const talk=heartTalks[chatIndex%heartTalks.length],guest=guests[chatIndex%guests.length];
    guest.hasSpoken=true;chatIndex++;chatState={...talk,guestId:guest.id};renderCharacters();renderWorkstation();
    clearTimeout(chatClearTimer);chatClearTimer=setTimeout(()=>{chatState=null;renderCharacters();renderWorkstation()},3000);
  }

  function startChatLoop(){
    clearInterval(chatTimer);clearTimeout(chatClearTimer);chatState=null;
    if(game.night)chatTimer=setInterval(showNextChat,9000);
  }

  function renderWorkstation(){
    const bartender=$('#bartenderCat').querySelector('.pixel-cat');
    bartender?.classList.toggle('mixing',!!game.brewing);
    $('#barAction').textContent=game.brewing?`正在摇制 ${game.brewing.cn}`:game.ready?`${game.ready.cn} 已出杯，等你来取`:(game.night?'等待下一张订单':'');
    $('#readyDrink').textContent=game.ready?`${game.ready.cn} · 已出杯`:'酒保工作台';
    $('#mixingGlass').innerHTML=game.ready?sprite('cocktail',game.ready.art,'counter-drink'):'';
  }

  function renderPrep(){
    const content=$('#tavernContent');
    if(game.night){
      content.innerHTML=`<div class="service-dashboard"><div><b>今晚已送出 ${game.servedTonight} 杯</b><small>← → 移动；空格取酒。可把酒送给任意点了同款的客人。</small></div><div class="service-actions"><button id="autoServe" class="${game.autoServe?'active':''}">${game.autoServe?'自动托管中':'开启自动托管'}</button><button id="closeNight">提前打烊</button></div></div>`;
      $('#autoServe').onclick=toggleAutoServe;
      $('#closeNight').onclick=endNight;
      return;
    }
    if(timeline.phase!=='night'){
      content.innerHTML=`<div class="day-objective"><div><b>白天 · 完成一场德州牌桌赛，或直接跳过</b><small>持续进行多手牌，直到路易赢光全桌筹码或输光筹码；《联机对战》不限局数</small></div><div class="day-objective-actions"><button id="skipDay">跳过白天</button></div></div>`;
      $('#skipDay').onclick=skipDay;
      return;
    }
    const menuCards=recipes.filter(unlocked).map(recipe=>{
      const chosen=game.menu.includes(recipe.id),available=canMake(recipe);
      return `<label class="menu-card ${chosen?'chosen':''} ${available?'':'short'}"><input type="checkbox" data-menu="${recipe.id}" ${chosen?'checked':''} ${available?'':'disabled'}>${sprite('cocktail',recipe.art)}<span><b>${recipe.cn}</b><small>${recipe.name} · ${recipe.base}</small><em>售价 ${coin(recipe.price)}</em></span></label>`
    }).join('');
    const stockGroups=groupOrder.map(group=>{
      const buttons=Object.entries(ingredients).filter(([id,item])=>item.group===group&&purchasableIngredient(id)).map(([id,item])=>`<button class="stock-item" data-buy="${id}">${sprite('ingredient',item.art)}<span><b>${item.name}</b><small>库存 ${game.stock[id]||0}</small><em>+1 · ${coin(item.cost)}</em></span></button>`).join('');
      return `<section class="stock-group"><h3>${group}</h3><div>${buttons}</div></section>`
    }).join('');
    const researchCards=recipes.map(recipe=>{const learned=unlocked(recipe),formula=Object.entries(recipe.need).map(([id,count])=>`${ingredients[id].name}${count>1?` ×${count}`:''}`).join(' + ');return `<article class="research-card ${learned?'learned':'locked'}">${sprite('cocktail',recipe.art)}<div><b>${recipe.cn}</b><small>${recipe.name} · ${recipe.base}</small><p>${formula}</p><em>${learned?'✓ 已学会':`Lv.${recipe.level} 解锁`}</em></div></article>`}).join('');
    const panelTitles={menu:['今晚菜单','选择有足够材料的鸡尾酒'],stock:['备货间','仅可采购已研究配方所需的基酒与材料'],research:['配方研究','共 24 个等级；每次升级学会一款鸡尾酒']};
    const panelBody=panelView==='menu'?`<div class="menu-grid">${menuCards}</div>`:panelView==='stock'?`<div class="stock-groups">${stockGroups}</div>`:`<div class="recipe-research-grid">${researchCards}</div>`;
    const modal=panelView?`<div class="prep-modal" role="dialog" aria-modal="true"><section><header><div><b>${panelTitles[panelView][0]}</b><small>${panelTitles[panelView][1]}</small></div><button id="modalClose" aria-label="关闭">×</button></header>${panelBody}</section></div>`:'';
    const settlementModal=settlement?`<div class="prep-modal settlement-modal" role="dialog" aria-modal="true"><section><header><div><b>02:00 · 今晚营业结算</b><small>材料成本按本晚实际耗用的采购价计算</small></div><button id="settlementClose" aria-label="关闭结算">×</button></header><div class="settlement-grid"><div><small>售出鸡尾酒</small><b>${settlement.sales} 杯</b></div><div><small>销售收入</small><b>${coinMarkup(settlement.revenue)}</b></div><div><small>客人小费</small><b>${coinMarkup(settlement.tips)}</b></div><div><small>材料成本</small><b class="cost">− ${coinMarkup(settlement.cost)}</b></div><div><small>未售出耗损</small><b>${settlement.waste} 杯</b></div><div class="profit"><small>今晚净盈利</small><b class="${settlement.profit>=0?'positive':'negative'}">${settlement.profit>=0?'+':'−'} ${coinMarkup(Math.abs(settlement.profit))}</b></div></div><footer><span>毛利率 ${settlement.margin}%</span><span>当前余额 ${coinMarkup(game.coins)}</span></footer><button id="settlementConfirm" class="settlement-confirm">收下账本</button></section></div>`:'';
    content.innerHTML=`<div class="prep-toolbar"><button id="menuToggle" class="${panelView==='menu'?'active':''}">今晚菜单</button><button id="stockToggle" class="${panelView==='stock'?'active':''}">备货间</button><button id="researchToggle" class="${panelView==='research'?'active':''}">配方研究</button><button id="openNight" class="open-night" ${game.menu.length?'':'disabled'}>22:00 开始营业</button></div>${modal}${settlementModal}`;
    $('#menuToggle').onclick=()=>{panelView=panelView==='menu'?null:'menu';renderPrep()};
    $('#stockToggle').onclick=()=>{panelView=panelView==='stock'?null:'stock';renderPrep()};
    $('#researchToggle').onclick=()=>{panelView=panelView==='research'?null:'research';renderPrep()};
    $('#openNight').onclick=startNight;
    if(panelView){$('#modalClose').onclick=()=>{panelView=null;renderPrep()};$('.prep-modal').onclick=event=>{if(event.target.classList.contains('prep-modal')){panelView=null;renderPrep()}}}
    if(settlement){const closeSettlement=()=>{settlement=null;startNextDay();renderAll()};$('#settlementClose').onclick=closeSettlement;$('#settlementConfirm').onclick=closeSettlement;$('.settlement-modal').onclick=event=>{if(event.target.classList.contains('settlement-modal'))closeSettlement()}}
    content.querySelectorAll('[data-menu]').forEach(input=>input.onchange=()=>{game.menu=input.checked?[...new Set([...game.menu,input.dataset.menu])]:game.menu.filter(id=>id!==input.dataset.menu);saveGame();renderPrep()});
    content.querySelectorAll('[data-buy]').forEach(button=>button.onclick=()=>buyIngredient(button.dataset.buy));
  }

  function renderAll(){renderHud();renderCharacters();renderWorkstation();renderPrep()}

  function buyIngredient(id){
    const item=ingredients[id];
    if(!item||!purchasableIngredient(id))return notify('先研究对应配方，才能采购这项材料');
    if(game.coins<item.cost)return notify('猫猫币不足');
    game.coins-=item.cost;game.stock[id]=(game.stock[id]||0)+1;saveGame();renderHud();renderPrep();
  }

  function addGuest(){
    if(!game.night||game.queue.length>=8)return;
    const choices=game.menu.map(recipeById).filter(Boolean);
    if(!choices.length)return;
    const occupied=new Set(game.queue.map(order=>order.seat));
    const freeSeats=stoolX.map((_,index)=>index).filter(index=>!occupied.has(index));
    if(!freeSeats.length)return;
    const seat=freeSeats[Math.floor(Math.random()*freeSeats.length)];
    const id=`g${Date.now()}${Math.random()}`;
    const guestTones=['gray','cream','orange','black','tabby','pink'];
    const availableNames=guestNames.filter(name=>!game.queue.some(order=>order.name===name)),name=(availableNames.length?availableNames:guestNames)[Math.floor(Math.random()*(availableNames.length||guestNames.length))];
    const walkMs=Math.max(2600,Math.round(((8-seat)*11)/18*1000)),walkStartedAt=Date.now();
    game.queue.push({id,seat,name,recipe:null,tone:guestTones[Math.floor(Math.random()*guestTones.length)],walkMs,walkStartedAt,chatEligible:Math.random()<1/3,hasSpoken:false,fresh:true,sitting:false,seated:false});
    renderCharacters();
    setTimeout(()=>{const order=game.queue.find(item=>item.id===id);if(!order)return;order.fresh=false;order.sitting=true;order.sitStartedAt=Date.now();renderCharacters();setTimeout(()=>{const seatedOrder=game.queue.find(item=>item.id===id);if(!seatedOrder)return;seatedOrder.sitting=false;seatedOrder.seated=true;delete seatedOrder.sitStartedAt;renderCharacters();const menuWaitMs=Math.floor(Math.random()*3001);setTimeout(()=>{const orderingGuest=game.queue.find(item=>item.id===id);if(!orderingGuest||!orderingGuest.seated)return;orderingGuest.recipe=choices[Math.floor(Math.random()*choices.length)];renderCharacters();tryBrew()},menuWaitMs)},960)},walkMs+50);
  }

  function tryBrew(){
    if(!game.night||game.ready||game.brewing)return;
    const inService=[game.ready,game.brewing,game.carrying].filter(Boolean).reduce((count,recipe)=>{count[recipe.id]=(count[recipe.id]||0)+1;return count},{});
    const demand=game.queue.filter(order=>order.seated&&order.recipe).reduce((count,order)=>{count[order.recipe.id]=(count[order.recipe.id]||0)+1;return count},{});
    const order=game.queue.find(item=>item.seated&&item.recipe&&demand[item.recipe.id]>(inService[item.recipe.id]||0)&&canMake(item.recipe));
    if(!order)return;
    Object.entries(order.recipe.need).forEach(([id,count])=>game.stock[id]-=count);
    nightLedger.made++;nightLedger.cost+=recipeCost(order.recipe);
    game.brewing=order.recipe;saveGame();renderWorkstation();
    clearTimeout(brewTimer);brewTimer=setTimeout(()=>{game.ready=game.brewing;game.brewing=null;saveGame();renderWorkstation();paintServer();celebrateDrinkReady()},1050);
  }

  function paintServer(){
    const tray=$('#serveTray'),cat=$('#serverCat').querySelector('.pixel-cat'),carry=$('#carryDrink');
    tray.style.setProperty('--server-x',`${game.serverX}%`);
    tray.disabled=!game.night;
    tray.classList.toggle('carrying',!!game.carrying);
    tray.classList.toggle('serving',servingDrink);
    carry.innerHTML=game.carrying?sprite('cocktail',game.carrying.art,'carried-drink'):'';
    cat?.classList.toggle('carrying',!!game.carrying);
    cat?.classList.toggle('serving',servingDrink);
    const instruction=tray.querySelector('span');if(instruction)instruction.textContent=game.night?'← → 移动　空格取酒 / 送酒':canPoker()?'← → 控制路易　走到《德州扑克》霓虹灯进入随机牌局':'← → 控制路易　夜晚准备经营酒吧';
  }

  function serviceAction(){
    if(!game.night)return;
    if(servingDrink)return;
    if(!game.carrying){
      if(!game.ready)return notify(game.brewing?'酒保正在摇酒':'还没有做好的鸡尾酒');
      if(Math.abs(game.serverX-18)>10)return notify('移动到酒保旁边再按空格取酒');
      game.carrying=game.ready;game.ready=null;saveGame();notify(`拿到 ${game.carrying.cn}`);renderWorkstation();paintServer();setTimeout(tryBrew,300);return;
    }
    const seated=game.queue.filter(order=>order.seated&&order.recipe),matching=seated.filter(order=>order.recipe.id===game.carrying.id);
    if(!seated.length)return notify('客人还没有坐好点单');
    if(!matching.length)return notify(`目前没有客人点 ${game.carrying.cn}`);
    const order=matching.find(item=>Math.abs(game.serverX-stoolX[item.seat])<=8);
    if(!order)return notify('移动到任意一位点了同款酒的客人面前再按空格');
    servingDrink=true;paintServer();
    clearTimeout(serviceTimer);serviceTimer=setTimeout(()=>{
      if(!game.night)return;
      const tip=game.time>12?10:4,gain=game.carrying.price+tip;
      nightLedger.sales++;nightLedger.revenue+=game.carrying.price;nightLedger.tips+=tip;
      if(chatState?.guestId===order.id)chatState=null;
      const previousLevel=level();game.coins+=gain;game.served++;game.servedTonight++;const currentLevel=level(),newRecipe=currentLevel>previousLevel?recipes.find(recipe=>recipe.level===currentLevel):null;game.carrying=null;game.queue=game.queue.filter(item=>item.id!==order.id);servingDrink=false;saveGame();notify(newRecipe?`升级 Lv.${currentLevel} · 学会 ${newRecipe.cn}`:`送给第 ${order.seat+1} 号凳客人 +${coin(gain)}`);renderHud();renderCharacters();renderWorkstation();renderPrep();paintServer();if(newRecipe)celebrateRecipeUnlock(newRecipe,currentLevel);setTimeout(tryBrew,250);
    },720);
  }

  function moveServer(delta){
    game.serverX=Math.max(12,Math.min(88,game.serverX+delta));paintServer();
    const cat=$('#serverCat').querySelector('.pixel-cat'),direction=delta<0?'left':'right';cat?.classList.remove('moving-left','moving-right');cat?.classList.add(`moving-${direction}`);clearTimeout(walkTimer);walkTimer=setTimeout(()=>cat?.classList.remove('moving-left','moving-right'),600);
    if(!game.night&&delta>0&&game.serverX>=88&&canPoker())enterRandomPoker();
  }

  function autoServeStep(){
    if(!game.night||!game.autoServe)return;
    if(!game.carrying){
      if(!game.ready){tryBrew();return}
      const distance=18-game.serverX;
      if(Math.abs(distance)<=4){game.serverX=18;paintServer();serviceAction();return}
      moveServer(Math.sign(distance)*4);return;
    }
    const order=game.queue.find(item=>item.seated&&item.recipe?.id===game.carrying.id);
    if(!order)return;
    const target=stoolX[order.seat],distance=target-game.serverX;
    if(Math.abs(distance)<=4){game.serverX=target;paintServer();serviceAction();return}
    moveServer(Math.sign(distance)*4);
  }

  function startAutoServe(){
    clearInterval(autoTimer);
    if(game.night&&game.autoServe)autoTimer=setInterval(autoServeStep,150);
  }

  function toggleAutoServe(){
    game.autoServe=!game.autoServe;saveGame();renderPrep();startAutoServe();
    notify(game.autoServe?'服务员已开启自动托管':'服务员已恢复手动控制');
  }

  function startNight(){
    if(timeline.phase!=='night')return notify('请先完成白天德州牌桌赛，或选择跳过白天');
    if(!game.menu.length)return notify('至少选择一款今晚菜单');
    unlockSound();
    settlement=null;nightLedger={made:0,sales:0,revenue:0,tips:0,cost:0};
    servingDrink=false;game.night=true;game.time=30;game.queue=[];game.ready=null;game.brewing=null;game.carrying=null;game.servedTonight=0;game.serverX=32;panelView=null;saveGame();renderAll();
    addGuest();startAutoServe();startChatLoop();arrivalTimer=setInterval(addGuest,3500);tickTimer=setInterval(()=>{game.time--;renderHud();if(game.time<=0)endNight()},1000);
  }

  function endNight(){
    if(!game.night)return;
    const gross=nightLedger.revenue+nightLedger.tips,profit=gross-nightLedger.cost;
    settlement={...nightLedger,waste:Math.max(0,nightLedger.made-nightLedger.sales),profit,margin:gross?Math.round(profit/gross*100):0};
    clearInterval(tickTimer);clearInterval(arrivalTimer);clearInterval(autoTimer);clearInterval(chatTimer);clearTimeout(chatClearTimer);clearTimeout(brewTimer);clearTimeout(glowTimer);clearTimeout(serviceTimer);servingDrink=false;$('#bartenderCat').classList.remove('drink-ready-glow');chatState=null;panelView=null;game.night=false;game.queue=[];game.ready=null;game.brewing=null;game.carrying=null;saveGame();notify(`02:00 打烊 · 净盈利 ${coin(profit)}`);renderAll();
  }

  function handleKey(event){
    if(!$('#tavern').classList.contains('active'))return;
    unlockTavernBgm();
    if(['ArrowLeft','ArrowRight'].includes(event.key)||(game.night&&event.key===' '))event.preventDefault();
    if(event.key==='ArrowLeft')moveServer(-5);
    if(event.key==='ArrowRight')moveServer(5);
    if(game.night&&event.key===' ')serviceAction();
  }

  function handleControlSound(event){
    if($('#tavern').classList.contains('active'))unlockTavernBgm();
    const control=event.target.closest?.('button,.menu-card');
    if(!control||control.matches('button:disabled,.menu-card.short'))return;
    playButtonSound();
  }

  window.catDayTimeline={canPoker,refresh:()=>{showScreen('#tavern');game.serverX=32;renderAll()}};
  window.addEventListener('cat-poker-tournament-finished',finishPokerStage);
  window.addEventListener('cat-free-poker-hand-finished',finishFreePoker);
  $('#enterTavern').onclick=()=>{game.coins=Number(localStorage.getItem('catCoins')||game.coins);showScreen('#tavern');game.serverX=32;renderAll()};
  $('#tavernBack').onclick=()=>notify(`第 ${timeline.day} 天 · ${timeline.phase==='day'?'白天德州':'夜晚营业'}`);
  $('#pokerNeon').onclick=enterRandomPoker;
  $('#friendNeon').onclick=enterFriendPoker;
  $('#serveTray').onclick=serviceAction;
  $('#tavernMusic').onclick=toggleTavernBgm;
  document.addEventListener('pointerdown',handleControlSound);
  document.addEventListener('keydown',handleKey);
  document.addEventListener('visibilitychange',syncTavernBgm);
  new MutationObserver(syncTavernBgm).observe($('#tavern'),{attributes:true,attributeFilter:['class']});
  showScreen('#tavern');renderAll();startStaffSpeech();updateMusicControl();
})();
