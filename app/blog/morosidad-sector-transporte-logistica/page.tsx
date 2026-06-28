import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morosidad en transporte y log�stica 2026: plazos y soluciones | Marsof',
  description: 'C�mo cobrar a clientes en el sector del transporte y log�stica. Plazos legales especiales, cargas y descargas, y la Ley 15/2009 de transporte.',
  alternates: { canonical: 'https://www.marsof.es/blog/morosidad-sector-transporte-logistica' },
  keywords: ['morosidad transporte', 'cobros transportistas', 'ley 15/2009 transporte', 'transportista factura', 'logistica cobros'],
  openGraph: { title: 'Morosidad en transporte y log�stica', description: 'Plazos legales y soluciones.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "Morosidad en transporte y log�stica 2026: plazos y soluciones", "description": "C�mo cobrar a clientes en el sector del transporte y log�stica. Plazos legales especiales, cargas y descargas, y la Ley 15/2009 de transporte.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/morosidad-sector-transporte-logistica"}

export default function PageTransporte() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Sector � 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Morosidad en transporte y log�stica</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">El sector del transporte tiene su propia ley de plazos de pago: la Ley 15/2009. M�s estricta que la gen�rica. Te explico c�mo aprovecharla.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El marco legal del transporte</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">La <strong>Ley 15/2009 del Contrato de Transporte Terrestre de Mercanc�as</strong> establece que el porte se paga al transportista en un plazo m�ximo de <strong>30 d�as naturales</strong> desde la entrega.</p>
          <p className="text-zinc-300 leading-relaxed mb-4">Es m�s exigente que la Ley 3/2004 (60 d�as B2B). Protege espec�ficamente a los transportistas que tradicionalmente cobraban a 90-120 d�as.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plazos seg�n tipo de operaci�n</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-sky-500/20"><th className="py-3 px-4 text-left text-zinc-100">Operaci�n</th><th className="py-3 px-4 text-left text-zinc-100">Plazo m�ximo</th><th className="py-3 px-4 text-left text-zinc-100">Ley</th></tr></thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Transporte de mercanc�as</td><td className="py-2 px-4">30 d�as</td><td className="py-2 px-4">Ley 15/2009</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Operaciones log�sticas (almac�n, picking)</td><td className="py-2 px-4">60 d�as</td><td className="py-2 px-4">Ley 3/2004</td></tr>
                <tr><td className="py-2 px-4">Transporte de productos perecederos</td><td className="py-2 px-4">30 d�as</td><td className="py-2 px-4">Ley 12/2013</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Problemas t�picos en el sector</h2>
          <ul className="space-y-3 text-zinc-300 mb-6">
            <li><strong>1. Pago aplazado encubierto:</strong> el cargador insiste en pagar a 90 d�as "como siempre". Aunque firmes ese contrato, la cl�usula es nula. Tienes derecho a cobrar a 30.</li>
            <li><strong>2. Descuento por pronto pago:</strong> "te pago al d�a si me das 5% descuento". Trampa: si me retraso, ya no soy moroso. Rechaza estas propuestas.</li>
            <li><strong>3. Cesi�n a un intermediario:</strong> en cadena de subcontrataci�n, cada eslab�n aplaza. Si te contrata X, te paga X, no su cliente final.</li>
            <li><strong>4. Retrasos por documentaci�n:</strong> el cargador pide CMR, albar�n, otros papeles. Aseg�rate de enviar TODO en menos de 48h tras la entrega.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Estrategia anti-morosos en transporte</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>Cl�usula Ley 15/2009</strong> expresa en cada presupuesto y factura</li>
            <li><strong>Documentaci�n impecable y r�pida:</strong> CMR firmado, albar�n sellado, factura emitida en 24h</li>
            <li><strong>Recordatorio el d�a 31</strong> con c�lculo de intereses + 40�</li>
            <li><strong>Llamada al jefe de pagos</strong> al d�a 40</li>
            <li><strong>Burofax al d�a 60</strong> mencionando la Ley 15/2009</li>
            <li><strong>Denuncia ante Ministerio de Transportes</strong> en casos graves</li>
            <li><strong>Procedimiento monitorio</strong> si supera 90 d�as</li>
          </ol>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea automatiza recordatorios con Ley 15/2009</h3>
          <p className="text-zinc-300 mb-5">Configura el plazo de 30 d�as en tus clientes transporte. Saldea cita la ley correcta. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

