import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea en Sevilla: software de cobros para autónomos y gestorías hispalenses',
  description: 'Saldea es la herramienta española con IA que automatiza el cobro de facturas. Para autónomos, gestorías y pymes de Sevilla y toda la provincia.',
  alternates: { canonical: 'https://marsof.es/sevilla' },
  keywords: [
    'software cobros Sevilla',
    'gestoría Sevilla cobros',
    'autónomo Sevilla facturas',
    'asesoría fiscal Sevilla',
    'Saldea Sevilla',
    'pyme Sevilla cobros',
  ],
  openGraph: {
    title: 'Saldea en Sevilla: software de cobros con IA',
    description: 'Para autónomos y gestorías de Sevilla.',
    type: 'website',
    locale: 'es_ES',
  },
}

const schemaLocal = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Software de gestión de cobros',
  provider: { '@id': 'https://marsof.es/#organization' },
  areaServed: { '@type': 'City', name: 'Sevilla' },
  description: 'Software con IA que automatiza el cobro de facturas para autónomos, gestorías y pymes de Sevilla.',
}

export default function PageSevilla() {
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
            <span>📍 Atendiendo Sevilla y provincia</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea en Sevilla: automatiza el cobro de tus facturas</h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">
            Si eres autónomo, gestoría o pyme en <strong>Sevilla</strong>, sabes lo que es perseguir cobros. Saldea, desarrollada en <strong>Marsof Technology</strong> (Niebla, Huelva), automatiza ese proceso con IA. Te quita horas semanales de trabajo manual.
          </p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El tejido empresarial sevillano y los cobros</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Sevilla concentra el mayor número de <strong>gestorías y asesorías fiscales de Andalucía</strong>. Sus principales sectores cliente son: hostelería, comercio, construcción, servicios profesionales, agricultura y industria agroalimentaria.
          </p>
          <p className="text-zinc-300 leading-relaxed mb-4">
            En todos esos sectores, la morosidad supera la media nacional. Las facturas que vencen a 60 días suelen pagarse a 90-120. Saldea está pensado exactamente para perseguir esas facturas sin que tengas que dedicar horas.
          </p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Sectores sevillanos que más usan Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-8">
            <li>📊 <strong>Asesorías fiscales</strong> de Sevilla capital, Aljarafe, Alcalá de Guadaíra, Dos Hermanas</li>
            <li>🏨 <strong>Hostelería y restauración</strong> (proveedores y profesionales)</li>
            <li>🏗️ <strong>Construcción</strong> y materiales</li>
            <li>🎨 <strong>Agencias creativas y consultoras</strong></li>
            <li>🍷 <strong>Bodegas y agroalimentarias</strong> de la Sierra Norte y la Campiña</li>
            <li>👩‍💻 <strong>Autónomos del sector servicios</strong> (formación, diseño, salud)</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Por qué Saldea encaja en Sevilla</h2>
          <ul className="space-y-3 text-zinc-300 mb-8">
            <li>✓ <strong>Empresa española y andaluza</strong>: Marsof está en Niebla, no en Silicon Valley</li>
            <li>✓ <strong>Soporte en español horario peninsular</strong>: si tienes dudas, te contestamos rápido</li>
            <li>✓ <strong>Conoce la Ley 3/2004</strong>: los emails escalan automáticamente y citan la normativa española</li>
            <li>✓ <strong>Stripe Connect integrado</strong>: tus cobros aparecen en tu cuenta bancaria directamente</li>
            <li>✓ <strong>1 mes gratis</strong>: pruébalo con clientes reales antes de pagar nada</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Reuniones presenciales (Sevilla y Huelva)</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Si gestionas un despacho mediano o grande en Sevilla y prefieres una <strong>demo presencial</strong> o videollamada personalizada, escríbenos a <a href="mailto:hola@marsof.es" className="text-sky-400 hover:underline">hola@marsof.es</a>.
          </p>
          <p className="text-zinc-300 leading-relaxed mb-8">
            Para gestorías con más de 10 clientes activos, vamos en persona a Sevilla cuando sea necesario. Estamos a 1 hora.
          </p>

          <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Empieza con 1 mes gratis</h2>
            <p className="text-zinc-400 mb-6">Sin tarjeta. Sin permanencia. Si no encaja con tu negocio en Sevilla, cancelas en 1 clic.</p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis →</Link>
          </div>
        </section>

        <MarketingFooter />
      </div>
    </>
  )
}
