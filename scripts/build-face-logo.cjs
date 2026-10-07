const sharp=require('C:/Users/elija/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const path=require('node:path');
(async()=>{
 const root=path.resolve(__dirname,'..');
 const icon=await sharp(path.join(root,'public/Edit-the-reference-actual-capybara-plush.png')).resize(1024,1024,{fit:'contain',background:'#27674f'}).png().toBuffer();
 await sharp(icon).toFile(path.join(root,'public/art/mongshell-face-logo.png'));
 for(const size of [32,192,512])await sharp(icon).resize(size,size).png().toFile(path.join(root,`public/mongshell-face-icon-${size}.png`));
 console.log('User-selected image exported without cropping at 32, 192 and 512 pixels.');
})().catch(e=>{console.error(e);process.exit(1)});
