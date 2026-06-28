import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Veri*factu y facturas electrónicas en España 2026: guía clara | Marsof',
  description: 'Qué es Veri*factu, a quién obliga, plazos, sanciones por incumplimiento y cómo adaptar tu facturación. Real Decreto 1007/2023 explicado simple.',
  alternates: { canonical: 'https://www.marsof.es/blog/verifactu-facturas-electronicas-2026' },
  keywords: [
    'verifactu',
    'veri*factu',
    'factura electronica obligatoria',
    'real decreto 1007/2023',
    'factura electronica 2026',
    'sistema verificacion facturas',
  ],
  openGraph: {
    title: 'Veri*factu y facturas electrónicas en España 2026',
    description: 'Guía clara con plazos y sanciones.',
    type: 'article',
    locale: 'es_ES',
  },
}

export default function PageVerifactu() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Normativa fiscal · 8 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Veri*factu y facturas electrónicas en España 2026</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">La nueva obligación que afecta a todos los autónomos y empresas que facturan en España. Plazos, sanciones y cómo prepararte.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Qué es Veri*factu?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Veri*factu</strong> es el sistema español creado por el <strong>Real Decreto 1007/2023</strong> para asegurar la veracidad e integridad de las facturas electrónicas. Obliga a que el software de facturación genere registros con sello de verificación que se envían automáticamente a Hacienda.</p>
          <p className="text-zinc-300 leading-relaxed mb-4">Es la respuesta española a un problema real: las empresas que emiten facturas falsas o modificadas para defraudar Hacienda. Con Veri*factu, cada factura queda registrada y trazable desde su emisión.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿A quién obliga?</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>Autónomos personas físicas</strong> en estimación directa (no módulos)</li>
            <li>? <strong>Sociedades mercantiles</strong> (SL, SA) que tributen en Impuesto de Sociedades</li>
            <li>? <strong>Profesionales con facturación electrónica</strong></li>
            <li>? <strong>NO obliga</strong> a autónomos en estimación objetiva (módulos)</li>
            <li>? <strong>NO obliga</strong> a empresas del País Vasco (ya tienen TicketBAI)</li>
            <li>? <strong>NO obliga</strong> a empresas de Navarra (regímenes propios)</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plazos vigentes 2026</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20">
                  <th className="py-3 px-4 text-left text-zinc-100">Fecha</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Hito</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">1 enero 2026</td><td className="py-2 px-4">Obligatorio para empresas mercantiles (sociedades)</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">1 julio 2026</td><td className="py-2 px-4">Obligatorio para autónomos en estimación directa</td></tr>
                <tr><td className="py-2 px-4">Continuo</td><td className="py-2 px-4">Software de facturación homologado obligatorio</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Sanciones por incumplimiento</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>?? <strong>Empresa con software no homologado:</strong> hasta <strong>50.000€</strong> por cada año fiscal incumplido</li>
            <li>?? <strong>Falta de envío de registros:</strong> hasta <strong>20.000€</strong> por bimestre</li>
            <li>?? <strong>Manipulación de facturas:</strong> sanción + posible responsabilidad penal</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Qué cambia para ti como autónomo o empresa?</h2>
          <ol className="space-y-3 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>Necesitas software de facturación homologado.</strong> Excel, Word o PDFs manuales ya NO valen.</li>
            <li><strong>Cada factura genera un registro Veri*factu</strong> con hash criptográfico, fecha y firma electrónica.</li>
            <li><strong>Los registros van automáticamente a Hacienda</strong> (modalidad "Veri*factu") o quedan en tus servidores con trazabilidad ("No Veri*factu").</li>
            <li><strong>Las facturas deben llevar un QR</strong> con datos de verificación que cualquiera puede comprobar.</li>
            <li><strong>No puedes modificar una factura ya emitida.</strong> Si hay error, factura rectificativa con su propio registro.</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Diferencia entre Veri*factu y "No Veri*factu"</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
            <p className="text-zinc-200 mb-2"><strong className="text-sky-400">Modalidad Veri*factu (recomendada):</strong></p>
            <p className="text-zinc-400 text-sm mb-3">Las facturas se envían a Hacienda automáticamente al emitirse. Más simple, sin auditorías sorpresa.</p>
            <p className="text-zinc-200 mb-2"><strong className="text-sky-400">Modalidad No Veri*factu:</strong></p>
            <p className="text-zinc-400 text-sm">Los registros se conservan en tu servidor con sistema antimanipulación. Hacienda puede pedirte que envíes los datos cuando quiera.</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Software homologado en España (2026)</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>Holded</strong> - homologado completo</li>
            <li>? <strong>Quipu</strong> - homologado</li>
            <li>? <strong>Anfix</strong> - homologado</li>
            <li>? <strong>Sage 50</strong> - homologado</li>
            <li>? <strong>FacturaScripts</strong> - homologado open-source</li>
            <li>? <strong>Billin</strong> - homologado</li>
            <li>? <strong>Cualquier software</strong> que cumpla el RD 1007/2023</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Pasos para adaptarte</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li>Comprueba si tu software actual está <strong>homologado</strong>. Si no, cambia antes de 1 de julio 2026.</li>
            <li>Decide modalidad: <strong>Veri*factu</strong> (envío automático) o <strong>No Veri*factu</strong> (envío bajo petición).</li>
            <li>Habla con tu asesor fiscal para configurar el certificado digital y el envío.</li>
            <li>Verifica que tus facturas llevan el <strong>QR de verificación</strong> obligatorio.</li>
            <li>Prueba el envío de una factura test antes del plazo límite.</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Y Saldea?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Saldea NO emite tus facturas (eso lo hace tu software contable). <strong>Saldea persigue el cobro</strong> de las facturas que ya has emitido. Por tanto, Veri*factu no afecta directamente a Saldea: tu software de facturación es el responsable de cumplir.</p>
          <p className="text-zinc-300 leading-relaxed mb-4">Lo que sí hacemos: importar facturas Veri*factu desde los principales softwares homologados para que la persecución del cobro sea automática.</p>
        </section>

        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Cumple Veri*factu y deja que Saldea cobre por ti</h3>
          <p className="text-zinc-300 mb-5">Mientras tu software de facturación se ocupa de cumplir Veri*factu, Saldea se ocupa de que tus clientes paguen. División de trabajo perfecta. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-zinc-500">La normativa puede actualizarse. Consulta siempre con tu asesor fiscal para tu caso concreto.</p>
        </div>
      </div>
    </article>
  )
}

