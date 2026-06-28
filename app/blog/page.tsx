import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog · Cómo cobrar mejor tus facturas | Marsof',
  description: 'Guías prácticas y plantillas para autónomos y pymes españolas: reclamar facturas, evitar morosos, automatizar cobros. Por Marsof.',
  alternates: { canonical: 'https://marsof.es/blog' },
  openGraph: {
    title: 'Blog Marsof · Guías para cobrar mejor tus facturas',
    description: 'Guías prácticas y plantillas para autónomos y pymes: reclamar facturas, evitar morosos y automatizar cobros con IA.',
    type: 'website',
    locale: 'es_ES',
  },
}

const articulos = [
  { slug: 'como-cobrar-cliente-sin-enfadarlo', titulo: 'Cómo cobrar a un cliente sin que se enfade', resumen: 'La técnica probada para reclamar facturas impagadas sin perder al cliente. 7 pasos psicológicos.', fecha: '2026-05-17', minutos: 8, categoria: 'Psicología del cobro' },
  { slug: 'que-decir-cuando-cliente-no-paga', titulo: 'Qué decir cuando un cliente no paga', resumen: 'Las 12 frases exactas que usan los profesionales para reclamar cobros sin perder al cliente.', fecha: '2026-05-17', minutos: 6, categoria: 'Comunicación' },
  { slug: 'mensaje-recordatorio-pago-cliente', titulo: 'Mensaje de recordatorio de pago al cliente', resumen: '8 ejemplos listos para copiar. Email, WhatsApp y SMS. Adaptados a cada momento del retraso.', fecha: '2026-05-17', minutos: 5, categoria: 'Plantillas' },
  { slug: 'como-reclamar-factura-whatsapp', titulo: 'Cómo reclamar una factura por WhatsApp', resumen: 'Plantillas WhatsApp educadas, horarios correctos, errores a evitar. Tono profesional.', fecha: '2026-05-17', minutos: 5, categoria: 'Comunicación' },
  { slug: 'frases-cobrar-sin-parecer-pesado', titulo: 'Frases para cobrar sin parecer pesado', resumen: '15 frases que funcionan en email y WhatsApp. La fórmula psicológica para no agobiar.', fecha: '2026-05-17', minutos: 5, categoria: 'Plantillas' },
  { slug: 'como-escribir-email-firme-pero-amable', titulo: 'Email firme pero amable para cobrar', resumen: 'La estructura ABCD para escribir emails firmes sin perder al cliente. Plantilla completa.', fecha: '2026-05-17', minutos: 6, categoria: 'Plantillas' },
  { slug: 'que-hacer-cliente-se-enfada-cobrar', titulo: 'Qué hacer si un cliente se enfada cuando le reclamas', resumen: 'Cómo gestionar la reacción emocional. 5 reglas de oro. Cuándo escalar a vía formal.', fecha: '2026-05-17', minutos: 6, categoria: 'Gestión de conflictos' },
  { slug: 'como-pedir-anticipo-cliente', titulo: 'Cómo pedir un anticipo sin incomodar', resumen: 'Estrategias para pedir anticipos sin generar fricción. Cuánto pedir, cómo justificarlo.', fecha: '2026-05-17', minutos: 5, categoria: 'Estrategia' },
  { slug: 'cuando-mandar-burofax-cliente', titulo: 'Cuándo mandar un burofax a un cliente moroso', resumen: 'Los 4 momentos donde el burofax es eficaz. Coste, qué pasa después, tasa de respuesta.', fecha: '2026-05-17', minutos: 5, categoria: 'Vía formal' },
  { slug: 'como-gestionar-conflicto-cliente-moroso', titulo: 'Cómo gestionar el conflicto con un cliente moroso', resumen: 'Las 5 fases del conflicto y cómo desescalar cada una. Protege tu salud mental.', fecha: '2026-05-17', minutos: 7, categoria: 'Gestión emocional' },
  { slug: 'decir-no-trabajar-cliente-moroso', titulo: 'Cómo decirle a un cliente que no trabajas más', resumen: 'Cómo cortar relación con un moroso sin dramas. Frases y momento adecuado.', fecha: '2026-05-17', minutos: 5, categoria: 'Decisiones' },
  { slug: 'como-evitar-impagos-nuevo-cliente', titulo: 'Cómo evitar impagos con un cliente nuevo', resumen: 'Las 10 medidas concretas: verificación, contrato, anticipo. Filtra morosos antes.', fecha: '2026-05-17', minutos: 6, categoria: 'Prevención' },
  { slug: 'como-cobrar-amigo-cliente', titulo: 'Cómo cobrar a un amigo cliente', resumen: 'El caso más doloroso del cobro. Mantener amistad Y recuperar el dinero al mismo tiempo.', fecha: '2026-05-17', minutos: 5, categoria: 'Caso especial' },
  { slug: 'como-cobrar-empresa-grande', titulo: 'Cómo cobrar a una empresa grande', resumen: 'Multinacionales pagan a 90-120 días por sistema. Cómo navegar sus procesos.', fecha: '2026-05-17', minutos: 6, categoria: 'Caso especial' },
  { slug: 'como-cobrar-administracion-publica', titulo: 'Cómo cobrar a la Administración Pública', resumen: 'Plazos reales (30 días por ley, 90-180 reales), trucos y monitorio contencioso.', fecha: '2026-05-17', minutos: 6, categoria: 'Caso especial' },
  { slug: 'como-cobrar-cliente-extranjero', titulo: 'Cómo cobrar a un cliente extranjero', resumen: 'SEPA, Wise, Stripe. Métodos según destino, divisas y reclamación internacional.', fecha: '2026-05-17', minutos: 5, categoria: 'Caso especial' },
  { slug: 'como-cobrar-deuda-antigua', titulo: 'Cómo cobrar una deuda antigua', resumen: 'Esa factura de hace 6-12 meses. Prescripción, cálculo de intereses y opciones por antigüedad.', fecha: '2026-05-17', minutos: 5, categoria: 'Caso especial' },
  { slug: 'como-cobrar-sin-contrato-firmado', titulo: 'Cómo cobrar sin contrato firmado', resumen: 'Las pruebas que valen: emails, presupuestos, WhatsApp, transferencias previas.', fecha: '2026-05-17', minutos: 5, categoria: 'Caso especial' },
  { slug: 'como-cobrar-trabajo-realizado-sin-pagar', titulo: 'Cómo cobrar un trabajo ya realizado', resumen: 'Plan completo: documentar entrega, secuencia, aceptación tácita, propiedad intelectual.', fecha: '2026-05-17', minutos: 5, categoria: 'Caso especial' },
  { slug: 'como-cobrar-cliente-cerro-empresa', titulo: 'Cómo cobrar a un cliente que cerró', resumen: 'Concurso, disolución y sucesión fraudulenta. Inscribir crédito y opciones legales.', fecha: '2026-05-17', minutos: 5, categoria: 'Caso especial' },
  { slug: 'como-cobrar-honorarios-impagados', titulo: 'Cómo cobrar honorarios impagados', resumen: 'Consultores, abogados (jura de cuentas), médicos, arquitectos. Particularidades.', fecha: '2026-05-17', minutos: 5, categoria: 'Sector' },
  { slug: 'cliente-promete-pero-no-paga', titulo: 'Cliente que promete pero no paga', resumen: '5 reglas para gestionar la dinámica "te pago la semana que viene" y conseguir pago real.', fecha: '2026-05-17', minutos: 4, categoria: 'Caso específico' },
  { slug: 'cliente-no-responde-reclamacion', titulo: 'Cliente que no responde a la reclamación', resumen: 'Silencio absoluto. Cómo escalar, cambiar canal, burofax inmediato y monitorio.', fecha: '2026-05-17', minutos: 4, categoria: 'Caso específico' },
  { slug: 'cliente-disputa-factura', titulo: 'Cliente que disputa la factura', resumen: 'Disputa real vs excusa. Cómo distinguirlas, responder y defender tu cobro.', fecha: '2026-05-17', minutos: 4, categoria: 'Caso específico' },
  { slug: 'cobrar-pequenas-cantidades', titulo: '¿Merece la pena cobrar deudas pequeñas?', resumen: 'Análisis de coste real: monitorio, burofax, tu tiempo. Decisión por importe.', fecha: '2026-05-17', minutos: 4, categoria: 'Decisiones' },
  { slug: 'cliente-paga-tarde-cada-mes', titulo: 'Cliente que paga tarde cada mes', resumen: 'Cómo cambiar el patrón con SEPA, recordatorio pre-vencimiento, descuento por pronto pago.', fecha: '2026-05-17', minutos: 4, categoria: 'Caso específico' },
  { slug: 'cobrar-disenador-creativo', titulo: 'Cómo cobrar como diseñador o creativo', resumen: 'Propiedad intelectual como arma. Cláusula crítica, entrega en fases, archivos fuente.', fecha: '2026-05-17', minutos: 4, categoria: 'Sector' },
  { slug: 'factura-mas-90-dias-vencida', titulo: 'Factura con más de 90 días vencida', resumen: 'Plan de los próximos 30 días: comunicación formal, burofax, monitorio. Cuándo soltar.', fecha: '2026-05-17', minutos: 4, categoria: 'Caso específico' },
  { slug: 'deuda-prescripcion-5-anos', titulo: 'Prescripción de deudas comerciales en España', resumen: 'Plazo 5 años. Cómo interrumpir prescripción para mantener tu derecho a cobrar.', fecha: '2026-05-17', minutos: 4, categoria: 'Marco legal' },
  { slug: 'cobrar-curso-formacion-online', titulo: 'Cómo cobrar cursos y formación online', resumen: 'Estrategias para formadores: pre-pago, fraccionamiento, suspensión de acceso.', fecha: '2026-05-17', minutos: 4, categoria: 'Sector' },
  {
    slug: 'psicologia-precios-saas-b2b',
    titulo: 'Psicología de precios en SaaS B2B',
    resumen: 'Cómo poner precio a tu software B2B sin equivocarse. Anclajes, precio psicológico, trial sin tarjeta y errores típicos que comete el 90%.',
    fecha: '2026-05-16',
    minutos: 7,
    categoria: 'Estrategia',
  },
  {
    slug: 'como-medir-dso-pyme',
    titulo: 'Cómo medir el DSO de tu pyme',
    resumen: 'El KPI de tesorería más importante que casi nadie mide. Fórmula, ejemplos y cómo reducirlo para liberar capital sin pedir préstamos.',
    fecha: '2026-05-16',
    minutos: 6,
    categoria: 'Finanzas',
  },
  {
    slug: 'nda-clausula-confidencialidad-autonomo',
    titulo: 'NDA y confidencialidad para autónomos',
    resumen: 'Plantilla gratis de cláusula NDA, cuándo usarla, tipos (unilateral/bilateral) y errores típicos al firmarla.',
    fecha: '2026-05-16',
    minutos: 6,
    categoria: 'Plantillas',
  },
  {
    slug: 'morosidad-sector-transporte-logistica',
    titulo: 'Morosidad en transporte y logística (Ley 15/2009)',
    resumen: 'El transporte tiene plazo legal de 30 días (Ley 15/2009). Cómo aplicarla, evitar trampas y proteger tu liquidez como transportista.',
    fecha: '2026-05-16',
    minutos: 6,
    categoria: 'Sector',
  },
  {
    slug: 'morosidad-sector-formacion',
    titulo: 'Morosidad en formación y consultoría',
    resumen: 'Cómo cobrar a empresas por servicios profesionales. Retainer mensual, hitos de pago y cláusulas que blindan tus honorarios.',
    fecha: '2026-05-16',
    minutos: 6,
    categoria: 'Sector',
  },
  {
    slug: 'morosidad-sector-retail-comercio',
    titulo: 'Morosidad en retail y comercio',
    resumen: 'Cómo cobrar a tiendas y comercios. Estacionalidad, descuentos por pronto pago, señales de cierre y protección al proveedor.',
    fecha: '2026-05-16',
    minutos: 6,
    categoria: 'Sector',
  },
  {
    slug: 'morosidad-sector-hosteleria',
    titulo: 'Morosidad en hostelería y restauración',
    resumen: 'Cómo cobrar a hoteles, restaurantes y catering. Tipos de cliente, plazos reales y estrategia anti-morosos para proveedores.',
    fecha: '2026-05-16',
    minutos: 7,
    categoria: 'Sector',
  },
  {
    slug: 'morosidad-sector-agroalimentario',
    titulo: 'Morosidad agroalimentaria: Ley 12/2013',
    resumen: 'La Ley de la Cadena Alimentaria obliga a pagar en 30/60 días. Sanciones hasta 1.000.000€. Cómo cobrar a cadenas y mayoristas.',
    fecha: '2026-05-16',
    minutos: 8,
    categoria: 'Sector',
  },
  {
    slug: 'morosidad-sector-sanitario',
    titulo: 'Morosidad en clínicas y mutuas sanitarias',
    resumen: 'Clínicas privadas (60-90 días), mutuas (60-120), residencias (30-60). Cómo cobrar sin perder el cliente.',
    fecha: '2026-05-16',
    minutos: 7,
    categoria: 'Sector',
  },
  {
    slug: 'morosidad-ecommerce-tiendas-online',
    titulo: 'Morosidad en ecommerce: chargebacks y SEPA',
    resumen: 'Los 3 tipos de impago en tiendas online: chargebacks (25€ comisión), SEPA devuelto, B2B con plazos. Cómo defenderse de cada uno.',
    fecha: '2026-05-16',
    minutos: 7,
    categoria: 'Sector',
  },
  {
    slug: 'morosidad-sector-construccion',
    titulo: 'Morosidad en el sector construcción 2026',
    resumen: 'El sector con peor morosidad de España (108 días de pago medio). Causas, marco legal específico y cómo proteger tu empresa.',
    fecha: '2026-05-16',
    minutos: 8,
    categoria: 'Sector',
  },
  {
    slug: 'ratio-liquidez-pyme-2026',
    titulo: 'Ratio de liquidez para pymes: fórmula y valores ideales',
    resumen: 'El indicador clave para saber si tu empresa puede pagar a corto plazo. Fórmula, ejemplos y cómo mejorarlo cobrando antes.',
    fecha: '2026-05-16',
    minutos: 7,
    categoria: 'Finanzas',
  },
  {
    slug: 'domiciliacion-sepa-cobros-automaticos',
    titulo: 'Domiciliación SEPA: cómo cobrar automáticamente',
    resumen: 'Cómo funciona el cobro SEPA paso a paso. Mandato, plazos, B2C vs B2B y costes. Reduce la morosidad estructural hasta un 70%.',
    fecha: '2026-05-16',
    minutos: 7,
    categoria: 'Cobros',
  },
  {
    slug: 'modelo-presupuesto-autonomo',
    titulo: 'Modelo de presupuesto para autónomos (plantilla gratis)',
    resumen: 'Plantilla profesional con las 5 cláusulas que blindan tus cobros: anticipo, Ley 3/2004, suspensión por impago, validez y firma del cliente.',
    fecha: '2026-05-16',
    minutos: 8,
    categoria: 'Plantillas',
  },
  {
    slug: 'gestion-cuentas-a-cobrar-pyme',
    titulo: 'Gestión de cuentas a cobrar para pymes',
    resumen: 'KPIs (DSO, aging, morosidad), política de crédito y automatización. Cómo gestionar profesionalmente el dinero que NO has cobrado todavía.',
    fecha: '2026-05-16',
    minutos: 10,
    categoria: 'Finanzas',
  },
  {
    slug: 'factura-electronica-b2b-obligatoria-espana',
    titulo: 'Factura electrónica B2B obligatoria en España',
    resumen: 'La Ley Crea y Crece obliga a todas las empresas a usar factura electrónica. Fechas exactas, multas hasta 10.000€ y guía práctica.',
    fecha: '2026-05-16',
    minutos: 7,
    categoria: 'Normativa fiscal',
  },
  {
    slug: 'razones-clientes-no-pagan-facturas',
    titulo: '7 razones por las que tus clientes no te pagan',
    resumen: 'No todos los impagos son iguales. Las 7 razones más comunes ordenadas por frecuencia, con la solución concreta para cada una.',
    fecha: '2026-05-16',
    minutos: 7,
    categoria: 'Análisis',
  },
  {
    slug: 'verifactu-facturas-electronicas-2026',
    titulo: 'Veri*factu y facturas electrónicas en España 2026',
    resumen: 'La nueva obligación que afecta a autónomos y empresas. Plazos, sanciones (hasta 50.000€) y cómo prepararte.',
    fecha: '2026-05-16',
    minutos: 8,
    categoria: 'Normativa fiscal',
  },
  {
    slug: 'factura-proforma-vs-factura-ordinaria',
    titulo: 'Factura proforma vs factura ordinaria',
    resumen: 'Una vale para Hacienda, la otra no. Diferencias legales y cuándo usar cada una. Con plantilla gratis.',
    fecha: '2026-05-16',
    minutos: 5,
    categoria: 'Facturación',
  },
  {
    slug: 'facturas-recurrentes-suscripciones',
    titulo: 'Facturas recurrentes para suscripciones',
    resumen: 'Cómo gestionar cuotas mensuales en SaaS, alquileres y mantenimientos. Automatización, SEPA y reducción de impagos.',
    fecha: '2026-05-16',
    minutos: 6,
    categoria: 'Facturación',
  },
  {
    slug: 'factoring-vs-recordatorios-cobro',
    titulo: 'Factoring vs recordatorios automáticos: ¿qué te conviene?',
    resumen: 'Comparativa honesta entre adelantar facturas con descuento del 3-5% o usar recordatorios automáticos sin coste por factura.',
    fecha: '2026-05-16',
    minutos: 7,
    categoria: 'Financiación',
  },
  {
    slug: 'como-evitar-clientes-morosos',
    titulo: 'Cómo evitar clientes morosos: 8 reglas antes de firmar',
    resumen: 'Reclamar a un moroso te ocupa 10 veces más tiempo que detectarlo antes de empezar. Esta es la lista que ojalá te hubieran dado el primer día.',
    fecha: '2026-05-16',
    minutos: 8,
    categoria: 'Prevención',
  },
  {
    slug: 'plazos-pago-entre-empresas-espana',
    titulo: 'Plazos de pago entre empresas en España 2026',
    resumen: '60 días B2B, 30 días Administración, 30 días perecederos. Todos los plazos legales de pago y cómo aprovecharlos en reclamaciones.',
    fecha: '2026-05-16',
    minutos: 6,
    categoria: 'Marco legal',
  },
  {
    slug: 'contrato-prestacion-servicios-autonomo',
    titulo: 'Modelo contrato prestación de servicios autónomo (gratis)',
    resumen: 'Plantilla completa con cláusulas antimorosos, intereses Ley 3/2004 y protección legal. Lista para usar.',
    fecha: '2026-05-16',
    minutos: 11,
    categoria: 'Plantillas',
  },
  {
    slug: 'software-gestion-cobros-comparativa',
    titulo: 'Mejor software de gestión de cobros 2026: comparativa España',
    resumen: 'Análisis honesto de 7 herramientas para cobrar facturas en España. Saldea, Holded, Quipu, Anfix, Sage, Chaser y Excel cara a cara: precios, IA, integración Stripe.',
    fecha: '2026-05-16',
    minutos: 12,
    categoria: 'Comparativa',
  },
  {
    slug: 'ley-3-2004-morosidad-explicada',
    titulo: 'Ley 3/2004 contra la morosidad: guía completa 2026',
    resumen: 'Plazos máximos, intereses de demora del 12,5% y los 40€ de indemnización por costes de cobro. Todo lo que debes saber para cobrar tus facturas con respaldo legal.',
    fecha: '2026-05-16',
    minutos: 8,
    categoria: 'Marco legal',
  },
  {
    slug: 'como-cobrar-cliente-moroso',
    titulo: 'Cómo cobrar a un cliente moroso paso a paso',
    resumen: 'Calendario de 7 fases probado para recuperar tu dinero sin acabar en juicio. Del recordatorio amable al procedimiento monitorio, con plantillas y plazos.',
    fecha: '2026-05-16',
    minutos: 10,
    categoria: 'Guía práctica',
  },
  {
    slug: 'como-enviar-burofax-reclamar-deuda',
    titulo: 'Cómo enviar un burofax para reclamar una deuda',
    resumen: 'Guía paso a paso con modelo gratis: contenido, precio (28-35€), envío online en Correos y qué pasa si el deudor no lo recoge.',
    fecha: '2026-05-16',
    minutos: 7,
    categoria: 'Procedimiento legal',
  },
  {
    slug: 'calcular-intereses-demora-factura-impagada',
    titulo: 'Cómo calcular los intereses de demora de una factura impagada',
    resumen: 'Fórmula exacta, tipo actualizado a 2026 (12,5%) y tabla con ejemplos reales según importe y días de retraso. Listo para reclamar al moroso.',
    fecha: '2026-05-16',
    minutos: 5,
    categoria: 'Cálculos legales',
  },
  {
    slug: 'procedimiento-monitorio-reclamar-deuda',
    titulo: 'Procedimiento monitorio: cómo reclamar una deuda sin abogado',
    resumen: 'Paso a paso para el monitorio en España: documentación, formularios, plazos y coste (0€ si la deuda es inferior a 2.000€).',
    fecha: '2026-05-16',
    minutos: 9,
    categoria: 'Vía judicial',
  },
  {
    slug: 'modelo-email-reclamacion-factura-impagada',
    titulo: 'Modelo de email de reclamación de factura impagada (4 plantillas 2026)',
    resumen: 'Las 4 plantillas que de verdad funcionan en España según los días de retraso. Listas para copiar, adaptadas a la Ley 3/2004 de morosidad y RGPD.',
    fecha: '2026-05-13',
    minutos: 9,
    categoria: 'Cobros · Plantillas',
  },
]

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Blog Marsof · Guías para cobrar mejor tus facturas',
  description: 'Guías prácticas y plantillas para autónomos y pymes españolas: reclamar facturas, evitar morosos, automatizar cobros.',
  url: 'https://www.marsof.es/blog',
  publisher: { '@id': 'https://marsof.es/#organization' },
  inLanguage: 'es-ES',
  hasPart: articulos.map(a => ({
    '@type': 'Article',
    headline: a.titulo,
    url: `https://www.marsof.es/blog/${a.slug}`,
    datePublished: a.fecha,
    author: { '@type': 'Organization', name: 'Marsof Technology' },
  })),
}

