import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Sobre Marsof Technology — Empresa española de software SaaS',
  description: 'Marsof Technology es una empresa española de software con sede en Huelva. Construimos herramientas SaaS con IA para automatizar los procesos administrativos de autónomos y pymes en España.',
  alternates: { canonical: 'https://marsof.es/sobre-marsof' },
  keywords: [
    'Marsof',
    'Marsof Technology',
    'Marsof Huelva',
    'empresa software España',
    'SaaS España',
    'software pymes autónomos',
    'Carlos Gálvez Marsof',
  ],
  openGraph: {
    title: 'Sobre Marsof Technology — Empresa española de software SaaS',
    description: 'Construimos herramientas SaaS con IA para automatizar los procesos administrativos de autónomos y pymes en España.',
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
  description: 'Empresa española de software con sede en Huelva. Construye herramientas SaaS con IA para automatizar los procesos administrativos de autónomos y pymes.',
  foundingDate: '2026',
  founders: [{ '@type': 'Person', name: 'Carlos Gálvez Carrillo', jobTitle: 'Fundador y CEO', description: 'Profesional con trayectoria en finanzas corporativas, análisis de inversión y consultoría de negocio.' }],
  address: { '@type': 'PostalAddress', addressLocality: 'Huelva', addressRegion: 'Huelva', addressCountry: 'ES' },
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: 'carlosgc@marsof.es' },
  sameAs: ['https://www.linkedin.com/company/marsof', 'https://github.com/carlos90inversiones'],
}

const productos = [
  {
    nombre: 'Saldea',
    estado: 'Disponible',
    estadoColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    icono: '💼',
    descripcion: 'IA que automatiza el cobro de facturas impagadas. Envía recordatorios personalizados, escala el tono progresivamente y detecta respuestas de clientes. Cumple la Ley 3/2004.',
    href: '/saldea',
  },
  {
    nombre: 'Contrak',
    estado: 'En desarrollo',
    estadoColor: 'bg-zinc-800 text-zinc-500 border-white/5',
    icono: '📋',
    descripcion: 'Gestión y firma digital de contratos para pymes y autónomos. Plantillas legales, flujo de firma y archivo centralizado.',
    href: null,
  },
  {
    nombre: 'Nómixa',
    estado: 'Roadmap',
    estadoColor: 'bg-zinc-800 text-zinc-600 border-white/5',
    icono: '👥',
    descripcion: 'Nóminas y liquidaciones simplificadas para autónomos con empleados. Sin gestoría intermediaria para los casos más habituales.',
    href: null,
  },
]

const pilares = [
  {
    icono: '🇪🇸',
    titulo: 'Construido para España',
    desc: 'Cada producto nace adaptado a la fiscalidad, la normativa y la cultura de negocio española. No son traducciones de herramientas extranjeras.',
  },
  {
    icono: '🤖',
    titulo: 'IA aplicada, no decorativa',
    desc: 'Usamos inteligencia artificial donde aporta valor real: automatizando decisiones repetitivas y personalizando comunicaciones a escala.',
  },
  {
    icono: '🔒',
    titulo: 'Privacidad por diseño',
    desc: 'Datos alojados en servidores europeos bajo el estándar RGPD. Arquitectura construida con la privacidad como requisito, no como añadido.',
  },
  {
    icono: '⚡',
    titulo: 'Velocidad y foco',
    desc: 'Herramientas con un propósito concreto, sin funcionalidades superfluas. Fáciles de activar en minutos, sin curva de aprendizaje.',
  },
]

