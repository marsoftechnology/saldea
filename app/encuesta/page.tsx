'use client'

import { useState } from 'react'

const BLOQUES = [
  {
    id: 'tecnico',
    titulo: 'Perfil técnico',
    emoji: '💻',
    preguntas: [
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
        titulo: 'Capacidad de MVP',
        pregunta: '¿Puedes construir y lanzar un MVP funcional tú solo en menos de 30 días?',
        opciones: [
          'Sí, lo he hecho antes y puedo repetirlo',
          'Creo que podría, pero nunca lo he hecho en ese plazo',
          'Necesitaría más tiempo o ayuda externa',
          'No, no es mi perfil técnico',
        ],
      },
      {
        key: 'q3',
        numero: '03',
        titulo: 'Producto lanzado',
        pregunta: '¿Has lanzado algún producto digital por el que usuarios reales hayan pagado?',
        opciones: [
          'Sí, he tenido clientes de pago en un producto propio',
          'Lo lancé pero no llegué a monetizarlo',
          'He contribuido a productos de otros, no propios',
          'No, nunca he lanzado nada',
        ],
      },
    ],
  },
  {
    id: 'situacion',
    titulo: 'Situación personal',
    emoji: '📋',
    preguntas: [
      {
        key: 'q4',
        numero: '04',
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
        key: 'q5',
        numero: '05',
        titulo: 'Disponibilidad',
        pregunta: '¿Puedes dedicarte a esto a tiempo completo?',
        opciones: [
          'Sí, full-time desde el primer día',
          'Puedo en 1-2 meses cuando cierre lo actual',
          'Media jornada, compatibilizo con otro trabajo',
          'Por ahora solo puedo dedicarle horas sueltas',
        ],
      },
      {
        key: 'q6',
        numero: '06',
        titulo: 'Compromisos activos',
        pregunta: '¿Tienes empleo u otros proyectos que compiten con esto?',
        opciones: [
          'No tengo nada que compita con esto',
          'Tengo un trabajo pero lo dejaré al arrancar',
          'Tengo otro proyecto en paralelo que seguiré',
          'Tengo varios compromisos que limitan mi dedicación',
        ],
      },
    ],
  },
  {
    id: 'comercial',
    titulo: 'Perfil comercial',
    emoji: '📈',
    preguntas: [
      {
        key: 'q7',
        numero: '07',
        titulo: 'Experiencia en ventas',
        pregunta: '¿Has vendido algún producto o servicio de forma directa?',
        opciones: [
          'Sí, he vendido y me siento cómodo/a con ello',
          'He vendido algo puntualmente pero no es mi fuerte',
          'No, las ventas no son lo mío',
        ],
      },
      {
        key: 'q8',
        numero: '08',
        titulo: 'Red de clientes',
        pregunta: '¿Tienes contactos que podrían ser nuestros primeros 10 clientes?',
        opciones: [
          'Sí, puedo traer los primeros 10 clientes de mi red',
          'Tengo contactos en el sector pero no sé si comprarían',
          'Mi red no es del sector pero puedo hacer outreach',
          'No tengo red relevante para este producto',
        ],
      },
      {
        key: 'q9',
        numero: '09',
        titulo: 'Aportación principal',
        pregunta: '¿Qué traes a la mesa más allá de tu tiempo?',
        opciones: [
          'Capital, clientes y contactos',
          'Cartera de clientes o capital propio',
          'Contactos y red que pueden ayudar a crecer',
          'Solo mis conocimientos técnicos o de negocio',
        ],
      },
    ],
  },
  {
    id: 'mentalidad',
    titulo: 'Mentalidad',
    emoji: '🧠',
    preguntas: [
      {
        key: 'q10',
        numero: '10',
        titulo: 'Historial emprendedor',
        pregunta: '¿Has montado algún proyecto o empresa antes?',
        opciones: [
          'Sí, monté algo y lo llevé a ingresos reales',
          'Lo monté pero no llegó a generar ingresos',
          'He trabajado en startups como empleado',
          'No, sería mi primera experiencia en esto',
        ],
      },
      {
        key: 'q11',
        numero: '11',
        titulo: 'Resolución de crisis',
        pregunta: 'Ante un problema que te bloquea, ¿cómo actúas?',
        opciones: [
          'Lo analicé, tomé una decisión y seguí adelante',
          'Pedí ayuda y lo resolví en equipo',
          'Me bloqueé y tardé más de lo que debería',
          'Lo dejé correr hasta que se resolvió solo',
        ],
      },
      {
        key: 'q12',
        numero: '12',
        titulo: 'Tolerancia al caos',
        pregunta: 'El plan falla, el producto cambia, no hay ingresos. ¿Cómo estás con eso?',
        opciones: [
          'Es mi entorno natural — la incertidumbre me activa',
          'Lo acepto y lo gestiono aunque me cuesta',
          'Prefiero tener un plan claro antes de avanzar',
          'La incertidumbre me paraliza',
        ],
      },
    ],
  },
  {
    id: 'vision',
    titulo: 'Visión',
    emoji: '🎯',
    preguntas: [
      {
        key: 'q13',
        numero: '13',
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
        key: 'q14',
        numero: '14',
        titulo: 'Expectativas a 12 meses',
        pregunta: '¿Qué esperas que haya pasado en 12 meses?',
        opciones: [
          'Clientes de pago, tracción real y equipo pequeño rodando',
          'Modelo validado y primeros ingresos',
          'Producto lanzado y aprendizajes claros',
          'No tengo una expectativa concreta todavía',
        ],
      },
      {
        key: 'q15',
        numero: '15',
        titulo: 'Primera semana sin ventas',
        pregunta: 'Lanzamos, pasan 7 días y cero clientes de pago. ¿Qué haces?',
        opciones: [
          'Salgo a buscar clientes de forma activa e intensiva',
          'Analizo por qué no hay ventas y pivoto si hace falta',
          'Espero unos días más antes de actuar',
          'Me preocupo pero no sé bien qué hacer',
        ],
      },
    ],
  },
  {
    id: 'sociedad',
    titulo: 'La sociedad',
    emoji: '🤝',
    preguntas: [
      {
        key: 'q16',
        numero: '16',
        titulo: 'Gestión de conflictos',
        pregunta: 'Si discrepamos en una decisión importante, ¿cómo lo resolvemos?',
        opciones: [
          'Lo hablamos abiertamente y buscamos consenso',
          'Cada uno cede algo y encontramos un punto medio',
          'El que tenga más contexto en esa área decide',
          'Si no hay acuerdo, llamamos a un tercero',
        ],
      },
      {
        key: 'q17',
        numero: '17',
        titulo: 'Rol en la sociedad',
        pregunta: '¿Cómo te ves trabajando con el otro cofundador?',
        opciones: [
          'Socios iguales: decisiones compartidas y responsabilidades claras',
          'Yo ejecuto con autonomía dentro de mi área',
          'Prefiero que el otro lleve el timón y yo apoyo',
          'Necesito validación antes de tomar decisiones importantes',
        ],
      },
      {
        key: 'q18',
        numero: '18',
        titulo: 'Expectativa de equity',
        pregunta: '¿Qué reparto de equity te parece justo para alguien que se une ahora?',
        opciones: [
          '50/50 con vesting — lo más justo para arrancar juntos',
          'Proporcional a la aportación real de cada uno',
          'El que tuvo la idea original debería tener más',
          'No he pensado en eso todavía',
        ],
      },
    ],
  },
]

