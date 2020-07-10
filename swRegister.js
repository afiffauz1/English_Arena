if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(function () {
            console.log("Service Worker berhasil didaftarkan");
        })
        .catch(function () {
            console.log("Service worker gagal didaftarkan");
        })
} else {
    console.log("Browser tidak mendukung service worker")
}