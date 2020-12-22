var CACHE_NAME = 'static-cache';
var urlsToCache = [
'https://sactv.ml/Faq.html',
'https://sactv.ml/loo.jpg',
'https://sactv.ml/p.jpg',
'https://sactv.ml/azam.json',
'https://sactv.ml/sw.js'
];
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
 self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      return response || fetchAndCache(event.request);
    })
  );
});

function fetchAndCache(url) {
  return fetch(url)
  .then(function(response) {

    if (!response.ok) {
      throw Error(response.statusText);
    }
    return caches.open(CACHE_NAME)
    .then(function(cache) {
      cache.put(url, response.clone());
      return response;
    });
  })
  .catch(function(error) {alert("you are offline.");});}
