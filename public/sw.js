// Service Worker para Web Push Notifications — Saldea
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {}
  event.waitUntil(
    self.registration.showNotification(data.title ?? 'Saldea', {
      body: data.body ?? '',
      icon: data.icon ?? '/images/saldea/logo-mark.png',
      badge: '/images/saldea/logo-mark.png',
      data: { url: data.url ?? '/dashboard' },
      vibrate: [200, 100, 200],
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      const appUrl = event.notification.data?.url ?? '/dashboard'
      // Si ya hay una pestaña abierta, enfocarla y navegar
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus()
          if ('navigate' in client) client.navigate(appUrl)
          return
        }
      }
      // Si no, abrir nueva pestaña
      return clients.openWindow(appUrl)
    })
  )
})
