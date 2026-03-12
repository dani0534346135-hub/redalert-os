// sw.js - ניהול התראות רקע
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('push', function(event) {
    let data = { title: 'אזעקה!', body: 'נא להיכנס למרחב מוגן' };
    if (event.data) {
        data = event.data.json();
    }

    const options = {
        body: data.body,
        icon: '/icon.png', // נתיב לאייקון
        badge: '/icon.png',
        vibrate: [300, 100, 300, 100, 300],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '1'
        },
        actions: [
            {action: 'explore', title: 'פתח אפליקציה'}
        ]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});
