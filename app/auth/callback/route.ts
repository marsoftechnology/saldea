import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Ruta de callback de Supabase Auth (flujo PKCE).
 *
 * Supabase redirige aquí después de que el usuario hace clic en un enlace de:
 *   - Confirmación de registro
 *   - Recuperación de contraseña
 *   - Magic link
 *   - Cambio de email
 *
 * URL esperada: /auth/callback?code=xxx&next=/ruta-destino
 *
 * 1. Intercambia el code por una sesión (supabase.auth.exchangeCodeForSession)
 * 2. Redirige al usuario a `next` (por defecto /dashboard)
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Redirigir a la ruta destino (ej: /restablecer para recovery)
      return NextResponse.redirect(`${origin}${next}`)
    }

    console.error('[auth/callback] Error intercambiando código:', error.message)
  }

  // Si falta el código o hubo error, redirigir al login con aviso
  return NextResponse.redirect(`${origin}/login?error=link_expirado`)
}
