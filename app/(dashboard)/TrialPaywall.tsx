'use client'

import { useState, useCallback, useRef } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

const FEATURES = [
  'Facturas y clientes ilimitados',
  'Recordatorios automáticos por email e IA',
  'WhatsApp para clientes con consentimiento',
  'Clasificación automática de respuestas',
  'Informes y analytics completos',
  'Integración Stripe + Holded',
  'Soporte prioritario',
]

export default function TrialPaywall() {
  const [intervalo, setIntervalo] = useState<'mes' | 'anio'>('mes')
  const [fase, setFase] = useState<'expired' | 'checkout'>('expired')
  const [errorPago, setErrorPago] = useState('')
  const clientSecretCache = useRef<{ interval: 'mes' | 'anio'; secret: string } | null>(null)

  const fetchClientSecret = useCallback(async () => {
    if (clientSecretCache.current?.interval === intervalo) {
      return clientSecretCache.current.secret
    }
    setErrorPago('')
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ interval: intervalo }),
    })
    if (!res.ok) {
      setErrorPago('Error al conectar con el sistema de pago. Inténtalo de nuevo.')
      return ''
    }
    const { clientSecret } = await res.json()
    clientSecretCache.current = { interval: intervalo, secret: clientSecret }
    return clientSecret as string
  }, [intervalo])

  return (
    // z-[500] asegura que cubre sidebar (z-50) y cualquier otro overlay
    <div className="fixed inset-0 z-[500] bg-[#07070a]/90 backdrop-blur-md flex items-center justify-center p-4">

      {fase === 'expired' ? (
        <div className="bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

          {/* Header con degradado */}
          <div className="bg-gradient-to-br from-sky-500/20 to-sky-600/5 border-b border-white/5 px-8 py-6 text-center">
            <div className="text-5xl mb-3">?</div>
            <h2 className="text-xl font-bold text-zinc-100">Tu prueba gratuita ha finalizado</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Activa el plan Pro para seguir usando Saldea sin límites
            </p>
          </div>

          <div className="px-8 py-6">
            {/* Lista de features */}
            <ul className="space-y-2 mb-6">
              {FEATURES.map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-zinc-300">
                  <span className="text-emerald-400 flex-shrink-0">?</span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Toggle mensual / anual */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={() => setIntervalo('mes')}
                className={`py-3 rounded-xl text-sm font-medium border-2 transition-colors ${
                  intervalo === 'mes'
                    ? 'border-sky-500 bg-sky-500/10 text-sky-300'
                    : 'border-white/10 text-zinc-400 hover:border-white/20'
                }`}
              >
                <span className="block font-bold">49€/mes</span>
                <span className="block text-xs opacity-75 mt-0.5">30 días gratis al empezar</span>
              </button>

              <button
                onClick={() => setIntervalo('anio')}
                className={`py-3 rounded-xl text-sm font-medium border-2 transition-colors relative ${
                  intervalo === 'anio'
                    ? 'border-sky-500 bg-sky-500/10 text-sky-300'
                    : 'border-white/10 text-zinc-400 hover:border-white/20'
                }`}
              >
                {intervalo === 'anio' && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                    Recomendado
                  </span>
                )}
                <span className="block font-bold">499€/año</span>
                <span className="block text-xs text-emerald-400 mt-0.5">Ahorra 89€ (2 meses)</span>
              </button>
            </div>

            {errorPago && (
              <p className="text-rose-400 text-xs text-center mb-3">{errorPago}</p>
            )}

            <button
              onClick={() => setFase('checkout')}
              className="w-full bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-white font-bold py-3.5 rounded-xl text-base transition-colors shadow-lg shadow-sky-500/20"
            >
              Activar Pro y continuar ?
            </button>

            <p className="text-center text-xs text-zinc-500 mt-4">
              Sin permanencia · cancela cuando quieras ·{' '}
              <a href="mailto:carlosgc@marsof.es" className="text-zinc-400 hover:text-zinc-200 underline underline-offset-2">
                ¿Dudas?
              </a>
            </p>
          </div>
        </div>
      ) : (
        /* Checkout embebido — blanco para que Stripe se vea bien */
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <p className="font-semibold text-gray-900">
                {intervalo === 'anio' ? 'Plan Pro — 499€/año' : 'Plan Pro — 49€/mes'}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {intervalo === 'anio' ? 'Sin permanencia · cobro único' : '30 días gratis · cancela cuando quieras'}
              </p>
            </div>
            <button
              onClick={() => setFase('expired')}
              className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
            >
              ? Volver
            </button>
          </div>

          <div className="max-h-[75vh] overflow-y-auto">
            {stripePromise ? (
              <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            ) : (
              <div className="p-8 text-center text-gray-500 text-sm">
                Stripe no está configurado. Añade{' '}
                <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code>{' '}
                a las variables de entorno.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
