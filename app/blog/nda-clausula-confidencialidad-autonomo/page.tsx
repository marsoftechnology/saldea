import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NDA y cláusula de confidencialidad para autónomos | Marsof',
  description: 'Plantilla gratis de NDA (acuerdo confidencialidad) para autónomos y consultores en España. Cuándo usarlo, qué incluir y errores típicos.',
  alternates: { canonical: 'https://www.marsof.es/blog/nda-clausula-confidencialidad-autonomo' },
  keywords: ['NDA autónomo', 'acuerdo confidencialidad', 'cláusula confidencialidad', 'modelo NDA España', 'confidencialidad freelance'],
  openGraph: { title: 'NDA y confidencialidad para autónomos', description: 'Plantilla gratis y guía.', type: 'article', locale: 'es_ES' },
}

export default function PageNDA() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Plantilla legal · 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">NDA y cláusula de confidencialidad para autónomos</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Si trabajas con datos sensibles de clientes (estrategia, código, finanzas), un NDA o cláusula de confidencialidad te protege. Y a veces te lo exigen para empezar.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Qué es un NDA?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Un <strong>NDA (Non-Disclosure Agreement)</strong> o acuerdo de confidencialidad es un contrato por el que ambas partes se obligan a no revelar información sensible compartida durante la relación profesional.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Necesitas firmar uno como autónomo?</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>Sí, si:</strong> manejas información estratégica, financiera, código fuente, datos de clientes finales, fórmulas, procesos</li>
            <li>? <strong>Sí, si:</strong> trabajas con empresas grandes (te lo van a exigir)</li>
            <li>? <strong>Sí, si:</strong> tu cliente quiere protegerse de competidores</li>
            <li>? <strong>NO, si:</strong> tu trabajo es público o no maneja info sensible (diseño visual estándar, traducción de textos públicos...)</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Tipos de NDA</h2>
          <ul className="space-y-3 text-zinc-300 mb-6">
            <li><strong>Unilateral:</strong> solo una parte (normalmente el cliente) revela info. Solo el receptor se obliga.</li>
            <li><strong>Bilateral / mutuo:</strong> ambas partes comparten info sensible. Recomendado entre profesionales.</li>
            <li><strong>Cláusula dentro de un contrato:</strong> en lugar de NDA independiente, va como apartado del contrato principal. Más cómodo.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plantilla básica de cláusula de confidencialidad</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5 text-sm">
            <p className="text-zinc-300 whitespace-pre-line">
{`CLÁUSULA DE CONFIDENCIALIDAD

Ambas partes reconocen que durante la ejecución del presente contrato pueden tener acceso a información confidencial de la otra parte, incluyendo pero no limitándose a: datos comerciales, financieros, técnicos, listas de clientes, estrategias, planes de negocio, código fuente, fórmulas, procesos y cualquier otra información marcada como confidencial o que por su naturaleza deba considerarse como tal.

Ambas partes se obligan a:

1. Mantener absoluta confidencialidad sobre dicha información, incluso tras la finalización de la relación contractual.

2. Utilizar la información exclusivamente para los fines del presente contrato.

3. No divulgar, copiar, reproducir ni ceder la información a terceros sin autorización expresa por escrito.

4. Adoptar medidas razonables de seguridad para proteger la información (cifrado, accesos limitados, etc.).

5. Devolver o destruir toda la información confidencial al término del contrato si así lo solicita la otra parte.

La obligación de confidencialidad tendrá una duración indefinida tras la finalización del contrato, salvo que la información pase a ser de dominio público por causas ajenas al obligado.

El incumplimiento de esta cláusula dará derecho a la parte afectada a reclamar daños y perjuicios, así como la cesación inmediata de la conducta infractora.`}
            </p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Errores típicos</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>NDA sin definir qué es "información confidencial":</strong> es nulo de facto</li>
            <li>? <strong>Plazo de confidencialidad indefinido para TODO:</strong> los jueces lo limitan a 3-5 años</li>
            <li>? <strong>NDA unilateral cuando tú también compartes info:</strong> firma bilateral</li>
            <li>? <strong>NDA con cláusula penal abusiva</strong> (100.000€ por divulgación): se aceptan multas, no extorsión</li>
            <li>? <strong>Firmar NDA sin leerlo:</strong> puede haber non-compete encubierto</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Si te exigen NDA antes de presupuesto</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">A veces el cliente exige NDA antes de contarte el proyecto. Lee atentamente: si solo te obliga a ti (unilateral) y aún no hay contrato, firma con cuidado. Asegúrate de que NO incluye non-compete (te impide trabajar con competidores).</p>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea trata tu información con la máxima confidencialidad</h3>
          <p className="text-zinc-300 mb-5">Datos cifrados en servidores europeos, sin compartir con terceros, RGPD completo. Si necesitas firmar NDA con nosotros, escríbenos a legal@marsof.es. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
  )
}

