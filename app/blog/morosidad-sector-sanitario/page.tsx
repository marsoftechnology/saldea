import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morosidad sector sanitario 2026: cobrar a cl�nicas y proveedores m�dicos | Marsof',
  description: 'C�mo cobrar facturas a cl�nicas privadas, mutuas, residencias y proveedores m�dicos. Plazos reales, peculiaridades del sector y soluciones.',
  alternates: { canonical: 'https://www.marsof.es/blog/morosidad-sector-sanitario' },
  keywords: ['cobrar clinica', 'mutua paga tarde', 'cobros sector salud', 'residencias mayores cobros', 'proveedor medico facturas'],
  openGraph: { title: 'Morosidad sector sanitario', description: 'Cobrar a cl�nicas y mutuas.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "Morosidad sector sanitario 2026: cobrar a cl�nicas y proveedores m�dicos", "description": "C�mo cobrar facturas a cl�nicas privadas, mutuas, residencias y proveedores m�dicos. Plazos reales, peculiaridades del sector y soluciones.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/morosidad-sector-sanitario"}

export default function PageSanitario() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Sector � 7 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Morosidad en el sector sanitario</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Cl�nicas privadas, mutuas, aseguradoras, residencias y proveedores m�dicos. Cada uno tiene su l�gica de pago. Aqu� va lo que necesitas saber.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Los plazos reales del sector sanitario</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20"><th className="py-3 px-4 text-left text-zinc-100">Cliente</th><th className="py-3 px-4 text-left text-zinc-100">Plazo medio real</th></tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Hospital p�blico (SNS)</td><td className="py-2 px-4">90-180 d�as</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Cl�nica privada grande</td><td className="py-2 px-4">60-90 d�as</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Mutua / aseguradora</td><td className="py-2 px-4">60-120 d�as</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Residencia mayores privada</td><td className="py-2 px-4">30-60 d�as</td></tr>
                <tr><td className="py-2 px-4">Particular en consulta</td><td className="py-2 px-4">Inmediato o 7 d�as</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Peculiaridades del sector</h2>
          <ul className="space-y-3 text-zinc-300 mb-6">
            <li><strong>1. Pagos por acto m�dico vs por convenio:</strong> los honorarios profesionales y los conciertos con mutuas tienen l�gicas distintas.</li>
            <li><strong>2. C�digos y nomencl�tor:</strong> cada mutua tiene su sistema. Si falla un c�digo, retrasan el pago semanas.</li>
            <li><strong>3. Auditor�as de facturaci�n:</strong> las aseguradoras revisan caso por caso. Cualquier discrepancia retrasa el pago.</li>
            <li><strong>4. Cesi�n de derechos:</strong> el paciente cede el cobro a la aseguradora. Si la aseguradora rechaza, el paciente no paga.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Marco legal aplicable</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li><strong>Ley 3/2004 (morosidad B2B):</strong> 60 d�as m�ximo en operaciones entre cl�nicas/mutuas</li>
            <li><strong>Ley 9/2017 (sector p�blico):</strong> 30 d�as para hospitales p�blicos</li>
            <li><strong>Ley 50/1980 contrato de seguro:</strong> regula plazos y obligaciones de las aseguradoras</li>
            <li><strong>Interes�s del 12,5%</strong> + 40� por factura aplican igual que en cualquier sector</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Estrategia anti-morosos en sanitario</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>Convenio claro con cada mutua:</strong> revisa cada a�o las condiciones</li>
            <li><strong>Facturaci�n impecable:</strong> c�digos correctos, sin tachones, justificantes</li>
            <li><strong>Sistem�tico con plazos:</strong> recordatorio el d�a 30 si era a 30, d�a 60 si era a 60</li>
            <li><strong>Email al departamento de pagos</strong> y al gerente cuando se retrasa</li>
            <li><strong>Para hospital p�blico:</strong> denuncia ante la Junta Consultiva de Contrataci�n Administrativa</li>
            <li><strong>Burofax + Ley 3/2004 o Ley 9/2017</strong> seg�n corresponda</li>
          </ol>
        </section>

        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea automatiza recordatorios a cl�nicas y mutuas</h3>
          <p className="text-zinc-300 mb-5">Plantillas configurables por cliente (mutua, hospital, residencia). Cita la ley correcta autom�ticamente. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

