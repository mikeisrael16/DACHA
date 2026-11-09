
/* ================= CAMERA ================= */
const cam={s:1,x:0,y:0};
const minS=()=>Math.max(SW/WW,SH/WH,.52);
const maxS=()=>Math.max(1.9,minS()*2.5);
function clampCam(){cam.s=Math.min(maxS(),Math.max(minS(),cam.s));cam.x=Math.min(0,Math.max(SW-WW*cam.s,cam.x));cam.y=Math.min(0,Math.max(SH-WH*cam.s,cam.y))}
let guideRaf=0;
function applyCam(anim){const rel=cam.s/minS();$('world').style.setProperty('--bz',Math.max(.8,Math.min(1.35,1.3/Math.pow(rel,.7))).toFixed(3));for(const el of [$('world'),$('guideL')]){el.classList.toggle('anim',!!anim);el.style.transform=`translate(${cam.x}px,${cam.y}px) scale(${cam.s})`}
 if(!guideRaf)guideRaf=requestAnimationFrame(()=>{guideRaf=0;if(S&&!S.done)updateGuide()})}
function camTo(wx,wy,s,anim){cam.s=s;cam.x=SW/2-wx*s;cam.y=SH/2-wy*s;clampCam();applyCam(anim)}
function camHome(anim){camTo(HOMEC[0],HOMEC[1],Math.max(minS(),HOMEC[2]),anim)}
function zoomAt(sx,sy,ns){const wx=(sx-cam.x)/cam.s,wy=(sy-cam.y)/cam.s;cam.s=Math.min(maxS(),Math.max(minS(),ns));cam.x=sx-wx*cam.s;cam.y=sy-wy*cam.s;clampCam();applyCam(false)}
const s2w=([x,y])=>[(x-cam.x)/cam.s,(y-cam.y)/cam.s];
function elStage(el){const r=el.getBoundingClientRect();return toStage(r.left+r.width/2,r.top+r.height/2)}
const elWorld=el=>s2w(elStage(el));
$('hZin').addEventListener('pointerdown',e=>{e.stopPropagation();SND.tap();zoomAt(SW/2,SH/2,cam.s*1.3)});
$('hZout').addEventListener('pointerdown',e=>{e.stopPropagation();SND.tap();zoomAt(SW/2,SH/2,cam.s/1.3)});
$('hHome').addEventListener('pointerdown',e=>{e.stopPropagation();SND.tap();camHome(true)});
const view=$('view');const ptrs=new Map();let gest=null;
view.addEventListener('pointerdown',e=>{if(drag)return;ac();try{view.setPointerCapture(e.pointerId)}catch(_){}
 ptrs.set(e.pointerId,toStage(e.clientX,e.clientY));
 if(ptrs.size===1)gest={mode:'tap',start:toStage(e.clientX,e.clientY),cx:e.clientX,cy:e.clientY,cam0:{...cam},target:e.target};
 else if(ptrs.size===2){const[a,b]=[...ptrs.values()];const mid=[(a[0]+b[0])/2,(a[1]+b[1])/2];gest={mode:'pinch',d0:Math.hypot(a[0]-b[0],a[1]-b[1]),s0:cam.s,wpt:s2w(mid)}}});
view.addEventListener('pointermove',e=>{if(!ptrs.has(e.pointerId)||!gest)return;ptrs.set(e.pointerId,toStage(e.clientX,e.clientY));
 if(gest.mode==='tap'&&Math.hypot(e.clientX-gest.cx,e.clientY-gest.cy)>9){gest.mode='pan';closeTray()}
 if(gest.mode==='pan'){const p=ptrs.get(e.pointerId);cam.x=gest.cam0.x+p[0]-gest.start[0];cam.y=gest.cam0.y+p[1]-gest.start[1];clampCam();applyCam(false)}
 if(gest.mode==='pinch'&&ptrs.size>=2){const[a,b]=[...ptrs.values()];const d=Math.hypot(a[0]-b[0],a[1]-b[1]);const mid=[(a[0]+b[0])/2,(a[1]+b[1])/2];
  cam.s=Math.min(maxS(),Math.max(minS(),gest.s0*d/gest.d0));cam.x=mid[0]-gest.wpt[0]*cam.s;cam.y=mid[1]-gest.wpt[1]*cam.s;clampCam();applyCam(false)}});
