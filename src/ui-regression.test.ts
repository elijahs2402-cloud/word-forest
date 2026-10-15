import {describe,it,expect} from 'vitest';
import {readFileSync,existsSync} from 'node:fs';
import {wornOutfitFiles,outfitThumbnailFile} from './outfit-position';
const source=(file:string)=>readFileSync('src/'+file,'utf8');
describe('approved UI regression guards',()=>{
 it('uses six approved fitted hoodies, five existing costumes and clothing-only catalog images',()=>{
  expect(Object.keys(wornOutfitFiles)).toHaveLength(11);
  for(const [id,path] of Object.entries(wornOutfitFiles)){
   expect(path).toMatch(id.startsWith('hood-')?/-1000-v\d+\.png$/:/-cutout-v2\.png$/);expect(existsSync('public/'+path)).toBe(true);
   expect(outfitThumbnailFile(id)).not.toBe(path);expect(existsSync('public/'+outfitThumbnailFile(id))).toBe(true);
  }
 });
 it('retains wardrobe and forest rendering, clear card and removed small labels',()=>{
  const s=source('ForestStudio.tsx');
  for(const text of ['characterOutfitFile(wardrobeDraft)','characterOutfitFile(outfit)','outfitThumbnailFile(item)','outfit-clear','wardrobe-workspace','hood-pose-'])expect(s).toContain(text);
  for(const text of ['착용 중','입히기','소품 그림을 숲으로 끌어','그림을 숲으로 끌어 놓으면'])expect(s).not.toContain(text);
 });
 it('retains corner resizing, edit sheet, background selection and bottom toolbar',()=>{
  const s=source('ForestStudio.tsx');
  for(const text of ['resize-disc','object-size-steps','object-edit-sheet',"trayTab==='background'",'forestBackground:background'])expect(s).toContain(text);
  expect(s.lastIndexOf('className="studio-toolbar"')).toBeGreaterThan(s.indexOf('aria-label="소품 도구와 목록"'));
 });
 it('keeps study progress, centered pronunciation and simplified feedback',()=>{
  const s=source('App.tsx');
  for(const text of ['question-progress-label','combo-row','boss-card-heading','question-pronunciation','completed-answer','letter-enter','result-next-note','toastPaused'])expect(s).toContain(text);
  expect(s).not.toContain('ox-selection-hint');
  const feedback=s.slice(s.indexOf('className="feedback-word"'),s.indexOf('className="feedback-word"')+300);
  expect(feedback).not.toContain('word.meaning');
 });
});
