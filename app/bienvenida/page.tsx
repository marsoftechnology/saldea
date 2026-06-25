'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

type Patron = 'agresivo' | 'normal' | 'suave'
type TonoPreset = 'cordial' | 'firme' | 'contundente' | 'personalizado'
type Software = 'holded' | 'quipu' | 'anfix' | 'csv' | 'manual'

const TOTAL_PASOS = 9

// Ejemplos de email reales para cada tono
const EJEMPLOS_TONO: Record<TonoPreset, { asunto: string; cuerpo: string }> = {
  cordial: {
    asunto: 'Recordatorio: factura FRA-001 pendiente',
    cuerpo: 'Hola María,\n\nSeguramente se te ha pasado, pero la factura FRA-001 de 500,00 € venció hace 7 días. ¿Podrías echarle un vistazo cuando puedas?\n\nSin ninguna prisa — cualquier duda me dices.\n\nUn saludo,\nCarlos / Tu Empresa S.L.',
  },
  firme: {
    asunto: 'Pendiente de pago: factura FRA-001 (500,00 €)',
    cuerpo: 'María,\n\nLa factura FRA-001 por importe de 500,00 € lleva 7 días vencida. Te ruego que regularices el pago a la mayor brevedad posible.\n\nSi ya has realizado el pago, por favor ignora este mensaje.\n\nGracias,\nCarlos / Tu Empresa S.L.',
  },
  contundente: {
    asunto: 'NOTIFICACIÓN: Factura FRA-001 — 7 días vencida',
    cuerpo: 'Sra. García,\n\nLe informamos que la factura FRA-001 por importe de 500,00 € lleva 7 días sin atender. Si no se regulariza en un plazo de 48 horas hábiles, nos veremos obligados a iniciar las correspondientes acciones legales de reclamación.\n\nEsperamos su pronto pago.\n\nTu Empresa S.L.',
  },
  personalizado: {
    asunto: 'La IA escala el tono automáticamente con el tiempo',
    cuerpo: '1.er aviso (día 7): tono cordial\n2.º aviso (día 15): tono firme\n3.er aviso (día 30): tono contundente\n\nCada email es único y personalizado con el nombre del cliente, número de factura, importe y días vencida. Nunca dos emails iguales.',
  },
}

const PRECIOS = {
  normal: 'Día 7, 15 y 30 después del vencimiento',
  agresivo: 'Día 3, 7 y 14 después del vencimiento',
  suave: 'Día 15, 30 y 60 después del vencimiento',
}

