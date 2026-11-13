
/* ================= v3.0: ISRAEL ================= */
const isIL=id=>typeof id==='string'&&id.startsWith('il_');
const ilOn=()=>!!(S&&S.loc==='il');
const locOk=id=>!isIL(id)||ilOn();
let PORT='t',KITP=[760,430],SCAREP=[2580,1200],FISHBUB=[3450,1060],RAINP=[3150,-330],CHESTP=[1160,712],HOLCAM=[1300,640,.95],HOMEC=[1560,960,.78];
const ZORD={bed:[0,3],gh:[2],bush:[1,6,4,5,0,3,2],tree:[1,6,4,5,0,3,2]};
['il_tomato','il_cucumber','il_mint','il_pepper','il_eggplant','il_parsley','il_chickpea','il_coriander','il_spotato','il_sage','il_zaatar','il_okra','il_basil','il_melon',...PER_IDS.filter(isIL)].forEach(id=>{if(!IMG[id])IMG[id]=IMG[id+'_crop']});
IMG.fert=IMG.fert||IMG.i_fert;
// prices of Israeli products = inputs × 1.3
for(let pass=0;pass<4;pass++)for(const f in FAC)for(const id in FAC[f].rec){if(!isIL(id)||!PROD[id])continue;const r=FAC[f].rec[id];let s=0;for(const k in r[1])s+=baseSell(k)*r[1][k];PROD[id][1]=Math.round(s*1.3/r[3]+8)}

const HITSEL={'.hitz[data-tap=house]':0,'.hitz[data-tap=barrel]':0,'.hitz[data-tap=board]':0,'#boardLbl':0,'#boardBadge':0,'#cctv':0,'#gaugeTimer':0,'#gauge':0,'#canBadge':0};
const RU={WW,WH,ZONES:JSON.parse(JSON.stringify(ZONES)),FIX:JSON.parse(JSON.stringify(FIX)),pos:Object.fromEntries(ANI_IDS.map(k=>[k,(ANIM[k].pos||[]).map(p=>p.slice())])),
 CATP:CATP.slice(),BOWLF:BOWLF.slice(),BOWLW:BOWLW.slice(),SPOTS:JSON.parse(JSON.stringify(SPOTS)),HOL:Object.fromEntries(Object.entries(HOL).map(([k,v])=>[k,JSON.parse(JSON.stringify(v.dec))])),
 ZORD:JSON.parse(JSON.stringify(ZORD)),KITP,SCAREP,FISHBUB,RAINP,CHESTP,HOLCAM,HOME:HOMEC,
 HITZ:Object.fromEntries(Object.keys(HITSEL).map(s=>{const e=document.querySelector(s);return[s,e?{left:e.style.left,top:e.style.top,width:e.style.width,height:e.style.height}:{}]}))};
