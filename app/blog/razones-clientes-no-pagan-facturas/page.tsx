import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '7 razones por las que tus clientes no te pagan (y qué hacer) | Marsof',
  description: 'Las 7 razones más comunes por las que tus clientes pagan tarde o no pagan, ordenadas por frecuencia. Y la solución concreta para cada una.',
  alternates: { canonical: 'https://www.marsof.es/blog/razones-clientes-no-pagan-facturas' },
  keywords: [
    'cliente no paga',
    'cliente no quiere pagar',
    'cliente paga tarde',
    'por que no me pagan',
    'razones impago',
  ],
  openGraph: {
    title: '7 razones por las que tus clientes no te pagan',
    description: 'Y qué hacer en cada caso. Real.',
    type: 'article',
    locale: 'es_ES',
  },
}

export default function PageRazones() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Análisis · 7 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">7 razones por las que tus clientes no te pagan</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">No todos los impagos son iguales. Saber por qué un cliente concreto no te paga te dice cómo reclamar. Y la diferencia entre cobrar o no es enorme.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">1. Olvido genuino (40-50% de los casos)</h2>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Síntoma:</strong> cliente serio con buen historial que esta vez se le ha pasado. Suele responder el primer recordatorio amable y pagar en 1-3 días.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Qué hacer:</strong> un email amable el día 1 del retraso. Tono cordial, sin acusar. Solución resuelta.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">2. Problema de tesorería (20-25%)</h2>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Síntoma:</strong> cliente que normalmente paga pero ahora "necesita unas semanas". Te lo dice sin pudor cuando llamas.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Qué hacer:</strong> negocia un plan de pago concreto (3 cuotas, 2 meses). Pídelo por escrito. Acepta plazo pero NO renuncies a los intereses de demora ni a los 40€.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">3. Disputa real sobre el trabajo (10-15%)</h2>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Síntoma:</strong> el cliente dice "no estoy contento con lo que entregaste" o "esto no es lo que pedí". Suele aparecer después del primer recordatorio.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Qué hacer:</strong> escucha. Si tiene razón, ofrece compensación parcial o reparación. Si no la tiene, documenta por escrito qué se acordó (presupuesto, emails, contrato) y mantén la factura. Nunca renuncies sin negociar.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">4. Cobrar tarde como estrategia (10%)</h2>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Síntoma:</strong> cliente grande (constructoras, cadenas, administraciones) que sistemáticamente paga al doble del plazo acordado. No te lo dice, simplemente lo hace.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Qué hacer:</strong> recordatorios automáticos sistemáticos. Cita la Ley 3/2004 desde el primer email. Si lo aceptas a 120 días "porque es un cliente grande", entras en pérdidas que no compensan. Mejor perder al cliente que mantener morosidad estructural.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">5. Cliente desaparecido (5-10%)</h2>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Síntoma:</strong> no responde a emails, llamadas ni WhatsApp. Posible que haya cerrado el negocio o haya bloqueado la comunicación.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Qué hacer:</strong> verifica en eInforma si la empresa sigue activa. Si lo está, manda burofax al domicilio social. Si no responde al burofax, procedimiento monitorio.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">6. Cliente que prueba si te molestas (3-5%)</h2>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Síntoma:</strong> cliente que sabe que va a pagar pero quiere ver si tú "te molestas" en reclamar. Si no reclamas, asume que le perdonas el plazo.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Qué hacer:</strong> exactamente igual que con el olvido genuino: recordatorio sistemático desde el día 1. Una vez ven que reclamas siempre, dejan de probar.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">7. Insolvencia real o concurso (1-3%)</h2>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Síntoma:</strong> sospechosos avisos del propio cliente ("vamos a presentar concurso", "estamos negociando con todos"). Verificable en BORME.es</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Qué hacer:</strong> si entra en concurso, tienes 30 días desde la publicación en BORME para inscribir tu crédito como acreedor. Si no lo haces, pierdes el derecho. Habla con un abogado mercantilista cuanto antes.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Resumen visual</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20">
                  <th className="py-3 px-4 text-left text-zinc-100">Razón</th>
                  <th className="py-3 px-4 text-left text-zinc-100">%</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Solución</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Olvido</td><td className="py-2 px-4">40-50%</td><td className="py-2 px-4">Recordatorio amable</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Tesorería</td><td className="py-2 px-4">20-25%</td><td className="py-2 px-4">Plan de pago</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Disputa</td><td className="py-2 px-4">10-15%</td><td className="py-2 px-4">Negociación</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Estrategia</td><td className="py-2 px-4">10%</td><td className="py-2 px-4">Sistemático + Ley 3/2004</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Desaparecido</td><td className="py-2 px-4">5-10%</td><td className="py-2 px-4">Burofax + monitorio</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Te prueba</td><td className="py-2 px-4">3-5%</td><td className="py-2 px-4">Reclamación sistemática</td></tr>
                <tr><td className="py-2 px-4">Insolvencia</td><td className="py-2 px-4">1-3%</td><td className="py-2 px-4">Abogado + concurso</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">La conclusión</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">El <strong>70-80% de los impagos se resuelve con un recordatorio firme y a tiempo</strong>. El problema no son los morosos crónicos: son los olvidos y los problemas de tesorería que escalan a impago cuando NO reclamas.</p>
          <p className="text-zinc-300 leading-relaxed mb-4">Por eso la automatización del cobro vale tanto: NO porque saque dinero a morosos cabezotas, sino porque <strong>evita que los olvidos se conviertan en deudas</strong>.</p>
        </section>

        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea actúa sobre el 80% de los casos automáticamente</h3>
          <p className="text-zinc-300 mb-5">Los olvidos, los retrasos por tesorería y los que te prueban son los 3 perfiles que la IA de Saldea resuelve sin que tú intervengas. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
  )
}

