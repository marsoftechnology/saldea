'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import { Logo } from '@/app/components/Logo'
import OrgSwitcher from './OrgSwitcher'
import ThemeToggle from './ThemeToggle'
import TrialPaywall from './TrialPaywall'
import TrialBanner from '@/app/components/TrialBanner'
import InstallPrompt from '@/app/components/InstallPrompt'

type TrialStatus = {
  plan: 'free' | 'pro'
  trialExpired: boolean
  trialDaysRemaining: number | null
}

type OnboardingStatus = { completado: boolean }

const navegacion = [
  { href: '/dashboard', label: 'Inicio', icono: '📊' },
  { href: '/facturas', label: 'Facturas', icono: '📄' },
  { href: '/clientes', label: 'Clientes', icono: '👥' },
  { href: '/analytics', label: 'Informes', icono: '📈' },
  { href: '/banco', label: 'Banco', icono: '🏦' },
  { href: '/importar', label: 'Importar CSV', icono: '📥' },
  { href: '/equipo', label: 'Equipo', icono: '🤝' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [trial, setTrial] = useState<TrialStatus | null>(null)
  const [onboarding, setOnboarding] = useState<OnboardingStatus | null>(null)

  // Cerrar el menú al cambiar de ruta (mobile UX)
  useEffect(() => {
    setMenuAbierto(false)
  }, [pathname])

  // Cargar estado del trial
  useEffect(() => {
    fetch('/api/trial')
      .then(r => r.ok ? r.json() : null)
      .then(d => d && setTrial(d))
      .catch(() => {})
  }, [])

  // Comprobar onboarding — redirigir a /bienvenida si no está completado
  useEffect(() => {
    fetch('/api/onboarding/estado')
      .then(r => r.ok ? r.json() : { completado: true })
      .then((d: OnboardingStatus) => {
        setOnboarding(d)
        if (!d.completado) {
          router.push('/bienvenida')
        }
      })
      .catch(() => setOnboarding({ completado: true }))
  }, [router])

  async function cerrarSesion() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  // Buscar el label activo para el header mobile
  const itemActivo = [...navegacion, { href: '/ajustes', label: 'Ajustes', icono: '⚙️' }]
    .find(item => pathname === item.href || pathname.startsWith(item.href + '/'))

  return (
    <div className="flex h-screen bg-[#0a0a0b] text-zinc-100">
      {/* Decoración de fondo sutil */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-30%] left-[20%] w-[600px] h-[600px] rounded-full bg-sky-500/[0.06] blur-3xl" />
        <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] rounded-full bg-sky-600/[0.04] blur-3xl" />
      </div>

      {/* Mobile header (visible <md) */}
      <header className="md:hidden fixed top-0 inset-x-0 h-14 bg-zinc-950/95 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 z-30">
        <button
          onClick={() => setMenuAbierto(true)}
          aria-label="Abrir menú"
          className="p-2 -ml-2 text-zinc-300 hover:text-zinc-100 rounded-lg hover:bg-white/[0.05] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-200">
          {itemActivo && <span>{itemActivo.icono}</span>}
          <span>{itemActivo?.label ?? 'Saldea'}</span>
        </div>
        <div className="w-10" />
      </header>

      {/* Backdrop mobile cuando menú abierto */}
      {menuAbierto && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMenuAbierto(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar — overlay en mobile, fija en desktop */}
      <aside
        className={cn(
          'bg-zinc-950/95 backdrop-blur-xl border-r border-white/5 flex flex-col z-50 transition-transform',
          'fixed md:static inset-y-0 left-0 w-64 md:w-60',
          menuAbierto ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
      >
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Logo variant="mark" size="sm" href="/" />
              <div className="flex flex-col leading-none gap-0.5 min-w-0">
                <span className="text-lg font-bold bg-gradient-to-r from-sky-300 to-sky-500 bg-clip-text text-transparent">Saldea</span>
                <span className="text-[9px] text-zinc-600 uppercase tracking-wider font-semibold">by Marsof</span>
              </div>
            </div>
            <button
              onClick={() => setMenuAbierto(false)}
              aria-label="Cerrar menú"
              className="md:hidden p-2 -mr-2 text-zinc-400 hover:text-zinc-100 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Switcher de organización */}
          <OrgSwitcher />
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navegacion.map(item => {
            const activo = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  activo
                    ? 'bg-sky-500/10 text-sky-300 border border-sky-500/20'
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
                ? 'bg-sky-500/10 text-sky-300 border border-sky-500/20'
                : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100 border border-transparent'
            )}
          >
            <span>⚙️</span>
            Ajustes
          </Link>
          <ThemeToggle />
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
      <main className="flex-1 overflow-y-auto pt-14 md:pt-0">
        {children}
      </main>

      {/* Paywall obligatorio cuando el trial ha expirado */}
      {trial?.trialExpired && <TrialPaywall />}

      {/* Banner flotante y arrastrable durante el trial */}
      {trial?.plan === 'free' && !trial.trialExpired && trial.trialDaysRemaining !== null && (
        <TrialBanner diasRestantes={trial.trialDaysRemaining} />
      )}

      {/* Pantalla de carga mientras verificamos onboarding (evita flash) */}
      {onboarding === null && (
        <div className="fixed inset-0 bg-[#0a0a0b]/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Banner de instalación PWA en móvil */}
      <InstallPrompt />
    </div>
  )
}
