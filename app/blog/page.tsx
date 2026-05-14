import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog · Cómo cobrar mejor tus facturas | Saldea',
  description: 'Guías prácticas y plantillas para autónomos y pymes españolas: reclamar facturas, evitar morosos, automatizar cobros.',
  alternates: { canonical: 'https://marsof.es/blog' },
}

const articulos = [
  {
    slug: 'modelo-email-reclamacion-factura-impagada',
    titulo: 'Modelo de email de reclamación de factura impagada (4 plantillas 2026)',
    resumen: 'Las 4 plantillas que de verdad funcionan en España según los días de retraso. Listas para copiar, adaptadas a la Ley 3/2004 de morosidad y RGPD.',
    fecha: '2026-05-13',
    minutos: 9,
    categoria: 'Cobros · Plantillas',
  },
]

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100">
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/saldea" className="text-sm text-zinc-500 hover:text-zinc-400 transition-colors">Saldea</Link>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-100 font-semibold">Blog</span>
          </div>
          <Link
            href="/registro"
            className="bg-emerald-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-emerald-400 transition-colors"
          >
            Probar Saldea gratis
          </Link>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">Blog de Saldea</h1>
        <p className="text-xl text-zinc-400 mb-12">
          Guías prácticas para que autónomos y pymes españolas cobren antes y mejor.
        </p>

        <div className="space-y-8">
          {articulos.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="block border border-white/10 rounded-xl p-8 hover:border-emerald-500/40 transition-all"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                {a.categoria}
              </div>
              <h2 className="text-2xl font-bold text-zinc-100 mb-3 hover:text-emerald-300 transition-colors">
                {a.titulo}
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-4">{a.resumen}</p>
              <div className="text-sm text-zinc-500">
                <time dateTime={a.fecha}>13 de mayo, 2026</time> · {a.minutos} min de lectura
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-zinc-900/30 border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">¿Quieres dejar de perseguir cobros?</h3>
          <p className="text-zinc-400 mb-5">
            Saldea automatiza los recordatorios con IA. Pruébalo gratis 1 mes, sin tarjeta.
          </p>
          <Link
            href="/registro"
            className="inline-block bg-emerald-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-400 transition-colors"
          >
            Empezar gratis →
          </Link>
        </div>
      </section>
    </div>
  )
}
