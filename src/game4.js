
/* ================= POPUP QUEUE & DIALOG ================= */
const PQ=[];let pqBusy=false;
function popup(fn){PQ.push(fn);if(!pqBusy)nextPopup()}
function nextPopup(){const fn=PQ.shift();if(!fn){pqBusy=false;return}pqBusy=true;fn(()=>setTimeout(nextPopup,250))}
function sayLater(lines,cam,after){popup(done=>{if(cam)camTo(cam[0],cam[1],cam[2]||minS()*1.5,true);setTimeout(()=>dialog(lines,()=>{after&&after();done()}),cam?900:0)})}
let dlgQ=[],dlgCb=null,typing=null,typedFull=false;
function dialog(lines,cb){dlgQ=lines.slice();dlgCb=cb;$('dlg').classList.add('on');nextLine()}
function nextLine(){const l=dlgQ.shift();if(!l){$('dlg').classList.remove('on');const c=dlgCb;dlgCb=null;c&&c();return}
 const img=$('dlgImg');if(img.dataset.e!=String(l[0])){img.src=IMG['t'+l[0]];img.dataset.e=l[0];const p=$('dlg').querySelector('.por');p.style.animation='none';void p.offsetWidth;p.style.animation=''}
 const txt=$('dlgTxt');txt.textContent='';let i=0;typedFull=false;clearInterval(typing);
 typing=setInterval(()=>{i+=2;txt.textContent=l[1].slice(0,i);if(i%6===0)tone(700+Math.random()*200,.03,'triangle',.03);if(i>=l[1].length){clearInterval(typing);typedFull=true}},20);
 txt.dataset.full=l[1]}
$('dlg').addEventListener('pointerdown',e=>{e.stopPropagation();ac();if(!typedFull){clearInterval(typing);$('dlgTxt').textContent=$('dlgTxt').dataset.full;typedFull=true;return}SND.tap();nextLine()});
const tipQ=new Set();
function tip(key,lines,camPos,after){if(S.tips[key]||tipQ.has(key))return;tipQ.add(key);popup(done=>{tipQ.delete(key);if(S.tips[key]){done();return}S.tips[key]=1;save();if(camPos)camTo(camPos[0],camPos[1],camPos[2]||minS()*1.5,true);setTimeout(()=>dialog(lines,()=>{after&&after();done()}),camPos?900:0)})}
function modal(id,on){$(id).classList.toggle('on',on!==false)}
function msg(title,text,btns){$('msgTitle').textContent=title;$('msgText').textContent=text;const b=$('msgBtns');b.innerHTML='';btns.forEach(o=>{const d=document.createElement('div');d.className='btn '+(o.cls||'');d.textContent=o.t;d.onclick=()=>{modal('mMsg',false);SND.tap();o.f&&o.f()};b.appendChild(d)});modal('mMsg')}
document.querySelectorAll('.modal').forEach(m=>m.addEventListener('pointerdown',e=>e.stopPropagation()));
document.querySelectorAll('[data-close]').forEach(c=>c.addEventListener('click',()=>{c.closest('.modal').classList.remove('on');SND.tap();if(S&&!S.done){setTimeout(updateGuide,50)}}));

/* ================= GEOMETRY / OBJECTS ================= */
function fp(kind,rot){return (kind==='bed'||kind==='gh')?(rot?SIZE.bedv:SIZE.bedh):SIZE[kind]}
function rectOf(o){const Z=ZONES[o.z],[w,h]=fp(o.kind,o.rot);return{x:Z.x0+o.c*CW,y:Z.y0+o.r*CH,w:w*CW,h:h*CH}}
function cellsOf(o){const[w,h]=fp(o.kind,o.rot),a=[];for(let i=0;i<w;i++)for(let j=0;j<h;j++)a.push(o.z+':'+(o.c+i)+':'+(o.r+j));return a}
function fits(o,ignoreId){const[w,h]=fp(o.kind,o.rot),Z=ZONES[o.z];if(!Z||!zoneOk(o.kind,o.z))return false;if(o.c<0||o.r<0||o.c+w>Z.cols||o.r+h>Z.rows)return false;
 const occ=new Set();S.objs.forEach(x=>{if(x.id!==ignoreId)cellsOf(x).forEach(k=>occ.add(k))});return cellsOf(o).every(k=>!occ.has(k))}