function endPtr(e){if(!ptrs.has(e.pointerId))return;ptrs.delete(e.pointerId);
 if(gest&&gest.mode==='tap'&&ptrs.size===0&&e.type==='pointerup')handleTap(gest.target,s2w(toStage(e.clientX,e.clientY)));
 if(ptrs.size===0)gest=null;else if(gest&&gest.mode==='pinch')gest={mode:'none'}}
view.addEventListener('pointerup',endPtr);view.addEventListener('pointercancel',endPtr);
view.addEventListener('wheel',e=>{e.preventDefault();const p=toStage(e.clientX,e.clientY);zoomAt(p[0],p[1],cam.s*(e.deltaY<0?1.12:1/1.12))},{passive:false});

/* ================= STATE ================= */
let uid=1;
function newCropObj(kind,z,c,r,rot){return{id:'o'+(uid++)+'_'+Math.floor(Math.random()*1e4),kind,z,c,r,rot:rot||0,state:(typeof ilOn==='function'&&ilOn())?'wild':'weeds',crop:null,fert:false,frac:0,waterIdx:0,total:0,speed:1,seg:null,busy:null,bug:null,bugDmgAt:0,pausedF1:null,ripeAt:0}}
function newPerObj(p,z,c,r){return{id:'o'+(uid++)+'_'+Math.floor(Math.random()*1e4),kind:PER[p][1],p,z,c,r,rot:0,stage:0,seg:null,ripe:false,ripeAt:0,busy:null}}
function blankInv(){const inv={};Object.keys(ITEMS).forEach(k=>inv[k]=0);return inv}
function newState(){const inv=blankInv();const fac={},ani={};Object.keys(FAC).forEach(f=>fac[f]={cap:1,slots:[]});ANI_IDS.forEach(k=>ani[k]=[]);inv.seed_potato=1;inv.fert=1;
 return{ver:VERSION,seenVer:'0',coins:0,xp:0,water:1,waterAt:now(),can:0,inv,lots:{},objs:[newCropObj('bed',0,1,2,0)],
 upg:{shovel:0,can:0,soil:0,gutter:0,cap:0},ghLvl:1,build:{market:true},loc:2,rod2:false,fishing:null,forest:null,fair:null,holGift:{},

 firstPotato:true,seenLvl:1,tut:0,done:false,orders:[],nextOrderAt:0,giftAt:0,
 scareUntil:0,scareEver:false,proUntil:0,camera:false,fence:false,lastSeen:now(),nextPestAt:0,nextThiefAt:0,tips:{},
 daily:{last:'',streak:0},cat:null,quests:[],stats:{},created:now(),
 ui:{coins:false,xp:false,store:false,shop:false,board:false,quest:false},fac,ani}}
function migrate(s){const d=newState();if(s.loc===undefined)s.loc=1;for(const k in d)if(s[k]===undefined)s[k]=d[k];
 ANI_IDS.forEach(k=>{if(!s.ani[k])s.ani[k]=[]});if(s.cows){s.ani.cow=s.cows;delete s.cows}if(s.sheep){s.ani.sheep=s.sheep;delete s.sheep}
 for(const k in d.inv)if(s.inv[k]===undefined)s.inv[k]=0;for(const k in d.upg)if(s.upg[k]===undefined)s.upg[k]=0;
 for(const k in d.fac)if(!s.fac[k])s.fac[k]=d.fac[k];for(const k in d.ui)if(s.ui[k]===undefined)s.ui[k]=d.ui[k];
 s.objs.forEach(o=>{const n=o.kind==='bed'||o.kind==='gh'?newCropObj(o.kind,0,0,0):newPerObj(o.p||'strawberry',0,0,0);for(const k in n)if(o[k]===undefined)o[k]=n[k]});
 return s}
