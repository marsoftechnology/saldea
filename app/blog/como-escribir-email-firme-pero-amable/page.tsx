import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo escribir un email firme pero amable para cobrar | Saldea',
  description: 'La fórmula exacta para escribir emails firmes pero educados al reclamar facturas. Estructura, palabras clave y plantilla completa.',
  alternates: { canonical: 'https://marsof.es/blog/como-escribir-email-firme-pero-amable' },
  keywords: ['email firme cobrar', 'email reclamación amable', 'email serio sin agresivo', 'tono email moroso', 'escribir email cobro profesional'],
  openGraph: { title: 'Email firme pero amable para cobrar', description: 'Estructura y plantilla.', type: 'article', locale: 'es_ES' },
}

export default function Page() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Plantillas · 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cómo escribir un email firme pero amable</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">La diferencia entre cobrar y perder el cliente está en el tono. Aquí la fórmula.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">La estructura ABCD</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Un email firme pero amable sigue esta estructura:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li><strong>A — Apertura cordial</strong> (1 línea, saludo personal)</li>
            <li><strong>B — Bloque del problema</strong> (factura, fecha, importe, hechos secos)</li>
            <li><strong>C — Consecuencias informativas</strong> (no amenazas: información legal)</li>
            <li><strong>D — Despedida con salida positiva</strong> (oferta para resolver)</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plantilla completa</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5 text-sm">
            <p className="text-zinc-300 whitespace-pre-line">
{`Asunto: Factura [NÚMERO] vencida — Acción requerida

Hola [Nombre],

Espero que estés bien.

[B] Te escribo porque la factura nº [NÚMERO] de fecha [FECHA EMISIÓN] por importe de [IMPORTE]€ ha vencido el [FECHA VENCIMIENTO] y, a día de hoy, sigue pendiente de pago.

[C] Te informo que, conforme a la Ley 3/2004 de medidas contra la morosidad en operaciones comerciales, desde el vencimiento se devengan automáticamente:
- Intereses de demora del 12,5% anual (BCE + 8 puntos)
- Indemnización fija de 40€ por costes de cobro

A día de hoy, el importe total adeudado asciende a [IMPORTE TOTAL]€.

[D] Si ya has realizado el pago en los últimos días, por favor remíteme el justificante para que pueda cuadrarlo. En caso contrario, te agradecería que me confirmes una fecha concreta de pago. Estoy abierto a estudiar un plan de pago si necesitas fraccionarlo.

Quedo a la espera de tu respuesta.

Un saludo,
[Tu nombre]
[Tu empresa]
[Tu teléfono]`}
            </p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Por qué funciona esta estructura</h2>
          <ul className="space-y-3 text-zinc-300 mb-6">
            <li><strong>"Espero que estés bien":</strong> abre cordial, no entras a degüello</li>
            <li><strong>Datos secos en B:</strong> factura, fecha, importe. Hechos, no emociones</li>
            <li><strong>"Te informo" en C:</strong> es INFORMACIÓN, no amenaza. Le das datos para decidir</li>
            <li><strong>"Si ya has realizado el pago":</strong> le das salida, no asumes mala fe</li>
            <li><strong>"Estoy abierto a plan de pago":</strong> humaniza y muestra que prefieres cobrar a litigar</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Palabras que SÍ usar</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✅ "Te informo" → frio pero educado</li>
            <li>✅ "Conforme a la Ley 3/2004" → da seriedad legal</li>
            <li>✅ "Te agradecería que confirmes" → pide acción concreta</li>
            <li>✅ "Estoy abierto a" → muestra flexibilidad</li>
            <li>✅ "Quedo a la espera" → cierre profesional</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Palabras que NO usar (rompen el tono)</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>❌ "Tienes que" → suena imperativo</li>
            <li>❌ "Es inadmisible" → emocional</li>
            <li>❌ "No puedo más" → muestras debilidad</li>
            <li>❌ "Esta es la última vez" → ultimátum que probablemente no cumplirás</li>
            <li>❌ "Llevo esperando..." → quejica</li>
            <li>❌ "Por favor" repetido → suena a súplica</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo enviar este email</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>📅 <strong>Día 7-15 vencido:</strong> primer email con esta plantilla</li>
            <li>📅 <strong>Día 30 vencido:</strong> sube tono añadiendo "Plazo improrrogable: 7 días naturales"</li>
            <li>📅 <strong>Día 60 vencido:</strong> burofax con misma estructura pero formal</li>
          </ul>
        </section>
        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea envía estos emails automáticamente</h3>
          <p className="text-zinc-300 mb-5">Estructura ABCD aplicada por la IA. Calcula intereses y los inserta en el email. Tú no escribes nada. <strong>15 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
