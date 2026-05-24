'use client'

import { useCallback, useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const stripePromise = publishableKey ? loadStripe(publishableKey) : null

export function PagoModal({ onClose, interval = 'mes', planTipo = 'pro' }: { onClose: () => void; interval?: 'mes' | 'anio'; planTipo?: 'pro' | 'max' }) {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ interval, planTipo }),
    })
    if (!res.ok) {
      setError('Error al conectar con el sistema de pago')
      return ''
    }
    const { clientSecret } = await res.json()
    return clientSecret as string
  }, [interval, planTipo])

  const titulo = planTipo === 'max'
    ? (interval === 'anio' ? 'Plan Max — 1.000€/año' : 'Plan Max — 99€/mes')
    : (interval === 'anio' ? 'Plan Pro — 499€/año' : 'Plan Pro — 49€/mes')
  const tagline = planTipo === 'max'
    ? (interval === 'anio'
      ? 'Cobro único · ahorra 2 meses · no se renueva sin tu permiso'
      : 'Sin permanencia · cancela cuando quieras')
    : (interval === 'anio'
      ? 'Cobro único · sin permanencia · no se renueva sin tu permiso'
      : '15 días gratis · sin permanencia · cancela cuando quieras')

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{titulo}</h2>
            <p className="text-sm text-gray-500">{tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {error ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">{error}</p>
              <button onClick={onClose} className="text-sm text-gray-500 hover:underline">Cerrar</button>
            </div>
          ) : stripePromise ? (
            <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">
              Sistema de pago no configurado
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
