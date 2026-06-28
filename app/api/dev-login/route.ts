import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

// Development-only route: sets a Supabase session via server-side cookies.
// Used by Puppeteer recording scripts to authenticate headlessly.
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  const { searchParams } = request.nextUrl
  const access_token = searchParams.get('access_token')
  const refresh_token = searchParams.get('refresh_token')

  if (!access_token || !refresh_token) {
    return NextResponse.json({ error: 'Missing access_token or refresh_token' }, { status: 400 })
  }

  const response = NextResponse.redirect(new URL('/dashboard', request.url))

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { error } = await supabase.auth.setSession({ access_token, refresh_token })
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 })
  }

  return response
}
