/* 猫猫庄园停车：与酒馆共享 catCoins，开放五级庄园与两组测试车队。 */
(()=>{
  const $=selector=>document.querySelector(selector);
  const ESTATES=[
    {name:'一级庄园',subtitle:'温馨小筑',intro:'静谧小院，适合开始第一份停车事业。',unlockPrice:300,slots:1,image:'/assets/estate-parking/estate-1.png',variants:['c'],centers:[48]},
    {name:'二级庄园',subtitle:'庭院宅邸',intro:'拥有双车位的花园宅邸，收益空间翻倍。',unlockPrice:5000,slots:2,image:'/assets/estate-parking/estate-2.png',variants:['b','d'],centers:[35.4,64.5]},
    {name:'三级庄园',subtitle:'喷泉别墅',intro:'喷泉与灯光环绕，为三辆爱车预留席位。',unlockPrice:25000,slots:3,image:'/assets/estate-parking/estate-3.png',variants:['a','c','e'],centers:[29.1,50.1,71.2]},
    {name:'四级庄园',subtitle:'典藏庄园',intro:'双翼车库与典藏庭园，容纳四台珍藏座驾。',unlockPrice:100000,slots:4,image:'/assets/estate-parking/estate-4.png',variants:['a','b','d','e'],centers:[22.1,40.1,58.4,76.7]},
    {name:'五级庄园',subtitle:'金爪宫邸',intro:'金爪宫邸的五连车位，是顶级车主的终点。',unlockPrice:350000,slots:5,image:'/assets/estate-parking/estate-5.png',variants:['a','b','c','d','e'],centers:[16.6,33.4,49.6,65.6,81.5]}
  ];
  const SHOWROOM=[
    {key:'amg-g63',name:'奔驰 AMG G 63',model:'amg-g63-v2',modelClass:'amg-g63',category:'豪华 SUV',color:'曜石黑',priceRmb:2595500,priceCoins:26000,incomePerHour:1300,showroomImageScale:1.12},
    {key:'porsche-911-gt3',name:'保时捷 911 GT3',model:'porsche-911-gt3',modelClass:'porsche-911-gt3',category:'性能轿跑',color:'金属银',priceRmb:2268000,priceCoins:23000,incomePerHour:1150,showroomImageScale:1},
    {key:'revuelto',name:'兰博基尼 Revuelto',model:'revuelto-v2',modelClass:'revuelto',category:'超级跑车',color:'荧光绿',priceRmb:6294994,priceCoins:63000,incomePerHour:3150,showroomImageScale:1},
    {key:'bmw-3-series-gt',name:'宝马 3系GT',model:'bmw-3-series-gt',modelClass:'bmw-3-series-gt',category:'豪华轿车',color:'金属银',priceRmb:359800,priceCoins:4000,incomePerHour:200,showroomImageScale:1},
    {key:'rolls-royce-phantom',name:'劳斯莱斯 幻影',model:'rolls-royce-phantom',modelClass:'rolls-royce-phantom',category:'豪华轿车',color:'金属银',priceRmb:8470000,priceCoins:85000,incomePerHour:4250,showroomImageScale:1},
    {key:'bmw-m4-2025',name:'宝马 M4',model:'bmw-m4-2025',modelClass:'bmw-m4-2025',category:'性能轿跑',color:'金属银',priceRmb:893900,priceCoins:9000,incomePerHour:450,showroomImageScale:1},
    {key:'bmw-z4',name:'宝马 Z4',model:'bmw-z4',modelClass:'bmw-z4',category:'性能轿跑',color:'敞篷蓝',priceRmb:493900,priceCoins:5000,incomePerHour:250,showroomImageScale:1},
    {key:'porsche-panamera-gts',name:'保时捷 Panamera GTS',model:'porsche-panamera-gts',modelClass:'porsche-panamera-gts',category:'性能轿跑',color:'金属银',priceRmb:1498000,priceCoins:15000,incomePerHour:750,showroomImageScale:1},
    {key:'chevrolet-camaro-bumblebee',name:'雪佛兰 科迈罗 大黄蜂版',model:'chevrolet-camaro-bumblebee',modelClass:'chevrolet-camaro-bumblebee',category:'性能轿跑',color:'大黄蜂黄',priceRmb:399900,priceCoins:4000,incomePerHour:200,showroomImageScale:.8},
    {key:'mercedes-maybach',name:'奔驰 迈巴赫 S 480',model:'mercedes-maybach',modelClass:'mercedes-maybach',category:'豪华轿车',color:'曜石黑',priceRmb:1468000,priceCoins:15000,incomePerHour:750,showroomImageScale:1},
    {key:'mini-jcw',name:'MINI JCW',model:'mini-jcw',modelClass:'mini-jcw',category:'精品小车',color:'石墨灰',priceRmb:334800,priceCoins:3000,incomePerHour:150,showroomImageScale:.8},
    {key:'range-rover',name:'路虎 揽胜',model:'range-rover',modelClass:'range-rover',category:'豪华 SUV',color:'金属银',priceRmb:1412000,priceCoins:14000,incomePerHour:700,showroomImageScale:1.22},
    {key:'audi-e-tron-gt',name:'奥迪 e-tron GT',model:'audi-e-tron-gt',modelClass:'audi-e-tron-gt',category:'性能轿跑',color:'金属银',priceRmb:999800,priceCoins:10000,incomePerHour:500,showroomImageScale:1},
    {key:'ferrari-laferrari',name:'法拉利 LaFerrari',model:'ferrari-laferrari',modelClass:'ferrari-laferrari',category:'超级跑车',color:'法拉利红',priceRmb:22500000,priceCoins:225000,incomePerHour:11250,showroomImageScale:1},
    {key:'bentley-continental-gt',name:'宾利 欧陆 GT',model:'bentley-continental-gt',modelClass:'bentley-continental-gt',category:'性能轿跑',color:'金属银',priceRmb:3580000,priceCoins:36000,incomePerHour:1800,showroomImageScale:1},
    {key:'toyota-corolla',name:'丰田 卡罗拉',model:'toyota-corolla',modelClass:'toyota-corolla',category:'家用轿车',color:'金属银',priceRmb:120000,priceCoins:1000,incomePerHour:50,showroomImageScale:1},
    {key:'toyota-gr-supra',name:'丰田 GR Supra',model:'toyota-gr-supra',modelClass:'toyota-gr-supra',category:'性能轿跑',color:'亮黄色',priceRmb:500000,priceCoins:5000,incomePerHour:250,showroomImageScale:1},
    {key:'tesla-model-y',name:'特斯拉 Model Y',model:'tesla-model-y',modelClass:'tesla-model-y',category:'电动 SUV',color:'珍珠白',priceRmb:263500,priceCoins:3000,incomePerHour:150,showroomImageScale:1},
    {key:'tesla-cybertruck',name:'特斯拉 Cybertruck',model:'tesla-cybertruck',modelClass:'tesla-cybertruck',category:'电动皮卡',color:'不锈钢银灰',priceRmb:650000,priceCoins:7000,incomePerHour:350,showroomImageScale:1}
  ];
  // 旧命名仅保留在档案中，便于未来调整；所有玩家可见文本使用 name 与 englishName。
  const VEHICLE_NAMING_ARCHIVE=Object.freeze({
    'amg-g63':{legacyName:'奔驰 AMG G 63',name:'黑曜卫士',englishName:'Obsidian Guard'},
    'porsche-911-gt3':{legacyName:'保时捷 911 GT3',name:'银翼竞速',englishName:'Silverwing Sprint'},
    revuelto:{legacyName:'兰博基尼 Revuelto',name:'霓虹狂飙',englishName:'Neon Riptide'},
    'bmw-3-series-gt':{legacyName:'宝马 3系GT',name:'都市旅者',englishName:'Metro Voyager'},
    'rolls-royce-phantom':{legacyName:'劳斯莱斯 幻影',name:'月影皇座',englishName:'Moonshadow Crown'},
    'bmw-m4-2025':{legacyName:'宝马 M4',name:'雷霆双门',englishName:'Thunder Coupe'},
    'bmw-z4':{legacyName:'宝马 Z4',name:'蓝焰敞篷',englishName:'Azure Roadster'},
    'porsche-panamera-gts':{legacyName:'保时捷 Panamera GTS',name:'金影掠行',englishName:'Goldline Runner'},
    'chevrolet-camaro-bumblebee':{legacyName:'雪佛兰 科迈罗 大黄蜂版',name:'黄蜂战车',englishName:'Wasp Runner'},
    'mercedes-maybach':{legacyName:'奔驰 迈巴赫 S 480',name:'御座长廊',englishName:'Regal Avenue'},
    'mini-jcw':{legacyName:'MINI JCW',name:'疾风小炮',englishName:'Swift Pocket'},
    'range-rover':{legacyName:'路虎 揽胜',name:'峰境领航',englishName:'Summit Pathfinder'},
    'audi-e-tron-gt':{legacyName:'奥迪 e-tron GT',name:'电掣流光',englishName:'Voltstream'},
    'ferrari-laferrari':{legacyName:'法拉利 LaFerrari',name:'赤焰王冠',englishName:'Crimson Crown'},
    'bentley-continental-gt':{legacyName:'宾利 欧陆 GT',name:'璀璨巡航',englishName:'Velvet Voyager'},
    'toyota-corolla':{legacyName:'丰田 卡罗拉',name:'晨光家用',englishName:'Dawn Sedan'},
    'toyota-gr-supra':{legacyName:'丰田 GR Supra',name:'迅影街跑',englishName:'Shadow Sprint'},
    'tesla-model-y':{legacyName:'特斯拉 Model Y',name:'星途电行',englishName:'Nova Drive'},
    'tesla-cybertruck':{legacyName:'特斯拉 Cybertruck',name:'钢铁先锋',englishName:'Iron Vanguard'}
  });
  const CARS=[
    ...Array.from({length:5},(_,index)=>({id:`amg-g63-${index+1}`,name:'奔驰 AMG G 63',model:'amg-g63-v2',modelClass:'amg-g63',color:'曜石黑',number:String(index+1).padStart(2,'0')})),
    ...Array.from({length:5},(_,index)=>({id:`revuelto-${index+1}`,name:'兰博基尼 Revuelto',model:'revuelto-v2',modelClass:'revuelto',color:'荧光绿',number:String(index+6).padStart(2,'0')})),
    ...Array.from({length:5},(_,index)=>({id:`porsche-911-gt3-${index+1}`,name:'保时捷 911 GT3',model:'porsche-911-gt3',modelClass:'porsche-911-gt3',color:'金属银',number:String(index+11).padStart(2,'0')})),
    ...Array.from({length:5},(_,index)=>({id:`bmw-3-series-gt-${index+1}`,name:'宝马 3系GT',model:'bmw-3-series-gt',modelClass:'bmw-3-series-gt',color:'金属银',number:String(index+16).padStart(2,'0')})),
    ...Array.from({length:5},(_,index)=>({id:`rolls-royce-phantom-${index+1}`,name:'劳斯莱斯 幻影',model:'rolls-royce-phantom',modelClass:'rolls-royce-phantom',color:'金属银',number:String(index+21).padStart(2,'0')})),
    ...Array.from({length:5},(_,index)=>({id:`bmw-m4-2025-${index+1}`,name:'宝马 M4 2025',model:'bmw-m4-2025',modelClass:'bmw-m4-2025',color:'金属银',number:String(index+26).padStart(2,'0')})),
    ...Array.from({length:5},(_,index)=>({id:`bmw-z4-${index+1}`,name:'宝马 Z4',model:'bmw-z4',modelClass:'bmw-z4',color:'敞篷蓝',number:String(index+31).padStart(2,'0')})),
    ...Array.from({length:5},(_,index)=>({id:`porsche-panamera-gts-${index+1}`,name:'保时捷 Panamera GTS',model:'porsche-panamera-gts',modelClass:'porsche-panamera-gts',color:'金属银',number:String(index+36).padStart(2,'0')})),
    ...Array.from({length:5},(_,index)=>({id:`chevrolet-camaro-bumblebee-${index+1}`,name:'雪佛兰 科迈罗 大黄蜂版',model:'chevrolet-camaro-bumblebee',modelClass:'chevrolet-camaro-bumblebee',color:'大黄蜂黄',number:String(index+41).padStart(2,'0')})),
    ...Array.from({length:5},(_,index)=>({id:`mercedes-maybach-${index+1}`,name:'奔驰 迈巴赫',model:'mercedes-maybach',modelClass:'mercedes-maybach',color:'曜石黑',number:String(index+46).padStart(2,'0')})),
    ...Array.from({length:5},(_,index)=>({id:`mini-jcw-${index+1}`,name:'MINI JCW',model:'mini-jcw',modelClass:'mini-jcw',color:'石墨灰',number:String(index+51).padStart(2,'0')})),
    ...Array.from({length:5},(_,index)=>({id:`range-rover-${index+1}`,name:'路虎 揽胜',model:'range-rover',modelClass:'range-rover',color:'金属银',number:String(index+56).padStart(2,'0')})),
    ...Array.from({length:5},(_,index)=>({id:`audi-e-tron-gt-${index+1}`,name:'奥迪 e-tron GT',model:'audi-e-tron-gt',modelClass:'audi-e-tron-gt',color:'金属银',number:String(index+61).padStart(2,'0')})),
    ...Array.from({length:5},(_,index)=>({id:`ferrari-laferrari-${index+1}`,name:'法拉利 LaFerrari',model:'ferrari-laferrari',modelClass:'ferrari-laferrari',color:'法拉利红',number:String(index+66).padStart(2,'0')})),
    ...Array.from({length:5},(_,index)=>({id:`bentley-continental-gt-${index+1}`,name:'宾利 欧陆 GT',model:'bentley-continental-gt',modelClass:'bentley-continental-gt',color:'金属银',number:String(index+71).padStart(2,'0')})),
    ...Array.from({length:5},(_,index)=>({id:`toyota-corolla-${index+1}`,name:'丰田 卡罗拉',model:'toyota-corolla',modelClass:'toyota-corolla',color:'金属银',number:String(index+76).padStart(2,'0')})),
    ...Array.from({length:5},(_,index)=>({id:`toyota-gr-supra-${index+1}`,name:'丰田 GR Supra',model:'toyota-gr-supra',modelClass:'toyota-gr-supra',color:'亮黄色',number:String(index+81).padStart(2,'0')})),
    ...Array.from({length:5},(_,index)=>({id:`tesla-model-y-${index+1}`,name:'特斯拉 Model Y',model:'tesla-model-y',modelClass:'tesla-model-y',color:'珍珠白',number:String(index+86).padStart(2,'0')})),
    ...Array.from({length:5},(_,index)=>({id:`tesla-cybertruck-${index+1}`,name:'特斯拉 Cybertruck',model:'tesla-cybertruck',modelClass:'tesla-cybertruck',color:'不锈钢银灰',number:String(index+91).padStart(2,'0')}))
  ];
  const SAVE_KEY='catEstateParkingV2',LEGACY_KEY='catEstateParkingV1';
  const INCOME_PER_HOUR=1200,MAX_OFFLINE_MS=12*60*60*1000,SHOWROOM_TIER_ORDER=[
    {key:'A',label:'A级 · 顶级典藏',min:40001},
    {key:'B',label:'B级 · 豪华座驾',min:15001,max:40000},
    {key:'C',label:'C级 · 性能座驾',min:5001,max:15000},
    {key:'D',label:'D级 · 入门收藏',min:0,max:5000}
  ];
  const defaults=()=>({estate:0,unlocked:[],placements:[],purchases:[],unclaimed:0,totalEarned:0,lastUpdated:Date.now()});
  let state=load(),lastSave=0,entrySummaryTimer=0,entrySummaryHideTimer=0,purchaseFireworkFrame=0,purchaseFireworkTimer=0,purchaseFireworkCanvas=null;
  let estateAudioContext=null;
  const GLOBAL_BGM_MUTED_KEY='catGlobalBgmMutedV1',GLOBAL_BGM_VOLUME_KEY='catGlobalBgmVolumeV1',GLOBAL_SFX_ENABLED_KEY='tavernSfxEnabledV1',GLOBAL_SFX_VOLUME_KEY='tavernSfxVolumeV1',estateBgm=new Audio('/assets/audio/estate-bgm.mp3'),estateParkLock=new Audio('/assets/audio/estate-park-lock.mp3'),estateCollectCoins=new Audio('/assets/audio/estate-collect-coins.mp3');
  estateBgm.loop=true;estateBgm.preload='auto';estateParkLock.preload='auto';estateCollectCoins.preload='auto';let estateBgmUnlocked=false;

  const elements={
    screen:$('#estate'),scene:$('#estateScene'),image:$('#estateImage'),grid:$('#estateParkingGrid'),name:$('#estateName'),meta:$('#estateMeta'),estateToggle:$('#estateEstateToggle'),estateCount:$('#estateEstateCount'),coins:$('#estateCoins'),rate:$('#estateIncomeRate'),unclaimed:$('#estateUnclaimed'),collect:$('#estateCollect'),garageCount:$('#estateGarageCount'),entrySummary:$('#estateEntrySummary'),modal:$('#estateModal'),modalTitle:$('#estateModalTitle'),modalEyebrow:$('#estateModalEyebrow'),modalContent:$('#estateModalContent'),modalClose:$('#estateModalClose')
  };

  function load(){
    try{
      const saved=JSON.parse(localStorage.getItem(SAVE_KEY)||localStorage.getItem(LEGACY_KEY)||'null');
      if(!saved)return defaults();
      const result={...defaults(),...saved};
      result.estate=Math.max(0,Math.min(ESTATES.length-1,Number(result.estate)||0));
      const savedUnlocked=Array.isArray(saved.unlocked)?saved.unlocked:[result.estate];
      result.unlocked=[...new Set(savedUnlocked.map(Number).filter(index=>Number.isInteger(index)&&index>=0&&index<ESTATES.length))].sort((a,b)=>a-b);
      if(result.unlocked.length&&!result.unlocked.includes(result.estate))result.estate=result.unlocked[0];
      const purchaseIds=new Set();
      result.purchases=(Array.isArray(saved.purchases)?saved.purchases:[]).filter(item=>{
        const id=String(item?.id||'');return !!SHOWROOM.find(model=>model.key===item?.showroomKey)&&!!id&&!purchaseIds.has(id)&&(purchaseIds.add(id),true);
      }).map((item,index)=>({id:String(item.id),showroomKey:item.showroomKey,number:String(item.number||String(CARS.length+index+1).padStart(2,'0'))}));
      result.purchases.forEach(item=>{const car=showroomCar(item);if(car)CARS.push(car)});
      const legacySlot=saved.parkedSlot==null?null:Number(saved.parkedSlot);
      const candidates=Array.isArray(saved.placements)?saved.placements:(Number.isInteger(legacySlot)?[{slot:legacySlot,carId:'revuelto-1'}]:[]);
      const usedSlots=new Set(),usedCars=new Set();
      result.placements=candidates.filter(item=>{
        const slot=Number(item.slot),carId=String(item.carId||'');
        if(!Number.isInteger(slot)||slot<0||slot>=ESTATES[result.estate].slots||!CARS.some(car=>car.id===carId)||usedSlots.has(slot)||usedCars.has(carId))return false;
        item.slot=slot;item.carId=carId;usedSlots.add(slot);usedCars.add(carId);return true;
      }).map(item=>({slot:item.slot,carId:item.carId}));
      result.unclaimed=Math.max(0,Number(result.unclaimed)||0);result.totalEarned=Math.max(0,Number(result.totalEarned)||0);result.lastUpdated=Number(result.lastUpdated)||Date.now();return result;
    }catch{return defaults()}
  }

  function save(){state.lastUpdated=Date.now();localStorage.setItem(SAVE_KEY,JSON.stringify(state));lastSave=Date.now()}
  function currentEstate(){return ESTATES[state.estate]}
  function showroomModelForCar(car){return SHOWROOM.find(model=>model.modelClass===car?.modelClass)}
  function vehicleNaming(car){return VEHICLE_NAMING_ARCHIVE[car?.modelClass]}
  function displayCarName(car){return vehicleNaming(car)?.name||car?.name||'未命名车辆'}
  function displayCarEnglishName(car){return vehicleNaming(car)?.englishName||car?.englishName||''}
  function carIncome(car){const showroomModel=showroomModelForCar(car);return Math.max(0,Number(car?.incomePerHour)||Number(showroomModel?.incomePerHour)||INCOME_PER_HOUR)}
  function currentIncome(){return state.placements.reduce((total,placement)=>total+carIncome(carById(placement.carId)),0)}
  function sharedCoins(){return Math.max(0,Number(localStorage.getItem('catCoins')||480)||0)}
  function format(value){return Math.floor(Math.max(0,Number(value)||0)).toLocaleString('zh-CN')}
  function carById(id){return CARS.find(car=>car.id===id)}
  function showroomCar(purchase){const model=SHOWROOM.find(item=>item.key===purchase.showroomKey);return model?{id:purchase.id,name:displayCarName(model),englishName:displayCarEnglishName(model),model:model.model,modelClass:model.modelClass,color:model.color,incomePerHour:model.incomePerHour,number:purchase.number}:null}
  function placementForSlot(slot){return state.placements.find(item=>item.slot===slot)}
  function placementForCar(carId){return state.placements.find(item=>item.carId===carId)}
  function showScreen(selector){document.querySelectorAll('.screen').forEach(screen=>screen.classList.remove('active'));$(selector)?.classList.add('active')}
  function notify(message){const toast=$('#toast');if(!toast)return;toast.textContent=message;toast.classList.add('show');clearTimeout(notify.timer);notify.timer=setTimeout(()=>toast.classList.remove('show'),1800)}
  function estateSfxSettings(){const stored=localStorage.getItem(GLOBAL_SFX_VOLUME_KEY),raw=Number(stored);return{enabled:localStorage.getItem(GLOBAL_SFX_ENABLED_KEY)!=='0',volume:stored!==null&&Number.isFinite(raw)?Math.max(0,Math.min(1,raw)):.4}}
  function withEstateAudio(callback){
    const settings=estateSfxSettings();if(!settings.enabled||settings.volume<=0)return;
    const AudioEngine=window.AudioContext||window.webkitAudioContext;if(!AudioEngine)return;
    if(!estateAudioContext)estateAudioContext=new AudioEngine();
    const play=()=>callback(estateAudioContext,settings.volume);
    if(estateAudioContext.state==='suspended')estateAudioContext.resume().then(play).catch(()=>{});else play();
  }
  function estateBgmSettings(){const stored=localStorage.getItem(GLOBAL_BGM_VOLUME_KEY),raw=Number(stored);return{muted:localStorage.getItem(GLOBAL_BGM_MUTED_KEY)==='1',volume:stored!==null&&Number.isFinite(raw)?Math.max(0,Math.min(1,raw)):.2}}
  function syncEstateBgm(){const settings=estateBgmSettings(),playing=estateBgmUnlocked&&!settings.muted&&!document.hidden&&elements.screen.classList.contains('active');estateBgm.volume=settings.volume;if(playing)estateBgm.play().catch(()=>{});else estateBgm.pause()}
  function unlockEstateBgm(){estateBgmUnlocked=true;syncEstateBgm()}
  function estateTone(context,type,from,to,start,duration,peak,volume,filterFrequency){const osc=context.createOscillator(),gain=context.createGain(),filter=context.createBiquadFilter();osc.type=type;filter.type='lowpass';filter.frequency.setValueAtTime(filterFrequency||2200,start);osc.frequency.setValueAtTime(from,start);osc.frequency.exponentialRampToValueAtTime(Math.max(1,to),start+duration);gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(peak*volume,start+.018);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);osc.connect(filter).connect(gain).connect(context.destination);osc.start(start);osc.stop(start+duration+.02)}
  function estateNoise(context,start,duration,peak,volume,fromFrequency,toFrequency){const length=Math.ceil(context.sampleRate*duration),buffer=context.createBuffer(1,length,context.sampleRate),data=buffer.getChannelData(0),source=context.createBufferSource(),filter=context.createBiquadFilter(),gain=context.createGain();for(let i=0;i<length;i++)data[i]=(Math.random()*2-1)*(1-i/length);source.buffer=buffer;filter.type='lowpass';filter.frequency.setValueAtTime(fromFrequency,start);filter.frequency.exponentialRampToValueAtTime(toFrequency,start+duration);gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(peak*volume,start+.015);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);source.connect(filter).connect(gain).connect(context.destination);source.start(start);source.stop(start+duration+.02)}
  function engineRev(){const settings=estateSfxSettings();if(!settings.enabled||settings.volume<=0)return;const sound=estateParkLock.cloneNode(true);sound.volume=Math.min(.72,settings.volume*.96);sound.currentTime=0;sound.play().catch(()=>{})}
  function coinClatter(){const settings=estateSfxSettings();if(!settings.enabled||settings.volume<=0)return;const sound=estateCollectCoins.cloneNode(true);sound.volume=Math.min(.76,settings.volume);sound.currentTime=0;sound.play().catch(()=>{})}
  function purchaseFanfare(){withEstateAudio((context,volume)=>{const now=context.currentTime;[[523,.0],[659,.1],[784,.2],[1047,.32]].forEach(([pitch,delay],index)=>{estateTone(context,'triangle',pitch,pitch*1.02,now+delay,index===3?.38:.2,index===3?.12:.075,volume,2600)});estateNoise(context,now+.31,.3,.045,volume,5200,2600)})}
  function estateRumble(kind){window.catGamepadRumble?.(kind)}
  function updateEconomy(){const now=Date.now(),elapsed=Math.max(0,Math.min(MAX_OFFLINE_MS,now-state.lastUpdated));if(currentIncome())state.unclaimed+=currentIncome()*elapsed/3600000;state.lastUpdated=now;if(now-lastSave>10000)save()}
  function carImage(car,variant,className='estate-parking-car'){
    const isG63=car.modelClass==='amg-g63';
    const asset=isG63&&variant==='a'?'amg-g63-v5-a-candidate':isG63&&variant==='b'?'amg-g63-v2-d':isG63&&variant==='e'?'amg-g63-v5-a-candidate':`${car.model}-${variant}`;
    const mirrored=isG63&&(variant==='b'||variant==='e')?' mirrored':'';
    const showroomScale=className.includes('estate-showroom-car')?Math.max(.5,Math.min(1.5,Number(car.showroomImageScale)||1)):1;
    return `<img class="${className} variant-${variant} model-${car.modelClass}${mirrored}"${className.includes('estate-showroom-car')?` style="--showroom-image-scale:${showroomScale}"`:''} src="/assets/estate-parking/${asset}.png" alt="${displayCarName(car)}">`;
  }

  function renderParking(){
    const estate=currentEstate(),owned=state.unlocked.includes(state.estate);
    elements.grid.innerHTML=Array.from({length:estate.slots},(_,index)=>{
      const placement=placementForSlot(index),car=placement&&carById(placement.carId),variant=estate.variants[index];
      return `<button class="estate-slot ${placement?'occupied':'empty'} ${owned?'':'locked'}" type="button" data-slot="${index}" ${owned?'':'disabled'} style="--slot-x:${estate.centers[index]}%" aria-label="${owned?`${index+1}号${placement?`停放 ${displayCarName(car)} ${car.number}`:'空'}车位`:'庄园尚未解锁'}"><span class="estate-slot-label">P${index+1} · ${variant.toUpperCase()}</span>${placement?`${carImage(car,variant)}<i class="estate-car-number">${car.number}</i>`:''}</button>`;
    }).join('');
  }

  function renderEconomy(){
    const parked=state.placements.length,available=CARS.length-parked;
    elements.coins.textContent=format(sharedCoins());elements.rate.textContent=`${format(currentIncome())}/小时`;elements.unclaimed.textContent=format(state.unclaimed);elements.collect.disabled=state.unclaimed<1;elements.garageCount.textContent=`${available} 辆可用 / ${CARS.length} 辆`;
  }

  function showEntrySummary(){
    if(!elements.entrySummary||!state.unlocked.includes(state.estate))return;
    const parked=state.placements.length,available=CARS.length-parked,hero=[...CARS].sort((a,b)=>(showroomModelForCar(b)?.priceCoins||0)-(showroomModelForCar(a)?.priceCoins||0))[0]||CARS[0];
    const names=[...new Set(CARS.map(car=>displayCarName(car)))].slice(0,2).join(' · ');
    elements.entrySummary.innerHTML=`${carImage(hero,'c','estate-entry-car')}<span><small>已拥有 ${CARS.length} 辆豪车</small><b>${names}</b><em>${parked?`${parked} 辆停放中 · ${available} 辆在车库`:`${available} 辆车辆待命`}</em></span>`;
    clearTimeout(entrySummaryTimer);clearTimeout(entrySummaryHideTimer);elements.entrySummary.hidden=false;elements.entrySummary.classList.remove('is-visible');
    requestAnimationFrame(()=>elements.entrySummary.classList.add('is-visible'));
    entrySummaryTimer=setTimeout(()=>elements.entrySummary.classList.remove('is-visible'),5000);
    entrySummaryHideTimer=setTimeout(()=>{elements.entrySummary.hidden=true},5150);
  }

  function render(){
    const estate=currentEstate(),owned=state.unlocked.includes(state.estate);
    elements.scene.className=`estate-scene estate-level-${state.estate+1}`;elements.image.src=estate.image;elements.image.alt=`${estate.name}像素场景与门前${estate.slots}个车位`;elements.name.textContent=estate.name;elements.meta.textContent=`${estate.subtitle} · ${estate.slots} 个车位${owned?'':' · 未解锁预览'}`;elements.estateCount.textContent=`${estate.name} · ${estate.slots}车位`;renderEconomy();renderParking();
  }

  function selectEstate(index){if(!ESTATES[index])return;if(!state.unlocked.includes(index)){notify(`${ESTATES[index].name}尚未解锁`);return}if(index===state.estate){closeModal();return}updateEconomy();state.estate=index;state.placements=[];save();render();closeModal();notify(`已切换至${currentEstate().name}，车辆全部回到车库`)}
  function unlockEstate(index){
    const estate=ESTATES[index];if(!estate)return;if(state.unlocked.includes(index)){selectEstate(index);return}
    const balance=sharedCoins();if(balance<estate.unlockPrice){notify(`猫猫币不足，还差 ${format(estate.unlockPrice-balance)} 猫猫币`);return}
    localStorage.setItem('catCoins',String(balance-estate.unlockPrice));state.unlocked.push(index);state.unlocked.sort((a,b)=>a-b);state.estate=index;state.placements=[];save();render();openEstateCatalog(index);window.dispatchEvent(new CustomEvent('cat-estate-coins-changed',{detail:{coins:balance-estate.unlockPrice}}));notify(`${estate.name} 已解锁`);
  }

  function garageCard(car,{targetSlot=null}={}){
    const placement=placementForCar(car.id),isTarget=placement?.slot===targetSlot,purchase=state.purchases.find(item=>item.id===car.id),showroomOwned=!!purchase,model=purchase&&SHOWROOM.find(item=>item.key===purchase.showroomKey),resaleValue=model?Math.round(model.priceCoins/3):0;let action='';
    if(targetSlot!=null){
      if(placement&&!isTarget)action=`<button type="button" disabled>P${placement.slot+1} 停放中</button>`;
      else if(isTarget)action='<button type="button" class="current" disabled>当前车辆</button>';
      else action=`<button type="button" data-assign-car="${car.id}" data-slot="${targetSlot}">停入 P${targetSlot+1}</button>`;
    }else action=`<span class="garage-status ${placement?'parked':''}">${placement?`P${placement.slot+1} 停放中`:'车库待命'}</span>${showroomOwned?`<button type="button" class="sell" data-sell-car="${car.id}" ${placement?'disabled':''}>${placement?'先驶回车库':`出售 · ${format(resaleValue)} 猫猫币`}</button>`:''}`;
    return `<article class="estate-garage-card">${carImage(car,'c','estate-garage-car')}<i>NO.${car.number}</i><div><small>${displayCarEnglishName(car)} · ${showroomOwned?'SHOWROOM PURCHASE':'TEST VEHICLE'}</small><b>${displayCarName(car)}</b><span>${car.color} · 每小时 +${format(carIncome(car))} 猫猫币</span>${action}</div></article>`;
  }

  function showModal(title,eyebrow,content){elements.modalContent.classList.remove('estate-catalog-modal-content');elements.modal.querySelector('section')?.classList.remove('estate-catalog-modal','estate-purchase-modal');elements.modalTitle.textContent=title;elements.modalEyebrow.textContent=eyebrow;elements.modalContent.innerHTML=content;elements.modal.hidden=false;requestAnimationFrame(()=>elements.modal.classList.add('open'));elements.modalClose.focus()}
  function stopPurchaseFireworks(){if(purchaseFireworkFrame)cancelAnimationFrame(purchaseFireworkFrame);clearTimeout(purchaseFireworkTimer);purchaseFireworkFrame=0;purchaseFireworkTimer=0;purchaseFireworkCanvas?.remove();purchaseFireworkCanvas=null}
  function startPurchaseFireworks(){stopPurchaseFireworks();if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;const canvas=document.createElement('canvas'),context=canvas.getContext('2d'),bursts=[{x:.22,y:.38,delay:0,hue:12},{x:.76,y:.29,delay:360,hue:46},{x:.53,y:.2,delay:740,hue:4},{x:.85,y:.59,delay:960,hue:285}],particles=[];canvas.className='estate-purchase-fireworks';elements.modal.append(canvas);purchaseFireworkCanvas=canvas;const resize=()=>{const rect=elements.modal.getBoundingClientRect(),scale=Math.min(2,window.devicePixelRatio||1);canvas.width=Math.max(1,Math.round(rect.width*scale));canvas.height=Math.max(1,Math.round(rect.height*scale));canvas.style.width=`${rect.width}px`;canvas.style.height=`${rect.height}px`;context.setTransform(scale,0,0,scale,0,0)};resize();const started=performance.now(),launch=burst=>{const rect=elements.modal.getBoundingClientRect(),count=74;for(let index=0;index<count;index++){const angle=(Math.PI*2*index/count)+(Math.random()-.5)*.07,speed=2.1+Math.random()*3.7;particles.push({x:rect.width*burst.x,y:rect.height*burst.y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:0,max:820+Math.random()*520,hue:(burst.hue+Math.random()*18)%360,size:Math.random()<.18?3:1.5})}particles.push({x:rect.width*burst.x,y:rect.height*burst.y,vx:0,vy:0,life:0,max:260,hue:52,size:18,flash:true})};const fired=new Set(),draw=now=>{const elapsed=now-started;bursts.forEach((burst,index)=>{if(elapsed>=burst.delay&&!fired.has(index)){fired.add(index);launch(burst)}});context.clearRect(0,0,canvas.width,canvas.height);context.globalCompositeOperation='lighter';for(let index=particles.length-1;index>=0;index--){const particle=particles[index];particle.life+=16;if(particle.life>=particle.max){particles.splice(index,1);continue}const alpha=1-particle.life/particle.max;if(particle.flash){context.fillStyle=`hsla(${particle.hue},100%,75%,${alpha*.38})`;context.beginPath();context.arc(particle.x,particle.y,particle.size*(1-alpha*.55),0,Math.PI*2);context.fill();continue}const previousX=particle.x,previousY=particle.y;particle.x+=particle.vx;particle.y+=particle.vy;particle.vx*=.988;particle.vy=particle.vy*.988+.06;context.strokeStyle=`hsla(${particle.hue},100%,${particle.hue>35&&particle.hue<70?72:64}%,${alpha})`;context.lineWidth=particle.size;context.beginPath();context.moveTo(previousX,previousY);context.lineTo(particle.x,particle.y);context.stroke();if(particle.life<180){context.fillStyle=`hsla(52,100%,92%,${alpha})`;context.fillRect(particle.x-1,particle.y-1,2,2)}}context.globalCompositeOperation='source-over';if(elapsed<2450||particles.length)purchaseFireworkFrame=requestAnimationFrame(draw);else stopPurchaseFireworks()};purchaseFireworkFrame=requestAnimationFrame(draw);purchaseFireworkTimer=setTimeout(stopPurchaseFireworks,3300)}
  function startPurchaseFireworks(){stopPurchaseFireworks();if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;const canvas=document.createElement('canvas'),context=canvas.getContext('2d'),particles=[];canvas.className='estate-purchase-fireworks';elements.modal.append(canvas);purchaseFireworkCanvas=canvas;const modalRect=elements.modal.getBoundingClientRect(),scale=Math.min(2,window.devicePixelRatio||1);canvas.width=Math.max(1,Math.round(modalRect.width*scale));canvas.height=Math.max(1,Math.round(modalRect.height*scale));canvas.style.width=`${modalRect.width}px`;canvas.style.height=`${modalRect.height}px`;context.setTransform(scale,0,0,scale,0,0);const panelRect=elements.modal.querySelector('.estate-purchase-modal')?.getBoundingClientRect()||modalRect,clamp=(value,min,max)=>Math.max(min,Math.min(max,value)),left=panelRect.left-modalRect.left,right=panelRect.right-modalRect.left,top=panelRect.top-modalRect.top,bottom=panelRect.bottom-modalRect.top,centerX=(left+right)/2,centerY=(top+bottom)/2,point=(x,y,delay,hue)=>({x:clamp(x,14,modalRect.width-14),y:clamp(y,14,modalRect.height-14),delay,hue}),bursts=[point(left-12,top+28,0,8),point(right+12,top+24,150,48),point(centerX,top-18,300,4),point(left-18,centerY-20,460,330),point(right+18,centerY-28,610,50),point(left-10,bottom-30,760,9),point(right+12,bottom-26,910,44),point(centerX,bottom+14,1060,290),point(centerX,top+48,1220,15)];const launch=burst=>{for(let index=0;index<62;index++){const angle=(Math.PI*2*index/62)+(Math.random()-.5)*.08,speed=2.1+Math.random()*4.1;particles.push({x:burst.x,y:burst.y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,age:0,max:900+Math.random()*610,hue:(burst.hue+Math.random()*22)%360,size:Math.random()<.18?2.6:1.25})}particles.push({x:burst.x,y:burst.y,vx:0,vy:0,age:0,max:260,hue:52,size:20,flash:true})};const fired=new Set(),started=performance.now();let previous=started;const draw=now=>{const elapsed=now-started,delta=Math.min(32,now-previous),step=delta/16;previous=now;bursts.forEach((burst,index)=>{if(elapsed>=burst.delay&&!fired.has(index)){fired.add(index);launch(burst)}});context.clearRect(0,0,modalRect.width,modalRect.height);context.globalCompositeOperation='lighter';for(let index=particles.length-1;index>=0;index--){const particle=particles[index];particle.age+=delta;if(particle.age>=particle.max){particles.splice(index,1);continue}const alpha=1-particle.age/particle.max;if(particle.flash){context.fillStyle=`hsla(${particle.hue},100%,78%,${alpha*.4})`;context.beginPath();context.arc(particle.x,particle.y,particle.size*(1-alpha*.55),0,Math.PI*2);context.fill();continue}const oldX=particle.x,oldY=particle.y;particle.x+=particle.vx*step;particle.y+=particle.vy*step;particle.vx*=.988;particle.vy=particle.vy*.988+.06*step;context.strokeStyle=`hsla(${particle.hue},100%,${particle.hue>35&&particle.hue<70?74:66}%,${alpha})`;context.lineWidth=particle.size;context.beginPath();context.moveTo(oldX,oldY);context.lineTo(particle.x,particle.y);context.stroke();if(particle.age<170){context.fillStyle=`hsla(52,100%,95%,${alpha})`;context.fillRect(particle.x-1,particle.y-1,2,2)}}context.globalCompositeOperation='source-over';if(elapsed<3300||particles.length)purchaseFireworkFrame=requestAnimationFrame(draw);else stopPurchaseFireworks()};purchaseFireworkFrame=requestAnimationFrame(draw);purchaseFireworkTimer=setTimeout(stopPurchaseFireworks,4300)}
  function startPurchaseFireworksAroundPanel(){stopPurchaseFireworks();if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;const panel=elements.modal.querySelector('.estate-purchase-modal');if(!panel)return;const canvas=document.createElement('canvas'),context=canvas.getContext('2d'),particles=[],bleed=145,panelRect=panel.getBoundingClientRect(),width=panelRect.width+bleed*2,height=panelRect.height+bleed*2,scale=Math.min(2,window.devicePixelRatio||1);canvas.className='estate-purchase-fireworks';canvas.width=Math.round(width*scale);canvas.height=Math.round(height*scale);canvas.style.width=`${width}px`;canvas.style.height=`${height}px`;context.setTransform(scale,0,0,scale,0,0);panel.append(canvas);purchaseFireworkCanvas=canvas;const left=bleed,right=bleed+panelRect.width,top=bleed,bottom=bleed+panelRect.height,centerX=(left+right)/2,centerY=(top+bottom)/2,bursts=[{x:left-20,y:top+28,delay:0,hue:8},{x:right+20,y:top+26,delay:150,hue:48},{x:centerX,y:top-26,delay:300,hue:4},{x:left-28,y:centerY-28,delay:450,hue:330},{x:right+28,y:centerY-24,delay:600,hue:50},{x:left-18,y:bottom-28,delay:750,hue:10},{x:right+18,y:bottom-25,delay:900,hue:44},{x:centerX,y:bottom+28,delay:1050,hue:285},{x:centerX,y:top+48,delay:1200,hue:14}];const launch=burst=>{for(let index=0;index<62;index++){const angle=(Math.PI*2*index/62)+(Math.random()-.5)*.08,speed=2.1+Math.random()*4.1;particles.push({x:burst.x,y:burst.y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,age:0,max:900+Math.random()*610,hue:(burst.hue+Math.random()*22)%360,size:Math.random()<.18?2.6:1.25})}particles.push({x:burst.x,y:burst.y,vx:0,vy:0,age:0,max:260,hue:52,size:20,flash:true})};const fired=new Set(),started=performance.now();let previous=started;const draw=now=>{const elapsed=now-started,delta=Math.min(32,now-previous),step=delta/16;previous=now;bursts.forEach((burst,index)=>{if(elapsed>=burst.delay&&!fired.has(index)){fired.add(index);launch(burst)}});context.clearRect(0,0,width,height);context.globalCompositeOperation='lighter';for(let index=particles.length-1;index>=0;index--){const particle=particles[index];particle.age+=delta;if(particle.age>=particle.max){particles.splice(index,1);continue}const alpha=1-particle.age/particle.max;if(particle.flash){context.fillStyle=`hsla(${particle.hue},100%,78%,${alpha*.4})`;context.beginPath();context.arc(particle.x,particle.y,particle.size*(1-alpha*.55),0,Math.PI*2);context.fill();continue}const oldX=particle.x,oldY=particle.y;particle.x+=particle.vx*step;particle.y+=particle.vy*step;particle.vx*=.988;particle.vy=particle.vy*.988+.06*step;context.strokeStyle=`hsla(${particle.hue},100%,${particle.hue>35&&particle.hue<70?74:66}%,${alpha})`;context.lineWidth=particle.size;context.beginPath();context.moveTo(oldX,oldY);context.lineTo(particle.x,particle.y);context.stroke();if(particle.age<170){context.fillStyle=`hsla(52,100%,95%,${alpha})`;context.fillRect(particle.x-1,particle.y-1,2,2)}}context.globalCompositeOperation='source-over';if(elapsed<3300||particles.length)purchaseFireworkFrame=requestAnimationFrame(draw);else stopPurchaseFireworks()};purchaseFireworkFrame=requestAnimationFrame(draw);purchaseFireworkTimer=setTimeout(stopPurchaseFireworks,4300)}
  function closeModal(){stopPurchaseFireworks();elements.modal.classList.remove('open');setTimeout(()=>{elements.modal.hidden=true},140)}
  function openEstateCatalog(selected=state.estate){
    const index=Math.max(0,Math.min(ESTATES.length-1,Number(selected)||0)),estate=ESTATES[index],unlocked=state.unlocked.includes(index),active=index===state.estate;
    const tabs=ESTATES.map((item,itemIndex)=>`<button type="button" class="${itemIndex===index?'active':''}" data-estate-preview="${itemIndex}" aria-pressed="${itemIndex===index}">${itemIndex+1}级</button>`).join('');
    const action=unlocked?`<button type="button" class="estate-catalog-action travel" data-select-estate="${index}" ${active?'disabled':''}>${active?'当前庄园':'前往庄园'}</button>`:`<button type="button" class="estate-catalog-action unlock" data-unlock-estate="${index}">解锁庄园 · ${format(estate.unlockPrice)} 猫猫币</button>`;
    showModal('庄园图鉴','PAW ESTATE · 选择梦想豪宅',`<div class="estate-catalog-tabs">${tabs}</div><section class="estate-catalog-detail"><img src="${estate.image}" alt="${estate.name}豪宅场景"><div><b>${estate.name}—${estate.subtitle}</b><p>${estate.intro}</p>${action}</div></section>`);elements.modalContent.classList.add('estate-catalog-modal-content');elements.modal.querySelector('section')?.classList.add('estate-catalog-modal');
  }
  function garageGroupsMarkup(targetSlot=null){return SHOWROOM_TIER_ORDER.map(tier=>{const cars=CARS.filter(car=>{const model=showroomModelForCar(car);return model&&model.priceCoins>=tier.min&&(tier.max==null||model.priceCoins<=tier.max)}).sort((a,b)=>{const price=showroomModelForCar(b).priceCoins-showroomModelForCar(a).priceCoins;return price||a.number.localeCompare(b.number)});if(!cars.length)return '';const options=targetSlot==null?{}:{targetSlot};return `<section class="estate-garage-group"><h3>${tier.label} <small>${cars.length} 辆</small></h3><div class="estate-garage-list">${cars.map(car=>garageCard(car,options)).join('')}</div></section>`}).join('')}
  function openGarage(){const parked=state.placements.length,groups=garageGroupsMarkup();showModal('我的车库',`${CARS.length} 辆收藏 · A–D 价格分级`,`<div class="estate-garage-summary"><b>豪华车库</b><span>展厅购入 ${state.purchases.length} 辆 · ${parked} 辆停放中</span></div><div class="estate-garage-groups">${groups}</div>`)}

  function openShowroom(){
    const groups=SHOWROOM_TIER_ORDER.map(tier=>{const models=SHOWROOM.filter(model=>model.priceCoins>=tier.min&&(tier.max==null||model.priceCoins<=tier.max)).sort((a,b)=>b.priceCoins-a.priceCoins);if(!models.length)return '';const cards=models.map(model=>`<article class="estate-showroom-card">${carImage(model,'c','estate-showroom-car')}<div><small>${model.category} · ${displayCarEnglishName(model)}</small><b>${displayCarName(model)}</b><em>${format(model.priceCoins)} 猫猫币</em><span class="estate-showroom-income">停车收益 · ${format(model.incomePerHour)}/小时</span><button type="button" data-buy-showroom="${model.key}">购买</button></div></article>`).join('');return `<section class="estate-showroom-group"><h3>${tier.label}</h3><div class="estate-showroom-grid">${cards}</div></section>`}).join('');
    showModal('名车展厅','按价格分为 A–D 级 · 同级由高到低',`<div class="estate-showroom-groups">${groups}</div>`);
  }

  function openParkingPicker(slot){
    if(!Number.isInteger(slot)||slot<0||slot>=currentEstate().slots)return;
    const current=placementForSlot(slot),currentCar=current&&carById(current.carId),occupied=current?`<div class="estate-current-car"><span>P${slot+1} 当前停放</span><b>${displayCarName(currentCar)} · NO.${currentCar.number}</b><button type="button" data-unpark-slot="${slot}">驶回车库</button></div>`:'';
    showModal(`为 P${slot+1} 选择车辆`,`${currentEstate().name.toUpperCase()} · ${currentEstate().variants[slot].toUpperCase()} ANGLE`,`${occupied}<p class="estate-picker-hint">车库中的 ${CARS.length} 辆车按 A–D 价格分级显示；已停放的车辆会标出所在车位。</p><div class="estate-garage-groups picker">${garageGroupsMarkup(slot)}</div>`);
  }

  function assignCar(carId,slot){if(!carById(carId)||placementForCar(carId)||slot<0||slot>=currentEstate().slots)return;engineRev();estateRumble('estatePark');updateEconomy();state.placements=state.placements.filter(item=>item.slot!==slot);state.placements.push({slot,carId});save();render();closeModal();notify(`${carById(carId).name} NO.${carById(carId).number} 已停入 P${slot+1}`)}
  function buyShowroomCar(key){
    const model=SHOWROOM.find(item=>item.key===key);if(!model)return;
    const balance=sharedCoins();if(balance<model.priceCoins){notify(`猫猫币不足，还差 ${format(model.priceCoins-balance)} 猫猫币`);return}
    const purchase={id:`showroom-${key}-${Date.now()}`,showroomKey:key,number:String(CARS.length+1).padStart(2,'0')},car=showroomCar(purchase);
    localStorage.setItem('catCoins',String(balance-model.priceCoins));state.purchases.push(purchase);CARS.push(car);save();render();window.dispatchEvent(new CustomEvent('cat-estate-coins-changed',{detail:{coins:balance-model.priceCoins}}));purchaseFanfare();openPurchaseCelebration(car);notify(`${displayCarName(model)} 已加入车库`);
  }
  function sellGarageCar(carId){const purchaseIndex=state.purchases.findIndex(item=>item.id===carId),car=carById(carId);if(purchaseIndex<0||!car)return;if(placementForCar(carId)){notify('请先将该车辆驶回车库');return}const purchase=state.purchases[purchaseIndex],model=SHOWROOM.find(item=>item.key===purchase.showroomKey);if(!model)return;const value=Math.round(model.priceCoins/3),balance=sharedCoins()+value;state.purchases.splice(purchaseIndex,1);const carIndex=CARS.findIndex(item=>item.id===carId);if(carIndex>=0)CARS.splice(carIndex,1);localStorage.setItem('catCoins',String(balance));save();render();window.dispatchEvent(new CustomEvent('cat-estate-coins-changed',{detail:{coins:balance,amount:value}}));openGarage();notify(`${displayCarName(car)} 已售出，获得 ${format(value)} 猫猫币`)}
  function openPurchaseCelebration(car){showModal('购车成功','NEW CAR · 车辆已入库',`<section class="estate-purchase-celebration"><div class="estate-purchase-vehicle">${carImage(car,'c','estate-purchase-car')}</div><div class="estate-purchase-copy"><small>${displayCarEnglishName(car)}</small><b>${displayCarName(car)}</b><p>车辆编号　NO.${car.number}</p></div><button type="button" data-open-garage>前往车库</button></section>`);elements.modal.querySelector('section')?.classList.add('estate-purchase-modal');startPurchaseFireworksAroundPanel();estateRumble('estateCelebrate')}
  function unparkSlot(slot){const placement=placementForSlot(slot);if(!placement)return;estateRumble('estatePark');updateEconomy();state.placements=state.placements.filter(item=>item.slot!==slot);save();render();closeModal();notify(`NO.${carById(placement.carId).number} 已驶回车库`)}

  function collect(){updateEconomy();const amount=Math.floor(state.unclaimed);if(amount<1)return;coinClatter();estateRumble('estateCollect');state.unclaimed-=amount;state.totalEarned+=amount;const balance=sharedCoins()+amount;localStorage.setItem('catCoins',String(balance));save();renderEconomy();window.dispatchEvent(new CustomEvent('cat-estate-coins-changed',{detail:{coins:balance,amount}}));notify(`停车费 +${format(amount)} 猫猫币`)}
  function enter(){unlockEstateBgm();updateEconomy();render();showScreen('#estate');syncEstateBgm();if(state.unlocked.includes(state.estate))showEntrySummary();else{openEstateCatalog(state.estate);notify('先解锁你的第一座庄园')}}
  function leave(){updateEconomy();save();closeModal();estateBgm.pause();if(window.catTavernEstate?.returnToTavern)window.catTavernEstate.returnToTavern();else showScreen('#tavern')}

  elements.estateToggle.addEventListener('click',()=>openEstateCatalog(state.estate));
  elements.grid.addEventListener('click',event=>{const button=event.target.closest('[data-slot]');if(button)openParkingPicker(Number(button.dataset.slot))});
  elements.modalContent.addEventListener('click',event=>{const assign=event.target.closest('[data-assign-car]'),unpark=event.target.closest('[data-unpark-slot]'),buy=event.target.closest('[data-buy-showroom]'),preview=event.target.closest('[data-estate-preview]'),unlock=event.target.closest('[data-unlock-estate]'),select=event.target.closest('[data-select-estate]'),garage=event.target.closest('[data-open-garage]'),sell=event.target.closest('[data-sell-car]');if(assign)assignCar(assign.dataset.assignCar,Number(assign.dataset.slot));else if(unpark)unparkSlot(Number(unpark.dataset.unparkSlot));else if(buy)buyShowroomCar(buy.dataset.buyShowroom);else if(preview)openEstateCatalog(Number(preview.dataset.estatePreview));else if(unlock)unlockEstate(Number(unlock.dataset.unlockEstate));else if(select)selectEstate(Number(select.dataset.selectEstate));else if(garage)openGarage();else if(sell)sellGarageCar(sell.dataset.sellCar)});
  let collectHandledByPointer=false;
  elements.collect.addEventListener('pointerdown',event=>{if(event.button!==0)return;event.preventDefault();event.stopPropagation();collectHandledByPointer=true;collect()});
  elements.collect.addEventListener('click',()=>{if(collectHandledByPointer){collectHandledByPointer=false;return}collect()});$('#estateGarage').addEventListener('click',openGarage);$('#estateShowroom').addEventListener('click',openShowroom);$('#estateBack').addEventListener('click',leave);elements.modalClose.addEventListener('click',closeModal);elements.modal.addEventListener('pointerdown',event=>{if(event.target===elements.modal)closeModal()});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!elements.modal.hidden)closeModal()});document.addEventListener('pointerdown',unlockEstateBgm,{once:true});
  window.addEventListener('cat-global-bgm-change',syncEstateBgm);window.addEventListener('storage',event=>{if(event.key==='catCoins')renderEconomy();if([GLOBAL_BGM_MUTED_KEY,GLOBAL_BGM_VOLUME_KEY].includes(event.key))syncEstateBgm()});document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){updateEconomy();save()}else if(elements.screen.classList.contains('active')){updateEconomy();renderEconomy()}syncEstateBgm()});window.addEventListener('beforeunload',()=>{updateEconomy();save()});setInterval(()=>{if(elements.screen.classList.contains('active')){updateEconomy();renderEconomy()}},1000);

  window.catEstateGame={enter,leave,render,openGarage};
  render();if(location.hash==='#estate')enter();
})();
