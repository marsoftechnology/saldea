import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { PricingSection } from './PricingSection'
import { Reveal } from './Reveal'
import { Counter } from './Counter'

// Marco "browser window" reutilizable para envolver screenshots del producto
function BrowserFrame({ src, alt, url, priority = false }: { src: string; alt: string; url: string; priority?: boolean }) {
  return (
    <div className="relative rounded-xl md:rounded-2xl p-[1.5px]" style={{background:'linear-gradient(135deg,rgba(6,182,212,0.9) 0%,rgba(99,102,241,0.6) 40%,rgba(168,85,247,0.5) 70%,rgba(6,182,212,0.4) 100%)', boxShadow:'0 0 40px rgba(6,182,212,0.4), 0 0 80px rgba(6,182,212,0.12), 0 0 0 1px rgba(6,182,212,0.08), 0 24px 60px rgba(0,0,0,0.6)'}}>
      {/* Glow ambient detrás */}
      <div className="absolute -inset-4 rounded-2xl -z-10" style={{background:'radial-gradient(ellipse at 50% 60%, rgba(6,182,212,0.18) 0%, rgba(99,102,241,0.10) 50%, transparent 80%)', filter:'blur(20px)'}} />
      <div className="rounded-xl md:rounded-2xl bg-zinc-950 overflow-hidden">
        {/* Barra superior tipo navegador */}
        <div className="flex items-center gap-2 px-4 py-3 border-b" style={{background:'rgba(3,3,15,0.95)', borderColor:'rgba(6,182,212,0.15)'}}>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full" style={{background:'rgba(6,182,212,0.7)', boxShadow:'0 0 6px rgba(6,182,212,0.8)'}} />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="text-zinc-500 text-xs px-3 py-1 rounded-md font-mono border" style={{background:'rgba(6,182,212,0.04)', borderColor:'rgba(6,182,212,0.12)'}}>
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
          style={{filter:'brightness(1.04) saturate(1.1)'}}
        />
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Saldea — Software de cobros con IA para autónomos y pymes',
  description: 'Automatiza el cobro de tus facturas impagadas con IA. Recordatorios por email que escalan en tono, detección de respuestas, conciliación bancaria automática y Stripe Connect. 49€/mes · 30 días gratis.',
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
    title: 'Saldea — Software de cobros con IA',
    description: 'IA que persigue tus facturas impagadas 24/7. 30 días gratis.',
  },
}

const pasos = [
  {
    num: '01',
    titulo: 'Añade tus facturas',
    desc: 'Crea facturas una a una o importa cientos de golpe desde CSV. La configuración inicial tarda menos de 5 minutos.',
  },
  {
    num: '02',
    titulo: 'Saldea actúa sola',
    desc: 'La IA genera y envía recordatorios automáticos que escalan el tono según los días de retraso. De cordial a último aviso legal.',
  },
  {
    num: '03',
    titulo: 'Cobras antes',
    desc: 'Tus clientes confirman el pago con un clic. Si responden por email, Saldea detecta si pagaron, discuten o están de vacaciones y pausa los recordatorios automáticamente.',
  },
]

const comparativa = [
  { feature: 'Recordatorios automáticos', saldea: true, manual: false, otros: 'Manual' },
  { feature: 'Escalado de tono con IA', saldea: true, manual: false, otros: false },
  { feature: 'Detecta respuestas del cliente', saldea: true, manual: false, otros: false },
  { feature: 'Pausa automática si paga / disputa', saldea: true, manual: false, otros: false },
  { feature: 'Portal de pago con tarjeta', saldea: true, manual: false, otros: false },
  { feature: 'Integración Holded / Quipu / Anfix', saldea: true, manual: false, otros: false },
  { feature: 'Recordatorios por WhatsApp (próximamente)', saldea: true, manual: false, otros: false },
  { feature: 'Burofax digital en 1 clic', saldea: true, manual: false, otros: false },
  { feature: 'Plantillas en 4 idiomas', saldea: true, manual: false, otros: 'A veces' },
  { feature: 'PDF de factura adjunto', saldea: true, manual: false, otros: true },
  { feature: 'Emails con tu logo, firma y empresa', saldea: true, manual: 'Si te acuerdas', otros: 'A veces' },
  { feature: 'Conciliación bancaria automática', saldea: true, manual: false, otros: false },
  { feature: 'Notificaciones push en tiempo real', saldea: true, manual: false, otros: false },
  { feature: 'API REST pública con claves de API', saldea: true, manual: false, otros: false },
  { feature: 'Tiempo dedicado a perseguir cobros', saldea: '0h/mes', manual: '5-10h/mes por moroso', otros: '2-4h/mes' },
  { feature: 'Coste', saldea: '49€/mes o 499€/año', manual: '0€ (tu tiempo)', otros: '100-1.000€/mes' },
]

