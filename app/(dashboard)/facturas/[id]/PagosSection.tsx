'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { formatearEuros, formatearFecha } from '@/lib/utils'
import type { Pago } from '@/types'

const METODOS: { valor: string; etiqueta: string; icono: string }[] = [
  { valor: 'transferencia', etiqueta: 'Transferencia', icono: '🏦' },
  { valor: 'bizum', etiqueta: 'Bizum', icono: '📱' },
  { valor: 'tarjeta', etiqueta: 'Tarjeta', icono: '💳' },
  { valor: 'efectivo', etiqueta: 'Efectivo', icono: '💵' },
  { valor: 'stripe', etiqueta: 'Stripe', icono: '⚡' },
  { valor: 'paypal', etiqueta: 'PayPal', icono: '🅿️' },
  { valor: 'otro', etiqueta: 'Otro', icono: '➖' },
]

function etiquetaMetodo(metodo: string | null): { etiqueta: string; icono: string } {
  if (!metodo) return { etiqueta: 'Sin especificar', icono: '➖' }
  return METODOS.find(m => m.valor === metodo) ?? { etiqueta: metodo, icono: '➖' }
}

export default function PagosSection({
  facturaId,
  importeFactura,
  pagosIniciales,
  facturaCancelada,
}: {
  facturaId: string
  importeFactura: number
  pagosIniciales: Pago[]
  facturaCancelada: boolean
}) {
  const router = useRouter()
  const [pagos, setPagos] = useState<Pago[]>(pagosIniciales)
  const [pending, startTransition] = useTransition()
  const [mostrarForm, setMostrarForm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const totalPagado = pagos.reduce((s, p) => s + Number(p.importe), 0)
  const pendiente = Math.max(0, importeFactura - totalPagado)
  const completado = pendiente < 0.005

  // Form state
  const [importe, setImporte] = useState<string>(pendiente.toFixed(2))
  const [metodo, setMetodo] = useState<string>('transferencia')
  const [fecha, setFecha] = useState<string>(new Date().toISOString().slice(0, 10))
  const [notas, setNotas] = useState<string>('')
  const [referencia, setReferencia] = useState<string>('')

  function abrirForm() {
    setError(null)
    setImporte(pendiente.toFixed(2))
    setMetodo('transferencia')
    setFecha(new Date().toISOString().slice(0, 10))
    setNotas('')
    setReferencia('')
    setMostrarForm(true)
  }

  async function guardarPago() {
    setError(null)
    const imp = parseFloat(importe.replace(',', '.'))
    if (!Number.isFinite(imp) || imp <= 0) {
      setError('Importe inválido')
      return
    }

    try {
      const res = await fetch(`/api/facturas/${facturaId}/pagos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ importe: imp, metodo, fecha, notas, referencia }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error || 'Error guardando el pago')
        return
      }
      setPagos(p => [...p, data.pago])
      setMostrarForm(false)
      // Refrescar la página para que el estado de la factura se actualice
      startTransition(() => router.refresh())
    } catch {
      setError('Error de red')
    }
  }

  async function eliminarPago(pagoId: string) {
    if (!confirm('¿Eliminar este pago? El estado de la factura se recalculará.')) return
    try {
      const res = await fetch(`/api/facturas/${facturaId}/pagos/${pagoId}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data?.error || 'Error eliminando el pago')
        return
      }
      setPagos(p => p.filter(x => x.id !== pagoId))
      startTransition(() => router.refresh())
    } catch {
      setError('Error de red')
    }
  }

  if (facturaCancelada) return null

  return (
    <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-zinc-100 flex items-center gap-2">
          <span>💰</span> Pagos recibidos
        </h2>
        {!completado && !mostrarForm && (
          <button
            onClick={abrirForm}
            className="text-xs px-3 py-1.5 rounded bg-sky-500 text-white font-medium hover:bg-sky-400"
          >
            + Registrar pago
          </button>
        )}
      </div>

      {/* Barra de progreso */}
      <div className="mb-4">
        <div className="flex items-baseline justify-between text-sm mb-2">
          <span className="text-zinc-300">
            <span className="font-semibold">{formatearEuros(totalPagado)}</span> de <span className="text-zinc-500">{formatearEuros(importeFactura)}</span>
          </span>
          <span className={`text-xs font-medium ${completado ? 'text-sky-400' : pendiente === importeFactura ? 'text-zinc-500' : 'text-violet-300'}`}>
            {completado ? '✓ Cobrada' : pendiente === importeFactura ? 'Sin pagos' : `Quedan ${formatearEuros(pendiente)}`}
          </span>
        </div>
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${completado ? 'bg-sky-500' : 'bg-violet-500'}`}
            style={{ width: `${Math.min(100, (totalPagado / importeFactura) * 100)}%` }}
          />
        </div>
      </div>

      {/* Form de nuevo pago */}
      {mostrarForm && (
        <div className="bg-zinc-900/60 border border-white/10 rounded-lg p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Importe (€)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={importe}
                onChange={e => setImporte(e.target.value)}
                className="w-full px-3 py-2 border border-white/10 rounded-lg text-sm text-zinc-100 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Fecha</label>
              <input
                type="date"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
                className="w-full px-3 py-2 border border-white/10 rounded-lg text-sm text-zinc-100 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Método</label>
            <div className="flex flex-wrap gap-1.5">
              {METODOS.map(m => (
                <button
                  key={m.valor}
                  onClick={() => setMetodo(m.valor)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${
                    metodo === m.valor
                      ? 'bg-sky-500/20 border-sky-500/40 text-sky-200'
                      : 'border-white/10 text-zinc-400 hover:bg-white/5'
                  }`}
                >
                  {m.icono} {m.etiqueta}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Referencia (opcional)</label>
            <input
              type="text"
              value={referencia}
              onChange={e => setReferencia(e.target.value)}
              placeholder="Nº transferencia, ID Bizum, etc."
              className="w-full px-3 py-2 border border-white/10 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Notas (opcional)</label>
            <input
              type="text"
              value={notas}
              onChange={e => setNotas(e.target.value)}
              placeholder="Ej: cliente acordó pagar el resto antes del 30"
              className="w-full px-3 py-2 border border-white/10 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
          </div>
          {error && <p className="text-xs text-rose-400">{error}</p>}
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setMostrarForm(false)}
              className="text-xs px-3 py-1.5 text-zinc-400 hover:text-zinc-200"
            >
              Cancelar
            </button>
            <button
              onClick={guardarPago}
              disabled={pending}
              className="text-xs px-3 py-1.5 rounded bg-sky-500 text-white font-medium hover:bg-sky-400 disabled:opacity-60"
            >
              {pending ? 'Guardando…' : 'Registrar pago'}
            </button>
          </div>
        </div>
      )}

      {/* Lista de pagos */}
      {pagos.length > 0 ? (
        <div className="space-y-2">
          {pagos
            .slice()
            .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
            .map(p => {
              const m = etiquetaMetodo(p.metodo)
              return (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-3 px-3 py-2 bg-zinc-900/40 border border-white/5 rounded-lg group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-lg">{m.icono}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-100">{formatearEuros(Number(p.importe))}</p>
                      <p className="text-xs text-zinc-500">
                        {formatearFecha(p.fecha)} · {m.etiqueta}
                        {p.referencia && <> · {p.referencia}</>}
                      </p>
                      {p.notas && <p className="text-xs text-zinc-400 mt-0.5 truncate">{p.notas}</p>}
                    </div>
                  </div>
                  <button
                    onClick={() => eliminarPago(p.id)}
                    className="opacity-0 group-hover:opacity-100 text-xs text-zinc-500 hover:text-rose-400 transition-opacity"
                    title="Eliminar pago"
                  >
                    🗑
                  </button>
                </div>
              )
            })}
        </div>
      ) : !mostrarForm ? (
        <p className="text-sm text-zinc-500 text-center py-3">
          Aún no se ha registrado ningún pago.
        </p>
      ) : null}

      {error && !mostrarForm && (
        <p className="text-xs text-rose-400 mt-2">{error}</p>
      )}
    </div>
  )
}
