import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Modelo contrato prestaci�n de servicios aut�nomo (gratis 2026) | Marsof',
  description: 'Plantilla gratis de contrato de prestaci�n de servicios para aut�nomos en Espa�a. Cl�usulas antimorosos, Ley 3/2004 y protecci�n legal. Listo para usar.',
  alternates: { canonical: 'https://www.marsof.es/blog/contrato-prestacion-servicios-autonomo' },
  keywords: [
    'contrato prestacion servicios autonomo',
    'modelo contrato autonomo word',
    'plantilla contrato freelance',
    'clausulas antimorosos contrato',
    'contrato servicios profesionales',
    'contrato cliente autonomo',
  ],
  openGraph: {
    title: 'Modelo contrato prestaci�n de servicios aut�nomo',
    description: 'Plantilla gratis con cl�usulas antimorosos.',
    type: 'article',
    locale: 'es_ES',
  },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "Modelo contrato prestaci�n de servicios aut�nomo (gratis 2026)", "description": "Plantilla gratis de contrato de prestaci�n de servicios para aut�nomos en Espa�a. Cl�usulas antimorosos, Ley 3/2004 y protecci�n legal. Listo para usar.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/contrato-prestacion-servicios-autonomo"}

export default function PageContrato() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Plantilla legal � 11 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Modelo de contrato de prestaci�n de servicios para aut�nomos</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Plantilla completa con cl�usulas antimorosos, intereses de demora y protecci�n legal. Adaptada a la Ley 3/2004 y al RGPD.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Por qu� firmar contrato siempre</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Hay aut�nomos que trabajan por <strong>presupuesto firmado</strong> o por <strong>email aceptado</strong>. Es v�lido legalmente pero es prueba d�bil. Un contrato firmado por ambas partes te da fuerza probatoria much�simo mayor en cualquier reclamaci�n.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plantilla completa (copia y adapta)</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 my-5 text-sm">
            <p className="text-zinc-300 whitespace-pre-line">
{`CONTRATO DE PRESTACI�N DE SERVICIOS PROFESIONALES

En [Lugar], a [Fecha]

REUNIDOS

DE UNA PARTE,
D./D�a. [Tu nombre completo], con DNI [Tu DNI], domicilio en [Tu direcci�n], en adelante "EL PROFESIONAL".

DE OTRA PARTE,
[Raz�n social del cliente], con CIF [CIF cliente], representada por D./D�a. [Nombre representante] con DNI [DNI], domicilio en [Direcci�n], en adelante "EL CLIENTE".

Ambas partes se reconocen mutuamente capacidad legal suficiente para contratar y obligarse, y en su virtud,

EXPONEN

I. Que EL PROFESIONAL es aut�nomo profesional dedicado a [Tu actividad].
II. Que EL CLIENTE precisa de los servicios profesionales descritos en la cl�usula primera.
III. Que ambas partes acuerdan formalizar el presente contrato bajo las siguientes:

CL�USULAS

PRIMERA - OBJETO
EL PROFESIONAL prestar� a EL CLIENTE los siguientes servicios:
[Descripci�n detallada de los servicios]

SEGUNDA - PRECIO Y FORMA DE PAGO
2.1. El precio total de los servicios es de [IMPORTE]� (IVA NO incluido).
2.2. Forma de pago:
   - Anticipo del 30% a la firma: [IMPORTE]�
   - Resto: a 30 d�as desde la entrega/finalizaci�n
2.3. El pago se realizar� mediante transferencia bancaria a la cuenta IBAN [TU IBAN].

TERCERA - PLAZOS
3.1. EL PROFESIONAL entregar� el trabajo en [PLAZO].
3.2. EL CLIENTE dispone de 7 d�as naturales desde la entrega para comunicar cualquier disconformidad. Pasado dicho plazo, se entender� aceptado.

CUARTA - INTERESES DE DEMORA Y MOROSIDAD
4.1. En caso de impago en los plazos pactados, se aplicar�n autom�ticamente los intereses de demora previstos en la Ley 3/2004 (tipo BCE + 8 puntos porcentuales).
4.2. Adicionalmente, EL CLIENTE deber� abonar la indemnizaci�n fija de 40� por costes de cobro, seg�n el art�culo 8 de la misma ley.
4.3. EL CLIENTE asumir� los costes adicionales de cobro (cartas certificadas, burofax, abogados) si los hubiera.

QUINTA - SUSPENSI�N POR IMPAGO
5.1. EL PROFESIONAL se reserva el derecho a suspender los servicios contratados si EL CLIENTE acumula m�s de 15 d�as naturales de retraso en cualquier pago.
5.2. La suspensi�n no exime a EL CLIENTE del pago de los servicios pendientes.

SEXTA - CONFIDENCIALIDAD
Ambas partes se obligan a guardar absoluta confidencialidad sobre la informaci�n intercambiada durante la prestaci�n del servicio.

S�PTIMA - PROTECCI�N DE DATOS (RGPD)
Los datos personales facilitados se tratar�n conforme al Reglamento (UE) 2016/679 (RGPD) y la LOPDGDD 3/2018. Finalidad: gesti�n del presente contrato. Conservaci�n: durante la relaci�n contractual y 6 a�os por obligaciones fiscales. Derechos: acceso, rectificaci�n, supresi�n, oposici�n, portabilidad y limitaci�n.

OCTAVA - DURACI�N Y RESOLUCI�N
8.1. El presente contrato tendr� vigencia desde la firma hasta la entrega del trabajo.
8.2. Cualquiera de las partes podr� resolverlo por incumplimiento grave de la otra, previo requerimiento escrito.

NOVENA - JURISDICCI�N
Para cualquier controversia, ambas partes se someten a los Juzgados y Tribunales de [Tu provincia], renunciando al fuero propio.

Y para que conste, firman ambas partes el presente contrato por duplicado a un solo efecto.

EL PROFESIONAL                          EL CLIENTE

_____________                          _____________
[Tu nombre]                             [Nombre cliente]`}
            </p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Por qu� cada cl�usula importa</h2>
          <ul className="space-y-3 text-zinc-300 mb-6">
            <li><strong>Cl�usula 2.2 (anticipo):</strong> filtra clientes no serios y te da liquidez para empezar.</li>
            <li><strong>Cl�usula 3.2 (aceptaci�n t�cita):</strong> evita que el cliente discuta el trabajo meses despu�s para no pagar.</li>
            <li><strong>Cl�usula 4 (intereses):</strong> aunque la ley te ampara, ponerlo expreso disuade impagos.</li>
            <li><strong>Cl�usula 5 (suspensi�n):</strong> te permite dejar de trabajar sin que te demanden por incumplimiento.</li>
            <li><strong>Cl�usula 9 (jurisdicci�n):</strong> obliga al cliente a ir a tu provincia si te demanda, no a la suya.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">C�mo firmarlo digitalmente</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Para que el contrato firmado tenga validez plena, puedes usar:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>Signaturit</strong> - 15�/mes, f�cil y legal en Espa�a</li>
            <li>? <strong>SignNow</strong> - desde 9�/mes</li>
            <li>? <strong>DocuSign</strong> - 10�/mes</li>
            <li>? <strong>Firma con certificado digital + Adobe Reader</strong> - gratis</li>
          </ul>
        </section>

        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Cuando firmes este contrato, conecta Saldea</h3>
          <p className="text-zinc-300 mb-5">Importa la factura del proyecto. Si tu cliente no paga en 30 d�as, Saldea le manda recordatorios con la Ley 3/2004 que t� ya pactaste. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-zinc-500">Plantilla orientativa. Para casos espec�ficos consulta con un abogado.</p>
        </div>
      </div>
    </article>
    </>
  )
}

