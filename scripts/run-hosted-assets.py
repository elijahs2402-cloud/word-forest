"""Private authoring client: credentials only through hidden stdin, never written."""
import json,sys,subprocess,time,termios
from pathlib import Path
from datetime import datetime,timezone
root=Path(__file__).resolve().parents[1]
if sys.stdin.isatty():
 t=termios.tcgetattr(0);t[3]&=~termios.ECHO;termios.tcsetattr(0,termios.TCSANOW,t)
print('Ready for authoring credentials on hidden stdin',flush=True)
auth=json.loads(sys.stdin.readline())
plan=json.loads((root/'scripts/asset-plan.json').read_text())
manifest_path=root/'public/assets/manifest.json';manifest=json.loads(manifest_path.read_text())
journal_path=root/'.sites-runtime/generation-journal.json';journal_path.parent.mkdir(exist_ok=True)
journal=json.loads(journal_path.read_text()) if journal_path.exists() else {}
def checkpoint():journal_path.write_text(json.dumps(journal,indent=2))
def api(payload):
 cfg='header = '+json.dumps('OAI-Sites-Authorization: Bearer '+auth['service'])+'\nheader = '+json.dumps('X-Forest-Admin: '+auth['admin'])+'\nheader = "Content-Type: application/json"\ndata = '+json.dumps(json.dumps(payload))+'\n'
 r=subprocess.run(['curl','-sS','--max-time','40','--config','-','-w','\n%{http_code}',auth['origin']+'/api/higgsfield/author'],input=cfg,text=True,capture_output=True)
 if r.returncode:raise RuntimeError('transport_failure')
 body,status=r.stdout.rsplit('\n',1)
 try:d=json.loads(body)
 except:raise RuntimeError('unexpected_response_'+status)
 if int(status)>=400:raise RuntimeError(json.dumps({'http':status,'upstreamStatus':d.get('upstreamStatus'),'error':d.get('error')}))
 return d
selected=sys.argv[1] if len(sys.argv)>1 else 'char/happy.png'
for a in plan:
 file=a['file'];dest=root/'public/assets'/file
 if selected!='--all' and file!=selected:continue
 if dest.exists():continue
 state=journal.get(file,{})
 if state.get('state') in ['submitting','unknown','rejected']:print(file,'BLOCKED: inspect previous attempt',flush=True);sys.exit(2)
 try:
  if not state.get('request_id'):
   journal[file]={'state':'submitting','time':datetime.now(timezone.utc).isoformat()};checkpoint()
   try:d=api({'action':'generate','file':file})
   except Exception as e:
    journal[file]={'state':'rejected' if 'not_enough_credits' in str(e) else 'unknown','error':str(e)};checkpoint();raise
   if not d.get('request_id'):raise RuntimeError('missing_request_id')
   journal[file]={'state':'queued','request_id':d['request_id']};checkpoint();print(file,'submitted',d['request_id'],flush=True)
  rid=journal[file]['request_id'];deadline=time.time()+600;delay=5
  while True:
   d=api({'action':'status','request_id':rid});status=d.get('status');journal[file]['state']=status;checkpoint()
   if status=='completed':break
   if status in ['failed','nsfw','canceled']:raise RuntimeError('terminal_'+status)
   if time.time()>deadline:raise RuntimeError('poll_timeout_resume_same_id')
   time.sleep(delay);delay=min(30,delay*1.5)
  url=d.get('images',[{}])[0].get('url')
  if not url or not url.startswith('https://'):raise RuntimeError('missing_image_url')
  dest.parent.mkdir(parents=True,exist_ok=True)
  result=subprocess.run(['curl','-fsSL','--max-time','60',url,'-o',str(dest)],capture_output=True)
  if result.returncode:dest.unlink(missing_ok=True);raise RuntimeError('download_failed')
  from PIL import Image
  with Image.open(dest) as im:im.verify()
  manifest=[x for x in manifest if x['file']!=file]+[{**a,'model':'marketing-studio/image/flare','source':'Higgsfield API','request_id':rid,'generated_at':datetime.now(timezone.utc).isoformat()}]
  manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2));journal[file]['state']='downloaded';checkpoint();print(file,'SAVED',flush=True)
 except Exception as e:print(file,'STOP',str(e),flush=True);sys.exit(1)
print('Generation batch finished',flush=True)
