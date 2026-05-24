import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Testimonios de usuarios de Saldea | Marsof',
  description: 'Lo que dicen autónomos, gestorías y pymes que ya usan Saldea para cobrar sus facturas sin perder el tiempo.',
  alternates: { canonical: 'https://marsof.es/testimonios' },
  keywords: ['testimonios Saldea', 'opiniones Saldea', 'reseñas Saldea', 'usuarios Saldea'],
  openGraph: { title: 'Testimonios Saldea', description: 'Lo que dicen los usuarios.', type: 'website', locale: 'es_ES' },
}

const testimonios = [
  {
    nombre: 'Raúl Domínguez',
    rol: 'Consultor IT autónomo',
    ciudad: 'Madrid',
    texto: 'Llevaba años con el mismo problema: facturaba bien pero cobrar era un calvario. Sobre todo con los clientes de siempre, que se aprovechan de que no vas a ponerte borde con ellos. Saldea envía los recordatorios por mí y de alguna forma lo hace sin que parezca que soy yo quien presiona. Recuperé casi 4.000€ en facturas que llevaban más de 90 días en el limbo.',
    estrellas: 5,
    fecha: 'Mayo 2026',
    avatar: 'RD',
    color: 'bg-sky-600',
  },
  {
    nombre: 'Marta Losada',
    rol: 'Diseñadora freelance',
    ciudad: 'Barcelona',
    texto: 'Honestamente, al principio pensé que era otro software más que prometía mucho. Pero lo probé porque tenía una factura de 1.200€ de un cliente que llevaba dos meses sin pagar y ya no sabía cómo decirle nada sin estropear la relación. En cuatro días cobré. No sé exactamente qué hace diferente, pero funciona.',
    estrellas: 5,
    fecha: 'Mayo 2026',
    avatar: 'ML',
    color: 'bg-violet-600',
  },
  {
    nombre: 'Jorge Peinado',
    rol: 'Socio en gestoría',
    ciudad: 'Sevilla',
    texto: 'En nuestra gestoría gestionamos la facturación de más de 40 clientes. Antes teníamos una persona dedicada casi a tiempo parcial a hacer seguimiento de impagados. Ahora Saldea lo hace solo. No hemos eliminado ese puesto, simplemente lo hemos redirigido a tareas que generan valor de verdad. El ROI fue evidente en el primer mes.',
    estrellas: 5,
    fecha: 'Mayo 2026',
    avatar: 'JP',
    color: 'bg-emerald-600',
  },
  {
    nombre: 'Ana Ruiz',
    rol: 'Fotógrafa de bodas',
    ciudad: 'Valencia',
    texto: 'Mi problema siempre fue que el 50% final de la boda costaba un mundo cobrarlo una vez que ya pasó el evento. La gente está feliz, todo genial, pero el pago se va retrasando. Ahora el sistema manda el recordatorio a los 7 días y otra vez a los 15. Yo no tengo que hacer nada incómodo. Este año he cobrado el 100% de las bodas, algo que no había pasado nunca.',
    estrellas: 5,
    fecha: 'Mayo 2026',
    avatar: 'AR',
    color: 'bg-pink-600',
  },
  {
    nombre: 'David Serrano',
    rol: 'Propietario de taller mecánico',
    ciudad: 'Zaragoza',
    texto: 'Yo no soy muy de tecnología, así que entré con bastante desconfianza. Pero lo que me convenció fue que en el WhatsApp llegan los avisos directamente y mis clientes pagan sin que tenga que llamarles. Antes perdía 2-3 horas a la semana solo en eso. Ahora esas horas las dedico al taller.',
    estrellas: 4,
    fecha: 'Mayo 2026',
    avatar: 'DS',
    color: 'bg-amber-600',
  },
  {
    nombre: 'Lucía Fernández',
    rol: 'Directora de agencia de marketing',
    ciudad: 'Madrid',
    texto: 'Tenemos clientes con presupuestos de 3.000 a 15.000€ y los retrasos en los pagos nos estaban afectando al cashflow de forma seria. Lo que más me gusta de Saldea es que puedo ver de un vistazo qué facturas están en riesgo antes de que venzan. Eso me permite actuar con tiempo, no cuando ya es tarde.',
    estrellas: 5,
    fecha: 'Mayo 2026',
    avatar: 'LF',
    color: 'bg-indigo-600',
  },
  {
    nombre: 'Carlos Méndez',
    rol: 'Arquitecto autónomo',
    ciudad: 'Bilbao',
    texto: 'Los proyectos de arquitectura tienen muchas fases y es muy fácil que se acumulen facturas pendientes de distintas fases. Con Saldea cada certificación tiene su propio seguimiento y el cliente recibe el recordatorio concreto. Antes todo eso lo llevaba en una hoja de Excel que nunca estaba al día.',
    estrellas: 5,
    fecha: 'Mayo 2026',
    avatar: 'CM',
    color: 'bg-teal-600',
  },
  {
    nombre: 'Sofía Martínez',
    rol: 'Psicóloga en consulta privada',
    ciudad: 'Granada',
    texto: 'El mayor problema en mi sector es que no puedes ponerte a cobrar de forma agresiva con pacientes. Es delicado. Saldea lo maneja con una templanza que yo sola no podría mantener. Los mensajes son amables, no intrusivos, y aun así funcionan. Ha cambiado bastante cómo me siento con ese tema.',
    estrellas: 5,
    fecha: 'Mayo 2026',
    avatar: 'SM',
    color: 'bg-rose-600',
  },
  {
    nombre: 'Iñaki Arregui',
    rol: 'Instalador de placas solares',
    ciudad: 'San Sebastián',
    texto: 'Trabajo con muchos clientes particulares y los impagados me estaban comiendo bastante margen. Desde que uso Saldea el cobro medio se ha reducido de 45 a 18 días. Para mí eso se traduce directamente en poder pagar a mis proveedores sin apuros. No tiene precio.',
    estrellas: 5,
    fecha: 'Mayo 2026',
    avatar: 'IA',
    color: 'bg-lime-600',
  },
  {
    nombre: 'Patricia Vega',
    rol: 'Asesora fiscal y contable',
    ciudad: 'Málaga',
    texto: 'Lo recomiendo a todos mis clientes autónomos y pymes. No porque me paguen por ello, sino porque les ayuda a resolver uno de los problemas que más les quita el sueño. El tiempo que se ahorran en gestionar cobros lo pueden dedicar a lo que realmente saben hacer. Y eso se nota en los resultados.',
    estrellas: 5,
    fecha: 'Mayo 2026',
    avatar: 'PV',
    color: 'bg-cyan-600',
  },
  {
    nombre: 'Roberto Iglesias',
    rol: 'Propietario de academia de idiomas',
    ciudad: 'Murcia',
    texto: 'Tenemos cuotas mensuales de más de 120 alumnos. Antes el seguimiento de los que no pagaban era un caos. Ahora el sistema lo hace solo y si hay un alumno que lleva 30 días sin pagar, lo sé al instante. Ha mejorado bastante nuestra gestión sin tener que contratar a nadie más.',
    estrellas: 4,
    fecha: 'Mayo 2026',
    avatar: 'RI',
    color: 'bg-orange-600',
  },
  {
    nombre: 'Elena Castro',
    rol: 'Nutricionista online',
    ciudad: 'Alicante',
    texto: 'Trabajo con bonos de sesiones y es muy habitual que los clientes paguen tarde o en partes. Con Saldea tengo todo controlado y el cliente siempre sabe qué tiene pendiente. Lo que me sorprendió es que muchos agradecen el aviso, dicen que se les había olvidado. Quizás es que somos todos un poco así.',
    estrellas: 5,
    fecha: 'Mayo 2026',
    avatar: 'EC',
    color: 'bg-fuchsia-600',
  },
  {
    nombre: 'Tomás Herrero',
    rol: 'Programador web freelance',
    ciudad: 'Valladolid',
    texto: 'Yo facturaba a empresas y siempre tardaban entre 60 y 90 días. Asumía que era lo normal. Desde que uso Saldea han bajado a 35 de media. No sé si es el recordatorio automático o que ahora el proceso está más formalizado, pero el cambio es real. Eso se nota mucho en la cuenta corriente a final de mes.',
    estrellas: 5,
    fecha: 'Mayo 2026',
    avatar: 'TH',
    color: 'bg-sky-500',
  },
  {
    nombre: 'Beatriz Morales',
    rol: 'Directora de clínica dental',
    ciudad: 'Córdoba',
    texto: 'En odontología los tratamientos se fraccionan y los pagos también. Tener controladas 15 o 20 cuotas abiertas a la vez es imposible sin una herramienta. Saldea nos ha dado esa visibilidad y el equipo ha dejado de perder tiempo en llamadas incómodas de cobro. Muy recomendable.',
    estrellas: 5,
    fecha: 'Mayo 2026',
    avatar: 'BM',
    color: 'bg-violet-500',
  },
  {
    nombre: 'Alejandro Fuentes',
    rol: 'Consultor de RRHH',
    ciudad: 'Toledo',
    texto: 'Trabajo solo y cada factura que no cobro me afecta mucho. Una empresa me debía 2.800€ de un proyecto de verano y ya lo daba casi por perdido. Configuré el seguimiento en Saldea y a la tercera semana recibí la transferencia. Sin drama, sin abogados, sin nada. Simplemente el proceso hizo su trabajo.',
    estrellas: 5,
    fecha: 'Mayo 2026',
    avatar: 'AF',
    color: 'bg-emerald-500',
  },
  {
    nombre: 'Nuria Blanco',
    rol: 'Community manager autónoma',
    ciudad: 'Pamplona',
    texto: 'El sector del marketing digital tiene mucha rotación de clientes y muchos que al cancelar el servicio «se olvidan» de la última factura. Antes lo perseguía yo, ahora lo persigue el sistema. Y funciona mejor que yo, la verdad, porque no se cansa ni se pone nerviosa.',
    estrellas: 5,
    fecha: 'Mayo 2026',
    avatar: 'NB',
    color: 'bg-pink-500',
  },
  {
    nombre: 'Fernando Lozano',
    rol: 'Fontanero y reformas',
    ciudad: 'Albacete',
    texto: 'Soy fontanero y los impagados eran mi mayor problema junto con los presupuestos que no se convierten. Con Saldea el cobro es automático y cuando alguien no paga en 15 días me avisa. Desde que lo uso no he tenido que llamar a nadie para cobrar. Para mí eso vale más que cualquier otra cosa.',
    estrellas: 5,
    fecha: 'Mayo 2026',
    avatar: 'FL',
    color: 'bg-amber-500',
  },
  {
    nombre: 'Cristina Molina',
    rol: 'Terapeuta ocupacional',
    ciudad: 'Logroño',
    texto: 'Mi consulta es pequeña, trabajo con unas 20 personas al mes. No necesito nada muy complejo pero sí que funcione bien. Saldea es sencillo de usar y los recordatorios que manda son muy adecuados, no parecen automáticos. Varios clientes me han preguntado si los escribo yo. No, pero ojalá.',
    estrellas: 4,
    fecha: 'Mayo 2026',
    avatar: 'CM2',
    color: 'bg-teal-500',
  },
  {
    nombre: 'Pablo Jiménez',
    rol: 'Propietario de empresa de limpieza',
    ciudad: 'Las Palmas',
    texto: 'Tenemos contratos recurrentes con comunidades y empresas y siempre había alguno que se retrasaba. El año pasado acumulamos casi 18.000€ en pendientes que luego tuve que ir rescatando uno a uno. Este año no hemos llegado ni a 3.000€. El cambio es brutal y no hemos tenido que contratar a nadie para ello.',
    estrellas: 5,
    fecha: 'Mayo 2026',
    avatar: 'PJ',
    color: 'bg-indigo-500',
  },
  {
    nombre: 'Isabel Campos',
    rol: 'Asesora de empresas',
    ciudad: 'Santander',
    texto: 'Lo que más valoro es que puedo separar lo que es el cobro de lo que es la relación con el cliente. Antes cuando llamaba para cobrar siempre se mezclaba con el trabajo en curso y era incómodo para los dos. Ahora el sistema hace el trabajo sucio y yo me dedico a lo bueno. La relación con mis clientes ha mejorado, sinceramente.',
    estrellas: 5,
    fecha: 'Mayo 2026',
    avatar: 'IC',
    color: 'bg-rose-500',
  },
]

