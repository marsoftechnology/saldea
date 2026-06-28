import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morosidad en ecommerce 2026: chargebacks, devoluciones y SEPA | Marsof',
  description: 'C�mo gestionar impagos en tiendas online: chargebacks, SEPA devuelto, fraude y proveedores que tardan en cobrar. Estrategias para ecommerce.',
  alternates: { canonical: 'https://www.marsof.es/blog/morosidad-ecommerce-tiendas-online' },
  keywords: ['morosidad ecommerce', 'chargeback tienda online', 'sepa devuelto ecommerce', 'fraude pagos online', 'cobros ecommerce'],
  openGraph: { title: 'Morosidad en ecommerce 2026', description: 'Chargebacks, devoluciones y estrategias.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "Morosidad en ecommerce 2026: chargebacks, devoluciones y SEPA", "description": "C�mo gestionar impagos en tiendas online: chargebacks, SEPA devuelto, fraude y proveedores que tardan en cobrar. Estrategias para ecommerce.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/morosidad-ecommerce-tiendas-online"}

export default function PageEcommerce() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Sector � 7 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Morosidad en ecommerce y tiendas online</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">En ecommerce la mayor�a de los cobros son inmediatos (tarjeta). Pero existen 3 problemas concretos: chargebacks, SEPA devuelto y proveedores que cobran tarde.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Los 3 tipos de impago en ecommerce</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">1. Chargeback (contracargo de tarjeta)</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">El cliente disputa el cargo con su banco/Visa/Mastercard. El banco te quita el dinero hasta resolver. Causas m�s comunes:</p>
          <ul className="space-y-1 text-zinc-300 mb-4">
            <li>� Producto no recibido</li>
            <li>� Producto defectuoso o no como descrito</li>
            <li>� Fraude (tarjeta robada)</li>
            <li>� Cliente no reconoce el cargo</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Coste medio:</strong> 25-30� de comisi�n + posible p�rdida del producto. Tienes 7-21 d�as para responder con pruebas.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">2. SEPA devuelto (suscripciones)</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Si tu ecommerce cobra cuotas mensuales por SEPA y el cliente devuelve el cargo (saldo insuficiente, cancela mandato, dispute), Stripe/GoCardless te lo retira autom�ticamente.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">3. Proveedores y B2B</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Si tu ecommerce vende tambi�n a otras empresas (marketplaces, B2B), aqu� s� aparecen las facturas tradicionales con plazos de 30-60 d�as.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">C�mo prevenir chargebacks</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>Descripci�n clara</strong> del producto en la web</li>
            <li><strong>Pol�tica de devoluciones</strong> visible y f�cil</li>
            <li><strong>Email de confirmaci�n</strong> con detalle de compra inmediato</li>
            <li><strong>Tracking de env�o</strong> compartido con cliente</li>
            <li><strong>Soporte �gil</strong> antes de que dispute con el banco</li>
            <li><strong>Nombre del cargo:</strong> que se reconozca tu marca en el extracto del banco</li>
            <li><strong>Fraud detection:</strong> Stripe Radar, Adyen, Fraugster</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">C�mo defender un chargeback</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Tienes que aportar pruebas en el panel de Stripe/PayPal:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>?? Justificante de env�o con tracking</li>
            <li>?? Email de confirmaci�n</li>
            <li>?? Captura de la web del producto</li>
            <li>?? Conversaci�n con el cliente</li>
            <li>?? Pol�tica de devoluciones aceptada</li>
            <li>?? IP del comprador y dispositivo</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">C�mo gestionar SEPA devuelto en suscripciones</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>Email autom�tico inmediato</strong> al cliente avisando del rechazo</li>
            <li><strong>Reintento en 3 d�as</strong> (Stripe lo hace solo)</li>
            <li><strong>Si falla otra vez:</strong> email pidiendo otro m�todo de pago</li>
            <li><strong>Suspensi�n del servicio</strong> a los 7 d�as</li>
            <li><strong>Baja definitiva</strong> a los 15-30 d�as</li>
            <li><strong>Reclamaci�n de cuota pendiente</strong> con Ley 3/2004</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">B2B en ecommerce: facturas a empresas</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si vendes a empresas con pagos aplazados (B2B), aqu� s� aplica todo lo de morosidad cl�sica:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Ley 3/2004 (60 d�as m�ximo)</li>
            <li>? Recordatorios autom�ticos</li>
            <li>? Burofax si pasa de 60 d�as</li>
            <li>? Procedimiento monitorio</li>
          </ul>
        </section>

        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea para ecommerce B2B y suscripciones</h3>
          <p className="text-zinc-300 mb-5">Si tu ecommerce factura a empresas con plazos aplazados, o tienes SEPA devueltos por gestionar, Saldea automatiza la recuperaci�n. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

