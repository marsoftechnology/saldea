import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NDA y cl�usula de confidencialidad para aut�nomos | Marsof',
  description: 'Plantilla gratis de NDA (acuerdo confidencialidad) para aut�nomos y consultores en Espa�a. Cu�ndo usarlo, qu� incluir y errores t�picos.',
  alternates: { canonical: 'https://www.marsof.es/blog/nda-clausula-confidencialidad-autonomo' },
  keywords: ['NDA aut�nomo', 'acuerdo confidencialidad', 'cl�usula confidencialidad', 'modelo NDA Espa�a', 'confidencialidad freelance'],
  openGraph: { title: 'NDA y confidencialidad para aut�nomos', description: 'Plantilla gratis y gu�a.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "NDA y cl�usula de confidencialidad para aut�nomos", "description": "Plantilla gratis de NDA (acuerdo confidencialidad) para aut�nomos y consultores en Espa�a. Cu�ndo usarlo, qu� incluir y errores t�picos.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/nda-clausula-confidencialidad-autonomo"}

export default function PageNDA() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Plantilla legal � 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">NDA y cl�usula de confidencialidad para aut�nomos</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Si trabajas con datos sensibles de clientes (estrategia, c�digo, finanzas), un NDA o cl�usula de confidencialidad te protege. Y a veces te lo exigen para empezar.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">�Qu� es un NDA?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Un <strong>NDA (Non-Disclosure Agreement)</strong> o acuerdo de confidencialidad es un contrato por el que ambas partes se obligan a no revelar informaci�n sensible compartida durante la relaci�n profesional.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">�Necesitas firmar uno como aut�nomo?</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>S�, si:</strong> manejas informaci�n estrat�gica, financiera, c�digo fuente, datos de clientes finales, f�rmulas, procesos</li>
            <li>? <strong>S�, si:</strong> trabajas con empresas grandes (te lo van a exigir)</li>
            <li>? <strong>S�, si:</strong> tu cliente quiere protegerse de competidores</li>
            <li>? <strong>NO, si:</strong> tu trabajo es p�blico o no maneja info sensible (dise�o visual est�ndar, traducci�n de textos p�blicos...)</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Tipos de NDA</h2>
          <ul className="space-y-3 text-zinc-300 mb-6">
            <li><strong>Unilateral:</strong> solo una parte (normalmente el cliente) revela info. Solo el receptor se obliga.</li>
            <li><strong>Bilateral / mutuo:</strong> ambas partes comparten info sensible. Recomendado entre profesionales.</li>
            <li><strong>Cl�usula dentro de un contrato:</strong> en lugar de NDA independiente, va como apartado del contrato principal. M�s c�modo.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plantilla b�sica de cl�usula de confidencialidad</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5 text-sm">
            <p className="text-zinc-300 whitespace-pre-line">
{`CL�USULA DE CONFIDENCIALIDAD

Ambas partes reconocen que durante la ejecuci�n del presente contrato pueden tener acceso a informaci�n confidencial de la otra parte, incluyendo pero no limit�ndose a: datos comerciales, financieros, t�cnicos, listas de clientes, estrategias, planes de negocio, c�digo fuente, f�rmulas, procesos y cualquier otra informaci�n marcada como confidencial o que por su naturaleza deba considerarse como tal.

Ambas partes se obligan a:

1. Mantener absoluta confidencialidad sobre dicha informaci�n, incluso tras la finalizaci�n de la relaci�n contractual.

2. Utilizar la informaci�n exclusivamente para los fines del presente contrato.

3. No divulgar, copiar, reproducir ni ceder la informaci�n a terceros sin autorizaci�n expresa por escrito.

4. Adoptar medidas razonables de seguridad para proteger la informaci�n (cifrado, accesos limitados, etc.).

5. Devolver o destruir toda la informaci�n confidencial al t�rmino del contrato si as� lo solicita la otra parte.

La obligaci�n de confidencialidad tendr� una duraci�n indefinida tras la finalizaci�n del contrato, salvo que la informaci�n pase a ser de dominio p�blico por causas ajenas al obligado.

El incumplimiento de esta cl�usula dar� derecho a la parte afectada a reclamar da�os y perjuicios, as� como la cesaci�n inmediata de la conducta infractora.`}
            </p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Errores t�picos</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>NDA sin definir qu� es "informaci�n confidencial":</strong> es nulo de facto</li>
            <li>? <strong>Plazo de confidencialidad indefinido para TODO:</strong> los jueces lo limitan a 3-5 a�os</li>
            <li>? <strong>NDA unilateral cuando t� tambi�n compartes info:</strong> firma bilateral</li>
            <li>? <strong>NDA con cl�usula penal abusiva</strong> (100.000� por divulgaci�n): se aceptan multas, no extorsi�n</li>
            <li>? <strong>Firmar NDA sin leerlo:</strong> puede haber non-compete encubierto</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Si te exigen NDA antes de presupuesto</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">A veces el cliente exige NDA antes de contarte el proyecto. Lee atentamente: si solo te obliga a ti (unilateral) y a�n no hay contrato, firma con cuidado. Aseg�rate de que NO incluye non-compete (te impide trabajar con competidores).</p>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea trata tu informaci�n con la m�xima confidencialidad</h3>
          <p className="text-zinc-300 mb-5">Datos cifrados en servidores europeos, sin compartir con terceros, RGPD completo. Si necesitas firmar NDA con nosotros, escr�benos a legal@marsof.es. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

