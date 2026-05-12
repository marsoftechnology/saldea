'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import type { Cliente } from '@/types'

export default function NuevaFacturaPage() {
  const router = useRouter()
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [form, setForm] = useState({
    cliente_id: '',
    numero: '',
    importe: '',
    fecha_vencimiento: '',
    descripcion: '',
  })

  useEffect(() => {
    async function cargarClientes() {
      const supabase = createClient()
      const { data } = await supabase.from('clientes').select('*').order('nombre')
      setClientes(data ?? [])
    }
    cargarClientes()
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setCargando(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    const { data: factura, error: errFactura } = await supabase.from('facturas').insert({
      user_id: user.id,
      cliente_id: form.cliente_id,
      numero: form.numero,
      importe: parseFloat(form.importe),
      fecha_vencimiento: form.fecha_vencimiento,
      descripcion: form.descripcion || null,
      estado: 'pendiente',
    }).select().single()

    if (errFactura || !factura) {
      setError('Error al guardar la factura. Inténtalo de nuevo.')
      setCargando(false)
      return
    }

    await supabase.from('recordatorios').insert([
      { factura_id: factura.id, dias_offset: 3, tono: 'amigable', enviado: false },
      { factura_id: factura.id, dias_offset: 10, tono: 'firme', enviado: false },
      { factura_id: factura.id, dias_offset: 20, tono: 'formal', enviado: false },
    ])

    router.push(`/facturas/${factura.id}`)
  }

  return (
    <div className="p-8 max-w-lg">
      <div className="mb-8">
        <Link href="/facturas" className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block">
          ← Volver a facturas
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Nueva factura</h1>
        <p className="text-gray-500 text-sm mt-1">La IA enviará recordatorios automáticamente a los 3, 10 y 20 días de vencimiento</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cliente *</label>
          <select
            name="cliente_id"
            value={form.cliente_id}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
          >
            <option value="">Selecciona un cliente</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}{c.empresa ? ` — ${c.empresa}` : ''}</option>
            ))}
          </select>
          {clientes.length === 0 && (
            <p className="text-xs text-gray-400 mt-1">
              No tienes clientes.{' '}
              <Link href="/clientes/nuevo" className="text-emerald-600 hover:underline">Añade uno primero</Link>
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número de factura *</label>
            <input
              name="numero"
              value={form.numero}
              onChange={handleChange}
              required
              placeholder="001"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Importe (€) *</label>
            <input
              name="importe"
              type="number"
              step="0.01"
              min="0.01"
              value={form.importe}
              onChange={handleChange}
              required
              placeholder="850.00"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de vencimiento *</label>
          <input
            name="fecha_vencimiento"
            type="date"
            value={form.fecha_vencimiento}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción (opcional)</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange as React.ChangeEventHandler<HTMLTextAreaElement>}
            rows={2}
            placeholder="Servicios de diseño web — Proyecto X"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
          <p className="text-sm text-emerald-700 font-medium mb-1">📧 Recordatorios automáticos activados</p>
          <p className="text-xs text-emerald-600">Día 3: tono amigable · Día 10: tono firme · Día 20: tono formal</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">{error}</div>
        )}

        <button
          type="submit"
          disabled={cargando || clientes.length === 0}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-60"
        >
          {cargando ? 'Guardando...' : 'Crear factura'}
        </button>
      </form>
    </div>
  )
}
