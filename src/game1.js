(()=>{
'use strict';
const $=id=>document.getElementById(id);
const IMG=__IMGMAP__;
const VERSION='1.3';
const WW=2576,WH=1093;
const now=()=>Date.now();
const SPOIL=6*3600000;

/* ================= DATA ================= */
// annual crops: name, level, grow s, waters, seed cost, sell, xp
const ANN={
 potato:['Картофель',1,45,1,5,15,10],carrot:['Морковь',1,120,2,10,25,15],
 sorrel:['Щавель',2,70,1,7,20,9],radish:['Редис',2,60,1,6,18,9],onion:['Лук',2,90,1,8,22,12],
 dill:['Укроп',3,150,1,10,30,14],lettuce:['Салат',3,100,1,9,26,12],spinach:['Шпинат',3,110,1,10,28,13],beet:['Свёкла',3,180,2,15,40,20],
 cabbage:['Капуста',4,300,2,25,65,30],garlic:['Чеснок',4,240,2,18,50,22],parsley:['Петрушка',4,200,1,15,42,18],gonion:['Зелёный лук',4,130,1,12,34,15],
 cucumber:['Огурцы',5,480,3,40,100,45],zucchini:['Кабачки',5,360,2,30,80,35],corn:['Кукуруза',5,420,2,30,82,36],turnip:['Репа',5,240,1,18,50,22],
 tomato:['Томаты',6,720,3,60,150,60],peas:['Горох',6,420,2,32,85,38],beans:['Фасоль',6,400,2,30,80,36],basil:['Базилик',6,240,1,22,60,26],
 pepper:['Перец',7,780,3,62,160,62],eggplant:['Баклажаны',7,900,3,75,190,75],cauliflower:['Цветная капуста',7,600,2,48,125,52],
 pumpkin:['Тыква',8,1200,3,100,260,95],broccoli:['Брокколи',8,660,2,55,140,58],mint:['Мята',8,300,1,28,75,30],
 pattypan:['Патиссоны',9,600,2,50,130,55],celery:['Сельдерей',9,540,2,45,118,50],
 bradish:['Чёрная редька',10,480,2,40,105,45],kohlrabi:['Кольраби',10,540,2,45,118,50],
 chili:['Перец чили',11,900,3,75,195,78],
 watermelon:['Арбуз',12,1500,3,130,330,120],leek:['Лук-порей',12,720,2,60,155,62],
 melon:['Дыня',13,1500,3,140,350,125],artichoke:['Артишок',14,1800,3,160,410,140],asparagus:['Спаржа',15,2100,3,180,460,155]};
// perennials: name, kind, level, sapling cost, mature s, cycle s, yield, sell each, xp
const PER={
 strawberry:['Клубника','bush',6,60,180,240,2,30,12],raspberry:['Малина','bush',7,90,300,360,2,45,16],
 rcurrant:['Красная смородина','bush',8,110,360,420,2,52,18],bcurrant:['Чёрная смородина','bush',8,120,400,480,2,58,20],
 gooseberry:['Крыжовник','bush',9,140,480,540,2,64,22],apple:['Яблоня','tree',9,300,900,900,3,60,30],
 blueberry:['Голубика','bush',10,180,600,600,2,75,25],pear:['Груша','tree',10,340,1000,1000,3,68,32],
 blackberry:['Ежевика','bush',11,200,600,660,2,82,27],plum:['Слива','tree',11,380,1100,1050,3,74,34],
 honeysuckle:['Жимолость','bush',12,220,660,720,2,88,29],cherry:['Вишня','tree',12,420,1200,1100,3,80,36],
 seabuck:['Облепиха','bush',13,250,720,780,2,95,31],scherry:['Черешня','tree',13,470,1300,1200,3,88,38],
 cranberry:['Клюква','bush',14,280,780,840,2,105,33],lemon:['Лимон','tree',15,600,1500,1500,3,110,45],
 orange:['Апельсин','tree',16,650,1600,1600,3,118,48],pomegranate:['Гранат','tree',17,720,1700,1700,3,128,52],
 mango:['Манго','tree',18,800,1800,1800,3,140,56],avocado:['Авокадо','tree',20,900,2000,2000,3,155,62]};
const ANN_IDS=Object.keys(ANN),PER_IDS=Object.keys(PER);
// products: name, sell, img
const PROD={borsch:['Набор для борща',300,'r_borsch'],caviar:['Кабачковая икра',220,'r_caviar'],salad:['Весенний салат',230,'r_salad'],pickles:['Хрустящие соленья',300,'r_pickles'],lecho:['Дачное лечо',620,'r_lecho'],
 sjam:['Клубничное варенье',150,'r_sjam'],rjam:['Малиновое варенье',210,'r_rjam'],mors:['Смородиновый морс',220,'r_mors'],acomp:['Яблочный компот',240,'r_acomp'],pjam:['Грушевый джем',270,'r_pjam'],ccomp:['Вишнёвый компот',320,'r_ccomp'],
 milk:['Молоко',30,'milk'],wool:['Шерсть',45,'wool'],hay:['Сено',6,'hay'],feed:['Комбикорм',10,'feed'],
 scream:['Сметана',95,'scream'],cottage:['Творог',105,'cottage'],butter:['Сливочное масло',160,'butter'],cheese:['Сыр',240,'cheese'],
 yarn:['Пряжа',120,'yarn'],socks:['Вязаные носки',180,'socks'],mittens:['Варежки',270,'mittens'],sweater:['Шерстяной свитер',560,'sweater']};
const FAC={
 kitchen:{name:'Летняя кухня',lvl:4,img:'i_house',rec:{borsch:[4,{beet:1,cabbage:1,potato:1,carrot:1,onion:1},600,1],caviar:[5,{zucchini:1,carrot:1,onion:1},360,1],salad:[5,{radish:1,cucumber:1,dill:1},180,1],pickles:[6,{cucumber:1,dill:1,garlic:1},480,1],lecho:[7,{tomato:1,eggplant:1,garlic:1},900,1],
   feed:[7,{corn:1,beans:1},120,3],sjam:[7,{strawberry:3},360,1],rjam:[8,{raspberry:3},420,1],mors:[9,{bcurrant:3},360,1],acomp:[10,{apple:3},480,1],pjam:[11,{pear:3},540,1],ccomp:[13,{cherry:3},540,1]}},
 dairy:{name:'Сыроварня',lvl:8,img:'b_dairy',rec:{scream:[8,{milk:2},300,1],cottage:[8,{milk:2},360,1],butter:[9,{milk:3},480,1],cheese:[10,{milk:4},720,1]}},
 spinnery:{name:'Прядильня',lvl:10,img:'b_spinnery',rec:{yarn:[10,{wool:2},300,1],socks:[10,{yarn:1},360,1],mittens:[11,{yarn:2},480,1],sweater:[12,{yarn:4},900,1]}}};
const ANIM={cow:{name:'Корова',lvl:7,house:'cowshed',cost:250,max:3,time:300,prod:'milk',pos:[[2075,735],[2195,760],[2315,745]]},
 sheep:{name:'Овца',lvl:9,house:'sheeppen',cost:300,max:4,time:480,prod:'wool',pos:[[2345,820],[2445,850],[2525,800],[2420,770]]}};
// fixed buildings: x,y (bottom centre), width, level, cost
const FIX={market:{n:'Скупщик',x:2190,y:1060,w:270,lvl:1,cost:0},well:{n:'Старый колодец',x:330,y:1000,w:150,lvl:6,cost:400},
 dairy:{n:'Сыроварня',x:885,y:545,w:240,lvl:8,cost:700},spinnery:{n:'Прядильня',x:540,y:1090,w:230,lvl:10,cost:900},
 cowshed:{n:'Коровник',x:2190,y:650,w:260,lvl:7,cost:500},sheeppen:{n:'Овчарня',x:2440,y:735,w:250,lvl:9,cost:700}};
const ITEMS={fert:['Удобрение','i_fert'],catfood:['Кошачий корм','catfood'],p_aphid:['Средство от тли','p_aphid'],p_beetle:['От колорадского жука','p_beetle'],p_slug:['Гранулы от слизней','p_slug']};
ANN_IDS.forEach(id=>{ITEMS['seed_'+id]=['Семена: '+ANN[id][0].toLowerCase(),id+'_seed'];ITEMS[id]=[ANN[id][0],id+'_crop']});
PER_IDS.forEach(id=>{ITEMS[id]=[PER[id][0],id+'_crop']});
Object.keys(PROD).forEach(id=>{ITEMS[id]=[PROD[id][0],PROD[id][2]]});
const PERISH=new Set([...ANN_IDS,...PER_IDS,'milk']);
const iImg=id=>IMG[ITEMS[id]&&ITEMS[id][1]]||IMG.i_basket;
const iName=id=>ITEMS[id]?ITEMS[id][0]:id;
function baseSell(id){return ANN[id]?ANN[id][5]:PER[id]?PER[id][7]:PROD[id]?PROD[id][1]:5}
// grid
const CW=80,CH=56;
const ZONES=[{x0:960,y0:520,cols:6,rows:8,k:'bed'},{x0:900,y0:404,cols:11,rows:1,k:'per'},{x0:1440,y0:520,cols:5,rows:8,k:'gh'},{x0:720,y0:744,cols:3,rows:4,k:'bed'}];
const zoneOk=(kind,z)=>kind==='bush'||kind==='tree'?true:ZONES[z].k===(kind==='bed'?'bed':'gh');
const SIZE={bedh:[3,2],bedv:[2,3],bush:[1,1],tree:[2,1]};
const BED_COST=[0,40,90,160,250,380,550,750,1000,1300,1700,2200];
const GH_COST=[250,600,1200],GHL=[null,{n:'Плёночная',lvl:5,cost:0,mult:.75,img:'gh1'},{n:'Поликарбонатная',lvl:7,cost:500,mult:.6,img:'gh2'},{n:'Стеклянная',lvl:9,cost:1000,mult:.45,img:'gh3'}];
const PEST_LVL=5,THIEF_LVL=4,CAT_LVL=5,SCARE_H=12,BASE_KEY='dacha_v1_save';

/* ================= SCALE ================= */
const stage=$('stage');let SC=1,ROT=false,OX=0,OY=0,SW=1600,SH=893;let S=null;
function fit(){if(typeof typing2!=='undefined'&&typing2)return;const sw=innerWidth,sh=innerHeight;ROT=sh>sw;const lw=ROT?sh:sw,lh=ROT?sw:sh;
 SC=Math.min(lh/893,lw/1150);SW=lw/SC;SH=lh/SC;stage.style.width=SW+'px';stage.style.height=SH+'px';
 if(ROT){OX=sw;OY=0;stage.style.transform=`translate(${sw}px,0) rotate(90deg) scale(${SC})`}else{OX=0;OY=0;stage.style.transform=`scale(${SC})`}
 $('tbox').style.transform=`scale(${SW/1600},${SH/893})`;if(S){clampCam();applyCam()}}
addEventListener('resize',fit);addEventListener('orientationchange',()=>setTimeout(fit,250));if(window.visualViewport)visualViewport.addEventListener('resize',fit);
function toStage(cx,cy){const X=cx-OX,Y=cy-OY;return ROT?[Y/SC,-X/SC]:[X/SC,Y/SC]}
function fromStage(x,y){return ROT?[OX-y*SC,OY+x*SC]:[OX+x*SC,OY+y*SC]}

