import {describe,expect,it} from 'vitest';
import {validateRecord} from './record-validation';
import {initial} from './store';
describe('backup validation',()=>{
 it('drops unknown fields so imported files cannot replace store actions',()=>{const result=validateRecord({...initial(),patch:'bad',ready:true});expect(result).not.toHaveProperty('patch');expect(result).not.toHaveProperty('ready');});
 it('rejects unknown objects and outfits',()=>{expect(()=>validateRecord({...initial(),deco:[99]})).toThrow();expect(()=>validateRecord({...initial(),forestLayout:{'-999':{x:5,y:5}}})).toThrow();expect(()=>validateRecord({...initial(),capyOutfit:['unknown']})).toThrow();});
});
