'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggleIcon() {
  const [tema, setTema] = useState<'dark' | 'light'>('dark')
  const [montado, setMontado] = useState(false)

  useEffect(() => {
    const actual = document.documentElement.getAttribute('data-theme')
    setTema(actual === 'light' ? 'light' : 'dark')
    setMontado(true)
  }, [])

  function cambiar() {
    const actual = document.documentElement.getAttribute('data-theme')
    const nuevo = actual === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', nuevo)
    localStorage.setItem('saldea_theme', nuevo)
    setTema(nuevo)
  }

  if (!montado) return <div className="w-8 h-8" />

  return (
    <button
      onClick={cambiar}
      title={tema === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.06] transition-colors text-base"
    >
      {tema === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
