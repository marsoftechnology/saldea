'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Papa from 'papaparse'

interface Resultado {
  importadas: number
  errores: string[]
  total: number
}

const COLUMNAS = ['nombre', 'email', 'empresa', 'factura_numero', 'importe', 'fecha_vencimiento', 'descripcion']
const EJEMPLO_CSV = `nombre,email,empresa,factura_numero,importe,fecha_vencimiento,descripcion
Juan García,juan@empresa.com,Empresa SA,001,1500,2026-06-30,Diseño web
María López,maria@tech.com,,002,800,2026-07-15,Consultoría`

export default function ImportarPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [filas, setFilas] = useState<Record<string, string>[]>([])
  const [cargando, setCargando] = useState(false)
  const [resultado, setResultado] = useState<Resultado | null>(null)
  const [error, setError] = useState<string | null>(null)

  function onArchivoSeleccionado(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0]
    if (!archivo) return
    setError(null)
    setResultado(null)

    Papa.parse(archivo, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const datos = result.data as Record<string, string>[]
        if (datos.length === 0) {
          setError('El archivo no contiene datos')
          return
        }
        setFilas(datos)
      },
      error: () => setError('Error leyendo el archivo CSV'),
    })
  }

  async function importar() {
    if (filas.length === 0) return
    setCargando(true)
    setError(null)

    try {
      const res = await fetch('/api/importar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filas }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setResultado(data)
        setFilas([])
        if (inputRef.current) inputRef.current.value = ''
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setCargando(false)
    }
  }

  function descargarPlantilla() {
    const blob = new Blob([EJEMPLO_CSV], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'plantilla_saldea.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-zinc-100 mb-4 inline-block">← Volver</Link>
        <h1 className="text-2xl font-bold text-zinc-100">Importar desde CSV</h1>
        <p className="text-zinc-400 text-sm mt-1">Carga clientes y facturas en masa desde una hoja de cálculo</p>
      </div>

      {/* Instrucciones */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
        <h2 className="font-semibold text-blue-900 mb-2 text-sm">Formato del CSV</h2>
        <p className="text-blue-700 text-sm mb-3">El archivo debe tener estas columnas (en este orden):</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {COLUMNAS.map(c => (
            <span key={c} className={`text-xs px-2 py-1 rounded font-mono ${c === 'empresa' || c === 'descripcion' ? 'bg-blue-100 text-blue-500' : 'bg-blue-200 text-blue-800'}`}>
              {c}{c === 'empresa' || c === 'descripcion' ? ' (opcional)' : ''}
            </span>
          ))}
        </div>
        <button
          onClick={descargarPlantilla}
          className="text-sm text-blue-700 underline hover:text-blue-900"
        >
          Descargar plantilla de ejemplo →
        </button>
      </div>

      {/* Upload */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 mb-6">
        <label className="block">
          <span className="text-sm font-medium text-zinc-300 mb-2 block">Selecciona tu archivo CSV</span>
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            onChange={onArchivoSeleccionado}
            className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-sky-500/10 file:text-sky-300 hover:file:bg-sky-500/20 cursor-pointer"
          />
        </label>
      </div>

      {/* Preview */}
      {filas.length > 0 && (
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl mb-6 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <h2 className="font-semibold text-zinc-100">{filas.length} filas detectadas</h2>
          </div>
          <div className="overflow-x-auto max-h-64">
            <table className="w-full text-xs">
              <thead className="bg-zinc-900/30 sticky top-0">
                <tr>
                  {Object.keys(filas[0]).map(col => (
                    <th key={col} className="text-left p-3 text-zinc-400 font-medium whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filas.slice(0, 10).map((fila, i) => (
                  <tr key={i}>
                    {Object.values(fila).map((val, j) => (
                      <td key={j} className="p-3 text-zinc-300 whitespace-nowrap">{val || '—'}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filas.length > 10 && (
            <p className="text-xs text-zinc-500 p-3 border-t border-gray-50">
              ... y {filas.length - 10} filas más
            </p>
          )}

          <div className="p-4 border-t border-white/5">
            <button
              onClick={importar}
              disabled={cargando}
              className="bg-sky-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-sky-400 disabled:opacity-60 transition-colors"
            >
              {cargando ? 'Importando...' : `Importar ${filas.length} registros`}
            </button>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mb-4">
          <p className="text-rose-300 text-sm">{error}</p>
        </div>
      )}

      {/* Resultado */}
      {resultado && (
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6">
          <div className={`text-center mb-4 ${resultado.importadas === resultado.total ? 'text-sky-400' : 'text-amber-300'}`}>
            <p className="text-4xl font-bold">{resultado.importadas}</p>
            <p className="text-sm">de {resultado.total} importadas correctamente</p>
          </div>

          {resultado.errores.length > 0 && (
            <div className="bg-rose-500/10 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-rose-300 mb-2">Errores:</p>
              <ul className="text-sm text-rose-400 space-y-1">
                {resultado.errores.map((e, i) => <li key={i}>• {e}</li>)}
              </ul>
            </div>
          )}

          <Link
            href="/facturas"
            className="block w-full bg-sky-500 text-white text-center py-2.5 rounded-lg text-sm font-medium hover:bg-sky-400 transition-colors"
          >
            Ver facturas importadas →
          </Link>
        </div>
      )}
    </div>
  )
}
