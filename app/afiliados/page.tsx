import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Programa de afiliados Marsof: gana recomendando Saldea | Marsof',
  description: 'Programa de afiliados de Saldea para gestorías, consultores, asesores y creadores de contenido. Comisión recurrente del 20% el primer año.',
  alternates: { canonical: 'https://marsof.es/afiliados' },
  keywords: ['programa afiliados Saldea', 'partners Marsof', 'referidos software cobros', 'ganar dinero recomendando', 'afiliado SaaS espana'],
  openGraph: { title: 'Programa de afiliados Marsof', description: 'Gana 20% recurrente recomendando Saldea.', type: 'website', locale: 'es_ES' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Programa de afiliados SaaS',
  name: 'Programa de afiliados Marsof / Saldea',
  description: 'Gana una comisión recurrente del 20% durante el primer año recomendando Saldea a gestorías, autónomos y pymes.',
  provider: { '@id': 'https://marsof.es/#organization' },
  offers: { '@type': 'Offer', description: '20% de comisión recurrente el primer año', priceCurrency: 'EUR' },
  url: 'https://www.marsof.es/afiliados',
}

export default function PageAfiliados() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-zinc-100">Marsof / Saldea</Link>
          <div className="flex items-center gap-2">
<Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">30 días gratis</Link></div>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6"><span>💰 Programa de afiliados</span></div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Gana recomendando Saldea</h1>
        <p className="text-zinc-400 text-lg leading-relaxed mb-12">¿Eres asesor, gestor, consultor o creas contenido sobre pymes? Únete al programa de afiliados de Marsof y gana una comisión recurrente del <strong className="text-sky-400">20%</strong> por cada cliente que traigas, durante todo el primer año.</p>

        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-sky-400">20%</p>
            <p className="text-sm text-zinc-400 mt-1">Comisión recurrente primer año</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-sky-400">12 meses</p>
            <p className="text-sm text-zinc-400 mt-1">Duración del cobro</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-sky-400">9,80€</p>
            <p className="text-sm text-zinc-400 mt-1">Por cliente mensual al mes</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-sky-400">99,80€</p>
            <p className="text-sm text-zinc-400 mt-1">Por cliente anual (cobro único)</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Cómo funciona</h2>
        <ol className="space-y-3 text-zinc-300 mb-12 list-decimal list-inside">
          <li><strong>Solicita ser afiliado</strong> escribiendo a partners@marsof.es</li>
          <li><strong>Te enviamos tu código personal</strong> y enlaces de referido</li>
          <li><strong>Compartes tu enlace</strong> en tu blog, LinkedIn, newsletter, clientes, etc.</li>
          <li><strong>Cobras automáticamente</strong> el 20% de la facturación del cliente durante el primer año</li>
          <li><strong>Pagos mensuales</strong> por transferencia o Stripe Connect</li>
        </ol>

        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Ejemplos de ganancia mensual</h2>
        <div className="overflow-x-auto my-5">
          <table className="w-full text-sm border-collapse">
            <thead><tr className="bg-sky-500/20"><th className="py-3 px-4 text-left text-zinc-100">Si traes...</th><th className="py-3 px-4 text-left text-zinc-100">Ganas/mes</th><th className="py-3 px-4 text-left text-zinc-100">Ganas/año</th></tr></thead>
            <tbody className="text-zinc-300">
              <tr className="border-b border-white/10"><td className="py-2 px-4">5 clientes Pro Mensual</td><td className="py-2 px-4">49€</td><td className="py-2 px-4">588€</td></tr>
              <tr className="border-b border-white/10"><td className="py-2 px-4">10 clientes Pro Mensual</td><td className="py-2 px-4">98€</td><td className="py-2 px-4">1.176€</td></tr>
              <tr className="border-b border-white/10"><td className="py-2 px-4">20 clientes Pro Mensual</td><td className="py-2 px-4">196€</td><td className="py-2 px-4">2.352€</td></tr>
              <tr><td className="py-2 px-4">5 clientes Pro Anual</td><td className="py-2 px-4">-</td><td className="py-2 px-4">499€ (único)</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Perfiles ideales</h2>
        <ul className="space-y-2 text-zinc-300 mb-12">
          <li>✓ <strong>Asesores fiscales y gestores</strong> que ofrecen Saldea a sus clientes como servicio adicional</li>
          <li>✓ <strong>Consultores empresariales</strong> que tratan con pymes morosas</li>
          <li>✓ <strong>Bloggers, podcasters y newsletter</strong> del nicho pymes/autónomos</li>
          <li>✓ <strong>Influencers de LinkedIn</strong> en finanzas y emprendimiento</li>
          <li>✓ <strong>Agencias y consultoras</strong> que recomiendan herramientas a sus clientes</li>
        </ul>

        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Reglas del programa</h2>
        <ul className="space-y-2 text-zinc-300 mb-12">
          <li>📋 Comisión solo si el cliente <strong>llega vía tu enlace</strong> y permanece más de 30 días (período trial)</li>
          <li>📋 Pago mensual cuando acumules <strong>50€+</strong></li>
          <li>📋 Si el cliente <strong>cancela en su trial</strong>, no se computa</li>
          <li>📋 NO se permite spam, anuncios falsos ni publicidad engañosa</li>
          <li>📋 Disponemos de banners, copy y materiales para que promociones</li>
        </ul>

        <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">¿Te interesa unirte?</h2>
          <p className="text-zinc-400 mb-6">Escríbenos y te enviamos tu enlace personal en 24h.</p>
          <a href="mailto:partners@marsof.es?subject=Quiero%20ser%20afiliado%20Marsof" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Solicitar acceso →</a>
        </div>
      </section>
      <MarketingFooter />
    </div>
  </>
  )
}
