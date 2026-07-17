// Service Worker de RetailManager.
// Guarda en caché el "esqueleto" de la app (HTML, CSS, JS) para que abra
// rápido y funcione aunque la conexión sea mala. Los datos siguen viniendo
// siempre de Firebase — esto NO guarda datos, solo archivos de la app.
const CACHE_NAME = 'retailmanager-v3';
const ARCHIVOS_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './js/utils.js',
  './js/storage.js',
  './js/auth.js',
  './js/dashboard.js',
  './js/comunicados.js',
  './js/vencimientos.js',
  './js/incidencias.js',
  './js/personal.js',
  './js/horarios.js',
  './js/evaluaciones.js',
  './js/limpieza.js',
  './js/auditorias.js',
  './js/caidas.js',
  './js/certificados.js',
  './js/app.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARCHIVOS_CACHE)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  // Nunca cachear llamadas a Firebase/Firestore/Google — esos datos siempre
  // deben ir a la red para estar actualizados.
  if (url.includes('firebaseio.com') || url.includes('firestore.googleapis.com') ||
      url.includes('googleapis.com') || url.includes('gstatic.com')) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((resp) => {
        const copia = resp.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copia));
        return resp;
      }).catch(() => cached);
    })
  );
});
