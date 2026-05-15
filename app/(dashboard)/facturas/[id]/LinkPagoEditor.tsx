'use client'

import { useState } from 'react'

function esUrlValida(s: string): boolean {
  if (!s.trim()) return true // vacío permitido (significa eliminar)
  try {
    const u = new URL(s.trim())
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

export default function LinkPagoEditor({
  facturaId,
  linkInicial,
}: {
  facturaId: string
  linkInicial: string | null
}) {
  const [link, setLink] = useState(linkInicial ?? '')
  const [editando, setEditando] = useState(!linkInicial)
  const [estado, setEstado] = useState<'idle' | 'guardando' | 'error'>('idle')
  const [linkGuardado, setLinkGuardado] = useState(linkInicial ?? '')

  async function guardar() {
    const valor = link.trim()
    if (!esUrlValida(valor)) {
      setEstado('error')
      return
    }
    setEstado('guardando')
    try {
      const res = await fetch(`/api/facturas/${facturaId}/link-pago`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link_pago: valor || null }),
      })
      if (!res.ok) throw new Error('save failed')
      setLinkGuardado(valor)
      setEstado('idle')
      setEditando(false)
    } catch {
      setEstado('error')
    }
  }

  async function quitar() {
    setLink('')
    setEstado('guardando')
    try {
      const res = await fetch(`/api/facturas/${facturaId}/link-pago`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link_pago: null }),
      })
      if (!res.ok) throw new Error('save failed')
      setLinkGuardado('')
      setEstado('idle')
      setEditando(true)
    } catch {
      setEstado('error')
    }
  }

  return (
    <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-zinc-100 flex items-center gap-2">
          <span>💳</span> Link de pago
        </h2>
        {linkGuardado && !editando && (
          <button
            onClick={() => setEditando(true)}
            className="text-xs text-sky-400 hover:text-sky-300"
          >
            Editar
          </button>
        )}
      </div>

      {!editando && linkGuardado ? (
        <div className="flex items-center gap-2">
          <a
            href={linkGuardado}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 truncate text-sm text-sky-300 hover:text-sky-200 underline"
          >
            {linkGuardado}
          </a>
          <button
            onClick={quitar}
            className="text-xs text-zinc-500 hover:text-rose-400"
          >
            Quitar
          </button>
        </div>
      ) : (
        <div>
          <input
            type="url"
            value={link}
            onChange={(e) => { setLink(e.target.value); if (estado === 'error') setEstado('idle') }}
            placeholder="https://buy.stripe.com/... o https://paypal.me/tu-usuario/1500"
            className="w-full px-3 py-2.5 border border-white/10 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40"
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-zinc-500">
              Stripe Payment Link, Bizum, PayPal.me, o cualquier URL de pago. Se incluirá como botón en los emails.
            </p>
            <div className="flex gap-2">
              {linkGuardado && (
                <button
                  onClick={() => { setLink(linkGuardado); setEditando(false); setEstado('idle') }}
                  className="text-xs px-3 py-1.5 text-zinc-400 hover:text-zinc-200"
                >
                  Cancelar
                </button>
              )}
              <button
                onClick={guardar}
                disabled={estado === 'guardando' || !esUrlValida(link)}
                className="text-xs px-3 py-1.5 rounded bg-sky-500 text-white font-medium hover:bg-sky-400 disabled:opacity-60"
              >
                {estado === 'guardando' ? 'Guardando…' : 'Guardar'}
              </button>
            </div>
          </div>
          {estado === 'error' && !esUrlValida(link) && (
            <p className="text-xs text-rose-400 mt-1.5">
              URL no válida. Debe empezar por http:// o https://
            </p>
          )}
        </div>
      )}
    </div>
  )
}
