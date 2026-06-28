import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Sala de prensa Marsof Technology � Kit de medios | Marsof',
  description: 'Informaci�n para periodistas, podcasts y medios sobre Marsof Technology y Saldea. Logos, datos clave, biograf�a del fundador y casos.',
  alternates: { canonical: 'https://www.marsof.es/prensa' },
  keywords: ['Marsof prensa', 'Saldea kit medios', 'Marsof noticias', 'Carlos Galvez Marsof', 'Marsof startup'],
  openGraph: { title: 'Sala de prensa Marsof Technology', description: 'Kit de medios y datos.', type: 'website', locale: 'es_ES' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Sala de prensa Marsof Technology',
  description: 'Información para periodistas, podcasts y medios sobre Marsof Technology y Saldea.',
  url: 'https://www.marsof.es/prensa',
  about: {
    '@type': 'Organization',
    name: 'Marsof Technology',
    foundingDate: '2026',
    foundingLocation: { '@type': 'Place', name: 'Huelva, Andalucía, España' },
    description: 'Startup española de software B2B SaaS. Desarrolla Saldea, IA que automatiza el cobro de facturas impagadas para autónomos, gestorías y pymes en España.',
    founder: { '@type': 'Person', name: 'Carlos Gálvez Carrillo' },
    contactPoint: { '@type': 'ContactPoint', email: 'hola@marsof.es', contactType: 'Press' },
  },
}

export default function PagePrensa() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
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
        <p className="text-zinc-400 text-lg mb-12">Informaci�n para periodistas, podcasts, eventos y medios. Si necesitas datos, entrevista o algo espec�fico, escr�benos.</p>

        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Qui�nes somos en 1 p�rrafo</h2>
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 mb-10">
          <p className="text-zinc-300 leading-relaxed">
            <strong>Marsof Technology</strong> es una empresa espa�ola de software fundada en 2026 con sede en Huelva. Desarrolla <strong>Saldea</strong>, una IA que automatiza el cobro de facturas impagadas para aut�nomos, gestor�as y pymes en Espa�a. Lo hace combinando recordatorios escalados con Claude (IA de Anthropic) y Stripe Connect para cobros autom�ticos. Cumple Ley 3/2004 y RGPD con datos en servidores europeos.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Datos clave</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 text-center">
            <p className="text-2xl font-bold text-sky-400">2026</p>
            <p className="text-xs text-zinc-500 mt-1">Fundaci�n</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 text-center">
            <p className="text-2xl font-bold text-sky-400">Huelva</p>
            <p className="text-xs text-zinc-500 mt-1">Andaluc�a, Espa�a</p>
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
          <h3 className="font-bold text-zinc-100 text-lg mb-2">Carlos G�lvez Carrillo</h3>
          <p className="text-zinc-400 text-sm mb-3">Fundador y CEO de Marsof Technology</p>
          <p className="text-zinc-300 leading-relaxed text-sm mb-3">
            M�s de una d�cada de carrera en finanzas corporativas, an�lisis de inversi�n y consultor�a de negocio. Ha asesorado a empresas de distintos tama�os en estructuraci�n financiera, optimizaci�n de operaciones y estrategia de crecimiento. Esa visi�n transversal del tejido empresarial espa�ol le llev� a identificar una oportunidad clara: las pymes necesitan software dise�ado para su realidad, no adaptaciones de herramientas extranjeras. Fund� Marsof Technology en 2026 para construirlo.
          </p>
          <p className="text-zinc-500 text-xs">Contacto directo: <a href="mailto:carlosgc@marsof.es" className="text-sky-400 hover:underline">carlosgc@marsof.es</a></p>
        </div>

        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Mensajes clave para art�culos</h2>
        <ul className="space-y-3 text-zinc-300 mb-10">
          <li>?? <strong>Mensaje 1:</strong> La morosidad afecta al 25% de las facturas B2B en Espa�a. Las pymes pierden hasta 5 horas semanales reclamando manualmente.</li>
          <li>?? <strong>Mensaje 2:</strong> Saldea automatiza esos recordatorios con IA, escalando el tono seg�n los d�as de retraso.</li>
          <li>?? <strong>Mensaje 3:</strong> Cumple la Ley 3/2004 de morosidad, RGPD y se integra con Stripe Connect.</li>
          <li>?? <strong>Mensaje 4:</strong> Empresa 100% espa�ola, datos en servidores europeos, soporte en espa�ol.</li>
        </ul>

        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Temas sobre los que podemos hablar</h2>
        <ul className="space-y-2 text-zinc-300 mb-10">
          <li>? Morosidad en pymes espa�olas</li>
          <li>? Inteligencia artificial aplicada al negocio</li>
          <li>? SaaS espa�ol y mercado B2B</li>
          <li>? Ley 3/2004, Veri*factu, factura electr�nica B2B</li>
          <li>? Emprendimiento desde Andaluc�a rural</li>
          <li>? Stripe Connect y pagos en SaaS</li>
        </ul>

        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Recursos descargables</h2>
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 mb-10">
          <p className="text-zinc-300 mb-3">Si necesitas logos, capturas, v�deo demo o m�s material, escr�benos a <a href="mailto:hola@marsof.es" className="text-sky-400 hover:underline">hola@marsof.es</a> y te enviamos el kit completo en 24h.</p>
          <p className="text-zinc-400 text-sm">Disponible: logos PNG/SVG, capturas de producto, v�deo demo 90 segundos, foto del fundador.</p>
        </div>

        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Contacto para prensa</h2>
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 mb-10">
          <p className="text-zinc-300 mb-2"><strong>Email:</strong> <a href="mailto:hola@marsof.es" className="text-sky-400 hover:underline">hola@marsof.es</a></p>
          <p className="text-zinc-300 mb-2"><strong>Respuesta:</strong> menos de 24 horas en d�as laborables</p>
          <p className="text-zinc-300"><strong>Idiomas:</strong> espa�ol</p>
        </div>

        <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">�Quieres probar Saldea para tu art�culo?</h2>
          <p className="text-zinc-400 mb-6">30 d�as gratis. Te damos acceso completo para que veas c�mo funciona.</p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar ?</Link>
        </div>
      </section>
      <MarketingFooter />
    </div>
    </>
  )
}
