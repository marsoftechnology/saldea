import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Marsof Technology â€” Empresa espaÃ±ola de software para autÃ³nomos',
  description: 'Marsof Technology es una empresa de software con sede en Niebla (Huelva). Desarrollamos Saldea, una IA que automatiza el cobro de facturas para autÃ³nomos y pymes espaÃ±olas.',
  alternates: { canonical: 'https://marsof.es/sobre-marsof' },
  keywords: [
    'Marsof',
    'Marsof Technology',
    'Marsof Huelva',
    'Marsof Niebla',
    'Marsof Saldea',
    'empresa software Huelva',
    'Carlos GÃ¡lvez Marsof',
  ],
  openGraph: {
    title: 'Marsof Technology â€” Empresa espaÃ±ola de software para autÃ³nomos',
    description: 'Desarrollamos Saldea, IA que automatiza el cobro de facturas.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'Marsof Technology',
  },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://marsof.es/#organization',
  name: 'Marsof Technology',
  alternateName: ['Marsof', 'Marsof Tech'],
  legalName: 'Marsof Technology',
  url: 'https://marsof.es',
  logo: 'https://marsof.es/og-image.png',
  image: 'https://marsof.es/og-image.png',
  description: 'Empresa espaÃ±ola de software con sede en Niebla (Huelva). Desarrolla Saldea, IA para automatizar el cobro de facturas.',
  foundingDate: '2026',
  founders: [
    {
      '@type': 'Person',
      name: 'Carlos GÃ¡lvez Carrillo',
      jobTitle: 'Fundador y CEO',
      url: 'https://marsof.es/sobre-marsof',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Niebla',
    addressRegion: 'Huelva',
    addressCountry: 'ES',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'soporte@marsof.es',
    availableLanguage: ['Spanish'],
  },
  knowsAbout: [
    'Software de cobros',
    'Inteligencia Artificial',
    'AutomatizaciÃ³n de procesos',
    'FacturaciÃ³n electrÃ³nica',
    'GestiÃ³n de morosidad',
    'Ley 3/2004',
  ],
  brand: {
    '@type': 'Brand',
    name: 'Saldea',
    logo: 'https://marsof.es/og-image.png',
  },
  makesOffer: {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'SoftwareApplication',
      name: 'Saldea',
      applicationCategory: 'BusinessApplication',
    },
  },
  sameAs: [
    'https://www.linkedin.com/company/marsof',
    'https://github.com/carlos90inversiones',
  ],
}

const schemaPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Carlos GÃ¡lvez Carrillo',
  jobTitle: 'Fundador y CEO de Marsof Technology',
  worksFor: { '@id': 'https://marsof.es/#organization' },
  address: { '@type': 'PostalAddress', addressLocality: 'Niebla', addressRegion: 'Huelva', addressCountry: 'ES' },
  url: 'https://marsof.es/sobre-marsof',
}

