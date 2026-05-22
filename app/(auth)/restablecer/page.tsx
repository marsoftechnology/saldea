'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function RestablecerPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const [sesionLista, setSesionLista] = useState(false)
  const [verificando, setVerificando] = useState(true)
  const [completado, setCompletado] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    // Con el flujo PKCE + /auth/callback, la sesión ya está establecida
    // cuando el usuario llega aquí. getSession() debería devolverla de inmediato.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setSesionLista(true)
      }
      setVerificando(false)
    })

    // Fallback: escuchar eventos por si el SDK aún procesa algo
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        setSesionLista(true)
        setVerificando(false)
      }
    })

    return () => sub.subscription.unsubscribe()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    if (password !== password2) {
      setError('Las contraseñas no coinciden')
      return
    }

    setCargando(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError('No hemos podido actualizar la contraseña. El enlace puede haber caducado.')
      setCargando(false)
      return
    }

    setCompletado(true)
    setCargando(false)
    setTimeout(() => router.push('/dashboard'), 1500)
  }

  if (completado) {
    return (
      <>
        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">¡Contraseña actualizada!</h1>
        <p className="text-zinc-400 text-sm mb-6">Te estamos llevando a tu dashboard…</p>
      </>
    )
  }

  if (verificando) {
    return (
      <>
        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Verificando enlace…</h1>
        <p className="text-zinc-400 text-sm">Un momento por favor.</p>
      </>
    )
  }

  if (!sesionLista) {
    return (
      <>
        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Enlace inválido o caducado</h1>
        <p className="text-zinc-400 text-sm mb-6">
          Este enlace ya no es válido. Los enlaces de recuperación caducan en 1 hora y solo se pueden usar una vez.
        </p>
        <Link
          href="/recuperar"
          className="block w-full text-center bg-sky-500 text-zinc-900 py-3 rounded-lg font-bold hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"
        >
          Solicitar nuevo enlace
        </Link>
      </>
    )
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Nueva contraseña</h1>
      <p className="text-zinc-400 text-sm mb-8">Crea una contraseña nueva para tu cuenta.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">Nueva contraseña</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Mínimo 6 caracteres"
            className="w-full px-4 py-3 bg-zinc-900/80 border border-white/10 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">Repite la contraseña</label>
          <input
            type="password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
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
          {cargando ? 'Guardando...' : 'Guardar contraseña'}
        </button>
      </form>
    </>
  )
}
