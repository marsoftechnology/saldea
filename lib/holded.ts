// ─── Holded API Client ──────────────────────────────────────────────
// Documentación: https://developers.holded.com/reference/invoice-list

const HOLDED_BASE = 'https://api.holded.com/api'

// ── Tipos ──────────────────────────────────────────────────────────

export interface HoldedContacto {
  id: string
  name: string
  tradeName?: string
  email?: string
  phone?: string
}

export interface HoldedFactura {
  id: string
  docNumber: string
  date: number        // unix timestamp en segundos
  dueDate: number     // unix timestamp en segundos
  contact: string     // ID del contacto
  contactName: string
  total: number       // importe total (€)
  status: number      // 1=draft 2=pending 3=paid 4=overdue 5=cancelled
  desc?: string       // descripción
  items?: Array<{ name: string; desc?: string; units: number; price: number }>
}

// ── Helper HTTP ────────────────────────────────────────────────────

async function holdedGet<T>(path: string, apiKey: string): Promise<T> {
  const res = await fetch(`${HOLDED_BASE}${path}`, {
    headers: { key: apiKey },
    next: { revalidate: 0 },
  })
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    throw new Error(`Holded API error ${res.status}: ${text}`)
  }
  return res.json() as Promise<T>
}

// ── Validar API Key ────────────────────────────────────────────────
// Llama a un endpoint ligero para comprobar que la key funciona

export async function validarApiKeyHolded(apiKey: string): Promise<{ ok: boolean; error?: string }> {
  try {
    // /invoicing/v1/documents/invoice devuelve [] si no hay facturas — suficiente para validar
    await holdedGet('/invoicing/v1/documents/invoice', apiKey)
    return { ok: true }
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Error desconocido'
    if (msg.includes('401') || msg.includes('403')) {
      return { ok: false, error: 'API Key inválida o sin permisos. Comprueba que la key tiene acceso a Facturación.' }
    }
    return { ok: false, error: msg }
  }
}

// ── Obtener contactos ──────────────────────────────────────────────

export async function obtenerContactosHolded(apiKey: string): Promise<Map<string, HoldedContacto>> {
  const lista = await holdedGet<HoldedContacto[]>('/invoicing/v1/contacts', apiKey)
  const mapa = new Map<string, HoldedContacto>()
  for (const c of lista) mapa.set(c.id, c)
  return mapa
}

// ── Obtener facturas pendientes / vencidas ─────────────────────────

export async function obtenerFacturasPendientesHolded(apiKey: string): Promise<HoldedFactura[]> {
  const todas = await holdedGet<HoldedFactura[]>('/invoicing/v1/documents/invoice', apiKey)
  // Solo importamos facturas pendientes (2) y vencidas (4)
  return todas.filter(f => f.status === 2 || f.status === 4)
}

// ── Lógica de sincronización ───────────────────────────────────────
// Importa facturas de Holded en Saldea. Devuelve resumen.

export interface ResultadoSync {
  nuevos: number
  actualizados: number
  errores: string[]
  total: number
}

export async function sincronizarDesdeHolded(
  apiKey: string,
  orgId: string,
  supabase: Awaited<ReturnType<typeof import('@/lib/supabase-service').createServiceRoleClient>>,
): Promise<ResultadoSync> {
  const resultado: ResultadoSync = { nuevos: 0, actualizados: 0, errores: [], total: 0 }

  // 1. Cargar contactos de Holded
  const contactosMapa = await obtenerContactosHolded(apiKey)

  // 2. Cargar facturas pendientes/vencidas de Holded
  const facturasHolded = await obtenerFacturasPendientesHolded(apiKey)
  resultado.total = facturasHolded.length

  for (const fh of facturasHolded) {
    try {
      const contacto = contactosMapa.get(fh.contact)

      // Necesitamos email para crear el cliente
      const emailCliente = contacto?.email?.trim()
      if (!emailCliente) {
        resultado.errores.push(`Factura ${fh.docNumber}: el contacto "${fh.contactName}" no tiene email en Holded`)
        continue
      }

      // 3. Buscar o crear cliente en Saldea
      let clienteId: string

      const { data: clienteExistente } = await supabase
        .from('clientes')
        .select('id')
        .eq('org_id', orgId)
        .eq('holded_id', fh.contact)
        .maybeSingle()

      if (clienteExistente) {
        clienteId = clienteExistente.id
      } else {
        // Buscar por email (puede existir creado manualmente)
        const { data: clientePorEmail } = await supabase
          .from('clientes')
          .select('id')
          .eq('org_id', orgId)
          .eq('email', emailCliente)
          .maybeSingle()

        if (clientePorEmail) {
          // Actualizar holded_id si aún no lo tiene
          await supabase
            .from('clientes')
            .update({ holded_id: fh.contact })
            .eq('id', clientePorEmail.id)
          clienteId = clientePorEmail.id
        } else {
          // Crear nuevo cliente
          const { data: nuevoCliente, error: errCliente } = await supabase
            .from('clientes')
            .insert({
              org_id: orgId,
              nombre: contacto?.name || fh.contactName,
              email: emailCliente,
              empresa: contacto?.tradeName || null,
              telefono: contacto?.phone || null,
              holded_id: fh.contact,
            })
            .select('id')
            .single()

          if (errCliente || !nuevoCliente) {
            resultado.errores.push(`Factura ${fh.docNumber}: no se pudo crear el cliente — ${errCliente?.message}`)
            continue
          }
          clienteId = nuevoCliente.id
        }
      }

      // 4. Buscar o crear factura en Saldea
      const { data: facturaExistente } = await supabase
        .from('facturas')
        .select('id, estado')
        .eq('org_id', orgId)
        .eq('holded_id', fh.id)
        .maybeSingle()

      const fechaVencimiento = fh.dueDate
        ? new Date(fh.dueDate * 1000).toISOString().split('T')[0]
        : new Date(Date.now() + 30 * 86400 * 1000).toISOString().split('T')[0]

      const estadoSaldea = fh.status === 4 ? 'vencida' : 'pendiente'

      // Descripción: primer item o campo desc
      const descripcion = fh.desc || fh.items?.[0]?.name || null

      if (facturaExistente) {
        // Solo actualizar si el estado cambió
        if (facturaExistente.estado !== estadoSaldea) {
          await supabase
            .from('facturas')
            .update({ estado: estadoSaldea })
            .eq('id', facturaExistente.id)
          resultado.actualizados++
        }
      } else {
        const { error: errFra } = await supabase
          .from('facturas')
          .insert({
            org_id: orgId,
            cliente_id: clienteId,
            numero: fh.docNumber,
            importe: fh.total,
            fecha_vencimiento: fechaVencimiento,
            estado: estadoSaldea,
            descripcion,
            holded_id: fh.id,
          })

        if (errFra) {
          resultado.errores.push(`Factura ${fh.docNumber}: ${errFra.message}`)
          continue
        }
        resultado.nuevos++
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      resultado.errores.push(`Factura ${fh.docNumber}: ${msg}`)
    }
  }

  return resultado
}
