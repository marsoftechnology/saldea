'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

// Rutas internas que no queremos trackear
const RUTAS_EXCLUIDAS = [
  '/admin',
  '/dashboard',
  '/facturas',
  '/clientes',
  '/analytics',
  '/importar',
  '/equipo',
  '/ajustes',
  '/bienvenida',
  '/pago-completado',
  '/login',
  '/registro',
  '/recuperar',
  '/restablecer',
  '/auth',
  '/api',
  '/cobrado',
  '/aceptar-invitacion',
]

export function TrackPageView() {
  const pathname = usePathname()
  const lastTracked = useRef<string | null>(null)

  useEffect(() => {
    // Evitar doble disparo en Strict Mode y navegaciones repetidas a la misma ruta
    if (lastTracked.current === pathname) return
    lastTracked.current = pathname

    // No trackear rutas internas de la app
    const esInterna = RUTAS_EXCLUIDAS.some(
      r => pathname === r || pathname.startsWith(r + '/')
    )
    if (esInterna) return

    const referrer =
      typeof document !== 'undefined' ? document.referrer || null : null

    // fire-and-forget: nunca lanzamos errores al usuario
    fetch('/api/visitas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ruta: pathname, referrer }),
      // keepalive permite que la petición se complete aunque la página se descargue
      keepalive: true,
    }).catch(() => {/* silencio */})
  }, [pathname])

  return null
}
