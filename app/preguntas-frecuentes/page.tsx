import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Preguntas frecuentes sobre cobros, morosos y Saldea | Saldea',
  description: '40+ respuestas a las dudas más frecuentes sobre cobrar facturas impagadas, intereses de demora, burofax, monitorio y cómo funciona Saldea.',
  alternates: { canonical: 'https://www.marsof.es/preguntas-frecuentes' },
  keywords: [
    'preguntas frecuentes cobros',
    'dudas factura impagada',
    'faq morosos',
    'preguntas sobre saldea',
    'como reclamar deuda dudas',
  ],
  openGraph: {
    title: 'Preguntas frecuentes sobre cobros y morosos en España',
    description: '40+ respuestas claras.',
    type: 'article',
    locale: 'es_ES',
  },
}

const categorias = [
  {
    titulo: 'Reclamaciones y plazos',
    preguntas: [
      { p: '¿Cuántos días tiene un cliente para pagar una factura en España?', r: 'Por defecto 60 días naturales en operaciones B2B desde la entrega del bien o servicio. La Administración tiene 30 días desde la conformidad de la factura.' },
      { p: '¿Cuándo se considera moroso un cliente?', r: 'Cuando vence el plazo pactado o el legal sin haber pagado. A partir de ese día corren los intereses de demora automáticamente.' },
      { p: '¿Hace falta enviar un requerimiento antes de reclamar intereses?', r: 'No. Los intereses de demora del 12,5% (BCE + 8 puntos) se devengan automáticamente desde el día siguiente al vencimiento.' },
      { p: '¿Cuándo prescribe una deuda de factura?', r: 'A los 5 años en operaciones B2B, según el artículo 1964 del Código Civil. Antes de 2015 era a los 15 años.' },
      { p: '¿Puedo cobrar a 60 días si en mi contrato pone 90?', r: 'Sí. Cualquier pacto que fije plazos superiores a 60 días en B2B es nulo. Se aplica el plazo legal.' },
    ],
  },
  {
    titulo: 'Intereses de demora e indemnización',
    preguntas: [
      { p: '¿Cuánto es el interés de demora en 2026?', r: 'El tipo BCE más 8 puntos porcentuales. En el primer semestre de 2026, aproximadamente 12,5% anual.' },
      { p: '¿Qué son los 40€ de indemnización por costes de cobro?', r: 'Una compensación automática que reconoce la Ley 3/2004 por cada factura impagada, sin tener que demostrar el daño.' },
      { p: '¿Puedo reclamar 40€ por cada factura impagada?', r: 'Sí. Es independiente del importe. Una factura de 50€ impagada también genera derecho a 40€.' },
      { p: '¿Cómo calculo los intereses?', r: 'Fórmula: Principal × tipo × (días vencidos / 365). Por ejemplo: 1.000€ × 0,125 × (30/365) = 10,27€.' },
    ],
  },
  {
    titulo: 'Burofax y vía legal',
    preguntas: [
      { p: '¿Cuándo conviene mandar un burofax?', r: 'Cuando ya has mandado 2-3 emails y llamadas sin resultado, y la deuda lleva más de 45-60 días. Es la prueba previa al monitorio.' },
      { p: '¿Cuánto cuesta un burofax?', r: 'Entre 28€ (online) y 35€ (presencial). Con acuse de recibo y certificación de contenido.' },
      { p: '¿Y si el deudor no recoge el burofax?', r: 'Se considera entregado a efectos legales si Correos ha intentado entregarlo y dejado aviso. Vale como prueba.' },
      { p: '¿Necesito abogado para el procedimiento monitorio?', r: 'No, si la cuantía es inferior a 2.000€. Puedes presentarlo tú mismo con el formulario oficial del CGPJ.' },
      { p: '¿Cuánto tarda un procedimiento monitorio?', r: 'El juez requiere pago en 20 días tras admitir la demanda. Si el deudor no responde ni se opone, ejecutas directamente.' },
    ],
  },
  {
    titulo: 'Saldea: cómo funciona',
    preguntas: [
      { p: '¿Cuánto cuesta Saldea?', r: '49€/mes o 499€/año (ahorras 89€). 30 días de prueba gratis. Se requiere tarjeta.' },
      { p: '¿Necesito poner tarjeta para empezar?', r: 'Sí, pero no se cobra nada durante los primeros 30 días. Puedes cancelar en 1 clic antes y no pagas.' },
      { p: '¿Cómo importa Saldea mis facturas?', r: 'Manual una a una, CSV o conectando con tu software de facturación.' },
      { p: '¿Saldea manda los emails desde mi dominio?', r: 'Sí. Configuras tu remitente y los emails salen como si los mandaras tú personalmente.' },
      { p: '¿La IA escribe los emails sola?', r: 'Sí. Claude (Anthropic) genera el texto adaptado al tono que elijas (amable, firme, formal, extremo) y a los datos de la factura.' },
      { p: '¿Qué pasa si el cliente responde?', r: 'Saldea detecta la respuesta con IA, la clasifica (paga, dispute, promesa, vacaciones) y actúa: pausa, escala o te avisa.' },
      { p: '¿Cuántos miembros puedo invitar?', r: 'Hasta 10 en el plan Pro. Roles: owner, admin, member, readonly.' },
      { p: '¿Saldea cumple RGPD y Ley 3/2004?', r: 'Sí, ambas. Datos en servidores europeos, emails con clausulado legal correcto.' },
    ],
  },
  {
    titulo: 'Stripe Connect y cobros',
    preguntas: [
      { p: '¿Qué es Stripe Connect en Saldea?', r: 'Una integración que genera links de pago automáticos en cada email. El cliente paga con un clic y Saldea lo detecta.' },
      { p: '¿Cuánto cobra Stripe?', r: '1,5% + 0,25€ por cobro europeo. No es coste de Saldea, es de Stripe directamente.' },
      { p: '¿El dinero entra en mi cuenta o en la de Saldea?', r: 'Directamente en tu cuenta de Stripe. Saldea NO toca tu dinero. Stripe Connect Standard.' },
      { p: '¿Puedo aceptar pagos parciales?', r: 'Sí. Saldea registra cada pago parcial y actualiza el saldo restante automáticamente.' },
    ],
  },
  {
    titulo: 'Cancelación y soporte',
    preguntas: [
      { p: '¿Cómo cancelo Saldea?', r: 'Desde tu panel de ajustes, en 1 clic. Sin llamadas, sin trámites, sin permanencia.' },
      { p: '¿Hay permanencia mínima?', r: 'No. Puedes cancelar cualquier mes y dejas de pagar al instante.' },
      { p: '¿Qué pasa con mis datos si cancelo?', r: 'Te exportamos todo en CSV y se eliminan a los 30 días de la cancelación (salvo lo que requiera Hacienda).' },
      { p: '¿Cómo es el soporte?', r: 'En español, por email a carlosgc@marsof.es. Respuesta media: 24h laborables.' },
    ],
  },
]

const schemaFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: categorias.flatMap(c => c.preguntas.map(q => ({
    '@type': 'Question',
    name: q.p,
    acceptedAnswer: { '@type': 'Answer', text: q.r },
  }))),
}

export default function PageFAQ() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-sm font-bold text-zinc-100">Marsof / Saldea</Link>
            <div className="flex items-center gap-2">
<Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">30 días gratis</Link>
            </div>
          </div>
        </nav>

        <section className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Preguntas frecuentes</h1>
          <p className="text-zinc-400 text-lg mb-12">Las respuestas a las dudas más comunes sobre cobros, morosos y cómo funciona Saldea. Si no encuentras tu pregunta, escríbenos a <a href="mailto:carlosgc@marsof.es" className="text-sky-400 underline">carlosgc@marsof.es</a>.</p>

          {categorias.map((cat) => (
            <div key={cat.titulo} className="mb-12">
              <h2 className="text-2xl font-bold text-zinc-100 mb-5">{cat.titulo}</h2>
              <div className="space-y-3">
                {cat.preguntas.map((q) => (
                  <details key={q.p} className="bg-zinc-900/40 border border-white/10 rounded-xl group">
                    <summary className="px-5 py-4 cursor-pointer font-semibold text-zinc-100 list-none flex items-center justify-between">
                      <span>{q.p}</span>
                      <span className="text-sky-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                    </summary>
                    <p className="px-5 pb-4 text-zinc-400 text-sm leading-relaxed">{q.r}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12 bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">¿Listo para automatizar tus cobros?</h2>
            <p className="text-zinc-400 mb-6">30 días gratis. Con tarjeta. Cancela en 1 clic.</p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis →</Link>
          </div>
        </section>
      </div>
    </>
  )
}
