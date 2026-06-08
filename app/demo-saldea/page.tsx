"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clipboard,
  FileText,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

type InvoiceStatus = "Vencida" | "Pago parcial" | "Seguimiento" | "Cita próxima";

type DemoInvoice = {
  id: string;
  client: string;
  amount: number;
  daysOverdue: number;
  status: InvoiceStatus;
  priority: "Alta" | "Media" | "Baja";
  nextAction: string;
  risk: string;
};

const invoices: DemoInvoice[] = [
  {
    id: "F-1021",
    client: "Construcciones Mar Blau",
    amount: 1250,
    daysOverdue: 9,
    status: "Vencida",
    priority: "Alta",
    nextAction: "Enviar recordatorio amable pero firme",
    risk: "Importe alto y 9 días de retraso",
  },
  {
    id: "F-1022",
    client: "Reformas Delta",
    amount: 780,
    daysOverdue: 14,
    status: "Pago parcial",
    priority: "Alta",
    nextAction: "Proponer regularización del pago restante",
    risk: "Pago incompleto y retraso acumulado",
  },
  {
    id: "F-1023",
    client: "Clínica Nova",
    amount: 430,
    daysOverdue: 0,
    status: "Seguimiento",
    priority: "Media",
    nextAction: "Enviar seguimiento comercial",
    risk: "Interés detectado sin respuesta posterior",
  },
  {
    id: "F-1024",
    client: "Taller Roca",
    amount: 290,
    daysOverdue: 0,
    status: "Cita próxima",
    priority: "Alta",
    nextAction: "Enviar aviso de cita para mañana",
    risk: "Riesgo de ausencia si no se recuerda la cita",
  },
  {
    id: "F-1025",
    client: "Grupo Levante",
    amount: 1890,
    daysOverdue: 21,
    status: "Vencida",
    priority: "Alta",
    nextAction: "Escalar seguimiento y solicitar confirmación",
    risk: "Mayor importe pendiente y silencio prolongado",
  },
];

const sampleResponse =
  "Ahora mismo no puedo pagar todo. ¿Podemos dividirlo en dos pagos?";

