import {describe,it,expect} from 'vitest';
import {outfitItems,outfitDefaults,outfitStyle,resetNewSelectionScale,isCharacterOutfit,equipOutfit,outfitFile,outfitThumbnailFile} from './outfit-position';
import {glassesWithHiddenTemples} from './glasses-occlusion';

describe('front-view outfit fitting',()=>{
 it('keeps scarf and lei adjustable and removable without replacing the character or thumbnails',()=>{
  for(const id of ['scarf','lei']){
   expect(isCharacterOutfit(id)).toBe(false);
   expect(outfitFile(id)).toBe(`outfit/${id}-adjustable-v2.png`);
   expect(outfitStyle(id,{[id]:{x:10,y:20,scale:1.5}}).width).toBe(outfitItems.find(o=>o.id===id)!.w*1.5+'%');
   expect(equipOutfit(['today-pajamas'],id)).toEqual(['today-pajamas',id]);
   expect(equipOutfit([id],id,true)).toEqual([]);
  }
  expect(outfitThumbnailFile('scarf')).toBe('outfit/scarf-fitted.png');
  expect(outfitThumbnailFile('lei')).toBe('outfit/lei-fitted.webp');
 });
 it('preserves each adjusted size across selection changes and starts new items at 100%',()=>{
  const layout={hat:{x:40,y:5,scale:2},glasses:{x:25,y:10,scale:1.8}};
  const next=resetNewSelectionScale('hat','glasses',layout);
  expect(next.glasses).toEqual({x:25,y:10,scale:1.8});expect(next.hat).toEqual(layout.hat);
  expect(resetNewSelectionScale('glasses','hat',next).hat.scale).toBe(2);
  expect(resetNewSelectionScale('glasses','glasses',layout)).toBe(layout);
  expect(resetNewSelectionScale(null,'monocle',{}).monocle.scale).toBe(1);
 });
 it('hides temples for every two-lens glasses asset',()=>{
  expect(glassesWithHiddenTemples).toHaveLength(7);
  for(const id of glassesWithHiddenTemples)expect(outfitStyle(id,{}).maskImage).toContain('data:image/svg+xml');
  expect(outfitStyle('monocle',{}).maskImage).toBeUndefined();
 });
 it('moves the old saved glasses position to the nose without changing its scale',()=>{
  expect(outfitStyle('glasses',{glasses:{x:20.037,y:-7.96568,scale:1}})).toMatchObject({left:'20.037%',top:outfitDefaults.glasses.y+'%',width:'54%'});
 });
 it('keeps face occlusion anchored when a necklace is moved or scaled',()=>{
  const original=outfitStyle('today-acorn-necklace',{});
  const moved=outfitStyle('today-acorn-necklace',{'today-acorn-necklace':{x:30,y:40,scale:1.2}});
  expect(original.maskImage).toContain('accessory-face-occlusion.png');
  expect(moved.maskPosition).not.toBe(original.maskPosition);
  expect(moved.maskSize).not.toBe(original.maskSize);
  expect(outfitStyle('glasses',{}).maskImage).toContain('data:image/svg+xml');
 });
 it('separates the rear cape from its face-occluded front fastening',()=>{
  for(const id of ['cape','today-leaf-cape']){
   expect(outfitStyle(id,{}).zIndex).toBe(-1);
   const front=outfitStyle(id,{},true);
   expect(front.zIndex).toBe(1);
   expect(front.clipPath).toBe('none');expect(front.maskImage).toContain('cape-hand-occlusion.png');
   expect(front.pointerEvents).toBe('none');
  }
 });
 it('provides finite alpha-bound-aware fits for every accessory',()=>{
  for(const item of outfitItems.filter(item=>!['body','character'].includes(item.slot))){const p=outfitDefaults[item.id];expect(Number.isFinite(p.x)&&Number.isFinite(p.y)).toBe(true);expect(p.scale).toBeGreaterThan(0);}
 });
 it('preserves manually saved positions and scale',()=>{
  const saved={hat:{x:41,y:-9,scale:1.7}};
  expect(outfitStyle('hat',saved)).toMatchObject({left:'41%',top:'-9%',width:'81.6%'});
 });
 it('uses fitted defaults for items without a saved override',()=>{
  expect(outfitStyle('hat',{})).toMatchObject({left:outfitDefaults.hat.x+'%',top:outfitDefaults.hat.y+'%'});
 });
});
