const cacheName = "DefaultCompany-KodCiala-1.0";
const contentToCache = [
    "Build/7cd26356e0e3520d44b37041a7e36e0d.loader.js",
    "Build/c14d393ec5e57b0abd3212f61204344f.framework.js.unityweb",
    "Build/879d1ea94f811e2793536672c655ac4a.data.unityweb",
    "Build/a4d9f6f38bf70c4be0e831549c8ba12a.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
