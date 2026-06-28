import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'C�mo cobrar una deuda antigua de hace meses o a�os | Marsof',
  description: 'Estrategias para reactivar y cobrar facturas vencidas hace meses. Prescripci�n, monitorio y cu�ndo soltar.',
  alternates: { canonical: 'https://www.marsof.es/blog/como-cobrar-deuda-antigua' },
  keywords: ['cobrar deuda antigua', 'reclamar factura meses', 'cobrar despu�s tiempo', 'cobrar despu�s a�os'],
  openGraph: { title: 'C�mo cobrar una deuda antigua', description: 'Reactivar facturas vencidas.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "C�mo cobrar una deuda antigua de hace meses o a�os", "description": "Estrategias para reactivar y cobrar facturas vencidas hace meses. Prescripci�n, monitorio y cu�ndo soltar.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/como-cobrar-deuda-antigua"}

export default function Page() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso especial � 5 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">C�mo cobrar una deuda antigua</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Esa factura de hace 6 meses, 1 a�o o 3 a�os que sigue sin cobrar. �Vale la pena reactivarla? S�, si haces estos pasos.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Lo primero: �ha prescrito?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Las deudas comerciales prescriben a los <strong>5 a�os</strong> seg�n el C�digo Civil (Art. 1964). Si tu factura tiene menos de 5 a�os, todav�a puedes reclamar.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Importante:</strong> cualquier reclamaci�n (email, burofax, conversaci�n) "interrumpe la prescripci�n" y reinicia el contador. Si llevas 4 a�os reclamando, sigues teniendo derecho.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Reactivar la conversaci�n</h2>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Hola [nombre], retomo contacto sobre la factura [X] del [fecha]. Ha pasado tiempo pero la deuda sigue siendo v�lida. Calculados los intereses Ley 3/2004 desde el vencimiento ([Y] d�as) + 40� de indemnizaci�n: total adeudado [Z]�. �Cu�ndo podemos cerrarlo?"</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El truco de los intereses acumulados</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Una factura antigua tiene MUCHOS intereses devengados. Ejemplo:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>Factura 5.000� vencida hace 1 a�o: <strong>+625� intereses + 40� = 5.665�</strong></li>
            <li>Factura 5.000� vencida hace 2 a�os: <strong>+1.250� intereses + 40� = 6.290�</strong></li>
            <li>Factura 5.000� vencida hace 3 a�os: <strong>+1.875� intereses + 40� = 6.915�</strong></li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Comun�calo al cliente. A muchos les sorprende y prefieren pagar lo original antes de que crezcan m�s.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Opciones por antig�edad</h2>
          <ul className="space-y-3 text-zinc-300 mb-6">
            <li><strong>1-6 meses:</strong> emails escalados + burofax + monitorio. Procedimiento est�ndar.</li>
            <li><strong>6-12 meses:</strong> burofax inmediato + monitorio en paralelo.</li>
            <li><strong>1-3 a�os:</strong> directo a monitorio. Empresa especializada de recobros si la deuda es grande.</li>
            <li><strong>3-5 a�os:</strong> �ltima oportunidad. Monitorio urgente.</li>
            <li><strong>+5 a�os:</strong> prescrita. S�lo si has interrumpido la prescripci�n con reclamaciones.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cu�ndo soltar</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Suelta si:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Cliente entr� en concurso y eres acreedor menor</li>
            <li>? Cliente desapareci� sin localizar</li>
            <li>? La deuda es &lt; 500� y el monitorio te costar�a tiempo igual</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Apunta como gasto fiscal "cr�dito incobrable" y olv�date. Mejor para tu salud mental.</p>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea calcula intereses acumulados autom�ticamente</h3>
          <p className="text-zinc-300 mb-5">Carga la factura antigua, indica fecha vencimiento. Saldea calcula intereses + 40� y genera el email de reclamaci�n. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

