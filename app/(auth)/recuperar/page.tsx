'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function RecuperarPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [cargando, setCargando] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setCargando(true)

    const supabase = createClient()
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/restablecer`,
    })

    if (error) {
      setError('No hemos podido enviar el email. Inténtalo de nuevo.')
      setCargando(false)
      return
    }

    setEnviado(true)
    setCargando(false)
  }

  if (enviado) {
    return (
      <>
        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Revisa tu email</h1>
        <p className="text-zinc-400 text-sm mb-8">
          Si existe una cuenta asociada a <span className="text-zinc-200 font-medium">{email}</span>,
          te hemos enviado un enlace para restablecer tu contraseña.
        </p>
        <div className="bg-sky-500/10 border border-sky-500/30 text-sky-200 text-sm px-4 py-3 rounded-lg mb-6">
          El enlace caduca en 1 hora. Si no lo encuentras, revisa tu carpeta de spam.
        </div>
        <Link
          href="/login"
          className="block w-full text-center bg-sky-500 text-zinc-900 py-3 rounded-lg font-bold hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"
        >
          Volver al login
        </Link>
      </>
    )
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Recuperar contraseña</h1>
      <p className="text-zinc-400 text-sm mb-8">
        Introduce tu email y te enviaremos un enlace para crear una nueva contraseña.
      </p>

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
          {cargando ? 'Enviando...' : 'Enviar enlace de recuperación'}
        </button>
      </form>

      <p className="text-center text-sm text-zinc-500 mt-6">
        ¿Ya lo recuerdas?{' '}
        <Link href="/login" className="text-sky-400 font-semibold hover:text-sky-300 hover:underline">
          Iniciar sesión
        </Link>
      </p>
    </>
  )
}
