import {useEffect,useState} from 'react';
import {Navigate,Route,Routes} from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import {ThemeContext,themeValues,type ThemeId} from './hooks/useTheme';
import {getStored,store} from './lib/storage';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SensiIA from './pages/SensiIA';
import HudStudio from './pages/HudStudio';
import Famous from './pages/Famous';
import FamousProfile from './pages/FamousProfile';
import HypeAdapt from './pages/HypeAdapt';
import SavedProfiles from './pages/SavedProfiles';
import Themes from './pages/Themes';
import Settings from './pages/Settings';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
export default function App(){const [theme,setTheme]=useState<ThemeId>(()=>{const stored=getStored('hype-theme','purple');return stored in themeValues?stored as ThemeId:'purple'});useEffect(()=>{store('hype-theme',theme);const colors=themeValues[theme];const css=['--h-accent','--h-soft','--h-bg','--h-panel','--h-surface','--h-border'];for(let i=0;i<css.length;i++)document.documentElement.style.setProperty(css[i],colors[i+1]);document.documentElement.style.backgroundColor=colors[3];document.documentElement.dataset.hypeTheme=theme},[theme]);useEffect(()=>{document.documentElement.dataset.animations=getStored('hype-animations',true)?'on':'off'},[]);return <ThemeContext.Provider value={{theme,setTheme}}><Routes><Route element={<MainLayout/>}><Route path="/" element={<Home/>}/><Route path="/dashboard" element={<Dashboard/>}/><Route path="/sensi" element={<SensiIA/>}/><Route path="/hud-studio" element={<HudStudio/>}/><Route path="/famosos" element={<Famous/>}/><Route path="/famosos/:id" element={<FamousProfile/>}/><Route path="/adapt" element={<HypeAdapt/>}/><Route path="/perfis" element={<SavedProfiles/>}/><Route path="/temas" element={<Themes/>}/><Route path="/configuracoes" element={<Settings/>}/><Route path="/ajuda" element={<FAQ/>}/><Route path="/termos" element={<Terms/>}/><Route path="/privacidade" element={<Privacy/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Route></Routes></ThemeContext.Provider>}
