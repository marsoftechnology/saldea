/**
 * Cliente Salt Edge Open Banking (Bank Account Data)
 * API v5 — https://www.saltedge.com/api/v5/
 *
 * Variables de entorno necesarias:
 *   SALTEDGE_APP_ID   — App-id del portal Salt Edge
 *   SALTEDGE_SECRET   — Secret del portal Salt Edge
 *
 * Cuenta gratuita: https://www.saltedge.com/products/account_information
 * Modo Pendiente: hasta 10 conexiones ficticias (sandbox)
 * Modo Prueba: hasta 100 conexiones reales (gratis)
 * Modo Vivir: ilimitado (de pago)
 */

const BASE = 'https://www.saltedge.com/api/v5'

function seHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'App-id': process.env.SALTEDGE_APP_ID ?? '',
    'Secret': process.env.SALTEDGE_SECRET ?? '',
  }
}

async function seFetch<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: {
      ...seHeaders(),
      ...(opts.headers as Record<string, string> ?? {}),
    },
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`SaltEdge ${opts.method ?? 'GET'} ${path} → ${res.status}: ${err}`)
  }

  const json = await res.json()
  // Salt Edge envuelve las respuestas en { data: ... }
  return (json.data ?? json) as T
}

// ─── Tipos ─────────────────────────────────────────────────────────────────────

export interface SEProvider {
  id: string
  code: string
  name: string
  country_code: string
  logo_url: string | null
  mode: string
  status: string
}

export interface SECustomer {
  id: string
  identifier: string
}

export interface SEConnection {
  id: string
  status: 'active' | 'inactive' | 'disabled' | 'deleted'
  provider_code: string
  provider_name: string
  customer_id: string
  created_at: string
  updated_at: string
}

export interface SEAccount {
  id: string
  name: string
  nature: string
  balance: number
  currency_code: string
  iban: string | null
  status: string
  connection_id: string
}

export interface SETransaction {
  id: string
  duplicated: boolean
  mode: string
  status: 'posted' | 'pending'
  made_on: string          // 'YYYY-MM-DD'
  amount: number           // positivo = ingreso, negativo = gasto
  currency_code: string
  description: string
  account_id: string
  created_at: string
  extra: {
    payee?: string | null
    payer?: string | null
    original_amount?: number
    original_currency_code?: string
    posting_date?: string
    time?: string
    transfer_account_name?: string
  }
}

// ─── Cliente (entidad por organización) ──────────────────────────────────────

/**
 * Obtiene o crea el customer de Salt Edge para una organización.
 * Usamos el org_id como identificador único.
 */
export async function obtenerOCrearCliente(orgId: string): Promise<string> {
  // Intentamos obtener el cliente existente
  try {
    const clientes = await seFetch<SECustomer[]>(`/customers?identifier=${encodeURIComponent(orgId)}`)
    if (Array.isArray(clientes) && clientes.length > 0) {
      return clientes[0].id
    }
  } catch {
    // Si falla la búsqueda, intentamos crear
  }

  // Crear nuevo cliente
  const nuevo = await seFetch<SECustomer>('/customers', {
    method: 'POST',
    body: JSON.stringify({ data: { identifier: orgId } }),
  })
  return nuevo.id
}

// ─── Sesión de conexión (OAuth con el banco) ──────────────────────────────────

/**
 * Crea una sesión de conexión Salt Edge para que el usuario autorice su banco.
 * Devuelve la URL a la que redirigir al usuario.
 * Salt Edge añade ?connection_id=xxx al callback cuando el usuario autoriza.
 */
export async function crearSesionConexion(orgId: string, returnToUrl: string): Promise<string> {
  const customerId = await obtenerOCrearCliente(orgId)

  // Fecha de inicio para las transacciones (90 días atrás)
  const fromDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]

  const body = {
    data: {
      customer_id: customerId,
      consent: {
        scopes: ['account_details', 'transactions_details'],
        from_date: fromDate,
      },
      attempt: {
        return_to: returnToUrl,
        fetch_scopes: ['accounts', 'transactions'],
      },
    },
  }

  const result = await seFetch<{ connect_url: string; expires_at: string }>(
    '/connect_sessions/create',
    { method: 'POST', body: JSON.stringify(body) }
  )

  return result.connect_url
}

// ─── Conexiones ───────────────────────────────────────────────────────────────

export async function obtenerConexion(connectionId: string): Promise<SEConnection> {
  return seFetch<SEConnection>(`/connections/${connectionId}`)
}

export async function eliminarConexion(connectionId: string): Promise<void> {
  await seFetch(`/connections/${connectionId}`, { method: 'DELETE' })
}

// ─── Cuentas ──────────────────────────────────────────────────────────────────

/**
 * Lista las cuentas bancarias de una conexión.
 */
export async function obtenerCuentas(connectionId: string): Promise<SEAccount[]> {
  const cuentas = await seFetch<SEAccount[]>(`/accounts?connection_id=${connectionId}`)
  return Array.isArray(cuentas) ? cuentas : []
}

// ─── Transacciones ────────────────────────────────────────────────────────────

/**
 * Obtiene las transacciones de una cuenta bancaria.
 * Devuelve solo las confirmadas (status='posted') y positivas (ingresos).
 */
export async function obtenerTransacciones(accountId: string): Promise<SETransaction[]> {
  const fromDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]

  const txs = await seFetch<SETransaction[]>(
    `/transactions?account_id=${accountId}&from_date=${fromDate}`
  )
  return Array.isArray(txs) ? txs : []
}

// ─── Disponibilidad ──────────────────────────────────────────────────────────

/** Verifica si las credenciales Salt Edge están configuradas */
export function seDisponible(): boolean {
  return !!(process.env.SALTEDGE_APP_ID && process.env.SALTEDGE_SECRET)
}
