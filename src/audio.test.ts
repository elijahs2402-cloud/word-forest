import {describe,expect,it} from 'vitest';
import {selectEnglishVoice} from './audio';
const voice=(name:string,lang:string)=>({name,lang} as SpeechSynthesisVoice);
describe('legacy voice selection',()=>{
 it('prefers natural American English',()=>{const natural=voice('Microsoft Jenny Natural','en-US');expect(selectEnglishVoice([voice('Korean','ko-KR'),voice('Microsoft David','en-US'),natural])).toBe(natural)});
 it('does not select Korean for English',()=>expect(selectEnglishVoice([voice('Korean','ko-KR')])).toBeUndefined());
});
