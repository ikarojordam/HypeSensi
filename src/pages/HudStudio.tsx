import {useEffect,useState} from 'react';
import HudCanvas,{type HudControl} from '../components/hud/HudCanvas';
import HudControls from '../components/hud/HudControls';
import HudToolbar from '../components/hud/HudToolbar';
import {downloadJson,getStored,store} from '../lib/storage';
const template:HudControl[]=[
 {id:'move',label:'Movimento',x:14,y:71,size:18,opacity:80,visible:true},
 {id:'fire',label:'Disparar',x:81,y:68,size:14,opacity:85,visible:true},
 {id:'fireleft',label:'Disparo Esq.',x:18,y:25,size:10,opacity:75,visible:true},
 {id:'ads',label:'Mira',x:75,y:27,size:10,opacity:80,visible:true},
 {id:'jump',label:'Pular',x:91,y:41,size:10,opacity:75,visible:true},
 {id:'crouch',label:'Agachar',x:68,y:80,size:10,opacity:75,visible:true},
 {id:'prone',label:'Deitar',x:59,y:86,size:9,opacity:75,visible:true},
 {id:'sprint',label:'Correr',x:28,y:52,size:10,opacity:80,visible:true},
 {id:'reload',label:'Recarregar',x:85,y:87,size:10,opacity:75,visible:true},
 {id:'gloo',label:'Parede de gel',x:58,y:56,size:12,opacity:80,visible:true},
 {id:'grenade',label:'Granada',x:70,y:57,size:10,opacity:75,visible:true},
 {id:'med',label:'Kit médico',x:45,y:82,size:10,opacity:75,visible:true},
 {id:'skill',label:'Habilidade',x:50,y:66,size:10,opacity:75,visible:true},
 {id:'backpack',label:'Mochila',x:90,y:10,size:10,opacity:65,visible:true},
 {id:'weapons',label:'Troca arma',x:61,y:13,size:15,opacity:80,visible:true},
 {id:'interact',label:'Interagir',x:41,y:47,size:11,opacity:75,visible:true},
 {id:'emote',label:'Emotes',x:38,y:11,size:10,opacity:75,visible:true},
 {id:'map',label:'Mini-mapa',x:13,y:14,size:18,opacity:60,visible:true}
];
interface HudProfile {id:string;name:string;fingers:number;controls:HudControl[]}
const savedKey='hype-react-huds';
export default function HudStudio(){
 const [profiles,setProfiles]=useState<HudProfile[]>(()=>getStored(savedKey,[]));
 const [controls,setControls]=useState<HudControl[]>(()=>template.map(x=>({...x})));
 const [selected,setSelected]=useState('fire');
 const [fingers,setFingers]=useState(4);
 const [name,setName]=useState('Meu HUD');
 const [message,setMessage]=useState('');
 useEffect(()=>store(savedKey,profiles),[profiles]);
 const change=(id:string,patch:Partial<HudControl>)=>setControls(old=>old.map(c=>c.id===id?{...c,...patch}:c));
 function save(){const item:HudProfile={id:globalThis.crypto?.randomUUID?.()||String(Date.now()),name:name.trim()||'Meu HUD',fingers,controls:controls.map(c=>({...c}))};setProfiles(old=>[item,...old]);setMessage('HUD salvo neste navegador.')}
 function load(p:HudProfile){setControls(p.controls.map(c=>({...c})));setFingers(p.fingers);setName(p.name);setSelected(p.controls[0]?.id||'');setMessage('HUD carregado.')}
 return <><header className="page-head"><span className="eyebrow">EDITOR VISUAL</span><h1>HUD Studio</h1><p>Arraste os controles, altere posição, tamanho e opacidade. Salve layouts no navegador e exporte em JSON.</p></header><HudToolbar name={name} setName={setName} fingers={fingers} setFingers={setFingers} onSave={save} onExport={()=>downloadJson({name,fingers,controls},'hypesensi-hud.json')}/><div className="hud-grid"><div className="panel"><div className="canvas-header"><strong>Visualização do HUD</strong><span>{controls.length} controles</span></div><HudCanvas controls={controls} selected={selected} onSelect={setSelected} onMove={(id,x,y)=>change(id,{x,y})}/><p className="muted note">Representação editável da Hype Sensi. Não gera códigos oficiais do Free Fire.</p></div><div><HudControls items={controls} selected={selected} onSelect={setSelected} onChange={change}/><button className="secondary-action" onClick={()=>{setControls(template.map(c=>({...c})));setMessage('Layout restaurado.')}}>Restaurar padrão</button></div></div>{message&&<p className="notice" role="status">{message}</p>}<section className="panel saved-huds"><h3>HUDs salvos ({profiles.length})</h3>{profiles.length===0?<p className="muted">Nenhum HUD salvo ainda.</p>:profiles.map(p=><div className="profile-row" key={p.id}><strong>{p.name}</strong><span>{p.fingers} dedos</span><button onClick={()=>load(p)}>Abrir</button><button className="outline" onClick={()=>setProfiles(old=>old.filter(x=>x.id!==p.id))}>Excluir</button></div>)}</section></>;
}
