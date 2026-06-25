import { NextRequest, NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase-service'

// Rutas que NUNCA se deben registrar (app interna, admin, API)
const RUTAS_EXCLUIDAS = [
  '/admin',
  '/dashboard',
  '/facturas',
  '/clientes',
  '/analytics',
  '/importar',
  '/equipo',
  '/ajustes',
  '/bienvenida',
  '/pago-completado',
  '/login',
  '/registro',
  '/recuperar',
  '/restablecer',
  '/auth',
  '/api',
  '/cobrado',
  '/aceptar-invitacion',
]

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const ruta: string = body.ruta ?? '/'
    const referrer: string | null = body.referrer ?? null

    // Validación básica
    if (typeof ruta !== 'string' || ruta.length > 500) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    // No registrar rutas internas
    const esInterna = RUTAS_EXCLUIDAS.some(
      r => ruta === r || ruta.startsWith(r + '/')
    )
    if (esInterna) {
      return NextResponse.json({ ok: false, motivo: 'ruta_interna' }, { status: 200 })
    }

    const supabase = createServiceRoleClient()
    await supabase.from('visitas_web').insert({
      ruta,
      referrer: referrer ? String(referrer).slice(0, 500) : null,
    })

    return NextResponse.json({ ok: true })
  } catch {
    // Nunca dejamos que un error de tracking rompa la app
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
