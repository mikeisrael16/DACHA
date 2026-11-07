
/* ================= LEVELS, FEATURE TUTORIALS, CHANGELOG ================= */
function levelUp(){const top=level();if(top<=S.seenLvl)return;SND.level();S.seenLvl=top;toast('Новый уровень: '+top+'!');
 for(let i=0;i<maxOrders()-S.orders.length;i++)S.orders.push(genOrder());renderFix();save();featureTips()}
const FEATURES=[
 {k:'market',lvl:1,cam:[2190,900],lines:[[3,'Это Скупщик. Он покупает любой урожай и заготовки в любое время — чуть дешевле, чем соседи по заказам. Без монет ты никогда не останешься!']]},
 {k:'daily',lvl:1,lines:[[2,'Каждый день, когда заходишь на дачу, тебя ждёт подарок — кнопка «Подарок» слева. Заходи 7 дней подряд — на седьмой день сундук с золотом!']]},
 {k:'quests',lvl:1,lines:[[1,'В «Заданиях» всегда три поручения. Выполняй их за монеты и опыт, а скучное задание можно заменить кнопкой ↻.']]},
 {k:'spoil1',lvl:2,lines:[[3,'Запомни: свежие овощи, ягоды, фрукты и молоко хранятся в сарае 6 часов, потом портятся. Продавай вовремя или перерабатывай — заготовки не портятся!']]},
 {k:'kitchen',lvl:4,cam:[600,420],lines:[[5,'Открылась летняя кухня! Нажми на дом — там из овощей делают заготовки: набор для борща, икру, соленья, лечо, а потом и варенье. Стоят они намного дороже!']]},
 {k:'thiefI',lvl:4,lines:[[4,'Соседи шепчутся о воришках: если долго не собирать спелый урожай, его могут утащить. Защитят камера и высокий забор во вкладке «Защита».']]},
 {k:'pests',lvl:5,lines:[[4,'Будь начеку: теперь на урожай нападают вороны и жуки! Ворон прогоняй нажатием или пугалом, от тли, жука и слизней есть средства во вкладке «Защита».']]},
 {k:'ghI',lvl:5,lines:[[1,'Теперь можно поставить теплицу (Магазин → Постройки). В ней всё растёт быстрее, без вредителей и воров. Её тоже можно ставить вдоль и поперёк!']]},
 {k:'cat',lvl:5,lines:[[2,'Ой, смотри — к нам на дачу пришёл котик! Похоже, хочет остаться…']],after:()=>askCatName()},
 {k:'garden',lvl:6,lines:[[5,'Теперь можно сажать сад! В магазине на вкладке «Сад» продаются ягодные кусты, а позже и фруктовые деревья.'],[3,'Сажаешь один раз — и собираешь урожай снова и снова. Только поливай после каждого сбора!']]},
 {k:'wellI',lvl:6,cam:[420,880],lines:[[1,'Можно расчистить старый колодец — тогда воды будет сколько угодно. Нажми на него или найди в «Постройках».']]},
 {k:'cows',lvl:7,cam:[2190,620],lines:[[5,'Пора заводить хозяйство! Построй коровник на пастбище за калиткой, купи бурёнку и корми её сеном — она даст молоко.'],[3,'Сено продаётся в магазине на вкладке «Животные», а комбикорм из кукурузы и фасоли готовят на кухне.']]},
 {k:'dairy',lvl:8,cam:[885,460],lines:[[5,'Открылась сыроварня! Из молока там делают сметану, творог, масло и сыр — это очень выгодно.']]},
 {k:'sheep',lvl:9,cam:[2440,700],lines:[[5,'Теперь можно построить овчарню и завести овечек. Корми их, а когда шерсть отрастёт — нажми на овцу, чтобы постричь.']]},
 {k:'spin',lvl:10,cam:[760,900],lines:[[5,'Открылась прядильня! Из шерсти — пряжа, а из пряжи — носки, варежки и тёплые свитеры.']]},
 {k:'hard',lvl:10,lines:[[4,'Ты опытный дачник! С 10 уровня всё растёт чуть дольше и стоит немного дороже — зато соседи платят больше. Используй теплицы и удобрения!']]}];
