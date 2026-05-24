'use client'

import { useEffect, useState } from 'react'

interface EstadoAnfix {
  connected: boolean
  lastSync?: string | null
}

export default function AnfixSection() {
  const [estado, setEstado] = useState<EstadoAnfix | null>(null)
  const [cargando, setCargando] = useState(true)
  const [apiKey, setApiKey] = useState('')
  const [mostrarKey, setMostrarKey] = useState(false)
  const [conectando, setConectando] = useState(false)
  const [sincronizando, setSincronizando] = useState(false)
  const [aviso, setAviso] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null)
  const [resultadoSync, setResultadoSync] = useState<{
    sincronizadas: number
    nuevas: number
    yaExistian: number
  } | null>(null)

  async function cargar() {
    setCargando(true)
    try {
      const res = await fetch('/api/anfix/status')
      if (!res.ok) {
        setEstado({ connected: false })
        return
      }
      const data = await res.json()
      setEstado(data)
    } catch {
      setEstado({ connected: false })
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => { cargar() }, [])

  async function conectar() {
    if (!apiKey.trim()) {
      setAviso({ tipo: 'error', texto: 'Introduce tu API key de Anfix' })
      return
    }
    setConectando(true)
    setAviso(null)
    try {
      const res = await fetch('/api/anfix/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setAviso({ tipo: 'error', texto: data.error || 'Error al conectar con Anfix' })
        return
      }
      setAviso({ tipo: 'ok', texto: '✓ Anfix conectado. Ya puedes sincronizar tus facturas.' })
      setApiKey('')
      await cargar()
    } catch {
      setAviso({ tipo: 'error', texto: 'Error de red. Inténtalo de nuevo.' })
    } finally {
      setConectando(false)
    }
  }

  async function sincronizar() {
    setSincronizando(true)
    setAviso(null)
    setResultadoSync(null)
    try {
      const res = await fetch('/api/anfix/sync', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) {
        setAviso({ tipo: 'error', texto: data.error || 'Error al sincronizar con Anfix' })
        return
      }
      setResultadoSync(data)
      setAviso({
        tipo: 'ok',
        texto: `✓ Sync completada: ${data.nuevas} nuevas, ${data.yaExistian} ya existían (${data.sincronizadas} total).`,
      })
      await cargar()
    } catch {
      setAviso({ tipo: 'error', texto: 'Error de red al sincronizar.' })
    } finally {
      setSincronizando(false)
    }
  }

  if (cargando) {
    return (
      <div className="mb-3 bg-zinc-900/40 border border-white/10 rounded-xl p-5">
        <p className="text-sm text-zinc-500">Cargando estado de Anfix…</p>
      </div>
    )
  }

  const conectado = estado?.connected === true

  return (
    <div id="anfix" className="mb-3 bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden">
      <div className="p-5">

        {/* Cabecera */}
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">📒</span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-semibold text-zinc-100">Conectar con Anfix</h2>
                {conectado && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide bg-emerald-500/20 text-emerald-300">
                    Conectado
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                {conectado
                  ? 'Importa facturas de Anfix para que Saldea persiga su cobro automáticamente.'
                  : 'Importa tus facturas pendientes de Anfix con un clic. Saldea se encarga del resto.'}
              </p>
            </div>
          </div>
        </div>

        {/* Aviso */}
        {aviso && (
          <div className={`text-xs px-3 py-2 rounded-lg mb-4 ${
            aviso.tipo === 'ok'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
          }`}>
            {aviso.texto}
          </div>
        )}

        {/* Panel conectado */}
        {conectado ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 text-xs text-zinc-400">
              {estado?.lastSync && (
                <span>Última sync: {new Date(estado.lastSync).toLocaleString('es-ES')}</span>
              )}
              {!estado?.lastSync && (
                <span className="text-zinc-500">Nunca sincronizado — pulsa el botón para importar</span>
              )}
            </div>

            <button
              onClick={sincronizar}
              disabled={sincronizando}
              className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
            >
              {sincronizando ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Sincronizando con Anfix…
                </>
              ) : (
                <>🔄 Sincronizar facturas de Anfix</>
              )}
            </button>

            {resultadoSync && (
              <div className="bg-zinc-900/30 rounded-lg p-3 text-xs text-zinc-400 space-y-0.5">
                <p>· Facturas procesadas: <strong className="text-zinc-200">{resultadoSync.sincronizadas}</strong></p>
                <p>· Nuevas importadas: <strong className="text-emerald-300">{resultadoSync.nuevas}</strong></p>
                <p>· Ya existían: <strong className="text-zinc-400">{resultadoSync.yaExistian}</strong></p>
              </div>
            )}

            <p className="text-xs text-zinc-500">
              Se importan facturas en estado <strong className="text-zinc-400">pendiente</strong> y <strong className="text-zinc-400">vencida</strong>. Las cobradas se ignoran.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Instrucciones */}
            <div className="bg-zinc-800/50 border border-white/5 rounded-xl p-4">
              <p className="text-xs font-semibold text-zinc-300 mb-3 uppercase tracking-wide">
                ¿Cómo obtener tu API key de Anfix?
              </p>
              <ol className="space-y-3 text-sm text-zinc-400">
                <li className="flex gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 text-xs flex items-center justify-center font-bold">1</span>
                  <span>
                    Accede a tu cuenta en{' '}
                    <a href="https://app.anfix.com" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">
                      app.anfix.com
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 text-xs flex items-center justify-center font-bold">2</span>
                  <span>
                    Ve a <strong className="text-zinc-300">Configuración</strong> → <strong className="text-zinc-300">API / Integraciones</strong> → <strong className="text-zinc-300">Nueva API key</strong>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 text-xs flex items-center justify-center font-bold">3</span>
                  <span>Copia la clave generada y pégala aquí abajo</span>
                </li>
              </ol>
            </div>

            {/* Input API key */}
            <div>
              <label className="text-xs font-medium text-zinc-400 mb-1.5 block">
                API key de Anfix
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type={mostrarKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && conectar()}
                    placeholder="Pega aquí tu API key de Anfix"
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarKey(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs"
                    tabIndex={-1}
                  >
                    {mostrarKey ? '🙈' : '👁️'}
                  </button>
                </div>
                <button
                  onClick={conectar}
                  disabled={conectando || !apiKey.trim()}
                  className="bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {conectando ? 'Verificando…' : 'Conectar →'}
                </button>
              </div>
              <p className="text-xs text-zinc-600 mt-1.5">
                La clave se guarda encriptada. Nunca la compartiremos.
              </p>
            </div>

            {/* Ventajas */}
            <div className="border-t border-white/5 pt-4 text-xs text-zinc-500 space-y-1.5">
              <p>· Las facturas se importan con cliente, importe y fecha de vencimiento</p>
              <p>· Si el cliente no existe en Saldea, se crea automáticamente</p>
              <p>· Las facturas ya cobradas en Anfix no se importan</p>
              <p>· Puedes sincronizar manualmente cuando quieras</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
