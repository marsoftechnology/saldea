'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function TrialBanner({ diasRestantes }: { diasRestantes: number }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [listo, setListo] = useState(false)
  const [oculto, setOculto] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (sessionStorage.getItem('trial_banner_oculto')) {
      setOculto(true)
      return
    }
    const saved = localStorage.getItem('trial_banner_pos')
    let inicial = { x: window.innerWidth - 320, y: window.innerHeight - 100 }
    if (saved) {
      try { inicial = JSON.parse(saved) } catch {}
    }
    posRef.current = inicial
    setPos(inicial)
    setListo(true)
  }, [])

  function onPointerDown(e: React.PointerEvent) {
    if ((e.target as HTMLElement).closest('a, button')) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragging.current = true
    offset.current = {
      x: e.clientX - posRef.current.x,
      y: e.clientY - posRef.current.y,
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return
    const newX = Math.max(0, Math.min(window.innerWidth - 300, e.clientX - offset.current.x))
    const newY = Math.max(0, Math.min(window.innerHeight - 80, e.clientY - offset.current.y))
    posRef.current = { x: newX, y: newY }
    if (bannerRef.current) {
      bannerRef.current.style.left = newX + 'px'
      bannerRef.current.style.top = newY + 'px'
    }
  }

  function onPointerUp() {
    if (!dragging.current) return
    dragging.current = false
    setPos({ ...posRef.current })
    localStorage.setItem('trial_banner_pos', JSON.stringify(posRef.current))
  }

  function cerrar() {
    sessionStorage.setItem('trial_banner_oculto', '1')
    setOculto(true)
  }

  if (oculto || !listo) return null

  const urgente = diasRestantes <= 3
  const aviso = diasRestantes <= 7

  return (
    <div
      ref={bannerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ left: pos.x, top: pos.y, cursor: 'grab', touchAction: 'none' }}
      className="fixed z-40 select-none shadow-2xl rounded-2xl overflow-hidden w-72"
    >
      <div className={`px-4 py-3 flex items-center gap-3 ${
        urgente
          ? 'bg-rose-600'
          : aviso
            ? 'bg-amber-500'
            : 'bg-zinc-900 border border-white/10'
      }`}>
        <span className="text-xl shrink-0">{urgente ? '🚨' : aviso ? '⚠️' : '⏳'}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white leading-tight">
            {diasRestantes === 0
              ? 'Último día de prueba'
              : `${diasRestantes} día${diasRestantes !== 1 ? 's' : ''} de prueba`}
          </p>
          <p className="text-xs text-white/70 mt-0.5 leading-tight">
            Acceso completo hasta que expire
          </p>
        </div>
        <button
          onClick={cerrar}
          className="shrink-0 text-white/50 hover:text-white text-xl leading-none -mr-1 transition-colors"
          aria-label="Cerrar"
        >
          ×
        </button>
      </div>
      <div className={`px-4 py-2.5 flex items-center gap-2 ${
        urgente ? 'bg-rose-700' : aviso ? 'bg-amber-600' : 'bg-zinc-800/80'
      }`}>
        <p className="text-xs text-white/80 flex-1">¿Continuar con todas las funciones?</p>
        <Link
          href="/ajustes#plan"
          className="shrink-0 text-xs font-bold bg-white text-zinc-900 px-3 py-1.5 rounded-lg hover:bg-zinc-100 transition-colors whitespace-nowrap"
        >
          Ver planes
        </Link>
      </div>
    </div>
  )
}
