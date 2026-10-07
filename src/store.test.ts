import {beforeEach,describe,expect,it,vi} from 'vitest';
const db=vi.hoisted(()=>({get:vi.fn(),set:vi.fn().mockResolvedValue(undefined)}));
vi.mock('idb-keyval',()=>db);
import {initial,useStore,recoverPreviousRecord} from './store';

describe('redesign preserves existing forest records',()=>{
 it('recovers a backup while quarantining the unreadable original',async()=>{
  const backup={...initial(),acorns:55,deco:[1],forestLayout:{1:{x:45,y:60}}};
  const original={progress:'broken'};
  db.get.mockImplementation(async(key:string)=>key==='forest-last-good-v1'?backup:original);
  db.set.mockImplementation(async(key:string,value:unknown)=>{if(key==='forest-v1')db.get.mockImplementation(async(k:string)=>k==='forest-last-good-v1'?backup:value)});
  try{await recoverPreviousRecord();expect(db.set).toHaveBeenCalledWith('forest-recovery-original-v1',original);expect(useStore.getState()).toMatchObject({ready:true,acorns:55,deco:[1]});}finally{db.set.mockResolvedValue(undefined)}
 });
 it('blocks writes after a failed load and allows retry without losing records',async()=>{
  db.get.mockRejectedValueOnce(Error('unavailable'));
  await useStore.getState().load();db.set.mockClear();
  useStore.getState().patch({acorns:0});useStore.getState().tick(1);
  await new Promise(resolve=>setTimeout(resolve,10));
  expect(db.set).not.toHaveBeenCalled();expect(useStore.getState().ready).toBe(false);
  db.get.mockResolvedValueOnce({...initial(),acorns:83,deco:[0],forestLayout:{0:{x:20,y:40}}});
  await useStore.getState().load();
  expect(useStore.getState()).toMatchObject({ready:true,saveError:'',acorns:83,deco:[0]});
 });
 it('rejects malformed records without replacing the stored value',async()=>{
  db.get.mockResolvedValueOnce({...initial(),progress:[]});
  await useStore.getState().load();db.set.mockClear();
  useStore.getState().patch({sound:false});
  await new Promise(resolve=>setTimeout(resolve,10));
  expect(useStore.getState().ready).toBe(false);expect(db.set).not.toHaveBeenCalled();
 });
 beforeEach(()=>{db.get.mockReset();db.set.mockClear();useStore.setState({...initial(),ready:false,saveError:''});});
 it('loads learning, decorations, positions and outfit without resetting them',async()=>{
  const saved={...initial(),progress:{7:{box:3,wrong:2,due:'2026-10-08'}},acorns:83,deco:[0,3],forestLayout:{0:{x:21.5,y:67},3:{x:81,y:43}},capyOutfit:['hat','scarf'],friends:[1,2],zoneStars:{1:3},unlocked:2};
  db.get.mockResolvedValue(saved);await useStore.getState().load();
  const state=useStore.getState();
  expect(db.get).toHaveBeenCalledWith('forest-v1');
  for(const key of ['progress','acorns','deco','forestLayout','capyOutfit','friends','zoneStars'] as const)expect(state[key]).toEqual(saved[key]);
  expect(state.unlocked).toBe(10);
 });
 it('moving one object preserves learning and other placements',async()=>{
  const saved={...initial(),acorns:42,deco:[0,1],forestLayout:{0:{x:20,y:30},1:{x:70,y:80}},capyOutfit:['bow'],dates:['2026-10-05']};
  db.get.mockResolvedValue(saved);await useStore.getState().load();
  useStore.getState().patch({forestLayout:{...saved.forestLayout,0:{x:44,y:55}}});
  await vi.waitFor(()=>expect(db.set).toHaveBeenCalled());
  expect(db.set.mock.calls.at(-1)?.[0]).toBe('forest-v1');
  expect(db.set.mock.calls.at(-1)?.[1]).toMatchObject({acorns:42,deco:[0,1],capyOutfit:['bow'],dates:['2026-10-05'],forestLayout:{0:{x:44,y:55},1:{x:70,y:80}}});
 });
});
