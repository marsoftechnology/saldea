'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

/**
 * Banner informativo de cookies. Aparece la primera vez que el usuario visita el sitio
 * y se oculta tras pulsar "Vale" o "Más info" (con prefencia guardada en localStorage).
 *
 * Solo usamos cookies técnicas estrictamente necesarias (sesión, Stripe, Cloudflare).
 * Por LSSI estas cookies están exentas de consentimiento, pero por transparencia
 * mostramos un banner informativo + enlace a la política completa.
 */
const STORAGE_KEY = 'saldea_consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const prev = localStorage.getItem(STORAGE_KEY)
      if (!prev) setVisible(true)
    } catch {
      // localStorage no disponible (incognito estricto), ocultamos por defecto
    }
  }, [])

  function aceptar() {
    try { localStorage.setItem(STORAGE_KEY, 'accepted-' + new Date().toISOString()) } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-[60] max-w-md mx-auto md:mx-0">
      <div className="bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-5">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-xl mt-0.5" aria-hidden>🍪</span>
          <div>
            <p className="text-sm font-semibold text-white mb-1.5">Cookies necesarias</p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Saldea usa únicamente cookies técnicas necesarias para mantener tu sesión y procesar pagos.
              No usamos cookies de analítica ni publicidad.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={aceptar}
            className="bg-sky-500 text-zinc-900 text-sm font-bold px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors flex-1 md:flex-initial"
          >
            Vale, entendido
          </button>
          <Link
            href="/legal/cookies"
            className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors px-3 py-2"
            onClick={aceptar}
          >
            Más info →
          </Link>
        </div>
      </div>
    </div>
  )
}
