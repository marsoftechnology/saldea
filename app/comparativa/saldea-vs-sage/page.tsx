import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea vs Sage 50: comparativa contabilidad y cobros 2026',
  description: 'Sage 50 es contabilidad clásica, Saldea es IA de cobros moderna. Análisis honesto: precio, funciones, cuándo usar cada uno y cuándo ambos.',
  alternates: { canonical: 'https://www.marsof.es/comparativa/saldea-vs-sage' },
  keywords: ['saldea vs sage', 'sage 50 cobros', 'alternativa sage', 'sage 50 vs saldea', 'mejor software empresas'],
  openGraph: { title: 'Saldea vs Sage 50: comparativa 2026', description: 'Contabilidad clásica vs cobros con IA.', type: 'article', locale: 'es_ES' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Saldea vs Sage 50: comparativa contabilidad y cobros 2026',
  description: '¿Saldea o Sage 50? Sage 50 es contabilidad completa, Saldea automatiza el cobro de facturas impagadas con IA.',
  author: { '@type': 'Organization', name: 'Marsof Technology' },
  publisher: { '@type': 'Organization', name: 'Marsof Technology', logo: { '@type': 'ImageObject', url: 'https://www.marsof.es/og-image.png' } },
  datePublished: '2026-05-16',
  dateModified: '2026-05-16',
  inLanguage: 'es-ES',
  url: 'https://www.marsof.es/comparativa/saldea-vs-sage',
}

export default function PageVsSage() {
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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea vs Sage 50</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Sage 50 es la herramienta contable clásica de empresas españolas. Saldea es la nueva generación de cobros con IA. No son rivales: son complementarios.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Resumen</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
            <p className="text-zinc-300 mb-3"><strong className="text-sky-400">Sage 50:</strong> ERP contable on-premise/cloud. Lleva contabilidad, facturación, modelos AEAT, almacén, RRHH. Para empresas con departamento financiero.</p>
            <p className="text-zinc-300"><strong className="text-sky-400">Saldea:</strong> SaaS especializado SOLO en perseguir cobros con IA. Sin contabilidad. Solo recordatorios escalados y detección de respuestas.</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Comparativa funcional</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20">
                  <th className="py-3 px-4 text-left text-zinc-100">Función</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Saldea</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Sage 50</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Tipo</td><td className="py-2 px-4">SaaS especializado</td><td className="py-2 px-4">ERP completo</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Contabilidad</td><td className="py-2 px-4">?</td><td className="py-2 px-4">? Completa</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Recordatorios IA</td><td className="py-2 px-4">? Claude</td><td className="py-2 px-4">?</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Modelos AEAT</td><td className="py-2 px-4">?</td><td className="py-2 px-4">?</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Stripe Connect</td><td className="py-2 px-4">?</td><td className="py-2 px-4">?</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Cloud nativo</td><td className="py-2 px-4">?</td><td className="py-2 px-4">Parcial (Sage 50 Cloud)</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Setup</td><td className="py-2 px-4">5 minutos</td><td className="py-2 px-4">Semanas + consultor</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Precio</td><td className="py-2 px-4">49€/mes</td><td className="py-2 px-4">~80-300€/mes según módulos</td></tr>
                <tr><td className="py-2 px-4">Conciliación bancaria automática</td><td className="py-2 px-4">? Plan Max</td><td className="py-2 px-4">?</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo elegir Sage 50</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Empresa con &gt; 10 empleados y departamento financiero</li>
            <li>? Necesitas contabilidad analítica avanzada</li>
            <li>? Tu asesor fiscal exige Sage por compatibilidad</li>
            <li>? Tienes presupuesto para consultor de implantación</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo te basta con Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Eres autónomo o pyme pequeña (1-10 personas)</li>
            <li>? Ya tienes facturación en otro sitio (Holded, Quipu, Anfix)</li>
            <li>? Tu problema es COBRAR, no llevar contabilidad</li>
            <li>? <strong>Conciliación bancaria automática</strong> (Plan Max): detecta automáticamente los cobros bancarios y los cruza con tus facturas pendientes.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Usar ambos: Sage + Saldea</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si tu empresa ya usa Sage 50 y tiene problema con la morosidad, añadir Saldea por 49€/mes complementa perfectamente. Tu equipo financiero sigue con Sage para todo lo contable y Saldea automatiza la persecución de cobros. División clara de tareas.</p>
        </section>

        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Prueba Saldea junto a Sage</h3>
          <p className="text-zinc-300 mb-5">Importa las facturas vencidas de Sage en CSV. Saldea las persigue. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </article>
      <MarketingFooter />
    </div>
  </>
  )
}
