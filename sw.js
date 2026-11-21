/* Hype Sensi: recursos atualizados têm prioridade; fallback offline, sem cachear downloads. */
const CACHE='hypesensi-react-v7-layout-fix';
const CORE=['/','/manifest.webmanifest','/assets/icons/icon-192.png','/assets/icons/icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(async c=>{await Promise.allSettled(CORE.map(url=>c.add(url)));}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('hypesensi-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin||url.pathname.startsWith('/api/')||url.pathname.startsWith('/downloads/'))return;
 // Evita reabrir layout antigo de outra versao.
 event.respondWith(fetch(req).then(response=>{
  if(response.ok&&response.type==='basic'){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(c=>c.put(req,copy)));}
  return response;
 }).catch(async()=>{
  const cached=await caches.match(req);
  if(cached)return cached;
  if(req.mode==='navigate')return await caches.match('/');
  return Response.error();
 }));
});
