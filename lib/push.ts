import webpush from 'web-push'
import { SupabaseClient } from '@supabase/supabase-js'

// Configurar VAPID una sola vez al importar el módulo
if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT ?? 'mailto:admin@marsof.es',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  )
}

export interface PushPayload {
  title: string
  body: string
  url?: string
  icon?: string
}

/**
 * Envía una notificación push a todos los dispositivos suscritos de una org.
 * Elimina automáticamente suscripciones caducadas (410 Gone).
 */
export async function enviarPushAOrg(
  orgId: string,
  payload: PushPayload,
  supabase: SupabaseClient
): Promise<{ enviadas: number; eliminadas: number }> {
  const { data: subs } = await supabase
    .from('push_subscriptions')
    .select('id, endpoint, p256dh, auth')
    .eq('org_id', orgId)

  if (!subs || subs.length === 0) return { enviadas: 0, eliminadas: 0 }

  let enviadas = 0
  let eliminadas = 0
  const toDelete: string[] = []

  const notifPayload = JSON.stringify({
    title: payload.title,
    body: payload.body,
    url: payload.url ?? '/',
    icon: payload.icon ?? '/images/saldea/logo-mark.png',
  })

  await Promise.allSettled(
    subs.map(async (sub) => {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          notifPayload
        )
        enviadas++
      } catch (err: unknown) {
        const status = (err as { statusCode?: number })?.statusCode
        if (status === 410 || status === 404) {
          // Suscripción caducada o inválida
          toDelete.push(sub.id)
          eliminadas++
        } else {
          console.error(`Push error para sub ${sub.id}:`, err)
        }
      }
    })
  )

  // Limpiar subs caducadas
  if (toDelete.length > 0) {
    await supabase.from('push_subscriptions').delete().in('id', toDelete)
  }

  return { enviadas, eliminadas }
}
