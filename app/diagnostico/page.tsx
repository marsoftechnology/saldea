'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import MarketingFooter from '../components/MarketingFooter'

const SOFTWARE_OPTIONS = [
  { label: 'Anfix', icon: '📊' },
  { label: 'A3', icon: '📋' },
  { label: 'ContaPlus', icon: '📈' },
  { label: 'Sage', icon: '🔷' },
  { label: 'Holded', icon: '🟢' },
  { label: 'Quipu', icon: '🟡' },
  { label: 'Excel', icon: '📗' },
  { label: 'Otro', icon: '⚙️' },
]

const HORAS_OPTIONS = [
  { value: '1-5', label: 'Menos de 5 horas', sublabel: 'Molesta pero asumible' },
  { value: '5-15', label: 'Entre 5 y 15 horas', sublabel: 'Ahí empieza a doler' },
  { value: '15-30', label: 'Entre 15 y 30 horas', sublabel: 'Casi una semana entera' },
  { value: '+30', label: 'Más de 30 horas', sublabel: 'Tiempo de actuar ya' },
]

const CLIENTES_OPTIONS = [
  { value: '-20', label: 'Menos de 20', sublabel: 'Gestoría pequeña' },
  { value: '20-50', label: 'Entre 20 y 50', sublabel: 'Tamaño mediano' },
  { value: '50-100', label: 'Entre 50 y 100', sublabel: 'Cartera amplia' },
  { value: '+100', label: 'Más de 100', sublabel: 'Gran volumen' },
]

type FormData = {
  tarea: string
  horas: string
  numClientes: string
  software: string[]
  nombre: string
  gestoria: string
  email: string
  telefono: string
}

const TOTAL_STEPS = 5

