# Hype Sensi — Site WebApp React + TypeScript

Esta pasta é **o site**, não o programa Desktop. Ela já está organizada para ser enviada à raiz de um repositório GitHub, incluindo a pasta `assets/` como na referência.

## Estrutura do repositório

```text
HypeSensi/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── icons/
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │   └── icon-original.png
│   ├── imagens/
│   │   └── logos/
│   │       ├── logo-purple.png
│   │       ├── logo-obsidian.png
│   │       ├── logo-frost.png
│   │       ├── logo-crimson.png
│   │       ├── logo-emerald.png
│   │       └── logo-gold.png
│   └── js/
│       ├── app.js
│       ├── pwa.js
│       └── startup-guard.js
├── src/
│   ├── pages/                    # Famous, FamousProfile, HudStudio, LegacyTool
│   ├── components/famous/        # Cartões, filtros e detalhes
│   ├── components/hud/           # Editor visual
│   ├── data/famous/              # players, sensitivities, huds e sources JSON
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css                # CSS principal da interface React
├── public/
│   ├── assets/                   # Cópia pública dos recursos servidos pelo site
│   └── classic/                  # Interface original, preservada
├── index.html                    # HTML principal React
├── package.json
├── vite.config.ts
└── render.yaml
```

## Por que há `assets/` e `public/assets/`?

- `assets/` na **raiz** deixa seu repositório visualmente igual à referência do GitHub e reúne os arquivos do site clássico.
- `public/assets/` permite que o Vite disponibilize as imagens e ícones diretamente em `/assets/` na versão publicada.
- O código React fica em `src/`. Arquivos `.tsx` não devem ser abertos diretamente no navegador: são compilados pelo Vite.
- A versão clássica está em `public/classic/`, com HTML, CSS e JS próprios. **As funções antigas ainda são exibidas dentro de uma página incorporada, não foram reescritas totalmente em React.**

## GitHub e Render

1. **Envie o conteúdo desta pasta** (não somente `assets/`) para a raiz do repositório.
2. No Render, crie um **Static Site** conectado ao GitHub.
3. **Build Command:** `npm install && npm run build`
4. **Publish Directory:** `dist`
5. Faça o deploy. Não precisa de banco de dados.

Em desenvolvimento, rode `npm install` e `npm run dev`. O site requer Node.js para compilação, mas não no navegador do visitante.

## Avisos

- Sensibilidades e HUDs dos jogadores famosos só devem ser apresentados como confirmados quando houver fontes verificáveis. O código mantém informações sem fonte como não verificadas.
- Ainda não foi possível validar o build completo com `npm` neste ambiente.
