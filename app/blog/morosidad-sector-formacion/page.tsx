import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morosidad en formaci�n y consultor�a 2026: cobrar a empresas | Marsof',
  description: 'C�mo cobrar facturas a empresas por servicios de formaci�n y consultor�a. Plazos reales, retainer mensual y estrategias espec�ficas del sector.',
  alternates: { canonical: 'https://www.marsof.es/blog/morosidad-sector-formacion' },
  keywords: ['cobrar formacion empresa', 'morosos consultoria', 'cobrar empresa formacion', 'consultor cobros', 'retainer consultoria'],
  openGraph: { title: 'Morosidad en formaci�n y consultor�a', description: 'Cobrar a empresas por servicios profesionales.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "Morosidad en formaci�n y consultor�a 2026: cobrar a empresas", "description": "C�mo cobrar facturas a empresas por servicios de formaci�n y consultor�a. Plazos reales, retainer mensual y estrategias espec�ficas del sector.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/morosidad-sector-formacion"}

export default function PageFormacion() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Sector � 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Morosidad en formaci�n y consultor�a</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Consultores y formadores facturan a empresas que pagan a 60-120 d�as. C�mo proteger tus servicios y cobrar sin perder al cliente.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El reto del sector</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Los servicios profesionales (formaci�n, consultor�a, coaching) tienen un problema com�n: trabajas primero, facturas despu�s, y el cliente puede usar cualquier "evaluaci�n posterior" para retrasar pagos.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plazos reales por tipo de cliente</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-sky-500/20"><th className="py-3 px-4 text-left text-zinc-100">Cliente</th><th className="py-3 px-4 text-left text-zinc-100">Plazo medio</th></tr></thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Multinacional</td><td className="py-2 px-4">60-120 d�as</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Pyme grande</td><td className="py-2 px-4">60 d�as</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Pyme peque�a</td><td className="py-2 px-4">30-60 d�as</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Administraci�n p�blica</td><td className="py-2 px-4">90-180 d�as</td></tr>
                <tr><td className="py-2 px-4">Particular</td><td className="py-2 px-4">Inmediato</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El modelo retainer mensual</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si haces consultor�a continua, <strong>cobra retainer mensual fijo</strong> en lugar de facturar por proyecto. Ventajas:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Ingreso recurrente predecible</li>
            <li>? Puedes domiciliar SEPA (reduces morosidad 70%)</li>
            <li>? El cliente paga antes que use los servicios</li>
            <li>? Te ata al cliente con un compromiso anual</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cl�usulas clave en contratos de formaci�n/consultor�a</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>Anticipo del 30-50%</strong> al firmar</li>
            <li>? <strong>Hitos de pago</strong>: por entrega de informes/m�dulos, no al final</li>
            <li>? <strong>Aceptaci�n t�cita</strong>: 7 d�as para discutir, sino se entiende aceptado</li>
            <li>? <strong>Confidencialidad</strong> con NDA rec�proca</li>
            <li>? <strong>Cesi�n propiedad intelectual</strong>: solo tras pago completo</li>
            <li>? <strong>Ley 3/2004 + suspensi�n</strong> por impago</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Estrategia anti-morosos</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li>Negocia retainer cuando sea posible</li>
            <li>Hitos de pago con entregables</li>
            <li>NO entregues el informe final hasta cobrar</li>
            <li>Recordatorios autom�ticos desde el d�a 1 vencimiento</li>
            <li>Si m�s de 30 d�as vencido: pausa el siguiente m�dulo o consultor�a</li>
            <li>Burofax + Ley 3/2004 al d�a 60</li>
          </ol>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea para consultores y formadores</h3>
          <p className="text-zinc-300 mb-5">Recordatorios autom�ticos, retainer recurrente, escalado de tono. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

