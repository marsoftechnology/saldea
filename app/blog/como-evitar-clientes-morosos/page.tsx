import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo evitar clientes morosos: 8 reglas antes de firmar | Marsof',
  description: 'Más vale prevenir que reclamar. 8 reglas prácticas para detectar a un cliente moroso antes de empezar a trabajar con él y blindar tu facturación.',
  alternates: { canonical: 'https://marsof.es/blog/como-evitar-clientes-morosos' },
  keywords: [
    'evitar clientes morosos',
    'prevenir impagos',
    'detectar moroso',
    'cliente que no paga',
    'blindar contrato',
    'reducir morosidad',
  ],
  openGraph: {
    title: 'Cómo evitar clientes morosos: 8 reglas antes de firmar',
    description: 'Prevén impagos antes de que ocurran.',
    type: 'article',
    locale: 'es_ES',
  },
}

export default function PageEvitarMorosos() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Prevención · 8 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cómo evitar clientes morosos: 8 reglas antes de firmar</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Reclamar a un moroso te ocupa 10 veces más tiempo que detectarlo antes de empezar. Esta es la lista que ojalá te hubieran dado el primer día.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">1. Comprueba el CIF/NIF en eInforma o Axesor</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Antes de firmar contrato, busca al cliente en <strong>einforma.com</strong> o <strong>axesor.es</strong>. Te dan un informe gratuito básico con: facturación, antigüedad, alertas judiciales y deudas pendientes con la Seguridad Social. Si ves "concurso de acreedores" o "impagados publicados", huye.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">2. Pide anticipo del 30-50%</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Sobre todo si es la primera vez. Un cliente que se niega a pagar nada por adelantado tiene altas probabilidades de no pagar nunca. <strong>El anticipo separa al curioso del comprador real.</strong></p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">3. Pon en el contrato cláusula de Ley 3/2004</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Cita expresamente: "En caso de impago, se aplicarán los intereses de demora de la Ley 3/2004 (tipo BCE + 8 puntos), la indemnización de 40€ por costes de cobro y se suspenderá el servicio de inmediato". Es disuasorio y te da respaldo legal.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">4. Cláusula de suspensión por impago</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">"El proveedor se reserva el derecho a suspender los servicios contratados si el cliente acumula más de 15 días de retraso en cualquier factura". Esto te protege legalmente para dejar de trabajar sin que te demanden por incumplimiento.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">5. Domiciliación bancaria SEPA</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si tu cliente firma el mandato SEPA, el cobro va automático cada mes a la cuenta que indique. Solo puede oponerse si hay disputa real. <strong>Reduce la morosidad ~70%.</strong></p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">6. Recordatorio automático antes del vencimiento</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Manda un email 3 días antes del vencimiento: "Recordatorio amistoso: tu factura X vence el día Y". Aumenta la probabilidad de cobro a tiempo en un 30-40%.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">7. Detecta señales de impago temprano</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>🚩 El cliente cambia de banco o cuenta de pago repentinamente.</li>
            <li>🚩 Empieza a pedir descuentos o renegociar después de firmar.</li>
            <li>🚩 Deja de responder a tus emails con la rapidez habitual.</li>
            <li>🚩 Pide que retrases la siguiente factura.</li>
            <li>🚩 Cambia de interlocutor sin avisarte.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">8. Diversifica clientes</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si <strong>un solo cliente representa más del 30% de tus ingresos</strong>, estás en zona de peligro. Si ese cliente impaga, tu negocio cae. Trabaja para que ningún cliente sea más del 20%.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Resumen visual</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20">
                  <th className="py-3 px-4 text-left text-zinc-100">Regla</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Impacto</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Verificar CIF en eInforma</td><td className="py-2 px-4">Filtra el 80% de morosos crónicos</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Anticipo 30-50%</td><td className="py-2 px-4">Filtra clientes no serios</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Cláusula Ley 3/2004</td><td className="py-2 px-4">Disuade y respalda legalmente</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Cláusula suspensión</td><td className="py-2 px-4">Te protege para dejar de trabajar</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">SEPA domiciliación</td><td className="py-2 px-4">Reduce morosidad ~70%</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Recordatorio pre-vencimiento</td><td className="py-2 px-4">+30-40% cobros a tiempo</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Detección de señales</td><td className="py-2 px-4">Actúas antes de que sea tarde</td></tr>
                <tr><td className="py-2 px-4">Diversificación</td><td className="py-2 px-4">Reduce riesgo concentración</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea automatiza las reglas 5, 6 y 7</h3>
          <p className="text-zinc-300 mb-5">Recordatorios pre-vencimiento, secuencia de cobros y detección de señales con IA. Tú solo tienes que pre-cualificar al cliente y firmar buen contrato. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}

