
/* ================= TUTORIAL ================= */
const STEPS=[
 {id:'intro',say:[[0,'Добро пожаловать на нашу новую дачу в Ярославле! Смотри, какой простор — и Волга рядом!'],[1,'Участок большой, руки у нас золотые. Начнём с малого — подготовим первую грядку к посадке!']]},
 {id:'dig',wait:'dig',hint:'Нажми на грядку и перетащи лопату на неё'},
 {id:'plantSay',say:[[5,'Отличная земелька, мягкая! На даче любое дело требует времени — видишь шкалу?'],[2,'У меня осталась пара клубней отборной картошки. Самое время отправить её в грядку!']]},
 {id:'plant',wait:'plant',hint:'Нажми на грядку и перетащи картошку на неё'},
 {id:'waterSay',say:[[3,'Без воды на даче никуда! В бочке у дома есть запас — она понемногу наполняется сама.'],[0,'Давай польём картошечку и добавим щепотку удобрения!']]},
 {id:'barrel',wait:'barrel',hint:'Нажми на синюю бочку у дома — наберём лейку'},
 {id:'water',wait:'water',hint:'Нажми на грядку и перетащи лейку на неё'},
 {id:'fert',wait:'fert',hint:'Бонус! Перетащи удобрение на грядку'},
 {id:'growSay',say:[[6,'Ух, хорошо потрудились! Теперь картошке нужно немного времени.'],[3,'На нашей даче всё живёт по настоящим часам: вечером у нас вечер, ночью — ночь. И грядки растут, даже когда ты не в игре!']]},
 {id:'grow',wait:'ripe',hint:'Картошка растёт — следи за шкалой над грядкой'},
 {id:'ripeSay',say:[[1,'Ты только посмотри, какая ботва вымахала! Скорее собирай!']]},
 {id:'harvest',wait:'harvest',hint:'Нажми на кусты картошки, чтобы собрать урожай'},
 {id:'sellSay',say:[[2,'Урожай на загляденье! Соседи уже спрашивают свежую картошку.'],[0,'Их заказы висят на доске у калитки. Открыть их можно в любой момент кнопкой «Заказы» слева. Давай продадим!']],cam:[2776,960]},
 {id:'sell',wait:'sell',hint:'Нажми кнопку «Заказы» слева'},
 {id:'shopSay',say:[[5,'Первая прибыль! Теперь заглянем в дачный магазин — там семена, саженцы, постройки и улучшения.'],[1,'Давай возьмём семена сладкой морковки!']]},
 {id:'shop',wait:'buy',hint:'Открой магазин и купи семена моркови'},
 {id:'finalSay',say:[[7,'Вот теперь ты настоящий дачник! Перед новой посадкой грядку надо снова вскопать. Морковку поливают дважды.'],[3,'Справа, у пастбища, стоит палатка Скупщика. Он покупает всё и всегда, так что без денег ты не останешься. А ещё каждый день за вход — подарок!'],[1,'Участок можно двигать пальцем и приближать. Новые грядки покупаются в магазине и ставятся куда угодно — хоть вдоль, хоть поперёк!']]}];
