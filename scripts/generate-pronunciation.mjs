import {readFile,writeFile,mkdir,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
// Run locally only. Credentials are never copied into the app or manifest.
const key=process.env.OPENAI_API_KEY;
if(!key){console.error('OPENAI_API_KEY is unavailable');process.exit(1);}
const {words}=JSON.parse(await readFile(resolve('src/data/verbs.json'),'utf8'));
const items=new Map();
for(const word of words)for(const side of ['present','past']){
 const label=word[side];
 if(label==='read'){items.set(side==='present'?'read (현재)':'read (과거)',side==='present'?'reed':'red');items.set('read','reed');}
 else for(const part of label.split(/\s*\/\s*/))items.set(part,part);
}
const directory=resolve('public/audio/en-us-marin-v1');await mkdir(directory,{recursive:true});
const model='gpt-4o-mini-tts',voice='marin';
const manifest={model,voice,aiGenerated:true,clips:{}};
for(const [label,input] of items){const id=createHash('sha256').update(label).digest('hex').slice(0,16);manifest.clips[label]=`audio/en-us-marin-v1/${id}.mp3`;}
const limitArg=process.argv.find(a=>a.startsWith('--limit='));const list=[...items].slice(0,limitArg?Number(limitArg.split('=')[1]):items.size);
let cursor=0,completed=0,failed=false;
async function worker(){while(cursor<list.length&&!failed){const [label,input]=list[cursor++];const target=resolve('public',manifest.clips[label]);try{if((await stat(target)).size>1000){completed++;continue;}}catch{}
 try{
 const response=await fetch('https://api.openai.com/v1/audio/speech',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({model,voice,input,response_format:'mp3',instructions:'Speak ONLY the provided English word, once. Native standard American English pronunciation. Warm, natural, clear vocabulary teacher voice for children. Conversational cadence, not robotic, not singing, not exaggerated or whispered. No introduction, no commentary, no background sounds.'}),signal:AbortSignal.timeout(60000)});
 if(!response.ok){failed=true;const error=await response.json().catch(()=>null);const code=error?.error?.code;const safeCode=typeof code==='string'&&/^[a-z_]{1,60}$/.test(code)?code:'unknown';console.error(`Speech generation failed: HTTP ${response.status}, code=${safeCode}. No response body or credentials logged.`);return;}
 const bytes=Buffer.from(await response.arrayBuffer());if(bytes.length<1000)throw Error('Invalid audio');await writeFile(target,bytes);console.log(`Generated ${++completed}/${list.length}: ${label}`);
 }catch{failed=true;console.error('Speech generation failed (network, timeout, or invalid audio).');return;}
}}
await Promise.all(Array.from({length:Math.min(3,list.length)},worker));
if(failed)process.exitCode=1;
else if(!limitArg){await writeFile(resolve('src/pronunciation-manifest.json'),JSON.stringify(manifest,null,2)+'\n');console.log(`Complete: ${items.size} clips. No API key in output.`);}