function featureTips(){if(!S.done)return;
 const nc=ANN_IDS.filter(id=>id!=='potato'&&id!=='carrot'&&annUnlocked(id)&&!S.tips['crop_'+id]);if(nc.length){nc.forEach(id=>S.tips['crop_'+id]=1);sayLater([[5,'В магазине новые семена: '+nc.map(id=>ANN[id][0].toLowerCase()).join(', ')+'!']])}
 const np=PER_IDS.filter(id=>perUnlocked(id)&&!S.tips['per_'+id]);if(np.length&&S.tips.garden){np.forEach(id=>S.tips['per_'+id]=1);sayLater([[5,'В саду новинка: '+np.map(id=>PER[id][0].toLowerCase()).join(', ')+'!']])}else np.forEach(id=>S.tips['per_'+id]=1);
 FEATURES.forEach(f=>{if(level()>=f.lvl&&!S.tips[f.k])tip(f.k,f.lines,f.cam?[f.cam[0],f.cam[1],minS()*1.6]:null,()=>{if(f.cam)camHome(true);f.after&&f.after()})});save()}
const CHANGES=[{v:'1.2',title:'Удобнее и понятнее',items:['🍳 Летняя кухня: нажми на рецепт — увидишь, какие продукты нужны, сколько их есть и где их взять. Когда всё собрано, рецепт помечен «Можно готовить»','🐱 Имя коту теперь можно просто выбрать из списка, а своё — написать: клавиатура больше не закрывает окно','🔠 Шрифт стал крупнее во всей игре']},{v:'1.1',title:'Улучшения',items:['🐱 Новый красивый кот: сидит, ходит, ест, пьёт и спит ночью','🥣 Миски стоят рядом с котом: нажми на миску и перетащи в неё корм или воду из лейки','🏠 Теплицы теперь стоят ровно — вдоль или поперёк. Теплицы ставятся справа, грядки — слева','🔠 Текст стал крупнее и не обрезается при приближении и отдалении','🪟 Убрали лишнюю подсветку окон дома']},{v:'1.0',title:'Большое обновление «Новая дача»',items:['🏡 Новый большой участок у Волги — его можно двигать и приближать','🌱 Грядки и теплицы ставишь сам, куда хочешь, вдоль или поперёк. Их можно переставлять','🥕 37 овощей и зелени: кукуруза, фасоль, брокколи, арбуз, дыня, базилик, спаржа и другие','🍓 Сад: 10 ягодных кустов и 10 фруктовых деревьев — сажаешь один раз, собираешь много раз','🐄 Коровы и овцы: молоко и шерсть. Сыроварня и прядильня: сметана, творог, масло, сыр, пряжа, носки, варежки, свитер','🍯 На кухне: варенье, компоты, морс и комбикорм','🐱 На 5 уровне приходит кот — дай ему имя, корми и пои каждый день','🎁 Подарок за вход каждый день, на 7-й день — сундук','💰 Скупщик покупает всё и всегда — без монет не останешься','📋 Задания стали разнообразнее, их можно заменять','⏳ Овощи, фрукты и молоко портятся через 6 часов — продавай вовремя','📈 С 10 уровня игра чуть сложнее: всё дольше и дороже, но и платят больше','ℹ️ Прогресс начинается заново — можно пропустить обучение и сразу начать с 5 уровня']}];
function whatsNew(done){const list=CHANGES.filter(c=>parseFloat(c.v)>parseFloat(S.seenVer||'0'));if(!list.length){done();return}
 $('newTxt').innerHTML=list.map(c=>`<h3>Версия ${c.v}: ${c.title}</h3><ul>${c.items.map(i=>`<li>${i}</li>`).join('')}</ul>`).join('');modal('mNew');$('newOk').onclick=()=>{S.seenVer=VERSION;save();modal('mNew',false);SND.tap();done()}}
function startupPopups(){popup(whatsNew);if(S.done&&S.daily.last!==dayKey())popup(d=>showDaily(d));featureTips()}

