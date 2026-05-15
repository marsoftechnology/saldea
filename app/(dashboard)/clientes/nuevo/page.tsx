'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { getActiveOrgIdClient } from '@/lib/client-org'

export default function NuevoClientePage() {
  const router = useRouter()
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', empresa: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setCargando(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) { router.push('/login'); return }

    const orgId = await getActiveOrgIdClient()
    if (!orgId) {
      setError('No se pudo determinar tu organización. Recarga la página.')
      setCargando(false)
      return
    }

    const { error } = await supabase.from('clientes').insert({
      user_id: user.id,
      org_id: orgId,
      nombre: form.nombre,
      email: form.email,
      telefono: form.telefono || null,
      empresa: form.empresa || null,
    })

    if (error) {
      // Detectar error de límite del plan Free (lanzado por trigger Postgres)
      if (error.message?.includes('PLAN_LIMIT_CLIENTES')) {
        setError('Has llegado al límite de 10 clientes del plan Free. Sube a Pro desde Ajustes para añadir clientes ilimitados.')
      } else {
        setError('Error al guardar el cliente. Inténtalo de nuevo.')
      }
      setCargando(false)
      return
    }

    router.push('/clientes')
  }

  return (
    <div className="p-8 max-w-lg">
      <div className="mb-8">
        <Link href="/clientes" className="text-sm text-zinc-400 hover:text-zinc-100 mb-4 inline-block">
          ← Volver a clientes
        </Link>
        <h1 className="text-2xl font-bold text-zinc-100">Nuevo cliente</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Nombre completo *</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            placeholder="Pedro García"
            className="w-full px-4 py-3 border border-white/10 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Email *</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="pedro@empresa.com"
            className="w-full px-4 py-3 border border-white/10 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Empresa (opcional)</label>
          <input
            name="empresa"
            value={form.empresa}
            onChange={handleChange}
            placeholder="Empresa S.L."
            className="w-full px-4 py-3 border border-white/10 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Teléfono (opcional)</label>
          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="600 000 000"
            className="w-full px-4 py-3 border border-white/10 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40"
          />
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm px-4 py-3 rounded-lg">{error}</div>
        )}

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-sky-500 text-white py-3 rounded-lg font-medium hover:bg-sky-400 transition-colors disabled:opacity-60"
        >
          {cargando ? 'Guardando...' : 'Guardar cliente'}
        </button>
      </form>
    </div>
  )
}
