import {initial,type Saved} from './store';
const record=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
const number=(v:unknown)=>typeof v==='number'&&Number.isFinite(v)&&v>=0;
export function validateRecord(value:unknown):Saved {
 if(!record(value))throw Error('기록 파일 형식이 올바르지 않습니다.');
 const defaults=initial();
 for(const [key,fallback] of Object.entries(defaults)){
  const v=value[key];if(v===undefined)continue;
  if(Array.isArray(fallback)){if(!Array.isArray(v)||!v.every(x=>['friends','hidden','deco'].includes(key)?number(x)&&Number.isInteger(x):typeof x==='string'))throw Error('기록 목록이 올바르지 않습니다.');}
  else if(typeof fallback==='number'){if(!number(v))throw Error('기록 숫자가 올바르지 않습니다.');}
  else if(typeof fallback==='boolean'||typeof fallback==='string'){if(typeof v!==typeof fallback)throw Error('기록 설정이 올바르지 않습니다.');}
  else if(!record(v))throw Error('기록 데이터가 올바르지 않습니다.');
 }
 const result={...defaults,...Object.fromEntries(Object.keys(defaults).filter(key=>value[key]!==undefined).map(key=>[key,value[key]])),unlocked:10} as Saved;
 if(!Object.entries(result.capyOutfitLayout).every(([item,p])=>['crown','hat','glasses','bow','scarf'].includes(item)&&record(p)&&typeof p.x==='number'&&Number.isFinite(p.x)&&typeof p.y==='number'&&Number.isFinite(p.y)&&number(p.scale)&&p.scale>=.5&&p.scale<=2.5))throw Error('의상 위치가 올바르지 않습니다.');
 if(!result.deco.every(id=>id<12)||!result.friends.every(id=>id>=1&&id<=10)||!result.hidden.every(id=>id<10)||!result.capyOutfit.every(item=>['crown','hat','glasses','bow','scarf'].includes(item)))throw Error('알 수 없는 소품이나 친구가 포함되어 있습니다.');
 if(!Object.keys(result.forestLayout).every(id=>Number.isInteger(Number(id))&&Number(id)>=-6&&Number(id)<12))throw Error('알 수 없는 배치가 포함되어 있습니다.');
 if(!Object.values(result.progress).every(p=>record(p)&&number(p.box)&&p.box<=5&&number(p.wrong)&&typeof p.due==='string'))throw Error('학습 기록이 올바르지 않습니다.');
 if(!Object.values(result.forestLayout).every(p=>record(p)&&number(p.x)&&number(p.y)&&(p.scale===undefined||number(p.scale))&&(p.z===undefined||typeof p.z==='number'&&Number.isFinite(p.z))))throw Error('소품 배치가 올바르지 않습니다.');
 for(const key of ['seconds','decoLayout','zoneStars'] as const)if(!Object.values(result[key]).every(number))throw Error('기록 값이 올바르지 않습니다.');
 if(!Object.values(result.daily).every(d=>record(d)&&Object.values(d).every(number)))throw Error('하루 기록이 올바르지 않습니다.');
 return result;
}
