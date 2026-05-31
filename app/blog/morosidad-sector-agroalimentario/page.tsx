import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morosidad sector agroalimentario 2026: cobrar a cadenas y mayoristas | Saldea',
  description: 'Cómo cobrar a cadenas de supermercados y mayoristas en el sector agroalimentario. Ley de la Cadena Alimentaria, plazos legales y cláusulas.',
  alternates: { canonical: 'https://marsof.es/blog/morosidad-sector-agroalimentario' },
  keywords: ['cobrar agroalimentario', 'ley cadena alimentaria', 'cobrar supermercados', 'productor frutas cobros', 'cooperativa cobros'],
  openGraph: { title: 'Morosidad sector agroalimentario', description: 'Cobrar a cadenas y mayoristas.', type: 'article', locale: 'es_ES' },
}

export default function PageAgro() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Sector · 8 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Morosidad en el sector agroalimentario</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Productores, cooperativas y mayoristas tienen una ley específica que protege sus cobros: la Ley de la Cadena Alimentaria. Pero hay que saber usarla.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El marco legal específico</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">La <strong>Ley 12/2013 de la Cadena Alimentaria</strong> (modificada por Ley 16/2021) establece plazos máximos de pago especialmente cortos para productos agroalimentarios.</p>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20"><th className="py-3 px-4 text-left text-zinc-100">Producto</th><th className="py-3 px-4 text-left text-zinc-100">Plazo máximo</th></tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Productos perecederos (frutas, hortalizas, lácteos, carne fresca)</td><td className="py-2 px-4">30 días</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Resto de alimentos</td><td className="py-2 px-4">60 días</td></tr>
                <tr><td className="py-2 px-4">Cualquier sancionable</td><td className="py-2 px-4">Imperativos, no pactables</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Quién está obligado por la Ley de la Cadena</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ Industria alimentaria que compra a productores</li>
            <li>✓ Cadenas de supermercados (Mercadona, Carrefour, Lidl, Eroski, Día, El Corte Inglés)</li>
            <li>✓ Mayoristas y distribuidores</li>
            <li>✓ Cualquier operador que pague a un productor primario o cooperativa</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Sanciones por incumplir</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>🔴 <strong>Pagar fuera de plazo:</strong> infracción grave, multa de 3.001 a 100.000€</li>
            <li>🔴 <strong>Pacto de plazo superior:</strong> infracción muy grave, hasta 1.000.000€</li>
            <li>🔴 <strong>Reincidencia:</strong> el doble</li>
            <li>📢 <strong>Denuncia:</strong> AICA (Agencia de Información y Control Alimentarios)</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cómo cobrar a una cadena que se retrasa</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>Día 1 vencimiento:</strong> recordatorio amable mencionando expresamente la Ley 12/2013</li>
            <li><strong>Día 7:</strong> recordatorio firme con cálculo de intereses + 40€ por factura</li>
            <li><strong>Día 15:</strong> llamada al jefe de proveedores / departamento de pagos</li>
            <li><strong>Día 30:</strong> burofax + amenaza de denuncia a AICA</li>
            <li><strong>Día 45:</strong> denuncia REAL a AICA si persiste el impago</li>
          </ol>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Truco que pocos saben:</strong> denunciar a AICA es gratis y muy efectivo. Las cadenas grandes temen estas denuncias porque les ponen el foco. Muchas veces pagan al día siguiente de recibir aviso.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cláusulas clave en contratos agroalimentarios</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ <strong>Plazo de pago:</strong> 30 días (perecederos) o 60 días (resto)</li>
            <li>✓ <strong>Ley 12/2013 expresa</strong> mencionada</li>
            <li>✓ <strong>Anticipo en cooperativas:</strong> habitual 30-50%</li>
            <li>✓ <strong>Cláusula de devolución</strong> con plazos cortos (24h para perecederos)</li>
            <li>✓ <strong>Sin pactos accesorios</strong> que disfracen pagos tardíos (descuentos por pronto pago disfrazados de plazos largos)</li>
          </ul>
        </section>

        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea conoce la Ley 12/2013</h3>
          <p className="text-zinc-300 mb-5">Los recordatorios automáticos citan la Ley de la Cadena Alimentaria cuando corresponde. Ideal para cooperativas, productores y mayoristas. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
