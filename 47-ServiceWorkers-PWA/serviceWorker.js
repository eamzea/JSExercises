const name = 'apv-v2';
const files = [
  '/',
  '/index.html',
  '/error.html',
  '/css/styles.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
  '/js/app.js',
  '/js/apv.js',
];

self.addEventListener('install', e => {
  console.log('Service Worker installed');

  e.waitUntil(
    caches.open(name).then(cache => {
      console.log('Caching');
      cache.addAll(files);
    })
  );

  console.log(e);
});

self.addEventListener('activated', e => {
  console.log('Service Worker activated');

  e.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys.filter(key => key !== name).map(key => caches.delete(key))
        )
      )
  );

  console.log(e);
});

self.addEventListener('fetch', e => {
  console.log('Fetching...', e);

  e.respondWith(
    caches
      .match(e.request)
      .then(answer => answer)
      .catch(() => caches.match('/error.html'))
  );
});