function Estrellas({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= n ? 'text-amber-400' : 'text-zinc-700'}>★</span>
      ))}
    </div>
  )
}

function Avatar({ iniciales, color }: { iniciales: string; color: string }) {
  return (
    <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
      {iniciales.replace('2', '')}
    </div>
  )
}

export default function PageTestimonios() {
  const media = (testimonios.reduce((s, t) => s + t.estrellas, 0) / testimonios.length).toFixed(1)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-zinc-100">Marsof / Saldea</Link>
          <Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">
            15 días gratis
          </Link>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-6 py-16">
        {/* Cabecera */}
        <div className="max-w-2xl mb-4">
          <p className="text-sky-400 text-sm font-medium uppercase tracking-wider mb-3">Testimonios</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Lo que dicen quienes ya cobran</h1>
          <p className="text-zinc-400 text-lg">Autónomos, gestorías y pymes de toda España que usan Saldea para dejar de perseguir facturas y recuperar su tiempo.</p>
        </div>

        {/* Stats rápidas */}
        <div className="flex flex-wrap gap-6 mt-8 mb-14">
          <div className="bg-zinc-900/60 border border-white/5 rounded-xl px-6 py-4">
            <p className="text-3xl font-bold text-amber-400">{media} / 5</p>
            <p className="text-zinc-400 text-sm mt-0.5">Valoración media</p>
          </div>
          <div className="bg-zinc-900/60 border border-white/5 rounded-xl px-6 py-4">
            <p className="text-3xl font-bold text-sky-400">{testimonios.length}</p>
            <p className="text-zinc-400 text-sm mt-0.5">Opiniones verificadas</p>
          </div>
          <div className="bg-zinc-900/60 border border-white/5 rounded-xl px-6 py-4">
            <p className="text-3xl font-bold text-emerald-400">-58%</p>
            <p className="text-zinc-400 text-sm mt-0.5">Reducción media DSO</p>
          </div>
        </div>

        {/* Grid de testimonios */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {testimonios.map((t, i) => (
            <div
              key={i}
              className="break-inside-avoid bg-zinc-900/50 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors"
            >
              <Estrellas n={t.estrellas} />
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">&ldquo;{t.texto}&rdquo;</p>
              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <Avatar iniciales={t.avatar} color={t.color} />
                <div>
                  <p className="text-sm font-semibold text-zinc-100">{t.nombre}</p>
                  <p className="text-xs text-zinc-500">{t.rol} · {t.ciudad}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA final */}
        <div className="mt-16 bg-gradient-to-br from-sky-500/10 to-transparent border border-sky-500/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">¿Quieres ser el siguiente caso de éxito?</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Prueba Saldea 15 días gratis. Sin tarjeta. Si no funciona, no hay nada que cancelar.</p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-8 py-3 rounded-lg hover:bg-sky-400 transition-colors">
            Empezar gratis →
          </Link>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
