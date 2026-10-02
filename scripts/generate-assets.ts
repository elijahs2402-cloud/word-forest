import 'dotenv/config';
import {createHiggsfieldClient} from '@higgsfield/client/v2';
import {mkdir,writeFile,readFile,access} from 'node:fs/promises';
import {dirname,join} from 'node:path';
const STYLE="Tactile plush and felt miniature, natural greens and browns, neutral studio light, clean white background, no text. ";
const model='flux-pro/kontext/max/text-to-image';
const assets: {file:string;prompt:string;ratio:string}[]=JSON.parse(await readFile('scripts/asset-plan.json','utf8'));
const root='public/assets';await mkdir(root,{recursive:true});
if(process.argv.includes('--plan')){console.table({planned:assets.length,generated:0,failed:0});process.exit(0)}
if(!process.env.HF_API_KEY_ID||!process.env.HF_API_KEY_SECRET){console.error('그림 생성 대기: .env에 Higgsfield API 키를 설정한 뒤 npm run assets를 실행하세요. 앱에는 키가 포함되지 않습니다.');console.table({planned:assets.length,generated:0,skipped:0,failed:0,pending:assets.length});process.exitCode=1;}else{
 const auth=`${process.env.HF_API_KEY_ID}:${process.env.HF_API_KEY_SECRET}`;
 const client=createHiggsfieldClient({credentials:auth,timeout:30000,maxRetries:0});
 let manifest:any[]=[];try{manifest=JSON.parse(await readFile(join(root,'manifest.json'),'utf8'))}catch{}
 let generated=0,skipped=0,failed=0;
 for(const asset of assets){const dest=join(root,asset.file);if(!process.argv.includes('--force')){try{await access(dest);skipped++;continue}catch{}}
 let done=false;for(let attempt=0;attempt<3&&!done;attempt++){let requestId:string|undefined;try{let job=await client.subscribe(model,{input:{prompt:STYLE+asset.prompt,aspect_ratio:asset.ratio,safety_tolerance:2},withPolling:false});requestId=job.request_id;const deadline=Date.now()+600000;let delay=5000;
 while(job.status==='queued'||job.status==='in_progress'){if(Date.now()>deadline)throw Error('polling_timeout');await new Promise(r=>setTimeout(r,delay));delay=Math.min(30000,Math.round(delay*1.5));const status=new URL(job.status_url);if(status.protocol!=='https:'||status.hostname!=='api.higgsfield.ai')throw Error('invalid_status_origin');const response=await fetch(status,{headers:{Authorization:`Key ${auth}`},signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error('polling_transport_error');const latest=await response.json();job={...job,...latest};}
 if(job.status!=='completed')throw Error('terminal_failed');const url=job.images?.[0]?.url;if(!url)throw Error('missing_image');const response=await fetch(url,{signal:AbortSignal.timeout(60000)});if(!response.ok)throw Error('download_failed');const bytes=Buffer.from(await response.arrayBuffer());await mkdir(dirname(dest),{recursive:true});await writeFile(dest,bytes);manifest=manifest.filter(x=>x.file!==asset.file);manifest.push({file:asset.file,prompt:STYLE+asset.prompt,model,request_id:job.request_id,generated_at:new Date().toISOString()});await writeFile(join(root,'manifest.json'),JSON.stringify(manifest,null,2));generated++;done=true;
 }catch(error){const code=error instanceof Error?error.message:'';if(code!=='terminal_failed'){console.error(`${asset.file}: 제출 결과 또는 다운로드 확인 필요. 중복 결제를 막기 위해 자동 재제출하지 않습니다.${requestId?' request_id='+requestId:''}`);break;}if(attempt===2)console.error(`${asset.file}: 생성 실패`);}}
 if(!done)failed++;
 }
 console.table({generated,skipped,failed});if(failed)process.exitCode=1;
}
