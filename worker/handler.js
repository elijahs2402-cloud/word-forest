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