const TI={};STEPS.forEach((s,i)=>TI[s.id]=i);
const tutBed=()=>S.objs[0];
const curStep=()=>S.done?null:STEPS[S.tut];
function tutWait(){const s=curStep();return s&&s.wait}
let tutActive=-1;
function tutRun(){if(S.done)return;if(tutActive===S.tut)return;tutActive=S.tut;const s=STEPS[S.tut];
 if(!s){finishTutorial();return}
 if(S.tut>=TI.sellSay)S.ui.board=true;if(S.tut>=TI.shop)S.ui.shop=true;if(S.tut>TI.harvest){S.ui.xp=true;S.ui.store=true}if(S.tut>TI.sell)S.ui.coins=true;
 renderHUD();save();
 if(s.say){hint(null);guide(null);closeTray();if(s.cam)camTo(s.cam[0],s.cam[1],minS()*1.5,true);dialog(s.say,()=>{S.tut++;tutRun()})}
 else{hint(s.hint);const b=tutBed();
  if(s.wait==='ripe'&&isRipe(b)){tutEvent('ripe');return}
  if(s.wait==='harvest'&&b.state!=='planted'&&S.inv.potato>0){tutEvent('harvest');return}
  if(['dig','plant','water','fert','ripe','harvest'].includes(s.wait)){const R=rectOf(b);camTo(R.x+R.w/2-200,R.y+R.h/2-60,Math.max(minS(),.8),true)}
  if(s.wait==='barrel')camTo(700,760,Math.max(minS(),.8),true);
  if(s.wait==='sell')camTo(2500,900,Math.max(minS(),.75),true);
  setTimeout(updateGuide,1300)}}
function tutEvent(name){if(S.done)return;const s=curStep();if(s&&s.wait===name){S.tut++;guide(null);save();setTimeout(tutRun,name==='fert'?900:500)}}
function finishTutorial(){S.done=true;Object.assign(S.ui,{quest:true,board:true,shop:true,coins:true,xp:true,store:true});S.firstPotato=false;S.tips.market=1;genOrders();refillQuests();hint(null);guide(null);renderHUD();renderAllObjs();save();
 setTimeout(()=>{SND.magic();toast('Обучение пройдено!');startupPopups()},400)}
let handAnim=null;
function guide(g){const ar=$('arrow'),ring=$('ring'),hand=$('hand');if(handAnim){handAnim.cancel();handAnim=null}
 hand.style.display='none';ar.style.display='none';ring.style.display='none';if(!g)return;
 if(g.arrow){ar.style.display='block';ar.style.left=g.arrow[0]+'px';ar.style.top=g.arrow[1]+'px'}
 if(g.ring){ring.style.display='block';ring.style.left=g.ring[0]+'px';ring.style.top=g.ring[1]+'px';ring.style.width=ring.style.height=g.ring[2]+'px'}
 if(g.drag){hand.style.display='block';hand.querySelector('img').src=g.drag.img;const[a,b]=[g.drag.from,g.drag.to];
  handAnim=hand.animate([{transform:`translate(${a[0]-45}px,${a[1]-45}px)`,opacity:0},{transform:`translate(${a[0]-45}px,${a[1]-45}px) scale(1.1)`,opacity:1,offset:.15},{transform:`translate(${b[0]-45}px,${b[1]-45}px)`,opacity:1,offset:.75},{transform:`translate(${b[0]-45}px,${b[1]-45}px) scale(.8)`,opacity:0}],{duration:1800,iterations:Infinity})}}
function updateGuide(){const w=tutWait();if(!w||!S||S.done){guide(null);return}const b=tutBed(),R=rectOf(b),C=[R.x+R.w/2,R.y+R.h/2];
 if(['dig','plant','water','fert'].includes(w)){if(b.busy){guide(null);return}
  if(trayOpen){const it=$('tray').querySelector('.titem:not(.dim)');if(it){const c=elWorld(it);guide({drag:{img:it.querySelector('img').src,from:c,to:C},ring:[c[0],c[1],116]});return}}
  guide({arrow:[C[0],R.y-20],ring:[C[0],C[1],300]});return}
 if(w==='barrel')guide({arrow:[545,600],ring:[545,735,170]});
 if(w==='ripe')guide(null);
 if(w==='harvest')guide({arrow:[C[0],R.y-30],ring:[C[0],C[1]-20,320]});
 if(w==='sell'){const c=s2w(elStage($('hOrders')));guide({arrow:[c[0],c[1]-70/cam.s],ring:[c[0],c[1],170/cam.s]})}
 if(w==='buy'){if($('mShop').classList.contains('on'))return;const c=s2w(elStage($('hShop')));guide({arrow:[c[0],c[1]-60/cam.s],ring:[c[0],c[1],150/cam.s]})}}
