import type {SensiValues} from '../../types/sensi';
import SensiSliders from './SensiSliders';
import {labels} from './SensiSliders';
import {sensiKeys} from '../../types/sensi';
export default function SensiResult({values,onChange,onSave,onReset}:{values:SensiValues;onChange:(v:SensiValues)=>void;onSave:()=>void;onReset:()=>void}){return <section className="hype-card stack"><span className="eyebrow">HYPE ADAPT • EMULADOR</span><h2>Sensibilidade inicial</h2><SensiSliders values={values} onChange={onChange}/><div className="action-buttons"><button className="primary-action" onClick={onSave}>Salvar sensi</button><button className="secondary-action" onClick={()=>void navigator.clipboard?.writeText(sensiKeys.map(k=>labels[k]+': '+values[k]).join('\n'))}>Copiar</button><button className="secondary-action" onClick={onReset}>Refazer quiz</button></div><p className="text-note">Os valores são orientativos. Aplique manualmente no Free Fire e ajuste conforme sua preferência.</p></section>}