const objById=id=>S.objs.find(o=>o.id===id);
const isCropObj=o=>o.kind==='bed'||o.kind==='gh';
function curFrac(o){if(!o.seg)return o.frac;const s=o.seg;return s.f0+(s.f1-s.f0)*Math.min(1,Math.max(0,(now()-s.t0)/(s.t1-s.t0)))}
function isRipe(o){return isCropObj(o)?(o.state==='planted'&&!o.seg&&o.frac>=1&&!o.bug):(o.ripe&&!o.bug)}
function needsWater(o){return isCropObj(o)?(o.state==='planted'&&!o.seg&&o.frac<1&&!o.busy&&!o.bug):(!o.seg&&!o.ripe&&!o.busy)}
function stageOf(o){if(!isCropObj(o))return o.ripe?3:o.stage;if(o.state!=='planted')return -1;if(isRipe(o)||(!o.seg&&o.frac>=1))return 3;const f=curFrac(o);return f<.34?0:f<.67?1:2}
function startSeg(o){const w=WATERS[ANN[o.crop][3]];const f1=w[o.waterIdx-1]!=null?w[o.waterIdx-1]:1;o.seg={f0:o.frac,f1,t0:now(),t1:now()+(f1-o.frac)*o.total*o.speed}}
const WATERS={1:[1],2:[.5,1],3:[.34,.67,1]};
function sproutSVG(big){return `<svg viewBox="0 0 60 50" width="${big?70:48}" height="${big?58:40}"><ellipse cx="30" cy="46" rx="16" ry="4" fill="rgba(0,0,0,.25)"/><path d="M30 46V24" stroke="#3e8b22" stroke-width="4"/><path d="M30 28q-20-2-22-18q18-2 22 18z" fill="#7cc84a" stroke="#2d6a19" stroke-width="2.5"/><path d="M30 24q16-6 22-20q-18 0-22 20z" fill="#9be36d" stroke="#2d6a19" stroke-width="2.5"/>${big?'<path d="M30 34q-14 4-24-4q12-8 24 4z" fill="#7cc84a" stroke="#2d6a19" stroke-width="2.5"/>':''}</svg>`}
const PERW={bush:120,tree:200};
function ghSVG(W,H,rot,lvl){const T=rot?70:80,bot=T+H-4,st=[null,{fr:'#8d5f31',fill:'rgba(236,246,250,.45)',ln:'rgba(255,255,255,.7)',base:'#7a4e26'},{fr:'#90a4ae',fill:'rgba(185,222,255,.38)',ln:'rgba(255,255,255,.55)',base:'#78909c'},{fr:'#eceff1',fill:'rgba(210,242,255,.28)',ln:'rgba(255,255,255,.9)',base:'#b5533c'}][lvl];
 let g='';const sw=lvl===3?5:4,ol='#4e342e';
 if(!rot){const body=`M6 ${bot} L6 ${T*0.6} Q6 10 34 10 L${W-34} 10 Q${W-6} 10 ${W-6} ${T*0.6} L${W-6} ${bot} Z`;
  g+=`<path d="${body}" fill="${st.fill}" stroke="${ol}" stroke-width="${sw+3}"/><path d="${body}" fill="none" stroke="${st.fr}" stroke-width="${sw}"/>`;
  for(let x=34;x<=W-34;x+=lvl===2?26:34)g+=`<path d="M${x} 12 Q${x-10} ${(12+bot)/2} ${x} ${bot}" fill="none" stroke="${st.fr}" stroke-width="${sw-1}"/>`;
  g+=`<path d="M30 18 L${W-30} 18" stroke="${st.ln}" stroke-width="5" stroke-linecap="round"/>`;
  if(lvl===1)for(let i=0;i<5;i++)g+=`<path d="M${30+i*40} ${T} q12 10 24 0" fill="none" stroke="${st.ln}" stroke-width="2"/>`;
  if(lvl===3)for(let i=0;i<4;i++)g+=`<path d="M${40+i*50} ${T+30} l22 -26" stroke="${st.ln}" stroke-width="4" stroke-linecap="round"/>`;
  g+=`<rect x="${W/2-18}" y="${bot-58}" width="36" height="58" rx="4" fill="rgba(90,60,30,.35)" stroke="${st.fr}" stroke-width="4"/><rect x="4" y="${bot-10}" width="${W-8}" height="12" rx="3" fill="${st.base}" stroke="${ol}" stroke-width="2"/>`}
 else{const r=(W-12)/2,body=`M6 ${bot} L6 ${10+r} A${r} ${r} 0 0 1 ${W-6} ${10+r} L${W-6} ${bot} Z`;
  g+=`<path d="${body}" fill="${st.fill}" stroke="${ol}" stroke-width="${sw+3}"/><path d="${body}" fill="none" stroke="${st.fr}" stroke-width="${sw}"/>`;
  for(let y=10+r+24;y<bot-40;y+=lvl===2?24:32)g+=`<path d="M6 ${y} Q${W/2} ${y-26} ${W-6} ${y}" fill="none" stroke="${st.fr}" stroke-width="${sw-1}"/>`;
  g+=`<path d="M${W/2} 14 L${W/2} ${bot-60}" stroke="${st.ln}" stroke-width="4" stroke-linecap="round" opacity=".8"/>`;
  g+=`<path d="M10 ${bot} L10 ${bot-48} Q${W/2} ${bot-90} ${W-10} ${bot-48} L${W-10} ${bot} Z" fill="rgba(255,255,255,.18)" stroke="${st.fr}" stroke-width="${sw}"/><rect x="${W/2-17}" y="${bot-56}" width="34" height="56" rx="4" fill="rgba(90,60,30,.35)" stroke="${st.fr}" stroke-width="4"/><rect x="4" y="${bot-10}" width="${W-8}" height="12" rx="3" fill="${st.base}" stroke="${ol}" stroke-width="2"/>`}
 return `<svg class="ghov" viewBox="0 0 ${W} ${T+H}" style="position:absolute;left:0;bottom:0;width:${W}px;height:${T+H}px;pointer-events:none;overflow:visible">${g}</svg>`}

