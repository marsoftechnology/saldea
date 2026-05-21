'use client'

import { useEffect, useState } from 'react'

interface EstadoHolded {
  connected: boolean
  connectedAt?: string | null
  lastSync?: string | null
}

export default function HoldedSection() {
  const [estado, setEstado] = useState<EstadoHolded | null>(null)
  const [cargando, setCargando] = useState(true)
  const [apiKey, setApiKey] = useState('')
  const [mostrarKey, setMostrarKey] = useState(false)
  const [conectando, setConectando] = useState(false)
  const [sincronizando, setSincronizando] = useState(false)
  const [desconectando, setDesconectando] = useState(false)
  const [aviso, setAviso] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null)
  const [resultadoSync, setResultadoSync] = useState<{
    nuevos: number
    actualizados: number
    errores: string[]
    total: number
  } | null>(null)

  async function cargar() {
    setCargando(true)
    try {
      const res = await fetch('/api/holded/status')
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
      setAviso({ tipo: 'error', texto: 'Introduce tu API Key de Holded' })
      return
    }
    setConectando(true)
    setAviso(null)
    try {
      const res = await fetch('/api/holded/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setAviso({ tipo: 'error', texto: data.error || 'Error al conectar' })
        return
      }
      setAviso({ tipo: 'ok', texto: '✓ Holded conectado. Ya puedes sincronizar tus facturas.' })
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
      const res = await fetch('/api/holded/sync', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) {
        setAviso({ tipo: 'error', texto: data.error || 'Error al sincronizar' })
        return
      }
      const r = data.resultado
      setResultadoSync(r)
      if (r.errores.length === 0) {
        setAviso({
          tipo: 'ok',
          texto: `✓ Sincronización completada: ${r.nuevos} nuevas, ${r.actualizados} actualizadas de ${r.total} facturas pendientes en Holded.`,
        })
      } else {
        setAviso({
          tipo: 'error',
          texto: `Sincronizado con ${r.errores.length} aviso(s). Revisa los detalles abajo.`,
        })
      }
      await cargar()
    } catch {
      setAviso({ tipo: 'error', texto: 'Error de red al sincronizar.' })
    } finally {
      setSincronizando(false)
    }
  }

  async function desconectar() {
    if (!confirm('¿Desconectar Holded? Las facturas ya importadas se mantendrán en Saldea.')) return
    setDesconectando(true)
    setAviso(null)
    try {
      await fetch('/api/holded/disconnect', { method: 'POST' })
      setAviso({ tipo: 'ok', texto: 'Holded desconectado.' })
      await cargar()
    } catch {
      setAviso({ tipo: 'error', texto: 'Error al desconectar. Inténtalo de nuevo.' })
    } finally {
      setDesconectando(false)
    }
  }

  if (cargando) {
    return (
      <div className="mb-3 bg-zinc-900/40 border border-white/10 rounded-xl p-5">
        <p className="text-sm text-zinc-500">Cargando estado de Holded…</p>
      </div>
    )
  }

  const conectado = estado?.connected === true

  return (
    <div id="holded" className="mb-3 bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden">
      <div className="p-5">

        {/* Cabecera */}
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">🔗</span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-semibold text-zinc-100">Conectar con Holded</h2>
                {conectado && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide bg-emerald-500/20 text-emerald-300">
                    Conectado
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                {conectado
                  ? 'Tus facturas pendientes de Holded se importan automáticamente en Saldea.'
                  : 'Importa tus facturas pendientes desde Holded con un solo clic. Saldea se encarga de enviar los recordatorios.'}
              </p>
            </div>
          </div>

          {conectado && (
            <button
              onClick={desconectar}
              disabled={desconectando}
              className="text-sm text-rose-300 hover:bg-rose-500/10 border border-rose-500/30 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {desconectando ? 'Desconectando…' : 'Desconectar'}
            </button>
          )}
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

        {/* Errores de sync detallados */}
        {resultadoSync && resultadoSync.errores.length > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-4">
            <p className="text-xs font-semibold text-amber-300 mb-1">Avisos de sincronización:</p>
            <ul className="text-xs text-amber-200/70 space-y-0.5">
              {resultadoSync.errores.map((e, i) => <li key={i}>· {e}</li>)}
            </ul>
          </div>
        )}

        {/* Panel conectado */}
        {conectado ? (
          <div className="space-y-4">
            {/* Info de conexión */}
            <div className="flex flex-wrap gap-4 text-xs text-zinc-400">
              {estado?.connectedAt && (
                <span>Conectado el {new Date(estado.connectedAt).toLocaleDateString('es-ES')}</span>
              )}
              {estado?.lastSync && (
                <span>Última sync: {new Date(estado.lastSync).toLocaleString('es-ES')}</span>
              )}
            </div>

            {/* Botón sync */}
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
                  Sincronizando con Holded…
                </>
              ) : (
                <>🔄 Sincronizar facturas pendientes</>
              )}
            </button>

            <p className="text-xs text-zinc-500">
              Se importan únicamente las facturas en estado <strong className="text-zinc-400">Pendiente</strong> y <strong className="text-zinc-400">Vencida</strong>. Las ya cobradas se ignoran.
            </p>
          </div>
        ) : (
          /* Panel de conexión con instrucciones */
          <div className="space-y-5">
            {/* Instrucciones paso a paso */}
            <div className="bg-zinc-800/50 border border-white/5 rounded-xl p-4">
              <p className="text-xs font-semibold text-zinc-300 mb-3 uppercase tracking-wide">
                ¿Cómo obtener tu API Key de Holded?
              </p>
              <ol className="space-y-3 text-sm text-zinc-400">
                <li className="flex gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 text-xs flex items-center justify-center font-bold">1</span>
                  <span>
                    Accede a tu cuenta en{' '}
                    <a
                      href="https://app.holded.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 hover:underline"
                    >
                      app.holded.com
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 text-xs flex items-center justify-center font-bold">2</span>
                  <span>
                    Ve a <strong className="text-zinc-300">Ajustes</strong> → <strong className="text-zinc-300">Integraciones</strong> → <strong className="text-zinc-300">API</strong>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 text-xs flex items-center justify-center font-bold">3</span>
                  <span>
                    Haz clic en <strong className="text-zinc-300">«Nueva API Key»</strong>, ponle un nombre (ej: <em>Saldea</em>) y asegúrate de que tiene acceso a <strong className="text-zinc-300">Facturación</strong>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 text-xs flex items-center justify-center font-bold">4</span>
                  <span>
                    Copia la key generada y pégala aquí abajo
                  </span>
                </li>
              </ol>
            </div>

            {/* Input API Key */}
            <div>
              <label className="text-xs font-medium text-zinc-400 mb-1.5 block">
                API Key de Holded
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type={mostrarKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && conectar()}
                    placeholder="Pega aquí tu API Key de Holded"
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
                La key se valida y encripta. Nunca la compartiremos.
              </p>
            </div>

            {/* Ventajas */}
            <div className="border-t border-white/5 pt-4 text-xs text-zinc-500 space-y-1.5">
              <p>· Las facturas se importan automáticamente con el cliente, importe y fecha de vencimiento</p>
              <p>· Las facturas ya cobradas en Holded no se importan</p>
              <p>· Si el cliente no existe en Saldea, se crea automáticamente</p>
              <p>· Puedes sincronizar manualmente cuando quieras desde aquí</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
