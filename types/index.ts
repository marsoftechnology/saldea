export type Cliente = {
  id: string
  user_id: string
  nombre: string
  email: string
  telefono: string | null
  empresa: string | null
  created_at: string
}

export type Factura = {
  id: string
  user_id: string
  cliente_id: string
  numero: string
  importe: number
  fecha_vencimiento: string
  estado: 'pendiente' | 'vencida' | 'cobrada' | 'cancelada'
  descripcion: string | null
  created_at: string
  cliente?: Cliente
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
