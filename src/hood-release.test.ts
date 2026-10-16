import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {wornOutfitFiles,outfitThumbnailFile,characterOutfitFile,isMasterCharacterFile} from './outfit-position';
const root='public/art/mongshell-v3/';
const release=JSON.parse(readFileSync(root+'hood-release-v1.json','utf8'));
const dimensions=(file:string)=>{const b=readFileSync(root+file);expect(b.subarray(1,4).toString()).toBe('PNG');return [b.readUInt32BE(16),b.readUInt32BE(20)];};
describe('approved original-base hood release',()=>{
 it('ships exactly six hoodies with stable IDs and original-canvas masters',()=>{
  expect(release.assets.map((x:{id:string})=>x.id)).toEqual(['hood-strawberry','hood-blueberry','hood-lemon','hood-pear','hood-grape','hood-peach']);
  expect(release.resized).toBe(false);
  for(const x of release.assets){
   expect(wornOutfitFiles[x.id]).toBe('art/mongshell-v3/'+x.composite);
   expect(dimensions(x.composite)).toEqual([1000,1000]);expect(dimensions(x.layer)).toEqual([1000,1000]);
   expect(dimensions(x.runtime)).toEqual([551,670]);
   expect(outfitThumbnailFile(x.id)).toBe('outfit/'+x.id+'-only-v1.png');
  }
 });
 it('uses the same square master for the bare base and all six hoodies',()=>{
  expect(dimensions('base.png')).toEqual([1000,1000]);
  for(const ids of [[],...release.assets.map((x:{id:string})=>[x.id])])expect(isMasterCharacterFile(characterOutfitFile(ids))).toBe(true);
  expect(isMasterCharacterFile(characterOutfitFile(['today-overalls']))).toBe(true);
 });
 it('uses the latest original-base overalls master',()=>{
  expect(wornOutfitFiles['today-overalls']).toBe('art/mongshell-v3/base-forest-overalls-tailored-1000-v9.png');
 });
});
