
/* ================= CAT ================= */
const CATP=[625,742],BOWLF=[468,792],BOWLW=[545,796];
function catOn(){return S.done&&S.cat&&!S.cat.gone}
function renderCat(){const P=$('pets');if(!catOn()){P.innerHTML='';return}
 if(!P.children.length){P.innerHTML=`<div class="bowl" id="bowlF" data-tap="catfood" style="left:${BOWLF[0]}px;top:${BOWLF[1]}px;width:78px;z-index:${BOWLF[1]}"><img></div><div class="bowl" id="bowlW" data-tap="catwater" style="left:${BOWLW[0]}px;top:${BOWLW[1]}px;width:78px;z-index:${BOWLW[1]}"><img></div><div id="cat" data-tap="cat"><img><div class="zz" style="display:none">Zz</div></div><div class="nm" id="catName"></div>`}
 const c=S.cat,t=now(),fe=c.food<t,we=c.water<t,night=nightNow(),acting=c.act&&t-c.actAt<7000;
 let src,pos=CATP,w=118;
 if(acting){src=c.act==='eat'?'cat_eat':'cat_drink';w=170;pos=c.act==='eat'?[BOWLF[0]-52,BOWLF[1]+4]:[BOWLW[0]+50,BOWLW[1]+4]}
 else if(night&&!fe&&!we){src='cat_sleep';w=150}else if(fe||we)src='cat_stand';else src='cat_sit';
 const el=$('cat'),im=el.querySelector('img');if(im.dataset.s!==src){im.src=IMG[src];im.dataset.s=src}
 el.style.left=pos[0]+'px';el.style.top=pos[1]+'px';el.style.width=w+'px';el.style.zIndex=pos[1]+1;
 el.querySelector('.zz').style.display=src==='cat_sleep'?'':'none';
 const nm=$('catName');nm.textContent=c.name;nm.style.left=pos[0]+'px';nm.style.top=(pos[1]+4)+'px';
 $('bowlF').style.visibility=acting&&c.act==='eat'?'hidden':'';$('bowlW').style.visibility=acting&&c.act==='drink'?'hidden':'';
 $('bowlF').querySelector('img').src=fe?IMG.bowl_food0:IMG.bowl_food;$('bowlW').querySelector('img').src=we?IMG.bowl_empty:IMG.bowl_water;
 $('bowlF').classList.toggle('empty',fe);$('bowlW').classList.toggle('empty',we)}
function tapBowl(k){if(!catOn())return;const c=S.cat;const full=k==='catfood'?c.food:c.water;
 if(full>now()+3600000){toast((k==='catfood'?'Миска с кормом полная':'Воды хватает')+' — ещё '+fmt(full-now()));return}
 openTray({t:'bowl',b:k})}
function fillBowl(k){if(!catOn())return;const c=S.cat;
 if(k==='catfood'){if(!S.inv.catfood){toast('Нет кошачьего корма — купи в магазине (вкладка «Животные»)');SND.fail();return}takeItem('catfood',1);c.food=now()+86400000;c.act='eat';c.actAt=now();SND.pop();toast(c.name+' мурлычет: спасибо за еду!')}
 else{if(S.can>0)S.can--;else if(S.build.well){}else if(S.water>0)S.water--;else{toast('Нужна вода: набери из бочки');SND.fail();return}c.water=now()+86400000;c.act='drink';c.actAt=now();SND.fill()}
 renderCat();renderHUD();save();setTimeout(renderCat,7200)}
function petCat(){if(!catOn())return;tone(900,.12,'sine',.12,600);tone(700,.25,'sine',.1,1000,.12);const el=$('cat');floatText(parseFloat(el.style.left),parseFloat(el.style.top)-140,'💗 Мяу!','#ff7aa8');
 if(!S.cat.petAt||now()-S.cat.petAt>3600000){S.cat.petAt=now();addXp(2,CATP[0],CATP[1]-90)}}
function catTick(){if(!S.cat||S.cat.gone||!S.done)return;const t=now(),c=S.cat;
 if(t>c.food+86400000||t>c.water+86400000){c.gone=true;renderCat();save();sayLater([[4,`Ох… ${c.name} ушёл — миски стояли пустыми целый день. Коты не любят, когда о них забывают.`],[3,'Его можно позвать обратно в магазине (вкладка «Животные»). Только корми и пои каждый день!']])}
 else renderCat()}