const ILC={WW:5152,WH:2186,
 ZONES:[{x0:1760,y0:704,cols:15,rows:15,k:'bed'},{x0:3700,y0:768,cols:11,rows:3,k:'per'},{x0:3700,y0:936,cols:11,rows:3,k:'per'},{x0:3788,y0:1104,cols:10,rows:3,k:'per'},{x0:3875,y0:1272,cols:8,rows:3,k:'per'},
  {x0:100,y0:1780,cols:11,rows:6,k:'per'},{x0:1520,y0:1220,cols:3,rows:6,k:'bed'},
  {x0:3052,y0:700,cols:4,rows:2,k:'gh'},{x0:3072,y0:812,cols:4,rows:2,k:'gh'},{x0:3092,y0:924,cols:5,rows:2,k:'gh'},{x0:3112,y0:1036,cols:5,rows:2,k:'gh'},{x0:3133,y0:1148,cols:6,rows:2,k:'gh'},{x0:3153,y0:1260,cols:6,rows:2,k:'gh'},{x0:3173,y0:1372,cols:7,rows:2,k:'gh'}],
 ZORD:{bed:[0,6],gh:[7,8,9,10,11,12,13],bush:[1,2,3,4,5,0,6],tree:[1,2,3,4,5,0,6]},
 FIX:{market:{n:'Скупщик',x:1896,y:540,w:230,h:220,lvl:1,cost:0,hid:1,lt:1},well:{n:'Колодец',x:1290,y:1470,w:150,lvl:6,cost:400},
  cowshed:{n:'Коровник',x:4170,y:500,w:270,lvl:7,cost:500},sheeppen:{n:'Овчарня',x:1520,y:500,w:230,lvl:9,cost:700},
  coop:{n:'Курятник',x:905,y:560,w:230,lvl:20,cost:300},pyard:{n:'Птичий двор',x:4200,y:1960,w:250,lvl:28,cost:900},
  dairy:{n:'Сыроварня',x:1290,y:2090,w:285,lvl:8,cost:700},spinnery:{n:'Прядильня',x:1610,y:2090,w:285,lvl:10,cost:900},mill:{n:'Мельница',x:1930,y:2090,w:285,lvl:22,cost:500},
  oven:{n:'Русская печь',x:2250,y:2090,w:285,lvl:24,cost:600},bakery:{n:'Пекарня',x:2570,y:2090,w:285,lvl:30,cost:1500},smokehouse:{n:'Коптильня',x:2890,y:2090,w:285,lvl:32,cost:1600},
  apiary:{n:'Пасека',x:3210,y:2090,w:285,lvl:27,cost:900},fair:{n:'Ярмарка',x:3640,y:2130,w:300,lvl:29,cost:1200},
  olivepress:{n:'Маслобойня',x:3990,y:1700,w:270,lvl:999,cost:800},winery:{n:'Винодельня',x:4390,y:1720,w:310,lvl:999,cost:1200},spice:{n:'Цех специй',x:2720,y:640,w:210,lvl:999,cost:700},tabun:{n:'Табун',x:2930,y:650,w:230,lvl:999,cost:600}},
 pos:{goat:[[3560,470],[3660,410],[3620,560]],awassi:[[3800,520],[3910,470],[3760,630]],donkey:[[3470,540]],camel:[[3990,610]],ostrich:[[3720,330],[3870,380]],bees:[[2260,530],[2390,505],[2520,530]],
  chicken:[[1010,610],[1100,630],[1190,600],[1270,640]],quail:[[1120,520],[1210,540],[1300,560]],duck:[[4420,1880],[4500,1990],[4380,2080]],goose:[[4110,2100],[4250,2120]],turkey:[[4560,2120],[4330,2140]],cow:[[4010,640],[4190,670],[4370,630]],sheep:[[1340,690],[1460,720],[1590,660],[1250,600]]},
 CATP:[940,1490],BOWLF:[800,1510],BOWLW:[870,1516],
 SPOTS:{fish:{lbl:'🎣 Рыбалка',lvl:FISH_LVL,x:4870,y:1500,hit:[4720,1480,320,330]},forest:{lbl:'🌲 В лес',lvl:FOREST_LVL,x:2950,y:430,sign:1,hit:[2875,240,150,190]}},
 HOL:{harvest:[['hd_pumpkin',1100,1540,130],['hd_pumpkin',420,1610,110],['hd_flags',1260,1000,280]],ny:[['hd_tree',1150,1560,160],['hd_snowman',420,1610,120],['hd_gift',1250,1560,100]],
  masl:[['hd_masl',1150,1560,130],['hd_samovar',1250,1000,110]],easter:[['hd_kulich',1150,1560,120],['hd_samovar',1250,1000,110]]},
 KITP:[600,560],SCAREP:[1520,640],FISHBUB:[4870,1420],RAINP:[3400,-320],CHESTP:[1020,1560],HOLCAM:[1100,1400,.8],HOME:[2370,1120,.62],
 HITZ:{'.hitz[data-tap=house]':{left:'200px',top:'560px',width:'820px',height:'480px'},'.hitz[data-tap=barrel]':{left:'120px',top:'1060px',width:'150px',height:'210px'},
  '.hitz[data-tap=board]':{left:'2040px',top:'376px',width:'136px',height:'148px'},'#boardLbl':{left:'2108px',top:'540px'},'#boardBadge':{left:'2170px',top:'360px'},
  '#cctv':{left:'990px',top:'640px'},'#gaugeTimer':{left:'95px',top:'990px'},'#gauge':{left:'128px',top:'1022px'},'#canBadge':{left:'270px',top:'1110px'}}};
function applyLoc(loc){const C=loc==='il'?ILC:RU;WW=C.WW;WH=C.WH;
 ZONES.length=0;C.ZONES.forEach(z=>ZONES.push({...z}));
 for(const k in FIX)delete FIX[k];Object.entries(C.FIX).forEach(([k,v])=>FIX[k]={...v});
 ANI_IDS.forEach(k=>ANIM[k].pos=(C.pos[k]||[]).map(p=>p.slice()));
 [[CATP,C.CATP],[BOWLF,C.BOWLF],[BOWLW,C.BOWLW]].forEach(([a,b])=>{a[0]=b[0];a[1]=b[1]});
 for(const k in SPOTS)delete SPOTS[k];Object.entries(C.SPOTS).forEach(([k,v])=>SPOTS[k]=JSON.parse(JSON.stringify(v)));
 Object.keys(HOL).forEach(h=>{if(C.HOL[h])HOL[h].dec=JSON.parse(JSON.stringify(C.HOL[h]))});
 for(const k in ZORD)delete ZORD[k];Object.assign(ZORD,JSON.parse(JSON.stringify(C.ZORD)));
 KITP=C.KITP;SCAREP=C.SCAREP;FISHBUB=C.FISHBUB;RAINP=C.RAINP;CHESTP=C.CHESTP;HOLCAM=C.HOLCAM;HOMEC=C.HOME;
 PORT=loc==='il'?'sv':'t';$('dlgName').textContent=loc==='il'?'Светлана':'Татьяна';
 const w=$('world');w.style.width=WW+'px';w.style.height=WH+'px';
 document.querySelectorAll('.zl').forEach(e=>{e.style.width=WW+'px';e.style.height=WH+'px';e.setAttribute('viewBox',`0 0 ${WW} ${WH}`)});
 $('bgImg').src=loc==='il'?IMG.bg_il:IMG.bg;
 Object.entries(C.HITZ).forEach(([s,st])=>{const e=document.querySelector(s);if(e)Object.assign(e.style,st)});
 const dv=$('david');if(dv)dv.remove()}