let hintCur=null;function hint(t){const h=$('hint');if(t===hintCur)return;hintCur=t;if(!t){h.classList.remove('on');return}h.textContent=t;h.classList.remove('on');void h.offsetWidth;h.classList.add('on')}

/* ================= TRAY (tools over a target) ================= */
let trayOpen=false,trayT=null;
function trayItems(T){const w=tutWait(),it=[];
 if(T.t==='obj'){const o=objById(T.id);
  if(o.bug){Object.keys(BUGS).forEach(k=>{const p=BUGS[k][1],n=S.inv[p]||0;it.push({k:'poison:'+p,img:IMG[p],cnt:n||null,lbl:n?'есть':'нет',dim:!n})});return it}
  if(isCropObj(o)){
   if(o.state==='weeds'||o.state==='used')it.push({k:'shovel',img:IMG.i_shovel,lbl:'Лопата'});
   else if(o.state==='dug')ANN_IDS.forEach(c=>{if(S.inv['seed_'+c]>0)it.push({k:'seed:'+c,img:IMG[c+'_seed'],cnt:S.inv['seed_'+c],lbl:ANN[c][0]})});
   else if(o.state==='planted'&&!isRipe(o)){if(needsWater(o))it.push({k:'can',img:IMG.i_can,lbl:S.can?'Лейка':'Пустая',dim:!S.can});if(!o.fert&&S.inv.fert>0)it.push({k:'fert',img:IMG.i_fert,cnt:S.inv.fert,lbl:'Удобрение'})}
   if(S.done&&(o.state!=='planted')&&!o.busy)it.push({k:'move',img:IMG.move,lbl:'Переставить'})}
  else{if(needsWater(o))it.push({k:'can',img:IMG.i_can,lbl:S.can?'Лейка':'Пустая',dim:!S.can});if(!o.busy)it.push({k:'move',img:IMG.move,lbl:'Переставить'})}}
 if(T.t==='bowl'){if(T.b==='catfood')it.push({k:'catfood',img:IMG.catfood,cnt:S.inv.catfood||null,lbl:S.inv.catfood?'Корм':'Нет корма',dim:!S.inv.catfood});else{const ok=S.can>0||S.water>0||S.build.well;it.push({k:'catwater',img:IMG.i_can,lbl:S.can?'Лейка':ok?'Из бочки':'Нет воды',dim:!ok})}return it}
 if(T.t==='ani'){const a=S.ani[T.a][T.i];if(a.state==='hungry')ANIM[T.a].feeds.forEach(f=>it.push({k:'feed:'+f,img:IMG[f],cnt:S.inv[f]||null,lbl:iName(f),dim:!S.inv[f]}))}
 if(w==='dig')return it.filter(i=>i.k==='shovel');if(w==='plant')return it.filter(i=>i.k==='seed:potato');if(w==='water')return it.filter(i=>i.k==='can');if(w==='fert')return it.filter(i=>i.k==='fert');
 return it}
function trayPos(T){if(T.t==='bowl'){const p=T.b==='catfood'?BOWLF:BOWLW;return[p[0],p[1]-70]}if(T.t==='obj'){const o=objById(T.id);const p=topOf(o);return[p[0],p[1]-6]}const A=ANIM[T.a],a=A.pos[T.i];return[a[0],a[1]-A.w*.75]}
function openTray(T){const it=trayItems(T);const t=$('tray');if(!it.length){closeTray();return false}
 closeTray();trayT=T;t.innerHTML='';it.forEach(o=>{const d=document.createElement('div');d.className='titem'+(o.dim?' dim':'');d.dataset.k=o.k;d.innerHTML=`<img src="${o.img}">${o.cnt?`<div class="cnt">${o.cnt}</div>`:''}<div class="lbl">${o.lbl}</div>`;d.addEventListener('pointerdown',e=>startDrag(e,o,d));t.appendChild(d)});
 const p=trayPos(T);t.style.left=Math.max(240,Math.min(WW-240,p[0]))+'px';t.style.top=p[1]+'px';t.style.zIndex=6000;t.classList.remove('on');void t.offsetWidth;t.classList.add('on');trayOpen=true;SND.pop();
 if(T.t==='obj'&&bubEls[T.id])bubEls[T.id].style.visibility='hidden';setTimeout(updateGuide,260);return true}
