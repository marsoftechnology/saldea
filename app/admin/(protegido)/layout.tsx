import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { adminSesionActiva } from '@/lib/admin-auth'
import LogoutAdminButton from './LogoutAdminButton'

// Refuerzo: aunque robots.txt lo bloquea, ponemos noindex/nofollow a nivel HTML
// para que ningún buscador indexe el panel admin bajo ninguna circunstancia.
export const metadata: Metadata = {
  title: 'Marsof Admin · Panel privado',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

const nav = [
  { href: '/admin', label: 'Dashboard global', icono: '🏢' },
  { href: '/admin/ingresos', label: 'Pagos detallados', icono: '💰' },
  { href: '/admin/suscripciones', label: 'Suscripciones', icono: '🔁' },
]

const navOperativo = [
  { href: '/admin/usuarios', label: 'Usuarios', icono: '👥' },
  { href: '/admin/organizaciones', label: 'Organizaciones', icono: '🏛️' },
  { href: '/admin/facturas', label: 'Facturas de clientes', icono: '📄' },
]

export default async function AdminLayoutProtegido({ children }: { children: React.ReactNode }) {
  const ok = await adminSesionActiva()
  if (!ok) redirect('/admin/login')

  return (
    <div className="flex min-h-screen bg-[#0a0a0b] text-zinc-100">
      <aside className="w-60 bg-zinc-950/80 backdrop-blur-xl border-r border-white/5 flex flex-col">
        <div className="p-5 border-b border-white/5">
          <p className="text-sm font-bold text-amber-300">🔐 Marsof Admin</p>
          <p className="text-xs text-zinc-500 mt-1">Panel restringido</p>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100 border border-transparent transition-colors"
            >
              <span>{item.icono}</span>
              {item.label}
            </Link>
          ))}

          <div className="pt-4 mt-4 border-t border-white/5">
            <p className="text-[10px] uppercase tracking-wider text-zinc-600 px-3 mb-2">Datos operativos</p>
            {navOperativo.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300 border border-transparent transition-colors"
              >
                <span>{item.icono}</span>
                {item.label}
              </Link>
            ))}
          </div>

        </nav>

        <div className="p-3 border-t border-white/5 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100"
          >
            <span>↩</span>
            Volver a Saldea
          </Link>
          <LogoutAdminButton />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
