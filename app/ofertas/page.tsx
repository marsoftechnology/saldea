import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'
import { Logo } from '../components/Logo'

export const metadata: Metadata = {
  title: 'Trabaja con nosotros — Marsof Technology',
  description: 'Únete a Marsof Technology. Buscamos cofundador/a técnico apasionado por construir micro-SaaS con IA para autónomos y pymes españolas.',
  alternates: { canonical: 'https://marsof.es/ofertas' },
  openGraph: {
    title: 'Trabaja con nosotros — Marsof Technology',
    description: 'Buscamos cofundador/a técnico para crecer juntos.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'Marsof Technology',
  },
}

const OFERTA = {
  titulo: 'Cofundador/a técnico',
  departamento: 'Fundación',
  tipo: 'Equity · Full-time',
  ubicacion: 'Remoto (España)',
  estado: 'abierta' as const,
  descripcion: 'Marsof construye micro-SaaS con IA para autónomos y pymes españolas. Saldea, nuestro primer producto, ya está en producción. Buscamos un cofundador técnico con mentalidad de builder y ganas de crecer desde cero.',
  stack: ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Resend', 'Vercel'],
  buscamos: [
    'Capacidad de construir y lanzar features en producción de forma autónoma',
    'Mentalidad comercial — entiendes que la tecnología es un medio, no el fin',
    'Solvencia financiera mínima de 6 meses para comprometerte sin presión',
    'Disponibilidad full-time o casi desde el inicio',
    'Experiencia previa lanzando algo, aunque no haya funcionado',
    'Tolerancia real a la incertidumbre y al caos del early stage',
  ],
  ofrecemos: [
    'Equity significativo desde el primer día, con vesting',
    'Decisiones compartidas — esto es una sociedad, no un empleo',
    'Producto real ya en producción, no una idea en un PowerPoint',
    'Stack moderno, deuda técnica mínima',
    'Libertad total para proponer, construir y romper cosas',
  ],
}

export default function OfertasPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 antialiased">

      {/* Glow de fondo */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-sky-500/8 blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo variant="mark" size="xs" href={null} />
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">Marsof</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/saldea" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors hidden sm:block">
              Ver Saldea
            </Link>
            <Link
              href="/encuesta"
              className="bg-white text-zinc-900 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              Aplicar ahora →
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16 sm:py-24">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-600 mb-12">
          <Link href="/" className="hover:text-zinc-400 transition-colors">Marsof</Link>
          <span>/</span>
          <span className="text-zinc-400">Trabaja con nosotros</span>
        </div>

        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            1 posición abierta
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Trabaja con nosotros
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Somos un equipo pequeño construyendo software útil para negocios reales en España.
            Si te motiva crear, lanzar y crecer — este es tu sitio.
          </p>
        </div>

        {/* Oferta */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden mb-8">

          {/* Header de la oferta */}
          <div className="p-8 border-b border-white/6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-full">
                    {OFERTA.departamento}
                  </span>
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    Abierta
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{OFERTA.titulo}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {OFERTA.ubicacion}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {OFERTA.tipo}
                  </span>
                </div>
              </div>
              <Link
                href="/encuesta"
                className="shrink-0 inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-zinc-100 transition-all hover:-translate-y-0.5 shadow-lg shadow-white/10"
              >
                Aplicar ahora
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>

          {/* Cuerpo de la oferta */}
          <div className="p-8 grid sm:grid-cols-2 gap-10">

            {/* Descripción + qué buscamos */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">El proyecto</h3>
                <p className="text-zinc-300 text-sm leading-relaxed">{OFERTA.descripcion}</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Stack actual</h3>
                <div className="flex flex-wrap gap-2">
                  {OFERTA.stack.map(tech => (
                    <span key={tech} className="text-xs font-medium text-zinc-300 bg-white/5 border border-white/8 px-3 py-1.5 rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Qué buscamos</h3>
                <ul className="space-y-3">
                  {OFERTA.buscamos.map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                      <svg className="shrink-0 mt-0.5 text-sky-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Qué ofrecemos */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Qué ofrecemos</h3>
                <ul className="space-y-3">
                  {OFERTA.ofrecemos.map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                      <svg className="shrink-0 mt-0.5 text-emerald-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA card */}
              <div className="rounded-xl bg-gradient-to-br from-sky-500/10 to-violet-500/10 border border-sky-500/15 p-6">
                <div className="text-2xl mb-3">🚀</div>
                <h4 className="text-white font-semibold mb-2">¿Te encaja?</h4>
                <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                  Rellena la entrevista. Son 18 preguntas, ~8 minutos. Si hay encaje te contactamos en 48h.
                </p>
                <Link
                  href="/encuesta"
                  className="inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-zinc-100 transition-all"
                >
                  Hacer la entrevista →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Nota de no hay más ofertas */}
        <p className="text-center text-sm text-zinc-600">
          De momento solo hay una posición abierta. Síguenos en{' '}
          <a href="https://linkedin.com/company/marsof" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-200 transition-colors underline underline-offset-2">
            LinkedIn
          </a>{' '}
          para estar al tanto de nuevas ofertas.
        </p>

      </main>

      <MarketingFooter />
    </div>
  )
}