export default function PageSobreMarsof() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPerson) }} />

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
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
            Marsof Technology Â· Niebla Â· Huelva
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Sobre Marsof Technology</h1>

          <p className="text-lg text-zinc-300 leading-relaxed mb-8">
            <strong>Marsof Technology</strong> es una empresa espaÃ±ola de software fundada en 2026 con sede en Niebla (Huelva). Desarrollamos herramientas SaaS que automatizan los procesos administrativos mÃ¡s tediosos para autÃ³nomos, gestorÃ­as y pymes en EspaÃ±a.
          </p>

          <p className="text-lg text-zinc-300 leading-relaxed mb-8">
            Nuestro primer producto es <strong>Saldea</strong>, una inteligencia artificial que persigue automÃ¡ticamente las facturas impagadas usando emails personalizados que escalan en tono. Saldea cumple la Ley 3/2004 contra la morosidad y el RGPD.
          </p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Â¿QuiÃ©n estÃ¡ detrÃ¡s de Marsof?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            <strong>Marsof</strong> fue fundada por <strong>Carlos GÃ¡lvez Carrillo</strong>, un emprendedor de Niebla con experiencia en el sector financiero y la asesorÃ­a a cooperativas agroalimentarias. La idea de Saldea naciÃ³ al ver cÃ³mo gestorÃ­as y autÃ³nomos perdÃ­an entre 3 y 5 horas semanales reclamando facturas a clientes morosos.
          </p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Nuestra misiÃ³n</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            En <strong>Marsof</strong> creemos que las pymes espaÃ±olas pierden demasiado tiempo en tareas administrativas que la IA puede resolver. Nuestra misiÃ³n es construir un catÃ¡logo de herramientas SaaS sencillas, asequibles y especÃ­ficas para el mercado espaÃ±ol que devuelvan horas a quienes facturan en serio.
          </p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Â¿DÃ³nde estÃ¡ Marsof?</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 mb-8">
            <ul className="space-y-2 text-zinc-300">
              <li><strong>Sede:</strong> Niebla, Huelva (AndalucÃ­a, EspaÃ±a)</li>
              <li><strong>Operaciones:</strong> 100% online, sirviendo a toda EspaÃ±a</li>
              <li><strong>Servidores:</strong> Frankfurt (Alemania) â€” RGPD compliance</li>
              <li><strong>Web:</strong> <a href="https://marsof.es" className="text-sky-400 hover:underline">https://marsof.es</a></li>
              <li><strong>Contacto:</strong> <a href="mailto:hola@marsof.es" className="text-sky-400 hover:underline">hola@marsof.es</a></li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Productos de Marsof</h2>
          <div className="space-y-3 mb-8">
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">ðŸ’°</span>
                <div>
                  <h3 className="font-bold text-zinc-100 mb-1">Saldea <span className="text-xs text-emerald-400 font-medium">Â· Disponible</span></h3>
                  <p className="text-zinc-400 text-sm">IA que automatiza el cobro de facturas impagadas. <Link href="/saldea" className="text-sky-400 hover:underline">Ver Saldea â†’</Link></p>
                </div>
              </div>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 opacity-60">
              <div className="flex items-start gap-3">
                <span className="text-2xl">ðŸ“‹</span>
                <div>
                  <h3 className="font-bold text-zinc-100 mb-1">Contrak <span className="text-xs text-zinc-500 font-medium">Â· PrÃ³ximamente</span></h3>
                  <p className="text-zinc-400 text-sm">GestiÃ³n y firma digital de contratos. En desarrollo.</p>
                </div>
              </div>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 opacity-60">
              <div className="flex items-start gap-3">
                <span className="text-2xl">ðŸ‘¥</span>
                <div>
                  <h3 className="font-bold text-zinc-100 mb-1">NÃ³mixa <span className="text-xs text-zinc-500 font-medium">Â· PrÃ³ximamente</span></h3>
                  <p className="text-zinc-400 text-sm">NÃ³minas y liquidaciones para autÃ³nomos con empleados. En desarrollo.</p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Marsof en cifras</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-sky-400">2026</p>
              <p className="text-xs text-zinc-500 mt-1">AÃ±o de fundaciÃ³n</p>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-sky-400">1</p>
              <p className="text-xs text-zinc-500 mt-1">Producto activo</p>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-sky-400">100%</p>
              <p className="text-xs text-zinc-500 mt-1">EspaÃ±ol y RGPD</p>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-sky-400">EU</p>
              <p className="text-xs text-zinc-500 mt-1">Datos en Europa</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Â¿Hablamos?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Si quieres saber mÃ¡s sobre <strong>Marsof Technology</strong>, escrÃ­benos:
          </p>
          <ul className="space-y-2 text-zinc-300 mb-12">
            <li>ðŸ“§ <strong>Email:</strong> <a href="mailto:hola@marsof.es" className="text-sky-400 hover:underline">hola@marsof.es</a></li>
            <li>ðŸ’¼ <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/company/marsof" className="text-sky-400 hover:underline">linkedin.com/company/marsof</a></li>
          </ul>

          <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Prueba Saldea, nuestro primer producto</h2>
            <p className="text-zinc-400 mb-6">1 mes gratis sin tarjeta. Cancela en 1 clic.</p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis â†’</Link>
          </div>
        </section>
        <MarketingFooter />
      </div>
    </>
  )
}
