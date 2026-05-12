'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

    const tono = diasVencida >= 20 ? 'formal' : diasVencida >= 10 ? 'firme' : 'amigable'

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
        className="border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-60"
      >
        {cargando ? 'Enviando...' : '📧 Enviar recordatorio ahora'}
      </button>
      {resultado && (
        <span className={`text-xs ${resultado.includes('Error') ? 'text-red-500' : 'text-emerald-600'}`}>
          {resultado}
        </span>
      )}
    </div>
  )
}