let lastSave=0;
function save(){if(!S)return;lastSave=now();S.lastSeen=lastSave;try{localStorage.setItem(BASE_KEY,JSON.stringify(S))}catch(e){}}
function loadSave(){try{const t=localStorage.getItem(BASE_KEY);const s=t?JSON.parse(t):null;return s&&s.objs?migrate(s):null}catch(e){return null}}
const xpFor=n=>25*n*(n-1);
function level0(xp){let n=1;while(xp>=xpFor(n+1))n++;return n}
const level=()=>level0(S.xp);
const hard=()=>level()>=10?1.25+0.04*(level()-10):1;      // time multiplier from level 10
const pricey=()=>level()>=10?1.2+0.03*(level()-10):1;     // cost multiplier from level 10
const tm=()=>(1+0.03*(level()-1))*hard()*(typeof ilOn==='function'&&ilOn()?2:1);
const cost=c=>Math.round(c*pricey());
const tutOn=()=>!S.done;
const D={
 weed:()=>WT[S.wt||1][2]*tm()*1000,
 dig:()=>(tutOn()?3:6)*Math.pow(.8,S.upg.shovel)*tm()*1000,
 plant:()=>(tutOn()?2:3)*Math.pow(.85,S.upg.shovel)*tm()*1000,
 water:()=>(tutOn()?2:3)*tm()*1000,
 grow:c=>((c==='potato'&&S.firstPotato)?50:ANN[c][2]*tm()*Math.pow(.88,S.upg.soil))*1000,
 refill:()=>60000*Math.pow(.75,S.upg.gutter)*(weather()==='heat'?1.4:weather()==='drought'?2:1)};
const waterMax=()=>3+3*S.upg.cap;
const canMax=()=>1+S.upg.can;
function fmt(ms){let s=Math.max(0,Math.ceil(ms/1000));const h=Math.floor(s/3600);s-=h*3600;const m=Math.floor(s/60);return(h?h+':'+String(m).padStart(2,'0'):m)+':'+String(s%60).padStart(2,'0')}
const annUnlocked=id=>id==='carrot'?(S.done||S.tut>=TI.shop):level()>=ANN[id][1];
const perUnlocked=id=>level()>=PER[id][2];
function stat(k,n=1){S.stats[k]=(S.stats[k]||0)+n}

/* inventory with freshness lots */
function addItem(id,n){S.inv[id]=(S.inv[id]||0)+n;if(PERISH.has(id)){(S.lots[id]=S.lots[id]||[]).push([now(),n])}}
function takeItem(id,n){S.inv[id]=Math.max(0,(S.inv[id]||0)-n);if(PERISH.has(id)&&S.lots[id]){let k=n;while(k>0&&S.lots[id].length){const l=S.lots[id][0];const t=Math.min(k,l[1]);l[1]-=t;k-=t;if(l[1]<=0)S.lots[id].shift()}}}
function spoilCheck(silent){const t=now();const lost=[];for(const id in S.lots){const L=S.lots[id];let n=0;while(L.length&&t-L[0][0]>SPOIL){n+=L[0][1];L.shift()}if(n){S.inv[id]=Math.max(0,S.inv[id]-n);lost.push(n+' '+iName(id).toLowerCase())}}
 if(lost.length&&!silent){toast('Испортилось: '+lost.join(', ')+'. Продавай урожай вовремя!');tip('spoil',[[4,'Ой, часть урожая испортилась! Овощи, фрукты и молоко хранятся в сарае только 6 часов.'],[3,'Продавай их соседям или скупщику, а лучше перерабатывай на кухне — заготовки в банках не портятся.']])}
 if(lost.length)renderHUD();return lost}
