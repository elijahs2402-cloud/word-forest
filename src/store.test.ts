import {beforeEach,describe,expect,it,vi} from 'vitest';
const db=vi.hoisted(()=>({get:vi.fn(),set:vi.fn().mockResolvedValue(undefined)}));
vi.mock('idb-keyval',()=>db);
import {initial,useStore} from './store';

describe('redesign preserves existing forest records',()=>{
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
