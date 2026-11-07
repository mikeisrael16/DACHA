
/* ================= SHOP ================= */
let shopTab='seeds';
const UPG={shovel:['Острая лопата','Вскопка и посадка на 20% быстрее','i_shovel',[15,35,70,140]],can:['Большая лейка','+1 полив за один набор воды','i_can',[30,70,140,280]],
 soil:['Плодородная почва','Всё растёт на 12% быстрее','p_potato_plant',[25,50,100,200,400]],gutter:['Водосток с крыши','Бочка наполняется на 25% быстрее','barrelI',[20,45,90,180]],cap:['Ещё одна бочка','+3 к запасу воды','barrelI',[60,150,300]]};
function bedCount(){return S.objs.filter(o=>o.kind==='bed').length}
function bedLimit(){return Math.min(10,2+Math.floor(level()/2))}
function ghCount(){return S.objs.filter(o=>o.kind==='gh').length}
function upgItem(k){const u=UPG[k],lv=S.upg[k],max=u[3].length;return{name:u[0],desc:u[1]+` · ур. ${lv}/${max}`,img:IMG[u[2]],cost:lv<max?cost(u[3][lv]):0,maxed:lv>=max,btn:lv>=max?'Максимум':null,act:()=>{S.upg[k]++;SND.level();toast(u[0]+' — уровень '+S.upg[k]+'!');renderHUD()}}}
const SHOP={
 seeds:{name:'Семена',items:()=>ANN_IDS.map(id=>{const c=ANN[id],ok=annUnlocked(id);return{k:'seed_'+id,name:c[0],desc:ok?`⏱ ~${fmt(D.grow(id))} · поливов ${c[3]} · цена ${c[5]}`:'Откроется на уровне '+(id==='carrot'?'обучения':c[1]),img:IMG[id+'_seed'],cost:cost(c[4]),lock:!ok,own:S.inv['seed_'+id],act:()=>{addItem('seed_'+id,1);SND.buy()}}}).sort((a,b)=>(a.lock-b.lock))},
 garden:{name:'Сад',items:()=>PER_IDS.map(id=>{const p=PER[id],ok=perUnlocked(id);return{k:'per_'+id,name:p[0],desc:ok?`${p[1]==='tree'?'Дерево':'Куст'} · урожай ${p[6]} шт. каждые ~${fmt(p[5]*1000*tm())} · многолетнее`:'Откроется на уровне '+p[2],img:IMG['p_'+id+'_s2'],cost:cost(p[3]),lock:!ok,place:true,act:()=>{shopClose();startPlace(newPerObj(id,0,0,0),true,cost(p[3]),o=>{tip('garden_place',[[5,'Саженец посажен! Полей его — он подрастёт, а потом будет давать урожай снова и снова. Сажать заново не нужно!']])})}}})},
 animals:{name:'Животные',items:()=>{const a=[{k:'hay',name:'Сено',desc:'Корм для коров и овец',img:IMG.hay,cost:cost(6),own:S.inv.hay,lock:level()<ANIM.cow.lvl,act:()=>{addItem('hay',1);SND.buy()}},{k:'hay5',name:'Сено ×5',desc:'Выгоднее на 1 монету',img:IMG.hay,cost:cost(25),lock:level()<ANIM.cow.lvl,act:()=>{addItem('hay',5);SND.buy()}}];
  [['cows','cow','cowshed'],['sheep','sheep','sheeppen']].forEach(([s,k,h])=>{const A=ANIM[k];const n=S[s].length;a.push({k:'ani_'+k,name:A.name+` (${n}/${A.max})`,desc:!S.build[h]?'Сначала построй: '+FIX[h].n:(k==='cow'?'Даёт молоко':'Даёт шерсть')+' · кормить сеном или комбикормом',img:IMG[k==='cow'?'cow_ready':'sheep_wool'],cost:cost(A.cost),lock:level()<A.lvl||!S.build[h],maxed:n>=A.max,btn:n>=A.max?'Полно':null,act:()=>buyAnimal(s)})});
  a.push({k:'catfood',name:'Кошачий корм',desc:'Для кота · на 1 день',img:IMG.catfood,cost:cost(5),own:S.inv.catfood,lock:level()<CAT_LVL,act:()=>{addItem('catfood',1);SND.buy()}});
  if(S.cat&&S.cat.gone)a.push({k:'catback',name:'Позвать '+S.cat.name,desc:'Кот вернётся, если обещаешь кормить',img:IMG.cat_sit,cost:cost(100),act:()=>{S.cat.gone=false;S.cat.food=now()+86400000;S.cat.water=now()+86400000;renderCat();toast(S.cat.name+' вернулся! 🐾')}});return a}},
 build:{name:'Постройки',items:()=>{const L=bedLimit(),n=bedCount();const a=[{k:'bed',name:`Грядка (${n}/${L})`,desc:n>=10?'Максимум грядок':n>=L?'Больше грядок — с ростом уровня':'Ставь вдоль или поперёк',img:IMG.bedI,cost:cost(BED_COST[Math.min(n,11)]),maxed:n>=L,btn:n>=L?'Лимит':null,place:true,act:()=>{shopClose();startPlace(newCropObj('bed',0,0,0,0),true,cost(BED_COST[Math.min(n,11)]),()=>{tip('bed_place',[[5,'Новая грядка! Она заросла — вскопай её лопатой. Нажми на грядку, чтобы переставить или повернуть.']])})}}];
  const g=ghCount();a.push({k:'gh',name:`Теплица (${g}/3)`,desc:level()<5?'Откроется на уровне 5':'Растёт быстрее, без вредителей и воров',img:IMG[GHL[S.ghLvl].img],cost:cost(GH_COST[Math.min(g,2)]),lock:level()<5,maxed:g>=3,btn:g>=3?'Максимум':null,place:true,act:()=>{shopClose();startPlace(newCropObj('gh',0,0,0,0),true,cost(GH_COST[Math.min(g,2)]),()=>{tip('gh_place',[[5,'Теплица готова! Работай с ней как с грядкой: вскопать, посадить, полить. Внутри всё растёт быстрее, и туда не доберутся вредители и воры.']])})}});
  const nl=S.ghLvl+1;if(GHL[nl])a.push({k:'ghup',name:'Улучшить теплицы: '+GHL[nl].n,desc:level()<GHL[nl].lvl?'Откроется на уровне '+GHL[nl].lvl:(nl===3?'На 55% быстрее и двойной урожай':'Растёт на 40% быстрее'),img:IMG[GHL[nl].img],cost:cost(GHL[nl].cost),lock:level()<GHL[nl].lvl||!g,act:()=>{S.ghLvl=nl;S.objs.filter(o=>o.kind==='gh').forEach(o=>renderObj(o));SND.level();toast('Теплицы улучшены!')}});
  for(const k in FIX){if(k==='market')continue;const F=FIX[k];a.push({k:'fix_'+k,name:F.n,desc:S.build[k]?'Построено':level()<F.lvl?'Откроется на уровне '+F.lvl:{well:'Вода без ограничений',dairy:'Сметана, творог, масло, сыр',spinnery:'Пряжа, носки, варежки, свитер',cowshed:'До 3 коров',sheeppen:'До 4 овец'}[k],img:IMG['b_'+k],cost:cost(F.cost),lock:level()<F.lvl,maxed:!!S.build[k],btn:S.build[k]?'Есть ✔':null,place:true,act:()=>{shopClose();buildFix(k)}})}
  return a}},
 upg:{name:'Улучшения',items:()=>['shovel','can','soil','gutter','cap'].map(upgItem).concat([{k:'fert',name:'Удобрение',desc:'Урожай растёт на 40% быстрее',img:IMG.i_fert,cost:cost(8),own:S.inv.fert,act:()=>{addItem('fert',1);SND.buy()}}])},
 protect:{name:'Защита',items:()=>{const L=level();return[
  {k:'camera',name:'Камера',desc:'Спугивает половину воришек',img:IMG.cam,cost:cost(150),lock:L<THIEF_LVL,maxed:S.camera,btn:S.camera?'Есть ✔':null,act:()=>{S.camera=true;renderSecurity()}},
  {k:'fence',name:'Высокий забор',desc:'Останавливает 2 из 3 воришек',img:IMG.fenceI,cost:cost(250),lock:L<THIEF_LVL,maxed:S.fence,btn:S.fence?'Есть ✔':null,act:()=>{S.fence=true;renderSecurity()}},
  {k:'scare',name:'Пугало',desc:S.scareUntil>now()?'Ещё '+fmt(S.scareUntil-now())+' · продлить на 12 ч':'Прогоняет ворон 12 часов',img:IMG.i_scare,cost:cost(30),lock:L<PEST_LVL,act:()=>{S.scareUntil=Math.max(now(),S.scareUntil)+SCARE_H*3600000;S.scareEver=true;renderScare();for(const k in birds)shooBird(k,false);toast('Пугало сторожит!')}},
  {k:'p_aphid',name:'Средство от тли',desc:'Одна грядка',img:IMG.p_aphid,cost:cost(12),own:S.inv.p_aphid,lock:L<PEST_LVL,act:()=>addItem('p_aphid',1)},
  {k:'p_beetle',name:'От колорадского жука',desc:'Одна грядка',img:IMG.p_beetle,cost:cost(18),own:S.inv.p_beetle,lock:L<PEST_LVL,act:()=>addItem('p_beetle',1)},
  {k:'p_slug',name:'Гранулы от слизней',desc:'Одна грядка',img:IMG.p_slug,cost:cost(15),own:S.inv.p_slug,lock:L<PEST_LVL,act:()=>addItem('p_slug',1)},
  {k:'pro',name:'Проф. обработка',desc:S.proUntil>now()?'Защита ещё '+fmt(S.proUntil-now()):'Все вредители + защита на 24 ч',img:IMG.pro,cost:cost(120),lock:L<PEST_LVL,act:()=>{S.proUntil=now()+86400000;S.objs.forEach(o=>{if(o.bug)cure(o,false)});SND.magic();toast('Все грядки обработаны!')}}]}}};
