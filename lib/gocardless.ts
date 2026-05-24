/**
 * Cliente GoCardless Open Banking (antiguo Nordigen)
 * API v2 — https://bankaccountdata.gocardless.com/api/v2/
 *
 * Variables de entorno necesarias:
 *   GOCARDLESS_SECRET_ID    — Secret ID del portal GoCardless
 *   GOCARDLESS_SECRET_KEY   — Secret Key del portal GoCardless
 *
 * Plan gratuito: https://bankaccountdata.gocardless.com/
 * Cubre todos los bancos españoles (Santander, BBVA, CaixaBank, Sabadell...)
 */

const BASE = 'https://bankaccountdata.gocardless.com/api/v2'

// ─── Token (se cachea en memoria por proceso) ─────────────────────────────────
let _token: { access: string; expiresAt: number } | null = null

async function getToken(): Promise<string> {
  const now = Date.now()
  if (_token && _token.expiresAt > now + 60_000) return _token.access

  const res = await fetch(`${BASE}/token/new/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret_id: process.env.GOCARDLESS_SECRET_ID,
      secret_key: process.env.GOCARDLESS_SECRET_KEY,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`GoCardless auth failed: ${res.status} ${err}`)
  }

  const data = await res.json()
  _token = {
    access: data.access,
    expiresAt: now + data.access_expires * 1000,
  }
  return _token.access
}

async function gcFetch<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const token = await getToken()
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(opts.headers ?? {}),
    },
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`GoCardless ${opts.method ?? 'GET'} ${path} → ${res.status}: ${err}`)
  }

  return res.json() as Promise<T>
}

// ─── Tipos ─────────────────────────────────────────────────────────────────────

export interface GCInstitution {
  id: string
  name: string
  bic: string
  logo: string
  countries: string[]
  transaction_total_days: string
}

export interface GCRequisition {
  id: string
  status: 'CR' | 'ID' | 'LN' | 'RJ' | 'ER' | 'SU' | 'EX' | 'GA'
  // CR=Created, ID=GivenConsent, LN=LinkedAccounts, RJ=Rejected,
  // ER=Error, SU=Suspended, EX=Expired, GA=GrantedAccess
  link: string          // URL OAuth para redirigir al usuario
  accounts: string[]    // IDs de cuentas tras autenticación
  reference: string     // referencia que pasamos nosotros
  institution_id: string
  redirect: string
}

export interface GCTransaction {
  transactionId: string
  bookingDate: string        // 'YYYY-MM-DD'
  valueDate?: string
  transactionAmount: { amount: string; currency: string }
  creditorName?: string
  debtorName?: string
  remittanceInformationUnstructured?: string
  remittanceInformationStructured?: string
  bankTransactionCode?: string
  internalTransactionId?: string
}

export interface GCTransactionsResponse {
  transactions: {
    booked: GCTransaction[]
    pending: GCTransaction[]
  }
}

export interface GCAccountDetails {
  id: string
  iban: string
  currency: string
  ownerName?: string
  name?: string
  product?: string
  status?: string
}

// ─── API pública ──────────────────────────────────────────────────────────────

/** Lista bancos españoles disponibles */
export async function listarInstituciones(pais = 'ES'): Promise<GCInstitution[]> {
  return gcFetch<GCInstitution[]>(`/institutions/?country=${pais}`)
}

/** Crea una requisición (flujo OAuth con el banco) */
export async function crearRequisicion({
  institutionId,
  redirectUrl,
  reference,
}: {
  institutionId: string
  redirectUrl: string
  reference: string
}): Promise<GCRequisition> {
  return gcFetch<GCRequisition>('/requisitions/', {
    method: 'POST',
    body: JSON.stringify({
      redirect: redirectUrl,
      institution_id: institutionId,
      reference,
      user_language: 'ES',
    }),
  })
}

/** Obtiene el estado de una requisición (y sus account IDs tras autenticación) */
export async function obtenerRequisicion(requisitionId: string): Promise<GCRequisition> {
  return gcFetch<GCRequisition>(`/requisitions/${requisitionId}/`)
}

/** Elimina una requisición (revoca acceso al banco) */
export async function eliminarRequisicion(requisitionId: string): Promise<void> {
  await gcFetch(`/requisitions/${requisitionId}/`, { method: 'DELETE' })
}

/** Detalle de una cuenta bancaria */
export async function obtenerCuenta(accountId: string): Promise<{ account: GCAccountDetails }> {
  return gcFetch<{ account: GCAccountDetails }>(`/accounts/${accountId}/details/`)
}

/**
 * Transacciones de una cuenta bancaria.
 * dateFrom/dateTo en formato 'YYYY-MM-DD'.
 * Si no se pasan, devuelve los últimos 90 días (o los disponibles según el banco).
 */
export async function obtenerTransacciones(
  accountId: string,
  dateFrom?: string,
  dateTo?: string,
): Promise<GCTransactionsResponse> {
  let path = `/accounts/${accountId}/transactions/`
  const params = new URLSearchParams()
  if (dateFrom) params.set('date_from', dateFrom)
  if (dateTo) params.set('date_to', dateTo)
  if (params.toString()) path += `?${params}`
  return gcFetch<GCTransactionsResponse>(path)
}

/** Verifica si las credenciales GoCardless están configuradas */
export function gcDisponible(): boolean {
  return !!(process.env.GOCARDLESS_SECRET_ID && process.env.GOCARDLESS_SECRET_KEY)
}
