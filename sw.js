const CACHE_NAME = "englisharena-1";

const fileToCache = [
    "/",
    "/navigation.html",
    "/index.html",
    "/footer.html",
    "/pages/home.html",
    "/img/banner.jpg",
    "/img/banner-fav.jpg",
    "/img/banner-squad.jpg",
    "/img/banner-table.jpg",
    "/css/own-style.css",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/navigation.js",
    "/app.js"
];

self.addEventListener("install", event => {
    console.log("Service worker installing...");
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Service worker caching all: app shell and content');
            return cache.addAll(fileToCache);
        })
        .catch(error => console.log(error))
    )
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(res => {
            console.log(`Service worker fetching resource: ${event.request.url}`);
            return res || fetch(event.request).then(response => {
                return caches.open(CACHE_NAME).then(cache => {
                    console.log(`Service worker caching new resource: ${event.request.url}`);
                    cache.put(event.request, response.clone());
                    return response;
                })
            })
        })
    )
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key)
                }
            }))
        })
    )
})