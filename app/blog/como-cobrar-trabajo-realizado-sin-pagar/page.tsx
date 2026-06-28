import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'C�mo cobrar un trabajo ya realizado que el cliente no paga | Marsof',
  description: 'Has entregado el trabajo y ahora no paga. Plan de actuaci�n: pruebas, recordatorios, burofax y v�a legal. Recuperar el dinero paso a paso.',
  alternates: { canonical: 'https://www.marsof.es/blog/como-cobrar-trabajo-realizado-sin-pagar' },
  keywords: ['cobrar trabajo realizado', 'entregue y no pagan', 'cliente no paga trabajo hecho', 'recuperar dinero trabajo'],
  openGraph: { title: 'C�mo cobrar un trabajo ya realizado', description: 'Plan paso a paso.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "C�mo cobrar un trabajo ya realizado que el cliente no paga", "description": "Has entregado el trabajo y ahora no paga. Plan de actuaci�n: pruebas, recordatorios, burofax y v�a legal. Recuperar el dinero paso a paso.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/como-cobrar-trabajo-realizado-sin-pagar"}

export default function Page() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso especial � 5 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">C�mo cobrar un trabajo ya realizado</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Lo entregaste. El cliente lo acept�. Ahora no paga. Plan completo para recuperar el dinero.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Paso 1 � Documenta la entrega</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Antes de reclamar, aseg�rate de tener:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>?? Email donde le entregaste el trabajo</li>
            <li>? Respuesta del cliente confirmando recepci�n</li>
            <li>?? Factura emitida con fecha</li>
            <li>?? Aceptaci�n t�cita: pasaron 7-15 d�as sin que rechazara</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Paso 2 � Secuencia de reclamaci�n</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li><strong>D�a 1 vencido:</strong> email amable</li>
            <li><strong>D�a 7-15:</strong> email firme con Ley 3/2004</li>
            <li><strong>D�a 20:</strong> llamada telef�nica directa</li>
            <li><strong>D�a 30:</strong> email formal con c�lculo de intereses + 40�</li>
            <li><strong>D�a 60:</strong> burofax</li>
            <li><strong>D�a 90:</strong> procedimiento monitorio</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Paso 3 � Si el cliente dice "no me sirve"</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Excusa t�pica para no pagar tras la entrega. Tu respuesta:</p>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Lo entregado se ajusta al presupuesto firmado/aceptado. Si hay alg�n punto concreto que no cumple, d�melo y lo revisamos. Si lo que pides es trabajo nuevo, eso requerir�a otra factura."</p>
          </div>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Aceptaci�n t�cita:</strong> si pasaron 7-15 d�as desde la entrega sin que rechazara expresamente, jur�dicamente lo acept�.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Paso 4 � Procedimiento monitorio</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si tras burofax no paga, ve a monitorio. Caso ideal:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Trabajo entregado documentado</li>
            <li>? Factura aceptada (no rechazada en 30 d�as)</li>
            <li>? Burofax notificado</li>
            <li>? Deuda exacta y exigible</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Sin abogado si la deuda es &lt;2.000�. Coste: 0�. Tiempo: 1-2 meses.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Truco: derecho de retenci�n de propiedad intelectual</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si entregaste material creativo (dise�o, c�digo, contenido):</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>Cl�usula de propiedad intelectual:</strong> "Hasta pago completo, la propiedad intelectual sigue siendo del proveedor"</li>
            <li>? <strong>Bloqueo de archivos fuente:</strong> entrega solo PDF preview hasta pago</li>
            <li>? <strong>Reclamaci�n por uso indebido:</strong> si lo est� usando sin pagar, suma agravante legal</li>
          </ul>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea ejecuta el plan autom�ticamente</h3>
          <p className="text-zinc-300 mb-5">Importa la factura. Saldea ejecuta toda la secuencia (d�a 1, 15, 30, 60). T� solo decides cu�ndo ir a monitorio. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

