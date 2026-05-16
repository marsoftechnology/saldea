import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Domiciliación SEPA: cómo cobrar automáticamente cada mes | Saldea',
  description: 'Cómo funciona la domiciliación SEPA para autónomos y empresas: mandato, plazos, devoluciones y cómo reduce la morosidad hasta un 70%.',
  alternates: { canonical: 'https://marsof.es/blog/domiciliacion-sepa-cobros-automaticos' },
  keywords: ['domiciliacion sepa', 'cobro automatico sepa', 'mandato sepa', 'cobrar por sepa', 'recibo domiciliado autonomo'],
  openGraph: { title: 'Domiciliación SEPA: cómo cobrar automáticamente', description: 'Reduce morosidad un 70%.', type: 'article', locale: 'es_ES' },
}

export default function PageSepa() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Cobros · 7 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Domiciliación SEPA: la forma más segura de cobrar</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Si cobras cuotas mensuales, alquileres, mantenimientos o suscripciones, la domiciliación SEPA reduce tu morosidad hasta un 70%. Te explico cómo funciona y cómo activarla.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Qué es SEPA?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>SEPA</strong> (Single Euro Payments Area) es la <strong>Zona Única de Pagos en Euros</strong> que unifica las transferencias y adeudos directos entre 36 países europeos. Funciona desde 2014 con el mismo formato técnico en todos los bancos.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Tipos de SEPA</h2>
          <ul className="space-y-3 text-zinc-300 mb-6">
            <li><strong>SEPA Credit Transfer:</strong> transferencia normal. Tú envías dinero.</li>
            <li><strong>SEPA Instant:</strong> transferencia en 10 segundos. Coste extra.</li>
            <li><strong>SEPA Direct Debit Core (B2C):</strong> domiciliación a particulares. El cliente puede devolver el cobro hasta 8 semanas después.</li>
            <li><strong>SEPA Direct Debit B2B:</strong> domiciliación entre empresas. Sin derecho a devolución (más seguro).</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cómo funciona el cobro por SEPA</h2>
          <ol className="space-y-3 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>El cliente firma el mandato SEPA</strong> autorizándote a cobrarle desde su cuenta. Una vez firmado, lo conservas.</li>
            <li><strong>Avisas al cliente del cobro</strong> con al menos 1 día de antelación (preaviso obligatorio). Para el primer cobro, 14 días.</li>
            <li><strong>Tu banco envía la orden de cobro</strong> al banco del cliente.</li>
            <li><strong>El banco del cliente carga el importe</strong> en su cuenta en la fecha indicada.</li>
            <li><strong>El dinero llega a tu cuenta</strong> en 1-2 días laborables.</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El mandato SEPA: qué tiene que llevar</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ Identificador del acreedor (te lo da tu banco)</li>
            <li>✓ Referencia única del mandato</li>
            <li>✓ Datos del deudor (cliente): nombre, dirección, IBAN</li>
            <li>✓ Tipo: B2C (Core) o B2B</li>
            <li>✓ Periodicidad: única o recurrente</li>
            <li>✓ Firma del cliente (manuscrita o digital)</li>
            <li>✓ Fecha de firma</li>
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
                <tr className="border-b border-white/10"><td className="py-2 px-4">Preaviso primer cobro</td><td className="py-2 px-4">14 días naturales</td><td className="py-2 px-4">14 días</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Preaviso cobros siguientes</td><td className="py-2 px-4">1 día</td><td className="py-2 px-4">1 día</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Plazo presentación al banco</td><td className="py-2 px-4">D-1 a D-5 según tipo</td><td className="py-2 px-4">D-1</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Devolución por motivo</td><td className="py-2 px-4">8 semanas</td><td className="py-2 px-4">2 días</td></tr>
                <tr><td className="py-2 px-4">Devolución sin motivo</td><td className="py-2 px-4">8 semanas</td><td className="py-2 px-4">No permitida</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Coste de la domiciliación SEPA</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Depende de tu banco:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li><strong>Bancos tradicionales</strong> (Santander, BBVA, Sabadell, CaixaBank): 0,30€-1,50€ por adeudo</li>
            <li><strong>Bancos digitales</strong> (N26, Bnext): suelen ser más caros, no todos lo ofrecen</li>
            <li><strong>Stripe SEPA Debit:</strong> 1,2% por cobro (mínimo 0,25€, máximo 6€)</li>
            <li><strong>GoCardless:</strong> 1% + 0,20€</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo SÍ usar SEPA</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ Cobros recurrentes (suscripciones, cuotas, alquileres)</li>
            <li>✓ Clientes B2C habituales y conocidos</li>
            <li>✓ Quieres reducir la morosidad estructural</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo NO</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>❌ Facturas únicas (mejor transferencia)</li>
            <li>❌ Cliente que no quiere firmar el mandato (no insistas, mala señal)</li>
            <li>❌ Cobros muy grandes (mejor confirming o factoring)</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Y si el cliente devuelve el SEPA?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">En B2C tiene 8 semanas para devolver sin justificar. El banco te lo retira sin preguntar. En ese caso:</p>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li>Avisa al cliente que el cobro ha sido devuelto</li>
            <li>Pídele explicación y propón nuevo intento o medio alternativo</li>
            <li>Si no responde, factura por la operación devuelta (~3-5€) y aplica intereses de demora Ley 3/2004</li>
            <li>Tras 30 días, suspende el servicio si aplica</li>
          </ol>
        </section>

        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">¿Y si el SEPA falla? Saldea persigue</h3>
          <p className="text-zinc-300 mb-5">Si el cobro SEPA se devuelve, Saldea entra en acción con emails escalados y cita Ley 3/2004 automáticamente. <strong>1 mes gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
