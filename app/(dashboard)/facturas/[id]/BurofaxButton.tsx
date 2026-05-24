'use client'

import { useState } from 'react'

export default function BurofaxButton({
  facturaId,
  burofaxEnviadoAt,
}: {
  facturaId: string
  burofaxEnviadoAt: string | null
}) {
  const [enviando, setEnviando] = useState(false)
  const [resultado, setResultado] = useState<{ ok: boolean; mensaje: string } | null>(null)
  const [confirmando, setConfirmando] = useState(false)

  async function enviarBurofax() {
    setEnviando(true)
    setResultado(null)
    try {
      const res = await fetch('/api/burofax/enviar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ facturaId }),
      })
      const data = await res.json()
      if (res.ok) {
        setResultado({ ok: true, mensaje: `✓ Burofax enviado (${data.usados}/${data.limite} este mes)` })
        setConfirmando(false)
      } else {
        setResultado({ ok: false, mensaje: data.error || 'Error al enviar el burofax' })
        setConfirmando(false)
      }
    } catch {
      setResultado({ ok: false, mensaje: 'Error de red. Inténtalo de nuevo.' })
      setConfirmando(false)
    } finally {
      setEnviando(false)
    }
  }

  if (resultado?.ok) {
    return (
      <div className="mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-2 text-sm text-amber-300">
          <span>📜</span>
          <span>{resultado.mensaje}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4 pt-4 border-t border-white/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-amber-200">📜 Burofax de reclamación</p>
          <p className="text-xs text-zinc-400 mt-0.5">
            Envía una carta fehaciente de reclamación de deuda con validez legal.
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
            className="shrink-0 text-xs font-bold text-amber-900 bg-amber-400 hover:bg-amber-300 px-3 py-2 rounded-lg transition-colors"
          >
            Enviar burofax
          </button>
        ) : (
          <div className="flex flex-col items-end gap-2">
            <p className="text-xs text-zinc-300 text-right">¿Confirmas el envío?<br />Se usará 1 burofax del mes.</p>
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
                onClick={enviarBurofax}
                disabled={enviando}
                className="text-xs font-bold text-amber-900 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {enviando ? 'Enviando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        )}
      </div>

      {resultado && !resultado.ok && (
        <p className="text-xs text-rose-400 mt-2">{resultado.mensaje}</p>
      )}
    </div>
  )
}
