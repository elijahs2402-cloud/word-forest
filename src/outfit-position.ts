export type OutfitPosition={x:number;y:number;scale:number};
export type OutfitSlot='head'|'face'|'side'|'neck'|'back';
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
];
// 옷장 탭: 부위 묶음
export const outfitTabs:{label:string;slots:OutfitSlot[]}[]=[{label:'머리',slots:['head']},{label:'얼굴',slots:['face']},{label:'머리핀',slots:['side']},{label:'목·몸',slots:['neck','back']}];
export const outfitDefaults:Record<string,OutfitPosition>=Object.fromEntries(outfitItems.map(o=>[o.id,{x:o.x,y:o.y,scale:1}]));
// 몽쉘 옷 이름 목록 — 저장 기록 검사에도 쓴다
export const outfitIds=outfitItems.map(o=>o.id);
// 처음 5종은 png, 새 옷은 webp 그림
const pngOutfits=new Set(['crown','hat','glasses','bow','scarf']);
export const outfitFile=(id:string)=>`outfit/${id}-fitted.${pngOutfits.has(id)?'png':'webp'}`;
export function outfitStyle(item:string,layout:Record<string,OutfitPosition>){const o=outfitItems.find(i=>i.id===item);const p=layout[item]??outfitDefaults[item];return {left:p.x+'%',top:p.y+'%',right:'auto',width:(o?.w??48)*p.scale+'%',transform:o?.slot==='head'?'translateX(-50%)':'none',zIndex:o?.slot==='back'?-1:undefined};}