const faqs = [
  { p: '¿Necesito saber de tecnología?', r: 'No. Si sabes usar el correo electrónico, sabes usar Saldea. La configuración inicial tarda menos de 10 minutos.' },
  { p: '¿Mis clientes sabrán que es automático?', r: 'No notarán nada. Los emails llevan el nombre de tu empresa como remitente, tu logo y tu firma. La IA escribe en español natural, no parece un bot.' },
  { p: '¿Qué pasa si un cliente responde al email?', r: 'Saldea lo detecta automáticamente (plan Pro). Si dice "ya pagué" pausa los recordatorios y te avisa. Si discute, pausa 30 días y te alerta. Si está de vacaciones, extrae la fecha de vuelta y reanuda entonces.' },
  { p: '¿Cuándo se me cobra y cómo cancelo?', r: 'En el plan mensual: los primeros 30 días desde tu registro son gratis y sin cobro. Si no cancelas antes de que pasen esos 30 días, se carga el primer pago de 49€. En el plan anual: el cobro de 499€ se realiza al firmar (no hay trial porque asumimos que ya conoces el producto). En ambos puedes cancelar en 1 clic desde tu panel, sin llamadas ni permanencia.' },
  { p: '¿Por qué el anual no tiene 30 días gratis?', r: 'El trial de 30 días está pensado para que pruebes Saldea sin riesgo antes de comprometerte. Si eliges el anual, asumimos que ya has probado el mensual o sabes lo que quieres. A cambio te llevas un descuento equivalente a casi 2 meses gratis (ahorras 89€ al año).' },
  { p: '¿Necesito poner tarjeta para empezar?', r: 'Sí. En el mensual la tarjeta activa la prueba de 30 días pero NO se carga hasta que pasen esos 30 días desde tu registro. En el anual la tarjeta se cobra al instante (499€).' },
  { p: '¿Mensual o anual: cuál me conviene?', r: 'Si todavía estás validando si Saldea encaja contigo, empieza con el mensual (30 días gratis, sales cuando quieras). Si ya lo conoces o tienes claro que vas a usarlo más de 10 meses al año, el anual te ahorra 89€ (~15%).' },
  { p: '¿Puedo importar mis facturas actuales?', r: 'Sí. Importa tus facturas desde un CSV en segundos. La plantilla está disponible en el panel.' },
  { p: '¿Qué pasa con la privacidad de mis clientes?', r: 'Saldea cumple RGPD. Los datos están en servidores europeos (Supabase, Vercel) cifrados. Ningún dato se vende ni se usa para entrenar modelos de IA.' },
  { p: '¿Hay integración con mi software de facturación?', r: 'Sí. Ya disponibles: Holded, Quipu y Anfix. Conectas en 1 clic y Saldea importa tus facturas vencidas automáticamente. Para otros programas puedes importar exportando a CSV desde tu software.' },
  { p: '¿Qué es la conciliación bancaria automática?', r: 'Conectas tu cuenta bancaria mediante Open Banking (compatible con más de 2.000 bancos europeos, sin compartir usuario ni contraseña) y Saldea detecta automáticamente cuando entra un pago de uno de tus clientes. Marca la factura como cobrada y pausa los recordatorios al instante. Disponible en el plan Max.' },
  { p: '¿Tiene Saldea API para integrarlo con otros sistemas?', r: 'Sí. El plan Pro incluye acceso a la API REST pública con claves de API desde tu panel. Puedes listar, crear y actualizar facturas y clientes desde cualquier sistema externo o automatización (Zapier, Make, etc.).' },
]

