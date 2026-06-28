import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'C�mo cobrar a clientes como dise�ador o freelance creativo | Marsof',
  description: 'Estrategias espec�ficas para dise�adores, ilustradores y creativos. Cl�usula de propiedad intelectual, anticipos y archivos fuente.',
  alternates: { canonical: 'https://www.marsof.es/blog/cobrar-disenador-creativo' },
  keywords: ['cobrar dise�ador freelance', 'cobrar dise�o gr�fico', 'cobrar ilustrador', 'cobrar trabajo creativo'],
  openGraph: { title: 'C�mo cobrar como dise�ador creativo', description: 'Estrategias y cl�usulas.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "C�mo cobrar a clientes como dise�ador o freelance creativo", "description": "Estrategias espec�ficas para dise�adores, ilustradores y creativos. Cl�usula de propiedad intelectual, anticipos y archivos fuente.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/cobrar-disenador-creativo"}

export default function Page() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Sector � 4 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">C�mo cobrar como dise�ador o freelance creativo</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">El sector creativo es vulnerable a impagos. Pero tienes un arma �nica: la propiedad intelectual.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Tu arma secreta: la propiedad intelectual</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">En Espa�a, la propiedad intelectual de tu trabajo es tuya HASTA que cobras. Esto te da un poder enorme.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cl�usula cr�tica en presupuesto</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-4 text-sm">
            <p className="text-zinc-300 whitespace-pre-line">
{`PROPIEDAD INTELECTUAL Y CESI�N DE DERECHOS:

La cesi�n de los derechos de explotaci�n y uso comercial
del trabajo entregado se efect�a �NICAMENTE tras el pago
�ntegro del importe acordado.

Hasta el pago completo, el trabajo se entrega bajo licencia
limitada de revisi�n interna, prohibiendo su uso comercial,
publicaci�n, modificaci�n o cesi�n a terceros.

El uso no autorizado constituye infracci�n de los derechos
de propiedad intelectual (Real Decreto Legislativo 1/1996),
con las consecuencias legales correspondientes.`}
            </p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Entrega en fases</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>1?? <strong>Borradores en PDF con marca de agua</strong> hasta 1er hito de pago</li>
            <li>2?? <strong>Versi�n preview sin archivos fuente</strong> hasta 2� hito</li>
            <li>3?? <strong>Archivos fuente y derechos de explotaci�n</strong> SOLO tras pago completo</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Si lo est� usando sin pagar</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Es agravante. Manda burofax:</p>
          <div className="bg-zinc-900/40 border-l-4 border-rose-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"He detectado que est�s usando comercialmente el material entregado sin haber completado el pago. Esto constituye infracci�n de propiedad intelectual seg�n RDL 1/1996. Te requiero al pago �ntegro de [importe] en 7 d�as, o proceder� a denuncia por uso indebido + reclamaci�n civil."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Estructura de precios t�pica</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? 30% al firmar presupuesto (reserva de fecha)</li>
            <li>? 30% a la entrega de borradores aprobados</li>
            <li>? 40% a la entrega final con cesi�n de derechos</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plataformas de cobro creativo</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>Stripe Connect:</strong> link de pago en cada entrega</li>
            <li>? <strong>Cuenta aut�nomo dedicada:</strong> separar lo creativo del resto</li>
            <li>? <strong>Portal cliente con contrase�a:</strong> archivos bloqueados hasta cobro</li>
          </ul>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea persigue tus cobros creativos</h3>
          <p className="text-zinc-300 mb-5">Mientras t� creas, Saldea reclama. Recordatorios profesionales con tu marca personal. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

