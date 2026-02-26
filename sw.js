const CACHE_NAME = 'edrak-cache-v1.2'; // تغيير الرقم هنا يمسح الكاش القديم فوراً

self.addEventListener('install', (event) => {
    self.skipWaiting(); // إجبار المتصفح على تفعيل النسخة الجديدة فوراً
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache); // حذف أي كاش قديم
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
