import {useEffect,useState} from 'react';
import {Download,Monitor,Smartphone,Apple,CheckCircle2,ExternalLink,Info,Share2,PlusSquare,Globe} from 'lucide-react';

type InstallPrompt=Event & {prompt:()=>Promise<void>;userChoice:Promise<{outcome:string}>};
type FileInfo={available:boolean;url:string|null;filename:string|null;format:string|null;bytes:number};
type Status={android:FileInfo;windows:FileInfo};
const windowsUrl=(import.meta.env.VITE_WINDOWS_DOWNLOAD_URL||'').trim();
const androidUrl=(import.meta.env.VITE_ANDROID_DOWNLOAD_URL||'').trim();
function allowedDownload(url:string){
 if(!url)return null;
 try{const u=new URL(url,location.origin);return u.protocol==='https:'||(u.protocol==='http:'&&u.origin===location.origin)?u.href:null}catch{return null}
}
const humanSize=(bytes:number)=>bytes>=1048576?`${(bytes/1048576).toFixed(1).replace('.',',')} MB`:`${Math.ceil(bytes/1024)} KB`;
export default function Downloads(){
 const [prompt,setPrompt]=useState<InstallPrompt|null>(null);
 const [installed,setInstalled]=useState(false);
 const [message,setMessage]=useState('');
 const [platform,setPlatform]=useState<'ios'|'android'|'pc'>('pc');
 const [repoFiles,setRepoFiles]=useState<Status|null>(null);
 const [checking,setChecking]=useState(true);
 useEffect(()=>{
  let mounted=true;
  fetch('/downloads-status.json',{cache:'no-store'}).then(r=>{
   if(!r.ok||!r.headers.get('content-type')?.includes('json'))return null;
   return r.json() as Promise<Status>;
  }).then(data=>{if(mounted)setRepoFiles(data)}).catch(()=>{}).finally(()=>{if(mounted)setChecking(false)});
  const agent=navigator.userAgent;
  setPlatform(/iPad|iPhone|iPod/.test(agent)||(/Macintosh/.test(agent)&&navigator.maxTouchPoints>1)?'ios':/Android/.test(agent)?'android':'pc');
  setInstalled(window.matchMedia('(display-mode: standalone)').matches||('standalone' in navigator&&Boolean((navigator as Navigator & {standalone?:boolean}).standalone)));
  const onBefore=(event:Event)=>{event.preventDefault();setPrompt(event as InstallPrompt)};
  const onInstalled=()=>{setInstalled(true);setPrompt(null)};
  window.addEventListener('beforeinstallprompt',onBefore);
  window.addEventListener('appinstalled',onInstalled);
  return()=>{mounted=false;window.removeEventListener('beforeinstallprompt',onBefore);window.removeEventListener('appinstalled',onInstalled)};
 },[]);
 const install=async()=>{
  if(!prompt){setMessage('Abra o menu do navegador e escolha Instalar aplicativo ou Adicionar à Tela de Início.');return}
  await prompt.prompt();const result=await prompt.userChoice;
  if(result.outcome==='accepted')setMessage('Instalação solicitada. Verifique seu dispositivo.');
  setPrompt(null);
 };
 const getFile=(key:'windows'|'android',manual:string)=>{
  const info=repoFiles?.[key];
  return {url:(info?.available&&info.url?allowedDownload(info.url):null)||allowedDownload(manual),info};
 };
 const windows=getFile('windows',windowsUrl),android=getFile('android',androidUrl);
 return <div className="stack downloads-page">
  <header className="page-head"><span className="eyebrow">HYPE SENSI • MULTIPLATAFORMA</span><h1>Downloads</h1><p>Use o Hype Sensi no Windows, Android ou iPhone/iPad. O site funciona no navegador de todos eles.</p></header>
  <section className="download-intro hype-card"><Globe size={25}/><div><h2>Hype Sensi Web</h2><p className="muted">Você já está usando a versão web, adaptada para PC, tablet e celular.</p><span className="download-state"><CheckCircle2 size={15}/> Disponível neste dispositivo</span></div></section>
  <div className="download-grid">
   <article className="hype-card download-tile"><div className="download-symbol"><Monitor size={31}/></div><span className="download-platform">DESKTOP · WINDOWS</span><h2>Windows 10 / 11</h2><p>Instale a versão Windows ou use este WebApp pelo navegador.</p>{windows.url?<a className="primary-action download-full" href={windows.url} download={windows.info?.available?windows.info.filename||undefined:undefined} rel="noopener noreferrer"><Download size={17}/> Baixar {windows.info?.available?'.'+windows.info.format?.toLowerCase():'Windows'} <ExternalLink size={13}/></a>:<div className="download-unavailable"><Info size={17}/><span>{checking?'Procurando instaladores...':'Instalador Windows ainda não publicado. Adicione .msixbundle, .msix ou .exe em downloads/windows/.'}</span></div>}<span className="download-footnote">{windows.info?.available?`${windows.info.filename} • ${humanSize(windows.info.bytes)}`:'Pacotes compatíveis: MSIXBundle, MSIX e EXE'}</span></article>
   <article className="hype-card download-tile"><div className="download-symbol"><Smartphone size={31}/></div><span className="download-platform">MOBILE · ANDROID</span><h2>Android</h2><p>Instale o WebApp pelo navegador ou baixe o APK oficial assim que ele estiver publicado.</p>{android.url?<a className="primary-action download-full" href={android.url} download={android.info?.available?android.info.filename||undefined:undefined} rel="noopener noreferrer"><Download size={17}/> Baixar APK <ExternalLink size={13}/></a>:<div className="download-unavailable"><Info size={17}/><span>{checking?'Procurando APK...':'O APK ainda não foi publicado. Adicione o arquivo .apk real em downloads/android/.'}</span></div>}<span className="download-footnote">{android.info?.available?`${android.info.filename} • ${humanSize(android.info.bytes)}`:'A versão web pode ser usada sem APK'}</span></article>
   <article className="hype-card download-tile"><div className="download-symbol"><Apple size={31}/></div><span className="download-platform">MOBILE · APPLE</span><h2>iPhone / iPad (iOS)</h2><p>Abra o site no Safari e adicione-o à Tela de Início.</p><div className="download-steps"><span><Share2 size={15}/> 1. Toque em Compartilhar</span><span><PlusSquare size={15}/> 2. Escolha Adicionar à Tela de Início</span><span><CheckCircle2 size={15}/> 3. Confirme Adicionar</span></div><span className="download-footnote">Instalação pelo Safari • iOS / iPadOS</span></article>
  </div>
  <section className="hype-card stack"><h2>Instalar o WebApp neste dispositivo</h2><p className="muted">Instalar a versão PWA é opcional e não exige o download de APK ou pacote Windows.</p>{installed?<div className="notice"><CheckCircle2 size={17}/> O WebApp já está aberto no modo instalado.</div>:platform==='ios'?<div className="notice"><Share2 size={17}/> Safari → Compartilhar → Adicionar à Tela de Início.</div>:<button type="button" className="primary-action install-action" onClick={install}><Download size={17}/> {prompt?'Instalar Hype Sensi':'Como instalar o WebApp'}</button>}{message&&<div className="notice" role="status">{message}</div>}</section>
  <p className="text-note">Os instaladores dependem dos arquivos reais no repositório ou de URLs HTTPS configuradas. A versão Android (.apk) precisa ser compilada e assinada separadamente.</p>
 </div>
}
