import {useCallback,useEffect,useState} from 'react';
import {Link,useSearchParams} from 'react-router-dom';
import {Crosshair,LayoutGrid,Star,SlidersHorizontal,Bookmark,Palette,HelpCircle,Download,BookOpen,Play} from 'lucide-react';
import TutorialModal from '../components/onboarding/TutorialModal';
import {getStored} from '../lib/storage';
import type {SensiProfile} from '../types/sensi';
import type {HudProfile} from '../types/hud';

const TUTORIAL_KEY='hype-tutorial-seen-v1';
const entries=[['/sensi','Sensi IA','Questionário Android, iOS e PC e sensibilidade inicial.',Crosshair],['/hud-studio','HUD Studio','Arraste e edite controles de HUD.',LayoutGrid],['/famosos','Famosos','Biblioteca com fontes de referência.',Star],['/adapt','Hype Adapt','Calibração após testes no jogo.',SlidersHorizontal],['/perfis','Meus Perfis','Gerencie perfis salvos.',Bookmark],['/temas','Temas','Seis identidades visuais.',Palette],['/downloads','Downloads','Windows, Android e iOS.',Download],['/ajuda','Ajuda','Dúvidas frequentes.',HelpCircle]] as const;
export default function Dashboard(){
 const [params,setParams]=useSearchParams();
 const [tutorialOpen,setTutorialOpen]=useState(false);
 useEffect(()=>{let seen=false;try{seen=localStorage.getItem(TUTORIAL_KEY)==='yes'}catch{};if(params.get('tutorial')==='1'||!seen)setTutorialOpen(true)},[params]);
 const closeTutorial=useCallback(()=>{
  try{localStorage.setItem(TUTORIAL_KEY,'yes')}catch{}
  setTutorialOpen(false);
  if(params.has('tutorial')){const next=new URLSearchParams(params);next.delete('tutorial');setParams(next,{replace:true})}
 },[params,setParams]);
 const sensis=getStored<SensiProfile[]>('hype-react-sensis',[]),huds=getStored<HudProfile[]>('hype-react-huds',[]),favorites=getStored<string[]>('hype-react-favorites',[]);
 return <><header className="page-head"><span className="eyebrow">CENTRAL DE FERRAMENTAS</span><h1>Seu Dashboard Hype Sensi</h1><p>Agora é hora de configurar sua sensibilidade. Explore as ferramentas ou siga o guia interativo.</p><div className="action-buttons"><Link to="/sensi" className="primary-action"><Play size={16}/> Iniciar configuração</Link><button type="button" className="secondary-action" onClick={()=>setTutorialOpen(true)}><BookOpen size={16}/> Repetir tutorial</button></div></header><div className="feature-grid">{entries.map(([link,title,desc,Icon])=><Link className="hype-card feature-tile" key={link} to={link}><Icon size={25}/><strong>{title}</strong><small>{desc}</small></Link>)}</div><h2 className="section-label">SEUS DADOS</h2><div className="stats-grid">{[[sensis.length,'Sensis salvas'],[huds.length,'HUDs salvos'],[favorites.length,'Favoritos']].map(([n,label])=><div className="hype-card stack" key={label}><strong style={{fontSize:30}}>{n}</strong><small className="text-note">{label}</small></div>)}</div>{tutorialOpen&&<TutorialModal onClose={closeTutorial}/>}</>;
}
