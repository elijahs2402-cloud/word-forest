import {describe,it,expect} from 'vitest';
import {adventureGuidance} from './adventure-guidance';
import {readFileSync} from 'node:fs';
import {words} from './engine';

describe('companion learning journey',()=>{
 it('prioritizes an interrupted lesson over review',()=>expect(adventureGuidance(true,8,false)).toContain('멈춘 곳'));
 it('welcomes a new learner without a review demand',()=>expect(adventureGuidance(false,0,true)).toContain('단어 하나'));
 it('uses the real review count',()=>expect(adventureGuidance(false,7,false)).toContain('7개'));
 it('offers exploration when there is no review',()=>expect(adventureGuidance(false,0,false)).toContain('새로운 숲'));
 it('uses a valid unchanged past-tense word for the first experience',()=>{
  const word=words.find(w=>w.present==='hit');expect(word?.past).toBe('hit');
  const first=readFileSync('src/FirstAdventure.tsx','utf8');
  expect(first).toContain('.answer(word.no,true,1)');
  expect(first).not.toContain('.round(');
  expect(first).toContain('건너뛰고 둘러보기');
 });
 it('keeps reward navigation separate from granting rewards',()=>{
  const app=readFileSync('src/App.tsx','utf8');
  expect(app).toContain('setShopOpen(true);setView(\'decorate\')');
  expect(app).toContain('오늘의 탐험 기록');
 });
});
