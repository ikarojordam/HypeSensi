import {useEffect,useState} from 'react';
import {Link,Outlet} from 'react-router-dom';
import {Gauge,LoaderCircle,ArrowLeft} from 'lucide-react';

/** A tela de entrada aparece antes de montar a interface do Dashboard. */
const STARTUP_DURATION_MS=5000;

export default function DashboardStartup(){
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    const timeout=window.setTimeout(()=>setReady(true),STARTUP_DURATION_MS);
    return ()=>window.clearTimeout(timeout);
  },[]);

  if(ready)return <Outlet/>;

  return <div className="dashboard-startup" role="status" aria-live="polite" aria-label="Preparando o Dashboard Hype Sensi">
    <div className="dashboard-startup__glow" aria-hidden="true"/>
    <div className="dashboard-startup__card">
      <div className="dashboard-startup__symbol" aria-hidden="true">
        <Gauge size={43} strokeWidth={1.65}/>
      </div>
      <span className="dashboard-startup__eyebrow">HYPE SENSI · CONTROL CENTER</span>
      <h1>Preparando sua jornada</h1>
      <p>Organizando a interface do seu painel e suas ferramentas.</p>
      <div className="dashboard-startup__spinner" aria-hidden="true"><LoaderCircle size={25} strokeWidth={2.3}/></div>
      <div className="dashboard-startup__progress" role="progressbar" aria-label="Progresso de abertura" aria-valuemin={0} aria-valuemax={100}>
        <span className="dashboard-startup__progress-fill"/>
      </div>
      <span className="dashboard-startup__hint">O Dashboard abre em 5 segundos</span>
      <Link to="/" className="dashboard-startup__back"><ArrowLeft size={15}/> Voltar à página inicial</Link>
    </div>
  </div>;
}
