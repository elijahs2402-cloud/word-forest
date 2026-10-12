import data from './data/verbs.json';
export const {words,families}=data;
export type Word=typeof words[number];
export type Progress={box:number;due:string;wrong:number;seen:number;lastWrong?:string};
export type Game='choice'|'ox'|'match'|'blank'|'tiles'|'listen'|'reverse';
export const gameNames:Record<Game,string>={choice:'둘 중 골라요',ox:'O/X 도토리',match:'짝꿍 찾기',blank:'빈칸 채우기',tiles:'뒤죽박죽 타일',listen:'듣고 골라요',reverse:'거꾸로 숲길'};
export const allGames=(Object.keys(gameNames) as Game[]).filter(game=>game!=='match');
export function validate(){if(words.length!==68||new Set(words.map(w=>w.present)).size!==68||words.some(w=>w.family<1||w.family>10))throw Error('학습 데이터가 올바르지 않습니다.');}
validate();
export const normalize=(s:string)=>s.trim().toLowerCase().replace(/\s+/g,' ');
export const answers=(w:Word)=>w.past.split('/').map(normalize);
export const correct=(w:Word,a:string,reverse=false)=>reverse?normalize(a)===w.present:answers(w).includes(normalize(a))||normalize(a)===normalize(w.past);
export const dayKey=(date=new Date())=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
export function addDays(key:string,n:number){const d=new Date(key+'T12:00:00');d.setDate(d.getDate()+n);return dayKey(d);}
export function advance(p:Progress|undefined,ok:boolean,today=dayKey()):Progress{const box=ok?Math.min(5,(p?.box??0)+1):1;return {box,due:addDays(today,(!ok||p?.lastWrong===today)?1:[1,2,4,7,14][box-1]),lastWrong:ok?p?.lastWrong:today,wrong:(p?.wrong??0)+(ok?0:1),seen:(p?.seen??0)+1};}
export const stars=(right:number,total:number)=>!total?0:right/total>=1?3:right/total>=.8?2:right/total>=.6?1:0;
export const comboNext=(n:number,ok:boolean)=>ok?n+1:0;
export const shuffle=<T,>(list:T[])=>{const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
export function distractors(w:Word,n=2,reverse=false){const valid=reverse?[w.present]:[...answers(w),normalize(w.past)];const pool=reverse?words.filter(x=>x.no!==w.no).map(x=>x.present):[w.present+'ed',w.present+'d',...words.filter(x=>x.family===w.family&&x.no!==w.no).map(x=>answers(x)[0]),...words.map(x=>answers(x)[0])];return shuffle([...new Set(pool)].filter(x=>!valid.includes(normalize(x)))).slice(0,n);}
export const dueWords=(p:Record<number,Progress>,today=dayKey())=>words.filter(w=>p[w.no]&&p[w.no].due<=today).sort((a,b)=>(p[b.no].lastWrong??'').localeCompare(p[a.no].lastWrong??'')||(p[b.no].wrong-p[a.no].wrong)||p[a.no].due.localeCompare(p[b.no].due));
export function streak(dates:string[],today=dayKey()){const days=new Set(dates);let d=days.has(today)?today:addDays(today,-1),n=0;while(days.has(d)){n++;d=addDays(d,-1);}return n;}
export function weekStart(today=dayKey()){const date=new Date(today+'T12:00:00');return addDays(today,-((date.getDay()+6)%7));}
export const questTargets=(date=dayKey())=>{const d=new Date(date+'T12:00:00').getDate();return [{type:'answers',label:`정답 ${5+d%4}개 맞히기`,target:5+d%4},{type:'combo',label:`${3+d%3}콤보 달성하기`,target:3+d%3},{type:'rounds',label:`미니게임 ${1+d%2}판 끝내기`,target:1+d%2}];};
export const questsDone=(stats:Record<string,number>,date=dayKey())=>questTargets(date).every(q=>(stats[q.type]??0)>=q.target);
// 콘텐츠 목록 — 새 숲 친구·숨은 친구·소품은 맨 아래에 한 줄씩 추가한다.
// slug는 그림 파일 이름(public/assets/boss|animal|deco/<slug>-transparent.webp), 순서가 곧 저장 번호라 중간에 끼워 넣거나 지우지 않는다.
// 숲 친구는 숲(단어 가족)과 1:1이라, 단어 가족 수보다 많은 친구는 그림만 준비된 상태로 도감에 나오지 않는다.
// 깨어난 숲 친구 그림: public/art/higgsfield-boss/awake-<번호 두 자리>.webp
export const forestFriends:{slug:string;name:string}[]=[
 {slug:'bear',name:'잠꾸러기 곰'},
 {slug:'fox',name:'장난꾸러기 여우'},
 {slug:'owl',name:'꾸벅꾸벅 부엉이'},
 {slug:'raccoon',name:'느긋한 너구리'},
 {slug:'hedgehog',name:'동글 고슴도치'},
 {slug:'otter',name:'둥둥 수달'},
 {slug:'deer',name:'숲속 사슴'},
 {slug:'rabbit',name:'폴짝 토끼'},
 {slug:'turtle',name:'꼬마 거북'},
 {slug:'badger',name:'다정한 오소리'},
 {slug:'chipmunk',name:'도토리 다람쥐'},
 {slug:'beaver',name:'부지런 비버'},
 {slug:'wolf',name:'달빛 늑대'},
 {slug:'boar',name:'튼튼 멧돼지'},
 {slug:'skunk',name:'향기 스컹크'},
 {slug:'red-panda',name:'빨간 레서판다'},
 {slug:'koala',name:'포근 코알라'},
 {slug:'sloth',name:'느릿느릿 나무늘보'},
 {slug:'mouse',name:'콩알 생쥐'},
 {slug:'duck',name:'뒤뚱 오리'},
 {slug:'swan',name:'우아한 백조'},
 {slug:'woodpecker',name:'똑똑 딱따구리'},
 {slug:'water-deer',name:'수줍은 고라니'},
 {slug:'mountain-goat',name:'바위 산양'},
 {slug:'moose',name:'큰뿔 무스'},
 {slug:'marten',name:'재빠른 담비'},
 {slug:'flying-squirrel',name:'날쌘 하늘다람쥐'},
 {slug:'weasel',name:'살금 족제비'},
 {slug:'alpaca',name:'곱슬 알파카'},
 {slug:'platypus',name:'신기한 오리너구리'}
];
export const hiddenFriends:{slug:string;name:string}[]=[
 {slug:'ladybug',name:'무당벌레'},
 {slug:'snail',name:'달팽이'},
 {slug:'frog',name:'개구리'},
 {slug:'sparrow',name:'참새'},
 {slug:'butterfly',name:'나비'},
 {slug:'mole',name:'두더지'},
 {slug:'firefly',name:'반딧불'},
 {slug:'squirrel',name:'청설모'},
 {slug:'bat',name:'박쥐'},
 {slug:'lizard',name:'도롱뇽'},
 {slug:'bee',name:'꿀벌'},
 {slug:'dragonfly',name:'잠자리'},
 {slug:'ant',name:'개미'},
 {slug:'caterpillar',name:'애벌레'},
 {slug:'grasshopper',name:'메뚜기'},
 {slug:'stag-beetle',name:'사슴벌레'},
 {slug:'rhino-beetle',name:'장수풍뎅이'},
 {slug:'tadpole',name:'올챙이'},
 {slug:'crayfish',name:'가재'},
 {slug:'tit',name:'박새'},
 {slug:'wren',name:'굴뚝새'},
 {slug:'hummingbird',name:'벌새'},
 {slug:'pillbug',name:'쥐며느리'},
 {slug:'earthworm',name:'지렁이'},
 {slug:'moth',name:'나방'},
 {slug:'cicada',name:'매미'},
 {slug:'water-strider',name:'소금쟁이'},
 {slug:'kingfisher',name:'물총새'},
 {slug:'robin',name:'울새'},
 {slug:'cricket',name:'귀뚜라미'}
];
export const decoItems:{slug:string;name:string}[]=[
 {slug:'mushroom',name:'버섯'},
 {slug:'flower-bed',name:'꽃밭'},
 {slug:'wooden-bench',name:'나무 벤치'},
 {slug:'birdhouse',name:'새집'},
 {slug:'lantern',name:'랜턴'},
 {slug:'stones',name:'돌멩이'},
 {slug:'bush',name:'덤불'},
 {slug:'tree-stump',name:'그루터기'},
 {slug:'pond',name:'연못'},
 {slug:'wooden-fence',name:'울타리'},
 {slug:'swing',name:'그네'},
 {slug:'signpost',name:'표지판'},
 {slug:'tent',name:'텐트'},
 {slug:'campfire',name:'모닥불'},
 {slug:'mailbox',name:'우체통'},
 {slug:'hammock',name:'해먹'},
 {slug:'wooden-bridge',name:'나무 다리'},
 {slug:'well',name:'우물'},
 {slug:'windmill',name:'풍차'},
 {slug:'cabin',name:'오두막'},
 {slug:'beehive',name:'벌집'},
 {slug:'scarecrow',name:'허수아비'},
 {slug:'flower-pot',name:'꽃 화분'},
 {slug:'sunflower',name:'해바라기'},
 {slug:'pumpkin',name:'호박'},
 {slug:'wheelbarrow',name:'수레'},
 {slug:'picnic-basket',name:'소풍 바구니'},
 {slug:'seesaw',name:'시소'},
 {slug:'slide',name:'미끄럼틀'},
 {slug:'fountain',name:'분수'},
 {slug:'balloons',name:'풍선'},
 {slug:'bunting',name:'깃발 줄'},
 {slug:'log',name:'통나무'},
 {slug:'stepping-stones',name:'징검돌'},
 {slug:'flower-arch',name:'꽃 아치'},
 {slug:'snowman',name:'눈사람'}
];
export const bosses=forestFriends.map(f=>f.name);
export const hiddenAnimals=hiddenFriends.map(f=>f.name);
export const decorations=decoItems.map(f=>f.name);
// 같은 소품을 여러 개 가질 수 있도록 소품 하나하나의 번호 = 종류 + 100 × 몇 번째.
// 첫 번째는 종류 번호와 같아서 예전에 저장된 소품·배치가 그대로 이어진다.
export const decoType=(uid:number)=>uid%100;
export const nextDecoUid=(owned:number[],type:number)=>{let k=0;while(owned.includes(type+100*k))k++;return type+100*k};
export const praise=['맞았어! 멋진 한 걸음이야.','좋아, 기억하고 있네!','정답! 숲이 조금 더 자랐어.','바로 그거야!','차근차근 잘하고 있어.','아주 잘 찾았어!','멋져! 다음 것도 해 볼까?','정답! 도토리 하나 받았어.'];
