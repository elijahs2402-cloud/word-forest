export type OutfitPosition={x:number;y:number;scale:number};
export type OutfitSlot='head'|'face'|'side'|'neck'|'back'|'body'|'character';
// 몽쉘 옷 목록 — 새 옷은 맨 아래에 추가한다(순서가 숲에 벗어 둔 옷의 저장 번호라 중간에 끼우지 않는다).
// x·y는 몽쉘 그림 상자 기준 %(머리 위 옷은 x가 가운데), w는 기본 너비 %. back은 몽쉘 뒤에 그린다(망토).
export const outfitItems:{id:string;name:string;slot:OutfitSlot;x:number;y:number;w:number}[]=[
 {id:'crown',name:'왕관',slot:'head',x:39,y:-13,w:48},
 {id:'hat',name:'모자',slot:'head',x:39,y:-13,w:48},
 {id:'glasses',name:'안경',slot:'face',x:23,y:3,w:54},
 {id:'bow',name:'리본',slot:'side',x:68,y:5,w:35},
 {id:'scarf',name:'목도리',slot:'neck',x:18,y:50,w:58},
 {id:'straw-hat',name:'밀짚모자',slot:'head',x:52,y:-5.4,w:44},
 {id:'beanie',name:'털모자',slot:'head',x:52,y:-23.7,w:44},
 {id:'flower-crown',name:'꽃 화관',slot:'head',x:52,y:-9.2,w:46},
 {id:'wizard-hat',name:'마법사 모자',slot:'head',x:52,y:-21.2,w:46},
 {id:'party-hat',name:'고깔모자',slot:'head',x:52,y:-33,w:44},
 {id:'chef-hat',name:'요리사 모자',slot:'head',x:52,y:-7.8,w:40},
 {id:'pirate-hat',name:'해적 모자',slot:'head',x:52,y:-2.3,w:44},
 {id:'bunny-ears',name:'토끼 귀 머리띠',slot:'head',x:52,y:-27.9,w:40},
 {id:'acorn-cap',name:'도토리 모자',slot:'head',x:52,y:-13.8,w:44},
 {id:'santa-hat',name:'산타 모자',slot:'head',x:52,y:-10.4,w:44},
 {id:'heart-glasses',name:'하트 선글라스',slot:'face',x:29,y:18.9,w:44},
 {id:'star-glasses',name:'별 안경',slot:'face',x:29,y:17.1,w:44},
 {id:'goggles',name:'물안경',slot:'face',x:26,y:18.4,w:50},
 {id:'flower-glasses',name:'꽃 안경',slot:'face',x:29,y:18.3,w:44},
 {id:'daisy-pin',name:'데이지 핀',slot:'side',x:56,y:3.9,w:20},
 {id:'butterfly-pin',name:'나비 핀',slot:'side',x:56,y:6.2,w:20},
 {id:'strawberry-pin',name:'딸기 핀',slot:'side',x:56,y:5.6,w:20},
 {id:'leaf-pin',name:'나뭇잎 핀',slot:'side',x:56,y:9.2,w:20},
 {id:'bow-tie',name:'나비넥타이',slot:'neck',x:38,y:46,w:26},
 {id:'lei',name:'꽃 목걸이',slot:'neck',x:34,y:46,w:34},
 {id:'bell-collar',name:'방울 목걸이',slot:'neck',x:32,y:46,w:38},
 {id:'medal',name:'금메달',slot:'neck',x:40,y:44,w:22},
 {id:'bib',name:'턱받이',slot:'neck',x:35,y:46,w:32},
 {id:'cape',name:'망토',slot:'back',x:11,y:40,w:80},
 {id:'cat-ears',name:'고양이 귀 머리띠',slot:'head',x:52,y:-16.1,w:44},
 {id:'sun-hat',name:'챙 넓은 모자',slot:'head',x:52,y:-9.7,w:52},
 {id:'frog-hat',name:'개구리 모자',slot:'head',x:52,y:-8,w:44},
 {id:'leaf-crown',name:'나뭇잎 왕관',slot:'head',x:52,y:-1,w:44},
 {id:'mushroom-hat',name:'버섯 모자',slot:'head',x:52,y:-4,w:44},
 {id:'graduation-cap',name:'학사모',slot:'head',x:52,y:-5.1,w:44},
 {id:'earmuffs',name:'귀마개',slot:'head',x:52,y:-6.9,w:52},
 {id:'halo',name:'천사 고리',slot:'head',x:52,y:-26.5,w:34},
 {id:'round-glasses',name:'동그란 안경',slot:'face',x:29,y:17.9,w:44},
 {id:'mask',name:'가면',slot:'face',x:28,y:14.4,w:46},
 {id:'mustache',name:'콧수염',slot:'face',x:38,y:36.1,w:26},
 {id:'blush',name:'볼터치',slot:'face',x:31,y:26.8,w:40},
 {id:'rainbow-glasses',name:'무지개 안경',slot:'face',x:29,y:17.8,w:44},
 {id:'monocle',name:'외알 안경',slot:'face',x:42,y:18.8,w:18},
 {id:'heart-pin',name:'하트 핀',slot:'side',x:56,y:5.8,w:20},
 {id:'star-pin',name:'별 핀',slot:'side',x:56,y:4.6,w:20},
 {id:'cherry-pin',name:'체리 핀',slot:'side',x:56,y:4.7,w:20},
 {id:'feather-pin',name:'깃털 핀',slot:'side',x:58,y:6,w:16},
 {id:'rose-pin',name:'장미 핀',slot:'side',x:56,y:6.7,w:20},
 {id:'clover-pin',name:'네잎클로버 핀',slot:'side',x:56,y:3.1,w:20},
 {id:'ribbon-pink',name:'분홍 큰 리본',slot:'side',x:52,y:2.2,w:28},
 {id:'moon-pin',name:'달 핀',slot:'side',x:56,y:5.4,w:20},
 {id:'pearl-necklace',name:'진주 목걸이',slot:'neck',x:35,y:46,w:32},
 {id:'tie',name:'넥타이',slot:'neck',x:42,y:46,w:18},
 {id:'bandana',name:'반다나',slot:'neck',x:34,y:46,w:34},
 {id:'acorn-necklace',name:'도토리 목걸이',slot:'neck',x:38,y:46,w:26},
 {id:'sailor-collar',name:'세일러 칼라',slot:'neck',x:30,y:46,w:42},
 {id:'daisy-chain',name:'데이지 꽃줄',slot:'neck',x:34,y:46,w:34},
 {id:'star-medal',name:'별 메달',slot:'neck',x:40,y:46,w:22},
 {id:'heart-locket',name:'하트 목걸이',slot:'neck',x:39,y:46,w:24},
 {id:'knit-scarf',name:'줄무늬 목도리',slot:'neck',x:29,y:46,w:44},
 {id:'fairy-wings',name:'요정 날개',slot:'back',x:15,y:20,w:70}
, {id:'today-crown',name:'새 왕관',slot:'head',x:50,y:-8,w:48},
 {id:'today-beret',name:'숲 베레모',slot:'head',x:50,y:-5,w:55},
 {id:'today-flower-band',name:'꽃 머리띠',slot:'head',x:50,y:0,w:58},
 {id:'today-round-glasses',name:'펠트 동그란 안경',slot:'face',x:24,y:15,w:52},
 {id:'today-bow',name:'빨간 리본',slot:'side',x:65,y:4,w:28},
 {id:'today-scarf',name:'크림 목도리',slot:'neck',x:22,y:44,w:56},
 {id:'today-leaf-cape',name:'나뭇잎 망토',slot:'back',x:7,y:40,w:86},
 {id:'today-bag',name:'작은 가방',slot:'neck',x:35,y:42,w:43},
 {id:'today-acorn-necklace',name:'새 도토리 목걸이',slot:'neck',x:32,y:43,w:36},
 {id:'today-strawberry-clip',name:'딸기 머리핀',slot:'side',x:66,y:5,w:22},
 {id:'today-overalls',name:'숲 멜빵바지',slot:'body',x:9,y:43,w:82},
 {id:'today-knit-vest',name:'니트 조끼',slot:'body',x:8,y:43,w:84},
 {id:'today-raincoat',name:'노란 우비',slot:'body',x:3,y:-2,w:94},
 {id:'today-pajamas',name:'별무늬 잠옷',slot:'body',x:5,y:42,w:90},
 {id:'today-explorer-jacket',name:'탐험가 재킷',slot:'body',x:5,y:42,w:90},
 {id:'hood-strawberry',name:'딸기 후드',slot:'character',x:0,y:0,w:100},
 {id:'hood-blueberry',name:'블루베리 후드',slot:'character',x:0,y:0,w:100},
 {id:'hood-lemon',name:'레몬 후드',slot:'character',x:0,y:0,w:100},
 {id:'hood-pear',name:'배 후드',slot:'character',x:0,y:0,w:100},
 {id:'hood-grape',name:'포도 후드',slot:'character',x:0,y:0,w:100},
 {id:'hood-peach',name:'복숭아 후드',slot:'character',x:0,y:0,w:100},
 {id:'hood-pose-1',name:'딸기 후드 · 인사',slot:'character',x:0,y:0,w:100},
 {id:'hood-pose-2',name:'딸기 후드 · 궁금',slot:'character',x:0,y:0,w:100},
 {id:'hood-pose-3',name:'딸기 후드 · 기쁨',slot:'character',x:0,y:0,w:100},
 {id:'hood-pose-4',name:'딸기 후드 · 꾸벅',slot:'character',x:0,y:0,w:100},
 {id:'hood-pose-5',name:'딸기 후드 · 쉬기',slot:'character',x:0,y:0,w:100},
 {id:'hood-pose-6',name:'딸기 후드 · 옆모습',slot:'character',x:0,y:0,w:100}
];
// 옷장 탭: 부위 묶음
export const outfitTabs:{label:string;slots:OutfitSlot[]}[]=[{label:'머리',slots:['head']},{label:'얼굴',slots:['face']},{label:'머리핀',slots:['side']},{label:'목·몸',slots:['neck','back']},{label:'옷',slots:['body','character']}];
// Fixed front-view plush: preserve asset dimensions and saved overrides.
// Corrections apply only when no user-adjusted position exists.
export const fittedOutfitPositions:Record<string,OutfitPosition>={
 crown:{x:50,y:-19,scale:1.25},
 hat:{x:50,y:-29,scale:1.4},
 glasses:{x:23,y:3,scale:1},
 bow:{x:65,y:0,scale:.8},
 scarf:{x:18,y:40,scale:1.1},
 'today-crown':{x:50,y:-16,scale:1.1},
 'today-beret':{x:50,y:-13,scale:1.15},
 'today-flower-band':{x:50,y:-7,scale:1},
 'today-round-glasses':{x:24,y:10,scale:1},
 'today-bow':{x:65,y:0,scale:.9},
 'today-scarf':{x:22,y:38,scale:1},
 'today-acorn-necklace':{x:32,y:39,scale:1},
 'today-strawberry-clip':{x:66,y:2,scale:1}
};
export const outfitDefaults:Record<string,OutfitPosition>=Object.fromEntries(outfitItems.map(o=>[o.id,fittedOutfitPositions[o.id]??{x:o.slot==='head'?50:o.x,y:o.y,scale:1}]));
// 몽쉘 옷 이름 목록 — 저장 기록 검사에도 쓴다
export const outfitIds=outfitItems.map(o=>o.id);
// 처음 5종은 png, 새 옷은 webp 그림
const pngOutfits=new Set(['crown','hat','glasses','bow','scarf']);
export const outfitFile=(id:string)=>id.startsWith('hood-')?`art/mongshell-v3/${id}.png`:`outfit/${id}-fitted.${pngOutfits.has(id)||id.startsWith('today-')?'png':'webp'}`;
export const outfitThumbnailFile=(id:string)=>id.startsWith('hood-')&&!id.startsWith('hood-pose-')?`outfit/${id}-only-v1.png`:outfitFile(id);
export function outfitStyle(item:string,layout:Record<string,OutfitPosition>){const o=outfitItems.find(i=>i.id===item);const p=layout[item]??outfitDefaults[item];return {left:p.x+'%',top:p.y+'%',right:'auto',width:(o?.w??48)*p.scale+'%',transform:o?.slot==='head'?'translateX(-50%)':'none',zIndex:o?.slot==='back'?-1:undefined};}

