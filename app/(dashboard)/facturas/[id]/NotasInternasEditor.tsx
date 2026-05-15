'use client'

import { useState, useEffect, useRef } from 'react'

export default function NotasInternasEditor({
  facturaId,
  notasIniciales,
}: {
  facturaId: string
  notasIniciales: string | null
}) {
  const [notas, setNotas] = useState(notasIniciales ?? '')
  const [estado, setEstado] = useState<'idle' | 'guardando' | 'guardado' | 'error'>('idle')
  const valorGuardado = useRef(notasIniciales ?? '')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (notas === valorGuardado.current) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    setEstado('idle')
    timeoutRef.current = setTimeout(async () => {
      setEstado('guardando')
      try {
        const res = await fetch(`/api/facturas/${facturaId}/notas`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notas: notas.trim() || null }),
        })
        if (!res.ok) throw new Error('save failed')
        valorGuardado.current = notas
        setEstado('guardado')
        setTimeout(() => setEstado(s => (s === 'guardado' ? 'idle' : s)), 1500)
      } catch {
        setEstado('error')
      }
    }, 800)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [notas, facturaId])

  const tieneNotas = notas.trim().length > 0

  return (
    <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-zinc-100 flex items-center gap-2">
          <span>📝</span> Notas internas
        </h2>
        <span className="text-xs text-zinc-500 h-4">
          {estado === 'guardando' && 'Guardando…'}
          {estado === 'guardado' && '✓ Guardado'}
          {estado === 'error' && <span className="text-rose-400">Error al guardar</span>}
        </span>
      </div>
      <textarea
        value={notas}
        onChange={(e) => setNotas(e.target.value)}
        placeholder="Solo tú las verás. Ej: cliente promete pagar el 20, acordado en 2 plazos, factura disputada por servicio incompleto…"
        rows={tieneNotas ? 4 : 2}
        className="w-full px-3 py-2.5 border border-white/10 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40 resize-y"
      />
      <p className="text-xs text-zinc-500 mt-1.5">
        No se envían al cliente. Se guardan automáticamente al escribir.
      </p>
    </div>
  )
}
