
/* ================= v2.0: NEW LOCATION, SPOTS ================= */
function orchardFix(){if(S.orch)return;const per=S.objs.filter(o=>o.kind==='bush'||o.kind==='tree');S.objs=S.objs.filter(o=>o.kind!=='bush'&&o.kind!=='tree');
 per.forEach(o=>{const keep={z:o.z,c:o.c,r:o.r};o.rot=0;const sp=findSpot(o);if(sp)Object.assign(o,sp);else Object.assign(o,keep);S.objs.push(o)});S.orch=1;S.orchMoved=per.length}
function relocate(){const objs=S.objs.slice().sort((a,b)=>(isCropObj(b)?1:0)-(isCropObj(a)?1:0));S.objs=[];let refund=0;
 objs.forEach(o=>{o.z=0;o.c=0;o.r=0;const sp=findSpot(o);if(sp){Object.assign(o,sp);S.objs.push(o)}else refund+=isCropObj(o)?150:PER[o.p][3]});
 if(refund)S.coins+=refund;S.loc=2;S.moved=1;S.catFixed=0}
function rnd(n){const x=Math.sin(n*12.9898+78.233)*43758.5453;return x-Math.floor(x)}
const SPOTS={fish:{lbl:'🎣 Рыбалка',lvl:FISH_LVL,x:3450,y:1120,hit:[3000,1010,1080,560]},fishhut:{tap:'fish',lvl:FISH_LVL,hit:[3830,520,440,400]},
 forest:{lbl:'🌲 В лес',lvl:FOREST_LVL,x:2290,y:600,sign:1,hit:[2210,420,170,190]}};
const SIGNSVG='<svg viewBox="0 0 120 150" width="120" height="150"><path d="M58 40v108" stroke="#5b391c" stroke-width="10"/><path d="M10 22h86l20 20-20 20H10z" fill="#c58a4e" stroke="#5b391c" stroke-width="5" stroke-linejoin="round"/><text x="54" y="51" font-size="26" font-weight="900" text-anchor="middle" fill="#fff" stroke="#5b391c" stroke-width="1.5" font-family="Arial">ЛЕС</text><path d="M20 140l12-26 12 26zM78 142l14-32 14 32z" fill="#2e7d32" stroke="#1b4d1e" stroke-width="3"/></svg>';
function renderSpots(){for(const k in SPOTS){const P=SPOTS[k];let el=$('sp_'+k);
  if(!el){el=document.createElement('div');el.id='sp_'+k;el.className='spot';el.dataset.tap=P.tap||k;const h=P.hit;el.style.cssText=`left:${h[0]}px;top:${h[1]}px;width:${h[2]}px;height:${h[3]}px;z-index:${h[1]+h[3]}`;
   if(P.sign)el.innerHTML=`<div style="position:absolute;left:50%;bottom:0;transform:translateX(-50%)">${SIGNSVG}</div>`;
   if(P.lbl)el.innerHTML+=`<div class="lk sign" style="left:${P.x-h[0]}px;top:${P.y-h[1]-(P.sign?150:0)}px">${P.lbl}</div>`;$('objs').appendChild(el)}
  const on=S.done&&level()>=P.lvl;el.style.display=on?'':'none'}
 renderDecor()}

