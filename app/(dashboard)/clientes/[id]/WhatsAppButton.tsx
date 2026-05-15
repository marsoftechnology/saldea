'use client'

import { normalizarTelefono } from '@/lib/whatsapp'

export default function WhatsAppButton({ telefono, nombreCliente }: { telefono: string; nombreCliente: string }) {
  const tel = normalizarTelefono(telefono)
  if (!tel) return null

  const mensaje = `Hola ${nombreCliente.split(' ')[0]}, ¿qué tal?`
  const href = `https://wa.me/${tel}?text=${encodeURIComponent(mensaje)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition-colors inline-flex items-center gap-1"
      title="Abrir WhatsApp con este número"
    >
      💬 WhatsApp
    </a>
  )
}
