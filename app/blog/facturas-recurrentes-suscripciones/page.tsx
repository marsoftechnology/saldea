import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Facturas recurrentes para suscripciones: gu�a 2026 | Marsof',
  description: 'C�mo gestionar facturas recurrentes en suscripciones SaaS, alquileres, mantenimientos. Automatizaci�n, cumplimiento fiscal y reducci�n de impagos.',
  alternates: { canonical: 'https://www.marsof.es/blog/facturas-recurrentes-suscripciones' },
  keywords: [
    'factura recurrente',
    'suscripcion mensual factura',
    'facturacion recurrente',
    'gestionar cuotas mensuales',
    'cobro mensual automatico',
  ],
  openGraph: {
    title: 'Facturas recurrentes para suscripciones',
    description: 'C�mo gestionarlas sin volverte loco.',
    type: 'article',
    locale: 'es_ES',
  },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "Facturas recurrentes para suscripciones: gu�a 2026", "description": "C�mo gestionar facturas recurrentes en suscripciones SaaS, alquileres, mantenimientos. Automatizaci�n, cumplimiento fiscal y reducci�n de impagos.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/facturas-recurrentes-suscripciones"}

export default function PageRecurrentes() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Facturaci�n � 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Facturas recurrentes para suscripciones</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Si cobras cuotas mensuales por SaaS, alquileres, mantenimientos o servicios fijos, gestionar facturas recurrentes a mano es perder el tiempo. Te explico c�mo automatizarlo bien.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Qu� es una factura recurrente</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Una factura recurrente es la que emites <strong>peri�dicamente con el mismo concepto, importe y cliente</strong>. La m�s t�pica: la cuota mensual de una suscripci�n SaaS, un alquiler o un servicio de mantenimiento.</p>
          <p className="text-zinc-300 leading-relaxed mb-4">Cada emisi�n tiene <strong>n�mero correlativo independiente</strong> y vale fiscalmente como factura ordinaria. Solo cambia que la generas con plantilla automatizada.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Sectores que usan facturas recurrentes</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>?? <strong>SaaS y software</strong>: suscripciones mensuales o anuales</li>
            <li>?? <strong>Inmobiliarias</strong>: alquileres mensuales</li>
            <li>?? <strong>Mantenimientos</strong>: ascensores, climatizaci�n, jardiner�a</li>
            <li>?? <strong>Asesor�as y gestor�as</strong>: cuota mensual por cliente</li>
            <li>?? <strong>Agencias</strong>: retainer mensual con clientes</li>
            <li>??? <strong>Gimnasios y formaci�n</strong>: cuotas mensuales o anuales</li>
            <li>?? <strong>Hosting y dominios</strong>: renovaciones anuales</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">C�mo automatizar bien las facturas recurrentes</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">1. Domicilia los cobros con SEPA</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">El cliente firma una vez el mandato SEPA y a partir de ah� los cobros van autom�ticos cada mes. <strong>Reduces la morosidad hasta un 70%.</strong> Solo puede oponerse en caso de disputa real.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">2. Avisa antes del cobro (obligatorio en SEPA)</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">La normativa SEPA exige preaviso de 14 d�as naturales antes del primer cobro y 1 d�a antes de los siguientes. Esto se llama "mandate notification".</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">3. Genera la factura el mismo d�a del cobro</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">La factura debe llevar la fecha de la operaci�n, que en recurrentes es el d�a del cobro. Te conviene emitirla autom�ticamente para no acumular pendientes.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">4. Numera con prefijo dedicado</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Por orden, conviene usar serie separada para recurrentes (p.ej. SUB-2026-001) frente a las facturas puntuales (FAC-2026-001).</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">5. Gestiona las renovaciones autom�ticas con claridad</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Si tu suscripci�n es anual con renovaci�n autom�tica, debes <strong>avisar al cliente con 30 d�as de antelaci�n</strong> seg�n la Ley de Consumidores (si aplica). Para clientes B2B, lo que pacte el contrato.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Qu� hacer cuando una factura recurrente falla</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>D�a 1:</strong> el cobro SEPA rechaza (saldo insuficiente, cuenta cerrada). Aviso autom�tico al cliente por email.</li>
            <li><strong>D�a 3:</strong> reintento de cobro autom�tico.</li>
            <li><strong>D�a 7:</strong> si sigue sin pagar, suspensi�n parcial del servicio (acceso reducido o limitado).</li>
            <li><strong>D�a 15:</strong> suspensi�n total del servicio + comunicaci�n formal.</li>
            <li><strong>D�a 30:</strong> baja definitiva. Reclamaci�n de la cuota pendiente con Ley 3/2004.</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Errores t�picos en facturaci�n recurrente</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Olvidar emitir la factura del mes (Hacienda te puede multar)</li>
            <li>? No comunicar las renovaciones autom�ticas (puede invalidar el cobro)</li>
            <li>? Subir el precio sin avisar al menos 30 d�as antes</li>
            <li>? No cancelar suscripciones cuando el cliente lo pide</li>
            <li>? Mezclar serie de numeraci�n con facturas ordinarias</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Herramientas para facturaci�n recurrente</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li><strong>Stripe Billing:</strong> el est�ndar para SaaS. 0,5% + IVA por suscripci�n activa.</li>
            <li><strong>Holded:</strong> ERP completo, incluye facturaci�n recurrente.</li>
            <li><strong>Quipu / Anfix:</strong> facturaci�n con m�dulo de recurrentes.</li>
            <li><strong>Saldea:</strong> no genera la factura recurrente, pero si tu cliente se retrasa con el cobro, persigue la deuda con IA.</li>
          </ul>
        </section>

        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea complementa tu facturaci�n recurrente</h3>
          <p className="text-zinc-300 mb-5">Si usas Stripe Billing o Holded para emitir las facturas, conecta Saldea para perseguir los impagos cuando el cobro SEPA falla. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

