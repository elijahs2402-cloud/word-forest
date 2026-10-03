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
export const bosses=['잠꾸러기 곰','장난꾸러기 여우','꾸벅꾸벅 부엉이','느긋한 너구리','동글 고슴도치','둥둥 수달','숲속 사슴','폴짝 토끼','꼬마 거북','다정한 오소리'];
export const hiddenAnimals=['무당벌레','달팽이','개구리','참새','나비','두더지','반딧불','청설모','박쥐','도롱뇽'];
export const decorations=['버섯','꽃밭','나무 벤치','새집','랜턴','돌멩이','덤불','그루터기','연못','울타리','그네','표지판'];
export const praise=['맞았어! 멋진 한 걸음이야.','좋아, 기억하고 있네!','정답! 숲이 조금 더 자랐어.','바로 그거야!','차근차근 잘하고 있어.','아주 잘 찾았어!','멋져! 다음 것도 해 볼까?','정답! 도토리 하나 받았어.'];
