import {useState} from 'react';
import {Outlet} from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
export default function MainLayout(){const [open,setOpen]=useState(false);return <div className="shell"><Sidebar open={open} onClose={()=>setOpen(false)}/><div className="main-col"><Header onMenu={()=>setOpen(o=>!o)}/><main className="main-content"><Outlet/></main><footer className="app-footer">Hype Sensi WebApp · Feito com esforço e café · FrioStore</footer></div></div>}
