import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo cobrar honorarios impagados (consultores, abogados, médicos) | Marsof',
  description: 'Plan específico para cobrar honorarios profesionales. Consultores, abogados, médicos, arquitectos. Particularidades legales y trucos.',
  alternates: { canonical: 'https://www.marsof.es/blog/como-cobrar-honorarios-impagados' },
  keywords: ['cobrar honorarios', 'honorarios impagados', 'consultor cobrar', 'abogado cobrar honorarios', 'jura de cuentas'],
  openGraph: { title: 'Cómo cobrar honorarios impagados', description: 'Consultores y profesionales.', type: 'article', locale: 'es_ES' },
}

export default function Page() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso especial · 5 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cómo cobrar honorarios impagados</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Consultores, abogados, médicos, arquitectos. Te explico las particularidades legales y los trucos del sector.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Particularidades de los honorarios</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Los honorarios profesionales tienen su propio marco:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>?? <strong>Colegios profesionales</strong> ofrecen mediación gratuita o low-cost</li>
            <li>?? <strong>Jura de cuentas (abogados):</strong> procedimiento exprés para cobrar honorarios judiciales</li>
            <li>?? <strong>Aseguradoras médicas:</strong> sus propios protocolos y plazos</li>
            <li>?? <strong>Arquitectos/aparejadores:</strong> Colegio publica baremos orientativos</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plan general</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li>Email cordial el día 1 vencido</li>
            <li>Email firme con Ley 3/2004 al día 15</li>
            <li>Llamada al día 20-25</li>
            <li>Burofax al día 45-60</li>
            <li>Mediación del Colegio profesional (si aplica)</li>
            <li>Procedimiento monitorio al día 90</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Trucos por sector</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Abogados — Jura de cuentas</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Procedimiento exprés (art. 35 LEC) para cobrar honorarios judiciales. Sin necesidad de juicio. Decide el secretario judicial.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Médicos privados — Aseguradoras</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Cada aseguradora tiene plazo y proceso. Si hay nomenclátor mal aplicado, retrasos eternos. Solución: contacto directo con el departamento de proveedores.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Arquitectos — Visado colegial</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Documentos visados por el Colegio = prueba reforzada. El Colegio puede gestionar el cobro a cambio de comisión.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Consultores — Retainer mensual</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Cambia el modelo: retainer mensual con SEPA o tarjeta. Reduce morosidad un 70%.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cláusulas que protegen tus honorarios</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Anticipo del 30-50%</li>
            <li>? Pago por hitos / entregas</li>
            <li>? Cesión de propiedad intelectual SOLO tras pago completo</li>
            <li>? Ley 3/2004 expresa</li>
            <li>? Suspensión de servicios por impago a 15 días</li>
          </ul>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea para profesionales independientes</h3>
          <p className="text-zinc-300 mb-5">Persigue tus honorarios automáticamente. Recordatorios escalados según los días de retraso. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
  )
}

