'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Reveal } from './saldea/Reveal'
import { Counter } from './saldea/Counter'
import { Logo } from './components/Logo'
import MarketingFooter from './components/MarketingFooter'

const apps = [
  {
    nombre: 'Saldea',
    descripcion: 'Cobro automático de facturas con IA. Envía recordatorios que escalan en tono hasta que te paguen.',
    icono: '💰',
    estado: 'disponible' as const,
    precio: '15 días gratis · luego 49€/mes o 499€/año',
    href: '/saldea',
    etiqueta: 'Disponible ahora',
  },
  {
    nombre: 'Contrak',
    descripcion: 'Gestión y seguimiento de contratos. Alertas automáticas de renovación, plantillas y firma digital integrada.',
    icono: '📋',
    estado: 'proximamente' as const,
    precio: 'En desarrollo',
    href: null,
    etiqueta: 'Próximamente',
  },
  {
    nombre: 'Nómixa',
    descripcion: 'Nóminas y liquidaciones para autónomos con empleados. Automatiza la gestión mensual en minutos.',
    icono: '👥',
    estado: 'proximamente' as const,
    precio: 'En desarrollo',
    href: null,
    etiqueta: 'Próximamente',
  },
]

const principios = [
  { icono: '⚡', titulo: 'Configuración en minutos', desc: 'No necesitas saber de tecnología. Cada app está diseñada para que empieces el mismo día.' },
  { icono: '🇪🇸', titulo: 'Diseñado para España', desc: 'En español, adaptado a la normativa fiscal española y a cómo se hacen los negocios aquí.' },
  { icono: '💶', titulo: 'Sin permanencia', desc: 'Paga solo mientras lo usas. Cancela en un clic, sin llamadas ni trámites.' },
  { icono: '🔒', titulo: 'Datos en Europa', desc: 'Cumplimos RGPD. Tus datos viven en servidores europeos cifrados. No los vendemos ni entrenamos modelos con ellos.' },
]