function buildObjEl(o,ghost){const R=rectOf(o);const d=document.createElement('div');d.className='obj '+(o.kind==='bed'?(o.rot?'v':'h'):o.kind)+(ghost?' ghost':'');
 d.style.left=R.x+'px';d.style.top=R.y+'px';d.style.width=R.w+'px';d.style.height=R.h+'px';d.style.zIndex=Math.round(R.y+R.h);
 if(!ghost)d.dataset.tap='obj:'+o.id;
 if(o.kind==='bed'||o.kind==='gh'){d.innerHTML='<div class="soil"></div><div class="pls"></div>'+(o.kind==='gh'?ghSVG(R.w,R.h,o.rot,S.ghLvl):'')}
 else{d.innerHTML=`<img class="spr" style="width:${PERW[o.kind]}px">`}
 return d}
const objEls={};
function renderObj(o,anim){let d=objEls[o.id];if(!d){d=buildObjEl(o);objEls[o.id]=d;$('objs').appendChild(d)}
 const R=rectOf(o);d.style.left=R.x+'px';d.style.top=R.y+'px';d.style.width=R.w+'px';d.style.height=R.h+'px';d.style.zIndex=Math.round(R.y+R.h);
 if(o.kind==='gh'){const k=o.rot+':'+S.ghLvl+':'+R.w;if(d.dataset.gk!==k){d.dataset.gk=k;const ov=d.querySelector('.ghov');if(ov)ov.outerHTML=ghSVG(R.w,R.h,o.rot,S.ghLvl);else d.insertAdjacentHTML('beforeend',ghSVG(R.w,R.h,o.rot,S.ghLvl))}}
 if(o.kind==='bed'||o.kind==='gh'){d.className='obj '+(o.kind==='gh'?'gh ':'')+(o.rot?'v':'h')+(o.state==='weeds'?' weeds':o.state==='used'?' used':'')+((o.state==='planted'&&(o.seg||isRipe(o)))?' wet':'');
  const pl=d.querySelector('.pls');pl.innerHTML='';const st=stageOf(o);
  if(o.state==='planted'){const sp=o.rot?[[.28,.3],[.72,.3],[.28,.62],[.72,.62],[.28,.94],[.72,.94]]:[[.18,.45],[.5,.45],[.82,.45],[.18,.92],[.5,.92],[.82,.92]];
   const pw=o.rot?66:72;
   sp.forEach(([u,v],j)=>{const e=document.createElement('div');e.className='pl'+(st===3?' ripe':'')+(anim?' pop':'');e.style.left=u*R.w+'px';e.style.top=v*R.h+'px';e.style.animationDelay=(j*.15)+'s';
    if(st>=2){e.style.width=(st===3?pw:pw*.62)+'px';e.innerHTML=`<img src="${IMG['p_'+o.crop+'_plant']}">`}else e.innerHTML=sproutSVG(st===1);pl.appendChild(e)});
   if(o.bug)sp.forEach(([u,v],j)=>{const e=document.createElement('div');e.className='bug';e.innerHTML=BUGSVG[o.bug];e.style.left=(u*R.w-14)+'px';e.style.top=(v*R.h-40-(j%3)*8)+'px';e.style.animationDelay=j*.3+'s';pl.appendChild(e)})}}
 else{const im=d.querySelector('img');const src=IMG['p_'+o.p+'_s'+(o.ripe?2:o.stage)];if(im.getAttribute('src')!==src)im.setAttribute('src',src)}
 renderStatus(o,true)}
