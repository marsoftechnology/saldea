'use client'

import { useState, useEffect } from 'react'

export default function BurofaxButton({
  facturaId,
  burofaxEnviadoAt,
}: {
  facturaId: string
  burofaxEnviadoAt: string | null
}) {
  const [estado, setEstado] = useState<'idle' | 'redirigiendo' | 'procesando' | 'ok' | 'error'>('idle')
  const [mensaje, setMensaje] = useState('')
  const [confirmando, setConfirmando] = useState(false)

  // Al volver de Stripe Checkout, detectar ?buro_session=... y enviar el burofax
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get('buro_session')
    if (!sessionId) return

    // Limpiar URL sin recargar
    window.history.replaceState({}, '', window.location.pathname)

    setEstado('procesando')
    fetch('/api/burofax/enviar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ facturaId, checkoutSessionId: sessionId }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          setEstado('ok')
        } else {
          setEstado('error')
          setMensaje(data.error || 'Error al enviar el burofax')
        }
      })
      .catch(() => {
        setEstado('error')
        setMensaje('Error de red. Inténtalo de nuevo.')
      })
  }, [facturaId])

  async function iniciarPago() {
    setEstado('redirigiendo')
    setConfirmando(false)
    try {
      const res = await fetch('/api/burofax/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ facturaId }),
      })
      const data = await res.json()
      if (res.ok && data.url) {
        window.location.href = data.url
      } else {
        setEstado('error')
        setMensaje(data.error || 'Error al iniciar el pago')
      }
    } catch {
      setEstado('error')
      setMensaje('Error de red. Inténtalo de nuevo.')
    }
  }

  if (estado === 'ok') {
    return (
      <div className="mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-2 text-sm text-amber-300">
          <span>📜</span>
          <span>✓ Burofax electrónico enviado correctamente</span>
        </div>
      </div>
    )
  }

  if (estado === 'procesando') {
    return (
      <div className="mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-2 text-sm text-amber-300/70 animate-pulse">
          <span>📜</span>
          <span>Enviando burofax...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4 pt-4 border-t border-white/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-amber-200">📜 Burofax electrónico</p>
          <p className="text-xs text-zinc-400 mt-0.5">
            Requerimiento fehaciente de pago con validez legal certificada vía lleida.net.
            {burofaxEnviadoAt && (
              <span className="block text-amber-300/70 mt-0.5">
                Ya enviado el {new Date(burofaxEnviadoAt).toLocaleDateString('es-ES')}
              </span>
            )}
          </p>
        </div>

        {!confirmando ? (
          <button
            type="button"
            onClick={() => setConfirmando(true)}
            disabled={estado === 'redirigiendo'}
            className="shrink-0 text-xs font-bold text-amber-900 bg-amber-400 hover:bg-amber-300 px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            Enviar burofax
          </button>
        ) : (
          <div className="flex flex-col items-end gap-2">
            <p className="text-xs text-zinc-300 text-right">
              ¿Confirmas el envío?<br />
              <span className="text-amber-300 font-semibold">Pago de 6€ mediante Stripe.</span>
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmando(false)}
                className="text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1.5"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={iniciarPago}
                disabled={estado === 'redirigiendo'}
                className="text-xs font-bold text-amber-900 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {estado === 'redirigiendo' ? 'Redirigiendo...' : 'Pagar 6€'}
              </button>
            </div>
          </div>
        )}
      </div>

      {estado === 'error' && mensaje && (
        <p className="text-xs text-rose-400 mt-2">{mensaje}</p>
      )}
    </div>
  )
}
