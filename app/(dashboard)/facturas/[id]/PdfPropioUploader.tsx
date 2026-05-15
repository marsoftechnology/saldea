'use client'

import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase'

const MAX_SIZE = 10 * 1024 * 1024 // 10 MB

export default function PdfPropioUploader({
  facturaId,
  numeroFactura,
  pdfPathInicial,
}: {
  facturaId: string
  numeroFactura: string
  pdfPathInicial: string | null
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [pdfPath, setPdfPath] = useState(pdfPathInicial)
  const [subiendo, setSubiendo] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [exito, setExito] = useState(false)

  async function subirArchivo(archivo: File) {
    setError(null)
    setExito(false)

    if (archivo.type !== 'application/pdf') {
      setError('Solo se aceptan archivos PDF')
      return
    }
    if (archivo.size > MAX_SIZE) {
      setError('El archivo es demasiado grande (máx. 10 MB)')
      return
    }

    setSubiendo(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No autenticado')

      const ruta = `${user.id}/${facturaId}.pdf`
      const { error: upErr } = await supabase
        .storage
        .from('facturas-pdf')
        .upload(ruta, archivo, { upsert: true, contentType: 'application/pdf' })
      if (upErr) throw upErr

      // Guardar la ruta en la factura
      const res = await fetch(`/api/facturas/${facturaId}/pdf-propio`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdf_propio_path: ruta }),
      })
      if (!res.ok) throw new Error('save failed')

      setPdfPath(ruta)
      setExito(true)
      setTimeout(() => setExito(false), 2000)
    } catch (e) {
      console.error(e)
      setError(e instanceof Error ? e.message : 'Error al subir')
    } finally {
      setSubiendo(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  async function descargar() {
    if (!pdfPath) return
    const supabase = createClient()
    const { data } = await supabase
      .storage
      .from('facturas-pdf')
      .createSignedUrl(pdfPath, 60)
    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank')
    }
  }

  async function eliminar() {
    if (!pdfPath) return
    if (!confirm('¿Eliminar el PDF subido? Volveremos a generar uno automático para los recordatorios.')) return

    setSubiendo(true)
    try {
      const supabase = createClient()
      await supabase.storage.from('facturas-pdf').remove([pdfPath])
      await fetch(`/api/facturas/${facturaId}/pdf-propio`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdf_propio_path: null }),
      })
      setPdfPath(null)
    } catch (e) {
      console.error(e)
      setError('Error al eliminar')
    } finally {
      setSubiendo(false)
    }
  }

  return (
    <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-zinc-100 flex items-center gap-2">
          <span>📎</span> Factura PDF
        </h2>
        {exito && <span className="text-xs text-sky-400">✓ Guardado</span>}
      </div>

      {pdfPath ? (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-2xl">📄</span>
            <div className="min-w-0">
              <p className="text-sm text-zinc-100 truncate">Factura-{numeroFactura}.pdf</p>
              <p className="text-xs text-zinc-500">Se adjuntará a todos los recordatorios</p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={descargar}
              className="text-xs px-3 py-1.5 rounded border border-white/10 text-zinc-300 hover:bg-zinc-800"
            >
              Ver
            </button>
            <button
              onClick={() => inputRef.current?.click()}
              disabled={subiendo}
              className="text-xs px-3 py-1.5 rounded bg-sky-500 text-white hover:bg-sky-400 disabled:opacity-60"
            >
              {subiendo ? '…' : 'Reemplazar'}
            </button>
            <button
              onClick={eliminar}
              disabled={subiendo}
              className="text-xs px-3 py-1.5 text-rose-400 hover:text-rose-300"
            >
              Quitar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => inputRef.current?.click()}
            disabled={subiendo}
            className="w-full border-2 border-dashed border-white/10 rounded-lg py-6 text-sm text-zinc-400 hover:border-sky-500/40 hover:text-zinc-200 transition-colors disabled:opacity-60"
          >
            {subiendo ? 'Subiendo…' : '+ Subir tu PDF de la factura (opcional)'}
          </button>
          <p className="text-xs text-zinc-500 mt-2">
            Si no subes uno, generamos uno automático con los datos básicos. Máx. 10 MB.
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) subirArchivo(f)
        }}
      />

      {error && (
        <p className="text-xs text-rose-400 mt-2">{error}</p>
      )}
    </div>
  )
}
