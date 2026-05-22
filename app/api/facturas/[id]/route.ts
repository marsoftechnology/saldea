import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getActiveOrg } from '@/lib/auth-org'

// DELETE /api/facturas/:id — elimina una factura (y por CASCADE sus pagos/recordatorios/logs)
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (org.role === 'readonly') {
    return NextResponse.json({ error: 'Tu rol no permite borrar facturas' }, { status: 403 })
  }

  const supabase = await createServerSupabaseClient()

  // Verificar pertenencia a la org antes de borrar
  const { data: factura } = await supabase
    .from('facturas')
    .select('id')
    .eq('id', id)
    .eq('org_id', org.org_id)
    .maybeSingle()

  if (!factura) {
    return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 })
  }

  const { error } = await supabase.from('facturas').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
