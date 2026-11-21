# Correção após gravação no celular (21/11/2026)

A gravação mostra logos em tamanho desproporcional e a página praticamente sem layout. A causa provável é o carregamento incorreto/desatualizado dos estilos.

## Alterações

- `src/main.tsx`: importa os 4 CSS diretamente no Vite, compilados como parte da aplicação.
- `index.html`: remove links externos duplicados de CSS e mantém estilos mínimos antitela quebrada.
- `assets/css/landing.css`: protege tamanhos das logos e largura no celular.
- `sw.js`: invalida cache antigo e usa prioridade de rede para evitar CSS velho após atualização.
- `vite.config.ts`: valida os CSS necessários na publicação.

## Render

Build command: `npm install && npm run build`
Publish directory: `dist`

Após subir os arquivos, execute um novo deploy. Na primeira visita após a atualização, atualize a página uma vez; se um dispositivo continuar com o conteúdo antigo, limpe os dados do site (o que pode apagar configurações salvas). Faça backup dos perfis antes.

Não foi possível testar o projeto com todas as dependências npm neste ambiente. A gravação indica falha de CSS, mas confirmação final depende de observar o deploy.
