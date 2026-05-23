import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { enviarEmail } from '@/lib/resend'
import { diasVencida } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Obtener orgs con vía judicial activa (dias > 0)
  const { data: configs } = await supabase
    .from('configuraciones_usuario')
    .select('org_id, dias_via_judicial')
    .gt('dias_via_judicial', 0)

  if (!configs || configs.length === 0) {
    return NextResponse.json({ procesadas: 0, marcadas: 0 })
  }

  let marcadas = 0
  let errores = 0

  for (const cfg of configs) {
    const { org_id, dias_via_judicial } = cfg

    // Buscar facturas vencidas no marcadas aún
    const { data: facturas } = await supabase
      .from('facturas')
      .select('id, numero, importe, fecha_vencimiento, org_id, cliente_id, cliente:clientes(nombre, email)')
      .eq('org_id', org_id)
      .eq('estado', 'vencida')
      .eq('via_judicial', false)

    if (!facturas || facturas.length === 0) continue

    // Obtener email del owner de la org
    const { data: ownerMember } = await supabase
      .from('org_members')
      .select('user_id')
      .eq('org_id', org_id)
      .eq('role', 'owner')
      .maybeSingle()

    let ownerEmail = ''
    if (ownerMember?.user_id) {
      const { data: ownerUser } = await supabase
        .from('configuraciones_usuario')
        .select('email_contacto')
        .eq('org_id', org_id)
        .maybeSingle()
      // fallback: auth.users
      if (!ownerUser?.email_contacto) {
        const { data: authUser } = await supabase.auth.admin.getUserById(ownerMember.user_id)
        ownerEmail = authUser?.user?.email ?? ''
      } else {
        ownerEmail = ownerUser.email_contacto
      }
    }

    const { data: orgData } = await supabase
      .from('organizations')
      .select('name')
      .eq('id', org_id)
      .maybeSingle()
    const nombreOrg = orgData?.name ?? 'Tu empresa'

    for (const factura of facturas) {
      try {
        const dias = diasVencida(factura.fecha_vencimiento)
        if (dias < dias_via_judicial) continue

        const cliente = factura.cliente as unknown as { nombre: string; email: string } | null

        // Marcar como vía judicial en BD
        await supabase
          .from('facturas')
          .update({
            via_judicial: true,
            notas_internas: `⚖️ Marcada para vía judicial automáticamente el ${new Date().toLocaleDateString('es-ES')} (${dias} días vencida).`,
          })
          .eq('id', factura.id)

        // Notificar al owner por email
        if (ownerEmail) {
          const importeStr = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(Number(factura.importe))
          await enviarEmail({
            para: ownerEmail,
            asunto: `⚖️ Factura ${factura.numero} lista para vía judicial — ${importeStr}`,
            cuerpo: `Hola,

La factura ${factura.numero} de ${cliente?.nombre ?? 'tu cliente'} por ${importeStr} lleva ${dias} días vencida sin cobrar.

Saldea la ha marcado automáticamente como lista para vía judicial según tu configuración (umbral: ${dias_via_judicial} días).

Accede a Saldea para ver los detalles y tomar acción:
${process.env.NEXT_PUBLIC_APP_URL}/facturas/${factura.id}

—
Saldea · ${nombreOrg}`,
            facturaId: factura.id,
          })
        }

        // Enviar push si hay suscripciones activas
        const pushPayload = {
          org_id,
          title: `⚖️ Factura ${factura.numero} — Vía judicial`,
          body: `${cliente?.nombre ?? 'Cliente'} · ${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(Number(factura.importe))} · ${dias} días vencida`,
          url: `/facturas/${factura.id}`,
        }
        fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/push/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-saldea-secret': process.env.PUSH_INTERNAL_SECRET ?? '',
          },
          body: JSON.stringify(pushPayload),
        }).catch(() => {/* no bloquear el cron si falla el push */})

        marcadas++
      } catch (e) {
        console.error(`Error procesando factura ${factura.id} para vía judicial:`, e)
        errores++
      }
    }
  }

  return NextResponse.json({ procesadas: configs.length, marcadas, errores })
}
