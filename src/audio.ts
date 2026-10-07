import pronunciation from './pronunciation-manifest.json';
let ctx:AudioContext|undefined;
let mix:GainNode|undefined;
const buffers:AudioBuffer[]=[];
let generation=0;
export type SpeechState={text:string;active:boolean;wordIndex:number;rate:number;error?:string};
const clips=pronunciation.clips as Record<string,string>;
const players=new Map<string,HTMLAudioElement>();
let currentPlayer:HTMLAudioElement|undefined;
let watchdog:ReturnType<typeof setTimeout>|undefined;
function clearWatchdog(){if(watchdog!==undefined)clearTimeout(watchdog);watchdog=undefined;}
export function pronunciationParts(text:string){return text==='read'?['read (현재)']:text.split(/\s*\/\s*/);}
export function pronunciationUrl(text:string){const path=clips[text];return path?import.meta.env.BASE_URL+path:undefined;}
function playerFor(text:string){const url=pronunciationUrl(text);if(!url||typeof Audio==='undefined')return undefined;let player=players.get(text);if(!player){player=new Audio(url);player.preload='auto';players.set(text,player);}return player;}
export function preloadSpeech(text:string){pronunciationParts(text).forEach(playerFor);}
let state:SpeechState={text:'',active:false,wordIndex:-1,rate:1};
const listeners=new Set<(value:SpeechState)=>void>();
export function subscribeSpeech(fn:(value:SpeechState)=>void){listeners.add(fn);fn(state);return()=>{listeners.delete(fn)};}
function publish(value:SpeechState){state=value;listeners.forEach(fn=>fn(value));}
function duck(active:boolean){if(ctx&&mix)mix.gain.setTargetAtTime(active?.25:1,ctx.currentTime,.025);}
export function prepareAudio(){try{if(ctx)return;ctx=new AudioContext();mix=ctx.createGain();mix.connect(ctx.destination);mix.gain.value=state.active?.25:1;
[523,659,784,880,988,392,260].forEach((frequency,kind)=>{const count=kind===5?1:kind===6?2:3;const buffer=ctx!.createBuffer(1,Math.ceil(ctx!.sampleRate*.42),ctx!.sampleRate),data=buffer.getChannelData(0);for(let n=0;n<count;n++)for(let i=0;i<Math.ceil(ctx!.sampleRate*.22);i++){const t=i/ctx!.sampleRate,j=i+Math.round(n*.08*ctx!.sampleRate);if(j>=data.length)break;const envelope=Math.min(1,t/.012)*Math.exp(-t*24);data[j]+=Math.sin(2*Math.PI*frequency*(1+n*.25)*t)*envelope*.055;}buffers.push(buffer);});
}catch{ctx=undefined;mix=undefined;buffers.length=0;}}
export function sound(kind=0){try{prepareAudio();if(!ctx||!mix)return;void ctx.resume().catch(()=>{});const source=ctx.createBufferSource();source.buffer=buffers[Math.abs(kind)%buffers.length];source.connect(mix);source.start();if(typeof navigator!=='undefined'&&typeof navigator.vibrate==='function')navigator.vibrate(kind===6?[30,40,30]:kind===5?8:kind===3?25:12);}catch{}}
export const voices=()=>typeof speechSynthesis!=='undefined'?speechSynthesis.getVoices().filter(v=>/^en[-_]/i.test(v.lang)):[];
export function selectEnglishVoice(available:SpeechSynthesisVoice[]){
const english=available.filter(v=>/^en[-_]/i.test(v.lang));
const score=(v:SpeechSynthesisVoice)=>(/^en[-_]US$/i.test(v.lang)?100:0)+(/natural|neural|premium|enhanced/i.test(v.name)?40:0)+(/Google US English/i.test(v.name)?30:0);
return english.sort((a,b)=>score(b)-score(a))[0];
}
export function stopSpeech(){generation++;clearWatchdog();if(currentPlayer){currentPlayer.pause();currentPlayer.onplaying=null;currentPlayer.onended=null;currentPlayer.onerror=null;currentPlayer.currentTime=0;currentPlayer=undefined;}if(typeof speechSynthesis!=='undefined')speechSynthesis.cancel();duck(false);publish({...state,active:false,wordIndex:-1});}
export function resetSpeech(){stopSpeech();publish({text:'',active:false,wordIndex:-1,rate:1});}
export function speak(text:string,rate=1){
stopSpeech();const token=generation,parts=pronunciationParts(text),speed=rate===1?1:.7;
const finish=(error?:string)=>{if(token!==generation)return;clearWatchdog();if(currentPlayer){currentPlayer.pause();currentPlayer.onplaying=null;currentPlayer.onended=null;currentPlayer.onerror=null;}duck(false);currentPlayer=undefined;publish({text,active:false,wordIndex:-1,rate:speed,error});};
function playPart(index:number){if(token!==generation)return;clearWatchdog();if(index>=parts.length){finish();return;}const player=playerFor(parts[index]);if(!player){finish('이 단어의 발음 파일을 찾지 못했어요.');return;}currentPlayer=player;player.currentTime=0;player.playbackRate=speed;player.preservesPitch=true;
 watchdog=setTimeout(()=>finish('발음이 지연되어 멈췄어요. 다시 듣거나 소리 없이 계속할 수 있어요.'),15000);
 player.onplaying=()=>{if(token===generation&&currentPlayer===player)publish({text,active:true,wordIndex:index,rate:speed});};
 player.onended=()=>playPart(index+1);
 player.onerror=()=>finish(player.error?.code===4?'발음 파일 형식 또는 주소를 확인해 주세요.':player.error?.code===2?'발음 파일을 불러오지 못했어요. 연결을 확인하고 다시 눌러 주세요.':'발음 파일을 재생하지 못했어요. 다시 눌러 주세요.');
 const rejected=(error:unknown)=>{if(token!==generation)return;const reason=error instanceof Error?error.name:'';finish(reason==='NotAllowedError'?'발음 듣기를 직접 눌러 소리를 허용해 주세요.':reason==='NotSupportedError'?'발음 파일 형식 또는 주소를 확인해 주세요.':'발음을 재생하지 못했어요. 다시 눌러 주세요.');};
 try{void player.play().catch(rejected);}catch(error){rejected(error);}
}
duck(true);publish({text,active:true,wordIndex:-1,rate:speed});
playPart(0);
}
