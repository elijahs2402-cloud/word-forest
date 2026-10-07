import {readFile,writeFile,mkdir,stat,copyFile} from 'node:fs/promises';
import {resolve,basename} from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const run=promisify(execFile);
const ledger=JSON.parse(await readFile('output/zelda-generation.json','utf8'));
const previous=JSON.parse(await readFile('src/pronunciation-manifest.json','utf8'));
if(ledger.words.length!==130||ledger.words.some(w=>!ledger.jobs.some(j=>j.index===w.index&&j.status==='completed'&&j.result_url)))throw Error('All 130 generations must complete before switching voice');
await mkdir('public/audio/zelda-v1',{recursive:true});
await mkdir('output/zelda-original-audio',{recursive:true});
if(previous.voice==='Maya')await copyFile('src/pronunciation-manifest.json','public/audio/maya-manifest.json');
const manifest={voice:'Zelda',voiceId:ledger.voiceId,model:'seed_audio',aiGenerated:true,clips:{}};
let cursor=0;const bad=[];
async function worker(){while(cursor<ledger.words.length){const word=ledger.words[cursor++];try{const job=ledger.jobs.find(j=>j.index===word.index&&j.status==='completed');
 const url=new URL(job.result_url);if(url.protocol!=='https:'||url.hostname!=='d8j0ntlcm91z4.cloudfront.net')throw Error('Unexpected audio host');
 const file=resolve('public',word.path);const original=resolve('output/zelda-original-audio',basename(word.path).replace('.mp3','.wav'));
 let exists=false;try{exists=(await stat(file)).size>500;if(exists)await run('ffprobe',['-v','error',file],{windowsHide:true})}catch{exists=false}
 if(!exists){const response=await fetch(url,{signal:AbortSignal.timeout(60000)});if(!response.ok)throw Error('Audio download failed: '+response.status);
 const bytes=Buffer.from(await response.arrayBuffer());if(bytes.length<500)throw Error('Invalid audio');await writeFile(original,bytes);
 const {stderr}=await run('ffmpeg',['-hide_banner','-nostats','-i',original,'-af','volumedetect','-f','null','NUL'],{windowsHide:true});const peak=stderr.match(/max_volume:\s*([\-\d.]+) dB/);if(!peak||Number(peak[1])< -45)throw Error('Silent original');
 await run('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',original,'-af','silenceremove=start_periods=1:start_duration=0.02:start_threshold=-50dB,loudnorm=I=-18:TP=-2:LRA=7','-ar','24000','-ac','1','-codec:a','libmp3lame','-b:a','96k',file],{windowsHide:true});}
 const {stdout}=await run('ffprobe',['-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',file],{windowsHide:true});
 const duration=Number(stdout);if(!(duration>.1&&duration<12))throw Error('Unexpected duration: '+word.text);
 await run('ffmpeg',['-v','error','-i',file,'-f','null','-'],{windowsHide:true});
 manifest.clips[word.text]=word.path;console.log('Verified '+word.text);
 }catch(error){bad.push({index:word.index,text:word.text,error:error.message.slice(0,160)});console.log('Rejected '+word.text);}
}}
await Promise.all([worker(),worker(),worker()]);
await writeFile('output/zelda-invalid.json',JSON.stringify(bad,null,2));
if(bad.length)throw Error(bad.length+' invalid clips; see output/zelda-invalid.json. Voice not switched.');
if(Object.keys(manifest.clips).length!==130)throw Error('Incomplete curriculum');
await writeFile('src/pronunciation-manifest.json',JSON.stringify(manifest,null,2)+'\n');
console.log('Switched to 130 verified Zelda clips; Maya originals preserved.');