const TODAS = BLOQUES.flatMap(b => b.preguntas)

export default function EncuestaPage() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [respuestas, setRespuestas] = useState<Record<string, string>>({})
  const [enviando, setEnviando] = useState(false)
  const [resultado, setResultado] = useState<number | null>(null)
  const [resultadoEmail, setResultadoEmail] = useState('')
  const [error, setError] = useState('')

  const respondidas = Object.keys(respuestas).length
  const total = TODAS.length
  const progreso = Math.round((respondidas / total) * 100)
  const completo = respondidas === total && nombre.trim() && email.trim()

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
      setResultadoEmail(email)
    } catch {
      setError('Algo falló al enviar. Inténtalo de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  if (resultado !== null) {
    const nivel =
      resultado >= 70 ? { label: 'Perfil sólido', color: '#22c55e', ring: 'rgba(34,197,94,0.15)', emoji: '🚀', msg: 'Nos pondremos en contacto contigo pronto.' }
      : resultado >= 50 ? { label: 'Perfil prometedor', color: '#f59e0b', ring: 'rgba(245,158,11,0.15)', emoji: '⚡', msg: 'Hay aspectos interesantes. Revisaremos tu perfil.' }
      : { label: 'No encaja por ahora', color: '#ef4444', ring: 'rgba(239,68,68,0.15)', emoji: '📋', msg: 'Puede que el timing o el perfil no sea el adecuado ahora mismo.' }

    return (
      <div style={{ minHeight: '100vh', background: '#060d1a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
        <div style={{ width: '100%', maxWidth: 480, textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 24 }}>{nivel.emoji}</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Encuesta completada</h1>
          <p style={{ fontSize: 15, color: '#64748b', margin: '0 0 40px' }}>{nivel.msg}</p>
          <div style={{ background: nivel.ring, border: `1px solid ${nivel.color}30`, borderRadius: 20, padding: '40px 32px', marginBottom: 32 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: nivel.color, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>{nivel.label}</div>
            <div style={{ fontSize: 88, fontWeight: 900, color: nivel.color, lineHeight: 1, margin: '0 0 8px' }}>{resultado}%</div>
            <div style={{ fontSize: 13, color: nivel.color + '80' }}>compatibilidad con el perfil buscado</div>
          </div>
          <p style={{ fontSize: 13, color: '#475569' }}>
            Te contactaremos en <span style={{ color: '#94a3b8' }}>{resultadoEmail}</span>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#060d1a', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>

      {/* Top bar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(6,13,26,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#fff' }}>M</div>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>Marsof Technology</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 120, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progreso}%`, background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', borderRadius: 99, transition: 'width 0.4s ease' }} />
            </div>
            <span style={{ fontSize: 12, color: '#475569', minWidth: 36, textAlign: 'right' }}>{respondidas}/{total}</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '64px 24px 80px' }}>

        {/* Hero */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 99, padding: '6px 14px', marginBottom: 28 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#60a5fa', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 12, fontWeight: 500, color: '#93c5fd', letterSpacing: 0.3 }}>Posición abierta · Cofundador/a técnico</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 52px)', fontWeight: 900, color: '#f8fafc', lineHeight: 1.1, margin: '0 0 20px', letterSpacing: -1 }}>
            ¿Eres el cofundador<br />
            <span style={{ background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>que buscamos?</span>
          </h1>
          <p style={{ fontSize: 17, color: '#64748b', lineHeight: 1.7, margin: '0 0 32px', maxWidth: 560 }}>
            Marsof construye micro-SaaS con IA para autónomos y pymes españolas.
            Buscamos un cofundador con skin in the game y mentalidad de builder.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {[['⏱', '~8 minutos'], ['📝', '18 preguntas'], ['🔒', 'Confidencial']].map(([icon, text]) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '6px 12px' }}>
                <span style={{ fontSize: 13 }}>{icon}</span>
                <span style={{ fontSize: 13, color: '#64748b' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Datos personales */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 28, marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <span style={{ fontSize: 18 }}>👤</span>
              <span style={{ fontSize: 15, fontWeight: 600, color: '#e2e8f0' }}>Sobre ti</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { label: 'Nombre completo', value: nombre, onChange: setNombre, type: 'text', placeholder: 'Tu nombre' },
                { label: 'Email de contacto', value: email, onChange: setEmail, type: 'email', placeholder: 'tu@email.com' },
              ].map(field => (
                <div key={field.label}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>{field.label}</label>
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={e => field.onChange(e.target.value)}
                    placeholder={field.placeholder}
                    required
                    style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px', color: '#f1f5f9', fontSize: 14, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(59,130,246,0.5)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bloques */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            {BLOQUES.map((bloque, bi) => {
              const bloqueRespondidas = bloque.preguntas.filter(p => respuestas[p.key]).length
              const bloqueCompleto = bloqueRespondidas === bloque.preguntas.length
              return (
                <div key={bloque.id}>
                  {/* Bloque header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: bloqueCompleto ? 'rgba(34,197,94,0.1)' : 'rgba(59,130,246,0.08)', border: `1px solid ${bloqueCompleto ? 'rgba(34,197,94,0.25)' : 'rgba(59,130,246,0.15)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                      {bloqueCompleto ? '✓' : bloque.emoji}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: '#334155', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Bloque {bi + 1} de {BLOQUES.length}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: bloqueCompleto ? '#22c55e' : '#e2e8f0' }}>{bloque.titulo}</div>
                    </div>
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.05)', marginLeft: 4 }} />
                    <span style={{ fontSize: 12, color: bloqueCompleto ? '#22c55e' : '#334155' }}>{bloqueRespondidas}/{bloque.preguntas.length}</span>
                  </div>

                  {/* Preguntas */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {bloque.preguntas.map(p => {
                      const sel = respuestas[p.key]
                      return (
                        <div key={p.key} style={{ background: sel ? 'rgba(59,130,246,0.04)' : 'rgba(255,255,255,0.02)', border: `1px solid ${sel ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 14, padding: '22px 24px', transition: 'border-color 0.2s' }}>
                          <div style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', background: 'rgba(59,130,246,0.1)', borderRadius: 6, padding: '3px 8px', flexShrink: 0, alignSelf: 'flex-start', letterSpacing: 0.5 }}>{p.numero}</span>
                            <div>
                              <div style={{ fontSize: 11, color: '#334155', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>{p.titulo}</div>
                              <div style={{ fontSize: 15, fontWeight: 600, color: '#e2e8f0', lineHeight: 1.5 }}>{p.pregunta}</div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 38 }}>
                            {p.opciones.map(opcion => {
                              const activa = sel === opcion
                              return (
                                <label key={opcion} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 14px', borderRadius: 10, cursor: 'pointer', background: activa ? 'rgba(59,130,246,0.12)' : 'transparent', border: `1px solid ${activa ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.05)'}`, transition: 'all 0.15s' }}
                                  onMouseEnter={e => { if (!activa) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)' }}
                                  onMouseLeave={e => { if (!activa) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                                >
                                  <div style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${activa ? '#60a5fa' : '#334155'}`, background: activa ? '#3b82f6' : 'transparent', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
                                    {activa && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
                                  </div>
                                  <input type="radio" name={p.key} value={opcion} checked={activa} onChange={() => setRespuestas(prev => ({ ...prev, [p.key]: opcion }))} style={{ display: 'none' }} />
                                  <span style={{ fontSize: 14, color: activa ? '#e2e8f0' : '#94a3b8', lineHeight: 1.5, transition: 'color 0.15s' }}>{opcion}</span>
                                </label>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Submit */}
          <div style={{ marginTop: 48 }}>
            {error && (
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '12px 16px', color: '#f87171', fontSize: 14, marginBottom: 16 }}>{error}</div>
            )}
            <button
              type="submit"
              disabled={!completo || enviando}
              style={{ width: '100%', padding: '16px 24px', borderRadius: 12, fontSize: 16, fontWeight: 700, border: 'none', cursor: completo && !enviando ? 'pointer' : 'not-allowed', background: completo && !enviando ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'rgba(255,255,255,0.05)', color: completo && !enviando ? '#fff' : '#334155', boxShadow: completo && !enviando ? '0 8px 32px rgba(59,130,246,0.25)' : 'none', transition: 'all 0.2s', transform: 'translateY(0)' }}
              onMouseEnter={e => { if (completo && !enviando) (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
            >
              {enviando ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                  Enviando candidatura...
                </span>
              ) : !completo ? (
                `Completa todas las preguntas (${respondidas}/${total})`
              ) : (
                'Enviar candidatura →'
              )}
            </button>
            <p style={{ textAlign: 'center', fontSize: 12, color: '#1e293b', marginTop: 16 }}>
              Tus respuestas son confidenciales y solo las verá el equipo fundador de Marsof.
            </p>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes spin { to{transform:rotate(360deg)} }
        * { box-sizing: border-box; }
        input::placeholder { color: #334155; }
        @media(max-width:520px) {
          div[style*="gridTemplateColumns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
