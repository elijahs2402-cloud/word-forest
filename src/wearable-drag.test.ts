import {describe,it,expect} from 'vitest';
import {moveWearableWithinViewport} from './wearable-drag';
describe('wearable viewport drag bounds',()=>{
 const frame={width:180,height:220},piece={left:150,right:330,top:150,bottom:350},viewport={width:500,height:800};
 it('can move left beyond the old -25 percent limit',()=>{
  const p=moveWearableWithinViewport({x:0,y:0,scale:1},{x:-150,y:0},frame,piece,viewport);
  expect(p.x).toBeCloseTo(-83.3333);expect(p.y).toBe(0);
 });
 it('keeps a recoverable grip at both edges and preserves scale',()=>{
  const origin={x:0,y:0,scale:2};
  const left=moveWearableWithinViewport(origin,{x:-999,y:0},frame,piece,viewport);
  const right=moveWearableWithinViewport(origin,{x:999,y:0},frame,piece,viewport);
  expect(piece.right+left.x/100*frame.width).toBeCloseTo(24);
  expect(piece.left+right.x/100*frame.width).toBeCloseTo(476);
  expect(left.scale).toBe(2);
 });
});
