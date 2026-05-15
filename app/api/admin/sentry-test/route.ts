// Endpoint privado para verificar que Sentry recibe errores correctamente.
// Solo accesible con sesión admin para evitar que cualquiera lo lance.
//
// Llamadas:
//   GET /api/admin/sentry-test               → lanza un error de servidor
//   GET /api/admin/sentry-test?tipo=mensaje  → manda un mensaje (no error)
//   GET /api/admin/sentry-test?tipo=async    → error en una promesa rechazada

import { NextResponse } from 'next/server'
import * as Sentry from '@sentry/nextjs'
import { adminSesionActiva } from '@/lib/admin-auth'

export async function GET(req: Request) {
  const ok = await adminSesionActiva()
  if (!ok) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const url = new URL(req.url)
  const tipo = url.searchParams.get('tipo') ?? 'error'

  if (tipo === 'mensaje') {
    Sentry.captureMessage('Test message desde /api/admin/sentry-test', 'info')
    return NextResponse.json({ ok: true, accion: 'mensaje enviado a Sentry' })
  }

  if (tipo === 'async') {
    // Promesa rechazada no esperada
    Promise.reject(new Error('Async test error · /api/admin/sentry-test'))
    return NextResponse.json({ ok: true, accion: 'promesa rechazada enviada' })
  }

  // Por defecto: lanza un error síncrono que Sentry capturará vía onRequestError
  throw new Error('Test error desde /api/admin/sentry-test')
}