/* ---------- Israeli progression: one novelty per level after arrival ---------- */
const IL_STEPS=[
 [0,['il_tomato','il_cucumber','il_mint','il_salad','il_lemonade']],
 [1,['goat'],[[1,'Мама, на пастбище можно завести коз! Козье молоко пригодится для сыра и лабане. Купить — Магазин → Животные, кормить сеном.']],[3700,520]],
 [2,['il_pepper','drip'],[[5,'Новинка: сладкий перец! А ещё в магазине, во вкладке «Улучшения», появился капельный полив — с ним грядкам не страшна засуха.']]],
 [3,['il_olive'],[[1,'Пора сажать сад! Олива — главное дерево Израиля, из оливок потом сделаем масло. Сад — на большом лугу справа, за каменным двором с теплицами.']],[4100,1100]],
 [4,['il_shakshuka'],[[5,'Новый рецепт! Из яиц, черри и перца на кухне получится настоящая шакшука. Курятник можно построить в птичьем дворе за домом.']],[905,560]],
 [5,['il_eggplant','il_parsley'],[[1,'Новые семена: баклажаны и петрушка!']]],
 [6,['il_date','il_silan'],[[2,'Финиковая пальма! Из фиников на кухне варят сладкий сироп силан.']]],
 [7,['il_chickpea','il_coriander','il_falafel'],[[5,'Нут и кинза! Из нута, петрушки и кинзы на кухне делают фалафель — Давид его обожает.']]],
 [8,['olivepress','il_oliveoil','il_olivesjar','il_evoil','il_hummus'],[[2,'Пора строить маслобойню — она у сада, справа внизу! Там давят обычное оливковое масло и премиальное Extra Virgin, маринуют оливки. А на кухне из масла и нута получится хумус.']],[3990,1560]],
 [9,['awassi'],[[1,'На пастбище можно завести овец авасси — у них отличная шерсть для прядильни.']],[3800,520]],
 [10,['il_pomeg','il_pomjuice'],[[2,'Гранат! Из гранатов на кухне выжимают вкуснейший сок.']]],
 [11,['il_spotato','il_sage'],[[1,'Новые семена: батат и шалфей.']]],
 [12,['il_fig','il_figjam'],[[2,'Инжир! Из него варят инжирное варенье.']]],
 [13,['donkey'],[[5,'Ослик! Он даёт удобрение — с ним урожай растёт быстрее.']],[3500,500]],
 [14,['il_grape','winery','il_wine'],[[1,'Виноград! Сажай лозу в саду. А рядом с садом можно построить винодельню — из винограда Галилеи там делают вино.']],[4390,1560]],
 [15,['il_zaatar','spice','il_zaatarmix','il_falspice','il_labneh','il_goatcheese'],[[5,'Заатар — главная израильская пряность! Построй цех специй у дороги к лесу — там смешивают заатар с оливковым маслом и готовят специи для фалафеля, а в сыроварне делай лабане и козий сыр.']]],
 [16,['il_orange'],[[2,'Яффские апельсины — самые знаменитые в мире!']]],
 [17,['il_sabra'],[[7,'Сабра — колючий кактус со сладкими плодами. Осторожно, колется!']]],
 [18,['il_okra','il_basil'],[[1,'Новые семена: бамия и базилик.']]],
 [19,['camel'],[[7,'Верблюд! Верблюжье молоко стоит очень дорого.']],[3990,520]],
 [20,['il_avocado'],[[2,'Авокадо — в Израиле его едят на завтрак каждый день!']]],
 [21,['il_jasmine','il_lavender','il_passion'],[[1,'Жасмин, лаванда и маракуйя! Цветы скоро понадобятся пчёлам.']]],
 [22,['bees'],[[5,'Пчёлы! Ульи стоят у дороги к лесу. Корми пчёл цветами жасмина и лаванды — будет мёд.']],[2390,440]],
 [23,['il_mango'],[[2,'Манго — сладкое и сочное!']]],
 [24,['il_melon'],[[2,'Израильский арбуз — летом без него никак!']]],
 [25,['ostrich'],[[7,'Страус! Одно страусиное яйцо — как двадцать куриных. Кормить зерносмесью.']],[3800,360]],
 [26,['il_loquat'],[[1,'Мушмула, она же шесек — весенний фрукт.']]],
 [27,['tabun','il_pita','il_lavash','il_zpita','il_challah','il_jachnun','il_sabich','il_malabi'],[[5,'Последний секрет: построй табун — глиняную печь у дороги в лес. В нём пекут горячую питу, лаваш, питу с заатаром и халу к пятнице. А на кухне — джахнун, сабих и малаби. Муку бери с мельницы.']],[2930,520]]];
