'use client'

import { useState, useEffect } from 'react'

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)))
}

export function PushNotificationsSection() {
  const [soportado, setSoportado] = useState(false)
  const [permiso, setPermiso] = useState<NotificationPermission>('default')
  const [suscrito, setSuscrito] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [enviandoPrueba, setEnviandoPrueba] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    const ok = typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window
    setSoportado(ok)
    if (ok) {
      setPermiso(Notification.permission)
      checkSuscripcion()
    }
  }, [])

  async function checkSuscripcion() {
    try {
      const reg = await navigator.serviceWorker.getRegistration('/sw.js')
      if (!reg) return
      const sub = await reg.pushManager.getSubscription()
      setSuscrito(!!sub)
    } catch {/* */}
  }

  async function activar() {
    setCargando(true)
    setMsg(null)
    try {
      // Registrar service worker
      const reg = await navigator.serviceWorker.register('/sw.js')
      await navigator.serviceWorker.ready

      // Pedir permiso
      const perm = await Notification.requestPermission()
      setPermiso(perm)
      if (perm !== 'granted') {
        setMsg('Permiso denegado. Actívalo manualmente en la configuración del navegador.')
        return
      }

      // Obtener VAPID public key
      const vapidRes = await fetch('/api/push/vapid-public-key')
      const { key } = await vapidRes.json()
      if (!key) { setMsg('Push no configurado en el servidor.'); return }

      // Suscribirse
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(key) as unknown as ArrayBuffer,
      })

      const subJson = sub.toJSON() as { endpoint: string; keys: { p256dh: string; auth: string } }
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: subJson.endpoint,
          p256dh: subJson.keys.p256dh,
          auth: subJson.keys.auth,
        }),
      })

      setSuscrito(true)
      setMsg('✓ Notificaciones push activadas en este dispositivo')
    } catch (e) {
      setMsg(`Error: ${e instanceof Error ? e.message : String(e)}`)
    } finally {
      setCargando(false)
    }
  }

  async function desactivar() {
    setCargando(true)
    try {
      const reg = await navigator.serviceWorker.getRegistration('/sw.js')
      const sub = await reg?.pushManager.getSubscription()
      if (sub) {
        await fetch('/api/push/unsubscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: sub.endpoint }),
        })
        await sub.unsubscribe()
      }
      setSuscrito(false)
      setMsg('Notificaciones desactivadas en este dispositivo')
    } catch (e) {
      setMsg(`Error: ${e instanceof Error ? e.message : String(e)}`)
    } finally {
      setCargando(false)
    }
  }

  async function enviarPrueba() {
    setEnviandoPrueba(true)
    try {
      // Crear una notificación de prueba directamente
      const reg = await navigator.serviceWorker.ready
      await reg.showNotification('🔔 Saldea — Prueba', {
        body: 'Las notificaciones push funcionan correctamente.',
        icon: '/images/saldea/logo-mark.png',
      })
      setMsg('Notificación de prueba enviada')
    } catch {
      setMsg('Error al enviar prueba')
    } finally {
      setEnviandoPrueba(false)
    }
  }

  if (!soportado) {
    return (
      <p className="text-xs text-zinc-500">
        Tu navegador no soporta notificaciones push. Prueba con Chrome o Firefox.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-zinc-400 leading-relaxed">
        Recibe alertas instantáneas en este dispositivo cuando se cobra una factura, se detecta una disputa o una factura alcanza el umbral judicial.
      </p>

      {permiso === 'denied' && (
        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          ⚠️ El navegador tiene las notificaciones bloqueadas. Ve a Configuración del sitio para permitirlas.
        </p>
      )}

      <div className="flex items-center gap-3">
        {!suscrito ? (
          <button
            type="button"
            onClick={activar}
            disabled={cargando || permiso === 'denied'}
            className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium disabled:opacity-50 transition-colors"
          >
            {cargando ? 'Activando...' : '🔔 Activar notificaciones'}
          </button>
        ) : (
          <>
            <span className="text-xs text-emerald-400 font-medium">✓ Activas en este dispositivo</span>
            <button
              type="button"
              onClick={enviarPrueba}
              disabled={enviandoPrueba}
              className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-zinc-300 text-xs transition-colors"
            >
              {enviandoPrueba ? 'Enviando...' : 'Enviar prueba'}
            </button>
            <button
              type="button"
              onClick={desactivar}
              disabled={cargando}
              className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-zinc-400 text-xs transition-colors"
            >
              Desactivar
            </button>
          </>
        )}
      </div>

      {msg && (
        <p className={`text-xs ${msg.startsWith('✓') ? 'text-emerald-400' : 'text-zinc-400'}`}>
          {msg}
        </p>
      )}

      <p className="text-xs text-zinc-600">
        Solo activo en este navegador/dispositivo. Repite en cada dispositivo donde quieras recibirlas.
      </p>
    </div>
  )
}
