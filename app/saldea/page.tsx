import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { PricingSection } from './PricingSection'
import { Reveal } from './Reveal'
import { Counter } from './Counter'
// Marco "browser window" reutilizable para envolver screenshots del producto
function BrowserFrame({ src, alt, url, priority = false }: { src: string; alt: string; url: string; priority?: boolean }) {
  return (
    <div className="rounded-xl md:rounded-2xl bg-gradient-to-br from-sky-500/30 via-white/10 to-transparent p-[1px] shadow-2xl shadow-sky-500/10">
      <div className="rounded-xl md:rounded-2xl bg-zinc-900 overflow-hidden">
        {/* Barra superior tipo navegador */}
        <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/80 border-b border-white/5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500/60" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-zinc-800/80 text-zinc-500 text-xs px-3 py-1 rounded-md font-mono">
              {url}
            </div>
          </div>
        </div>
        {/* Screenshot */}
        <Image
          src={src}
          alt={alt}
          width={1534}
          height={691}
          priority={priority}
          className="w-full h-auto block"
        />
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Saldea â€” Software de cobros con IA para autÃ³nomos y pymes',
  description: 'Automatiza el cobro de tus facturas impagadas con IA. Recordatorios que escalan en tono, detecciÃ³n de respuestas, Stripe Connect. 49â‚¬/mes Â· 1 mes gratis.',
  alternates: { canonical: 'https://marsof.es/saldea' },
  keywords: [
    'software cobros',
    'cobrar facturas impagadas',
    'recordatorios de pago automaticos',
    'IA cobros morosos',
    'gestion de cobros pymes',
    'saldea',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'Saldea by Marsof',
    title: 'Saldea â€” Software de cobros con IA',
    description: 'IA que persigue tus facturas impagadas 24/7. 1 mes gratis.',
  },
}

const pasos = [
  {
    num: '01',
    titulo: 'AÃ±ade tus facturas',
    desc: 'Crea facturas una a una o importa cientos de golpe desde CSV. La configuraciÃ³n inicial tarda menos de 5 minutos.',
  },
  {
    num: '02',
    titulo: 'Saldea actÃºa sola',
    desc: 'La IA genera y envÃ­a recordatorios automÃ¡ticos que escalan el tono segÃºn los dÃ­as de retraso. De cordial a Ãºltimo aviso legal.',
  },
  {
    num: '03',
    titulo: 'Cobras antes',
    desc: 'Tus clientes confirman el pago con un clic. Si responden por email, Saldea detecta si pagaron, discuten o estÃ¡n de vacaciones y pausa los recordatorios automÃ¡ticamente.',
  },
]

const comparativa = [
  { feature: 'Recordatorios automÃ¡ticos', saldea: true, manual: false, otros: 'Manual' },
  { feature: 'Escalado de tono con IA', saldea: true, manual: false, otros: false },
  { feature: 'Detecta respuestas del cliente', saldea: true, manual: false, otros: false },
  { feature: 'Pausa automÃ¡tica si paga / disputa', saldea: true, manual: false, otros: false },
  { feature: 'Plantillas en 4 idiomas', saldea: true, manual: false, otros: 'A veces' },
  { feature: 'PDF de factura adjunto', saldea: true, manual: false, otros: true },
  { feature: 'Emails con tu logo, firma y empresa', saldea: true, manual: 'Si te acuerdas', otros: 'A veces' },
  { feature: 'Tiempo dedicado a perseguir cobros', saldea: '0h/mes', manual: '5-10h/mes por cliente', otros: '2-4h/mes' },
  { feature: 'Coste', saldea: '49â‚¬/mes o 499â‚¬/aÃ±o', manual: '0â‚¬ (tu tiempo)', otros: '100-1.000â‚¬/mes' },
]

const faqs = [
  { p: 'Â¿Necesito saber de tecnologÃ­a?', r: 'No. Si sabes usar el correo electrÃ³nico, sabes usar Saldea. La configuraciÃ³n inicial tarda menos de 10 minutos.' },
  { p: 'Â¿Mis clientes sabrÃ¡n que es automÃ¡tico?', r: 'No notarÃ¡n nada. Los emails llevan el nombre de tu empresa como remitente, tu logo y tu firma. La IA escribe en espaÃ±ol natural, no parece un bot.' },
  { p: 'Â¿QuÃ© pasa si un cliente responde al email?', r: 'Saldea lo detecta automÃ¡ticamente (plan Pro). Si dice "ya paguÃ©" pausa los recordatorios y te avisa. Si discute, pausa 30 dÃ­as y te alerta. Si estÃ¡ de vacaciones, extrae la fecha de vuelta y reanuda entonces.' },
  { p: 'Â¿CuÃ¡ndo se me cobra y cÃ³mo cancelo?', r: 'En el plan mensual: los primeros 30 dÃ­as son gratis y sin cobro. Si no cancelas antes, el dÃ­a 31 se carga el primer pago de 49â‚¬. En el plan anual: el cobro de 499â‚¬ se realiza al firmar (no hay trial porque asumimos que ya conoces el producto). En ambos puedes cancelar en 1 clic desde tu panel, sin llamadas ni permanencia.' },
  { p: 'Â¿Por quÃ© el anual no tiene 1 mes gratis?', r: 'El trial de 1 mes estÃ¡ pensado para que pruebes Saldea sin riesgo antes de comprometerte. Si eliges el anual, asumimos que ya has probado el mensual o sabes lo que quieres. A cambio te llevas un descuento equivalente a casi 2 meses gratis (ahorras 89â‚¬ al aÃ±o).' },
  { p: 'Â¿Necesito poner tarjeta para empezar?', r: 'SÃ­. En el mensual la tarjeta activa la prueba de 30 dÃ­as pero NO se carga hasta el dÃ­a 31. En el anual la tarjeta se cobra al instante (499â‚¬).' },
  { p: 'Â¿Mensual o anual: cuÃ¡l me conviene?', r: 'Si todavÃ­a estÃ¡s validando si Saldea encaja contigo, empieza con el mensual (1 mes gratis, sales cuando quieras). Si ya lo conoces o tienes claro que vas a usarlo mÃ¡s de 10 meses al aÃ±o, el anual te ahorra 89â‚¬ (~15%).' },
  { p: 'Â¿Puedo importar mis facturas actuales?', r: 'SÃ­. Importa tus facturas desde un CSV en segundos. La plantilla estÃ¡ disponible en el panel.' },
  { p: 'Â¿QuÃ© pasa con la privacidad de mis clientes?', r: 'Saldea cumple RGPD. Los datos estÃ¡n en servidores europeos (Supabase, Vercel) cifrados. NingÃºn dato se vende ni se usa para entrenar modelos de IA.' },
  { p: 'Â¿Hay integraciÃ³n con mi software de facturaciÃ³n?', r: 'PrÃ³ximamente: Holded, FacturaDirecta, Quaderno, Sage. Mientras tanto, puedes importar las facturas exportadas a CSV desde cualquiera de esos sistemas.' },
]

export default function SaldeaPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 antialiased overflow-x-hidden">

      {/* DecoraciÃ³n de fondo: glow verde animado */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute top-[60%] right-[-10%] w-[600px] h-[600px] rounded-full bg-sky-600/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.08),transparent_50%)]" />
        {/* Grid pattern overlay */}
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
            <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">Marsof</Link>
            <span className="text-zinc-700">/</span>
            <span className="text-white font-semibold tracking-tight">Saldea</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="#funciona" className="hidden md:block text-sm text-zinc-400 hover:text-zinc-200 font-medium px-3 py-2 transition-colors">
              CÃ³mo funciona
            </a>
            <a href="#precios" className="hidden md:block text-sm text-zinc-400 hover:text-zinc-200 font-medium px-3 py-2 transition-colors">
              Precios
            </a>