function formatEUR(value: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildReminder(invoice: DemoInvoice) {
  const tone =
    invoice.daysOverdue >= 14
      ? "firme, profesional y sin resultar agresivo"
      : "amable, claro y profesional";

  return {
    subject: `Recordatorio de factura pendiente ${invoice.id}`,
    body: `Hola, buenos días.

Te escribo para recordar que la factura ${invoice.id}, por importe de ${formatEUR(
      invoice.amount
    )}, sigue pendiente de regularización.

Si está todo correcto, te agradecería que nos confirmaras cuándo podréis realizar el pago. Si necesitáis que reenviemos la factura o revisar algún detalle, lo vemos sin problema.

Gracias de antemano.

Un saludo.`,
    analysis: `SALDEA ha elegido un tono ${tone}. Prioriza claridad, evita presión excesiva y mantiene abierta la posibilidad de resolver dudas o reenviar la factura.`,
  };
}

function classifyResponse() {
  return {
    category: "Solicitud de pago fraccionado",
    confidence: "Alta",
    summary:
      "El cliente reconoce la deuda, no rechaza el pago y solicita dividir el importe en dos pagos.",
    recommendedAction:
      "Proponer un calendario de dos cuotas, pausar recordatorios automáticos durante 7 días y revisar el estado si no hay confirmación.",
  };
}

export default function SaldeaDemoPage() {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(invoices[0].id);
  const [generated, setGenerated] = useState<ReturnType<typeof buildReminder> | null>(
    null
  );
  const [classification, setClassification] = useState<ReturnType<
    typeof classifyResponse
  > | null>(null);
  const [copied, setCopied] = useState(false);

  const selectedInvoice = useMemo(
    () => invoices.find((invoice) => invoice.id === selectedInvoiceId) ?? invoices[0],
    [selectedInvoiceId]
  );

  const totalPending = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const highPriority = invoices.filter((invoice) => invoice.priority === "Alta").length;
  const overdueInvoices = invoices.filter((invoice) => invoice.daysOverdue > 0).length;

  function handleGenerate() {
    setGenerated(buildReminder(selectedInvoice));
    setCopied(false);
  }

  function handleClassify() {
    setClassification(classifyResponse());
  }

  async function handleCopy() {
    if (!generated) return;

    await navigator.clipboard.writeText(
      `Asunto: ${generated.subject}\n\n${generated.body}`
    );

    setCopied(true);
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.28),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(34,197,94,0.16),transparent_30%)]" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                <ShieldCheck size={16} />
                Modo demo seguro: sin emails, WhatsApps ni cargos reales
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
                SALDEA V0 Comercial
              </h1>

              <p className="mt-4 max-w-3xl text-lg text-slate-300">
                Asistente IA para cobros, facturas y seguimiento de clientes.
                Esta demo muestra el flujo principal: detectar prioridades,
                generar mensajes y clasificar respuestas.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
              <div className="text-sm text-slate-400">Estado</div>
              <div className="mt-2 flex items-center gap-2 text-emerald-300">
                <CheckCircle2 size={20} />
                Demo operativa
              </div>
              <div className="mt-3 text-xs text-slate-400">
                Acceso anticipado para clientes piloto
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <KpiCard
              icon={<FileText size={22} />}
              label="Facturas bajo seguimiento"
              value={invoices.length.toString()}
            />
            <KpiCard
              icon={<TrendingUp size={22} />}
              label="Importe gestionado"
              value={formatEUR(totalPending)}
            />
            <KpiCard
              icon={<AlertTriangle size={22} />}
              label="Prioridad alta"
              value={highPriority.toString()}
            />
            <KpiCard
              icon={<Users size={22} />}
              label="Facturas vencidas"
              value={overdueInvoices.toString()}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div className="space-y-6">
          <Panel title="Facturas y clientes detectados" icon={<FileText size={20} />}>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <div className="grid grid-cols-[1fr_0.8fr_0.6fr] bg-white/5 px-4 py-3 text-xs uppercase tracking-wide text-slate-400 md:grid-cols-[1.1fr_0.7fr_0.5fr_0.6fr]">
                <div>Cliente</div>
                <div>Factura</div>
                <div className="hidden md:block">Importe</div>
                <div>Prioridad</div>
              </div>

              {invoices.map((invoice) => {
                const active = selectedInvoiceId === invoice.id;

                return (
                  <button
                    key={invoice.id}
                    onClick={() => {
                      setSelectedInvoiceId(invoice.id);
                      setGenerated(null);
                      setCopied(false);
                    }}
                    className={`grid w-full grid-cols-[1fr_0.8fr_0.6fr] items-center px-4 py-4 text-left transition md:grid-cols-[1.1fr_0.7fr_0.5fr_0.6fr] ${
                      active
                        ? "bg-blue-500/15"
                        : "border-t border-white/10 hover:bg-white/5"
                    }`}
                  >
                    <div>
                      <div className="font-medium text-white">{invoice.client}</div>
                      <div className="mt-1 text-sm text-slate-400">
                        {invoice.status} · {invoice.risk}
                      </div>
                    </div>

                    <div className="text-slate-300">{invoice.id}</div>

                    <div className="hidden text-slate-300 md:block">
                      {formatEUR(invoice.amount)}
                    </div>

                    <div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          invoice.priority === "Alta"
                            ? "bg-red-400/15 text-red-200"
                            : "bg-yellow-400/15 text-yellow-100"
                        }`}
                      >
                        {invoice.priority}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </Panel>

          <Panel title="Acción recomendada por SALDEA" icon={<Sparkles size={20} />}>
            <div className="grid gap-4 md:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-sm text-slate-400">Factura seleccionada</div>
                <div className="mt-2 text-2xl font-semibold">{selectedInvoice.id}</div>
                <div className="mt-1 text-slate-300">{selectedInvoice.client}</div>

                <div className="mt-5 space-y-3 text-sm">
                  <InfoRow label="Importe" value={formatEUR(selectedInvoice.amount)} />
                  <InfoRow
                    label="Días vencida"
                    value={
                      selectedInvoice.daysOverdue > 0
                        ? `${selectedInvoice.daysOverdue} días`
                        : "No vencida"
                    }
                  />
                  <InfoRow label="Estado" value={selectedInvoice.status} />
                  <InfoRow label="Prioridad" value={selectedInvoice.priority} />
                </div>
              </div>

              <div className="rounded-2xl border border-blue-300/20 bg-blue-400/10 p-5">
                <div className="mb-3 flex items-center gap-2 text-blue-100">
                  <Bot size={20} />
                  Recomendación
                </div>

                <p className="text-slate-200">{selectedInvoice.nextAction}</p>

                <p className="mt-4 text-sm text-slate-400">
                  Motivo: {selectedInvoice.risk}. SALDEA prioriza esta acción para
                  reducir retrasos, evitar pérdidas de seguimiento y mejorar la
                  recuperación de cobros.
                </p>

                <button
                  onClick={handleGenerate}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                >
                  Generar recordatorio con IA
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </Panel>

          {generated && (
            <Panel title="Mensaje generado" icon={<MessageSquare size={20} />}>
              <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-5">
                <div className="text-sm text-emerald-200">Asunto</div>
                <div className="mt-2 font-semibold">{generated.subject}</div>

                <div className="mt-5 text-sm text-emerald-200">Cuerpo</div>

                <pre className="mt-2 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/25 p-4 text-sm leading-relaxed text-slate-100">
                  {generated.body}
                </pre>

                <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                  {generated.analysis}
                </div>

                <button
                  onClick={handleCopy}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Clipboard size={16} />
                  {copied ? "Copiado" : "Copiar mensaje"}
                </button>
              </div>
            </Panel>
          )}
        </div>

        <div className="space-y-6">
          <Panel title="Clasificación de respuesta" icon={<Bot size={20} />}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-sm text-slate-400">Respuesta recibida</div>

              <p className="mt-3 rounded-xl border border-white/10 bg-black/25 p-4 text-sm text-slate-200">
                “{sampleResponse}”
              </p>

              <button
                onClick={handleClassify}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
              >
                Clasificar con SALDEA
                <Sparkles size={16} />
              </button>

              {classification && (
                <div className="mt-5 space-y-4">
                  <InfoBox label="Categoría" value={classification.category} />
                  <InfoBox label="Confianza" value={classification.confidence} />
                  <InfoBox label="Resumen" value={classification.summary} />
                  <InfoBox
                    label="Acción recomendada"
                    value={classification.recommendedAction}
                  />
                </div>
              )}
            </div>
          </Panel>

          <Panel title="Resumen semanal" icon={<TrendingUp size={20} />}>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="font-semibold text-white">Prioridad principal</div>
                <p className="mt-2">
                  Grupo Levante y Construcciones Mar Blau concentran el mayor
                  riesgo por importe pendiente y retraso acumulado.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="font-semibold text-white">
                  Potencial de automatización
                </div>
                <p className="mt-2">
                  SALDEA puede preparar mensajes, clasificar respuestas y sugerir
                  la siguiente acción sin ejecutar envíos reales en esta demo.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
                <div className="font-semibold text-emerald-100">
                  Acceso anticipado
                </div>
                <p className="mt-2 text-emerald-50/85">
                  Los clientes piloto pueden obtener un mes gratuito si aportan
                  feedback útil o reportan incidencias relevantes validadas por el
                  equipo técnico.
                </p>
              </div>
            </div>
          </Panel>

          <Panel title="Lo que demuestra esta V0" icon={<CheckCircle2 size={20} />}>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex gap-3">
                <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={16} />
                Detección de facturas y clientes prioritarios.
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={16} />
                Generación de mensajes profesionales de cobro.
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={16} />
                Clasificación de respuestas recibidas por clientes.
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={16} />
                Recomendación de la siguiente acción comercial.
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="mt-0.5 shrink-0 text-blue-300" size={16} />
                Modo demo seguro sin envíos ni automatizaciones reales.
              </li>
            </ul>
          </Panel>
        </div>
      </section>
    </main>
  );
}

function KpiCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl backdrop-blur">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-blue-100">
        {icon}
      </div>
      <div className="text-3xl font-semibold">{value}</div>
      <div className="mt-1 text-sm text-slate-400">{label}</div>
    </div>
  );
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-2xl backdrop-blur">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-blue-100">
          {icon}
        </div>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2 last:border-b-0">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-2 text-sm text-slate-100">{value}</div>
    </div>
  );
}

