/* 猫猫酒吧：与德州牌局隔离，只共享 catCoins 余额。 */
(()=>{
  const $=s=>document.querySelector(s);
  const KEY='moonTailTavernV4';
  const TUTORIAL_KEY='catTavernFirstNightTutorialV1';
  const tutorialSteps=[
    {eyebrow:'STEP 01 · 客人点单',title:'先看客人头顶的鸡尾酒',body:'客人坐下后会先看菜单，再显示点单。每位客人只有 10 秒耐心；不同外观的猫猫有不同口味偏好，菜单中的热门酒也更容易被点到。',tip:'气泡出现后，酒保会按订单顺序开始制作。'},
    {eyebrow:'STEP 02 · 酒保制作',title:'观察酒保头顶的制作队列',body:'鸡尾酒图片旁的进度条代表制作进程。高价且配料复杂的酒制作更慢；显示“完成”后会按完成先后竖向排列。',tip:'服务员只能先拿最早完成的那一杯。'},
    {eyebrow:'STEP 03 · 取酒与递酒',title:'移动服务员完成配送',body:'移动到酒保旁取酒，再走到点了同款酒的客人面前递出。键盘使用 ← →、Space；Xbox 使用左摇杆与 A；手机使用屏幕按钮。',tip:'5 秒内送达会获得爱心反馈；等待超过 10 秒会产生罚款。'}
  ];
  const helpControlSteps=[
    {eyebrow:'KEYBOARD',title:'键盘操作',rows:[['移动',['←','→']],['冲刺',['Shift']],['取 / 递酒',['Space']],['丢弃',['Q']]]},
    {eyebrow:'XBOX CONTROLLER',title:'XBOX 手柄',rows:[['移动',['左摇杆','十字键']],['冲刺',['LT']],['取 / 递酒',['A']],['丢弃',['X']],['像素鼠标',['右摇杆','A']],['校准光标',['R3']]]}
  ];

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
    gin:{name:'金酒',cost:100,yield:5,art:0,group:'基酒'},rum:{name:'白朗姆',cost:95,yield:5,art:1,group:'基酒'},vodka:{name:'伏特加',cost:95,yield:5,art:2,group:'基酒'},bourbon:{name:'波本威士忌',cost:135,yield:5,art:3,group:'基酒'},tequila:{name:'龙舌兰',cost:120,yield:5,art:4,group:'基酒'},rye:{name:'黑麦威士忌',cost:140,yield:5,art:5,group:'基酒'},
    orange:{name:'橙味利口酒',cost:90,yield:5,art:7,group:'利口酒与苦味剂'},vermouth:{name:'甜味美思',cost:90,yield:5,art:14,group:'利口酒与苦味剂'},campari:{name:'金巴利',cost:125,yield:5,art:15,group:'利口酒与苦味剂'},liqueur:{name:'咖啡利口酒',cost:105,yield:5,art:17,group:'利口酒与苦味剂'},bitters:{name:'芳香苦精',cost:60,yield:5,art:18,group:'利口酒与苦味剂'},bluecuracao:{name:'蓝橙力娇酒',cost:110,yield:5,art:16,group:'利口酒与苦味剂'},aperol:{name:'阿佩罗',cost:115,yield:5,art:6,group:'利口酒与苦味剂'},
    tonic:{name:'汤力水',cost:8,art:8,group:'调和剂'},soda:{name:'苏打水',cost:7,art:9,group:'调和剂'},cola:{name:'可乐',cost:7,art:10,group:'调和剂'},gingerbeer:{name:'姜汁啤酒',cost:9,art:11,group:'调和剂'},lemonsoda:{name:'柠檬汽水',cost:8,art:12,group:'调和剂'},prosecco:{name:'普罗塞克',cost:110,yield:5,art:13,group:'调和剂'},syrup:{name:'糖浆',cost:5,art:21,group:'调和剂'},coffee:{name:'浓缩咖啡',cost:10,art:29,group:'调和剂'},cranberry:{name:'蔓越莓汁',cost:9,art:23,group:'调和剂'},tomato:{name:'番茄汁',cost:8,art:24,group:'调和剂'},pineapplejuice:{name:'菠萝汁',cost:9,art:25,group:'调和剂'},orangejuice:{name:'橙汁',cost:8,art:26,group:'调和剂'},coconut:{name:'椰浆',cost:12,art:27,group:'调和剂'},cream:{name:'淡奶油',cost:11,art:28,group:'调和剂'},grenadine:{name:'红石榴糖浆',cost:8,art:22,group:'调和剂'},hotsauce:{name:'辣椒汁',cost:6,art:20,group:'调和剂'},worcestershire:{name:'伍斯特酱',cost:6,art:19,group:'调和剂'},
    lemon:{name:'柠檬',cost:6,art:32,group:'鲜果与香草'},lime:{name:'青柠',cost:6,art:35,group:'鲜果与香草'},mint:{name:'薄荷',cost:5,art:40,group:'鲜果与香草'},orangeslice:{name:'橙片',cost:5,art:38,group:'鲜果与香草'},orangepeel:{name:'橙皮',cost:4,art:39,group:'鲜果与香草'},cherry:{name:'酒渍樱桃',cost:7,art:44,group:'鲜果与香草'},eggwhite:{name:'蛋清',cost:5,art:30,group:'鲜果与香草'},salt:{name:'海盐',cost:3,art:31,group:'鲜果与香草'},pepper:{name:'盐与黑胡椒',cost:4,art:46,group:'鲜果与香草'}
  };
  Object.values(ingredients).forEach(item=>{if(!item.yield){item.cost*=5;item.yield=5}});
  const HEAT_PER_STAR=15,MAX_POPULARITY_STARS=5,PROFICIENCY_SALES_STEP=5,IDLE_DECAY_GRACE_NIGHTS=3,STAR_DECAY_BUFFER=3;
  const guestTastePreferences={gray:['清爽','经典'],cream:['热带','蓝调'],orange:['醇厚','经典'],black:['辛香','醇厚'],tabby:['经典','清爽'],pink:['酸甜','热带']};
  const groupOrder=['基酒','利口酒与苦味剂','调和剂','鲜果与香草'];
  const stoolX=[8,20,32,44,56,68,80,92];
  const guestNames=['团子','麻薯','奶盖','芝麻','布丁','栗子','小满','可可','雪饼','米粒','桃酥','乌龙','柚子','豆包','月饼','橘糖'];
  const staffCandidates=[
    {id:'taotao',name:'桃桃',avatar:1,title:'笑容招待',skill:'客人小费 +8%',bonus:'tip',value:.08,cost:260,look:'粉色领结亲切醒目，最会让客人开心。'},
    {id:'chiying',name:'赤影',avatar:2,title:'夜巡值班',skill:'营业时间 +6%',bonus:'time',value:.06,cost:380,look:'红斗篷适合守住深夜的最后一盏灯。'},
    {id:'afei',name:'阿飞',avatar:3,title:'精准调酒',skill:'酒保制酒速度 +10%',bonus:'brew',value:.10,cost:520,look:'护目镜让每次量酒和摇制都更准确。'},
    {id:'hualing',name:'花铃',avatar:4,title:'宾客关系',skill:'客人到店速度 +8%',bonus:'guest',value:.08,cost:680,look:'花饰温柔亮眼，擅长招呼新客入座。'},
    {id:'qinghe',name:'青禾',avatar:5,title:'轻步领班',skill:'服务员移动速度 +10%',bonus:'move',value:.10,cost:850,look:'沉稳正装和敏捷身手让送酒路线更顺。'},
    {id:'jinxian',name:'金弦',avatar:6,title:'律动协作',skill:'拿酒与送酒速度 +10%',bonus:'serve',value:.10,cost:1050,look:'小提琴家的节拍感让吧台配合更流畅。'}
  ];
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
  let pendingRecipeUnlocks=[];
  let settlement=null;
  let nightLedger=emptyNightLedger();
  let nightPopularityIds=new Set();
  let tickTimer=null,arrivalTimer=null,brewTimer=null,brewProgressTimer=null,walkTimer=null,serviceTimer=null,autoTimer=null,chatTimer=null,chatClearTimer=null,glowTimer=null,timelineReturnTimer=null,bartenderSpeechTimer=null,bartenderSpeechClearTimer=null,serverSpeechTimer=null,serverSpeechClearTimer=null,phaseBannerTimer=null;
  let serverMoveDirection=0,serverMoveFrame=null,serverMoveLastTime=0,serverMoveSource=null;
  let serverStaminaFrame=null,serverStaminaLastTime=0,serverSprintStamina=3,serverSprintExhausted=false,keyboardSprintHeld=false,gamepadSprintHeld=false,sprintRumbleAt=0;
  let gamepadFrame=null,gamepadActionHeld=false,gamepadBackHeld=false,gamepadDiscardHeld=false,gamepadCursorCenterHeld=false,activeGamepad=null,gamepadCursorX=null,gamepadCursorY=null,gamepadCursorLastTime=0,gamepadCursorTarget=null,gamepadCursorHit=null;
  let readySequence=0;
  let tutorialStep=0,tutorialDone=null,helpSection='tutorial',helpPage=0;
  const SERVER_MOVE_SPEED=25,SERVER_SPRINT_MULTIPLIER=1.75,SERVER_SPRINT_MAX=3;
  let servingDrink=false;
  let soundContext=null;
  const BGM_MUTED_KEY='catGlobalBgmMutedV1',BGM_VOLUME_KEY='catGlobalBgmVolumeV1',LEGACY_BGM_MUTED_KEY='tavernBgmMutedV1',LEGACY_BGM_VOLUME_KEY='tavernBgmVolumeV1',SFX_ENABLED_KEY='tavernSfxEnabledV1',SFX_VOLUME_KEY='tavernSfxVolumeV1',tavernBgm=new Audio('/assets/audio/tavern-bgm.mp3');
  const savedBgmVolume=Number(localStorage.getItem(BGM_VOLUME_KEY)??localStorage.getItem(LEGACY_BGM_VOLUME_KEY));
  let bgmVolume=Number.isFinite(savedBgmVolume)?Math.max(0,Math.min(1,savedBgmVolume)):.2;
  tavernBgm.loop=true;tavernBgm.preload='auto';tavernBgm.volume=bgmVolume;
  const savedSfxVolume=Number(localStorage.getItem(SFX_VOLUME_KEY));
  let bgmUnlocked=false,bgmMuted=(localStorage.getItem(BGM_MUTED_KEY)??localStorage.getItem(LEGACY_BGM_MUTED_KEY))==='1',bgmFadeTimer=null,sfxEnabled=localStorage.getItem(SFX_ENABLED_KEY)!=='0',sfxVolume=Number.isFinite(savedSfxVolume)?Math.max(0,Math.min(1,savedSfxVolume)):.4;
  let chatState=null,chatIndex=0;
  let bartenderSpeech='',serverSpeech='',bartenderSpeechIndex=0,serverSpeechIndex=0,lastPhaseBanner=null;
  let serverNotebookTimer=null,serverNotebookActive=false;
  const staffLines={
    day:{bartender:['白天先把杯子擦亮，夜里才会闪闪发光。','我在检查今晚的材料，每一杯都要照真实配方。','菜单不用贪多，备得齐、做得稳才重要。'],server:['白天可以先去打一局德州。','右边的联机对战，随时可以约朋友。','今天也慢慢来，别把好运气催跑了。','我先熟悉一下吧台的位置。','简洁是智慧的灵魂。','世事如舞台。','爱所有人，信任少数人。']},
    night:{bartender:['客人点什么，我就按订单做什么。','摇壶响起来，今晚正式开始了。','这杯完成了，记得趁香气还在时送到。','心事可以慢慢说，酒也要慢慢摇。'],server:['我来取酒，你安心调制。','同款鸡尾酒可以送给任何点了它的客人。','忙的时候也要记得听客人把话说完。','慢一点没关系，今晚还很长。','杯子端稳了，我这就送过去。','黑夜再长，白昼总会到来。','勇气在逆境中成长。','真爱之路从不平坦。']}
  };

  function emptyRecipeProgress(){return Object.fromEntries(recipes.map(recipe=>[recipe.id,{sales:0,heatXp:0,stars:0,idleNights:0}]))}
  function normalizeRecipeProgress(savedProgress){const normalized=emptyRecipeProgress();recipes.forEach(recipe=>{const source=savedProgress?.[recipe.id]||{},heatXp=Math.max(0,Math.min(HEAT_PER_STAR*MAX_POPULARITY_STARS,Number(source.heatXp)||0)),stars=Math.max(0,Math.min(MAX_POPULARITY_STARS,Number.isFinite(Number(source.stars))?Math.floor(Number(source.stars)):Math.floor(heatXp/HEAT_PER_STAR)));normalized[recipe.id]={sales:Math.max(0,Math.floor(Number(source.sales)||0)),heatXp,stars,idleNights:Math.max(0,Math.floor(Number(source.idleNights)||0))}});return normalized}

  function initialState(){return{
    coins:Number(localStorage.getItem('catCoins')||480),
    stock:{gin:2,tonic:2,tequila:2,orange:2,lime:4,rum:0,mint:0,soda:0,campari:0,vermouth:0,bourbon:0,sugar:0,bitters:0,vodka:0,coffee:0,liqueur:0},
    menu:['gin-tonic'],staff:[],served:0,recipeUnlockEveryFive:true,recipeProgress:emptyRecipeProgress(),night:false,time:60,closing:false,queue:[],ready:[],brewing:null,carrying:null,servedTonight:0,serverX:28,autoServe:false
  }}
  function loadGame(){try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved)return normalize(saved)}catch{}return initialState()}
  function recipeUnlockLevel(recipe){const order=Math.max(1,Number(recipe?.level)||1);return order===1?1:(order-1)*5}
  function levelForServed(served){return Math.min(recipeUnlockLevel(recipes[recipes.length-1]),1+Math.floor((Number(served)||0)/3))}
  function normalize(saved){const base=initialState(),legacyServed=Math.max(0,Number(saved.served)||0),legacyLevel=Math.min(recipes.length,1+Math.floor(legacyServed/3)),migratedServed=saved.recipeUnlockEveryFive===true?legacyServed:(recipeUnlockLevel(recipes[legacyLevel-1])-1)*3+(legacyServed%3),result={...base,...saved,served:migratedServed,recipeUnlockEveryFive:true,recipeProgress:normalizeRecipeProgress(saved.recipeProgress),stock:{...base.stock,...(saved.stock||{})},night:false,time:60,closing:false,queue:[],ready:[],brewing:null,carrying:null,serverX:Number.isFinite(saved.serverX)?saved.serverX:28,autoServe:!!saved.autoServe};const savedLevel=levelForServed(result.served);result.menu=(result.menu||[]).filter(id=>recipes.some(recipe=>recipe.id===id&&recipeUnlockLevel(recipe)<=savedLevel));result.staff=[...new Set((result.staff||[]).filter(id=>staffCandidates.some(member=>member.id===id)))];if(!result.menu.length)result.menu=['gin-tonic'];return result}
  function saveGame(){localStorage.setItem(KEY,JSON.stringify(game));localStorage.setItem('catCoins',String(game.coins))}
  function saveTimeline(){localStorage.setItem(TIMELINE_KEY,JSON.stringify(timeline))}
  function level(){return levelForServed(game.served)}
  function unlocked(recipe){return recipeUnlockLevel(recipe)<=level()}
  function purchasableIngredient(id){return recipes.some(recipe=>unlocked(recipe)&&id in recipe.need)}
  function recipeById(id){return recipes.find(r=>r.id===id)}
  function canMake(recipe){return recipe&&Object.entries(recipe.need).every(([id,count])=>(game.stock[id]||0)>=count)}
  function orderableRecipes(){return game.menu.map(recipeById).filter(recipe=>canMake(recipe))}
  function recipeTaste(recipe){const need=recipe?.need||{};if(need.hotsauce||need.worcestershire||need.tomato)return'辛香';if(need.bluecuracao)return'蓝调';if(need.coconut||need.pineapplejuice||need.orangejuice)return'热带';if(need.coffee||need.bourbon||need.rye||need.vermouth||need.bitters||need.campari)return'醇厚';if(need.cranberry||need.grenadine||need.orange)return'酸甜';if(need.lime||need.lemon||need.mint||need.tonic||need.soda)return'清爽';return'经典'}
  function recipeProgressFor(recipe){const id=recipe?.id;if(!id)return{sales:0,heatXp:0,stars:0,idleNights:0};game.recipeProgress=game.recipeProgress||emptyRecipeProgress();if(!game.recipeProgress[id])game.recipeProgress[id]={sales:0,heatXp:0,stars:0,idleNights:0};return game.recipeProgress[id]}
  function recipePopularity(recipe){return recipeProgressFor(recipe).stars}
  function recipeProficiency(recipe){return Math.floor(recipeProgressFor(recipe).sales/PROFICIENCY_SALES_STEP)}
  function displayHeat(value){const rounded=Math.round(value*10)/10;return Number.isInteger(rounded)?String(rounded):rounded.toFixed(1)}
  function recipeHeatProgress(recipe){const progress=recipeProgressFor(recipe);return progress.stars>=MAX_POPULARITY_STARS?'MAX':`${displayHeat(progress.heatXp)}/${(progress.stars+1)*HEAT_PER_STAR}`}
  function recordRecipePopularitySale(recipe,{preferenceMatch=false,fastDelivery=false}={}){const progress=recipeProgressFor(recipe),beforeStars=progress.stars,beforeProficiency=recipeProficiency(recipe);progress.sales++;progress.idleNights=0;const gained=1+(preferenceMatch ? .5 : 0)+(fastDelivery ? .5 : 0);progress.heatXp=Math.min(HEAT_PER_STAR*MAX_POPULARITY_STARS,progress.heatXp+gained);while(progress.stars<MAX_POPULARITY_STARS&&progress.heatXp>=(progress.stars+1)*HEAT_PER_STAR)progress.stars++;return{gained,stars:progress.stars,starUp:progress.stars>beforeStars,proficiency:recipeProficiency(recipe),proficiencyUp:recipeProficiency(recipe)>beforeProficiency}}
  function applyNightPopularityDecay(){const changes=[];nightPopularityIds.forEach(id=>{const recipe=recipeById(id),progress=recipe&&recipeProgressFor(recipe);if(!recipe||!progress)return;const sold=nightLedger.byRecipe[id]?.sales||0;if(sold>0){progress.idleNights=0;return}progress.idleNights++;if(progress.idleNights<IDLE_DECAY_GRACE_NIGHTS||progress.heatXp<=0)return;const beforeStars=progress.stars;progress.heatXp=Math.max(0,progress.heatXp-1);while(progress.stars>0&&progress.heatXp<progress.stars*HEAT_PER_STAR-STAR_DECAY_BUFFER)progress.stars--;changes.push({id,starsLost:beforeStars-progress.stars})});return changes}
  function recipeBaseBrewMs(recipe){return Math.round(650+Object.keys(recipe?.need||{}).length*100+Math.max(0,(recipe?.price||60)-60)*4)}
  function recipeBrewSeconds(recipe){return (recipeBaseBrewMs(recipe)/1000).toFixed(1)}
  function recipeHeat(recipe){return'★'.repeat(recipePopularity(recipe))+'☆'.repeat(5-recipePopularity(recipe))}
  function guestPrefers(tone,recipe){return(guestTastePreferences[tone]||[]).includes(recipeTaste(recipe))}
  function chooseGuestRecipe(choices,tone){
    const weighted=choices.map(recipe=>({recipe,weight:(.75+recipePopularity(recipe)*.25)*(guestPrefers(tone,recipe)?2.1:1)})),total=weighted.reduce((sum,item)=>sum+item.weight,0);let roll=Math.random()*total;
    return(weighted.find(item=>(roll-=item.weight)<=0)||weighted[weighted.length-1]).recipe;
  }
  function emptyNightLedger(){return{made:0,sales:0,revenue:0,tips:0,cost:0,penalty:0,orders:0,byRecipe:{},timeoutReasons:{},shortages:{}}}
  function recipeNightStats(recipe){const id=recipe.id;if(!nightLedger.byRecipe[id])nightLedger.byRecipe[id]={orders:0,made:0,sales:0,revenue:0,tips:0,timeouts:0,preferenceMatches:0};return nightLedger.byRecipe[id]}
  function recordMenuShortages(){
    game.menu.map(recipeById).filter(Boolean).forEach(recipe=>Object.entries(recipe.need).forEach(([id,count])=>{if((game.stock[id]||0)<count)nightLedger.shortages[id]=(nightLedger.shortages[id]||0)+1}));
  }
  function timeoutReasonFor(order){
    if(game.carrying?.id===order.recipe.id||readyQueue().some(recipe=>recipe.id===order.recipe.id))return'配送不及时';
    if(game.brewing?.id===order.recipe.id)return'制作时间较长';
    if(!canMake(order.recipe))return'配料不足';
    return'订单排队过久';
  }
  function buildSettlementInsights(){
    const recipeEntries=Object.entries(nightLedger.byRecipe),bestEntry=recipeEntries.sort(([,a],[,b])=>b.sales-a.sales||b.tips-a.tips||b.orders-a.orders)[0],bestRecipe=bestEntry&&bestEntry[1].sales>0?recipeById(bestEntry[0]):null;
    const timeoutEntry=Object.entries(nightLedger.timeoutReasons).sort(([,a],[,b])=>b-a)[0];
    const shortageEntry=Object.entries(nightLedger.shortages).sort(([,a],[,b])=>b-a)[0];
    let shortageText='本晚无明显缺料';
    if(shortageEntry)shortageText=`${ingredients[shortageEntry[0]]?.name||shortageEntry[0]} · 影响 ${shortageEntry[1]} 次选择`;
    else{
      const relevant=[...new Set(game.menu.flatMap(id=>Object.keys(recipeById(id)?.need||{})))].sort((a,b)=>(game.stock[a]||0)-(game.stock[b]||0))[0];
      if(relevant)shortageText=`${ingredients[relevant]?.name||relevant} · 剩余 ${game.stock[relevant]||0} 次用量`;
    }
    let advice='菜单与库存表现稳定，下晚可以维持当前配置。';
    if(shortageEntry)advice=`优先补充${ingredients[shortageEntry[0]]?.name||'短缺材料'}，避免热门订单被迫改选。`;
    else if(timeoutEntry?.[0]==='配送不及时')advice='成品完成后尽快按队首取酒，并缩短往返路线。';
    else if(timeoutEntry?.[0]==='制作时间较长')advice='减少同时上架的慢速酒，或招募提升制酒速度的员工。';
    else if(timeoutEntry)advice='精简今晚菜单，让酒保更快处理同类订单。';
    else if(bestRecipe)advice=`${bestRecipe.cn}表现最好，下晚可继续主推并备足相关材料。`;
    return{bestCocktail:bestRecipe?`${bestRecipe.cn} · 售出 ${bestEntry[1].sales} 杯`:'暂无售出记录',timeoutReason:timeoutEntry?`${timeoutEntry[0]} · ${timeoutEntry[1]} 位客人`:'本晚无客人超时',shortageText,advice};
  }
  function coin(value){return `${value} 猫猫币`}
  function coinMarkup(value){return `<span class="coin-inline"><i class="cat-coin-icon" aria-hidden="true"></i>${Number(value).toLocaleString()}</span>`}
  function recipeCost(recipe){return Object.entries(recipe.need).reduce((total,[id,count])=>{const item=ingredients[id];return total+((item?.cost||0)/(item?.yield||1))*count},0)}
  function staffBonus(type){return staffCandidates.filter(member=>game.staff.includes(member.id)&&member.bonus===type).reduce((total,member)=>total+member.value,0)}
  function nightDuration(){return Math.round(60*(1+staffBonus('time')))}
  function notify(message){const toast=$('#toast');toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1600)}
  function showScreen(id){document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));$(id).classList.add('active')}
  function tutorialOpen(){const tutorial=$('#tavernTutorial');return tutorial&&!tutorial.hidden}
  function helpOpen(){const help=$('#tavernHelpPanel');return help&&!help.hidden}
  function helpPages(){return helpSection==='tutorial'?tutorialSteps:helpControlSteps}
  function fitHelpDialog(){
    const panel=$('#tavernHelpPanel .help-dialog');if(!panel)return;
    const viewport=window.visualViewport,width=viewport?.width||window.innerWidth,height=viewport?.height||window.innerHeight;
    panel.style.setProperty('--help-scale',String(Math.min(1,Math.max(.34,Math.min((width-20)/920,(height-20)/470)))));
  }
  function renderTavernHelp(){
    const content=$('#tavernHelpContent'),pages=helpPages(),step=pages[helpPage];if(!content||!step)return;
    const controls=helpSection==='controls',stepNumber=String(helpPage+1).padStart(2,'0'),total=String(pages.length).padStart(2,'0');
    const rows=controls?`<dl class="guide-key-list">${step.rows.map(([label,keys,note])=>`<div><dt>${label}</dt><dd>${keys.map(key=>`<kbd>${key}</kbd>`).join('')}${note?`<small>${note}</small>`:''}</dd></div>`).join('')}</dl>`:'';
    content.innerHTML=`<article class="help-page ${controls?'is-controls':'is-tutorial'}"><header><span>${stepNumber}</span><div><small>${step.eyebrow}</small><h2>${step.title}</h2></div><b>${stepNumber} / ${total}</b></header>${controls?rows:`<p>${step.body}</p><aside>${step.tip}</aside>`}<footer><button id="helpPrevious" type="button" ${helpPage===0?'disabled':''}>上一步</button><div class="help-page-dots" aria-hidden="true">${pages.map((_,index)=>`<i class="${index===helpPage?'active':''}"></i>`).join('')}</div><button id="helpNext" type="button">${helpPage===pages.length-1?'完成':'下一步'}</button></footer></article>`;
    document.querySelectorAll('[data-help-section]').forEach(button=>{const active=button.dataset.helpSection===helpSection;button.classList.toggle('active',active);button.setAttribute('aria-current',active?'page':'false');button.onclick=()=>{helpSection=button.dataset.helpSection;helpPage=0;renderTavernHelp()}});
    $('#helpPrevious').onclick=()=>{if(helpPage>0){helpPage--;renderTavernHelp()}};
    $('#helpNext').onclick=()=>{if(helpPage===pages.length-1)closeTavernHelp(true);else{helpPage++;renderTavernHelp()}};
  }
  function closeTavernHelp(restoreFocus=false){const panel=$('#tavernHelpPanel'),button=$('#tavernHelp');if(!panel||panel.hidden)return;panel.hidden=true;button.setAttribute('aria-expanded','false');if(restoreFocus)button.focus()}
  function toggleTavernHelp(){const panel=$('#tavernHelpPanel'),button=$('#tavernHelp'),settingsPanel=$('#tavernSettingsPanel'),settingsButton=$('#tavernSettings');const open=panel.hidden;panel.hidden=!open;button.setAttribute('aria-expanded',String(open));settingsPanel.hidden=true;settingsButton.setAttribute('aria-expanded','false');if(open){renderTavernHelp();requestAnimationFrame(fitHelpDialog)}}
  function fitTutorialDialog(){
    const panel=$('#tavernTutorial>section');if(!panel)return;
    const viewport=window.visualViewport,width=viewport?.width||window.innerWidth,height=viewport?.height||window.innerHeight;
    panel.style.setProperty('--tutorial-scale',String(Math.min(1,Math.max(.18,Math.min((width-20)/900,(height-20)/438)))));
  }
  function renderTutorial(){
    const tutorial=$('#tavernTutorial'),step=tutorialSteps[tutorialStep];if(!tutorial||!step)return;
    tutorial.innerHTML=`<section role="dialog" aria-modal="true" aria-labelledby="tutorialTitle"><header><div><b>新手营业指南</b><small>FIRST NIGHT GUIDE</small></div><span>0${tutorialStep+1} / 0${tutorialSteps.length}</span></header><article class="tutorial-page"><div class="tutorial-page-title"><strong>0${tutorialStep+1}</strong><div><small>${step.eyebrow}</small><h2 id="tutorialTitle">${step.title}</h2></div></div><p>${step.body}</p><aside>${step.tip}</aside></article><div class="tutorial-progress" aria-hidden="true">${tutorialSteps.map((_,index)=>`<i class="${index===tutorialStep?'active':''}"></i>`).join('')}</div><footer><button id="tutorialBack" type="button">${tutorialStep===0?'跳过引导':'上一步'}</button><button id="tutorialNext" type="button">${tutorialStep===tutorialSteps.length-1?'开始营业':'下一步'}</button></footer></section>`;
    fitTutorialDialog();
    $('#tutorialBack').onclick=()=>{if(tutorialStep===0)finishTutorial();else{tutorialStep--;renderTutorial()}};
    $('#tutorialNext').onclick=()=>{if(tutorialStep===tutorialSteps.length-1)finishTutorial();else{tutorialStep++;renderTutorial()}};
  }
  function finishTutorial(){
    const tutorial=$('#tavernTutorial');if(tutorial)tutorial.hidden=true;localStorage.setItem(TUTORIAL_KEY,'1');const done=tutorialDone;tutorialDone=null;if(done)done();
  }
  function showFirstNightTutorial(onDone){
    if(localStorage.getItem(TUTORIAL_KEY)==='1')return false;
    const tutorial=$('#tavernTutorial');if(!tutorial)return false;tutorialStep=0;tutorialDone=onDone;tutorial.hidden=false;renderTutorial();return true;
  }

  function canPoker(){return !game.night&&timeline.phase==='day'}

  function renderTimeline(){
    const hint=$('#pokerDayHint');if(hint)hint.textContent=`第 ${timeline.day} 天 · 白天 · 赢光全桌筹码或输光筹码，也可以跳过`;
    $('#pokerNeon')?.classList.add('open');
    $('#friendNeon')?.classList.add('open');
  }

  function enterRandomPoker(){
    stopServerMove();
    game.serverX=88;paintServer();renderTimeline();
    if(window.startRandomSoloPoker)window.startRandomSoloPoker();else showScreen('#home');
  }

  function enterEstate(){
    if(game.night)return notify('鸡尾酒吧营业中，打烊后才能进入庄园');
    stopServerMove();
    game.serverX=12;paintServer();saveGame();
    if(window.catEstateGame?.enter)window.catEstateGame.enter();else showScreen('#estate');
    syncTavernBgm();
  }

  function returnFromEstate(){
    stopServerMove();
    game.coins=Number(localStorage.getItem('catCoins')||game.coins);
    game.serverX=17;showScreen('#tavern');saveGame();renderAll();syncTavernBgm();
  }

  function enterFriendPoker(){
    if(window.openPokerLobby)window.openPokerLobby('friend');else showScreen('#home');
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

  function startNextDay(){timeline={day:timeline.day+1,phase:'day',dayPoker:false,skipped:false};saveTimeline();game.serverX=28;setTimeout(startStaffSpeech,0)}

  function unlockSound(){
    const AudioEngine=window.AudioContext||window.webkitAudioContext;
    if(!AudioEngine)return null;
    if(!soundContext)soundContext=new AudioEngine();
    if(soundContext.state==='suspended')soundContext.resume().catch(()=>{});
    return soundContext;
  }

  function updateMusicControl(){
    const enabled=$('#tavernMusicEnabled'),volume=$('#tavernMusicVolume'),sfxEnabledControl=$('#tavernSfxEnabled'),sfxVolumeControl=$('#tavernSfxVolume');
    if(enabled)enabled.checked=!bgmMuted;
    if(volume)volume.value=String(Math.round(bgmVolume*100));
    if(sfxEnabledControl)sfxEnabledControl.checked=sfxEnabled;
    if(sfxVolumeControl)sfxVolumeControl.value=String(Math.round(sfxVolume*100));
  }

  function fadeBgm(target,pauseAfter=false){
    clearInterval(bgmFadeTimer);
    const begin=()=>{const start=tavernBgm.volume,steps=12;let step=0;bgmFadeTimer=setInterval(()=>{step++;tavernBgm.volume=Math.max(0,Math.min(1,start+(target-start)*step/steps));if(step>=steps){clearInterval(bgmFadeTimer);bgmFadeTimer=null;if(pauseAfter)tavernBgm.pause()}},40)};
    if(target>0&&tavernBgm.paused){tavernBgm.volume=0;tavernBgm.play().then(begin).catch(()=>{})}else if(!tavernBgm.paused)begin();
  }

  function syncTavernBgm(){
    const shouldPlay=bgmUnlocked&&!bgmMuted&&!document.hidden&&$('#tavern')?.classList.contains('active');
    tavernBgm.muted=!shouldPlay;
    if(shouldPlay)fadeBgm(bgmVolume);else{clearInterval(bgmFadeTimer);bgmFadeTimer=null;tavernBgm.pause();tavernBgm.currentTime=0}
    updateMusicControl();
  }

  function unlockTavernBgm(){if(!bgmUnlocked)bgmUnlocked=true;syncTavernBgm()}
  function broadcastBgmSettings(){window.dispatchEvent(new CustomEvent('cat-global-bgm-change',{detail:{muted:bgmMuted,volume:bgmVolume}}))}
  function setTavernBgmEnabled(enabled){bgmMuted=!enabled;if(enabled)bgmUnlocked=true;localStorage.setItem(BGM_MUTED_KEY,bgmMuted?'1':'0');syncTavernBgm();broadcastBgmSettings()}
  function setTavernBgmVolume(value){bgmVolume=Math.max(0,Math.min(1,Number(value)||0));localStorage.setItem(BGM_VOLUME_KEY,String(bgmVolume));if(!bgmMuted)bgmUnlocked=true;syncTavernBgm();broadcastBgmSettings()}
  function broadcastSfxSettings(){window.dispatchEvent(new CustomEvent('cat-global-sfx-change',{detail:{enabled:sfxEnabled,volume:sfxVolume}}))}
  function setTavernSfxEnabled(enabled){sfxEnabled=enabled;localStorage.setItem(SFX_ENABLED_KEY,sfxEnabled?'1':'0');updateMusicControl();broadcastSfxSettings();if(sfxEnabled)playButtonSound()}
  function setTavernSfxVolume(value){sfxVolume=Math.max(0,Math.min(1,Number(value)||0));localStorage.setItem(SFX_VOLUME_KEY,String(sfxVolume));updateMusicControl();broadcastSfxSettings()}

  function withSound(callback){
    if(!sfxEnabled||sfxVolume<=0)return;
    const context=unlockSound();
    if(!context)return;
    if(context.state==='running'){callback(context,sfxVolume);return}
    context.resume().then(()=>callback(context,sfxVolume)).catch(()=>{});
  }

  function playButtonSound(){
    if(!sfxEnabled||sfxVolume<=0)return;
    withSound((context,volume)=>{
      const now=context.currentTime;
      [720,340].forEach((frequency,index)=>{
        const oscillator=context.createOscillator(),gain=context.createGain();
        oscillator.type=index?'triangle':'sine';oscillator.frequency.setValueAtTime(frequency,now);oscillator.frequency.exponentialRampToValueAtTime(index?120:210,now+.085);
        gain.gain.setValueAtTime((index ? .012 : .026)*volume,now);gain.gain.exponentialRampToValueAtTime(.0001,now+.09);
        oscillator.connect(gain);gain.connect(context.destination);oscillator.start(now);oscillator.stop(now+.1);
      });
    });
  }

  function playReadySound(){
    withSound((context,volume)=>{
      const now=context.currentTime;
      [784,988,1175,1568].forEach((frequency,index)=>{
        const oscillator=context.createOscillator(),gain=context.createGain(),start=now+index*.07;
        oscillator.type=index%2?'triangle':'sine';oscillator.frequency.setValueAtTime(frequency,start);
        gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(.052*volume,start+.018);gain.gain.exponentialRampToValueAtTime(.0001,start+.62);
        oscillator.connect(gain);gain.connect(context.destination);oscillator.start(start);oscillator.stop(start+.65);
      });
    });
  }

  function playDeliverySound(){
    if(!sfxEnabled||sfxVolume<=0)return;
    withSound((context,volume)=>{
      const now=context.currentTime;
      [659,880,1175].forEach((frequency,index)=>{
        const oscillator=context.createOscillator(),gain=context.createGain(),start=now+index*.075;
        oscillator.type=index===2?'triangle':'sine';oscillator.frequency.setValueAtTime(frequency,start);
        gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(.045*volume,start+.012);gain.gain.exponentialRampToValueAtTime(.0001,start+.19);
        oscillator.connect(gain);gain.connect(context.destination);oscillator.start(start);oscillator.stop(start+.21);
      });
    });
  }

  function playDiscardSound(){
    withSound((context,volume)=>{
      const now=context.currentTime;
      [360,185].forEach((frequency,index)=>{
        const oscillator=context.createOscillator(),gain=context.createGain(),start=now+index*.035;
        oscillator.type=index?'square':'triangle';oscillator.frequency.setValueAtTime(frequency,start);oscillator.frequency.exponentialRampToValueAtTime(index?92:145,start+.16);
        gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime((index?.026:.035)*volume,start+.01);gain.gain.exponentialRampToValueAtTime(.0001,start+.18);
        oscillator.connect(gain);gain.connect(context.destination);oscillator.start(start);oscillator.stop(start+.2);
      });
    });
  }

  function rumbleGamepad(kind){
    const pad=activeGamepad;if(!pad)return;
    const patterns={pickup:{weak:.3,strong:.5,duration:55},delivery:{weak:.65,strong:.9,duration:145},discard:{weak:.45,strong:.75,duration:100},sprint:{weak:.12,strong:.2,duration:135}},pattern=patterns[kind]||patterns.pickup;
    try{
      if(pad.vibrationActuator?.playEffect){const result=pad.vibrationActuator.playEffect('dual-rumble',{startDelay:0,duration:pattern.duration,weakMagnitude:pattern.weak,strongMagnitude:pattern.strong});result?.catch?.(()=>{});return}
      const fallback=pad.hapticActuators?.[0]?.pulse?.(Math.max(pattern.weak,pattern.strong),pattern.duration);fallback?.catch?.(()=>{});
    }catch{}
  }

  function playRecipeUnlockSound(){
    withSound((context,volume)=>{
      const now=context.currentTime;
      [523,659,784,1047,1319].forEach((frequency,index)=>{
        const oscillator=context.createOscillator(),gain=context.createGain(),start=now+index*.09;
        oscillator.type=index===4?'triangle':'sine';oscillator.frequency.setValueAtTime(frequency,start);
        gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(.075*volume,start+.02);gain.gain.exponentialRampToValueAtTime(.0001,start+.48);
        oscillator.connect(gain);gain.connect(context.destination);oscillator.start(start);oscillator.stop(start+.52);
      });
    });
  }

  function celebrateRecipeUnlock(recipe,currentLevel,onClose){
    const popup=$('#recipeCelebration');
    if(!popup||!recipe){onClose?.();return}
    popup.innerHTML=`<div class="recipe-celebration-card" role="status"><i class="celebration-burst" aria-hidden="true">✦ ✦ ✦</i><span>LEVEL UP · Lv.${currentLevel}</span><strong>新配方研究成功！</strong>${sprite('cocktail',recipe.art,'celebration-drink')}<b>${recipe.cn}</b><small>${recipe.name} · 新材料现已可采购</small><button type="button">太棒了！</button></div>`;
    popup.hidden=false;popup.classList.remove('show');void popup.offsetWidth;popup.classList.add('show');
    playRecipeUnlockSound();
    let closed=false;
    const close=()=>{if(closed)return;closed=true;clearTimeout(popup._timer);popup.classList.remove('show');setTimeout(()=>{popup.hidden=true;popup.innerHTML='';onClose?.()},180)};
    popup.querySelector('button').onclick=close;
    clearTimeout(popup._timer);popup._timer=setTimeout(close,4800);
  }

  function showPendingRecipeUnlocks(){
    const next=pendingRecipeUnlocks.shift();
    if(!next)return;
    celebrateRecipeUnlock(next.recipe,next.level,showPendingRecipeUnlocks);
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
    const art=role==='bartender'?'/assets/bartender-shaker-1s-loop.gif':role==='server'?'/assets/server-animations/server-notebook-idle-initial.png':guestArt[tone];
    return `<div class="pixel-cat image-character tone-${tone} role-${role}" style="--character-image:url('${art}')" aria-hidden="true"><i class="character-shadow"></i></div>`
  }

  function updateServerNotebookVisual(){
    const cat=$('#serverCat')?.querySelector('.pixel-cat');
    cat?.classList.toggle('notebook-idle',serverNotebookActive&&!game.carrying&&!servingDrink);
  }

  function resetServerNotebookTimer(){
    clearTimeout(serverNotebookTimer);serverNotebookActive=false;updateServerNotebookVisual();
    serverNotebookTimer=setTimeout(()=>{
      if(!game.carrying&&!servingDrink&&$('#tavern').classList.contains('active')){serverNotebookActive=true;updateServerNotebookVisual()}
    },5000);
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
    const scene=$('.tavern-scene'),estate=$('#estateNeon');scene?.classList.toggle('night-open',game.night);if(estate){estate.disabled=game.night;estate.setAttribute('aria-disabled',String(game.night))}
    if(!game.night){const phaseText={day:'白天 · 德州时间',night:'夜晚 21:30 · 开业准备'}[timeline.phase];$('#nightStatus').textContent=`第 ${timeline.day} 天 · ${phaseText}`;return}
    if(game.closing){$('#nightStatus').textContent=`02:00 · 收尾中 · 等待 ${game.queue.length} 位客人离场`;return}
    const duration=nightDuration(),quarter=duration/4,passed=duration-game.time,hour=(22+Math.floor(passed/quarter))%24,minute=Math.floor((passed%quarter)/quarter*60);
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
      const matchingDrink=order?.recipe&&game.carrying?.id===order.recipe.id;
      const reaction=order?.leaving==='happy'?'<i class="guest-heart-burst" aria-hidden="true"><b>♥</b><b>♥</b><b>♥</b><b>♥</b><b>♥</b><b>♥</b></i>':order?.leaving==='broken'?'<i class="guest-break-heart" aria-hidden="true">💔</i>':'';
      return `<div class="bar-seat seat-${seat+1}" style="--stool-x:${x}%"><i class="pixel-stool"></i>${order?`<div class="guest-seat ${order.fresh?'arriving':''} ${order.sitting?'sitting':''} ${order.seated?'seated':''} ${order.leaving||''}" style="--guest-walk:${walkDistance}cqw;--guest-walk-duration:${walkMs}ms;--guest-walk-delay:-${walkElapsed}ms;--guest-walk-frame-delay:-${walkElapsed%720}ms;--guest-sit-delay:-${sitElapsed}ms;--guest-layer:${guestLayer}" data-order="${order.id}">${reaction}${talking?`<i class="cloud-dialog guest-dialog">${chatState.guest}</i>`:''}${order.recipe?sprite('cocktail',order.recipe.art,`order-drink ${matchingDrink?'matching-order':''}`):''}${pixelCat(order.tone,'guest')}${status?`<small class="${statusClass}">${status}</small>`:''}</div>`:''}</div>`
    }).join('');
    $('#barAction').classList.toggle('speech-hidden',!!bartenderSpeech);
    $('#bartenderCat').querySelector('.pixel-cat')?.classList.toggle('mixing',!!game.brewing);
    paintServer();
  }

  function speechPeriod(role){return role==='bartender'?20000:8000+Math.floor(Math.random()*7001)}
  function showStaffSpeech(role){
    if(role==='bartender'&&game.night){bartenderSpeech='';clearTimeout(bartenderSpeechClearTimer);renderCharacters();return}
    const phase=timeline.phase==='day'&&!game.night?'day':'night',lines=staffLines[phase][role],index=role==='bartender'?bartenderSpeechIndex++:serverSpeechIndex++,line=lines[index%lines.length];
    if(role==='bartender'){serverSpeech='';clearTimeout(serverSpeechClearTimer);bartenderSpeech=line;clearTimeout(bartenderSpeechClearTimer);bartenderSpeechClearTimer=setTimeout(()=>{bartenderSpeech='';renderCharacters()},5000)}else{bartenderSpeech='';clearTimeout(bartenderSpeechClearTimer);serverSpeech=line;clearTimeout(serverSpeechClearTimer);serverSpeechClearTimer=setTimeout(()=>{serverSpeech='';renderCharacters()},2000)}
    renderCharacters();
  }

  function scheduleServerSpeech(){
    clearTimeout(serverSpeechTimer);
    serverSpeechTimer=setTimeout(()=>{showStaffSpeech('server');scheduleServerSpeech()},speechPeriod('server'));
  }

  function startStaffSpeech(){
    clearInterval(bartenderSpeechTimer);clearTimeout(serverSpeechTimer);clearTimeout(bartenderSpeechClearTimer);clearTimeout(serverSpeechClearTimer);bartenderSpeech='';serverSpeech='';
    if(!game.night){showStaffSpeech('bartender');bartenderSpeechTimer=setInterval(()=>showStaffSpeech('bartender'),speechPeriod('bartender'))}
    showStaffSpeech('server');scheduleServerSpeech();
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

  function readyQueue(){
    if(!Array.isArray(game.ready))game.ready=game.ready?[game.ready]:[];
    return game.ready.sort((left,right)=>(left.readyOrder||0)-(right.readyOrder||0));
  }

  function renderWorkstation(){
    const bartender=$('#bartenderCat').querySelector('.pixel-cat'),ready=readyQueue(),panel=$('#bartenderDrinkPanel');
    bartender?.classList.toggle('mixing',!!game.brewing);
    const progress=game.brewing&&game.brewEndsAt?Math.max(0,Math.min(100,Math.round((Date.now()-(game.brewStartedAt||Date.now()))/(game.brewEndsAt-(game.brewStartedAt||Date.now()))*100))):0;
    panel.innerHTML=!game.night?'':`${game.brewing?`<div class="bartender-drink-card brewing"><div class="bartender-drink-core">${sprite('cocktail',game.brewing.art,'bartender-panel-drink')}<i class="brew-progress"><em style="width:${progress}%"></em></i><b class="drink-state" aria-label="制作中">制作</b></div></div>`:''}${ready.map((recipe,index)=>`<div class="bartender-drink-card ready" style="--ready-index:${index}"><div class="bartender-drink-core">${sprite('cocktail',recipe.art,'bartender-panel-drink')}<i class="brew-progress"><em style="width:100%"></em></i><b class="drink-state complete" aria-label="已完成">完成</b></div></div>`).join('')}`;
    $('#barAction').textContent='';
    $('#readyDrink').textContent='';
    $('#mixingGlass').innerHTML='';
  }

  function renderPrep(){
    const content=$('#tavernContent');
    if(game.night){
      content.innerHTML=`<div class="service-dashboard"><div><b>今晚已送出 ${game.servedTonight} 杯</b><small>← → 移动；空格取酒 / 送酒；Q 丢弃手中鸡尾酒。</small></div><div class="service-actions"><button id="autoServe" class="${game.autoServe?'active':''}">${game.autoServe?'自动托管中':'开启自动托管'}</button><button id="closeNight">提前打烊</button></div></div>`;
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
      return `<label class="menu-card ${chosen?'chosen':''} ${available?'':'short'}"><input type="checkbox" data-menu="${recipe.id}" ${chosen?'checked':''} ${available?'':'disabled'}>${sprite('cocktail',recipe.art)}<span><b>${recipe.cn}</b><small>${recipe.name} · ${recipe.base}</small><small class="strategy-line">${recipeTaste(recipe)} · ${recipeHeat(recipe)} · ${recipeBrewSeconds(recipe)}s</small><em>售价 ${coin(recipe.price)} · 热门小费 +${recipePopularity(recipe)*8}%</em></span></label>`
    }).join('');
    const stockGroups=groupOrder.map(group=>{
      const buttons=Object.entries(ingredients).filter(([id,item])=>item.group===group&&purchasableIngredient(id)).map(([id,item])=>`<article class="stock-item">${sprite('ingredient',item.art)}<span><b>${item.name}</b><small>库存 <i data-stock-count="${id}">${game.stock[id]||0}</i></small><em>单价 ${item.cost}</em></span><button type="button" data-buy="${id}" aria-label="购买1份${item.name}">购买</button></article>`).join('');
      return `<section class="stock-group"><h3>${group}</h3><div>${buttons}</div></section>`
    }).join('');
    const researchCards=recipes.map(recipe=>{const learned=unlocked(recipe),formula=Object.entries(recipe.need).map(([id,count])=>`${ingredients[id].name}${count>1?` ×${count}`:''}`).join(' + ');return `<article class="research-card ${learned?'learned':'locked'}">${sprite('cocktail',recipe.art)}<div><b>${recipe.cn}</b><small>${recipe.name} · ${recipe.base}</small><p>${formula}</p><p class="recipe-strategy">${recipeTaste(recipe)} · ${recipeHeat(recipe)} · 制作 ${recipeBrewSeconds(recipe)}s</p><em>${learned?'✓ 已学会':`Lv.${recipeUnlockLevel(recipe)} 解锁`}</em></div></article>`}).join('');
    const staffCards=staffCandidates.map(member=>{const hired=game.staff.includes(member.id);return `<article class="staff-card ${hired?'hired':''}"><img src="/assets/cat-avatars/${member.avatar}.png" alt="${member.name}"><div><b>${member.name} · ${member.title}</b><small>${member.look}</small><em>${member.skill}</em></div><button type="button" data-recruit="${member.id}" ${hired?'disabled':''}>${hired?'已招募':`招募 · ${coin(member.cost)}`}</button></article>`}).join('');
    const hiredSkills=staffCandidates.filter(member=>game.staff.includes(member.id)).map(member=>member.skill).join('　·　');
    const staffPanel=`<div class="staff-summary"><b>当前员工 ${game.staff.length} / ${staffCandidates.length}</b><small>${hiredSkills||'尚未招募员工；各项永久加成可以累计。'}</small></div><div class="staff-grid">${staffCards}</div>`;
    const panelTitles={menu:['今晚菜单','每 5 杯提升熟练度；每 15 点热度增加 1 星，最高 5 星'],stock:['备货间',''],research:['配方研究','口味匹配与 5 秒内送达会额外增加热度；长期零销量会轻微衰减'],staff:['员工招募','六名员工各有一项永久加成；全部招募后仍保持合理收益节奏']};
    const panelBody=panelView==='menu'?`<div class="menu-grid">${menuCards}</div>`:panelView==='stock'?`<div class="stock-groups">${stockGroups}</div>`:panelView==='research'?`<div class="recipe-research-grid">${researchCards}</div>`:staffPanel;
    const modal=panelView?`<div class="prep-modal ${panelView==='stock'?'stock-modal':''}" role="dialog" aria-modal="true"><section><header><div><b>${panelTitles[panelView][0]}</b><small>${panelTitles[panelView][1]}</small></div><button id="modalClose" aria-label="关闭">×</button></header>${panelBody}</section></div>`:'';
    const settlementModal=settlement?`<div class="prep-modal settlement-modal" role="dialog" aria-modal="true"><section><header><div><b>第 ${timeline.day} 天 · 夜晚营业结算</b><small>材料成本按本晚实际耗用的采购价计算</small></div><button id="settlementClose" aria-label="关闭结算">×</button></header><div class="settlement-grid"><div><small>售出鸡尾酒</small><b>${settlement.sales} 杯</b></div><div><small>销售收入</small><b>${coinMarkup(settlement.revenue)}</b></div><div><small>客人小费</small><b>${coinMarkup(settlement.tips)}</b></div><div><small>材料成本</small><b class="cost">− ${coinMarkup(settlement.cost)}</b></div><div><small>超时离场扣款</small><b class="cost">− ${coinMarkup(settlement.penalty)}</b></div><div><small>未售出耗损</small><b>${settlement.waste} 杯</b></div></div><section class="settlement-review" aria-label="本晚经营复盘"><h3>经营复盘</h3><div><article><small>本晚最佳鸡尾酒</small><b>${settlement.bestCocktail}</b></article><article><small>主要超时原因</small><b>${settlement.timeoutReason}</b></article><article><small>最缺材料</small><b>${settlement.shortageText}</b></article></div><p><strong>下晚建议</strong><span>${settlement.advice}</span></p></section><footer><span>毛利率 ${settlement.margin}%</span><span class="${settlement.profit>=0?'positive':'negative'}">今晚净盈利 ${settlement.profit>=0?'+':'−'} ${coinMarkup(Math.abs(settlement.profit))}</span></footer><button id="settlementConfirm" class="settlement-confirm">收下账本</button></section></div>`:'';
    content.innerHTML=`<div class="prep-toolbar"><button id="menuToggle" class="${panelView==='menu'?'active':''}">今晚菜单</button><button id="stockToggle" class="${panelView==='stock'?'active':''}">备货间</button><button id="researchToggle" class="${panelView==='research'?'active':''}">配方研究</button><button id="staffToggle" class="${panelView==='staff'?'active':''}">员工招募</button><button id="openNight" class="open-night" ${game.menu.length?'':'disabled'}>22:00 开始营业</button></div>${modal}${settlementModal}`;
    $('#menuToggle').onclick=()=>{panelView=panelView==='menu'?null:'menu';renderPrep()};
    $('#stockToggle').onclick=()=>{panelView=panelView==='stock'?null:'stock';renderPrep()};
    $('#researchToggle').onclick=()=>{panelView=panelView==='research'?null:'research';renderPrep()};
    $('#staffToggle').onclick=()=>{panelView=panelView==='staff'?null:'staff';renderPrep()};
    $('#openNight').onclick=startNight;
    if(panelView){$('#modalClose').onclick=()=>{panelView=null;renderPrep()};$('.prep-modal').onclick=event=>{if(event.target.classList.contains('prep-modal')){panelView=null;renderPrep()}}}
    if(settlement){const closeSettlement=()=>{settlement=null;startNextDay();renderAll();setTimeout(showPendingRecipeUnlocks,220)};$('#settlementClose').onclick=closeSettlement;$('#settlementConfirm').onclick=closeSettlement;$('.settlement-modal').onclick=event=>{if(event.target.classList.contains('settlement-modal'))closeSettlement()}}
    content.querySelectorAll('[data-menu]').forEach(input=>input.onchange=()=>{game.menu=input.checked?[...new Set([...game.menu,input.dataset.menu])]:game.menu.filter(id=>id!==input.dataset.menu);saveGame();input.closest('.menu-card')?.classList.toggle('chosen',input.checked);const openNight=$('#openNight');if(openNight)openNight.disabled=!game.menu.length});
    content.querySelectorAll('[data-buy]').forEach(button=>button.onclick=()=>buyIngredient(button.dataset.buy,1));
    content.querySelectorAll('[data-recruit]').forEach(button=>button.onclick=()=>recruitStaff(button.dataset.recruit));
  }

  function renderAll(){renderHud();renderCharacters();renderWorkstation();renderPrep()}

  function buyIngredient(id,quantity=1){
    const item=ingredients[id];
    if(!item||!purchasableIngredient(id))return notify('先研究对应配方，才能采购这项材料');
    quantity=Math.max(1,Math.min(99,Math.floor(Number(quantity)||1)));const total=item.cost*quantity;
    if(game.coins<total)return notify(`猫猫币不足，需要 ${coin(total)}`);
    const uses=(item.yield||1)*quantity;game.coins-=total;game.stock[id]=(game.stock[id]||0)+uses;saveGame();renderHud();const stockCount=document.querySelector(`[data-stock-count="${id}"]`);if(stockCount)stockCount.textContent=game.stock[id];notify(`采购 ${item.name} ×${quantity}`);
  }

  function recruitStaff(id){
    if(game.night)return notify('营业期间不能办理员工招募');
    const member=staffCandidates.find(item=>item.id===id);if(!member||game.staff.includes(id))return;
    if(game.coins<member.cost)return notify(`猫猫币不足，需要 ${coin(member.cost)}`);
    game.coins-=member.cost;game.staff.push(id);saveGame();renderHud();renderPrep();notify(`${member.name} 已加入酒馆 · ${member.skill}`);
  }

  function addGuest(){
    if(!game.night||game.closing||game.time<=5||game.queue.length>=8)return;
    const choices=orderableRecipes();
    if(!choices.length)recordMenuShortages();
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
    setTimeout(()=>{const order=game.queue.find(item=>item.id===id);if(!order)return;order.fresh=false;order.sitting=true;order.sitStartedAt=Date.now();renderCharacters();setTimeout(()=>{const seatedOrder=game.queue.find(item=>item.id===id);if(!seatedOrder)return;seatedOrder.sitting=false;seatedOrder.seated=true;delete seatedOrder.sitStartedAt;renderCharacters();const menuWaitMs=Math.floor(Math.random()*3001);setTimeout(()=>{const orderingGuest=game.queue.find(item=>item.id===id);if(!orderingGuest||!orderingGuest.seated)return;recordMenuShortages();const liveChoices=orderableRecipes();if(!liveChoices.length){orderingGuest.leaving='soldout';renderCharacters();removeGuestAfterReaction(id);return}orderingGuest.recipe=chooseGuestRecipe(liveChoices,orderingGuest.tone);orderingGuest.preferenceMatch=guestPrefers(orderingGuest.tone,orderingGuest.recipe);orderingGuest.orderedAt=Date.now();nightLedger.orders++;const stats=recipeNightStats(orderingGuest.recipe);stats.orders++;if(orderingGuest.preferenceMatch)stats.preferenceMatches++;renderCharacters();tryBrew();setTimeout(()=>expireGuestOrder(id),10000)},menuWaitMs)},960)},walkMs+50);
  }

  function removeGuestAfterReaction(id){
    setTimeout(()=>{const order=game.queue.find(item=>item.id===id);if(!order||!order.leaving)return;if(chatState?.guestId===id)chatState=null;game.queue=game.queue.filter(item=>item.id!==id);saveGame();renderCharacters();renderWorkstation();tryBrew();maybeEndNight()},850);
  }

  function expireGuestOrder(id){
    const order=game.queue.find(item=>item.id===id);
    if(!game.night||!order||!order.recipe||order.leaving||order.serving)return;
    const penalty=Math.ceil(order.recipe.price/3),reason=timeoutReasonFor(order);order.leaving='broken';order.timeoutReason=reason;nightLedger.penalty+=penalty;nightLedger.timeoutReasons[reason]=(nightLedger.timeoutReasons[reason]||0)+1;recipeNightStats(order.recipe).timeouts++;game.coins=Math.max(0,game.coins-penalty);saveGame();renderHud();renderCharacters();notify(`${order.name} 因${reason}离开 · 扣除 ${coin(penalty)}`);removeGuestAfterReaction(id);tryBrew();
  }

  function tryBrew(){
    if(!game.night||game.brewing)return;
    const inService=[...readyQueue(),game.brewing,game.carrying].filter(Boolean).reduce((count,recipe)=>{count[recipe.id]=(count[recipe.id]||0)+1;return count},{});
    const demand=game.queue.filter(order=>order.seated&&order.recipe&&!order.leaving).reduce((count,order)=>{count[order.recipe.id]=(count[order.recipe.id]||0)+1;return count},{});
    const order=game.queue.find(item=>item.seated&&item.recipe&&!item.leaving&&demand[item.recipe.id]>(inService[item.recipe.id]||0)&&canMake(item.recipe));
    if(!order)return;
    Object.entries(order.recipe.need).forEach(([id,count])=>game.stock[id]-=count);
    nightLedger.made++;nightLedger.cost+=recipeCost(order.recipe);recipeNightStats(order.recipe).made++;
    game.brewing=order.recipe;
    const brewMs=Math.round(recipeBaseBrewMs(order.recipe)*(1-staffBonus('brew')));
    game.brewStartedAt=Date.now();game.brewEndsAt=game.brewStartedAt+brewMs;saveGame();renderWorkstation();
    clearInterval(brewProgressTimer);brewProgressTimer=setInterval(renderWorkstation,80);
    clearTimeout(brewTimer);brewTimer=setTimeout(()=>{clearInterval(brewProgressTimer);if(!game.night)return;const finished=game.brewing;game.brewing=null;game.brewStartedAt=null;game.brewEndsAt=null;if(finished)readyQueue().push({...finished,readyOrder:++readySequence});saveGame();renderWorkstation();paintServer();celebrateDrinkReady();setTimeout(tryBrew,80)},brewMs);
  }

  function paintServer(){
    const tray=$('#serveTray'),cat=$('#serverCat').querySelector('.pixel-cat'),carry=$('#carryDrink');
    tray.style.setProperty('--server-x',`${game.serverX}%`);
    tray.disabled=!game.night;
    tray.classList.toggle('carrying',!!game.carrying);
    tray.classList.toggle('serving',servingDrink);
    tray.classList.toggle('sprinting',serverIsSprinting());
    carry.innerHTML=game.carrying?sprite('cocktail',game.carrying.art,'carried-drink'):'';
    cat?.classList.toggle('carrying',!!game.carrying);
    cat?.classList.toggle('serving',servingDrink);
    renderServerStamina();
    updateServerNotebookVisual();
  }

  function sprintRequested(){return keyboardSprintHeld||gamepadSprintHeld}
  function serverIsSprinting(){return !!(serverMoveDirection&&sprintRequested()&&!serverSprintExhausted&&serverSprintStamina>0&&$('#tavern').classList.contains('active'))}

  function renderServerStamina(){
    const meter=$('#serverStamina');if(!meter)return;
    const percentage=Math.round(Math.max(0,Math.min(1,serverSprintStamina/SERVER_SPRINT_MAX))*100),sprinting=serverIsSprinting();
    meter.style.setProperty('--stamina-level',`${percentage}%`);meter.classList.toggle('sprinting',sprinting);meter.classList.toggle('exhausted',serverSprintExhausted);meter.classList.toggle('full',percentage>=100);meter.setAttribute('aria-label',`体力 ${percentage}%`);
  }

  function updateServerStamina(now){
    const seconds=Math.min(.05,Math.max(0,(now-(serverStaminaLastTime||now))/1000));serverStaminaLastTime=now;
    if(serverIsSprinting()){
      if(gamepadSprintHeld&&now>=sprintRumbleAt){rumbleGamepad('sprint');sprintRumbleAt=now+185}
      serverSprintStamina=Math.max(0,serverSprintStamina-seconds);
      if(serverSprintStamina<=0){serverSprintStamina=0;serverSprintExhausted=true}
    }else{
      sprintRumbleAt=0;
      serverSprintStamina=Math.min(SERVER_SPRINT_MAX,serverSprintStamina+seconds);
      if(serverSprintStamina>=SERVER_SPRINT_MAX)serverSprintExhausted=false;
    }
    renderServerStamina();
  }

  function startServerStaminaLoop(){
    const tick=now=>{updateServerStamina(now);serverStaminaFrame=requestAnimationFrame(tick)};
    if(serverStaminaFrame===null)serverStaminaFrame=requestAnimationFrame(tick);
  }

  function serviceAction(){
    resetServerNotebookTimer();
    if(!game.night)return;
    if(servingDrink)return;
    if(!game.carrying){
      if(!readyQueue().length)return notify(game.brewing?'酒保正在摇酒':'还没有做好的鸡尾酒');
      if(Math.abs(game.serverX-18)>10)return notify('移动到酒保旁边再按空格取酒');
      game.carrying=readyQueue().shift();saveGame();rumbleGamepad('pickup');notify(`拿到最先完成的 ${game.carrying.cn}`);renderWorkstation();renderCharacters();paintServer();setTimeout(tryBrew,80);return;
    }
    const seated=game.queue.filter(order=>order.seated&&order.recipe&&!order.leaving),matching=seated.filter(order=>order.recipe.id===game.carrying.id);
    if(!seated.length)return notify('客人还没有坐好点单');
    if(!matching.length)return notify(`目前没有客人点 ${game.carrying.cn}`);
    const order=matching.find(item=>Math.abs(game.serverX-stoolX[item.seat])<=8);
    if(!order)return notify('移动到任意一位点了同款酒的客人面前再按空格');
    servingDrink=true;order.serving=true;paintServer();
    clearTimeout(serviceTimer);serviceTimer=setTimeout(()=>{
      if(!game.night)return;
      const deliveryMs=Date.now()-(order.orderedAt||Date.now()),baseTip=game.time>Math.round(nightDuration()*.4)?10:4,popularityBonus=recipePopularity(order.recipe)*.08,preferenceBonus=order.preferenceMatch ? .25 : 0,tip=Math.round(baseTip*(1+staffBonus('tip'))*(1+popularityBonus+preferenceBonus)),gain=game.carrying.price+tip;
      nightLedger.sales++;nightLedger.revenue+=game.carrying.price;nightLedger.tips+=tip;const soldStats=recipeNightStats(order.recipe);soldStats.sales++;soldStats.revenue+=game.carrying.price;soldStats.tips+=tip;
      if(chatState?.guestId===order.id)chatState=null;
      const popularityGain=recordRecipePopularitySale(order.recipe,{preferenceMatch:order.preferenceMatch,fastDelivery:deliveryMs<=5000}),previousLevel=level();game.coins+=gain;game.served++;game.servedTonight++;const currentLevel=level(),newRecipe=currentLevel>previousLevel?recipes.find(recipe=>recipeUnlockLevel(recipe)===currentLevel):null;if(newRecipe)pendingRecipeUnlocks.push({recipe:newRecipe,level:currentLevel});game.carrying=null;servingDrink=false;playDeliverySound();rumbleGamepad('delivery');if(deliveryMs<=5000){order.leaving='happy';order.serving=false;removeGuestAfterReaction(order.id)}else game.queue=game.queue.filter(item=>item.id!==order.id);saveGame();const progressionNote=`${popularityGain.proficiencyUp?` · 熟练度 Lv.${popularityGain.proficiency}`:''}${popularityGain.starUp?` · 热门 ${popularityGain.stars}★`:''}`;notify(`送给第 ${order.seat+1} 号凳客人 +${coin(gain)}${order.preferenceMatch?' · 口味偏好加成':''}${progressionNote}`);renderHud();renderCharacters();renderWorkstation();renderPrep();paintServer();setTimeout(tryBrew,250);maybeEndNight();
    },Math.round(720*(1-staffBonus('serve'))));
  }

  function discardCarriedDrink(){
    if(!game.night||!game.carrying||servingDrink)return;
    const discarded=game.carrying;game.carrying=null;saveGame();playDiscardSound();rumbleGamepad('discard');notify(`已丢弃 ${discarded.cn}`);renderCharacters();renderWorkstation();paintServer();setTimeout(tryBrew,80);
  }

  function moveServer(delta){
    resetServerNotebookTimer();
    const adjustedDelta=delta*(1+staffBonus('move'));game.serverX=Math.max(12,Math.min(88,game.serverX+adjustedDelta));paintServer();
    const cat=$('#serverCat').querySelector('.pixel-cat'),direction=adjustedDelta<0?'left':'right';cat?.classList.remove('moving-left','moving-right');cat?.classList.add(`moving-${direction}`);clearTimeout(walkTimer);if(!serverMoveDirection)walkTimer=setTimeout(()=>cat?.classList.remove('moving-left','moving-right'),180);
    if(!game.night&&adjustedDelta<0&&game.serverX<=12){enterEstate();return}
    if(!game.night&&adjustedDelta>0&&game.serverX>=88&&canPoker())enterRandomPoker();
  }

  function stopServerMove(source){
    if(source&&serverMoveSource!==source)return;
    serverMoveDirection=0;serverMoveSource=null;serverMoveLastTime=0;
    if(serverMoveFrame!==null){cancelAnimationFrame(serverMoveFrame);serverMoveFrame=null}
    clearTimeout(walkTimer);$('#serverCat').querySelector('.pixel-cat')?.classList.remove('moving-left','moving-right');
  }

  function startServerMove(direction,source){
    if(!$('#tavern').classList.contains('active'))return;
    const normalizedDirection=Math.sign(direction);if(!normalizedDirection)return;
    unlockTavernBgm();serverMoveDirection=normalizedDirection;serverMoveSource=source||'keyboard';
    if(serverMoveFrame!==null)return;
    serverMoveLastTime=performance.now();
    const advance=now=>{
      if(!serverMoveDirection||!$('#tavern').classList.contains('active')){stopServerMove();return}
      const seconds=Math.min(.05,Math.max(0,now-serverMoveLastTime)/1000);serverMoveLastTime=now;
      moveServer(serverMoveDirection*SERVER_MOVE_SPEED*seconds*(serverIsSprinting()?SERVER_SPRINT_MULTIPLIER:1));
      if(serverMoveDirection&&$('#tavern').classList.contains('active'))serverMoveFrame=requestAnimationFrame(advance);else stopServerMove();
    };
    serverMoveFrame=requestAnimationFrame(advance);
  }

  function autoServeStep(){
    if(!game.night||!game.autoServe)return;
    if(!game.carrying){
      if(!readyQueue().length){tryBrew();return}
      const distance=18-game.serverX;
      if(Math.abs(distance)<=4){game.serverX=18;paintServer();serviceAction();return}
      moveServer(Math.sign(distance)*4);return;
    }
    const order=game.queue.find(item=>item.seated&&!item.leaving&&item.recipe?.id===game.carrying.id);
    if(!order){discardCarriedDrink();return}
    const target=stoolX[order.seat],distance=target-game.serverX;
    if(Math.abs(distance)<=4){game.serverX=target;paintServer();serviceAction();return}
    moveServer(Math.sign(distance)*4);
  }

  function startAutoServe(){
    clearInterval(autoTimer);
    if(game.night&&game.autoServe)autoTimer=setInterval(autoServeStep,Math.round(150*(1-staffBonus('serve'))));
  }

  function toggleAutoServe(){
    game.autoServe=!game.autoServe;saveGame();renderPrep();startAutoServe();
    notify(game.autoServe?'服务员已开启自动托管':'服务员已恢复手动控制');
  }

  function startNight(){
    if(timeline.phase!=='night')return notify('请先完成白天德州牌桌赛，或选择跳过白天');
    if(!game.menu.length)return notify('至少选择一款今晚菜单');
    unlockSound();
    settlement=null;pendingRecipeUnlocks=[];nightLedger=emptyNightLedger();nightPopularityIds=new Set(recipes.filter(unlocked).map(recipe=>recipe.id));
    stopServerMove();readySequence=0;servingDrink=false;game.night=true;game.time=nightDuration();game.closing=false;game.queue=[];game.ready=[];game.brewing=null;game.brewStartedAt=null;game.brewEndsAt=null;game.carrying=null;game.servedTonight=0;game.serverX=32;panelView=null;saveGame();renderAll();startStaffSpeech();
    const beginService=()=>{if(!game.night)return;addGuest();startAutoServe();startChatLoop();arrivalTimer=setInterval(addGuest,Math.round(3500*(1-staffBonus('guest'))));tickTimer=setInterval(()=>{game.time=Math.max(0,game.time-1);if(game.time<=5){clearInterval(arrivalTimer);arrivalTimer=null}renderHud();if(game.time<=0)endNight()},1000)};
    if(!showFirstNightTutorial(beginService))beginService();
  }

  function endNight(){
    if(!game.night)return;
    const enteringClosing=!game.closing;game.time=0;game.closing=true;clearInterval(tickTimer);tickTimer=null;clearInterval(arrivalTimer);arrivalTimer=null;
    if(game.queue.length){if(enteringClosing)notify('02:00 打烊 · 正在等候最后的客人离场');renderHud();return}
    stopServerMove();
    applyNightPopularityDecay();
    const gross=nightLedger.revenue+nightLedger.tips,profit=gross-nightLedger.cost-nightLedger.penalty,insights=buildSettlementInsights();
    settlement={...nightLedger,...insights,waste:Math.max(0,nightLedger.made-nightLedger.sales),profit,margin:gross?Math.round(profit/gross*100):0};
    clearInterval(tickTimer);clearInterval(arrivalTimer);clearInterval(autoTimer);clearInterval(chatTimer);clearInterval(brewProgressTimer);clearInterval(bartenderSpeechTimer);clearTimeout(serverSpeechTimer);clearTimeout(chatClearTimer);clearTimeout(brewTimer);clearTimeout(glowTimer);clearTimeout(serviceTimer);servingDrink=false;bartenderSpeech='';serverSpeech='';$('#bartenderCat').classList.remove('drink-ready-glow');chatState=null;panelView=null;game.night=false;game.closing=false;game.queue=[];game.ready=[];game.brewing=null;game.brewStartedAt=null;game.brewEndsAt=null;game.carrying=null;nightPopularityIds=new Set();saveGame();notify(`02:00 打烊 · 净盈利 ${coin(profit)}`);renderAll();
  }

  function maybeEndNight(){
    if(game.night&&game.closing&&!game.queue.length)endNight();
  }

  function handleKey(event){
    if(!$('#tavern').classList.contains('active')||tutorialOpen()||helpOpen())return;
    unlockTavernBgm();
    if(['ArrowLeft','ArrowRight','Shift'].includes(event.key)||(game.night&&[' ','q','Q'].includes(event.key)))event.preventDefault();
    if(event.key==='Shift'){keyboardSprintHeld=true;return}
    if(event.key==='ArrowLeft'){startServerMove(-1,'keyboard-left');return}
    if(event.key==='ArrowRight'){startServerMove(1,'keyboard-right');return}
    if(event.repeat)return;
    if(game.night&&event.key===' ')serviceAction();
    if(game.night&&event.key.toLowerCase()==='q')discardCarriedDrink();
  }

  function handleKeyUp(event){
    if(event.key==='Shift'){event.preventDefault();keyboardSprintHeld=false;renderServerStamina()}
    if(event.key==='ArrowLeft'){event.preventDefault();stopServerMove('keyboard-left')}
    if(event.key==='ArrowRight'){event.preventDefault();stopServerMove('keyboard-right')}
  }

  function handleControlSound(event){
    if($('#tavern').classList.contains('active'))unlockTavernBgm();
    const control=event.target.closest?.('button,.menu-card');
    if(!control||control.matches('button:disabled,.menu-card.short'))return;
    playButtonSound();
  }

  function bindTouchMove(button,delta){
    let source=null;
    const stop=()=>{if(source)stopServerMove(source);source=null};
    button.addEventListener('pointerdown',event=>{
      if(!$('#tavern').classList.contains('active'))return;
      event.preventDefault();
      unlockTavernBgm();
      stop();
      source=`touch-${event.pointerId}`;startServerMove(delta,source);
      try{button.setPointerCapture(event.pointerId)}catch{}
    });
    button.addEventListener('pointerup',stop);
    button.addEventListener('pointercancel',stop);
    button.addEventListener('lostpointercapture',stop);
  }

  function hideGamepadCursor(){
    $('#gamepadCursor')?.classList.remove('active','hovering');
    gamepadCursorTarget?.classList.remove('gamepad-hover');gamepadCursorTarget=null;gamepadCursorHit=null;
  }

  function rootGamepadCursor(){const cursor=$('#gamepadCursor');if(cursor?.parentElement!==document.body)document.body.append(cursor);return cursor}

  function scrollGamepadContainer(node,amount){
    let current=node instanceof Element?node:node?.parentElement;
    while(current&&current!==document.body){
      if(current.scrollHeight>current.clientHeight+3){const before=current.scrollTop,currentMax=current.scrollHeight-current.clientHeight;current.scrollTop=Math.max(0,Math.min(currentMax,before+amount));if(current.scrollTop!==before)return true}
      current=current.parentElement;
    }
    return false;
  }

  function updateGamepadCursor(pad){
    const cursor=rootGamepadCursor(),rawX=Number(pad.axes?.[2]||0),rawY=Number(pad.axes?.[3]||0),deadZone=.18;
    if(!cursor||Math.hypot(rawX,rawY)<deadZone)return;
    const now=performance.now(),elapsed=Math.min(.05,Math.max(.001,(now-(gamepadCursorLastTime||now))/1000));gamepadCursorLastTime=now;
    if(!Number.isFinite(gamepadCursorX)){gamepadCursorX=window.innerWidth*.5;gamepadCursorY=window.innerHeight*.5}
    const adjusted=value=>Math.sign(value)*Math.max(0,(Math.abs(value)-deadZone)/(1-deadZone));
    gamepadCursorX=Math.max(4,Math.min(window.innerWidth-26,gamepadCursorX+adjusted(rawX)*540*elapsed));
    gamepadCursorY=Math.max(4,Math.min(window.innerHeight-30,gamepadCursorY+adjusted(rawY)*540*elapsed));
    cursor.style.left=`${gamepadCursorX}px`;cursor.style.top=`${gamepadCursorY}px`;cursor.classList.add('active');syncGamepadCursorTarget(cursor);
    if(Math.abs(adjusted(rawY))>.08)scrollGamepadContainer(gamepadCursorHit,adjusted(rawY)*680*elapsed);
  }

  function syncGamepadCursorTarget(cursor){
    const bounds=cursor.getBoundingClientRect(),hitX=bounds.left+bounds.width/2,hitY=bounds.top+bounds.height/2;
    const hit=document.elementFromPoint(hitX,hitY),target=hit?.closest?.('button:not(:disabled),select:not(:disabled),input:not(:disabled),[role="button"],[tabindex]:not([tabindex="-1"]),label.menu-card:not(.short)')||null;
    gamepadCursorHit=hit;
    if(target!==gamepadCursorTarget){gamepadCursorTarget?.classList.remove('gamepad-hover');gamepadCursorTarget=target;gamepadCursorTarget?.classList.add('gamepad-hover')}
    cursor.classList.toggle('hovering',!!gamepadCursorTarget);
  }

  function centerGamepadCursor(){
    const cursor=rootGamepadCursor();if(!cursor)return;
    gamepadCursorX=window.innerWidth/2;gamepadCursorY=window.innerHeight/2;gamepadCursorLastTime=performance.now();
    cursor.style.left=`${gamepadCursorX}px`;cursor.style.top=`${gamepadCursorY}px`;cursor.classList.add('active');syncGamepadCursorTarget(cursor);notify('黑桃 A 光标已回到屏幕中心');
  }

  function closeGamepadSelectMenu(){const menu=$('#gamepadSelectMenu');if(menu)menu.remove()}
  function closeGamepadDialog(){
    if($('#gamepadSelectMenu')){closeGamepadSelectMenu();return true}
    const leave=$('#leaveConfirm');if(leave&&!leave.hidden){$('#leaveConfirmCancel')?.click();return true}
    const tutorial=$('#tavernTutorial');if(tutorial&&!tutorial.hidden){finishTutorial();return true}
    const recipe=$('#recipeCelebration');if(recipe&&!recipe.hidden){recipe.querySelector('button')?.click();return true}
    if(helpOpen()){closeTavernHelp(true);return true}
    const tavernSettings=$('#tavernSettingsPanel'),tavernSettingsButton=$('#tavernSettings');if(tavernSettings&&!tavernSettings.hidden){tavernSettings.hidden=true;tavernSettingsButton?.setAttribute('aria-expanded','false');tavernSettingsButton?.focus();return true}
    const pokerSettings=$('#pokerSettingsPanel'),pokerSettingsButton=$('#pokerSettings');if(pokerSettings&&!pokerSettings.hidden){pokerSettings.hidden=true;pokerSettingsButton?.setAttribute('aria-expanded','false');pokerSettingsButton?.focus();return true}
    const estateModal=$('#estateModal');if(estateModal&&!estateModal.hidden){$('#estateModalClose')?.click();return true}
    const history=$('#historyModal');if(history?.classList.contains('show')){history.classList.remove('show');return true}
    return false;
  }
  function openGamepadSelectMenu(select){
    closeGamepadSelectMenu();
    const options=[...select.options].filter(option=>!option.disabled);if(!options.length)return false;
    const rect=select.getBoundingClientRect(),menu=document.createElement('div'),menuHeight=Math.min(260,options.length*38+10),placeAbove=rect.bottom+menuHeight>window.innerHeight-8;
    menu.id='gamepadSelectMenu';menu.setAttribute('role','listbox');menu.setAttribute('aria-label',select.getAttribute('aria-label')||'选择选项');menu.style.width=`${Math.max(160,rect.width)}px`;menu.style.left=`${Math.max(8,Math.min(window.innerWidth-Math.max(160,rect.width)-8,rect.left))}px`;menu.style.top=`${Math.max(8,placeAbove?rect.top-menuHeight-5:rect.bottom+5)}px`;
    menu.innerHTML=options.map(option=>`<button type="button" role="option" aria-selected="${option.selected}" data-gamepad-select-value="${option.value}">${option.textContent}</button>`).join('');
    menu.querySelectorAll('button').forEach(button=>button.onclick=()=>{select.value=button.dataset.gamepadSelectValue;select.dispatchEvent(new Event('input',{bubbles:true}));select.dispatchEvent(new Event('change',{bubbles:true}));closeGamepadSelectMenu();syncGamepadCursorTarget($('#gamepadCursor'))});
    document.body.append(menu);return true;
  }

  function clickGamepadCursor(){
    const target=gamepadCursorTarget;
    if(!target||target.matches('[disabled],[aria-disabled="true"]'))return false;
    if(target instanceof HTMLSelectElement)return openGamepadSelectMenu(target);
    target.focus?.({preventScroll:true});target.click();return true;
  }

  function pollXboxController(){
    const pad=typeof navigator.getGamepads==='function'?[...navigator.getGamepads()].find(Boolean):null;
    const tavernActive=$('#tavern').classList.contains('active');
    if(pad){
      activeGamepad=pad;updateGamepadCursor(pad);
      const axis=Number(pad.axes?.[0]||0),verticalAxis=Number(pad.axes?.[1]||0),left=pad.buttons?.[14]?.pressed||axis<-.28,right=pad.buttons?.[15]?.pressed||axis>.28,up=pad.buttons?.[12]?.pressed||verticalAxis<-.28,down=pad.buttons?.[13]?.pressed||verticalAxis>.28,direction=left?-1:right?1:0,overlayOpen=tutorialOpen()||helpOpen()||!$('#tavernSettingsPanel')?.hidden||!!$('#gamepadSelectMenu'),canMoveServer=tavernActive&&!overlayOpen;
      if(canMoveServer&&direction)startServerMove(direction,'gamepad');else stopServerMove('gamepad');
      if(!canMoveServer&&(up||down))scrollGamepadContainer(gamepadCursorHit,(down?1:-1)*14);
      const action=!!pad.buttons?.[0]?.pressed,back=!!pad.buttons?.[1]?.pressed,discard=!!pad.buttons?.[2]?.pressed,centerCursor=!!pad.buttons?.[11]?.pressed;gamepadSprintHeld=!!pad.buttons?.[6]?.pressed;
      if(centerCursor&&!gamepadCursorCenterHeld)centerGamepadCursor();gamepadCursorCenterHeld=centerCursor;
      if(back&&!gamepadBackHeld)closeGamepadDialog();
      if(action&&!gamepadActionHeld){unlockTavernBgm();if(!clickGamepadCursor()&&canMoveServer)serviceAction()}
      if(discard&&!gamepadDiscardHeld&&canMoveServer){unlockTavernBgm();discardCarriedDrink()}
      gamepadActionHeld=action;gamepadBackHeld=back;gamepadDiscardHeld=discard;
    }else{activeGamepad=null;gamepadSprintHeld=false;gamepadCursorCenterHeld=false;hideGamepadCursor();stopServerMove('gamepad');gamepadActionHeld=false;gamepadBackHeld=false;gamepadDiscardHeld=false}
    gamepadFrame=requestAnimationFrame(pollXboxController);
  }

  window.catDayTimeline={canPoker,refresh:()=>{showScreen('#tavern');game.serverX=32;renderAll()}};
  window.catTavernEstate={enter:enterEstate,returnToTavern:returnFromEstate};
  window.addEventListener('cat-poker-tournament-finished',finishPokerStage);
  window.addEventListener('cat-free-poker-hand-finished',finishFreePoker);
  window.addEventListener('cat-estate-coins-changed',event=>{const balance=Number(event.detail?.coins);if(Number.isFinite(balance)){game.coins=balance;saveGame();renderHud()}});
  $('#enterTavern').onclick=()=>{game.coins=Number(localStorage.getItem('catCoins')||game.coins);showScreen('#tavern');game.serverX=32;renderAll();resetServerNotebookTimer()};
  $('#estateNeon').onclick=enterEstate;
  $('#pokerNeon').onclick=enterRandomPoker;
  $('#friendNeon').onclick=enterFriendPoker;
  $('#serveTray').onclick=serviceAction;
  bindTouchMove($('#touchMoveLeft'),-3);
  bindTouchMove($('#touchMoveRight'),3);
  $('#touchServe').onclick=()=>{unlockTavernBgm();serviceAction()};
  $('#tavernSettings').onclick=event=>{event.stopPropagation();const panel=$('#tavernSettingsPanel'),button=$('#tavernSettings'),helpPanel=$('#tavernHelpPanel'),helpButton=$('#tavernHelp');const open=panel.hidden;panel.hidden=!open;button.setAttribute('aria-expanded',String(open));helpPanel.hidden=true;helpButton.setAttribute('aria-expanded','false');if(open)updateMusicControl()};
  $('#tavernHelp').onclick=event=>{event.stopPropagation();toggleTavernHelp()};
  $('#tavernHelpClose').onclick=()=>closeTavernHelp(true);
  $('#tavernHelpPanel').onclick=event=>{if(event.target===event.currentTarget)closeTavernHelp(true)};
  $('#tavernMusicEnabled').onchange=event=>setTavernBgmEnabled(event.target.checked);
  $('#tavernMusicVolume').oninput=event=>setTavernBgmVolume(Number(event.target.value)/100);
  $('#tavernSfxEnabled').onchange=event=>setTavernSfxEnabled(event.target.checked);
  $('#tavernSfxVolume').oninput=event=>setTavernSfxVolume(Number(event.target.value)/100);
  window.addEventListener('cat-global-bgm-change',event=>{const settings=event.detail||{};if(typeof settings.muted==='boolean')bgmMuted=settings.muted;if(Number.isFinite(settings.volume))bgmVolume=Math.max(0,Math.min(1,settings.volume));syncTavernBgm();updateMusicControl()});
  window.addEventListener('cat-global-sfx-change',event=>{const settings=event.detail||{};if(typeof settings.enabled==='boolean')sfxEnabled=settings.enabled;if(Number.isFinite(settings.volume))sfxVolume=Math.max(0,Math.min(1,settings.volume));updateMusicControl()});
  document.addEventListener('pointerdown',event=>{const settingsPanel=$('#tavernSettingsPanel'),settingsButton=$('#tavernSettings'),helpPanel=$('#tavernHelpPanel'),helpButton=$('#tavernHelp');if(!settingsPanel.hidden&&!settingsPanel.contains(event.target)&&!settingsButton.contains(event.target)){settingsPanel.hidden=true;settingsButton.setAttribute('aria-expanded','false')}if(!helpPanel.hidden&&!helpPanel.contains(event.target)&&!helpButton.contains(event.target)){helpPanel.hidden=true;helpButton.setAttribute('aria-expanded','false')}});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){const settingsPanel=$('#tavernSettingsPanel'),settingsButton=$('#tavernSettings');if(!settingsPanel.hidden){settingsPanel.hidden=true;settingsButton.setAttribute('aria-expanded','false');settingsButton.focus()}closeTavernHelp(true)}});
  document.addEventListener('pointerdown',handleControlSound);
  document.addEventListener('keydown',handleKey);
  document.addEventListener('keyup',handleKeyUp);
  window.addEventListener('blur',()=>{keyboardSprintHeld=false;gamepadSprintHeld=false;stopServerMove();renderServerStamina()});
  window.addEventListener('resize',()=>{fitTutorialDialog();fitHelpDialog()});
  window.visualViewport?.addEventListener('resize',fitTutorialDialog);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){keyboardSprintHeld=false;gamepadSprintHeld=false;stopServerMove();renderServerStamina()}});
  document.addEventListener('visibilitychange',syncTavernBgm);
  new MutationObserver(syncTavernBgm).observe($('#tavern'),{attributes:true,attributeFilter:['class']});
  rootGamepadCursor();
  startServerStaminaLoop();
  if(typeof navigator.getGamepads==='function')gamepadFrame=requestAnimationFrame(pollXboxController);
  showScreen('#tavern');renderAll();resetServerNotebookTimer();startStaffSpeech();updateMusicControl();
})();
