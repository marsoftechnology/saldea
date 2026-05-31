import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Modelo de presupuesto para autónomos (plantilla gratis 2026) | Saldea',
  description: 'Plantilla de presupuesto profesional para autónomos. Estructura, qué incluir, cómo hacer que te lo aprueben antes y cláusulas que evitan impagos.',
  alternates: { canonical: 'https://marsof.es/blog/modelo-presupuesto-autonomo' },
  keywords: [
    'modelo presupuesto autonomo',
    'plantilla presupuesto word',
    'como hacer presupuesto',
    'presupuesto freelance',
    'modelo presupuesto servicios',
  ],
  openGraph: {
    title: 'Modelo de presupuesto para autónomos',
    description: 'Plantilla gratis que blinda tus cobros.',
    type: 'article',
    locale: 'es_ES',
  },
}

export default function PageModeloPresupuesto() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Plantilla · 8 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Modelo de presupuesto para autónomos</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Un buen presupuesto evita el 70% de los problemas de cobro futuros. Te dejo la plantilla que uso y las cláusulas clave que blindan tu trabajo.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Qué debe llevar un presupuesto profesional?</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li>Número de presupuesto (correlativo)</li>
            <li>Fecha de emisión y validez</li>
            <li>Tus datos (nombre, NIF, dirección, contacto)</li>
            <li>Datos del cliente (razón social, CIF, contacto)</li>
            <li>Descripción detallada de los servicios o productos</li>
            <li>Plazo de entrega</li>
            <li>Precio desglosado con IVA</li>
            <li>Forma de pago propuesta</li>
            <li>Cláusulas de aceptación, anticipo y aplazamiento</li>
            <li>Espacio para firma del cliente</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plantilla completa lista para copiar</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5 text-sm">
            <p className="text-zinc-300 whitespace-pre-line">
{`PRESUPUESTO Nº [P-2026-001]
Fecha: [DD/MM/2026]
Válido hasta: [DD/MM/2026 + 30 días]

EMITE:
[Tu nombre completo]
NIF: [Tu NIF]
Dirección: [Tu dirección]
Email: [tu@email.com]
Teléfono: [Tu teléfono]

DESTINATARIO:
[Razón social del cliente]
CIF: [CIF cliente]
Dirección: [Dirección]
Persona de contacto: [Nombre]
Email: [email contacto]

DESCRIPCIÓN DE LOS SERVICIOS:

1. [Concepto detallado del servicio o producto]
   - Subtarea 1
   - Subtarea 2
   - Subtarea 3
   Precio: [IMPORTE]€

2. [Concepto 2]
   Precio: [IMPORTE]€

RESUMEN ECONÓMICO:
Base imponible: [SUMA]€
IVA (21%): [IVA]€
TOTAL: [TOTAL]€

PLAZO DE ENTREGA:
[X] días laborables desde la firma del presupuesto y abono del anticipo.

FORMA DE PAGO:
- 30% en la firma del presupuesto: [IMPORTE]€
- 70% a la entrega del trabajo: [IMPORTE]€
- Transferencia bancaria a IBAN [TU IBAN]

CONDICIONES:
1. La aceptación del presupuesto implica la conformidad
   con los términos y condiciones aquí descritos.

2. En caso de impago en los plazos pactados, se aplicarán
   los intereses de demora previstos en la Ley 3/2004
   (tipo BCE + 8 puntos porcentuales) y la indemnización
   fija de 40€ por costes de cobro.

3. Cualquier modificación al alcance descrito implicará
   una revisión del presupuesto.

4. El profesional se reserva el derecho a suspender el
   servicio si se acumulan más de 15 días naturales de
   retraso en cualquier pago.

5. Este presupuesto tiene una validez de 30 días naturales
   desde la fecha de emisión.

ACEPTACIÓN DEL CLIENTE:

He leído y acepto los términos de este presupuesto.

Fecha: ___________________

Firma: ___________________

Nombre: ___________________

DNI/CIF: ___________________`}
            </p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Los 5 elementos que blindan tu cobro</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">1. Anticipo del 30-50%</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Es lo MÁS importante. Filtra clientes no serios y te garantiza al menos parte del cobro.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">2. Cláusula de Ley 3/2004 expresa</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Aunque la ley te ampara, mencionarla expresamente disuade impagos y refuerza tu posición si hay que reclamar.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">3. Cláusula de suspensión por impago</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Te permite dejar de prestar el servicio sin que te demanden por incumplimiento. Imprescindible en proyectos largos.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">4. Validez limitada (30 días)</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Evita que un cliente acepte un presupuesto de hace 6 meses cuando los precios han subido. Te da control.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">5. Firma del cliente</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Un presupuesto NO firmado es difícil de defender. Un presupuesto firmado vale como contrato simplificado.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cómo enviar el presupuesto para que te lo firmen</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ <strong>PDF firmado digitalmente.</strong> Herramientas: Signaturit, DocuSign, SignNow (~15€/mes)</li>
            <li>✓ <strong>Email de envío con resumen claro:</strong> tres bullets de lo que incluye, importe total y plazo</li>
            <li>✓ <strong>CTA claro:</strong> "Si te parece bien, fírmamelo y empezamos cuanto antes"</li>
            <li>✓ <strong>Seguimiento a los 3 días:</strong> "Hola, ¿pudiste ver el presupuesto que te mandé?"</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Errores típicos en presupuestos</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>❌ Olvidar el IVA</li>
            <li>❌ No pedir anticipo</li>
            <li>❌ No poner plazo de validez (presupuesto vivo eterno)</li>
            <li>❌ Olvidar cláusula de modificaciones (alcance abierto = trabajo extra gratis)</li>
            <li>❌ Empezar a trabajar sin firma</li>
            <li>❌ Aceptar pagos a 90 días en el presupuesto (la ley es 60 días B2B)</li>
          </ul>
        </section>

        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Cuando el presupuesto pase a factura, conecta Saldea</h3>
          <p className="text-zinc-300 mb-5">Tu factura con todos los datos correctos + Saldea = cobros automáticos sin trabajo manual. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
