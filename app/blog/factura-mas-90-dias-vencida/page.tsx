import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Factura con m�s de 90 d�as vencida: plan de recuperaci�n | Marsof',
  description: 'Tu factura lleva 3+ meses vencida. Plan de acci�n inmediato: documentaci�n, burofax, monitorio y cu�ndo soltar.',
  alternates: { canonical: 'https://www.marsof.es/blog/factura-mas-90-dias-vencida' },
  keywords: ['factura 90 d�as vencida', 'factura 3 meses', 'cobrar factura antigua', 'recuperar factura vieja'],
  openGraph: { title: 'Factura con m�s de 90 d�as vencida', description: 'Plan de recuperaci�n.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "Factura con m�s de 90 d�as vencida: plan de recuperaci�n", "description": "Tu factura lleva 3+ meses vencida. Plan de acci�n inmediato: documentaci�n, burofax, monitorio y cu�ndo soltar.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/factura-mas-90-dias-vencida"}

export default function Page() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso espec�fico � 4 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Factura con m�s de 90 d�as vencida</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Probabilidad de cobro a estas alturas: 40-60%. Pero hay un plan claro para maximizarlo.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Diagn�stico previo</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">A 90 d�as, las opciones se reducen pero existen. Lo primero:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>?? �La empresa sigue activa? (BORME, eInforma)</li>
            <li>?? �Hay otras facturas suyas en proceso de pago?</li>
            <li>?? �Es un patr�n habitual o algo nuevo?</li>
            <li>?? �Tienes documentaci�n impecable de la entrega?</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plan de los pr�ximos 30 d�as</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">D�a 1: comunicaci�n formal con cifras</h3>
          <div className="bg-zinc-900/40 border-l-4 border-amber-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Factura [X] lleva 90 d�as vencida. Importe actual con intereses Ley 3/2004 e indemnizaci�n: [SUMA]�. Te concedo 7 d�as naturales para regularizar. Pasado este plazo: burofax y monitorio."</p>
          </div>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">D�a 5-7: llamada presencial o telef�nica seria</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">No conversaci�n amistosa. Tono profesional y directo. Apunta lo que diga.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">D�a 10: burofax</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Con c�lculo de intereses + 40� + amenaza de monitorio. Coste: 35�.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">D�a 25: procedimiento monitorio</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Si no hay respuesta al burofax. Sin abogado si la deuda es &lt;2.000�. Coste: 0�.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Documentaci�n que necesitas YA</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>?? Factura original</li>
            <li>?? Presupuesto / contrato firmado</li>
            <li>?? Emails de comunicaci�n (todos)</li>
            <li>?? Albar�n o prueba de entrega</li>
            <li>?? Movimientos bancarios (si cobraste algo antes)</li>
            <li>?? Registro de llamadas (apuntar fechas)</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cu�ndo aceptar descuento</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">A 90 d�as, aceptar 70-80% del importe original puede ser razonable si:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Cliente con problemas reales de liquidez</li>
            <li>? Pago inmediato (no m�s promesas)</li>
            <li>? Por escrito y firmado</li>
            <li>? El monitorio te costar�a m�s en tiempo que el descuento</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cu�ndo soltar</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Empresa en concurso sin activos</li>
            <li>? Cliente desaparecido sin localizar</li>
            <li>? Deuda &lt; 200� y empresa con sede en otra provincia</li>
          </ul>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea genera el plan autom�ticamente</h3>
          <p className="text-zinc-300 mb-5">Carga la factura, indica fecha vencimiento. Saldea calcula intereses, genera email formal y burofax. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

