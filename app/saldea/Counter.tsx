'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Cuenta desde 0 hasta `to` cuando el componente entra en viewport.
 * Útil para stats. `prefix` y `suffix` para "€", "h", "+", etc.
 */
export function Counter({
  to,
  duration = 1400,
  prefix = '',
  suffix = '',
  className = '',
}: {
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [value, setValue] = useState(0)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to)
      return
    }
    const obs = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting && !animated.current) {
          animated.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1)
            // easeOutCubic
            const eased = 1 - Math.pow(1 - p, 3)
            setValue(Math.round(to * eased))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          obs.unobserve(e.target)
        }
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{value}{suffix}
    </span>
  )
}