let DRIP_LVL=999;
function setLvl(id,L){if(ANN[id])ANN[id][1]=L;if(PER[id])PER[id][2]=L;for(const f in FAC)if(FAC[f].rec[id])FAC[f].rec[id][0]=L;if(ANIM[id]&&ANIM[id].loc==='il')ANIM[id].lvl=L;if(id==='drip')DRIP_LVL=L;if(FAC[id]&&ILFAC.includes(id))FAC[id].lvl=L;if(FIX[id]&&ILFAC.includes(id))FIX[id].lvl=L}
const ILFAC=['olivepress','spice','winery','tabun'];
function ilSetup(){const on=ilOn(),B=on?(S.ilBase||level()):0;
 if(on&&!S.dry20){S.dry20=1;const t0=now();S.objs.forEach(o=>{delete o.dryAt;if(isCropObj(o)&&o.ripeAt&&t0-o.ripeAt>DRY_MS/2)o.ripeAt=t0})}
 if(on&&!S.wildFix){S.wildFix=1;S.wt=S.wt||0;S.objs.forEach(o=>{if(isCropObj(o)&&(o.state==='weeds'||o.state==='used'))o.state='wild'})}
 IL_STEPS.forEach(([st,ids])=>ids.forEach(id=>setLvl(id,on?B+st:999)));
 ANIM.chicken.lvl=20;if(FIX.coop)FIX.coop.lvl=20;orchSigns(on)}
function orchSigns(on){document.querySelectorAll('.orchLbl').forEach(e=>e.remove());if(!on)return;
 [[4140,762],[540,1760]].forEach(([x,y])=>{const d=document.createElement('div');d.className='orchLbl';d.textContent='🌳 Сад — место для деревьев';d.style.left=x+'px';d.style.top=y+'px';$('world').appendChild(d)})}
function ilFeatures(){const B=S.ilBase,out=[];
 IL_STEPS.forEach(([st,ids,lines,cam])=>{if(st&&lines)out.push({k:'il_'+st,lvl:B+st,lines,cam:cam||null})});
 const CM={market:'market',wellI:'well',dairy:'dairy',spin:'spinnery',mill:'mill',oven:'oven',apiary:'apiary',pyard:'pyard',bakery:'bakery',fairI:'fair',smoke:'smokehouse'};
 FEATURES.forEach(f=>{if(['cows','sheep','coop','wxI','hard'].includes(f.k))return;let cam=null;
  if(CM[f.k]&&FIX[CM[f.k]])cam=[FIX[CM[f.k]].x,FIX[CM[f.k]].y-150];else if(f.k==='kitchen')cam=KITP;else if(f.k==='fish')cam=[SPOTS.fish.x,SPOTS.fish.y-80];else if(f.k==='forest')cam=[SPOTS.forest.x,SPOTS.forest.y];
  out.push({...f,cam})});
 return out}
function lvlOfXp(x){return level0(x)}
function makeIL(old){const L=lvlOfXp(old.xp),s=newState();const ru=JSON.parse(JSON.stringify(old));delete ru.ru;
 Object.assign(s,{done:true,tut:STEPS.length,xp:old.xp,seenLvl:Math.max(old.seenLvl||L,L),coins:200,upg:Object.assign({},old.upg,{drip:0}),ghLvl:1,tips:Object.assign({},old.tips,{il_0:1}),
  stats:old.stats||s.stats,daily:old.daily||s.daily,seenVer:old.seenVer,rod2:!!old.rod2,holGift:old.holGift||{},loc:'il',ilBase:L,orch:1,moved:0,orchMoved:0,catFixed:1,ilArrive:1,ru,firstPotato:false,lastSeen:now()});
 Object.assign(s.ui,{coins:true,xp:true,store:true,shop:true,board:true,quest:true});
 if(old.cat&&!old.cat.gone)s.cat=Object.assign({},old.cat,{food:now()+864e5,water:now()+864e5});else s.cat=old.cat||null;
 s.objs=[newCropObj('bed',0,0,0,0),newCropObj('bed',0,3,0,0),newCropObj('bed',0,0,2,0),newCropObj('bed',0,3,2,0),newCropObj('gh',7,0,0,0)];s.objs.forEach(o=>o.state='wild');s.wt=0;s.wildFix=1;s.tips.il_slow=1;s.tips.il_v32=1;s.tips.il_v34=1;s.ilNeigh=1;
 ANN_IDS.forEach(id=>{if(!isIL(id)&&L>=ANN[id][1])s.tips['crop_'+id]=1});PER_IDS.forEach(id=>{if(!isIL(id)&&L>=PER[id][2])s.tips['per_'+id]=1});
 Object.assign(s.inv,{seed_il_tomato:2,seed_il_cucumber:2,seed_il_mint:2});s.orders=[];s.quests=[];return s}

/* ---------- Letter & flight ---------- */
function showLetter(done){if(ilOn()){done();return}$('letterSv').src=IMG.sv0;$('letterDv').src=IMG.david1;modal('mLetter');SND.magic();
 $('letterGo').onclick=()=>{SND.tap();modal('mLetter',false);done();PQ.length=0;flyToIsrael()}}
function flyToIsrael(){const f=$('flight');f.classList.add('on');f.querySelector('.plane').style.animation='none';void f.offsetWidth;f.querySelector('.plane').style.animation='';
 [0,600,1200,1800].forEach(d=>setTimeout(()=>tone(380+d/8,.25,'sine',.05,520+d/8),d));
 setTimeout(()=>{const s=makeIL(S);S=s;save();startGame(s);setTimeout(()=>f.classList.remove('on'),900)},3600)}

