'use client'

import { useEffect, useState } from 'react'

interface Estado {
  connected: boolean
  accountId?: string
  chargesEnabled?: boolean
  detailsSubmitted?: boolean
  requiresAction?: boolean
  country?: string | null
  connectedAt?: string | null
}

export default function StripeConnectSection() {
  const [estado, setEstado] = useState<Estado | null>(null)
  const [cargando, setCargando] = useState(true)
  const [desconectando, setDesconectando] = useState(false)
  const [aviso, setAviso] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null)

  async function cargar() {
    setCargando(true)
    try {
      const res = await fetch('/api/stripe-connect/status')
      const data = await res.json()
      setEstado(data)
    } catch {
      setEstado({ connected: false })
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    // Mostrar avisos según query params del callback de OAuth
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('stripe_connected') === '1') {
        setAviso({ tipo: 'ok', texto: '✓ Stripe conectado. Ya puedes generar links de pago automáticos.' })
        // Limpiar URL
        window.history.replaceState({}, '', '/ajustes#stripe-connect')
      } else if (params.get('stripe_error')) {
        const err = params.get('stripe_error')!
        setAviso({ tipo: 'error', texto: `No se pudo conectar Stripe: ${decodeURIComponent(err)}` })
        window.history.replaceState({}, '', '/ajustes#stripe-connect')
      }
    }
    cargar()
  }, [])

  async function desconectar() {
    if (!confirm('¿Seguro? Tus clientes ya no podrán pagar a través de Saldea hasta que reconectes. Los links de Stripe ya enviados dejarán de funcionar.')) return
    setDesconectando(true)
    setAviso(null)
    try {
      const res = await fetch('/api/stripe-connect/disconnect', { method: 'POST' })
      if (!res.ok) throw new Error('disconnect failed')
      setAviso({ tipo: 'ok', texto: 'Stripe desvinculado.' })
      await cargar()
    } catch {
      setAviso({ tipo: 'error', texto: 'No se pudo desvincular. Inténtalo de nuevo.' })
    } finally {
      setDesconectando(false)
    }
  }

  if (cargando) {
    return (
      <div id="stripe-connect" className="mb-3 bg-zinc-900/40 border border-white/10 rounded-xl p-5">
        <p className="text-sm text-zinc-500">Cargando estado de Stripe…</p>
      </div>
    )
  }

  const conectado = estado?.connected === true
  const listoParaCobrar = conectado && estado?.chargesEnabled === true
  const requiereAccion = conectado && estado?.requiresAction === true

  return (
    <div id="stripe-connect" className="mb-3 bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">💳</span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-semibold text-zinc-100">Cobros automáticos con Stripe</h2>
                {listoParaCobrar && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide bg-sky-500/20 text-sky-300">
                    Conectado
                  </span>
                )}
                {conectado && !listoParaCobrar && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide bg-amber-500/20 text-amber-300">
                    Configuración pendiente
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                {listoParaCobrar
                  ? 'Tus clientes pueden pagar al instante con tarjeta. Las facturas se marcan como cobradas automáticamente al recibir el pago.'
                  : conectado
                  ? 'Conectaste tu Stripe pero aún no está habilitado para cobros. Termina de rellenar los datos fiscales en tu Dashboard de Stripe.'
                  : 'Conecta tu cuenta de Stripe y Saldea generará automáticamente un botón "Pagar ahora" en cada email. Cuando el cliente pague, la factura se marcará como cobrada sin que tengas que hacer nada.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            {!conectado ? (
              <a
                href="/api/stripe-connect/start"
                className="text-sm font-bold text-white bg-[#635BFF] hover:bg-[#5048e5] px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
              >
                Conectar Stripe →
              </a>
            ) : (
              <div className="flex gap-2">
                {requiereAccion && (
                  <a
                    href="https://dashboard.stripe.com/account"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 px-4 py-2 rounded-lg transition-colors"
                  >
                    Completar en Stripe →
                  </a>
                )}
                <button
                  onClick={desconectar}
                  disabled={desconectando}
                  className="text-sm text-rose-300 hover:bg-rose-500/10 border border-rose-500/30 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {desconectando ? 'Desconectando…' : 'Desconectar'}
                </button>
              </div>
            )}
          </div>
        </div>

        {aviso && (
          <div
            className={`text-xs px-3 py-2 rounded-lg mb-3 ${
              aviso.tipo === 'ok'
                ? 'bg-sky-500/10 border border-sky-500/30 text-sky-300'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
            }`}
          >
            {aviso.texto}
          </div>
        )}

        {!conectado && (
          <div className="border-t border-white/5 pt-4 mt-2 text-xs text-zinc-500 space-y-1">
            <p>· Sin comisiones extra de Saldea — solo las propias de Stripe (1,4% + 0,25€ en tarjetas EU)</p>
            <p>· El dinero llega directamente a tu cuenta bancaria, nunca pasa por Saldea</p>
            <p>· Puedes desconectar cuando quieras</p>
          </div>
        )}
      </div>
    </div>
  )
}
