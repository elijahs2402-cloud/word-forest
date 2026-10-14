const {chromium}=require('C:/Users/elija/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
const {words}=require('../src/data/verbs.json');const cost=words.find(w=>w.present==='cost');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const base=process.argv[2]||'http://localhost:4174/';
 for(const mode of ['blank','listen','ox','boss','result','friend-result']){
  const context=await browser.newContext({viewport:{width:393,height:852},reducedMotion:'reduce'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const lesson={view:mode.includes('result')?'result':'game',zone:cost.family,card:0,flipped:false,roundIndex:2,games:['blank','listen','ox'],game:mode==='boss'?'tiles':mode.includes('result')?'ox':mode,queue:[cost.no],boss:mode==='boss'||mode==='friend-result',review:false,runKey:111,result:{right:1,total:1,star:3,passed:true,missed:[]}};
  await page.addInitScript(v=>localStorage.setItem('word-forest-lesson-v1',JSON.stringify(v)),lesson);await page.goto(base);await page.getByRole('button',{name:'학습 이어하기',exact:true}).click();
  assert.equal(await page.locator('.header').count(),0);
  if(mode.includes('result')){assert.equal(await page.locator('.result-path').count(),1);assert.equal(await page.getByRole('button',{name:'탐험 지도로',exact:true}).count(),1);}
  else{
   assert.equal(await page.locator('.question-progress-label').count(),1);assert.equal(await page.locator('.combo-row').count(),1);
   if(mode==='blank'){
    assert.equal(await page.locator('.question-pronunciation .pronunciation').count(),1);
    await page.locator('.letter-tile:not(:disabled)').first().click();assert.equal(await page.locator('.letter-enter').count(),1);
    const bottoms=await page.locator('.slot').evaluateAll(els=>els.map(e=>Math.round(e.getBoundingClientRect().bottom)));assert.equal(new Set(bottoms).size,1);
   }
   if(mode==='ox'){assert.equal(await page.locator('.ox-pronunciation .pronunciation').count(),1);assert.equal(await page.locator('.ox-selection-hint').count(),0);}
   if(mode==='boss')assert.equal(await page.locator('.boss-card-heading').count(),1);
  }
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);console.log(JSON.stringify({mode,errors}));await context.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
