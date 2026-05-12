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
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-500 text-sm mt-1">{clientes?.length ?? 0} clientes registrados</p>
        </div>
        <Link href="/clientes/nuevo" className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
          + Nuevo cliente
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        {clientes && clientes.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {clientes.map(cliente => (
              <Link key={cliente.id} href={`/clientes/${cliente.id}`} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-semibold text-sm">
                    {cliente.nombre.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{cliente.nombre}</p>
                    {cliente.empresa && <p className="text-xs text-gray-400">{cliente.empresa}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{cliente.email}</p>
                  <p className="text-xs text-gray-400">Añadido {formatearFecha(cliente.created_at)}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-4xl mb-4">👥</p>
            <p className="text-gray-900 font-medium mb-2">Aún no tienes clientes</p>
            <p className="text-gray-400 text-sm mb-6">Añade tu primer cliente para empezar a gestionar sus facturas</p>
            <Link href="/clientes/nuevo" className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
              Añadir primer cliente
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
