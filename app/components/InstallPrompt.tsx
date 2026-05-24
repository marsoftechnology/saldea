'use client'

import { useEffect, useState } from 'react'

type Plataforma = 'ios' | 'android' | null

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const STORAGE_KEY = 'saldea_install_dismissed'

export default function InstallPrompt() {
  const [plataforma, setPlataforma] = useState<Plataforma>(null)
  const [visible, setVisible] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [instalando, setInstalando] = useState(false)

  useEffect(() => {
    // No mostrar si ya está instalada (display-mode: standalone)
    if (window.matchMedia('(display-mode: standalone)').matches) return
    // No mostrar si el usuario ya la cerró antes
    if (localStorage.getItem(STORAGE_KEY)) return

    const ua = navigator.userAgent

    const esIos = /iphone|ipad|ipod/i.test(ua)
    const esAndroid = /android/i.test(ua)
    const esSafariIos = esIos && /safari/i.test(ua) && !/crios|fxios/i.test(ua)

    if (esSafariIos) {
      setPlataforma('ios')
      setVisible(true)
    } else if (esAndroid) {
      // En Android esperamos el evento beforeinstallprompt
      setPlataforma('android')
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      if (esAndroid) setVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  function cerrar() {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  async function instalarAndroid() {
    if (!deferredPrompt) return
    setInstalando(true)
    try {
      await deferredPrompt.prompt()
      const result = await deferredPrompt.userChoice
      if (result.outcome === 'accepted') {
        setVisible(false)
      }
    } catch {
      // ignorar
    } finally {
      setInstalando(false)
      setDeferredPrompt(null)
    }
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-3 pointer-events-none">
      <div className="max-w-sm mx-auto bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-4 pointer-events-auto">
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0">📱</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-zinc-100">Instala Saldea en tu móvil</p>
            <p className="text-xs text-zinc-400 mt-0.5">Añade a pantalla de inicio para acceso rápido sin el navegador</p>

            {plataforma === 'ios' && (
              <div className="mt-2 bg-zinc-800/60 rounded-lg px-3 py-2 text-xs text-zinc-300 space-y-1">
                <p>1. Pulsa el botón <strong className="text-zinc-100">Compartir</strong> de Safari</p>
                <p>2. Selecciona <strong className="text-zinc-100">&laquo;Añadir a pantalla de inicio&raquo;</strong></p>
                <p>3. Pulsa <strong className="text-zinc-100">Añadir</strong></p>
              </div>
            )}

            {plataforma === 'android' && (
              <button
                onClick={instalarAndroid}
                disabled={instalando}
                className="mt-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {instalando ? 'Instalando…' : 'Instalar'}
              </button>
            )}
          </div>
          <button
            onClick={cerrar}
            aria-label="Cerrar"
            className="shrink-0 text-zinc-500 hover:text-zinc-300 p-1 -mt-1 -mr-1 rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
