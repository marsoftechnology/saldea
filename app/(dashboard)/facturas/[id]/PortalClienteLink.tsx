'use client'

import { useState } from 'react'

export default function PortalClienteLink({ facturaId }: { facturaId: string }) {
  const [copiado, setCopiado] = useState(false)
  const url = `${typeof window !== 'undefined' ? window.location.origin : 'https://app.marsof.es'}/pagar/${facturaId}`

  function copiar() {
    navigator.clipboard.writeText(url).then(() => {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    })
  }

  return (
    <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 mb-4">
      <h2 className="font-semibold text-zinc-100 flex items-center gap-2 mb-1">
        <span>🔗</span> Portal del cliente
      </h2>
      <p className="text-xs text-zinc-500 mb-4">
        Comparte esta URL con tu cliente. Puede ver el importe, pagar con el link de Stripe y confirmar que ya pagó — sin necesidad de cuenta.
      </p>
      <div className="flex items-center gap-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 truncate text-xs text-sky-400 hover:text-sky-300 font-mono bg-zinc-900/60 border border-white/10 rounded-lg px-3 py-2"
        >
          {url}
        </a>
        <button
          onClick={copiar}
          className="shrink-0 text-xs font-medium text-zinc-300 hover:text-zinc-100 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 px-3 py-2 rounded-lg transition-colors"
        >
          {copiado ? '✓ Copiado' : 'Copiar'}
        </button>
      </div>
    </div>
  )
}
