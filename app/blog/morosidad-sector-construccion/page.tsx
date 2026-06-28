import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morosidad en el sector construcci�n 2026: an�lisis y soluciones | Marsof',
  description: 'Por qu� la construcci�n es el sector m�s afectado por la morosidad en Espa�a. Plazos reales de pago, causas y c�mo proteger tu empresa.',
  alternates: { canonical: 'https://www.marsof.es/blog/morosidad-sector-construccion' },
  keywords: ['morosidad construccion', 'cobrar construccion', 'impagos obra', 'morosos obra construccion', 'cobros sector construccion'],
  openGraph: { title: 'Morosidad en construcci�n 2026', description: 'El sector m�s afectado y c�mo protegerse.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "Morosidad en el sector construcci�n 2026: an�lisis y soluciones", "description": "Por qu� la construcci�n es el sector m�s afectado por la morosidad en Espa�a. Plazos reales de pago, causas y c�mo proteger tu empresa.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/morosidad-sector-construccion"}

export default function PageConstruccion() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Sector � 8 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Morosidad en el sector construcci�n 2026</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">La construcci�n lidera el ranking de morosidad en Espa�a. Plazos reales, causas y qu� hacer para no acabar como tantas pymes del sector.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Los datos que duelen</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>?? <strong>Plazo medio de pago en construcci�n:</strong> 108 d�as (vs 75 media nacional)</li>
            <li>?? <strong>% facturas pagadas tarde:</strong> 65% (vs 25% media nacional)</li>
            <li>?? <strong>Empresas que sufrieron impagos en 2025:</strong> 78% del sector</li>
            <li>?? <strong>Tasa de quiebras:</strong> doble de la media espa�ola</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">�Por qu� es tan grave en construcci�n?</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">1. La cadena de subcontrataci�n</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Promotora ? Constructora ? Subcontrata ? Sub-subcontrata. Cada eslab�n aplaza pagos a sus proveedores. Si el primero retrasa, todos lo hacen.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">2. Plazos de certificaci�n largos</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">En obra p�blica, el ciclo es: trabajo ? certificaci�n mensual ? conformidad cliente ? 30 d�as pago. La certificaci�n a veces tarda meses.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">3. Cliente final con problemas de liquidez</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Si una promotora vende menos casas, no paga a la constructora. Toda la pir�mide se desploma.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">4. Disputas t�cnicas frecuentes</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">El cliente excusa el pago con "deficiencias", "reparaciones pendientes" o reformas. A veces son reales, otras simple t�ctica para retrasar el pago.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El marco legal espec�fico</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>?? <strong>Ley 9/2017 (Contratos del Sector P�blico):</strong> 30 d�as desde la conformidad (administraci�n p�blica)</li>
            <li>?? <strong>Ley 3/2004:</strong> aplica a operaciones B2B (60 d�as m�ximo)</li>
            <li>?? <strong>Ley 9/2022 Contratos P�blicos:</strong> certificaciones en 30 d�as</li>
            <li>?? <strong>Ley 7/2012 Subcontrataci�n:</strong> regula la cadena de subcontratistas</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">C�mo protegerse en construcci�n</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">1. Anticipo del 20-30%</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">S�, s� que es dif�cil pedirlo a una constructora grande. Pero hazlo. Si te lo niegan, ex�gelo al menos para materiales.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">2. Cl�usula de retenci�n de obra</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">El contrato t�pico de construcci�n tiene una "retenci�n de garant�a" del 5-10% que se paga al final. Negocia que sea menor o que se devuelva en plazos cortos.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">3. Certificaciones mensuales firmadas</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Cada mes presenta certificaci�n. Pide firma del responsable de obra ANTES de continuar. Sin firma, no avances.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">4. Verificaci�n previa del cliente</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Antes de firmar contrato grande, busca al cliente en eInforma. Si tiene impagos publicados o concurso preventivo, sopesa muy bien.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">5. Recordatorios autom�ticos cada certificaci�n</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Tras emitir la factura de certificaci�n, automatiza recordatorios escalados. Si se pasan de los 30 d�as legales, escala el tono mencionando expresamente la Ley 9/2017 o Ley 3/2004.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">6. Burofax temprano</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">En construcci�n, el burofax a los 45-60 d�as es est�ndar. No esperes 90 d�as: para entonces tu cliente ya se ha gastado el dinero.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Se�ales de alarma</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>?? El cliente empieza a discutir certificaciones que antes firmaba sin problema</li>
            <li>?? Cambia el interlocutor de pagos sin avisar</li>
            <li>?? Pide "una semanita m�s" repetidamente</li>
            <li>?? Le sale "una factura sin pagar" tuya cuando consultas eInforma</li>
            <li>?? Hay murmullo en el gremio sobre su solvencia</li>
            <li>?? Tarda en firmar certificaciones que antes firmaba al d�a</li>
          </ul>

          <p className="text-zinc-300 leading-relaxed mb-4">Si ves 2-3 se�ales, <strong>aplica el protocolo</strong>: ralentiza, exige cobros pendientes antes de seguir y considera suspender la obra seg�n contrato.</p>
        </section>

        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea automatiza la reclamaci�n en construcci�n</h3>
          <p className="text-zinc-300 mb-5">Importa tus certificaciones, configura los plazos legales y deja que la IA persiga el cobro. Cita autom�ticamente la Ley 9/2017 si es obra p�blica o Ley 3/2004 si es B2B. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

