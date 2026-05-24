import { NextRequest, NextResponse } from 'next/server'
import { enviarEmail } from '@/lib/resend'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

const PUNTOS: Record<string, number> = {
  // Q1 - Stack tecnológico
  'Lo domino — he lanzado productos reales con este stack': 10,
  'Conozco varios y adquiero el resto con rapidez': 7,
  'Experiencia básica en parte del stack; curva de aprendizaje necesaria': 4,
  'No tengo experiencia con este stack': 0,
  // Q2 - MVP solo
  'Sí, lo he hecho antes y puedo repetirlo': 10,
  'Creo que podría, pero nunca lo he hecho en ese plazo': 6,
  'Necesitaría más tiempo o ayuda externa': 2,
  'No, no es mi perfil técnico': 0,
  // Q3 - Producto lanzado
  'Sí, he tenido clientes de pago en un producto propio': 10,
  'Lo lancé pero no llegué a monetizarlo': 5,
  'He contribuido a productos de otros, no propios': 3,
  'No, nunca he lanzado nada': 0,
  // Q4 - Solvencia financiera
  'Más de 12 meses — tengo solvencia para el largo plazo': 10,
  'Entre 6 y 12 meses': 7,
  'Entre 3 y 6 meses': 4,
  'Menos de 3 meses — necesito ingresos pronto': 0,
  // Q5 - Disponibilidad
  'Sí, full-time desde el primer día': 10,
  'Puedo en 1-2 meses cuando cierre lo actual': 7,
  'Media jornada, compatibilizo con otro trabajo': 3,
  'Por ahora solo puedo dedicarle horas sueltas': 0,
  // Q6 - Compromisos activos
  'No tengo nada que compita con esto': 10,
  'Tengo un trabajo pero lo dejaré al arrancar': 7,
  'Tengo otro proyecto en paralelo que seguiré': 3,
  'Tengo varios compromisos que limitan mi dedicación': 0,
  // Q7 - Ventas
  'Sí, he vendido y me siento cómodo/a con ello': 10,
  'He vendido algo puntualmente pero no es mi fuerte': 5,
  'No, las ventas no son lo mío': 0,
  // Q8 - Red de clientes
  'Sí, puedo traer los primeros 10 clientes de mi red': 10,
  'Tengo contactos en el sector pero no sé si comprarían': 6,
  'Mi red no es del sector pero puedo hacer outreach': 3,
  'No tengo red relevante para este producto': 0,
  // Q9 - Aportación
  'Capital, clientes y contactos': 10,
  'Cartera de clientes o capital propio': 8,
  'Contactos y red que pueden ayudar a crecer': 5,
  'Solo mis conocimientos técnicos o de negocio': 0,
  // Q10 - Historial emprendedor
  'Sí, monté algo y lo llevé a ingresos reales': 10,
  'Lo monté pero no llegó a generar ingresos': 6,
  'He trabajado en startups como empleado': 3,
  'No, sería mi primera experiencia en esto': 0,
  // Q11 - Resolución de crisis
  'Lo analicé, tomé una decisión y seguí adelante': 10,
  'Pedí ayuda y lo resolví en equipo': 8,
  'Me bloqueé y tardé más de lo que debería': 2,
  'Lo dejé correr hasta que se resolvió solo': 0,
  // Q12 - Tolerancia al caos
  'Es mi entorno natural — la incertidumbre me activa': 10,
  'Lo acepto y lo gestiono aunque me cuesta': 6,
  'Prefiero tener un plan claro antes de avanzar': 2,
  'La incertidumbre me paraliza': 0,
  // Q13 - Motivación
  'Construir algo propio que crezca y escale': 10,
  'Ganar dinero y libertad financiera': 8,
  'La tecnología y el reto técnico': 6,
  'Un proyecto estable con ingresos predecibles': 0,
  // Q14 - Expectativas a 12 meses
  'Clientes de pago, tracción real y equipo pequeño rodando': 10,
  'Modelo validado y primeros ingresos': 8,
  'Producto lanzado y aprendizajes claros': 4,
  'No tengo una expectativa concreta todavía': 0,
  // Q15 - Sin ventas en semana 1
  'Salgo a buscar clientes de forma activa e intensiva': 10,
  'Analizo por qué no hay ventas y pivoto si hace falta': 10,
  'Espero unos días más antes de actuar': 2,
  'Me preocupo pero no sé bien qué hacer': 0,
  // Q16 - Gestión de conflictos
  'Lo hablamos abiertamente y buscamos consenso': 10,
  'Cada uno cede algo y encontramos un punto medio': 8,
  'El que tenga más contexto en esa área decide': 5,
  'Si no hay acuerdo, llamamos a un tercero': 2,
  // Q17 - Rol en la sociedad
  'Socios iguales: decisiones compartidas y responsabilidades claras': 10,
  'Yo ejecuto con autonomía dentro de mi área': 10,
  'Prefiero que el otro lleve el timón y yo apoyo': 3,
  'Necesito validación antes de tomar decisiones importantes': 0,
  // Q18 - Expectativa de equity
  '50/50 con vesting — lo más justo para arrancar juntos': 10,
  'Proporcional a la aportación real de cada uno': 8,
  'El que tuvo la idea original debería tener más': 3,
  'No he pensado en eso todavía': 0,
}