/* ================= WEATHER ================= */
const WX={sun:['Ясно','w_sun','Хорошая погода для дачи!'],rain:['Дождь','w_rain','Дождь сам поливает грядки и сад на улице и наполняет бочку'],heat:['Жара','w_sun','В жару бочка наполняется медленнее — поливай с умом'],rainbow:['Радуга','w_rainbow','Радуга! Скупщик платит на 20% больше']};
let forcedWx=null;
function weather(){if(forcedWx)return forcedWx;if(S&&S.done&&ilOn())return ilWeather();if(!S||!S.done||level()<WX_LVL)return'sun';const sl=Math.floor(now()/10800000),r=rnd(sl),pr=rnd(sl-1);if(r<.22)return'rain';if(pr<.22&&r<.6)return'rainbow';if(r<.36)return'heat';return'sun'}
const wxMult=()=>weather()==='rainbow'?1.2:1;
let wxCur=null;
function renderWx(){const w=weather(),W=WX[w],on=S.done&&(level()>=WX_LVL||!!forcedWx||ilOn());$('hWx').classList.toggle('hide',!on);if(!on){if(wxCur!=='off'){wxCur='off';$('wxfx').className='';$('wxfx').innerHTML='';$('rainbowArc')&&$('rainbowArc').remove()}return}
 if(wxCur!==w){const prev=wxCur;wxCur=w;$('wxImg').src=IMG[W[1]];$('wxTxt').textContent=W[0];const fx=$('wxfx');fx.className=w==='drought'?'heat':w;fx.innerHTML=w==='rain'?Array.from({length:70},()=>`<i style="left:${Math.random()*112}%;animation-duration:${(.55+Math.random()*.45).toFixed(2)}s;animation-delay:-${(Math.random()*1.2).toFixed(2)}s;opacity:${(.5+Math.random()*.5).toFixed(2)}"></i>`).join(''):'';
  let rb=$('rainbowArc');if(w==='rainbow'&&!rb){rb=document.createElement('div');rb.id='rainbowArc';rb.dataset.tap='rainbow';rb.style.left=RAINP[0]+'px';rb.style.top=RAINP[1]+'px';rb.innerHTML='<svg viewBox="0 0 1000 520" width="1400" height="728">'+['#e53935','#fb8c00','#fdd835','#43a047','#1e88e5','#5e35b1'].map((c,i)=>`<path d="M${40+i*26} 520A${460-i*26} ${460-i*26} 0 0 1 ${960-i*26} 520" fill="none" stroke="${c}" stroke-width="26" opacity=".55"/>`).join('')+'</svg>';$('world').insertBefore(rb,$('objs'))}
  if(w!=='rainbow'&&rb)rb.remove();
  if(prev&&w==='rain')toast('Пошёл дождь — он польёт грядки за тебя!');if(prev&&w==='rainbow')toast('Над рекой радуга! Скупщик платит больше');
  if(w!=='sun'&&(S.tips.wxI||ilOn())&&!(ilOn()&&(w==='drought'||!S.tips.il_intro)))tip('wx_'+w,[[w==='rain'?6:w==='heat'?4:7,W[2]+'. Погода меняется каждые 3 часа — смотри значок вверху.']])}}
function rainTick(){if(!S.done||weather()!=='rain')return;let n=0;if(!S.build.well&&S.water<waterMax()){S.water=waterMax();S.waterAt=now();renderHUD()}
 S.objs.forEach(o=>{if(o.kind==='gh'||o.busy||o.bug||!needsWater(o))return;if(isCropObj(o)){o.waterIdx++;startSeg(o)}else{const P=PER[o.p];o.seg={t0:now(),t1:now()+(o.stage===0?P[4]:P[5])*1000*tm()}}stat('water');n++;renderObj(o);const R=rectOf(o);rainAt(R.x+R.w/2,R.y+R.h/2)});
 if(n){toast('Дождик полил грядки: '+n);save()}}
$('hWx').addEventListener('pointerdown',e=>{e.stopPropagation();SND.tap();const W=WX[weather()];toast(W[0]+': '+W[2])});

/* ================= HOLIDAYS ================= */
function holiday(d=new Date()){const m=d.getMonth()+1,day=d.getDate();if((m===12&&day>=20)||(m===1&&day<=10))return'ny';if((m===2&&day>=20)||(m===3&&day<=14))return'masl';if((m===4&&day>=10)||(m===5&&day<=5))return'easter';if(m===10||(m===11&&day<=20))return'harvest';return null}
const HOL={harvest:{n:'Праздник урожая',ico:'h_pumpkin',bonus:'соседи платят за заказы на 20% больше',dec:[['hd_pumpkin',1300,712,140],['hd_pumpkin',250,990,110],['hd_flags',1430,420,300]]},
 ny:{n:'Новый год',ico:'h_tree',bonus:'подарок за вход — двойной',dec:[['hd_tree',1300,712,170],['hd_snowman',250,990,130],['hd_gift',1400,712,110]]},
 masl:{n:'Масленица',ico:'h_masl',bonus:'блины продаются в 1,5 раза дороже',dec:[['hd_masl',1300,712,130],['hd_samovar',1430,520,110]]},
 easter:{n:'Пасха',ico:'h_kulich',bonus:'яйца продаются в 1,5 раза дороже',dec:[['hd_kulich',1300,712,130],['hd_samovar',1430,520,110]]}};
