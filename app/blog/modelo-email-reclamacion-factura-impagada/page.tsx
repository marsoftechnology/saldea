import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Modelo de email de reclamación de factura impagada (4 plantillas 2026) | Saldea',
  description: 'Plantillas gratis de email para reclamar facturas impagadas: tono amable, firme, formal y burofax. Adaptadas a la legislación española y RGPD. Copia y usa.',
  alternates: { canonical: 'https://marsof.es/blog/modelo-email-reclamacion-factura-impagada' },
  openGraph: {
    title: 'Modelo de email de reclamación de factura impagada · 4 plantillas',
    description: 'Plantillas listas para copiar: amable, firme, formal y previo a burofax. Adaptadas a España y RGPD.',
    type: 'article',
    locale: 'es_ES',
  },
}

const plantillas = [
  {
    titulo: '1. Plantilla amable (1-7 días de retraso)',
    contexto: 'Úsala cuando la factura lleva poco tiempo vencida. Asume que es un olvido. Mantiene la relación comercial.',
    asunto: 'Recordatorio amistoso — Factura {NUMERO}',
    cuerpo: `Hola {NOMBRE_CLIENTE},

Espero que estés bien. Te escribo para recordarte que la factura {NUMERO} con fecha {FECHA_FACTURA} por importe de {IMPORTE}€ tenía vencimiento el {FECHA_VENCIMIENTO} y, a día de hoy, aún la veo pendiente en nuestro sistema.

Entiendo perfectamente que se puede traspapelar entre tantos correos. ¿Podrías echarle un vistazo cuando tengas un momento y confirmarme si necesitas que te reenvíe el PDF o los datos bancarios?

Si ya la has abonado en los últimos días, perdona el toque y por favor ignora este mensaje.

Un saludo,
{TU_NOMBRE}
{TU_EMPRESA}`,
  },
  {
    titulo: '2. Plantilla firme (8-20 días de retraso)',
    contexto: 'La factura lleva ya semanas. Toca subir el tono sin perder la profesionalidad. Recuerda al cliente sus obligaciones.',
    asunto: 'Factura {NUMERO} vencida — Acción requerida',
    cuerpo: `Estimado/a {NOMBRE_CLIENTE},

La factura {NUMERO}, por importe de {IMPORTE}€, venció el {FECHA_VENCIMIENTO} y a día de hoy continúa pendiente de pago.

Te agradecería que regularizases la situación en los próximos 5 días naturales mediante transferencia a la cuenta indicada en la factura. Si existe algún problema con el servicio prestado o con la facturación, por favor comunícamelo cuanto antes para resolverlo conjuntamente.

En caso de que ya se haya realizado el pago, te ruego me envíes el justificante para poder cuadrarlo.

Quedo a la espera de tu respuesta.

Atentamente,
{TU_NOMBRE}
{TU_EMPRESA}`,
  },
  {
    titulo: '3. Plantilla formal (21-45 días)',
    contexto: 'El impago se prolonga. Hay que mencionar las consecuencias legales sin amenazar. Tono frío y profesional.',
    asunto: 'Requerimiento de pago — Factura {NUMERO}',
    cuerpo: `Estimado/a {NOMBRE_CLIENTE},

Mediante el presente le notifico formalmente que la factura {NUMERO}, emitida el {FECHA_FACTURA} por importe de {IMPORTE}€, lleva {DIAS_VENCIDA} días vencida sin haber sido satisfecha.

Conforme a la Ley 3/2004 de medidas de lucha contra la morosidad en operaciones comerciales, le requiero formalmente al abono íntegro de la deuda, más los intereses legales devengados, en un plazo máximo de 10 días naturales desde la recepción de este correo.

Transcurrido dicho plazo sin recibir el pago ni una propuesta concreta de regularización, me veré obligado a iniciar las acciones legales oportunas para la reclamación de la deuda, incluida la posible inscripción en ficheros de morosidad (ASNEF, RAI) y la reclamación judicial, cuyos costes (intereses de demora, costas procesales y honorarios de procurador) serán íntegramente a su cargo.

Confío en su pronta respuesta para evitar dichas medidas.

Atentamente,
{TU_NOMBRE}
{TU_EMPRESA}`,
  },
  {
    titulo: '4. Plantilla previo a burofax (46+ días)',
    contexto: 'Último aviso amistoso antes de mandar burofax o entrar en monitorio. Plazo cerrado y advertencias claras.',
    asunto: 'ÚLTIMO AVISO PREVIO A ACCIONES LEGALES — Factura {NUMERO}',
    cuerpo: `{NOMBRE_CLIENTE},

Le comunico que la factura {NUMERO}, por importe de {IMPORTE}€, lleva {DIAS_VENCIDA} días vencida sin atender, pese a los recordatorios previos.

Este correo constituye el ÚLTIMO requerimiento extrajudicial antes de proceder a:

1. Envío de burofax con certificación de contenido y acuse de recibo.
2. Inclusión en los ficheros de información sobre solvencia patrimonial (ASNEF, RAI).
3. Reclamación judicial vía procedimiento monitorio (art. 812 LEC).
4. Reclamación íntegra de los intereses legales de demora, costas procesales y honorarios de procurador, que correrán por su cuenta.

Dispone de 7 días naturales desde la fecha de este correo para abonar la totalidad de la deuda o presentar una propuesta concreta de regularización.

Transcurrido dicho plazo, las actuaciones se iniciarán sin más aviso.

{TU_NOMBRE}
{TU_EMPRESA}`,
  },
]