export default function MarsofPage() {
  const [emailAviso, setEmailAviso] = useState<Record<string, string>>({})
  const [avisado, setAvisado] = useState<Record<string, boolean>>({})

  function handleAviso(appNombre: string, e: React.FormEvent) {
    e.preventDefault()
    setAvisado(prev => ({ ...prev, [appNombre]: true }))
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 antialiased overflow-x-hidden">

      {/* Decoración de fondo: glow verde + grid */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute top-[50%] right-[-10%] w-[600px] h-[600px] rounded-full bg-sky-600/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.08),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo variant="mark" size="xs" href={null} />
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">Marsof</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#productos" className="text-zinc-400 hover:text-zinc-200 transition-colors">Productos</a>
            <Link href="/sobre-marsof" className="text-zinc-400 hover:text-zinc-200 transition-colors">Sobre Marsof</Link>
            <Link href="/blog" className="text-zinc-400 hover:text-zinc-200 transition-colors">Blog</Link>
            <Link href="/ofertas" className="text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1.5">
              Ofertas
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            </Link>
          </div>
          <div className="flex items-center gap-2">
<Link href="/login" className="text-sm text-zinc-400 hover:text-zinc-200 font-medium px-3 py-2 transition-colors">
              Acceder
            </Link>
            <Link href="/saldea" className="bg-white text-zinc-900 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-zinc-100 transition-colors">
              Ver productos →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative max-w-5xl mx-auto px-6 pt-20 pb-20 text-center">
        <Reveal effect="scale" duration={900}>
          <div className="mb-10 flex justify-center">
            <Logo variant="full" size="lg" href={null} />
          </div>
        </Reveal>

        <Reveal effect="fade-up">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
            Empresa tecnológica española · micro-SaaS con IA
          </div>
        </Reveal>

        <Reveal effect="fade-up" delay={80}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.0] tracking-tight mb-7 max-w-4xl mx-auto">
            Automatiza lo que te<br />
            <span className="bg-gradient-to-r from-sky-300 via-sky-400 to-sky-500 bg-clip-text text-transparent">
              roba el tiempo
            </span>{' '}
            cada mes.
          </h1>
        </Reveal>

        <Reveal effect="fade-up" delay={160}>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            <strong className="text-zinc-200">Marsof Technology</strong> es una empresa española de software que desarrolla micro-SaaS con IA para autónomos y pymes. Cada app resuelve una tarea repetitiva que te quita horas — y lo hace sola.
          </p>
        </Reveal>

        <Reveal effect="fade-up" delay={240}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#productos"
              className="group inline-flex items-center gap-2 bg-sky-500 text-white px-7 py-4 rounded-xl font-bold text-base hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 hover:-translate-y-0.5"
            >
              Ver nuestros productos
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <Link
              href="/sobre-marsof"
              className="inline-flex items-center gap-2 text-zinc-300 hover:text-white font-medium px-2 py-4 transition-colors"
            >
              Sobre Marsof Technology
            </Link>
          </div>
          <p className="text-zinc-500 text-sm mt-5">Software hecho en España · datos en Europa · sin permanencia</p>
        </Reveal>
      </section>

      {/* Stats con counters */}
      <section className="border-y border-white/5 bg-black/30 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: 47, label: 'días de retraso medio en cobros B2B en España', suffix: '' },
              { num: 100, label: 'hecho en España · datos en Europa', suffix: '%' },
              { num: 0, label: 'permanencia · cancela cuando quieras', suffix: '€' },
              { num: 0, label: 'comisión sobre tus cobros', suffix: '€' },
            ].map((s, i) => (
              <Reveal key={i} effect="fade-up" delay={i * 80}>
                <p className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  <Counter to={s.num} suffix={s.suffix} />
                </p>
                <p className="text-sm text-zinc-500 mt-2">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="py-28 max-w-6xl mx-auto px-6">
        <Reveal effect="fade-up">
          <div className="text-center mb-16">
            <p className="text-sky-400 font-semibold text-xs mb-4 uppercase tracking-[0.2em]">Productos</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Nuestra suite de apps
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Cada app de Marsof ataca un problema concreto. Prueba la que necesites, cancela cuando quieras.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {apps.map((app, i) => (
            <Reveal key={app.nombre} effect="fade-up" delay={i * 100}>
              <div
                className={`relative h-full rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  app.estado === 'disponible'
                    ? 'bg-gradient-to-br from-sky-500/20 via-zinc-900/50 to-zinc-900/50 border-2 border-sky-500/40 shadow-xl shadow-sky-500/10'
                    : 'bg-zinc-900/40 border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Badge top */}
                <div className="flex items-center justify-between mb-7">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    app.estado === 'disponible'
                      ? 'bg-sky-500 text-zinc-900'
                      : 'bg-zinc-800 text-zinc-400 border border-white/10'
                  }`}>
                    {app.etiqueta}
                  </span>
                  <span className="text-3xl">{app.icono}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{app.nombre}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed flex-1 mb-6">{app.descripcion}</p>

                <div className="mt-auto">
                  <p className={`text-sm font-medium mb-4 ${
                    app.estado === 'disponible' ? 'text-sky-300' : 'text-zinc-500'
                  }`}>
                    {app.precio}
                  </p>

                  {app.estado === 'disponible' && app.href ? (
                    <Link
                      href={app.href}
                      className="block w-full text-center bg-sky-500 text-zinc-900 py-3 rounded-xl font-bold hover:bg-sky-400 transition-colors"
                    >
                      Probar {app.nombre} →
                    </Link>
                  ) : avisado[app.nombre] ? (
                    <div className="text-center py-3 text-sm text-sky-300 font-medium bg-sky-500/10 rounded-xl border border-sky-500/20">
                      ✓ Te avisamos cuando esté lista
                    </div>
                  ) : (
                    <form onSubmit={e => handleAviso(app.nombre, e)} className="flex gap-2">
                      <input
                        type="email"
                        required
                        placeholder="tu@email.com"
                        value={emailAviso[app.nombre] || ''}
                        onChange={e => setEmailAviso(prev => ({ ...prev, [app.nombre]: e.target.value }))}
                        className="flex-1 min-w-0 px-3 py-2.5 bg-zinc-950/60 border border-white/10 rounded-lg text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40"
                      />
                      <button
                        type="submit"
                        className="bg-white/10 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/20 transition-colors whitespace-nowrap"
                      >
                        Avísame
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Misión */}
      <section id="mision" className="py-28">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal effect="fade-up">
            <div className="text-center mb-16">
              <p className="text-sky-400 font-semibold text-xs mb-4 uppercase tracking-[0.2em]">Manifiesto</p>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
                Por qué existe Marsof
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Los autónomos y las pymes españolas dedican demasiado tiempo a tareas que se repiten cada semana o cada mes:
                perseguir cobros, renovar contratos, gestionar nóminas. Marsof automatiza esas tareas con IA
                para que puedas centrarte en hacer crecer tu negocio.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {principios.map((p, i) => (
              <Reveal key={p.titulo} effect="fade-up" delay={i * 80}>
                <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 h-full hover:border-sky-500/30 transition-colors">
                  <div className="text-3xl mb-4">{p.icono}</div>
                  <h3 className="font-bold text-white mb-2">{p.titulo}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal effect="scale">
            <div className="relative rounded-3xl bg-gradient-to-br from-sky-500/20 via-sky-500/10 to-transparent border border-sky-500/30 p-12 md:p-16 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.15),transparent_60%)]" />
              <div className="relative">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
                  ¿Tienes una factura sin cobrar ahora mismo?
                </h2>
                <p className="text-zinc-300 mb-10 text-lg max-w-xl mx-auto">
                  Saldea, nuestro primer producto, lo resuelve solo. Pruébalo 15 días gratis.
                </p>
                <Link
                  href="/saldea"
                  className="inline-flex items-center gap-2 bg-white text-zinc-900 px-8 py-4 rounded-xl font-bold text-base hover:bg-zinc-100 transition-all hover:-translate-y-0.5 shadow-2xl shadow-sky-500/20"
                >
                  Probar Saldea gratis
                  <span>→</span>
                </Link>
                <p className="text-zinc-600 text-xs mt-4">15 días gratis · sin permanencia · cancela en 1 clic</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