const holOn=()=>S&&S.done&&level()>=HOL_LVL?holiday():null;
function holMult(kind,id){const h=holOn();if(!h)return 1;if(kind==='orders'&&h==='harvest')return 1.2;if(kind==='sell'){if(h==='masl'&&id==='blini')return 1.5;if(h==='easter'&&/^egg/.test(id))return 1.5}return 1}
const holKey=()=>holiday()+new Date().getFullYear()+(holiday()==='ny'&&new Date().getMonth()===0?-1:0);
function renderDecor(){const h=holOn();document.querySelectorAll('.deco').forEach(e=>{if(e.dataset.h!==h)e.remove()});$('hHol').classList.toggle('hide',!h);if(!h)return;
 const H=HOL[h];$('holImg').src=IMG[H.ico];$('holTxt').textContent=H.n;
 H.dec.forEach((d,i)=>{if($('dec'+i+h))return;const el=document.createElement('div');el.id='dec'+i+h;el.className='fix deco';el.dataset.h=h;el.style.cssText=`left:${d[1]}px;top:${d[2]}px;width:${d[3]}px;z-index:${d[2]};pointer-events:none`;el.innerHTML=`<img src="${IMG[d[0]]}">`;$('objs').appendChild(el)});
 let ch=$('holChest');const got=S.holGift[holKey()];if(got&&ch){ch.remove();ch=null}
 if(!got&&!ch){ch=document.createElement('div');ch.id='holChest';ch.className='fix deco';ch.dataset.h=h;ch.dataset.tap='chest';ch.style.cssText=`left:${CHESTP[0]}px;top:${CHESTP[1]}px;width:110px;z-index:${CHESTP[1]}`;ch.innerHTML=`<img src="${IMG.hd_chest}" style="animation:bob 1.2s ease-in-out infinite"><div class="lk sign" style="bottom:auto;top:-36px">🎁</div>`;$('objs').appendChild(ch)}}
function holidayHello(){const h=holOn();if(!h)return;const H=HOL[h];tip('hol_'+holKey(),[[7,`У нас праздник — ${H.n}! Я украсила дачу.`],[5,`Пока идёт праздник, ${H.bonus}. А у крыльца стоит праздничный сундучок — открой его!`]],HOLCAM)}
function openChest(){const h=holOn();if(!h||S.holGift[holKey()])return;S.holGift[holKey()]=1;const c=50+15*level();const c0=coinPos();addCoins(c,c0[0],c0[1]);addItem('fert',2);addItem('worms',5);
 SND.magic();burst(CHESTP[0],CHESTP[1]-70,26,['#ffd23f','#ff7aa8','#7fd3ff','#9be36d'],140);toast(HOL[h].n+': '+c+' монет, 2 удобрения и 5 червей!');renderDecor();save()}
$('hHol').addEventListener('pointerdown',e=>{e.stopPropagation();SND.tap();const h=holOn();if(h)toast(HOL[h].n+': '+HOL[h].bonus)});

