// Service Worker czyszczący stare cache i sam siebie usuwający.
// Po jego wykonaniu strona działa już bez SW i bez trzymania starych buildów.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', async (event) => {
  // Usuń wszystkie cache (w tym stare Unity WebGL)
  const keys = await caches.keys();
  await Promise.all(keys.map((key) => caches.delete(key)));

  // Wyrejestruj tego Service Workera
  await self.registration.unregister();

  // Odśwież wszystkie otwarte karty z tą stroną
  const clientsList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  for (const client of clientsList) {
    client.navigate(client.url);
  }
});

// Na wszelki wypadek: zawsze leć w sieć
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