function closeTray(){$('tray').classList.remove('on');if(trayT&&trayT.t==='obj'&&bubEls[trayT.id])bubEls[trayT.id].style.visibility='';trayOpen=false}
$('tray').addEventListener('pointerdown',e=>e.stopPropagation());
let drag=null;
function startDrag(e,o,el){e.preventDefault();e.stopPropagation();ac();
 if(o.dim){SND.fail();if(o.k==='can')toast('Лейка пустая — набери воду в бочке'+(S.build.well?' или колодце':''));else if(o.k.startsWith('poison'))toast('Этого средства нет — купи в магазине, вкладка «Защита»');else if(o.k==='catfood')toast('Нет кошачьего корма — купи в магазине (вкладка «Животные»)');else if(o.k==='catwater')toast('Нет воды — подожди, пока наполнится бочка');else if(o.k.startsWith('feed'))toast(o.k==='feed:grain'?'Нет зерносмеси — купи в магазине (Животные) или сделай на мельнице':o.k==='feed:hay'?'Нет сена — купи в магазине (вкладка «Животные»)':'Нет комбикорма — его готовят на кухне из кукурузы и фасоли');return}
 drag={o,el,sx:e.clientX,sy:e.clientY,moved:false,T:trayT};el.classList.add('drag');const g=$('ghost');g.querySelector('img').src=o.img;g.style.display='block';moveGhost(e.clientX,e.clientY);if(handAnim)$('hand').style.opacity=0}
function moveGhost(cx,cy){const[x,y]=toStage(cx,cy);const g=$('ghost');g.style.left=x+'px';g.style.top=(y-40)+'px'}
addEventListener('pointermove',e=>{if(!drag)return;moveGhost(e.clientX,e.clientY);if(Math.hypot(e.clientX-drag.sx,e.clientY-drag.sy)>10*SC)drag.moved=true},{passive:false});
addEventListener('pointerup',e=>{if(!drag)return;const d=drag;drag=null;$('ghost').style.display='none';d.el.classList.remove('drag');$('hand').style.opacity=1;
 if(!d.moved){applyTool(d.o.k,d.T);return}
 const tg=targetAt(e.clientX,e.clientY)||d.T;applyTool(d.o.k,tg)});
addEventListener('pointercancel',()=>{if(drag){$('ghost').style.display='none';drag.el.classList.remove('drag');drag=null;$('hand').style.opacity=1}});
function targetAt(cx,cy){for(const dy of [-40*SC,0]){const[x,y]=toStage(cx,cy+dy);const c=fromStage(x,y);const el=document.elementFromPoint(c[0],c[1]);const t=el&&el.closest&&el.closest('[data-tap]');if(t){const k=t.dataset.tap;if(k.startsWith('obj:'))return{t:'obj',id:k.slice(4)};if(k.startsWith('ani:')){const[,a,i]=k.split(':');return{t:'ani',a,i:+i}}if(k==='catfood'||k==='catwater')return{t:'bowl',b:k}}}return null}

