# Hype Sensi — WebApp (pronto para GitHub e Render)

Projeto **estático** de HTML/CSS/JavaScript, sem Node.js, banco de dados ou dependências externas. Inclui as seis logos, Sensi IA, HUD Studio interativo, perfis locais, backup, temas e biblioteca de jogadores.

## Publicar no Render

1. Crie um repositório no GitHub e **envie o conteúdo desta pasta para a raiz do repositório**. Não envie a pasta dentro de outra pasta.
2. No Render, escolha **New > Static Site** e conecte esse repositório.
3. Em **Build Command**, deixe em branco (nenhum build necessário).
4. Em **Publish Directory**, use `.` (um ponto).
5. Publique. O arquivo `index.html` já está na raiz.

Também existe um `render.yaml` para uso opcional com **Blueprint** no Render. Você não precisa configurar as duas formas simultaneamente.

## Testar localmente

Abra um terminal na raiz e execute `python -m http.server 8000`, depois acesse `http://localhost:8000`. Pode usar qualquer servidor estático; Python **não é necessário para publicar**.

## Estrutura

```text
HypeSensi-WebApp-Pronto-GitHub/
├── index.html                 # Entrada da aplicação
├── favicon.ico
├── manifest.webmanifest       # Instalação como WebApp/PWA
├── sw.js                      # Cache offline (HTTPS)
├── render.yaml                # Deploy opcional via Render Blueprint
├── _headers                   # Cabeçalhos para hosts compatíveis
├── 404.html
├── robots.txt
├── .gitignore
├── README.md
├── docs/
│   └── ESTRUTURA-E-LIMITACOES.md
└── assets/
    ├── css/style.css
    ├── js/
    │   ├── app.js
    │   ├── startup-guard.js
    │   └── pwa.js
    ├── icons/
    │   ├── icon-original.png
    │   ├── icon-192.png
    │   └── icon-512.png
    └── images/logos/
        ├── logo-purple.png
        ├── logo-obsidian.png
        ├── logo-frost.png
        ├── logo-crimson.png
        ├── logo-emerald.png
        └── logo-gold.png
```

## Funcionamento

- As configurações são salvas no **localStorage** do navegador; não existe sincronização automática entre aparelhos.
- O **backup JSON** pode ser exportado/importado pelas opções existentes na aplicação.
- Para **instalar** como WebApp/PWA, use um navegador compatível com HTTPS; o serviço offline é opcional.
- A biblioteca de famosos só apresenta valores/códigos publicados quando há fonte cadastrada; não preenche dados fictícios.
- O diagnóstico nativo de CPU/RAM/temperatura do Desktop exige `/api/diagnostics`, **não disponível** nesta hospedagem estática; a página avisa quando não consegue consultar.
- O WebApp não interfere no jogo: o usuário aplica os ajustes manualmente.

## Arquivos necessários para publicar

**Nenhum.** Já inclui HTML, CSS, scripts, logos, ícones, manifesto, configuração do Render e arquivos auxiliares. Domínio personalizado é opcional e configurado no painel do serviço, não no código.
