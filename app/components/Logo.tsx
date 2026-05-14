import Link from 'next/link'
import Image from 'next/image'
import { Space_Grotesk } from 'next/font/google'

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
})

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const sizeConfig: Record<Size, {
  mark: number    // px (square) para variant=mark e inline
  fullW: number   // px width para variant=full (aspect 1280:800)
  wordmark: string
  subtitle: string
  gap: string
}> = {
  xs: { mark: 28,  fullW: 110, wordmark: 'text-sm',   subtitle: 'text-[7px] tracking-[0.3em]', gap: 'gap-2' },
  sm: { mark: 36,  fullW: 150, wordmark: 'text-base', subtitle: 'text-[8px] tracking-[0.3em]', gap: 'gap-2.5' },
  md: { mark: 48,  fullW: 200, wordmark: 'text-xl',   subtitle: 'text-[10px] tracking-[0.35em]', gap: 'gap-3' },
  lg: { mark: 80,  fullW: 320, wordmark: 'text-3xl',  subtitle: 'text-xs tracking-[0.4em]',   gap: 'gap-4' },
  xl: { mark: 128, fullW: 480, wordmark: 'text-5xl',  subtitle: 'text-sm tracking-[0.45em]',  gap: 'gap-6' },
}

/**
 * Logo Marsof Technology — usa los PNGs reales en /public/images/logo/.
 *
 * Variantes:
 * - `full`: imagen completa (hexágono + MARSOF + TECHNOLOGY) tal cual el archivo.
 * - `mark`: solo el hexágono cuadrado.
 * - `inline`: hexágono pequeño + texto "Marsof / Technology" al lado, para navbars.
 */
export function Logo({
  size = 'md',
  variant = 'full',
  href = '/',
  className = '',
  subtitleColor = 'text-zinc-400',
  wordmarkColor = 'text-white',
  priority = false,
}: {
  size?: Size
  variant?: 'full' | 'inline' | 'mark'
  href?: string | null
  className?: string
  subtitleColor?: string
  wordmarkColor?: string
  priority?: boolean
}) {
  const s = sizeConfig[size]

  let content: React.ReactNode

  if (variant === 'mark') {
    content = (
      <Image
        src="/images/logo/logo-mark.png"
        alt="Marsof Technology"
        width={s.mark}
        height={s.mark}
        priority={priority}
        className={className}
      />
    )
  } else if (variant === 'inline') {
    content = (
      <div className={`inline-flex items-center ${s.gap} ${className}`}>
        <Image
          src="/images/logo/logo-mark.png"
          alt="Marsof Technology"
          width={s.mark}
          height={s.mark}
          priority={priority}
        />
        <div className={`flex flex-col leading-tight ${display.className}`}>
          <span className={`${s.wordmark} font-bold ${wordmarkColor} tracking-tight`}>Marsof</span>
          <span className={`${s.subtitle} font-semibold uppercase ${subtitleColor}`}>Technology</span>
        </div>
      </div>
    )
  } else {
    // full
    const height = Math.round(s.fullW * (800 / 1280))
    content = (
      <Image
        src="/images/logo/logo-full.png"
        alt="Marsof Technology"
        width={s.fullW}
        height={height}
        priority={priority}
        className={className}
      />
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
