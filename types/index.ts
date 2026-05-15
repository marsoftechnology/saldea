export type Cliente = {
  id: string
  user_id: string
  nombre: string
  email: string
  telefono: string | null
  empresa: string | null
  created_at: string
  max_recordatorios_override: number | null
  patron_dias_override: string | null
  dias_gracia_override: number | null
  tono_preset_override: string | null
  pausar_recordatorios: boolean | null
  notas_cliente: string | null
}

export type EstadoFactura = 'pendiente' | 'vencida' | 'cobrada' | 'cancelada' | 'parcialmente_cobrada'

export type Factura = {
  id: string
  user_id: string
  cliente_id: string
  numero: string
  importe: number
  fecha_vencimiento: string
  estado: EstadoFactura
  descripcion: string | null
  created_at: string
  notas_internas: string | null
  link_pago: string | null
  pdf_propio_path: string | null
  cliente?: Cliente
}

export type MetodoPago = 'transferencia' | 'tarjeta' | 'efectivo' | 'bizum' | 'stripe' | 'paypal' | 'otro'

export type Pago = {
  id: string
  factura_id: string
  user_id: string
  importe: number
  fecha: string
  metodo: MetodoPago | string | null
  referencia: string | null
  notas: string | null
  created_at: string
}

export type Recordatorio = {
  id: string
  factura_id: string
  dias_offset: number
  tono: 'amigable' | 'firme' | 'formal'
  enviado: boolean
  enviado_at: string | null
  mensaje_preview: string | null
}

export type LogEmail = {
  id: string
  factura_id: string
  cliente_id: string
  asunto: string
  cuerpo: string
  enviado_at: string
  estado: 'enviado' | 'error'
}
