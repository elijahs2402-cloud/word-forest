// Composite the original face, never regenerate or restyle it.
const sharp=require('C:/Users/elija/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const path=require('path');
async function main(){
 const root=path.resolve(__dirname,'..');
 const face=await sharp(path.join(root,'public/art/mongshell-front.png')).extract({left:175,top:65,width:710,height:959}).resize(850,1148).extract({left:0,top:0,width:850,height:864}).png().toBuffer();
 const bg=await sharp(process.argv[2]||path.join(root,'public/art/icon-leaf-background.png')).resize(1024,1024).composite([{input:face,left:87,top:160}]).png().toBuffer();
 await sharp(bg).toFile(path.join(root,'public/art/mongshell-app-icon.png'));
 for(const size of [32,192,512])await sharp(bg).resize(size,size).png().toFile(path.join(root,`public/mongshell-icon-${size}.png`));
 console.log('Original-face app icons exported at 32, 192 and 512 pixels.');
}
main().catch(e=>{console.error(e);process.exit(1)});
