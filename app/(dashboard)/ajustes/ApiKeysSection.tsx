'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

interface ApiKeyInfo {
  id: string
  name: string
  key_prefix: string
  created_at: string
  last_used_at: string | null
  active: boolean
}

export default function ApiKeysSection() {
  const [keys, setKeys] = useState<ApiKeyInfo[]>([])
  const [cargando, setCargando] = useState(true)
  const [esOwner, setEsOwner] = useState(false)
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [creando, setCreando] = useState(false)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [keyGenerada, setKeyGenerada] = useState<string | null>(null)
  const [revocando, setRevocando] = useState<string | null>(null)
  const [aviso, setAviso] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null)
  const [copiado, setCopiado] = useState(false)

  async function cargar() {
    setCargando(true)
    try {
      const res = await fetch('/api/api-keys')
      if (res.status === 403) {
        setEsOwner(false)
        return
      }
      if (!res.ok) return
      const data = await res.json()
      setKeys(data.keys ?? [])
      setEsOwner(true)
    } catch {
      // ignorar
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(() => cargar())
  }, [])

  async function crearKey(e: React.FormEvent) {
    e.preventDefault()
    if (!nuevoNombre.trim()) return
    setCreando(true)
    setAviso(null)
    setKeyGenerada(null)
    try {
      const res = await fetch('/api/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nuevoNombre.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setAviso({ tipo: 'error', texto: data.error || 'Error al crear la key' })
        return
      }
      setKeyGenerada(data.key)
      setNuevoNombre('')
      setMostrarForm(false)
      await cargar()
    } catch {
      setAviso({ tipo: 'error', texto: 'Error de red. Inténtalo de nuevo.' })
    } finally {
      setCreando(false)
    }
  }

  async function revocar(id: string, nombre: string) {
    if (!confirm(`¿Revocar la key "${nombre}"? Cualquier integración que la use dejará de funcionar.`)) return
    setRevocando(id)
    setAviso(null)
    try {
      const res = await fetch(`/api/api-keys/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        setAviso({ tipo: 'error', texto: data.error || 'Error al revocar' })
        return
      }
      setAviso({ tipo: 'ok', texto: `Key "${nombre}" revocada.` })
      await cargar()
    } catch {
      setAviso({ tipo: 'error', texto: 'Error de red. Inténtalo de nuevo.' })
    } finally {
      setRevocando(null)
    }
  }

  async function copiarKey() {
    if (!keyGenerada) return
    try {
      await navigator.clipboard.writeText(keyGenerada)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      // fallback silencioso
    }
  }

  if (cargando) {
    return (
      <div className="mb-3 bg-zinc-900/40 border border-white/10 rounded-xl p-5">
        <p className="text-sm text-zinc-500">Cargando API keys…</p>
      </div>
    )
  }

  if (!esOwner) return null

  return (
    <div id="api-keys" className="mb-3 bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden">
      <div className="p-5">

        {/* Cabecera */}
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">🔑</span>
            <div>
              <h2 className="text-base font-semibold text-zinc-100">API Keys</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Usa estas keys para acceder a la API REST de Saldea desde tu propio software
              </p>
            </div>
          </div>
          {!mostrarForm && !keyGenerada && (
            <button
              onClick={() => { setMostrarForm(true); setAviso(null) }}
              className="bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              + Nueva API key
            </button>
          )}
        </div>

        {/* Key recién generada — mostrar UNA SOLA VEZ */}
        {keyGenerada && (
          <div className="mb-4 bg-amber-500/10 border border-amber-500/40 rounded-xl p-4">
            <p className="text-sm font-semibold text-amber-300 mb-1">
              Guarda esta key ahora — no podrás verla de nuevo
            </p>
            <p className="text-xs text-amber-200/70 mb-3">
              Una vez cierres este aviso, la key desaparece. Guárdala en un lugar seguro como un gestor de contraseñas.
            </p>
            <div className="flex items-center gap-2 bg-zinc-900/60 border border-white/10 rounded-lg px-3 py-2.5 font-mono text-sm text-zinc-100 break-all">
              <span className="flex-1">{keyGenerada}</span>
              <button
                onClick={copiarKey}
                className="shrink-0 text-xs text-sky-300 hover:text-sky-200 border border-sky-500/30 px-2 py-1 rounded"
              >
                {copiado ? '✓ Copiado' : 'Copiar'}
              </button>
            </div>
            <button
              onClick={() => { setKeyGenerada(null); setCopiado(false) }}
              className="mt-3 text-xs text-amber-300/70 hover:text-amber-300 underline"
            >
              Ya la guardé, cerrar este aviso
            </button>
          </div>
        )}

        {/* Formulario nueva key */}
        {mostrarForm && (
          <form onSubmit={crearKey} className="mb-4 bg-zinc-800/50 border border-white/5 rounded-xl p-4">
            <p className="text-sm font-medium text-zinc-300 mb-3">Nueva API key</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={nuevoNombre}
                onChange={e => setNuevoNombre(e.target.value)}
                placeholder='Nombre descriptivo, ej: "Mi ERP" o "Script de informes"'
                maxLength={80}
                required
                autoFocus
                className="flex-1 bg-zinc-900/60 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50"
              />
              <button
                type="submit"
                disabled={creando || !nuevoNombre.trim()}
                className="bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {creando ? 'Creando…' : 'Crear'}
              </button>
              <button
                type="button"
                onClick={() => { setMostrarForm(false); setNuevoNombre('') }}
                className="text-sm text-zinc-400 hover:text-zinc-100 px-3 py-2 rounded-lg border border-white/10 hover:border-white/20"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

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

        {/* Lista de keys */}
        {keys.length === 0 ? (
          <p className="text-xs text-zinc-500 py-2">No tienes API keys creadas todavía.</p>
        ) : (
          <div className="space-y-2">
            {keys.map(k => (
              <div
                key={k.id}
                className={`flex items-center justify-between gap-3 flex-wrap rounded-lg border px-4 py-3 ${
                  k.active
                    ? 'bg-zinc-900/40 border-white/10'
                    : 'bg-zinc-900/20 border-white/5 opacity-60'
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-zinc-100">{k.name}</span>
                    {!k.active && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 uppercase">
                        Revocada
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="font-mono text-xs text-zinc-400">{k.key_prefix}…</span>
                    <span className="text-xs text-zinc-500">
                      Creada {new Date(k.created_at).toLocaleDateString('es-ES')}
                    </span>
                    {k.last_used_at ? (
                      <span className="text-xs text-zinc-500">
                        Último uso {new Date(k.last_used_at).toLocaleDateString('es-ES')}
                      </span>
                    ) : (
                      <span className="text-xs text-zinc-600">Sin usar todavía</span>
                    )}
                  </div>
                </div>
                {k.active && (
                  <button
                    onClick={() => revocar(k.id, k.name)}
                    disabled={revocando === k.id}
                    className="text-xs text-rose-300 hover:bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
                  >
                    {revocando === k.id ? 'Revocando…' : 'Revocar'}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Documentación rápida */}
        <div className="mt-5 pt-4 border-t border-white/5">
          <p className="text-xs font-medium text-zinc-400 mb-2">Ejemplo de uso</p>
          <pre className="bg-zinc-900/60 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-zinc-300 overflow-x-auto">
            <code>{`curl https://app.marsof.es/api/v1/facturas \\
  -H "Authorization: Bearer sk_live_..."`}
            </code>
          </pre>
          <div className="mt-3 text-xs text-zinc-500 space-y-0.5">
            <p>· <code className="text-zinc-400">GET /api/v1/facturas</code> — lista facturas (params: estado, limit, offset)</p>
            <p>· <code className="text-zinc-400">GET /api/v1/facturas/:id</code> — detalle de factura con pagos</p>
            <p>· <code className="text-zinc-400">GET /api/v1/clientes</code> — lista clientes (params: limit, offset)</p>
            <p>· Límite: 1.000 peticiones/hora por key</p>
          </div>
        </div>
      </div>
    </div>
  )
}
