
/* ================= FIXED BUILDINGS & ANIMALS ================= */
const fixEls={};
function renderFix(){for(const k in FIX){const F=FIX[k];let el=fixEls[k];if(!el){el=document.createElement('div');el.className='fix';el.dataset.tap='fix:'+k;el.innerHTML=`<img src="${IMG['b_'+k]}"><div class="lk"></div>`;el.style.left=F.x+'px';el.style.top=F.y+'px';el.style.width=F.w+'px';el.style.zIndex=F.y;$('objs').appendChild(el);fixEls[k]=el}
  const built=!!S.build[k];el.classList.toggle('locked',!built);const lk=el.querySelector('.lk');lk.style.display=built?'none':'';lk.textContent=level()>=F.lvl?'Построить · '+cost(F.cost):'🔒 уровень '+F.lvl;el.style.display=S.done||k==='market'?'':'none'}
 renderScare()}
function tapFix(k){const F=FIX[k];
 if(!S.build[k]){if(level()<F.lvl){toast(F.n+' откроется на уровне '+F.lvl);SND.fail();return}msg(F.n,'Построить за '+cost(F.cost)+' монет?',[{t:'Построить',f:()=>buildFix(k)},{t:'Позже',cls:'orange'}]);return}
 if(k==='market')return openMarket();if(k==='well')return tapWater('well');if(k==='dairy'||k==='spinnery')return openFac(k);
 if(k==='cowshed'||k==='sheeppen'){const a=k==='cowshed'?'cows':'sheep';const A=ANIM[a==='cows'?'cow':'sheep'];toast(A.name+': '+S[a].length+' из '+A.max+'. Купить ещё — Магазин → Животные')}}
function buildFix(k){const F=FIX[k];if(!spend(cost(F.cost)))return;S.build[k]=true;renderFix();SND.harvest();burst(F.x,F.y-60,24,['#a8743f','#7a4e26','#ffd23f'],140);
 fixEls[k].animate([{transform:'translate(-50%,-100%) scale(.3)',opacity:0},{transform:'translate(-50%,-100%) scale(1)',opacity:1}],{duration:700,easing:'cubic-bezier(.3,1.6,.5,1)'});
 addXp(20,F.x,F.y-120);stat('built');save();featureTips()}
const aniEls={};
function aniKey(a){return a==='cows'?'cow':'sheep'}
function renderAnimals(){['cows','sheep'].forEach(a=>{const A=ANIM[aniKey(a)];S[a].forEach((x,i)=>{const id=a+i;let el=aniEls[id];
  if(!el){el=document.createElement('div');el.className='ani';el.dataset.tap='ani:'+a+':'+i;el.innerHTML='<img>';const p=A.pos[i];el.style.left=p[0]+'px';el.style.top=p[1]+'px';el.style.zIndex=p[1];el.style.width=(a==='cows'?165:130)+'px';$('objs').appendChild(el);aniEls[id]=el}
  const night=nightNow();let src;
  if(a==='cows')src=x.state==='ready'?'cow_ready':x.state==='eat'?'cow_eat':night?'cow_sleep':'cow_hungry';
  else src=x.state==='ready'?'sheep_wool':x.state==='eat'?'sheep_eat':x.shorn?'sheep_shorn':'sheep_hungry';
  const im=el.querySelector('img');if(im.dataset.s!==src){im.src=IMG[src];im.dataset.s=src}el.classList.toggle('ready',x.state==='ready');
  aniStatus(a,i,x)})})}
