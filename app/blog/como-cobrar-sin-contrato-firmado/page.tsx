import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'C�mo cobrar sin contrato firmado: las pruebas que valen | Marsof',
  description: 'Aunque no tengas contrato escrito, puedes cobrar. Las pruebas que aceptan los jueces: emails, presupuestos, WhatsApp, transferencias previas.',
  alternates: { canonical: 'https://www.marsof.es/blog/como-cobrar-sin-contrato-firmado' },
  keywords: ['cobrar sin contrato', 'cobrar trabajo informal', 'pruebas sin contrato', 'reclamar sin papeles'],
  openGraph: { title: 'C�mo cobrar sin contrato firmado', description: 'Las pruebas que valen.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "C�mo cobrar sin contrato firmado: las pruebas que valen", "description": "Aunque no tengas contrato escrito, puedes cobrar. Las pruebas que aceptan los jueces: emails, presupuestos, WhatsApp, transferencias previas.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/como-cobrar-sin-contrato-firmado"}

export default function Page() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso especial � 5 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">C�mo cobrar sin contrato firmado</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Trabajaste de palabra y ahora no paga. S� puedes cobrar. Te explico qu� pruebas valen.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El derecho civil espa�ol lo permite</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">En Espa�a los contratos pueden ser <strong>verbales o t�citos</strong>. Si has prestado un servicio y emitido factura, ya hay contrato. El reto est� en demostrar lo pactado.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Pruebas que aceptan los jueces</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>Emails de cliente confirmando encargo</strong> ("perfecto, adelante con el proyecto")</li>
            <li>? <strong>Presupuesto enviado por email</strong> aunque no est� firmado</li>
            <li>? <strong>WhatsApps donde acepta condiciones</strong></li>
            <li>? <strong>Transferencias o pagos anteriores</strong> al mismo concepto</li>
            <li>? <strong>Albaranes firmados</strong> de entrega</li>
            <li>? <strong>Factura emitida y aceptada</strong> (no rechazada en 30 d�as)</li>
            <li>? <strong>Comunicaciones con terceros</strong> sobre el trabajo realizado</li>
            <li>? <strong>Materiales/entregables enviados</strong> (PDF firmado por su parte)</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Re�ne y ordena las pruebas</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li>Hilo de emails completo (no solo el �ltimo)</li>
            <li>Capturas de WhatsApp con timestamp</li>
            <li>Movimientos bancarios donde se ve cobro o intento</li>
            <li>Archivo entregable que le mandaste</li>
            <li>Cualquier documento donde el cliente reconozca el trabajo</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Estrategia de cobro</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li><strong>D�a 1-30:</strong> emails amistosos como cualquier moroso</li>
            <li><strong>D�a 30-60:</strong> email formal citando Ley 3/2004 y adjuntando pruebas (presupuesto, emails de aceptaci�n)</li>
            <li><strong>D�a 60:</strong> burofax con todas las pruebas anexas</li>
            <li><strong>D�a 90:</strong> procedimiento monitorio adjuntando las pruebas como justificante de la deuda</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Si el cliente niega que hubiese acuerdo</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Es la peor situaci�n. Pero rara vez se sostiene si:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>Hay email donde te encargan el trabajo</li>
            <li>Aceptaron la entrega (no rechazaron en plazo)</li>
            <li>Te pagaron facturas anteriores similares</li>
            <li>Hay testigos (otros empleados, socios)</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Lecci�n para futuro</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Aunque puedas cobrar sin contrato, <strong>SIEMPRE firma uno</strong>. Aunque sea un email "confirmo presupuesto X por servicio Y a Z�". 30 segundos te ahorran 30 horas si hay problema.</p>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea conserva el historial de comunicaci�n</h3>
          <p className="text-zinc-300 mb-5">Cada email enviado queda registrado con fecha exacta. Sirve como prueba documental para monitorio. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

