'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { computarDiasRecordatorios, parsearDiasPersonalizados, calcularTonos, type Patron, type TonoPreset } from '@/lib/recordatorios'
import { getActiveOrgIdClient } from '@/lib/client-org'
import type { Cliente } from '@/types'

export default function NuevaFacturaPage() {
  const router = useRouter()
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const [clientes, setClientes] = useState<Cliente[]>([])

  // Configuración global del usuario
  const [maxRecGlobal, setMaxRecGlobal] = useState(3)
  const [patronGlobal, setPatronGlobal] = useState<Patron>('normal')
  const [diasGlobalPersonalizados, setDiasGlobalPersonalizados] = useState<number[]>([3, 10, 20])
  const [diasGraciaGlobal, setDiasGraciaGlobal] = useState(0)
  const [tonoGlobal, setTonoGlobal] = useState<TonoPreset>('firme')

  // Override para esta factura
  const [maxRecFactura, setMaxRecFactura] = useState<number | null>(null)
  const [patronFactura, setPatronFactura] = useState<Patron | null>(null)
  const [diasPersonalizadosTexto, setDiasPersonalizadosTexto] = useState('')
  const [diasGraciaFactura, setDiasGraciaFactura] = useState<number | null>(null)
  const [tonoFactura, setTonoFactura] = useState<TonoPreset | null>(null)

  const [form, setForm] = useState({
    cliente_id: '',
    numero: '',
    importe: '',
    fecha_vencimiento: '',
    descripcion: '',
    link_pago: '',
  })

  useEffect(() => {
    async function cargar() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      const orgId = await getActiveOrgIdClient()
      const [clientesRes, configRes] = await Promise.all([
        supabase.from('clientes').select('*').order('nombre'),
        orgId
          ? supabase.from('configuraciones_usuario').select('max_recordatorios, patron_dias, dias_personalizados, dias_gracia, tono_preset, aprender_historial').eq('org_id', orgId).maybeSingle()
          : Promise.resolve({ data: null }),
      ])
      setClientes(clientesRes.data ?? [])
      if (configRes.data?.max_recordatorios) setMaxRecGlobal(configRes.data.max_recordatorios)
      if (configRes.data?.patron_dias) setPatronGlobal(configRes.data.patron_dias)
      if (configRes.data?.dias_personalizados && configRes.data.dias_personalizados.length > 0) setDiasGlobalPersonalizados(configRes.data.dias_personalizados)
      if (typeof configRes.data?.dias_gracia === 'number') setDiasGraciaGlobal(configRes.data.dias_gracia)
      if (configRes.data?.tono_preset) setTonoGlobal(configRes.data.tono_preset)
    }
    cargar()
  }, [])

  const maxRecEfectivo = maxRecFactura ?? maxRecGlobal
  const patronEfectivo = patronFactura ?? patronGlobal
  const diasEfectivosPersonalizados = patronFactura === 'personalizado'
    ? parsearDiasPersonalizados(diasPersonalizadosTexto)
    : diasGlobalPersonalizados
  const diasGraciaEfectivo = diasGraciaFactura ?? diasGraciaGlobal
  const tonoEfectivo = tonoFactura ?? tonoGlobal

  const diasPreview = computarDiasRecordatorios(patronEfectivo, diasEfectivosPersonalizados, maxRecEfectivo).map(d => d + diasGraciaEfectivo)
  const tonosPreview = calcularTonos(tonoEfectivo, maxRecEfectivo)
  const hayOverride = maxRecFactura !== null || patronFactura !== null || diasGraciaFactura !== null || tonoFactura !== null

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setCargando(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    const orgId = await getActiveOrgIdClient()
    if (!orgId) {
      setError('No se pudo determinar tu organización. Recarga la página.')
      setCargando(false)
      return
    }

    // Validar link de pago si se proporcionó
    let linkPagoFinal: string | null = null
    if (form.link_pago.trim()) {
      try {
        const u = new URL(form.link_pago.trim())
        if (u.protocol !== 'http:' && u.protocol !== 'https:') throw new Error()
        linkPagoFinal = form.link_pago.trim()
      } catch {
        setError('El link de pago no es una URL válida (debe empezar por http:// o https://)')
        setCargando(false)
        return
      }
    }

    const { data: factura, error: errFactura } = await supabase.from('facturas').insert({
      user_id: user.id,
      org_id: orgId,
      cliente_id: form.cliente_id,
      numero: form.numero,
      importe: parseFloat(form.importe),
      fecha_vencimiento: form.fecha_vencimiento,
      descripcion: form.descripcion || null,
      link_pago: linkPagoFinal,
      estado: 'pendiente',
      max_recordatorios: maxRecFactura,
      patron_dias: patronFactura,
      dias_personalizados: patronFactura === 'personalizado' ? parsearDiasPersonalizados(diasPersonalizadosTexto) : null,
      dias_gracia: diasGraciaFactura,
      tono_preset: tonoFactura,
    }).select().single()

    if (errFactura || !factura) {
      if (errFactura?.message?.includes('PLAN_LIMIT_FACTURAS')) {
        setError('Has llegado al límite de 3 facturas activas del plan Free. Marca alguna como cobrada o sube a Pro desde Ajustes.')
      } else {
        setError('Error al guardar la factura. Inténtalo de nuevo.')
      }
      setCargando(false)
      return
    }

    // "Aprender histórico": ajustar dias_offset según media de retraso del cliente
    let ajusteExtra = 0
    try {
      const { data: configChk } = await supabase
        .from('configuraciones_usuario')
        .select('aprender_historial')
        .eq('org_id', orgId)
        .maybeSingle()
      if (configChk?.aprender_historial) {
        const { data: cobradas } = await supabase
          .from('facturas')
          .select('fecha_vencimiento, created_at')
          .eq('org_id', orgId)
          .eq('cliente_id', form.cliente_id)
          .eq('estado', 'cobrada')
          .limit(20)
        if (cobradas && cobradas.length >= 2) {
          // Estimar retraso medio (días entre vencimiento y created_at de la cobrada-marcada)
          // Aproximación: si created_at > fecha_vencimiento → tarde
          const retrasos = cobradas.map(f => {
            const v = new Date(f.fecha_vencimiento + 'T00:00:00Z').getTime()
            const c = new Date(f.created_at).getTime()
            return Math.max(0, Math.round((c - v) / (24 * 3600 * 1000)))
          }).filter(d => d >= 0 && d <= 60)
          if (retrasos.length > 0) {
            const media = retrasos.reduce((a, b) => a + b, 0) / retrasos.length
            ajusteExtra = Math.min(15, Math.max(0, Math.round(media) - 2))
          }
        }
      }
    } catch { /* ignorar errores de aprendizaje, no es crítico */ }

    const recordatorios = diasPreview.map((dias_offset, i) => ({
      factura_id: factura.id,
      org_id: orgId,
      dias_offset: dias_offset + ajusteExtra,
      tono: tonosPreview[i],
      enviado: false,
    }))
    await supabase.from('recordatorios').insert(recordatorios)

    router.push(`/facturas/${factura.id}`)
  }

  return (
    <div className="p-8 max-w-lg">
      <div className="mb-8">
        <Link href="/facturas" className="text-sm text-zinc-400 hover:text-zinc-100 mb-4 inline-block">
          ← Volver a facturas
        </Link>
        <h1 className="text-2xl font-bold text-zinc-100">Nueva factura</h1>
        <p className="text-zinc-400 text-sm mt-1">
          La IA enviará {maxRecEfectivo} recordatorio{maxRecEfectivo === 1 ? '' : 's'} automático{maxRecEfectivo === 1 ? '' : 's'} a los días {diasPreview.join(', ')} tras el vencimiento
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Cliente *</label>
          <select
            name="cliente_id"
            value={form.cliente_id}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-white/10 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40 bg-zinc-900/80"
          >
            <option value="">Selecciona un cliente</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}{c.empresa ? ` — ${c.empresa}` : ''}</option>
            ))}
          </select>
          {clientes.length === 0 && (
            <p className="text-xs text-zinc-500 mt-1">
              No tienes clientes.{' '}
              <Link href="/clientes/nuevo" className="text-sky-400 hover:underline">Añade uno primero</Link>
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Número de factura *</label>
            <input
              name="numero"
              value={form.numero}
              onChange={handleChange}
              required
              placeholder="001"
              className="w-full px-4 py-3 border border-white/10 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Importe (€) *</label>
            <input
              name="importe"
              type="number"
              step="0.01"
              min="0.01"
              value={form.importe}
              onChange={handleChange}
              required
              placeholder="850.00"
              className="w-full px-4 py-3 border border-white/10 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Fecha de vencimiento *</label>
          <input
            name="fecha_vencimiento"
            type="date"
            value={form.fecha_vencimiento}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-white/10 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Descripción (opcional)</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange as React.ChangeEventHandler<HTMLTextAreaElement>}
            rows={2}
            placeholder="Servicios de diseño web — Proyecto X"
            className="w-full px-4 py-3 border border-white/10 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            💳 Link de pago (opcional)
          </label>
          <input
            name="link_pago"
            type="url"
            value={form.link_pago}
            onChange={handleChange}
            placeholder="https://buy.stripe.com/... o https://paypal.me/..."
            className="w-full px-4 py-3 border border-white/10 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40"
          />
          <p className="text-xs text-zinc-500 mt-1">
            Si lo añades, aparecerá un botón &quot;Pagar ahora&quot; en los recordatorios. Puedes ponerlo después.
          </p>
        </div>

        <div className="border-t border-white/5 pt-4">
          <p className="text-sm font-medium text-zinc-300 mb-2">⚙️ Recordatorios para esta factura <span className="text-zinc-500 font-normal">(opcional)</span></p>
          <p className="text-xs text-zinc-500 mb-3">Si lo dejas así, usa la configuración general. Cambia algo solo si esta factura requiere un trato distinto.</p>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Nº de recordatorios</label>
              <select
                value={maxRecFactura ?? ''}
                onChange={e => setMaxRecFactura(e.target.value === '' ? null : parseInt(e.target.value))}
                className="w-full px-3 py-2.5 border border-white/10 rounded-lg text-sm text-zinc-100 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              >
                <option value="">Por defecto ({maxRecGlobal})</option>
                {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Patrón de días</label>
              <select
                value={patronFactura ?? ''}
                onChange={e => setPatronFactura(e.target.value === '' ? null : e.target.value as Patron)}
                className="w-full px-3 py-2.5 border border-white/10 rounded-lg text-sm text-zinc-100 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              >
                <option value="">Por defecto ({patronGlobal})</option>
                <option value="agresivo">⚡ Agresivo</option>
                <option value="normal">🎯 Normal</option>
                <option value="suave">🌿 Suave</option>
                <option value="personalizado">✏️ Personalizado</option>
              </select>
            </div>
          </div>

          {patronFactura === 'personalizado' && (
            <div className="mb-3">
              <label className="block text-xs text-zinc-400 mb-1">Días (separados por comas)</label>
              <input
                type="text"
                value={diasPersonalizadosTexto}
                onChange={e => setDiasPersonalizadosTexto(e.target.value)}
                placeholder="5, 12, 25"
                className="w-full px-3 py-2.5 border border-white/10 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">⏳ Días de gracia tras el vencimiento</label>
              <select
                value={diasGraciaFactura ?? ''}
                onChange={e => setDiasGraciaFactura(e.target.value === '' ? null : parseInt(e.target.value))}
                className="w-full px-3 py-2.5 border border-white/10 rounded-lg text-sm text-zinc-100 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              >
                <option value="">Por defecto ({diasGraciaGlobal === 0 ? 'sin espera' : `${diasGraciaGlobal} días`})</option>
                {[0,1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n === 0 ? 'Sin espera' : `${n} día${n === 1 ? '' : 's'}`}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">🎭 Tono de los mensajes</label>
              <select
                value={tonoFactura ?? ''}
                onChange={e => setTonoFactura(e.target.value === '' ? null : e.target.value as TonoPreset)}
                className="w-full px-3 py-2.5 border border-white/10 rounded-lg text-sm text-zinc-100 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              >
                <option value="">Por defecto ({tonoGlobal})</option>
                <option value="cordial">😊 Cordial</option>
                <option value="firme">😐 Firme</option>
                <option value="contundente">😠 Contundente</option>
                <option value="extremo">🚨 Extremo</option>
                <option value="personalizado">✏️ Escala</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-sky-500/10 border border-sky-500/20 rounded-lg p-4">
          <p className="text-sm text-sky-300 font-medium mb-1">
            📧 {maxRecEfectivo} recordatorio{maxRecEfectivo === 1 ? '' : 's'} automático{maxRecEfectivo === 1 ? '' : 's'}
            {hayOverride && <span className="ml-1 text-xs font-normal bg-sky-200 text-sky-900 px-2 py-0.5 rounded-full">solo esta factura</span>}
          </p>
          <p className="text-xs text-sky-400">
            {diasPreview.map((d, i) => `Día ${d}: ${tonosPreview[i]}`).join(' · ')}
          </p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm px-4 py-3 rounded-lg">{error}</div>
        )}

        <button
          type="submit"
          disabled={cargando || clientes.length === 0}
          className="w-full bg-sky-500 text-white py-3 rounded-lg font-medium hover:bg-sky-400 transition-colors disabled:opacity-60"
        >
          {cargando ? 'Guardando...' : 'Crear factura'}
        </button>
      </form>
    </div>
  )
}
