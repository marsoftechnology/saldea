import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatearEuros(importe: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(importe)
}

export function formatearFecha(fecha: string): string {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(fecha))
}

export function diasVencida(fechaVencimiento: string): number {
  const hoy = new Date()
  const vencimiento = new Date(fechaVencimiento)
  const diff = hoy.getTime() - vencimiento.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export function colorEstado(estado: string): string {
  switch (estado) {
    case 'pendiente': return 'text-amber-300 bg-amber-500/10 border-amber-500/30'
    case 'vencida':   return 'text-rose-300 bg-rose-500/10 border-rose-500/30'
    case 'cobrada':   return 'text-sky-300 bg-sky-500/10 border-sky-500/30'
    case 'cancelada': return 'text-zinc-400 bg-zinc-500/10 border-zinc-500/30'
    default:          return 'text-zinc-400 bg-zinc-500/10 border-zinc-500/30'
  }
}

export function etiquetaEstado(estado: string): string {
  switch (estado) {
    case 'pendiente': return 'Pendiente'
    case 'vencida':   return 'Vencida'
    case 'cobrada':   return 'Cobrada'
    case 'cancelada': return 'Cancelada'
    default:          return estado
  }
}