<Link href="/login" className="text-sm text-zinc-400 hover:text-zinc-200 font-medium px-3 py-2 transition-colors">
              Acceder
            </Link>
            <Link
              href="/registro"
              className="bg-white text-zinc-900 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              1 mes gratis â†’
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <Reveal effect="fade-up">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-7">
            <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
            1 mes gratis Â· cancela en 1 clic
          </div>
        </Reveal>

        <Reveal effect="fade-up" delay={80}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.0] tracking-tight mb-6 max-w-4xl mx-auto" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Cobra tus facturas<br />
            <span className="bg-gradient-to-r from-sky-300 via-sky-400 to-sky-500 bg-clip-text text-transparent">
              sin perseguir
            </span>{' '}
            a nadie.
          </h1>
        </Reveal>

        <Reveal effect="fade-up" delay={160}>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Saldea es una IA que escribe y manda los recordatorios por ti.
            Escala el tono con los dÃ­as, entiende las respuestas de tus clientes
            y pausa cuando se confirma el pago.
          </p>
        </Reveal>

        <Reveal effect="fade-up" delay={240}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <Link
              href="/registro?plan=mes"
              className="group relative inline-flex items-center gap-2 bg-sky-500 text-white px-7 py-4 rounded-xl font-bold text-base hover:bg-sky-400 transition-all w-full sm:w-auto justify-center shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 hover:-translate-y-0.5"
            >
              Empezar 1 mes gratis
              <span className="transition-transform group-hover:translate-x-1">â†’</span>
            </Link>
            <a
              href="#funciona"
              className="inline-flex items-center gap-2 text-zinc-300 hover:text-white font-medium px-2 py-4 transition-colors"
            >
              Ver cÃ³mo funciona
            </a>
          </div>
          <p className="text-zinc-500 text-sm">
            Sin permanencia Â· cancela antes del dÃ­a 31 y no pagas nada
          </p>
        </Reveal>

        {/* Screenshot real del dashboard en un browser-frame */}
        <Reveal effect="fade-up" delay={400}>
          <div className="relative mt-16 max-w-5xl mx-auto">
            {/* Glow detrÃ¡s de la imagen */}
            <div className="absolute inset-0 bg-sky-500/20 blur-3xl -z-10 rounded-3xl" />
            <BrowserFrame
              src="/images/saldea/dashboard.png"
              alt="Panel de control de Saldea con stats de facturas por cobrar, cobradas, tasa de cobro y recordatorios enviados"
              url="marsof.es/dashboard"
              priority
            />

            {/* Mini notif flotante "respuesta detectada" */}
            <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-zinc-900 border border-white/10 rounded-xl p-3 shadow-2xl shadow-black/50 max-w-[260px] hidden md:block">
              <div className="flex items-start gap-2.5">
                <span className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 font-bold">âœ“</span>
                <div className="text-left">
                  <p className="text-sm font-semibold text-zinc-100">Pedro respondiÃ³</p>
                  <p className="text-xs text-zinc-500 mt-0.5">&quot;Ya te he transferido&quot; Â· Pausado 7 dÃ­as</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Stats con counter */}
      <section className="border-y border-white/5 bg-black/30 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: 10, label: 'horas ahorradas al mes', suffix: 'h' },
              { num: 5, label: 'tonos: de cordial a legal', suffix: '' },
              { num: 4, label: 'idiomas: ES Â· CA Â· EN Â· PT', suffix: '' },
              { num: 5, label: 'min. para empezar', prefix: '<', suffix: '' },
            ].map((s, i) => (
              <Reveal key={i} effect="fade-up" delay={i * 80}>
                <p className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  <Counter to={s.num} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="text-sm text-zinc-500 mt-2">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Problema */}
      <section className="py-28 max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Reveal effect="slide-left">
            <p className="text-sky-400 font-semibold text-xs mb-4 uppercase tracking-[0.2em]">El problema</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight tracking-tight">
              Perseguir cobros es lo peor de ser autÃ³nomo
            </h2>
            <div className="space-y-4 text-zinc-400 text-base">
              {[
                'Mandas un email y no contestan porque es incÃ³modo pedir dinero',
                'Las facturas pendientes se acumulan y los clientes aprovechan tu dejadez',
                'No tienes tiempo para hacer seguimiento de cada factura cada semana',
                'Llevas meses esperando pagos que ya dabas por perdidos',
              ].map((t, i) => (
                <Reveal key={i} effect="fade-up" delay={i * 80}>
                  <p className="flex items-start gap-3">
                    <span className="text-rose-400/60 mt-1 text-lg leading-none">âœ•</span>
                    <span>{t}</span>
                  </p>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal effect="slide-right">
            <div className="relative bg-gradient-to-br from-sky-500/10 via-sky-500/5 to-transparent border border-sky-500/20 rounded-3xl p-8 md:p-10">
              <p className="text-sky-400 font-semibold text-xs mb-4 uppercase tracking-[0.2em]">La soluciÃ³n</p>
              <h3 className="text-2xl font-bold text-white mb-6 leading-tight">
                Saldea lo hace por ti, con el tono exacto
              </h3>
              <div className="space-y-4 text-zinc-300">
                {[
                  'Recordatorio cordial a los pocos dÃ­as del vencimiento',
                  'Tono mÃ¡s firme si no hay respuesta',
                  'Ãšltimo aviso legal antes de juzgado (si lo necesitas)',
                  'Cada email lleva la factura adjunta en PDF',
                  'Si el cliente responde, Saldea lo entiende y actÃºa',
                ].map((t, i) => (
                  <Reveal key={i} effect="fade-up" delay={i * 80}>
                    <p className="flex items-start gap-3">
                      <span className="text-sky-400 mt-1 font-bold text-base leading-none">âœ“</span>
                      <span>{t}</span>
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CÃ³mo funciona â€” narrativo con screenshots alternados */}
      <section id="funciona" className="py-28 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal effect="fade-up">
            <div className="text-center mb-24">
              <p className="text-sky-400 font-semibold text-xs mb-4 uppercase tracking-[0.2em]">CÃ³mo funciona</p>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                ConfigÃºralo una vez,<br />cobra para siempre
              </h2>
            </div>
          </Reveal>

          {/* Paso 1: Importar */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-32">
            <Reveal effect="slide-left">
              <p className="text-sky-400/60 font-bold text-7xl leading-none mb-4">01</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight">{pasos[0].titulo}</h3>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">{pasos[0].desc}</p>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-start gap-3"><span className="text-sky-400 font-bold mt-0.5">âœ“</span> Crea facturas una a una desde el panel</li>
                <li className="flex items-start gap-3"><span className="text-sky-400 font-bold mt-0.5">âœ“</span> Importa CSV con cientos de facturas de golpe</li>
                <li className="flex items-start gap-3"><span className="text-sky-400 font-bold mt-0.5">âœ“</span> Plantilla con el formato exacto disponible</li>
              </ul>
            </Reveal>
            <Reveal effect="slide-right" delay={150}>
              <BrowserFrame
                src="/images/saldea/importar.png"
                alt="Pantalla de importaciÃ³n CSV de Saldea mostrando el formato esperado con columnas nombre, email, factura, importe, vencimiento"
                url="marsof.es/importar"
              />
            </Reveal>
          </div>

          {/* Paso 2: Configurar tono */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-32">
            <Reveal effect="slide-left" className="lg:order-2">
              <p className="text-sky-400/60 font-bold text-7xl leading-none mb-4">02</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight">{pasos[1].titulo}</h3>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">{pasos[1].desc}</p>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-start gap-3"><span className="text-sky-400 font-bold mt-0.5">âœ“</span> 5 tonos: de cordial a Ãºltimo aviso legal</li>
                <li className="flex items-start gap-3"><span className="text-sky-400 font-bold mt-0.5">âœ“</span> Frecuencia personalizable (cada cuÃ¡ntos dÃ­as)</li>
                <li className="flex items-start gap-3"><span className="text-sky-400 font-bold mt-0.5">âœ“</span> Tu logo, firma y dominio en cada email</li>
              </ul>
            </Reveal>
            <Reveal effect="slide-right" delay={150} className="lg:order-1">
              <BrowserFrame
                src="/images/saldea/ajustes.png"
                alt="Panel de Ajustes de Saldea con secciones para Plan y suscripciÃ³n, Mi perfil, Frecuencia de recordatorios, Tono y mensajes, e Imagen de marca"
                url="marsof.es/ajustes"
              />
            </Reveal>
          </div>

          {/* Paso 3: Ver resultados */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal effect="slide-left">
              <p className="text-sky-400/60 font-bold text-7xl leading-none mb-4">03</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight">{pasos[2].titulo}</h3>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">{pasos[2].desc}</p>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-start gap-3"><span className="text-sky-400 font-bold mt-0.5">âœ“</span> Estado de cada factura en tiempo real</li>
                <li className="flex items-start gap-3"><span className="text-sky-400 font-bold mt-0.5">âœ“</span> Tasa de cobro y total pendiente al dÃ­a</li>
                <li className="flex items-start gap-3"><span className="text-sky-400 font-bold mt-0.5">âœ“</span> Saldea pausa los recordatorios automÃ¡ticamente cuando detecta pago o respuesta</li>
              </ul>
            </Reveal>
            <Reveal effect="slide-right" delay={150}>
              <BrowserFrame
                src="/images/saldea/facturas.png"
                alt="Listado de facturas de Saldea mostrando clientes, importes y fechas de vencimiento"
                url="marsof.es/facturas"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features bento */}
      <section className="py-28 max-w-6xl mx-auto px-6">
        <Reveal effect="fade-up">
          <div className="text-center mb-16">
            <p className="text-sky-400 font-semibold text-xs mb-4 uppercase tracking-[0.2em]">Todo lo que necesitas</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Pensado por y para autÃ³nomos espaÃ±oles
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          <Reveal effect="fade-up" className="md:col-span-2">
            <div className="bg-gradient-to-br from-sky-500/10 to-transparent border border-white/10 rounded-2xl p-8 h-full hover:border-sky-500/30 transition-colors">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                IA Premium
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">5 tonos que escalan solos</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                De cordial el dÃ­a 3 a Ãºltimo aviso legal el dÃ­a 45. La IA elige el tono segÃºn los dÃ­as de retraso y reescribe cada mensaje para que no parezca un bot. TÃº no haces nada.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Cordial', 'Firme', 'Formal', 'Contundente', 'Ãšltimo aviso legal'].map((t, i) => (
                  <span
                    key={t}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full border ${
                      i === 0
                        ? 'bg-sky-500/10 text-sky-300 border-sky-500/30'
                        : i === 4
                        ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                        : 'bg-white/5 text-zinc-400 border-white/10'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal effect="fade-up" delay={100}>
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8 h-full hover:border-sky-500/30 transition-colors">
              <div className="text-3xl mb-4">ðŸ“¬</div>
              <h3 className="text-lg font-bold text-white mb-2">Detecta respuestas</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Si el cliente dice &ldquo;ya paguÃ©&rdquo;, &ldquo;estoy de vacaciones&rdquo; o discute, Saldea lo entiende y pausa los recordatorios.
              </p>
            </div>
          </Reveal>

          <Reveal effect="fade-up">
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8 h-full hover:border-sky-500/30 transition-colors">
              <div className="text-3xl mb-4">ðŸŒ</div>
              <h3 className="text-lg font-bold text-white mb-2">4 idiomas</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                EspaÃ±ol, catalÃ¡n, inglÃ©s y portuguÃ©s. La IA escribe en el idioma de cada cliente sin que tengas que indicÃ¡rselo.
              </p>
            </div>
          </Reveal>

          <Reveal effect="fade-up" delay={100}>
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8 h-full hover:border-sky-500/30 transition-colors">
              <div className="text-3xl mb-4">ðŸ“Ž</div>
              <h3 className="text-lg font-bold text-white mb-2">PDF + tu marca</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Cada email lleva el PDF de la factura adjunto, tu logo, tu firma y sale a nombre de tu empresa. No parece automÃ¡tico.
              </p>
            </div>
          </Reveal>

          <Reveal effect="fade-up" delay={200} className="md:col-span-1">
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8 h-full hover:border-sky-500/30 transition-colors">
              <div className="text-3xl mb-4">âš–ï¸</div>
              <h3 className="text-lg font-bold text-white mb-2">Recargo + descuento</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Configura recargo de mora a partir del dÃ­a X y descuento por pronto pago. Saldea los aplica en el mensaje automÃ¡ticamente.
              </p>
            </div>
          </Reveal>

          <Reveal effect="fade-up" delay={300} className="md:col-span-2">
            <div className="bg-gradient-to-br from-sky-500/5 via-transparent to-sky-500/5 border border-white/10 rounded-2xl p-8 h-full hover:border-sky-500/30 transition-colors">
              <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-4">
                ImportaciÃ³n masiva
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Sube cientos de facturas en segundos</h3>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Exporta tus facturas desde Holded, FacturaDirecta, Quaderno o cualquier programa a CSV. SÃºbelo a Saldea y empieza a cobrarlas todas a la vez.
              </p>
              <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-xs text-zinc-400 overflow-x-auto">
                <div>nombre,email,empresa,factura,importe,vencimiento</div>
                <div className="text-sky-300">Pedro GarcÃ­a,pedro@taller.com,Taller SL,2026-014,1250.00,2026-04-30</div>
                <div className="text-sky-300">MarÃ­a LÃ³pez,maria@tech.com,Tech SA,2026-015,800.00,2026-05-12</div>
                <div className="text-zinc-600">...</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Comparativa */}
      <section className="py-28 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal effect="fade-up">
            <div className="text-center mb-14">
              <p className="text-sky-400 font-semibold text-xs mb-4 uppercase tracking-[0.2em]">Comparativa</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                Saldea vs hacerlo a mano vs otros
              </h2>
              <p className="text-zinc-500">Comparamos honestamente. Saldea no es para todo el mundo.</p>
            </div>
          </Reveal>

          <Reveal effect="fade-up">
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900/40">
              <table className="w-full border-collapse min-w-[600px]">
                <thead className="bg-white/[0.02]">
                  <tr>
                    <th className="text-left p-5 text-xs font-semibold text-zinc-500 uppercase tracking-wide">CaracterÃ­stica</th>
                    <th className="p-5 text-xs font-semibold uppercase tracking-wide bg-sky-500/10 text-sky-300">Saldea</th>
                    <th className="p-5 text-xs font-semibold text-zinc-500 uppercase tracking-wide">A mano</th>
                    <th className="p-5 text-xs font-semibold text-zinc-500 uppercase tracking-wide">Otros software</th>
                  </tr>
                </thead>
                <tbody>
                  {comparativa.map((row, i) => (
                    <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="p-5 text-sm text-zinc-300">{row.feature}</td>
                      <td className="p-5 text-center text-sm bg-sky-500/[0.04]">
                        {typeof row.saldea === 'boolean'
                          ? (row.saldea
                            ? <span className="text-sky-400 font-bold">âœ“</span>
                            : <span className="text-zinc-700">â€”</span>)
                          : <span className="font-semibold text-sky-300">{row.saldea}</span>}
                      </td>
                      <td className="p-5 text-center text-sm">
                        {typeof row.manual === 'boolean'
                          ? (row.manual ? <span className="text-sky-400">âœ“</span> : <span className="text-zinc-700">â€”</span>)
                          : <span className="text-zinc-500">{row.manual}</span>}
                      </td>
                      <td className="p-5 text-center text-sm">
                        {typeof row.otros === 'boolean'
                          ? (row.otros ? <span className="text-sky-400">âœ“</span> : <span className="text-zinc-700">â€”</span>)
                          : <span className="text-zinc-500">{row.otros}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal effect="fade-up">
            <p className="text-center text-xs text-zinc-600 mt-6">
              Los datos de &quot;Otros software&quot; son estimaciones medias del mercado de gestores de facturaciÃ³n con mÃ³dulo de recordatorios.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Precios â€” el componente cliente con toggle */}
      <Reveal effect="fade-up">
        <PricingSection />
      </Reveal>

      {/* FAQ */}
      <section className="py-28 border-y border-white/5 bg-black/20">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal effect="fade-up">
            <div className="text-center mb-14">
              <p className="text-sky-400 font-semibold text-xs mb-4 uppercase tracking-[0.2em]">Preguntas frecuentes</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Las dudas mÃ¡s comunes
              </h2>
            </div>
          </Reveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={i} effect="fade-up" delay={i * 50}>
                <details className="group bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-5">
                    <h3 className="font-semibold text-white text-base">{faq.p}</h3>
                    <span className="text-sky-400 text-xl group-open:rotate-45 transition-transform flex-shrink-0">+</span>
                  </summary>
                  <p className="px-5 pb-5 text-zinc-400 text-sm leading-relaxed">{faq.r}</p>
                </details>
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
                  Empieza a cobrar hoy
                </h2>
                <p className="text-zinc-300 mb-10 text-lg max-w-xl mx-auto">
                  1 mes gratis. Cancela en 1 clic antes y no pagas nada. Sin permanencia.
                </p>
                <Link
                  href="/registro?plan=mes"
                  className="inline-flex items-center gap-2 bg-white text-zinc-900 px-8 py-4 rounded-xl font-bold text-base hover:bg-zinc-100 transition-all hover:-translate-y-0.5 shadow-2xl shadow-sky-500/20"
                >
                  Empezar 1 mes gratis
                  <span>â†’</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="font-bold text-zinc-300">Saldea</span>
            <span>Â· Cobro automÃ¡tico con IA</span>
            <span className="text-zinc-700">Â·</span>
            <Link href="/" className="hover:text-zinc-300 transition-colors">Marsof</Link>
            <span className="text-zinc-700">Â·</span>
            <Link href="/blog/modelo-email-reclamacion-factura-impagada" className="hover:text-zinc-300 transition-colors">Blog</Link>
          </div>
          <div className="flex gap-5 flex-wrap justify-center">
            <Link href="/login" className="hover:text-zinc-300 transition-colors">Acceder</Link>
            <Link href="/registro?plan=mes" className="hover:text-zinc-300 transition-colors">Registrarse</Link>
            <Link href="/legal/terminos" className="hover:text-zinc-300 transition-colors">TÃ©rminos</Link>
            <Link href="/legal/privacidad" className="hover:text-zinc-300 transition-colors">Privacidad</Link>
            <Link href="/legal/cookies" className="hover:text-zinc-300 transition-colors">Cookies</Link>
          </div>
          <p>Â© {new Date().getFullYear()} Carlos GÃ¡lvez Carrillo. Hecho en EspaÃ±a.</p>
        </div>
      </footer>
    </div>
  )
}