function askCatName(){popup(done=>{$('nameCat').src=IMG.cat_sit;$('nameIn').value='Барсик';modal('mName');setTimeout(()=>{try{$('nameIn').focus();$('nameIn').select()}catch(e){}},300);
 $('nameOk').onclick=()=>{let n=$('nameIn').value.trim().slice(0,16)||'Барсик';S.cat={name:n,food:now()+86400000,water:now()+86400000,gone:false};addItem('catfood',3);modal('mName',false);renderCat();SND.magic();save();
  camTo(CATP[0]+200,CATP[1]-100,minS()*1.8,true);setTimeout(()=>dialog([[5,`${n} — отличное имя! Смотри, он уже устроился у крыльца.`],[3,`Каждый день наполняй миски: корм — из магазина, воду — из лейки или бочки. Нажми на миску и перетащи в неё корм или воду из лейки. Если миски простоят пустыми сутки, ${n} обидится и уйдёт.`],[1,'Я положила тебе 3 пачки корма для начала. А погладить кота можно, просто нажав на него!']],done),900)}})}

/* ================= PESTS: birds & bugs (lvl 5) ================= */
const pestsOn=()=>S.done&&level()>=PEST_LVL;
const birds={};
function birdEligible(o){if(o.kind==='gh'||o.busy)return false;return isCropObj(o)?(o.state==='planted'&&(isRipe(o)||curFrac(o)>.15)):(o.ripe||(o.stage===1&&o.seg))}
function tickPests(t){if(!pestsOn())return;
 for(const k in birds){const b=birds[k];if(!b.scared&&t>=b.eatAt)birdEat(k)}
 S.objs.forEach(o=>{if(o.bug&&t>=o.bugDmgAt){o.bugDmgAt=t+60000;if(o.frac>0){o.frac=Math.max(0,o.frac-.08);renderObj(o);const R=rectOf(o);floatText(R.x+R.w/2,R.y,'−8% урожая','#ff8a7a');save()}}});
 if(!S.nextPestAt){S.nextPestAt=t+40000;return}if(t<S.nextPestAt)return;S.nextPestAt=t+45000+Math.random()*60000;
 const cand=S.objs.filter(o=>birdEligible(o)&&!birds[o.id]);if(!cand.length)return;const o=pick(cand);
 if(Math.random()<.6)spawnBird(o,S.scareUntil>t);
 else if(o.kind==='bed'&&!o.bug&&S.proUntil<t)infest(o,pick(Object.keys(BUGS)))}
function infest(o,type,silent){if(o.bug)return;if(o.seg){o.frac=curFrac(o);o.pausedF1=o.seg.f1;o.seg=null}else o.pausedF1=o.frac>=1?1:null;
 o.bug=type;o.bugDmgAt=now()+60000;renderObj(o);save();
 if(!silent){SND.fail();toast(BUGS[type][0]+' напали на грядку!');tip('bug',[[4,`Беда — ${BUGS[type][0].toLowerCase()} на грядке! Пока они там, ничего не растёт, а урожай портится.`],[3,'Купи нужное средство во вкладке «Защита», нажми на грядку и перетащи его. От тли, жуков и слизней — разные средства!']])}}
function cure(o,anim){if(!o.bug)return;o.bug=null;if(o.pausedF1!=null){const f1=o.pausedF1;o.pausedF1=null;if(o.frac<f1)o.seg={f0:o.frac,f1,t0:now(),t1:now()+(f1-o.frac)*o.total*o.speed};else o.frac=f1}
 renderObj(o);if(anim){const R=rectOf(o);SND.magic();burst(R.x+R.w/2,R.y+R.h/2,16,['#9be36d','#e8ffd0','#fff'],90,[6,12]);addXp(3,R.x+R.w/2,R.y);toast('Вредители уничтожены!')}save()}
function spawnBird(o,scared){const R=rectOf(o);const x=R.x+R.w*(.2+Math.random()*.6),y=R.y+R.h*(o.kind==='bed'?.6:.2)-(o.kind==='tree'?120:o.kind==='bush'?50:0);
 const el=document.createElement('div');el.className='bird';el.dataset.tap='bird:'+o.id;el.innerHTML=BIRDSVG;el.style.left=x+'px';el.style.top=y+'px';$('birds').appendChild(el);
 el.animate([{transform:'translate(-380px,-420px) scale(.7)'},{transform:'translate(0,0)'}],{duration:1400,easing:'cubic-bezier(.2,.7,.3,1)'});SND.caw();
 if(scared){birds[o.id]={el,scared:true};setTimeout(()=>{if(birds[o.id]&&birds[o.id].el===el){floatText(1700,420,'Пугало прогнало ворону!','#fff');shooBird(o.id,false)}},2200)}
 else{birds[o.id]={el,eatAt:now()+15000};tip('bird',[[4,'Ворона прилетела клевать урожай! Скорее нажми на неё. А лучше поставь пугало — оно сторожит 12 часов, даже когда ты не в игре.']])}}