const aBub={};
function aniStatus(a,i,x){const id=a+i;let el=aBub[id];const p=ANIM[aniKey(a)].pos[i];if(!el){el=document.createElement('div');el.className='bb';el.style.left=p[0]+'px';el.style.top=(p[1]-(a==='cows'?120:100))+'px';el.style.transform='translate(-50%,-100%) scale(calc(var(--bz,1)*.9))';$('bubs').appendChild(el);aBub[id]=el}
 let key,html;const t=now();
 if(x.state==='ready'){key='r';html=`<div class="b" style="border-color:#f1c40f"><img src="${IMG[a==='cows'?'milk':'wool']}"></div>`}
 else if(x.state==='hungry'){key='h';html=`<div class="b" style="border-color:#e67e22"><img src="${IMG.hay}"></div>`}
 else{key='e';html=`<div class="pbar"><div class="track" style="width:120px"><div class="fill" style="width:${Math.round(Math.min(1,(t-x.t0)/(x.t1-x.t0))*100)}%"></div></div><div class="tm" style="font-size:20px">${fmt(x.t1-t)}</div></div>`}
 if(el.dataset.k!==key){el.dataset.k=key;el.innerHTML=html}else if(key==='e'){el.querySelector('.fill').style.width=Math.round(Math.min(1,(t-x.t0)/(x.t1-x.t0))*100)+'%';el.querySelector('.tm').textContent=fmt(x.t1-t)}}
function tapAnimal(a,i){const x=S[a][i];if(!x)return;
 if(x.state==='ready'){const A=ANIM[aniKey(a)];addItem(A.prod,1);x.state='hungry';x.shorn=a==='sheep';SND.harvest();stat(A.prod);const p=A.pos[i];floatText(p[0],p[1]-140,'+1 '+iName(A.prod),'#fff');addXp(a==='cows'?6:9,p[0],p[1]-80);
  if(a==='sheep')burst(p[0],p[1]-60,14,['#fff','#f4efe2','#e8e2d0'],80,[8,14]);renderAnimals();renderHUD();save();return}
 if(x.state==='eat'){toast(ANIM[aniKey(a)].name+' занята — ещё '+fmt(x.t1-now()));return}
 openTray({t:'ani',a,i})}
function feedAnimal(T,f){const x=S[T.a][T.i];if(x.state!=='hungry')return;if(!S.inv[f]){toast(f==='hay'?'Нет сена — купи в магазине':'Нет комбикорма — приготовь на кухне');SND.fail();return}
 takeItem(f,1);const A=ANIM[aniKey(T.a)];x.state='eat';x.t0=now();x.t1=now()+A.time*1000*tm()*(f==='feed'?.6:1);SND.plant();renderAnimals();save()}
function tickAnimals(t){let ch=false;['cows','sheep'].forEach(a=>S[a].forEach(x=>{if(x.state==='eat'&&t>=x.t1){x.state='ready';x.shorn=false;ch=true}}));if(ch||Math.random()<.05)renderAnimals();else ['cows','sheep'].forEach(a=>S[a].forEach((x,i)=>aniStatus(a,i,x)))}

