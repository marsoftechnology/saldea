import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Preguntas frecuentes sobre cobros, morosos y Saldea | Saldea',
  description: '40+ respuestas a las dudas mÃ¡s frecuentes sobre cobrar facturas impagadas, intereses de demora, burofax, monitorio y cÃ³mo funciona Saldea.',
  alternates: { canonical: 'https://marsof.es/preguntas-frecuentes' },
  keywords: [
    'preguntas frecuentes cobros',
    'dudas factura impagada',
    'faq morosos',
    'preguntas sobre saldea',
    'como reclamar deuda dudas',
  ],
  openGraph: {
    title: 'Preguntas frecuentes sobre cobros y morosos en EspaÃ±a',
    description: '40+ respuestas claras.',
    type: 'article',
    locale: 'es_ES',
  },
}

const categorias = [
  {
    titulo: 'Reclamaciones y plazos',
    preguntas: [
      { p: 'Â¿CuÃ¡ntos dÃ­as tiene un cliente para pagar una factura en EspaÃ±a?', r: 'Por defecto 60 dÃ­as naturales en operaciones B2B desde la entrega del bien o servicio. La AdministraciÃ³n tiene 30 dÃ­as desde la conformidad de la factura.' },
      { p: 'Â¿CuÃ¡ndo se considera moroso un cliente?', r: 'Cuando vence el plazo pactado o el legal sin haber pagado. A partir de ese dÃ­a corren los intereses de demora automÃ¡ticamente.' },
      { p: 'Â¿Hace falta enviar un requerimiento antes de reclamar intereses?', r: 'No. Los intereses de demora del 12,5% (BCE + 8 puntos) se devengan automÃ¡ticamente desde el dÃ­a siguiente al vencimiento.' },
      { p: 'Â¿CuÃ¡ndo prescribe una deuda de factura?', r: 'A los 5 aÃ±os en operaciones B2B, segÃºn el artÃ­culo 1964 del CÃ³digo Civil. Antes de 2015 era a los 15 aÃ±os.' },
      { p: 'Â¿Puedo cobrar a 60 dÃ­as si en mi contrato pone 90?', r: 'SÃ­. Cualquier pacto que fije plazos superiores a 60 dÃ­as en B2B es nulo. Se aplica el plazo legal.' },
    ],
  },
  {
    titulo: 'Intereses de demora e indemnizaciÃ³n',
    preguntas: [
      { p: 'Â¿CuÃ¡nto es el interÃ©s de demora en 2026?', r: 'El tipo BCE mÃ¡s 8 puntos porcentuales. En el primer semestre de 2026, aproximadamente 12,5% anual.' },
      { p: 'Â¿QuÃ© son los 40â‚¬ de indemnizaciÃ³n por costes de cobro?', r: 'Una compensaciÃ³n automÃ¡tica que reconoce la Ley 3/2004 por cada factura impagada, sin tener que demostrar el daÃ±o.' },
      { p: 'Â¿Puedo reclamar 40â‚¬ por cada factura impagada?', r: 'SÃ­. Es independiente del importe. Una factura de 50â‚¬ impagada tambiÃ©n genera derecho a 40â‚¬.' },
      { p: 'Â¿CÃ³mo calculo los intereses?', r: 'FÃ³rmula: Principal Ã— tipo Ã— (dÃ­as vencidos / 365). Por ejemplo: 1.000â‚¬ Ã— 0,125 Ã— (30/365) = 10,27â‚¬.' },
    ],
  },
  {
    titulo: 'Burofax y vÃ­a legal',
    preguntas: [
      { p: 'Â¿CuÃ¡ndo conviene mandar un burofax?', r: 'Cuando ya has mandado 2-3 emails y llamadas sin resultado, y la deuda lleva mÃ¡s de 45-60 dÃ­as. Es la prueba previa al monitorio.' },
      { p: 'Â¿CuÃ¡nto cuesta un burofax?', r: 'Entre 28â‚¬ (online) y 35â‚¬ (presencial). Con acuse de recibo y certificaciÃ³n de contenido.' },
      { p: 'Â¿Y si el deudor no recoge el burofax?', r: 'Se considera entregado a efectos legales si Correos ha intentado entregarlo y dejado aviso. Vale como prueba.' },
      { p: 'Â¿Necesito abogado para el procedimiento monitorio?', r: 'No, si la cuantÃ­a es inferior a 2.000â‚¬. Puedes presentarlo tÃº mismo con el formulario oficial del CGPJ.' },
      { p: 'Â¿CuÃ¡nto tarda un procedimiento monitorio?', r: 'El juez requiere pago en 20 dÃ­as tras admitir la demanda. Si el deudor no responde ni se opone, ejecutas directamente.' },
    ],
  },
  {
    titulo: 'Saldea: cÃ³mo funciona',
    preguntas: [
      { p: 'Â¿CuÃ¡nto cuesta Saldea?', r: '49â‚¬/mes o 499â‚¬/aÃ±o (ahorras 89â‚¬). 1 mes de prueba gratis sin tarjeta hasta el dÃ­a 31.' },
      { p: 'Â¿Necesito poner tarjeta para empezar?', r: 'SÃ­, pero no se cobra nada hasta el dÃ­a 31. Puedes cancelar en 1 clic antes y no pagas.' },
      { p: 'Â¿CÃ³mo importa Saldea mis facturas?', r: 'Manual una a una, CSV o conectando con tu software de facturaciÃ³n.' },
      { p: 'Â¿Saldea manda los emails desde mi dominio?', r: 'SÃ­. Configuras tu remitente y los emails salen como si los mandaras tÃº personalmente.' },
      { p: 'Â¿La IA escribe los emails sola?', r: 'SÃ­. Claude (Anthropic) genera el texto adaptado al tono que elijas (amable, firme, formal, extremo) y a los datos de la factura.' },
      { p: 'Â¿QuÃ© pasa si el cliente responde?', r: 'Saldea detecta la respuesta con IA, la clasifica (paga, dispute, promesa, vacaciones) y actÃºa: pausa, escala o te avisa.' },
      { p: 'Â¿CuÃ¡ntos miembros puedo invitar?', r: 'Hasta 10 en el plan Pro. Roles: owner, admin, member, readonly.' },
      { p: 'Â¿Saldea cumple RGPD y Ley 3/2004?', r: 'SÃ­, ambas. Datos en servidores europeos, emails con clausulado legal correcto.' },
    ],
  },
  {
    titulo: 'Stripe Connect y cobros',
    preguntas: [
      { p: 'Â¿QuÃ© es Stripe Connect en Saldea?', r: 'Una integraciÃ³n que genera links de pago automÃ¡ticos en cada email. El cliente paga con un clic y Saldea lo detecta.' },
      { p: 'Â¿CuÃ¡nto cobra Stripe?', r: '1,5% + 0,25â‚¬ por cobro europeo. No es coste de Saldea, es de Stripe directamente.' },
      { p: 'Â¿El dinero entra en mi cuenta o en la de Saldea?', r: 'Directamente en tu cuenta de Stripe. Saldea NO toca tu dinero. Stripe Connect Standard.' },
      { p: 'Â¿Puedo aceptar pagos parciales?', r: 'SÃ­. Saldea registra cada pago parcial y actualiza el saldo restante automÃ¡ticamente.' },
    ],
  },
  {
    titulo: 'CancelaciÃ³n y soporte',
    preguntas: [
      { p: 'Â¿CÃ³mo cancelo Saldea?', r: 'Desde tu panel de ajustes, en 1 clic. Sin llamadas, sin trÃ¡mites, sin permanencia.' },
      { p: 'Â¿Hay permanencia mÃ­nima?', r: 'No. Puedes cancelar cualquier mes y dejas de pagar al instante.' },
      { p: 'Â¿QuÃ© pasa con mis datos si cancelo?', r: 'Te exportamos todo en CSV y se eliminan a los 30 dÃ­as de la cancelaciÃ³n (salvo lo que requiera Hacienda).' },
      { p: 'Â¿CÃ³mo es el soporte?', r: 'En espaÃ±ol, por email a soporte@marsof.es. Respuesta media: 24h laborables.' },
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
<Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">1 mes gratis</Link>
            </div>
          </div>
        </nav>

        <section className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Preguntas frecuentes</h1>
          <p className="text-zinc-400 text-lg mb-12">Las respuestas a las dudas mÃ¡s comunes sobre cobros, morosos y cÃ³mo funciona Saldea. Si no encuentras tu pregunta, escrÃ­benos a <a href="mailto:soporte@marsof.es" className="text-sky-400 underline">soporte@marsof.es</a>.</p>

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
            <h2 className="text-2xl font-bold mb-2">Â¿Listo para automatizar tus cobros?</h2>
            <p className="text-zinc-400 mb-6">1 mes gratis. Sin tarjeta. Cancela en 1 clic.</p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis â†’</Link>
          </div>
        </section>
      </div>
    </>
  )
}
