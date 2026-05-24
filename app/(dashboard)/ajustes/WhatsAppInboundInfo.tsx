'use client'

import { useState } from 'react'

const WEBHOOK_PATH = '/api/whatsapp-inbound'

export function WhatsAppInboundInfo() {
  const [copiado, setCopiado] = useState(false)

  function copiar() {
    const url = typeof window !== 'undefined'
      ? `${window.location.origin}${WEBHOOK_PATH}`
      : `https://www.marsof.es${WEBHOOK_PATH}`
    navigator.clipboard.writeText(url).then(() => {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    }).catch(() => {})
  }

  const webhookUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${WEBHOOK_PATH}`
    : `https://www.marsof.es${WEBHOOK_PATH}`

  return (
    <div id="whatsapp-inbound" className="mb-3 bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl">💬</span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-semibold text-zinc-100">WhatsApp — Recibir respuestas</h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide bg-emerald-500/20 text-emerald-300">
                Activo
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Saldea clasifica automáticamente las respuestas de tus deudores por WhatsApp
              (pago confirmado, disputa, vacaciones…) y pausa los recordatorios en consecuencia.
            </p>
          </div>
        </div>

        {/* URL del webhook */}
        <div className="bg-zinc-800/60 border border-white/5 rounded-xl p-4 mb-4">
          <p className="text-xs font-semibold text-zinc-300 mb-3 uppercase tracking-wide">
            Webhook de entrada en Twilio
          </p>
          <div className="flex items-center gap-2 bg-zinc-900/60 border border-white/10 rounded-lg px-3 py-2.5">
            <code className="flex-1 text-xs text-sky-300 font-mono break-all">{webhookUrl}</code>
            <button
              onClick={copiar}
              className="shrink-0 text-xs text-sky-300 hover:text-sky-200 border border-sky-500/30 px-2 py-1 rounded"
            >
              {copiado ? '✓ Copiado' : 'Copiar'}
            </button>
          </div>
        </div>

        {/* Instrucciones */}
        <div className="bg-zinc-800/50 border border-white/5 rounded-xl p-4">
          <p className="text-xs font-semibold text-zinc-300 mb-3 uppercase tracking-wide">
            ¿Cómo configurarlo en Twilio?
          </p>
          <ol className="space-y-3 text-sm text-zinc-400">
            <li className="flex gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 text-xs flex items-center justify-center font-bold">1</span>
              <span>
                Accede a{' '}
                <a href="https://console.twilio.com" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">
                  console.twilio.com
                </a>{' '}
                y abre tu número de WhatsApp Business
              </span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 text-xs flex items-center justify-center font-bold">2</span>
              <span>
                Ve a <strong className="text-zinc-300">Messaging</strong> →{' '}
                <strong className="text-zinc-300">Senders</strong> → tu número →{' '}
                <strong className="text-zinc-300">Configuration</strong>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 text-xs flex items-center justify-center font-bold">3</span>
              <span>
                En <strong className="text-zinc-300">«A message comes in»</strong> pega la URL de arriba y selecciona{' '}
                <strong className="text-zinc-300">HTTP POST</strong>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 text-xs flex items-center justify-center font-bold">4</span>
              <span>Guarda los cambios. Desde ese momento, cada respuesta al número activa la clasificación IA</span>
            </li>
          </ol>
        </div>

        <div className="mt-4 text-xs text-zinc-500 space-y-1">
          <p>· Respuestas clasificadas: <em className="not-italic text-zinc-400">pago confirmado, disputa, vacaciones, pide plazos</em></p>
          <p>· En plan Pro / Max: clasificación IA y pausa automática de recordatorios</p>
          <p>· En plan Free: las respuestas se almacenan pero sin clasificación IA</p>
        </div>
      </div>
    </div>
  )
}
