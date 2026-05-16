import Link from 'next/link'
import type { Metadata } from 'next'
import ThemeToggleNav from '../components/ThemeToggleNav'

export const metadata: Metadata = {
  title: 'Glosario de cobros, facturas y morosidad en España | Saldea',
  description: '60+ términos sobre cobros, facturación, morosidad e impagos explicados claramente. Diccionario completo para autónomos y empresas en España.',
  alternates: { canonical: 'https://marsof.es/glosario' },
  keywords: [
    'glosario cobros',
    'diccionario facturación',
    'términos morosidad',
    'vocabulario facturas',
    'definiciones cobros',
  ],
  openGraph: {
    title: 'Glosario completo de cobros y morosidad',
    description: '60+ términos explicados.',
    type: 'article',
    locale: 'es_ES',
  },
}

const terminos = [
  { t: 'Acreedor', d: 'Persona o empresa que tiene derecho a cobrar una deuda. En una factura impagada, eres tú.' },
  { t: 'Anticipo', d: 'Pago parcial realizado antes de la entrega del bien o servicio. Suele oscilar entre el 20% y el 50% del total.' },
  { t: 'ASNEF', d: 'Registro de morosos privado en España. Para inscribir a un deudor se requiere notificación previa documentada.' },
  { t: 'Aval', d: 'Garantía que una tercera persona ofrece para asegurar el cumplimiento de una obligación de pago.' },
  { t: 'Burofax', d: 'Envío postal con acuse de recibo y certificación de contenido. Da fe legal de lo enviado, ideal antes del procedimiento monitorio. Coste: 28-35€.' },
  { t: 'Cesión de crédito', d: 'Transferencia de un derecho de cobro a un tercero (factoring). Permite cobrar hoy una factura que vence dentro de meses, con descuento.' },
  { t: 'Cláusula penal', d: 'Cláusula contractual que establece una penalización económica por incumplimiento, generalmente por retraso en el pago.' },
  { t: 'CNAE', d: 'Clasificación Nacional de Actividades Económicas. Define la actividad principal de una empresa o autónomo.' },
  { t: 'Compensación de deudas', d: 'Extinción de obligaciones recíprocas hasta la cantidad concurrente cuando dos personas se deben dinero mutuamente.' },
  { t: 'Concurso de acreedores', d: 'Procedimiento legal para empresas insolventes. Si tu cliente entra en concurso, debes inscribir tu crédito como acreedor en plazo de 30 días.' },
  { t: 'Confirming', d: 'Servicio bancario por el que una empresa paga sus facturas mediante un banco que ofrece al proveedor adelantar el cobro.' },
  { t: 'Conformidad de factura', d: 'Aceptación expresa o tácita de la factura por parte del cliente. Marca el inicio del cómputo del plazo de pago en la Administración Pública.' },
  { t: 'Cuantía líquida', d: 'Importe determinado y exacto. Es uno de los requisitos para acceder al procedimiento monitorio.' },
  { t: 'Demanda monitoria', d: 'Demanda judicial simplificada para reclamar deudas dinerarias, líquidas, vencidas y exigibles. No requiere abogado si la cuantía es inferior a 2.000€.' },
  { t: 'Deuda exigible', d: 'Deuda vencida y que puede ser reclamada inmediatamente.' },
  { t: 'Deudor', d: 'Persona o empresa que debe pagar una deuda. En una factura impagada, es tu cliente.' },
  { t: 'Domiciliación SEPA', d: 'Sistema europeo de cobros automáticos por adeudo directo. Reduce la morosidad hasta un 70%.' },
  { t: 'Embargo', d: 'Medida judicial que retiene bienes o cuentas del deudor para asegurar el cobro de una deuda.' },
  { t: 'eInforma', d: 'Empresa que ofrece informes comerciales y financieros sobre empresas españolas. Útil para verificar la solvencia antes de trabajar con un cliente.' },
  { t: 'Endoso', d: 'Transmisión de un crédito o letra de cambio a un tercero mediante firma en el reverso.' },
  { t: 'Factura proforma', d: 'Documento previo a la factura definitiva. No tiene validez fiscal pero sí informativa. Útil como presupuesto formal.' },
  { t: 'Factura rectificativa', d: 'Factura que corrige una factura anterior emitida con errores. Se identifica con la palabra "rectificativa".' },
  { t: 'Factura recurrente', d: 'Factura periódica por servicios continuos (suscripciones, alquileres). Suele cobrarse mensual o anualmente.' },
  { t: 'Factura simplificada', d: 'Versión reducida de la factura, válida para importes inferiores a 400€ o ciertos sectores. Antes llamada "ticket".' },
  { t: 'Factoring', d: 'Servicio financiero que adelanta el cobro de las facturas a cambio de un descuento. Cubre el riesgo de impago.' },
  { t: 'Fondo de Garantía Salarial (FOGASA)', d: 'Organismo público que abona salarios e indemnizaciones a trabajadores cuando la empresa es insolvente.' },
  { t: 'IBAN', d: 'International Bank Account Number. Identificador único de cuenta bancaria en Europa.' },
  { t: 'Incumplimiento contractual', d: 'Falta de cumplimiento total o parcial de las obligaciones pactadas en un contrato.' },
  { t: 'Indemnización por costes de cobro', d: '40€ que la Ley 3/2004 reconoce automáticamente al acreedor por cada factura impagada.' },
  { t: 'Insolvencia', d: 'Incapacidad de una persona o empresa para hacer frente a sus deudas.' },
  { t: 'Intereses de demora', d: 'Compensación económica por el retraso en el pago. En operaciones B2B: tipo BCE + 8 puntos (~12,5% en 2026).' },
  { t: 'IVA', d: 'Impuesto sobre el Valor Añadido. En España: 21% general, 10% reducido, 4% superreducido.' },
  { t: 'Letra de cambio', d: 'Documento que obliga al librado a pagar una cantidad determinada en una fecha futura. Endosable.' },
  { t: 'Ley 3/2004', d: 'Ley contra la morosidad en operaciones comerciales. Regula plazos de pago, intereses de demora e indemnización.' },
  { t: 'Liquidez', d: 'Capacidad de una empresa para hacer frente a sus pagos a corto plazo.' },
  { t: 'Mora', d: 'Retraso en el cumplimiento de una obligación de pago. Genera intereses automáticamente.' },
  { t: 'Morosidad', d: 'Conducta repetida de retraso en los pagos. En España afecta a cerca del 25% de las facturas B2B.' },
  { t: 'Moroso', d: 'Cliente que paga sus facturas con retraso habitual o que tiene una deuda vencida sin pagar.' },
  { t: 'Notario', d: 'Funcionario público que da fe de actos y contratos. Necesario para protocolizar acuerdos de cobro complejos.' },
  { t: 'Pagaré', d: 'Documento privado por el que una persona se compromete a pagar una cantidad en una fecha determinada.' },
  { t: 'Pago a cuenta', d: 'Pago parcial que se imputa a una deuda mayor. Reduce el saldo pendiente.' },
  { t: 'Pago parcial', d: 'Abono de una parte del importe de una factura. No extingue la deuda hasta cubrir el total.' },
  { t: 'Plazo de pago', d: 'Tiempo máximo legal o pactado para pagar una factura. En B2B España: 60 días naturales.' },
  { t: 'Prescripción', d: 'Pérdida del derecho a reclamar por el transcurso del tiempo. Las deudas comerciales prescriben a los 5 años.' },
  { t: 'Procedimiento monitorio', d: 'Vía judicial rápida para reclamar deudas dinerarias. Sin abogado si la cuantía es inferior a 2.000€.' },
  { t: 'Promesa de pago', d: 'Compromiso del deudor de pagar en una fecha futura concreta. Útil para reorganizar la secuencia de reclamación.' },
  { t: 'RAI', d: 'Registro de Aceptaciones Impagadas. Registro de morosos de impagos en efectos comerciales.' },
  { t: 'Reclamación amistosa', d: 'Primera fase de cobro, sin acudir a vía judicial. Incluye emails, llamadas y burofax.' },
  { t: 'Recordatorio de pago', d: 'Comunicación enviada al deudor para recordarle una factura pendiente. Saldea automatiza este proceso.' },
  { t: 'Requerimiento de pago', d: 'Comunicación formal exigiendo el pago, normalmente por burofax o carta certificada. Marca el inicio de la fase judicial.' },
  { t: 'RGPD', d: 'Reglamento General de Protección de Datos europeo. Regula el tratamiento de datos personales.' },
  { t: 'Riesgo de crédito', d: 'Probabilidad de que un cliente no pague. Se evalúa mediante informes comerciales (eInforma, Axesor).' },
  { t: 'SEPA', d: 'Zona Única de Pagos en Euros. Sistema europeo unificado de transferencias y adeudos directos.' },
  { t: 'Stripe Connect', d: 'Solución de Stripe para plataformas SaaS que permite cobrar en nombre de terceros con cumplimiento KYC.' },
  { t: 'Suspensión del servicio', d: 'Interrupción temporal del servicio contratado por impago. Solo válida si el contrato lo permite expresamente.' },
  { t: 'Tasa de cobro', d: 'Porcentaje de facturas cobradas respecto al total emitido. Indicador clave de salud financiera.' },
  { t: 'TicketBAI', d: 'Sistema obligatorio de facturación electrónica en el País Vasco para garantizar trazabilidad fiscal.' },
  { t: 'Vencimiento', d: 'Fecha en la que la factura debe ser pagada. A partir del día siguiente comienzan a correr intereses.' },
  { t: 'Veri*factu', d: 'Sistema español que asegura la veracidad e integridad de las facturas electrónicas (Real Decreto 1007/2023).' },
  { t: 'Vía judicial', d: 'Reclamación de una deuda a través de los tribunales. Incluye monitorio, juicio verbal y juicio ordinario.' },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'Glosario de cobros, facturas y morosidad',
  hasDefinedTerm: terminos.map(({ t, d }) => ({
    '@type': 'DefinedTerm',
    name: t,
    description: d,
    inDefinedTermSet: 'https://marsof.es/glosario',
  })),
}