export const wornOutfitFiles:Record<string,string>={
 'today-overalls':'art/mongshell-v3/Gemini-hood-overalls-cutout-v2.png',
 'today-knit-vest':'art/mongshell-v3/Gemini-hood-knit-vest-cutout-v2.png',
 'today-raincoat':'art/mongshell-v3/Gemini-hood-raincoat-cutout-v2.png',
 'today-pajamas':'art/mongshell-v3/Gemini-hood-pajamas-cutout-v2.png',
 'today-explorer-jacket':'art/mongshell-v3/Gemini-hood-explorer-jacket-cutout-v2.png',
 'hood-strawberry':'art/mongshell-v3/Gemini-hood-strawberry-cutout-v2.png',
 'hood-blueberry':'art/mongshell-v3/Gemini-hood-blueberry-cutout-v2.png',
 'hood-lemon':'art/mongshell-v3/Gemini-hood-lemon-cutout-v2.png',
 'hood-pear':'art/mongshell-v3/Gemini-hood-pear-cutout-v2.png',
 'hood-grape':'art/mongshell-v3/Gemini-hood-grape-cutout-v2.png',
 'hood-peach':'art/mongshell-v3/Gemini-hood-peach-cutout-v2.png'
};
export const isCharacterOutfit=(id:string)=>Object.hasOwn(wornOutfitFiles,id)||outfitItems.some(o=>o.id===id&&o.slot==='character');
export const characterOutfitFile=(ids:string[])=>{const id=[...ids].reverse().find(isCharacterOutfit);return id?(wornOutfitFiles[id]??outfitFile(id)):'art/mongshell-v3/base.png'};
export function equipOutfit(ids:string[],id:string,toggle=false){if(toggle&&ids.includes(id))return ids.filter(x=>x!==id);const slot=outfitItems.find(o=>o.id===id)?.slot;const rest=slot==='character'||slot==='body'?ids.filter(x=>{const s=outfitItems.find(o=>o.id===x)?.slot;return s!=='character'&&s!=='body'}):ids;return rest.includes(id)?rest:[...rest,id];}