function freshLeft(id){const L=S.lots[id];return L&&L.length?SPOIL-(now()-L[0][0]):null}

/* ================= HUD ================= */
function show(id,on){$(id).classList.toggle('hide',!on)}
function sellables(){return Object.keys(S.inv).filter(k=>S.inv[k]>0&&(ANN[k]||PER[k]||PROD[k]))}
function renderHUD(){if(!S)return;
 $('coinTxt').textContent=S.coins;const lv=level();$('lvTxt').textContent=lv;$('xpBar').style.width=Math.min(100,(S.xp-xpFor(lv))/(xpFor(lv+1)-xpFor(lv))*100)+'%';
 $('storeCnt').textContent=sellables().reduce((a,k)=>a+S.inv[k],0);
 show('hCoins',S.ui.coins);show('hXp',S.ui.xp);show('hStore',S.ui.store);show('hShop',S.ui.shop);show('hQuest',S.ui.quest);show('hDaily',S.done);
 const canFill=S.done?S.orders.filter(o=>S.inv[o.item]>=o.qty).length:(S.tut>=TI.sell&&S.inv.potato>0?1:0);
 $('boardBadge').style.display=S.ui.board&&canFill?'block':'none';show('hOrders',S.ui.board);$('boardLbl').style.display=S.ui.board?'':'none';$('ordersDot').style.display=S.ui.board&&canFill?'block':'none';$('ordersDot').textContent=canFill||'';$('boardBadge').textContent=canFill;
 renderGauge();$('canBadge').classList.toggle('on',S.can>0);$('canCnt').textContent=S.can>1?S.can:'';$('canCnt').style.display=S.can>1?'':'none';
 $('questDot').style.display=S.done&&S.quests.some(q=>qProg(q)>=q.target)?'block':'none';
 $('dailyDot').style.display=S.done&&S.daily.last!==dayKey()?'block':'none'}
function renderGauge(){const g=$('gauge').querySelector('.segs'),mx=waterMax();
 if(g.children.length!==mx){g.innerHTML='';for(let i=0;i<mx;i++){const d=document.createElement('div');d.className='seg';g.appendChild(d)}$('gauge').style.width=(60+mx*22)+'px'}
 [...g.children].forEach((s,i)=>s.classList.toggle('full',i<S.water));
 $('gaugeTimer').textContent=S.build.well?'Колодец: вода без ограничений':S.water<mx?'+1 💧 через '+fmt(S.waterAt+D.refill()-now()):'Бочка полна'}
let toastT;function toast(msg){const t=$('toast');t.textContent=msg;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),3000)}
function floatText(x,y,txt,color,inHud){const d=document.createElement('div');d.className='float';d.textContent=txt;if(color)d.style.color=color;d.style.left=x+'px';d.style.top=y+'px';(inHud?$('hud'):$('world')).appendChild(d);setTimeout(()=>d.remove(),1700)}
function bump(id){$(id).animate([{transform:'scale(1)'},{transform:'scale(1.25)'},{transform:'scale(1)'}],{duration:400,easing:'ease-out'})}
function addCoins(n,x,y){S.coins+=n;if(n>0)stat('earned',n);S.ui.coins=true;renderHUD();bump('hCoins');if(x!=null)floatText(x,y,(n>0?'+':'')+n+' монет','#ffe14d',true);SND.coin()}
function addXp(n,x,y){const lv=level();S.xp+=n;renderHUD();if(S.ui.xp)bump('hXp');if(x!=null)floatText(x,y,'+'+n+' XP','#8fd3ff');if(level()>lv)setTimeout(levelUp,700)}
function coinPos(){const c=elStage($('hCoins'));return[c[0],c[1]+70]}
function spend(n){if(S.coins<n){toast('Не хватает монет: нужно '+n);SND.fail();return false}S.coins-=n;renderHUD();bump('hCoins');const c=coinPos();floatText(c[0],c[1],'-'+n,'#ffb0a0',true);return true}
