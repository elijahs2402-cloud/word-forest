export type OutfitPosition={x:number;y:number;scale:number};
export const outfitDefaults:Record<string,OutfitPosition>={crown:{x:39,y:-13,scale:1},hat:{x:39,y:-13,scale:1},glasses:{x:23,y:3,scale:1},bow:{x:68,y:5,scale:1},scarf:{x:18,y:50,scale:1}};
export function outfitStyle(item:string,layout:Record<string,OutfitPosition>){const p=layout[item]??outfitDefaults[item];return {left:p.x+'%',top:p.y+'%',right:'auto',width:({crown:48,hat:48,glasses:54,bow:35,scarf:58}[item as 'hat']??48)*p.scale+'%',transform:item==='hat'||item==='crown'?'translateX(-50%)':'none'};}
