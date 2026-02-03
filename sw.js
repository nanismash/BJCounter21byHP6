// Service Worker — BJ Counter
// Incrementa CACHE_VER cada deploy para que el browser tome la nueva versión.
const CACHE_VER = 'bj-counter-v3';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  'icon-192-maskable.png',
  'icon-512-maskable.png'
];

// INSTALL — precarga todos los assets al cache
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VER).then(cache => cache.addAll(ASSETS))
  );
});

// ACTIVATE — elimina caches viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_VER).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// FETCH — cache-first con fallback a network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached =>
      cached || fetch(event.request).then(res => {
        if (!res || !res.ok) return res;
        const clone = res.clone();
        caches.open(CACHE_VER).then(cache => cache.put(event.request, clone));
        return res;
      })
    )
  );
});
