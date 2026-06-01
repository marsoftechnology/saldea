import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo cobrar una deuda antigua de hace meses o años | Saldea',
  description: 'Estrategias para reactivar y cobrar facturas vencidas hace meses. Prescripción, monitorio y cuándo soltar.',
  alternates: { canonical: 'https://marsof.es/blog/como-cobrar-deuda-antigua' },
  keywords: ['cobrar deuda antigua', 'reclamar factura meses', 'cobrar después tiempo', 'cobrar después años'],
  openGraph: { title: 'Cómo cobrar una deuda antigua', description: 'Reactivar facturas vencidas.', type: 'article', locale: 'es_ES' },
}

export default function Page() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso especial · 5 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cómo cobrar una deuda antigua</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Esa factura de hace 6 meses, 1 año o 3 años que sigue sin cobrar. ¿Vale la pena reactivarla? Sí, si haces estos pasos.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Lo primero: ¿ha prescrito?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Las deudas comerciales prescriben a los <strong>5 años</strong> según el Código Civil (Art. 1964). Si tu factura tiene menos de 5 años, todavía puedes reclamar.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Importante:</strong> cualquier reclamación (email, burofax, conversación) "interrumpe la prescripción" y reinicia el contador. Si llevas 4 años reclamando, sigues teniendo derecho.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Reactivar la conversación</h2>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Hola [nombre], retomo contacto sobre la factura [X] del [fecha]. Ha pasado tiempo pero la deuda sigue siendo válida. Calculados los intereses Ley 3/2004 desde el vencimiento ([Y] días) + 40€ de indemnización: total adeudado [Z]€. ¿Cuándo podemos cerrarlo?"</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El truco de los intereses acumulados</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Una factura antigua tiene MUCHOS intereses devengados. Ejemplo:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>Factura 5.000€ vencida hace 1 año: <strong>+625€ intereses + 40€ = 5.665€</strong></li>
            <li>Factura 5.000€ vencida hace 2 años: <strong>+1.250€ intereses + 40€ = 6.290€</strong></li>
            <li>Factura 5.000€ vencida hace 3 años: <strong>+1.875€ intereses + 40€ = 6.915€</strong></li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Comunícalo al cliente. A muchos les sorprende y prefieren pagar lo original antes de que crezcan más.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Opciones por antigüedad</h2>
          <ul className="space-y-3 text-zinc-300 mb-6">
            <li><strong>1-6 meses:</strong> emails escalados + burofax + monitorio. Procedimiento estándar.</li>
            <li><strong>6-12 meses:</strong> burofax inmediato + monitorio en paralelo.</li>
            <li><strong>1-3 años:</strong> directo a monitorio. Empresa especializada de recobros si la deuda es grande.</li>
            <li><strong>3-5 años:</strong> última oportunidad. Monitorio urgente.</li>
            <li><strong>+5 años:</strong> prescrita. Sólo si has interrumpido la prescripción con reclamaciones.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo soltar</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Suelta si:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✗ Cliente entró en concurso y eres acreedor menor</li>
            <li>✗ Cliente desapareció sin localizar</li>
            <li>✗ La deuda es &lt; 500€ y el monitorio te costaría tiempo igual</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Apunta como gasto fiscal "crédito incobrable" y olvídate. Mejor para tu salud mental.</p>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea calcula intereses acumulados automáticamente</h3>
          <p className="text-zinc-300 mb-5">Carga la factura antigua, indica fecha vencimiento. Saldea calcula intereses + 40€ y genera el email de reclamación. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