function removeObjEl(id){if(objEls[id]){objEls[id].remove();delete objEls[id]}if(bubEls[id]){bubEls[id].remove();delete bubEls[id]}}
function renderAllObjs(){Object.keys(objEls).forEach(id=>{if(!objById(id))removeObjEl(id)});S.objs.forEach(o=>renderObj(o))}
function topOf(o){const R=rectOf(o);const x=R.x+R.w/2;if(o.kind==='bed')return[x,R.y-6];if(o.kind==='gh')return[x,R.y-(o.rot?70:80)];if(o.kind==='bush')return[x,R.y+R.h-110];return[x,R.y+R.h-190]}
const bubEls={},bubKey={};
function renderStatus(o,force){let el=bubEls[o.id];if(!el){el=document.createElement('div');el.className='bb';$('bubs').appendChild(el);bubEls[o.id]=el}
 const t=now(),pct=x=>Math.round(Math.min(1,Math.max(0,x))*100);let key,html;
 const name=isCropObj(o)?(o.crop?ANN[o.crop][0]:''):PER[o.p][0];
 if(o.bug&&!o.busy){key='bug';html=`<div class="pbar bugbar" style="border-color:#c0392b"><div class="bugico" style="width:46px;height:40px">${BUGSVG[o.bug]}</div><div><div class="lb" style="color:#c0392b">${BUGS[o.bug][0]}!</div><div class="lb" style="font-size:13px">Нажми и примени средство</div></div></div>`}
 else if(o.busy){const f=(t-o.busy.t0)/(o.busy.t1-o.busy.t0);const icon={dig:IMG.i_shovel,plant:o.busy.data?IMG[o.busy.data+'_seed']:IMG.i_shovel,water:IMG.i_can}[o.busy.type];
  key='busy';html=`<div class="pbar act"><img src="${icon}"><div><div class="lb">${{dig:'Вскапываем…',plant:'Сажаем…',water:'Поливаем…'}[o.busy.type]}</div><div class="track"><div class="fill" style="width:${pct(f)}%"></div></div></div><div class="tm">${fmt(o.busy.t1-t)}</div></div>`}
 else if(isRipe(o)){key='ripe';html=`<div class="b"><img src="${IMG[(o.crop||o.p)+'_crop']}"></div>`;el.classList.add('ready')}
 else if((isCropObj(o)&&o.state==='planted')||!isCropObj(o)){
  if(needsWater(o)){key='thirst';html=`<div class="b"><svg viewBox="0 0 24 24" width="38" height="38"><path d="M12 2C9 7 5 11 5 15a7 7 0 0014 0c0-4-4-8-7-13z" fill="#4aa3df"/></svg></div>`}
  else if(o.seg){const f=isCropObj(o)?curFrac(o):(t-o.seg.t0)/(o.seg.t1-o.seg.t0);const lab=isCropObj(o)?(o.seg.f1>=1?'созреет через':'полив через'):(o.stage===0?'вырастет через':'урожай через');
   key='grow';html=`<div class="pbar"><img src="${isCropObj(o)?IMG['p_'+o.crop+'_plant']:IMG[o.p+'_crop']}"><div><div class="lb">${name}${o.fert?' ✨':''} · ${lab}</div><div class="track"><div class="fill" style="width:${pct(f)}%"></div></div></div><div class="tm">${fmt(o.seg.t1-t)}</div></div>`}
  else{key='none';html=''}}
 else if(o.state==='used'||o.state==='weeds'){key='dig';html=S.done?`<div class="b" style="border-color:#a8743f"><img src="${IMG.i_shovel}"></div>`:''}
 else{key='seed';html=S.done?`<div class="b" style="border-color:#5fb53a"><img src="${IMG.potato_seed}"></div>`:''}
 if(key!=='ripe')el.classList.remove('ready');
 if(force||key!==bubKey[o.id]){bubKey[o.id]=key;el.innerHTML=html;const p=topOf(o);el.style.left=p[0]+'px';el.style.top=p[1]+'px';el.style.transform='translate(-50%,-100%) scale(var(--bz,1))';el.style.visibility=trayOpen&&trayT&&trayT.id===o.id?'hidden':''}
 else if(key==='grow'||key==='busy'){const c=el.firstElementChild;if(!c)return;const f=o.busy?(t-o.busy.t0)/(o.busy.t1-o.busy.t0):isCropObj(o)?curFrac(o):(t-o.seg.t0)/(o.seg.t1-o.seg.t0);
  const fi=c.querySelector('.fill');if(fi)fi.style.width=pct(f)+'%';const tmEl=c.querySelector('.tm');if(tmEl)tmEl.textContent=fmt((o.busy||o.seg).t1-t)}}