export default function SaldeaPage() {
  return (
    <div className="min-h-screen bg-transparent text-zinc-100 antialiased overflow-x-hidden" style={{backgroundImage:'radial-gradient(rgba(6,182,212,0.045) 1px, transparent 1px)', backgroundSize:'36px 36px'}}>

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
              Cómo funciona
            </a>
            <a href="#precios" className="hidden md:block text-sm text-zinc-400 hover:text-zinc-200 font-medium px-3 py-2 transition-colors">
              Precios
            </a>
            <Link href="/testimonios" className="hidden md:block text-sm text-zinc-400 hover:text-zinc-200 font-medium px-3 py-2 transition-colors">
              Testimonios
            </Link>
<Link href="/login" className="text-sm text-zinc-400 hover:text-zinc-200 font-medium px-3 py-2 transition-colors">
              Acceder
            </Link>
            <Link
              href="/registro"
              className="bg-white text-zinc-900 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              30 días gratis →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center overflow-hidden">
        {/* Orbs atmosféricos */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none -z-10" style={{background:'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)', filter:'blur(40px)'}} />
        <div className="absolute -top-20 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none -z-10" style={{background:'radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)', filter:'blur(40px)'}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none -z-10" style={{background:'radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 65%)', filter:'blur(60px)'}} />
        <Reveal effect="fade-up">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 px-4 py-2 rounded-full text-xs font-semibold mb-7 backdrop-blur-sm" style={{boxShadow:'0 0 24px rgba(34,211,238,0.15)'}}>
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{boxShadow:'0 0 8px rgba(34,211,238,0.8)'}} />
            30 días gratis · cancela en 1 clic
          </div>
        </Reveal>

        <Reveal effect="fade-up" delay={80}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.0] tracking-tight mb-6 max-w-4xl mx-auto" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Cobra tus facturas<br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent" style={{filter:'drop-shadow(0 0 40px rgba(99,102,241,0.4))'}}>
              sin perseguir
            </span>{' '}
            a nadie.
          </h1>
        </Reveal>

        <Reveal effect="fade-up" delay={160}>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Saldea es una IA que escribe y manda los recordatorios por ti.
            Escala el tono con los días, entiende las respuestas de tus clientes
            y pausa cuando se confirma el pago.
          </p>
        </Reveal>

        <Reveal effect="fade-up" delay={240}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <Link
              href="/registro?plan=mes"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-7 py-4 rounded-xl font-bold text-base hover:from-cyan-400 hover:to-blue-500 transition-all w-full sm:w-auto justify-center hover:-translate-y-0.5"
              style={{boxShadow:'0 0 30px rgba(6,182,212,0.4), 0 4px 20px rgba(6,182,212,0.3)'}}
            >
              Empezar 30 días gratis
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <a
              href="#funciona"
              className="inline-flex items-center gap-2 text-zinc-300 hover:text-white font-medium px-2 py-4 transition-colors"
            >
              Ver cómo funciona
            </a>
          </div>
          <p className="text-zinc-500 text-sm">
            Sin permanencia · cancela antes de 30 días y no pagas nada
          </p>
        </Reveal>

        {/* Screenshot real del dashboard en un browser-frame */}
        <Reveal effect="fade-up" delay={400}>
          <div className="relative mt-16 max-w-5xl mx-auto">
            {/* Glow neon detrás de la imagen */}
            <div className="absolute -inset-6 -z-10 rounded-3xl" style={{background:'radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.25) 0%, rgba(99,102,241,0.12) 50%, transparent 80%)', filter:'blur(30px)'}} />
            <BrowserFrame
              src="/images/saldea/dashboard.png"
              alt="Panel de control de Saldea con stats de facturas por cobrar, cobradas, tasa de cobro y recordatorios enviados"
              url="marsof.es/dashboard"
              priority
            />

            {/* Mini notif flotante "respuesta detectada" */}
            <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-zinc-900/80 backdrop-blur-md border border-cyan-500/25 rounded-xl p-3 shadow-2xl shadow-black/50 max-w-[260px] hidden md:block" style={{boxShadow:'0 0 20px rgba(6,182,212,0.1), 0 8px 32px rgba(0,0,0,0.5)'}}>
              <div className="flex items-start gap-2.5">
                <span className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 font-bold">✓</span>
                <div className="text-left">
                  <p className="text-sm font-semibold text-zinc-100">Pedro respondió</p>
                  <p className="text-xs text-zinc-500 mt-0.5">&quot;Ya te he transferido&quot; · Pausado 7 días</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Stats con counter */}
      <section className="border-y border-cyan-500/10 bg-black/30 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: 10, label: 'ahorradas por cada moroso', suffix: 'h' },
              { num: 4, label: 'tonos: amigable · firme · formal · extremo', suffix: '' },
              { num: 4, label: 'idiomas: ES · CA · EN · PT', suffix: '' },
              { num: 5, label: 'min. para empezar', prefix: '<', suffix: '' },
            ].map((s, i) => (
              <Reveal key={i} effect="fade-up" delay={i * 80}>
                <p className="text-4xl md:text-5xl font-bold text-cyan-300 tracking-tight" style={{textShadow:'0 0 30px rgba(34,211,238,0.5)'}}>
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
              Perseguir cobros es lo peor de ser autónomo
            </h2>
            <div className="space-y-4 text-zinc-400 text-base">
              {[
                'Mandas un email y no contestan porque es incómodo pedir dinero',
                'Las facturas pendientes se acumulan y los clientes aprovechan tu dejadez',
                'No tienes tiempo para hacer seguimiento de cada factura cada semana',
                'Llevas meses esperando pagos que ya dabas por perdidos',
              ].map((t, i) => (
                <Reveal key={i} effect="fade-up" delay={i * 80}>
                  <p className="flex items-start gap-3">
                    <span className="text-rose-400/60 mt-1 text-lg leading-none">✕</span>
                    <span>{t}</span>
                  </p>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal effect="slide-right">
            <div className="relative rounded-3xl p-8 md:p-10" style={{background:'linear-gradient(135deg,rgba(6,182,212,0.09) 0%,rgba(99,102,241,0.06) 60%,transparent 100%)', border:'1px solid rgba(6,182,212,0.3)', boxShadow:'0 0 40px rgba(6,182,212,0.1), 0 0 80px rgba(6,182,212,0.04), inset 0 1px 0 rgba(6,182,212,0.15)'}}>
              <p className="text-sky-400 font-semibold text-xs mb-4 uppercase tracking-[0.2em]">La solución</p>
              <h3 className="text-2xl font-bold text-white mb-6 leading-tight">
                Saldea lo hace por ti, con el tono exacto
              </h3>
              <div className="space-y-4 text-zinc-300">
                {[
                  'Recordatorio cordial a los pocos días del vencimiento',
                  'Tono más firme si no hay respuesta',
                  'Último aviso legal antes de juzgado (si lo necesitas)',
                  'Cada email lleva la factura adjunta en PDF',
                  'Si el cliente responde, Saldea lo entiende y actúa',
                ].map((t, i) => (
                  <Reveal key={i} effect="fade-up" delay={i * 80}>
                    <p className="flex items-start gap-3">
                      <span className="text-sky-400 mt-1 font-bold text-base leading-none">✓</span>
                      <span>{t}</span>
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cómo funciona — narrativo con screenshots alternados */}
      <section id="funciona" className="py-28 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal effect="fade-up">
            <div className="text-center mb-24">
              <p className="text-sky-400 font-semibold text-xs mb-4 uppercase tracking-[0.2em]">Cómo funciona</p>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                Configúralo una vez,<br />cobra para siempre
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
                <li className="flex items-start gap-3"><span className="text-sky-400 font-bold mt-0.5">✓</span> Crea facturas una a una desde el panel</li>
                <li className="flex items-start gap-3"><span className="text-sky-400 font-bold mt-0.5">✓</span> Importa CSV con cientos de facturas de golpe</li>
                <li className="flex items-start gap-3"><span className="text-sky-400 font-bold mt-0.5">✓</span> Sincroniza automáticamente con Holded, Quipu o Anfix</li>
              </ul>
            </Reveal>
            <Reveal effect="slide-right" delay={150}>
              <BrowserFrame
                src="/images/saldea/importar.png"
                alt="Pantalla de importación CSV de Saldea mostrando el formato esperado con columnas nombre, email, factura, importe, vencimiento"
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
                <li className="flex items-start gap-3"><span className="text-sky-400 font-bold mt-0.5">✓</span> 4 tonos: amigable · firme · formal · extremo</li>
                <li className="flex items-start gap-3"><span className="text-sky-400 font-bold mt-0.5">✓</span> Frecuencia personalizable (cada cuántos días)</li>
                <li className="flex items-start gap-3"><span className="text-sky-400 font-bold mt-0.5">✓</span> Tu logo, firma y dominio en cada email</li>
              </ul>
            </Reveal>
            <Reveal effect="slide-right" delay={150} className="lg:order-1">
              <BrowserFrame
                src="/images/saldea/ajustes.png"
                alt="Panel de Ajustes de Saldea con secciones para Plan y suscripción, Mi perfil, Frecuencia de recordatorios, Tono y mensajes, e Imagen de marca"
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
                <li className="flex items-start gap-3"><span className="text-sky-400 font-bold mt-0.5">✓</span> Estado de cada factura en tiempo real</li>
                <li className="flex items-start gap-3"><span className="text-sky-400 font-bold mt-0.5">✓</span> Tasa de cobro y total pendiente al día</li>
                <li className="flex items-start gap-3"><span className="text-sky-400 font-bold mt-0.5">✓</span> Portal de pago: tu cliente paga con tarjeta en 1 clic desde el email</li>
                <li className="flex items-start gap-3"><span className="text-sky-400 font-bold mt-0.5">✓</span> Saldea pausa los recordatorios automáticamente cuando detecta pago</li>
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
              Pensado por y para autónomos españoles
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          <Reveal effect="fade-up" className="md:col-span-2">
            <div className="relative rounded-2xl p-8 h-full transition-all duration-300 hover:-translate-y-1" style={{background:'linear-gradient(135deg,rgba(6,182,212,0.07) 0%,rgba(99,102,241,0.04) 100%)', border:'1px solid rgba(6,182,212,0.25)', boxShadow:'0 0 30px rgba(6,182,212,0.08), inset 0 1px 0 rgba(6,182,212,0.1)'}}>
              <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" style={{boxShadow:'0 0 6px rgba(6,182,212,0.8)'}} />
                IA Premium
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">4 tonos que escalan solos</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                De amigable el día 3 a extremo el día 45. La IA elige el tono según los días de retraso y reescribe cada mensaje para que no parezca un bot. Tú no haces nada.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Amigable', 'Firme', 'Formal', 'Extremo'].map((t, i) => (
                  <span
                    key={t}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full border ${
                      i === 0
                        ? 'bg-sky-500/10 text-sky-300 border-sky-500/30'
                        : i === 3
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
            <div className="rounded-2xl p-8 h-full transition-all duration-300 hover:-translate-y-1" style={{background:'rgba(6,6,20,0.8)', border:'1px solid rgba(255,255,255,0.08)', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.05)'}}>
              <div className="text-3xl mb-4">📬</div>
              <h3 className="text-lg font-bold text-white mb-2">Detecta respuestas</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Si el cliente dice &ldquo;ya pagué&rdquo;, &ldquo;estoy de vacaciones&rdquo; o discute, Saldea lo entiende y pausa los recordatorios.
              </p>
            </div>
          </Reveal>

          {/* Integraciones — fila ancha */}
          <Reveal effect="fade-up" className="md:col-span-2">
            <div className="bg-gradient-to-br from-sky-500/5 via-transparent to-sky-500/5 border border-white/10 rounded-2xl p-8 h-full hover:border-sky-500/30 transition-colors">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                Integraciones nativas
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Sincroniza tus facturas automáticamente</h3>
              <p className="text-zinc-400 leading-relaxed mb-5">
                Conecta tu software de facturación en 1 clic. Saldea importa las facturas vencidas y empieza a cobrarlas sin que hagas nada más.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Holded', 'Quipu', 'Anfix', 'CSV manual'].map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-zinc-800/80 border border-white/10 text-zinc-300 px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />{s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Portal de pago */}
          <Reveal effect="fade-up" delay={100}>
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8 h-full hover:border-sky-500/30 transition-colors">
              <div className="text-3xl mb-4">💳</div>
              <h3 className="text-lg font-bold text-white mb-2">Portal de pago</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Cada email incluye un enlace de pago. Tu cliente hace clic y paga con tarjeta en 30 segundos, sin login ni trámites.
              </p>
            </div>
          </Reveal>

          <Reveal effect="fade-up">
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8 h-full hover:border-sky-500/30 transition-colors">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-lg font-bold text-white mb-2">4 idiomas</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Español, catalán, inglés y portugués. La IA escribe en el idioma de cada cliente sin que tengas que indicárselo.
              </p>
            </div>
          </Reveal>

          <Reveal effect="fade-up" delay={100}>
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8 h-full hover:border-sky-500/30 transition-colors">
              <div className="text-3xl mb-4">📎</div>
              <h3 className="text-lg font-bold text-white mb-2">PDF + tu marca</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Cada email lleva el PDF de la factura adjunto, tu logo, tu firma y sale a nombre de tu empresa. No parece automático.
              </p>
            </div>
          </Reveal>

          <Reveal effect="fade-up" delay={200}>
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8 h-full hover:border-sky-500/30 transition-colors">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-lg font-bold text-white mb-2">WhatsApp <span className="text-xs font-semibold text-amber-400 border border-amber-400/30 bg-amber-500/10 px-2 py-0.5 rounded-full ml-1">Próximamente</span></h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Envía recordatorios por WhatsApp además del email. Llega por el canal donde tu cliente sí lee.
              </p>
            </div>
          </Reveal>

          {/* Burofax + Importación masiva */}
          <Reveal effect="fade-up" delay={100} className="md:col-span-2">
            <div className="grid sm:grid-cols-2 gap-5 h-full">
              <div className="bg-zinc-900/40 border border-amber-500/20 rounded-2xl p-8 hover:border-amber-500/40 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">📮</span>
                  <span className="text-[10px] font-bold uppercase tracking-wide bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">Plan Max</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Burofax digital</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Último recurso antes del juzgado. Burofax certificado a 6€/unidad, sin límite mensual. Envíalo en 1 clic, sin ir a correos.
                </p>
              </div>
              <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8 hover:border-sky-500/30 transition-colors">
                <div className="text-3xl mb-4">⚖️</div>
                <h3 className="text-lg font-bold text-white mb-2">Recargo + descuento</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Configura recargo de mora a partir del día X y descuento por pronto pago. Saldea los aplica automáticamente.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal effect="fade-up" delay={200} className="md:col-span-1">
            <div className="bg-gradient-to-br from-sky-500/5 via-transparent to-sky-500/5 border border-white/10 rounded-2xl p-8 h-full hover:border-sky-500/30 transition-colors">
              <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-4">
                Importación masiva
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Sube facturas en segundos</h3>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Exporta a CSV desde cualquier programa y súbelo de golpe.
              </p>
              <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-xs text-zinc-400 overflow-x-auto">
                <div>nombre,email,factura,importe,vencimiento</div>
                <div className="text-sky-300">Pedro García,pedro@...,F-014,1250.00,2026-04-30</div>
                <div className="text-sky-300">María López,maria@...,F-015,800.00,2026-05-12</div>
                <div className="text-zinc-600">...</div>
              </div>
            </div>
          </Reveal>

          {/* Conciliación bancaria — fila nueva */}
          <Reveal effect="fade-up" className="md:col-span-2">
            <div className="bg-gradient-to-br from-emerald-500/10 via-transparent to-sky-500/5 border border-emerald-500/20 rounded-2xl p-8 h-full hover:border-emerald-500/30 transition-colors">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Open Banking · Ya disponible
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Conciliación bancaria automática</h3>
              <p className="text-zinc-400 leading-relaxed mb-5">
                Conecta tu banco y Saldea detecta el ingreso automáticamente. Marca la factura como cobrada y pausa los recordatorios sin que toques nada. Compatible con más de 2.000 bancos europeos vía Open Banking.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Más de 2.000 bancos', 'Detección automática', 'Sin reconciliación manual', 'Plan Max'].map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-900/30 border border-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />{s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal effect="fade-up" delay={100}>
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8 h-full hover:border-sky-500/30 transition-colors">
              <div className="text-3xl mb-4">🔔</div>
              <h3 className="text-lg font-bold text-white mb-2">Notificaciones push</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Recibe una notificación en tu móvil o PC en el momento en que un cliente paga o responde. Sin abrir la app.
              </p>
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
                    <th className="text-left p-5 text-xs font-semibold text-zinc-500 uppercase tracking-wide">Característica</th>
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
                            ? <span className="text-sky-400 font-bold">✓</span>
                            : <span className="text-zinc-700">—</span>)
                          : <span className="font-semibold text-sky-300">{row.saldea}</span>}
                      </td>
                      <td className="p-5 text-center text-sm">
                        {typeof row.manual === 'boolean'
                          ? (row.manual ? <span className="text-sky-400">✓</span> : <span className="text-zinc-700">—</span>)
                          : <span className="text-zinc-500">{row.manual}</span>}
                      </td>
                      <td className="p-5 text-center text-sm">
                        {typeof row.otros === 'boolean'
                          ? (row.otros ? <span className="text-sky-400">✓</span> : <span className="text-zinc-700">—</span>)
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
              Los datos de &quot;Otros software&quot; son estimaciones medias del mercado de gestores de facturación con módulo de recordatorios.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Precios — el componente cliente con toggle */}
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
                Las dudas más comunes
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
                  30 días gratis. Cancela en 1 clic antes y no pagas nada. Sin permanencia.
                </p>
                <Link
                  href="/registro?plan=mes"
                  className="inline-flex items-center gap-2 bg-white text-zinc-900 px-8 py-4 rounded-xl font-bold text-base hover:bg-zinc-100 transition-all hover:-translate-y-0.5 shadow-2xl shadow-sky-500/20"
                >
                  Empezar 30 días gratis
                  <span>→</span>
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
            <span>· Cobro automático con IA</span>
            <span className="text-zinc-700">·</span>
            <Link href="/" className="hover:text-zinc-300 transition-colors">Marsof</Link>
            <span className="text-zinc-700">·</span>
            <Link href="/blog/modelo-email-reclamacion-factura-impagada" className="hover:text-zinc-300 transition-colors">Blog</Link>
          </div>
          <div className="flex gap-5 flex-wrap justify-center">
            <Link href="/login" className="hover:text-zinc-300 transition-colors">Acceder</Link>
            <Link href="/registro?plan=mes" className="hover:text-zinc-300 transition-colors">Registrarse</Link>
            <Link href="/legal/terminos" className="hover:text-zinc-300 transition-colors">Términos</Link>
            <Link href="/legal/privacidad" className="hover:text-zinc-300 transition-colors">Privacidad</Link>
            <Link href="/legal/cookies" className="hover:text-zinc-300 transition-colors">Cookies</Link>
          </div>
          <p>© {new Date().getFullYear()} Carlos Gálvez Carrillo. Hecho en España.</p>
        </div>
      </footer>
    </div>
  )
}