const seccionesIndice = [
  { id: 'cuando-reclamar', titulo: 'Cuándo reclamar una factura impagada' },
  { id: 'errores', titulo: '5 errores típicos al reclamar por email' },
  { id: 'plantillas', titulo: 'Las 4 plantillas (copia y pega)' },
  { id: 'que-hacer-despues', titulo: 'Qué hacer si el cliente no contesta' },
  { id: 'rgpd', titulo: '¿Es legal reclamar por email? (RGPD)' },
  { id: 'automatizar', titulo: 'Cómo automatizar todo el proceso' },
]

export default function ArticuloPage() {
  const fechaPub = '2026-05-13'

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/saldea" className="text-sm text-zinc-500 hover:text-zinc-400 transition-colors">Saldea</Link>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-100 font-semibold">Blog</span>
          </div>
          <Link
            href="/registro"
            className="bg-emerald-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-emerald-400 transition-colors"
          >
            Probar Saldea gratis
          </Link>
        </div>
      </nav>

      {/* Artículo */}
      <article className="max-w-3xl mx-auto px-6 pt-12 pb-20">
        {/* Migas */}
        <nav className="text-sm text-zinc-500 mb-6">
          <Link href="/saldea" className="hover:text-zinc-400">Saldea</Link>
          <span className="mx-2">›</span>
          <Link href="/blog" className="hover:text-zinc-400">Blog</Link>
          <span className="mx-2">›</span>
          <span className="text-zinc-400">Modelo email reclamación factura impagada</span>
        </nav>

        {/* Cabecera */}
        <header className="mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">
            Cobros · Plantillas
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 leading-tight mb-5">
            Modelo de email de reclamación de factura impagada (4 plantillas 2026)
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Las 4 plantillas que de verdad funcionan en España según los días de retraso. Listas para copiar, adaptadas a la Ley 3/2004 de morosidad y al RGPD.
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-zinc-500">
            <span>Carlos Gálvez · Fundador de Saldea</span>
            <span>·</span>
            <time dateTime={fechaPub}>13 de mayo, 2026</time>
            <span>·</span>
            <span>9 min de lectura</span>
          </div>
        </header>

        {/* Índice */}
        <aside className="bg-zinc-900/30 border border-white/10 rounded-xl p-6 mb-10">
          <h2 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider mb-4">En este artículo</h2>
          <ol className="space-y-2">
            {seccionesIndice.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-emerald-300 hover:text-emerald-200 hover:underline">
                  {i + 1}. {s.titulo}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        {/* Intro */}
        <div className="prose prose-lg max-w-none">
          <p className="text-zinc-300 leading-relaxed text-lg">
            En España, según el Observatorio sobre Morosidad y Estrategia Financiera Empresarial, el plazo medio de cobro de los autónomos y pymes ronda los 81 días, muy por encima del límite legal de 60. Una factura impagada no es solo una incomodidad: es liquidez bloqueada que pone en riesgo tu negocio.
          </p>
          <p className="text-zinc-300 leading-relaxed">
            La buena noticia es que la mayoría de impagos se resuelven antes de llegar a vía judicial — si reclamas <strong>en el momento correcto</strong> y con el <strong>tono adecuado</strong>. En esta guía tienes 4 plantillas reales que puedes copiar y usar hoy mismo.
          </p>
        </div>

        {/* Sección: cuándo reclamar */}
        <section id="cuando-reclamar" className="mt-14 scroll-mt-24">
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Cuándo reclamar una factura impagada</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            La regla general en España la fija la Ley 3/2004 de morosidad: salvo pacto distinto entre las partes, una factura entre empresas vence a los 30 días naturales desde la entrega del bien o servicio (60 días como máximo). A partir de ahí, ya puedes reclamar.
          </p>
          <p className="text-zinc-300 leading-relaxed mb-4">
            En la práctica, lo que mejor funciona es escalar la presión <strong>poco a poco</strong> en función de los días de retraso:
          </p>
          <div className="overflow-x-auto -mx-2 my-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-white/10">
                  <th className="text-left py-3 px-4 font-semibold text-zinc-100">Días de retraso</th>
                  <th className="text-left py-3 px-4 font-semibold text-zinc-100">Acción recomendada</th>
                  <th className="text-left py-3 px-4 font-semibold text-zinc-100">Tono</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr><td className="py-3 px-4 text-zinc-300">1-7 días</td><td className="py-3 px-4 text-zinc-300">Email amable</td><td className="py-3 px-4 text-zinc-300">Cordial</td></tr>
                <tr><td className="py-3 px-4 text-zinc-300">8-20 días</td><td className="py-3 px-4 text-zinc-300">Email firme + llamada</td><td className="py-3 px-4 text-zinc-300">Firme</td></tr>
                <tr><td className="py-3 px-4 text-zinc-300">21-45 días</td><td className="py-3 px-4 text-zinc-300">Requerimiento formal</td><td className="py-3 px-4 text-zinc-300">Formal con base legal</td></tr>
                <tr><td className="py-3 px-4 text-zinc-300">46+ días</td><td className="py-3 px-4 text-zinc-300">Último aviso + burofax</td><td className="py-3 px-4 text-zinc-300">Extremo / legal</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-zinc-300 leading-relaxed">
            Si saltas pasos (mandar un email durísimo el día 3) quemas la relación. Si te quedas corto (seguir mandando emails amables el día 60) el cliente percibe que no pasa nada y aprende a pagarte el último.
          </p>
        </section>

        {/* Sección: errores típicos */}
        <section id="errores" className="mt-14 scroll-mt-24">
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">5 errores típicos al reclamar por email</h2>
          <ol className="space-y-4 text-zinc-300">
            <li>
              <strong className="text-zinc-100">1. Tardar demasiado.</strong> Si esperas 30 días para mandar el primer recordatorio, el cliente ya ha decidido que tu cobro no es prioridad. Manda el primer aviso el día 3-5.
            </li>
            <li>
              <strong className="text-zinc-100">2. Usar siempre el mismo tono.</strong> Mandar 4 emails amables seguidos es ineficaz. Hay que escalar.
            </li>
            <li>
              <strong className="text-zinc-100">3. No adjuntar la factura.</strong> Adjuntar el PDF elimina la excusa típica "no la encuentro, ¿me la reenvías?".
            </li>
            <li>
              <strong className="text-zinc-100">4. Amenazar antes de tiempo.</strong> Mencionar burofax o ASNEF en el día 5 te hace quedar como histérico y rompe la relación.
            </li>
            <li>
              <strong className="text-zinc-100">5. No detectar respuestas.</strong> Si el cliente responde "ya pagué" y le sigues mandando recordatorios, lo pierdes para siempre.
            </li>
          </ol>
        </section>

        {/* Sección: plantillas */}
        <section id="plantillas" className="mt-14 scroll-mt-24">
          <h2 className="text-2xl font-bold text-zinc-100 mb-2">Las 4 plantillas (copia y pega)</h2>
          <p className="text-zinc-400 mb-8">Sustituye los campos entre llaves <code className="text-emerald-300 bg-emerald-500/10 text-emerald-300 px-1 rounded">{`{NOMBRE_CLIENTE}`}</code> por los datos reales de tu factura.</p>

          <div className="space-y-10">
            {plantillas.map((pl) => (
              <div key={pl.titulo} className="border border-white/10 rounded-xl overflow-hidden">
                <div className="bg-zinc-900/30 px-6 py-4 border-b border-white/10">
                  <h3 className="text-lg font-bold text-zinc-100">{pl.titulo}</h3>
                  <p className="text-sm text-zinc-400 mt-1">{pl.contexto}</p>
                </div>
                <div className="px-6 py-5 bg-zinc-950/60">
                  <div className="text-xs font-semibold uppercase text-zinc-500 mb-1">Asunto</div>
                  <div className="text-zinc-100 font-medium mb-4">{pl.asunto}</div>
                  <div className="text-xs font-semibold uppercase text-zinc-500 mb-1">Cuerpo</div>
                  <pre className="whitespace-pre-wrap font-sans text-zinc-300 leading-relaxed text-[15px]">{pl.cuerpo}</pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección: qué hacer después */}
        <section id="que-hacer-despues" className="mt-14 scroll-mt-24">
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Qué hacer si el cliente no contesta</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Si tras las 4 plantillas el cliente sigue sin pagar ni dar señales, tienes tres caminos en España:
          </p>
          <ul className="space-y-3 text-zinc-300 list-disc list-inside">
            <li><strong>Burofax con certificación de contenido.</strong> Coste ~30€. Suele desbloquear el 40-50% de los casos solo por la presión psicológica. Vale como prueba en juicio.</li>
            <li><strong>Procedimiento monitorio (art. 812 LEC).</strong> Sin abogado ni procurador hasta 2.000€. Si el deudor no se opone en 20 días, hay título ejecutivo directo.</li>
            <li><strong>Inscripción en ASNEF / RAI.</strong> Solo si la deuda está documentada y vencida. Daña el rating crediticio del cliente y lo presiona muchísimo.</li>
          </ul>
        </section>

        {/* Sección: RGPD */}
        <section id="rgpd" className="mt-14 scroll-mt-24">
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">¿Es legal reclamar por email? (RGPD)</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Sí. Reclamar el pago de una factura emitida en el marco de una relación comercial está amparado por la base jurídica del <strong>interés legítimo</strong> (art. 6.1.f RGPD) y por la propia <strong>ejecución del contrato</strong> (art. 6.1.b). No necesitas un consentimiento expreso para mandar emails de cobro.
          </p>
          <p className="text-zinc-300 leading-relaxed">
            Lo que sí debes respetar: no compartir los datos del deudor con terceros (salvo cesión legítima a una empresa de recobro o registro de morosos), guardar las pruebas con la diligencia debida y permitir el ejercicio de derechos ARCO si el cliente los reclama.
          </p>
        </section>

        {/* Sección: automatizar — CTA Saldea */}
        <section id="automatizar" className="mt-14 scroll-mt-24">
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Cómo automatizar todo el proceso</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Copiar plantillas funciona, pero requiere que tú estés pendiente de cada vencimiento, escojas el tono correcto, mandes el PDF, detectes si el cliente responde y pauses los recordatorios cuando hace falta. Sumas fácilmente 5-10 horas al mes persiguiendo cobros.
          </p>
          <p className="text-zinc-300 leading-relaxed mb-6">
            <strong>Saldea</strong> hace exactamente eso por ti: importas tus facturas, configuras tu tono, y la IA se encarga del resto. Detecta cuando el cliente paga o discute, escala el tono según los días de retraso, y solo te avisa cuando hay algo importante.
          </p>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-500/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-zinc-100 mb-2">Prueba Saldea gratis 1 mes</h3>
            <p className="text-zinc-300 mb-5">
              Sin tarjeta, sin permanencia. Plan Pro completo durante 30 días para que veas la diferencia.
            </p>
            <Link
              href="/registro"
              className="inline-block bg-emerald-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-400 transition-colors"
            >
              Empezar gratis →
            </Link>
          </div>
        </section>

        {/* Footer del artículo */}
        <footer className="mt-16 pt-8 border-t border-white/10 text-sm text-zinc-400">
          <p>
            ¿Te ha resultado útil este artículo? Cuéntanoslo en{' '}
            <a href="mailto:hola@marsof.es" className="text-emerald-300 hover:underline">hola@marsof.es</a>.
          </p>
        </footer>
      </article>

      {/* JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Modelo de email de reclamación de factura impagada (4 plantillas 2026)',
            description: 'Plantillas gratis de email para reclamar facturas impagadas adaptadas a la legislación española y RGPD.',
            datePublished: fechaPub,
            dateModified: fechaPub,
            author: { '@type': 'Person', name: 'Carlos Gálvez', url: 'https://marsof.es' },
            publisher: {
              '@type': 'Organization',
              name: 'Saldea — Marsof Technology',
              logo: { '@type': 'ImageObject', url: 'https://marsof.es/logo.png' },
            },
            mainEntityOfPage: 'https://marsof.es/blog/modelo-email-reclamacion-factura-impagada',
          }),
        }}
      />
    </div>
  )
}
