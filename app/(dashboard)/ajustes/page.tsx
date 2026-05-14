'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { computarDiasRecordatorios, parsearDiasPersonalizados, type Patron, type TonoPreset } from '@/lib/recordatorios'
import { PagoModal } from '@/app/components/PagoModal'

export default function AjustesPage() {
  const [nombre, setNombre] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [email, setEmail] = useState('')
  const [maxRecordatorios, setMaxRecordatorios] = useState(3)
  const [patronDias, setPatronDias] = useState<Patron>('normal')
  const [diasPersonalizadosTexto, setDiasPersonalizadosTexto] = useState('3, 10, 20')
  const [diasGracia, setDiasGracia] = useState(0)
  const [enviarFinSemana, setEnviarFinSemana] = useState(false)
  const [maxEmailsMes, setMaxEmailsMes] = useState(5)
  const [tonoPreset, setTonoPreset] = useState<TonoPreset>('firme')
  const [plantillas, setPlantillas] = useState<Record<'amigable' | 'firme' | 'formal' | 'extremo', string>>({
    amigable: '',
    firme: '',
    formal: '',
    extremo: '',
  })
  const [firma, setFirma] = useState('')
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [subiendoLogo, setSubiendoLogo] = useState(false)
  const [colorPrimario, setColorPrimario] = useState('#0284c7')
  const [idioma, setIdioma] = useState<'es'|'ca'|'en'|'pt'>('es')
  const [evitarFestivos, setEvitarFestivos] = useState(false)
  const [ofrecerPlazosDia, setOfrecerPlazosDia] = useState(0)
  const [variarTextos, setVariarTextos] = useState(false)
  const [recargoMoraActivo, setRecargoMoraActivo] = useState(false)
  const [recargoMoraPct, setRecargoMoraPct] = useState(5)
  const [recargoMoraDia, setRecargoMoraDia] = useState(30)
  const [descuentoProntoPagoPct, setDescuentoProntoPagoPct] = useState(0)
  const [descuentoProntoPagoDias, setDescuentoProntoPagoDias] = useState(7)
  const [resumenDiario, setResumenDiario] = useState(false)
  const [resumenSemanal, setResumenSemanal] = useState(true)
  const [modoVacaciones, setModoVacaciones] = useState(false)
  const [modoVacacionesHasta, setModoVacacionesHasta] = useState('')
  const [aprenderHistorial, setAprenderHistorial] = useState(false)
  const [plan, setPlan] = useState<'free' | 'pro'>('free')
  const [intervaloPago, setIntervaloPago] = useState<'mes' | 'anio'>('mes')
  const [mostrarPago, setMostrarPago] = useState(false)
  const [abriendoPortal, setAbriendoPortal] = useState(false)
  const [errorPortal, setErrorPortal] = useState('')

  async function abrirPortal() {
    setErrorPortal('')
    setAbriendoPortal(true)
    try {
      const res = await fetch('/api/stripe-portal', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) {
        setErrorPortal(data?.error || 'No se pudo abrir el portal del cliente.')
        setAbriendoPortal(false)
        return
      }
      window.location.href = data.url
    } catch {
      setErrorPortal('Error de red. Inténtalo de nuevo.')
      setAbriendoPortal(false)
    }
  }
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null)

  useEffect(() => {
    const supabase = createClient()
    async function cargar() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setNombre(user.user_metadata?.nombre || '')
        setEmpresa(user.user_metadata?.empresa || '')
        setEmail(user.email || '')
      }
      const res = await fetch('/api/configuracion')
      const data = await res.json()
      if (data.configuracion?.plan === 'pro') setPlan('pro')
      if (data.configuracion?.max_recordatorios) {
        setMaxRecordatorios(data.configuracion.max_recordatorios)
      }
      if (data.configuracion?.patron_dias) setPatronDias(data.configuracion.patron_dias)
      if (data.configuracion?.dias_personalizados?.length > 0) {
        setDiasPersonalizadosTexto(data.configuracion.dias_personalizados.join(', '))
      }
      if (typeof data.configuracion?.dias_gracia === 'number') setDiasGracia(data.configuracion.dias_gracia)
      if (typeof data.configuracion?.enviar_fin_semana === 'boolean') setEnviarFinSemana(data.configuracion.enviar_fin_semana)
      if (typeof data.configuracion?.max_emails_mes === 'number') setMaxEmailsMes(data.configuracion.max_emails_mes)
      if (data.configuracion?.tono_preset) setTonoPreset(data.configuracion.tono_preset)
      setPlantillas({
        amigable: data.configuracion?.plantilla_amigable ?? '',
        firme: data.configuracion?.plantilla_firme ?? '',
        formal: data.configuracion?.plantilla_formal ?? '',
        extremo: data.configuracion?.plantilla_extremo ?? '',
      })
      setFirma(data.configuracion?.firma ?? '')
      setLogoUrl(data.configuracion?.logo_url ?? null)
      if (data.configuracion?.color_primario) setColorPrimario(data.configuracion.color_primario)
      if (data.configuracion?.idioma) setIdioma(data.configuracion.idioma)
      if (typeof data.configuracion?.evitar_festivos === 'boolean') setEvitarFestivos(data.configuracion.evitar_festivos)
      if (typeof data.configuracion?.ofrecer_pago_plazos_dia === 'number') setOfrecerPlazosDia(data.configuracion.ofrecer_pago_plazos_dia)
      if (typeof data.configuracion?.variar_textos === 'boolean') setVariarTextos(data.configuracion.variar_textos)
      if (typeof data.configuracion?.recargo_mora_activo === 'boolean') setRecargoMoraActivo(data.configuracion.recargo_mora_activo)
      if (data.configuracion?.recargo_mora_pct != null) setRecargoMoraPct(Number(data.configuracion.recargo_mora_pct))
      if (typeof data.configuracion?.recargo_mora_dia === 'number') setRecargoMoraDia(data.configuracion.recargo_mora_dia)
      if (data.configuracion?.descuento_pronto_pago_pct != null) setDescuentoProntoPagoPct(Number(data.configuracion.descuento_pronto_pago_pct))
      if (typeof data.configuracion?.descuento_pronto_pago_dias === 'number') setDescuentoProntoPagoDias(data.configuracion.descuento_pronto_pago_dias)
      if (typeof data.configuracion?.resumen_diario === 'boolean') setResumenDiario(data.configuracion.resumen_diario)
      if (typeof data.configuracion?.resumen_semanal === 'boolean') setResumenSemanal(data.configuracion.resumen_semanal)
      if (typeof data.configuracion?.modo_vacaciones === 'boolean') setModoVacaciones(data.configuracion.modo_vacaciones)
      if (data.configuracion?.modo_vacaciones_hasta) setModoVacacionesHasta(data.configuracion.modo_vacaciones_hasta)
      if (typeof data.configuracion?.aprender_historial === 'boolean') setAprenderHistorial(data.configuracion.aprender_historial)
      setCargando(false)
    }
    cargar()
  }, [])

  const diasPreviewSinGracia = computarDiasRecordatorios(
    patronDias,
    patronDias === 'personalizado' ? parsearDiasPersonalizados(diasPersonalizadosTexto) : null,
    maxRecordatorios
  )
  const diasPreview = diasPreviewSinGracia.map(d => d + diasGracia)

  async function guardar(e: React.FormEvent) {
    e.preventDefault()
    setGuardando(true)
    setMensaje(null)

    try {
      const supabase = createClient()
      const [perfilRes, configRes] = await Promise.all([
        fetch('/api/ajustes', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, empresa }),
        }),
        fetch('/api/configuracion', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            max_recordatorios: maxRecordatorios,
            patron_dias: patronDias,
            dias_personalizados: patronDias === 'personalizado'
              ? parsearDiasPersonalizados(diasPersonalizadosTexto)
              : undefined,
            dias_gracia: diasGracia,
            enviar_fin_semana: enviarFinSemana,
            max_emails_mes: maxEmailsMes,
            tono_preset: tonoPreset,
            plantilla_amigable: plantillas.amigable,
            plantilla_firme: plantillas.firme,
            plantilla_formal: plantillas.formal,
            plantilla_extremo: plantillas.extremo,
            firma: firma,
            logo_url: logoUrl,
            color_primario: colorPrimario,
            idioma: idioma,
            evitar_festivos: evitarFestivos,
            ofrecer_pago_plazos_dia: ofrecerPlazosDia,
            variar_textos: variarTextos,
            recargo_mora_activo: recargoMoraActivo,
            recargo_mora_pct: recargoMoraPct,
            recargo_mora_dia: recargoMoraDia,
            descuento_pronto_pago_pct: descuentoProntoPagoPct,
            descuento_pronto_pago_dias: descuentoProntoPagoDias,
            resumen_diario: resumenDiario,
            resumen_semanal: resumenSemanal,
            modo_vacaciones: modoVacaciones,
            modo_vacaciones_hasta: modoVacacionesHasta || null,
            aprender_historial: aprenderHistorial,
          }),
        }),
      ])

      const perfilData = await perfilRes.json()
      const configData = await configRes.json()

      if (perfilData.error || configData.error) {
        setMensaje({ tipo: 'error', texto: perfilData.error || configData.error })
      } else {
        setMensaje({ tipo: 'ok', texto: '✓ Configuración aplicada' })
        await supabase.auth.refreshSession()
      }
    } catch {
      setMensaje({ tipo: 'error', texto: 'Error de conexión' })
    } finally {
      setGuardando(false)
    }
  }

  async function subirLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setMensaje({ tipo: 'error', texto: 'El logo no puede pesar más de 2MB' })
      return
    }
    if (!['image/png','image/jpeg','image/webp'].includes(file.type)) {
      setMensaje({ tipo: 'error', texto: 'Solo se aceptan PNG, JPG o WEBP' })
      return
    }
    setSubiendoLogo(true)
    setMensaje(null)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const ext = file.name.split('.').pop()
      const path = `${user.id}/logo.${ext}`
      const { error: errUp } = await supabase.storage.from('logos').upload(path, file, { upsert: true, contentType: file.type })
      if (errUp) {
        setMensaje({ tipo: 'error', texto: 'Error al subir el logo: ' + errUp.message })
        setSubiendoLogo(false)
        return
      }
      const { data: { publicUrl } } = supabase.storage.from('logos').getPublicUrl(path)
      const finalUrl = `${publicUrl}?t=${Date.now()}`
      setLogoUrl(finalUrl)
    } finally {
      setSubiendoLogo(false)
    }
  }

  async function quitarLogo() {
    if (!logoUrl) return
    setLogoUrl(null)
    setMensaje({ tipo: 'ok', texto: 'Logo quitado — pulsa "Guardar cambios" para confirmar' })
  }

  if (cargando) return null

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-zinc-100 mb-4 inline-block">← Volver</Link>
        <h1 className="text-2xl font-bold text-zinc-100">Ajustes</h1>
        <p className="text-zinc-400 text-sm mt-1">Configura cómo trabaja Saldea para ti</p>
      </div>

      <div id="plan" className="mb-3 bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden">
        <div className="p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">💳</span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-zinc-100">Plan y suscripción</h2>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${
                    plan === 'pro' ? 'bg-sky-500/20 text-sky-300' : 'bg-gray-100 text-zinc-400'
                  }`}>{plan}</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  {plan === 'pro'
                    ? 'Tienes el plan Pro activo. Gracias por confiar en Saldea.'
                    : 'Plan Free · 3 facturas activas, 10 clientes, 30 emails/mes, 1 tono.'}
                </p>
              </div>
            </div>
            {plan === 'pro' && (
              <div className="flex flex-col items-end gap-1">
                <button
                  type="button"
                  onClick={abrirPortal}
                  disabled={abriendoPortal}
                  className="text-sm font-bold text-sky-300 bg-sky-500/10 border border-sky-500/30 hover:bg-sky-500/20 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {abriendoPortal ? 'Abriendo...' : 'Gestionar suscripción →'}
                </button>
                <span className="text-[10px] text-zinc-500">Cancelar · cambiar tarjeta · facturas</span>
              </div>
            )}
          </div>
          {errorPortal && plan === 'pro' && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs px-3 py-2 rounded-lg mb-3">
              {errorPortal}
            </div>
          )}

          {plan === 'free' && (
            <div className="border-t border-white/5 pt-4">
              <p className="text-sm font-medium text-zinc-300 mb-3">Sube a Pro</p>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setIntervaloPago('mes')}
                  className={`px-4 py-2.5 rounded-lg text-sm font-semibold border-2 transition-colors ${
                    intervaloPago === 'mes'
                      ? 'bg-sky-500/10 border-sky-500 text-sky-300'
                      : 'bg-zinc-900/80 border-white/10 text-zinc-300 hover:border-white/20'
                  }`}
                >
                  Mensual · 49€/mes
                  <span className="block text-[10px] text-sky-400 font-bold mt-0.5">7 días gratis</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIntervaloPago('anio')}
                  className={`px-4 py-2.5 rounded-lg text-sm font-semibold border-2 transition-colors flex items-center gap-2 ${
                    intervaloPago === 'anio'
                      ? 'bg-sky-500/10 border-sky-500 text-sky-300'
                      : 'bg-zinc-900/80 border-white/10 text-zinc-300 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <span>Anual · 499€/año</span>
                    <span className="text-[10px] text-sky-400 font-bold">Ahorra 89€ (casi 2 meses)</span>
                  </div>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setMostrarPago(true)}
                className="bg-sky-500 text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-sky-400 transition-colors"
              >
                {intervaloPago === 'mes' ? 'Empezar 7 días gratis →' : 'Pagar 499€ y empezar →'}
              </button>
              <p className="text-xs text-zinc-500 mt-3">
                {intervaloPago === 'mes'
                  ? 'Se requiere tarjeta. El primer cobro se realiza el día 8. Cancela en 1 clic antes y no pagas nada.'
                  : 'Cobro único de 499€. Sin permanencia. No se renueva sin tu permiso.'}
              </p>
            </div>
          )}
        </div>
      </div>
      {mostrarPago && <PagoModal onClose={() => setMostrarPago(false)} interval={intervaloPago} />}

      <form onSubmit={guardar} className="space-y-3">

        {/* Mi perfil */}
        <details className="bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden group">
          <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-zinc-900/30 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">👤</span>
              <div>
                <h2 className="text-base font-semibold text-zinc-100">Mi perfil</h2>
                <p className="text-xs text-zinc-500">Tu nombre y empresa aparecerán en los emails a tus clientes</p>
              </div>
            </div>
            <span className="text-zinc-500 text-sm transition-transform group-open:rotate-180">▼</span>
          </summary>
          <div className="px-5 pb-5 pt-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">Tu nombre <span className="text-red-400">*</span></label>
              <input
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                required
                placeholder="Carlos García"
                className="w-full px-4 py-3 border border-white/10 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Nombre de empresa
                <span className="text-zinc-500 font-normal ml-1">(aparece en emails y PDFs)</span>
              </label>
              <input
                type="text"
                value={empresa}
                onChange={e => setEmpresa(e.target.value)}
                placeholder="Mi Empresa S.L."
                className="w-full px-4 py-3 border border-white/10 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-3 border border-white/5 rounded-lg text-zinc-500 bg-zinc-900/30 cursor-not-allowed"
              />
              <p className="text-xs text-zinc-500 mt-1.5">El email no se puede cambiar</p>
            </div>
          </div>
        </details>

        {/* Frecuencia de recordatorios */}
        <details className="bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden group">
          <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-zinc-900/30 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">⏰</span>
              <div>
                <h2 className="text-base font-semibold text-zinc-100">Frecuencia de recordatorios</h2>
                <p className="text-xs text-zinc-500">Cuántos avisos enviamos y cuándo</p>
              </div>
            </div>
            <span className="text-zinc-500 text-sm transition-transform group-open:rotate-180">▼</span>
          </summary>
          <div className="px-5 pb-5 pt-1">
            <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Máximo de recordatorios por factura
              <span className="ml-2 text-sky-400 font-semibold">{maxRecordatorios}</span>
            </label>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={maxRecordatorios}
              onChange={e => setMaxRecordatorios(parseInt(e.target.value))}
              className="w-full accent-sky-600"
            />
            <div className="flex justify-between text-xs text-zinc-500 mt-1">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              ⏳ Días de gracia antes del primer aviso
              <span className="ml-2 text-sky-400 font-semibold">{diasGracia}</span>
              <span className="ml-1 text-zinc-500 font-normal text-xs">{diasGracia === 0 ? '(sin espera)' : `días`}</span>
            </label>
            <input
              type="range"
              min={0}
              max={7}
              step={1}
              value={diasGracia}
              onChange={e => setDiasGracia(parseInt(e.target.value))}
              className="w-full accent-sky-600"
            />
            <div className="flex justify-between text-xs text-zinc-500 mt-1">
              <span>0</span>
              <span>3</span>
              <span>7</span>
            </div>
            <p className="text-xs text-zinc-400 mt-2">
              {diasGracia === 0
                ? 'Los recordatorios empiezan en cuanto se cumple el patrón tras el vencimiento.'
                : `Saldea esperará ${diasGracia} día${diasGracia === 1 ? '' : 's'} extra tras el vencimiento antes de mandar el primer email. Útil para no asustar a clientes habituales.`}
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
            <label className="block text-sm font-medium text-zinc-300 mb-3">📅 Cada cuántos días los envío</label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {([
                { id: 'agresivo', titulo: '⚡ Agresivo', desc: '3, 7, 14 días (+7)' },
                { id: 'normal', titulo: '🎯 Normal', desc: '7, 15, 30 días (+15)' },
                { id: 'suave', titulo: '🌿 Suave', desc: '15, 30, 60 días (+30)' },
                { id: 'personalizado', titulo: '✏️ Personalizado', desc: 'Tú eliges los días' },
              ] as const).map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPatronDias(p.id)}
                  className={`text-left p-3 rounded-lg border-2 transition-colors ${
                    patronDias === p.id
                      ? 'border-sky-500 bg-sky-500/10'
                      : 'border-white/10 bg-zinc-900/40 hover:border-gray-300'
                  }`}
                >
                  <p className={`text-sm font-medium ${patronDias === p.id ? 'text-sky-300' : 'text-zinc-100'}`}>{p.titulo}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{p.desc}</p>
                </button>
              ))}
            </div>

            {patronDias === 'personalizado' && (
              <div className="mt-3">
                <label className="block text-xs text-zinc-400 mb-1">Días separados por comas (ej: 5, 12, 25)</label>
                <input
                  type="text"
                  value={diasPersonalizadosTexto}
                  onChange={e => setDiasPersonalizadosTexto(e.target.value)}
                  placeholder="5, 12, 25, 45"
                  className="w-full px-4 py-2.5 border border-white/10 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40"
                />
              </div>
            )}

            <div className="mt-4 bg-zinc-900/30 rounded-lg p-3 text-xs text-zinc-400">
              <p className="font-medium text-zinc-200 mb-1">Vista previa:</p>
              <p>{diasPreview.map((d, i) => {
                const tono = i === 0 ? 'amigable' : i === 1 ? 'firme' : 'formal'
                return `Día ${d} (${tono})`
              }).join(' · ')}</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={enviarFinSemana}
                onChange={e => setEnviarFinSemana(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-sky-600 cursor-pointer"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-300">📅 Enviar también los fines de semana</p>
                <p className="text-xs text-zinc-400 mt-1">
                  {enviarFinSemana
                    ? 'Saldea enviará recordatorios todos los días, incluido sábado y domingo.'
                    : 'Saldea no enviará recordatorios automáticos los sábados ni domingos. Si toca un fin de semana, se manda el lunes.'}
                </p>
              </div>
            </label>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              📧 Máximo de emails al mes por cliente
              <span className="ml-2 text-sky-400 font-semibold">{maxEmailsMes}</span>
              <span className="ml-1 text-zinc-500 font-normal text-xs">email{maxEmailsMes === 1 ? '' : 's'}/mes</span>
            </label>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={maxEmailsMes}
              onChange={e => setMaxEmailsMes(parseInt(e.target.value))}
              className="w-full accent-sky-600"
            />
            <div className="flex justify-between text-xs text-zinc-500 mt-1">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Aunque un cliente tenga varias facturas vencidas, Saldea no le enviará más de <strong>{maxEmailsMes} email{maxEmailsMes === 1 ? '' : 's'}</strong> en un mes. Si ya recibió ese límite, los siguientes recordatorios se aplazan al mes siguiente.
              Esto evita acosar a un cliente. Tu botón <em>&quot;Enviar recordatorio ahora&quot;</em> no respeta este límite (es tu decisión consciente).
            </p>
          </div>
          </div>
        </details>

        {/* Tono y mensajes */}
        <details className="bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden group">
          <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-zinc-900/30 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">✉️</span>
              <div>
                <h2 className="text-base font-semibold text-zinc-100">Tono y mensajes</h2>
                <p className="text-xs text-zinc-500">Personaliza los textos y el tono de los emails</p>
              </div>
            </div>
            <span className="text-zinc-500 text-sm transition-transform group-open:rotate-180">▼</span>
          </summary>
          <div className="px-5 pb-5 pt-1">
            <label className="block text-sm font-medium text-zinc-300 mb-3">Tono general de los recordatorios</label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {([
                { id: 'cordial', titulo: '😊 Cordial', desc: 'Amable y comprensivo' },
                { id: 'firme', titulo: '😐 Firme', desc: 'Directo y sin rodeos' },
                { id: 'contundente', titulo: '😠 Contundente', desc: 'Formal, menciona medidas legales' },
                { id: 'extremo', titulo: '🚨 Extremo', desc: 'Último aviso antes de juzgado' },
                { id: 'personalizado', titulo: '✏️ Personalizado', desc: 'Escala según el orden' },
              ] as const).map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTonoPreset(t.id)}
                  className={`text-left p-3 rounded-lg border-2 transition-colors ${
                    tonoPreset === t.id
                      ? 'border-sky-500 bg-sky-500/10'
                      : 'border-white/10 bg-zinc-900/40 hover:border-gray-300'
                  }`}
                >
                  <p className={`text-sm font-medium ${tonoPreset === t.id ? 'text-sky-300' : 'text-zinc-100'}`}>{t.titulo}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{t.desc}</p>
                </button>
              ))}
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mt-2">
              {tonoPreset === 'cordial' && 'Todos los recordatorios serán amables y comprensivos. Útil para clientes habituales y de confianza.'}
              {tonoPreset === 'firme' && 'Todos los recordatorios serán directos y sin rodeos. Equilibrio entre profesionalidad e insistencia.'}
              {tonoPreset === 'contundente' && 'Todos los recordatorios serán formales y mencionarán posibles medidas legales. Úsalo con cuidado.'}
              {tonoPreset === 'extremo' && '⚠️ Modo extremo. Cada email será un último aviso de 7 días: reclamación judicial inmediata, costes legales a cargo del deudor, e inclusión en registros de morosos (ASNEF/RAI). Solo cuando la relación con el cliente ya está rota y el cobro es prioritario.'}
              {tonoPreset === 'personalizado' && 'Los recordatorios escalarán de amigable a firme a formal con el paso de los días (comportamiento clásico).'}
            </p>

            <div className="mt-8 pt-6 border-t border-white/5">
              <h3 className="text-sm font-medium text-zinc-300 mb-1">✏️ Plantillas personalizadas (opcional)</h3>
              <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
                Si escribes texto en alguna plantilla, Saldea la usará tal cual <strong>sin pasar por la IA</strong>. Si la dejas vacía, la IA generará un email único cada vez según el tono.
                <br />
                Variables disponibles: <code className="text-sky-300 bg-sky-500/10 px-1 rounded">{'{cliente}'}</code> <code className="text-sky-300 bg-sky-500/10 px-1 rounded">{'{empresa}'}</code> <code className="text-sky-300 bg-sky-500/10 px-1 rounded">{'{factura}'}</code> <code className="text-sky-300 bg-sky-500/10 px-1 rounded">{'{importe}'}</code> <code className="text-sky-300 bg-sky-500/10 px-1 rounded">{'{vencimiento}'}</code> <code className="text-sky-300 bg-sky-500/10 px-1 rounded">{'{dias_vencida}'}</code> <code className="text-sky-300 bg-sky-500/10 px-1 rounded">{'{empresa_emisor}'}</code>
                <br />
                <span className="text-zinc-500">La primera línea es el asunto. Después, una línea en blanco, y el cuerpo del email.</span>
              </p>

              <div className="space-y-4">
                {([
                  { id: 'amigable', label: '😊 Plantilla cordial', placeholder: 'Recordatorio factura {factura}\n\nHola {cliente},\n\nSeguramente se te ha pasado, pero la factura {factura} de {importe} venció el {vencimiento}. ¿Podrías echarle un vistazo?\n\nUn saludo,\n{empresa_emisor}' },
                  { id: 'firme', label: '😐 Plantilla firme', placeholder: 'Pendiente de pago: factura {factura}\n\n{cliente},\n\nLa factura {factura} por importe de {importe} lleva {dias_vencida} días vencida. Te ruego que regularices el pago lo antes posible.\n\n{empresa_emisor}' },
                  { id: 'formal', label: '😠 Plantilla contundente', placeholder: 'NOTIFICACIÓN: Factura {factura} vencida\n\n{cliente},\n\nLa factura {factura} ({importe}) lleva {dias_vencida} días vencida. Si no se regulariza en breve, nos veremos obligados a tomar medidas legales.\n\n{empresa_emisor}' },
                  { id: 'extremo', label: '🚨 Plantilla extrema', placeholder: 'ÚLTIMO AVISO - Factura {factura}\n\n{cliente},\n\nÚltima notificación antes de reclamación judicial.\n\nFactura: {factura}\nImporte: {importe}\nDías vencida: {dias_vencida}\n\nPlazo improrrogable: 7 días naturales. Pasado este plazo se iniciarán acciones legales, los costes correrán a su cargo y se procederá a la inclusión en ASNEF/RAI.\n\n{empresa_emisor}' },
                ] as const).map(p => (
                  <div key={p.id}>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">{p.label}</label>
                    <textarea
                      value={plantillas[p.id]}
                      onChange={e => setPlantillas(prev => ({ ...prev, [p.id]: e.target.value }))}
                      rows={6}
                      placeholder={p.placeholder}
                      className="w-full px-3 py-2 border border-white/10 rounded-lg text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-sky-500/40 font-mono"
                    />
                    <p className="text-xs text-zinc-500 mt-1">
                      {plantillas[p.id].trim() ? '✓ Plantilla activa (no se usará IA)' : 'Vacío — la IA generará el email automáticamente'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </details>

        {/* Imagen de marca */}
        <details className="bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden group">
          <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-zinc-900/30 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">🎨</span>
              <div>
                <h2 className="text-base font-semibold text-zinc-100">Imagen de marca</h2>
                <p className="text-xs text-zinc-500">Firma del email · Logo y color (próximamente)</p>
              </div>
            </div>
            <span className="text-zinc-500 text-sm transition-transform group-open:rotate-180">▼</span>
          </summary>
          <div className="px-5 pb-5 pt-1">
            <label className="block text-sm font-medium text-zinc-300 mb-1">🖼️ Logo de tu empresa</label>
            <p className="text-xs text-zinc-400 mb-3">Aparecerá arriba en todos los emails y en el PDF de la factura. PNG, JPG o WEBP (máx. 2MB).</p>
            <div className="flex items-start gap-4 mb-6">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt="Logo" className="max-h-20 max-w-[160px] border border-white/10 rounded-lg p-2 bg-zinc-900/40 object-contain" />
              ) : (
                <div className="w-20 h-20 border-2 border-dashed border-white/10 rounded-lg flex items-center justify-center text-zinc-600 text-xs">Sin logo</div>
              )}
              <div className="flex-1 space-y-2">
                <label className="inline-block bg-sky-500/10 border border-sky-500/30 text-sky-300 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer hover:bg-sky-500/150/20">
                  {subiendoLogo ? 'Subiendo...' : (logoUrl ? 'Cambiar logo' : 'Subir logo')}
                  <input type="file" accept="image/png,image/jpeg,image/webp" onChange={subirLogo} disabled={subiendoLogo} className="hidden" />
                </label>
                {logoUrl && (
                  <button type="button" onClick={quitarLogo} className="block text-xs text-red-500 hover:text-rose-300">
                    Quitar logo
                  </button>
                )}
              </div>
            </div>

            <label className="block text-sm font-medium text-zinc-300 mb-1">✍️ Firma del email</label>
            <p className="text-xs text-zinc-400 mb-2 leading-relaxed">
              Se añadirá automáticamente al final de todos los emails que envía Saldea. Aquí pones tu nombre, cargo, teléfono, web, redes... lo que quieras que vean tus clientes.
            </p>
            <textarea
              value={firma}
              onChange={e => setFirma(e.target.value)}
              rows={6}
              placeholder={`Carlos García\nDirector Financiero — RuralMar S.Coop.\n📞 600 000 000\n🌐 marsof.es\n📧 carlos@marsof.es`}
              className="w-full px-3 py-2 border border-white/10 rounded-lg text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
            <p className="text-xs text-zinc-500 mt-1">
              {firma.trim() ? '✓ Firma activa' : 'Vacío — no se añadirá firma al email'}
            </p>

            <div className="mt-6 pt-6 border-t border-white/5">
              <label className="block text-sm font-medium text-zinc-300 mb-1">🎨 Color principal</label>
              <p className="text-xs text-zinc-400 mb-3">Se usará en el botón de pago de los emails y en los detalles del PDF de la factura.</p>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={colorPrimario}
                  onChange={e => setColorPrimario(e.target.value)}
                  className="w-16 h-16 rounded-lg border border-white/10 cursor-pointer"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={colorPrimario}
                    onChange={e => setColorPrimario(e.target.value)}
                    placeholder="#0284c7"
                    className="w-32 px-3 py-2 border border-white/10 rounded-lg text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-sky-500/40 font-mono"
                  />
                  <div className="mt-2 flex gap-2">
                    {['#0284c7','#2563eb','#dc2626','#7c3aed','#ea580c','#0891b2','#0f172a'].map(c => (
                      <button key={c} type="button" onClick={() => setColorPrimario(c)} aria-label={c}
                        className={`w-7 h-7 rounded-full border-2 transition ${colorPrimario === c ? 'border-gray-900 scale-110' : 'border-white/10 hover:scale-105'}`}
                        style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-zinc-900/30 rounded-lg p-3">
                <p className="text-xs text-zinc-400 mb-2">Vista previa del botón:</p>
                <button type="button" disabled
                  className="px-6 py-2.5 rounded-lg text-white font-medium text-sm cursor-default"
                  style={{ backgroundColor: colorPrimario }}>
                  ✓ Ya he pagado esta factura
                </button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <label className="block text-sm font-medium text-zinc-300 mb-1">🌐 Idioma de los emails</label>
              <p className="text-xs text-zinc-400 mb-3">Idioma en que la IA escribirá los emails generados automáticamente. Las plantillas personalizadas se respetan tal cual estén.</p>
              <div className="grid grid-cols-4 gap-2">
                {([
                  { id: 'es', titulo: '🇪🇸 Español' },
                  { id: 'ca', titulo: '🇪🇸 Català' },
                  { id: 'en', titulo: '🇬🇧 English' },
                  { id: 'pt', titulo: '🇵🇹 Português' },
                ] as const).map(l => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setIdioma(l.id)}
                    className={`p-2 rounded-lg border-2 text-sm transition-colors ${
                      idioma === l.id ? 'border-sky-500 bg-sky-500/10 text-sky-300 font-medium' : 'border-white/10 bg-zinc-900/40 hover:border-gray-300 text-zinc-100'
                    }`}
                  >
                    {l.titulo}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </details>

        {/* Comportamiento inteligente */}
        <details className="bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden group">
          <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-zinc-900/30 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">🧠</span>
              <div>
                <h2 className="text-base font-semibold text-zinc-100">Comportamiento inteligente</h2>
                <p className="text-xs text-zinc-500">Festivos, vacaciones, pausa si responde...</p>
              </div>
            </div>
            <span className="text-zinc-500 text-sm transition-transform group-open:rotate-180">▼</span>
          </summary>
          <div className="px-5 pb-5 pt-1">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={evitarFestivos}
                onChange={e => setEvitarFestivos(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-sky-600 cursor-pointer"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-300">🇪🇸 No enviar en festivos nacionales españoles</p>
                <p className="text-xs text-zinc-400 mt-1">
                  {evitarFestivos
                    ? 'Saldea no enviará recordatorios automáticos en festivos nacionales (Año Nuevo, Reyes, Viernes Santo, Hispanidad, Navidad, etc.). Lo enviará al día laborable siguiente.'
                    : 'Los recordatorios se envían también en festivos. Activa esto para evitar enviar emails de cobro en días señalados.'}
                </p>
              </div>
            </label>

            <div className="mt-6 pt-6 border-t border-white/5">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                💳 Ofrecer pago a plazos a partir del día
                <span className="ml-2 text-sky-400 font-semibold">{ofrecerPlazosDia === 0 ? 'Nunca' : `${ofrecerPlazosDia}`}</span>
              </label>
              <input
                type="range"
                min={0}
                max={60}
                step={5}
                value={ofrecerPlazosDia}
                onChange={e => setOfrecerPlazosDia(parseInt(e.target.value))}
                className="w-full accent-sky-600"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-1">
                <span>Nunca</span>
                <span>30</span>
                <span>60</span>
              </div>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {ofrecerPlazosDia === 0
                  ? 'Saldea nunca ofrecerá pago fraccionado. Los recordatorios solo pedirán pago íntegro.'
                  : `A partir del día ${ofrecerPlazosDia} de impago, los emails generados por IA ofrecerán al cliente la posibilidad de fraccionar el pago en cuotas. Solo aplica a emails generados con IA, no a plantillas personalizadas.`}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={variarTextos}
                  onChange={e => setVariarTextos(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-sky-600 cursor-pointer"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-300">🔄 Variar el texto entre emails (anti-bot)</p>
                  <p className="text-xs text-zinc-400 mt-1">
                    {variarTextos
                      ? 'Cada email tendrá vocabulario, estructura y giros distintos para no parecer automatizado. Los filtros anti-spam los marcan menos.'
                      : 'Los emails generados por IA pueden usar fórmulas similares. Activa esto para que cada email sea más único y humano.'}
                  </p>
                </div>
              </label>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 text-xs text-zinc-500 space-y-1">
              <p>⏸️ <strong className="text-zinc-400">Detectar respuestas y pausar</strong> — próximamente</p>
              <p>⚠️ <strong className="text-zinc-400">Detectar disputas y avisarme</strong> — próximamente</p>
              <p>🏖️ <strong className="text-zinc-400">Detectar vacaciones del cliente</strong> — próximamente</p>
            </div>
          </div>
        </details>

        {/* Acciones de cobro avanzadas */}
        <details className="bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden group">
          <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-zinc-900/30 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚖️</span>
              <div>
                <h2 className="text-base font-semibold text-zinc-100">Acciones de cobro avanzadas</h2>
                <p className="text-xs text-zinc-500">Recargo por mora, descuento por pronto pago</p>
              </div>
            </div>
            <span className="text-zinc-500 text-sm transition-transform group-open:rotate-180">▼</span>
          </summary>
          <div className="px-5 pb-5 pt-1 space-y-6">

            {/* Recargo por mora */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={recargoMoraActivo}
                  onChange={e => setRecargoMoraActivo(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-sky-600 cursor-pointer"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-300">📈 Activar recargo por mora</p>
                  <p className="text-xs text-zinc-400 mt-1">La IA mencionará un recargo porcentual en los emails a partir del día X de impago.</p>
                </div>
              </label>

              {recargoMoraActivo && (
                <div className="mt-4 ml-7 space-y-4 bg-zinc-900/30 rounded-lg p-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Porcentaje de recargo: <span className="text-sky-400 font-semibold">{recargoMoraPct}%</span></label>
                    <input type="range" min={0} max={50} step={1} value={recargoMoraPct}
                      onChange={e => setRecargoMoraPct(parseInt(e.target.value))}
                      className="w-full accent-sky-600" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Aplicar a partir del día: <span className="text-sky-400 font-semibold">{recargoMoraDia}</span></label>
                    <input type="range" min={1} max={90} step={1} value={recargoMoraDia}
                      onChange={e => setRecargoMoraDia(parseInt(e.target.value))}
                      className="w-full accent-sky-600" />
                  </div>
                  <p className="text-xs text-zinc-400">Ejemplo: factura de 500€ vencida 35 días → la IA mencionará <strong>{((500 * recargoMoraPct) / 100).toFixed(2)}€</strong> de recargo si día ≥ {recargoMoraDia}.</p>
                </div>
              )}
            </div>

            {/* Descuento pronto pago */}
            <div className="pt-6 border-t border-white/5">
              <p className="text-sm font-medium text-zinc-300">💰 Descuento por pronto pago</p>
              <p className="text-xs text-zinc-400 mt-1 mb-3">La IA puede ofrecer un descuento si el cliente paga en los próximos X días tras recibir el email.</p>

              <div className="bg-zinc-900/30 rounded-lg p-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    Descuento: <span className="text-sky-400 font-semibold">{descuentoProntoPagoPct === 0 ? 'Desactivado' : `${descuentoProntoPagoPct}%`}</span>
                  </label>
                  <input type="range" min={0} max={20} step={1} value={descuentoProntoPagoPct}
                    onChange={e => setDescuentoProntoPagoPct(parseInt(e.target.value))}
                    className="w-full accent-sky-600" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Plazo para aplicarlo: <span className="text-sky-400 font-semibold">{descuentoProntoPagoDias} día{descuentoProntoPagoDias === 1 ? '' : 's'}</span></label>
                  <input type="range" min={1} max={30} step={1} value={descuentoProntoPagoDias}
                    onChange={e => setDescuentoProntoPagoDias(parseInt(e.target.value))}
                    className="w-full accent-sky-600" />
                </div>
                {descuentoProntoPagoPct > 0 && (
                  <p className="text-xs text-zinc-400">Ejemplo: factura de 500€ → si paga en {descuentoProntoPagoDias} días, ahorra <strong>{((500 * descuentoProntoPagoPct) / 100).toFixed(2)}€</strong>.</p>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 text-xs text-zinc-500 space-y-1">
              <p>📜 <strong className="text-zinc-400">Burofax automático al día X</strong> — próximamente</p>
              <p>⚖️ <strong className="text-zinc-400">Pasar a vía judicial al día X</strong> — próximamente</p>
            </div>
          </div>
        </details>

        {/* Avisos al usuario */}
        <details className="bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden group">
          <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-zinc-900/30 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">📊</span>
              <div>
                <h2 className="text-base font-semibold text-zinc-100">Avisos al usuario</h2>
                <p className="text-xs text-zinc-500">Resúmenes por email de la actividad de cobros</p>
              </div>
            </div>
            <span className="text-zinc-500 text-sm transition-transform group-open:rotate-180">▼</span>
          </summary>
          <div className="px-5 pb-5 pt-1 space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={resumenDiario}
                onChange={e => setResumenDiario(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-sky-600 cursor-pointer"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-300">📅 Resumen diario por email</p>
                <p className="text-xs text-zinc-400 mt-1">Cada mañana recibes un email con los recordatorios enviados ayer, facturas cobradas, vencidas nuevas y respuestas de clientes.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={resumenSemanal}
                onChange={e => setResumenSemanal(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-sky-600 cursor-pointer"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-300">📈 Resumen semanal por email</p>
                <p className="text-xs text-zinc-400 mt-1">Cada lunes a primera hora, un email con el balance de la semana: cobros, pendientes, clientes en disputa, tasa de éxito.</p>
              </div>
            </label>

            <div className="pt-4 border-t border-white/5 text-xs text-zinc-500 space-y-1">
              <p>🔔 <strong className="text-zinc-400">Alertas instantáneas push</strong> — próximamente (requiere app móvil o navegador con permisos)</p>
            </div>
          </div>
        </details>

        {/* Modos especiales */}
        <details className="bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden group">
          <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-zinc-900/30 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">🏖️</span>
              <div>
                <h2 className="text-base font-semibold text-zinc-100">Modos especiales</h2>
                <p className="text-xs text-zinc-500">Modo Vacaciones · Aprender histórico de clientes</p>
              </div>
            </div>
            <span className="text-zinc-500 text-sm transition-transform group-open:rotate-180">▼</span>
          </summary>
          <div className="px-5 pb-5 pt-1 space-y-6">
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={modoVacaciones}
                  onChange={e => setModoVacaciones(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-sky-600 cursor-pointer"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-300">🌴 Modo Vacaciones</p>
                  <p className="text-xs text-zinc-400 mt-1">Saldea sigue cobrando y enviando recordatorios automáticos, pero <strong>no te enviará resúmenes ni alertas</strong> hasta la fecha que pongas abajo. Vuelves de vacaciones y todo sigue funcionando sin interrumpirte.</p>
                </div>
              </label>

              {modoVacaciones && (
                <div className="mt-3 ml-7 bg-zinc-900/30 rounded-lg p-3">
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Volveré el:</label>
                  <input
                    type="date"
                    value={modoVacacionesHasta}
                    onChange={e => setModoVacacionesHasta(e.target.value)}
                    className="px-3 py-2 border border-white/10 rounded-lg text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                  />
                  <p className="text-xs text-zinc-400 mt-2">A partir de esa fecha vuelven los resúmenes y avisos automáticamente.</p>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-white/5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={aprenderHistorial}
                  onChange={e => setAprenderHistorial(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-sky-600 cursor-pointer"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-300">🧬 Aprender del histórico de cada cliente <span className="ml-1 text-xs bg-amber-100 text-amber-300 px-2 py-0.5 rounded-full font-normal">beta</span></p>
                  <p className="text-xs text-zinc-400 mt-1">Si activas esto, al crear una factura Saldea analizará el historial del cliente y ajustará automáticamente los días de gracia. Ejemplo: si Pedro suele pagar 8 días tarde, la primera factura le mandará el primer recordatorio el día 10, no el día 3.</p>
                </div>
              </label>
            </div>
          </div>
        </details>

        {/* Bloques próximos — cada uno como acordeón deshabilitado */}
        {[
          { icono: '🏦', titulo: 'Conciliación bancaria', desc: 'Conecta tu banco y marca facturas pagadas solas' },
        ].map((b, i) => (
          <div key={i} className="bg-zinc-900/30 rounded-xl border border-dashed border-white/10 overflow-hidden">
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <span className="text-xl opacity-50">{b.icono}</span>
                <div>
                  <h2 className="text-base font-semibold text-zinc-400">{b.titulo}</h2>
                  <p className="text-xs text-zinc-500">{b.desc}</p>
                </div>
              </div>
              <span className="text-xs uppercase tracking-wide text-zinc-500 font-medium bg-gray-100 px-2 py-1 rounded">Próximamente</span>
            </div>
          </div>
        ))}

        {mensaje && (
          <div className={`px-4 py-3 rounded-lg text-sm ${
            mensaje.tipo === 'ok'
              ? 'bg-sky-500/10 border border-sky-500/30 text-sky-300'
              : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
          }`}>
            {mensaje.texto}
          </div>
        )}

        <button
          type="submit"
          disabled={guardando}
          className="w-full bg-sky-500 text-white py-3 rounded-lg font-medium hover:bg-sky-400 transition-colors disabled:opacity-60"
        >
          {guardando ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  )
}
