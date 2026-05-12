'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function MarcarCobradaButton({ facturaId }: { facturaId: string }) {
  const router = useRouter()
  const [cargando, setCargando] = useState(false)

  async function marcarCobrada() {
    setCargando(true)
    const supabase = createClient()
    await supabase.from('facturas').update({ estado: 'cobrada' }).eq('id', facturaId)
    router.refresh()
    setCargando(false)
  }

  return (
    <button
      onClick={marcarCobrada}
      disabled={cargando}
      className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-60"
    >
      {cargando ? 'Guardando...' : '✓ Marcar como cobrada'}
    </button>
  )
}
