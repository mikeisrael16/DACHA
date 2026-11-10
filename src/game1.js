(()=>{
'use strict';
const $=id=>document.getElementById(id);
const IMG=__IMGMAP__;
const VERSION='3.3';
let WW=4637,WH=1967;
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
 wheat:['Пшеница',3,150,1,8,22,10],oats:['Овёс',4,170,1,9,24,11],sunflower:['Подсолнечник',6,360,2,20,55,24],rye:['Рожь',8,330,2,22,58,25],buckwheat:['Гречиха',9,300,2,22,60,26],
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
// ===== Israel (v3.0): lvl 999 = set at runtime from S.ilBase + step =====
Object.assign(ANN,{il_tomato:['Черри-томаты',999,240,2,12,32,14],il_cucumber:['Огурчики',999,300,2,14,36,16],il_mint:['Мята нана',999,150,1,8,22,10],
 il_pepper:['Сладкий перец',999,420,2,22,58,24],il_eggplant:['Баклажаны',999,540,3,30,78,32],il_parsley:['Петрушка',999,200,1,10,28,12],
 il_chickpea:['Нут',999,480,2,26,66,28],il_coriander:['Кинза',999,200,1,10,28,12],il_spotato:['Батат',999,600,2,35,90,38],il_sage:['Шалфей',999,260,1,14,38,16],
 il_zaatar:['Заатар',999,300,1,16,44,18],il_okra:['Бамия',999,540,2,32,84,34],il_basil:['Базилик',999,240,1,12,34,14],il_melon:['Израильский арбуз',999,1200,3,90,240,90]});
Object.assign(PER,{il_olive:['Олива','tree',999,250,700,800,3,45,26],il_date:['Финиковая пальма','tree',999,320,900,900,3,58,30],il_pomeg:['Гранат','tree',999,380,1000,1000,3,66,33],
 il_fig:['Инжир','tree',999,400,1000,1000,3,70,34],il_orange:['Яффский апельсин','tree',999,450,1100,1100,3,78,37],il_avocado:['Авокадо','tree',999,550,1300,1300,3,95,42],
 il_mango:['Манго','tree',999,600,1400,1400,3,105,45],il_loquat:['Мушмула (шесек)','tree',999,650,1500,1500,3,112,48],
 il_grape:['Виноград','bush',999,260,600,700,2,70,24],il_sabra:['Сабра','bush',999,280,650,700,2,72,25],il_passion:['Маракуйя','bush',999,320,700,760,2,82,28],
 il_jasmine:['Жасмин','bush',999,300,600,660,2,60,22],il_lavender:['Лаванда','bush',999,300,600,660,2,60,22]});
const ANN_IDS=Object.keys(ANN),PER_IDS=Object.keys(PER);
// products: name, sell, img
const PROD={borsch:['Набор для борща',300,'r_borsch'],caviar:['Кабачковая икра',220,'r_caviar'],salad:['Весенний салат',230,'r_salad'],pickles:['Хрустящие соленья',300,'r_pickles'],lecho:['Дачное лечо',620,'r_lecho'],
 sjam:['Клубничное варенье',150,'r_sjam'],rjam:['Малиновое варенье',210,'r_rjam'],mors:['Смородиновый морс',220,'r_mors'],acomp:['Яблочный компот',240,'r_acomp'],pjam:['Грушевый джем',270,'r_pjam'],ccomp:['Вишнёвый компот',320,'r_ccomp'],
 milk:['Молоко',30,'milk'],wool:['Шерсть',45,'wool'],hay:['Сено',6,'hay'],feed:['Комбикорм',10,'feed'],
 scream:['Сметана',95,'scream'],cottage:['Творог',105,'cottage'],butter:['Сливочное масло',160,'butter'],cheese:['Сыр',240,'cheese'],
 yarn:['Пряжа',120,'yarn'],socks:['Вязаные носки',180,'socks'],mittens:['Варежки',270,'mittens'],sweater:['Шерстяной свитер',560,'sweater'],
 egg:['Куриные яйца',18,'egg'],egg_quail:['Перепелиные яйца',16,'egg_quail'],egg_duck:['Утиные яйца',30,'egg_duck'],egg_goose:['Гусиные яйца',50,'egg_goose'],egg_turkey:['Индюшачьи яйца',45,'egg_turkey'],feather:['Перья',12,'feather'],down:['Пух',35,'down'],grain:['Зерносмесь',8,'grain'],
 flour:['Пшеничная мука',65,'flour'],ryeflour:['Ржаная мука',150,'ryeflour'],oil:['Подсолнечное масло',210,'oil'],groats:['Гречневая крупа',155,'groats'],
 friedeggs:['Глазунья',60,'friedeggs'],eggbasket:['Корзинка яиц',160,'eggbasket'],mushsoup:['Грибной суп',190,'mushsoup'],
 blini:['Блины',230,'blini'],pirozhki:['Пирожки',260,'pirozhki'],syrniki:['Сырники',320,'syrniki'],vatrushka:['Ватрушка',450,'vatrushka'],
 bread:['Пшеничный хлеб',190,'bread'],ryebread:['Ржаной хлеб',380,'ryebread'],applepie:['Яблочный пирог',420,'applepie'],karavai:['Каравай',620,'karavai'],medovik:['Медовик',800,'medovik'],
 honey:['Мёд',130,'honey'],wax:['Воск',150,'wax'],candle:['Свечи',220,'candle'],pillow:['Подушка',280,'pillow'],perina:['Перина',520,'perina'],
 smoked_perch:['Копчёный окунь',160,'smoked_perch'],smoked_bream:['Копчёный лещ',210,'smoked_bream'],smoked_pike:['Копчёная щука',300,'smoked_pike'],smoked_catfish:['Копчёный сом',450,'smoked_catfish']};
Object.assign(PROD,{cmilk:['Верблюжье молоко',95,'milk'],oegg:['Страусиное яйцо',170,'egg_goose'],
 il_salad:['Израильский салат',0,'il_salad'],il_lemonade:['Лимонад с мятой',0,'il_lemonade'],il_shakshuka:['Шакшука',0,'il_shakshuka'],il_silan:['Финиковый сироп силан',0,'il_silan'],
 il_falafel:['Фалафель',0,'il_falafel'],il_oliveoil:['Оливковое масло',0,'il_oliveoil'],il_olivesjar:['Оливки в банке',0,'il_olivesjar'],il_hummus:['Хумус',0,'il_hummus'],
 il_pomjuice:['Гранатовый сок',0,'il_pomjuice'],il_figjam:['Инжирное варенье',0,'il_figjam'],il_zaatarmix:['Специя заатар',0,'il_zaatarmix'],il_labneh:['Лабане',0,'il_labneh'],
 il_goatcheese:['Козий сыр',0,'il_goatcheese'],il_pita:['Пита',0,'il_pita'],il_challah:['Хала',0,'il_challah'],il_jachnun:['Джахнун',0,'il_jachnun'],il_sabich:['Сабих',0,'il_sabich'],il_malabi:['Малаби',0,'il_malabi']});
// fish: name, level, sell, weight
const FISH={f_crucian:['Карась',5,25,40],f_roach:['Плотва',5,22,40],f_perch:['Окунь',6,35,30],f_bream:['Лещ',8,50,22],f_pike:['Щука',10,80,14],f_zander:['Судак',12,95,10],f_catfish:['Сом',14,150,6],f_gold:['Золотая рыбка',5,500,1]};
// forest: name, sell, weight
const FOREST={m_porcini:['Белый гриб',45,3],m_boletus:['Подберёзовик',35,4],m_chanterelle:['Лисички',30,5],m_suillus:['Маслята',25,5],w_strawberry:['Земляника',20,5],w_blueberry:['Черника',22,5],w_lingon:['Брусника',25,4],cones:['Шишки',6,4],brushwood:['Хворост',4,6],m_agaric:['Опята',32,4],m_fly:['Мухомор',0,3]};
Object.keys(FISH).forEach(k=>PROD[k]=[FISH[k][0],FISH[k][2],k]);Object.keys(FOREST).forEach(k=>{if(k!=='m_fly')PROD[k]=[FOREST[k][0],FOREST[k][1],k]});
IMG.m_fly='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 110"><ellipse cx="50" cy="104" rx="30" ry="5" fill="rgba(0,0,0,.25)"/><path d="M38 56q-4 30 2 46h20q6-16 2-46z" fill="#fbf6ea" stroke="#6b4a2a" stroke-width="3"/><path d="M36 72q14 6 28 0" fill="none" stroke="#6b4a2a" stroke-width="3"/><path d="M6 58Q10 8 50 8t44 50q-44 10-88 0z" fill="#e53935" stroke="#7f1d1d" stroke-width="3.5"/><g fill="#fff"><circle cx="30" cy="34" r="6"/><circle cx="52" cy="22" r="5"/><circle cx="70" cy="38" r="6"/><circle cx="44" cy="46" r="4"/><circle cx="20" cy="50" r="3.5"/><circle cx="80" cy="52" r="3.5"/></g></svg>');
const RAW=new Set(['cmilk','oegg','milk','wool','hay','feed','egg','egg_quail','egg_duck','egg_goose','egg_turkey','feather','down','grain',...Object.keys(FISH),...Object.keys(FOREST)]);
const FISH_LVL=19,FOREST_LVL=23,NEWL=19,WX_LVL=34,HOL_LVL=35;
const vis=l=>l<NEWL||level()>=l-1; // v2 content is hidden until one level before it opens
const FAC={
 kitchen:{name:'Летняя кухня',lvl:4,img:'i_house',rec:{borsch:[4,{beet:1,cabbage:1,potato:1,carrot:1,onion:1},600,1],caviar:[5,{zucchini:1,carrot:1,onion:1},360,1],salad:[5,{radish:1,cucumber:1,dill:1},180,1],pickles:[6,{cucumber:1,dill:1,garlic:1},480,1],lecho:[7,{tomato:1,eggplant:1,garlic:1},900,1],
   feed:[7,{corn:1,beans:1},120,3],il_salad:[999,{il_tomato:2,il_cucumber:2},180,1],il_lemonade:[999,{il_mint:3},120,1],il_shakshuka:[999,{il_tomato:2,il_pepper:1,egg:2},300,1],il_silan:[999,{il_date:3},360,1],il_falafel:[999,{il_chickpea:2,il_parsley:1,il_coriander:1},360,1],il_oliveoil:[999,{il_olive:3},420,1],il_olivesjar:[999,{il_olive:4},300,1],il_hummus:[999,{il_chickpea:2,il_oliveoil:1},300,1],il_pomjuice:[999,{il_pomeg:3},300,1],il_figjam:[999,{il_fig:3},420,1],il_zaatarmix:[999,{il_zaatar:2,il_oliveoil:1},300,1],il_pita:[999,{flour:1},240,2],il_challah:[999,{flour:2,egg:2},420,1],il_jachnun:[999,{flour:2,butter:1},480,1],il_sabich:[999,{il_eggplant:1,egg:1,il_pita:1},300,1],il_malabi:[999,{milk:1,il_pomjuice:1},300,1],friedeggs:[6,{egg:2},180,1],mushsoup:[5,{m_chanterelle:2,potato:1,onion:1},420,1],eggbasket:[8,{egg:3,egg_quail:3},120,1],sjam:[7,{strawberry:3},360,1],rjam:[8,{raspberry:3},420,1],mors:[9,{bcurrant:3},360,1],acomp:[10,{apple:3},480,1],pjam:[11,{pear:3},540,1],ccomp:[13,{cherry:3},540,1]}},
 dairy:{name:'Сыроварня',lvl:8,img:'b_dairy',rec:{il_labneh:[999,{milk:2,il_zaatarmix:1},420,1],il_goatcheese:[999,{milk:3},600,1],scream:[8,{milk:2},300,1],cottage:[8,{milk:2},360,1],butter:[9,{milk:3},480,1],cheese:[10,{milk:4},720,1]}},
 spinnery:{name:'Прядильня',lvl:10,img:'b_spinnery',rec:{yarn:[10,{wool:2},300,1],socks:[10,{yarn:1},360,1],mittens:[11,{yarn:2},480,1],sweater:[12,{yarn:4},900,1],pillow:[12,{down:3,feather:4},600,1],perina:[14,{down:6,feather:6},900,1]}},
 mill:{name:'Мельница',lvl:6,img:'b_mill',rec:{flour:[6,{wheat:2},240,1],grain:[6,{wheat:1,oats:1},120,3],oil:[7,{sunflower:3},480,1],ryeflour:[8,{rye:2},300,1],groats:[9,{buckwheat:2},360,1]}},
 oven:{name:'Русская печь',lvl:7,img:'b_oven',rec:{blini:[8,{flour:1,egg:2,milk:1},420,1],pirozhki:[9,{flour:1,egg:1,cabbage:1},480,1],syrniki:[10,{cottage:1,egg:1,flour:1},420,1],vatrushka:[11,{flour:1,cottage:1,sjam:1},540,1]}},
 apiary:{name:'Пасека',lvl:10,img:'b_apiary',rec:{honey:[10,{sunflower:1,buckwheat:1},600,2],wax:[11,{honey:1},300,1],candle:[12,{wax:1},360,1]}},
 bakery:{name:'Пекарня',lvl:12,img:'b_bakery',rec:{bread:[12,{flour:2},600,1],ryebread:[12,{ryeflour:2},660,1],applepie:[13,{flour:1,apple:3,egg:2},720,1],karavai:[14,{flour:3,egg:3,butter:1},900,1],medovik:[15,{flour:2,honey:2,egg:2,scream:1},1080,1]}},
 smokehouse:{name:'Коптильня',lvl:13,img:'b_smokehouse',rec:{smoked_perch:[13,{f_perch:2,brushwood:1},480,1],smoked_bream:[13,{f_bream:2,brushwood:1},540,1],smoked_pike:[14,{f_pike:2,brushwood:1},600,1],smoked_catfish:[15,{f_catfish:2,brushwood:2},720,1]}}};
const ANIM={cow:{name:'Корова',lvl:7,house:'cowshed',cost:250,max:3,time:300,prod:'milk',w:165,xp:6,feeds:['hay','feed'],img:['cow_hungry','cow_eat','cow_ready','cow_sleep'],pos:[[2760,650],[2930,710],[3080,655]]},
 sheep:{name:'Овца',lvl:9,house:'sheeppen',cost:300,max:4,time:480,prod:'wool',w:130,xp:9,feeds:['hay','feed'],img:['sheep_hungry','sheep_eat','sheep_wool','sheep_shorn'],pos:[[3220,600],[3360,640],[3160,700],[3300,705]]},
 chicken:{name:'Курица',lvl:6,house:'coop',cost:80,max:4,time:240,prod:'egg',bonus:['feather',.25],w:100,xp:4,feeds:['grain','feed'],pos:[[1590,610],[1690,640],[1790,610],[1870,650]]},
 quail:{name:'Перепёлка',lvl:8,house:'coop',cost:90,max:3,time:200,prod:'egg_quail',w:80,xp:4,feeds:['grain','feed'],pos:[[1620,690],[1720,695],[1820,690]]},
 duck:{name:'Утка',lvl:11,house:'pyard',cost:150,max:3,time:360,prod:'egg_duck',bonus:['feather',.3],w:100,xp:6,feeds:['grain','feed'],pos:[[1950,610],[2050,640],[2150,610]]},
 goose:{name:'Гусь',lvl:12,house:'pyard',cost:220,max:2,time:480,prod:'egg_goose',bonus:['down',.6],w:115,xp:8,feeds:['grain','feed'],pos:[[1980,695],[2100,695]]},
 goat:{name:'Коза',loc:'il',lvl:999,house:null,cost:180,max:3,time:300,prod:'milk',w:135,xp:6,feeds:['hay','feed'],pos:[]},
 awassi:{name:'Овца авасси',loc:'il',lvl:999,house:null,cost:260,max:3,time:420,prod:'wool',w:140,xp:8,feeds:['hay','feed'],pos:[]},
 donkey:{name:'Ослик',loc:'il',lvl:999,house:null,cost:300,max:1,time:600,prod:'fert',w:160,xp:8,feeds:['hay','feed'],pos:[]},
 camel:{name:'Верблюд',loc:'il',lvl:999,house:null,cost:700,max:1,time:720,prod:'cmilk',w:210,xp:12,feeds:['hay','feed'],pos:[]},
 ostrich:{name:'Страус',loc:'il',lvl:999,house:null,cost:800,max:2,time:900,prod:'oegg',w:150,xp:14,feeds:['grain','feed'],pos:[]},
 bees:{name:'Пчелиный улей',loc:'il',lvl:999,house:null,cost:500,max:3,time:600,prod:'honey',w:120,xp:10,feeds:['il_lavender','il_jasmine'],pos:[]},
 turkey:{name:'Индюк',lvl:14,house:'pyard',cost:260,max:2,time:540,prod:'egg_turkey',bonus:['feather',.6],w:120,xp:9,feeds:['grain','feed'],pos:[[2210,690],[1900,700]]}};
['goat','awassi','donkey','camel','ostrich','bees','chicken','quail','duck','goose','turkey'].forEach(k=>ANIM[k].img=[k+'_hungry',k+'_eat',k+'_ready',k+'_sleep']);
const ANI_IDS=Object.keys(ANIM);
// fixed buildings: x,y (bottom centre), width, level, cost
const FIX={market:{n:'Скупщик',x:3240,y:985,w:170,h:230,lvl:1,cost:0,hid:1},well:{n:'Старый колодец',x:480,y:1010,w:170,lvl:6,cost:400},
 coop:{n:'Курятник',x:1700,y:530,w:220,lvl:6,cost:300},pyard:{n:'Птичий двор',x:2040,y:530,w:240,lvl:11,cost:900},
 dairy:{n:'Сыроварня',x:400,y:1800,w:250,lvl:8,cost:700},spinnery:{n:'Прядильня',x:660,y:1800,w:240,lvl:10,cost:900},mill:{n:'Мельница',x:920,y:1800,w:250,lvl:6,cost:500},
 oven:{n:'Русская печь',x:1180,y:1800,w:250,lvl:7,cost:600},bakery:{n:'Пекарня',x:1440,y:1800,w:250,lvl:12,cost:1500},smokehouse:{n:'Коптильня',x:1700,y:1800,w:240,lvl:13,cost:1600},apiary:{n:'Пасека',x:1970,y:1800,w:260,lvl:10,cost:900},
 cowshed:{n:'Коровник',x:2570,y:680,w:270,lvl:7,cost:500},sheeppen:{n:'Овчарня',x:3470,y:640,w:260,lvl:9,cost:700},fair:{n:'Ярмарка',x:4450,y:1930,w:330,lvl:12,cost:1200}};
// v2.1: everything new from v2.0 opens from level 19, one novelty per level
(()=>{const A=(o,v)=>o[0]=v;
 ['wheat','oats'].forEach(k=>ANN[k][1]=21);['sunflower','rye','buckwheat'].forEach(k=>ANN[k][1]=26);
 Object.entries({f_crucian:19,f_roach:19,f_perch:19,f_gold:19,f_bream:21,f_pike:23,f_zander:25,f_catfish:27}).forEach(([k,v])=>FISH[k][1]=v);
 const R={kitchen:{friedeggs:20,mushsoup:23,eggbasket:25},spinnery:{pillow:31,perina:32},mill:{flour:22,grain:22,oil:26,ryeflour:26,groats:26},oven:{blini:24,pirozhki:25,syrniki:26,vatrushka:27},
  apiary:{honey:27,wax:28,candle:29},bakery:{bread:30,ryebread:30,applepie:31,karavai:32,medovik:33},smokehouse:{smoked_perch:32,smoked_bream:32,smoked_pike:33,smoked_catfish:34}};
 for(const f in R)for(const id in R[f])A(FAC[f].rec[id],R[f][id]);
 Object.assign(FAC.mill,{lvl:22});Object.assign(FAC.oven,{lvl:24});Object.assign(FAC.apiary,{lvl:27});Object.assign(FAC.bakery,{lvl:30});Object.assign(FAC.smokehouse,{lvl:32});
 Object.entries({chicken:20,quail:25,duck:28,goose:31,turkey:33}).forEach(([k,v])=>ANIM[k].lvl=v);
 Object.entries({coop:20,mill:22,oven:24,apiary:27,pyard:28,fair:29,bakery:30,smokehouse:32}).forEach(([k,v])=>FIX[k].lvl=v)})();
const FIXDESC={well:'Вода без ограничений',dairy:'Сметана, творог, масло, сыр',spinnery:'Пряжа, носки, варежки, свитер, подушки',cowshed:'До 3 коров',sheeppen:'До 4 овец',coop:'Куры и перепёлки',pyard:'Утки, гуси, индюки',mill:'Мука, масло, крупа, зерносмесь',oven:'Блины, пирожки, сырники',bakery:'Хлеб, пироги, каравай, медовик',apiary:'Мёд, воск, свечи',smokehouse:'Копчёная рыба',fair:'Покупает дороже скупщика'};
const ITEMS={worms:['Черви','worms'],fert:['Удобрение','i_fert'],catfood:['Кошачий корм','catfood'],p_aphid:['Средство от тли','p_aphid'],p_beetle:['От колорадского жука','p_beetle'],p_slug:['Гранулы от слизней','p_slug']};
ANN_IDS.forEach(id=>{ITEMS['seed_'+id]=['Семена: '+ANN[id][0].toLowerCase(),id+'_seed'];ITEMS[id]=[ANN[id][0],id+'_crop']});
PER_IDS.forEach(id=>{ITEMS[id]=[PER[id][0],id+'_crop']});
Object.keys(PROD).forEach(id=>{ITEMS[id]=[PROD[id][0],PROD[id][2]]});
const PERISH=new Set([...ANN_IDS,...PER_IDS,'milk','cmilk','oegg','egg','egg_quail','egg_duck','egg_goose','egg_turkey',...Object.keys(FISH),...Object.keys(FOREST)]);
const iImg=id=>IMG[ITEMS[id]&&ITEMS[id][1]]||IMG.i_basket;
const iName=id=>ITEMS[id]?ITEMS[id][0]:id;
function baseSell(id){return ANN[id]?ANN[id][5]:PER[id]?PER[id][7]:PROD[id]?PROD[id][1]:5}
const aniCount=k=>(S.ani[k]||[]).length,hasAni=()=>ANI_IDS.some(k=>aniCount(k));
// grid
const CW=80,CH=56;
const ZONES=[{x0:1080,y0:720,cols:10,rows:8,k:'bed'},{x0:200,y0:1050,cols:6,rows:3,k:'per'},{x0:1920,y0:760,cols:5,rows:9,k:'gh'},{x0:1360,y0:1168,cols:7,rows:3,k:'bed'},{x0:1960,y0:1284,cols:5,rows:3,k:'per'},{x0:1080,y0:1176,cols:3,rows:3,k:'per'},{x0:200,y0:1218,cols:9,rows:6,k:'per'}];
const zoneOk=(kind,z)=>kind==='bush'||kind==='tree'?true:ZONES[z].k===(kind==='bed'?'bed':'gh');
const SIZE={bedh:[3,2],bedv:[2,3],bush:[2,2],tree:[3,3]};
const BED_COST=[0,40,90,160,250,380,550,750,1000,1300,1700,2200,2600,3000,3400,3800,4200,4500,4800,5100,5400,5700,6000,6300,6600,6900,7200,7500,7800,8100];
const GH_COST=[250,600,1200,2000,3000,3800,4600,5400,6200,7000],GHL=[null,{n:'Плёночная',lvl:5,cost:0,mult:.75,img:'gh1'},{n:'Поликарбонатная',lvl:7,cost:500,mult:.6,img:'gh2'},{n:'Стеклянная',lvl:9,cost:1000,mult:.45,img:'gh3'}];
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

