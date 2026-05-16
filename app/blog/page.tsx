import Link from 'next/link'
import type { Metadata } from 'next'
import ThemeToggleNav from '../components/ThemeToggleNav'

export const metadata: Metadata = {
  title: 'Blog · Cómo cobrar mejor tus facturas | Saldea',
  description: 'Guías prácticas y plantillas para autónomos y pymes españolas: reclamar facturas, evitar morosos, automatizar cobros.',
  alternates: { canonical: 'https://marsof.es/blog' },
}

const articulos = [
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
            <ThemeToggleNav />
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
          Guías prácticas para que autónomos y pymes españolas cobren antes y mejor.
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
                <time dateTime={a.fecha}>{new Date(a.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</time> · {a.minutos} min de lectura
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-zinc-900/30 border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">¿Quieres dejar de perseguir cobros?</h3>
          <p className="text-zinc-400 mb-5">
            Saldea automatiza los recordatorios con IA. Pruébalo 1 mes gratis, sin compromiso.
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
  )
}
