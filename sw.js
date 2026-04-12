const CACHE_NAME = 'boom-finance-v3';
const ASSETS = ['./', './index.html', './manifest.json'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = e.request.url;
  if (url.includes('firestore') || url.includes('identitytoolkit') || url.includes('securetoken') || url.includes('accounts.google') || url.includes('apis.google')) return;
  e.respondWith(caches.match(e.request).then(cached => {
    const fetched = fetch(e.request).then(r => { if (r && r.status === 200) { const cl = r.clone(); caches.open(CACHE_NAME).then(c => c.put(e.request, cl)); } return r; }).catch(() => cached);
    return cached || fetched;
  }));
});
