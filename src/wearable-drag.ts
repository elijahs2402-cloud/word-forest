import type {OutfitPosition} from './outfit-position';
type Box={left:number;right:number;top:number;bottom:number};
export function moveWearableWithinViewport(origin:OutfitPosition,delta:{x:number;y:number},frame:{width:number;height:number},piece:Box,viewport:{width:number;height:number}){
 // Keep a small recoverable grip visible, rather than clamping to the plush frame.
 const grip=24;
 const dx=Math.max(grip-piece.right,Math.min(viewport.width-grip-piece.left,delta.x));
 const dy=Math.max(grip-piece.bottom,Math.min(viewport.height-grip-piece.top,delta.y));
 return {...origin,x:origin.x+dx/Math.max(1,frame.width)*100,y:origin.y+dy/Math.max(1,frame.height)*100};
}
