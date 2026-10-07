import {readFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const {clips}=JSON.parse(await readFile('src/pronunciation-manifest.json','utf8'));
const bad=[];
for(const [word,path] of Object.entries(clips)){
 try{
 const duration=Number(execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1','public/'+path],{encoding:'utf8',stdio:['ignore','pipe','ignore']}));
 if(!(duration>.1&&duration<12)){bad.push({word,reason:'duration',duration});continue;}
 const result=execFileSync('ffmpeg',['-hide_banner','-nostats','-i','public/'+path,'-af','volumedetect','-f','null','NUL'],{encoding:'utf8',stdio:['ignore','pipe','pipe']});
 }catch(error){
 // ffmpeg returns its level report on stderr; inspect it separately below.
 if(error.status!==undefined){bad.push({word,reason:'decode'});continue;}
 }
 try{const child=await import('node:child_process');const result=child.spawnSync('ffmpeg',['-hide_banner','-nostats','-i','output/maya-original-audio/'+path.split('/').at(-1),'-af','volumedetect','-f','null','NUL'],{encoding:'utf8',windowsHide:true});const match=result.stderr.match(/max_volume:\s*([\-\d.]+) dB/);if(result.status!==0||!match||Number(match[1])< -45)bad.push({word,reason:'silent source',peak:match?.[1]});}catch{bad.push({word,reason:'source check'});}
}
console.log(JSON.stringify({checked:Object.keys(clips).length,bad}));
if(bad.length)process.exitCode=1;