function tabLocked(t){return !S.done&&t!=='seeds'}
function openShop(tab){if(!S.done)shopTab='seeds';else if(tab)shopTab=tab;renderShop();modal('mShop');guide(null);
 if(!S.done){const btn=[...$('shopCards').querySelectorAll('.card')].find(c=>c.dataset.k==='seed_carrot');if(btn)setTimeout(()=>{const c=elWorld(btn.querySelector('.btn'));guide({arrow:[c[0],c[1]-34/cam.s],ring:[c[0],c[1],130/cam.s]})},380)}}
function shopClose(){modal('mShop',false)}
function renderShop(){const tabs=$('shopTabs');tabs.innerHTML='';
 Object.entries(SHOP).forEach(([k,t])=>{const d=document.createElement('div');d.className='tab'+(k===shopTab?' on':'')+(tabLocked(k)?' lock':'');d.textContent=t.name;d.onclick=()=>{if(tabLocked(k)){toast('Откроется после обучения');return}shopTab=k;SND.tap();renderShop()};tabs.appendChild(d)});
 const cards=$('shopCards');cards.innerHTML='';cards.scrollLeft=0;
 SHOP[shopTab].items().forEach(it=>{const tutBlock=!S.done&&it.k!=='seed_carrot';const d=document.createElement('div');d.className='card'+(it.soon||it.lock?' locked':'');d.dataset.k=it.k;
  d.innerHTML=`${it.lock?'<div class="soon">🔒</div>':''}${it.own?`<div class="own">${it.own}</div>`:''}<img src="${it.img}"><div class="cn">${it.name}</div><div class="cd">${it.desc}</div><div class="btn ${(it.maxed||S.coins<it.cost||it.lock||tutBlock)?'off':''}">${it.btn||(it.cost+' '+coinSvg)}</div>`;
  d.querySelector('.btn').onclick=()=>buy(it);cards.appendChild(d)})}
