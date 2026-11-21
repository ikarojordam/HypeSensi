import {useState} from 'react';
import {BookOpen} from 'lucide-react';
import TutorialModal from '../components/onboarding/TutorialModal';
const faqs=[
 ['O que é a Hype Sensi?','É uma plataforma web independente com gerador de sensibilidade, editor de HUD, calibração, favoritos, temas e armazenamento de perfis.'],
 ['Como começo a configurar minha sensibilidade?','Na página inicial, selecione Iniciar configuração. Responda ao quiz, confira os valores sugeridos, teste no jogo e salve seus ajustes.'],
 ['Como o gerador funciona?','As respostas sobre dispositivo, DPI, emulador e estilo de jogo servem para calcular valores iniciais na escala de 0 a 200. Não há promessa de resultado garantido.'],
 ['A Hype Sensi modifica o Free Fire?','Não. Todas as configurações devem ser aplicadas manualmente pelo jogador. A plataforma não modifica arquivos do jogo.'],
 ['O que é Hype Adapt?','É uma ferramenta para ajustar gradualmente os valores da sensibilidade conforme seus próprios testes.'],
 ['O HUD Studio gera códigos oficiais?','Não. Ele salva um layout visual em JSON para referência e personalização. Não cria códigos oficiais de HUD.'],
 ['Como salvar minha configuração?','Após gerar ou ajustar os valores, use Salvar e depois acesse Meus Perfis. Em Configurações você pode exportar um backup.'],
 ['Onde ficam meus perfis?','Os dados ficam no armazenamento local deste navegador. Limpar os dados do site pode apagar perfis não exportados.'],
 ['Os perfis são compartilhados entre dispositivos?','Não automaticamente. Para mudar de dispositivo, exporte um backup e importe-o no outro aparelho, quando a importação estiver disponível.'],
 ['Por que um jogador famoso aparece sem sensi?','A biblioteca só apresenta informações associadas a fontes cadastradas. Dados não confirmados não são inventados.'],
 ['Funciona em Windows, Android e iOS?','Sim. A versão web funciona em navegadores modernos de PC, Android e iPhone/iPad. O quiz de emulador é direcionado ao uso em PC.'],
 ['Preciso instalar o aplicativo?','Não. Você pode usar a versão web. A página Downloads também mostra como instalar o site como WebApp e oferece links para aplicativos quando eles forem publicados.'],
 ['Como instalar no iPhone/iPad?','Abra o site no Safari, toque em Compartilhar e selecione Adicionar à Tela de Início.'],
 ['Como instalar no Android?','No Chrome ou navegador compatível, acesse o menu e escolha Instalar aplicativo ou Adicionar à Tela inicial, quando a opção estiver disponível.'],
 ['Posso mudar cores e logos?','Sim. A seção Temas permite alternar entre seis identidades visuais.']
];
export default function FAQ(){const [open,setOpen]=useState(false);return <div className="stack"><header className="page-head"><span className="eyebrow">CENTRAL DE AJUDA</span><h1>Perguntas frequentes</h1><p>Entenda as ferramentas, a instalação e como proteger seus perfis.</p><button type="button" className="primary-action" onClick={()=>setOpen(true)}><BookOpen size={16}/> Abrir tutorial interativo</button></header><section className="hype-card">{faqs.map(([q,a])=><details className="faq-item" key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>{open&&<TutorialModal onClose={()=>setOpen(false)}/>}</div>}
