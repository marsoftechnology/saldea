'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

type Rol = 'owner' | 'admin' | 'member' | 'readonly'

interface Org {
  id: string
  name: string
  role: Rol
  es_owner: boolean
}

const ETIQUETA_ROL: Record<Rol, string> = {
  owner: 'Propietario',
  admin: 'Admin',
  member: 'Miembro',
  readonly: 'Solo lectura',
}

const COLOR_ROL: Record<Rol, string> = {
  owner: 'text-amber-300',
  admin: 'text-sky-300',
  member: 'text-emerald-300',
  readonly: 'text-zinc-400',
}

export default function OrgSwitcher() {
  const router = useRouter()
  const [orgs, setOrgs] = useState<Org[]>([])
  const [activeOrgId, setActiveOrgId] = useState<string | null>(null)
  const [abierto, setAbierto] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [cambiando, setCambiando] = useState(false)
  const [modoCrear, setModoCrear] = useState(false)
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [creandoNueva, setCreandoNueva] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  async function cargar() {
    setCargando(true)
    try {
      const res = await fetch('/api/me/orgs')
      const data = await res.json()
      setOrgs(data.orgs ?? [])
      setActiveOrgId(data.activeOrgId ?? null)
    } catch {
      // ignore
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => { cargar() }, [])

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setAbierto(false)
        setModoCrear(false)
        setError(null)
      }
    }
    if (abierto) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [abierto])

  async function cambiarA(orgId: string) {
    if (orgId === activeOrgId) {
      setAbierto(false)
      return
    }
    setCambiando(true)
    setError(null)
    try {
      const res = await fetch('/api/me/orgs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orgId }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data?.error ?? 'No se pudo cambiar')
        return
      }
      // Recargar la página para que los server components carguen con la nueva org
      window.location.href = '/dashboard'
    } catch {
      setError('Error de red')
    } finally {
      setCambiando(false)
    }
  }

  async function crearNueva() {
    if (!nuevoNombre.trim()) return
    setCreandoNueva(true)
    setError(null)
    try {
      const res = await fetch('/api/me/orgs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nuevoNombre.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error ?? 'No se pudo crear')
        setCreandoNueva(false)
        return
      }
      window.location.href = '/dashboard'
    } catch {
      setError('Error de red')
      setCreandoNueva(false)
    }
  }

  if (cargando) {
    return <div className="h-9 bg-zinc-900/40 rounded-lg animate-pulse mt-3" />
  }

  const orgActiva = orgs.find(o => o.id === activeOrgId)
  const otras = orgs.filter(o => o.id !== activeOrgId)

  // Si solo tiene una org y no quiere ver el switcher → mostramos el nombre sin chevron
  // Pero permitimos crear otra → siempre mostramos el botón con chevron
  return (
    <div ref={wrapperRef} className="relative mt-3">
      <button
        onClick={() => setAbierto(o => !o)}
        className="w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg border border-white/10 bg-zinc-900/40 hover:bg-zinc-900/70 transition-colors text-left"
      >
        <div className="min-w-0 flex-1">
          <p className="text-xs text-zinc-100 font-medium truncate" title={orgActiva?.name}>
            {orgActiva?.name ?? '—'}
          </p>
          <p className={`text-[10px] ${orgActiva ? COLOR_ROL[orgActiva.role] : 'text-zinc-500'} truncate`}>
            {orgActiva ? ETIQUETA_ROL[orgActiva.role] : ''}
          </p>
        </div>
        <span className={`text-zinc-500 text-xs transition-transform ${abierto ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {abierto && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-zinc-900 border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
          {otras.length > 0 && (
            <div className="py-1 max-h-60 overflow-y-auto">
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 px-3 pt-2 pb-1">Cambiar a</p>
              {otras.map(o => (
                <button
                  key={o.id}
                  onClick={() => cambiarA(o.id)}
                  disabled={cambiando}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2 hover:bg-white/5 text-left disabled:opacity-60"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-zinc-100 truncate" title={o.name}>{o.name}</p>
                    <p className={`text-[10px] ${COLOR_ROL[o.role]}`}>{ETIQUETA_ROL[o.role]}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="border-t border-white/5 py-1">
            {modoCrear ? (
              <div className="px-3 py-2">
                <input
                  type="text"
                  value={nuevoNombre}
                  onChange={e => setNuevoNombre(e.target.value)}
                  placeholder="Nombre de la nueva empresa"
                  maxLength={80}
                  autoFocus
                  onKeyDown={e => { if (e.key === 'Enter') crearNueva() }}
                  className="w-full px-2 py-1.5 text-xs bg-zinc-900/40 border border-white/10 rounded text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                />
                <div className="flex gap-1.5 mt-1.5">
                  <button
                    onClick={() => { setModoCrear(false); setNuevoNombre(''); setError(null) }}
                    className="text-[10px] px-2 py-1 text-zinc-400 hover:text-zinc-200"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={crearNueva}
                    disabled={creandoNueva || !nuevoNombre.trim()}
                    className="text-[10px] px-2 py-1 rounded bg-sky-500 hover:bg-sky-400 text-white font-medium disabled:opacity-60 flex-1"
                  >
                    {creandoNueva ? 'Creando…' : 'Crear'}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setModoCrear(true)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-sky-400 hover:bg-white/5 hover:text-sky-300"
              >
                <span>＋</span>
                <span>Crear nueva organización</span>
              </button>
            )}
            <button
              onClick={() => { setAbierto(false); router.push('/equipo') }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
            >
              <span>🤝</span>
              <span>Gestionar equipo</span>
            </button>
          </div>

          {error && (
            <div className="border-t border-white/5 px-3 py-2 text-[10px] text-rose-400 bg-rose-500/5">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
