'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Estado {
  nombreOrg: string
  completado: boolean
  firma: string
  stripeConectado: boolean
  contadores: { facturas: number; clientes: number; miembros: number }
  rol: string
}

export default function BienvenidaPage() {
  const router = useRouter()
  const [estado, setEstado] = useState<Estado | null>(null)
  const [paso, setPaso] = useState<1 | 2 | 3>(1)
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)

  // Paso 1
  const [nombreOrg, setNombreOrg] = useState('')
  const [firma, setFirma] = useState('')

  // Paso 3
  const [emailsInvitar, setEmailsInvitar] = useState('')
  const [rolInvitar, setRolInvitar] = useState<'admin' | 'member' | 'readonly'>('member')
  const [resultadoInvitar, setResultadoInvitar] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/onboarding')
      .then(r => r.json())
      .then((data: Estado) => {
        setEstado(data)
        setNombreOrg(data.nombreOrg ?? '')
        setFirma(data.firma ?? '')
      })
      .finally(() => setCargando(false))
  }, [])

  async function avanzarDePaso1() {
    if (!nombreOrg.trim()) return
    setGuardando(true)
    // Solo guardamos los datos del paso 1 — el onboarding NO se marca como completado aún
    await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombreOrg: nombreOrg.trim(), firma: firma.trim(), marcarCompletado: false }),
    })
    setGuardando(false)
    setPaso(2)
  }

  async function invitarEmails() {
    const emails = emailsInvitar.split(/[,\s\n]+/).map(s => s.trim()).filter(s => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))
    if (emails.length === 0) return
    setGuardando(true)
    setResultadoInvitar(null)
    let ok = 0
    let err = 0
    for (const email of emails) {
      try {
        const res = await fetch('/api/equipo/invitar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, role: rolInvitar }),
        })
        if (res.ok) ok++
        else err++
      } catch { err++ }
    }
    setResultadoInvitar(`✓ ${ok} invitación${ok === 1 ? '' : 'es'} enviada${ok === 1 ? '' : 's'}${err ? ` · ${err} fallaron` : ''}`)
    setGuardando(false)
  }

  async function terminar(destino: '/facturas/nueva' | '/dashboard') {
    setGuardando(true)
    await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}), // marca onboarding_completado_at
    })
    router.push(destino)
  }

  if (cargando) {
    return <div className="p-8 text-zinc-500">Cargando...</div>
  }

  if (!estado) {
    return <div className="p-8 text-rose-400">Error cargando onboarding</div>
  }

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-xl w-full">
        {/* Progreso */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map(n => (
            <div key={n} className="flex-1 flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                  paso >= n ? 'bg-sky-500 text-zinc-900' : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                {paso > n ? '✓' : n}
              </div>
              {n < 3 && <div className={`flex-1 h-0.5 ${paso > n ? 'bg-sky-500' : 'bg-zinc-800'}`} />}
            </div>
          ))}
        </div>

        {/* PASO 1: Empresa */}
        {paso === 1 && (
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-zinc-100 mb-2">👋 Bienvenido a Saldea</h1>
              <p className="text-sm text-zinc-400">
                Vamos a configurar lo básico en 3 pasos rápidos (puedes saltar el 2 y el 3).
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Nombre de tu empresa o despacho *
                </label>
                <input
                  type="text"
                  value={nombreOrg}
                  onChange={e => setNombreOrg(e.target.value)}
                  placeholder="Gestoría López & Asociados"
                  maxLength={80}
                  className="w-full px-4 py-3 border border-white/10 rounded-lg text-zinc-100 placeholder-zinc-600 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                />
                <p className="text-xs text-zinc-500 mt-1">
                  Es el nombre que aparecerá en los emails y facturas que mandes a tus clientes.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Firma de email <span className="text-zinc-500 font-normal">(opcional)</span>
                </label>
                <textarea
                  value={firma}
                  onChange={e => setFirma(e.target.value)}
                  rows={4}
                  placeholder={`Ana López\nGestoría López & Asociados\n📞 955 12 34 56\n📧 ana@ejemplo.es`}
                  className="w-full px-4 py-3 border border-white/10 rounded-lg text-zinc-100 placeholder-zinc-600 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40 resize-y"
                />
                <p className="text-xs text-zinc-500 mt-1">
                  Se añadirá automáticamente al final de cada email a tus clientes. Puedes cambiarla luego en Ajustes.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-between gap-3">
              <button
                onClick={() => terminar('/dashboard')}
                disabled={guardando}
                className="text-sm text-zinc-500 hover:text-zinc-300"
              >
                Saltar todo
              </button>
              <button
                onClick={avanzarDePaso1}
                disabled={guardando || !nombreOrg.trim()}
                className="bg-sky-500 hover:bg-sky-400 text-white font-medium px-6 py-2.5 rounded-lg disabled:opacity-60"
              >
                {guardando ? 'Guardando…' : 'Siguiente →'}
              </button>
            </div>
          </div>
        )}

        {/* PASO 2: Stripe Connect */}
        {paso === 2 && (
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-zinc-100 mb-2 flex items-center gap-2">
                <span>💳</span> Cobros automáticos con Stripe
              </h1>
              <p className="text-sm text-zinc-400">
                Conecta tu Stripe para que tus clientes puedan pagar al instante con tarjeta y las facturas se marquen como cobradas automáticamente. Es opcional, puedes hacerlo después.
              </p>
            </div>

            <div className="space-y-3 text-sm text-zinc-300 mb-6">
              <div className="flex gap-3">
                <span className="text-sky-400 shrink-0">✓</span>
                <span>El dinero llega directamente a tu cuenta bancaria. Saldea nunca toca el dinero.</span>
              </div>
              <div className="flex gap-3">
                <span className="text-sky-400 shrink-0">✓</span>
                <span>Sin comisiones extra. Solo las propias de Stripe (1,4% + 0,25€ en tarjetas EU).</span>
              </div>
              <div className="flex gap-3">
                <span className="text-sky-400 shrink-0">✓</span>
                <span>Tarda 5 minutos: conectas tu cuenta de Stripe existente (o creas una en el momento) y listo.</span>
              </div>
            </div>

            {estado.stripeConectado ? (
              <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-4 mb-4 text-sm text-sky-300">
                ✓ Ya tienes Stripe conectado. Tus links de pago funcionarán automáticamente.
              </div>
            ) : estado.rol !== 'owner' ? (
              <div className="bg-zinc-900/60 border border-white/10 rounded-lg p-4 mb-4 text-xs text-zinc-400">
                Solo el propietario de la organización puede conectar Stripe. Puedes pedírselo al propietario.
              </div>
            ) : (
              <a
                href="/api/stripe-connect/start"
                className="block w-full bg-[#635BFF] hover:bg-[#5048e5] text-white font-medium text-sm px-4 py-3 rounded-lg text-center mb-4"
              >
                Conectar Stripe ahora →
              </a>
            )}

            <div className="mt-8 flex justify-between gap-3">
              <button
                onClick={() => setPaso(1)}
                disabled={guardando}
                className="text-sm text-zinc-500 hover:text-zinc-300"
              >
                ← Atrás
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setPaso(3)}
                  className="text-sm text-zinc-400 hover:text-zinc-200 border border-white/10 hover:bg-white/5 px-4 py-2 rounded-lg"
                >
                  Lo haré después
                </button>
                <button
                  onClick={() => setPaso(3)}
                  className="bg-sky-500 hover:bg-sky-400 text-white font-medium px-6 py-2.5 rounded-lg"
                >
                  Siguiente →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PASO 3: Invitar equipo */}
        {paso === 3 && (
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-zinc-100 mb-2 flex items-center gap-2">
                <span>🤝</span> Invita a tu equipo
              </h1>
              <p className="text-sm text-zinc-400">
                Si trabajas en equipo, invita a tus compañeros para que puedan gestionar los cobros contigo. Es opcional.
              </p>
            </div>

            {estado.rol !== 'owner' && estado.rol !== 'admin' ? (
              <div className="bg-zinc-900/60 border border-white/10 rounded-lg p-4 mb-4 text-xs text-zinc-400">
                Solo el propietario o administradores pueden invitar miembros.
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                      Emails a invitar
                    </label>
                    <textarea
                      value={emailsInvitar}
                      onChange={e => setEmailsInvitar(e.target.value)}
                      rows={3}
                      placeholder="manolo@ejemplo.com, lola@ejemplo.com"
                      className="w-full px-4 py-3 border border-white/10 rounded-lg text-zinc-100 placeholder-zinc-600 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40 resize-none"
                    />
                    <p className="text-xs text-zinc-500 mt-1">
                      Separados por coma. Cada uno recibirá un email para aceptar la invitación.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Rol</label>
                    <select
                      value={rolInvitar}
                      onChange={e => setRolInvitar(e.target.value as 'admin' | 'member' | 'readonly')}
                      className="w-full px-4 py-3 border border-white/10 rounded-lg text-zinc-100 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    >
                      <option value="member">Miembro (crea facturas, envía recordatorios, registra pagos)</option>
                      <option value="admin">Administrador (todo lo anterior + invitar miembros)</option>
                      <option value="readonly">Solo lectura (solo consulta)</option>
                    </select>
                  </div>
                  <button
                    onClick={invitarEmails}
                    disabled={guardando || !emailsInvitar.trim()}
                    className="w-full bg-zinc-900/60 hover:bg-zinc-900 border border-white/10 text-zinc-100 font-medium text-sm px-4 py-2.5 rounded-lg disabled:opacity-60"
                  >
                    {guardando ? 'Enviando…' : 'Enviar invitaciones'}
                  </button>
                  {resultadoInvitar && (
                    <div className="text-xs text-sky-300 bg-sky-500/10 border border-sky-500/30 px-3 py-2 rounded-lg">
                      {resultadoInvitar}
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="mt-8 flex justify-between gap-3 border-t border-white/5 pt-6">
              <button
                onClick={() => setPaso(2)}
                disabled={guardando}
                className="text-sm text-zinc-500 hover:text-zinc-300"
              >
                ← Atrás
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => terminar('/dashboard')}
                  disabled={guardando}
                  className="text-sm text-zinc-400 hover:text-zinc-200 border border-white/10 hover:bg-white/5 px-4 py-2 rounded-lg"
                >
                  Ir al panel
                </button>
                <button
                  onClick={() => terminar('/facturas/nueva')}
                  disabled={guardando}
                  className="bg-sky-500 hover:bg-sky-400 text-white font-medium px-6 py-2.5 rounded-lg disabled:opacity-60"
                >
                  {guardando ? 'Terminando…' : 'Crear mi primera factura →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Skip de seguridad: siempre visible */}
        <div className="text-center mt-6">
          <Link href="/dashboard" className="text-xs text-zinc-600 hover:text-zinc-400">
            Cerrar y configurar después
          </Link>
        </div>
      </div>
    </div>
  )
}
