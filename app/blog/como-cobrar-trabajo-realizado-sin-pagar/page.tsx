import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo cobrar un trabajo ya realizado que el cliente no paga | Marsof',
  description: 'Has entregado el trabajo y ahora no paga. Plan de actuación: pruebas, recordatorios, burofax y vía legal. Recuperar el dinero paso a paso.',
  alternates: { canonical: 'https://marsof.es/blog/como-cobrar-trabajo-realizado-sin-pagar' },
  keywords: ['cobrar trabajo realizado', 'entregue y no pagan', 'cliente no paga trabajo hecho', 'recuperar dinero trabajo'],
  openGraph: { title: 'Cómo cobrar un trabajo ya realizado', description: 'Plan paso a paso.', type: 'article', locale: 'es_ES' },
}

export default function Page() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso especial · 5 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cómo cobrar un trabajo ya realizado</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Lo entregaste. El cliente lo aceptó. Ahora no paga. Plan completo para recuperar el dinero.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Paso 1 — Documenta la entrega</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Antes de reclamar, asegúrate de tener:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>📧 Email donde le entregaste el trabajo</li>
            <li>✅ Respuesta del cliente confirmando recepción</li>
            <li>📄 Factura emitida con fecha</li>
            <li>📋 Aceptación tácita: pasaron 7-15 días sin que rechazara</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Paso 2 — Secuencia de reclamación</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li><strong>Día 1 vencido:</strong> email amable</li>
            <li><strong>Día 7-15:</strong> email firme con Ley 3/2004</li>
            <li><strong>Día 20:</strong> llamada telefónica directa</li>
            <li><strong>Día 30:</strong> email formal con cálculo de intereses + 40€</li>
            <li><strong>Día 60:</strong> burofax</li>
            <li><strong>Día 90:</strong> procedimiento monitorio</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Paso 3 — Si el cliente dice "no me sirve"</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Excusa típica para no pagar tras la entrega. Tu respuesta:</p>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Lo entregado se ajusta al presupuesto firmado/aceptado. Si hay algún punto concreto que no cumple, dímelo y lo revisamos. Si lo que pides es trabajo nuevo, eso requeriría otra factura."</p>
          </div>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Aceptación tácita:</strong> si pasaron 7-15 días desde la entrega sin que rechazara expresamente, jurídicamente lo aceptó.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Paso 4 — Procedimiento monitorio</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si tras burofax no paga, ve a monitorio. Caso ideal:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ Trabajo entregado documentado</li>
            <li>✓ Factura aceptada (no rechazada en 30 días)</li>
            <li>✓ Burofax notificado</li>
            <li>✓ Deuda exacta y exigible</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Sin abogado si la deuda es &lt;2.000€. Coste: 0€. Tiempo: 1-2 meses.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Truco: derecho de retención de propiedad intelectual</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si entregaste material creativo (diseño, código, contenido):</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ <strong>Cláusula de propiedad intelectual:</strong> "Hasta pago completo, la propiedad intelectual sigue siendo del proveedor"</li>
            <li>✓ <strong>Bloqueo de archivos fuente:</strong> entrega solo PDF preview hasta pago</li>
            <li>✓ <strong>Reclamación por uso indebido:</strong> si lo está usando sin pagar, suma agravante legal</li>
          </ul>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea ejecuta el plan automáticamente</h3>
          <p className="text-zinc-300 mb-5">Importa la factura. Saldea ejecuta toda la secuencia (día 1, 15, 30, 60). Tú solo decides cuándo ir a monitorio. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}

