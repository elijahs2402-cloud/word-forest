import {describe,expect,it} from 'vitest';
import {validateRecord} from './record-validation';
import {initial} from './store';
import {decoItems} from './engine';
describe('backup validation',()=>{
 it('drops unknown fields so imported files cannot replace store actions',()=>{const result=validateRecord({...initial(),patch:'bad',ready:true});expect(result).not.toHaveProperty('patch');expect(result).not.toHaveProperty('ready');});
 it('rejects unknown objects and outfits',()=>{expect(()=>validateRecord({...initial(),deco:[99]})).toThrow();expect(()=>validateRecord({...initial(),forestLayout:{'-999':{x:5,y:5}}})).toThrow();expect(()=>validateRecord({...initial(),capyOutfit:['unknown']})).toThrow();});
 it('accepts later decorations, extra copies and later friends',()=>{const ok={...initial(),deco:[0,100,200,35],forestLayout:{100:{x:5,y:5},35:{x:9,y:9},'-6':{x:1,y:1}},friends:[10],hidden:[19]};expect(()=>validateRecord(ok)).not.toThrow();expect(()=>validateRecord({...initial(),deco:[decoItems.length+100]})).toThrow();expect(()=>validateRecord({...initial(),forestLayout:{[decoItems.length]:{x:5,y:5}}})).toThrow();});
});
