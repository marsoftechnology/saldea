import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Contacto | Marsof Technology',
  description: 'Contacta con Marsof Technology. Soporte de Saldea, ventas, prensa, alianzas. Email, formulario y dirección en Huelva.',
  alternates: { canonical: 'https://www.marsof.es/contacto' },
  keywords: [
    'Marsof contacto',
    'soporte Saldea',
    'Marsof email',
    'Marsof telefono',
    'Marsof Huelva contacto',
  ],
  openGraph: {
    title: 'Contacto | Marsof Technology',
    description: 'Soporte, ventas, prensa. Email y dirección.',
    type: 'website',
    locale: 'es_ES',
  },
}

const schemaContacto = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: 'https://www.marsof.es/contacto',
  name: 'Contacto Marsof Technology',
  publisher: { '@id': 'https://marsof.es/#organization' },
}

const contactos = [
  {
    icono: '💬',
    titulo: 'Soporte Saldea',
    desc: 'Dudas sobre tu cuenta, facturación o errores técnicos.',
    email: 'soporte@marsof.es',
    respuesta: '24-48h laborables',
  },
  {
    icono: '🚀',
    titulo: 'Ventas / Demostración',
    desc: 'Quieres una demo personalizada o tienes preguntas antes de comprar.',
    email: 'hola@marsof.es',
    respuesta: 'Mismo día laborable',
  },
  {
    icono: '🤝',
    titulo: 'Alianzas y partners',
    desc: 'Gestorías que quieren ofrecer Saldea a sus clientes, integradores, revendedores.',
    email: 'hola@marsof.es',
    respuesta: '3-5 días laborables',
  },
  {
    icono: '📰',
    titulo: 'Prensa y medios',
    desc: 'Periodistas, podcasts, eventos. Tenemos kit de prensa preparado.',
    email: 'hola@marsof.es',
    respuesta: '24h laborables',
  },
  {
    icono: '⚖️',
    titulo: 'Legal y privacidad',
    desc: 'Cuestiones RGPD, ejercicio de derechos, solicitudes legales.',
    email: 'soporte@marsof.es',
    respuesta: '72h máximo (RGPD)',
  },
]

export default function PageContacto() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaContacto) }} />

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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Contacto</h1>
          <p className="text-zinc-400 text-lg mb-12">Elige el canal adecuado para que llegues a la persona correcta. Respondemos en español, en horario laboral español.</p>

          <div className="space-y-4 mb-16">
            {contactos.map((c) => (
              <a key={c.titulo} href={`mailto:${c.email}`} className="block bg-zinc-900/40 border border-white/10 rounded-2xl p-6 hover:border-sky-500/40 transition-colors">
                <div className="flex items-start gap-5">
                  <div className="text-3xl">{c.icono}</div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-zinc-100 mb-1">{c.titulo}</h2>
                    <p className="text-zinc-400 text-sm mb-3">{c.desc}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                      <span className="text-sky-400 font-medium">{c.email}</span>
                      <span className="text-zinc-500">Respuesta {c.respuesta}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Datos de la empresa</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 mb-12">
            <ul className="space-y-2 text-zinc-300">
              <li><strong>Razón social:</strong> Marsof Technology</li>
              <li><strong>Sede:</strong> Huelva, España</li>
              <li><strong>Web:</strong> <a href="https://marsof.es" className="text-sky-400 hover:underline">https://marsof.es</a></li>
              <li><strong>Fundador:</strong> Carlos Gálvez Carrillo</li>
              <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/company/marsof" className="text-sky-400 hover:underline">linkedin.com/company/marsof</a></li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Horario de atención</h2>
          <p className="text-zinc-400 leading-relaxed mb-12">Lunes a viernes, 9:00 a 18:00 (hora peninsular española). Cerrado fines de semana y festivos nacionales.</p>

          <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold mb-2">¿Quieres probar Saldea antes de hablar?</h2>
            <p className="text-zinc-400 mb-5">30 días gratis. La forma más rápida de saber si te encaja.</p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis →</Link>
          </div>
        </section>
        <MarketingFooter />
      </div>
    </>
  )
}
