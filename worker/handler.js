const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
export async function checkHiggsfield(request,env){
 if(!env.HF_ADMIN_TOKEN||request.headers.get('X-Forest-Admin')!==env.HF_ADMIN_TOKEN)return json({error:'unauthorized'},401);
 if(request.method!=='GET')return json({error:'method_not_allowed'},405);
 if(!env.HF_API_KEY_ID||!env.HF_API_KEY_SECRET)return json({connected:false,reason:'missing_credentials'},503);
 try{const response=await fetch('https://api.higgsfield.ai/marketing-studio/image/presets?size=1',{headers:{Authorization:`Key ${env.HF_API_KEY_ID.trim()}:${env.HF_API_KEY_SECRET.trim()}`},signal:AbortSignal.timeout(20000)});
 await response.arrayBuffer();
 return json({connected:response.ok,upstreamStatus:response.status,operation:'read_only_authentication_check',generationSubmitted:false},response.ok?200:502);
 }catch{return json({connected:false,reason:'upstream_unreachable',generationSubmitted:false},504)}
}

// Authoring-only routes. Never called by the learning interface.
export async function authorHiggsfield(request,env,plan){
 if(!env.HF_ADMIN_TOKEN||request.headers.get('X-Forest-Admin')!==env.HF_ADMIN_TOKEN)return json({error:'unauthorized'},401);
 if(request.method!=='POST')return json({error:'method_not_allowed'},405);
 let body;try{body=await request.json()}catch{return json({error:'invalid_json'},400)}
 const auth={Authorization:`Key ${env.HF_API_KEY_ID?.trim()}:${env.HF_API_KEY_SECRET?.trim()}`};
 if(!env.HF_API_KEY_ID||!env.HF_API_KEY_SECRET)return json({error:'missing_credentials'},503);
 if(body.action==='status'){
  if(!/^[a-zA-Z0-9_-]{8,100}$/.test(body.request_id??''))return json({error:'invalid_request_id'},400);
  try{const r=await fetch(`https://api.higgsfield.ai/requests/${body.request_id}/status`,{headers:auth,signal:AbortSignal.timeout(25000)});const d=await r.json();return json({status:d.status,request_id:d.request_id??body.request_id,images:d.images,upstreamStatus:r.status},r.ok?200:502)}catch{return json({error:'status_unreachable'},504)}
 }
 if(body.action!=='generate')return json({error:'invalid_action'},400);
 const asset=plan.find(x=>x.file===body.file&&x.file!=='char/base.png');if(!asset)return json({error:'unknown_asset'},400);
 const STYLE="Tactile plush and felt miniature, clean natural greens and browns, simple rounded forms, soft neutral studio lighting, no text, no logos, minimal composition, consistent style. ";
 const input={prompt:STYLE+asset.prompt,resolution:'1k',aspect_ratio:asset.ratio,quality:'high',enhance_prompt:false};
 if(asset.file.startsWith('char/')){input.image_urls=['https://d8j0ntlcm91z4.cloudfront.net/user_3DepJboDJYvw55r0UWaHp2J5CZB/hf_20261001_133942_da0f80b3-3d0e-4f4d-97f0-6ce0d8d7ebd5.png'];input.prompt+=' Use the provided capybara plush as exact character identity: keep its sleepy embroidered eyes, blunt face, brown fleece, nose-mouth embroidery and proportions. No cord, clothing or tail. Change only pose. White background, complete body visible.';}
 try{const r=await fetch('https://api.higgsfield.ai/marketing-studio/image/flare',{method:'POST',headers:{...auth,'Content-Type':'application/json'},body:JSON.stringify(input),signal:AbortSignal.timeout(25000)});const d=await r.json();return json({status:d.status,request_id:d.request_id,images:d.images,upstreamStatus:r.status,error:r.ok?undefined:(typeof d.detail==='string'?d.detail:typeof d.message==='string'?d.message:'upstream_rejected')},r.ok?200:502)}catch{return json({error:'submission_outcome_unknown'},504)}
}
