export const sensiKeys=['geral','red','x2','x4','awm','look'] as const;
export type SensiKey=typeof sensiKeys[number];
export type SensiValues=Record<SensiKey,number>;
export interface SensiProfile{id:string;name:string;platform:string;values:SensiValues;answers:Record<string,string>;created:string}