/* ================= FACTORIES ================= */
let curFac='kitchen';
const facOn=f=>S.done&&level()>=FAC[f].lvl&&(f==='kitchen'||S.build[f]);
function canCook(f,id){const n=FAC[f].rec[id][1];return Object.keys(n).every(k=>(S.inv[k]||0)>=n[k])}
function openFac(f){if(!facOn(f)){toast(FAC[f].name+' откроется на уровне '+FAC[f].lvl);SND.fail();return}curFac=f;$('facTitle').textContent=FAC[f].name;renderFacUI();modal('mFac')}
function renderFacUI(){const f=curFac,F=S.fac[f];const box=document.createElement('div');box.className='kslots';const t=now();
 for(let i=0;i<F.cap;i++){const x=F.slots[i];const d=document.createElement('div');
  if(!x){d.className='kslot';d.innerHTML='🍳 Свободное место — выбери рецепт'}
  else{const done=t>=x.t1;d.className='kslot busy';d.innerHTML=`<img src="${IMG[PROD[x.r][2]]}"><div style="flex:1"><div>${PROD[x.r][0]}${FAC[f].rec[x.r][3]>1?' ×'+FAC[f].rec[x.r][3]:''}</div>${done?'':`<div class="track"><div class="fill" style="width:${Math.min(100,(t-x.t0)/(x.t1-x.t0)*100)}%"></div></div><div style="font-size:15px;margin-top:4px">готово через ${fmt(x.t1-t)}</div>`}</div>${done?'<div class="btn">Забрать</div>':''}`;
   if(done)d.querySelector('.btn').onclick=()=>collectDish(f,i)}
  box.appendChild(d)}
 if(F.cap<3){const pr=cost(F.cap===1?250:600);const d=document.createElement('div');d.className='kslot';d.innerHTML=`<div style="flex:1">Ещё одно место<br><span style="font-size:14px">готовить больше сразу</span></div><div class="btn orange ${S.coins<pr?'off':''}">${pr} ${coinSvg}</div>`;d.querySelector('.btn').onclick=()=>{if(!spend(pr))return;F.cap++;SND.level();save();renderFacUI()};box.appendChild(d)}
 $('kSlots').innerHTML='';$('kSlots').appendChild(box);
 const cards=$('kCards');cards.innerHTML='';const free=F.slots.filter(Boolean).length<F.cap;
 Object.entries(FAC[f].rec).forEach(([id,r])=>{const ok=level()>=r[0],can=canCook(f,id);
  const need=Object.entries(r[1]).map(([k,n])=>`<span class="${(S.inv[k]||0)>=n?'':'miss'}"><img src="${iImg(k)}">${S.inv[k]||0}/${n}</span>`).join('');
  const d=document.createElement('div');d.className='card'+(ok?'':' locked');d.style.width='200px';
  d.innerHTML=`${ok?'':'<div class="soon">🔒 ур. '+r[0]+'</div>'}${S.inv[id]?`<div class="own">${S.inv[id]}</div>`:''}<img src="${IMG[PROD[id][2]]}" style="width:120px;height:120px"><div class="cn" style="min-height:30px;font-size:17px">${PROD[id][0]}${r[3]>1?' ×'+r[3]:''}</div><div class="need">${need}</div><div class="cd">⏱ ${fmt(r[2]*1000*tm())} · цена ~${PROD[id][1]}</div><div class="btn ${ok&&can&&free?'':'off'}">Готовить</div>`;
  if(ok&&can)d.insertAdjacentHTML('afterbegin','<div class="canb">✔ Можно готовить</div>');d.insertAdjacentHTML('beforeend','<div class="more">ℹ Нажми — состав</div>');
  d.querySelector('.btn').onclick=e=>{e.stopPropagation();if(ok&&can&&free)cook(f,id);else showRecipe(f,id)};d.onclick=()=>showRecipe(f,id);cards.appendChild(d)})}
function srcHint(k){if(ANN[k])return'Вырасти на грядке (семена — Магазин → Семена)';if(PER[k])return(PER[k][1]==='tree'?'Собери с дерева':'Собери с куста')+' (Магазин → Сад)';
 return{milk:'Подои корову',wool:'Постриги овцу',yarn:'Сделай в прядильне из шерсти',hay:'Купи в магазине'}[k]||'Сделай в мастерской'}
function showRecipe(f,id){SND.tap();const r=FAC[f].rec[id],F=S.fac[f],ok=level()>=r[0],can=canCook(f,id),free=F.slots.filter(Boolean).length<F.cap;
 const rows=Object.entries(r[1]).map(([k,n])=>{const have=S.inv[k]||0,g=have>=n;return`<div class="rrow ${g?'ok':'no'}"><img src="${iImg(k)}"><div class="rn"><b>${iName(k)}</b><small>${g?'Есть ✔':srcHint(k)}</small></div><div class="rc">${have} / ${n}</div></div>`}).join('');
 const state=!ok?`🔒 Откроется на уровне ${r[0]}`:!can?'Собери все продукты, отмеченные красным':!free?'Все места заняты — дождись, пока приготовится':'Всё собрано — можно готовить!';
 $('kCards').innerHTML=`<div class="rdet"><div class="rl"><img src="${IMG[PROD[id][2]]}"><div class="rt">${PROD[id][0]}${r[3]>1?' ×'+r[3]:''}</div><div class="ri">⏱ Готовится ${fmt(r[2]*1000*tm())}<br>💰 Соседи платят ~${PROD[id][1]}</div><div class="rs ${ok&&can&&free?'go':''}">${state}</div><div class="row" style="gap:12px;margin-top:10px"><div class="btn orange" id="rBack">←</div><div class="btn ${ok&&can&&free?'':'off'}" id="rCook">Готовить</div></div></div><div class="rr"><div class="rh">Что нужно:</div>${rows}</div></div>`;
 $('rBack').onclick=()=>{SND.tap();renderFacUI()};$('rCook').onclick=()=>{if(ok&&can&&free)cook(f,id)}}
