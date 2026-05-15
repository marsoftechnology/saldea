'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Cliente {
  id: string
  max_recordatorios_override: number | null
  patron_dias_override: string | null
  dias_gracia_override: number | null
  tono_preset_override: string | null
  pausar_recordatorios: boolean | null
  notas_cliente: string | null
}

const PATRONES = ['agresivo', 'normal', 'suave', 'personalizado'] as const
const TONOS = ['cordial', 'firme', 'contundente', 'extremo', 'personalizado'] as const

const ETIQUETAS_TONO: Record<string, string> = {
  cordial: '😊 Cordial',
  firme: '😐 Firme',
  contundente: '😠 Contundente',
  extremo: '🚨 Extremo',
  personalizado: '✏️ Escala',
}

const ETIQUETAS_PATRON: Record<string, string> = {
  agresivo: '⚡ Agresivo',
  normal: '🎯 Normal',
  suave: '🌿 Suave',
  personalizado: '✏️ Personalizado',
}

export default function ClienteOverridesEditor({ cliente }: { cliente: Cliente }) {
  const router = useRouter()
  const [abierto, setAbierto] = useState(false)
  const [maxRec, setMaxRec] = useState<number | null>(cliente.max_recordatorios_override)
  const [patron, setPatron] = useState<string | null>(cliente.patron_dias_override)
  const [diasGracia, setDiasGracia] = useState<number | null>(cliente.dias_gracia_override)
  const [tono, setTono] = useState<string | null>(cliente.tono_preset_override)
  const [pausar, setPausar] = useState(cliente.pausar_recordatorios ?? false)
  const [notas, setNotas] = useState(cliente.notas_cliente ?? '')
  const [guardando, setGuardando] = useState(false)
  const [aviso, setAviso] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null)

  const hayOverride =
    maxRec !== null ||
    patron !== null ||
    diasGracia !== null ||
    tono !== null ||
    pausar ||
    notas.trim() !== ''

  async function guardar() {
    setGuardando(true)
    setAviso(null)
    try {
      const res = await fetch(`/api/clientes/${cliente.id}/preferencias`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          max_recordatorios_override: maxRec,
          patron_dias_override: patron,
          dias_gracia_override: diasGracia,
          tono_preset_override: tono,
          pausar_recordatorios: pausar,
          notas_cliente: notas.trim() || null,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setAviso({ tipo: 'error', texto: data?.error || 'Error al guardar' })
        return
      }
      setAviso({ tipo: 'ok', texto: '✓ Guardado' })
      setTimeout(() => setAviso(null), 1800)
      router.refresh()
    } catch {
      setAviso({ tipo: 'error', texto: 'Error de red' })
    } finally {
      setGuardando(false)
    }
  }

  return (
    <div className="bg-zinc-900/40 border border-white/10 rounded-xl mb-4">
      <button
        onClick={() => setAbierto(o => !o)}
        className="w-full flex items-center justify-between p-5 hover:bg-zinc-900/30 transition-colors"
      >
        <div className="flex items-center gap-3 text-left">
          <span className="text-xl">⚙️</span>
          <div>
            <h2 className="font-semibold text-zinc-100">Preferencias para este cliente</h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              {pausar
                ? '⏸ Recordatorios pausados para este cliente'
                : hayOverride
                ? 'Tiene ajustes personalizados que sobreescriben los globales'
                : 'Usa los ajustes globales de Ajustes'}
            </p>
          </div>
        </div>
        <span className={`text-zinc-500 text-sm transition-transform ${abierto ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {abierto && (
        <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4">
          {/* Pausar recordatorios */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={pausar}
              onChange={e => setPausar(e.target.checked)}
              className="w-4 h-4 accent-rose-500"
            />
            <div>
              <p className="text-sm font-medium text-zinc-100">⏸ Pausar recordatorios automáticos</p>
              <p className="text-xs text-zinc-500">Los recordatorios automáticos no se enviarán a este cliente, pero puedes mandarlos manualmente.</p>
            </div>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Nº de recordatorios</label>
              <select
                value={maxRec ?? ''}
                onChange={e => setMaxRec(e.target.value === '' ? null : parseInt(e.target.value))}
                className="w-full px-3 py-2.5 border border-white/10 rounded-lg text-sm text-zinc-100 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              >
                <option value="">Usar global</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Patrón de días</label>
              <select
                value={patron ?? ''}
                onChange={e => setPatron(e.target.value === '' ? null : e.target.value)}
                className="w-full px-3 py-2.5 border border-white/10 rounded-lg text-sm text-zinc-100 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              >
                <option value="">Usar global</option>
                {PATRONES.map(p => (
                  <option key={p} value={p}>{ETIQUETAS_PATRON[p]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Días de gracia</label>
              <select
                value={diasGracia ?? ''}
                onChange={e => setDiasGracia(e.target.value === '' ? null : parseInt(e.target.value))}
                className="w-full px-3 py-2.5 border border-white/10 rounded-lg text-sm text-zinc-100 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              >
                <option value="">Usar global</option>
                {[0, 1, 2, 3, 4, 5, 6, 7, 14, 30].map(n => (
                  <option key={n} value={n}>{n === 0 ? 'Sin espera' : `${n} día${n === 1 ? '' : 's'}`}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Tono</label>
              <select
                value={tono ?? ''}
                onChange={e => setTono(e.target.value === '' ? null : e.target.value)}
                className="w-full px-3 py-2.5 border border-white/10 rounded-lg text-sm text-zinc-100 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              >
                <option value="">Usar global</option>
                {TONOS.map(t => (
                  <option key={t} value={t}>{ETIQUETAS_TONO[t]}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1">Notas internas sobre este cliente</label>
            <textarea
              value={notas}
              onChange={e => setNotas(e.target.value)}
              placeholder="Ej: Cliente VIP, siempre paga tarde pero acaba pagando · solo whatsapp · cliente sensible · etc."
              rows={3}
              className="w-full px-3 py-2.5 border border-white/10 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40 resize-y"
            />
          </div>

          {aviso && (
            <div className={`text-xs px-3 py-2 rounded-lg ${
              aviso.tipo === 'ok'
                ? 'bg-sky-500/10 border border-sky-500/30 text-sky-300'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
            }`}>
              {aviso.texto}
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={guardar}
              disabled={guardando}
              className="text-sm px-4 py-2 rounded-lg bg-sky-500 text-white font-medium hover:bg-sky-400 disabled:opacity-60"
            >
              {guardando ? 'Guardando…' : 'Guardar preferencias'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
