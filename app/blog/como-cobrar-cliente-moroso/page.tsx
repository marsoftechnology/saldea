import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo cobrar a un cliente moroso: guía paso a paso 2026 | Saldea',
  description: 'Estrategia completa para cobrar facturas a clientes morosos sin perder la relación comercial. 7 pasos, plantillas legales y herramientas. Actualizado 2026.',
  alternates: { canonical: 'https://marsof.es/blog/como-cobrar-cliente-moroso' },
  keywords: [
    'cómo cobrar cliente moroso',
    'cobrar facturas impagadas',
    'reclamar deuda cliente',
    'recuperar dinero cliente',
    'moroso no paga',
    'cobrar autónomo',
  ],
  openGraph: {
    title: 'Cómo cobrar a un cliente moroso paso a paso',
    description: 'Guía práctica con plantillas, plazos legales y herramientas para recuperar tu dinero sin perder la relación.',
    type: 'article',
    locale: 'es_ES',
  },
}

const schemaArticulo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo cobrar a un cliente moroso',
  description: 'Guía paso a paso para recuperar facturas impagadas en España de forma efectiva y legal.',
  totalTime: 'P30D',
  step: [
    { '@type': 'HowToStep', name: 'Recordatorio amable', text: 'Envía un email cordial el día 1 de retraso.' },
    { '@type': 'HowToStep', name: 'Recordatorio firme', text: 'Día 7-15: subir tono y mencionar Ley 3/2004.' },
    { '@type': 'HowToStep', name: 'Llamada telefónica', text: 'Día 20: contacto directo para entender el motivo.' },
    { '@type': 'HowToStep', name: 'Requerimiento formal', text: 'Día 30-45: carta certificada con acuse de recibo.' },
    { '@type': 'HowToStep', name: 'Burofax', text: 'Día 60: burofax como paso previo a la vía judicial.' },
    { '@type': 'HowToStep', name: 'Procedimiento monitorio', text: 'Día 90: si no hay respuesta, vía judicial.' },
  ],
}

