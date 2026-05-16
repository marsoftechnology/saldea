import Link from 'next/link'
import { Logo } from '@/app/components/Logo'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 antialiased flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.08),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8 gap-4">
          <Logo variant="mark" size="md" href="/" />
          <Link href="/" className="inline-flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-300 via-sky-400 to-sky-500 bg-clip-text text-transparent">
              Saldea
            </span>
            <span className="text-xs text-zinc-500">by Marsof</span>
          </Link>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-sky-500/20 via-white/5 to-transparent p-[1px] shadow-2xl shadow-sky-500/10">
          <div className="bg-zinc-950/90 backdrop-blur-xl rounded-2xl p-8">
            {children}
          </div>
        </div>

        <p className="text-center text-xs text-zinc-600 mt-6">
          1 mes gratis · cancela en 1 clic · sin permanencia
        </p>
      </div>
    </div>
  )
}
