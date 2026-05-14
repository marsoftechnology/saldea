'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function EditarClientePage() {
  const router = useRouter()
  const params = useParams()
  const clienteId = params.id as string

  const [cargando, setCargando] = useState(false)
  const [cargandoInicial, setCargandoInicial] = useState(true)
  const [error, setError] = useState('')
  const [eliminando, setEliminando] = useState(false)
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', empresa: '' })

  useEffect(() => {
    async function cargar() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: cliente } = await supabase
        .from('clientes')
        .select('*')
        .eq('id', clienteId)
        .eq('user_id', user.id)
        .maybeSingle()
      if (!cliente) { router.push('/clientes'); return }
      setForm({
        nombre: cliente.nombre,
        email: cliente.email,
        telefono: cliente.telefono ?? '',
        empresa: cliente.empresa ?? '',
      })
      setCargandoInicial(false)
    }
    cargar()
  }, [clienteId, router])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setCargando(true)
    const supabase = createClient()
    const { error: errUpd } = await supabase.from('clientes').update({
      nombre: form.nombre,
      email: form.email,
      telefono: form.telefono || null,
      empresa: form.empresa || null,
    }).eq('id', clienteId)
    if (errUpd) {
      setError('Error al actualizar. Inténtalo de nuevo.')
      setCargando(false)
      return
    }
    router.push(`/clientes/${clienteId}`)
  }

  async function handleEliminar() {
    if (!confirm('¿Seguro que quieres eliminar este cliente? Se eliminarán también todas sus facturas y recordatorios. Esta acción no se puede deshacer.')) return
    setEliminando(true)
    const supabase = createClient()
    const { error: errDel } = await supabase.from('clientes').delete().eq('id', clienteId)
    if (errDel) {
      setError('Error al eliminar. Inténtalo de nuevo.')
      setEliminando(false)
      return
    }
    router.push('/clientes')
  }

  if (cargandoInicial) return null

  return (
    <div className="p-8 max-w-lg">
      <div className="mb-8">
        <Link href={`/clientes/${clienteId}`} className="text-sm text-zinc-400 hover:text-zinc-100 mb-4 inline-block">
          ← Volver al cliente
        </Link>
        <h1 className="text-2xl font-bold text-zinc-100">Editar cliente</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Nombre completo *</label>
          <input
            name="nombre" value={form.nombre} onChange={handleChange} required
            className="w-full px-4 py-3 border border-white/10 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Email *</label>
          <input
            name="email" type="email" value={form.email} onChange={handleChange} required
            className="w-full px-4 py-3 border border-white/10 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Empresa</label>
          <input
            name="empresa" value={form.empresa} onChange={handleChange}
            className="w-full px-4 py-3 border border-white/10 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Teléfono</label>
          <input
            name="telefono" value={form.telefono} onChange={handleChange}
            className="w-full px-4 py-3 border border-white/10 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          />
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm px-4 py-3 rounded-lg">{error}</div>
        )}

        <button
          type="submit" disabled={cargando}
          className="w-full bg-sky-500 text-white py-3 rounded-lg font-medium hover:bg-sky-400 transition-colors disabled:opacity-60"
        >
          {cargando ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>

      <div className="mt-8 bg-zinc-900/40 border border-white/10 rounded-xl border border-red-100 p-6">
        <h2 className="text-sm font-semibold text-rose-300 mb-1">Zona peligrosa</h2>
        <p className="text-xs text-zinc-400 mb-4">Eliminar este cliente borrará también todas sus facturas y recordatorios. Esta acción no se puede deshacer.</p>
        <button
          type="button" onClick={handleEliminar} disabled={eliminando}
          className="bg-zinc-900/40 border border-red-300 text-rose-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-rose-500/10 transition-colors disabled:opacity-60"
        >
          {eliminando ? 'Eliminando...' : '🗑️ Eliminar cliente'}
        </button>
      </div>
    </div>
  )
}
