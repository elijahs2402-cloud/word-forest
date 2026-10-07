import {afterEach,beforeEach,describe,expect,it,vi} from 'vitest';
import {speak,stopSpeech,subscribeSpeech,pronunciationParts,pronunciationUrl,type SpeechState} from './audio';
import {words} from './engine';
import pronunciation from './pronunciation-manifest.json';
class FakeAudio {
 static instances:FakeAudio[]=[];
 static playImplementation:()=>Promise<void>=()=>Promise.resolve();
 preload='';currentTime=0;playbackRate=1;preservesPitch=false;
 onplaying:(()=>void)|null=null;onended:(()=>void)|null=null;onerror:(()=>void)|null=null;
 pause=vi.fn();play=vi.fn(()=>FakeAudio.playImplementation());
 constructor(public src:string){FakeAudio.instances.push(this)}
}
beforeEach(()=>{vi.stubGlobal('Audio',FakeAudio)});
afterEach(()=>{stopSpeech();vi.unstubAllGlobals()});
describe('Recorded pronunciation files',()=>{
 it('releases a stalled player so learning can continue',()=>{
  vi.useFakeTimers();let state:SpeechState|undefined;const off=subscribeSpeech(s=>state=s);
  try{speak('cost');expect(state?.active).toBe(true);vi.advanceTimersByTime(15000);expect(state?.active).toBe(false);expect(state?.error).toContain('지연');}finally{off();stopSpeech();vi.useRealTimers()}
 });
 it('reports autoplay restrictions distinctly',async()=>{
  let state:SpeechState|undefined;const off=subscribeSpeech(s=>state=s);
  const denied=new Error('blocked');denied.name='NotAllowedError';
  const original=FakeAudio.playImplementation;
  FakeAudio.playImplementation=()=>Promise.reject(denied);
  try{speak('cost');await Promise.resolve();expect(state?.error).toContain('직접 눌러');expect(state?.active).toBe(false)}finally{FakeAudio.playImplementation=original;off()}
 });
 it('ignores an old play rejection after a newer word starts',async()=>{
  let state:SpeechState|undefined;const off=subscribeSpeech(s=>state=s);let reject:(e:Error)=>void=()=>{};
  const original=FakeAudio.playImplementation;FakeAudio.playImplementation=()=>new Promise<void>((_,r)=>reject=r);
  try{speak('hit');FakeAudio.playImplementation=original;speak('put');reject(new Error('interrupted'));await Promise.resolve();expect(state?.text).toBe('put');expect(state?.active).toBe(true);expect(state?.error).toBeUndefined()}finally{FakeAudio.playImplementation=original;off()}
 });
 it('covers every present and past form in the curriculum',()=>{
  for(const word of words)for(const side of ['present','past'] as const){const text=word[side]==='read'?(side==='present'?'read (현재)':'read (과거)'):word[side];for(const part of pronunciationParts(text))expect(pronunciationUrl(part),text).toBeTruthy();}
 });
 it('maps read tenses to separate files and splits was/were',()=>{
  expect(pronunciationUrl('read (현재)')).toContain('read-present.mp3');
  expect(pronunciationUrl('read (과거)')).toContain('read-past.mp3');
  expect(pronunciationParts('was / were')).toEqual(['was','were']);
 });
 it('uses recordings without calling browser TTS and preserves pitch at 0.7x',()=>{
  const tts={cancel:vi.fn(),speak:vi.fn()};vi.stubGlobal('speechSynthesis',tts);
  speak('go',.7);const player=FakeAudio.instances.at(-1)!;
  expect(player.src).toContain(pronunciation.clips.go);expect(player.playbackRate).toBe(.7);
  expect(player.preservesPitch).toBe(true);expect(tts.speak).not.toHaveBeenCalled();
 });
 it('cancels previous audio and ignores stale playback events',()=>{
  let state:SpeechState|undefined;const off=subscribeSpeech(s=>{state=s});
  speak('eat');const first=FakeAudio.instances.at(-1)!;const stale=first.onplaying!;
  speak('ate');expect(first.pause).toHaveBeenCalled();stale();
  expect(state?.text).toBe('ate');expect(state?.wordIndex).toBe(-1);
  const latest=FakeAudio.instances.at(-1)!;latest.onplaying!();expect(state?.wordIndex).toBe(0);
  latest.onended!();expect(state?.active).toBe(false);off();
 });
 it('highlights each file boundary when playing was and were sequentially',()=>{
  let state:SpeechState|undefined;const off=subscribeSpeech(s=>{state=s});
  speak('was / were');const first=FakeAudio.instances.at(-1)!;first.onplaying!();expect(state?.wordIndex).toBe(0);
  first.onended!();const second=FakeAudio.instances.at(-1)!;
  expect(second.src).toContain('were.mp3');second.onplaying!();expect(state?.wordIndex).toBe(1);off();
 });
 it('reports unknown clips rather than falling back to robot TTS',()=>{
  let state:SpeechState|undefined;const off=subscribeSpeech(s=>{state=s});speak('unknown-word');
  expect(state?.active).toBe(false);expect(state?.error).toBeTruthy();off();
 });
});