/* ================= TICK ================= */
let tickT=null,lastSpoil=0,lastSlow=0;
function tick(){if(!S)return;const t=now();
 const mx=waterMax(),per=D.refill();if(S.water>=mx)S.waterAt=t;else{const n=Math.floor((t-S.waterAt)/per);if(n>0){const add=Math.min(n,mx-S.water);S.water+=add;S.waterAt=S.water>=mx?t:S.waterAt+n*per;renderHUD()}}
 S.objs.forEach(o=>{
  if(o.busy){if(t>=o.busy.t1)finishBusy(o);else busyFx(o)}
  if(isCropObj(o)){if(o.seg&&t>=o.seg.t1){o.frac=o.seg.f1;if(o.frac>=1)o.ripeAt=o.seg.t1;o.seg=null;renderObj(o);
    if(o.frac>=1){SND.harvest();if(S.done)toast(ANN[o.crop][0]+': урожай созрел!');if(o===tutBed())tutEvent('ripe')}else{SND.fail();if(S.done)toast(ANN[o.crop][0]+': грядка хочет пить!')}save()}
   if(o.state==='planted'&&objEls[o.id]&&objEls[o.id].dataset.st!=String(stageOf(o))){objEls[o.id].dataset.st=stageOf(o);renderObj(o,true)}}
  else if(o.seg&&t>=o.seg.t1){if(o.stage===0){o.stage=1;o.seg=null;toast(PER[o.p][0]+' подросла — полей, и пойдёт урожай!')}else{o.ripe=true;o.ripeAt=o.seg.t1;o.seg=null;SND.harvest();toast(PER[o.p][0]+': урожай готов!')}renderObj(o);save()}
  renderStatus(o)});
 tickAnimals(t);renderFacBubs();
 if(S.done){if(S.orders.length<maxOrders()&&t>=S.nextOrderAt){S.orders.push(genOrder());S.nextOrderAt=t+30000;renderHUD()}tickPests(t);tickThieves(t)}
 if(t-lastSpoil>10000){lastSpoil=t;spoilCheck();catTick();safetyNet(t);renderScare();renderHUD()}
 if(t-lastSlow>2000){lastSlow=t;renderGauge();if(level()>S.seenLvl)levelUp()}
 const ripe=S.objs.some(isRipe);document.title=ripe?'🥕 Урожай готов! — Моя дача':'Ярославль: Моя дача';
 if(t-lastSave>3000)save()}
function safetyNet(t){if(!S.done||t<(S.giftAt||0))return;const growing=S.objs.some(o=>o.busy||(isCropObj(o)&&o.state==='planted'));const seeds=ANN_IDS.some(id=>S.inv['seed_'+id]>0);
 if(S.coins<10&&!growing&&!seeds&&!sellables().length){S.giftAt=t+600000;addItem('seed_potato',2);S.coins+=30;renderHUD();save();sayLater([[5,'Монетки закончились? Держи 30 монет и пару клубней из моих запасов. И не забывай про ежедневный подарок!']])}}
function startTick(){clearInterval(tickT);tickT=setInterval(tick,250)}

/* ================= START ================= */
function fadeTo(fn){const f=$('fade');f.style.opacity=1;setTimeout(()=>{fn();f.style.opacity=0},500)}
function tryFullscreen(){try{const d=document.documentElement;if(!(document.fullscreenElement||document.webkitFullscreenElement)){const r=d.requestFullscreen?d.requestFullscreen({navigationUI:'hide'}):d.webkitRequestFullscreen?d.webkitRequestFullscreen():null;if(r&&r.then)r.then(lockLand).catch(()=>{});else lockLand()}else lockLand()}catch(e){}}
function lockLand(){try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock('landscape').catch(()=>{})}catch(e){}setTimeout(fit,300)}
var typing2=false;const nIn=$('nameIn');
nIn.addEventListener('focus',()=>{typing2=true;$('mName').classList.add('typing')});
nIn.addEventListener('blur',()=>{setTimeout(()=>{typing2=false;$('mName').classList.remove('typing');fit()},300)});
nIn.addEventListener('keydown',e=>{if(e.key==='Enter'){nIn.blur();[...$('nameChips').children].forEach(x=>x.classList.remove('on'))}});
nIn.addEventListener('input',()=>[...$('nameChips').children].forEach(x=>x.classList.toggle('on',x.textContent===nIn.value)));
['pointerdown','touchend','click'].forEach(ev=>document.addEventListener(ev,e=>{if(e.target&&e.target.id==='nameIn')return;tryFullscreen();ac();Music.start()},{capture:true,passive:true}));
document.addEventListener('fullscreenchange',()=>setTimeout(fit,200));
let lightT=null;
function startGame(state){S=state;tutActive=-1;
 fadeTo(()=>{$('title').style.display='none';$('game').style.display='block';closeTray();guide(null);hint(null);
  ['mOrders','mShop','mStore','mQuest','mMsg','mFac','mMarket','mDaily','mNew','mName'].forEach(i=>modal(i,false));
  Object.keys(objEls).forEach(removeObjEl);$('objs').innerHTML='';for(const k in fixEls)delete fixEls[k];for(const k in aniEls)delete aniEls[k];for(const k in aBub){aBub[k].remove();delete aBub[k]}$('pets').innerHTML='';$('kbubs').innerHTML='';for(const k in kbKey)delete kbKey[k];
  clearBirds();clearThieves();fixLayout();fit();
  const away=now()-(S.lastSeen||now());const w0=S.water;tick();const stolen=S.done?offlineThieves():0;const spoiled=spoilCheck(true);
  renderAllObjs();renderFix();renderAnimals();renderCat();renderSecurity();renderHUD();startTick();updateLighting();clearInterval(lightT);lightT=setInterval(()=>{updateLighting();renderAnimals()},30000);
  if(!S.done){camHome();whatsNew(()=>setTimeout(tutRun,500))}
  else{camHome();setTimeout(()=>{const m=[];if(S.objs.some(isRipe))m.push('урожай созрел');if(stolen)m.push('воришки утащили урожай: '+stolen);if(spoiled.length)m.push('испортилось: '+spoiled.join(', '));
   if(away>60000)toast(greeting()+' '+(m.length?'Пока тебя не было: '+m.join('; ')+'.':'С возвращением на дачу!'));refillQuests();startupPopups()},700)}})}
