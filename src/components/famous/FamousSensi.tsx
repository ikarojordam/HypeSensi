import type {Sensitivity,Source} from '../../types/famous';
const labels:Record<string,string>={geral:'Geral',red:'Ponto vermelho',x2:'Mira 2x',x4:'Mira 4x',awm:'AWM',look:'Olhadinha'};
export default function FamousSensi({data,source}:{data?:Sensitivity;source?:Source}){
 if(!data)return <section className="panel"><h3>Sensibilidade</h3><p className="muted">Nenhum valor publicado foi cadastrado para este jogador.</p></section>;
 return <section className="panel"><h3>Sensibilidade</h3><p className="muted warning">Dados informados por terceiro; autenticidade e validade atual não verificadas.</p>{Object.entries(data.values).map(([k,v])=><div className="sensi-row" key={k}><span>{labels[k]||k}</span><strong>{v}</strong><div className="sensi-track"><span style={{width:`${Math.max(0,Math.min(100,v/2))}%`}}/></div></div>)}<button type="button" onClick={()=>{void navigator.clipboard?.writeText(Object.entries(data.values).map(([k,v])=>`${labels[k]}: ${v}`).join('\n'))}}>Copiar sensibilidade</button>{source&&<a href={source.url} target="_blank" rel="noopener noreferrer">Fonte informada</a>}</section>;
}
