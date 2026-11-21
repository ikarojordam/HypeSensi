import type {SensiValues} from '../types/sensi';
const clamp=(v:number)=>Math.max(0,Math.min(200,Math.round(v)));
/** Transparente: configuração inicial orientativa, não acesso às configurações do jogo. */
export function calculateSensi(a:Record<string,string>):SensiValues{
 const speedDelta=a.speed==='Mais rápida'?14:a.speed==='Mais controlada'?-13:0;
 const aimDelta=a.aim==='Passa do alvo'?-13:a.aim==='Movimento muito lento'?12:a.aim==='Mira tremendo'?-10:a.aim==='Fica abaixo do alvo'?8:0;
 const dpiDelta=['1600','2400+'].includes(a.dpi)?-8:a.dpi==='400'?6:0;
 const motion=a.mouse==='Movimentos curtos'?5:a.mouse==='Movimentos longos'?-6:0;
 const fps=a.fps==='Quedas frequentes'?-8:a.fps==='Pequenas quedas'?-4:0;
 const intensity=a.adjust==='Conservador'?.55:a.adjust==='Mais perceptível'?1.2:1;
 const change=Math.round((speedDelta+aimDelta+dpiDelta+motion+fps)*intensity);
 const v=[160,168,151,137,88,130].map((x,i)=>clamp(x+Math.round(change*[1,1,.8,.6,.45,.65][i])));
 if(a.scope==='Ponto vermelho')v[1]=clamp(v[1]+4);if(a.scope==='Mira 2x')v[2]=clamp(v[2]+4);if(a.scope==='Mira 4x')v[3]=clamp(v[3]+4);if(a.scope==='AWM')v[4]=clamp(v[4]+4);
 return {geral:v[0],red:v[1],x2:v[2],x4:v[3],awm:v[4],look:v[5]};
}
