// Utilidades para generar enlaces wa.me (WhatsApp Click-to-Chat).
// No usa la Business API — solo abre WhatsApp con un mensaje pre-rellenado
// que el usuario puede revisar y enviar manualmente.
// Ventajas: gratis, sin onboarding, sin plantillas aprobadas. Desventajas: no es automático.

/**
 * Normaliza un número de teléfono para wa.me.
 * wa.me requiere formato internacional sin '+', sin espacios, sin guiones.
 * Si no detecta prefijo internacional, asume España (+34).
 */
export function normalizarTelefono(telefonoRaw: string): string | null {
  if (!telefonoRaw) return null
  let t = telefonoRaw.trim()
  // Quitar espacios, guiones, paréntesis, puntos
  t = t.replace(/[\s\-().]/g, '')
  // Si empieza por +, quitarlo (wa.me no lo lleva)
  if (t.startsWith('+')) t = t.slice(1)
  // Si empieza por 00, asumir prefijo internacional
  else if (t.startsWith('00')) t = t.slice(2)
  // Si solo tiene 9 dígitos y empieza por 6, 7, 8 o 9 → móvil/fijo español, prefijar 34
  else if (/^[6789]\d{8}$/.test(t)) t = '34' + t

  // Verificar que solo contiene dígitos y tiene entre 8 y 15
  if (!/^\d{8,15}$/.test(t)) return null
  return t
}

export function generarLinkWhatsapp(telefono: string, mensaje: string): string | null {
  const tel = normalizarTelefono(telefono)
  if (!tel) return null
  const texto = encodeURIComponent(mensaje)
  return `https://wa.me/${tel}?text=${texto}`
}
