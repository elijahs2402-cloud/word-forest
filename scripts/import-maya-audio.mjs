import {readFile,writeFile,mkdir,stat,copyFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const run=promisify(execFile);
const data=JSON.parse(await readFile(resolve(process.argv[2]??'output/maya-generation-complete.json'),'utf8'));
const manifest=JSON.parse(await readFile(resolve('src/pronunciation-manifest.json'),'utf8'));
await mkdir(resolve('public/audio/maya-v1'),{recursive:true});
await mkdir(resolve('output/maya-original-audio'),{recursive:true});
let next=0,count=0,failed=false;const force=process.argv.includes('--replace');
async function worker(){while(next<data.words.length&&!failed){const word=data.words[next++],job=data.jobs.find(j=>j.index===word.index);if(!job?.result_url||job.status!=='completed'){failed=true;throw Error(`Missing generation: ${word.text}`);}const url=new URL(job.result_url);if(url.protocol!=='https:'||url.hostname!=='d8j0ntlcm91z4.cloudfront.net')throw Error('Unexpected audio host');const file=resolve('public',manifest.clips[word.text]);try{if(!force&&(await stat(file)).size>500){count++;continue;}}catch{}
const response=await fetch(url,{signal:AbortSignal.timeout(60000)});if(!response.ok)throw Error(`Download failed: ${response.status}`);const buffer=Buffer.from(await response.arrayBuffer());if(buffer.length<500)throw Error('Invalid audio file');const original=resolve('output/maya-original-audio',file.split(/[\\/]/).at(-1));if(force){try{await copyFile(original,original.replace('.mp3',`.previous-${Date.now()}.mp3`))}catch{}}await writeFile(original,buffer);
// Preserve original generations; normalize playback volume without changing pitch.
await run('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',original,'-af','silenceremove=start_periods=1:start_duration=0.02:start_threshold=-50dB,loudnorm=I=-18:TP=-2:LRA=7','-ar','24000','-ac','1','-codec:a','libmp3lame','-b:a','96k',file],{windowsHide:true});count++;}}
try{await Promise.all([worker(),worker(),worker()]);console.log(`Imported ${count} Maya files`);}catch(error){console.error(error.message);process.exitCode=1;}
