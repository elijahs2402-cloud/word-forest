import {afterEach,describe,expect,it,vi} from 'vitest';
import {readLesson,saveLesson,clearLesson,type LessonSession} from './lesson-session';
const sample:LessonSession={view:'cards',zone:1,card:2,flipped:true,roundIndex:0,games:['choice','ox','tiles'],game:'choice',queue:[],boss:false,review:false,runKey:1,result:{right:0,total:0,star:0,passed:false}};
afterEach(()=>vi.unstubAllGlobals());
describe('lesson checkpoints',()=>{
 it('round trips a card checkpoint and clears it',()=>{const map=new Map();vi.stubGlobal('sessionStorage',{getItem:(k:string)=>map.get(k)??null,setItem:(k:string,v:string)=>map.set(k,v),removeItem:(k:string)=>map.delete(k)});saveLesson(sample);expect(readLesson()).toEqual(sample);clearLesson();expect(readLesson()).toBeNull();});
 it('rejects corrupt checkpoints and unavailable storage',()=>{vi.stubGlobal('sessionStorage',{getItem:()=>'{bad'});expect(readLesson()).toBeNull();vi.stubGlobal('sessionStorage',{getItem:()=>JSON.stringify({...sample,zone:500})});expect(readLesson()).toBeNull();});
});
