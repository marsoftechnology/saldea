import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morosidad en el sector construcción 2026: análisis y soluciones | Saldea',
  description: 'Por qué la construcción es el sector más afectado por la morosidad en España. Plazos reales de pago, causas y cómo proteger tu empresa.',
  alternates: { canonical: 'https://marsof.es/blog/morosidad-sector-construccion' },
  keywords: ['morosidad construccion', 'cobrar construccion', 'impagos obra', 'morosos obra construccion', 'cobros sector construccion'],
  openGraph: { title: 'Morosidad en construcción 2026', description: 'El sector más afectado y cómo protegerse.', type: 'article', locale: 'es_ES' },
}

export default function PageConstruccion() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Sector · 8 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Morosidad en el sector construcción 2026</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">La construcción lidera el ranking de morosidad en España. Plazos reales, causas y qué hacer para no acabar como tantas pymes del sector.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Los datos que duelen</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>📊 <strong>Plazo medio de pago en construcción:</strong> 108 días (vs 75 media nacional)</li>
            <li>📊 <strong>% facturas pagadas tarde:</strong> 65% (vs 25% media nacional)</li>
            <li>📊 <strong>Empresas que sufrieron impagos en 2025:</strong> 78% del sector</li>
            <li>📊 <strong>Tasa de quiebras:</strong> doble de la media española</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Por qué es tan grave en construcción?</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">1. La cadena de subcontratación</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Promotora → Constructora → Subcontrata → Sub-subcontrata. Cada eslabón aplaza pagos a sus proveedores. Si el primero retrasa, todos lo hacen.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">2. Plazos de certificación largos</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">En obra pública, el ciclo es: trabajo → certificación mensual → conformidad cliente → 30 días pago. La certificación a veces tarda meses.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">3. Cliente final con problemas de liquidez</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Si una promotora vende menos casas, no paga a la constructora. Toda la pirámide se desploma.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">4. Disputas técnicas frecuentes</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">El cliente excusa el pago con "deficiencias", "reparaciones pendientes" o reformas. A veces son reales, otras simple táctica para retrasar el pago.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El marco legal específico</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>📜 <strong>Ley 9/2017 (Contratos del Sector Público):</strong> 30 días desde la conformidad (administración pública)</li>
            <li>📜 <strong>Ley 3/2004:</strong> aplica a operaciones B2B (60 días máximo)</li>
            <li>📜 <strong>Ley 9/2022 Contratos Públicos:</strong> certificaciones en 30 días</li>
            <li>📜 <strong>Ley 7/2012 Subcontratación:</strong> regula la cadena de subcontratistas</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cómo protegerse en construcción</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">1. Anticipo del 20-30%</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Sí, sé que es difícil pedirlo a una constructora grande. Pero hazlo. Si te lo niegan, exígelo al menos para materiales.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">2. Cláusula de retención de obra</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">El contrato típico de construcción tiene una "retención de garantía" del 5-10% que se paga al final. Negocia que sea menor o que se devuelva en plazos cortos.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">3. Certificaciones mensuales firmadas</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Cada mes presenta certificación. Pide firma del responsable de obra ANTES de continuar. Sin firma, no avances.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">4. Verificación previa del cliente</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Antes de firmar contrato grande, busca al cliente en eInforma. Si tiene impagos publicados o concurso preventivo, sopesa muy bien.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">5. Recordatorios automáticos cada certificación</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Tras emitir la factura de certificación, automatiza recordatorios escalados. Si se pasan de los 30 días legales, escala el tono mencionando expresamente la Ley 9/2017 o Ley 3/2004.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">6. Burofax temprano</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">En construcción, el burofax a los 45-60 días es estándar. No esperes 90 días: para entonces tu cliente ya se ha gastado el dinero.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Señales de alarma</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>🚩 El cliente empieza a discutir certificaciones que antes firmaba sin problema</li>
            <li>🚩 Cambia el interlocutor de pagos sin avisar</li>
            <li>🚩 Pide "una semanita más" repetidamente</li>
            <li>🚩 Le sale "una factura sin pagar" tuya cuando consultas eInforma</li>
            <li>🚩 Hay murmullo en el gremio sobre su solvencia</li>
            <li>🚩 Tarda en firmar certificaciones que antes firmaba al día</li>
          </ul>

          <p className="text-zinc-300 leading-relaxed mb-4">Si ves 2-3 señales, <strong>aplica el protocolo</strong>: ralentiza, exige cobros pendientes antes de seguir y considera suspender la obra según contrato.</p>
        </section>

        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea automatiza la reclamación en construcción</h3>
          <p className="text-zinc-300 mb-5">Importa tus certificaciones, configura los plazos legales y deja que la IA persiga el cobro. Cita automáticamente la Ley 9/2017 si es obra pública o Ley 3/2004 si es B2B. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
