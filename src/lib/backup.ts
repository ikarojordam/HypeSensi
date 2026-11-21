import {downloadJson,getStored,store} from './storage';
import type {SensiProfile} from '../types/sensi';
import type {HudProfile} from '../types/hud';
export const sensiStorage='hype-react-sensis';
export function exportBackup(){downloadJson({app:'Hype Sensi WebApp',format:2,date:new Date().toISOString(),sensis:getStored<SensiProfile[]>(sensiStorage,[]),huds:getStored<HudProfile[]>('hype-react-huds',[]),favorites:getStored<string[]>('hype-react-favorites',[]),theme:getStored<string>('hype-theme','purple')},'HypeSensi-backup.json')}
export async function importBackup(file:File):Promise<void>{
 if(file.size>5_000_000)throw Error('Arquivo excede 5 MB.');
 const data:unknown=JSON.parse(await file.text());
 if(!data||typeof data!=='object')throw Error('Arquivo inválido.');
 const d=data as Record<string,unknown>;
 if(d.app!=='Hype Sensi WebApp'||d.format!==2||!Array.isArray(d.sensis)||!Array.isArray(d.huds)||!Array.isArray(d.favorites))throw Error('Backup incompatível.');
 const sensis=d.sensis.filter((x:unknown)=>{if(!x||typeof x!=='object')return false;const r=x as Record<string,unknown>;return typeof r.name==='string'&&r.name.length<=120&&r.values&&typeof r.values==='object'&&Object.values(r.values).every(v=>typeof v==='number'&&Number.isInteger(v)&&v>=0&&v<=200)}).slice(0,500);
 const huds=d.huds.filter((x:unknown)=>{if(!x||typeof x!=='object')return false;const r=x as Record<string,unknown>;return typeof r.name==='string'&&r.name.length<=120&&Array.isArray(r.controls)&&r.controls.length<=100&&r.controls.every((c:unknown)=>c&&typeof c==='object'&&typeof (c as Record<string,unknown>).id==='string')}).slice(0,200);
 store(sensiStorage,sensis);store('hype-react-huds',huds);store('hype-react-favorites',d.favorites.filter((x:unknown)=>typeof x==='string').slice(0,500));
 if(typeof d.theme==='string'&&['purple','obsidian','frost','crimson','emerald','gold'].includes(d.theme))store('hype-theme',d.theme);
}