function cook(f,id){const r=FAC[f].rec[id],F=S.fac[f];if(level()<r[0]||!canCook(f,id))return;let i=0;while(F.slots[i])i++;if(i>=F.cap){toast('Все места заняты');return}
 Object.entries(r[1]).forEach(([k,n])=>takeItem(k,n));F.slots[i]={r:id,t0:now(),t1:now()+r[2]*1000*tm()};SND.plant();toast('Готовим: '+PROD[id][0]);renderHUD();renderFacUI();save()}
function collectDish(f,i){const x=S.fac[f].slots[i];if(!x)return;const q=FAC[f].rec[x.r][3];addItem(x.r,q);S.fac[f].slots[i]=null;SND.harvest();stat('cook');stat('cook_'+x.r);
 const c=elStage($('hStore'));floatText(c[0]-40,c[1]+70,'+'+q+' '+PROD[x.r][0],'#fff',true);addXp(Math.round(PROD[x.r][1]/10),FB[f][0],FB[f][1]);bump('hStore');renderFacUI();renderHUD();save()}
const FB={kitchen:[680,440],dairy:[885,330],spinnery:[540,890]};const kbKey={};
function renderFacBubs(){for(const f in FAC){let el=$('kb_'+f);if(!el){el=document.createElement('div');el.id='kb_'+f;el.className='bb';el.dataset.tap=f==='kitchen'?'house':'fix:'+f;el.style.pointerEvents='auto';el.style.left=FB[f][0]+'px';el.style.top=FB[f][1]+'px';$('kbubs').appendChild(el)}
  if(!facOn(f)){el.style.display='none';continue}el.style.display='';const t=now();const xs=S.fac[f].slots.filter(Boolean);const ready=xs.filter(x=>t>=x.t1);let key,html;
  if(ready.length){key='r';html=`<div class="kb ready"><img src="${IMG[PROD[ready[0].r][2]]}">Готово!</div>`}
  else if(xs.length){const x=xs.slice().sort((a,b)=>a.t1-b.t1)[0];key='c'+x.r;html=`<div class="kb"><img src="${IMG[PROD[x.r][2]]}"><span class="kt">${fmt(x.t1-t)}</span></div>`}
  else{key='i';html=`<div class="kb" style="font-size:16px">${f==='kitchen'?'Кухня':f==='dairy'?'Сыроварня':'Прядильня'}</div>`}
  if(kbKey[f]!==key){if(key==='r'&&kbKey[f]&&kbKey[f][0]==='c'){SND.harvest();toast(FAC[f].name+': готово, забирай!')}kbKey[f]=key;el.innerHTML=html}
  else if(key[0]==='c'){const x=xs.slice().sort((a,b)=>a.t1-b.t1)[0];el.querySelector('.kt').textContent=fmt(x.t1-t)}}}

/* ================= MARKET (buyer) ================= */
const buyPrice=id=>Math.max(1,Math.round(baseSell(id)*(PROD[id]&&!['milk','wool','hay','feed'].includes(id)?.6:.55)*(1+0.03*(level()-1))));
function openMarket(){renderMarket();modal('mMarket')}
function renderMarket(){const l=$('marketList');l.innerHTML='';const items=sellables().filter(k=>k!=='hay'&&k!=='feed');
 if(!items.length){l.innerHTML='<div class="mtext">Пока нечего продать — собери урожай!</div>';return}
 items.forEach(k=>{const n=S.inv[k],p=buyPrice(k),fl=freshLeft(k);const d=document.createElement('div');d.className='mrow';
  d.innerHTML=`<img src="${iImg(k)}"><div class="mn">${iName(k)} × ${n}<small>${p} монет за штуку${fl!=null?' · испортится через '+fmt(fl):''}</small></div><div class="btn">Продать 1</div><div class="btn orange">Все (${p*n})</div>`;
  const[b1,b2]=d.querySelectorAll('.btn');b1.onclick=()=>sellMarket(k,1);b2.onclick=()=>sellMarket(k,S.inv[k]);l.appendChild(d)})}
