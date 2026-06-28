import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo cobrar a un cliente sin que se enfade (guía 2026) | Marsof',
  description: 'La técnica probada para reclamar facturas impagadas sin perder al cliente. 7 pasos psicológicos, plantillas y errores típicos. Mantén la relación comercial intacta.',
  alternates: { canonical: 'https://www.marsof.es/blog/como-cobrar-cliente-sin-enfadarlo' },
  keywords: [
    'cómo cobrar sin enfadar al cliente',
    'reclamar factura sin perder cliente',
    'cobrar moroso educadamente',
    'recordatorio amable factura',
    'comunicación con moroso',
    'recuperar cobro manteniendo relación',
  ],
  openGraph: {
    title: 'Cómo cobrar a un cliente sin que se enfade',
    description: 'La técnica probada que mantiene la relación comercial intacta.',
    type: 'article',
    locale: 'es_ES',
  },
}

const schemaArticulo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo cobrar a un cliente sin que se enfade',
  description: 'Método probado para reclamar facturas impagadas manteniendo la relación comercial intacta.',
  step: [
    { '@type': 'HowToStep', name: 'Empieza el día 1 con tono amable', text: 'Asume buena fe. Recordatorio cordial el día siguiente al vencimiento.' },
    { '@type': 'HowToStep', name: 'Da una salida fácil', text: 'Frase clave: "Si ya la pagaste, ignora este mensaje".' },
    { '@type': 'HowToStep', name: 'Pregunta abierta, no acusación', text: '¿Cuándo podrás procesarlo? en lugar de ¿Por qué no has pagado?' },
    { '@type': 'HowToStep', name: 'Cuantifica sin amenazar', text: 'Cita Ley 3/2004 e intereses como información, no como amenaza.' },
    { '@type': 'HowToStep', name: 'Llamada amistosa antes que email firme', text: 'Una llamada al día 15 humaniza la situación.' },
    { '@type': 'HowToStep', name: 'Acepta soluciones intermedias', text: 'Plan de pago, anticipo parcial, fraccionamiento.' },
    { '@type': 'HowToStep', name: 'Automatiza para evitar escaladas emocionales tuyas', text: 'Un sistema automatizado mantiene tono profesional cuando tú ya estás cansado.' },
  ],
}

