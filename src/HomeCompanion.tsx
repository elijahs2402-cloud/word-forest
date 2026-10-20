import {useStore} from './store';
import {useState} from 'react';
import AccessoryArt from './AccessoryArt';
import {characterOutfitFile,isMasterCharacterFile,isCharacterOutfit,outfitStyle,outfitFile,outfitItems} from './outfit-position';

const url=(path:string)=>import.meta.env.BASE_URL+path;
/** The same saved canvas and accessory coordinates as the wardrobe, without editing controls. */
export default function HomeCompanion(){
 const outfit=useStore(s=>s.capyOutfit),layout=useStore(s=>s.capyOutfitLayout);
 const [greeting,setGreeting]=useState(0);
return <div className="home-companion" role="button" tabIndex={0} aria-label="몽쉘에게 인사하기" onClick={()=>setGreeting(n=>n+1)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setGreeting(n=>n+1)}}}><div key={greeting} className={'capy-dressup'+(greeting?' companion-greeting':'')+(isMasterCharacterFile(characterOutfitFile(outfit))?' master-canvas':'')}><img src={url(characterOutfitFile(outfit))} alt="함께 탐험할 몽쉘" draggable={false}/><div className="capy-wear">{outfit.filter(id=>!isCharacterOutfit(id)).map(id=><span key={id} className={'wearable-piece wear-'+id} style={outfitStyle(id,layout)}><AccessoryArt id={id} src={url(outfitFile(id))}/></span>)}{outfit.filter(id=>outfitItems.some(item=>item.id===id&&item.slot==='back')).map(id=><img key={id+'-front'} src={url(outfitFile(id))} style={outfitStyle(id,layout,true)} alt=""/>)}</div></div></div>;
}
