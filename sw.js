/* Cache apenas dos recursos estáticos e das páginas já visitadas. */
const CACHE='hypesensi-react-v3';
const CORE=['/','/index.html','/manifest.webmanifest','/assets/icons/icon-192.png','/assets/icons/icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('hypesensi-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const u=new URL(req.url);if(u.origin!==location.origin||u.pathname.startsWith('/api/'))return;if(req.mode==='navigate'){event.respondWith(fetch(req).then(r=>{if(r.ok){const clone=r.clone();caches.open(CACHE).then(c=>c.put('/index.html',clone));}return r}).catch(()=>caches.match('/index.html')))}else{event.respondWith(caches.match(req).then(cache=>cache||fetch(req).then(r=>{if(r.ok){const clone=r.clone();caches.open(CACHE).then(c=>c.put(req,clone))}return r})))}});
