'use client'

import { useState } from 'react'

interface Props {
  facturaId: string
  /** El cliente tiene teléfono + whatsapp_opt_in_at */
  clienteConOptin: boolean
}

export default function WhatsAppEnviarFacturaButton({ facturaId, clienteConOptin }: Props) {
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'ok' | 'error'>('idle')
  const [mensajeError, setMensajeError] = useState('')

  if (!clienteConOptin) return null

  async function handleEnviar() {
    if (estado === 'enviando' || estado === 'ok') return
    setEstado('enviando')
    setMensajeError('')

    try {
      const res = await fetch('/api/whatsapp-factura-enviar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ facturaId }),
      })
      const data = await res.json()
      if (!res.ok) {
        setMensajeError(data.mensaje || 'No se pudo enviar la factura por WhatsApp.')
        setEstado('error')
        return
      }
      setEstado('ok')
    } catch {
      setMensajeError('Error de conexión. Inténtalo de nuevo.')
      setEstado('error')
    }
  }

  return (
    <div className="mt-4 pt-4 border-t border-white/5">
      {estado === 'ok' ? (
        <p className="text-sm text-emerald-400 flex items-center gap-2">
          ✅ Factura enviada por WhatsApp
        </p>
      ) : (
        <div className="flex flex-col gap-1.5">
          <button
            onClick={handleEnviar}
            disabled={estado === 'enviando'}
            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-emerald-500/20 transition-colors disabled:opacity-60 w-fit"
          >
            {estado === 'enviando' ? (
              <>⏳ Enviando...</>
            ) : (
              <>💬 Enviar factura por WhatsApp</>
            )}
          </button>
          {estado === 'error' && (
            <p className="text-xs text-rose-400">{mensajeError}</p>
          )}
        </div>
      )}
    </div>
  )
}
