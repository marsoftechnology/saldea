import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo calcular los intereses de demora de una factura impagada (2026) | Marsof',
  description: 'Fórmula exacta para calcular los intereses de demora según Ley 3/2004 con ejemplos reales y tipo de interés actualizado a 2026.',
  alternates: { canonical: 'https://www.marsof.es/blog/calcular-intereses-demora-factura-impagada' },
  keywords: [
    'calcular intereses demora',
    'intereses de demora factura',
    'tipo interés demora 2026',
    'fórmula intereses morosidad',
    'cuánto cobrar intereses moroso',
    'ley 3/2004 intereses',
  ],
  openGraph: {
    title: 'Cómo calcular los intereses de demora de una factura impagada',
    description: 'Fórmula, tipo actualizado 2026 y ejemplos prácticos.',
    type: 'article',
    locale: 'es_ES',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo calcular los intereses de demora de una factura impagada',
  totalTime: 'PT5M',
  step: [
    { '@type': 'HowToStep', name: 'Conocer el tipo legal', text: 'Tipo BCE más 8 puntos porcentuales (~12,5% en 2026).' },
    { '@type': 'HowToStep', name: 'Calcular días vencidos', text: 'Días desde el vencimiento hasta hoy.' },
    { '@type': 'HowToStep', name: 'Aplicar la fórmula', text: 'Principal × tipo anual × (días / 365).' },
    { '@type': 'HowToStep', name: 'Sumar 40€ de indemnización', text: 'Indemnización legal automática por factura impagada.' },
  ],
}

export default function PageIntereses() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
          <header className="mb-10">
            <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Cálculos legales · 5 min</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cómo calcular los intereses de demora de una factura impagada</h1>
            <p className="text-zinc-400 text-lg leading-relaxed">Fórmula sencilla, tipo de interés actualizado y ejemplos reales para que reclames el dinero exacto que te corresponde.</p>
          </header>

          <section className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El tipo legal de interés de demora en 2026</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Según la <strong>Ley 3/2004</strong>, el tipo de interés de demora es el <strong>tipo de interés del BCE más 8 puntos porcentuales</strong>. Se publica cada semestre en el BOE.</p>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
              <p className="text-zinc-200 mb-2"><strong>Tipo aplicable 1er semestre 2026:</strong></p>
              <p className="text-3xl font-bold text-sky-400">12,5% anual</p>
              <p className="text-xs text-zinc-500 mt-2">(Tipo BCE 4,5% + 8 puntos)</p>
            </div>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">La fórmula exacta</h2>
            <div className="bg-sky-500/5 border border-sky-500/30 rounded-xl p-5 my-5 text-center">
              <p className="text-xl font-bold text-zinc-100">Intereses = Principal × Tipo × (Días vencidos / 365)</p>
            </div>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Ejemplo 1 — Factura de 1.000€ vencida 30 días</h2>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-4">
              <p className="text-zinc-300 text-sm">1.000 × 0,125 × (30/365) = <strong className="text-sky-400">10,27€ de intereses</strong></p>
              <p className="text-zinc-400 text-xs mt-2">+ 40€ de indemnización por costes de cobro</p>
              <p className="text-zinc-100 font-bold mt-2">Total a reclamar: 1.050,27€</p>
            </div>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Ejemplo 2 — Factura de 5.000€ vencida 90 días</h2>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-4">
              <p className="text-zinc-300 text-sm">5.000 × 0,125 × (90/365) = <strong className="text-sky-400">154,11€ de intereses</strong></p>
              <p className="text-zinc-400 text-xs mt-2">+ 40€ de indemnización por costes de cobro</p>
              <p className="text-zinc-100 font-bold mt-2">Total a reclamar: 5.194,11€</p>
            </div>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Ejemplo 3 — Factura de 15.000€ vencida 6 meses</h2>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-4">
              <p className="text-zinc-300 text-sm">15.000 × 0,125 × (180/365) = <strong className="text-sky-400">924,66€ de intereses</strong></p>
              <p className="text-zinc-400 text-xs mt-2">+ 40€ de indemnización por costes de cobro</p>
              <p className="text-zinc-100 font-bold mt-2">Total a reclamar: 15.964,66€</p>
            </div>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Tabla rápida de intereses (tipo 12,5%)</h2>
            <div className="overflow-x-auto my-5">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-sky-500/20">
                    <th className="py-3 px-4 text-left text-zinc-100">Principal</th>
                    <th className="py-3 px-4 text-left text-zinc-100">30 días</th>
                    <th className="py-3 px-4 text-left text-zinc-100">60 días</th>
                    <th className="py-3 px-4 text-left text-zinc-100">90 días</th>
                    <th className="py-3 px-4 text-left text-zinc-100">180 días</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10"><td className="py-2 px-4">500€</td><td className="py-2 px-4">5,14€</td><td className="py-2 px-4">10,27€</td><td className="py-2 px-4">15,41€</td><td className="py-2 px-4">30,82€</td></tr>
                  <tr className="border-b border-white/10"><td className="py-2 px-4">1.000€</td><td className="py-2 px-4">10,27€</td><td className="py-2 px-4">20,55€</td><td className="py-2 px-4">30,82€</td><td className="py-2 px-4">61,64€</td></tr>
                  <tr className="border-b border-white/10"><td className="py-2 px-4">3.000€</td><td className="py-2 px-4">30,82€</td><td className="py-2 px-4">61,64€</td><td className="py-2 px-4">92,47€</td><td className="py-2 px-4">184,93€</td></tr>
                  <tr className="border-b border-white/10"><td className="py-2 px-4">5.000€</td><td className="py-2 px-4">51,37€</td><td className="py-2 px-4">102,74€</td><td className="py-2 px-4">154,11€</td><td className="py-2 px-4">308,22€</td></tr>
                  <tr className="border-b border-white/10"><td className="py-2 px-4">10.000€</td><td className="py-2 px-4">102,74€</td><td className="py-2 px-4">205,48€</td><td className="py-2 px-4">308,22€</td><td className="py-2 px-4">616,44€</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Hay que reclamar los intereses expresamente?</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">El <strong>derecho a cobrar intereses es automático</strong>: no necesitas requerimiento previo. Pero para cobrarlos efectivamente, sí debes <strong>cuantificarlos e incluirlos</strong> en la reclamación (email firme, burofax o demanda).</p>
          </section>

          <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea calcula los intereses automáticamente</h3>
            <p className="text-zinc-300 mb-5">Cada email que manda Saldea incluye el importe principal, los intereses de demora actualizados y los 40€ de indemnización. Sin que tú toques una calculadora. <strong>30 días gratis.</strong></p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
          </aside>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-xs text-zinc-500">El tipo legal puede variar cada semestre. Consulta el BOE o tu asesor para valores actualizados.</p>
          </div>
        </div>
      </article>
    </>
  )
}

