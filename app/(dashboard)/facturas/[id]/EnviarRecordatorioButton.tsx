'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function EnviarRecordatorioButton({
  facturaId,
  clienteEmail,
  diasVencida,
}: {
  facturaId: string
  clienteEmail: string
  diasVencida: number
}) {
  const router = useRouter()
  const [cargando, setCargando] = useState(false)
  const [resultado, setResultado] = useState('')

  async function enviarAhora() {
    setCargando(true)
    setResultado('')

    // Usar el tono del siguiente recordatorio pendiente.
    // Si todos están enviados, escalar según los días vencidos.
    const supabase = createClient()
    const { data: pendiente } = await supabase
      .from('recordatorios')
      .select('tono')
      .eq('factura_id', facturaId)
      .eq('enviado', false)
      .order('dias_offset', { ascending: true })
      .limit(1)
      .maybeSingle()

    const tono = pendiente?.tono
      ?? (diasVencida >= 20 ? 'formal' : diasVencida >= 10 ? 'firme' : 'amigable')

    const res = await fetch('/api/enviar-recordatorio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ facturaId, tono }),
    })

    if (res.ok) {
      setResultado('Email enviado correctamente')
      router.refresh()
    } else {
      setResultado('Error al enviar el email')
    }

    setCargando(false)
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={enviarAhora}
        disabled={cargando}
        className="border border-white/10 text-zinc-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-900/30 transition-colors disabled:opacity-60"
      >
        {cargando ? 'Enviando...' : '📧 Enviar recordatorio ahora'}
      </button>
      {resultado && (
        <span className={`text-xs ${resultado.includes('Error') ? 'text-red-500' : 'text-sky-400'}`}>
          {resultado}
        </span>
      )}
    </div>
  )
}
