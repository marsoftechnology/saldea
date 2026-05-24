'use client'

import { useState } from 'react'
import Link from 'next/link'

const featuresPro = [
  'Facturas, clientes y emails ilimitados',
  'IA que adapta cada mensaje al cliente',
  'Tus emails salen con el nombre de tu empresa como remitente',
  'Tus emails llevan el PDF de la factura, tu logo y tu firma',
  '5 tonos que escalan solos según los días vencidos',
  'Detecta automáticamente si el cliente paga, discute o está de vacaciones',
  'Importación masiva por CSV + Holded, Quipu, Anfix',
  'Plantillas en 4 idiomas (ES / CA / EN / PT)',
  'Descuento por pronto pago + recargo de mora',
  'Portal de pago: tu cliente paga con tarjeta en 1 clic',
  'Hasta 10 miembros de equipo',
  'Soporte prioritario por email',
]

const featuresMax = [
  'Todo lo del plan Pro',
  '3 burofax de reclamación / mes incluidos',
  'Extras de burofax a 6 € / unidad',
  'Email desde tu dominio propio (Resend)',
  'Hasta 25 miembros de equipo',
  'Soporte VIP prioritario',
]

const PRECIOS = {
  pro:  { mes: 49,  anio: 499,  ahorroEuros: 89,  mesesAhorrados: 2 },
  max:  { mes: 99,  anio: 1000, ahorroEuros: 188, mesesAhorrados: 2 },
}