const PREGUNTAS = [
  { key: 'q1',  label: 'Stack tecnológico' },
  { key: 'q2',  label: 'Capacidad de construir un MVP' },
  { key: 'q3',  label: 'Producto digital lanzado' },
  { key: 'q4',  label: 'Solvencia financiera' },
  { key: 'q5',  label: 'Disponibilidad' },
  { key: 'q6',  label: 'Compromisos activos' },
  { key: 'q7',  label: 'Experiencia en ventas' },
  { key: 'q8',  label: 'Red de primeros clientes' },
  { key: 'q9',  label: 'Aportación principal' },
  { key: 'q10', label: 'Historial emprendedor' },
  { key: 'q11', label: 'Resolución de crisis' },
  { key: 'q12', label: 'Tolerancia al caos' },
  { key: 'q13', label: 'Motivación principal' },
  { key: 'q14', label: 'Expectativas a 12 meses' },
  { key: 'q15', label: 'Primera semana sin ventas' },
  { key: 'q16', label: 'Gestión de conflictos' },
  { key: 'q17', label: 'Rol en la sociedad' },
  { key: 'q18', label: 'Expectativa de equity' },
]

const MAX_SCORE = 180

export async function POST(req: NextRequest) {
  // Rate limit: máx 3 encuestas por IP por hora para evitar spam al buzón de Carlos
  const ip = getClientIp(req)
  const rl = checkRateLimit({ key: `encuesta:${ip}`, ventana: '1h', max: 3 })
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Inténtalo de nuevo más tarde.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 3600) } },
    )
  }

  const body = await req.json() as {
    nombre: string
    email: string
    respuestas: Record<string, string>
  }

  const { nombre, email, respuestas } = body
  if (!nombre || !email || !respuestas) {
    return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
  }

  let score = 0
  for (const p of PREGUNTAS) {
    score += PUNTOS[respuestas[p.key] ?? ''] ?? 0
  }

  const porcentaje = Math.max(1, Math.round((score / MAX_SCORE) * 100))
  const colorScore = porcentaje >= 70 ? '#16a34a' : porcentaje >= 50 ? '#d97706' : '#dc2626'
  const etiqueta = porcentaje >= 70 ? 'Perfil sólido ✅' : porcentaje >= 50 ? 'Perfil prometedor ⚡' : 'No encaja por ahora ❌'

  const filasRespuestas = PREGUNTAS.map(p => `
    <tr>
      <td style="padding:9px 14px;font-weight:600;color:#374151;border-bottom:1px solid #f3f4f6;font-size:13px;white-space:nowrap;">${p.label}</td>
      <td style="padding:9px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6;font-size:13px;">${respuestas[p.key] ?? '—'}</td>
    </tr>`).join('')

  const cuerpo = `
    <div style="background:linear-gradient(135deg,#0f172a,#1e3a5f);padding:36px;border-radius:14px;margin-bottom:28px;text-align:center;">
      <p style="margin:0 0 4px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:2px;">PUNTUACIÓN FINAL</p>
      <p style="margin:8px 0 4px;font-size:80px;font-weight:900;color:${colorScore};line-height:1;">${porcentaje}%</p>
      <p style="margin:0 0 10px;font-size:13px;color:#64748b;">${score} / ${MAX_SCORE} puntos</p>
      <span style="display:inline-block;background:${colorScore}22;color:${colorScore};border:1px solid ${colorScore}44;border-radius:99px;padding:4px 16px;font-size:13px;font-weight:600;">${etiqueta}</span>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr><td style="padding:8px 14px;color:#6b7280;font-size:14px;width:120px;"><strong>Nombre</strong></td><td style="padding:8px 14px;color:#111827;font-size:14px;">${nombre}</td></tr>
      <tr style="background:#f9fafb;"><td style="padding:8px 14px;color:#6b7280;font-size:14px;"><strong>Email</strong></td><td style="padding:8px 14px;color:#111827;font-size:14px;">${email}</td></tr>
    </table>

    <p style="font-weight:700;color:#111827;font-size:15px;margin:24px 0 8px;">Respuestas del candidato</p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      <thead><tr style="background:#f8fafc;">
        <th style="padding:9px 14px;text-align:left;color:#374151;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Pregunta</th>
        <th style="padding:9px 14px;text-align:left;color:#374151;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Respuesta</th>
      </tr></thead>
      <tbody>${filasRespuestas}</tbody>
    </table>
  `

  await enviarEmail({
    para: process.env.ENCUESTA_EMAIL_DESTINO ?? 'carlosgc90personal@gmail.com',
    asunto: `🚀 Cofundador — ${porcentaje}% — ${nombre}`,
    cuerpo,
    desde: 'Marsof <cobros@marsof.es>',
  })

  return NextResponse.json({ ok: true, porcentaje })
}
