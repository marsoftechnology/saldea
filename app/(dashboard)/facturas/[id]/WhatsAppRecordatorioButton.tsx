'use client'

import { useState } from 'react'
import { normalizarTelefono } from '@/lib/whatsapp'
import { formatearEuros } from '@/lib/utils'

interface Props {
  facturaNumero: string
  facturaImporte: number
  facturaPendiente: number
  fechaVencimiento: string
  diasVencida: number
  linkPago: string | null
  clienteNombre: string
  clienteTelefono: string | null
  empresaEmisor: string
}

function diasParaTexto(diasVencida: number): string {
  if (diasVencida < 0) return `vence en ${Math.abs(diasVencida)} día${Math.abs(diasVencida) === 1 ? '' : 's'}`
  if (diasVencida === 0) return 'vence hoy'
  return `lleva ${diasVencida} día${diasVencida === 1 ? '' : 's'} vencida`
}

export default function WhatsAppRecordatorioButton({
  facturaNumero,
  facturaImporte,
  facturaPendiente,
  diasVencida,
  linkPago,
  clienteNombre,
  clienteTelefono,
  empresaEmisor,
}: Props) {
  const [editando, setEditando] = useState(false)

  if (!clienteTelefono) {
    return (
      <div className="text-xs text-zinc-500">
        💬 Este cliente no tiene teléfono. <span className="opacity-75">Añade uno para enviar por WhatsApp.</span>
      </div>
    )
  }

  const tel = normalizarTelefono(clienteTelefono)
  if (!tel) {
    return (
      <div className="text-xs text-rose-400">
        💬 Teléfono no válido para WhatsApp ({clienteTelefono}). Edita el cliente y revisa el formato.
      </div>
    )
  }

  const nombrePila = clienteNombre.split(' ')[0]
  const hayParcial = facturaPendiente < facturaImporte
  const importeMostrar = hayParcial ? facturaPendiente : facturaImporte
  const refImporte = hayParcial
    ? `${formatearEuros(facturaPendiente)} pendientes (del total ${formatearEuros(facturaImporte)})`
    : formatearEuros(facturaImporte)

  // Generar mensaje según contexto
  let mensaje: string
  if (diasVencida < 0) {
    // No vencida — preventivo
    mensaje = `Hola ${nombrePila}, soy de ${empresaEmisor}. Te recuerdo amablemente que la factura ${facturaNumero} por ${refImporte} ${diasParaTexto(diasVencida)}. ${linkPago ? `Puedes pagar al instante aquí: ${linkPago}` : 'Avísame si necesitas los datos de pago. ¡Gracias!'}`
  } else if (diasVencida === 0) {
    mensaje = `Hola ${nombrePila}, soy de ${empresaEmisor}. Te recuerdo que la factura ${facturaNumero} por ${refImporte} vence HOY. ${linkPago ? `Puedes pagar aquí: ${linkPago}` : '¿Confirmamos el pago? Gracias.'}`
  } else if (diasVencida <= 7) {
    mensaje = `Hola ${nombrePila}, ¿cómo va? Te escribo para recordarte que la factura ${facturaNumero} por ${refImporte} ${diasParaTexto(diasVencida)}. ${linkPago ? `Si lo prefieres puedes pagar online aquí: ${linkPago}` : 'Si ya la has pagado, ignora este mensaje. ¡Gracias!'}`
  } else {
    mensaje = `Hola ${nombrePila}, soy de ${empresaEmisor}. La factura ${facturaNumero} por ${refImporte} ${diasParaTexto(diasVencida)} y aún no la tenemos abonada. ${linkPago ? `Puedes regularizarlo aquí mismo: ${linkPago}` : 'Si necesitas los datos de pago o quieres comentar algo, dímelo y lo vemos. Gracias.'}`
  }

  const [texto, setTexto] = useState(mensaje)
  const href = `https://wa.me/${tel}?text=${encodeURIComponent(texto)}`

  void importeMostrar

  return (
    <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-zinc-100 flex items-center gap-2">
          <span>💬</span> Recordatorio por WhatsApp
        </h2>
        <button
          onClick={() => setEditando(e => !e)}
          className="text-xs text-zinc-400 hover:text-zinc-200"
        >
          {editando ? 'Cerrar' : 'Editar mensaje'}
        </button>
      </div>

      {editando ? (
        <div className="mb-3">
          <textarea
            value={texto}
            onChange={e => setTexto(e.target.value)}
            rows={5}
            className="w-full px-3 py-2.5 border border-white/10 rounded-lg text-sm text-zinc-100 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40 resize-y"
          />
          <p className="text-xs text-zinc-500 mt-1.5">
            Edita el mensaje antes de abrir WhatsApp. Se enviará desde tu propio WhatsApp — no se manda nada automático.
          </p>
        </div>
      ) : (
        <p className="text-sm text-zinc-300 mb-3 italic line-clamp-3 whitespace-pre-wrap">{texto}</p>
      )}

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-medium text-sm px-4 py-2.5 rounded-lg transition-colors"
      >
        <span>💬</span>
        Abrir WhatsApp con {nombrePila}
      </a>
    </div>
  )
}
