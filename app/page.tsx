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
<Link href="/admin/login" className="text-sm text-zinc-400 hover:text-zinc-200 font-medium px-3 py-2 transition-colors">
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

      {/* Testimonios (preview) */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal effect="fade-up">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <p className="text-sky-400 font-semibold text-xs mb-3 uppercase tracking-[0.2em]">Testimonios</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Lo que dicen quienes ya cobran</h2>
              </div>
              <Link href="/testimonios" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors whitespace-nowrap flex items-center gap-1">
                Ver los 20 testimonios →
              </Link>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                texto: 'Llevaba años con el mismo problema: facturaba bien pero cobrar era un calvario. Saldea envía los recordatorios por mí sin que parezca que soy yo quien presiona. Recuperé casi 4.000€ en facturas que llevaban más de 90 días.',
                nombre: 'Raúl Domínguez',
                rol: 'Consultor IT autónomo · Madrid',
                avatar: 'RD',
                color: 'bg-sky-600',
                estrellas: 5,
              },
              {
                texto: 'En nuestra gestoría gestionamos la facturación de más de 40 clientes. Antes teníamos una persona dedicada casi a tiempo parcial a hacer seguimiento de impagados. Ahora Saldea lo hace solo.',
                nombre: 'Jorge Peinado',
                rol: 'Socio en gestoría · Sevilla',
                avatar: 'JP',
                color: 'bg-emerald-600',
                estrellas: 5,
              },
              {
                texto: 'El mayor problema en mi sector es que no puedes ponerte a cobrar de forma agresiva con pacientes. Saldea lo maneja con una templanza que yo sola no podría mantener. Los mensajes son amables y aun así funcionan.',
                nombre: 'Sofía Martínez',
                rol: 'Psicóloga en consulta privada · Granada',
                avatar: 'SM',
                color: 'bg-rose-600',
                estrellas: 5,
              },
            ].map((t, i) => (
              <Reveal key={i} effect="fade-up" delay={i * 80}>
                <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 flex flex-col h-full hover:border-white/10 transition-colors">
                  <div className="flex gap-0.5 mb-4">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} className={s <= t.estrellas ? 'text-amber-400' : 'text-zinc-700'}>★</span>
                    ))}
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed flex-1 mb-5">&ldquo;{t.texto}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-100">{t.nombre}</p>
                      <p className="text-xs text-zinc-500">{t.rol}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal effect="fade-up">
            <div className="text-center mt-8">
              <Link href="/testimonios" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 bg-zinc-900/60 border border-white/5 px-5 py-2.5 rounded-lg transition-colors hover:border-white/10">
                Ver los 20 testimonios completos →
              </Link>
            </div>
          </Reveal>
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

      {/* Visión — sección inversores */}
      <section className="py-32 relative overflow-hidden">
        {/* Fondo dramático */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-950/20 to-black/60" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6">

          {/* Titular principal */}
          <Reveal effect="fade-up">
            <div className="text-center mb-20">
              <p className="text-sky-400 font-semibold text-xs mb-5 uppercase tracking-[0.3em]">Visión · 2025–2035</p>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.0] mb-8 max-w-5xl mx-auto">
                Construyendo la empresa<br />
                <span className="bg-gradient-to-r from-sky-300 via-sky-400 to-sky-500 bg-clip-text text-transparent">
                  tecnológica más grande
                </span>
                <br />de España.
              </h2>
              <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                Marsof no es una empresa de software más. Es la base desde la que construiremos
                el ecosistema tecnológico español más ambicioso de la próxima década.
              </p>
            </div>
          </Reveal>

          {/* Frase de impacto */}
          <Reveal effect="scale">
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur p-10 md:p-14 mb-20 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.08),transparent_70%)]" />
              <blockquote className="relative text-2xl md:text-3xl font-bold text-white leading-snug max-w-4xl mx-auto">
                &ldquo;Cada gran empresa tecnológica empezó resolviendo un solo problema.
                Nosotros empezamos con los cobros.
                El resto está por construir.&rdquo;
              </blockquote>
              <p className="relative text-zinc-500 text-sm mt-6 font-medium">Carlos Gálvez Carrillo · Fundador, Marsof Technology</p>
            </div>
          </Reveal>

          {/* Sectores futuros */}
          <Reveal effect="fade-up">
            <p className="text-center text-sky-400 font-semibold text-xs mb-10 uppercase tracking-[0.3em]">Sectores en el roadmap</p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {[
              {
                icono: '💡',
                fase: 'Hoy',
                sector: 'Micro-SaaS financiero',
                desc: 'Automatizamos cobros, contratos y nóminas para autónomos y pymes españolas con IA. Saldea es el primero de una familia de productos.',
                estado: 'activo',
              },
              {
                icono: '🎓',
                fase: 'Próximo',
                sector: 'Educación digital',
                desc: 'Plataformas de formación profesional y aprendizaje adaptativo para el mercado español. La educación necesita la mejor tecnología posible.',
                estado: 'proximo',
              },
              {
                icono: '🏥',
                fase: 'Próximo',
                sector: 'Salud y bienestar',
                desc: 'Gestión de consultas, historial clínico digital y automatización para centros médicos, fisioterapeutas y psicólogos.',
                estado: 'proximo',
              },
              {
                icono: '🏗️',
                fase: 'Futuro',
                sector: 'Infraestructura tech',
                desc: 'Herramientas de desarrollo, servicios cloud y plataformas de IA soberanas con servidores en Europa y enfoque en privacidad.',
                estado: 'futuro',
              },
              {
                icono: '🌍',
                fase: 'Futuro',
                sector: 'Expansión LATAM',
                desc: 'Llevar el modelo de micro-SaaS especializado a los 400 millones de hispanohablantes que comparten normativa, idioma y cultura empresarial.',
                estado: 'futuro',
              },
              {
                icono: '🤖',
                fase: 'Futuro',
                sector: 'IA aplicada',
                desc: 'Modelos de inteligencia artificial especializados en el contexto legal, fiscal y lingüístico español. IA que entiende España.',
                estado: 'futuro',
              },
            ].map((s, i) => (
              <Reveal key={s.sector} effect="fade-up" delay={i * 70}>
                <div className={`h-full rounded-2xl p-7 flex flex-col border transition-colors hover:-translate-y-0.5 transition-transform ${
                  s.estado === 'activo'
                    ? 'bg-sky-500/10 border-sky-500/30 hover:border-sky-500/50'
                    : s.estado === 'proximo'
                    ? 'bg-zinc-900/50 border-white/10 hover:border-white/20'
                    : 'bg-zinc-900/30 border-white/5 hover:border-white/10'
                }`}>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl">{s.icono}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      s.estado === 'activo'
                        ? 'bg-sky-500 text-zinc-900'
                        : s.estado === 'proximo'
                        ? 'bg-zinc-800 text-zinc-400 border border-white/10'
                        : 'bg-zinc-900 text-zinc-600 border border-white/5'
                    }`}>
                      {s.fase}
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold mb-3 ${s.estado === 'activo' ? 'text-sky-200' : 'text-zinc-100'}`}>
                    {s.sector}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed flex-1">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA inversores */}
          <Reveal effect="scale">
            <div className="relative rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-zinc-900/60 border border-white/10 p-10 md:p-14 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(14,165,233,0.12),transparent_60%)]" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
              <div className="relative">
                <p className="text-sky-400 font-semibold text-xs mb-4 uppercase tracking-[0.3em]">Para inversores</p>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight">
                  ¿Quieres ser parte de esto?
                </h3>
                <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                  Estamos en la fase más temprana y más emocionante. Si compartes la visión de construir
                  tecnología española de impacto real, hablemos.
                </p>
                <a
                  href="mailto:carlosgc@marsof.es?subject=Inversión en Marsof Technology"
                  className="inline-flex items-center gap-2 bg-white text-zinc-900 px-8 py-4 rounded-xl font-bold text-base hover:bg-zinc-100 transition-all hover:-translate-y-0.5 shadow-2xl shadow-sky-500/20"
                >
                  Contactar con el fundador
                  <span>→</span>
                </a>
                <p className="text-zinc-600 text-xs mt-5">
                  Marsof Technology · Fundada 2024 · Hecha en España
                </p>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
