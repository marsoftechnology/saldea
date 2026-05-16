'use client'

import { useEffect, useState } from 'react'

/**
 * Toggle compacto de tema (sol/luna) para usar en navbars públicas:
 * /, /saldea, /blog, /gestorias, /autonomos, /recursos
 * Reutiliza el mismo sistema de localStorage que el del dashboard.
 */
export default function ThemeToggleNav() {
  const [tema, setTema] = useState<'dark' | 'light'>('dark')
  const [montado, setMontado] = useState(false)

  useEffect(() => {
    const guardado = localStorage.getItem('saldea_theme')
    setTema(guardado === 'light' ? 'light' : 'dark')
    setMontado(true)
  }, [])

  function cambiar() {
    const nuevo = tema === 'dark' ? 'light' : 'dark'
    localStorage.setItem('saldea_theme', nuevo)
    // Recarga para que las variables CSS (color-mix oklab) se apliquen sin cache.
    window.location.reload()
  }

  if (!montado) {
    // Skeleton del mismo tamaño para evitar mismatch SSR/CSR
    return <div className="w-9 h-9" aria-hidden="true" />
  }

  return (
    <button
      onClick={cambiar}
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.06] transition-colors"
      title={tema === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      aria-label={tema === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {tema === 'dark' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