/* ---------- Arrival & Svetlana ---------- */
function ilArrival(){if(!S.ilArrive){if(!S.tips.il_slow){S.tips.il_slow=1;save();sayLater([[8,'Мама, ты заметила? В Израиле всё делается не спеша. Теперь всё растёт, готовится и делается примерно в два раза дольше — савланут!'],[6,'А ещё на грядках снова вылезли сорняки. Прополи их инструментом из магазина (вкладка «Улучшения»): рыхлитель, грабли или тяпка — каждый следующий быстрее.'],[5,'А если накопишь 10 000 монет — купи трактор. Он сам будет вскапывать все грядки!']],[2370,1000,.55])}else if(!S.tips.il_v34&&S.tips.il_v32){S.tips.il_v34=1;save();sayLater([[9,'Мама, у нас большие новости!'],[5,'Теперь всё можно переставить по-своему: нажми на постройку или животное, выбери «Переставить» — и нажми на новое место.'],[2,'А ещё у нас будут свои мастерские: маслобойня, винодельня, цех специй и табун для питы и халы. Они открываются по одной, когда созреет урожай для них.'],[0,'И заказы теперь присылают наши соседи — Ави, бабушка Хана, Йоси с рынка и другие!']],[3300,1000,.5])}else if(!S.tips.il_v32){S.tips.il_v32=1;save();sayLater([[9,'Мама, хорошие новости! Поливать грядки каждые 20 минут больше не нужно.'],[3,'Но здесь жарко: если созревший урожай пролежит на грядке 20 часов — он засохнет. За 4 часа до этого над грядкой загорится красная табличка с таймером.'],[5,'А ещё к нам переехали коровы и овцы! Коровник стоит на пастбище, овчарня — во дворе рядом с курятником. Купить их можно в магазине.'],[1,'Сад — на лугу у пастбища и на участке за домом, там стоят таблички «Сад». Места хватит на 17 деревьев!']],[3300,1000,.5])}return}S.ilArrive=0;save();placeDavid(0);
 sayLater([[0,'Мама, ты приехала! Как я рада! Добро пожаловать в Израиль — на нашу дачу в мошаве, в Галилее.'],
  [6,'Честно, я совсем всё запустила: работа, Давид… Остались всего четыре заросшие грядки и одна старая теплица.'],
  [1,'Зато места тут очень много! Большое поле — для грядок, каменный двор — для теплиц, луг справа — для сада, а внизу — место для мастерских.']],[2370,1050,.55]);
 sayLater([[3,'Только запомни главное: тут жарко и сухо. Созревший урожай нельзя долго оставлять на грядке — через 20 часов он засохнет.'],
  [6,'Если созревший урожай пролежит на грядке 20 часов — он засохнет! В теплицах такого не бывает, а позже мы проведём капельный полив.']],[1980,860,.85]);
 sayLater([[8,'И ещё: в Израиле всё делается не спеша. Всё растёт, готовится и делается примерно в два раза дольше, чем дома. Савланут — терпение!'],
  [6,'А грядки совсем заросли сорняками. Сначала их надо прополоть: купи в магазине ручной рыхлитель (вкладка «Улучшения»), а потом вскопай лопатой.'],
  [2,'Вот тебе 200 монет и немного семян: черри-томаты, огурчики и мята. Из них на кухне делают израильский салат и лимонад!'],
  [5,'С каждым новым уровнем я буду показывать что-то новое: местные овощи, деревья, животных и рецепты.']]);
 sayLater([[2,'А вот и Давид! Он целыми днями играет во дворе, а ночью уходит спать в дом. Нажми на него — он так ждал бабушку!']],[DAV.x,DAV.y-120,1],()=>{S.tips.il_intro=1;save();camHome(true)})}

/* ---------- David ---------- */
const DAV_SPOTS=[[660,1560],[1300,1120],[1700,620],[2900,560],[2480,1690],[3980,1720]];
const DAV={x:660,y:1560,next:0,pose:0};
function placeDavid(i){const sp=DAV_SPOTS[i];DAV.x=sp[0];DAV.y=sp[1];DAV.pose=[0,1,4,6,7][Math.floor(Math.random()*5)];DAV.next=now()+25000+Math.random()*25000;drawDavid(true)}
function drawDavid(moved){if(!ilOn())return;let el=$('david');
 if(!el){el=document.createElement('div');el.id='david';el.dataset.tap='david';el.innerHTML='<img><div class="say">Привет, бабушка!</div>';$('objs').appendChild(el)}
 const im=el.querySelector('img');const src=IMG['david'+DAV.pose];if(im.getAttribute('src')!==src)im.setAttribute('src',src);
 el.style.left=DAV.x+'px';el.style.top=DAV.y+'px';el.style.zIndex=Math.round(DAV.y);im.style.transform=DAV.x>2600?'scaleX(-1)':'';
 if(moved)el.animate([{opacity:0,transform:'translate(-50%,-100%) scale(.85)'},{opacity:1,transform:'translate(-50%,-100%) scale(1)'}],{duration:500,easing:'ease-out'})}
