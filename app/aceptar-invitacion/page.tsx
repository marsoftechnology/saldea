'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

const ETIQUETAS_ROL: Record<string, string> = {
  owner: 'Propietario',
  admin: 'Administrador',
  member: 'Miembro',
  readonly: 'Solo lectura',
}

function AceptarInvitacionInner() {
  const params = useSearchParams()
  const router = useRouter()
  const token = params.get('token')

  const [estado, setEstado] = useState<'cargando' | 'cargada' | 'aceptada' | 'error' | 'requiere_login'>('cargando')
  const [info, setInfo] = useState<{ email: string; role: string; nombreOrg: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [aceptando, setAceptando] = useState(false)

  useEffect(() => {
    if (!token) {
      setEstado('error')
      setError('Falta el token de invitación')
      return
    }

    fetch(`/api/equipo/aceptar-invitacion?token=${encodeURIComponent(token)}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          setEstado('error')
          setError(data.error)
        } else {
          setInfo(data)
          setEstado('cargada')
        }
      })
      .catch(() => {
        setEstado('error')
        setError('No se pudo cargar la invitación. Inténtalo de nuevo más tarde.')
      })
  }, [token])

  async function aceptar() {
    if (!token) return
    setAceptando(true)
    setError(null)
    try {
      const res = await fetch('/api/equipo/aceptar-invitacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const data = await res.json()
      if (res.status === 401) {
        setEstado('requiere_login')
        return
      }
      if (!res.ok) {
        setError(data?.error ?? 'No se pudo aceptar')
        setAceptando(false)
        return
      }
      setEstado('aceptada')
      setTimeout(() => router.push('/dashboard'), 1500)
    } catch {
      setError('Error de red')
      setAceptando(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-zinc-900/60 border border-white/10 rounded-2xl p-8">
        {estado === 'cargando' && (
          <p className="text-zinc-400 text-sm text-center">Cargando invitación...</p>
        )}

        {estado === 'cargada' && info && (
          <>
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🎉</div>
              <h1 className="text-2xl font-bold text-zinc-100 mb-2">¡Te han invitado!</h1>
              <p className="text-zinc-400 text-sm">
                Has sido invitado a colaborar en <strong className="text-zinc-100">{info.nombreOrg}</strong> como{' '}
                <strong className="text-sky-300">{ETIQUETAS_ROL[info.role] ?? info.role}</strong>.
              </p>
              <p className="text-xs text-zinc-500 mt-3">
                La invitación es para <strong>{info.email}</strong>. Asegúrate de estar conectado con esa cuenta.
              </p>
            </div>

            <button
              onClick={aceptar}
              disabled={aceptando}
              className="w-full bg-sky-500 hover:bg-sky-400 text-white font-medium py-3 rounded-lg disabled:opacity-60"
            >
              {aceptando ? 'Aceptando...' : 'Aceptar invitación'}
            </button>

            {error && (
              <div className="mt-4 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm px-3 py-2 rounded-lg">
                {error}
              </div>
            )}
          </>
        )}

        {estado === 'requiere_login' && info && (
          <>
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🔒</div>
              <h1 className="text-xl font-bold text-zinc-100 mb-2">Inicia sesión para continuar</h1>
              <p className="text-zinc-400 text-sm">
                Debes iniciar sesión con <strong className="text-zinc-100">{info.email}</strong> para aceptar la invitación.
              </p>
              <p className="text-xs text-zinc-500 mt-3">
                Si aún no tienes cuenta, regístrate primero con ese email — la invitación quedará vinculada.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/login?next=${encodeURIComponent(`/aceptar-invitacion?token=${token}`)}`}
                className="flex-1 text-center bg-sky-500 hover:bg-sky-400 text-white font-medium py-3 rounded-lg"
              >
                Iniciar sesión
              </Link>
              <Link
                href={`/registro?email=${encodeURIComponent(info.email)}&next=${encodeURIComponent(`/aceptar-invitacion?token=${token}`)}`}
                className="flex-1 text-center bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-200 font-medium py-3 rounded-lg"
              >
                Crear cuenta
              </Link>
            </div>
          </>
        )}

        {estado === 'aceptada' && (
          <div className="text-center">
            <div className="text-4xl mb-2">✓</div>
            <h1 className="text-xl font-bold text-zinc-100 mb-2">¡Bienvenido al equipo!</h1>
            <p className="text-zinc-400 text-sm">Te llevamos al panel...</p>
          </div>
        )}

        {estado === 'error' && (
          <div className="text-center">
            <div className="text-4xl mb-2">⚠️</div>
            <h1 className="text-xl font-bold text-zinc-100 mb-2">No se pudo cargar</h1>
            <p className="text-rose-300 text-sm mb-4">{error}</p>
            <Link href="/" className="text-sky-400 hover:text-sky-300 text-sm">
              Volver al inicio
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AceptarInvitacionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0b]"></div>}>
      <AceptarInvitacionInner />
    </Suspense>
  )
}
