# Hype Sensi — WebApp React + TypeScript

Site da Hype Sensi, organizado a partir de `HypeSensi-Site-Organizado-GitHub.zip`.

## Estrutura sem cópias de assets

- `assets/css`: estilo React (migrado de `src/styles.css`), responsividade e animações.
- `assets/js`: inicialização de tema e registro PWA.
- `assets/icons`: favicon e ícones PWA.
- `assets/imagens/logos`: seis logos PNG originais.
- `src/pages`: 13 páginas React, sem iframe.
- `src/components`: layout, famosos, controles HUD e sensibilidade.
- `src/data`: os JSONs originais da biblioteca de famosos e perguntas originais do gerador.
- `src/hooks`, `src/lib`, `src/types`: estado visual, cálculos, salvamento, backups e tipagem.
- `index.html`, `manifest.webmanifest`, `sw.js`: site e PWA na raiz.
- `vite.config.ts`: copia **somente** `assets/` para `dist/assets/` após a compilação.

**Não existe `public/`, `public/assets/` ou `public/classic/`.** O antigo script `app.js` não foi mantido como segunda aplicação, pois suas ferramentas foram substituídas por páginas/componentes React. O HUD Studio e a biblioteca de famosos foram preservados e integrados. A versão Web não oferece diagnóstico nativo de hardware, porque não tem acesso às métricas de um executável Windows.

## Publicar no Render

1. Envie **o conteúdo** do projeto para a raiz do seu repositório GitHub.
2. Crie um serviço **Static Site** no Render.
3. Build Command: `npm install && npm run build`.
4. Publish Directory: `dist`.
5. Não é preciso banco de dados. O Render instala o Node e as dependências do projeto durante o build.

O `render.yaml` também está configurado para site estático e para reescrever rotas React para `/index.html`.

## Desenvolvimento local

```sh
npm install
npm run dev
```

Testes recomendados depois do primeiro deploy: navegação entre as 13 rotas, busca de jogadores, criar e exportar HUD, gerar sensi, alterar tema, salvar e importar backup, recarregar em rotas internas e instalar PWA no Android.

## Estado das verificações

- Código original, logos e dados reais de referência preservados do ZIP enviado.
- Verificação de sintaxe TypeScript/TSX realizada sem erros de parsing.
- Integridade e caminhos dos recursos verificados.
- **Build completo não executado neste ambiente**: o acesso ao registro npm está indisponível (`EAI_AGAIN`). Por esse mesmo motivo, o `package-lock.json` **não está incluído**: não seria correto inventar um lockfile com versões não resolvidas. Rode `npm install` no Render ou em uma máquina com internet; ele gerará um `package-lock.json` verdadeiro, que poderá então ser versionado no GitHub.

## Privacidade

O site usa `localStorage` para perfis, preferências e favoritos. Seus dados não são sincronizados automaticamente com servidores. O gerador produz apenas valores iniciais e não modifica o Free Fire. Dados de jogadores famosos só são exibidos quando há referências associadas.

Powered by Frio Mortal Developer • FrioStore.
