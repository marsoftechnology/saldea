'use client'

import { useState } from 'react'

const PREGUNTAS = [
  {
    key: 'q1',
    numero: '01',
    titulo: 'Stack tecnológico',
    pregunta: '¿Cuál es tu nivel con Next.js, TypeScript, Supabase, Stripe y Resend?',
    opciones: [
      'Lo domino — he lanzado productos reales con este stack',
      'Conozco varios y adquiero el resto con rapidez',
      'Experiencia básica en parte del stack; curva de aprendizaje necesaria',
      'No tengo experiencia con este stack',
    ],
  },
  {
    key: 'q2',
    numero: '02',
    titulo: 'Solvencia financiera',
    pregunta: '¿Cuánto tiempo puedes vivir sin ingresos del proyecto?',
    opciones: [
      'Más de 12 meses — tengo solvencia para el largo plazo',
      'Entre 6 y 12 meses',
      'Entre 3 y 6 meses',
      'Menos de 3 meses — necesito ingresos pronto',
    ],
  },
  {
    key: 'q3',
    numero: '03',
    titulo: 'Experiencia en ventas',
    pregunta: '¿Has vendido algún producto o servicio de forma directa?',
    opciones: [
      'Sí, he vendido y me siento cómodo/a con ello',
      'He vendido algo puntualmente pero no es mi fuerte',
      'No, las ventas no son lo mío',
    ],
  },
  {
    key: 'q4',
    numero: '04',
    titulo: 'Aportación principal',
    pregunta: '¿Qué traes a la mesa más allá de tu tiempo?',
    opciones: [
      'Capital, clientes y contactos',
      'Cartera de clientes o capital propio',
      'Contactos y red que pueden ayudar a crecer',
      'Solo mis conocimientos técnicos o de negocio',
    ],
  },
  {
    key: 'q5',
    numero: '05',
    titulo: 'Resolución de crisis',
    pregunta: 'Ante un problema técnico o de negocio que te bloquea, ¿cómo actúas?',
    opciones: [
      'Lo analicé y seguí adelante',
      'Pedí ayuda y lo resolví',
      'Me bloqueé o lo dejé correr',
    ],
  },
  {
    key: 'q6',
    numero: '06',
    titulo: 'Motivación principal',
    pregunta: '¿Qué te mueve a lanzar una startup ahora?',
    opciones: [
      'Construir algo propio que crezca y escale',
      'Ganar dinero y libertad financiera',
      'La tecnología y el reto técnico',
      'Un proyecto estable con ingresos predecibles',
    ],
  },
  {
    key: 'q7',
    numero: '07',
    titulo: 'Primera semana sin ventas',
    pregunta: 'Lanzamos, pasamos 7 días y cero clientes de pago. ¿Qué haces?',
    opciones: [
      'Acelero en ventas y busco clientes más activamente',
      'Analizo los datos y pivoto si hace falta',
      'Me preocupo pero espero a ver cómo evoluciona',
    ],
  },
  {
    key: 'q8',
    numero: '08',
    titulo: 'Rol en la sociedad',
    pregunta: '¿Cómo te ves trabajando con el otro cofundador?',
    opciones: [
      'Que trabajemos como iguales',
      'Que tome decisiones y confíe en mí para ejecutar',
      'Que revise mi trabajo y valide antes de ejecutar',
    ],
  },
]

