import {useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight,CheckCircle2,ChevronDown,Crosshair,Download,Grid2X2,Menu,MonitorSmartphone,Save,ShieldCheck,SlidersHorizontal,Sparkles,Star,X} from 'lucide-react';
import {useTheme} from '../hooks/useTheme';
import Downloads from './Downloads';

const how=[
 {num:'01',title:'Comece sua jornada',text:'Entre no Dashboard e conheça todas as ferramentas em um só lugar. O tutorial explica cada etapa na sua primeira entrada.'},
 {num:'02',title:'Escolha o dispositivo',text:'No quiz, informe se joga no Android, iPhone/iPad ou PC/Emulador. As perguntas mudam de acordo com sua plataforma.'},
 {num:'03',title:'Gere e ajuste a sensi',text:'Responda sobre sua maneira de jogar e receba valores iniciais de 0 a 200. Teste e aplique manualmente no Free Fire.'},
 {num:'04',title:'Personalize e salve',text:'Crie o HUD no editor, faça ajustes no Hype Adapt e guarde seus perfis e backups no dispositivo.'}
];
const highlights=[
 {icon:Crosshair,title:'Sensi IA',detail:'Quiz inteligente com caminhos próprios para Android, iOS e PC.'},
 {icon:Grid2X2,title:'HUD Studio',detail:'Organize controles com tamanho, posição e transparência.'},
 {icon:SlidersHorizontal,title:'Hype Adapt',detail:'Refine sua sensibilidade depois de testar.'},
 {icon:Star,title:'Jogadores famosos',detail:'Consulte a biblioteca e as referências disponíveis.'},
 {icon:Save,title:'Perfis e backups',detail:'Salve no navegador e exporte suas configurações.'},
 {icon:Download,title:'Downloads',detail:'WebApp, APK Android e versão Windows quando publicados.'}
];
const faqs=[
 ['O que é a Hype Sensi?','É uma plataforma independente para criar uma sensibilidade inicial, organizar HUDs e salvar perfis para Free Fire.'],
 ['Funciona em Android, iOS e computador?','Sim. A versão Web funciona nos três tipos de dispositivo. O quiz apresenta perguntas diferentes para celular e para PC/Emulador.'],
 ['Preciso instalar alguma coisa?','Não. O site funciona direto no navegador. Você também pode instalar o WebApp e consultar os downloads de aplicativos.'],
 ['A Hype Sensi altera meu jogo automaticamente?','Não. Você aplica manualmente as configurações que decidiu testar no Free Fire.'],
 ['Quando o tutorial aparece?','Na primeira vez que você entra no Dashboard após clicar em Começar Jornada. Depois de fechar ou concluir, ele não aparece de novo automaticamente no mesmo navegador.'],
 ['Posso repetir o tutorial?','Sim. Acesse Configurações → Repetir tutorial, ou o botão de tutorial no Dashboard.'],
 ['Como faço o download do APK?','Quando o APK real for colocado em downloads/android/HypeSensi-Android.apk e o site for publicado, o botão de APK será habilitado automaticamente.'],
 ['Onde ficam as configurações salvas?','No armazenamento local do navegador usado. Exporte um backup antes de limpar os dados ou trocar de aparelho.']
];
export default function Landing(){
 const {theme}=useTheme();const [mobileMenu,setMobileMenu]=useState(false);
 const close=()=>setMobileMenu(false);
 return <div className="public-site">
  <header className="public-nav"><Link to="/" className="public-brand" aria-label="Hype Sensi - página inicial"><img src={'/assets/imagens/logos/logo-'+theme+'.png'} alt=""/><span>HYPE <strong>SENSI</strong></span></Link><button className="public-menu-trigger" type="button" aria-label={mobileMenu?'Fechar menu':'Abrir menu'} aria-expanded={mobileMenu} onClick={()=>setMobileMenu(v=>!v)}>{mobileMenu?<X size={23}/>:<Menu size={23}/>}</button><nav className={'public-nav-links '+(mobileMenu?'show':'')} aria-label="Navegação da página pública"><a href="#como-funciona" onClick={close}>Como funciona</a><a href="#ferramentas" onClick={close}>Ferramentas</a><a href="#faq" onClick={close}>FAQ</a><a href="#downloads" onClick={close}>Downloads</a><Link onClick={close} className="public-nav-start" to="/dashboard">Entrar no Dashboard <ArrowRight size={16}/></Link></nav></header>
  <main>
   <section className="public-hero" id="inicio"><div className="public-aura public-aura-a"/><div className="public-aura public-aura-b"/><div className="public-hero-content"><span className="public-chip"><Sparkles size={15}/> SUA EXPERIÊNCIA COMEÇA AQUI</span><img className="public-hero-logo" src={'/assets/imagens/logos/logo-'+theme+'.png'} alt="Logo Hype Sensi"/><h1>Eleve sua experiência com a <span>Hype Sensi.</span></h1><p>Uma plataforma completa para personalizar a sensibilidade, montar seu HUD e descobrir os ajustes que combinam com sua forma de jogar — no celular ou no PC.</p><Link to="/dashboard" className="public-journey">Começar Jornada <ArrowRight size={21}/></Link><span className="public-journey-sub"><CheckCircle2 size={15}/> Ao entrar no Dashboard, veja seu tutorial interativo.</span><a href="#como-funciona" className="public-scroll-cue">Entenda como funciona <ChevronDown size={17}/></a></div></section>
   <section className="public-section" id="como-funciona"><div className="public-heading"><span className="eyebrow">PASSO A PASSO</span><h2>Como funciona a Hype Sensi?</h2><p>Da primeira visita até sua configuração salva, tudo foi pensado para ser simples.</p></div><div className="public-steps">{how.map(step=><article className="public-tile public-step" key={step.num}><span className="public-step-number">{step.num}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section>
   <section className="public-section" id="ferramentas"><div className="public-heading"><span className="eyebrow">CENTRAL HYPE</span><h2>Um painel, várias ferramentas</h2><p>Explore o que estará disponível no Dashboard depois que iniciar sua jornada.</p></div><div className="public-features">{highlights.map(({icon:Icon,title,detail})=><article className="public-tile public-feature" key={title}><span className="public-feature-symbol"><Icon size={24}/></span><h3>{title}</h3><p>{detail}</p></article>)}</div></section>
   <section className="public-platform public-section"><div className="public-platform-icon"><MonitorSmartphone size={44}/></div><div><span className="eyebrow">WEB • ANDROID • IOS • WINDOWS</span><h2>Feita para o seu dispositivo</h2><p>Acesse pelo navegador no PC, tablet, Android ou iPhone/iPad. O site é responsivo e o quiz se adapta à plataforma escolhida.</p></div><Link to="/dashboard" className="public-nav-start">Abrir painel <ArrowRight size={16}/></Link></section>
   <section className="public-section" id="faq"><div className="public-heading"><span className="eyebrow">CENTRAL DE AJUDA</span><h2>Perguntas frequentes</h2><p>Entenda antes de começar. Toque em uma pergunta para ver a resposta.</p></div><div className="public-faq">{faqs.map(([q,a])=><details className="public-faq-item" key={q}><summary>{q}<ChevronDown size={18}/></summary><p>{a}</p></details>)}</div></section>
   <section className="public-section public-downloads" id="downloads"><div className="public-heading"><span className="eyebrow">VERSÕES DISPONÍVEIS</span><h2>Downloads e instalação</h2><p>Use a versão web ou instale no seu dispositivo. Os botões de APK e EXE só aparecem quando o arquivo real estiver disponível.</p></div><Downloads/></section>
   <section className="public-outro"><span className="eyebrow">PRONTO PARA COMEÇAR?</span><h2>Crie sua configuração na Hype Sensi.</h2><p>Entre no painel, conheça o tutorial e personalize sua experiência.</p><Link to="/dashboard" className="public-journey">Começar Jornada <ArrowRight size={20}/></Link></section>
  </main>
  <footer className="public-footer"><span>HYPE SENSI • PRECISION PLATFORM</span><span>Frio Mortal Developer · FrioStore</span><div><Link to="/termos">Termos</Link><Link to="/privacidade">Privacidade</Link><a href="#inicio">Voltar ao topo</a></div></footer>
 </div>
}
