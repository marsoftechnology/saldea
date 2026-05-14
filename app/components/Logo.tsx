import Link from 'next/link'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const sizeConfig: Record<Size, {
  letterClass: string
  techClass: string
  techMargin: string
  iconSize: string
  iconText: string
  rounded: string
}> = {
  xs: { letterClass: 'text-base', techClass: 'text-[7px] tracking-[0.3em]', techMargin: 'mt-0.5', iconSize: 'w-6 h-6', iconText: 'text-[11px]', rounded: 'rounded-md' },
  sm: { letterClass: 'text-xl',  techClass: 'text-[8px] tracking-[0.3em]', techMargin: 'mt-0.5', iconSize: 'w-8 h-8', iconText: 'text-sm',  rounded: 'rounded-lg' },
  md: { letterClass: 'text-3xl', techClass: 'text-[10px] tracking-[0.3em]', techMargin: 'mt-1',   iconSize: 'w-10 h-10', iconText: 'text-lg', rounded: 'rounded-lg' },
  lg: { letterClass: 'text-5xl', techClass: 'text-xs tracking-[0.4em]',     techMargin: 'mt-2',   iconSize: 'w-14 h-14', iconText: 'text-2xl', rounded: 'rounded-xl' },
  xl: { letterClass: 'text-7xl', techClass: 'text-sm tracking-[0.4em]',     techMargin: 'mt-3',   iconSize: 'w-20 h-20', iconText: 'text-3xl', rounded: 'rounded-2xl' },
}

/**
 * Logo Marsof Technology — letras M y S grandes con gradient, "TECHNOLOGY" debajo.
 *
 * - `variant="full"`: las dos letras + subtitle TECHNOLOGY (uso en hero, login)
 * - `variant="inline"`: M y S en una fila pequeña + TECHNOLOGY al lado (uso en navbar)
 * - `variant="mark"`: solo cuadrado redondeado con "MS" dentro (favicon, sidebar collapsed)
 *
 * El gradient sigue la paleta emerald de la marca. Texto siempre nítido al ser CSS puro.
 */
export function Logo({
  size = 'md',
  variant = 'full',
  href = '/',
  className = '',
  subtitleColor = 'text-zinc-400',
}: {
  size?: Size
  variant?: 'full' | 'inline' | 'mark'
  href?: string | null
  className?: string
  subtitleColor?: string
}) {
  const s = sizeConfig[size]

  const letters = (
    <span className={`${s.letterClass} font-black tracking-tighter leading-none inline-flex items-baseline`}>
      <span className="bg-gradient-to-br from-emerald-200 via-emerald-400 to-emerald-600 bg-clip-text text-transparent">M</span>
      <span className="bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-700 bg-clip-text text-transparent -ml-[0.05em]">S</span>
    </span>
  )

  const subtitle = (
    <span className={`${s.techClass} font-bold uppercase ${subtitleColor}`}>
      Technology
    </span>
  )

  let content: React.ReactNode

  if (variant === 'mark') {
    content = (
      <div className={`${s.iconSize} ${s.rounded} bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 ${className}`}>
        <span className={`${s.iconText} font-black text-zinc-900 tracking-tighter`}>MS</span>
      </div>
    )
  } else if (variant === 'inline') {
    content = (
      <div className={`inline-flex items-baseline gap-2 ${className}`}>
        {letters}
        {subtitle}
      </div>
    )
  } else {
    // full
    content = (
      <div className={`inline-flex flex-col items-center leading-none ${className}`}>
        {letters}
        <div className={s.techMargin}>{subtitle}</div>
      </div>
    )
  }

  if (href) {
    return (
      <Link href={href} className="inline-block hover:opacity-90 transition-opacity">
        {content}
      </Link>
    )
  }
  return content
}
