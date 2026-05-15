import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

const PATRONES_VALIDOS = ['agresivo', 'normal', 'suave', 'personalizado']
const TONOS_VALIDOS = ['cordial', 'firme', 'contundente', 'extremo', 'personalizado']

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const body = await req.json()
    const updates: Record<string, unknown> = {}

    // max_recordatorios_override: int | null, entre 1 y 10
    if ('max_recordatorios_override' in body) {
      const v = body.max_recordatorios_override
      if (v === null) updates.max_recordatorios_override = null
      else if (Number.isInteger(v) && v >= 1 && v <= 10) updates.max_recordatorios_override = v
      else return NextResponse.json({ error: 'max_recordatorios_override inválido' }, { status: 400 })
    }
    // patron_dias_override
    if ('patron_dias_override' in body) {
      const v = body.patron_dias_override
      if (v === null) updates.patron_dias_override = null
      else if (typeof v === 'string' && PATRONES_VALIDOS.includes(v)) updates.patron_dias_override = v
      else return NextResponse.json({ error: 'patron_dias_override inválido' }, { status: 400 })
    }
    // dias_gracia_override: int | null, entre 0 y 30
    if ('dias_gracia_override' in body) {
      const v = body.dias_gracia_override
      if (v === null) updates.dias_gracia_override = null
      else if (Number.isInteger(v) && v >= 0 && v <= 30) updates.dias_gracia_override = v
      else return NextResponse.json({ error: 'dias_gracia_override inválido' }, { status: 400 })
    }
    // tono_preset_override
    if ('tono_preset_override' in body) {
      const v = body.tono_preset_override
      if (v === null) updates.tono_preset_override = null
      else if (typeof v === 'string' && TONOS_VALIDOS.includes(v)) updates.tono_preset_override = v
      else return NextResponse.json({ error: 'tono_preset_override inválido' }, { status: 400 })
    }
    // pausar_recordatorios
    if ('pausar_recordatorios' in body) {
      updates.pausar_recordatorios = !!body.pausar_recordatorios
    }
    // notas_cliente
    if ('notas_cliente' in body) {
      const v = body.notas_cliente
      if (v === null) updates.notas_cliente = null
      else if (typeof v === 'string') updates.notas_cliente = v.slice(0, 5000)
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ ok: true, sinCambios: true })
    }

    const { error } = await supabase
      .from('clientes')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Error en PATCH /api/clientes/[id]/preferencias:', e)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
