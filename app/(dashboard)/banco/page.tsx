'use client'

import { useEffect, useState, useCallback } from 'react'

interface Conexion {
  id: string
  institution_id: string
  institution_name: string
  institution_logo: string
  status: string
  account_ids: string[]
  last_sync_at: string | null
  created_at: string
}

interface Transaccion {
  id: string
  booking_date: string
  amount: number
  currency: string
  debtor_name: string | null
  remittance_info: string | null
  conciliada: boolean
  ignorada: boolean
  factura_id: string | null
  facturas?: { numero: string; importe: number } | null
}

interface Banco { id: string; name: string; logo: string }

const ESTADO_LABEL: Record<string, string> = {
  pendiente: 'Pendiente de autorizar',
  activa:    'Activa',
  expirada:  'Expirada',
  error:     'Error',
  revocada:  'Desconectada',
}
const ESTADO_COLOR: Record<string, string> = {
  pendiente: 'text-amber-400 bg-amber-500/10',
  activa:    'text-emerald-400 bg-emerald-500/10',
  expirada:  'text-zinc-400 bg-zinc-500/10',
  error:     'text-rose-400 bg-rose-500/10',
  revocada:  'text-zinc-500 bg-zinc-800/50',
}

export default function BancoPage() {
  const [conexiones, setConexiones] = useState<Conexion[]>([])
  const [transacciones, setTransacciones] = useState<Transaccion[]>([])
  const [bancos, setBancos] = useState<Banco[]>([])
  const [bancoFiltro, setBancoFiltro] = useState('')
  const [bancoSeleccionado, setBancoSeleccionado] = useState<Banco | null>(null)
  const [cargando, setCargando] = useState(true)
  const [sincronizndo, setSincronizando] = useState(false)
  const [conectando, setConectando] = useState(false)
  const [mostrarSelector, setMostrarSelector] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [exito, setExito] = useState<string | null>(null)

  const cargar = useCallback(async () => {
    setCargando(true)
    const [resC, resT] = await Promise.all([
      fetch('/api/banco/conexiones'),
      fetch('/api/banco/transacciones'),
    ])
    if (resC.ok) setConexiones(await resC.json().then(r => r.conexiones ?? []))
    if (resT.ok) setTransacciones(await resT.json().then(r => r.transacciones ?? []))
    setCargando(false)
  }, [])

  useEffect(() => {
    cargar()
    // Leer params de URL para mostrar feedback tras callback
    const params = new URLSearchParams(window.location.search)
    if (params.get('exito') === 'banco_conectado') setExito('Banco conectado correctamente. Sincronizando transacciones...')
    if (params.get('error')) setError('No se pudo conectar el banco. Inténtalo de nuevo.')
  }, [cargar])

  async function buscarBancos(q: string) {
    setBancoFiltro(q)
    if (q.length < 2) { setBancos([]); return }
    const res = await fetch('/api/banco/instituciones')
    if (!res.ok) return
    const { instituciones } = await res.json()
    setBancos(
      (instituciones as Banco[]).filter(b => b.name.toLowerCase().includes(q.toLowerCase())).slice(0, 12)
    )
  }

  async function conectarBanco() {
    if (!bancoSeleccionado) return
    setConectando(true)
    setError(null)
    const res = await fetch('/api/banco/conectar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ institution_id: bancoSeleccionado.id }),
    })
    const data = await res.json()
    if (res.ok && data.link) {
      window.location.href = data.link
    } else {
      setError(data.error ?? 'Error al iniciar conexión')
      setConectando(false)
    }
  }

  async function sincronizar() {
    setSincronizando(true)
    setError(null)
    const res = await fetch('/api/banco/sync', { method: 'POST' })
    const data = await res.json()
    if (res.ok) {
      setExito(`Sync completado · ${data.nuevas} transacciones nuevas · ${data.conciliadas} facturas conciliadas`)
      await cargar()
    } else {
      setError(data.error ?? 'Error al sincronizar')
    }
    setSincronizando(false)
  }

  async function desconectar(conexionId: string) {
    if (!confirm('¿Desconectar este banco? Las transacciones importadas se conservan.')) return
    await fetch('/api/banco/sync', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conexion_id: conexionId }),
    })
    await cargar()
  }

  const txPendientes = transacciones.filter(t => !t.conciliada && !t.ignorada)
  const txConciliadas = transacciones.filter(t => t.conciliada)

  if (cargando) {
    return (
      <div className="flex items-center justify-center h-64 text-zinc-500">
        <span className="animate-pulse">Cargando conexiones bancarias…</span>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Conciliación bancaria</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Conecta tu banco y Saldea cruza cada ingreso con sus facturas automáticamente.
          </p>
        </div>
        <div className="flex gap-2">
          {conexiones.some(c => c.status === 'activa') && (
            <button
              onClick={sincronizar}
              disabled={sincronizndo}
              className="flex items-center gap-2 bg-sky-500 text-zinc-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-400 transition-colors disabled:opacity-60"
            >
              {sincronizndo ? '⏳ Sincronizando…' : '🔄 Sincronizar ahora'}
            </button>
          )}
          <button
            onClick={() => { setMostrarSelector(true); setBancoSeleccionado(null); setBancoFiltro(''); setBancos([]) }}
            className="flex items-center gap-2 bg-zinc-800 border border-white/10 text-zinc-100 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-700 transition-colors"
          >
            + Conectar banco
          </button>
        </div>
      </div>

      {/* Feedback */}
      {exito && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl px-4 py-3 text-sm flex items-center justify-between">
          {exito}
          <button onClick={() => setExito(null)} className="text-emerald-400 hover:text-white ml-4">✕</button>
        </div>
      )}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl px-4 py-3 text-sm flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)} className="text-rose-400 hover:text-white ml-4">✕</button>
        </div>
      )}

      {/* Modal selector de banco */}
      {mostrarSelector && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-zinc-100">Selecciona tu banco</h2>
              <button onClick={() => setMostrarSelector(false)} className="text-zinc-500 hover:text-zinc-200 text-xl">✕</button>
            </div>

            <input
              type="text"
              placeholder="Buscar banco (ej. Santander, BBVA, CaixaBank…)"
              value={bancoFiltro}
              onChange={e => buscarBancos(e.target.value)}
              className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 mb-4"
            />

            {bancos.length > 0 && (
              <div className="space-y-1 max-h-64 overflow-y-auto mb-5">
                {bancos.map(b => (
                  <button
                    key={b.id}
                    onClick={() => setBancoSeleccionado(b)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      bancoSeleccionado?.id === b.id
                        ? 'bg-sky-500/20 border border-sky-500/40 text-zinc-100'
                        : 'hover:bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    {b.logo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={b.logo} alt="" className="w-7 h-7 rounded object-contain bg-white p-0.5" />
                    )}
                    <span className="text-sm font-medium">{b.name}</span>
                    {bancoSeleccionado?.id === b.id && <span className="ml-auto text-sky-400">✓</span>}
                  </button>
                ))}
              </div>
            )}

            {bancoFiltro.length >= 2 && bancos.length === 0 && (
              <p className="text-zinc-500 text-sm text-center py-4">No se encontraron bancos con ese nombre</p>
            )}

            <div className="flex gap-3 pt-2 border-t border-white/5 mt-4">
              <button onClick={() => setMostrarSelector(false)} className="flex-1 py-2.5 rounded-lg border border-white/10 text-zinc-400 text-sm hover:text-zinc-200 transition-colors">
                Cancelar
              </button>
              <button
                onClick={conectarBanco}
                disabled={!bancoSeleccionado || conectando}
                className="flex-1 py-2.5 rounded-lg bg-sky-500 text-zinc-900 font-bold text-sm hover:bg-sky-400 transition-colors disabled:opacity-50"
              >
                {conectando ? 'Redirigiendo…' : 'Conectar →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conexiones activas */}
      {conexiones.length === 0 ? (
        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-10 text-center">
          <p className="text-4xl mb-4">🏦</p>
          <h2 className="text-lg font-bold text-zinc-100 mb-2">Sin bancos conectados</h2>
          <p className="text-zinc-400 text-sm mb-6 max-w-sm mx-auto">
            Conecta tu banco vía Open Banking (PSD2) y Saldea marcará las facturas como cobradas automáticamente cuando llegue la transferencia.
          </p>
          <button
            onClick={() => { setMostrarSelector(true); setBancoSeleccionado(null); setBancoFiltro(''); setBancos([]) }}
            className="bg-sky-500 text-zinc-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-sky-400 transition-colors"
          >
            Conectar mi banco →
          </button>
          <p className="text-zinc-600 text-xs mt-4">Gratis · PSD2 · Solo lectura · No compartimos tus datos</p>
        </div>
      ) : (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Bancos conectados</h2>
          {conexiones.map(c => (
            <div key={c.id} className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 flex items-center gap-4">
              {c.institution_logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.institution_logo} alt="" className="w-10 h-10 rounded-lg object-contain bg-white p-1 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-zinc-100 text-sm">{c.institution_name || c.institution_id}</p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {c.last_sync_at
                    ? `Última sync: ${new Date(c.last_sync_at).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}`
                    : 'Sin sincronizaciones aún'}
                </p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${ESTADO_COLOR[c.status] ?? 'text-zinc-400 bg-zinc-800'}`}>
                {ESTADO_LABEL[c.status] ?? c.status}
              </span>
              <button onClick={() => desconectar(c.id)} className="text-zinc-600 hover:text-rose-400 transition-colors text-sm ml-2">
                Desconectar
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Stats rápidas */}
      {transacciones.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Transacciones importadas', valor: transacciones.length, color: 'text-zinc-100' },
            { label: 'Pendientes de conciliar', valor: txPendientes.length, color: txPendientes.length > 0 ? 'text-amber-400' : 'text-emerald-400' },
            { label: 'Facturas conciliadas', valor: txConciliadas.length, color: 'text-emerald-400' },
          ].map(s => (
            <div key={s.label} className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.valor}</p>
              <p className="text-zinc-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tabla de transacciones pendientes */}
      {txPendientes.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
            Pendientes de conciliar ({txPendientes.length})
          </h2>
          <div className="bg-zinc-900/50 border border-white/5 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs text-zinc-500 uppercase tracking-wide">
                  <th className="text-left px-4 py-3">Fecha</th>
                  <th className="text-left px-4 py-3">Remitente</th>
                  <th className="text-left px-4 py-3 hidden sm:table-cell">Concepto</th>
                  <th className="text-right px-4 py-3">Importe</th>
                </tr>
              </thead>
              <tbody>
                {txPendientes.slice(0, 20).map(tx => (
                  <tr key={tx.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-zinc-400 whitespace-nowrap">
                      {tx.booking_date ? new Date(tx.booking_date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }) : '—'}
                    </td>
                    <td className="px-4 py-3 text-zinc-200 font-medium max-w-[180px] truncate">
                      {tx.debtor_name || '—'}
                    </td>
                    <td className="px-4 py-3 text-zinc-500 max-w-[200px] truncate hidden sm:table-cell">
                      {tx.remittance_info || '—'}
                    </td>
                    <td className="px-4 py-3 text-emerald-400 font-bold text-right whitespace-nowrap">
                      +{tx.amount.toFixed(2)} {tx.currency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {txPendientes.length > 20 && (
              <p className="text-center text-xs text-zinc-600 py-3">
                y {txPendientes.length - 20} más…
              </p>
            )}
          </div>
        </div>
      )}

      {/* Tabla conciliadas */}
      {txConciliadas.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
            Conciliadas automáticamente ({txConciliadas.length})
          </h2>
          <div className="bg-zinc-900/50 border border-white/5 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs text-zinc-500 uppercase tracking-wide">
                  <th className="text-left px-4 py-3">Fecha</th>
                  <th className="text-left px-4 py-3">Remitente</th>
                  <th className="text-left px-4 py-3">Factura</th>
                  <th className="text-right px-4 py-3">Importe</th>
                </tr>
              </thead>
              <tbody>
                {txConciliadas.slice(0, 10).map(tx => (
                  <tr key={tx.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-zinc-400 whitespace-nowrap">
                      {tx.booking_date ? new Date(tx.booking_date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }) : '—'}
                    </td>
                    <td className="px-4 py-3 text-zinc-300 max-w-[160px] truncate">{tx.debtor_name || '—'}</td>
                    <td className="px-4 py-3">
                      <span className="text-emerald-400 text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        ✓ {tx.facturas?.numero ?? 'Conciliada'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-emerald-400 font-bold text-right whitespace-nowrap">
                      +{tx.amount.toFixed(2)} {tx.currency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Nota informativa */}
      <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-5 text-xs text-zinc-500 space-y-1">
        <p>🔒 <strong className="text-zinc-400">Solo lectura</strong> — Saldea nunca puede mover ni autorizar pagos. Solo lee transacciones.</p>
        <p>🇪🇺 <strong className="text-zinc-400">PSD2 / Open Banking</strong> — los bancos españoles están obligados por ley a permitir este acceso.</p>
        <p>🔄 <strong className="text-zinc-400">Sincronización automática</strong> — puedes hacer sync manual o activar un webhook para sync periódico.</p>
      </div>
    </div>
  )
}
