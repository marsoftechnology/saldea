'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Rol = 'owner' | 'admin' | 'member' | 'readonly'

interface Miembro {
  id: string
  user_id: string
  role: Rol
  created_at: string
  email: string
  nombre: string | null
  esTuYo: boolean
}

interface Invite {
  id: string
  email: string
  role: Rol
  created_at: string
  expires_at: string
}

const ETIQUETAS_ROL: Record<Rol, string> = {
  owner: 'Propietario',
  admin: 'Administrador',
  member: 'Miembro',
  readonly: 'Solo lectura',
}

const DESCRIPCION_ROL: Record<Rol, string> = {
  owner: 'Control total · gestiona el plan, conecta Stripe, puede borrar la cuenta',
  admin: 'Invita miembros · cambia configuración · todas las operaciones de cobro',
  member: 'Crea/edita clientes y facturas · envía recordatorios · registra pagos',
  readonly: 'Solo visualiza facturas, clientes y analytics. No puede editar nada.',
}

const COLOR_ROL: Record<Rol, string> = {
  owner: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  admin: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
  member: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
  readonly: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30',
}

export default function EquipoPage() {
  const [miembros, setMiembros] = useState<Miembro[]>([])
  const [invitaciones, setInvitaciones] = useState<Invite[]>([])
  const [miRol, setMiRol] = useState<Rol | null>(null)
  const [plan, setPlan] = useState<'free' | 'pro'>('free')
  const [limite, setLimite] = useState<number>(1)
  const [usados, setUsados] = useState<number>(0)
  const [cargando, setCargando] = useState(true)

  const [emailInvitar, setEmailInvitar] = useState('')
  const [rolInvitar, setRolInvitar] = useState<Rol>('member')
  const [invitando, setInvitando] = useState(false)
  const [aviso, setAviso] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null)

  async function cargar() {
    setCargando(true)
    try {
      const res = await fetch('/api/equipo/miembros')
      const data = await res.json()
      setMiembros(data.miembros ?? [])
      setInvitaciones(data.invitaciones ?? [])
      setMiRol(data.miRol ?? null)
      setPlan(data.plan ?? 'free')
      setLimite(data.limite ?? 1)
      setUsados(data.usados ?? 0)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => { cargar() }, [])

  const puedeGestionar = miRol === 'owner' || miRol === 'admin'
  const asientosLlenos = usados >= limite
  const planFreeBloqueando = plan === 'free' && asientosLlenos

  async function invitar() {
    setAviso(null)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInvitar.trim())) {
      setAviso({ tipo: 'error', texto: 'Email no válido' })
      return
    }
    setInvitando(true)
    try {
      const res = await fetch('/api/equipo/invitar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInvitar.trim(), role: rolInvitar }),
      })
      const data = await res.json()
      if (!res.ok) {
        setAviso({ tipo: 'error', texto: data?.error ?? 'No se pudo invitar' })
        return
      }
      setAviso({
        tipo: 'ok',
        texto: data.emailEnviado
          ? `✓ Invitación enviada a ${emailInvitar.trim()}`
          : `✓ Invitación creada. (El email no se pudo enviar — comparte el link manualmente)`,
      })
      setEmailInvitar('')
      setRolInvitar('member')
      cargar()
    } catch {
      setAviso({ tipo: 'error', texto: 'Error de red' })
    } finally {
      setInvitando(false)
    }
  }

  async function cambiarRol(memberId: string, nuevoRol: Rol) {
    const res = await fetch(`/api/equipo/miembros/${memberId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: nuevoRol }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setAviso({ tipo: 'error', texto: data?.error ?? 'No se pudo cambiar el rol' })
      return
    }
    cargar()
  }

  async function eliminarMiembro(memberId: string, email: string) {
    if (!confirm(`¿Quitar a ${email} del equipo? Perderá el acceso a la cuenta inmediatamente.`)) return
    const res = await fetch(`/api/equipo/miembros/${memberId}`, { method: 'DELETE' })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setAviso({ tipo: 'error', texto: data?.error ?? 'No se pudo eliminar' })
      return
    }
    cargar()
  }

  async function cancelarInvitacion(inviteId: string) {
    if (!confirm('¿Cancelar esta invitación? El link enviado dejará de funcionar.')) return
    const res = await fetch(`/api/equipo/invitar?id=${inviteId}`, { method: 'DELETE' })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setAviso({ tipo: 'error', texto: data?.error ?? 'No se pudo cancelar' })
      return
    }
    cargar()
  }

  if (cargando) {
    return <div className="p-8 text-zinc-500">Cargando equipo...</div>
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-zinc-100 mb-4 inline-block">← Volver</Link>
        <h1 className="text-2xl font-bold text-zinc-100">👥 Equipo</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Invita a tu equipo para gestionar juntos los cobros. Cada uno puede registrar pagos, enviar recordatorios y consultar facturas.
        </p>
      </div>

      {/* Banner de plan + asientos */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4 mb-4 flex items-center justify-between gap-3 flex-wrap">
        <div className="text-xs text-zinc-400">
          <span className="font-semibold text-zinc-100">{usados} / {limite}</span> asiento{limite === 1 ? '' : 's'} usado{usados === 1 ? '' : 's'}
          <span className="text-zinc-600 mx-2">·</span>
          Plan <span className={`font-bold ${plan === 'pro' ? 'text-sky-300' : 'text-zinc-400'}`}>{plan.toUpperCase()}</span>
          {plan === 'free' && (
            <span className="text-zinc-600 ml-2">(Free: 1 miembro · Pro: hasta 10)</span>
          )}
        </div>
        {planFreeBloqueando && (
          <Link
            href="/ajustes#plan"
            className="text-xs font-bold text-zinc-900 bg-sky-500 hover:bg-sky-400 px-3 py-1.5 rounded-lg whitespace-nowrap"
          >
            Subir a Pro para invitar →
          </Link>
        )}
      </div>

      {/* Formulario de invitar */}
      {puedeGestionar && (
        <div className={`bg-zinc-900/40 border border-white/10 rounded-xl p-6 mb-6 ${asientosLlenos ? 'opacity-60' : ''}`}>
          <h2 className="font-semibold text-zinc-100 mb-3 flex items-center gap-2">
            <span>✉️</span> Invitar a un compañero
          </h2>
          {planFreeBloqueando && (
            <div className="mb-3 text-xs bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-2 rounded-lg">
              El plan Free solo incluye 1 miembro (tú). Sube a Pro para invitar a tu equipo (hasta {limite === 1 ? 10 : limite} miembros incluidos).
            </div>
          )}
          <div className="flex gap-2 flex-wrap">
            <input
              type="email"
              placeholder="email@ejemplo.com"
              value={emailInvitar}
              onChange={e => setEmailInvitar(e.target.value)}
              disabled={asientosLlenos}
              className="flex-1 min-w-[200px] px-3 py-2 border border-white/10 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40 disabled:cursor-not-allowed"
            />
            <select
              value={rolInvitar}
              onChange={e => setRolInvitar(e.target.value as Rol)}
              disabled={asientosLlenos}
              className="px-3 py-2 border border-white/10 rounded-lg text-sm text-zinc-100 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40 disabled:cursor-not-allowed"
            >
              <option value="member">Miembro</option>
              <option value="admin">Administrador</option>
              <option value="readonly">Solo lectura</option>
            </select>
            <button
              onClick={invitar}
              disabled={invitando || asientosLlenos}
              className="px-4 py-2 rounded-lg bg-sky-500 text-white font-medium text-sm hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {invitando ? 'Enviando…' : 'Invitar'}
            </button>
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            {DESCRIPCION_ROL[rolInvitar]}
          </p>
          {aviso && (
            <div className={`mt-3 text-xs px-3 py-2 rounded-lg ${
              aviso.tipo === 'ok'
                ? 'bg-sky-500/10 border border-sky-500/30 text-sky-300'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
            }`}>
              {aviso.texto}
            </div>
          )}
        </div>
      )}

      {/* Lista de miembros */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-xl mb-6">
        <div className="p-5 border-b border-white/5">
          <h2 className="font-semibold text-zinc-100">Miembros ({miembros.length})</h2>
        </div>
        <div className="divide-y divide-white/5">
          {miembros.map(m => (
            <div key={m.id} className="flex items-center justify-between gap-3 p-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center text-sm font-semibold">
                  {m.email.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-100 truncate">
                    {m.nombre ? `${m.nombre} · ${m.email}` : m.email}
                    {m.esTuYo && <span className="text-xs text-zinc-500 ml-2">(tú)</span>}
                  </p>
                  <p className="text-xs text-zinc-500">{DESCRIPCION_ROL[m.role].split(' · ')[0]}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {puedeGestionar && m.role !== 'owner' && !m.esTuYo ? (
                  <select
                    value={m.role}
                    onChange={e => cambiarRol(m.id, e.target.value as Rol)}
                    className={`text-xs px-2 py-1 rounded-full border ${COLOR_ROL[m.role]} bg-transparent focus:outline-none focus:ring-2 focus:ring-sky-500/40`}
                  >
                    <option value="admin">Administrador</option>
                    <option value="member">Miembro</option>
                    <option value="readonly">Solo lectura</option>
                  </select>
                ) : (
                  <span className={`text-xs font-medium px-2 py-1 rounded-full border ${COLOR_ROL[m.role]}`}>
                    {ETIQUETAS_ROL[m.role]}
                  </span>
                )}
                {puedeGestionar && m.role !== 'owner' && !m.esTuYo && (
                  <button
                    onClick={() => eliminarMiembro(m.id, m.email)}
                    className="text-xs text-zinc-500 hover:text-rose-400 px-2"
                    title="Quitar del equipo"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invitaciones pendientes */}
      {invitaciones.length > 0 && (
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl">
          <div className="p-5 border-b border-white/5">
            <h2 className="font-semibold text-zinc-100">Invitaciones pendientes ({invitaciones.length})</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Las invitaciones caducan a los 7 días.</p>
          </div>
          <div className="divide-y divide-white/5">
            {invitaciones.map(inv => (
              <div key={inv.id} className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="text-sm text-zinc-100 truncate">{inv.email}</p>
                  <p className="text-xs text-zinc-500">
                    Invitado como {ETIQUETAS_ROL[inv.role]} · expira{' '}
                    {new Date(inv.expires_at).toLocaleDateString('es-ES')}
                  </p>
                </div>
                {puedeGestionar && (
                  <button
                    onClick={() => cancelarInvitacion(inv.id)}
                    className="text-xs text-zinc-500 hover:text-rose-400"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!puedeGestionar && (
        <div className="mt-6 text-xs text-zinc-500">
          Eres <strong>{ETIQUETAS_ROL[miRol ?? 'member']}</strong> · solo el propietario o un administrador pueden invitar o eliminar miembros.
        </div>
      )}
    </div>
  )
}
