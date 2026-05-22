import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Ruta de callback de Supabase Auth (flujo PKCE).
 *
 * IMPORTANTE: las cookies de sesión deben adjuntarse directamente
 * a la respuesta redirect — no usar cookies() de next/headers aquí,
 * o se pierden en la redirección.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    // Creamos la respuesta de redirect ANTES de llamar a supabase,
    // para poder inyectar las cookies de sesión directamente en ella.
    const response = NextResponse.redirect(`${origin}${next}`)

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            // Escribir las cookies de sesión en el redirect response
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return response
    }

    console.error('[auth/callback] Error intercambiando código:', error.message)
  }

  // Sin código o con error → login con aviso
  return NextResponse.redirect(`${origin}/login?error=link_expirado`)
}
