'use client'

import { useState } from 'react'

interface Props {
  token: string
  clienteNombre: string
}

export default function PortalClienteLink({ token, clienteNombre }: Props) {
  const [copiado, setCopiado] = useState(false)

  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/portal/${token}`
    : `https://www.marsof.es/portal/${token}`

  async function copiar() {
    try {
      await navigator.clipboard.writeText(url)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2500)
    } catch { /* fallback silencioso */ }
  }

  function enviarWhatsApp() {
    const msg = encodeURIComponent(
      `Hola ${clienteNombre}, te comparto el enlace a tu portal de facturas donde puedes ver tus facturas pendientes y realizar el pago: ${url}`
    )
    window.open(`https://wa.me/?text=${msg}`, '_blank')
  }

  return (
    <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">🔗</span>
        <h2 className="font-semibold text-zinc-100 text-sm">Portal del cliente</h2>
        <span className="text-xs text-zinc-500 font-normal">— ve todas sus facturas pendientes</span>
      </div>

      {/* URL */}
      <div className="flex items-center gap-2 bg-zinc-800/60 border border-white/5 rounded-lg px-3 py-2 mb-3">
        <code className="flex-1 text-xs text-sky-300 font-mono truncate">{url}</code>
        <button
          onClick={copiar}
          className="shrink-0 text-xs text-sky-300 hover:text-sky-200 border border-sky-500/30 px-2 py-1 rounded transition-colors"
        >
          {copiado ? '✓ Copiado' : 'Copiar'}
        </button>
      </div>

      {/* Acciones */}
      <div className="flex gap-2 flex-wrap">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-400 hover:text-zinc-100 border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg transition-colors"
        >
          👁 Vista previa
        </a>
        <button
          onClick={enviarWhatsApp}
          className="text-xs text-emerald-300 hover:text-emerald-200 border border-emerald-500/20 hover:border-emerald-500/40 bg-emerald-500/5 hover:bg-emerald-500/10 px-3 py-1.5 rounded-lg transition-colors"
        >
          📲 Enviar por WhatsApp
        </button>
      </div>

      <p className="text-xs text-zinc-600 mt-3">
        Comparte este enlace con {clienteNombre} para que pueda ver sus facturas pendientes y pagar directamente.
      </p>
    </div>
  )
}