function renderDavid(){if(!ilOn()){const e=$('david');if(e)e.remove();return}
 if(!$('david'))drawDavid(false);const el=$('david'),night=nightNow();el.style.display=night?'none':'';
 if(!night&&now()>DAV.next){let i;do{i=Math.floor(Math.random()*DAV_SPOTS.length)}while(DAV_SPOTS[i][0]===DAV.x&&DAV_SPOTS.length>1);placeDavid(i)}}
function tapDavid(){const el=$('david');if(!el)return;const s=el.querySelector('.say');s.classList.remove('on');void s.offsetWidth;s.classList.add('on');
 clearTimeout(DAV.sayT);DAV.sayT=setTimeout(()=>s.classList.remove('on'),2800);
 const prev=DAV.pose;DAV.pose=[1,3][Math.floor(Math.random()*2)];drawDavid(false);setTimeout(()=>{DAV.pose=prev;drawDavid(false)},1500);
 [0,120,240].forEach((d,i)=>setTimeout(()=>tone(880+i*220,.12,'triangle',.06),d));
 burst(DAV.x,DAV.y-150,10,['#ff6b8a','#ff9eb5','#ffd23f'],70,[8,14]);
 if(!S.davTap||S.davTap!==dayKey()){S.davTap=dayKey();addXp(5,DAV.x,DAV.y-200);save()}}

/* ---------- Drought ---------- */
WX.drought=['Засуха','w_sun','Засуха! Созревший урожай на грядках погибнет, если не собрать его за 20 часов. Бочка наполняется в 2 раза медленнее'];
const DRY_MS=20*3600000,DRY_WARN=4*3600000;
function ilWeather(){const sl=Math.floor(now()/10800000),r=rnd(sl*7+3),pr=rnd(sl*7-4);if(r<.1)return'rain';if(pr<.1&&r<.3)return'rainbow';if(r<.5)return'drought';return'sun'}
const droughtOn=()=>ilOn()&&!S.upg.drip&&weather()==='drought';
function droughtMul(o){return o.kind==='bed'&&droughtOn()?1.25:1}
const dryRisk=o=>ilOn()&&!S.upg.drip&&o.kind==='bed'&&isCropObj(o)&&isRipe(o)&&o.ripeAt>0;
function dryLeft(o){return dryRisk(o)?Math.max(0,o.ripeAt+DRY_MS-now()):null}
function dryWarn(o){const l=dryLeft(o);return l!=null&&l<DRY_WARN}
function droughtTick(t){let any=false;
 S.objs.forEach(o=>{if(o.dryAt)delete o.dryAt;const el=objEls[o.id];if(el)el.classList.remove('dry');if(!dryRisk(o))return;
  if(t-o.ripeAt>=DRY_MS){wither(o);return}if(t-o.ripeAt>=DRY_MS-DRY_WARN)any=true});
 if(any)tip('il_drought2',[[6,'Мама, урожай на грядке созрел, а его никто не собрал! Здесь жарко: если не собрать урожай за 20 часов — он засохнет.'],[3,'Над такой грядкой появится красная надпись с таймером. В теплицах урожай не сохнет, а капельный полив защитит все грядки.']])}
function wither(o){const n=ANN[o.crop]?ANN[o.crop][0]:'урожай';Object.assign(o,{state:'used',crop:null,fert:false,frac:0,waterIdx:0,seg:null,speed:1,total:0,ripeAt:0});delete o.dryAt;
 const el=objEls[o.id];if(el)el.classList.remove('dry');renderObj(o,false);const R=rectOf(o);burst(R.x+R.w/2,R.y+R.h/2,14,['#a0712c','#c9a15a','#7a5a2a'],90,[6,12]);SND.fail();toast('Засуха погубила урожай: '+n.toLowerCase()+'. Собирай урожай вовремя!');stat('wither');save()}
function dripItem(){if(!ilOn()||!vis(DRIP_LVL))return[];const ok=level()>=DRIP_LVL;
 return[{k:'drip',name:'Капельный полив',desc:ok?'Урожай на грядках больше не засыхает, а в засуху растёт как обычно':'Откроется на уровне '+DRIP_LVL,img:IMG.i_can,cost:cost(900),lock:!ok,maxed:!!S.upg.drip,btn:S.upg.drip?'Есть ✔':null,
  act:()=>{S.upg.drip=1;SND.level();toast('Капельный полив проведён! Засуха грядкам больше не страшна');renderAllObjs();save()}}]}