export default function PageCobrarSinEnfadar() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticulo) }} />
      <article className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
          <header className="mb-10">
            <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Psicología del cobro · 8 min</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cómo cobrar a un cliente sin que se enfade</h1>
            <p className="text-zinc-400 text-lg leading-relaxed">Reclamar facturas impagadas es la conversación más incómoda del mundo de los negocios. Esta es la técnica probada para hacerlo sin perder al cliente.</p>
          </header>

          <section className="prose prose-invert max-w-none">
            <p className="text-zinc-300 leading-relaxed text-lg mb-6">El 70% de los autónomos prefiere perder dinero que tener una conversación incómoda con un cliente moroso. Y eso es un error caro. La buena noticia: <strong>se puede cobrar SIN que el cliente se enfade</strong> si usas el método correcto.</p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">El principio fundamental</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">La gente no se enfada porque le reclames un cobro. <strong>Se enfada por CÓMO se lo reclamas</strong>. Tono acusador, asunciones negativas y presión emocional son lo que rompe relaciones. Tono profesional, asumir buena fe y dar salidas fáciles las preservan.</p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Paso 1 — Día 1: el recordatorio que NO molesta</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">El día siguiente al vencimiento, manda un email cordial. Asume buena fe absoluta. El texto clave:</p>
            <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
              <p className="text-zinc-300 text-sm italic">"Hola [nombre], te recuerdo que la factura [X] venció ayer. <strong>Si ya la has pagado en los últimos días, perdona el toque y por favor ignora este mensaje.</strong> Si no, ¿cuándo podrías procesarla? Un saludo."</p>
            </div>
            <p className="text-zinc-300 leading-relaxed mb-4">Esa frase "si ya la pagaste, ignora" es psicológicamente clave. Le das al cliente:</p>
            <ul className="space-y-2 text-zinc-300 mb-6">
              <li>? Una salida sin sentirse acusado</li>
              <li>? Tu honestidad (asumes que pudiste no haber visto su pago)</li>
              <li>? El control de la conversación</li>
            </ul>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Paso 2 — Pregunta abierta, no acusación</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Compara estas dos preguntas:</p>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
              <p className="text-rose-400 text-sm mb-2">? "¿Por qué no has pagado todavía?"</p>
              <p className="text-emerald-400 text-sm">? "¿Cuándo podrás procesar el pago?"</p>
            </div>
            <p className="text-zinc-300 leading-relaxed mb-4">La primera pregunta es una acusación que pone al cliente a la defensiva. La segunda asume que va a pagar y solo pregunta cuándo. Cambia la conversación completamente.</p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Paso 3 — Día 7-14: cuantifica sin amenazar</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Si no ha respondido, sube el tono pero sin amenazar. Comparte la información como dato, no como ultimátum:</p>
            <div className="bg-zinc-900/40 border-l-4 border-amber-500 rounded-r-xl p-5 my-4">
              <p className="text-zinc-300 text-sm italic">"Hola [nombre], la factura [X] sigue pendiente. Te aviso por si no la has visto: según la Ley 3/2004 de morosidad, a partir de ahora se devengan intereses automáticos del 12,5% anual y una indemnización de 40€ por costes de cobro. Si me confirmas cuándo procesarás el pago, podemos cerrar esto sin necesidad de cuantificar nada."</p>
            </div>
            <p className="text-zinc-300 leading-relaxed mb-4">Has citado la ley. Has cuantificado lo que pierde. Pero has terminado con una oferta de salida limpia. El cliente entiende la seriedad sin sentirse atacado.</p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Paso 4 — Día 15-20: la llamada que humaniza</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Si dos emails no funcionan, no insistas con un tercero más agresivo. <strong>Llama por teléfono.</strong> La voz humana cambia todo.</p>
            <p className="text-zinc-300 leading-relaxed mb-4">Apunta el guion:</p>
            <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
              <li>"Hola [nombre], soy [tu nombre] de [empresa]. ¿Tienes 1 minuto?"</li>
              <li>"Te llamo por la factura [X] que sigue pendiente. ¿Va todo bien por tu lado?"</li>
              <li>(Si tiene problema): "Entiendo. ¿Cómo podemos resolverlo? ¿Te ayudaría dividirla en 2 pagos?"</li>
              <li>(Si dice que pagará): "Perfecto. ¿Te parece que cuento con el ingreso para el [fecha]?"</li>
            </ol>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Paso 5 — Acepta soluciones intermedias</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Si el cliente tiene problemas reales de liquidez, ofrécele alternativas:</p>
            <ul className="space-y-2 text-zinc-300 mb-6">
              <li>? <strong>Fraccionar la factura</strong> en 2-3 pagos</li>
              <li>? <strong>Plazo adicional pactado</strong> a cambio de fecha cerrada por escrito</li>
              <li>? <strong>Domiciliación SEPA</strong> para futuras facturas (le quita el "olvido" de la ecuación)</li>
              <li>? <strong>Anticipo parcial inmediato + resto en X días</strong></li>
            </ul>
            <p className="text-zinc-300 leading-relaxed mb-4">El cliente que prefiere negociar antes que cerrar la relación contigo es un cliente que SÍ va a pagar. Dale la opción.</p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Paso 6 — La trampa emocional que evitar</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">El error más común: <strong>esperar 3 meses, acumular frustración y luego mandar un email duro lleno de reproche.</strong></p>
            <p className="text-zinc-300 leading-relaxed mb-4">Eso garantiza que el cliente se enfade. Tu frustración acumulada se transmite en cada palabra y rompe la relación. La solución: empezar a reclamar el día 1, con tono cordial, antes de que tu emoción se acumule.</p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Paso 7 — Automatiza para no quemarte tú</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">El mejor truco para cobrar sin enfadarse: <strong>que NO seas tú quien escriba los emails de reclamación</strong>. Un sistema automatizado mantiene tono profesional incluso cuando tú ya estás cansado y harto. Y el cliente lo percibe como "negocio", no como "ataque personal".</p>
            <p className="text-zinc-300 leading-relaxed mb-4">Aquí es donde Saldea entra: la IA escribe cada email con el tono exacto que toca según los días de retraso. Tú no tienes que pensar, no tienes que escribir, no tienes que enfadarte. La IA lo hace por ti, profesionalmente.</p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Resumen visual</h2>
            <div className="overflow-x-auto my-5">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-sky-500/20">
                    <th className="py-3 px-4 text-left text-zinc-100">Día</th>
                    <th className="py-3 px-4 text-left text-zinc-100">Acción</th>
                    <th className="py-3 px-4 text-left text-zinc-100">Tono</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr className="border-b border-white/10"><td className="py-2 px-4">1</td><td className="py-2 px-4">Email recordatorio</td><td className="py-2 px-4">Amable + "si ya pagaste, ignora"</td></tr>
                  <tr className="border-b border-white/10"><td className="py-2 px-4">7-14</td><td className="py-2 px-4">Email firme</td><td className="py-2 px-4">Cita Ley 3/2004 sin amenazar</td></tr>
                  <tr className="border-b border-white/10"><td className="py-2 px-4">15-20</td><td className="py-2 px-4">Llamada telefónica</td><td className="py-2 px-4">Pregunta humana</td></tr>
                  <tr className="border-b border-white/10"><td className="py-2 px-4">30</td><td className="py-2 px-4">Negocia plan de pago</td><td className="py-2 px-4">Solución compartida</td></tr>
                  <tr><td className="py-2 px-4">60</td><td className="py-2 px-4">Burofax</td><td className="py-2 px-4">Formal y profesional</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Errores que enfadan al cliente</h2>
            <ul className="space-y-2 text-zinc-300 mb-6">
              <li>? Reclamar por WhatsApp informal: parece poco serio y agresivo a la vez</li>
              <li>? Mandar muchos emails seguidos en pocos días</li>
              <li>? Usar mayúsculas o signos de exclamación múltiples (!!!)</li>
              <li>? Mencionar a tus abogados antes de tiempo</li>
              <li>? Hacer pública la deuda en redes sociales</li>
              <li>? Llamar a horas inadecuadas (antes de las 9, después de las 19)</li>
              <li>? Dejar pasar 3 meses sin decir nada y luego explotar</li>
            </ul>
          </section>

          <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea hace exactamente esto, automáticamente</h3>
            <p className="text-zinc-300 mb-5">Cada email escalado con el tono correcto. Sin que tú tengas que escribirlos. Sin que te enfades. Sin perder al cliente. <strong>30 días gratis.</strong></p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
          </aside>
        </div>
      </article>
    </>
  )
}