function buy(it){if(it.maxed||it.lock)return;if(!S.done&&it.k!=='seed_carrot')return;
 if(it.place){if(S.coins<it.cost){toast('Не хватает монет');SND.fail();return}it.act();return}
 if(!spend(it.cost))return;it.act();renderHUD();renderShop();save();
 if(!S.done&&it.k==='seed_carrot'){guide(null);setTimeout(()=>{shopClose();tutEvent('buy')},700)}}
function buyAnimal(s){const k=s==='cows'?'cow':'sheep';const A=ANIM[k];if(S[s].length>=A.max)return;S[s].push({state:'hungry',t0:0,t1:0,shorn:false});renderAnimals();SND.harvest();
 const p=A.pos[S[s].length-1];burst(p[0],p[1]-60,18,['#ffd23f','#fff','#7cc84a'],100);shopClose();camTo(p[0],p[1]-100,minS()*1.6,true);
 tip('feed_'+k,[[5,k==='cow'?'Бурёнка у нас! Нажми на корову и дай ей сено — через несколько минут будет ведро молока.':'Овечка у нас! Покорми её сеном — когда шерсть отрастёт, нажми на овцу, чтобы постричь.'],[3,'Сено продаётся в магазине (вкладка «Животные»). А комбикорм из кукурузы и фасоли готовят на кухне — с ним животные работают почти вдвое быстрее!']])}
