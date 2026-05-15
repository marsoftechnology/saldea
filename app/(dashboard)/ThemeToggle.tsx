'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
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
    // Recargamos para que Tailwind v4 + color-mix() respeten las nuevas variables
    // (sin recarga, color-mix queda cacheado y algunos colores no se invierten).
    // El script inline del <head> aplica el tema antes del primer paint → no hay flash.
    window.location.reload()
  }

  if (!montado) {
    // Skeleton para evitar mismatch SSR/CSR
    return <div className="h-9" />
  }

  return (
    <button
      onClick={cambiar}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100 w-full transition-colors"
      title={tema === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      <span>{tema === 'dark' ? '☀️' : '🌙'}</span>
      <span>{tema === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>
    </button>
  )
}
