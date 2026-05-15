import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getUserPlan } from '@/lib/plan'

interface FilaCSV {
  nombre: string
  email: string
  empresa?: string
  factura_numero: string
  importe: string
  fecha_vencimiento: string
  descripcion?: string
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    // La importación masiva solo está disponible en plan Pro
    const plan = await getUserPlan(user.id, supabase)
    if (plan !== 'pro') {
      return NextResponse.json({
        error: 'La importación masiva está disponible en el plan Pro. Sube de plan desde Ajustes para usarla.',
        codigo: 'PLAN_REQUERIDO',
      }, { status: 403 })
    }

    const { filas }: { filas: FilaCSV[] } = await req.json()

    if (!filas || filas.length === 0) {
      return NextResponse.json({ error: 'Sin datos' }, { status: 400 })
    }

    let importadas = 0
    const errores: string[] = []

    for (const fila of filas) {
      try {
        if (!fila.nombre || !fila.email || !fila.factura_numero || !fila.importe || !fila.fecha_vencimiento) {
          errores.push(`Fila "${fila.factura_numero || '?'}": faltan campos obligatorios`)
          continue
        }

        const importe = parseFloat(fila.importe.replace(',', '.'))
        if (isNaN(importe) || importe <= 0) {
          errores.push(`Fila "${fila.factura_numero}": importe inválido`)
          continue
        }

        // Normalizar fecha: acepta YYYY-MM-DD, DD/MM/YYYY, DD-MM-YYYY
        let fechaNorm = fila.fecha_vencimiento.trim()
        if (/^\d{2}[\/\-]\d{2}[\/\-]\d{4}$/.test(fechaNorm)) {
          const [d, m, y] = fechaNorm.split(/[\/\-]/)
          fechaNorm = `${y}-${m}-${d}`
        }
        if (isNaN(new Date(fechaNorm).getTime())) {
          errores.push(`Fila "${fila.factura_numero}": fecha inválida (usa AAAA-MM-DD o DD/MM/AAAA)`)
          continue
        }
        fila.fecha_vencimiento = fechaNorm

        // Buscar o crear cliente
        const { data: clienteExistente } = await supabase
          .from('clientes')
          .select('id')
          .eq('user_id', user.id)
          .eq('email', fila.email.trim())
          .single()

        let clienteId: string

        if (clienteExistente) {
          clienteId = clienteExistente.id
        } else {
          const { data: nuevoCliente, error: errCliente } = await supabase
            .from('clientes')
            .insert({
              user_id: user.id,
              nombre: fila.nombre.trim(),
              email: fila.email.trim(),
              empresa: fila.empresa?.trim() || null,
            })
            .select('id')
            .single()

          if (errCliente || !nuevoCliente) {
            errores.push(`Fila "${fila.factura_numero}": error creando cliente`)
            continue
          }
          clienteId = nuevoCliente.id
        }

        // Calcular estado según fecha de vencimiento
        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)
        const fechaVenc = new Date(fila.fecha_vencimiento.trim())
        fechaVenc.setHours(0, 0, 0, 0)
        const estadoCalculado = fechaVenc < hoy ? 'vencida' : 'pendiente'

        // Crear factura
        const { data: factura, error: errFactura } = await supabase
          .from('facturas')
          .insert({
            user_id: user.id,
            cliente_id: clienteId,
            numero: fila.factura_numero.trim(),
            importe,
            fecha_vencimiento: fila.fecha_vencimiento.trim(),
            descripcion: fila.descripcion?.trim() || null,
            estado: estadoCalculado,
          })
          .select('id')
          .single()

        if (errFactura || !factura) {
          errores.push(`Fila "${fila.factura_numero}": error creando factura`)
          continue
        }

        // Crear recordatorios automáticos
        await supabase.from('recordatorios').insert([
          { factura_id: factura.id, dias_offset: 7, tono: 'amigable', enviado: false },
          { factura_id: factura.id, dias_offset: 15, tono: 'firme', enviado: false },
          { factura_id: factura.id, dias_offset: 30, tono: 'formal', enviado: false },
        ])

        importadas++
      } catch {
        errores.push(`Fila "${fila.factura_numero || '?'}": error inesperado`)
      }
    }

    return NextResponse.json({ importadas, errores, total: filas.length })
  } catch (error) {
    console.error('Error en importar:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