export default function PageCobrarMoroso() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticulo) }}
      />

      <article className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">
            ← Volver al blog
          </Link>

          <header className="mb-10">
            <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Guía práctica · 10 min de lectura</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              Cómo cobrar a un cliente moroso paso a paso
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Estrategia probada en 7 fases para recuperar tu dinero sin perder al cliente ni acabar en los juzgados.
            </p>
          </header>

          <section className="prose prose-invert max-w-none">
            <p className="text-zinc-300 leading-relaxed text-lg mb-6">
              En España, <strong>1 de cada 4 facturas se paga con retraso</strong> y un 8% nunca llega a cobrarse. Si vendes a empresas o autónomos, antes o después tendrás un moroso. Lo que diferencia a quien cobra del que no es el <strong>proceso</strong>: una secuencia clara, escrita y profesional que escala el tono sin perder las formas.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">El error más común: esperar demasiado</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              La mayoría de autónomos y empresas pequeñas <strong>esperan 2-3 meses</strong> antes de reclamar. Para entonces, el cliente ya ha decidido no pagar o no tiene liquidez. <strong>El recordatorio empieza el día 1.</strong>
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Día 1 — Recordatorio amable</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              El mismo día del vencimiento o al día siguiente, manda un email cordial. Asume buena fe.
            </p>
            <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
              <p className="text-zinc-300 text-sm italic">
                "Hola [nombre], te recuerdo que la factura [X] venció ayer. Si ya la has abonado, ignora este mensaje. Si no, ¿puedes confirmarme cuándo procederás al pago? Gracias."
              </p>
            </div>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Día 7-15 — Recordatorio firme</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Si no ha contestado, sube el tono. Sin perder educación, pero dejando claro que estás haciendo seguimiento. <strong>Menciona la Ley 3/2004</strong> y los intereses de demora que se están devengando.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Día 20 — Llamada telefónica</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              El email es escalable pero impersonal. <strong>Una llamada te da información real</strong>: si tiene problemas de tesorería, si hay disputa con tu producto/servicio, o si simplemente se le ha olvidado. La conversación humana cierra más cobros que 10 emails.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Día 30-45 — Requerimiento formal por escrito</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Carta certificada con acuse de recibo. Esto ya es prueba en juicio. Cuantifica la deuda principal, intereses devengados según Ley 3/2004 y los 40€ de indemnización por costes de cobro.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Día 60 — Burofax</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              El burofax es la mejor prueba antes de ir a juicio. Da fe del contenido enviado y la fecha. Coste: 25-40€. Si el cliente sigue sin pagar, ya tienes todo lo necesario para el procedimiento monitorio.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Día 90 — Procedimiento monitorio</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Es el procedimiento judicial más rápido y barato en España para reclamar deudas <strong>dinerarias, líquidas, vencidas y exigibles</strong>. No requiere abogado ni procurador si la cuantía es inferior a 2.000€. El juez requiere de pago al deudor en 20 días. Si no responde ni se opone, se ejecuta directamente.
            </p>
            <div className="bg-sky-500/5 border border-sky-500/30 rounded-xl p-5 my-5">
              <p className="text-zinc-200 mb-2"><strong>Coste del monitorio:</strong></p>
              <p className="text-zinc-400 text-sm">Gratis si demanda inferior a 2.000€ (sin abogado). Tasas judiciales solo si la empresa tiene plantilla &gt; 10 trabajadores.</p>
            </div>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Resumen visual del calendario</h2>
            <div className="overflow-x-auto my-5">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-sky-500/20">
                    <th className="py-3 px-4 text-left text-zinc-100">Día</th>
                    <th className="py-3 px-4 text-left text-zinc-100">Acción</th>
                    <th className="py-3 px-4 text-left text-zinc-100">Canal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10"><td className="py-3 px-4 text-zinc-300">1</td><td className="py-3 px-4 text-zinc-300">Recordatorio amable</td><td className="py-3 px-4 text-zinc-300">Email</td></tr>
                  <tr className="border-b border-white/10"><td className="py-3 px-4 text-zinc-300">7-15</td><td className="py-3 px-4 text-zinc-300">Recordatorio firme</td><td className="py-3 px-4 text-zinc-300">Email + WhatsApp</td></tr>
                  <tr className="border-b border-white/10"><td className="py-3 px-4 text-zinc-300">20</td><td className="py-3 px-4 text-zinc-300">Llamada directa</td><td className="py-3 px-4 text-zinc-300">Teléfono</td></tr>
                  <tr className="border-b border-white/10"><td className="py-3 px-4 text-zinc-300">30-45</td><td className="py-3 px-4 text-zinc-300">Requerimiento formal</td><td className="py-3 px-4 text-zinc-300">Carta certificada</td></tr>
                  <tr className="border-b border-white/10"><td className="py-3 px-4 text-zinc-300">60</td><td className="py-3 px-4 text-zinc-300">Burofax</td><td className="py-3 px-4 text-zinc-300">Correos</td></tr>
                  <tr><td className="py-3 px-4 text-zinc-300">90</td><td className="py-3 px-4 text-zinc-300">Procedimiento monitorio</td><td className="py-3 px-4 text-zinc-300">Juzgado</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Qué NO hacer al reclamar a un moroso</h2>
            <ul className="space-y-2 text-zinc-300 mb-6">
              <li>❌ <strong>Amenazar con denunciar</strong> sin haber mandado requerimiento formal previo.</li>
              <li>❌ <strong>Acosar telefónicamente</strong> (puede ser delito de coacciones).</li>
              <li>❌ <strong>Inscribir en ASNEF/RAI</strong> sin notificación previa documentada.</li>
              <li>❌ <strong>Difamar al cliente</strong> en redes sociales o foros.</li>
              <li>❌ <strong>Dejar de prestar el servicio</strong> sin cláusula contractual que lo permita.</li>
            </ul>
          </section>

          <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-zinc-100 mb-2">Automatiza este proceso completo con Saldea</h3>
            <p className="text-zinc-300 mb-5">
              Saldea ejecuta automáticamente los pasos 1 a 5 con IA: manda recordatorios escalados, detecta respuestas, pausa cuando el cliente paga y te avisa solo si hay algo importante. <strong>15 días gratis.</strong>
            </p>
            <Link
              href="/registro"
              className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors"
            >
              Probar Saldea gratis →
            </Link>
          </aside>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-xs text-zinc-500">
              Información orientativa. Para casos concretos consulta con un abogado o asesor legal.
            </p>
          </div>
        </div>
      </article>
    </>
  )
}
