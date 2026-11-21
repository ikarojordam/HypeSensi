import {Menu,Palette} from 'lucide-react';
import {Link,useLocation} from 'react-router-dom';
export default function Header({onMenu}:{onMenu:()=>void}){const {pathname}=useLocation();return <header className="topbar"><button aria-label="Abrir menu" className="mobile-menu" onClick={onMenu}><Menu/></button><span>Hype Sensi <small>/ {pathname==='/'?'Início':pathname.slice(1).replaceAll('-',' ')}</small></span><Link className="local-badge" to="/temas" title="Personalizar tema"><Palette size={14} style={{verticalAlign:'middle',marginRight:6}}/>WEBAPP</Link></header>}
