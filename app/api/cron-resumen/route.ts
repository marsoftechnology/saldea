import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { enviarEmail } from '@/lib/resend'
import { formatearEuros } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Detectar día de la semana en España
  const diaSemana = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Madrid',
    weekday: 'short',
  }).format(new Date())
  const esLunes = diaSemana === 'Mon'

  // Configuraciones (1 por org) con resumen_diario=true, O (resumen_semanal=true AND es lunes)
  // Excluyendo los que están en modo vacaciones activo
  const hoyStr = new Date().toISOString().split('T')[0]
  const { data: configs } = await supabase
    .from('configuraciones_usuario')
    .select('user_id, org_id, resumen_diario, resumen_semanal, modo_vacaciones, modo_vacaciones_hasta')

  if (!configs) return NextResponse.json({ procesados: 0 })

  const targets = configs.filter(c => {
    if (!c.resumen_diario && !(c.resumen_semanal && esLunes)) return false
    if (c.modo_vacaciones && c.modo_vacaciones_hasta && c.modo_vacaciones_hasta > hoyStr) return false
    return true
  })

  let enviados = 0
  const ahora = new Date()
  const desde = new Date(ahora.getTime() - (esLunes ? 7 : 1) * 24 * 3600 * 1000)
  const desdeISO = desde.toISOString()

  for (const conf of targets) {
    const tipo = conf.resumen_semanal && esLunes ? 'semanal' : 'diario'

    try {
      const { data: userData } = await supabase.auth.admin.getUserById(conf.user_id)
      const userEmail = userData.user?.email
      const nombre = userData.user?.user_metadata?.nombre || 'amigo'
      if (!userEmail) continue

      const orgId = conf.org_id
      if (!orgId) continue
      // Estadísticas del periodo — scope por org (no por user)
      const [emailsCount, cobradasRes, vencidasRes, respuestasRes, pendientesRes] = await Promise.all([
        supabase.from('logs_email')
          .select('id', { count: 'exact', head: true })
          .gte('enviado_at', desdeISO)
          .eq('estado', 'enviado')
          .eq('org_id', orgId),
        supabase.from('facturas')
          .select('id, importe, numero, cliente:clientes(nombre)')
          .eq('org_id', orgId)
          .eq('estado', 'cobrada'),
        supabase.from('facturas')
          .select('id, importe, numero, fecha_vencimiento, cliente:clientes(nombre)')
          .eq('org_id', orgId)
          .in('estado', ['pendiente', 'vencida', 'parcialmente_cobrada'])
          .lt('fecha_vencimiento', new Date().toISOString().split('T')[0]),
        supabase.from('respuestas_clientes')
          .select('id, categoria, resumen, cliente:clientes(nombre)')
          .eq('org_id', orgId)
          .gte('created_at', desdeISO),
        supabase.from('facturas')
          .select('id, importe')
          .eq('org_id', orgId)
          .in('estado', ['pendiente', 'vencida', 'parcialmente_cobrada']),
      ])

      const numEmails = emailsCount.count ?? 0
      const cobradas = cobradasRes.data ?? []
      const vencidas = vencidasRes.data ?? []
      const respuestas = respuestasRes.data ?? []
      const pendientes = pendientesRes.data ?? []
      const totalPendiente = pendientes.reduce((s, f) => s + Number(f.importe), 0)
      const totalCobrado = cobradas.reduce((s, f) => s + Number(f.importe), 0)

      const periodoTexto = tipo === 'semanal' ? 'esta semana' : 'ayer'
      const asunto = tipo === 'semanal'
        ? `📊 Tu resumen semanal de Saldea — ${cobradas.length} cobradas, ${totalPendiente.toFixed(0)}€ pendiente`
        : `📅 Tu resumen diario de Saldea — ${numEmails} recordatorios enviados`

      const cuerpo = `Hola ${nombre},

Aquí tienes tu resumen ${tipo === 'semanal' ? 'semanal' : 'diario'} de actividad en Saldea.

📧 Recordatorios enviados ${periodoTexto}: ${numEmails}
✅ Facturas cobradas: ${cobradas.length} (${formatearEuros(totalCobrado)})
⏳ Facturas pendientes: ${pendientes.length} (${formatearEuros(totalPendiente)})
🚨 Facturas vencidas activas: ${vencidas.length}

${respuestas.length > 0 ? `📬 Respuestas de clientes ${periodoTexto}: ${respuestas.length}
${respuestas.slice(0, 5).map(r => {
  const c = r.cliente as unknown as { nombre: string } | null
  return `  • ${c?.nombre ?? 'Cliente'} — ${r.categoria}: ${r.resumen ?? ''}`
}).join('\n')}
` : ''}

Echa un vistazo al dashboard para más detalles:
https://marsof.es/dashboard

— Saldea
`

      const ok = await enviarEmail({
        para: userEmail,
        asunto,
        cuerpo,
      })
      if (ok) enviados++
    } catch (e) {
      console.error('Error en resumen para usuario', conf.user_id, e)
    }
  }

  return NextResponse.json({ procesados: targets.length, enviados, esLunes })
}
