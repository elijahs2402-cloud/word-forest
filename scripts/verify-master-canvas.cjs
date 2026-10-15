const {chromium}=require('C:/Users/elija/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
const target=process.argv[2]||'http://localhost:4173/';
(async()=>{
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
for(const viewport of [{width:375,height:812},{width:393,height:852},{width:820,height:1180},{width:852,height:393}]){
const context=await browser.newContext({viewport,reducedMotion:'reduce'}),page=await context.newPage();
await page.goto(target);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
await page.goto(target+'?view=decorate');await page.getByRole('button',{name:'무료 버섯 받기'}).click();await page.getByRole('button',{name:'숲 꾸미기 시작'}).click();await page.getByRole('button',{name:'몽쉘 꾸미기',exact:true}).click();await page.getByRole('button',{name:'옷',exact:true}).click();
let baseline;
for(const name of ['의상 해제','딸기 후드','블루베리 후드','레몬 후드','배 후드','포도 후드','복숭아 후드']){
await page.getByRole('button',{name,exact:true}).click();const im=page.locator('.wardrobe-preview .capy-dressup>img');await im.evaluate(i=>i.decode());
const value=await im.evaluate(i=>{const r=i.getBoundingClientRect(),p=i.parentElement.getBoundingClientRect();return {natural:[i.naturalWidth,i.naturalHeight],frame:[p.x,p.y,p.width,p.height],image:[r.x,r.y,r.width,r.height],master:i.parentElement.classList.contains('master-canvas')};});
assert.deepEqual(value.natural,[1000,1000]);assert(value.master);if(!baseline)baseline=value;else {assert.deepEqual(value.frame,baseline.frame);assert.deepEqual(value.image,baseline.image);}
}
if(viewport.width===393)await page.screenshot({path:'output/master-canvas-phone.png'});
await page.getByRole('button',{name:'저장하고 숲으로',exact:true}).click();assert(await page.locator('[data-object="-1"]').evaluate(e=>e.classList.contains('master-canvas')));
assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));console.log(JSON.stringify({viewport,sevenStatesSameSize:true,baseline}));await context.close();
}
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
