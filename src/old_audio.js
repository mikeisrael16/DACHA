/* ---------- audio ---------- */
let AC=null,muted=false;try{muted=localStorage.getItem('dacha_mute')==='1'}catch(e){}
function ac(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(AC&&AC.state==='suspended')AC.resume();return AC}
function tone(f,d=.15,type='sine',v=.18,f2=null,delay=0){const a=ac();if(!a||muted)return;const t=a.currentTime+delay,o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g).connect(a.destination);o.start(t);o.stop(t+d+.05)}
function noise(d=.2,fq=800,v=.25,delay=0,q=1){const a=ac();if(!a||muted)return;const t=a.currentTime+delay,n=a.sampleRate*d,b=a.createBuffer(1,n,a.sampleRate),c=b.getChannelData(0);for(let i=0;i<n;i++)c[i]=(Math.random()*2-1)*(1-i/n);const s=a.createBufferSource();s.buffer=b;const fl=a.createBiquadFilter();fl.type='bandpass';fl.frequency.value=fq;fl.Q.value=q;const g=a.createGain();g.gain.value=v;s.connect(fl).connect(g).connect(a.destination);s.start(t)}
const SND={
 tap:()=>tone(660,.08,'triangle',.12,880),
 pop:()=>tone(520,.12,'sine',.18,1040),
 dig:()=>{for(let i=0;i<3;i++){noise(.14,300,.5,i*.18,.8);tone(110,.1,'square',.06,70,i*.18)}},
 plant:()=>{tone(400,.1,'triangle',.15,600);tone(600,.12,'triangle',.15,900,.1)},
 water:()=>{noise(1.1,2400,.18,0,.6);for(let i=0;i<8;i++)tone(900+Math.random()*900,.06,'sine',.06,null,Math.random()*1)},
 fill:()=>{noise(.6,1200,.2,0,.8);tone(300,.5,'sine',.08,700)},
 magic:()=>{[880,1109,1319,1760].forEach((f,i)=>tone(f,.25,'sine',.1,null,i*.07))},
 coin:()=>{tone(1318,.09,'square',.07);tone(1760,.25,'square',.07,null,.08)},
 harvest:()=>{[523,659,784,1046].forEach((f,i)=>tone(f,.18,'triangle',.14,null,i*.09))},
 buy:()=>{tone(784,.1,'triangle',.14);tone(1175,.2,'triangle',.14,null,.1)},
 fail:()=>tone(220,.25,'sawtooth',.07,160),
 crickets:()=>{for(let k=0;k<10;k++){const t0=k*.28+Math.random()*.1;for(let i=0;i<3;i++)tone(4300+Math.random()*200,.03,'sine',.035,null,t0+i*.045)}},
 rooster:()=>{tone(500,.15,'sawtooth',.08,700);tone(700,.18,'sawtooth',.08,620,.16);tone(620,.5,'sawtooth',.08,900,.36);tone(900,.35,'sawtooth',.06,500,.86)},
 caw:()=>{tone(620,.16,'sawtooth',.09,380);tone(560,.2,'sawtooth',.08,330,.2)},
 level:()=>{[523,659,784,1046,1318].forEach((f,i)=>tone(f,.22,'square',.06,null,i*.1))}
};
/* ---------- music ---------- */
const Music=(()=>{let on=true;try{on=localStorage.getItem('dacha_music')!=='0'}catch(e){}
 let gain=null,timer=null,next=0,step=0,playing=false;const BPM=118,E=60/BPM/2;
 const mf=m=>440*Math.pow(2,(m-69)/12);
 // 8 bars x 8 eighths; null=rest, 0=tie
 const MEL=[74,71,67,71,74,74,76,74, 76,76,79,76,74,72,71,69, 69,71,72,69,74,72,71,69, 71,0,67,0,67,0,0,null,
            79,78,76,74,71,74,79,0, 76,79,76,72,76,0,74,72, 71,72,74,69,71,69,66,69, 67,71,74,71,67,0,0,null];
 const CH=[[43,59,62,67],[48,64,67,72],[50,62,66,69],[43,59,62,67],[43,59,62,67],[48,64,67,72],[50,62,66,69],[43,59,62,67]];
 const CH2=[[55,59,62],[55,60,64],[57,62,66],[55,59,62],[55,59,62],[55,60,64],[54,57,62],[55,59,62]];
 function pluck(t,f,d,v,type='triangle',cut=2600){const a=AC,o=a.createOscillator(),o2=a.createOscillator(),g=a.createGain(),fl=a.createBiquadFilter();o.type=type;o2.type='square';o.frequency.value=f;o2.frequency.value=f*1.004;fl.type='lowpass';fl.frequency.setValueAtTime(cut,t);fl.frequency.exponentialRampToValueAtTime(500,t+d);
  const g2=a.createGain();g2.gain.value=.18;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.006);g.gain.exponentialRampToValueAtTime(.0008,t+d);
  o.connect(fl);o2.connect(g2).connect(fl);fl.connect(g).connect(gain);o.start(t);o2.start(t);o.stop(t+d+.05);o2.stop(t+d+.05)}
 function bass(t,f){const a=AC,o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.5,t+.01);g.gain.exponentialRampToValueAtTime(.001,t+E*1.8);o.connect(g).connect(gain);o.start(t);o.stop(t+E*2)}
 function shaker(t,v){const a=AC,n=Math.floor(a.sampleRate*.05),b=a.createBuffer(1,n,a.sampleRate),c=b.getChannelData(0);for(let i=0;i<n;i++)c[i]=(Math.random()*2-1)*(1-i/n);const s=a.createBufferSource();s.buffer=b;const f=a.createBiquadFilter();f.type='highpass';f.frequency.value=6000;const g=a.createGain();g.gain.value=v;s.connect(f).connect(g).connect(gain);s.start(t)}
 function sched(){const a=AC;while(next<a.currentTime+.25){const bar=Math.floor(step/8)%8,e=step%8,t=next;
   const m=MEL[(step)%64];if(m){let len=1;while(MEL[(step+len)%64]===0&&len<4)len++;pluck(t,mf(m),E*len*1.1+.08,.22)}
   if(e===0||e===4)bass(t,mf(CH[bar][0]+(e===4?7:0)));
   if(e===2||e===6)CH2[bar].forEach(n=>pluck(t,mf(n),E*.9,.06,'triangle',1800));
   if(e%2===1)shaker(t,.05);if(e===0&&bar%4===0)shaker(t,.09);
   next+=E*(e%2===0?1.06:0.94);step++}}
 function start(){if(!on||playing||!AC||muted&&false)return;if(AC.state!=='running'){AC.resume();}playing=true;gain=AC.createGain();gain.gain.value=0;gain.connect(AC.destination);gain.gain.linearRampToValueAtTime(.16,AC.currentTime+1.5);next=AC.currentTime+.1;step=0;timer=setInterval(sched,60);sched()}
 function stop(){if(!playing)return;playing=false;clearInterval(timer);const g=gain;g.gain.cancelScheduledValues(AC.currentTime);g.gain.setValueAtTime(g.gain.value,AC.currentTime);g.gain.linearRampToValueAtTime(0,AC.currentTime+.4);setTimeout(()=>g.disconnect(),600)}
 function duck(v){if(playing){gain.gain.cancelScheduledValues(AC.currentTime);gain.gain.setValueAtTime(gain.gain.value,AC.currentTime);gain.gain.linearRampToValueAtTime(.16*v,AC.currentTime+.8)}}
 function toggle(){on=!on;try{localStorage.setItem('dacha_music',on?'1':'0')}catch(e){}if(on){ac();start()}else stop();draw()}
 function draw(){const svg=`<path d="M24 42V16l22-5v26" fill="none" stroke="#7a4e26" stroke-width="5" stroke-linejoin="round"/><circle cx="19" cy="43" r="6" fill="#7a4e26"/><circle cx="41" cy="38" r="6" fill="#7a4e26"/>`+(on?'':`<path d="M10 10l42 42" stroke="#c0392b" stroke-width="5" stroke-linecap="round"/>`);$('musIco').innerHTML=svg;$('musIco2').innerHTML=svg}
 document.addEventListener('visibilitychange',()=>{if(!AC)return;if(document.hidden)AC.suspend();else AC.resume()});
 return{start,stop,toggle,duck,draw}})();
Music.draw();
['hMusic','tMusic'].forEach(id=>$(id).addEventListener('pointerdown',e=>{e.stopPropagation();ac();Music.toggle()}));
function drawSnd(){$('sndIco').innerHTML=`<path d="M12 24h9l12-10v34L21 38h-9z" fill="#7a4e26"/>`+(muted?`<path d="M40 22l14 18M54 22L40 40" stroke="#c0392b" stroke-width="5" stroke-linecap="round"/>`:`<path d="M40 22q6 9 0 18M46 16q11 15 0 30" fill="none" stroke="#7a4e26" stroke-width="4.5" stroke-linecap="round"/>`)}
drawSnd();$('hSound').onclick=()=>{muted=!muted;try{localStorage.setItem('dacha_mute',muted?'1':'0')}catch(e){};drawSnd();SND.tap()};


