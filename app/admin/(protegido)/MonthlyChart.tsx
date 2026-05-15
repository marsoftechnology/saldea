// Gráfico de barras mensual sin dependencias externas (SVG puro)

interface Mes {
  label: string
  bruto: number  // céntimos
  neto: number   // céntimos
}

function formatEuros(centimos: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(centimos / 100)
}

export default function MonthlyChart({
  data,
  altura = 220,
  metrica = 'bruto',
}: {
  data: Mes[]
  altura?: number
  metrica?: 'bruto' | 'neto'
}) {
  if (data.length === 0) {
    return <div className="text-xs text-zinc-500 text-center py-8">Sin datos</div>
  }

  const valores = data.map(m => (metrica === 'bruto' ? m.bruto : m.neto))
  const max = Math.max(...valores, 1) // evitar /0
  const total = valores.reduce((s, v) => s + v, 0)

  const anchoBarra = 100 / data.length
  const margenLat = 0.1 * anchoBarra
  const anchoBarraReal = anchoBarra - 2 * margenLat

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-xs text-zinc-500">
          Total {metrica === 'bruto' ? 'bruto' : 'neto'} ({data.length} {data.length === 1 ? 'mes' : 'meses'})
        </p>
        <p className="text-sm font-semibold text-zinc-100">{formatEuros(total)}</p>
      </div>

      <svg
        viewBox={`0 0 100 ${altura}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: altura }}
      >
        {/* Líneas guía horizontales */}
        {[0.25, 0.5, 0.75].map(p => (
          <line
            key={p}
            x1="0"
            x2="100"
            y1={altura * p}
            y2={altura * p}
            stroke="currentColor"
            strokeOpacity="0.06"
            strokeWidth="0.5"
          />
        ))}

        {/* Barras */}
        {data.map((m, i) => {
          const valor = metrica === 'bruto' ? m.bruto : m.neto
          const alturaBarra = max > 0 ? (valor / max) * (altura - 30) : 0
          const x = i * anchoBarra + margenLat
          const y = altura - 20 - alturaBarra

          return (
            <g key={i}>
              {/* Barra */}
              <rect
                x={x}
                y={y}
                width={anchoBarraReal}
                height={alturaBarra}
                rx="0.4"
                fill="rgb(56, 189, 248)"
                opacity={valor > 0 ? 0.9 : 0.2}
              />

              {/* Tooltip nativo SVG */}
              <title>{`${m.label}: ${formatEuros(valor)}`}</title>
            </g>
          )
        })}
      </svg>

      {/* Labels mes (HTML para que respeten su tamaño) */}
      <div className="flex w-full mt-2">
        {data.map((m, i) => (
          <div
            key={i}
            className="text-[9px] text-zinc-500 text-center"
            style={{ width: `${100 / data.length}%` }}
            title={formatEuros(metrica === 'bruto' ? m.bruto : m.neto)}
          >
            {m.label}
          </div>
        ))}
      </div>
    </div>
  )
}
