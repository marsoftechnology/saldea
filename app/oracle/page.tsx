'use client'

import { useState } from 'react'

type OracleResponse = {
  ok: boolean
  mode?: 'demo' | 'claude'
  answer?: string
  error?: string
}

const ejemplos = [
  '¿Qué factura debería reclamar primero?',
  'Redáctame un WhatsApp amable para una factura vencida hace 7 días.',
  'Redáctame un email firme para una factura vencida hace 45 días.',
  '¿Cómo puedo reclamar una deuda sin dañar la relación con el cliente?',
  'Prepara una estrategia de seguimiento en 3 pasos para un cliente que no responde.',
]

export default function OraclePage() {
  const [message, setMessage] = useState('¿Qué factura debería reclamar primero si tengo varias facturas vencidas?')
  const [context, setContext] = useState('')
  const [answer, setAnswer] = useState('')
  const [mode, setMode] = useState<'demo' | 'claude' | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function consultarOracle() {
    const cleanMessage = message.trim()

    if (!cleanMessage) {
      setError('Escribe una pregunta para ORACLE.')
      return
    }

    setLoading(true)
    setError('')
    setAnswer('')
    setMode(null)

    try {
      const response = await fetch('/api/oracle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: cleanMessage,
          context,
        }),
      })

      const data = (await response.json()) as OracleResponse

      if (!response.ok || !data.ok) {
        setError(data.error || 'ORACLE no ha podido responder.')
        return
      }

      setAnswer(data.answer || '')
      setMode(data.mode || null)
    } catch {
      setError('No se ha podido conectar con ORACLE.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10">
        <div className="mb-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-black/40">
          <div className="mb-4 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
            SALDEA INTELLIGENCE
          </div>

          <h1 className="mb-4 text-4xl font-black tracking-tight md:text-6xl">
            ORACLE
          </h1>

          <p className="max-w-3xl text-base leading-7 text-zinc-300 md:text-lg">
            Asistente inteligente de SALDEA para analizar cobros pendientes,
            priorizar facturas, redactar avisos y definir la siguiente acción
            comercial sin convertir cada reclamación en una pequeña guerra civil administrativa.
          </p>
        </div>

        <div className="grid flex-1 gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
            <label className="mb-3 block text-sm font-semibold text-zinc-200">
              Pregunta para ORACLE
            </label>

            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="min-h-36 w-full resize-none rounded-2xl border border-white/10 bg-black p-4 text-sm leading-6 text-white outline-none transition focus:border-emerald-400/60"
              placeholder="Ejemplo: ¿Qué cliente debería priorizar hoy?"
            />

            <label className="mb-3 mt-6 block text-sm font-semibold text-zinc-200">
              Contexto opcional
            </label>

            <textarea
              value={context}
              onChange={(event) => setContext(event.target.value)}
              className="min-h-32 w-full resize-none rounded-2xl border border-white/10 bg-black p-4 text-sm leading-6 text-white outline-none transition focus:border-emerald-400/60"
              placeholder="Ejemplo: Cliente X debe 1.200 EUR, factura vencida hace 42 días, ya recibió dos recordatorios y no responde."
            />

            {error ? (
              <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            <button
              onClick={consultarOracle}
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-emerald-400 px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Consultando ORACLE...' : 'Consultar ORACLE'}
            </button>

            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Preguntas rápidas
              </p>

              <div className="flex flex-wrap gap-2">
                {ejemplos.map((ejemplo) => (
                  <button
                    key={ejemplo}
                    onClick={() => setMessage(ejemplo)}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-left text-xs text-zinc-300 transition hover:border-emerald-400/50 hover:text-white"
                  >
                    {ejemplo}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-black">
                Respuesta
              </h2>

              {mode ? (
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.16em] text-zinc-300">
                  {mode === 'claude' ? 'Claude activo' : 'Modo demo'}
                </span>
              ) : null}
            </div>

            <div className="min-h-[420px] rounded-2xl border border-white/10 bg-black p-5">
              {answer ? (
                <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-zinc-200">
                  {answer}
                </pre>
              ) : (
                <div className="flex h-full min-h-[380px] items-center justify-center text-center text-sm leading-6 text-zinc-500">
                  ORACLE todavía no ha respondido.
                  <br />
                  Haz una consulta para analizar el caso.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
