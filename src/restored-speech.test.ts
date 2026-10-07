import {afterEach,expect,it,vi} from 'vitest';
import {speak,stopSpeech} from './audio';
afterEach(()=>{stopSpeech();vi.unstubAllGlobals()});
it('Maya playback does not fall back to browser speech',()=>{
 const voice={lang:'en-US',name:'Original'};
 class Utterance {lang='';voice:unknown;rate=1;pitch=1;constructor(public text:string){}}
 const speech=vi.fn();vi.stubGlobal('SpeechSynthesisUtterance',Utterance);
 vi.stubGlobal('speechSynthesis',{cancel:vi.fn(),getVoices:()=>[voice],speak:speech});
 speak('read (과거)');expect(speech).not.toHaveBeenCalled();
});
