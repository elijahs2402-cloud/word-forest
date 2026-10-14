const {chromium}=require('C:/Users/elija/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const target=process.argv[2]||'http://localhost:4174/';
 const variants=['숲 멜빵바지','니트 조끼','노란 우비','별무늬 잠옷','탐험가 재킷','딸기 후드','블루베리 후드','레몬 후드','배 후드','포도 후드','복숭아 후드'];
 for(const viewport of [{width:375,height:812},{width:393,height:852},{width:820,height:1180},{width:852,height:393}]){
  const context=await browser.newContext({viewport,reducedMotion:'reduce'});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(target+'?view=decorate');await page.getByRole('button',{name:'무료 버섯 받기'}).click();
  await page.getByRole('button',{name:'숲 꾸미기 시작'}).click();
  await page.getByRole('button',{name:'배경',exact:true}).click();await page.getByRole('button',{name:'숲 배경 1',exact:true}).click();
  await page.locator('[data-object="0"]').click();
  await page.getByRole('button',{name:'크게',exact:true}).click();await page.getByRole('button',{name:'기본 크기',exact:true}).click();await page.getByRole('button',{name:'작게',exact:true}).click();
  assert.match(await page.locator('.selection-heading').innerText(),/90%/);
  for(let step=0;step<5;step++)await page.getByRole('button',{name:'크게',exact:true}).click();
  assert.match(await page.locator('.selection-heading').innerText(),/140%/);
  await page.getByRole('button',{name:'맨 앞으로',exact:true}).click();await page.getByRole('button',{name:'맨 뒤로',exact:true}).click();
  await page.getByRole('button',{name:'삭제',exact:true}).click();assert.equal(await page.locator('[data-object="0"]').count(),0);
  await page.getByRole('button',{name:'되돌리기',exact:true}).click();await page.locator('[data-object="0"]').click();
  assert.equal(await page.locator('.object-resize').count(),1);
  const handle=await page.locator('.object-resize').boundingBox();assert.equal(handle.width,48);
  const toolbar=await page.locator('.studio-toolbar').boundingBox();const scene=await page.locator('.studio-scene').boundingBox();assert(toolbar.y>=scene.y+scene.height);
  if(viewport.width===393)await page.screenshot({path:'output/restored-forest-phone.png'});
  await page.getByRole('button',{name:'몽쉘 꾸미기',exact:true}).click();await page.getByRole('button',{name:'옷',exact:true}).click();
  assert.equal(await page.locator('.wardrobe-options>button').count(),12);
  for(const name of variants){
   await page.getByRole('button',{name,exact:true}).click();
   const image=page.locator('.wardrobe-preview .capy-dressup>img');
   await image.evaluate(i=>i.decode());assert.match(await image.getAttribute('src'),/-cutout-v2\.png$/);
   assert.equal(await page.locator('.wardrobe-preview .capy-wear>span').count(),0);
  }
  await page.getByRole('button',{name:'의상 해제',exact:true}).click();
  await page.getByRole('button',{name:'블루베리 후드',exact:true}).click();
  if(viewport.width===393)await page.screenshot({path:'output/restored-wardrobe-phone.png'});
  await page.getByRole('button',{name:'저장하고 숲으로',exact:true}).click();
  assert.match(await page.locator('[data-object="-1"]>img').getAttribute('src'),/blueberry-cutout-v2/);
  assert.equal(await page.locator('.studio-instruction').count(),0);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);
  console.log(JSON.stringify({viewport,variants:11,toolbarBelowScene:true,resize:48,errors}));await context.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
