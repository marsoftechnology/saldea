import Link from 'next/link'
import { Logo } from '@/app/components/Logo'

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 antialiased">
      {/* Decoración de fondo sutil */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-sky-500/5 blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo variant="inline" size="xs" href="/" />
          <div className="flex items-center gap-6 text-sm">
            <Link href="/legal/terminos" className="text-zinc-400 hover:text-zinc-200 transition-colors">Términos</Link>
            <Link href="/legal/privacidad" className="text-zinc-400 hover:text-zinc-200 transition-colors">Privacidad</Link>
            <Link href="/legal/cookies" className="text-zinc-400 hover:text-zinc-200 transition-colors">Cookies</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        {children}
      </main>

      <footer className="border-t border-white/5 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Carlos Gálvez Carrillo · Marsof Technology. Hecho en España.</p>
        </div>
      </footer>
    </div>
  )
}