/* ================= FISHING ================= */
const FISH_TIME=5*60000;
function fishPool(){const L=level();return Object.entries(FISH).filter(([k,f])=>L>=f[1]).map(([k,f])=>[k,f[3]*(S.rod2&&['f_pike','f_zander','f_catfish'].includes(k)?2.5:1)])}
function pickW(arr){const tot=arr.reduce((a,x)=>a+x[1],0);let r=Math.random()*tot;for(const x of arr){r-=x[1];if(r<=0)return x[0]}return arr[0][0]}
const fishState=()=>!S.fishing?'idle':now()>=S.fishing.t1?'ready':'wait';
function openFishing(){if(level()<FISH_LVL){toast('Рыбалка откроется на уровне '+FISH_LVL);SND.fail();return}$('fRod').src=IMG[S.rod2?'fd_rod2':'fd_rod1'];$('fRes').innerHTML='';renderFish();modal('mFish')}
function renderFish(){const st=fishState(),b=$('fBtn'),fl=$('fFloat');$('fWorms').textContent=S.inv.worms||0;
 fl.className=st==='wait'?'bob':st==='ready'?'nib':'';fl.style.display=$('fLine').style.display=st==='idle'?'none':'';
 b.classList.toggle('bite',st==='ready');b.classList.toggle('off',st==='wait'||(st==='idle'&&!S.inv.worms));
 b.textContent=st==='idle'?'🎣 Закинуть удочку':st==='ready'?'🐟 Забрать улов':'⏳ Ловится… '+fmt(S.fishing.t1-now());
 if(st==='wait')$('fMsg').textContent='Удочка стоит, рыба ловится. Можно закрыть окно и заниматься дачей — улов подождёт!';
 if(st==='ready')$('fMsg').textContent='Поплавок дёргается — улов готов! Забирай.';
 if(st==='idle'&&!$('fRes').innerHTML)$('fMsg').textContent=S.inv.worms?`Закинь удочку (1 червяк) — через ${fmt(fishDur())} будет улов${S.rod2?' из 2 рыб':''}.`:'Нет червей — купи их в магазине (вкладка «Рыбалка»)'}
const fishDur=()=>FISH_TIME*(S.rod2?.8:1)*(ilOn()?2:1);
function castFish(){const st=fishState();if(st==='ready'){collectFish();return}if(st==='wait')return;
 if(!S.inv.worms){toast('Нет червей — купи в магазине, вкладка «Рыбалка»');SND.fail();modal('mFish',false);openShop('fish');return}
 takeItem('worms',1);S.fishing={t0:now(),t1:now()+fishDur()};$('fRes').innerHTML='';SND.pop();toast('Удочка заброшена! Улов через '+fmt(fishDur()));renderFish();renderFishBub();save()}
function collectFish(){if(fishState()!=='ready')return;S.fishing=null;const n=S.rod2?2:1,got=[];SND.harvest();
 for(let i=0;i<n;i++){const k=pickW(fishPool()),F=FISH[k];stat('fish');stat('fish_'+k);got.push(k);
  if(k==='f_gold')setTimeout(()=>msg('Золотая рыбка','Отпустишь — она исполнит желание: 300 монет и 3 удобрения. Или оставим и продадим за 500?',[{t:'Отпустить ✨',f:()=>{const c=coinPos();addCoins(300,c[0],c[1]);addItem('fert',3);addXp(40);SND.magic();toast('Желание исполнено!');save()}},{t:'Оставить',cls:'orange',f:()=>{addItem(k,1);addXp(20);save()}}]),600);
  else{addItem(k,1);addXp(3+Math.round(F[2]/15))}}
 $('fRes').innerHTML=got.map(k=>`<div style="display:inline-block;margin:0 10px"><img src="${IMG[k]}"><div>${FISH[k][0]}</div></div>`).join('');
 $('fRes').animate([{transform:'translateX(-50%) scale(.2)',opacity:0},{transform:'translateX(-50%) scale(1.1)',opacity:1},{transform:'translateX(-50%) scale(1)'}],{duration:600,easing:'ease-out'});
 $('fMsg').textContent='Улов: '+got.map(k=>FISH[k][0].toLowerCase()).join(' и ')+'! Рыба уже в сарае. Закинешь ещё?';renderFish();renderFishBub();renderHUD();save()}
