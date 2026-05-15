'use client'

import { useRouter } from 'next/navigation'

export default function LogoutAdminButton() {
  const router = useRouter()
  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }
  return (
    <button
      onClick={logout}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-rose-400 hover:bg-rose-500/10 w-full transition-colors"
    >
      <span>🚪</span>
      Cerrar sesión
    </button>
  )
}