export default function BlogIndex() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <div className="min-h-screen bg-transparent text-zinc-100">
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-400 transition-colors">Marsof</Link>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-100 font-semibold">Blog</span>
          </div>
          <div className="flex items-center gap-2">
<Link
              href="/registro"
              className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors"
            >
              Probar Saldea gratis
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">Blog de Marsof</h1>
        <p className="text-xl text-zinc-400 mb-12">
          Guías prácticas para que autónomos y pymes españolas cobren antes y mejor.
        </p>

        <div className="space-y-8">
          {articulos.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="block border border-white/10 rounded-xl p-8 hover:border-sky-500/40 transition-all bg-zinc-900/40 backdrop-blur-sm hover:bg-zinc-900/60"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2">
                {a.categoria}
              </div>
              <h2 className="text-2xl font-bold text-zinc-100 mb-3 hover:text-sky-300 transition-colors">
                {a.titulo}
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-4">{a.resumen}</p>
              <div className="text-sm text-zinc-500">
                <time dateTime={a.fecha}>{new Date(a.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</time> · {a.minutos} min de lectura
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">¿Quieres dejar de perseguir cobros?</h3>
          <p className="text-zinc-400 mb-5">
            Saldea automatiza los recordatorios con IA. Pruébalo 30 días gratis, sin compromiso.
          </p>
          <Link
            href="/registro"
            className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors"
          >
            Empezar gratis →
          </Link>
        </div>
      </section>
    </div>
  </>
  )
}
