import { NextResponse } from 'next/server'
import { getActiveOrg } from '@/lib/auth-org'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createServiceRoleClient } from '@/lib/supabase-service'

// ── Tipos de respuesta de la API de Quipu ──────────────────────────────────

interface QuipuContact {
  id: number
  name: string
  email?: string
}

interface QuipuInvoice {
  id: number
  number: string
  contact: QuipuContact
  concept: string
  total_amount: string // string en la API de Quipu
  due_date: string     // YYYY-MM-DD
  state: 'paid' | 'overdue' | 'pending' | string
}

interface QuipuResponse {
  invoices: QuipuInvoice[]
}

// ── Mapeado de estados Quipu → Saldea ─────────────────────────────────────

function mapearEstado(state: string): string {
  switch (state) {
    case 'paid': return 'cobrada'
    case 'overdue': return 'vencida'
    case 'pending': return 'pendiente'
    default: return 'pendiente'
  }
}

// ── Obtener facturas de Quipu ─────────────────────────────────────────────

async function fetchFacturasQuipu(accessToken: string): Promise<QuipuInvoice[]> {
  const facturas: QuipuInvoice[] = []
  let page = 1
  const pageSize = 50

  // Iterar páginas hasta que no haya más resultados
  while (true) {
    const res = await fetch(
      `https://getquipu.com/api/invoices?page=${page}&page_size=${pageSize}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
        },
      }
    )

    if (res.status === 401 || res.status === 403) {
      throw new Error('Token de Quipu inválido o expirado. Reconecta desde Ajustes.')
    }
    if (!res.ok) {
      throw new Error(`Error de Quipu (${res.status}): ${await res.text().catch(() => res.statusText)}`)
    }

    const data: QuipuResponse = await res.json()
    const lote = data?.invoices ?? []
    facturas.push(...lote)

    // Si el lote es menor que el page_size, no hay más páginas
    if (lote.length < pageSize) break
    page++

    // Limite de seguridad: máx 20 páginas (1000 facturas)
    if (page > 20) break
  }

  // Solo facturas pendientes y vencidas
  return facturas.filter(f => f.state === 'pending' || f.state === 'overdue')
}

// ── Handler ───────────────────────────────────────────────────────────────

// POST /api/quipu/sync — sincroniza facturas desde Quipu
export async function POST() {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (org.role === 'readonly') return NextResponse.json({ error: 'Sin permisos' }, { status: 403 })

  const supabase = await createServerSupabaseClient()

  // Obtener token guardado
  const { data: config } = await supabase
    .from('configuraciones_usuario')
    .select('quipu_api_token')
    .eq('org_id', org.org_id)
    .maybeSingle()

  if (!config?.quipu_api_token) {
    return NextResponse.json({ error: 'Quipu no está conectado. Conecta tu cuenta desde Ajustes.' }, { status: 400 })
  }

  let facturasQuipu: QuipuInvoice[]
  try {
    facturasQuipu = await fetchFacturasQuipu(config.quipu_api_token)
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Error desconocido'
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  const serviceClient = createServiceRoleClient()
  let nuevas = 0
  let yaExistian = 0

  for (const invoice of facturasQuipu) {
    // Buscar o crear cliente
    let clienteId: string | null = null

    // Buscar por email si está disponible
    if (invoice.contact.email) {
      const { data: clienteExistente } = await serviceClient
        .from('clientes')
        .select('id')
        .eq('org_id', org.org_id)
        .eq('email', invoice.contact.email)
        .maybeSingle()

      if (clienteExistente) clienteId = clienteExistente.id
    }

    // Si no encontramos por email, buscar por nombre
    if (!clienteId) {
      const { data: clientePorNombre } = await serviceClient
        .from('clientes')
        .select('id')
        .eq('org_id', org.org_id)
        .eq('nombre', invoice.contact.name)
        .maybeSingle()

      if (clientePorNombre) clienteId = clientePorNombre.id
    }

    // Crear cliente si no existe
    if (!clienteId) {
      const { data: nuevoCliente } = await serviceClient
        .from('clientes')
        .insert({
          org_id: org.org_id,
          nombre: invoice.contact.name,
          email: invoice.contact.email ?? null,
        })
        .select('id')
        .single()

      if (nuevoCliente) clienteId = nuevoCliente.id
    }

    if (!clienteId) continue // No pudimos crear el cliente, saltar

    // Comprobar si la factura ya existe (por numero + org_id)
    const { data: facturaExistente } = await serviceClient
      .from('facturas')
      .select('id')
      .eq('org_id', org.org_id)
      .eq('numero', invoice.number)
      .maybeSingle()

    if (facturaExistente) {
      yaExistian++
      continue
    }

    // Insertar nueva factura
    const { error: errInsert } = await serviceClient
      .from('facturas')
      .insert({
        org_id: org.org_id,
        cliente_id: clienteId,
        numero: invoice.number,
        importe: parseFloat(invoice.total_amount) || 0,
        fecha_vencimiento: invoice.due_date,
        descripcion: invoice.concept || null,
        estado: mapearEstado(invoice.state),
      })

    if (!errInsert) {
      nuevas++
    }
  }

  // Actualizar timestamp de última sync
  await supabase
    .from('configuraciones_usuario')
    .update({ quipu_last_sync: new Date().toISOString() })
    .eq('org_id', org.org_id)

  return NextResponse.json({
    ok: true,
    sincronizadas: facturasQuipu.length,
    nuevas,
    yaExistian,
  })
}