function shooBird(id,byTap){const b=birds[id];if(!b)return;delete birds[id];const el=b.el;el.dataset.tap='';el.animate([{transform:'translate(0,0)'},{transform:'translate(420px,-460px) scale(.6)'}],{duration:900,easing:'ease-in',fill:'forwards'}).onfinish=()=>el.remove();
 if(byTap){SND.caw();stat('shoo');const o=objById(id);if(o){const R=rectOf(o);addXp(2,R.x+R.w/2,R.y)}save()}}
function birdEat(id){const o=objById(id);shooBird(id,false);if(!o)return;const R=rectOf(o);
 if(isCropObj(o)){if(o.seg){const cur=curFrac(o),nf=Math.max(0,cur-.25);o.seg={f0:nf,f1:o.seg.f1,t0:now(),t1:now()+(o.seg.f1-nf)*o.total*o.speed}}else if(o.frac>=1&&!o.bug){o.frac=.75;o.seg={f0:.75,f1:1,t0:now(),t1:now()+.25*o.total*o.speed}}else o.frac=Math.max(0,o.frac-.25)}
 else{const P=PER[o.p];const half=P[5]*500*tm();if(o.ripe){o.ripe=false;o.seg={t0:now()-half,t1:now()+half}}else if(o.seg){o.seg.t1+=half/2}}
 renderObj(o);SND.caw();floatText(R.x+R.w/2,R.y,'Ворона склевала урожай!','#ff8a7a');save()}
function clearBirds(){for(const k in birds){birds[k].el.remove();delete birds[k]}}
function renderScare(){let el=$('scarecrow');if(!el){el=document.createElement('div');el.id='scarecrow';el.className='fix';el.dataset.tap='scare';el.style.cssText='left:1745px;top:520px;width:110px;z-index:520';el.innerHTML='<img>';$('objs').appendChild(el)}
 if(!S.scareEver||!S.done){el.style.display='none';return}el.style.display='';const rem=S.scareUntil-now();const st=rem>4*3600000?0:rem>0?1:2;const src=IMG['p_scare'+st];const im=el.querySelector('img');if(im.getAttribute('src')!==src)im.setAttribute('src',src)}

/* ================= THIEVES (lvl 4) ================= */
const thieves={};const thiefOn=()=>S.done&&level()>=THIEF_LVL;const thiefRisk=()=>(S.fence?.35:1)*(S.camera?.5:1);
function tickThieves(t){if(!thiefOn())return;for(const k in thieves){if(t>=thieves[k].stealAt)steal(k)}
 if(!S.nextThiefAt){S.nextThiefAt=t+60000;return}if(t<S.nextThiefAt)return;S.nextThiefAt=t+60000+Math.random()*60000;
 const cand=S.objs.filter(o=>o.kind!=='gh'&&isRipe(o)&&o.ripeAt&&t-o.ripeAt>10*60000&&!thieves[o.id]);if(!cand.length||Math.random()>.6)return;const o=pick(cand);
 if(Math.random()>thiefRisk()){floatText(1700,420,S.fence?'Высокий забор остановил воришку!':'Камера спугнула воришку!','#fff');return}spawnThief(o)}
function spawnThief(o){const R=rectOf(o);const el=document.createElement('div');el.className='thief';el.dataset.tap='thief:'+o.id;el.innerHTML=THIEFSVG;el.style.left=(R.x+R.w+20)+'px';el.style.top=(R.y+R.h)+'px';$('thieves').appendChild(el);
 el.animate([{transform:`translate(${2000-R.x}px,-60px)`},{transform:'translate(0,0)'}],{duration:2600,easing:'ease-out'});thieves[o.id]={el,stealAt:now()+14000};SND.fail();toast('Воришка лезет за урожаем! Нажми на него!');
 tip('thief',[[4,'Ой, воришка! Если долго не собирать спелый урожай, соседи-хитрецы его утащат.'],[3,'Нажми на вора, чтобы прогнать. А для надёжности купи камеру и высокий забор во вкладке «Защита».']])}