let fbKey='';
function renderFishBub(){let el=$('fishBub');if(!el){el=document.createElement('div');el.id='fishBub';el.className='bb';el.dataset.tap='fish';el.style.pointerEvents='auto';el.style.left=FISHBUB[0]+'px';el.style.top=FISHBUB[1]+'px';$('kbubs').appendChild(el);fbKey=''}
 const on=S.done&&level()>=FISH_LVL;el.style.display=on?'':'none';if(!on)return;const st=fishState();
 const key=st+(st==='wait'?fmt(S.fishing.t1-now()):'');if(key===fbKey)return;
 if(st==='ready'&&fbKey.startsWith('wait')){SND.harvest();toast('Рыбалка: улов готов!')}fbKey=key;
 el.innerHTML=st==='ready'?`<div class="kb ready"><img src="${IMG.f_perch}">Улов!</div>`:st==='wait'?`<div class="kb"><img src="${IMG.fd_float}"><span>${fmt(S.fishing.t1-now())}</span></div>`:`<div class="kb"><img src="${IMG.worms}">Закинуть</div>`;
 if($('mFish').classList.contains('on'))renderFish()}
$('fBtn').addEventListener('click',()=>{ac();castFish()});
$('fClose').addEventListener('click',()=>{modal('mFish',false);SND.tap()});

/* ================= FOREST ================= */
const FSPOTS=[[12,62],[22,72],[30,82],[17,90],[38,93],[47,41],[55,50],[62,43],[69,56],[60,63],[44,68],[51,89],[58,82],[66,91],[76,69],[86,73],[90,91],[80,87],[8,82],[28,60],[36,52],[73,47]];
const FOREST_CD=3*3600000;
function genForest(){const sp=FSPOTS.slice().sort(()=>Math.random()-.5);const pool=Object.entries(FOREST).map(([k,f])=>[k,f[2]]);const n=9+Math.floor(Math.random()*3);
 S.forest={at:now(),items:sp.slice(0,n).map(([x,y])=>({k:pickW(pool),x,y}))};save()}
function openForest(){if(level()<FOREST_LVL){toast('Лес откроется на уровне '+FOREST_LVL);SND.fail();return}if(!S.forest||(now()-S.forest.at>FOREST_CD))genForest();renderForest();modal('mForest')}
function renderForest(){const box=$('forestBox');box.querySelectorAll('.fi').forEach(e=>e.remove());const L=S.forest.items;
 L.forEach((it,i)=>{const d=document.createElement('div');d.className='fi';d.style.left=it.x+'%';d.style.top=it.y+'%';d.innerHTML=`<img src="${IMG['fo_'+it.k]||IMG[it.k]}">`;d.onclick=()=>pickForest(i,d);box.appendChild(d)});
 const left=S.forest.at+FOREST_CD-now();$('forestMsg').textContent=L.length?'Нажимай на грибы и ягоды, чтобы собрать. Мухоморы не трогай!':'Всё собрано! Новые грибы вырастут через '+fmt(left)}
function pickForest(i,d){const it=S.forest.items[i];if(!it)return;S.forest.items.splice(i,1);
 if(it.k==='m_fly'){SND.fail();toast('Мухомор ядовитый — такой не берём!');d.animate([{transform:'translate(-50%,-100%) scale(1)'},{transform:'translate(-50%,-100%) scale(0) rotate(90deg)',opacity:0}],{duration:400,fill:'forwards'});setTimeout(renderForest,420);save();return}
 addItem(it.k,1);stat('forest');SND.pop();addXp(1);d.animate([{transform:'translate(-50%,-100%) scale(1)'},{transform:'translate(-50%,-160%) scale(1.3)',opacity:1,offset:.4},{transform:'translate(-50%,-240%) scale(.4)',opacity:0}],{duration:500,fill:'forwards'});
 const t=document.createElement('div');t.className='ftxt';t.textContent='+1 '+FOREST[it.k][0];t.style.left=it.x+'%';t.style.top=(it.y-8)+'%';$('forestBox').appendChild(t);setTimeout(()=>t.remove(),1100);
 setTimeout(renderForest,520);renderHUD();save()}