function skipState(){const s=newState();Object.assign(s,{done:true,tut:STEPS.length,xp:xpFor(5),seenLvl:5,coins:400,firstPotato:false});
 Object.assign(s.inv,{seed_potato:3,seed_carrot:2,seed_onion:2,seed_radish:2,seed_sorrel:2,seed_lettuce:1,fert:3});
 s.objs[0].state='dug';const b2=newCropObj('bed',3,1,0,1);b2.state='dug';s.objs.push(b2);
 Object.assign(s.ui,{coins:true,xp:true,store:true,shop:true,board:true,quest:true});return s}
function newGameFlow(){msg('Новая дача','Пропустить обучение и сразу начать с 5 уровня?',[{t:'Пропустить → 5 уровень',f:()=>{const s=skipState();startGame(s);setTimeout(()=>{S=s;genOrders();refillQuests();save()},800)}},{t:'Пройти обучение',cls:'orange',f:()=>startGame(newState())}])}
function msgTitle(t,txt,btns){const m=$('mMsg');stage.appendChild(m);m.style.zIndex=95;msg(t,txt,btns)}
$('hotNew').addEventListener('click',()=>{ac();SND.tap();if(loadSave())msgTitle('Новая игра','Начать заново? Весь прогресс будет удалён.',[{t:'Начать заново',cls:'orange',f:()=>{try{localStorage.removeItem(BASE_KEY)}catch(e){}setTimeout(()=>msgTitle('Новая дача','Пропустить обучение и сразу начать с 5 уровня?',skipBtns()),200)}},{t:'Отмена'}]);else msgTitle('Новая дача','Пропустить обучение и сразу начать с 5 уровня?',skipBtns())});
function skipBtns(){return[{t:'Пропустить → 5 ур.',f:()=>{const s=skipState();s.orders=[];startGame(s);setTimeout(()=>{genOrders();refillQuests();save()},900)}},{t:'Пройти обучение',cls:'orange',f:()=>startGame(newState())}]}
$('hotCont').addEventListener('click',()=>{ac();SND.tap();const s=loadSave();if(s)startGame(s);else msgTitle('Новая дача','Пропустить обучение и сразу начать с 5 уровня?',skipBtns())});
$('hMenu').addEventListener('pointerdown',e=>{e.stopPropagation();ac();SND.tap();msg('Меню','Прогресс сохраняется сам, а грядки растут, даже когда ты не в игре.',[{t:'Выйти в меню',cls:'orange',f:()=>{save();clearInterval(tickT);fadeTo(()=>{$('game').style.display='none';$('title').style.display='block';hint(null);guide(null);$('dlg').classList.remove('on')})}},{t:'Что нового',f:()=>{S.seenVer='0';whatsNew(()=>{})}},{t:'Продолжить'}])});
document.addEventListener('visibilitychange',()=>{if(document.hidden)save();else if(S){tick();updateLighting()}});
addEventListener('pagehide',()=>save());
$('bgImg').src=IMG.bg;$('canImg').src=IMG.i_can;$('storeImg').src=IMG.i_basket;$('dailyImg').src=IMG.d7;
fit();
window.__dacha={get S(){return S},set S(v){S=v},fromStage,tick,cam,camTo,minS,rectOf,objById,setHour:h=>{forcedHour=h;updateLighting();renderAnimals();renderCat()},spawnBird,spawnThief,infest,birds,startGame,skipState,renderAllObjs,renderFix,renderAnimals,renderCat,openFac,openShop,openMarket,showDaily,featureTips,PQ};
})();
