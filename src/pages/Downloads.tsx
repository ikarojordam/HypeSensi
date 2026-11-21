import {useEffect,useState} from 'react';
import {Download,Monitor,Smartphone,Apple,CheckCircle2,ExternalLink,Info,Share2,PlusSquare,Globe} from 'lucide-react';

type InstallPrompt = Event & {prompt:()=>Promise<void>;userChoice:Promise<{outcome:string}>};
const windowsUrl=(import.meta.env.VITE_WINDOWS_DOWNLOAD_URL||'').trim();
const androidUrl=(import.meta.env.VITE_ANDROID_DOWNLOAD_URL||'').trim();
function allowedDownload(url:string){try{const u=new URL(url,location.origin);return (u.protocol==='https:' || (u.origin===location.origin && u.protocol==='http:'))?u.href:null}catch{return null}}

export default function Downloads(){
 const [prompt,setPrompt]=useState<InstallPrompt|null>(null);
 const [installed,setInstalled]=useState(false);
 const [message,setMessage]=useState('');
 const [platform,setPlatform]=useState<'ios'|'android'|'pc'>('pc');
 useEffect(()=>{
   const agent=navigator.userAgent;
   setPlatform(/iPad|iPhone|iPod/.test(agent)||(/Macintosh/.test(agent)&&navigator.maxTouchPoints>1)?'ios':/Android/.test(agent)?'android':'pc');
   setInstalled(window.matchMedia('(display-mode: standalone)').matches || ('standalone' in navigator && Boolean((navigator as Navigator & {standalone?:boolean}).standalone)));
   const onBefore=(event:Event)=>{event.preventDefault();setPrompt(event as InstallPrompt)};
   const onInstalled=()=>{setInstalled(true);setPrompt(null)};
   window.addEventListener('beforeinstallprompt',onBefore);
   window.addEventListener('appinstalled',onInstalled);
   return()=>{window.removeEventListener('beforeinstallprompt',onBefore);window.removeEventListener('appinstalled',onInstalled)};
 },[]);
 const install=async()=>{if(!prompt){setMessage('O botão de instalação não está disponível neste navegador. Use o menu do navegador e escolha instalar ou adicionar à tela inicial.');return}await prompt.prompt();const result=await prompt.userChoice;if(result.outcome==='accepted')setMessage('Instalação solicitada. Verifique seu dispositivo.');setPrompt(null)};
 const windows=allowedDownload(windowsUrl);const android=allowedDownload(androidUrl);
 return <div className="stack downloads-page">
  <header className="page-head"><span className="eyebrow">HYPE SENSI • MULTIPLATAFORMA</span><h1>Downloads</h1><p>Use o Hype Sensi no Windows, Android ou iPhone/iPad. A versão web funciona diretamente no navegador de todos eles.</p></header>
  <section className="download-intro hype-card"><Globe size={25}/><div><h2>Hype Sensi Web</h2><p className="muted">Você já está usando a versão web. Ela é adaptada para PC, tablet e celular, sem precisar baixar um arquivo.</p><span className="download-state"><CheckCircle2 size={15}/> Disponível neste dispositivo</span></div></section>
  <div className="download-grid">
   <article className="hype-card download-tile"><div className="download-symbol"><Monitor size={31}/></div><span className="download-platform">DESKTOP</span><h2>Windows 10 / 11</h2><p>Instale a versão Desktop em um computador Windows de 64 bits, ou instale o WebApp como aplicativo pelo navegador.</p>{windows?<a className="primary-action download-full" href={windows} target="_blank" rel="noopener noreferrer"><Download size={17}/> Baixar .exe <ExternalLink size={13}/></a>:<div className="download-unavailable"><Info size={17}/><span>Download .exe ainda não configurado pelo administrador.</span></div>}<span className="download-footnote">Arquivo nativo: .exe • Windows x64</span></article>
   <article className="hype-card download-tile"><div className="download-symbol"><Smartphone size={31}/></div><span className="download-platform">CELULAR</span><h2>Android</h2><p>Abra o site no Chrome para instalar o WebApp ou baixe o APK oficial quando ele for publicado.</p>{android?<a className="primary-action download-full" href={android} target="_blank" rel="noopener noreferrer"><Download size={17}/> Baixar .apk <ExternalLink size={13}/></a>:<div className="download-unavailable"><Info size={17}/><span>APK ainda não publicado. Use a instalação web abaixo.</span></div>}<span className="download-footnote">WebApp: não precisa de APK</span></article>
   <article className="hype-card download-tile"><div className="download-symbol"><Apple size={31}/></div><span className="download-platform">APPLE</span><h2>iPhone / iPad (iOS)</h2><p>Abra este site no Safari e adicione-o à Tela de Início. O WebApp abre como um aplicativo, sem exigir arquivo APK.</p><div className="download-steps"><span><Share2 size={15}/> 1. Toque em Compartilhar</span><span><PlusSquare size={15}/> 2. Escolha Adicionar à Tela de Início</span><span><CheckCircle2 size={15}/> 3. Confirme Adicionar</span></div><span className="download-footnote">Instalação via Safari • iOS / iPadOS</span></article>
  </div>
  <section className="hype-card stack"><h2>Instalar o WebApp neste dispositivo</h2><p className="muted">A instalação PWA usa a mesma versão do site. Não é necessário baixar .exe ou .apk para acessar as funções web.</p>{installed?<div className="notice"><CheckCircle2 size={17}/> O WebApp já está aberto no modo instalado.</div>:platform==='ios'?<div className="notice"><Share2 size={17}/> No Safari: Compartilhar → Adicionar à Tela de Início. Se estiver em outro navegador, abra o site no Safari.</div>:<button type="button" className="primary-action install-action" onClick={install}><Download size={17}/> {prompt?'Instalar Hype Sensi':'Como instalar o WebApp'}</button>}{message&&<div className="notice" role="status">{message}</div>}</section>
  <p className="text-note">Downloads de .exe e .apk só serão liberados quando forem cadastrados links válidos para arquivos já publicados. A versão web não exige Edge ou WebView2; basta um navegador compatível.</p>
 </div>
}