/* ================= ACTIONS ================= */
function startBusy(o,type,data){o.busy={type,data,t0:now(),t1:now()+D[type](),fx:0};renderStatus(o,true);guide(null);save()}
function busyFx(o){if(!o.busy)return;const t=now();if(t-(o.busy.fx||0)<500)return;o.busy.fx=t;const R=rectOf(o);const x=R.x+Math.random()*R.w,y=R.y+Math.random()*R.h;
 if(o.busy.type==='dig'){burst(x,y,6,['#3b2412','#5a3a1e','#7a5232','#2f8a2a']);noise(.1,300,.3,0,.8)}
 if(o.busy.type==='water'){rainAt(x,y);noise(.3,2400,.06,0,.6)}
 if(o.busy.type==='plant'){burst(x,y,4,['#5a3a1e','#3b2412'],40,[5,9]);tone(500+Math.random()*300,.06,'triangle',.05)}}
function finishBusy(o){const k=o.busy.type,data=o.busy.data;o.busy=null;const R=rectOf(o),cx=R.x+R.w/2;
 if(isCropObj(o)){
  if(k==='dig'){o.state='dug';SND.pop();addXp(2,cx,R.y);if(o===tutBed())tutEvent('dig')}
  if(k==='plant'){Object.assign(o,{state:'planted',crop:data,fert:false,frac:0,waterIdx:0,seg:null,speed:1,ripeAt:0,total:D.grow(data)*(o.kind==='gh'?GHL[S.ghLvl].mult:1)});SND.plant();addXp(2,cx,R.y);if(o===tutBed())tutEvent('plant')}
  if(k==='water'){o.waterIdx++;startSeg(o);SND.pop();addXp(1,cx,R.y);stat('water');if(o===tutBed())tutEvent('water');if(!S.done&&tutWait()==='fert')setTimeout(()=>openTray({t:'obj',id:o.id}),600)}}
 else if(k==='water'){const P=PER[o.p];const dur=(o.stage===0?P[4]:P[5])*1000*tm();o.seg={t0:now(),t1:now()+dur};SND.pop();stat('water')}
 renderObj(o,k==='plant');save()}
function applyTool(k,T){closeTray();if(!T)return;
 if(T.t==='ani'){if(k.startsWith('feed:'))feedAnimal(T,k.slice(5));return}
 if(T.t==='bowl'){fillBowl(T.b);return}
 const o=objById(T.id);if(!o||o.busy)return;
 if(!S.done&&o!==tutBed())return;
 if(k==='move'){startPlace(o,false,0);return}
 if(k.startsWith('poison:')&&o.bug){const pk=k.slice(7);if(BUGS[o.bug][1]!==pk){SND.fail();toast('Не помогло — это средство от других вредителей!');return}takeItem(pk,1);cure(o,true);return}
 if(k==='shovel'&&(o.state==='weeds'||o.state==='used')){SND.dig();startBusy(o,'dig');return}
 if(k.startsWith('seed:')&&o.state==='dug'){const c=k.slice(5);if(S.inv['seed_'+c]<1)return;takeItem('seed_'+c,1);SND.plant();startBusy(o,'plant',c);return}
 if(k==='can'&&needsWater(o)){if(!S.can){toast('Лейка пустая — набери воду в бочке');return}S.can--;renderHUD();SND.water();startBusy(o,'water');return}
 if(k==='fert'&&isCropObj(o)&&o.state==='planted'&&!o.fert&&!isRipe(o)){takeItem('fert',1);o.fert=true;o.speed=.6;
  if(o.seg){const f=curFrac(o),rem=o.seg.t1-now();o.seg={f0:f,f1:o.seg.f1,t0:now(),t1:now()+rem*.6}}SND.magic();sparkles(o,26);renderObj(o);if(o===tutBed())tutEvent('fert');save();return}
 SND.fail()}
