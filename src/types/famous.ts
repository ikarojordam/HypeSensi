export interface Player { id: string; name: string; region: string; role: string; platform: string; hasPublishedData: boolean }
export type SensiValues = Record<'geral'|'red'|'x2'|'x4'|'awm'|'look',number>;
export interface Sensitivity {playerId: string; values:SensiValues; sourceId:string; verification:string}
export interface FamousHudData {playerId:string; code:string;sourceId:string;verification:string}
export interface Source {id:string; title:string; url:string; publishedAt:string;checkedAt:string|null;status:string}