/* ---------- v3.1: weeding tools & tractor ---------- */
const WT=[null,['Ручной рыхлитель',120,40,'t_cult'],['Грабли',600,20,'t_rake'],['Тяпка',1800,8,'t_hoe']];
const wtImg=()=>WT[S&&S.wt?S.wt:1][3];
function wildHTML(rot){const pts=rot?[[.25,.2],[.7,.18],[.3,.48],[.75,.5],[.25,.8],[.7,.82],[.5,.65]]:[[.12,.35],[.4,.3],[.68,.35],[.9,.4],[.2,.85],[.5,.82],[.8,.88],[.32,.6]];
 return pts.map(([u,v],i)=>`<div class="wtuft" style="left:${u*100}%;top:${v*100}%"><svg viewBox="0 0 40 46" width="${i%2?42:52}"><path d="M20 44 C18 30 8 24 4 14 M20 44 C20 28 16 12 18 2 M20 44 C22 30 30 22 36 12 M20 44 C24 34 34 32 38 26 M20 44 C16 36 6 34 2 30" stroke="#3d6e1f" stroke-width="3.2" fill="none" stroke-linecap="round"/>${i%3===0?'<circle cx="18" cy="4" r="4.5" fill="#f4d03f" stroke="#b7950b" stroke-width="1.2"/>':''}</svg></div>`).join('')}
function toolItems(){if(!ilOn())return[];const a=[1,2,3].map(n=>{const W=WT[n],own=(S.wt||0)>=n;return{k:'wt'+n,name:W[0],desc:`Прополка сорняков: ~${fmt(W[2]*tm()*1000)} на грядку`+(n>1?' · быстрее':''),img:IMG[W[3]],cost:cost(W[1]),maxed:own,btn:own?'Есть ✔':null,lock:n>(S.wt||0)+1,
  act:()=>{S.wt=n;SND.level();toast(W[0]+' куплен! Нажми на заросшую грядку, чтобы прополоть');renderAllObjs();save()}}});
 a.push({k:'tractor',name:'Трактор',desc:'Сам вскапывает все свободные грядки на поле',img:IMG.t_tractor,cost:10000,maxed:!!S.tractor,btn:S.tractor?'Есть ✔':null,act:()=>{S.tractor=1;SND.level();toast('Трактор куплен! Теперь он сам вскапывает грядки');tractorTick(now());save()}});return a}
const TRP=[1640,1190];const TR={target:null,doneAt:0,idleAt:0,home:true};
function trEl(){let el=$('tractor');if(!el){el=document.createElement('div');el.id='tractor';el.dataset.tap='tractor';el.innerHTML=`<img src="${IMG.t_tractor}">`;el.style.left=TRP[0]+'px';el.style.top=TRP[1]+'px';el.style.zIndex=TRP[1];$('objs').appendChild(el);TR.home=true;TR.target=null}return el}
function tractorTick(t){if(!ilOn()||!S.tractor)return;const el=trEl();
 if(TR.target){if(t<TR.doneAt)return;const o=objById(TR.target);TR.target=null;TR.idleAt=t;
  if(o&&!o.busy&&(o.state==='used'||o.state==='weeds')){o.state='dug';renderObj(o);const R=rectOf(o);burst(R.x+R.w/2,R.y+R.h/2,14,['#a8743f','#7a4e26','#c49a6c'],100,[6,12]);SND.dig();addXp(1,R.x+R.w/2,R.y);stat('dig');save()}}
 const nx=S.objs.find(o=>o.kind==='bed'&&!o.busy&&(o.state==='used'||o.state==='weeds'));
 if(nx){const R=rectOf(nx);TR.target=nx.id;TR.doneAt=t+2600;TR.home=false;el.style.left=(R.x+R.w/2)+'px';el.style.top=(R.y+R.h*.8)+'px';el.style.zIndex=Math.round(R.y+R.h+5);return}
 if(!TR.home&&t-TR.idleAt>4000){TR.home=true;el.style.left=TRP[0]+'px';el.style.top=TRP[1]+'px';el.style.zIndex=TRP[1]}}

/* ---------- v3.4: player moves buildings & animals ---------- */
let mv=null;
function mvStore(){if(!S.mv||typeof S.mv!=='object')S.mv={fix:{},ani:{}};S.mv.fix=S.mv.fix||{};S.mv.ani=S.mv.ani||{};return S.mv}
function applyMoves(){const M=mvStore();for(const k in M.fix)if(FIX[k]&&!FIX[k].hid){FIX[k].x=M.fix[k][0];FIX[k].y=M.fix[k][1]}
 for(const a in M.ani)if(ANIM[a])for(const i in M.ani[a])if(ANIM[a].pos[i])ANIM[a].pos[i]=M.ani[a][i].slice()}
function mvEl(sel){return sel.t==='fix'?fixEls[sel.k]:aniEls[sel.a+sel.i]}
function mvPos(sel){return sel.t==='fix'?[FIX[sel.k].x,FIX[sel.k].y]:ANIM[sel.a].pos[sel.i].slice()}
function startMove(){if(!S.done||placing)return;closeTray();mv={sel:null,undo:[]};document.body.classList.add('moving');
 $('placeBar').classList.add('on');$('pRot').style.display='none';$('pOk').textContent='✔ Готово';$('placeTip').textContent='Нажми на постройку или животное, а потом — на новое место';$('placeTip').classList.add('on');
 tip('move',[[9,'Мама, здесь можно всё расставить по-своему! Нажми на постройку или животное — оно засветится.'],[5,'Потом нажми на свободное место — и оно переедет туда. На грядки, теплицы и сад ставить нельзя. Когда закончишь — «Готово».']])}
