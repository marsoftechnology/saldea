'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  async function handleGoogle() {
    setError('')
    setCargando(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    })
    if (error) {
      setError('Error al conectar con Google. Inténtalo de nuevo.')
      setCargando(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setCargando(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email o contraseña incorrectos')
      setCargando(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Bienvenido de vuelta</h1>
      <p className="text-zinc-400 text-sm mb-8">Entra en tu cuenta para gestionar tus cobros</p>

      {/* ── Botón Google ── */}
      <button
        type="button"
        onClick={handleGoogle}
        disabled={cargando}
        className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white py-3 rounded-lg font-medium hover:bg-white/10 transition-colors disabled:opacity-50"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden>
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continuar con Google
      </button>

      {/* ── Divisor ── */}
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-zinc-950 px-3 text-zinc-500">o entra con email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="tu@email.com"
            className="w-full px-4 py-3 bg-zinc-900/80 border border-white/10 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40 transition"
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-1.5">
            <label className="block text-sm font-medium text-zinc-300">Contraseña</label>
            <Link href="/recuperar" className="text-xs text-sky-400 hover:text-sky-300 hover:underline">
              ¿La has olvidado?
            </Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-zinc-900/80 border border-white/10 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40 transition"
          />
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-sky-500 text-zinc-900 py-3 rounded-lg font-bold hover:bg-sky-400 transition-colors disabled:opacity-60 shadow-lg shadow-sky-500/20"
        >
          {cargando ? 'Entrando...' : 'Iniciar sesión'}
        </button>
      </form>

      <p className="text-center text-sm text-zinc-500 mt-6">
        ¿No tienes cuenta?{' '}
        <Link href="/registro" className="text-sky-400 font-semibold hover:text-sky-300 hover:underline">
          Regístrate gratis
        </Link>
      </p>
    </>
  )
}
