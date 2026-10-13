import {describe,it,expect} from 'vitest';
import {outfitItems,outfitDefaults,outfitStyle} from './outfit-position';

describe('front-view outfit fitting',()=>{
 it('centers all head accessories without changing item identity',()=>{
  for(const item of outfitItems.filter(item=>item.slot==='head'))expect(outfitDefaults[item.id].x).toBe(50);
 });
 it('preserves manually saved positions and scale',()=>{
  const saved={hat:{x:41,y:-9,scale:1.7}};
  expect(outfitStyle('hat',saved)).toMatchObject({left:'41%',top:'-9%',width:'81.6%'});
 });
 it('uses fitted defaults for items without a saved override',()=>{
  expect(outfitStyle('hat',{})).toMatchObject({left:'50%',top:'-29%'});
 });
});
