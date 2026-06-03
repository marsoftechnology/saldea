import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cuándo mandar un burofax a un cliente moroso (2026) | Marsof',
  description: 'Los 4 momentos exactos donde el burofax tiene máximo efecto. Cuánto cuesta, cómo redactarlo y por qué muchos pagan tras recibirlo.',
  alternates: { canonical: 'https://marsof.es/blog/cuando-mandar-burofax-cliente' },
  keywords: ['cuándo mandar burofax', 'momento burofax moroso', 'burofax efectivo', 'cuándo enviar burofax', 'plazo burofax cliente'],
  openGraph: { title: 'Cuándo mandar un burofax a un cliente', description: 'Los 4 momentos correctos.', type: 'article', locale: 'es_ES' },
}

export default function Page() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Vía formal · 5 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cuándo mandar un burofax a un cliente moroso</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">El burofax tiene un timing exacto. Demasiado pronto rompes la relación. Demasiado tarde pierdes el cobro.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El momento ideal: día 60</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">En operaciones B2B la regla práctica es: <strong>burofax al día 60-75 de vencimiento</strong>. Para ese momento ya has enviado:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ Día 1: email amable</li>
            <li>✓ Día 7: email firme</li>
            <li>✓ Día 15: llamada telefónica</li>
            <li>✓ Día 30: email formal con cálculo de intereses</li>
            <li>✓ Día 60: <strong>BUROFAX</strong></li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Los 4 momentos donde el burofax es eficaz</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">1. Cliente que no responde a nada (día 60)</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Si no contesta emails, llamadas ni WhatsApps, el burofax es la única forma de garantizar que recibe tu reclamación. Y al hacerlo formal, muchos pagan en 48h.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">2. Cliente que da excusas indefinidamente</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">"La semana que viene", "estoy a la espera de cobros", "el banco anda raro"... Si lleva más de un mes con excusas, el burofax corta la dinámica.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">3. Antes del procedimiento monitorio</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">El burofax es prueba documental imprescindible. Si vas a monitorio en 30-60 días, manda burofax YA para tener evidencia.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">4. Cliente que está a punto de cerrar</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Si oyes rumores de concurso de acreedores o cierre, manda burofax inmediato. Te coloca como acreedor diligente y mejora tu posición legal.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo NO mandar burofax todavía</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>❌ Sin haber enviado al menos 2-3 emails previos</li>
            <li>❌ Sin haber llamado por teléfono</li>
            <li>❌ Si la deuda es inferior a 200€ (no merece la pena el coste)</li>
            <li>❌ Si hay disputa real abierta (puede empeorarla)</li>
            <li>❌ Si el cliente está negociando un plan de pago de buena fe</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Coste y efectividad real</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>💶 <strong>Coste:</strong> 28-35€</li>
            <li>📊 <strong>Tasa de respuesta:</strong> 50-70% paga tras recibirlo</li>
            <li>⏱️ <strong>Tiempo de envío:</strong> 10 min online en Correos.es</li>
            <li>🎯 <strong>ROI:</strong> si la deuda es ≥ 500€, casi seguro vale la pena</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Qué ocurre tras enviar el burofax</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>Día 1:</strong> Correos intenta entregar. Si lo recoge → firmado y entregado.</li>
            <li><strong>Día 2-3:</strong> Si no estaba en casa, dejan aviso. Cliente puede ir a recogerlo.</li>
            <li><strong>Día 7-15:</strong> Si no lo recoge, se considera "ausente" pero a efectos legales <strong>SÍ está entregado</strong>.</li>
            <li><strong>Tú recibes:</strong> PDF de Correos con acuse de recibo + certificación de contenido. Prueba documental al 100%.</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Tras el burofax: 3 escenarios</h2>
          <ul className="space-y-3 text-zinc-300 mb-6">
            <li><strong>1. Paga en 7-10 días:</strong> caso resuelto. ~60% de los casos.</li>
            <li><strong>2. Negocia plan de pago:</strong> acepta si te conviene, por escrito. ~20%.</li>
            <li><strong>3. Sigue sin responder:</strong> tienes 90 días para monitorio. ~20%.</li>
          </ul>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea genera el burofax listo para enviar</h3>
          <p className="text-zinc-300 mb-5">Si tu cliente no paga al día 60, Saldea te genera el texto formal con cálculo de intereses + 40€ + amenaza de monitorio. Solo pegas en Correos.es. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}

