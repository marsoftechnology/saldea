import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea vs Billin: facturación vs cobros automáticos 2026',
  description: 'Billin factura, Saldea cobra. Comparativa honesta: precio, funciones y por qué usar ambos en autónomos y pymes españolas.',
  alternates: { canonical: 'https://www.marsof.es/comparativa/saldea-vs-billin' },
  keywords: ['saldea vs billin', 'billin cobros', 'alternativa billin', 'mejor software autonomos', 'billin vs saldea'],
  openGraph: { title: 'Saldea vs Billin: comparativa 2026', description: 'Facturación + cobros automáticos.', type: 'article', locale: 'es_ES' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Saldea vs Billin: facturación vs cobros automáticos 2026',
  description: '¿Saldea o Billin? Comparativa: Billin factura, Saldea cobra automáticamente con IA cuando el cliente no paga.',
  author: { '@type': 'Organization', name: 'Marsof Technology' },
  publisher: { '@type': 'Organization', name: 'Marsof Technology', logo: { '@type': 'ImageObject', url: 'https://www.marsof.es/og-image.png' } },
  datePublished: '2026-05-16',
  dateModified: '2026-05-16',
  inLanguage: 'es-ES',
  url: 'https://www.marsof.es/comparativa/saldea-vs-billin',
}

export default function PageVsBillin() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-zinc-100">Marsof / Saldea</Link>
          <div className="flex items-center gap-2">
<Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">30 días gratis</Link>
          </div>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Comparativa · 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea vs Billin</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Billin emite facturas legales. Saldea persigue los cobros con IA. Son herramientas que cubren etapas distintas. Aquí va el análisis.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Resumen</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
            <p className="text-zinc-300 mb-3"><strong className="text-sky-400">Billin:</strong> software de facturación gratuito (con planes de pago) para autónomos. Buenas plantillas, fácil de usar, Veri*factu homologado.</p>
            <p className="text-zinc-300"><strong className="text-sky-400">Saldea:</strong> NO emite facturas. PERSIGUE las facturas que ya emitiste con IA cuando el cliente se retrasa.</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Comparativa funcional</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20">
                  <th className="py-3 px-4 text-left text-zinc-100">Función</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Saldea</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Billin</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Emitir facturas</td><td className="py-2 px-4">?</td><td className="py-2 px-4">?</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Veri*factu</td><td className="py-2 px-4">?</td><td className="py-2 px-4">?</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Recordatorios automáticos</td><td className="py-2 px-4">? con IA</td><td className="py-2 px-4">Básicos (manuales)</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Escalado tono IA</td><td className="py-2 px-4">? 4 niveles</td><td className="py-2 px-4">?</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Detección respuestas</td><td className="py-2 px-4">? Claude</td><td className="py-2 px-4">?</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Stripe Connect</td><td className="py-2 px-4">? nativo</td><td className="py-2 px-4">Parcial</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Plan gratis</td><td className="py-2 px-4">Limitado (3 facturas)</td><td className="py-2 px-4">Sí (con límites)</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Plan Pro</td><td className="py-2 px-4">49€/mes</td><td className="py-2 px-4">~15-30€/mes</td></tr>
                <tr><td className="py-2 px-4">Conciliación bancaria automática</td><td className="py-2 px-4">? Plan Max</td><td className="py-2 px-4">?</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El stack perfecto del autónomo: Billin + Saldea</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si eres autónomo en España, esta combinación es de las más eficientes:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>Billin gratis o ~15€/mes</strong> ? emites facturas, cumples Veri*factu, llevas libro IVA</li>
            <li>? <strong>Saldea 49€/mes</strong> ? automatiza la persecución de cobros con IA</li>
            <li>Total: ~65€/mes para tener todo el ciclo desde la emisión hasta el cobro</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo solo necesitas Billin</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Autónomo principiante con pocos clientes</li>
            <li>? Tus clientes pagan rápido (B2C o domiciliación SEPA)</li>
            <li>? Volumen bajo (1-3 facturas/mes)</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo añadir Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Facturas a empresas que pagan tarde</li>
            <li>? Más de 5 facturas/mes</li>
            <li>? Dedicas tiempo a perseguir cobros manualmente</li>
            <li>? Tienes facturas vencidas pendientes ahora mismo</li>
            <li>? <strong>Conciliación bancaria automática</strong> (Plan Max): detecta automáticamente los cobros bancarios y los cruza con tus facturas pendientes.</li>
          </ul>
        </section>

        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Conecta Billin + Saldea hoy</h3>
          <p className="text-zinc-300 mb-5">Importa CSV desde Billin. Saldea persigue. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </article>
      <MarketingFooter />
    </div>
  </>
  )
}