/* ================= PLACEMENT ================= */
let placing=null; // {o, isNew, cost, onDone}
function startPlace(o,isNew,price,onDone){closeTray();placing={o,isNew,price,onDone,orig:isNew?null:{z:o.z,c:o.c,r:o.r,rot:o.rot}};
 if(!isNew){removeObjEl(o.id)}
 if(isNew){const spot=findSpot(o);if(!spot){placing=null;toast('Нет свободного места — переставь что-нибудь (нажми на объект → «Переставить»)');SND.fail();return}Object.assign(o,spot)}
 drawGrid(true);renderGhost();$('placeBar').classList.add('on');$('placeTip').textContent='Нажми на свободное место · ↻ повернуть';$('placeTip').classList.add('on');
 const R=rectOf(o);camTo(R.x+R.w/2,R.y+R.h/2,Math.max(cam.s,minS()*1.3),true);
 $('pRot').style.display=(o.kind==='bed'||o.kind==='gh')?'':'none'}
function zoneOrder(k){return k==='bed'?[0,3]:k==='gh'?[2]:[1,0,2,3]}
function findSpot(o){for(const rot of (o.kind==='bed'||o.kind==='gh')?[o.rot,o.rot?0:1]:[o.rot])for(const z of zoneOrder(o.kind)){const Z=ZONES[z];for(let r=0;r<Z.rows;r++)for(let c=0;c<Z.cols;c++){const t={...o,z,c,r,rot};if(fits(t,o.id))return{z,c,r,rot}}}return null}
function fixLayout(){const all=S.objs.slice(),kept=[];S.objs=kept;all.forEach(o=>{if(!fits(o,o.id)){const s=findSpot(o);if(s)Object.assign(o,s)}kept.push(o)})}
let ghostEl=null;
function renderGhost(){if(ghostEl)ghostEl.remove();if(!placing)return;const o=placing.o;ghostEl=buildObjEl(o,true);if(o.kind==='bush'||o.kind==='tree')ghostEl.querySelector('img').src=IMG['p_'+o.p+'_s'+(o.ripe?2:o.stage)];
 if(o.kind==='bed'&&o.state==='weeds')ghostEl.classList.add('weeds');
 ghostEl.classList.add(fits(o,o.id)?'ok':'bad');ghostEl.style.zIndex=5000;$('objs').appendChild(ghostEl)}