function harvest(o){const R=rectOf(o);let id,qty,xp;
 if(isCropObj(o)){id=o.crop;qty=(o.kind==='gh'&&S.ghLvl>=3)?2:1;xp=ANN[id][6];Object.assign(o,{state:'used',crop:null,fert:false,frac:0,waterIdx:0,seg:null,speed:1,total:0,ripeAt:0});if(id==='potato')S.firstPotato=false}
 else{id=o.p;qty=PER[id][6];xp=PER[id][8];o.ripe=false;o.ripeAt=0;o.seg=null;stat('fruit')}
 closeTray();SND.harvest();addItem(id,qty);stat('harv_'+id);stat('harvest');S.ui.store=true;S.ui.xp=true;
 const dest=elWorld($('hStore'));for(let j=0;j<Math.min(6,qty*3);j++){const x=R.x+Math.random()*R.w,y=R.y+R.h/2;const f=document.createElement('div');f.className='fly';f.innerHTML=`<img src="${IMG[id+'_crop']}">`;f.style.left=x+'px';f.style.top=y+'px';$('world').appendChild(f);
  f.animate([{transform:'translate(0,0) scale(.6)'},{transform:`translate(${(dest[0]-x)/2}px,${Math.min(0,dest[1]-y)-160}px) scale(1.1)`,offset:.45},{transform:`translate(${dest[0]-x}px,${dest[1]-y}px) scale(.4)`}],{duration:900,delay:j*80,easing:'ease-in-out',fill:'forwards'}).onfinish=()=>f.remove()}
 renderObj(o);renderHUD();
 setTimeout(()=>{bump('hStore');const hs=elStage($('hStore'));floatText(hs[0]-40,hs[1]+70,'+'+qty+' '+iName(id),'#fff',true);addXp(xp,R.x+R.w/2,R.y-20);if(o===tutBed())tutEvent('harvest');save()},1000)}

/* ================= TAPS ================= */
function handleTap(target,wp){if(placing){placeAt(wp);return}
 const el=target&&target.closest?target.closest('[data-tap]'):null;const tap=el&&el.dataset.tap;
 if(!tap){if(trayOpen){closeTray();updateGuide()}return}
 const w=tutWait();
 if(tap.startsWith('obj:'))return tapObj(objById(tap.slice(4)));
 if(tap==='barrel'||tap==='well')return tapWater(tap);
 if(tap==='board')return tapBoard();
 if(!S.done){SND.fail();return}
 if(tap.startsWith('bird:'))return shooBird(tap.slice(5),true);
 if(tap.startsWith('thief:'))return shooThief(tap.slice(6),true);
 if(tap.startsWith('ani:')){const[,a,i]=tap.split(':');return tapAnimal(a,+i)}
 if(tap.startsWith('fix:'))return tapFix(tap.slice(4));
 if(tap==='house')return openFac('kitchen');
 if(tap==='scare')return toast(S.scareUntil>now()?'Пугало сторожит ещё '+fmt(S.scareUntil-now()):'Пугало развалилось — поставь новое (Магазин → Защита)');
 if(tap==='david')return tapDavid();if(tap==='cat')return petCat();if(tap==='catfood'||tap==='catwater')return tapBowl(tap);
 if(tap==='fish')return openFishing();if(tap==='forest')return openForest();if(tap==='chest')return openChest();if(tap==='rainbow')return toast('Радуга! Скупщик сегодня платит на 20% больше')}
function tapObj(o){if(!o)return;const w=tutWait();
 if(!S.done&&o!==tutBed())return;
 if(o.busy){toast('Работа идёт — осталось '+fmt(o.busy.t1-now()));return}
 if(isRipe(o)){if(!S.done&&w!=='harvest')return;harvest(o);return}
 if(!S.done&&!['dig','plant','water','fert'].includes(w)){if(o.seg)toast('Растёт! Осталось '+fmt(o.seg.t1-now()));else SND.fail();return}
 if(trayOpen&&trayT&&trayT.id===o.id){closeTray();updateGuide();return}
 if(isCropObj(o)&&o.state==='planted'&&o.seg&&(o.fert||S.inv.fert<1)&&!o.bug){toast(ANN[o.crop][0]+': '+(o.seg.f1>=1?'созреет через ':'полив через ')+fmt(o.seg.t1-now()));return}
 if(!isCropObj(o)&&o.seg){toast(PER[o.p][0]+': '+(o.stage===0?'вырастет через ':'урожай через ')+fmt(o.seg.t1-now())+' · можно переставить');openTray({t:'obj',id:o.id});return}
 if(isCropObj(o)&&o.state==='dug'&&!ANN_IDS.some(c=>S.inv['seed_'+c]>0)){toast('Семян нет — загляни в магазин');SND.fail();if(S.done)bump('hShop')}
 openTray({t:'obj',id:o.id})}
