import { NextResponse } from 'next/server'
import { getActiveOrg } from '@/lib/auth-org'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createServiceRoleClient } from '@/lib/supabase-service'

// ── Tipos de respuesta de la API de Anfix ─────────────────────────────────

interface AnfixContact {
  id: number | string
  name: string
  email?: string
}

interface AnfixInvoice {
  id: number | string
  number?: string
  invoice_number?: string   // Anfix may use either key
  contact?: AnfixContact
  client?: AnfixContact     // Anfix may use either key
  concept?: string
  description?: string
  total_amount?: string | number
  amount?: string | number  // Anfix may use either key
  due_date?: string         // YYYY-MM-DD
  expiration_date?: string  // Anfix may use either key
  status?: string
  state?: string            // Anfix may use either key
}

interface AnfixResponse {
  data?: AnfixInvoice[]
  invoices?: AnfixInvoice[]
  items?: AnfixInvoice[]
}

// ── Mapeado de estados Anfix → Saldea ─────────────────────────────────────

function mapearEstado(status: string | undefined): string {
  if (!status) return 'pendiente'
  const s = status.toLowerCase()
  if (s === 'paid' || s === 'cobrada' || s === 'pagada') return 'cobrada'
  if (s === 'overdue' || s === 'vencida' || s === 'expired') return 'vencida'
  return 'pendiente'
}

// ── Normalizar factura Anfix (acepta distintos nombres de campo) ───────────

function normalizar(inv: AnfixInvoice) {
  const contact = inv.contact ?? inv.client
  const numero = inv.number ?? inv.invoice_number ?? String(inv.id)
  const importe = parseFloat(String(inv.total_amount ?? inv.amount ?? '0')) || 0
  const fechaVencimiento = inv.due_date ?? inv.expiration_date ?? new Date().toISOString().split('T')[0]
  const estado = mapearEstado(inv.status ?? inv.state)
  const concepto = inv.concept ?? inv.description ?? null
  return { contact, numero, importe, fechaVencimiento, estado, concepto }
}

// ── Obtener facturas de Anfix (paginado) ──────────────────────────────────

async function fetchFacturasAnfix(apiKey: string): Promise<AnfixInvoice[]> {
  const facturas: AnfixInvoice[] = []
  let page = 1
  const perPage = 50

  while (true) {
    const res = await fetch(
      `https://api.anfix.com/api/invoices?page=${page}&per_page=${perPage}&status=pending,overdue`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json',
        },
      }
    )

    if (res.status === 401 || res.status === 403) {
      throw new Error('API key de Anfix inválida o expirada. Reconecta desde Ajustes.')
    }
    if (!res.ok) {
      throw new Error(`Error de Anfix (${res.status}): ${await res.text().catch(() => res.statusText)}`)
    }

    const data: AnfixResponse = await res.json()
    const lote: AnfixInvoice[] = data?.data ?? data?.invoices ?? data?.items ?? []
    facturas.push(...lote)

    if (lote.length < perPage) break
    page++
    if (page > 20) break  // Límite de seguridad: máx 1000 facturas
  }

  // Solo pendientes y vencidas
  return facturas.filter(f => {
    const s = (f.status ?? f.state ?? '').toLowerCase()
    return s !== 'paid' && s !== 'cobrada' && s !== 'pagada'
  })
}

// ── Handler ───────────────────────────────────────────────────────────────

// POST /api/anfix/sync — sincroniza facturas desde Anfix
export async function POST() {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (org.role === 'readonly') return NextResponse.json({ error: 'Sin permisos' }, { status: 403 })

  const supabase = await createServerSupabaseClient()

  const { data: config } = await supabase
    .from('configuraciones_usuario')
    .select('anfix_api_key')
    .eq('org_id', org.org_id)
    .maybeSingle()

  if (!config?.anfix_api_key) {
    return NextResponse.json({ error: 'Anfix no está conectado. Conecta tu cuenta desde Ajustes.' }, { status: 400 })
  }

  let facturasAnfix: AnfixInvoice[]
  try {
    facturasAnfix = await fetchFacturasAnfix(config.anfix_api_key)
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Error desconocido'
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  const serviceClient = createServiceRoleClient()
  let nuevas = 0
  let yaExistian = 0

  for (const inv of facturasAnfix) {
    const { contact, numero, importe, fechaVencimiento, estado, concepto } = normalizar(inv)

    if (!contact?.name) continue  // Sin cliente, saltamos

    let clienteId: string | null = null

    // Buscar por email si está disponible
    if (contact.email) {
      const { data: clienteExistente } = await serviceClient
        .from('clientes')
        .select('id')
        .eq('org_id', org.org_id)
        .eq('email', contact.email)
        .maybeSingle()
      if (clienteExistente) clienteId = clienteExistente.id
    }

    // Buscar por nombre si no se encontró por email
    if (!clienteId) {
      const { data: clientePorNombre } = await serviceClient
        .from('clientes')
        .select('id')
        .eq('org_id', org.org_id)
        .eq('nombre', contact.name)
        .maybeSingle()
      if (clientePorNombre) clienteId = clientePorNombre.id
    }

    // Crear cliente si no existe
    if (!clienteId) {
      const { data: nuevoCliente } = await serviceClient
        .from('clientes')
        .insert({
          org_id: org.org_id,
          nombre: contact.name,
          email: contact.email ?? null,
        })
        .select('id')
        .single()
      if (nuevoCliente) clienteId = nuevoCliente.id
    }

    if (!clienteId) continue

    // Comprobar si la factura ya existe
    const { data: facturaExistente } = await serviceClient
      .from('facturas')
      .select('id')
      .eq('org_id', org.org_id)
      .eq('numero', numero)
      .maybeSingle()

    if (facturaExistente) {
      yaExistian++
      continue
    }

    // Insertar factura nueva
    const { error: errInsert } = await serviceClient
      .from('facturas')
      .insert({
        org_id: org.org_id,
        cliente_id: clienteId,
        numero,
        importe,
        fecha_vencimiento: fechaVencimiento,
        descripcion: concepto,
        estado,
      })

    if (!errInsert) nuevas++
  }

  // Actualizar timestamp de última sync
  await supabase
    .from('configuraciones_usuario')
    .update({ anfix_last_sync: new Date().toISOString() })
    .eq('org_id', org.org_id)

  return NextResponse.json({
    ok: true,
    sincronizadas: facturasAnfix.length,
    nuevas,
    yaExistian,
  })
}
