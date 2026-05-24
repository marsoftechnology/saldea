import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Psicología de precios en SaaS B2B: cómo cobrar más sin perder clientes | Saldea',
  description: 'Cómo poner precio a tu SaaS B2B: anclajes, precio psicológico (49 vs 50), tres planes, value-based pricing y errores típicos. Guía 2026.',
  alternates: { canonical: 'https://marsof.es/blog/psicologia-precios-saas-b2b' },
  keywords: ['psicologia precios SaaS', 'precio software B2B', 'value based pricing', 'precio psicologico', 'pricing SaaS estrategia'],
  openGraph: { title: 'Psicología de precios en SaaS B2B', description: 'Cómo cobrar más sin perder clientes.', type: 'article', locale: 'es_ES' },
}

export default function PagePrecios() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Estrategia · 7 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Psicología de precios en SaaS B2B</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Cómo poner precio a un software B2B sin equivocarse. Anclajes, precio psicológico y errores que cometen el 90% de los SaaS españoles.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El error más caro: precio basado en coste</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">El 90% de los SaaS españoles ponen precio mirando: ¿qué me cuesta producirlo? + margen. Es la peor forma. En B2B el precio debe ser <strong>value-based</strong>: cuánto vale para el cliente lo que le ahorras.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Ejemplo Saldea:</strong> si te ahorra 5 horas/semana y tu tiempo vale 30€/hora, vale 600€/mes. Cobrar 49€ es regalo. Si te ahorra 10.000€ de morosos al año, vale 500€/mes. Cobrar 49€ es robarte... a ti mismo.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Truco 1: el precio psicológico</h2>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>49€ vs 50€</strong>: el primero se percibe ~30% más barato aunque sea 1€ menos. Lo mismo con 99€/79€/29€.</p>
          <p className="text-zinc-300 leading-relaxed mb-4">Funciona porque tu cerebro lee de izquierda a derecha y se ancla en el primer dígito. 4_ vs 5_.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Truco 2: el efecto anclaje (3 planes)</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Nunca pongas solo 1 plan. Pon 3:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ <strong>Plan barato (Free / 19€):</strong> ancla en barato para que el medio parezca razonable</li>
            <li>✓ <strong>Plan medio (49€):</strong> el que QUIERES que compren. Márcalo "Más popular"</li>
            <li>✓ <strong>Plan caro (99€):</strong> el ancla cara para que el medio parezca barato</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">El plan caro casi nadie lo compra. Pero hace que el medio se venda más.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Truco 3: anual con descuento del 15-17%</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">499€/año vs 588€/año (49×12). Le das al cliente la sensación de "casi 2 meses gratis" pagando anual. Te beneficia:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ Cobras 1 año de golpe (mejor liquidez)</li>
            <li>✓ Reduces churn a la mitad</li>
            <li>✓ Cliente compromiso anual = lo usa más</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Truco 4: el trial sin tarjeta vs con tarjeta</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li><strong>Trial sin tarjeta:</strong> 5-10x más activaciones, pero 60% de los usuarios abandona</li>
            <li><strong>Trial con tarjeta:</strong> 3x menos activaciones, pero 80% se queda</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">En B2B serio, mejor con tarjeta (segmentas mejor). En B2B masivo o early-stage, sin tarjeta (necesitas volumen para aprender).</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Truco 5: el grandfather pricing</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Cuando subas precio, mantén el viejo precio a los clientes existentes. Llamarlo "Grandfather price". Ventajas:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ Reduces churn al subir precio</li>
            <li>✓ Los clientes antiguos sienten que ganan</li>
            <li>✓ Da urgencia a nuevos para no perderse precio bajo</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Errores típicos</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>❌ Solo 1 plan (sin anclaje)</li>
            <li>❌ Precio redondo (50€, 100€) en lugar de psicológico</li>
            <li>❌ NO ofrecer descuento anual</li>
            <li>❌ Demasiados planes (el cliente se paraliza)</li>
            <li>❌ Esconder precios (le matas la conversión)</li>
            <li>❌ Bajar el precio cuando no convierten (cambia el mensaje primero)</li>
          </ul>
        </section>
        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">¿Cuánto pagarías por dejar de perseguir cobros?</h3>
          <p className="text-zinc-300 mb-5">Saldea cuesta 49€/mes. Si te ahorra 2 horas/semana, ya está pagado. <strong>15 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
