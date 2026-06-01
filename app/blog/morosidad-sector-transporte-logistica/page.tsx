import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morosidad en transporte y logística 2026: plazos y soluciones | Saldea',
  description: 'Cómo cobrar a clientes en el sector del transporte y logística. Plazos legales especiales, cargas y descargas, y la Ley 15/2009 de transporte.',
  alternates: { canonical: 'https://marsof.es/blog/morosidad-sector-transporte-logistica' },
  keywords: ['morosidad transporte', 'cobros transportistas', 'ley 15/2009 transporte', 'transportista factura', 'logistica cobros'],
  openGraph: { title: 'Morosidad en transporte y logística', description: 'Plazos legales y soluciones.', type: 'article', locale: 'es_ES' },
}

export default function PageTransporte() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Sector · 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Morosidad en transporte y logística</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">El sector del transporte tiene su propia ley de plazos de pago: la Ley 15/2009. Más estricta que la genérica. Te explico cómo aprovecharla.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El marco legal del transporte</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">La <strong>Ley 15/2009 del Contrato de Transporte Terrestre de Mercancías</strong> establece que el porte se paga al transportista en un plazo máximo de <strong>30 días naturales</strong> desde la entrega.</p>
          <p className="text-zinc-300 leading-relaxed mb-4">Es más exigente que la Ley 3/2004 (60 días B2B). Protege específicamente a los transportistas que tradicionalmente cobraban a 90-120 días.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plazos según tipo de operación</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-sky-500/20"><th className="py-3 px-4 text-left text-zinc-100">Operación</th><th className="py-3 px-4 text-left text-zinc-100">Plazo máximo</th><th className="py-3 px-4 text-left text-zinc-100">Ley</th></tr></thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Transporte de mercancías</td><td className="py-2 px-4">30 días</td><td className="py-2 px-4">Ley 15/2009</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Operaciones logísticas (almacén, picking)</td><td className="py-2 px-4">60 días</td><td className="py-2 px-4">Ley 3/2004</td></tr>
                <tr><td className="py-2 px-4">Transporte de productos perecederos</td><td className="py-2 px-4">30 días</td><td className="py-2 px-4">Ley 12/2013</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Problemas típicos en el sector</h2>
          <ul className="space-y-3 text-zinc-300 mb-6">
            <li><strong>1. Pago aplazado encubierto:</strong> el cargador insiste en pagar a 90 días "como siempre". Aunque firmes ese contrato, la cláusula es nula. Tienes derecho a cobrar a 30.</li>
            <li><strong>2. Descuento por pronto pago:</strong> "te pago al día si me das 5% descuento". Trampa: si me retraso, ya no soy moroso. Rechaza estas propuestas.</li>
            <li><strong>3. Cesión a un intermediario:</strong> en cadena de subcontratación, cada eslabón aplaza. Si te contrata X, te paga X, no su cliente final.</li>
            <li><strong>4. Retrasos por documentación:</strong> el cargador pide CMR, albarán, otros papeles. Asegúrate de enviar TODO en menos de 48h tras la entrega.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Estrategia anti-morosos en transporte</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>Cláusula Ley 15/2009</strong> expresa en cada presupuesto y factura</li>
            <li><strong>Documentación impecable y rápida:</strong> CMR firmado, albarán sellado, factura emitida en 24h</li>
            <li><strong>Recordatorio el día 31</strong> con cálculo de intereses + 40€</li>
            <li><strong>Llamada al jefe de pagos</strong> al día 40</li>
            <li><strong>Burofax al día 60</strong> mencionando la Ley 15/2009</li>
            <li><strong>Denuncia ante Ministerio de Transportes</strong> en casos graves</li>
            <li><strong>Procedimiento monitorio</strong> si supera 90 días</li>
          </ol>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea automatiza recordatorios con Ley 15/2009</h3>
          <p className="text-zinc-300 mb-5">Configura el plazo de 30 días en tus clientes transporte. Saldea cita la ley correcta. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
