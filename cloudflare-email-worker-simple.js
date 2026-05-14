// Saldea Email Worker — versión inline sin dependencias externas
// Recibe emails entrantes y los reenvía al webhook de Saldea

function decodeQuotedPrintable(str) {
  return str.replace(/=\r?\n/g, '').replace(/=([0-9A-Fa-f]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
}

function decodeBase64(str) {
  try {
    const clean = str.replace(/\s+/g, '')
    const decoded = atob(clean)
    // Convertir a UTF-8 correctamente
    const bytes = new Uint8Array(decoded.length)
    for (let i = 0; i < decoded.length; i++) bytes[i] = decoded.charCodeAt(i)
    return new TextDecoder('utf-8').decode(bytes)
  } catch (e) {
    return str
  }
}

function extractTextBody(raw) {
  // Buscar el primer text/plain part
  const parts = raw.split(/\r?\n\r?\n/)

  // Buscar boundary del multipart
  const boundaryMatch = raw.match(/boundary="?([^"\r\n;]+)"?/i)

  if (boundaryMatch) {
    const boundary = boundaryMatch[1]
    const sections = raw.split(new RegExp(`--${boundary.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`))

    for (const section of sections) {
      const isTextPlain = /Content-Type:\s*text\/plain/i.test(section)
      if (!isTextPlain) continue

      const isBase64 = /Content-Transfer-Encoding:\s*base64/i.test(section)
      const isQP = /Content-Transfer-Encoding:\s*quoted-printable/i.test(section)

      const bodyMatch = section.match(/\r?\n\r?\n([^]*?)$/i)
      if (!bodyMatch) continue

      let body = bodyMatch[1].trim()
      if (isBase64) body = decodeBase64(body)
      else if (isQP) body = decodeQuotedPrintable(body)

      return body
    }
  }

  // Sin multipart: detectar encoding del header principal
  const hasBase64 = /Content-Transfer-Encoding:\s*base64/i.test(raw)
  const hasQP = /Content-Transfer-Encoding:\s*quoted-printable/i.test(raw)

  // Separar headers y body
  const splitIdx = raw.search(/\r?\n\r?\n/)
  if (splitIdx === -1) return raw
  let body = raw.substring(splitIdx).trim()

  if (hasBase64) body = decodeBase64(body)
  else if (hasQP) body = decodeQuotedPrintable(body)

  return body
}

export default {
  async email(message, env, ctx) {
    try {
      const raw = await new Response(message.raw).text()
      const subject = message.headers.get('subject') ?? '(sin asunto)'

      let body = extractTextBody(raw)
      if (body.length < 5 || body.length > 50000) {
        body = raw.substring(0, 5000)
      }

      const payload = {
        from: message.from,
        to: message.to,
        subject,
        body: body.substring(0, 10000),
        receivedAt: new Date().toISOString(),
      }

      const res = await fetch(env.WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-saldea-secret': env.SECRET },
        body: JSON.stringify(payload),
      })

      if (!res.ok) console.error('Webhook fallo:', res.status, await res.text())
    } catch (e) {
      console.error('Error procesando email entrante:', e.message)
    }
  },
}
