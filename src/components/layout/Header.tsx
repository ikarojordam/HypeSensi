import {Menu,Palette,Home,ChevronRight,Download,Sparkles} from 'lucide-react';
import {Link,useLocation} from 'react-router-dom';
const labels:Record<string,string>={'/':'Início','/dashboard':'Painel principal','/sensi':'Sensi IA','/hud-studio':'HUD Studio','/famosos':'Jogadores famosos','/adapt':'Hype Adapt','/perfis':'Meus Perfis','/temas':'Temas','/downloads':'Downloads','/configuracoes':'Configurações','/ajuda':'Perguntas frequentes','/termos':'Termos','/privacidade':'Privacidade'};
export default function Header({onMenu}:{onMenu:()=>void}){
 const {pathname}=useLocation();
 return <header className="topbar">
  <div className="topbar-left"><button aria-label="Abrir menu de navegação" className="mobile-menu" onClick={onMenu}><Menu size={22}/></button><div className="topbar-breadcrumb"><Link to="/" aria-label="Página inicial"><Home size={16}/></Link><ChevronRight size={14}/><strong>{labels[pathname]||'Perfil'}</strong></div></div>
  <div className="topbar-actions"><span className="topbar-online"><span/> WEB • ONLINE</span><Link className="topbar-download" to="/downloads" aria-label="Baixar Hype Sensi"><Download size={17}/><span>Downloads</span></Link><Link className="topbar-theme" to="/temas" title="Alterar tema"><Palette size={18}/></Link><span className="topbar-avatar" title="Hype Sensi"><Sparkles size={17}/></span></div>
 </header>
}
