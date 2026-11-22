# Hype Sensi — Downloads corrigidos

Este patch corrige a aba Downloads da versão web principal.

**Windows:** inclui `downloads/windows/HypeSensi-Windows.msixbundle`, extraído do ZIP Windows que você enviou. O pacote foi preservado sem modificações; assinatura e instalação não foram testadas no Windows.

**Android:** o pacote não contém APK, pois nenhum APK compilado foi fornecido. Quando você adicionar um APK verdadeiro a `downloads/android/`, ele será detectado no próximo build.

## Instalação no GitHub

Envie os arquivos mantendo os caminhos. Use as configurações Render: serviço Static Site; Build Command `npm install && npm run build`; Publish Directory `dist`.

O `vite.config.ts` copia os instaladores existentes para `dist/downloads/` e gera `downloads-status.json` com o link e o formato corretos. A página `src/pages/Downloads.tsx` lê esse JSON e habilita os botões.

Alternativa: configure `VITE_WINDOWS_DOWNLOAD_URL` e/ou `VITE_ANDROID_DOWNLOAD_URL` com URLs públicas HTTPS de instaladores confiáveis. Se usar variáveis do Vite, faça um novo build.

Atenção: se o arquivo estiver apenas no GitHub, mas não for incluído no deploy do Render, não estará disponível em `/downloads/`. O build desta versão faz a cópia automaticamente.
