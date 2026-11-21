# Downloads diretamente pelo repositório

Coloque arquivos reais, compilados e confiáveis nos caminhos exatos:

- `downloads/android/HypeSensi-Android.apk`
- `downloads/windows/HypeSensi-Desktop.exe`

O build do Vite verifica a presença dos arquivos, copia apenas instaladores que realmente existem para `dist/downloads/` e gera `dist/downloads-status.json`. A aba **Downloads** habilita os botões automaticamente quando os arquivos estiverem presentes. Se estiverem ausentes, exibe uma mensagem explicativa. Não é colocado nenhum APK fictício neste projeto.

Arquivos grandes: o GitHub não aceita arquivos individuais acima de 100 MB no Git convencional. Para instaladores acima desse limite, use GitHub Releases e defina `VITE_ANDROID_DOWNLOAD_URL` ou `VITE_WINDOWS_DOWNLOAD_URL` no Render (no momento de compilar).

Um APK precisa ter sido gerado e assinado antes de ser distribuído. O projeto web não compila APK por conta própria. Não altere a extensão de um ZIP ou arquivo HTML para `.apk`.

Configuração no Render: `npm install && npm run build` e Publish Directory `dist`.
