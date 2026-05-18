import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea en Sevilla: software de cobros para autÃ³nomos y gestorÃ­as hispalenses',
  description: 'Saldea es la herramienta espaÃ±ola con IA que automatiza el cobro de facturas. Para autÃ³nomos, gestorÃ­as y pymes de Sevilla y toda la provincia.',
  alternates: { canonical: 'https://marsof.es/sevilla' },
  keywords: [
    'software cobros Sevilla',
    'gestorÃ­a Sevilla cobros',
    'autÃ³nomo Sevilla facturas',
    'asesorÃ­a fiscal Sevilla',
    'Saldea Sevilla',
    'pyme Sevilla cobros',
  ],
  openGraph: {
    title: 'Saldea en Sevilla: software de cobros con IA',
    description: 'Para autÃ³nomos y gestorÃ­as de Sevilla.',
    type: 'website',
    locale: 'es_ES',
  },
}

const schemaLocal = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Software de gestiÃ³n de cobros',
  provider: { '@id': 'https://marsof.es/#organization' },
  areaServed: { '@type': 'City', name: 'Sevilla' },
  description: 'Software con IA que automatiza el cobro de facturas para autÃ³nomos, gestorÃ­as y pymes de Sevilla.',
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
            <span>ðŸ“ Atendiendo Sevilla y provincia</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea en Sevilla: automatiza el cobro de tus facturas</h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">
            Si eres autÃ³nomo, gestorÃ­a o pyme en <strong>Sevilla</strong>, sabes lo que es perseguir cobros. Saldea, desarrollada en <strong>Marsof Technology</strong> (Niebla, Huelva), automatiza ese proceso con IA. Te quita horas semanales de trabajo manual.
          </p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El tejido empresarial sevillano y los cobros</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Sevilla concentra el mayor nÃºmero de <strong>gestorÃ­as y asesorÃ­as fiscales de AndalucÃ­a</strong>. Sus principales sectores cliente son: hostelerÃ­a, comercio, construcciÃ³n, servicios profesionales, agricultura y industria agroalimentaria.
          </p>
          <p className="text-zinc-300 leading-relaxed mb-4">
            En todos esos sectores, la morosidad supera la media nacional. Las facturas que vencen a 60 dÃ­as suelen pagarse a 90-120. Saldea estÃ¡ pensado exactamente para perseguir esas facturas sin que tengas que dedicar horas.
          </p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Sectores sevillanos que mÃ¡s usan Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-8">
            <li>ðŸ“Š <strong>AsesorÃ­as fiscales</strong> de Sevilla capital, Aljarafe, AlcalÃ¡ de GuadaÃ­ra, Dos Hermanas</li>
            <li>ðŸ¨ <strong>HostelerÃ­a y restauraciÃ³n</strong> (proveedores y profesionales)</li>
            <li>ðŸ—ï¸ <strong>ConstrucciÃ³n</strong> y materiales</li>
            <li>ðŸŽ¨ <strong>Agencias creativas y consultoras</strong></li>
            <li>ðŸ· <strong>Bodegas y agroalimentarias</strong> de la Sierra Norte y la CampiÃ±a</li>
            <li>ðŸ‘©â€ðŸ’» <strong>AutÃ³nomos del sector servicios</strong> (formaciÃ³n, diseÃ±o, salud)</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Por quÃ© Saldea encaja en Sevilla</h2>
          <ul className="space-y-3 text-zinc-300 mb-8">
            <li>âœ“ <strong>Empresa espaÃ±ola y andaluza</strong>: Marsof estÃ¡ en Niebla, no en Silicon Valley</li>
            <li>âœ“ <strong>Soporte en espaÃ±ol horario peninsular</strong>: si tienes dudas, te contestamos rÃ¡pido</li>
            <li>âœ“ <strong>Conoce la Ley 3/2004</strong>: los emails escalan automÃ¡ticamente y citan la normativa espaÃ±ola</li>
            <li>âœ“ <strong>Stripe Connect integrado</strong>: tus cobros aparecen en tu cuenta bancaria directamente</li>
            <li>âœ“ <strong>1 mes gratis</strong>: pruÃ©balo con clientes reales antes de pagar nada</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Reuniones presenciales (Sevilla y Huelva)</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Si gestionas un despacho mediano o grande en Sevilla y prefieres una <strong>demo presencial</strong> o videollamada personalizada, escrÃ­benos a <a href="mailto:hola@marsof.es" className="text-sky-400 hover:underline">hola@marsof.es</a>.
          </p>
          <p className="text-zinc-300 leading-relaxed mb-8">
            Para gestorÃ­as con mÃ¡s de 10 clientes activos, vamos en persona a Sevilla cuando sea necesario. Estamos a 1 hora.
          </p>

          <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Empieza con 1 mes gratis</h2>
            <p className="text-zinc-400 mb-6">Sin tarjeta. Sin permanencia. Si no encaja con tu negocio en Sevilla, cancelas en 1 clic.</p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis â†’</Link>
          </div>
        </section>

        <MarketingFooter />
      </div>
    </>
  )
}
