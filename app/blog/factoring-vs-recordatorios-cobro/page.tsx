import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Factoring vs recordatorios de cobro: cu�l te interesa m�s | Marsof',
  description: 'Comparativa entre el factoring (adelanto de facturas con coste) y los sistemas de recordatorios autom�ticos. Qu� cuesta cada uno y cu�ndo conviene cada uno.',
  alternates: { canonical: 'https://www.marsof.es/blog/factoring-vs-recordatorios-cobro' },
  keywords: [
    'factoring',
    'cesi�n de credito',
    'adelanto de facturas',
    'factoring vs cobros',
    'cuanto cuesta factoring',
    'alternativa al factoring',
  ],
  openGraph: {
    title: 'Factoring vs recordatorios de cobro autom�ticos',
    description: 'Qu� cuesta cada uno y cu�ndo conviene cada uno.',
    type: 'article',
    locale: 'es_ES',
  },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "Factoring vs recordatorios de cobro: cu�l te interesa m�s", "description": "Comparativa entre el factoring (adelanto de facturas con coste) y los sistemas de recordatorios autom�ticos. Qu� cuesta cada uno y cu�ndo conviene cada uno.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/factoring-vs-recordatorios-cobro"}

export default function PageFactoring() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Financiaci�n � 7 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Factoring vs recordatorios autom�ticos: �qu� te conviene?</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">El factoring adelanta tu dinero pero te quita un 3-5%. Los recordatorios autom�ticos no te dan liquidez instant�nea, pero te cobran sin descuento. Comparativa honesta.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">�Qu� es el factoring?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">El factoring es un servicio financiero por el que <strong>vendes tus facturas a un tercero</strong> (banco o empresa de factoring) a cambio de cobrar el dinero hoy. Te descuentan una comisi�n (3-5% t�pico) y ellos asumen la gesti�n del cobro al deudor final.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Tipos de factoring</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li><strong>Con recurso:</strong> si el cliente final no paga, el banco te lo reclama a ti. M�s barato (2-3%) pero asumes el riesgo.</li>
            <li><strong>Sin recurso:</strong> el banco asume el riesgo de impago. M�s caro (4-6%) pero te liberas del cliente moroso.</li>
            <li><strong>Confirming:</strong> es el factoring inverso. Lo activa tu cliente para pagarte antes a cambio de un descuento.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Comparativa cara a cara</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20">
                  <th className="py-3 px-4 text-left text-zinc-100">Aspecto</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Factoring</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Recordatorios (Saldea)</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">�Cobras hoy?</td><td className="py-2 px-4">? S�</td><td className="py-2 px-4">? No, cuando pague el cliente</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Coste</td><td className="py-2 px-4">3-6% del importe</td><td className="py-2 px-4">49�/mes total fijo</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">�Cubre impago?</td><td className="py-2 px-4">Solo "sin recurso"</td><td className="py-2 px-4">No</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">�Qui�n contacta al cliente?</td><td className="py-2 px-4">El banco</td><td className="py-2 px-4">Saldea con tu identidad</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">M�nimo facturaci�n</td><td className="py-2 px-4">Suele exigir 100k+�/a�o</td><td className="py-2 px-4">Sin m�nimo</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Para aut�nomos</td><td className="py-2 px-4">Dif�cil, suele rechazar</td><td className="py-2 px-4">Pensado para ellos</td></tr>
                <tr><td className="py-2 px-4">Impacto en relaci�n cliente</td><td className="py-2 px-4">Alto (interviene banco)</td><td className="py-2 px-4">Bajo (parece tuyo)</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Ejemplo num�rico</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Tienes 10 facturas pendientes de 1.000� cada una. Vencen a 60 d�as.</p>

          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-4">
            <p className="text-zinc-200 mb-2"><strong>Opci�n A: Factoring (sin recurso, 5%)</strong></p>
            <p className="text-zinc-400 text-sm">Recibes: 10 � 1.000 � 0,95 = <strong>9.500� hoy</strong></p>
            <p className="text-zinc-400 text-sm">Coste total: <strong>500�</strong></p>
          </div>

          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-4">
            <p className="text-zinc-200 mb-2"><strong>Opci�n B: Recordatorios (Saldea)</strong></p>
            <p className="text-zinc-400 text-sm">Recibes: 10 � 1.000 = <strong>10.000� a 60-75 d�as</strong></p>
            <p className="text-zinc-400 text-sm">Coste total: <strong>49�</strong></p>
            <p className="text-zinc-400 text-sm">Si alg�n cliente no paga, tienes que reclamar t�.</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cu�ndo conviene factoring</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Necesitas <strong>liquidez ya</strong>, no puedes esperar 60 d�as.</li>
            <li>? Trabajas con <strong>clientes grandes</strong> y solventes (Inditex, Mercadona, etc.).</li>
            <li>? Tu margen es alto y puedes asumir el 3-5% de comisi�n.</li>
            <li>? Facturas m�s de 100.000� al a�o.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cu�ndo conviene Saldea / recordatorios</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Tu problema NO es liquidez sino que <strong>los clientes pagan tarde</strong>.</li>
            <li>? Quieres mantener el control del cobro y la relaci�n cliente.</li>
            <li>? Eres aut�nomo o pyme y el factoring te rechaza o es muy caro.</li>
            <li>? Tu margen es ajustado y no puedes regalar un 5% por factura.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">�Y combinar ambos?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Es posible: <strong>factoring solo para tus 2-3 clientes grandes</strong> (donde el 3% te sale rentable porque el importe es alto) y <strong>recordatorios autom�ticos para los 20-30 clientes peque�os</strong> (donde el factoring no llegar�a).</p>
        </section>

        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Prueba Saldea antes de pagar por factoring</h3>
          <p className="text-zinc-300 mb-5">A veces tus cobros tardan porque tus clientes est�n "dormidos", no porque sea imposible cobrarles. Un recordatorio autom�tico puede solucionar el 70% de tus retrasos sin pagar comisiones. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

