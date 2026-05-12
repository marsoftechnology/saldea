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
    case 'pendiente': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'vencida':   return 'text-red-600 bg-red-50 border-red-200'
    case 'cobrada':   return 'text-green-600 bg-green-50 border-green-200'
    case 'cancelada': return 'text-gray-500 bg-gray-50 border-gray-200'
    default:          return 'text-gray-600 bg-gray-50 border-gray-200'
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
