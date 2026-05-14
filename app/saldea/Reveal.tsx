'use client'

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'

type RevealEffect = 'fade-up' | 'fade-in' | 'scale' | 'slide-left' | 'slide-right'

export function Reveal({
  children,
  effect = 'fade-up',
  delay = 0,
  duration = 700,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  effect?: RevealEffect
  delay?: number
  duration?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'header' | 'h1' | 'h2' | 'h3' | 'p' | 'span'
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true)
            obs.unobserve(e.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const initial: Record<RevealEffect, string> = {
    'fade-up': 'opacity-0 translate-y-8',
    'fade-in': 'opacity-0',
    'scale': 'opacity-0 scale-95',
    'slide-left': 'opacity-0 -translate-x-10',
    'slide-right': 'opacity-0 translate-x-10',
  }

  const style: CSSProperties = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component: any = Tag
  return (
    <Component
      ref={ref as never}
      style={style}
      className={`transition-all will-change-transform ${
        visible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : initial[effect]
      } ${className}`}
    >
      {children}
    </Component>
  )
}
