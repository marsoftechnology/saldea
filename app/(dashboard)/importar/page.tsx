'use client'

import { useRef, useState, useEffect } from 'react'
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

const GUIAS: Record<string, { nombre: string; pasos: string[]; columnas: string }> = {
  holded: {
    nombre: 'Holded',
    pasos: [
      'Ve a Ventas → Facturas en Holded.',
      'Haz clic en "Exportar" (arriba a la derecha) → selecciona CSV.',
      'En el CSV de Holded renombra las columnas: "Nombre cliente" → nombre, "Email" → email, "Empresa" → empresa, "Número" → factura_numero, "Total" → importe, "Fecha vencimiento" → fecha_vencimiento, "Concepto" → descripcion.',
      'Asegúrate de que las fechas están en formato AAAA-MM-DD (por ejemplo 2026-06-30).',
    ],
    columnas: 'Nombre cliente, Email, Empresa, Número, Total, Fecha vencimiento, Concepto',
  },
  quipu: {
    nombre: 'Quipu',
    pasos: [
      'Ve a Facturación → Facturas emitidas en Quipu.',
      'Usa el botón "Exportar" → CSV.',
      'Renombra: "Cliente" → nombre, "Email cliente" → email, "Razón social" → empresa, "Número factura" → factura_numero, "Total" → importe, "Fecha vencimiento" → fecha_vencimiento, "Descripción" → descripcion.',
      'Formatea las fechas como AAAA-MM-DD. Quipu las exporta como DD/MM/AAAA, cámbialas en Excel con la función TEXTO(A1,"AAAA-MM-DD").',
    ],
    columnas: 'Cliente, Email cliente, Razón social, Número factura, Total, Fecha vencimiento, Descripción',
  },
  anfix: {
    nombre: 'Anfix',
    pasos: [
      'Ve a Facturación → Facturas en Anfix.',
      'Exporta a Excel/CSV desde el menú superior.',
      'Renombra las columnas al formato de Saldea: nombre, email, empresa, factura_numero, importe, fecha_vencimiento, descripcion.',
      'Convierte las fechas: Anfix usa formato DD/MM/AAAA, cámbialas a AAAA-MM-DD.',
    ],
    columnas: 'Nombre cliente, Email, CIF/empresa, Número, Importe total, Fecha vto, Concepto',
  },
  billin: {
    nombre: 'Billin',
    pasos: [
      'Ve a Facturas → Listado en Billin.',
      'Exporta con el botón CSV/Excel del listado.',
      'Renombra al formato Saldea: nombre, email, empresa, factura_numero, importe, fecha_vencimiento, descripcion.',
      'Fechas en formato AAAA-MM-DD.',
    ],
    columnas: 'Cliente, Email, Empresa, Ref. factura, Total, Vencimiento, Descripción',
  },
  sage: {
    nombre: 'Sage 50 / ContaPlus',
    pasos: [
      'En Sage 50 ve a Facturación → Informes → Listado de facturas emitidas.',
      'Exporta a CSV desde el menú Imprimir → Exportar.',
      'El CSV de Sage puede tener muchas columnas; elimina las que no necesitas y deja: nombre cliente, email, empresa/CIF, número factura, total factura, fecha vencimiento, concepto.',
      'Renombra a: nombre, email, empresa, factura_numero, importe, fecha_vencimiento, descripcion.',
    ],
    columnas: 'Nombre cliente, Email, Empresa, Número factura, Total, Fecha vencimiento, Concepto',
  },
  excel: {
    nombre: 'Excel / hoja propia',
    pasos: [
      'Crea una hoja con estas 7 columnas exactas en la primera fila: nombre, email, empresa, factura_numero, importe, fecha_vencimiento, descripcion.',
      'Rellena los datos. "empresa" y "descripcion" son opcionales (pueden ir vacías).',
      'Las fechas deben estar en formato AAAA-MM-DD (por ejemplo 2026-06-30).',
      'El importe debe ser un número decimal con punto: 1500.00, no "1.500,00€".',
      'Guarda como CSV (Archivo → Guardar como → CSV UTF-8).',
    ],
    columnas: 'nombre, email, empresa, factura_numero, importe, fecha_vencimiento, descripcion',
  },
}

export default function ImportarPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [filas, setFilas] = useState<Record<string, string>[]>([])
  const [cargando, setCargando] = useState(false)
  const [resultado, setResultado] = useState<Resultado | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [plan, setPlan] = useState<'free' | 'pro' | null>(null)
  const [software, setSoftware] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/configuracion')
      .then(r => r.json())
      .then(data => setPlan(data?.configuracion?.plan === 'pro' ? 'pro' : 'free'))
      .catch(() => setPlan(null))
  }, [])

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

      {/* Banner plan Free */}
      {plan === 'free' && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
          <span className="text-xl shrink-0">🔒</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-amber-300">Función exclusiva del plan Pro</p>
            <p className="text-xs text-amber-200/70 mt-0.5">
              La importación masiva desde CSV requiere el plan Pro. Con el plan Free puedes añadir clientes y facturas de uno en uno.
            </p>
          </div>
          <Link
            href="/ajustes#plan"
            className="shrink-0 text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-3 py-1.5 rounded-lg transition-colors"
          >
            Ver plan Pro →
          </Link>
        </div>
      )}

      {/* Selector de software */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 mb-4">
        <h2 className="font-semibold text-zinc-100 mb-3 text-sm">¿Desde qué software importas?</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(GUIAS).map(([key, g]) => (
            <button
              key={key}
              onClick={() => setSoftware(software === key ? null : key)}
              className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
                software === key
                  ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
                  : 'bg-zinc-900/60 border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
              }`}
            >
              {g.nombre}
            </button>
          ))}
        </div>

        {software && GUIAS[software] && (
          <div className="mt-4 border-t border-white/5 pt-4">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              Guía para {GUIAS[software].nombre}
            </p>
            <ol className="space-y-2">
              {GUIAS[software].pasos.map((paso, i) => (
                <li key={i} className="flex gap-3 text-sm text-zinc-300">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs shrink-0 font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <span>{paso}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Instrucciones formato */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 mb-6">
        <h2 className="font-semibold text-zinc-100 mb-2 text-sm">Columnas requeridas en el CSV</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {COLUMNAS.map(c => (
            <span key={c} className={`text-xs px-2 py-1 rounded font-mono ${c === 'empresa' || c === 'descripcion' ? 'bg-zinc-800 text-zinc-400' : 'bg-sky-500/20 text-sky-300'}`}>
              {c}{c === 'empresa' || c === 'descripcion' ? ' (opcional)' : ''}
            </span>
          ))}
        </div>
        <button
          onClick={descargarPlantilla}
          className="text-sm text-sky-400 hover:text-sky-300"
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
            disabled={plan === 'free'}
            className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-sky-500/10 file:text-sky-300 hover:file:bg-sky-500/20 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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
