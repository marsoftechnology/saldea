import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ratio de liquidez para pymes: c�mo calcularlo y mejorarlo | Marsof',
  description: 'Qu� es el ratio de liquidez, f�rmula, valores ideales en Espa�a y c�mo mejorarlo cobrando antes. Gu�a pr�ctica para pymes y aut�nomos.',
  alternates: { canonical: 'https://www.marsof.es/blog/ratio-liquidez-pyme-2026' },
  keywords: ['ratio liquidez', 'ratio liquidez pyme', 'calcular liquidez', 'ratio tesoreria', 'salud financiera pyme'],
  openGraph: { title: 'Ratio de liquidez para pymes', description: 'F�rmula, valores ideales y mejora.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "Ratio de liquidez para pymes: c�mo calcularlo y mejorarlo", "description": "Qu� es el ratio de liquidez, f�rmula, valores ideales en Espa�a y c�mo mejorarlo cobrando antes. Gu�a pr�ctica para pymes y aut�nomos.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/ratio-liquidez-pyme-2026"}

export default function PageLiquidez() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Finanzas � 7 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Ratio de liquidez para pymes</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">El indicador que te dice si tu empresa puede pagar sus deudas a corto plazo. Si no lo mides, vas a ciegas.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">�Qu� es el ratio de liquidez?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">El <strong>ratio de liquidez</strong> mide la capacidad de tu empresa para hacer frente a sus deudas a corto plazo (las que vencen en menos de un a�o) con los recursos que tiene tambi�n a corto plazo.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">F�rmula</h2>
          <div className="bg-sky-500/5 border border-sky-500/30 rounded-xl p-5 my-5 text-center">
            <p className="text-xl font-bold text-zinc-100">Ratio liquidez = Activo corriente / Pasivo corriente</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">�Qu� incluye cada t�rmino?</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li><strong>Activo corriente:</strong> caja, cuentas a cobrar (facturas pendientes), inventario, inversiones a corto plazo.</li>
            <li><strong>Pasivo corriente:</strong> deudas a proveedores, impuestos a pagar, sueldos pendientes, pr�stamos a corto plazo.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Valores ideales</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20">
                  <th className="py-3 px-4 text-left text-zinc-100">Ratio</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Diagn�stico</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">&lt; 1</td><td className="py-2 px-4">?? Peligro: no puedes pagar a corto plazo</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">1 - 1,5</td><td className="py-2 px-4">?? Tenso: justos para pagar todo</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">1,5 - 2</td><td className="py-2 px-4">?? Saludable</td></tr>
                <tr><td className="py-2 px-4">&gt; 2</td><td className="py-2 px-4">?? Excesivo (capital ocioso)</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Ejemplo pr�ctico</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
            <p className="text-zinc-300 mb-2"><strong>Caso 1 � Empresa con problemas:</strong></p>
            <p className="text-zinc-400 text-sm">Activo corriente: 50.000� (de los cuales 35.000� son facturas vencidas pendientes)</p>
            <p className="text-zinc-400 text-sm">Pasivo corriente: 60.000�</p>
            <p className="text-sky-400 text-sm mt-2"><strong>Ratio: 0,83 ? PELIGRO</strong></p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El "ratio �cido" o quick ratio</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Variante m�s exigente que excluye el inventario (porque no siempre se puede vender r�pido):</p>
          <div className="bg-sky-500/5 border border-sky-500/30 rounded-xl p-5 my-5 text-center">
            <p className="text-lg font-bold text-zinc-100">Ratio �cido = (Activo corriente - Inventario) / Pasivo corriente</p>
          </div>
          <p className="text-zinc-300 leading-relaxed mb-4">Idealmente debe ser = 1. Si tu ratio normal es 1,5 pero el �cido es 0,6, tienes demasiado capital atrapado en inventario.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">C�mo mejorar tu ratio de liquidez</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>Cobra m�s r�pido tus facturas</strong> ? bajar el DSO (d�as promedio cobro)</li>
            <li><strong>Negocia plazos m�s largos con proveedores</strong> ? subir el DPO (d�as promedio pago)</li>
            <li><strong>Reduce inventario inmovilizado</strong> ? vender stock antiguo aunque sea con descuento</li>
            <li><strong>Factoring puntual</strong> para facturas grandes que tardan mucho</li>
            <li><strong>Anticipos a clientes nuevos</strong> ? no esperes a entregar para cobrar 100%</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El impacto real de cobrar 30 d�as antes</h2>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Ejemplo:</strong> empresa con 200.000� de facturas anuales y DSO de 75 d�as. Si baja el DSO a 45 d�as (cobra 30 d�as antes), libera <strong>~16.500� de capital</strong> que estaba atrapado en cuentas a cobrar. Eso mejora el ratio de liquidez autom�ticamente.</p>
        </section>

        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea mejora tu ratio de liquidez</h3>
          <p className="text-zinc-300 mb-5">Cobrando 20-30 d�as antes con recordatorios autom�ticos, mejoras tu ratio sin pedir pr�stamos ni hacer factoring. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

