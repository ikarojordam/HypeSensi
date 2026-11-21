import {useCallback,useEffect,useState} from 'react';
import {Link,useSearchParams} from 'react-router-dom';
import {ArrowRight,BookOpen,CheckCircle2,ChevronRight,CircleHelp,Download,Grid2X2,MonitorSmartphone,Play,Save,ShieldCheck,SlidersHorizontal,Star,WandSparkles} from 'lucide-react';
import {useTheme} from '../hooks/useTheme';
import TutorialModal from '../components/onboarding/TutorialModal';

const tutorialKey='hype-tutorial-seen-v1';
const features=[
 {to:'/sensi',Icon:WandSparkles,title:'Sensi IA',description:'Responda ao questionário e gere uma sensibilidade inicial editável.'},
 {to:'/hud-studio',Icon:Grid2X2,title:'HUD Studio',description:'Personalize controles, posições, tamanho e transparência do seu HUD.'},
 {to:'/adapt',Icon:SlidersHorizontal,title:'Hype Adapt',description:'Refine seus valores depois de testar os ajustes no jogo.'},
 {to:'/famosos',Icon:Star,title:'Jogadores famosos',description:'Consulte perfis e dados disponíveis com suas referências.'},
 {to:'/perfis',Icon:Save,title:'Meus perfis',description:'Salve suas configurações e organize seus ajustes localmente.'},
 {to:'/downloads',Icon:Download,title:'Downloads',description:'Instale o WebApp ou acesse os aplicativos quando publicados.'}
];
const flow=[
 {n:'01',title:'Conte sobre seu dispositivo',text:'Abra a Sensi IA e informe dados como plataforma, DPI e estilo de jogo, conforme as perguntas do quiz.'},
 {n:'02',title:'Receba sua sensibilidade',text:'Confira os valores de referência de 0 a 200. Ajuste-os manualmente conforme sua preferência.'},
 {n:'03',title:'Configure no jogo e teste',text:'Copie os valores para as configurações do Free Fire. O site não altera o jogo automaticamente.'},
 {n:'04',title:'Personalize e salve',text:'Use o HUD Studio, faça calibrações com Hype Adapt e guarde seus perfis e backups.'}
];
const quickFaq=[
 ['A Hype Sensi funciona em celular e computador?','Sim. A versão web é adaptada para Windows, Android e iOS em navegadores modernos. Algumas ferramentas são específicas para emulador.'],
 ['Preciso baixar algo para começar?','Não. A versão web funciona diretamente pelo navegador. Na aba Downloads há opções de instalação como aplicativo quando disponíveis.'],
 ['A sensibilidade é aplicada automaticamente?','Não. O sistema sugere configurações iniciais. Você deve testar e aplicar os valores manualmente no jogo.'],
 ['Meus perfis ficam salvos onde?','Neste navegador, no armazenamento local do dispositivo. Exporte um backup em Configurações para preservar os dados.']
];
export default function Home(){
 const {theme}=useTheme();const [params,setParams]=useSearchParams();
 const [tutorialOpen,setTutorialOpen]=useState(false);
 useEffect(()=>{let seen=false;try{seen=localStorage.getItem(tutorialKey)==='yes'}catch{};if(params.get('tutorial')==='1'||!seen)setTutorialOpen(true)},[params]);
 const closeTutorial=useCallback(()=>{try{localStorage.setItem(tutorialKey,'yes')}catch{}setTutorialOpen(false);if(params.has('tutorial')){const next=new URLSearchParams(params);next.delete('tutorial');setParams(next,{replace:true})}},[params,setParams]);
 return <div className="stack welcome-page">
  <section className="welcome-hero hype-card"><div className="welcome-hero-copy"><span className="eyebrow">HYPE SENSI • CONFIGURAÇÃO PERSONALIZADA</span><div className="welcome-pill"><CheckCircle2 size={14}/> Disponível na Web • Android • iOS • PC</div><h1>Bem-vindo à <span>Hype Sensi.</span></h1><p>Personalize sua experiência no Free Fire com ferramentas para criar sensibilidades, organizar HUDs, conhecer configurações de jogadores e salvar seus ajustes em um só lugar.</p><p className="welcome-detail">Comece pelo questionário de sensibilidade. Ele considera suas respostas para sugerir valores iniciais que você poderá testar e adaptar ao seu estilo.</p><div className="welcome-actions"><Link className="primary-action welcome-primary" to="/sensi"><Play size={18}/> Iniciar configuração <ArrowRight size={17}/></Link><button type="button" className="secondary-action" onClick={()=>setTutorialOpen(true)}><BookOpen size={17}/> Ver tutorial em popup</button></div><span className="welcome-fineprint"><ShieldCheck size={14}/> Sem modificar o jogo • Sem login obrigatório • Perfis locais</span></div><div className="welcome-hero-brand"><img alt="Logo Hype Sensi" src={'/assets/imagens/logos/logo-'+theme+'.png'}/><strong>HYPE SENSI</strong><span>PRECISION PLATFORM</span><span className="welcome-brand-caption">Um painel. Suas configurações.</span></div></section>
  <section className="welcome-section"><div className="welcome-heading"><div><span className="eyebrow">GUIA DE INÍCIO</span><h2>Como funciona, passo a passo</h2><p>Você pode fazer tudo no próprio site, sem precisar instalar um programa para começar.</p></div><button type="button" className="secondary-action" onClick={()=>setTutorialOpen(true)}><BookOpen size={16}/> Abrir guia</button></div><div className="welcome-steps">{flow.map(s=><article className="hype-card welcome-step" key={s.n}><span className="welcome-step-index">{s.n}</span><h3>{s.title}</h3><p>{s.text}</p></article>)}</div></section>
  <section className="welcome-section"><div className="welcome-heading"><div><span className="eyebrow">PAINEL DE FERRAMENTAS</span><h2>O que você pode fazer</h2><p>Escolha uma ferramenta ou continue direto para o painel completo.</p></div><Link to="/dashboard" className="secondary-action">Ver painel <ChevronRight size={16}/></Link></div><div className="welcome-feature-grid">{features.map(({to,Icon,title,description})=><Link key={to} to={to} className="hype-card welcome-feature"><div className="welcome-feature-icon"><Icon size={22}/></div><strong>{title}</strong><p>{description}</p><span>Explorar <ArrowRight size={14}/></span></Link>)}</div></section>
  <section className="hype-card welcome-platform"><MonitorSmartphone size={28}/><div><h2>Uma plataforma, três tipos de dispositivo</h2><p>Use o site no computador, Android ou iPhone/iPad. A aba Downloads explica como instalar o WebApp e disponibiliza links de aplicativos quando estiverem publicados.</p></div><Link className="secondary-action" to="/downloads"><Download size={16}/> Downloads</Link></section>
  <section className="welcome-section"><div className="welcome-heading"><div><span className="eyebrow">DÚVIDAS FREQUENTES</span><h2>Perguntas frequentes</h2><p>As respostas mais importantes antes de começar.</p></div><Link className="secondary-action" to="/ajuda"><CircleHelp size={16}/> FAQ completo</Link></div><div className="hype-card welcome-faq">{quickFaq.map(([question,answer])=><details key={question} className="faq-item"><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
  <section className="welcome-final"><div><span className="eyebrow">PRONTO PARA COMEÇAR?</span><h2>Sua configuração começa aqui.</h2><p>Responda ao quiz e descubra os ajustes iniciais para testar.</p></div><Link to="/sensi" className="primary-action"><Play size={17}/> Iniciar configuração</Link></section>
  {tutorialOpen&&<TutorialModal onClose={closeTutorial}/>}
 </div>
}
