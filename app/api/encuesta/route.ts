import { NextRequest, NextResponse } from 'next/server'
import { enviarEmail } from '@/lib/resend'

const PUNTOS: Record<string, number> = {
  // Q1 - Stack tecnológico
  'Lo domino — he lanzado productos reales con este stack': 10,
  'Conozco varios y adquiero el resto con rapidez': 6,
  'Experiencia básica en parte del stack; curva de aprendizaje necesaria': 4,
  'No tengo experiencia con este stack': 0,
  // Q2 - Solvencia financiera
  'Más de 12 meses — tengo solvencia para el largo plazo': 10,
  'Entre 6 y 12 meses': 7,
  'Entre 3 y 6 meses': 4,
  'Menos de 3 meses — necesito ingresos pronto': 0,
  // Q3 - Ventas
  'Sí, he vendido y me siento cómodo/a con ello': 10,
  'He vendido algo puntualmente pero no es mi fuerte': 5,
  'No, las ventas no son lo mío': 0,
  // Q4 - Aportación
  'Capital, clientes y contactos': 10,
  'Cartera de clientes o capital propio': 8,
  'Contactos y red que pueden ayudar a crecer': 5,
  'Solo mis conocimientos técnicos o de negocio': 0,
  // Q5 - Resolución de crisis
  'Lo analicé y seguí adelante': 10,
  'Pedí ayuda y lo resolví': 8,
  'Me bloqueé o lo dejé correr': 0,
  // Q6 - Motivación
  'Construir algo propio que crezca y escale': 10,
  'Ganar dinero y libertad financiera': 9,
  'La tecnología y el reto técnico': 7,
  'Un proyecto estable con ingresos predecibles': 0,
  // Q7 - Primera semana sin ventas
  'Acelero en ventas y busco clientes más activamente': 10,
  'Analizo los datos y pivoto si hace falta': 10,
  'Me preocupo pero espero a ver cómo evoluciona': 0,
  // Q8 - Rol
  'Que trabajemos como iguales': 10,
  'Que tome decisiones y confíe en mí para ejecutar': 10,
  'Que revise mi trabajo y valide antes de ejecutar': 0,
}

const PREGUNTAS = [
  { key: 'q1', label: 'Stack tecnológico' },
  { key: 'q2', label: 'Solvencia financiera' },
  { key: 'q3', label: 'Experiencia en ventas' },
  { key: 'q4', label: 'Aportación principal' },
  { key: 'q5', label: 'Resolución de crisis' },
  { key: 'q6', label: 'Motivación principal' },
  { key: 'q7', label: 'Primera semana sin ventas' },
  { key: 'q8', label: 'Rol esperado en la sociedad' },
]

export async function POST(req: NextRequest) {
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

  const porcentaje = Math.max(1, Math.round((score / 80) * 100))
  const colorScore = porcentaje >= 70 ? '#16a34a' : porcentaje >= 50 ? '#d97706' : '#dc2626'

  const filasRespuestas = PREGUNTAS.map(p => `
    <tr>
      <td style="padding:10px 14px;font-weight:600;color:#374151;border-bottom:1px solid #f3f4f6;font-size:14px;">${p.label}</td>
      <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6;font-size:14px;">${respuestas[p.key] ?? '—'}</td>
    </tr>`).join('')

  const cuerpo = `
    <div style="background:linear-gradient(135deg,#0f172a,#1e3a5f);padding:32px;border-radius:12px;margin-bottom:28px;text-align:center;">
      <p style="margin:0;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:2px;">PUNTUACIÓN FINAL</p>
      <p style="margin:10px 0 4px;font-size:72px;font-weight:800;color:${colorScore};line-height:1;">${porcentaje}%</p>
      <p style="margin:0;font-size:14px;color:#64748b;">${score} / 80 puntos</p>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr>
        <td style="padding:10px 14px;color:#6b7280;font-size:14px;width:140px;"><strong>Nombre</strong></td>
        <td style="padding:10px 14px;color:#111827;font-size:14px;">${nombre}</td>
      </tr>
      <tr style="background:#f9fafb;">
        <td style="padding:10px 14px;color:#6b7280;font-size:14px;"><strong>Email</strong></td>
        <td style="padding:10px 14px;color:#111827;font-size:14px;">${email}</td>
      </tr>
    </table>

    <p style="font-weight:700;color:#111827;font-size:15px;margin:24px 0 8px;">Respuestas del candidato</p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      <thead>
        <tr style="background:#f8fafc;">
          <th style="padding:10px 14px;text-align:left;color:#374151;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Pregunta</th>
          <th style="padding:10px 14px;text-align:left;color:#374151;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Respuesta</th>
        </tr>
      </thead>
      <tbody>${filasRespuestas}</tbody>
    </table>
  `

  await enviarEmail({
    para: 'carlosgc90personal@gmail.com',
    asunto: `🚀 Cofundador — ${porcentaje}% — ${nombre}`,
    cuerpo,
    desde: 'Marsof <cobros@marsof.es>',
  })

  return NextResponse.json({ ok: true, porcentaje })
}
