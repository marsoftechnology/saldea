import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { generarCSV, csvResponse } from '@/lib/csv'

function isoHoy(): string {
  return new Date().toISOString().slice(0, 10)
}

export async function GET() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { data: facturas, error } = await supabase
    .from('facturas')
    .select('numero, importe, fecha_vencimiento, estado, descripcion, created_at, link_pago, notas_internas, cliente:clientes(nombre, email, empresa, telefono)')
    .eq('user_id', user.id)
    .order('fecha_vencimiento', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const filas = (facturas ?? []).map(f => {
    // Supabase devuelve cliente como objeto cuando hay foreign key
    const c = (f.cliente ?? {}) as { nombre?: string; email?: string; empresa?: string; telefono?: string }
    return {
      numero_factura: f.numero,
      cliente: c.nombre ?? '',
      empresa: c.empresa ?? '',
      email_cliente: c.email ?? '',
      telefono_cliente: c.telefono ?? '',
      importe_eur: Number(f.importe).toFixed(2).replace('.', ','), // formato español
      fecha_vencimiento: f.fecha_vencimiento,
      estado: f.estado,
      descripcion: f.descripcion ?? '',
      link_pago: f.link_pago ?? '',
      notas_internas: f.notas_internas ?? '',
      fecha_creacion: f.created_at?.slice(0, 10) ?? '',
    }
  })

  const csv = generarCSV(filas)
  return csvResponse(csv, `saldea_facturas_${isoHoy()}.csv`)
}
