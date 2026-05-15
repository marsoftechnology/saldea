import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { formatearFecha } from '@/lib/utils'
import { redirect } from 'next/navigation'

export default async function ClientesPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: clientes } = await supabase
    .from('clientes')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Clientes</h1>
          <p className="text-zinc-400 text-sm mt-1">{clientes?.length ?? 0} clientes registrados</p>
        </div>
        <div className="flex items-center gap-2">
          {(clientes?.length ?? 0) > 0 && (
            <a
              href="/api/clientes/exportar"
              download
              className="text-zinc-300 border border-white/10 hover:bg-white/5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1.5"
              title="Descargar todos los clientes en CSV"
            >
              ⬇ Exportar CSV
            </a>
          )}
          <Link href="/clientes/nuevo" className="bg-sky-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-sky-400 transition-colors">
            + Nuevo cliente
          </Link>
        </div>
      </div>

      <div className="bg-zinc-900/40 border border-white/10 rounded-xl">
        {clientes && clientes.length > 0 ? (
          <div className="divide-y divide-white/5">
            {clientes.map(cliente => (
              <Link key={cliente.id} href={`/clientes/${cliente.id}`} className="flex items-center justify-between p-4 hover:bg-zinc-900/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-sky-500/20 text-sky-300 rounded-full flex items-center justify-center font-semibold text-sm">
                    {cliente.nombre.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-100">{cliente.nombre}</p>
                    {cliente.empresa && <p className="text-xs text-zinc-500">{cliente.empresa}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-400">{cliente.email}</p>
                  <p className="text-xs text-zinc-500">Añadido {formatearFecha(cliente.created_at)}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-4xl mb-4">👥</p>
            <p className="text-zinc-100 font-medium mb-2">Aún no tienes clientes</p>
            <p className="text-zinc-500 text-sm mb-6">Añade tu primer cliente para empezar a gestionar sus facturas</p>
            <Link href="/clientes/nuevo" className="bg-sky-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-sky-400 transition-colors">
              Añadir primer cliente
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
