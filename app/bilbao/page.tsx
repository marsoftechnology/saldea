import Link from 'next/link'
import type { Metadata } from 'next'
import ThemeToggleNav from '../components/ThemeToggleNav'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea en Bilbao: software de cobros para empresas vascas',
  description: 'Software de cobros automáticos para autónomos, gestorías y pymes de Bilbao, País Vasco. Compatible con TicketBAI. IA, Ley 3/2004. 1 mes gratis.',
  alternates: { canonical: 'https://marsof.es/bilbao' },
  keywords: ['software cobros Bilbao', 'gestoría Bilbao', 'autónomo Bilbao facturas', 'Saldea Bilbao', 'TicketBAI cobros', 'pyme Vizcaya'],
  openGraph: { title: 'Saldea en Bilbao', description: 'Software de cobros con IA, compatible TicketBAI.', type: 'website', locale: 'es_ES' },
}

const schema = {
  '@context': 'https://schema.org', '@type': 'Service',
  serviceType: 'Software de cobros automáticos con IA',
  provider: { '@id': 'https://marsof.es/#organization' },
  areaServed: { '@type': 'City', name: 'Bilbao' },
}

export default function PageBilbao() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-sm font-bold text-zinc-100">Marsof / Saldea</Link>
            <div className="flex items-center gap-2">
              <ThemeToggleNav />
              <Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">1 mes gratis</Link>
            </div>
          </div>
        </nav>
        <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6"><span>📍 Atendiendo Bilbao y País Vasco</span></div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea para empresas vascas: Bilbao, Bizkaia y más</h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">El País Vasco tiene un tejido industrial fuerte y un sistema fiscal propio (TicketBAI). Saldea convive perfectamente: tú facturas con tu software TicketBAI y Saldea persigue los cobros con IA cuando se retrasan.</p>
          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Sectores vascos donde más encaja Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-8">
            <li>🏭 <strong>Industria y siderurgia</strong> (Bizkaia, Gipuzkoa)</li>
            <li>⚙️ <strong>Máquina-herramienta</strong> y proveedores</li>
            <li>📊 <strong>Asesorías y gestorías</strong> de Bilbao, San Sebastián, Vitoria</li>
            <li>🚢 <strong>Logística y portuarias</strong> de Bilbao</li>
            <li>🛡️ <strong>Empresas tecnológicas</strong> del Parque Tecnológico de Bizkaia</li>
            <li>🏗️ <strong>Construcción industrial</strong></li>
          </ul>
          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">¿Qué es TicketBAI y cómo afecta a Saldea?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>TicketBAI</strong> es el sistema obligatorio de facturación electrónica del País Vasco. TU software de facturación se encarga de cumplirlo (Holded, Anfix, FacturaScripts...). Saldea NO emite facturas, solo persigue cobros, por lo que no afecta directamente al cumplimiento TicketBAI.</p>
          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Por qué encaja en el País Vasco</h2>
          <ul className="space-y-3 text-zinc-300 mb-8">
            <li>✓ Industria con <strong>plazos de cobro largos</strong> (60-120 días)</li>
            <li>✓ <strong>IA en castellano</strong></li>
            <li>✓ <strong>Compatible con TicketBAI</strong> (tu software se encarga)</li>
            <li>✓ <strong>Cumple Ley 3/2004</strong></li>
            <li>✓ <strong>1 mes gratis</strong> sin tarjeta</li>
          </ul>
          <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center mt-12">
            <h2 className="text-2xl font-bold mb-2">Pruébalo desde Bilbao</h2>
            <p className="text-zinc-400 mb-6">5 min para activarlo. 1 mes para probarlo. 0€ hasta entonces.</p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis →</Link>
          </div>
        </section>
        <MarketingFooter />
      </div>
    </>
  )
}
