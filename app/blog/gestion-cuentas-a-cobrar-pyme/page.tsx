import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestión de cuentas a cobrar para pymes: guía completa 2026 | Saldea',
  description: 'Cómo gestionar las cuentas a cobrar de tu pyme: clasificación de clientes, KPIs, antigüedad de saldos, política de crédito y automatización. Práctico.',
  alternates: { canonical: 'https://marsof.es/blog/gestion-cuentas-a-cobrar-pyme' },
  keywords: [
    'cuentas a cobrar',
    'gestion cuentas cobrar pyme',
    'aging report',
    'antiguedad saldos',
    'DSO dias venta',
    'politica de credito',
  ],
  openGraph: {
    title: 'Gestión de cuentas a cobrar para pymes',
    description: 'KPIs, política y automatización.',
    type: 'article',
    locale: 'es_ES',
  },
}

export default function PageCuentasCobrar() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Finanzas · 10 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Gestión de cuentas a cobrar para pymes</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">El dinero que tu empresa NO ha cobrado es tu mayor riesgo financiero. Aprende a gestionarlo profesionalmente con KPIs, política de crédito y automatización.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Qué son las cuentas a cobrar?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Las <strong>cuentas a cobrar</strong> (en inglés <em>accounts receivable</em>) son el dinero que tus clientes te deben por facturas emitidas pero no cobradas todavía. Es uno de los activos circulantes más importantes de cualquier pyme.</p>
          <p className="text-zinc-300 leading-relaxed mb-4">Pero cuidado: <strong>no es dinero hasta que entre en tu cuenta bancaria</strong>. Una factura impagada vale lo mismo que un papel en blanco.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">KPIs clave que debes medir</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">1. DSO (Days Sales Outstanding)</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Promedio de días que tardas en cobrar una factura. Fórmula:</p>
          <div className="bg-sky-500/5 border border-sky-500/30 rounded-xl p-5 my-4 text-center">
            <p className="text-zinc-100"><strong>DSO = (Cuentas a cobrar / Ventas) × Días del periodo</strong></p>
          </div>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Ejemplo:</strong> si tienes 30.000€ por cobrar y vendiste 150.000€ en 90 días: DSO = (30.000/150.000) × 90 = <strong>18 días.</strong></p>
          <p className="text-zinc-300 leading-relaxed mb-4">DSO ideal: lo más bajo posible. Si tu DSO &gt; 60 días en B2B España, tienes problema de cobros.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">2. Aging Report (antigüedad de saldos)</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Clasificación de tus cuentas a cobrar por tramos de antigüedad:</p>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20">
                  <th className="py-3 px-4 text-left text-zinc-100">Tramo</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Probabilidad cobro</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Acción</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">0-30 días</td><td className="py-2 px-4">95%+</td><td className="py-2 px-4">Vigilancia normal</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">31-60 días</td><td className="py-2 px-4">85%</td><td className="py-2 px-4">Recordatorio firme</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">61-90 días</td><td className="py-2 px-4">60%</td><td className="py-2 px-4">Llamada + burofax preliminar</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">91-180 días</td><td className="py-2 px-4">30%</td><td className="py-2 px-4">Burofax + amenaza monitorio</td></tr>
                <tr><td className="py-2 px-4">180+ días</td><td className="py-2 px-4">10%</td><td className="py-2 px-4">Monitorio o write-off</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">3. Tasa de morosidad</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">% de facturas que no se cobran nunca. En España B2B la media está en el 5-8%. Si tu tasa supera el 10%, tienes problema serio de selección de clientes.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">4. Concentración de clientes</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Si un solo cliente representa más del 30% de tus cuentas a cobrar, tu pyme está en zona de riesgo. Si impaga, te cae todo.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Política de crédito: el documento que toda pyme debe tener</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Define por escrito CÓMO concedes crédito a clientes nuevos:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li><strong>Verificación previa:</strong> eInforma, Axesor antes de aceptar.</li>
            <li><strong>Límite de crédito por cliente</strong> según tamaño y antigüedad.</li>
            <li><strong>Plazo de pago estándar:</strong> 30 días para nuevos, 60 días para antiguos buenos.</li>
            <li><strong>Anticipo obligatorio:</strong> 30-50% para nuevos clientes.</li>
            <li><strong>Bloqueo automático</strong> si el cliente acumula más de X días vencidos.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Secuencia de reclamación recomendada</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20">
                  <th className="py-3 px-4 text-left text-zinc-100">Día</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Acción</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">-3</td><td className="py-2 px-4">Recordatorio pre-vencimiento</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">1</td><td className="py-2 px-4">Email amable</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">7</td><td className="py-2 px-4">Email firme + Ley 3/2004</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">15</td><td className="py-2 px-4">Llamada telefónica</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">30</td><td className="py-2 px-4">Email formal con intereses + 40€</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">60</td><td className="py-2 px-4">Burofax</td></tr>
                <tr><td className="py-2 px-4">90</td><td className="py-2 px-4">Procedimiento monitorio o cesión a recobros</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Automatización: el cambio de juego</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Gestionar cuentas a cobrar manualmente en una pyme con 50-200 facturas mensuales es <strong>imposible bien hecho</strong>. Te pierdes los plazos, olvidas a clientes, no escalas el tono correctamente.</p>
          <p className="text-zinc-300 leading-relaxed mb-4">La automatización con IA permite:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ Recordatorios automáticos en cada hito (día -3, 1, 7, 15, 30...)</li>
            <li>✓ Escalado del tono según los días de retraso</li>
            <li>✓ Cita automática de Ley 3/2004 + intereses + 40€</li>
            <li>✓ Detección de respuestas del cliente con IA</li>
            <li>✓ Aging report en tiempo real en tu dashboard</li>
            <li>✓ Predicción del DSO mensual</li>
          </ul>
        </section>

        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea es tu departamento de cuentas a cobrar</h3>
          <p className="text-zinc-300 mb-5">Sin necesidad de contratar un crédit manager (3.000€/mes). Saldea ejecuta toda la secuencia, calcula KPIs y te da el aging report en tiempo real. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