export default function PageSobreMarsof() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="min-h-screen bg-zinc-950 text-zinc-100">

        {/* Nav */}
        <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-sm font-bold text-zinc-100">Marsof</Link>
            <Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">
              Probar Saldea gratis
            </Link>
          </div>
        </nav>

        <div className="max-w-3xl mx-auto px-6">

          {/* Hero */}
          <section className="pt-20 pb-16">
            <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-8">
              <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
              Empresa tecnológica · Huelva, España · Fundada en 2026
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
              Marsof Technology
            </h1>

            <p className="text-xl text-zinc-300 leading-relaxed mb-6">
              Somos una empresa española de software especializada en construir herramientas SaaS con inteligencia artificial para autónomos, gestorías y pymes.
            </p>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Nuestra apuesta es clara: el negocio español merece software diseñado específicamente para él — con sus particularidades fiscales, su cultura empresarial y su escala. No adaptaciones de productos pensados para otros mercados.
            </p>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

          {/* Qué es Marsof */}
          <section className="mb-16">
            <p className="text-xs uppercase tracking-widest text-sky-400 font-semibold mb-4">La empresa</p>
            <h2 className="text-2xl font-bold text-zinc-100 mb-6">Qué construimos y por qué</h2>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                En España existen más de <strong className="text-zinc-100">3,5 millones de autónomos</strong> y cerca de un millón de pymes que gestionan su administración con herramientas genéricas, desconectadas entre sí o directamente sin herramientas. El resultado es una pérdida brutal de tiempo en tareas que se repiten semana tras semana: cobrar, contratar, gestionar nóminas, archivar documentos.
              </p>
              <p>
                Marsof nació con el objetivo de eliminar esa fricción, producto a producto. Cada herramienta que construimos ataca un problema concreto y recurrente, se integra con los flujos de trabajo reales de una pyme española y puede estar operativa en minutos.
              </p>
              <p>
                No somos un ERP. No intentamos ser una plataforma que lo hace todo. Somos un <strong className="text-zinc-100">catálogo de herramientas especializadas</strong>, cada una magistral en su dominio, que funcionan de forma independiente o conectadas entre sí.
              </p>
            </div>
          </section>

          {/* Misión */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-sky-500/10 to-zinc-900/40 border border-sky-500/20 rounded-2xl p-8">
              <p className="text-xs uppercase tracking-widest text-sky-400 font-semibold mb-3">Nuestra misión</p>
              <p className="text-xl font-semibold text-zinc-100 leading-relaxed">
                "Devolver tiempo a quienes trabajan en serio. Construir el catálogo de software SaaS más útil, honesto y específico para el negocio español."
              </p>
            </div>
          </section>

          {/* Pilares */}
          <section className="mb-16">
            <p className="text-xs uppercase tracking-widest text-sky-400 font-semibold mb-4">Cómo trabajamos</p>
            <h2 className="text-2xl font-bold text-zinc-100 mb-8">Los principios que guían cada producto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pilares.map(p => (
                <div key={p.titulo} className="bg-zinc-900/40 border border-white/8 rounded-xl p-6">
                  <div className="text-2xl mb-3">{p.icono}</div>
                  <h3 className="font-semibold text-zinc-100 mb-2">{p.titulo}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Productos */}
          <section className="mb-16">
            <p className="text-xs uppercase tracking-widest text-sky-400 font-semibold mb-4">Portafolio</p>
            <h2 className="text-2xl font-bold text-zinc-100 mb-3">Los productos de Marsof</h2>
            <p className="text-zinc-400 mb-8">Cada herramienta resuelve un problema administrativo específico del negocio español.</p>

            <div className="space-y-3">
              {productos.map(p => (
                <div key={p.nombre} className={`bg-zinc-900/40 border rounded-xl p-6 transition-colors ${p.href ? 'border-white/10 hover:border-white/20' : 'border-white/5 opacity-70'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="text-2xl mt-0.5">{p.icono}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-zinc-100">{p.nombre}</h3>
                          <span className={`text-[10px] font-semibold border px-2 py-0.5 rounded-full ${p.estadoColor}`}>{p.estado}</span>
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed">{p.descripcion}</p>
                      </div>
                    </div>
                    {p.href && (
                      <Link href={p.href} className="text-sky-400 text-sm shrink-0 hover:text-sky-300 transition-colors">
                        Ver →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-zinc-600 mt-4 text-center">
              El roadmap crece según las necesidades reales de nuestros clientes.
            </p>
          </section>

          {/* Fundador */}
          <section className="mb-16">
            <p className="text-xs uppercase tracking-widest text-sky-400 font-semibold mb-4">El equipo</p>
            <h2 className="text-2xl font-bold text-zinc-100 mb-8">Quién hay detrás</h2>

            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center text-xl font-bold text-white shrink-0">
                  CG
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-100">Carlos Gálvez Carrillo</h3>
                  <p className="text-sm text-sky-400 font-medium mb-4">Fundador y CEO · Marsof Technology</p>
                  <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
                    <p>
                      Más de una década de trayectoria en finanzas corporativas, análisis de inversión y consultoría de negocio. Ha trabajado con empresas de distintos tamaños y sectores —desde startups en fase de crecimiento hasta grupos empresariales consolidados— asesorando en estructuración financiera, optimización de operaciones y estrategia de expansión.
                    </p>
                    <p>
                      Esa visión transversal del negocio le llevó a detectar un patrón común: las pymes españolas pierden una cantidad desproporcionada de tiempo y dinero en procesos administrativos que la tecnología puede resolver, pero el software disponible en el mercado no ha sido diseñado para su realidad. Demasiado genérico, demasiado caro o demasiado complejo.
                    </p>
                    <p>
                      Fundó Marsof Technology para cerrar esa brecha: construir herramientas SaaS con IA específicamente diseñadas para el tejido empresarial español, con la misma potencia que usan las grandes corporaciones pero al alcance de cualquier autónomo o pyme.
                    </p>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <a href="https://www.linkedin.com/company/marsof" target="_blank" rel="noopener noreferrer"
                      className="text-xs text-zinc-400 hover:text-sky-400 transition-colors border border-white/10 hover:border-sky-500/30 rounded-lg px-3 py-1.5">
                      LinkedIn
                    </a>
                    <a href="mailto:carlosgc@marsof.es"
                      className="text-xs text-zinc-400 hover:text-sky-400 transition-colors border border-white/10 hover:border-sky-500/30 rounded-lg px-3 py-1.5">
                      carlosgc@marsof.es
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Datos técnicos */}
          <section className="mb-16">
            <p className="text-xs uppercase tracking-widest text-sky-400 font-semibold mb-4">Ficha técnica</p>
            <h2 className="text-2xl font-bold text-zinc-100 mb-6">La empresa en datos</h2>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl divide-y divide-white/5">
              {[
                { label: 'Razón social', valor: 'Marsof Technology' },
                { label: 'Sede', valor: 'Huelva, Andalucía (España)' },
                { label: 'Año de fundación', valor: '2026' },
                { label: 'Cobertura', valor: 'Todo el territorio español' },
                { label: 'Servidores', valor: 'Frankfurt, Alemania — cumplimiento RGPD' },
                { label: 'Tecnología', valor: 'Next.js · Supabase · IA · Stripe' },
                { label: 'Contacto', valor: 'carlosgc@marsof.es' },
              ].map(row => (
                <div key={row.label} className="flex items-baseline justify-between px-6 py-4">
                  <span className="text-sm text-zinc-500 shrink-0 mr-6">{row.label}</span>
                  <span className="text-sm text-zinc-200 text-right">{row.valor}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mb-20">
            <div className="bg-gradient-to-br from-sky-500/15 via-sky-500/5 to-transparent border border-sky-500/25 rounded-2xl p-10 text-center">
              <h2 className="text-2xl font-bold mb-3">Empieza con Saldea, nuestro primer producto</h2>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                Automatiza el cobro de tus facturas impagadas. 30 días gratis, sin tarjeta.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-7 py-3 rounded-lg hover:bg-sky-400 transition-colors">
                  Probar Saldea gratis →
                </Link>
                <a href="mailto:carlosgc@marsof.es" className="inline-block border border-white/15 text-zinc-300 font-medium px-7 py-3 rounded-lg hover:border-white/30 hover:text-white transition-colors">
                  Contactar con el equipo
                </a>
              </div>
            </div>
          </section>

        </div>
        <MarketingFooter />
      </div>
    </>
  )
}
