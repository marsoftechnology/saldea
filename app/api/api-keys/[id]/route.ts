import { NextRequest, NextResponse } from 'next/server'
import { requireOrg } from '@/lib/auth-org'
import { createServerSupabaseClient } from '@/lib/supabase-server'

// DELETE /api/api-keys/:id — desactiva (revoca) la key
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const orgOrError = await requireOrg(['owner'])
  if ('error' in orgOrError) return orgOrError.error

  const supabase = await createServerSupabaseClient()

  // Verificar que la key pertenece a esta org antes de modificar
  const { data: existente } = await supabase
    .from('api_keys')
    .select('id')
    .eq('id', id)
    .eq('org_id', orgOrError.org_id)
    .maybeSingle()

  if (!existente) {
    return NextResponse.json({ error: 'API key no encontrada' }, { status: 404 })
  }

  const { error } = await supabase
    .from('api_keys')
    .update({ active: false })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