export default function BienvenidaPage() {
  const router = useRouter()
  const [paso, setPaso] = useState(0)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Paso 0 — Tu empresa
  const [nombre, setNombre] = useState('')
  const [empresa, setEmpresa] = useState('')

  // Paso 1 — Tu imagen
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [subiendoLogo, setSubiendoLogo] = useState(false)
  const [colorPrimario, setColorPrimario] = useState('#0284c7')

  // Paso 2 — Cómo cobrar
  const [tonoPreset, setTonoPreset] = useState<TonoPreset>('firme')
  const [patronDias, setPatronDias] = useState<Patron>('normal')
  const [maxRecordatorios, setMaxRecordatorios] = useState(3)

  // Paso 3 — Software
  const [softwareElegido, setSoftwareElegido] = useState<Software | null>(null)
  const [apiKeyIntegracion, setApiKeyIntegracion] = useState('')
  const [conectandoSoftware, setConectandoSoftware] = useState(false)
  const [softwareConectado, setSoftwareConectado] = useState(false)
  const [msgSoftware, setMsgSoftware] = useState('')

  // Paso 5 — Stripe (conectado externamente)
  const [stripeConectado, setStripeConectado] = useState(false)

  function avanzar() {
    setError(null)
    setPaso(p => Math.min(p + 1, TOTAL_PASOS - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function retroceder() {
    setError(null)
    setPaso(p => Math.max(p - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function guardarPerfil() {
    if (!nombre.trim()) {
      setError('Escribe tu nombre para continuar')
      return false
    }
    setGuardando(true)
    setError(null)
    try {
      const res = await fetch('/api/ajustes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre.trim(), empresa: empresa.trim() }),
      })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error || 'Error guardando perfil')
        return false
      }
      return true
    } catch {
      setError('Error de conexión')
      return false
    } finally {
      setGuardando(false)
    }
  }

  async function guardarImagen() {
    setGuardando(true)
    setError(null)
    try {
      await fetch('/api/configuracion', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logo_url: logoUrl, color_primario: colorPrimario }),
      })
      return true
    } catch {
      // No bloquear si falla imagen
      return true
    } finally {
      setGuardando(false)
    }
  }

  async function guardarCobros() {
    setGuardando(true)
    setError(null)
    try {
      await fetch('/api/configuracion', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tono_preset: tonoPreset,
          patron_dias: patronDias,
          max_recordatorios: maxRecordatorios,
        }),
      })
      return true
    } catch {
      return true
    } finally {
      setGuardando(false)
    }
  }

  async function conectarSoftware() {
    if (!softwareElegido || !apiKeyIntegracion.trim()) {
      setMsgSoftware('Introduce la API Key para continuar')
      return
    }
    setConectandoSoftware(true)
    setMsgSoftware('')
    try {
      const endpoint = softwareElegido === 'holded'
        ? '/api/holded/connect'
        : softwareElegido === 'anfix'
          ? '/api/anfix/connect'
          : null

      if (!endpoint) return

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: apiKeyIntegracion.trim() }),
      })
      if (res.ok) {
        setSoftwareConectado(true)
        setMsgSoftware('✓ Conectado correctamente')
      } else {
        const d = await res.json()
        setMsgSoftware(d.error || 'API Key incorrecta o sin permisos')
      }
    } catch {
      setMsgSoftware('Error de conexión')
    } finally {
      setConectandoSoftware(false)
    }
  }

  async function completarOnboarding() {
    setGuardando(true)
    try {
      await fetch('/api/onboarding/completar', { method: 'POST' })
      router.push('/dashboard')
    } catch {
      router.push('/dashboard')
    }
  }

  async function subirLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setError('El logo no puede pesar más de 2 MB')
      return
    }
    setSubiendoLogo(true)
    setError(null)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const ext = file.name.split('.').pop()
      const path = `${user.id}/logo.${ext}`
      const { error: errUp } = await supabase.storage
        .from('logos')
        .upload(path, file, { upsert: true, contentType: file.type })
      if (errUp) { setError('Error al subir el logo: ' + errUp.message); return }
      const { data: { publicUrl } } = supabase.storage.from('logos').getPublicUrl(path)
      setLogoUrl(`${publicUrl}?t=${Date.now()}`)
    } finally {
      setSubiendoLogo(false)
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Render helpers
  // ──────────────────────────────────────────────────────────────────────────

  function BotonContinuar({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled || guardando}
        className="flex-1 bg-sky-500 hover:bg-sky-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {guardando ? 'Guardando...' : 'Guardar y continuar →'}
      </button>
    )
  }

  function BotonSaltar() {
    return (
      <button
        type="button"
        onClick={avanzar}
        className="text-zinc-500 hover:text-zinc-300 text-sm font-medium py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
      >
        Saltar este paso
      </button>
    )
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Pasos
  // ──────────────────────────────────────────────────────────────────────────

  function renderPaso0() {
    return (
      <>
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">👋</div>
          <h1 className="text-2xl font-bold text-zinc-100">Bienvenido a Saldea</h1>
          <p className="text-zinc-400 mt-2">Vamos a configurarlo todo en 5 minutos. Empieza contándonos quién eres.</p>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Tu nombre <span className="text-sky-400">*</span>
            </label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Carlos García"
              className="w-full px-4 py-3 bg-zinc-900/60 border border-white/10 rounded-xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40"
            />
            <p className="text-xs text-zinc-500 mt-1">Aparecerá como remitente en los emails a tus clientes</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Nombre de empresa</label>
            <input
              type="text"
              value={empresa}
              onChange={e => setEmpresa(e.target.value)}
              placeholder="Mi Empresa S.L."
              className="w-full px-4 py-3 bg-zinc-900/60 border border-white/10 rounded-xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40"
            />
          </div>
        </div>

        {error && <p className="text-rose-400 text-sm mb-4 bg-rose-500/10 border border-rose-500/20 px-4 py-2 rounded-lg">{error}</p>}

        <div className="flex gap-3">
          <BotonContinuar onClick={async () => { if (await guardarPerfil()) avanzar() }} />
        </div>
      </>
    )
  }

  function renderPaso1() {
    return (
      <>
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎨</div>
          <h1 className="text-2xl font-bold text-zinc-100">Imagen de tu empresa</h1>
          <p className="text-zinc-400 mt-2">Tu logo y color aparecerán en todos los emails y en el portal de pago de tus clientes.</p>
        </div>

        <div className="space-y-6 mb-8">
          {/* Logo */}
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-zinc-200 mb-1">🖼️ Logo de tu empresa</h3>
            <p className="text-xs text-zinc-500 mb-4">PNG, JPG o WEBP — máx. 2 MB</p>
            <label className={`block w-full rounded-xl border-2 border-dashed cursor-pointer transition-colors ${subiendoLogo ? 'opacity-60 cursor-not-allowed' : 'hover:border-sky-500/40 hover:bg-sky-500/[0.03]'} ${logoUrl ? 'border-white/10 p-4' : 'border-white/10 p-10'}`}>
              {logoUrl ? (
                <div className="flex flex-col items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logoUrl} alt="Logo" className="h-24 max-w-[220px] object-contain" />
                  <span className="text-xs text-sky-400 font-medium">{subiendoLogo ? 'Subiendo...' : 'Clic para cambiar logo'}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
                    {subiendoLogo ? '⏳' : '⬆️'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-300">{subiendoLogo ? 'Subiendo...' : 'Haz clic para subir tu logo'}</p>
                    <p className="text-xs text-zinc-500 mt-1">PNG, JPG o WEBP — máx. 2 MB</p>
                  </div>
                </div>
              )}
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={subirLogo} disabled={subiendoLogo} className="hidden" />
            </label>
            {logoUrl && (
              <button type="button" onClick={() => setLogoUrl(null)} className="mt-2 text-xs text-zinc-500 hover:text-rose-400 transition-colors w-full text-center">
                Quitar logo
              </button>
            )}
          </div>

          {/* Color */}
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-zinc-200 mb-1">🎨 Color principal</h3>
            <p className="text-xs text-zinc-500 mb-4">Se usará en el botón de pago de los emails y en los detalles del PDF</p>
            <div className="flex items-center gap-4 mb-4">
              <input
                type="color"
                value={colorPrimario}
                onChange={e => setColorPrimario(e.target.value)}
                className="w-12 h-12 rounded-lg border border-white/10 cursor-pointer shrink-0"
              />
              <input
                type="text"
                value={colorPrimario}
                onChange={e => setColorPrimario(e.target.value)}
                placeholder="#0284c7"
                className="w-28 px-3 py-2 bg-zinc-900/60 border border-white/10 rounded-lg text-sm text-zinc-100 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              />
              <div className="flex-1 flex justify-end">
                <div className="px-4 py-2 rounded-lg text-white text-sm font-semibold" style={{ backgroundColor: colorPrimario }}>
                  Pagar factura →
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {['#0284c7','#2563eb','#7c3aed','#dc2626','#ea580c','#059669','#0891b2'].map(c => (
                <button key={c} type="button" onClick={() => setColorPrimario(c)}
                  className={`w-9 h-9 rounded-full border-2 transition-transform hover:scale-110 ${colorPrimario === c ? 'border-white scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>

        {error && <p className="text-rose-400 text-sm mb-4">{error}</p>}

        <div className="flex gap-3">
          <BotonContinuar onClick={async () => { await guardarImagen(); avanzar() }} />
          <BotonSaltar />
        </div>
      </>
    )
  }

  function renderPaso2() {
    const ejemplo = EJEMPLOS_TONO[tonoPreset]
    return (
      <>
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">✉️</div>
          <h1 className="text-2xl font-bold text-zinc-100">¿Cómo quieres cobrar?</h1>
          <p className="text-zinc-400 mt-2">Elige el tono de los recordatorios automáticos y la frecuencia. Puedes cambiarlo cuando quieras.</p>
        </div>

        <div className="space-y-6 mb-8">
          {/* Tono */}
          <div>
            <label className="block text-sm font-semibold text-zinc-200 mb-3">Tono de los emails</label>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {([
                { id: 'cordial', titulo: '😊 Cordial', desc: 'Amable, sin presionar' },
                { id: 'firme', titulo: '😐 Firme', desc: 'Directo y profesional' },
                { id: 'contundente', titulo: '😠 Contundente', desc: 'Menciona medidas legales' },
                { id: 'personalizado', titulo: '📈 Escalado', desc: 'Sube el tono con el tiempo' },
              ] as const).map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTonoPreset(t.id)}
                  className={`text-left p-3 rounded-xl border-2 transition-colors ${tonoPreset === t.id ? 'border-sky-500 bg-sky-500/10' : 'border-white/10 bg-zinc-900/40 hover:border-white/20'}`}
                >
                  <p className={`text-sm font-medium ${tonoPreset === t.id ? 'text-sky-300' : 'text-zinc-100'}`}>{t.titulo}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{t.desc}</p>
                </button>
              ))}
            </div>

            {/* Preview real */}
            <div className="bg-zinc-900/60 border border-white/5 rounded-xl p-4">
              <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold mb-2">Ejemplo de email con este tono:</p>
              <p className="text-xs text-zinc-400 font-semibold mb-1">Asunto: <span className="text-zinc-300">{ejemplo.asunto}</span></p>
              <pre className="text-xs text-zinc-300 whitespace-pre-wrap font-sans leading-relaxed">{ejemplo.cuerpo}</pre>
            </div>
          </div>

          {/* Frecuencia */}
          <div>
            <label className="block text-sm font-semibold text-zinc-200 mb-3">Frecuencia de envío</label>
            <div className="grid grid-cols-3 gap-2">
              {(['agresivo', 'normal', 'suave'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPatronDias(p)}
                  className={`text-left p-3 rounded-xl border-2 transition-colors ${patronDias === p ? 'border-sky-500 bg-sky-500/10' : 'border-white/10 bg-zinc-900/40 hover:border-white/20'}`}
                >
                  <p className={`text-sm font-medium capitalize ${patronDias === p ? 'text-sky-300' : 'text-zinc-100'}`}>
                    {p === 'agresivo' ? '⚡ Agresivo' : p === 'normal' ? '🎯 Normal' : '🌿 Suave'}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">{PRECIOS[p]}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Max recordatorios */}
          <div>
            <label className="block text-sm font-semibold text-zinc-200 mb-2">
              Máximo de recordatorios por factura{' '}
              <span className="text-sky-400">{maxRecordatorios}</span>
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
              <span>1 (uno y listo)</span>
              <span>5</span>
              <span>10 (insistente)</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <BotonContinuar onClick={async () => { await guardarCobros(); avanzar() }} />
          <BotonSaltar />
        </div>
      </>
    )
  }

  function renderPaso3() {
    const instrucciones: Record<Software, React.ReactNode> = {
      holded: (
        <div className="space-y-3 mt-4">
          <p className="text-sm font-semibold text-zinc-200">Cómo obtener tu API Key de Holded:</p>
          <ol className="space-y-2 text-sm text-zinc-400">
            <li className="flex gap-2"><span className="text-sky-400 font-bold shrink-0">1.</span>Entra en <strong className="text-zinc-300">Holded</strong> y ve a <strong className="text-zinc-300">Configuración → Integraciones → API</strong></li>
            <li className="flex gap-2"><span className="text-sky-400 font-bold shrink-0">2.</span>Haz clic en <strong className="text-zinc-300">&quot;Generar API Key&quot;</strong> o copia la que ya tienes</li>
            <li className="flex gap-2"><span className="text-sky-400 font-bold shrink-0">3.</span>Pégala aquí abajo y pulsa Conectar</li>
          </ol>
          <div className="mt-4">
            <label className="block text-xs text-zinc-400 mb-1">API Key de Holded</label>
            <input
              type="text"
              value={apiKeyIntegracion}
              onChange={e => setApiKeyIntegracion(e.target.value)}
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              className="w-full px-4 py-2.5 bg-zinc-900/60 border border-white/10 rounded-xl text-zinc-100 placeholder-zinc-600 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
          </div>
          <button
            type="button"
            onClick={conectarSoftware}
            disabled={conectandoSoftware || !apiKeyIntegracion.trim()}
            className="bg-sky-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-sky-400 transition-colors disabled:opacity-50"
          >
            {conectandoSoftware ? 'Verificando...' : '🔌 Conectar Holded'}
          </button>
          {msgSoftware && <p className={`text-sm ${softwareConectado ? 'text-emerald-400' : 'text-rose-400'}`}>{msgSoftware}</p>}
          {softwareConectado && (
            <p className="text-xs text-zinc-400">
              Tras conectar, sincronizamos las facturas automáticamente. También puedes hacerlo manualmente desde <strong className="text-zinc-300">Ajustes → Holded</strong>.
            </p>
          )}
        </div>
      ),
      quipu: (
        <div className="space-y-3 mt-4">
          <p className="text-sm font-semibold text-zinc-200">Conectar con Quipu:</p>
          <ol className="space-y-2 text-sm text-zinc-400">
            <li className="flex gap-2"><span className="text-sky-400 font-bold shrink-0">1.</span>Ve a <strong className="text-zinc-300">Ajustes → Integraciones</strong> en el panel de Saldea</li>
            <li className="flex gap-2"><span className="text-sky-400 font-bold shrink-0">2.</span>Haz clic en <strong className="text-zinc-300">&quot;Conectar Quipu&quot;</strong></li>
            <li className="flex gap-2"><span className="text-sky-400 font-bold shrink-0">3.</span>Serás redirigido a Quipu para autorizar el acceso</li>
          </ol>
          <p className="text-xs text-zinc-500">Quipu requiere OAuth — necesitas hacerlo desde la sección de Ajustes completa. Marca esta opción como recordatorio y conéctalo desde Ajustes en cualquier momento.</p>
          <button type="button" onClick={() => { setSoftwareConectado(true); setMsgSoftware('Anotado — conéctalo desde Ajustes cuando estés listo') }} className="bg-violet-500/20 border border-violet-500/30 text-violet-300 px-4 py-2 rounded-xl text-sm font-medium hover:bg-violet-500/30 transition-colors">
            Ir a Ajustes → Quipu →
          </button>
          {msgSoftware && <p className="text-sm text-zinc-400">{msgSoftware}</p>}
        </div>
      ),
      anfix: (
        <div className="space-y-3 mt-4">
          <p className="text-sm font-semibold text-zinc-200">Cómo obtener tu API Key de Anfix:</p>
          <ol className="space-y-2 text-sm text-zinc-400">
            <li className="flex gap-2"><span className="text-sky-400 font-bold shrink-0">1.</span>Entra en <strong className="text-zinc-300">Anfix</strong> y ve a <strong className="text-zinc-300">Configuración → API</strong></li>
            <li className="flex gap-2"><span className="text-sky-400 font-bold shrink-0">2.</span>Genera o copia tu token de acceso</li>
            <li className="flex gap-2"><span className="text-sky-400 font-bold shrink-0">3.</span>Pégalo aquí y pulsa Conectar</li>
          </ol>
          <div className="mt-4">
            <label className="block text-xs text-zinc-400 mb-1">Token de Anfix</label>
            <input
              type="text"
              value={apiKeyIntegracion}
              onChange={e => setApiKeyIntegracion(e.target.value)}
              placeholder="Tu token de Anfix"
              className="w-full px-4 py-2.5 bg-zinc-900/60 border border-white/10 rounded-xl text-zinc-100 placeholder-zinc-600 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
          </div>
          <button
            type="button"
            onClick={conectarSoftware}
            disabled={conectandoSoftware || !apiKeyIntegracion.trim()}
            className="bg-sky-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-sky-400 transition-colors disabled:opacity-50"
          >
            {conectandoSoftware ? 'Verificando...' : '🔌 Conectar Anfix'}
          </button>
          {msgSoftware && <p className={`text-sm ${softwareConectado ? 'text-emerald-400' : 'text-rose-400'}`}>{msgSoftware}</p>}
        </div>
      ),
      csv: (
        <div className="space-y-3 mt-4">
          <p className="text-sm font-semibold text-zinc-200">Importar facturas desde CSV:</p>
          <ol className="space-y-2 text-sm text-zinc-400">
            <li className="flex gap-2"><span className="text-sky-400 font-bold shrink-0">1.</span>Desde tu software (Excel, Sage, A3, etc.), exporta tus facturas a un archivo CSV</li>
            <li className="flex gap-2"><span className="text-sky-400 font-bold shrink-0">2.</span>Ve a <strong className="text-zinc-300">Importar CSV</strong> en el menú lateral</li>
            <li className="flex gap-2"><span className="text-sky-400 font-bold shrink-0">3.</span>Sube el archivo y mapea las columnas una vez — Saldea aprende el formato</li>
          </ol>
          <p className="text-xs text-zinc-500">Compatible con Excel, Google Sheets, Sage, A3, Contaplus y cualquier CSV estándar.</p>
        </div>
      ),
      manual: (
        <div className="mt-4 bg-zinc-800/40 border border-white/5 rounded-xl p-4">
          <p className="text-sm text-zinc-300">Crearás las facturas manualmente desde el panel. Puedes añadir el software más adelante en <strong>Ajustes</strong>.</p>
        </div>
      ),
    }

    return (
      <>
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">📦</div>
          <h1 className="text-2xl font-bold text-zinc-100">¿Usas software de facturación?</h1>
          <p className="text-zinc-400 mt-2">Conéctalo y Saldea importará automáticamente tus facturas. Puedes saltarte esto y hacerlo después.</p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {([
            { id: 'holded', label: '🟣 Holded' },
            { id: 'quipu', label: '🟠 Quipu' },
            { id: 'anfix', label: '🔵 Anfix' },
            { id: 'csv', label: '📊 CSV / Excel' },
            { id: 'manual', label: '✏️ Introduzco manualmente' },
          ] as const).map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => { setSoftwareElegido(s.id); setApiKeyIntegracion(''); setSoftwareConectado(false); setMsgSoftware('') }}
              className={`text-left p-3 rounded-xl border-2 transition-colors text-sm font-medium ${softwareElegido === s.id ? 'border-sky-500 bg-sky-500/10 text-sky-300' : 'border-white/10 bg-zinc-900/40 hover:border-white/20 text-zinc-100'}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {softwareElegido && instrucciones[softwareElegido]}

        <div className="flex gap-3 mt-6">
          {(softwareElegido === 'holded' || softwareElegido === 'anfix') ? (
            <button
              type="button"
              onClick={avanzar}
              disabled={!softwareConectado}
              className="flex-1 bg-sky-500 hover:bg-sky-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-40"
            >
              Continuar →
            </button>
          ) : (
            <button
              type="button"
              onClick={avanzar}
              className="flex-1 bg-sky-500 hover:bg-sky-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Continuar →
            </button>
          )}
          <BotonSaltar />
        </div>
      </>
    )
  }

  function renderPaso4() {
    return (
      <>
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">💳</div>
          <h1 className="text-2xl font-bold text-zinc-100">Cobros online con Stripe</h1>
          <p className="text-zinc-400 mt-2">Tus clientes podrán pagar directamente con tarjeta desde el email de recordatorio. Sin necesidad de que te escriban ni esperes transferencias.</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-2 gap-3">
            {[
              { icono: '⚡', titulo: 'Pago inmediato', desc: 'El cliente paga en el momento con tarjeta o banco' },
              { icono: '🔗', titulo: 'Link de pago', desc: 'Cada factura tiene su URL única de pago' },
              { icono: '🤖', titulo: 'Automático', desc: 'Saldea marca la factura como cobrada solo' },
              { icono: '💰', titulo: 'Sin comisión extra', desc: 'Solo las fees estándar de Stripe (~1.4% + 0.25€)' },
            ].map(b => (
              <div key={b.titulo} className="bg-zinc-900/40 border border-white/10 rounded-xl p-4">
                <div className="text-2xl mb-2">{b.icono}</div>
                <p className="text-sm font-semibold text-zinc-200">{b.titulo}</p>
                <p className="text-xs text-zinc-400 mt-1">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
            <p className="text-sm font-semibold text-zinc-200 mb-3">Cómo conectar Stripe:</p>
            <ol className="space-y-2 text-sm text-zinc-400">
              <li className="flex gap-2"><span className="text-sky-400 font-bold shrink-0">1.</span>Pulsa el botón de abajo — serás redirigido a Stripe</li>
              <li className="flex gap-2"><span className="text-sky-400 font-bold shrink-0">2.</span>Inicia sesión en Stripe (o crea cuenta gratuita en segundos)</li>
              <li className="flex gap-2"><span className="text-sky-400 font-bold shrink-0">3.</span>Autoriza a Saldea para crear links de pago en tu cuenta</li>
              <li className="flex gap-2"><span className="text-sky-400 font-bold shrink-0">4.</span>Listo — tus próximas facturas tendrán botón de pago automático</li>
            </ol>

            {!stripeConectado ? (
              <a
                href="/api/stripe-connect/start"
                onClick={() => setStripeConectado(true)}
                className="mt-4 inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
              >
                🔗 Conectar mi cuenta de Stripe
              </a>
            ) : (
              <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm font-medium">
                <span>✓</span>
                <span>Stripe conectado — las facturas tendrán botón de pago</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={avanzar}
            className="flex-1 bg-sky-500 hover:bg-sky-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Continuar →
          </button>
          <BotonSaltar />
        </div>
      </>
    )
  }

  function renderPasoBanco() {
    return (
      <>
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🏦</div>
          <h1 className="text-2xl font-bold text-zinc-100">Conciliación bancaria automática</h1>
          <p className="text-zinc-400 mt-2">Conecta tu banco y Saldea marcará las facturas como cobradas en cuanto detecte el ingreso — sin que toques nada.</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-2 gap-3">
            {[
              { icono: '🔍', titulo: 'Detección automática', desc: 'Cruza cada ingreso bancario con tus facturas pendientes' },
              { icono: '✅', titulo: 'Factura cobrada sola', desc: 'La factura pasa a «cobrada» sin que toques nada' },
              { icono: '🔒', titulo: 'Solo lectura PSD2', desc: 'Acceso de lectura únicamente, nunca puede mover tu dinero' },
              { icono: '🏦', titulo: '+2.000 bancos', desc: 'CaixaBank, BBVA, Santander, ING, Sabadell y muchos más' },
            ].map(b => (
              <div key={b.titulo} className="bg-zinc-900/40 border border-white/10 rounded-xl p-4">
                <div className="text-2xl mb-2">{b.icono}</div>
                <p className="text-sm font-semibold text-zinc-200">{b.titulo}</p>
                <p className="text-xs text-zinc-400 mt-1">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
            <span className="text-amber-400 text-xl shrink-0">⭐</span>
            <div>
              <p className="text-sm font-semibold text-amber-300">Exclusivo del Plan Max</p>
              <p className="text-xs text-amber-300/70 mt-1 leading-relaxed">
                Usa GoCardless Open Banking (gratuito). Una vez completes la configuración inicial,
                conéctalo desde <strong className="text-amber-300">🏦 Banco</strong> en la barra lateral.
              </p>
            </div>
          </div>

          <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-4 flex items-start gap-3">
            <span className="text-sky-400 text-lg shrink-0">🔜</span>
            <div>
              <p className="text-sm font-semibold text-sky-300">Próximamente disponible</p>
              <p className="text-xs text-sky-300/70 mt-1 leading-relaxed">
                Estamos integrando la mejor solución de Open Banking para bancos españoles.
                Cuando esté listo lo verás en <strong className="text-sky-300">🏦 Banco</strong> en la barra lateral.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={avanzar}
            className="flex-1 bg-sky-500 hover:bg-sky-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Entendido, continuar →
          </button>
          <BotonSaltar />
        </div>
      </>
    )
  }

  function renderPaso5() {
    return (
      <>
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">📱</div>
          <h1 className="text-2xl font-bold text-zinc-100">Recordatorios por WhatsApp</h1>
          <p className="text-zinc-400 mt-2">Además del email, Saldea puede enviar un WhatsApp cuando una factura lleva tiempo vencida.</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">💬</span>
              <div>
                <p className="text-sm font-semibold text-zinc-200">¿Cómo funciona?</p>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Cuando una factura lleva más de 30 días vencida y el cliente no ha respondido al email, Saldea le envía un WhatsApp desde el número de Saldea. Es el recordatorio definitivo antes de pasar a vía formal.
                </p>
              </div>
            </div>

            <div className="bg-zinc-800/60 rounded-xl p-4 border border-white/5 mb-4">
              <p className="text-xs text-zinc-500 mb-2 font-semibold uppercase tracking-wide">Ejemplo de mensaje:</p>
              <div className="bg-emerald-900/30 border border-emerald-500/20 rounded-xl p-3 max-w-xs">
                <p className="text-sm text-zinc-200 leading-relaxed">
                  Hola María, te contactamos de parte de Tu Empresa S.L. La factura FRA-001 de 500,00 € lleva 30 días vencida. ¿Puedes confirmar cuándo realizarás el pago?
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-zinc-400">
              <p className="flex gap-2"><span className="text-emerald-400">✓</span> El cliente puede responder al WhatsApp y Saldea lo analiza con IA</p>
              <p className="flex gap-2"><span className="text-emerald-400">✓</span> Si dice que está de vacaciones, pausa los recordatorios automáticamente</p>
              <p className="flex gap-2"><span className="text-emerald-400">✓</span> Opt-in por cliente: actívalo individualmente al crear o editar cada cliente</p>
              <p className="flex gap-2"><span className="text-zinc-500">ℹ</span> <span className="text-zinc-500">Se envía desde el número de Saldea (Twilio) cuando el tono es formal</span></p>
            </div>
          </div>

          <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-4">
            <p className="text-sm text-sky-300 font-medium">¿Cómo habilito WhatsApp para un cliente?</p>
            <p className="text-xs text-sky-300/70 mt-1">Abre la ficha de cualquier cliente → activa la casilla <em>«Enviar WhatsApp»</em>. Así de simple.</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={avanzar}
            className="flex-1 bg-sky-500 hover:bg-sky-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Entendido, continuar →
          </button>
        </div>
      </>
    )
  }

  function renderPaso6() {
    return (
      <>
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-zinc-100">Tu primera factura</h1>
          <p className="text-zinc-400 mt-2">Empieza a cobrar ahora mismo. Puedes crear una factura manualmente o importar un CSV con todas tus facturas pendientes.</p>
        </div>

        <div className="grid grid-cols-1 gap-3 mb-8">
          <a
            href="/facturas/nueva"
            className="bg-zinc-900/40 border border-white/10 hover:border-sky-500/40 rounded-xl p-5 flex items-center gap-4 transition-colors group"
          >
            <div className="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:bg-sky-500/30 transition-colors">➕</div>
            <div>
              <p className="text-sm font-semibold text-zinc-100 group-hover:text-sky-300 transition-colors">Crear factura manualmente</p>
              <p className="text-xs text-zinc-400 mt-0.5">Introduce los datos de la factura, cliente e importe. Saldea empieza a cobrar en cuanto la creas.</p>
            </div>
            <span className="ml-auto text-zinc-500 group-hover:text-sky-400">→</span>
          </a>

          <a
            href="/importar"
            className="bg-zinc-900/40 border border-white/10 hover:border-sky-500/40 rounded-xl p-5 flex items-center gap-4 transition-colors group"
          >
            <div className="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:bg-sky-500/30 transition-colors">📥</div>
            <div>
              <p className="text-sm font-semibold text-zinc-100 group-hover:text-sky-300 transition-colors">Importar CSV de facturas</p>
              <p className="text-xs text-zinc-400 mt-0.5">Sube un archivo Excel/CSV con todas tus facturas pendientes de golpe. Saldea empieza a cobrar todas inmediatamente.</p>
            </div>
            <span className="ml-auto text-zinc-500 group-hover:text-sky-400">→</span>
          </a>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={avanzar}
            className="flex-1 bg-sky-500 hover:bg-sky-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Lo hago después →
          </button>
        </div>
      </>
    )
  }

  function renderPaso7() {
    const cosas: Array<[string, string, boolean, string]> = [
      ['👤', 'Tu empresa configurada', !!(nombre || empresa), '/ajustes'],
      ['🎨', 'Imagen de marca', !!(logoUrl || colorPrimario !== '#0284c7'), '/ajustes'],
      ['✉️', 'Tono y frecuencia', true, '/ajustes'],
      ['📦', 'Software conectado', softwareConectado, '/ajustes'],
      ['💳', 'Stripe para cobros online', stripeConectado, '/ajustes'],
      ['🏦', 'Conciliación bancaria (Plan Max)', false, '/banco'],
      ['📱', 'WhatsApp habilitado', false, '/ajustes'],
    ]

    return (
      <>
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-zinc-100">¡Todo listo!</h1>
          <p className="text-zinc-400 mt-2">Saldea ya está configurado y listo para cobrar por ti. Esto es lo que has hecho:</p>
        </div>

        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 mb-6 space-y-2">
          {cosas.map(([icono, label, hecho, href]) => (
            <div key={label} className="flex items-center gap-3">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${hecho ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                {hecho ? '✓' : '–'}
              </span>
              <span className="text-sm">
                <span className="mr-1.5">{icono}</span>
                <span className={hecho ? 'text-zinc-200' : 'text-zinc-500'}>{label}</span>
              </span>
              {!hecho && (
                <a href={href} className="ml-auto text-xs text-sky-400 hover:text-sky-300">Configurar →</a>
              )}
            </div>
          ))}
        </div>

        <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-4 mb-6">
          <p className="text-sm text-sky-300 font-medium">💡 ¿Qué pasa ahora?</p>
          <p className="text-xs text-sky-300/70 mt-1 leading-relaxed">
            Saldea revisará tus facturas vencidas cada día a las 9h UTC y enviará recordatorios automáticos según la configuración que has puesto. Tú no tienes que hacer nada — solo cobras.
          </p>
        </div>

        <button
          type="button"
          onClick={completarOnboarding}
          disabled={guardando}
          className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-4 px-6 rounded-xl transition-colors text-base disabled:opacity-50"
        >
          {guardando ? 'Un momento...' : 'Ir al dashboard →'}
        </button>
      </>
    )
  }

  const pasos = [
    renderPaso0,
    renderPaso1,
    renderPaso2,
    renderPaso3,
    renderPaso4,
    renderPasoBanco,
    renderPaso5,
    renderPaso6,
    renderPaso7,
  ]

  const titulos = [
    'Tu empresa',
    'Imagen de marca',
    'Cómo cobrar',
    'Integraciones',
    'Cobros online',
    'Banco',
    'WhatsApp',
    'Primera factura',
    '¡Todo listo!',
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 flex flex-col">
      {/* Decoración de fondo */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-[30%] w-[500px] h-[500px] rounded-full bg-sky-500/[0.07] blur-3xl" />
        <div className="absolute bottom-[-10%] right-[20%] w-[400px] h-[400px] rounded-full bg-sky-600/[0.05] blur-3xl" />
      </div>

      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold bg-gradient-to-r from-sky-300 to-sky-500 bg-clip-text text-transparent">Saldea</span>
          <span className="text-[10px] text-zinc-600 uppercase tracking-wider">Configuración inicial</span>
        </div>
        <a
          href="/dashboard"
          onClick={e => {
            e.preventDefault()
            completarOnboarding()
          }}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          Saltar todo y ir al dashboard →
        </a>
      </header>

      {/* Progress bar */}
      <div className="px-6 pt-6 pb-2 shrink-0">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              {paso > 0 && (
                <button
                  type="button"
                  onClick={retroceder}
                  className="text-zinc-500 hover:text-zinc-200 transition-colors text-sm"
                  aria-label="Paso anterior"
                >
                  ← Atrás
                </button>
              )}
              <p className="text-xs text-zinc-500 font-medium">
                Paso <span className="text-zinc-300">{paso + 1}</span> de {TOTAL_PASOS}
                {' · '}
                <span className="text-zinc-400">{titulos[paso]}</span>
              </p>
            </div>
            <p className="text-xs text-zinc-500">{Math.round(((paso + 1) / TOTAL_PASOS) * 100)}%</p>
          </div>
          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-500 rounded-full transition-all duration-500"
              style={{ width: `${((paso + 1) / TOTAL_PASOS) * 100}%` }}
            />
          </div>
          {/* Step dots */}
          <div className="flex gap-1.5 mt-2">
            {titulos.map((t, i) => (
              <div
                key={t}
                className={`h-1 flex-1 rounded-full transition-colors ${i <= paso ? 'bg-sky-500' : 'bg-zinc-800'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Step content */}
      <main className="flex-1 px-6 py-8 overflow-y-auto">
        <div className="max-w-lg mx-auto">
          {paso > 0 && (
            <button
              type="button"
              onClick={retroceder}
              className="mb-6 flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              ← Paso anterior
            </button>
          )}
          {pasos[paso]?.()}
        </div>
      </main>
    </div>
  )
}
