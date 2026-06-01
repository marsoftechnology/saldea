import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '¿Merece la pena cobrar deudas pequeñas? Análisis y opciones | Saldea',
  description: 'Cuánto cuesta realmente reclamar una deuda de 100€, 300€ o 500€. Cuándo merece la pena y cuándo asumirlo como gasto.',
  alternates: { canonical: 'https://marsof.es/blog/cobrar-pequenas-cantidades' },
  keywords: ['cobrar pequeñas cantidades', 'reclamar deuda pequeña', 'merece pena cobrar poco', 'monitorio importes bajos'],
  openGraph: { title: '¿Merece la pena cobrar deudas pequeñas?', description: 'Análisis y opciones.', type: 'article', locale: 'es_ES' },
}

export default function Page() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso específico · 4 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">¿Merece la pena cobrar deudas pequeñas?</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">100€, 300€, 500€... A veces el coste de reclamar supera lo que recuperarías. Análisis honesto.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Coste real de reclamar</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-sky-500/20"><th className="py-3 px-4 text-left text-zinc-100">Acción</th><th className="py-3 px-4 text-left text-zinc-100">Coste directo</th><th className="py-3 px-4 text-left text-zinc-100">Tu tiempo</th></tr></thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Emails de recordatorio</td><td className="py-2 px-4">0€</td><td className="py-2 px-4">30 min</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Llamada telefónica</td><td className="py-2 px-4">0€</td><td className="py-2 px-4">15 min</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Burofax</td><td className="py-2 px-4">35€</td><td className="py-2 px-4">30 min</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Monitorio &lt;2.000€</td><td className="py-2 px-4">0€</td><td className="py-2 px-4">3-5 h</td></tr>
                <tr><td className="py-2 px-4">Monitorio &gt;2.000€ con abogado</td><td className="py-2 px-4">300-800€</td><td className="py-2 px-4">2-3 h</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Decisión por importe</h2>
          <ul className="space-y-3 text-zinc-300 mb-6">
            <li><strong>&lt;100€:</strong> automatiza los emails. Si tras 60 días no paga, asume como gasto. No merece tu tiempo más.</li>
            <li><strong>100-500€:</strong> emails escalados + burofax. Si tras burofax no paga, asume.</li>
            <li><strong>500-2.000€:</strong> proceso completo incluido monitorio. Sin abogado.</li>
            <li><strong>&gt;2.000€:</strong> proceso completo + abogado. Cualquier impago de esta cuantía merece atención.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El truco psicológico de los 40€</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Recuerda: la Ley 3/2004 te da 40€ AUTOMÁTICOS por cada factura impagada. Es lo MISMO si la factura era de 50€ o de 50.000€.</p>
          <p className="text-zinc-300 leading-relaxed mb-4">Una factura de 100€ vencida hace 60 días vale: 100 + 2 + 40 = <strong>142€</strong>. El 42% son intereses y compensación. Reclamar PEQUEÑAS cantidades vale más de lo que parece.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Estrategia: bundle de pequeñas deudas</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si tienes 10 facturas pequeñas impagadas del mismo cliente: súmalas y trátalas como una sola reclamación. El cliente verá el total y reaccionará.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">La mejor estrategia: automatizar</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si reclamar a mano cuesta tu tiempo, una herramienta automatizada cambia la ecuación. Vale la pena reclamar HASTA pequeñas cantidades porque tu inversión es solo la suscripción mensual.</p>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea reclama pequeñas cantidades sin coste extra</h3>
          <p className="text-zinc-300 mb-5">Suscripción fija 49€/mes. Reclama 1 factura o 100. Mismo coste. Recupera deudas que antes asumías como pérdida. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
