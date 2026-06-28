import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea vs Anfix: comparativa para asesorías y gestorías 2026',
  description: 'Anfix gestiona contabilidad multi-cliente, Saldea persigue cobros con IA. Comparativa honesta y por qué usar ambos en una gestoría.',
  alternates: { canonical: 'https://www.marsof.es/comparativa/saldea-vs-anfix' },
  keywords: [
    'saldea vs anfix',
    'anfix cobros',
    'alternativa anfix',
    'mejor software gestoria',
    'anfix vs saldea',
  ],
  openGraph: {
    title: 'Saldea vs Anfix: comparativa honesta',
    description: 'Para asesorías y gestorías españolas.',
    type: 'article',
    locale: 'es_ES',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Saldea vs Anfix: comparativa para asesorías y gestorías 2026',
  description: '¿Saldea o Anfix? Comparativa para gestorías: cobros automáticos con IA vs software de gestión tradicional.',
  author: { '@type': 'Organization', name: 'Marsof Technology' },
  publisher: { '@type': 'Organization', name: 'Marsof Technology', logo: { '@type': 'ImageObject', url: 'https://www.marsof.es/og-image.png' } },
  datePublished: '2026-05-16',
  dateModified: '2026-05-16',
  inLanguage: 'es-ES',
  url: 'https://www.marsof.es/comparativa/saldea-vs-anfix',
}

export default function PageVsAnfix() {
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
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Comparativa · 7 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Saldea vs Anfix para gestorías</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Si tu gestoría usa Anfix, Saldea es el complemento perfecto. Te explico qué hace cada uno y cómo se integran.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El reparto natural</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
            <p className="text-zinc-300 mb-3"><strong className="text-sky-400">Anfix:</strong> ERP contable para asesorías. Gestiona la contabilidad de TUS clientes (libros de IVA, modelos, balances, nóminas).</p>
            <p className="text-zinc-300"><strong className="text-sky-400">Saldea:</strong> herramienta de cobros. Persigue las facturas impagadas de TUS clientes (o las tuyas) con IA y secuencias automáticas.</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Comparativa funcional</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20">
                  <th className="py-3 px-4 text-left text-zinc-100">Función</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Saldea</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Anfix</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Contabilidad multi-cliente</td><td className="py-2 px-4">?</td><td className="py-2 px-4">?</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Modelos AEAT (303, 130, 390)</td><td className="py-2 px-4">?</td><td className="py-2 px-4">?</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Nóminas</td><td className="py-2 px-4">?</td><td className="py-2 px-4">?</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Veri*factu</td><td className="py-2 px-4">?</td><td className="py-2 px-4">?</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Multi-cliente para gestorías</td><td className="py-2 px-4">? (orgs)</td><td className="py-2 px-4">?</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Recordatorios cobro con IA</td><td className="py-2 px-4">? Claude</td><td className="py-2 px-4">?</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Escalado de tono</td><td className="py-2 px-4">? 4 niveles</td><td className="py-2 px-4">?</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Detección respuestas</td><td className="py-2 px-4">?</td><td className="py-2 px-4">?</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Stripe Connect</td><td className="py-2 px-4">?</td><td className="py-2 px-4">Pasarela</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Precio para gestoría</td><td className="py-2 px-4">49€/mes</td><td className="py-2 px-4">~99€/mes según clientes</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Trial</td><td className="py-2 px-4">30 días con tarjeta</td><td className="py-2 px-4">15 días</td></tr>
                <tr><td className="py-2 px-4">Conciliación bancaria automática</td><td className="py-2 px-4">? Plan Max</td><td className="py-2 px-4">?</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El stack ideal de una gestoría 2026</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si gestionas la contabilidad de varios clientes, la combinación más rentable es:</p>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>Anfix</strong> para la contabilidad, modelos, nóminas, Veri*factu de cada cliente</li>
            <li><strong>Saldea</strong> para perseguir cobros de los clientes que se retrasan</li>
            <li>Vendes Saldea como <strong>servicio premium</strong> a tus clientes: "Te llevo la contabilidad Y te recupero las facturas vencidas"</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El argumento comercial para tu cliente</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Cuando vas a un cliente, no le digas "uso Saldea y Anfix". Dile esto:</p>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 italic">"Te llevo toda la contabilidad mensual (IVA, IRPF, modelos) y, además, persigo automáticamente con IA cualquier factura que se te retrase. Servicio integral: facturas legales + cobros recuperados."</p>
          </div>
          <p className="text-zinc-300 leading-relaxed mb-4">Eso te permite cobrar un fee mensual mayor o vender Saldea como add-on específico (29-49€/mes adicionales por cliente activo).</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Diferencial clave de Saldea</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Lo que NO encuentras en ningún software de gestoría: una IA que <strong>escala el tono progresivamente</strong> (amable ? firme ? formal con Ley 3/2004 ? previo a burofax) y <strong>entiende las respuestas</strong> de los morosos (paga, dispute, promesa, vacaciones).</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>Conciliación bancaria automática</strong> (Plan Max): detecta automáticamente los cobros bancarios y los cruza con tus facturas pendientes.</li>
          </ul>
        </section>

        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Pruébalo con uno de tus clientes</h3>
          <p className="text-zinc-300 mb-5">Coge el cliente que más facturas vencidas tiene. Importa sus facturas en Saldea. En 30 días sabrás si tu gestoría puede vender esto como servicio premium. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </article>

      <MarketingFooter />
    </div>
  </>
  )
}
