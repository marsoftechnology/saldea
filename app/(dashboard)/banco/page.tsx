'use client'

import { useEffect, useState, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

type Conexion = {
  id: string
  institution_id: string
  status: 'pendiente' | 'activa' | 'error' | 'revocada'
  account_ids: string[] | null
  last_sync_at: string | null
  created_at: string
}

type SyncResult = {
  nuevas: number
  conciliadas: number
  message: string
}

function BancoPageInner() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [plan, setPlan] = useState<string | null>(null)
  const [conexiones, setConexiones] = useState<Conexion[]>([])
  const [loadingConexiones, setLoadingConexiones] = useState(true)

  const [conectando, setConectando] = useState(false)
  const [seNoDisponible, setSeNoDisponible] = useState(false)

  const [syncing, setSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null)
  const [desconectando, setDesconectando] = useState<string | null>(null)

  const [toast, setToast] = useState<{ tipo: 'ok' | 'error' | 'info'; msg: string } | null>(null)

  const showToast = (tipo: 'ok' | 'error' | 'info', msg: string) => {
    setToast({ tipo, msg })
    setTimeout(() => setToast(null), 5000)
  }

  // Handle URL params del callback Salt Edge
  useEffect(() => {
    const exito = searchParams.get('exito')
    const error = searchParams.get('error')
    const info = searchParams.get('info')
    if (exito === 'banco_conectado') {
      showToast('ok', 'Banco conectado. Pulsa «Sincronizar» para importar transacciones.')
      router.replace('/banco')
    } else if (error === 'banco_rechazado') {
      showToast('error', 'El banco rechazó la conexión. Inténtalo de nuevo.')
      router.replace('/banco')
    } else if (error === 'conexion_no_encontrada') {
      showToast('error', 'Conexión no encontrada. Inténtalo de nuevo.')
      router.replace('/banco')
    } else if (error === 'error_conexion') {
      showToast('error', 'Error al conectar con el banco. Inténtalo más tarde.')
      router.replace('/banco')
    } else if (info === 'pendiente') {
      showToast('info', 'Conexión pendiente de confirmar por el banco.')
      router.replace('/banco')
    }
  }, [searchParams, router])

  useEffect(() => {
    fetch('/api/configuracion')
      .then(r => r.json())
      .then(d => setPlan(d.configuracion?.plan ?? 'free'))
      .catch(() => setPlan('free'))
  }, [])

  const cargarConexiones = useCallback(async () => {
    setLoadingConexiones(true)
    try {
      const res = await fetch('/api/banco/conexiones')
      const data = await res.json()
      setConexiones(data.conexiones ?? [])
    } finally {
      setLoadingConexiones(false)
    }
  }, [])

  useEffect(() => { cargarConexiones() }, [cargarConexiones])

  const conectar = async () => {
    setConectando(true)
    setSeNoDisponible(false)
    try {
      // Verificamos que la integración esté activa
      const check = await fetch('/api/banco/instituciones')
      if (check.status === 503) {
        setSeNoDisponible(true)
        setConectando(false)
        return
      }

      // Iniciamos la sesión → Salt Edge devuelve la URL del widget
      const res = await fetch('/api/banco/conectar', { method: 'POST' })
      const data = await res.json()
      if (data.link) {
        window.location.href = data.link
      } else {
        showToast('error', data.error ?? 'Error al iniciar la conexión')
        setConectando(false)
      }
    } catch {
      showToast('error', 'Error de red')
      setConectando(false)
    }
  }

  const sincronizar = async () => {
    setSyncing(true)
    setSyncResult(null)
    try {
      const res = await fetch('/api/banco/sync', { method: 'POST' })
      const data = await res.json()
      setSyncResult(data)
      await cargarConexiones()
    } catch {
      showToast('error', 'Error al sincronizar')
    } finally {
      setSyncing(false)
    }
  }

  const desconectar = async (conexionId: string) => {
    setDesconectando(conexionId)
    try {
      const res = await fetch('/api/banco/sync', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conexion_id: conexionId }),
      })
      if (res.ok) {
        showToast('ok', 'Banco desconectado')
        await cargarConexiones()
      }
    } catch {
      showToast('error', 'Error al desconectar')
    } finally {
      setDesconectando(null)
    }
  }

  const badgeStatus = (status: Conexion['status']) => {
    if (status === 'activa') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    if (status === 'pendiente') return 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    return 'text-red-400 bg-red-500/10 border-red-500/20'
  }

  const labelStatus = (s: Conexion['status']) =>
    s === 'activa' ? 'Activa' : s === 'pendiente' ? 'Pendiente' : 'Error'

  const hayActivas = conexiones.some(c => c.status === 'activa')

  if (plan === null) return <div className="p-8 text-zinc-500 text-sm">Cargando...</div>

  if (plan !== 'max') {
    return (
      <div className="p-8 max-w-2xl">
        <div className="bg-zinc-900/40 border border-white/10 rounded-2xl overflow-hidden">
          {/* Banner bloqueado */}
          <div className="relative p-10 text-center">
            <div className="text-6xl mb-5">🏦</div>
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold px-3 py-1 rounded-full mb-4">
              ⭐ Exclusivo Plan Max
            </div>
            <h1 className="text-2xl font-bold text-zinc-100 mb-3">Conciliación bancaria automática</h1>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-md mx-auto mb-8">
              Conecta tu banco y Saldea detectará cada ingreso automáticamente, cruzándolo con tus facturas pendientes.
              Las facturas se marcan como cobradas solas — sin que toques nada.
            </p>
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-8 text-left">
              {[
                ['🔍', 'Detección automática', 'Cruza ingresos con facturas pendientes'],
                ['✅', 'Factura cobrada sola', 'Sin intervención manual'],
                ['🔒', 'Solo lectura PSD2', 'Nunca puede mover tu dinero'],
                ['🔄', 'Sync cada 4 horas', 'O manual cuando quieras'],
              ].map(([ico, t, d]) => (
                <div key={t} className="bg-zinc-800/60 rounded-xl p-3">
                  <p className="text-lg mb-1">{ico}</p>
                  <p className="text-xs font-semibold text-zinc-200">{t}</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{d}</p>
                </div>
              ))}
            </div>
            <a
              href="/ajustes#plan"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              ⭐ Actualizar a Plan Max
            </a>
            <p className="text-xs text-zinc-600 mt-3">99€/mes · Cancela cuando quieras</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-3xl">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-xl border
          ${toast.tipo === 'ok'
            ? 'bg-emerald-950 border-emerald-500/30 text-emerald-300'
            : toast.tipo === 'error'
            ? 'bg-red-950 border-red-500/30 text-red-300'
            : 'bg-sky-950 border-sky-500/30 text-sky-300'}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Conciliación bancaria</h1>
          <p className="text-zinc-500 text-sm mt-1">Conecta tu banco y las facturas se marcan como cobradas solas</p>
        </div>
        <div className="flex items-center gap-2">
          {hayActivas && (
            <button
              onClick={sincronizar}
              disabled={syncing}
              className="text-zinc-300 border border-white/10 hover:bg-white/5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 inline-flex items-center gap-1.5"
            >
              {syncing ? (
                <><span className="w-3 h-3 border border-zinc-400 border-t-transparent rounded-full animate-spin" />Sincronizando...</>
              ) : '↻ Sincronizar todo'}
            </button>
          )}
          <button
            onClick={conectar}
            disabled={conectando}
            className="bg-sky-500 text-zinc-900 px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20 disabled:opacity-60 inline-flex items-center gap-2"
          >
            {conectando ? (
              <><span className="w-4 h-4 border-2 border-zinc-700 border-t-transparent rounded-full animate-spin" />Redirigiendo al banco...</>
            ) : '+ Conectar banco'}
          </button>
        </div>
      </div>

      {/* Aviso si Salt Edge no está configurado */}
      {seNoDisponible && (
        <div className="mb-6 text-amber-400 text-sm bg-amber-500/10 border border-amber-500/20 rounded-xl p-5">
          La conciliación bancaria no está activada. Añade{' '}
          <code className="bg-zinc-800 px-1 rounded text-xs">SALTEDGE_APP_ID</code> y{' '}
          <code className="bg-zinc-800 px-1 rounded text-xs">SALTEDGE_SECRET</code>{' '}
          en las variables de entorno de Vercel y redespliega.
        </div>
      )}

      {/* Resultado del sync */}
      {syncResult && (
        <div className="mb-6 bg-emerald-950/50 border border-emerald-500/20 rounded-xl p-4 text-sm text-emerald-300 flex items-center justify-between">
          <span>
            <strong>Sync completado:</strong> {syncResult.nuevas} transacciones nuevas · <strong>{syncResult.conciliadas} facturas conciliadas</strong> automáticamente
          </span>
          <button onClick={() => setSyncResult(null)} className="text-emerald-600 hover:text-emerald-400 text-xs ml-4">✕</button>
        </div>
      )}

      {/* Lista de conexiones */}
      {loadingConexiones ? (
        <div className="text-zinc-500 text-sm py-16 text-center flex items-center justify-center gap-2">
          <span className="w-4 h-4 border border-zinc-500 border-t-transparent rounded-full animate-spin" />
          Cargando conexiones...
        </div>
      ) : conexiones.length === 0 ? (
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-12 text-center">
          <div className="text-5xl mb-4">🏦</div>
          <p className="text-zinc-200 text-sm font-semibold mb-2">Sin bancos conectados</p>
          <p className="text-zinc-500 text-xs mb-5 max-w-xs mx-auto leading-relaxed">
            Conecta tu banco y Saldea detectará automáticamente cada ingreso,
            cruzándolo con tus facturas pendientes.
          </p>
          <button onClick={conectar} disabled={conectando} className="text-sky-400 text-sm hover:underline disabled:opacity-50">
            Conectar primer banco →
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {conexiones.map(c => (
            <div key={c.id} className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 flex items-center gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="text-sm font-semibold text-zinc-100 capitalize">{c.institution_id}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeStatus(c.status)}`}>
                    {labelStatus(c.status)}
                  </span>
                </div>
                <p className="text-xs text-zinc-500">
                  {c.account_ids?.length
                    ? `${c.account_ids.length} cuenta${c.account_ids.length > 1 ? 's' : ''}`
                    : 'Sin cuentas vinculadas'}
                  {c.last_sync_at &&
                    ` · Sync: ${new Date(c.last_sync_at).toLocaleString('es-ES', {
                      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
                    })}`}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {c.status === 'activa' && (
                  <button
                    onClick={sincronizar}
                    disabled={syncing}
                    className="text-zinc-300 border border-white/10 hover:bg-white/5 px-3 py-2 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                  >
                    {syncing ? '...' : '↻ Sync'}
                  </button>
                )}
                <button
                  onClick={() => desconectar(c.id)}
                  disabled={desconectando === c.id}
                  className="text-red-400 border border-red-500/20 hover:bg-red-500/10 px-3 py-2 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                >
                  {desconectando === c.id ? '...' : 'Desconectar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {conexiones.length > 0 && (
        <p className="mt-6 text-xs text-zinc-600">
          Acceso de solo lectura PSD2 · Saldea nunca puede mover tu dinero · Powered by Salt Edge
        </p>
      )}
    </div>
  )
}

export default function BancoPage() {
  return (
    <Suspense fallback={<div className="p-8 text-zinc-500 text-sm">Cargando...</div>}>
      <BancoPageInner />
    </Suspense>
  )
}