$('hOrders').addEventListener('pointerdown',e=>{e.stopPropagation();ac();if(placing)return;tapBoard()});
$('hShop').addEventListener('pointerdown',e=>{e.stopPropagation();ac();if(placing)return;if(!S.done&&tutWait()!=='buy'){SND.fail();return}SND.tap();openShop()});

/* ================= STORE (barn) ================= */
$('hStore').addEventListener('pointerdown',e=>{e.stopPropagation();ac();SND.tap();const l=$('invList');l.innerHTML='';
 const keys=Object.keys(S.inv).filter(k=>S.inv[k]>0);if(!keys.length)l.innerHTML='<div class="mtext">Сарай пуст</div>';
 keys.forEach(k=>{const fl=freshLeft(k);const d=document.createElement('div');d.className='slot';d.innerHTML=`<img src="${iImg(k)}"><div>${iName(k)}</div><b>${S.inv[k]}</b>${fl!=null?`<div style="font-size:12px;color:${fl<3600000?'#c0392b':'#7a5a3a'}">⏳ ${fmt(fl)}</div>`:''}`;l.appendChild(d)});
 const w=document.createElement('div');w.className='slot';w.innerHTML=`<img src="${IMG.i_can}"><div>Лейка: ${S.can}/${canMax()}</div><b>💧${S.water}/${waterMax()}</b>`;l.appendChild(w);modal('mStore')});

/* ================= QUESTS ================= */
const pick=a=>a[Math.floor(Math.random()*a.length)];
function genQuest(){const L=level(),T=[];const anns=ANN_IDS.filter(annUnlocked);
 T.push(()=>{const c=pick(anns);const n=2+Math.floor(Math.random()*3);return{key:'harv_'+c,t:`Собрать урожай: ${ANN[c][0].toLowerCase()} ×${n}`,target:n,img:IMG[c+'_crop'],rw:Math.round(ANN[c][5]*n*.6+20)}});
 T.push(()=>{const n=4+Math.floor(Math.random()*6);return{key:'water',t:`Полить ${n} раз`,target:n,img:IMG.i_can,rw:10+n*4}});
 T.push(()=>{const n=2+Math.floor(Math.random()*3);return{key:'orders',t:`Выполнить ${n} заказа соседей`,target:n,img:IMG.i_basket,rw:30*n}});
 T.push(()=>{const n=3+Math.floor(Math.random()*6);return{key:'market',t:`Продать скупщику ${n} товаров`,target:n,img:IMG.b_market,rw:8*n}});
 T.push(()=>{const n=(2+Math.floor(Math.random()*3))*50*L;return{key:'earned',t:`Заработать ${n} монет`,target:n,img:IMG.d3,rw:Math.round(n*.15)}});
 if(facOn('kitchen'))T.push(()=>{const n=1+Math.floor(Math.random()*2);return{key:'cook',t:`Приготовить ${n} заготовки`,target:n,img:IMG.r_borsch,rw:60*n}});
 if(S.objs.some(o=>o.p))T.push(()=>{const n=2+Math.floor(Math.random()*3);return{key:'fruit',t:`Собрать ягоды или фрукты ${n} раза`,target:n,img:IMG.strawberry_crop,rw:45*n}});
 if(S.cows.length)T.push(()=>{const n=2+Math.floor(Math.random()*4);return{key:'milk',t:`Подоить коров ${n} раз`,target:n,img:IMG.milk,rw:30*n}});
 if(S.sheep.length)T.push(()=>{const n=1+Math.floor(Math.random()*3);return{key:'wool',t:`Постричь овец ${n} раз`,target:n,img:IMG.wool,rw:45*n}});
 if(L>=PEST_LVL)T.push(()=>{const n=2+Math.floor(Math.random()*2);return{key:'shoo',t:`Прогнать ${n} ворон`,target:n,img:IMG.i_scare,rw:25*n}});
 if(L>=3)T.push(()=>{const n=1;return{key:'built',t:'Построить что-нибудь новое',target:n,img:IMG.bedI,rw:80}});
 let q;for(let k=0;k<10;k++){q=pick(T)();if(!S.quests.some(x=>x.key===q.key))break}
 q.base=S.stats[q.key]||0;q.rw=Math.round(q.rw*(1+0.1*(L-1)));q.xp=Math.round(10+q.rw/6);return q}
