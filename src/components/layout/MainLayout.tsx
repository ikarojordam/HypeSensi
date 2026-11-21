import {useEffect,useState} from 'react';
import {Outlet,useLocation} from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
export default function MainLayout(){
 const [open,setOpen]=useState(false);const location=useLocation();
 useEffect(()=>{setOpen(false);window.scrollTo({top:0,behavior:'auto'})},[location.pathname]);
 useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};document.addEventListener('keydown',onKey);return()=>document.removeEventListener('keydown',onKey)},[]);
 return <div className="shell"><Sidebar open={open} onClose={()=>setOpen(false)}/><div className="main-col"><Header onMenu={()=>setOpen(o=>!o)}/><main className="main-content"><div key={location.pathname} className="route-enter"><Outlet/></div></main><footer className="app-footer">HYPE SENSI <span>•</span> PRECISION PLATFORM <span>•</span> Frio Mortal Developer · FrioStore</footer></div></div>
}