function endMove(){if(!mv)return;if(mv.sel){const e=mvEl(mv.sel);e&&e.classList.remove('mvsel')}mv=null;document.body.classList.remove('moving');$('placeBar').classList.remove('on');$('placeTip').classList.remove('on');$('pOk').textContent='✔ Поставить';save()}
function mvSelect(sel){if(mv.sel){const e=mvEl(mv.sel);e&&e.classList.remove('mvsel')}mv.sel=sel;const e=mvEl(sel);if(e)e.classList.add('mvsel');SND.pop();
 $('placeTip').textContent=(sel.t==='fix'?FIX[sel.k].n:ANIM[sel.a].name)+': нажми на новое место'}
function inZone(x,y,pad){return ZONES.some(Z=>{const cs=Z.k==='per'?80:96,rh=Z.k==='per'?56:96;return x>Z.x0-pad&&x<Z.x0+Z.cols*cs+pad&&y>Z.y0-pad&&y<Z.y0+Z.rows*rh+pad})}
function mvOk(sel,x,y){if(x<80||x>WW-80||y<300||y>WH-10)return false;
 for(const h of document.querySelectorAll('.hitz[data-tap=house],.hitz[data-tap=barrel]')){const L=parseFloat(h.style.left),T=parseFloat(h.style.top),W=parseFloat(h.style.width),H=parseFloat(h.style.height);if(x>L&&x<L+W&&y>T&&y<T+H)return false}
 if(sel.t==='fix'){const w=FIX[sel.k].w;for(const dx of [-w*.45,0,w*.45])if(inZone(x+dx,y-10,0)||inZone(x+dx,y+70,0)||inZone(x+dx,y-w*.5,0))return false;
  for(const k in FIX){if(k===sel.k||FIX[k].hid)continue;const F=FIX[k],el=fixEls[k];if(el&&el.style.display==='none')continue;if(Math.abs(F.x-x)<(F.w+w)*.42&&Math.abs(F.y-y)<Math.max(F.w,w)*.55)return false}return true}
 return !inZone(x,y,10)}
function mvApply(sel,p){const[x,y]=p;const M=mvStore();
 if(sel.t==='fix'){const F=FIX[sel.k];F.x=x;F.y=y;M.fix[sel.k]=[x,y];const el=fixEls[sel.k];if(el){el.style.left=x+'px';el.style.top=y+'px';el.style.zIndex=y}
  const b=$('kb_'+sel.k);if(b){const q=fbPos(sel.k);b.style.left=q[0]+'px';b.style.top=q[1]+'px'}}
 else{const A=ANIM[sel.a];A.pos[sel.i]=[x,y];(M.ani[sel.a]=M.ani[sel.a]||{})[sel.i]=[x,y];const el=aniEls[sel.a+sel.i];if(el){el.style.left=x+'px';el.style.top=y+'px';el.style.zIndex=y}
  const b=aBub[sel.a+sel.i];if(b){b.style.left=x+'px';b.style.top=(y-A.w*.72)+'px'}}}
function mvTap(target,wp){const el=target&&target.closest?target.closest('[data-tap]'):null;const t=el&&el.dataset.tap||'';
 if(t.startsWith('fix:')){const k=t.slice(4);if(FIX[k]&&!FIX[k].hid){mvSelect({t:'fix',k});return}}
 if(t.startsWith('ani:')){const[,a,i]=t.split(':');if(ANIM[a]&&ANIM[a].pos[+i]){mvSelect({t:'ani',a,i:+i});return}}
 if(!mv.sel){toast('Сначала нажми на постройку или животное');SND.fail();return}
 const x=Math.round(wp[0]),y=Math.round(wp[1]+(mv.sel.t==='fix'?FIX[mv.sel.k].w*.35:20));
 if(!mvOk(mv.sel,x,y)){toast('Сюда нельзя — выбери свободное место');SND.fail();return}
 mv.undo.push([mv.sel,mvPos(mv.sel)]);mvApply(mv.sel,[x,y]);SND.plant();burst(x,y-20,10,['#e8d3a0','#fff'],60,[4,8]);save()}
$('pOk').addEventListener('click',()=>{if(!mv)return;endMove();toast('Готово! Всё стоит на новых местах')});
$('pNo').addEventListener('click',()=>{if(!mv)return;while(mv.undo.length){const[s,p]=mv.undo.pop();mvApply(s,p)}endMove();toast('Перестановка отменена')});
function ilNeighFix(){if(!ilOn()||S.ilNeigh)return;S.ilNeigh=1;(S.orders||[]).forEach(o=>{const n=ILNEIGH[Math.floor(Math.random()*ILNEIGH.length)];o.who=n[0];o.ava=n[1]})}

function moveOne(sel){if(!S.done||placing)return;closeTray();if(mv)endMove();mv={sel:null,undo:[]};document.body.classList.add('moving');
 $('placeBar').classList.add('on');$('pRot').style.display='none';$('pOk').textContent='✔ Готово';$('placeTip').classList.add('on');mvSelect(sel);
 tip('move',[[9,'Нажми на свободное место — и оно переедет туда. Можно переставлять, пока не нажмёшь «Готово». На грядки, теплицы, сад и дом ставить нельзя.']])}