export default function EncuestaPage() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [respuestas, setRespuestas] = useState<Record<string, string>>({})
  const [enviando, setEnviando] = useState(false)
  const [resultado, setResultado] = useState<number | null>(null)
  const [error, setError] = useState('')

  const respondidas = Object.keys(respuestas).length
  const progreso = Math.round((respondidas / PREGUNTAS.length) * 100)
  const completo = respondidas === PREGUNTAS.length && nombre.trim() && email.trim()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!completo) return
    setEnviando(true)
    setError('')
    try {
      const res = await fetch('/api/encuesta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, respuestas }),
      })
      const data = await res.json() as { ok?: boolean; porcentaje?: number; error?: string }
      if (!res.ok || !data.ok) throw new Error(data.error ?? 'Error al enviar')
      setResultado(data.porcentaje ?? 0)
    } catch {
      setError('Algo falló al enviar. Inténtalo de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  if (resultado !== null) {
    const nivel = resultado >= 70 ? { texto: 'Perfil sólido', color: '#16a34a', bg: '#f0fdf4', emoji: '🚀' }
      : resultado >= 50 ? { texto: 'Perfil prometedor', color: '#d97706', bg: '#fffbeb', emoji: '⚡' }
      : { texto: 'Necesita madurar', color: '#dc2626', bg: '#fef2f2', emoji: '📈' }

    return (
      <main className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">
        <div className="w-full max-w-lg text-center">
          <div className="mb-8">
            <span className="text-4xl">{nivel.emoji}</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Encuesta completada</h1>
          <p className="text-slate-400 mb-10">Hemos recibido tus respuestas. Revisaremos tu perfil y nos pondremos en contacto.</p>

          <div className="rounded-2xl p-10 mb-8" style={{ background: nivel.bg, border: `2px solid ${nivel.color}20` }}>
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: nivel.color }}>
              {nivel.texto}
            </p>
            <p className="text-8xl font-black mb-2" style={{ color: nivel.color }}>
              {resultado}%
            </p>
            <p className="text-sm" style={{ color: nivel.color + 'aa' }}>de compatibilidad con el perfil buscado</p>
          </div>

          <p className="text-slate-500 text-sm">
            Te contactaremos en los próximos días en <span className="text-slate-300">{email}</span>
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0f172a]">
      {/* Header */}
      <div className="border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#0f172a]/95 backdrop-blur z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-white font-semibold text-sm">Marsof Technology</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-32 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-500"
              style={{ width: `${progreso}%` }}
            />
          </div>
          <span className="text-slate-400 text-xs">{respondidas}/{PREGUNTAS.length}</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-400 text-xs font-medium">Posición abierta · Cofundador/a técnico</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            ¿Eres el cofundador<br />
            <span className="text-blue-400">que buscamos?</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Marsof construye micro-SaaS con IA para autónomos y pymes españolas.
            Buscamos un cofundador comprometido, con skin in the game y mentalidad de builder.
            Esta encuesta nos lleva ~5 minutos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Datos personales */}
          <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-6 space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                <span className="text-slate-300 text-sm">👤</span>
              </div>
              <h2 className="text-white font-semibold">Sobre ti</h2>
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Nombre completo</label>
              <input
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Tu nombre"
                required
                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Email de contacto</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Preguntas */}
          {PREGUNTAS.map((p, i) => (
            <div
              key={p.key}
              className={`rounded-2xl border p-6 transition-colors ${respuestas[p.key] ? 'border-blue-500/40 bg-blue-950/20' : 'border-slate-700 bg-slate-800/40'}`}
            >
              <div className="flex items-start gap-4 mb-5">
                <span className="text-xs font-bold text-blue-400 bg-blue-400/10 rounded-lg px-2 py-1 mt-0.5 shrink-0">
                  {p.numero}
                </span>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{p.titulo}</p>
                  <h3 className="text-white font-semibold leading-snug">{p.pregunta}</h3>
                </div>
              </div>

              <div className="space-y-2 pl-10">
                {p.opciones.map((opcion) => {
                  const seleccionada = respuestas[p.key] === opcion
                  return (
                    <label
                      key={opcion}
                      className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                        seleccionada
                          ? 'bg-blue-600/20 border border-blue-500/50'
                          : 'border border-transparent hover:bg-slate-700/50 hover:border-slate-600'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                        seleccionada ? 'border-blue-400 bg-blue-400' : 'border-slate-500'
                      }`}>
                        {seleccionada && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <input
                        type="radio"
                        name={p.key}
                        value={opcion}
                        checked={seleccionada}
                        onChange={() => setRespuestas(prev => ({ ...prev, [p.key]: opcion }))}
                        className="sr-only"
                      />
                      <span className={`text-sm leading-snug ${seleccionada ? 'text-white' : 'text-slate-300'}`}>
                        {opcion}
                      </span>
                    </label>
                  )
                })}
              </div>

              {i < PREGUNTAS.length - 1 && (
                <div className="mt-4 pl-10">
                  {!respuestas[p.key] && (
                    <p className="text-xs text-slate-600">Selecciona una opción para continuar</p>
                  )}
                </div>
              )}
            </div>
          ))}

          {error && (
            <div className="rounded-xl bg-red-900/30 border border-red-500/30 p-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!completo || enviando}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
              completo && !enviando
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-500/30 hover:-translate-y-0.5'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            {enviando ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Enviando...
              </span>
            ) : !completo ? (
              `Responde todas las preguntas (${respondidas}/${PREGUNTAS.length})`
            ) : (
              'Enviar candidatura →'
            )}
          </button>

          <p className="text-center text-slate-600 text-xs pb-8">
            Tus respuestas son confidenciales y solo las verá el equipo fundador de Marsof.
          </p>
        </form>
      </div>
    </main>
  )
}
