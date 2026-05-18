import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Sala de prensa Marsof Technology Â· Kit de medios | Marsof',
  description: 'InformaciÃ³n para periodistas, podcasts y medios sobre Marsof Technology y Saldea. Logos, datos clave, biografÃ­a del fundador y casos.',
  alternates: { canonical: 'https://marsof.es/prensa' },
  keywords: ['Marsof prensa', 'Saldea kit medios', 'Marsof noticias', 'Carlos Galvez Marsof', 'Marsof startup'],
  openGraph: { title: 'Sala de prensa Marsof Technology', description: 'Kit de medios y datos.', type: 'website', locale: 'es_ES' },
}

export default function PagePrensa() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-zinc-100">Marsof</Link>
          <div className="flex items-center gap-2">
<Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Sala de prensa Marsof</h1>
        <p className="text-zinc-400 text-lg mb-12">InformaciÃ³n para periodistas, podcasts, eventos y medios. Si necesitas datos, entrevista o algo especÃ­fico, escrÃ­benos.</p>

        <h2 className="text-2xl font-bold text-zinc-100 mb-4">QuiÃ©nes somos en 1 pÃ¡rrafo</h2>
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 mb-10">
          <p className="text-zinc-300 leading-relaxed">
            <strong>Marsof Technology</strong> es una empresa espaÃ±ola de software fundada en 2026 en Niebla (Huelva). Desarrolla <strong>Saldea</strong>, una IA que automatiza el cobro de facturas impagadas para autÃ³nomos, gestorÃ­as y pymes en EspaÃ±a. Lo hace combinando recordatorios escalados con Claude (IA de Anthropic) y Stripe Connect para cobros automÃ¡ticos. Cumple Ley 3/2004 y RGPD con datos en servidores europeos.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Datos clave</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 text-center">
            <p className="text-2xl font-bold text-sky-400">2026</p>
            <p className="text-xs text-zinc-500 mt-1">FundaciÃ³n</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 text-center">
            <p className="text-2xl font-bold text-sky-400">Niebla</p>
            <p className="text-xs text-zinc-500 mt-1">Huelva, EspaÃ±a</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 text-center">
            <p className="text-2xl font-bold text-sky-400">B2B SaaS</p>
            <p className="text-xs text-zinc-500 mt-1">Modelo de negocio</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 text-center">
            <p className="text-2xl font-bold text-sky-400">EU</p>
            <p className="text-xs text-zinc-500 mt-1">Datos RGPD</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Fundador</h2>
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 mb-10">
          <h3 className="font-bold text-zinc-100 text-lg mb-2">Carlos GÃ¡lvez Carrillo</h3>
          <p className="text-zinc-400 text-sm mb-3">Fundador y CEO de Marsof Technology</p>
          <p className="text-zinc-300 leading-relaxed text-sm mb-3">
            Carlos es vecino de Niebla (Huelva) y emprendedor con experiencia en el sector financiero y la asesorÃ­a a cooperativas agroalimentarias. La idea de Saldea naciÃ³ al ver cÃ³mo gestorÃ­as y autÃ³nomos perdÃ­an entre 3 y 5 horas semanales reclamando facturas a clientes morosos. CombinÃ³ esa experiencia con su interÃ©s por la inteligencia artificial y construyÃ³ Saldea en 2026.
          </p>
          <p className="text-zinc-500 text-xs">Contacto directo: <a href="mailto:carlos@marsof.es" className="text-sky-400 hover:underline">carlos@marsof.es</a></p>
        </div>

        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Mensajes clave para artÃ­culos</h2>
        <ul className="space-y-3 text-zinc-300 mb-10">
          <li>ðŸ“ <strong>Mensaje 1:</strong> La morosidad afecta al 25% de las facturas B2B en EspaÃ±a. Las pymes pierden hasta 5 horas semanales reclamando manualmente.</li>
          <li>ðŸ“ <strong>Mensaje 2:</strong> Saldea automatiza esos recordatorios con IA, escalando el tono segÃºn los dÃ­as de retraso.</li>
          <li>ðŸ“ <strong>Mensaje 3:</strong> Cumple la Ley 3/2004 de morosidad, RGPD y se integra con Stripe Connect.</li>
          <li>ðŸ“ <strong>Mensaje 4:</strong> Empresa 100% espaÃ±ola, datos en servidores europeos, soporte en espaÃ±ol.</li>
        </ul>

        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Temas sobre los que podemos hablar</h2>
        <ul className="space-y-2 text-zinc-300 mb-10">
          <li>âœ“ Morosidad en pymes espaÃ±olas</li>
          <li>âœ“ Inteligencia artificial aplicada al negocio</li>
          <li>âœ“ SaaS espaÃ±ol y mercado B2B</li>
          <li>âœ“ Ley 3/2004, Veri*factu, factura electrÃ³nica B2B</li>
          <li>âœ“ Emprendimiento desde AndalucÃ­a rural</li>
          <li>âœ“ Stripe Connect y pagos en SaaS</li>
        </ul>

        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Recursos descargables</h2>
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 mb-10">
          <p className="text-zinc-300 mb-3">Si necesitas logos, capturas, vÃ­deo demo o mÃ¡s material, escrÃ­benos a <a href="mailto:prensa@marsof.es" className="text-sky-400 hover:underline">prensa@marsof.es</a> y te enviamos el kit completo en 24h.</p>
          <p className="text-zinc-400 text-sm">Disponible: logos PNG/SVG, capturas de producto, vÃ­deo demo 90 segundos, foto del fundador.</p>
        </div>

        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Contacto para prensa</h2>
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 mb-10">
          <p className="text-zinc-300 mb-2"><strong>Email:</strong> <a href="mailto:prensa@marsof.es" className="text-sky-400 hover:underline">prensa@marsof.es</a></p>
          <p className="text-zinc-300 mb-2"><strong>Respuesta:</strong> menos de 24 horas en dÃ­as laborables</p>
          <p className="text-zinc-300"><strong>Idiomas:</strong> espaÃ±ol</p>
        </div>

        <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Â¿Quieres probar Saldea para tu artÃ­culo?</h2>
          <p className="text-zinc-400 mb-6">1 mes gratis. Te damos acceso completo para que veas cÃ³mo funciona.</p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar â†’</Link>
        </div>
      </section>
      <MarketingFooter />
    </div>
  )
}
