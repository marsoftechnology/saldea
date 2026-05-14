import Link from 'next/link'
import { Space_Grotesk } from 'next/font/google'

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
  variable: '--font-display',
})

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const sizeConfig: Record<Size, {
  markSize: number   // px del cuadrado (mark)
  wordmark: string   // tailwind class
  subtitle: string   // tailwind class
  gap: string        // separación mark <-> wordmark
}> = {
  xs: { markSize: 24, wordmark: 'text-sm',  subtitle: 'text-[7px] tracking-[0.3em]', gap: 'gap-2' },
  sm: { markSize: 32, wordmark: 'text-base', subtitle: 'text-[8px] tracking-[0.3em]', gap: 'gap-2.5' },
  md: { markSize: 44, wordmark: 'text-xl',   subtitle: 'text-[10px] tracking-[0.35em]', gap: 'gap-3' },
  lg: { markSize: 72, wordmark: 'text-3xl',  subtitle: 'text-xs tracking-[0.4em]', gap: 'gap-4' },
  xl: { markSize: 112, wordmark: 'text-5xl', subtitle: 'text-sm tracking-[0.45em]', gap: 'gap-6' },
}

/**
 * SVG mark con la M y la S como paths geométricos sobre un cuadrado redondeado
 * con gradient emerald y highlight superior tipo "glossy chip".
 *
 * El SVG es totalmente independiente: escala perfecto y siempre nítido.
 */
function Mark({ size, idSuffix = '' }: { size: number; idSuffix?: string }) {
  // IDs únicos por instancia para evitar colisiones con múltiples Logos en la página
  const bgId = `ms-bg${idSuffix}`
  const hlId = `ms-hl${idSuffix}`
  const innerId = `ms-inner${idSuffix}`
  const glowId = `ms-glow${idSuffix}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 6px 16px rgba(14,165,233,0.35))' }}
    >
      <defs>
        {/* Fondo: gradient diagonal emerald */}
        <linearGradient id={bgId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="55%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        {/* Highlight glossy superior */}
        <linearGradient id={hlId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        {/* Gradient para las letras (dark con un tinte) */}
        <linearGradient id={innerId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#082f49" />
          <stop offset="100%" stopColor="#0a0a0b" />
        </linearGradient>
        {/* Sombra interior sutil */}
        <radialGradient id={glowId} cx="50%" cy="120%" r="80%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.25)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      {/* Cuadrado base */}
      <rect width="100" height="100" rx="22" fill={`url(#${bgId})`} />
      {/* Highlight gradient encima */}
      <rect width="100" height="100" rx="22" fill={`url(#${hlId})`} />
      {/* Vignette inferior */}
      <rect width="100" height="100" rx="22" fill={`url(#${glowId})`} />

      {/* Letra M — polígono filled con esquinas refinadas */}
      <path
        d="M 18 76 L 18 24 Q 18 22 20 22 L 25 22 Q 27 22 28 23.5 L 42 45 Q 44 47.5 46 45 L 60 23.5 Q 61 22 63 22 L 68 22 Q 70 22 70 24 L 70 76 Q 70 78 68 78 L 63.5 78 Q 61.5 78 61.5 76 L 61.5 40 L 50 56 Q 48 58 46 56 L 34.5 40 L 34.5 76 Q 34.5 78 32.5 78 L 20 78 Q 18 78 18 76 Z"
        fill={`url(#${innerId})`}
      />

      {/* Letra S — curve stroked con linecaps redondeados */}
      <path
        d="M 88 32
           C 88 25, 82 22, 75 22
           L 65 22
           C 58 22, 55 27, 55 32
           C 55 38, 60 41, 65 42
           L 78 44
           C 84 45, 88 48, 88 54
           L 88 62
           C 88 70, 82 76, 75 76
           L 60 76
           C 52 76, 48 70, 48 64"
        stroke={`url(#${innerId})`}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export function Logo({
  size = 'md',
  variant = 'full',
  href = '/',
  className = '',
  subtitleColor = 'text-zinc-400',
  wordmarkColor = 'text-white',
  idSuffix = '',
}: {
  size?: Size
  variant?: 'full' | 'inline' | 'mark'
  href?: string | null
  className?: string
  subtitleColor?: string
  wordmarkColor?: string
  idSuffix?: string
}) {
  const s = sizeConfig[size]

  let content: React.ReactNode

  if (variant === 'mark') {
    content = <div className={className}><Mark size={s.markSize} idSuffix={idSuffix} /></div>
  } else if (variant === 'inline') {
    content = (
      <div className={`inline-flex items-center ${s.gap} ${className}`}>
        <Mark size={s.markSize} idSuffix={idSuffix} />
        <div className={`flex flex-col leading-tight ${display.className}`}>
          <span className={`${s.wordmark} font-bold ${wordmarkColor} tracking-tight`}>Marsof</span>
          <span className={`${s.subtitle} font-semibold uppercase ${subtitleColor}`}>Technology</span>
        </div>
      </div>
    )
  } else {
    // full — emblem vertical
    content = (
      <div className={`inline-flex flex-col items-center ${className}`}>
        <Mark size={s.markSize} idSuffix={idSuffix} />
        <div className={`flex flex-col items-center leading-none mt-3 ${display.className}`}>
          <span className={`${s.wordmark} font-bold ${wordmarkColor} tracking-tight`}>Marsof</span>
          <div className="flex items-center gap-2 mt-1.5">
            <span className={`h-px w-6 bg-gradient-to-r from-transparent to-${subtitleColor.replace('text-', '')}/50`} aria-hidden />
            <span className={`${s.subtitle} font-semibold uppercase ${subtitleColor}`}>Technology</span>
            <span className={`h-px w-6 bg-gradient-to-l from-transparent to-${subtitleColor.replace('text-', '')}/50`} aria-hidden />
          </div>
        </div>
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
