export type Patron = 'agresivo' | 'normal' | 'suave' | 'personalizado'

const PRESETS: Record<Exclude<Patron, 'personalizado'>, { base: number[]; step: number }> = {
  agresivo: { base: [3, 7, 14], step: 7 },
  normal: { base: [7, 15, 30], step: 15 },
  suave: { base: [15, 30, 60], step: 30 },
}

export function computarDiasRecordatorios(
  patron: Patron | null | undefined,
  custom: number[] | null | undefined,
  cantidad: number
): number[] {
  let base: number[]
  let step: number

  if (patron === 'personalizado' && custom && custom.length > 0) {
    base = [...custom].filter(n => Number.isInteger(n) && n > 0).sort((a, b) => a - b)
    if (base.length === 0) {
      base = PRESETS.normal.base
      step = PRESETS.normal.step
    } else {
      step = base.length >= 2 ? base[base.length - 1] - base[base.length - 2] : 7
    }
  } else {
    const preset = PRESETS[(patron as Exclude<Patron, 'personalizado'>) ?? 'normal'] ?? PRESETS.normal
    base = preset.base
    step = preset.step
  }

  const dias: number[] = []
  for (let i = 0; i < cantidad; i++) {
    if (i < base.length) dias.push(base[i])
    else dias.push(base[base.length - 1] + (i - base.length + 1) * step)
  }
  return dias
}

export type TonoMensaje = 'amigable' | 'firme' | 'formal' | 'extremo'

export function tonoPorIndice(i: number): TonoMensaje {
  if (i === 0) return 'amigable'
  if (i === 1) return 'firme'
  return 'formal'
}

export type TonoPreset = 'cordial' | 'firme' | 'contundente' | 'extremo' | 'personalizado'

export function calcularTonos(preset: TonoPreset | null | undefined, cantidad: number): TonoMensaje[] {
  const tonos: TonoMensaje[] = []
  for (let i = 0; i < cantidad; i++) {
    if (preset === 'cordial') tonos.push('amigable')
    else if (preset === 'firme') tonos.push('firme')
    else if (preset === 'contundente') tonos.push('formal')
    else if (preset === 'extremo') tonos.push('extremo')
    else tonos.push(tonoPorIndice(i))
  }
  return tonos
}

export function parsearDiasPersonalizados(texto: string): number[] {
  return texto
    .split(/[,\s]+/)
    .map(s => parseInt(s.trim(), 10))
    .filter(n => Number.isFinite(n) && n > 0)
}

// Festivos nacionales fijos de España (formato MM-DD)
const FESTIVOS_NACIONALES_FIJOS = [
  '01-01', // Año Nuevo
  '01-06', // Reyes
  '05-01', // Día del Trabajo
  '08-15', // Asunción de la Virgen
  '10-12', // Fiesta Nacional / Hispanidad
  '11-01', // Todos los Santos
  '12-06', // Constitución
  '12-08', // Inmaculada Concepción
  '12-25', // Navidad
]

// Festivos movibles por año (Viernes Santo y otros) — añade más años conforme avancen
const FESTIVOS_MOVIBLES: Record<number, string[]> = {
  2026: ['04-03'],            // Viernes Santo 2026
  2027: ['03-26'],            // Viernes Santo 2027
  2028: ['04-14'],            // Viernes Santo 2028
}

export function esFestivoNacionalES(fecha: Date): boolean {
  // Calcular fecha en hora España (Europe/Madrid)
  const partes = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(fecha)
  const map = Object.fromEntries(partes.map(p => [p.type, p.value]))
  const año = parseInt(map.year, 10)
  const mmdd = `${map.month}-${map.day}`

  if (FESTIVOS_NACIONALES_FIJOS.includes(mmdd)) return true
  if ((FESTIVOS_MOVIBLES[año] ?? []).includes(mmdd)) return true
  return false
}

export interface VariablesPlantilla {
  cliente: string
  empresa: string
  factura: string
  importe: string
  vencimiento: string
  dias_vencida: number
  empresa_emisor: string
}

export function renderizarPlantilla(plantilla: string, vars: VariablesPlantilla): { asunto: string; cuerpo: string } {
  const sustituida = plantilla
    .replaceAll('{cliente}', vars.cliente)
    .replaceAll('{empresa}', vars.empresa)
    .replaceAll('{factura}', vars.factura)
    .replaceAll('{importe}', vars.importe)
    .replaceAll('{vencimiento}', vars.vencimiento)
    .replaceAll('{dias_vencida}', String(vars.dias_vencida))
    .replaceAll('{empresa_emisor}', vars.empresa_emisor)

  const lineas = sustituida.split('\n')
  const asunto = (lineas[0] ?? '').trim() || 'Recordatorio de pago'
  let cuerpoInicio = 1
  while (cuerpoInicio < lineas.length && lineas[cuerpoInicio].trim() === '') cuerpoInicio++
  const cuerpo = lineas.slice(cuerpoInicio).join('\n').trim()
  return { asunto, cuerpo }
}
