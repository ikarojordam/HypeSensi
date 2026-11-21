import {useEffect,useRef,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {X,ArrowLeft,ArrowRight,CheckCircle2,Play,MonitorSmartphone,SlidersHorizontal,LayoutTemplate,Save,Download,HelpCircle} from 'lucide-react';

const steps=[
 {title:'Bem-vindo ao Hype Sensi',subtitle:'Seu ponto de partida',icon:MonitorSmartphone,description:'A Hype Sensi é um site responsivo para PC, Android e iPhone/iPad. Você pode usar as ferramentas diretamente no navegador e, quando compatível, instalar o site como WebApp.',tip:'Não é necessário criar uma conta para começar.'},
 {title:'Inicie sua configuração',subtitle:'Passo 1 de uso',icon:Play,description:'Clique em Iniciar configuração na página inicial. Você será levado à Sensi IA para responder perguntas sobre seu dispositivo e sobre como prefere jogar.',tip:'Responda com informações reais para receber um ponto de partida mais adequado.'},
 {title:'Gere e teste sua sensibilidade',subtitle:'Sensi IA',icon:SlidersHorizontal,description:'O questionário cria valores iniciais na escala de 0 a 200. Você pode ajustar cada opção, copiar os resultados e aplicá-los manualmente nas configurações do Free Fire.',tip:'Nenhuma configuração é aplicada automaticamente no jogo; teste e ajuste com calma.'},
 {title:'Personalize seu HUD',subtitle:'HUD Studio',icon:LayoutTemplate,description:'Abra o HUD Studio para organizar controles, alterar tamanho e transparência e salvar seu layout. O editor cria uma referência visual, não um código oficial do jogo.',tip:'Se estiver no celular, confira o layout na orientação desejada antes de salvar.'},
 {title:'Salve e faça backup',subtitle:'Meus Perfis',icon:Save,description:'Use Meus Perfis para recuperar sensibilidades e HUDs salvos no navegador. Em Configurações, exporte um backup para não perder seus ajustes ao trocar ou limpar o dispositivo.',tip:'O armazenamento é local: não há sincronização automática entre aparelhos.'},
 {title:'Downloads e ajuda',subtitle:'Pronto para explorar',icon:Download,description:'Na aba Downloads você encontra instruções para instalar o WebApp no Android, iOS e PC, além dos links para os aplicativos quando publicados. A FAQ responde às principais dúvidas.',tip:'O site funciona no navegador mesmo sem instalar nada.'}
];

export default function TutorialModal({onClose}:{onClose:()=>void}){
 const [step,setStep]=useState(0);
 const closeRef=useRef<HTMLButtonElement>(null);
 const navigate=useNavigate();
 useEffect(()=>{closeRef.current?.focus();const key=(ev:KeyboardEvent)=>{if(ev.key==='Escape')onClose()};document.addEventListener('keydown',key);const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.removeEventListener('keydown',key);document.body.style.overflow=old}},[onClose]);
 const current=steps[step];const Icon=current.icon;
 const start=()=>{onClose();navigate('/sensi')};
 return <div className="tutorial-overlay" onMouseDown={event=>{if(event.target===event.currentTarget)onClose()}}>
 <section role="dialog" aria-modal="true" aria-labelledby="tutorial-title" aria-describedby="tutorial-description" className="tutorial-modal">
  <header className="tutorial-modal-top"><span className="eyebrow">HYPE SENSI • GUIA INTERATIVO</span><button ref={closeRef} type="button" className="tutorial-close" onClick={onClose} aria-label="Fechar tutorial"><X size={21}/></button></header>
  <div className="tutorial-progress" aria-label={'Etapa '+(step+1)+' de '+steps.length}>{steps.map((s,index)=><button key={s.title} type="button" onClick={()=>setStep(index)} aria-label={'Ir para '+s.subtitle} aria-current={index===step?'step':undefined} className={'tutorial-dot '+(index<=step?'filled':'')}/>)}</div>
  <div className="tutorial-content"><div className="tutorial-symbol"><Icon size={32}/></div><p className="tutorial-kicker">{current.subtitle} • {step+1}/{steps.length}</p><h2 id="tutorial-title">{current.title}</h2><p id="tutorial-description">{current.description}</p><div className="tutorial-tip"><CheckCircle2 size={17}/><span>{current.tip}</span></div></div>
  <footer className="tutorial-actions"><button type="button" className="secondary-action" onClick={()=>step?setStep(n=>n-1):onClose()}><ArrowLeft size={17}/>{step?'Voltar':'Agora não'}</button>{step===steps.length-1?<button type="button" className="primary-action" onClick={start}><Play size={17}/> Iniciar configuração</button>:<button type="button" className="primary-action" onClick={()=>setStep(n=>n+1)}>Próximo <ArrowRight size={17}/></button>}</footer>
  <div className="tutorial-modal-footer"><HelpCircle size={14}/> Você pode repetir este tutorial em Configurações ou na página inicial.</div>
 </section></div>
}
