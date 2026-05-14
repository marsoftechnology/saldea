'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import { Logo } from '@/app/components/Logo'

const navegacion = [
  { href: '/dashboard', label: 'Inicio', icono: '📊' },
  { href: '/facturas', label: 'Facturas', icono: '📄' },
  { href: '/clientes', label: 'Clientes', icono: '👥' },
  { href: '/analytics', label: 'Informes', icono: '📈' },
  { href: '/importar', label: 'Importar CSV', icono: '📥' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [usuario, setUsuario] = useState<{ nombre: string; empresa: string } | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUsuario({
          nombre: user.user_metadata?.nombre || user.email?.split('@')[0] || '',
          empresa: user.user_metadata?.empresa || '',
        })
      }
    })
  }, [pathname])

  async function cerrarSesion() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const displayName = usuario?.empresa?.trim() || usuario?.nombre?.trim() || '...'

  return (
    <div className="flex h-screen bg-[#0a0a0b] text-zinc-100">
      {/* Decoración de fondo sutil */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-30%] left-[20%] w-[600px] h-[600px] rounded-full bg-emerald-500/[0.06] blur-3xl" />
        <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] rounded-full bg-emerald-600/[0.04] blur-3xl" />
      </div>

      {/* Sidebar */}
      <aside className="w-60 bg-zinc-950/80 backdrop-blur-xl border-r border-white/5 flex flex-col">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <Logo variant="mark" size="sm" href="/" />
            <div className="flex flex-col leading-none gap-0.5 min-w-0">
              <span className="text-lg font-bold bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">Saldea</span>
              <span className="text-[9px] text-zinc-600 uppercase tracking-wider font-semibold">by Marsof</span>
            </div>
          </div>
          {usuario && (
            <p className="text-xs text-zinc-500 mt-3 truncate" title={displayName}>
              {displayName}
            </p>
          )}
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navegacion.map(item => {
            const activo = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  activo
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                    : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100 border border-transparent'
                )}
              >
                <span>{item.icono}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-white/5 space-y-1">
          <Link
            href="/ajustes"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full',
              pathname === '/ajustes'
                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100 border border-transparent'
            )}
          >
            <span>⚙️</span>
            Ajustes
          </Link>
          <button
            onClick={cerrarSesion}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100 w-full transition-colors"
          >
            <span>🚪</span>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
