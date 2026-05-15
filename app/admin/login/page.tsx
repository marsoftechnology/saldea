'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setCargando(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) {
        setError('Usuario o contraseña incorrectos')
        setCargando(false)
        return
      }
      router.push('/admin')
    } catch {
      setError('Error de red')
      setCargando(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 flex items-center justify-center p-6">
      <form onSubmit={submit} className="max-w-sm w-full bg-zinc-900/60 border border-white/10 rounded-2xl p-8">
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">🔐</div>
          <h1 className="text-xl font-bold text-zinc-100">Panel de administración</h1>
          <p className="text-xs text-zinc-500 mt-1">Marsof Technology — área restringida</p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
              required
              autoComplete="username"
              className="w-full px-3 py-2.5 border border-white/10 rounded-lg text-sm text-zinc-100 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-3 py-2.5 border border-white/10 rounded-lg text-sm text-zinc-100 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 text-xs bg-rose-500/10 border border-rose-500/30 text-rose-300 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={cargando}
          className="w-full mt-5 bg-sky-500 hover:bg-sky-400 text-white font-medium py-2.5 rounded-lg disabled:opacity-60"
        >
          {cargando ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