function drawGrid(on){const g=$('gridSvg');if(!on){g.style.display='none';g.innerHTML='';return}g.style.display='';
 const occ=new Set();S.objs.forEach(x=>{if(!placing||x.id!==placing.o.id)cellsOf(x).forEach(k=>occ.add(k))});let h='';
 ZONES.forEach((Z,z)=>{if(placing&&!zoneOk(placing.o.kind,z))return;for(let r=0;r<Z.rows;r++)for(let c=0;c<Z.cols;c++)h+=`<rect x="${Z.x0+c*CW+2}" y="${Z.y0+r*CH+2}" width="${CW-4}" height="${CH-4}" rx="6" class="${occ.has(z+':'+c+':'+r)?'occ':''}"/>`});g.innerHTML=h}
function placeAt(p){const o=placing.o;const[w,h]=fp(o.kind,o.rot);let best=null,bd=1e9;
 ZONES.forEach((Z,z)=>{if(!zoneOk(o.kind,z))return;const c=Math.max(0,Math.min(Z.cols-w,Math.round((p[0]-Z.x0)/CW-w/2))),r=Math.max(0,Math.min(Z.rows-h,Math.round((p[1]-Z.y0)/CH-h/2)));
  const cx=Z.x0+(c+w/2)*CW,cy=Z.y0+(r+h/2)*CH,dd=Math.hypot(cx-p[0],cy-p[1]);if(dd<bd){bd=dd;best={z,c,r}}});
 if(best){Object.assign(o,best);renderGhost();SND.tap()}}
$('pRot').addEventListener('click',()=>{if(!placing)return;const o=placing.o;o.rot=o.rot?0:1;if(!fits(o,o.id)){const s=findSpotNear(o)||findSpot(o);if(s)Object.assign(o,s)}renderGhost();SND.pop()});
function findSpotNear(o){if(!zoneOk(o.kind,o.z))return null;const Z=ZONES[o.z],[w,h]=fp(o.kind,o.rot);let best=null,bd=1e9;for(let r=0;r<=Z.rows-h;r++)for(let c=0;c<=Z.cols-w;c++){const t={...o,c,r};if(fits(t,o.id)){const d=Math.abs(c-o.c)+Math.abs(r-o.r);if(d<bd){bd=d;best={c,r}}}}return best}
$('pOk').addEventListener('click',()=>{if(!placing)return;const o=placing.o;if(!fits(o,o.id)){toast('Здесь занято — выбери свободное место');SND.fail();return}
 if(placing.isNew){if(placing.price&&!spend(placing.price))return;S.objs.push(o)}
 const cb=placing.onDone;endPlace();renderObj(o,true);const R=rectOf(o);burst(R.x+R.w/2,R.y+R.h/2,14,['#a8743f','#7a4e26','#5f8f37'],100);SND.harvest();save();cb&&cb(o)});
$('pNo').addEventListener('click',()=>{if(!placing)return;const p=placing;if(!p.isNew)Object.assign(p.o,p.orig);endPlace();if(!p.isNew)renderObj(p.o);SND.tap()});
function endPlace(){placing=null;if(ghostEl){ghostEl.remove();ghostEl=null}drawGrid(false);$('placeBar').classList.remove('on');$('placeTip').classList.remove('on')}
