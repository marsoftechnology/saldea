import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Blog Â· CÃ³mo cobrar mejor tus facturas | Saldea',
  description: 'GuÃ­as prÃ¡cticas y plantillas para autÃ³nomos y pymes espaÃ±olas: reclamar facturas, evitar morosos, automatizar cobros.',
  alternates: { canonical: 'https://marsof.es/blog' },
}

const articulos = [
  { slug: 'como-cobrar-cliente-sin-enfadarlo', titulo: 'CÃ³mo cobrar a un cliente sin que se enfade', resumen: 'La tÃ©cnica probada para reclamar facturas impagadas sin perder al cliente. 7 pasos psicolÃ³gicos.', fecha: '2026-05-17', minutos: 8, categoria: 'PsicologÃ­a del cobro' },
  { slug: 'que-decir-cuando-cliente-no-paga', titulo: 'QuÃ© decir cuando un cliente no paga', resumen: 'Las 12 frases exactas que usan los profesionales para reclamar cobros sin perder al cliente.', fecha: '2026-05-17', minutos: 6, categoria: 'ComunicaciÃ³n' },
  { slug: 'mensaje-recordatorio-pago-cliente', titulo: 'Mensaje de recordatorio de pago al cliente', resumen: '8 ejemplos listos para copiar. Email, WhatsApp y SMS. Adaptados a cada momento del retraso.', fecha: '2026-05-17', minutos: 5, categoria: 'Plantillas' },
  { slug: 'como-reclamar-factura-whatsapp', titulo: 'CÃ³mo reclamar una factura por WhatsApp', resumen: 'Plantillas WhatsApp educadas, horarios correctos, errores a evitar. Tono profesional.', fecha: '2026-05-17', minutos: 5, categoria: 'ComunicaciÃ³n' },
  { slug: 'frases-cobrar-sin-parecer-pesado', titulo: 'Frases para cobrar sin parecer pesado', resumen: '15 frases que funcionan en email y WhatsApp. La fÃ³rmula psicolÃ³gica para no agobiar.', fecha: '2026-05-17', minutos: 5, categoria: 'Plantillas' },
  { slug: 'como-escribir-email-firme-pero-amable', titulo: 'Email firme pero amable para cobrar', resumen: 'La estructura ABCD para escribir emails firmes sin perder al cliente. Plantilla completa.', fecha: '2026-05-17', minutos: 6, categoria: 'Plantillas' },
  { slug: 'que-hacer-cliente-se-enfada-cobrar', titulo: 'QuÃ© hacer si un cliente se enfada cuando le reclamas', resumen: 'CÃ³mo gestionar la reacciÃ³n emocional. 5 reglas de oro. CuÃ¡ndo escalar a vÃ­a formal.', fecha: '2026-05-17', minutos: 6, categoria: 'GestiÃ³n de conflictos' },
  { slug: 'como-pedir-anticipo-cliente', titulo: 'CÃ³mo pedir un anticipo sin incomodar', resumen: 'Estrategias para pedir anticipos sin generar fricciÃ³n. CuÃ¡nto pedir, cÃ³mo justificarlo.', fecha: '2026-05-17', minutos: 5, categoria: 'Estrategia' },
  { slug: 'cuando-mandar-burofax-cliente', titulo: 'CuÃ¡ndo mandar un burofax a un cliente moroso', resumen: 'Los 4 momentos donde el burofax es eficaz. Coste, quÃ© pasa despuÃ©s, tasa de respuesta.', fecha: '2026-05-17', minutos: 5, categoria: 'VÃ­a formal' },
  { slug: 'como-gestionar-conflicto-cliente-moroso', titulo: 'CÃ³mo gestionar el conflicto con un cliente moroso', resumen: 'Las 5 fases del conflicto y cÃ³mo desescalar cada una. Protege tu salud mental.', fecha: '2026-05-17', minutos: 7, categoria: 'GestiÃ³n emocional' },
  { slug: 'decir-no-trabajar-cliente-moroso', titulo: 'CÃ³mo decirle a un cliente que no trabajas mÃ¡s', resumen: 'CÃ³mo cortar relaciÃ³n con un moroso sin dramas. Frases y momento adecuado.', fecha: '2026-05-17', minutos: 5, categoria: 'Decisiones' },
  { slug: 'como-evitar-impagos-nuevo-cliente', titulo: 'CÃ³mo evitar impagos con un cliente nuevo', resumen: 'Las 10 medidas concretas: verificaciÃ³n, contrato, anticipo. Filtra morosos antes.', fecha: '2026-05-17', minutos: 6, categoria: 'PrevenciÃ³n' },
  { slug: 'como-cobrar-amigo-cliente', titulo: 'CÃ³mo cobrar a un amigo cliente', resumen: 'El caso mÃ¡s doloroso del cobro. Mantener amistad Y recuperar el dinero al mismo tiempo.', fecha: '2026-05-17', minutos: 5, categoria: 'Caso especial' },
  { slug: 'como-cobrar-empresa-grande', titulo: 'CÃ³mo cobrar a una empresa grande', resumen: 'Multinacionales pagan a 90-120 dÃ­as por sistema. CÃ³mo navegar sus procesos.', fecha: '2026-05-17', minutos: 6, categoria: 'Caso especial' },
  { slug: 'como-cobrar-administracion-publica', titulo: 'CÃ³mo cobrar a la AdministraciÃ³n PÃºblica', resumen: 'Plazos reales (30 dÃ­as por ley, 90-180 reales), trucos y monitorio contencioso.', fecha: '2026-05-17', minutos: 6, categoria: 'Caso especial' },
  { slug: 'como-cobrar-cliente-extranjero', titulo: 'CÃ³mo cobrar a un cliente extranjero', resumen: 'SEPA, Wise, Stripe. MÃ©todos segÃºn destino, divisas y reclamaciÃ³n internacional.', fecha: '2026-05-17', minutos: 5, categoria: 'Caso especial' },
  { slug: 'como-cobrar-deuda-antigua', titulo: 'CÃ³mo cobrar una deuda antigua', resumen: 'Esa factura de hace 6-12 meses. PrescripciÃ³n, cÃ¡lculo de intereses y opciones por antigÃ¼edad.', fecha: '2026-05-17', minutos: 5, categoria: 'Caso especial' },
  { slug: 'como-cobrar-sin-contrato-firmado', titulo: 'CÃ³mo cobrar sin contrato firmado', resumen: 'Las pruebas que valen: emails, presupuestos, WhatsApp, transferencias previas.', fecha: '2026-05-17', minutos: 5, categoria: 'Caso especial' },
  { slug: 'como-cobrar-trabajo-realizado-sin-pagar', titulo: 'CÃ³mo cobrar un trabajo ya realizado', resumen: 'Plan completo: documentar entrega, secuencia, aceptaciÃ³n tÃ¡cita, propiedad intelectual.', fecha: '2026-05-17', minutos: 5, categoria: 'Caso especial' },
  { slug: 'como-cobrar-cliente-cerro-empresa', titulo: 'CÃ³mo cobrar a un cliente que cerrÃ³', resumen: 'Concurso, disoluciÃ³n y sucesiÃ³n fraudulenta. Inscribir crÃ©dito y opciones legales.', fecha: '2026-05-17', minutos: 5, categoria: 'Caso especial' },
  { slug: 'como-cobrar-honorarios-impagados', titulo: 'CÃ³mo cobrar honorarios impagados', resumen: 'Consultores, abogados (jura de cuentas), mÃ©dicos, arquitectos. Particularidades.', fecha: '2026-05-17', minutos: 5, categoria: 'Sector' },
  { slug: 'cliente-promete-pero-no-paga', titulo: 'Cliente que promete pero no paga', resumen: '5 reglas para gestionar la dinÃ¡mica "te pago la semana que viene" y conseguir pago real.', fecha: '2026-05-17', minutos: 4, categoria: 'Caso especÃ­fico' },
  { slug: 'cliente-no-responde-reclamacion', titulo: 'Cliente que no responde a la reclamaciÃ³n', resumen: 'Silencio absoluto. CÃ³mo escalar, cambiar canal, burofax inmediato y monitorio.', fecha: '2026-05-17', minutos: 4, categoria: 'Caso especÃ­fico' },
  { slug: 'cliente-disputa-factura', titulo: 'Cliente que disputa la factura', resumen: 'Disputa real vs excusa. CÃ³mo distinguirlas, responder y defender tu cobro.', fecha: '2026-05-17', minutos: 4, categoria: 'Caso especÃ­fico' },
  { slug: 'cobrar-pequenas-cantidades', titulo: 'Â¿Merece la pena cobrar deudas pequeÃ±as?', resumen: 'AnÃ¡lisis de coste real: monitorio, burofax, tu tiempo. DecisiÃ³n por importe.', fecha: '2026-05-17', minutos: 4, categoria: 'Decisiones' },
  { slug: 'cliente-paga-tarde-cada-mes', titulo: 'Cliente que paga tarde cada mes', resumen: 'CÃ³mo cambiar el patrÃ³n con SEPA, recordatorio pre-vencimiento, descuento por pronto pago.', fecha: '2026-05-17', minutos: 4, categoria: 'Caso especÃ­fico' },
  { slug: 'cobrar-disenador-creativo', titulo: 'CÃ³mo cobrar como diseÃ±ador o creativo', resumen: 'Propiedad intelectual como arma. ClÃ¡usula crÃ­tica, entrega en fases, archivos fuente.', fecha: '2026-05-17', minutos: 4, categoria: 'Sector' },
  { slug: 'factura-mas-90-dias-vencida', titulo: 'Factura con mÃ¡s de 90 dÃ­as vencida', resumen: 'Plan de los prÃ³ximos 30 dÃ­as: comunicaciÃ³n formal, burofax, monitorio. CuÃ¡ndo soltar.', fecha: '2026-05-17', minutos: 4, categoria: 'Caso especÃ­fico' },
  { slug: 'deuda-prescripcion-5-anos', titulo: 'PrescripciÃ³n de deudas comerciales en EspaÃ±a', resumen: 'Plazo 5 aÃ±os. CÃ³mo interrumpir prescripciÃ³n para mantener tu derecho a cobrar.', fecha: '2026-05-17', minutos: 4, categoria: 'Marco legal' },
  { slug: 'cobrar-curso-formacion-online', titulo: 'CÃ³mo cobrar cursos y formaciÃ³n online', resumen: 'Estrategias para formadores: pre-pago, fraccionamiento, suspensiÃ³n de acceso.', fecha: '2026-05-17', minutos: 4, categoria: 'Sector' },
  {
    slug: 'psicologia-precios-saas-b2b',
    titulo: 'PsicologÃ­a de precios en SaaS B2B',
    resumen: 'CÃ³mo poner precio a tu software B2B sin equivocarse. Anclajes, precio psicolÃ³gico, trial sin tarjeta y errores tÃ­picos que comete el 90%.',
    fecha: '2026-05-16',
    minutos: 7,
    categoria: 'Estrategia',
  },
  {
    slug: 'como-medir-dso-pyme',
    titulo: 'CÃ³mo medir el DSO de tu pyme',
    resumen: 'El KPI de tesorerÃ­a mÃ¡s importante que casi nadie mide. FÃ³rmula, ejemplos y cÃ³mo reducirlo para liberar capital sin pedir prÃ©stamos.',
    fecha: '2026-05-16',
    minutos: 6,
    categoria: 'Finanzas',
  },
  {
    slug: 'nda-clausula-confidencialidad-autonomo',
    titulo: 'NDA y confidencialidad para autÃ³nomos',
    resumen: 'Plantilla gratis de clÃ¡usula NDA, cuÃ¡ndo usarla, tipos (unilateral/bilateral) y errores tÃ­picos al firmarla.',
    fecha: '2026-05-16',
    minutos: 6,
    categoria: 'Plantillas',
  },
  {
    slug: 'morosidad-sector-transporte-logistica',
    titulo: 'Morosidad en transporte y logÃ­stica (Ley 15/2009)',
    resumen: 'El transporte tiene plazo legal de 30 dÃ­as (Ley 15/2009). CÃ³mo aplicarla, evitar trampas y proteger tu liquidez como transportista.',
    fecha: '2026-05-16',
    minutos: 6,
    categoria: 'Sector',
  },
  {
    slug: 'morosidad-sector-formacion',
    titulo: 'Morosidad en formaciÃ³n y consultorÃ­a',
    resumen: 'CÃ³mo cobrar a empresas por servicios profesionales. Retainer mensual, hitos de pago y clÃ¡usulas que blindan tus honorarios.',
    fecha: '2026-05-16',
    minutos: 6,
    categoria: 'Sector',
  },
  {
    slug: 'morosidad-sector-retail-comercio',
    titulo: 'Morosidad en retail y comercio',
    resumen: 'CÃ³mo cobrar a tiendas y comercios. Estacionalidad, descuentos por pronto pago, seÃ±ales de cierre y protecciÃ³n al proveedor.',
    fecha: '2026-05-16',
    minutos: 6,
    categoria: 'Sector',
  },
  {
    slug: 'morosidad-sector-hosteleria',
    titulo: 'Morosidad en hostelerÃ­a y restauraciÃ³n',
    resumen: 'CÃ³mo cobrar a hoteles, restaurantes y catering. Tipos de cliente, plazos reales y estrategia anti-morosos para proveedores.',
    fecha: '2026-05-16',
    minutos: 7,
    categoria: 'Sector',
  },
  {
    slug: 'morosidad-sector-agroalimentario',
    titulo: 'Morosidad agroalimentaria: Ley 12/2013',
    resumen: 'La Ley de la Cadena Alimentaria obliga a pagar en 30/60 dÃ­as. Sanciones hasta 1.000.000â‚¬. CÃ³mo cobrar a cadenas y mayoristas.',
    fecha: '2026-05-16',
    minutos: 8,
    categoria: 'Sector',
  },
  {
    slug: 'morosidad-sector-sanitario',
    titulo: 'Morosidad en clÃ­nicas y mutuas sanitarias',
    resumen: 'ClÃ­nicas privadas (60-90 dÃ­as), mutuas (60-120), residencias (30-60). CÃ³mo cobrar sin perder el cliente.',
    fecha: '2026-05-16',
    minutos: 7,
    categoria: 'Sector',
  },
  {
    slug: 'morosidad-ecommerce-tiendas-online',
    titulo: 'Morosidad en ecommerce: chargebacks y SEPA',
    resumen: 'Los 3 tipos de impago en tiendas online: chargebacks (25â‚¬ comisiÃ³n), SEPA devuelto, B2B con plazos. CÃ³mo defenderse de cada uno.',
    fecha: '2026-05-16',
    minutos: 7,
    categoria: 'Sector',
  },
  {
    slug: 'morosidad-sector-construccion',
    titulo: 'Morosidad en el sector construcciÃ³n 2026',
    resumen: 'El sector con peor morosidad de EspaÃ±a (108 dÃ­as de pago medio). Causas, marco legal especÃ­fico y cÃ³mo proteger tu empresa.',
    fecha: '2026-05-16',
    minutos: 8,
    categoria: 'Sector',
  },
  {
    slug: 'ratio-liquidez-pyme-2026',
    titulo: 'Ratio de liquidez para pymes: fÃ³rmula y valores ideales',
    resumen: 'El indicador clave para saber si tu empresa puede pagar a corto plazo. FÃ³rmula, ejemplos y cÃ³mo mejorarlo cobrando antes.',
    fecha: '2026-05-16',
    minutos: 7,
    categoria: 'Finanzas',
  },
  {
    slug: 'domiciliacion-sepa-cobros-automaticos',
    titulo: 'DomiciliaciÃ³n SEPA: cÃ³mo cobrar automÃ¡ticamente',
    resumen: 'CÃ³mo funciona el cobro SEPA paso a paso. Mandato, plazos, B2C vs B2B y costes. Reduce la morosidad estructural hasta un 70%.',
    fecha: '2026-05-16',
    minutos: 7,
    categoria: 'Cobros',
  },
  {
    slug: 'modelo-presupuesto-autonomo',
    titulo: 'Modelo de presupuesto para autÃ³nomos (plantilla gratis)',
    resumen: 'Plantilla profesional con las 5 clÃ¡usulas que blindan tus cobros: anticipo, Ley 3/2004, suspensiÃ³n por impago, validez y firma del cliente.',
    fecha: '2026-05-16',
    minutos: 8,
    categoria: 'Plantillas',
  },
  {
    slug: 'gestion-cuentas-a-cobrar-pyme',
    titulo: 'GestiÃ³n de cuentas a cobrar para pymes',
    resumen: 'KPIs (DSO, aging, morosidad), polÃ­tica de crÃ©dito y automatizaciÃ³n. CÃ³mo gestionar profesionalmente el dinero que NO has cobrado todavÃ­a.',
    fecha: '2026-05-16',
    minutos: 10,
    categoria: 'Finanzas',
  },
  {
    slug: 'factura-electronica-b2b-obligatoria-espana',
    titulo: 'Factura electrÃ³nica B2B obligatoria en EspaÃ±a',
    resumen: 'La Ley Crea y Crece obliga a todas las empresas a usar factura electrÃ³nica. Fechas exactas, multas hasta 10.000â‚¬ y guÃ­a prÃ¡ctica.',
    fecha: '2026-05-16',
    minutos: 7,
    categoria: 'Normativa fiscal',
  },
  {
    slug: 'razones-clientes-no-pagan-facturas',
    titulo: '7 razones por las que tus clientes no te pagan',
    resumen: 'No todos los impagos son iguales. Las 7 razones mÃ¡s comunes ordenadas por frecuencia, con la soluciÃ³n concreta para cada una.',
    fecha: '2026-05-16',
    minutos: 7,
    categoria: 'AnÃ¡lisis',
  },
  {
    slug: 'verifactu-facturas-electronicas-2026',
    titulo: 'Veri*factu y facturas electrÃ³nicas en EspaÃ±a 2026',
    resumen: 'La nueva obligaciÃ³n que afecta a autÃ³nomos y empresas. Plazos, sanciones (hasta 50.000â‚¬) y cÃ³mo prepararte.',
    fecha: '2026-05-16',
    minutos: 8,
    categoria: 'Normativa fiscal',
  },
  {
    slug: 'factura-proforma-vs-factura-ordinaria',
    titulo: 'Factura proforma vs factura ordinaria',
    resumen: 'Una vale para Hacienda, la otra no. Diferencias legales y cuÃ¡ndo usar cada una. Con plantilla gratis.',
    fecha: '2026-05-16',
    minutos: 5,
    categoria: 'FacturaciÃ³n',
  },
  {
    slug: 'facturas-recurrentes-suscripciones',
    titulo: 'Facturas recurrentes para suscripciones',
    resumen: 'CÃ³mo gestionar cuotas mensuales en SaaS, alquileres y mantenimientos. AutomatizaciÃ³n, SEPA y reducciÃ³n de impagos.',
    fecha: '2026-05-16',
    minutos: 6,
    categoria: 'FacturaciÃ³n',
  },
  {
    slug: 'factoring-vs-recordatorios-cobro',
    titulo: 'Factoring vs recordatorios automÃ¡ticos: Â¿quÃ© te conviene?',
    resumen: 'Comparativa honesta entre adelantar facturas con descuento del 3-5% o usar recordatorios automÃ¡ticos sin coste por factura.',
    fecha: '2026-05-16',
    minutos: 7,
    categoria: 'FinanciaciÃ³n',
  },
  {
    slug: 'como-evitar-clientes-morosos',
    titulo: 'CÃ³mo evitar clientes morosos: 8 reglas antes de firmar',
    resumen: 'Reclamar a un moroso te ocupa 10 veces mÃ¡s tiempo que detectarlo antes de empezar. Esta es la lista que ojalÃ¡ te hubieran dado el primer dÃ­a.',
    fecha: '2026-05-16',
    minutos: 8,
    categoria: 'PrevenciÃ³n',
  },
  {
    slug: 'plazos-pago-entre-empresas-espana',
    titulo: 'Plazos de pago entre empresas en EspaÃ±a 2026',
    resumen: '60 dÃ­as B2B, 30 dÃ­as AdministraciÃ³n, 30 dÃ­as perecederos. Todos los plazos legales de pago y cÃ³mo aprovecharlos en reclamaciones.',
    fecha: '2026-05-16',
    minutos: 6,
    categoria: 'Marco legal',
  },
  {
    slug: 'contrato-prestacion-servicios-autonomo',
    titulo: 'Modelo contrato prestaciÃ³n de servicios autÃ³nomo (gratis)',
    resumen: 'Plantilla completa con clÃ¡usulas antimorosos, intereses Ley 3/2004 y protecciÃ³n legal. Lista para usar.',
    fecha: '2026-05-16',
    minutos: 11,
    categoria: 'Plantillas',
  },
  {
    slug: 'software-gestion-cobros-comparativa',
    titulo: 'Mejor software de gestiÃ³n de cobros 2026: comparativa EspaÃ±a',
    resumen: 'AnÃ¡lisis honesto de 7 herramientas para cobrar facturas en EspaÃ±a. Saldea, Holded, Quipu, Anfix, Sage, Chaser y Excel cara a cara: precios, IA, integraciÃ³n Stripe.',
    fecha: '2026-05-16',
    minutos: 12,
    categoria: 'Comparativa',
  },
  {
    slug: 'ley-3-2004-morosidad-explicada',
    titulo: 'Ley 3/2004 contra la morosidad: guÃ­a completa 2026',
    resumen: 'Plazos mÃ¡ximos, intereses de demora del 12,5% y los 40â‚¬ de indemnizaciÃ³n por costes de cobro. Todo lo que debes saber para cobrar tus facturas con respaldo legal.',
    fecha: '2026-05-16',
    minutos: 8,
    categoria: 'Marco legal',
  },
  {
    slug: 'como-cobrar-cliente-moroso',
    titulo: 'CÃ³mo cobrar a un cliente moroso paso a paso',
    resumen: 'Calendario de 7 fases probado para recuperar tu dinero sin acabar en juicio. Del recordatorio amable al procedimiento monitorio, con plantillas y plazos.',
    fecha: '2026-05-16',
    minutos: 10,
    categoria: 'GuÃ­a prÃ¡ctica',
  },
  {
    slug: 'como-enviar-burofax-reclamar-deuda',
    titulo: 'CÃ³mo enviar un burofax para reclamar una deuda',
    resumen: 'GuÃ­a paso a paso con modelo gratis: contenido, precio (28-35â‚¬), envÃ­o online en Correos y quÃ© pasa si el deudor no lo recoge.',
    fecha: '2026-05-16',
    minutos: 7,
    categoria: 'Procedimiento legal',
  },
  {
    slug: 'calcular-intereses-demora-factura-impagada',
    titulo: 'CÃ³mo calcular los intereses de demora de una factura impagada',
    resumen: 'FÃ³rmula exacta, tipo actualizado a 2026 (12,5%) y tabla con ejemplos reales segÃºn importe y dÃ­as de retraso. Listo para reclamar al moroso.',
    fecha: '2026-05-16',
    minutos: 5,
    categoria: 'CÃ¡lculos legales',
  },
  {
    slug: 'procedimiento-monitorio-reclamar-deuda',
    titulo: 'Procedimiento monitorio: cÃ³mo reclamar una deuda sin abogado',
    resumen: 'Paso a paso para el monitorio en EspaÃ±a: documentaciÃ³n, formularios, plazos y coste (0â‚¬ si la deuda es inferior a 2.000â‚¬).',
    fecha: '2026-05-16',
    minutos: 9,
    categoria: 'VÃ­a judicial',
  },
  {
    slug: 'modelo-email-reclamacion-factura-impagada',
    titulo: 'Modelo de email de reclamaciÃ³n de factura impagada (4 plantillas 2026)',
    resumen: 'Las 4 plantillas que de verdad funcionan en EspaÃ±a segÃºn los dÃ­as de retraso. Listas para copiar, adaptadas a la Ley 3/2004 de morosidad y RGPD.',
    fecha: '2026-05-13',
    minutos: 9,
    categoria: 'Cobros Â· Plantillas',
  },
]

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100">
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/saldea" className="text-sm text-zinc-500 hover:text-zinc-400 transition-colors">Saldea</Link>
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
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">Blog de Saldea</h1>
        <p className="text-xl text-zinc-400 mb-12">
          GuÃ­as prÃ¡cticas para que autÃ³nomos y pymes espaÃ±olas cobren antes y mejor.
        </p>

        <div className="space-y-8">
          {articulos.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="block border border-white/10 rounded-xl p-8 hover:border-sky-500/40 transition-all"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2">
                {a.categoria}
              </div>
              <h2 className="text-2xl font-bold text-zinc-100 mb-3 hover:text-sky-300 transition-colors">
                {a.titulo}
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-4">{a.resumen}</p>
              <div className="text-sm text-zinc-500">
                <time dateTime={a.fecha}>{new Date(a.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</time> Â· {a.minutos} min de lectura
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-zinc-900/30 border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Â¿Quieres dejar de perseguir cobros?</h3>
          <p className="text-zinc-400 mb-5">
            Saldea automatiza los recordatorios con IA. PruÃ©balo 1 mes gratis, sin compromiso.
          </p>
          <Link
            href="/registro"
            className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors"
          >
            Empezar gratis â†’
          </Link>
        </div>
      </section>
    </div>
  )
}
