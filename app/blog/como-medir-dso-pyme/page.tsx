import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'C�mo medir el DSO (Days Sales Outstanding) en una pyme | Marsof',
  description: 'C�lculo paso a paso del DSO, valores ideales por sector y c�mo reducirlo. El KPI que separa pymes solventes de pymes en problemas.',
  alternates: { canonical: 'https://www.marsof.es/blog/como-medir-dso-pyme' },
  keywords: ['DSO pyme', 'days sales outstanding', 'medir DSO', 'KPI cobros', 'periodo medio cobro', 'reducir DSO'],
  openGraph: { title: 'C�mo medir el DSO de tu pyme', description: 'El KPI clave de tesorer�a.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "C�mo medir el DSO (Days Sales Outstanding) en una pyme", "description": "C�lculo paso a paso del DSO, valores ideales por sector y c�mo reducirlo. El KPI que separa pymes solventes de pymes en problemas.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/como-medir-dso-pyme"}

export default function PageDSO() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Finanzas � 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">C�mo medir el DSO de tu pyme</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">El DSO (Days Sales Outstanding) o Periodo Medio de Cobro es el KPI m�s importante de tesorer�a que casi nadie mide. Te ense�o c�mo en 5 minutos.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">�Qu� es el DSO?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">El <strong>DSO</strong> mide el n�mero promedio de d�as que tu empresa tarda en cobrar una factura. Cuanto m�s bajo, m�s r�pido entra el dinero en caja.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">F�rmula</h2>
          <div className="bg-sky-500/5 border border-sky-500/30 rounded-xl p-5 my-5 text-center">
            <p className="text-xl font-bold text-zinc-100">DSO = (Cuentas a cobrar / Ventas) � D�as del periodo</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Ejemplo</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
            <p className="text-zinc-300 mb-2"><strong>Datos del trimestre:</strong></p>
            <ul className="text-zinc-400 text-sm space-y-1">
              <li>Cuentas a cobrar al cierre: 45.000�</li>
              <li>Ventas del trimestre: 150.000�</li>
              <li>D�as del periodo: 90</li>
            </ul>
            <p className="text-sky-400 mt-3"><strong>DSO = (45.000 / 150.000) � 90 = 27 d�as</strong></p>
            <p className="text-zinc-400 text-xs mt-2">Tus clientes te pagan en promedio a 27 d�as.</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Valores ideales por sector</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-sky-500/20"><th className="py-3 px-4 text-left text-zinc-100">Sector</th><th className="py-3 px-4 text-left text-zinc-100">DSO bueno</th><th className="py-3 px-4 text-left text-zinc-100">DSO peligro</th></tr></thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">B2C / Ecommerce</td><td className="py-2 px-4">&lt;7 d�as</td><td className="py-2 px-4">&gt;30</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Servicios B2B</td><td className="py-2 px-4">30-45 d�as</td><td className="py-2 px-4">&gt;60</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Industria B2B</td><td className="py-2 px-4">45-60 d�as</td><td className="py-2 px-4">&gt;90</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Construcci�n</td><td className="py-2 px-4">60-90 d�as</td><td className="py-2 px-4">&gt;120</td></tr>
                <tr><td className="py-2 px-4">Administraci�n p�blica</td><td className="py-2 px-4">90-150 d�as</td><td className="py-2 px-4">&gt;180</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El impacto real de reducir DSO</h2>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Ejemplo:</strong> empresa con 1.000.000� de ventas/a�o y DSO de 75 d�as.</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>Capital atrapado en cuentas a cobrar: <strong>205.479�</strong> (1.000.000 � 75/365)</li>
            <li>Si bajas a 45 d�as DSO: <strong>123.287�</strong> atrapado</li>
            <li><strong>Liberas 82.192�</strong> de capital sin pedir pr�stamos</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Ese dinero te permite pagar proveedores, invertir, contratar o simplemente respirar.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">C�mo reducir tu DSO</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>Factura el mismo d�a</strong> que prestas el servicio</li>
            <li><strong>Recordatorios autom�ticos</strong> 3 d�as antes del vencimiento</li>
            <li><strong>Domiciliaci�n SEPA</strong> para recurrentes</li>
            <li><strong>Descuentos por pronto pago</strong> 2-3% (con cuidado, no es regalo)</li>
            <li><strong>Pol�tica de cr�dito</strong> documentada</li>
            <li><strong>Recordatorios escalados</strong> con IA cuando vencen</li>
            <li><strong>Burofax sistem�tico</strong> a los 60 d�as</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">C�mo mide tu DSO Saldea</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">En el panel de Saldea ver�s tu DSO en tiempo real, comparado con el del mes anterior y con la media de tu sector. Sin que tengas que calcular nada.</p>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Mide y reduce tu DSO con Saldea</h3>
          <p className="text-zinc-300 mb-5">Dashboard con DSO autom�tico + recordatorios escalados que lo reducen. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

