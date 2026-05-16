import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morosidad en retail y comercio 2026: cobrar a tiendas y minoristas | Saldea',
  description: 'Cómo cobrar facturas a tiendas, comercios y minoristas. Plazos, estacionalidad y estrategias específicas para proveedores de retail.',
  alternates: { canonical: 'https://marsof.es/blog/morosidad-sector-retail-comercio' },
  keywords: ['cobrar tiendas', 'morosidad retail', 'comercio impagos', 'proveedor retail', 'cobrar minoristas'],
  openGraph: { title: 'Morosidad en retail y comercio', description: 'Cobrar a tiendas y minoristas.', type: 'article', locale: 'es_ES' },
}

export default function PageRetail() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Sector · 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Morosidad en retail y comercio</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Si eres proveedor de tiendas, comercios o cadenas minoristas, conoces el desafío: estacionalidad, devoluciones y plazos largos. Aquí las claves.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Tipos de cliente retail</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-sky-500/20"><th className="py-3 px-4 text-left text-zinc-100">Tipo</th><th className="py-3 px-4 text-left text-zinc-100">Plazo</th><th className="py-3 px-4 text-left text-zinc-100">Riesgo</th></tr></thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Cadena grande (Inditex, El Corte Inglés)</td><td className="py-2 px-4">60-90 días</td><td className="py-2 px-4">Bajo</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Cadena mediana</td><td className="py-2 px-4">60 días</td><td className="py-2 px-4">Medio</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Tienda multimarca</td><td className="py-2 px-4">30-60 días</td><td className="py-2 px-4">Medio</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Tienda independiente</td><td className="py-2 px-4">30 días</td><td className="py-2 px-4">Alto</td></tr>
                <tr><td className="py-2 px-4">Ecommerce minorista</td><td className="py-2 px-4">7-30 días</td><td className="py-2 px-4">Medio-Alto</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Particularidades del retail</h2>
          <ul className="space-y-3 text-zinc-300 mb-6">
            <li><strong>1. Estacionalidad brutal:</strong> en enero y septiembre las tiendas tienen menos liquidez. Aprovecha la temporada alta para cobrar todo.</li>
            <li><strong>2. Devoluciones de productos:</strong> el cliente puede devolver y aplazar la factura. Conviene cláusula estricta sobre devoluciones (30 días, en perfecto estado).</li>
            <li><strong>3. Descuentos por pronto pago:</strong> son trampa habitual. "Te pago al día si me das 5%". Si te retrasas, no eres moroso. Cuidado.</li>
            <li><strong>4. Cuentas con desplazamiento:</strong> "Te pago la del mes anterior". Habitual pero pone tu liquidez en riesgo.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Estrategia anti-morosos en retail</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>Verifica el comercio</strong> en eInforma antes de cuentas grandes</li>
            <li><strong>Anticipo o cobro contra-reembolso</strong> en tiendas nuevas</li>
            <li><strong>Domiciliación SEPA</strong> para clientes recurrentes pequeños</li>
            <li><strong>Recordatorios automáticos</strong> según plazo pactado (30/60 días)</li>
            <li><strong>Suspensión de envíos</strong> si más de 15 días vencido</li>
            <li><strong>Burofax + Ley 3/2004</strong> al día 60-90</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Señales de cierre de un comercio</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>🚩 Te empiezan a pedir descuentos o "pago a fin de temporada"</li>
            <li>🚩 Reducen pedidos repentinamente</li>
            <li>🚩 No contesta el dueño, solo dependientes</li>
            <li>🚩 Empieza a aparecer en listas de impagos del gremio</li>
            <li>🚩 Está en concurso preventivo (BORME.es)</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Si ves estas señales: <strong>suspende envíos, exige cobro contra-entrega y reclama lo pendiente con urgencia</strong>. En retail, cuando una tienda cierra, los proveedores son los últimos en cobrar.</p>
        </section>
        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea para proveedores de retail</h3>
          <p className="text-zinc-300 mb-5">Configura plazos por tipo de cliente, recordatorios estacionales y escalado automático. <strong>1 mes gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
