const LLEIDA_BASE = 'https://api.lleida.net/cs/v1'

export interface LleidaRecipient {
  email: string
  phone?: string
  name?: string
  surname?: string
}

interface LleidaResponse {
  code: string
  status: string
  request_id?: string
  error?: string
}

export async function enviarBurofaxLleida(params: {
  recipient: LleidaRecipient
  pdfBase64: string
  contractId: string
  requestId: string
}): Promise<LleidaResponse> {
  const apiKey = process.env.LLEIDA_API_KEY
  const user = process.env.LLEIDA_USER
  const configId = Number(process.env.LLEIDA_CONFIG_ID)

  if (!apiKey || !user || !configId) {
    throw new Error('Lleida.net: credenciales no configuradas (LLEIDA_API_KEY, LLEIDA_USER, LLEIDA_CONFIG_ID)')
  }

  const level: Record<string, unknown>[] = [{
    email: params.recipient.email,
    landing_access_methods: ['none'],
  }]
  if (params.recipient.phone) level[0].phone = params.recipient.phone
  if (params.recipient.name) level[0].name = params.recipient.name
  if (params.recipient.surname) level[0].surname = params.recipient.surname

  const res = await fetch(`${LLEIDA_BASE}/start_signature`, {
    method: 'POST',
    headers: {
      Authorization: `x-api-key ${apiKey}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      request: 'start_signature',
      user,
      request_id: params.requestId,
      config_id: configId,
      contract_id: params.contractId,
      level,
      file: [{
        filename: 'burofax.pdf',
        content: params.pdfBase64,
        file_group: 'main',
        sign_on_landing: 'N',
      }],
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Lleida.net HTTP ${res.status}: ${text}`)
  }

  return res.json()
}
