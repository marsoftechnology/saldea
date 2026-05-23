import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Rutas protegidas: requieren sesión activa.
 * Coincide con el grupo (dashboard) de Next.js.
 */
const RUTAS_PROTEGIDAS = [
  '/dashboard',
  '/facturas',
  '/clientes',
  '/analytics',
  '/importar',
  '/equipo',
  '/ajustes',
  '/bienvenida',
  '/pago-completado',
]

/**
 * Rutas permitidas cuando se accede desde el subdominio app.*
 * (app.saldea.com o app.marsof.es). Todo lo demás redirige al dashboard.
 */
const RUTAS_APP = [
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
  '/aceptar-invitacion',
  '/cobrado',
  '/api',
]

/**
 * Middleware de Supabase SSR.
 * 1. Refresca el access token en cada request (evita caducidad de sesión).
 * 2. Redirige a /login si el usuario no está autenticado e intenta acceder
 *    a una ruta protegida del dashboard.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = request.headers.get('host') ?? ''

  // ── Subdominio app.* (app.saldea.com / app.marsof.es) ──────────────────────
  // En el subdominio de la app solo se sirven rutas de la aplicación.
  // Cualquier visita a rutas de marketing (/, /blog, /precios, etc.) redirige
  // al dashboard para que la experiencia sea 100% de app independiente.
  const esSubdominioApp =
    host.startsWith('app.') &&
    !host.startsWith('app.localhost') // excluir local excepto si se quiere probar

  if (esSubdominioApp) {
    const esRutaApp = RUTAS_APP.some(
      r => pathname === r || pathname.startsWith(r + '/')
    )
    const esRecursoEstatico =
      pathname.startsWith('/_next') ||
      pathname.startsWith('/images') ||
      pathname.startsWith('/monitoring') ||
      /\.\w+$/.test(pathname) // archivos con extensión

    if (!esRutaApp && !esRecursoEstatico) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url, { status: 302 })
    }
  }

  // ── Fallback de auth: si llega un ?code=xxx a la raíz o a rutas no-auth,
  // significa que Supabase cayó al Site URL en vez de respetar el redirectTo.
  // Lo redirigimos al callback correcto para recuperar contraseña.
  const codeParam = request.nextUrl.searchParams.get('code')
  const isAuthCallback = request.nextUrl.pathname.startsWith('/auth/')
  if (codeParam && !isAuthCallback) {
    const callbackUrl = request.nextUrl.clone()
    callbackUrl.pathname = '/auth/callback'
    callbackUrl.searchParams.set('next', '/restablecer')
    return NextResponse.redirect(callbackUrl)
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Propagar cookies nuevas tanto al request como al response
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANTE: No añadir lógica entre createServerClient y getUser().
  // getUser() refresca el token si ha expirado y escribe las nuevas cookies.
  const { data: { user } } = await supabase.auth.getUser()

  // Redirigir a /login si el usuario no está autenticado y accede a ruta protegida
  const esRutaProtegida = RUTAS_PROTEGIDAS.some(
    ruta => pathname === ruta || pathname.startsWith(ruta + '/')
  )

  if (esRutaProtegida && !user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    return NextResponse.redirect(loginUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Ejecutar en todas las rutas excepto:
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico, robots.txt, sitemap.xml
     * - archivos con extensión (imágenes, fuentes, etc.)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)',
  ],
}