export default function DiagnosticoPage() {
  const [step, setStep] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [form, setForm] = useState<FormData>({
    tarea: '',
    horas: '',
    numClientes: '',
    software: [],
    nombre: '',
    gestoria: '',
    email: '',
    telefono: '',
  })
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  const goNext = useCallback(() => {
    setAnimating(true)
    setTimeout(() => {
      setStep(s => s + 1)
      setAnimating(false)
    }, 200)
  }, [])

  const goPrev = useCallback(() => {
    setAnimating(true)
    setTimeout(() => {
      setStep(s => s - 1)
      setAnimating(false)
    }, 200)
  }, [])

  const toggleSoftware = (s: string) => {
    setForm(f => ({
      ...f,
      software: f.software.includes(s) ? f.software.filter(x => x !== s) : [...f.software, s],
    }))
  }

  const handleSubmit = async () => {
    setEnviando(true)
    setError('')
    try {
      const res = await fetch('/api/peticion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, numClientes: form.numClientes }),
      })
      if (res.ok) {
        setEnviado(true)
      } else {
        setError('Ha habido un error. Escríbenos a hola@marsof.es')
      }
    } catch {
      setError('Error de red. Inténtalo de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  // Enter key to advance on text steps
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && step === 1 && form.tarea.trim().length > 10) {
        goNext()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [step, form.tarea, goNext])

  const progress = step === 0 ? 0 : Math.round((step / TOTAL_STEPS) * 100)

  if (enviado) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col">
        <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-sm font-bold text-zinc-100">Marsof Technology</Link>
          </div>
        </nav>
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-lg">
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">
              ✅
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">¡Diagnóstico recibido!</h2>
            <p className="text-zinc-400 mb-2 leading-relaxed">
              Hemos analizado tu caso. Un especialista de Marsof os llamará en menos de 24 horas con una propuesta concreta para automatizar esa tarea.
            </p>
            <p className="text-zinc-500 text-sm mb-10">Sin compromisos. Solo os decimos qué podemos hacer y cuánto tiempo ahorraríais.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm transition-colors"
            >
              ← Volver a marsof.es
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-zinc-100">Marsof Technology</Link>
          {step > 0 && (
            <span className="text-xs text-zinc-500">{step} de {TOTAL_STEPS}</span>
          )}
        </div>
        {/* Progress bar */}
        {step > 0 && (
          <div className="h-0.5 bg-zinc-900">
            <div
              className="h-full bg-sky-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </nav>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div
          className={`w-full max-w-2xl transition-all duration-200 ${animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
        >
          {/* ── PASO 0: Intro ── */}
          {step === 0 && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-8">
                <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
                Solo para gestorías y asesorías
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                ¿Cuántas horas perdéis al mes<br className="hidden md:block" /> en tareas que podría<br className="hidden md:block" />
                <span className="text-sky-400"> hacer una máquina?</span>
              </h1>
              <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Responde 5 preguntas rápidas y te decimos exactamente qué podemos automatizar en tu gestoría — y cuánto tiempo recuperaríais.
              </p>
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={goNext}
                  className="bg-sky-500 text-zinc-900 font-bold px-10 py-4 rounded-xl text-lg hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"
                >
                  Empezar el diagnóstico →
                </button>
                <p className="text-zinc-600 text-xs">Tarda menos de 2 minutos · Sin spam</p>
              </div>
            </div>
          )}

          {/* ── PASO 1: Tarea repetitiva ── */}
          {step === 1 && (
            <div>
              <p className="text-sky-400 text-sm font-medium mb-3 uppercase tracking-wider">Pregunta 1 de 5</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                ¿Qué tarea os roba más tiempo cada semana?
              </h2>
              <p className="text-zinc-500 mb-8">Cuéntanosla con tus palabras, sin filtros. Cuanto más detalle, mejor diagnóstico.</p>
              <textarea
                autoFocus
                rows={5}
                placeholder="Ej: Cada mes tenemos que llamar a los clientes para pedirles las facturas, luego introducirlas una a una en el programa, y encima perseguir a los que no nos mandan nada..."
                value={form.tarea}
                onChange={e => setForm(f => ({ ...f, tarea: e.target.value }))}
                className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-5 py-4 text-base text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-sky-500/50 transition-colors resize-none leading-relaxed"
              />
              <div className="flex items-center justify-between mt-6">
                <button onClick={goPrev} className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
                  ← Atrás
                </button>
                <button
                  onClick={goNext}
                  disabled={form.tarea.trim().length < 10}
                  className="bg-sky-500 text-zinc-900 font-bold px-8 py-3 rounded-xl hover:bg-sky-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Siguiente →
                </button>
              </div>
              <p className="text-zinc-700 text-xs mt-3 text-right">Pulsa Enter para continuar</p>
            </div>
          )}

          {/* ── PASO 2: Horas al mes ── */}
          {step === 2 && (
            <div>
              <p className="text-sky-400 text-sm font-medium mb-3 uppercase tracking-wider">Pregunta 2 de 5</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                ¿Cuánto tiempo le dedicáis en total al mes?
              </h2>
              <p className="text-zinc-500 mb-8">Incluyendo a todo el equipo.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {HORAS_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setForm(f => ({ ...f, horas: opt.value })); setTimeout(goNext, 150) }}
                    className={`text-left px-5 py-4 rounded-xl border transition-all ${
                      form.horas === opt.value
                        ? 'bg-sky-500/20 border-sky-500/60 text-sky-200'
                        : 'bg-zinc-900/60 border-white/10 text-zinc-300 hover:border-white/25 hover:bg-zinc-900'
                    }`}
                  >
                    <p className="font-semibold text-base">{opt.label}</p>
                    <p className="text-sm opacity-60 mt-0.5">{opt.sublabel}</p>
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between mt-6">
                <button onClick={goPrev} className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
                  ← Atrás
                </button>
                {form.horas && (
                  <button
                    onClick={goNext}
                    className="bg-sky-500 text-zinc-900 font-bold px-8 py-3 rounded-xl hover:bg-sky-400 transition-colors"
                  >
                    Siguiente →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── PASO 3: Número de clientes ── */}
          {step === 3 && (
            <div>
              <p className="text-sky-400 text-sm font-medium mb-3 uppercase tracking-wider">Pregunta 3 de 5</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                ¿Con cuántos clientes trabajáis?
              </h2>
              <p className="text-zinc-500 mb-8">Aproximadamente, no hace falta que sea exacto.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CLIENTES_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setForm(f => ({ ...f, numClientes: opt.value })); setTimeout(goNext, 150) }}
                    className={`text-left px-5 py-4 rounded-xl border transition-all ${
                      form.numClientes === opt.value
                        ? 'bg-sky-500/20 border-sky-500/60 text-sky-200'
                        : 'bg-zinc-900/60 border-white/10 text-zinc-300 hover:border-white/25 hover:bg-zinc-900'
                    }`}
                  >
                    <p className="font-semibold text-base">{opt.label}</p>
                    <p className="text-sm opacity-60 mt-0.5">{opt.sublabel}</p>
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between mt-6">
                <button onClick={goPrev} className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
                  ← Atrás
                </button>
                {form.numClientes && (
                  <button
                    onClick={goNext}
                    className="bg-sky-500 text-zinc-900 font-bold px-8 py-3 rounded-xl hover:bg-sky-400 transition-colors"
                  >
                    Siguiente →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── PASO 4: Software ── */}
          {step === 4 && (
            <div>
              <p className="text-sky-400 text-sm font-medium mb-3 uppercase tracking-wider">Pregunta 4 de 5</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                ¿Qué programas usáis en el día a día?
              </h2>
              <p className="text-zinc-500 mb-8">Puedes seleccionar varios. Esto nos ayuda a saber si ya tenemos integración.</p>
              <div className="flex flex-wrap gap-3 mb-8">
                {SOFTWARE_OPTIONS.map(s => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => toggleSoftware(s.label)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      form.software.includes(s.label)
                        ? 'bg-sky-500/20 border-sky-500/60 text-sky-200 shadow-md shadow-sky-500/10'
                        : 'bg-zinc-900/60 border-white/10 text-zinc-400 hover:border-white/25 hover:text-zinc-200'
                    }`}
                  >
                    <span>{s.icon}</span>
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <button onClick={goPrev} className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
                  ← Atrás
                </button>
                <button
                  onClick={goNext}
                  className="bg-sky-500 text-zinc-900 font-bold px-8 py-3 rounded-xl hover:bg-sky-400 transition-colors"
                >
                  {form.software.length === 0 ? 'Saltar →' : 'Siguiente →'}
                </button>
              </div>
            </div>
          )}

          {/* ── PASO 5: Contacto ── */}
          {step === 5 && (
            <div>
              <p className="text-sky-400 text-sm font-medium mb-3 uppercase tracking-wider">Último paso · 5 de 5</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                ¿Cómo os contactamos con el diagnóstico?
              </h2>
              <p className="text-zinc-500 mb-8">
                Un especialista os llamará en menos de 24 horas con una propuesta concreta.
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Tu nombre *</label>
                    <input
                      autoFocus
                      required
                      type="text"
                      placeholder="María García"
                      value={form.nombre}
                      onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                      className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-sky-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Gestoría o asesoría *</label>
                    <input
                      required
                      type="text"
                      placeholder="Gestoría García S.L."
                      value={form.gestoria}
                      onChange={e => setForm(f => ({ ...f, gestoria: e.target.value }))}
                      className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-sky-500/50 transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Email *</label>
                    <input
                      required
                      type="email"
                      placeholder="maria@gestoria.es"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-sky-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Teléfono <span className="text-zinc-600 font-normal normal-case">(para llamaros)</span></label>
                    <input
                      type="tel"
                      placeholder="612 345 678"
                      value={form.telefono}
                      onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))}
                      className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-sky-500/50 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mt-4">{error}</p>
              )}

              <div className="flex items-center justify-between mt-6">
                <button onClick={goPrev} className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
                  ← Atrás
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={enviando || !form.nombre.trim() || !form.gestoria.trim() || !form.email.trim()}
                  className="bg-sky-500 text-zinc-900 font-bold px-8 py-3 rounded-xl hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                  {enviando ? (
                    <><span className="w-4 h-4 border-2 border-zinc-700 border-t-transparent rounded-full animate-spin" />Enviando...</>
                  ) : (
                    'Recibir diagnóstico gratis →'
                  )}
                </button>
              </div>
              <p className="text-zinc-600 text-xs mt-4 text-center">
                Sin spam. Solo nos pondremos en contacto para analizar vuestra situación.
              </p>
            </div>
          )}
        </div>
      </main>

      {step === 0 && <MarketingFooter />}
    </div>
  )
}