function sellMarket(k,n){if(!n||S.inv[k]<n)return;takeItem(k,n);const c=coinPos();addCoins(buyPrice(k)*n,c[0],c[1]);stat('market',n);renderMarket();save()}

/* ================= ORDERS ================= */
const NEIGH=[['Сосед Петрович','👴'],['Тётя Валя','👵'],['Михалыч с лодкой','🎣'],['Внучка Света','👧'],['Дачница Люда','👩‍🌾'],['Председатель СНТ','🧔'],['Батюшка Николай','🧔‍♂️'],['Студентка Аня','👩‍🎓']];
function orderPool(){const p=ANN_IDS.filter(annUnlocked);PER_IDS.filter(k=>S.objs.some(o=>o.p===k)).forEach(k=>p.push(k));
 for(const f in FAC)if(facOn(f))Object.entries(FAC[f].rec).forEach(([id,r])=>{if(level()>=r[0]&&id!=='feed')p.push(id)});
 if(S.cows.length)p.push('milk');if(S.sheep.length)p.push('wool');return p}
function genOrder(){const pool=orderPool(),stock=pool.filter(k=>(S.inv[k]||0)>0);const it=(stock.length&&Math.random()<.5)?stock[Math.floor(Math.random()*stock.length)]:pool[Math.floor(Math.random()*pool.length)];
 const big=!!PROD[it];const q=big?1:1+Math.floor(Math.random()*(baseSell(it)<60?3:2));const n=NEIGH[Math.floor(Math.random()*NEIGH.length)];
 return{who:n[0],ava:n[1],item:it,qty:q,reward:Math.round(baseSell(it)*q*(1+0.06*(level()-1))*(1+Math.random()*.15)),xp:Math.max(3,Math.round(baseSell(it)*q/12))}}
function maxOrders(){return Math.min(6,3+Math.floor(level()/4))}
function genOrders(){S.orders=[];for(let i=0;i<maxOrders();i++)S.orders.push(genOrder());S.nextOrderAt=now()+30000}
function openOrders(){const list=$('ordersList');list.innerHTML='';
 const orders=S.done?S.orders:[{who:'Сосед Петрович',ava:'👴',item:'potato',qty:1,reward:15,xp:0}];
 if(!orders.length)list.innerHTML='<div class="mtext">Новых заказов пока нет — новый появится через '+fmt(S.nextOrderAt-now())+'</div>';
 orders.forEach((o,i)=>{const have=S.inv[o.item]||0,ok=have>=o.qty;const d=document.createElement('div');d.className='order';
  d.innerHTML=`<div class="ava">${o.ava}</div><img class="it" src="${iImg(o.item)}"><div><div class="who">${o.who}</div><div class="wants">хочет: <b>${o.qty}× ${iName(o.item)}</b><br>в сарае: ${have}</div></div><div class="rew">+${o.reward} ${coinSvg}<div class="btn ${ok?'':'off'}">Продать</div>${S.done?'<div class="btn orange" title="Отказаться" style="padding:8px 12px">✕</div>':''}</div>`;
  const bs=d.querySelectorAll('.btn');bs[0].onclick=()=>{if(!ok)return;takeItem(o.item,o.qty);modal('mOrders',false);
   if(S.done){S.orders.splice(i,1);if(S.nextOrderAt<now())S.nextOrderAt=now()+30000}const c=coinPos();S.ui.coins=true;renderHUD();
   setTimeout(()=>{addCoins(o.reward,c[0],c[1]);if(o.xp)addXp(o.xp);stat('orders');burst(1860,430,14,['#ffd23f','#ffe98a','#c98a00'],90,[10,16]);if(!S.done){tutEvent('sell')}save()},250)};
  if(bs[1])bs[1].onclick=()=>{S.orders.splice(i,1);S.nextOrderAt=Math.min(S.nextOrderAt,now()+20000);openOrders();save()};
  list.appendChild(d)});
 modal('mOrders');guide(null)}
