self.addEventListener('install', function (e) {
  console.log('install')
  e.waitUntil(caches.open('installation')
    .then(function (cache) {
      return cache.addAll([
        './'
      ])
    }))
})

self.addEventListener('fetch', function (e) {
  var fetched = fetch(e.request)
  var cached = caches.match(e.request)

  e.respondWith(fetched.catch(function () {
    return cached
  }))
})
