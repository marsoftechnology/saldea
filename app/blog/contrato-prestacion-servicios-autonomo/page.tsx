import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Modelo contrato prestación de servicios autónomo (gratis 2026) | Saldea',
  description: 'Plantilla gratis de contrato de prestación de servicios para autónomos en España. Cláusulas antimorosos, Ley 3/2004 y protección legal. Listo para usar.',
  alternates: { canonical: 'https://marsof.es/blog/contrato-prestacion-servicios-autonomo' },
  keywords: [
    'contrato prestacion servicios autonomo',
    'modelo contrato autonomo word',
    'plantilla contrato freelance',
    'clausulas antimorosos contrato',
    'contrato servicios profesionales',
    'contrato cliente autonomo',
  ],
  openGraph: {
    title: 'Modelo contrato prestación de servicios autónomo',
    description: 'Plantilla gratis con cláusulas antimorosos.',
    type: 'article',
    locale: 'es_ES',
  },
}

export default function PageContrato() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Plantilla legal · 11 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Modelo de contrato de prestación de servicios para autónomos</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Plantilla completa con cláusulas antimorosos, intereses de demora y protección legal. Adaptada a la Ley 3/2004 y al RGPD.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Por qué firmar contrato siempre</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Hay autónomos que trabajan por <strong>presupuesto firmado</strong> o por <strong>email aceptado</strong>. Es válido legalmente pero es prueba débil. Un contrato firmado por ambas partes te da fuerza probatoria muchísimo mayor en cualquier reclamación.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plantilla completa (copia y adapta)</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 my-5 text-sm">
            <p className="text-zinc-300 whitespace-pre-line">
{`CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES

En [Lugar], a [Fecha]

REUNIDOS

DE UNA PARTE,
D./Dña. [Tu nombre completo], con DNI [Tu DNI], domicilio en [Tu dirección], en adelante "EL PROFESIONAL".

DE OTRA PARTE,
[Razón social del cliente], con CIF [CIF cliente], representada por D./Dña. [Nombre representante] con DNI [DNI], domicilio en [Dirección], en adelante "EL CLIENTE".

Ambas partes se reconocen mutuamente capacidad legal suficiente para contratar y obligarse, y en su virtud,

EXPONEN

I. Que EL PROFESIONAL es autónomo profesional dedicado a [Tu actividad].
II. Que EL CLIENTE precisa de los servicios profesionales descritos en la cláusula primera.
III. Que ambas partes acuerdan formalizar el presente contrato bajo las siguientes:

CLÁUSULAS

PRIMERA - OBJETO
EL PROFESIONAL prestará a EL CLIENTE los siguientes servicios:
[Descripción detallada de los servicios]

SEGUNDA - PRECIO Y FORMA DE PAGO
2.1. El precio total de los servicios es de [IMPORTE]€ (IVA NO incluido).
2.2. Forma de pago:
   - Anticipo del 30% a la firma: [IMPORTE]€
   - Resto: a 30 días desde la entrega/finalización
2.3. El pago se realizará mediante transferencia bancaria a la cuenta IBAN [TU IBAN].

TERCERA - PLAZOS
3.1. EL PROFESIONAL entregará el trabajo en [PLAZO].
3.2. EL CLIENTE dispone de 7 días naturales desde la entrega para comunicar cualquier disconformidad. Pasado dicho plazo, se entenderá aceptado.

CUARTA - INTERESES DE DEMORA Y MOROSIDAD
4.1. En caso de impago en los plazos pactados, se aplicarán automáticamente los intereses de demora previstos en la Ley 3/2004 (tipo BCE + 8 puntos porcentuales).
4.2. Adicionalmente, EL CLIENTE deberá abonar la indemnización fija de 40€ por costes de cobro, según el artículo 8 de la misma ley.
4.3. EL CLIENTE asumirá los costes adicionales de cobro (cartas certificadas, burofax, abogados) si los hubiera.

QUINTA - SUSPENSIÓN POR IMPAGO
5.1. EL PROFESIONAL se reserva el derecho a suspender los servicios contratados si EL CLIENTE acumula más de 15 días naturales de retraso en cualquier pago.
5.2. La suspensión no exime a EL CLIENTE del pago de los servicios pendientes.

SEXTA - CONFIDENCIALIDAD
Ambas partes se obligan a guardar absoluta confidencialidad sobre la información intercambiada durante la prestación del servicio.

SÉPTIMA - PROTECCIÓN DE DATOS (RGPD)
Los datos personales facilitados se tratarán conforme al Reglamento (UE) 2016/679 (RGPD) y la LOPDGDD 3/2018. Finalidad: gestión del presente contrato. Conservación: durante la relación contractual y 6 años por obligaciones fiscales. Derechos: acceso, rectificación, supresión, oposición, portabilidad y limitación.

OCTAVA - DURACIÓN Y RESOLUCIÓN
8.1. El presente contrato tendrá vigencia desde la firma hasta la entrega del trabajo.
8.2. Cualquiera de las partes podrá resolverlo por incumplimiento grave de la otra, previo requerimiento escrito.

NOVENA - JURISDICCIÓN
Para cualquier controversia, ambas partes se someten a los Juzgados y Tribunales de [Tu provincia], renunciando al fuero propio.

Y para que conste, firman ambas partes el presente contrato por duplicado a un solo efecto.

EL PROFESIONAL                          EL CLIENTE

_____________                          _____________
[Tu nombre]                             [Nombre cliente]`}
            </p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Por qué cada cláusula importa</h2>
          <ul className="space-y-3 text-zinc-300 mb-6">
            <li><strong>Cláusula 2.2 (anticipo):</strong> filtra clientes no serios y te da liquidez para empezar.</li>
            <li><strong>Cláusula 3.2 (aceptación tácita):</strong> evita que el cliente discuta el trabajo meses después para no pagar.</li>
            <li><strong>Cláusula 4 (intereses):</strong> aunque la ley te ampara, ponerlo expreso disuade impagos.</li>
            <li><strong>Cláusula 5 (suspensión):</strong> te permite dejar de trabajar sin que te demanden por incumplimiento.</li>
            <li><strong>Cláusula 9 (jurisdicción):</strong> obliga al cliente a ir a tu provincia si te demanda, no a la suya.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cómo firmarlo digitalmente</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Para que el contrato firmado tenga validez plena, puedes usar:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ <strong>Signaturit</strong> - 15€/mes, fácil y legal en España</li>
            <li>✓ <strong>SignNow</strong> - desde 9€/mes</li>
            <li>✓ <strong>DocuSign</strong> - 10€/mes</li>
            <li>✓ <strong>Firma con certificado digital + Adobe Reader</strong> - gratis</li>
          </ul>
        </section>

        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Cuando firmes este contrato, conecta Saldea</h3>
          <p className="text-zinc-300 mb-5">Importa la factura del proyecto. Si tu cliente no paga en 30 días, Saldea le manda recordatorios con la Ley 3/2004 que tú ya pactaste. <strong>1 mes gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-zinc-500">Plantilla orientativa. Para casos específicos consulta con un abogado.</p>
        </div>
      </div>
    </article>
  )
}