export default function PageGlosario() {
  // Indexamos por letra inicial para crear secciones A-Z
  const porLetra = terminos.reduce<Record<string, typeof terminos>>((acc, term) => {
    const letra = term.t[0].toUpperCase()
    if (!acc[letra]) acc[letra] = []
    acc[letra].push(term)
    return acc
  }, {})
  const letras = Object.keys(porLetra).sort()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-sm font-bold text-zinc-100">Marsof / Saldea</Link>
            <div className="flex items-center gap-2">
              <ThemeToggleNav />
              <Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">1 mes gratis</Link>
            </div>
          </div>
        </nav>

        <section className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Glosario de cobros y morosidad</h1>
          <p className="text-zinc-400 text-lg mb-8">60+ términos del mundo de los cobros, facturas, impagos y procedimientos legales en España. Explicados para que cualquiera los entienda.</p>

          {/* Indice A-Z */}
          <div className="flex flex-wrap gap-1.5 mb-12 p-4 bg-zinc-900/40 border border-white/10 rounded-xl">
            {letras.map((l) => (
              <a key={l} href={`#letra-${l}`} className="w-8 h-8 flex items-center justify-center bg-zinc-800 text-zinc-300 hover:bg-sky-500 hover:text-zinc-900 rounded-md text-sm font-semibold transition-colors">
                {l}
              </a>
            ))}
          </div>

          {letras.map((letra) => (
            <div key={letra} id={`letra-${letra}`} className="mb-10 scroll-mt-24">
              <h2 className="text-3xl font-bold text-sky-400 mb-5">{letra}</h2>
              <div className="space-y-4">
                {porLetra[letra].map((term) => (
                  <div key={term.t} className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
                    <h3 className="font-bold text-zinc-100 mb-2">{term.t}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{term.d}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12 bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">¿Listo para dejar de perseguir cobros?</h2>
            <p className="text-zinc-400 mb-6">Aplica todo este conocimiento sin tener que recordarlo. Saldea hace el trabajo legal por ti.</p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar 1 mes gratis →</Link>
          </div>
        </section>
      </div>
    </>
  )
}
