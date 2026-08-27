/* 猫猫庄园停车：与酒馆共享 catCoins，开放五级庄园与两组测试车队。 */
(()=>{
  const $=selector=>document.querySelector(selector);
  const ESTATES=[
    {name:'一级庄园',subtitle:'温馨小筑',intro:'静谧小院，适合开始第一份停车事业。',unlockPrice:300,slots:1,image:'/assets/estate-parking/estate-1.png',variants:['c'],centers:[50]},
    {name:'二级庄园',subtitle:'庭院宅邸',intro:'拥有双车位的花园宅邸，收益空间翻倍。',unlockPrice:5000,slots:2,image:'/assets/estate-parking/estate-2.png',variants:['b','d'],centers:[35.4,64.5]},
    {name:'三级庄园',subtitle:'喷泉别墅',intro:'喷泉与灯光环绕，为三辆爱车预留席位。',unlockPrice:25000,slots:3,image:'/assets/estate-parking/estate-3.png',variants:['a','c','e'],centers:[29.1,50.1,71.2]},
    {name:'四级庄园',subtitle:'典藏庄园',intro:'双翼车库与典藏庭园，容纳四台珍藏座驾。',unlockPrice:100000,slots:4,image:'/assets/estate-parking/estate-4.png',variants:['a','b','d','e'],centers:[22.1,40.1,58.4,76.7]},
    {name:'五级庄园',subtitle:'金爪宫邸',intro:'金爪宫邸的五连车位，是顶级车主的终点。',unlockPrice:350000,slots:5,image:'/assets/estate-parking/estate-5.png',variants:['a','b','c','d','e'],centers:[16.6,33.4,49.6,65.6,81.5]}
  ];
  const SHOWROOM=[
    {key:'amg-g63',name:'奔驰 AMG G 63',model:'amg-g63-v2',modelClass:'amg-g63',color:'曜石黑',priceRmb:2595500,priceCoins:26000},
    {key:'porsche-911-gt3',name:'保时捷 911 GT3',model:'porsche-911-gt3',modelClass:'porsche-911-gt3',color:'金属银',priceRmb:2268000,priceCoins:23000},
    {key:'revuelto',name:'兰博基尼 Revuelto',model:'revuelto-v2',modelClass:'revuelto',color:'荧光绿',priceRmb:6294994,priceCoins:63000},
    {key:'bmw-3-series-gt',name:'宝马 3系GT',model:'bmw-3-series-gt',modelClass:'bmw-3-series-gt',color:'金属银',priceRmb:359800,priceCoins:4000},
    {key:'rolls-royce-phantom',name:'劳斯莱斯 幻影',model:'rolls-royce-phantom',modelClass:'rolls-royce-phantom',color:'金属银',priceRmb:8470000,priceCoins:85000},
    {key:'bmw-m4-2025',name:'宝马 M4',model:'bmw-m4-2025',modelClass:'bmw-m4-2025',color:'金属银',priceRmb:893900,priceCoins:9000},
    {key:'bmw-z4',name:'宝马 Z4',model:'bmw-z4',modelClass:'bmw-z4',color:'敞篷蓝',priceRmb:493900,priceCoins:5000},
    {key:'porsche-panamera-gts',name:'保时捷 Panamera GTS',model:'porsche-panamera-gts',modelClass:'porsche-panamera-gts',color:'金属银',priceRmb:1498000,priceCoins:15000}
  ];
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
    ...Array.from({length:5},(_,index)=>({id:`mercedes-maybach-${index+1}`,name:'奔驰 迈巴赫',model:'mercedes-maybach',modelClass:'mercedes-maybach',color:'曜石黑',number:String(index+46).padStart(2,'0')}))
  ];
  const SAVE_KEY='catEstateParkingV2',LEGACY_KEY='catEstateParkingV1';
  const INCOME_PER_HOUR=1200,MAX_OFFLINE_MS=12*60*60*1000;
  const defaults=()=>({estate:0,unlocked:[],placements:[],purchases:[],unclaimed:0,totalEarned:0,lastUpdated:Date.now()});
  let state=load(),lastSave=0,entrySummaryTimer=0,entrySummaryHideTimer=0;
  let estateAudioContext=null;

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
  function currentIncome(){return state.placements.length*INCOME_PER_HOUR}
  function sharedCoins(){return Math.max(0,Number(localStorage.getItem('catCoins')||480)||0)}
  function format(value){return Math.floor(Math.max(0,Number(value)||0)).toLocaleString('zh-CN')}
  function carById(id){return CARS.find(car=>car.id===id)}
  function showroomCar(purchase){const model=SHOWROOM.find(item=>item.key===purchase.showroomKey);return model?{id:purchase.id,name:model.name,model:model.model,modelClass:model.modelClass,color:model.color,number:purchase.number}:null}
  function placementForSlot(slot){return state.placements.find(item=>item.slot===slot)}
  function placementForCar(carId){return state.placements.find(item=>item.carId===carId)}
  function showScreen(selector){document.querySelectorAll('.screen').forEach(screen=>screen.classList.remove('active'));$(selector)?.classList.add('active')}
  function notify(message){const toast=$('#toast');if(!toast)return;toast.textContent=message;toast.classList.add('show');clearTimeout(notify.timer);notify.timer=setTimeout(()=>toast.classList.remove('show'),1800)}
  function withEstateAudio(callback){
    const AudioEngine=window.AudioContext||window.webkitAudioContext;if(!AudioEngine)return;
    if(!estateAudioContext)estateAudioContext=new AudioEngine();
    const play=()=>callback(estateAudioContext);
    if(estateAudioContext.state==='suspended')estateAudioContext.resume().then(play).catch(()=>{});else play();
  }
  function engineRev(){withEstateAudio(context=>{const now=context.currentTime,osc=context.createOscillator(),gain=context.createGain(),filter=context.createBiquadFilter();osc.type='sawtooth';filter.type='lowpass';filter.frequency.setValueAtTime(280,now);filter.frequency.exponentialRampToValueAtTime(850,now+.28);osc.frequency.setValueAtTime(58,now);osc.frequency.exponentialRampToValueAtTime(162,now+.3);gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.075,now+.035);gain.gain.exponentialRampToValueAtTime(.0001,now+.38);osc.connect(filter).connect(gain).connect(context.destination);osc.start(now);osc.stop(now+.4)})}
  function coinClatter(){withEstateAudio(context=>{const now=context.currentTime;[0,.055,.12].forEach((delay,index)=>{const osc=context.createOscillator(),gain=context.createGain();osc.type='sine';osc.frequency.setValueAtTime([1850,2340,2050][index],now+delay);osc.frequency.exponentialRampToValueAtTime([1320,1680,1470][index],now+delay+.11);gain.gain.setValueAtTime(.0001,now+delay);gain.gain.exponentialRampToValueAtTime(.075,now+delay+.008);gain.gain.exponentialRampToValueAtTime(.0001,now+delay+.14);osc.connect(gain).connect(context.destination);osc.start(now+delay);osc.stop(now+delay+.15)})})}
  function updateEconomy(){const now=Date.now(),elapsed=Math.max(0,Math.min(MAX_OFFLINE_MS,now-state.lastUpdated));if(currentIncome())state.unclaimed+=currentIncome()*elapsed/3600000;state.lastUpdated=now;if(now-lastSave>10000)save()}
  function carImage(car,variant,className='estate-parking-car'){
    const isG63=car.modelClass==='amg-g63';
    const asset=isG63&&variant==='a'?'amg-g63-v5-a-candidate':isG63&&variant==='b'?'amg-g63-v2-d':isG63&&variant==='e'?'amg-g63-v5-a-candidate':`${car.model}-${variant}`;
    const mirrored=isG63&&(variant==='b'||variant==='e')?' mirrored':'';
    return `<img class="${className} variant-${variant} model-${car.modelClass}${mirrored}" src="/assets/estate-parking/${asset}.png" alt="${car.name}">`;
  }

  function renderParking(){
    const estate=currentEstate(),owned=state.unlocked.includes(state.estate);
    elements.grid.innerHTML=Array.from({length:estate.slots},(_,index)=>{
      const placement=placementForSlot(index),car=placement&&carById(placement.carId),variant=estate.variants[index];
      return `<button class="estate-slot ${placement?'occupied':'empty'} ${owned?'':'locked'}" type="button" data-slot="${index}" ${owned?'':'disabled'} style="--slot-x:${estate.centers[index]}%" aria-label="${owned?`${index+1}号${placement?`停放 ${car.name} ${car.number}`:'空'}车位`:'庄园尚未解锁'}"><span class="estate-slot-label">P${index+1} · ${variant.toUpperCase()}</span>${placement?`${carImage(car,variant)}<i class="estate-car-number">${car.number}</i>`:''}</button>`;
    }).join('');
  }

  function renderEconomy(){
    const parked=state.placements.length,available=CARS.length-parked;
    elements.coins.textContent=format(sharedCoins());elements.rate.textContent=`${format(currentIncome())} / 小时`;elements.unclaimed.textContent=format(state.unclaimed);elements.collect.disabled=state.unclaimed<1;elements.garageCount.textContent=`${available} 辆可用 / ${CARS.length} 辆`;
  }

  function showEntrySummary(){
    if(!elements.entrySummary||!state.unlocked.includes(state.estate))return;
    const parked=state.placements.length,available=CARS.length-parked,hero=carById(state.placements[0]?.carId)||CARS[0];
    const names=[...new Set(CARS.map(car=>car.name))].slice(0,2).join(' · ');
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
    const placement=placementForCar(car.id),isTarget=placement?.slot===targetSlot,showroomOwned=state.purchases.some(item=>item.id===car.id);let action='';
    if(targetSlot!=null){
      if(placement&&!isTarget)action=`<button type="button" disabled>P${placement.slot+1} 停放中</button>`;
      else if(isTarget)action='<button type="button" class="current" disabled>当前车辆</button>';
      else action=`<button type="button" data-assign-car="${car.id}" data-slot="${targetSlot}">停入 P${targetSlot+1}</button>`;
    }else action=`<span class="garage-status ${placement?'parked':''}">${placement?`P${placement.slot+1} 停放中`:'车库待命'}</span>`;
    return `<article class="estate-garage-card">${carImage(car,'c','estate-garage-car')}<i>NO.${car.number}</i><div><small>OWNED · ${showroomOwned?'SHOWROOM PURCHASE':'TEST VEHICLE'}</small><b>${car.name}</b><span>${car.color} · 每小时 +${format(INCOME_PER_HOUR)} 猫猫币</span>${action}</div></article>`;
  }

  function showModal(title,eyebrow,content){elements.modalContent.classList.remove('estate-catalog-modal-content');elements.modal.querySelector('section')?.classList.remove('estate-catalog-modal');elements.modalTitle.textContent=title;elements.modalEyebrow.textContent=eyebrow;elements.modalContent.innerHTML=content;elements.modal.hidden=false;requestAnimationFrame(()=>elements.modal.classList.add('open'));elements.modalClose.focus()}
  function closeModal(){elements.modal.classList.remove('open');setTimeout(()=>{elements.modal.hidden=true},140)}
  function openEstateCatalog(selected=state.estate){
    const index=Math.max(0,Math.min(ESTATES.length-1,Number(selected)||0)),estate=ESTATES[index],unlocked=state.unlocked.includes(index),active=index===state.estate;
    const tabs=ESTATES.map((item,itemIndex)=>`<button type="button" class="${itemIndex===index?'active':''}" data-estate-preview="${itemIndex}" aria-pressed="${itemIndex===index}">${itemIndex+1}级</button>`).join('');
    const action=unlocked?`<button type="button" class="estate-catalog-action travel" data-select-estate="${index}" ${active?'disabled':''}>${active?'当前庄园':'前往庄园'}</button>`:`<button type="button" class="estate-catalog-action unlock" data-unlock-estate="${index}">解锁庄园 · ${format(estate.unlockPrice)} 猫猫币</button>`;
    showModal('庄园图鉴','PAW ESTATE · 选择梦想豪宅',`<div class="estate-catalog-tabs">${tabs}</div><section class="estate-catalog-detail"><img src="${estate.image}" alt="${estate.name}豪宅场景"><div><b>${estate.name}—${estate.subtitle}</b><p>${estate.intro}</p>${action}</div></section>`);elements.modalContent.classList.add('estate-catalog-modal-content');elements.modal.querySelector('section')?.classList.add('estate-catalog-modal');
  }
  function openGarage(){const parked=state.placements.length;showModal('我的车库',`${CARS.length} / ${CARS.length} OWNED`,`<div class="estate-garage-summary"><b>豪华车库</b><span>基础测试车 50 辆 · 展厅购入 ${state.purchases.length} 辆 · ${parked} 辆停放中</span></div><div class="estate-garage-list">${CARS.map(car=>garageCard(car)).join('')}</div>`)}

  function openShowroom(){
    const cards=SHOWROOM.map(model=>`<article class="estate-showroom-card">${carImage(model,'c','estate-showroom-car')}<div><b>${model.name}</b><em>${format(model.priceCoins)} 猫猫币</em><button type="button" data-buy-showroom="${model.key}">购买</button></div></article>`).join('');
    showModal('名车展厅','',`<div class="estate-showroom-grid">${cards}</div>`);
  }

  function openParkingPicker(slot){
    if(!Number.isInteger(slot)||slot<0||slot>=currentEstate().slots)return;
    const current=placementForSlot(slot),currentCar=current&&carById(current.carId),occupied=current?`<div class="estate-current-car"><span>P${slot+1} 当前停放</span><b>${currentCar.name} · NO.${currentCar.number}</b><button type="button" data-unpark-slot="${slot}">驶回车库</button></div>`:'';
    showModal(`为 P${slot+1} 选择车辆`,`${currentEstate().name.toUpperCase()} · ${currentEstate().variants[slot].toUpperCase()} ANGLE`,`${occupied}<p class="estate-picker-hint">车库中的 ${CARS.length} 辆车全部显示；已经停放的车辆会标出所在车位。</p><div class="estate-garage-list picker">${CARS.map(car=>garageCard(car,{targetSlot:slot})).join('')}</div>`);
  }

  function assignCar(carId,slot){if(!carById(carId)||placementForCar(carId)||slot<0||slot>=currentEstate().slots)return;engineRev();updateEconomy();state.placements=state.placements.filter(item=>item.slot!==slot);state.placements.push({slot,carId});save();render();closeModal();notify(`${carById(carId).name} NO.${carById(carId).number} 已停入 P${slot+1}`)}
  function buyShowroomCar(key){
    const model=SHOWROOM.find(item=>item.key===key);if(!model)return;
    const balance=sharedCoins();if(balance<model.priceCoins){notify(`猫猫币不足，还差 ${format(model.priceCoins-balance)} 猫猫币`);return}
    const purchase={id:`showroom-${key}-${Date.now()}`,showroomKey:key,number:String(CARS.length+1).padStart(2,'0')},car=showroomCar(purchase);
    localStorage.setItem('catCoins',String(balance-model.priceCoins));state.purchases.push(purchase);CARS.push(car);save();render();window.dispatchEvent(new CustomEvent('cat-estate-coins-changed',{detail:{coins:balance-model.priceCoins}}));openShowroom();notify(`${model.name} 已加入车库`);
  }
  function unparkSlot(slot){const placement=placementForSlot(slot);if(!placement)return;updateEconomy();state.placements=state.placements.filter(item=>item.slot!==slot);save();render();closeModal();notify(`NO.${carById(placement.carId).number} 已驶回车库`)}

  function collect(){updateEconomy();const amount=Math.floor(state.unclaimed);if(amount<1)return;coinClatter();state.unclaimed-=amount;state.totalEarned+=amount;const balance=sharedCoins()+amount;localStorage.setItem('catCoins',String(balance));save();renderEconomy();window.dispatchEvent(new CustomEvent('cat-estate-coins-changed',{detail:{coins:balance,amount}}));notify(`停车费 +${format(amount)} 猫猫币`)}
  function enter(){updateEconomy();render();showScreen('#estate');if(state.unlocked.includes(state.estate))showEntrySummary();else{openEstateCatalog(state.estate);notify('先解锁你的第一座庄园')}}
  function leave(){updateEconomy();save();closeModal();if(window.catTavernEstate?.returnToTavern)window.catTavernEstate.returnToTavern();else showScreen('#tavern')}

  elements.estateToggle.addEventListener('click',()=>openEstateCatalog(state.estate));
  elements.grid.addEventListener('click',event=>{const button=event.target.closest('[data-slot]');if(button)openParkingPicker(Number(button.dataset.slot))});
  elements.modalContent.addEventListener('click',event=>{const assign=event.target.closest('[data-assign-car]'),unpark=event.target.closest('[data-unpark-slot]'),buy=event.target.closest('[data-buy-showroom]'),preview=event.target.closest('[data-estate-preview]'),unlock=event.target.closest('[data-unlock-estate]'),select=event.target.closest('[data-select-estate]');if(assign)assignCar(assign.dataset.assignCar,Number(assign.dataset.slot));else if(unpark)unparkSlot(Number(unpark.dataset.unparkSlot));else if(buy)buyShowroomCar(buy.dataset.buyShowroom);else if(preview)openEstateCatalog(Number(preview.dataset.estatePreview));else if(unlock)unlockEstate(Number(unlock.dataset.unlockEstate));else if(select)selectEstate(Number(select.dataset.selectEstate))});
  elements.collect.addEventListener('click',collect);$('#estateGarage').addEventListener('click',openGarage);$('#estateShowroom').addEventListener('click',openShowroom);$('#estateBack').addEventListener('click',leave);elements.modalClose.addEventListener('click',closeModal);elements.modal.addEventListener('pointerdown',event=>{if(event.target===elements.modal)closeModal()});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!elements.modal.hidden)closeModal()});
  window.addEventListener('storage',event=>{if(event.key==='catCoins')renderEconomy()});document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){updateEconomy();save()}else if(elements.screen.classList.contains('active')){updateEconomy();renderEconomy()}});window.addEventListener('beforeunload',()=>{updateEconomy();save()});setInterval(()=>{if(elements.screen.classList.contains('active')){updateEconomy();renderEconomy()}},1000);

  window.catEstateGame={enter,leave,render,openGarage};
  render();if(location.hash==='#estate')enter();
})();
