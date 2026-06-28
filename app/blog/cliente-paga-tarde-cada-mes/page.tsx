import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cliente que paga pero llega tarde cada mes: c�mo educarlo | Marsof',
  description: 'Tu cliente paga, pero siempre con 30-60 d�as de retraso. C�mo cambiar el patr�n sin perder el cliente.',
  alternates: { canonical: 'https://www.marsof.es/blog/cliente-paga-tarde-cada-mes' },
  keywords: ['cliente paga tarde', 'educar cliente pago tiempo', 'cliente retraso habitual', 'cambiar patr�n moroso'],
  openGraph: { title: 'Cliente que paga pero llega tarde cada mes', description: 'C�mo educarlo.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "Cliente que paga pero llega tarde cada mes: c�mo educarlo", "description": "Tu cliente paga, pero siempre con 30-60 d�as de retraso. C�mo cambiar el patr�n sin perder el cliente.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/cliente-paga-tarde-cada-mes"}

export default function Page() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso espec�fico � 4 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cliente que paga pero llega tarde cada mes</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Acaba pagando, pero siempre te toca perseguirlo. C�mo cambiar el patr�n.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">�Por qu� hace esto?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Tres razones t�picas:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>1. <strong>Pol�tica empresarial:</strong> en su empresa todos los proveedores cobran "cuando toca", no seg�n factura</li>
            <li>2. <strong>Olvido sistem�tico:</strong> no es agenda prioritaria</li>
            <li>3. <strong>"Te pago si me insistes":</strong> sabe que si insistes paga, as� que espera a tu insistencia</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Soluci�n 1 � Domiciliaci�n SEPA</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">La mejor para clientes recurrentes. Le pides firma de mandato SEPA. El cargo va autom�tico cada mes. Reduce la morosidad un 70%.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Soluci�n 2 � Recordatorio pre-vencimiento</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">3 d�as antes del vencimiento, email autom�tico:</p>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Hola [nombre], te aviso de que la factura [X] vence el [fecha]. �Todo OK?"</p>
          </div>
          <p className="text-zinc-300 leading-relaxed mb-4">Aumenta cobros a tiempo +30-40%.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Soluci�n 3 � Descuento por pronto pago</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">"Si pagas en los primeros 7 d�as: 2% descuento". Le incentivas. Muchos pagan al instante por ahorrarse algo.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Cuidado:</strong> s�lo si tu margen lo permite. No regales tu margen para "compensar" un pagador lento.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Soluci�n 4 � Sube el precio para compensar</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si paga 30 d�as tarde, esos 30 d�as te cuestan dinero (oportunidad). Sube el precio un 3-5% en pr�xima renovaci�n. Si protesta, dale opci�n de "precio inferior con domiciliaci�n SEPA".</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Soluci�n 5 � Conversaci�n franca</h2>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"[nombre], me gustar�a hablar contigo sobre las facturas. Hemos colaborado bien estos meses, pero el patr�n de pago retrasado me afecta. �Qu� podemos hacer para regularizarlo? Te ofrezco SEPA, descuento por pronto pago o cambio de plazos. Dime qu� te encaja mejor."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Si nada cambia el patr�n</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Decisi�n empresarial: �vale la pena este cliente? Calcula:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>+Margen bruto del cliente</li>
            <li>-Coste de horas perseguir</li>
            <li>-Coste oportunidad de los 30-60 d�as sin cobrar</li>
            <li>-Estr�s mensual</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Si el neto es bajo, libera espacio para otro cliente que pague mejor.</p>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea cambia el patr�n autom�ticamente</h3>
          <p className="text-zinc-300 mb-5">Recordatorio pre-vencimiento + recordatorio el d�a 1 + SEPA opcional. Tu cliente se acostumbra a pagar a tiempo sin esfuerzo por tu parte. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

