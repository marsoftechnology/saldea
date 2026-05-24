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
      <section className="py-32 relative overflow-hidden bg-black/40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(14,165,233,0.07),transparent)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto px-6">

          {/* Encabezado + subtítulo alineado a la izquierda */}
          <Reveal effect="fade-up">
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-10 bg-sky-500" />
                <p className="text-sky-400 font-semibold text-xs uppercase tracking-[0.3em]">Visión 2025–2035</p>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white mb-7 max-w-4xl">
                Construyendo el ecosistema<br />
                tecnológico más ambicioso<br />
                <span className="text-zinc-500">de España.</span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
                Marsof es hoy una empresa de micro-SaaS. En 2035 será la referencia tecnológica española:
                software, educación, salud e inteligencia artificial, construidos aquí.
              </p>
            </div>
          </Reveal>

          {/* Cita editorial — sin caja, solo tipografía */}
          <Reveal effect="fade-up">
            <div className="border-l-2 border-sky-500 pl-8 mb-24">
              <p className="text-xl md:text-2xl font-medium text-zinc-100 leading-snug max-w-3xl">
                &ldquo;Cada gran empresa tecnológica empezó resolviendo un solo problema bien.
                Nosotros empezamos con los cobros. El resto está por construir.&rdquo;
              </p>
              <p className="text-zinc-500 text-sm mt-4">Carlos Gálvez Carrillo · Fundador, Marsof Technology</p>
            </div>
          </Reveal>

          {/* Timeline de fases */}
          <div className="relative mb-24">
            {/* Línea vertical — solo desktop */}
            <div className="hidden lg:block absolute left-[168px] top-2 bottom-2 w-px bg-gradient-to-b from-sky-500 via-zinc-700 to-zinc-800/0" />

            {[
              {
                año: '2024–2025',
                label: 'Fase I',
                titulo: 'Micro-SaaS financiero',
                desc: 'Saldea automatiza cobros de facturas con IA. Contrak gestiona contratos. Nómixa simplifica nóminas. Tres apps, tres problemas universales para autónomos y pymes españolas.',
                activo: true,
              },
              {
                año: '2026–2027',
                label: 'Fase II',
                titulo: 'Educación y salud digital',
                desc: 'Plataformas de formación profesional adaptativa y software de gestión para clínicas, fisioterapeutas y psicólogos. Dos sectores masivos con digitalización pendiente.',
                activo: false,
              },
              {
                año: '2028–2030',
                label: 'Fase III',
                titulo: 'Infraestructura cloud soberana',
                desc: 'Servicios cloud con datos en España, herramientas para desarrolladores y modelos de IA entrenados sobre el marco legal y fiscal español. Soberanía tecnológica real.',
                activo: false,
              },
              {
                año: '2030–2035',
                label: 'Fase IV',
                titulo: 'Expansión LATAM e IA aplicada',
                desc: '400 millones de hispanohablantes. Modelos de inteligencia artificial especializados en el contexto jurídico, fiscal y cultural de España e Hispanoamérica.',
                activo: false,
              },
            ].map((fase, i) => (
              <Reveal key={fase.label} effect="fade-up" delay={i * 80}>
                <div className="relative flex gap-8 lg:gap-16 items-start mb-8 last:mb-0">
                  {/* Año — columna fija desktop */}
                  <div className="hidden lg:block w-[140px] flex-shrink-0 text-right pt-[18px]">
                    <p className="text-zinc-600 text-xs font-mono tabular-nums">{fase.año}</p>
                  </div>

                  {/* Punto en la línea */}
                  <div className="hidden lg:flex absolute left-[161px] top-[18px] w-5 h-5 items-center justify-center z-10">
                    <div className={`w-3 h-3 rounded-full border-2 transition-all ${
                      fase.activo
                        ? 'bg-sky-400 border-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.7)]'
                        : 'bg-zinc-950 border-zinc-600'
                    }`} />
                  </div>

                  {/* Tarjeta de contenido */}
                  <div className={`flex-1 rounded-2xl p-7 border transition-colors ${
                    fase.activo
                      ? 'bg-sky-500/[0.06] border-sky-500/20'
                      : 'bg-zinc-900/30 border-white/5 hover:border-white/10'
                  }`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        fase.activo ? 'bg-sky-500 text-zinc-900' : 'bg-zinc-800/80 text-zinc-400'
                      }`}>
                        {fase.label}
                      </span>
                      <span className="lg:hidden text-zinc-600 text-xs font-mono">{fase.año}</span>
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${fase.activo ? 'text-white' : 'text-zinc-200'}`}>
                      {fase.titulo}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{fase.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Métricas de credibilidad */}
          <Reveal effect="fade-up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-20">
              {[
                { valor: '3', label: 'productos en desarrollo', sub: '2024–2025' },
                { valor: '4', label: 'fases de crecimiento', sub: '2025–2035' },
                { valor: '100%', label: 'bootstrapped · sin deuda', sub: 'desde el inicio' },
                { valor: 'ES', label: 'datos en Europa · cumple RGPD', sub: 'servidores europeos' },
              ].map((m, i) => (
                <div key={i} className="border border-white/5 rounded-xl p-5 text-center bg-zinc-900/20 hover:border-white/10 transition-colors">
                  <p className="text-3xl font-bold text-white mb-1 tracking-tight">{m.valor}</p>
                  <p className="text-zinc-400 text-xs leading-tight mb-1">{m.label}</p>
                  <p className="text-zinc-600 text-[10px]">{m.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* CTA inversores — layout en dos columnas */}
          <Reveal effect="scale">
            <div className="relative rounded-2xl overflow-hidden border border-white/8">
              <div className="absolute inset-0 bg-zinc-900/80" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_0%_50%,rgba(14,165,233,0.06),transparent)]" />

              <div className="relative grid md:grid-cols-[1fr_auto] gap-8 p-10 md:p-14 items-center">
                <div>
                  <p className="text-sky-400 font-semibold text-xs mb-3 uppercase tracking-[0.3em]">Para inversores</p>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-[1.1]">
                    ¿Quieres construir<br className="hidden md:block" /> esto con nosotros?
                  </h3>
                  <p className="text-zinc-400 max-w-md leading-relaxed text-sm md:text-base">
                    Buscamos inversores que entiendan la oportunidad de construir tecnología española de referencia.
                    Si compartes esa visión, escríbenos — respondemos en 24 horas.
                  </p>
                </div>
                <div className="flex flex-col gap-2 md:items-end shrink-0">
                  <a
                    href="mailto:carlosgc@marsof.es?subject=Inversión en Marsof Technology"
                    className="inline-flex items-center gap-2 bg-white text-zinc-900 px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-zinc-100 transition-all hover:-translate-y-0.5 whitespace-nowrap shadow-lg shadow-black/30"
                  >
                    Hablar con el fundador →
                  </a>
                  <p className="text-zinc-600 text-xs text-center md:text-right">carlosgc@marsof.es</p>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
