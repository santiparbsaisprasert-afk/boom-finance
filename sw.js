const C='boom-v4';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.json'])));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=e.request.url;if(u.includes('firestore')||u.includes('identitytoolkit')||u.includes('securetoken')||u.includes('accounts.google')||u.includes('apis.google'))return;e.respondWith(caches.match(e.request).then(c=>{const f=fetch(e.request).then(r=>{if(r&&r.status===200){const cl=r.clone();caches.open(C).then(ca=>ca.put(e.request,cl))}return r}).catch(()=>c);return c||f}))});
