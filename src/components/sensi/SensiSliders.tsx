import {sensiKeys,type SensiValues,type SensiKey} from '../../types/sensi';
export const labels:Record<SensiKey,string>={geral:'Geral',red:'Ponto vermelho',x2:'Mira 2x',x4:'Mira 4x',awm:'AWM',look:'Olhadinha'};
export default function SensiSliders({values,onChange}:{values:SensiValues;onChange:(next:SensiValues)=>void}){return <div>{sensiKeys.map(k=><label className="field-range" key={k}><div><span>{labels[k]}</span><strong>{values[k]}</strong></div><input type="range" min={0} max={200} value={values[k]} onChange={e=>onChange({...values,[k]:Number(e.target.value)})}/></label>)}</div>}