function tapWater(src){if(!S.done&&tutWait()!=='barrel'){SND.fail();return}
 const cm=canMax();if(S.can>=cm){toast('Лейка уже полная — полей грядку');return}
 if(src==='well'||S.build.well){S.can=cm;SND.fill();renderHUD();burst(src==='well'?FIX.well.x:545,src==='well'?FIX.well.y-120:700,10,['#7fd3ff','#c6ecff'],40,[5,10],.6);tutEvent('barrel');save();return}
 if(S.water<1){toast('Бочка пуста. +1 воды через '+fmt(S.waterAt+D.refill()-now()));SND.fail();return}
 if(S.water>=waterMax())S.waterAt=now();const n=Math.min(S.water,cm-S.can);S.water-=n;S.can+=n;SND.fill();renderHUD();
 burst(545,700,10,['#7fd3ff','#c6ecff'],40,[5,10],.6);tutEvent('barrel');save()}
function tapBoard(){if(!S.ui.board){SND.fail();return}if(!S.done&&tutWait()!=='sell'){SND.fail();return}SND.tap();openOrders()}

/* particles */
function burst(x,y,n,colors,spread=120,size=[8,18],grav=1){for(let i=0;i<n;i++){const p=document.createElement('div');p.className='pt';const s=size[0]+Math.random()*(size[1]-size[0]);p.style.cssText+=`width:${s}px;height:${s}px;left:${x}px;top:${y}px;background:${colors[i%colors.length]};z-index:7000`;$('world').appendChild(p);
 const dx=(Math.random()-.5)*spread*2,dy=-60-Math.random()*spread;p.animate([{transform:'translate(0,0)',opacity:1},{transform:`translate(${dx*.6}px,${dy}px)`,opacity:1,offset:.45},{transform:`translate(${dx}px,${dy+140*grav}px)`,opacity:0}],{duration:800+Math.random()*400,easing:'ease-out'}).onfinish=()=>p.remove()}}
function sparkles(o,n=18){const R=rectOf(o);for(let i=0;i<n;i++){const x=R.x+Math.random()*R.w,y=R.y+Math.random()*R.h;const p=document.createElement('div');p.className='pt';p.style.cssText+=`left:${x}px;top:${y-30}px;width:12px;height:12px;z-index:7000;background:radial-gradient(#fff,#ffd93b 50%,transparent 70%)`;$('world').appendChild(p);p.animate([{transform:'scale(0)',opacity:0},{transform:'scale(1.6) translateY(-20px)',opacity:1},{transform:'scale(.3) translateY(-60px)',opacity:0}],{duration:900+Math.random()*600,delay:Math.random()*500,fill:'both'}).onfinish=()=>p.remove()}}
function rainAt(x,y){for(let i=0;i<5;i++){const p=document.createElement('div');p.className='pt';p.style.cssText+=`left:${x+(Math.random()-.5)*60}px;top:${y-140}px;width:6px;height:16px;border-radius:3px;background:#7fd3ff;z-index:7000`;$('world').appendChild(p);p.animate([{transform:'translateY(0)',opacity:.9},{transform:'translateY(140px)',opacity:.5}],{duration:420,delay:Math.random()*300,fill:'both'}).onfinish=()=>p.remove()}}