function shooThief(id,byTap){const th=thieves[id];if(!th)return;delete thieves[id];const el=th.el;el.dataset.tap='';el.animate([{transform:'translate(0,0)'},{transform:'translate(900px,-40px) scaleX(-1)'}],{duration:1100,easing:'ease-in',fill:'forwards'}).onfinish=()=>el.remove();
 if(byTap){SND.caw();const o=objById(id);if(o){const R=rectOf(o);addXp(3,R.x+R.w/2,R.y)}toast('Воришка убежал без добычи!');save()}}
function stealFrom(o){if(isCropObj(o))Object.assign(o,{state:'used',crop:null,fert:false,frac:0,waterIdx:0,seg:null,speed:1,total:0,ripeAt:0});else{o.ripe=false;o.ripeAt=0;o.seg=null}}
function steal(id){const o=objById(id);shooThief(id,false);if(!o||!isRipe(o))return;const name=isCropObj(o)?ANN[o.crop][0]:PER[o.p][0];stealFrom(o);renderObj(o);SND.fail();toast('Воришка утащил урожай: '+name.toLowerCase()+'!');save()}
function clearThieves(){for(const k in thieves){thieves[k].el.remove();delete thieves[k]}}
function offlineThieves(){if(!thiefOn())return 0;let n=0;const t=now(),since=S.lastSeen||t;
 S.objs.forEach(o=>{if(o.kind==='gh'||!isRipe(o)||!o.ripeAt)return;const st=Math.max(o.ripeAt+10*60000,since);const w=Math.min(3,Math.floor((t-st)/(20*60000)));for(let k=0;k<w;k++)if(Math.random()<.3*thiefRisk()){stealFrom(o);n++;break}});return n}
function renderSecurity(){$('cctv').style.display=S.camera?'':'none';const f=$('hifence');f.style.display=S.fence?'':'none';
 if(S.fence&&!f.innerHTML){let h='';const seg=(x0,y0,x1,y1)=>{for(let x=x0;x<x1;x+=24){const y=y0+(x-x0)*(y1-y0)/(x1-x0);h+=`<rect x="${x}" y="${y-150}" width="22" height="150" fill="${(x/24|0)%2?'#8d5f31':'#a8743f'}" stroke="#4a2c14" stroke-width="2.5"/><path d="M${x} ${y-150}l11-12 11 12" fill="#8d5f31" stroke="#4a2c14" stroke-width="2.5"/>`}h+=`<path d="M${x0} ${y0-110}L${x1} ${y1-110}M${x0} ${y0-40}L${x1} ${y1-40}" stroke="#5b391c" stroke-width="9"/>`};
  seg(880,405,1770,405);seg(1830,465,2576,465);f.innerHTML=h}}

/* ================= DAY & NIGHT ================= */
let forcedHour=null;
const LIGHT=[[0,.62,0,1,1],[4.5,.58,0,1,1],[5.5,.4,.25,.9,.6],[6.5,.12,.45,.3,0],[8,0,.15,0,0],[9,0,0,0,0],[17,0,0,0,0],[18.5,0,.3,0,0],[20,.15,.5,.5,0],[21,.38,.3,1,.4],[22,.55,.08,1,.9],[24,.62,0,1,1]];
function hourNow(){if(forcedHour!=null)return forcedHour;const d=new Date();return d.getHours()+d.getMinutes()/60}
const nightNow=()=>{const h=hourNow();return h<5.5||h>=21.5};
function updateLighting(){const h=hourNow();let a=LIGHT[0],b=LIGHT[1];for(let i=0;i<LIGHT.length-1;i++)if(h>=LIGHT[i][0]&&h<=LIGHT[i+1][0]){a=LIGHT[i];b=LIGHT[i+1];break}
 const k=(h-a[0])/((b[0]-a[0])||1),L=j=>a[j]+(b[j]-a[j])*k;
 $('night').style.opacity=L(1);$('stars').style.opacity=L(4);document.querySelectorAll('.win').forEach(w=>w.style.opacity=L(3));
 const warm=$('warm');warm.style.opacity=L(2);warm.style.background=h<12?'linear-gradient(rgba(255,170,190,.45),rgba(255,214,140,.35))':'linear-gradient(rgba(255,120,60,.45),rgba(255,180,90,.3))';
 const st=$('stars');if(!st.children.length)for(let i=0;i<80;i++){const s=document.createElement('i');s.style.left=Math.random()*WW+'px';s.style.top=Math.random()*240+'px';s.style.animationDelay=Math.random()*1.6+'s';st.appendChild(s)}
 Music.duck(L(1)>.4?.55:1)}
function greeting(){const h=hourNow();return h<5?'Доброй ночи!':h<12?'Доброе утро!':h<18?'Добрый день!':h<23?'Добрый вечер!':'Доброй ночи!'}
