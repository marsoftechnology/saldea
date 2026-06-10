import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)

    return NextResponse.json({
      ok: true,
      message: 'Visita registrada',
      received: body,
    })
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: 'Error registrando visita',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: 'Endpoint de visitas activo',
  })
}
