import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea en Huelva: software de cobros para autónomos y empresas onubenses',
  description: 'Saldea es la herramienta española de cobros automáticos con IA, desarrollada en Niebla (Huelva). Para autónomos y gestorías de Huelva, Cádiz, Sevilla y Andalucía.',
  alternates: { canonical: 'https://marsof.es/huelva' },
  keywords: [
    'software cobros Huelva',
    'gestoría Huelva',
    'autónomo Huelva facturas',
    'empresa software Huelva',
    'Marsof Huelva',
    'Saldea Huelva',
    'cobros morosos Niebla',
  ],
  openGraph: {
    title: 'Saldea en Huelva: software local de cobros con IA',
    description: 'Desarrollado en Niebla, para toda Andalucía.',
    type: 'website',
    locale: 'es_ES',
  },
}

const schemaLocal = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://marsof.es/huelva#localbusiness',
  name: 'Marsof Technology',
  image: 'https://marsof.es/og-image.png',
  url: 'https://marsof.es',
  telephone: '+34000000000',
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Niebla',
    addressRegion: 'Huelva',
    postalCode: '21840',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '37.360',
    longitude: '-6.677',
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Huelva' },
    { '@type': 'AdministrativeArea', name: 'Andalucía' },
    { '@type': 'Country', name: 'España' },
  ],
}

export default function PageHuelva() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocal) }} />

      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-sm font-bold text-zinc-100">Marsof / Saldea</Link>
            <div className="flex items-center gap-2">
<Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">1 mes gratis</Link>
            </div>
          </div>
        </nav>

        <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
            <span>📍 Hecho en Niebla, Huelva</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea: software de cobros desde Huelva para toda España</h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">
            <strong>Marsof Technology</strong> es una empresa onubense fundada en Niebla en 2026. Desarrollamos <strong>Saldea</strong>, una IA que automatiza el cobro de facturas para autónomos, gestorías y pymes de Huelva, Sevilla, Cádiz y todo el país.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
              <p className="text-3xl mb-2">🏝️</p>
              <h3 className="font-bold text-zinc-100 mb-1">Onubenses</h3>
              <p className="text-zinc-400 text-sm">Empresa local de Niebla. Conocemos cómo se hace negocio en la provincia.</p>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
              <p className="text-3xl mb-2">🇪🇸</p>
              <h3 className="font-bold text-zinc-100 mb-1">100% español</h3>
              <p className="text-zinc-400 text-sm">Producto en español, soporte en español, Ley 3/2004 nativa.</p>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
              <p className="text-3xl mb-2">🇪🇺</p>
              <h3 className="font-bold text-zinc-100 mb-1">Datos en Europa</h3>
              <p className="text-zinc-400 text-sm">Servidores en Frankfurt. RGPD completo.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mb-4">¿Por qué Saldea encaja con tu negocio en Huelva?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Huelva tiene un tejido empresarial fuerte de <strong>cooperativas agroalimentarias, gestorías, asesorías y autónomos del sector servicios</strong>. Todos ellos comparten un problema: facturas que se pagan tarde.
          </p>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Saldea automatiza ese seguimiento con IA, sin que tú tengas que dedicar horas semanales a perseguir a clientes morosos.
          </p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Sectores onubenses que más usan Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-8">
            <li>🍓 <strong>Cooperativas agroalimentarias</strong> (fresa, frutos rojos, naranja, mar)</li>
            <li>📊 <strong>Gestorías y asesorías</strong> de Huelva capital, Niebla, Ayamonte, Lepe, Almonte</li>
            <li>🏢 <strong>Pymes industriales</strong> del Polígono Industrial de La Jara</li>
            <li>🛒 <strong>Comercios mayoristas</strong> de productos del mar y agricultura</li>
            <li>💻 <strong>Autónomos del sector servicios</strong> (consultoría, diseño, formación)</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Conoce a Marsof Technology</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 mb-8">
            <p className="text-zinc-300 leading-relaxed mb-3">
              <strong>Marsof</strong> fue fundada por <strong>Carlos Gálvez Carrillo</strong>, vecino de Niebla con experiencia en el sector financiero y asesoría a cooperativas locales.
            </p>
            <p className="text-zinc-300 leading-relaxed mb-3">
              Sede: <strong>Niebla, Huelva (21450)</strong>
            </p>
            <p className="text-zinc-300 leading-relaxed">
              Contacto: <a href="mailto:hola@marsof.es" className="text-sky-400 hover:underline">hola@marsof.es</a>
            </p>
          </div>

          <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">¿Eres autónomo o gestoría en Huelva?</h2>
            <p className="text-zinc-400 mb-6">Prueba Saldea 1 mes gratis. Si te encaja, pagas. Si no, cancelas. Cero permanencia.</p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis →</Link>
          </div>
        </section>

        <MarketingFooter />
      </div>
    </>
  )
}