$('forestClose').addEventListener('click',()=>{modal('mForest',false);SND.tap()});

/* ================= FAIR ================= */
const FAIR_CD=4*3600000;
function fairWeekend(){const d=new Date().getDay();return d===0||d===6}
function genFair(){const p=[];for(const f in FAC)if(facOn(f))Object.entries(FAC[f].rec).forEach(([id,r])=>{if(level()>=r[0]&&!RAW.has(id)&&id!=='feed')p.push(id)});
 const pick4=p.sort(()=>Math.random()-.5).slice(0,4);S.fair={at:now(),items:pick4.map(k=>({k,left:3}))};save()}
const fairPrice=k=>Math.round(baseSell(k)*1.35*(fairWeekend()?1.2:1)*holMult('sell',k));
function openFair(){if(!S.fair||now()-S.fair.at>FAIR_CD)genFair();renderFair();modal('mFair')}
function renderFair(){const l=$('fairList');l.innerHTML='';$('fairInfo').textContent=(fairWeekend()?'🎉 Выходные: цены ещё выше! ':'')+'Новые покупатели через '+fmt(S.fair.at+FAIR_CD-now());
 if(!S.fair.items.length)l.innerHTML='<div class="mtext">Сегодня всё раскупили — приходи позже!</div>';
 S.fair.items.forEach((it,i)=>{const have=S.inv[it.k]||0,p=fairPrice(it.k);const d=document.createElement('div');d.className='mrow';
  d.innerHTML=`<img src="${iImg(it.k)}"><div class="mn">${iName(it.k)} — нужно ещё ${it.left}<small>${p} монет за штуку · у тебя ${have}${have?'':' · '+srcHint(it.k)}</small></div><div class="btn ${have?'':'off'}">Продать</div>`;
  d.querySelector('.btn').onclick=()=>{if(!S.inv[it.k])return;takeItem(it.k,1);it.left--;if(it.left<=0)S.fair.items.splice(i,1);const c=coinPos();addCoins(p,c[0],c[1]);addXp(Math.round(p/25));stat('fair');renderFair();renderHUD();save()};l.appendChild(d)})}

/* ================= CAT FIX & MOVE NOTICE ================= */
let catQ=false;
function catArrival(){if(!S.done||level()<CAT_LVL||catQ)return;if(S.cat&&!S.cat.gone){S.catFixed=1;return}if(S.catFixed&&S.cat)return;
 const old=S.cat&&S.cat.name;catQ=true;S.tips.cat=1;S.catFixed=1;save();
 sayLater([[2,old?`Смотри, кто пришёл — ${old}! Он нашёл нас на новой даче и хочет остаться.`:'Ой, смотри — к нам на дачу пришёл котик! Похоже, хочет остаться…'],[1,'Давай дадим ему имя! Его нужно кормить и поить каждый день.']],[CATP[0]+150,CATP[1]-80,1.1],()=>askCatName(old))}
function orchNotice(){if(!S.orchMoved||!S.done)return;S.orchMoved=0;save();sayLater([[0,'Смотри, я пересадила наш сад на большой луг у дома! Теперь у каждого деревца и кустика своё место, они не мешают друг другу и урожай собирать удобно.'],[5,'Курятник и птичий двор теперь будут наверху, у беседки.']],[480,1250,.7])}
function moveNotice(){if(!S.moved||!S.done)return;S.moved=0;save();
 sayLater([[0,'Сюрприз! Мы переехали на новую большую дачу у реки! Твой уровень, монеты, сарай, грядки, теплицы, сад и животные — всё переехало с нами.'],[1,'Участок огромный — двигай его пальцем во все стороны. Кнопка с прицелом справа вернёт тебя к грядкам. Места теперь хватит на 16 грядок и 5 теплиц!']],[1560,960,.62]);
 sayLater([[5,'Места тут хватит на всё, что откроется потом. Начиная с 19 уровня на участке будут появляться новинки — по одной за уровень. Я расскажу о каждой!']],null,()=>camHome(true))}
