import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Modelo de presupuesto para aut�nomos (plantilla gratis 2026) | Marsof',
  description: 'Plantilla de presupuesto profesional para aut�nomos. Estructura, qu� incluir, c�mo hacer que te lo aprueben antes y cl�usulas que evitan impagos.',
  alternates: { canonical: 'https://www.marsof.es/blog/modelo-presupuesto-autonomo' },
  keywords: [
    'modelo presupuesto autonomo',
    'plantilla presupuesto word',
    'como hacer presupuesto',
    'presupuesto freelance',
    'modelo presupuesto servicios',
  ],
  openGraph: {
    title: 'Modelo de presupuesto para aut�nomos',
    description: 'Plantilla gratis que blinda tus cobros.',
    type: 'article',
    locale: 'es_ES',
  },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "Modelo de presupuesto para aut�nomos (plantilla gratis 2026)", "description": "Plantilla de presupuesto profesional para aut�nomos. Estructura, qu� incluir, c�mo hacer que te lo aprueben antes y cl�usulas que evitan impagos.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/modelo-presupuesto-autonomo"}

export default function PageModeloPresupuesto() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Plantilla � 8 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Modelo de presupuesto para aut�nomos</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Un buen presupuesto evita el 70% de los problemas de cobro futuros. Te dejo la plantilla que uso y las cl�usulas clave que blindan tu trabajo.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">�Qu� debe llevar un presupuesto profesional?</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li>N�mero de presupuesto (correlativo)</li>
            <li>Fecha de emisi�n y validez</li>
            <li>Tus datos (nombre, NIF, direcci�n, contacto)</li>
            <li>Datos del cliente (raz�n social, CIF, contacto)</li>
            <li>Descripci�n detallada de los servicios o productos</li>
            <li>Plazo de entrega</li>
            <li>Precio desglosado con IVA</li>
            <li>Forma de pago propuesta</li>
            <li>Cl�usulas de aceptaci�n, anticipo y aplazamiento</li>
            <li>Espacio para firma del cliente</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plantilla completa lista para copiar</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5 text-sm">
            <p className="text-zinc-300 whitespace-pre-line">
{`PRESUPUESTO N� [P-2026-001]
Fecha: [DD/MM/2026]
V�lido hasta: [DD/MM/2026 + 30 d�as]

EMITE:
[Tu nombre completo]
NIF: [Tu NIF]
Direcci�n: [Tu direcci�n]
Email: [tu@email.com]
Tel�fono: [Tu tel�fono]

DESTINATARIO:
[Raz�n social del cliente]
CIF: [CIF cliente]
Direcci�n: [Direcci�n]
Persona de contacto: [Nombre]
Email: [email contacto]

DESCRIPCI�N DE LOS SERVICIOS:

1. [Concepto detallado del servicio o producto]
   - Subtarea 1
   - Subtarea 2
   - Subtarea 3
   Precio: [IMPORTE]�

2. [Concepto 2]
   Precio: [IMPORTE]�

RESUMEN ECON�MICO:
Base imponible: [SUMA]�
IVA (21%): [IVA]�
TOTAL: [TOTAL]�

PLAZO DE ENTREGA:
[X] d�as laborables desde la firma del presupuesto y abono del anticipo.

FORMA DE PAGO:
- 30% en la firma del presupuesto: [IMPORTE]�
- 70% a la entrega del trabajo: [IMPORTE]�
- Transferencia bancaria a IBAN [TU IBAN]

CONDICIONES:
1. La aceptaci�n del presupuesto implica la conformidad
   con los t�rminos y condiciones aqu� descritos.

2. En caso de impago en los plazos pactados, se aplicar�n
   los intereses de demora previstos en la Ley 3/2004
   (tipo BCE + 8 puntos porcentuales) y la indemnizaci�n
   fija de 40� por costes de cobro.

3. Cualquier modificaci�n al alcance descrito implicar�
   una revisi�n del presupuesto.

4. El profesional se reserva el derecho a suspender el
   servicio si se acumulan m�s de 15 d�as naturales de
   retraso en cualquier pago.

5. Este presupuesto tiene una validez de 30 d�as naturales
   desde la fecha de emisi�n.

ACEPTACI�N DEL CLIENTE:

He le�do y acepto los t�rminos de este presupuesto.

Fecha: ___________________

Firma: ___________________

Nombre: ___________________

DNI/CIF: ___________________`}
            </p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Los 5 elementos que blindan tu cobro</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">1. Anticipo del 30-50%</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Es lo M�S importante. Filtra clientes no serios y te garantiza al menos parte del cobro.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">2. Cl�usula de Ley 3/2004 expresa</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Aunque la ley te ampara, mencionarla expresamente disuade impagos y refuerza tu posici�n si hay que reclamar.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">3. Cl�usula de suspensi�n por impago</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Te permite dejar de prestar el servicio sin que te demanden por incumplimiento. Imprescindible en proyectos largos.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">4. Validez limitada (30 d�as)</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Evita que un cliente acepte un presupuesto de hace 6 meses cuando los precios han subido. Te da control.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">5. Firma del cliente</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Un presupuesto NO firmado es dif�cil de defender. Un presupuesto firmado vale como contrato simplificado.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">C�mo enviar el presupuesto para que te lo firmen</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>PDF firmado digitalmente.</strong> Herramientas: Signaturit, DocuSign, SignNow (~15�/mes)</li>
            <li>? <strong>Email de env�o con resumen claro:</strong> tres bullets de lo que incluye, importe total y plazo</li>
            <li>? <strong>CTA claro:</strong> "Si te parece bien, f�rmamelo y empezamos cuanto antes"</li>
            <li>? <strong>Seguimiento a los 3 d�as:</strong> "Hola, �pudiste ver el presupuesto que te mand�?"</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Errores t�picos en presupuestos</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Olvidar el IVA</li>
            <li>? No pedir anticipo</li>
            <li>? No poner plazo de validez (presupuesto vivo eterno)</li>
            <li>? Olvidar cl�usula de modificaciones (alcance abierto = trabajo extra gratis)</li>
            <li>? Empezar a trabajar sin firma</li>
            <li>? Aceptar pagos a 90 d�as en el presupuesto (la ley es 60 d�as B2B)</li>
          </ul>
        </section>

        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Cuando el presupuesto pase a factura, conecta Saldea</h3>
          <p className="text-zinc-300 mb-5">Tu factura con todos los datos correctos + Saldea = cobros autom�ticos sin trabajo manual. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