const qProg=q=>Math.min(q.target,(S.stats[q.key]||0)-q.base);
function refillQuests(){if(!S.done)return;while(S.quests.length<3)S.quests.push(genQuest())}
function renderQuests(){const l=$('questList');l.innerHTML='';refillQuests();
 S.quests.forEach((o,i)=>{const p=qProg(o),ready=p>=o.target;const d=document.createElement('div');d.className='quest';
  d.innerHTML=`<img class="qi" src="${o.img}"><div style="flex:1"><div class="qt">${o.t} (${p}/${o.target})</div><div class="qp"><i style="width:${p/o.target*100}%"></i></div><div class="qs">Награда: ${o.rw} монет, ${o.xp} XP</div></div>${ready?'<div class="btn">Забрать</div>':'<div class="btn orange" style="font-size:16px;padding:6px 10px" title="Заменить">↻</div>'}`;
  d.querySelector('.btn').onclick=()=>{if(ready){S.quests.splice(i,1);const c=coinPos();addCoins(o.rw,c[0],c[1]);addXp(o.xp);SND.magic();stat('quests')}else{if(o.skipAt&&now()-o.skipAt<0){toast('Заменить можно через '+fmt(o.skipAt-now()));return}S.quests.splice(i,1);const n=genQuest();n.skipAt=now()+10*60000;S.quests.splice(i,0,n)}refillQuests();renderQuests();renderHUD();save()};l.appendChild(d)})}
$('hQuest').addEventListener('pointerdown',e=>{e.stopPropagation();ac();SND.tap();renderQuests();modal('mQuest')});

/* ================= DAILY BONUS ================= */
function dayKey(d=new Date()){return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
function dailyReward(day){const m=1+0.15*(level()-1);return[{c:Math.round(30*m)},{c:Math.round(50*m)},{c:Math.round(80*m)},{fert:3,c:Math.round(20*m)},{c:Math.round(150*m)},{seeds:6,c:Math.round(30*m)},{c:Math.round(300*m),fert:2}][day-1]}
function rewardText(r){return[r.c?r.c+' монет':'',r.fert?r.fert+' удобр.':'',r.seeds?r.seeds+' пакетов семян':''].filter(Boolean).join(' + ')}
function showDaily(done){const today=dayKey(),y=new Date();y.setDate(y.getDate()-1);const claimed=S.daily.last===today;
 const day=claimed?S.daily.streak:(S.daily.last===dayKey(y)?S.daily.streak%7+1:1);const row=$('dailyRow');row.innerHTML='';
 for(let d=1;d<=7;d++){const c=document.createElement('div');c.className='dcard'+(d===day&&!claimed?' today':'')+(d<day||(claimed&&d===day)?' past':'');
  c.innerHTML=`<img src="${IMG[d<day||(claimed&&d===day)?'dgot':d>day?'dlock':'d'+d]}"><div class="rw">${rewardText(dailyReward(d))}</div>`;row.appendChild(c)}
 const b=$('dailyBtn');b.textContent=claimed?'Завтра будет ещё!':'Забрать';b.classList.toggle('off',false);
 b.onclick=()=>{modal('mDaily',false);if(!claimed){const r=dailyReward(day);S.daily={last:today,streak:day};const c=coinPos();if(r.c)addCoins(r.c,c[0],c[1]);if(r.fert)addItem('fert',r.fert);
   if(r.seeds){const av=ANN_IDS.filter(annUnlocked);for(let i=0;i<r.seeds;i++)addItem('seed_'+pick(av),1)}SND.magic();toast('Подарок дня '+day+': '+rewardText(r));renderHUD();save()}done&&done()};modal('mDaily')}
$('hDaily').addEventListener('pointerdown',e=>{e.stopPropagation();ac();SND.tap();showDaily()});
