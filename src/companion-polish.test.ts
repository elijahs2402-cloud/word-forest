import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
const source=(file:string)=>readFileSync('src/'+file,'utf8');
describe('companion polish',()=>{
 it('offers a keyboard-operable greeting without changing original character assets',()=>{
  const home=source('HomeCompanion.tsx');
  expect(home).toContain('몽쉘에게 인사하기');
  expect(home).toContain("e.key==='Enter'");
  expect(home).toContain('key={greeting}');
  expect(home).toContain('characterOutfitFile(outfit)');
 });
 it('only reacts to actual outfit changes and respects reduced motion',()=>{
  const studio=source('ForestStudio.tsx');
  expect(studio).toContain('previousWorn.current!==wornSignature');
  expect(studio).toContain('!changed||!wardrobe||reduceMotion');
  expect(studio).toContain('reaction.cancel()');
 });
 it('uses finite feedback and disables decorative study loops',()=>{
  const css=source('companion-ui.css');
  expect(css).toContain('@media(prefers-reduced-motion:reduce)');
  expect(css).toContain('.studying .asset-char img{animation:none}');
  expect(css).not.toContain('infinite');
  expect(css).toContain('.view-home .mobile-summary{display:none}');
 });
});
