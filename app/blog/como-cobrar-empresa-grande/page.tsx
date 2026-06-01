import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo cobrar a una empresa grande sin ser pequeño | Saldea',
  description: 'Las grandes empresas pagan a 90-120 días por sistema. Te explico cómo navegar sus procesos y reducir tu DSO con ellas.',
  alternates: { canonical: 'https://marsof.es/blog/como-cobrar-empresa-grande' },
  keywords: ['cobrar empresa grande', 'cobrar multinacional', 'departamento pagos', 'cobrar a corporativos'],
  openGraph: { title: 'Cómo cobrar a una empresa grande', description: 'Navega sus procesos.', type: 'article', locale: 'es_ES' },
}

export default function Page() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso especial · 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cómo cobrar a una empresa grande sin ser pequeño</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Multinacionales y corporativos pagan a 90-120 días por SISTEMA, no por mala fe. Te explico cómo navegar.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">La realidad del corporativo</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">En empresas grandes el proceso de pago es:</p>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li>Tú emites factura</li>
            <li>Cliente la recibe en departamento de facturación</li>
            <li>La pasan al validador interno</li>
            <li>Pasa a aprobador (manager)</li>
            <li>Pasa a tesorería</li>
            <li>Tesorería paga en la próxima "tanda" (que puede ser quincenal o mensual)</li>
          </ol>
          <p className="text-zinc-300 leading-relaxed mb-4">Resultado: 60-120 días de promedio, sin mala intención. Pero matando tu liquidez.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Estrategia 1 — Conoce los procesos del cliente</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Pregunta DESDE EL DÍA 1:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>"¿Cuál es vuestro plazo estándar de pago?"</li>
            <li>"¿A quién debo enviar las facturas?"</li>
            <li>"¿Necesito alguna referencia (PO number, código)?"</li>
            <li>"¿En qué día del mes se procesan los pagos?"</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Estrategia 2 — Factura impecable</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Cualquier error en la factura te puede costar 30 días extra. Asegúrate de:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ Número de pedido del cliente (Purchase Order)</li>
            <li>✓ Datos fiscales correctos exactamente como ellos los tienen</li>
            <li>✓ Concepto detallado (no "servicios prestados")</li>
            <li>✓ IVA bien aplicado</li>
            <li>✓ IBAN correcto</li>
            <li>✓ Formato Facturae XML si es Administración pública</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Estrategia 3 — Seguimiento a cada eslabón</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li><strong>Día 7:</strong> "Confirmadme que recibieron la factura X y está aprobada en sistema"</li>
            <li><strong>Día 30:</strong> "¿Está en cola de pago? ¿Para qué semana está prevista?"</li>
            <li><strong>Día 60:</strong> "La factura tiene 60 días. Necesito fecha concreta de pago"</li>
            <li><strong>Día 75:</strong> Llamar al jefe de pagos directamente</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Estrategia 4 — Cita la Ley 3/2004</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Las grandes empresas TEMEN a la Ley 3/2004 porque les sale caro. Pasados 60 días, comunica formalmente:</p>
          <div className="bg-zinc-900/40 border-l-4 border-amber-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Conforme a la Ley 3/2004, desde el día 61 se devengan intereses del 12,5% anual + indemnización de 40€ por costes de cobro. A día de hoy adeudo asciende a [importe + intereses calculados]. Confirmadme fecha de pago para evitar el recargo."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Estrategia 5 — Confirming si lo ofrecen</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Muchas grandes empresas ofrecen "confirming" (factoring inverso): un banco te paga antes y la empresa le paga al banco. Coste para ti: 1-3% de la factura. Si la liquidez es crítica, vale la pena.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo decir NO</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>❌ Si te exigen pago a 180 días: NO. Aunque sea Inditex.</li>
            <li>❌ Si te dicen "es nuestro plazo, no negocia": busca otros clientes</li>
            <li>❌ Si te bloquean facturas por errores absurdos cada vez: no merece la pena</li>
          </ul>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea automatiza el seguimiento por eslabones</h3>
          <p className="text-zinc-300 mb-5">Programa los recordatorios cada hito (recibida, aprobada, en pago). Sin que olvides nada. Para empresas grandes, esto vale oro. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
