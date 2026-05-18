import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea vs Anfix: comparativa para asesorÃ­as y gestorÃ­as 2026',
  description: 'Anfix gestiona contabilidad multi-cliente, Saldea persigue cobros con IA. Comparativa honesta y por quÃ© usar ambos en una gestorÃ­a.',
  alternates: { canonical: 'https://marsof.es/comparativa/saldea-vs-anfix' },
  keywords: [
    'saldea vs anfix',
    'anfix cobros',
    'alternativa anfix',
    'mejor software gestoria',
    'anfix vs saldea',
  ],
  openGraph: {
    title: 'Saldea vs Anfix: comparativa honesta',
    description: 'Para asesorÃ­as y gestorÃ­as espaÃ±olas.',
    type: 'article',
    locale: 'es_ES',
  },
}

export default function PageVsAnfix() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-zinc-100">Marsof / Saldea</Link>
          <div className="flex items-center gap-2">
<Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">1 mes gratis</Link>
          </div>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Comparativa Â· 7 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Saldea vs Anfix para gestorÃ­as</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Si tu gestorÃ­a usa Anfix, Saldea es el complemento perfecto. Te explico quÃ© hace cada uno y cÃ³mo se integran.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El reparto natural</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
            <p className="text-zinc-300 mb-3"><strong className="text-sky-400">Anfix:</strong> ERP contable para asesorÃ­as. Gestiona la contabilidad de TUS clientes (libros de IVA, modelos, balances, nÃ³minas).</p>
            <p className="text-zinc-300"><strong className="text-sky-400">Saldea:</strong> herramienta de cobros. Persigue las facturas impagadas de TUS clientes (o las tuyas) con IA y secuencias automÃ¡ticas.</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Comparativa funcional</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20">
                  <th className="py-3 px-4 text-left text-zinc-100">FunciÃ³n</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Saldea</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Anfix</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Contabilidad multi-cliente</td><td className="py-2 px-4">âŒ</td><td className="py-2 px-4">âœ…</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Modelos AEAT (303, 130, 390)</td><td className="py-2 px-4">âŒ</td><td className="py-2 px-4">âœ…</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">NÃ³minas</td><td className="py-2 px-4">âŒ</td><td className="py-2 px-4">âœ…</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Veri*factu</td><td className="py-2 px-4">âŒ</td><td className="py-2 px-4">âœ…</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Multi-cliente para gestorÃ­as</td><td className="py-2 px-4">âœ… (orgs)</td><td className="py-2 px-4">âœ…</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Recordatorios cobro con IA</td><td className="py-2 px-4">âœ… Claude</td><td className="py-2 px-4">âŒ</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Escalado de tono</td><td className="py-2 px-4">âœ… 4 niveles</td><td className="py-2 px-4">âŒ</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">DetecciÃ³n respuestas</td><td className="py-2 px-4">âœ…</td><td className="py-2 px-4">âŒ</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Stripe Connect</td><td className="py-2 px-4">âœ…</td><td className="py-2 px-4">Pasarela</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Precio para gestorÃ­a</td><td className="py-2 px-4">49â‚¬/mes</td><td className="py-2 px-4">~99â‚¬/mes segÃºn clientes</td></tr>
                <tr><td className="py-2 px-4">Trial</td><td className="py-2 px-4">30 dÃ­as sin tarjeta</td><td className="py-2 px-4">15 dÃ­as</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El stack ideal de una gestorÃ­a 2026</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si gestionas la contabilidad de varios clientes, la combinaciÃ³n mÃ¡s rentable es:</p>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>Anfix</strong> para la contabilidad, modelos, nÃ³minas, Veri*factu de cada cliente</li>
            <li><strong>Saldea</strong> para perseguir cobros de los clientes que se retrasan</li>
            <li>Vendes Saldea como <strong>servicio premium</strong> a tus clientes: "Te llevo la contabilidad Y te recupero las facturas vencidas"</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El argumento comercial para tu cliente</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Cuando vas a un cliente, no le digas "uso Saldea y Anfix". Dile esto:</p>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 italic">"Te llevo toda la contabilidad mensual (IVA, IRPF, modelos) y, ademÃ¡s, persigo automÃ¡ticamente con IA cualquier factura que se te retrase. Servicio integral: facturas legales + cobros recuperados."</p>
          </div>
          <p className="text-zinc-300 leading-relaxed mb-4">Eso te permite cobrar un fee mensual mayor o vender Saldea como add-on especÃ­fico (29-49â‚¬/mes adicionales por cliente activo).</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Diferencial clave de Saldea</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Lo que NO encuentras en ningÃºn software de gestorÃ­a: una IA que <strong>escala el tono progresivamente</strong> (amable â†’ firme â†’ formal con Ley 3/2004 â†’ previo a burofax) y <strong>entiende las respuestas</strong> de los morosos (paga, dispute, promesa, vacaciones).</p>
        </section>

        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">PruÃ©balo con uno de tus clientes</h3>
          <p className="text-zinc-300 mb-5">Coge el cliente que mÃ¡s facturas vencidas tiene. Importa sus facturas en Saldea. En 30 dÃ­as sabrÃ¡s si tu gestorÃ­a puede vender esto como servicio premium. <strong>1 mes gratis sin tarjeta.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis â†’</Link>
        </aside>
      </article>

      <MarketingFooter />
    </div>
  )
}
