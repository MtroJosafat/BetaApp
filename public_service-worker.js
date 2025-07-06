const CACHE = 'cic-v1';
const urls = [
  '/', '/index.html', '/style.css', '/app.js',
  '/assets/logo.png', '/assets/flayer1.jpg', '/assets/flayer2.jpg', '/assets/flayer3.jpg', '/assets/mercadopago.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(urls)));
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r=>r || fetch(e.request))
  );
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
});