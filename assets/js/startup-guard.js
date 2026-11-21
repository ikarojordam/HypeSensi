/* Hype Sensi WebApp — painel de recuperacao; nao inicia processos nem coleta dados. */
(function () {
  'use strict';
  window.addEventListener('error', function (event) {
    try { console.error('[HypeSensi]', event.message); } catch (_) {}
  });
  window.addEventListener('unhandledrejection', function (event) {
    try { console.error('[HypeSensi] Rejeicao:', event.reason); } catch (_) {}
  });
  window.addEventListener('DOMContentLoaded', function () {
    window.setTimeout(function () {
      var home = document.querySelector('#content');
      if (!home || (home.textContent || '').trim().length > 0) return;
      var splash = document.querySelector('#splash');
      if (splash) splash.style.display = 'none';
      if (!home) return;
      home.innerHTML = '<section style="padding:30px;color:#fff;background:#22142f;border-radius:16px;max-width:640px;margin:30px auto">' +
        '<h2 style="margin-bottom:12px">Nao foi possivel iniciar o painel</h2>' +
        '<p>Os arquivos locais nao carregaram corretamente. Atualize a página.</p>' +
        '<p>Se continuar, verifique se todos os arquivos foram publicados na mesma estrutura, incluindo assets/images/logos.</p>' +
        '<button type="button" id="hype-retry-start" style="background:#9e60cf;color:white;border:0;border-radius:9px;padding:12px 18px">Tentar novamente</button></section>';
      var retry = document.querySelector('#hype-retry-start');
      if (retry) retry.addEventListener('click', function () { window.location.reload(); });
    }, 8500);
  });
})();
