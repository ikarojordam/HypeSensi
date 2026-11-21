/* Registro opcional para uso offline do WebApp. */
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => console.warn('Hype Sensi: modo offline indisponível', err));
  });
}
