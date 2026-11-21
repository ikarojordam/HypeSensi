/* Hype Sensi WebApp: cache versionado para uso offline. Não intercepta APIs. */
const CACHE = 'hypesensi-webapp-v1.2.0';
const ASSETS = ["./", "./index.html", "./favicon.ico", "./manifest.webmanifest", "./assets/css/style.css", "./assets/js/app.js", "./assets/js/startup-guard.js", "./assets/js/pwa.js", "./assets/icons/icon-192.png", "./assets/icons/icon-512.png", "./assets/images/logos/logo-crimson.png", "./assets/images/logos/logo-emerald.png", "./assets/images/logos/logo-frost.png", "./assets/images/logos/logo-gold.png", "./assets/images/logos/logo-obsidian.png", "./assets/images/logos/logo-purple.png"];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('hypesensi-webapp-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.includes('/api/')) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(request).then(cached => cached || fetch(request)));
});