export function PricingSection() {
  const [intervalo, setIntervalo] = useState<'mes' | 'anio'>('mes')
  const esMensual = intervalo === 'mes'

  return (
    <section id="precios" className="py-28 max-w-5xl mx-auto px-6">
      <div className="text-center mb-12">
        <p className="text-sky-400 font-semibold text-xs mb-4 uppercase tracking-[0.2em]">Precios</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
          {esMensual ? 'Empieza gratis 15 días' : 'Ahorra casi 2 meses pagando al año'}
        </h2>
        <p className="text-zinc-400">
          {esMensual
            ? 'Sin cobro durante 15 días. Cancela antes y no pagas nada. Sin permanencia.'
            : 'Pago único anual, sin permanencia. Cancela cuando quieras y no se renueva.'}
        </p>
      </div>

      {/* Toggle Mensual / Anual */}
      <div className="flex justify-center mb-12">
        <div className="relative inline-flex bg-zinc-900/80 border border-white/10 rounded-full p-1.5 shadow-inner backdrop-blur">
          <div
            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-sky-500 rounded-full shadow-lg shadow-sky-500/30 transition-transform duration-300 ease-out ${
              esMensual ? 'translate-x-0' : 'translate-x-[calc(100%+12px)]'
            }`}
            style={{ left: '6px' }}
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={() => setIntervalo('mes')}
            className={`relative z-10 px-7 py-2.5 rounded-full text-sm font-bold transition-colors ${
              esMensual ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Mensual
          </button>
          <button
            type="button"
            onClick={() => setIntervalo('anio')}
            className={`relative z-10 px-7 py-2.5 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${
              !esMensual ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Anual
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
              !esMensual ? 'bg-zinc-900 text-sky-400' : 'bg-sky-500/20 text-sky-300'
            }`}>
              −2 meses
            </span>
          </button>
        </div>
      </div>

      {/* Cards Pro + Max */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Pro */}
        <div className="relative rounded-3xl bg-gradient-to-br from-sky-500/30 via-white/5 to-transparent p-[1px] shadow-2xl shadow-sky-500/10">
          <div className="relative bg-zinc-950/90 backdrop-blur-xl rounded-3xl p-8 h-full flex flex-col">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-500 text-zinc-900 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide whitespace-nowrap">
              {esMensual ? '15 días gratis' : `Ahorra ${PRECIOS.pro.ahorroEuros}€`}
            </div>

            <div className="text-center mb-8 mt-2">
              <p className="text-xs font-semibold text-sky-400 uppercase tracking-[0.2em] mb-2">Saldea Pro</p>
              <p className="text-zinc-400 text-sm mb-6">Para autónomos y micro-empresas que ya facturan en serio</p>

              <div className="flex items-end justify-center gap-2 mb-2">
                <span
                  key={`${intervalo}-pro`}
                  className="text-5xl md:text-6xl font-bold text-white tracking-tight"
                  style={{ animation: 'priceFade 0.3s ease-out' }}
                >
                  {esMensual ? PRECIOS.pro.mes : PRECIOS.pro.anio}€
                </span>
                <span className="text-zinc-500 mb-2 text-lg">{esMensual ? '/mes' : '/año'}</span>
              </div>
              <p className="text-zinc-500 text-sm">
                IVA incluido · {esMensual ? 'facturado mensualmente' : 'facturado una vez al año'}
              </p>
              {!esMensual && (
                <p className="text-sky-400 text-sm font-semibold mt-2">
                  Ahorras {PRECIOS.pro.ahorroEuros}€ al año ({(PRECIOS.pro.mes * 12 - PRECIOS.pro.anio) > 0 ? '≈ ' : ''}{PRECIOS.pro.mesesAhorrados} meses)
                </p>
              )}
            </div>

            <div className="space-y-2.5 text-sm text-zinc-300 mb-8 flex-1">
              {featuresPro.map((f, i) => (
                <p key={i} className="flex items-start gap-3">
                  <span className="text-sky-400 font-bold mt-0.5 text-base flex-shrink-0">✓</span>
                  <span>{f}</span>
                </p>
              ))}
            </div>

            <div>
              <Link
                href={`/registro?plan=${intervalo}`}
                className="block w-full text-center bg-sky-500 text-zinc-900 py-4 rounded-xl font-bold text-base hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 hover:-translate-y-0.5"
              >
                {esMensual ? 'Empezar 15 días gratis →' : `Pagar ${PRECIOS.pro.anio}€ y empezar →`}
              </Link>
              <p className="text-center text-xs text-zinc-500 mt-3">
                {esMensual
                  ? 'Se requiere tarjeta. El primer cobro (49€) se realiza 15 días después de tu registro. Cancela en 1 clic antes y no pagas nada.'
                  : 'Cobro único de 499€. Sin permanencia: cancela cuando quieras y no se renueva en 12 meses.'}
              </p>
            </div>
          </div>
        </div>

        {/* Max */}
        <div className="relative rounded-3xl bg-gradient-to-br from-amber-500/30 via-white/5 to-transparent p-[1px] shadow-2xl shadow-amber-500/10">
          <div className="relative bg-zinc-950/90 backdrop-blur-xl rounded-3xl p-8 h-full flex flex-col">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-zinc-900 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide whitespace-nowrap">
              {esMensual ? 'Máxima potencia' : `Ahorra ${PRECIOS.max.ahorroEuros}€`}
            </div>

            <div className="text-center mb-8 mt-2">
              <p className="text-xs font-semibold text-amber-400 uppercase tracking-[0.2em] mb-2">Saldea Max</p>
              <p className="text-zinc-400 text-sm mb-6">Para agencias, despachos y empresas con muchas facturas</p>

              <div className="flex items-end justify-center gap-2 mb-2">
                <span
                  key={`${intervalo}-max`}
                  className="text-5xl md:text-6xl font-bold text-white tracking-tight"
                  style={{ animation: 'priceFade 0.3s ease-out' }}
                >
                  {esMensual ? PRECIOS.max.mes : PRECIOS.max.anio}€
                </span>
                <span className="text-zinc-500 mb-2 text-lg">{esMensual ? '/mes' : '/año'}</span>
              </div>
              <p className="text-zinc-500 text-sm">
                IVA incluido · {esMensual ? 'facturado mensualmente' : 'facturado una vez al año'}
              </p>
              {!esMensual && (
                <p className="text-amber-400 text-sm font-semibold mt-2">
                  Ahorras {PRECIOS.max.ahorroEuros}€ al año (≈ {PRECIOS.max.mesesAhorrados} meses)
                </p>
              )}
            </div>

            <div className="space-y-2.5 text-sm text-zinc-300 mb-8 flex-1">
              {featuresMax.map((f, i) => (
                <p key={i} className="flex items-start gap-3">
                  <span className={`font-bold mt-0.5 text-base flex-shrink-0 ${i === 0 ? 'text-sky-400' : 'text-amber-400'}`}>✓</span>
                  <span className={i >= 1 && i <= 2 ? 'text-amber-200' : ''}>{f}</span>
                </p>
              ))}
            </div>

            <div>
              <Link
                href={`/registro?plan=max-${intervalo}`}
                className="block w-full text-center bg-amber-500 text-zinc-900 py-4 rounded-xl font-bold text-base hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5"
              >
                {esMensual ? 'Empezar con Max →' : `Pagar ${PRECIOS.max.anio}€ y empezar →`}
              </Link>
              <p className="text-center text-xs text-zinc-500 mt-3">
                {esMensual
                  ? 'Sin trial. El cobro de 99€ se realiza al registrarte. Cancela en 1 clic, sin permanencia.'
                  : 'Cobro único de 1.000€. Sin permanencia: cancela cuando quieras y no se renueva en 12 meses.'}
              </p>
            </div>
          </div>
        </div>

      </div>

      <p className="text-center text-xs text-zinc-600 mt-8">
        Todos los pagos incluyen RGPD, datos en servidores europeos y soporte en español.<br />
        Sin permanencia · cancela cuando quieras desde tu panel.
      </p>

      <style>{`
        @keyframes priceFade {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
