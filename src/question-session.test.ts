import {afterEach,describe,expect,it,vi} from 'vitest';
import {readQuestion,saveQuestion} from './question-session';
afterEach(()=>vi.unstubAllGlobals());
describe('question checkpoint',()=>{
 it('keeps answered feedback to avoid paying the same answer again',()=>{let data='';vi.stubGlobal('localStorage',{getItem:()=>data,setItem:(_k:string,v:string)=>data=v});const q={signature:'game',index:0,retry:[],right:1,combo:1,feedback:{ok:true,text:'맞았어'}};saveQuestion(q);expect(readQuestion('game',6)).toEqual(q);expect(readQuestion('different',6)).toBeNull();});
});
