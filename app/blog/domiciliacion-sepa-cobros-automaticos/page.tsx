import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Domiciliaci�n SEPA: c�mo cobrar autom�ticamente cada mes | Marsof',
  description: 'C�mo funciona la domiciliaci�n SEPA para aut�nomos y empresas: mandato, plazos, devoluciones y c�mo reduce la morosidad hasta un 70%.',
  alternates: { canonical: 'https://www.marsof.es/blog/domiciliacion-sepa-cobros-automaticos' },
  keywords: ['domiciliacion sepa', 'cobro automatico sepa', 'mandato sepa', 'cobrar por sepa', 'recibo domiciliado autonomo'],
  openGraph: { title: 'Domiciliaci�n SEPA: c�mo cobrar autom�ticamente', description: 'Reduce morosidad un 70%.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "Domiciliaci�n SEPA: c�mo cobrar autom�ticamente cada mes", "description": "C�mo funciona la domiciliaci�n SEPA para aut�nomos y empresas: mandato, plazos, devoluciones y c�mo reduce la morosidad hasta un 70%.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/domiciliacion-sepa-cobros-automaticos"}

export default function PageSepa() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Cobros � 7 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Domiciliaci�n SEPA: la forma m�s segura de cobrar</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Si cobras cuotas mensuales, alquileres, mantenimientos o suscripciones, la domiciliaci�n SEPA reduce tu morosidad hasta un 70%. Te explico c�mo funciona y c�mo activarla.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">�Qu� es SEPA?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>SEPA</strong> (Single Euro Payments Area) es la <strong>Zona �nica de Pagos en Euros</strong> que unifica las transferencias y adeudos directos entre 36 pa�ses europeos. Funciona desde 2014 con el mismo formato t�cnico en todos los bancos.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Tipos de SEPA</h2>
          <ul className="space-y-3 text-zinc-300 mb-6">
            <li><strong>SEPA Credit Transfer:</strong> transferencia normal. T� env�as dinero.</li>
            <li><strong>SEPA Instant:</strong> transferencia en 10 segundos. Coste extra.</li>
            <li><strong>SEPA Direct Debit Core (B2C):</strong> domiciliaci�n a particulares. El cliente puede devolver el cobro hasta 8 semanas despu�s.</li>
            <li><strong>SEPA Direct Debit B2B:</strong> domiciliaci�n entre empresas. Sin derecho a devoluci�n (m�s seguro).</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">C�mo funciona el cobro por SEPA</h2>
          <ol className="space-y-3 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>El cliente firma el mandato SEPA</strong> autoriz�ndote a cobrarle desde su cuenta. Una vez firmado, lo conservas.</li>
            <li><strong>Avisas al cliente del cobro</strong> con al menos 1 d�a de antelaci�n (preaviso obligatorio). Para el primer cobro, 14 d�as.</li>
            <li><strong>Tu banco env�a la orden de cobro</strong> al banco del cliente.</li>
            <li><strong>El banco del cliente carga el importe</strong> en su cuenta en la fecha indicada.</li>
            <li><strong>El dinero llega a tu cuenta</strong> en 1-2 d�as laborables.</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El mandato SEPA: qu� tiene que llevar</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Identificador del acreedor (te lo da tu banco)</li>
            <li>? Referencia �nica del mandato</li>
            <li>? Datos del deudor (cliente): nombre, direcci�n, IBAN</li>
            <li>? Tipo: B2C (Core) o B2B</li>
            <li>? Periodicidad: �nica o recurrente</li>
            <li>? Firma del cliente (manuscrita o digital)</li>
            <li>? Fecha de firma</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plazos importantes</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20">
                  <th className="py-3 px-4 text-left text-zinc-100">Concepto</th>
                  <th className="py-3 px-4 text-left text-zinc-100">B2C (Core)</th>
                  <th className="py-3 px-4 text-left text-zinc-100">B2B</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Preaviso primer cobro</td><td className="py-2 px-4">14 d�as naturales</td><td className="py-2 px-4">14 d�as</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Preaviso cobros siguientes</td><td className="py-2 px-4">1 d�a</td><td className="py-2 px-4">1 d�a</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Plazo presentaci�n al banco</td><td className="py-2 px-4">D-1 a D-5 seg�n tipo</td><td className="py-2 px-4">D-1</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Devoluci�n por motivo</td><td className="py-2 px-4">8 semanas</td><td className="py-2 px-4">2 d�as</td></tr>
                <tr><td className="py-2 px-4">Devoluci�n sin motivo</td><td className="py-2 px-4">8 semanas</td><td className="py-2 px-4">No permitida</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Coste de la domiciliaci�n SEPA</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Depende de tu banco:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li><strong>Bancos tradicionales</strong> (Santander, BBVA, Sabadell, CaixaBank): 0,30�-1,50� por adeudo</li>
            <li><strong>Bancos digitales</strong> (N26, Bnext): suelen ser m�s caros, no todos lo ofrecen</li>
            <li><strong>Stripe SEPA Debit:</strong> 1,2% por cobro (m�nimo 0,25�, m�ximo 6�)</li>
            <li><strong>GoCardless:</strong> 1% + 0,20�</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cu�ndo S� usar SEPA</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Cobros recurrentes (suscripciones, cuotas, alquileres)</li>
            <li>? Clientes B2C habituales y conocidos</li>
            <li>? Quieres reducir la morosidad estructural</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cu�ndo NO</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Facturas �nicas (mejor transferencia)</li>
            <li>? Cliente que no quiere firmar el mandato (no insistas, mala se�al)</li>
            <li>? Cobros muy grandes (mejor confirming o factoring)</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">�Y si el cliente devuelve el SEPA?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">En B2C tiene 8 semanas para devolver sin justificar. El banco te lo retira sin preguntar. En ese caso:</p>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li>Avisa al cliente que el cobro ha sido devuelto</li>
            <li>P�dele explicaci�n y prop�n nuevo intento o medio alternativo</li>
            <li>Si no responde, factura por la operaci�n devuelta (~3-5�) y aplica intereses de demora Ley 3/2004</li>
            <li>Tras 30 d�as, suspende el servicio si aplica</li>
          </ol>
        </section>

        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">�Y si el SEPA falla? Saldea persigue</h3>
          <p className="text-zinc-300 mb-5">Si el cobro SEPA se devuelve, Saldea entra en acci�n con emails escalados y cita Ley 3/2004 autom�ticamente. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

