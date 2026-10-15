import {describe,it,expect} from 'vitest';
import {equipOutfit,characterOutfitFile,outfitIds} from './outfit-position';
import {decoItems,decoType} from './engine';
import {initial} from './store';
import {validateRecord} from './record-validation';
describe('today content and saved outfits',()=>{
 it('changes full character costume while keeping accessories',()=>{expect(equipOutfit(['glasses','hood-strawberry'],'hood-blueberry')).toEqual(['glasses','hood-blueberry']);expect(characterOutfitFile(['hood-blueberry'])).toBe('art/mongshell-v3/base-blueberry-hood-photoshop-furfade-1000-v4.png');});
 it('switches clothing without stacking a full character image',()=>{expect(equipOutfit(['glasses','hood-blueberry'],'today-overalls')).toEqual(['glasses','today-overalls']);});
 it('keeps original outfit IDs and decoration IDs',()=>{expect(outfitIds.slice(0,5)).toEqual(['crown','hat','glasses','bow','scarf']);expect(decoItems[0].slug).toBe('mushroom');expect(decoItems[75].slug).toBe('sandbox');expect(decoType(100)).toBe(0);});
 it('accepts new content and preserves recorded learning and layout',()=>{const original={...initial(),capyOutfit:['hood-lemon','today-beret'],deco:[86],forestLayout:{86:{x:37,y:63,scale:1.2,z:5}},progress:{1:{box:2,due:'2026-10-14',wrong:0,seen:3}}};const saved=validateRecord(original);expect(saved.progress).toEqual(original.progress);expect(saved.forestLayout).toEqual(original.forestLayout);expect(saved.capyOutfit).toEqual(original.capyOutfit);});
});
