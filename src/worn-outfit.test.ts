import {describe,it,expect} from 'vitest';
import {existsSync} from 'node:fs';
import {characterOutfitFile,outfitFile,isCharacterOutfit,equipOutfit,wornOutfitFiles} from './outfit-position';
describe('worn clothing assets',()=>{
 for(const [id,path] of Object.entries(wornOutfitFiles)){
  it(id+' keeps clothing-only thumbnails and renders a worn character',()=>{
   expect(characterOutfitFile([id])).toBe(path);
   expect(outfitFile(id)).not.toBe(path);
   expect(isCharacterOutfit(id)).toBe(true);
   expect(existsSync('public/'+path)).toBe(true);
   expect(existsSync('public/'+outfitFile(id))).toBe(true);
  });
 }
 it('replaces body clothing while preserving accessories',()=>{
  expect(equipOutfit(['hat','today-overalls'],'today-knit-vest')).toEqual(['hat','today-knit-vest']);
 });
});
