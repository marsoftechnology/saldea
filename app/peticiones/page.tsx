'use client'

import { useState } from 'react'
import Link from 'next/link'
import MarketingFooter from '../components/MarketingFooter'

const SOFTWARE_OPTIONS = ['Anfix', 'A3', 'ContaPlus', 'Sage', 'Holded', 'Quipu', 'Excel', 'Otro']

export default function PeticionesPage() {
  const [form, setForm] = useState({
    nombre: '',
    gestoria: '',
    email: '',
    telefono: '',
    numClientes: '',
    tarea: '',
    horas: '',
    software: [] as string[],
  })
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  const toggleSoftware = (s: string) => {
    setForm(f => ({
      ...f,
      software: f.software.includes(s) ? f.software.filter(x => x !== s) : [...f.software, s],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    setError('')
    try {
      const res = await fetch('/api/peticion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setEnviado(true)
      } else {
        setError('Ha habido un error. Inténtalo de nuevo o escríbenos a hola@marsof.es')
      }
    } catch {
      setError('Error de red. Inténtalo de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-zinc-100">Marsof Technology</Link>
          <Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">
            Ver Saldea gratis
          </Link>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-16">
        {enviado ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-2xl font-bold text-white mb-3">¡Recibido!</h2>
            <p className="text-zinc-400 mb-2">Hemos recibido tu petición y te contactaremos en menos de 24 horas.</p>
            <p className="text-zinc-500 text-sm">Analizaremos qué procesos podemos automatizar en tu gestoría.</p>
            <Link href="/" className="inline-block mt-8 text-sky-400 hover:underline text-sm">← Volver a marsof.es</Link>
          </div>
        ) : (
          <>
            <div className="mb-10 text-center">
              <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-5">
                <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
                Para gestorías y asesorías
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Cuéntanos qué tareas os<br className="hidden md:block" /> quitan más tiempo
              </h1>
              <p className="text-zinc-400 leading-relaxed max-w-lg mx-auto">
                Analizamos los procesos repetitivos de tu gestoría y te decimos exactamente cómo automatizarlos con IA. Sin compromiso.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nombre y gestoría */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Tu nombre *</label>
                  <input
                    required
                    type="text"
                    placeholder="María García"
                    value={form.nombre}
                    onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                    className="w-full bg-zinc-900/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-sky-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Nombre de la gestoría *</label>
                  <input
                    required
                    type="text"
                    placeholder="Gestoría García"
                    value={form.gestoria}
                    onChange={e => setForm(f => ({ ...f, gestoria: e.target.value }))}
                    className="w-full bg-zinc-900/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-sky-500/50 transition-colors"
                  />
                </div>
              </div>

              {/* Email y teléfono */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="maria@gestoria.es"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full bg-zinc-900/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-sky-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Teléfono</label>
                  <input
                    type="tel"
                    placeholder="612 345 678"
                    value={form.telefono}
                    onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))}
                    className="w-full bg-zinc-900/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-sky-500/50 transition-colors"
                  />
                </div>
              </div>

              {/* Número de clientes */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">¿Cuántos clientes gestionáis? *</label>
                <select
                  required
                  value={form.numClientes}
                  onChange={e => setForm(f => ({ ...f, numClientes: e.target.value }))}
                  className="w-full bg-zinc-900/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-zinc-100 outline-none focus:border-sky-500/50 transition-colors"
                >
                  <option value="">Selecciona...</option>
                  <option value="1-10">Menos de 10 clientes</option>
                  <option value="10-30">Entre 10 y 30 clientes</option>
                  <option value="30-100">Entre 30 y 100 clientes</option>
                  <option value="+100">Más de 100 clientes</option>
                </select>
              </div>

              {/* Tarea repetitiva */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  ¿Qué tarea repetitiva os quita más tiempo cada semana? *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ej: Cada mes tenemos que llamar a los clientes para recordarles que nos manden las facturas, luego introducirlas una a una en el programa, y encima perseguir a los deudores de algunos clientes..."
                  value={form.tarea}
                  onChange={e => setForm(f => ({ ...f, tarea: e.target.value }))}
                  className="w-full bg-zinc-900/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-sky-500/50 transition-colors resize-none"
                />
              </div>

              {/* Horas */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">¿Cuántas horas a la semana dedicáis a esa tarea?</label>
                <select
                  value={form.horas}
                  onChange={e => setForm(f => ({ ...f, horas: e.target.value }))}
                  className="w-full bg-zinc-900/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-zinc-100 outline-none focus:border-sky-500/50 transition-colors"
                >
                  <option value="">Selecciona...</option>
                  <option value="1-3">1 a 3 horas</option>
                  <option value="3-6">3 a 6 horas</option>
                  <option value="6-10">6 a 10 horas</option>
                  <option value="+10">Más de 10 horas</option>
                </select>
              </div>

              {/* Software */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">¿Con qué software trabajáis?</label>
                <div className="flex flex-wrap gap-2">
                  {SOFTWARE_OPTIONS.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSoftware(s)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors
                        ${form.software.includes(s)
                          ? 'bg-sky-500/20 border-sky-500/50 text-sky-300'
                          : 'bg-zinc-800/60 border-white/10 text-zinc-400 hover:border-white/20'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">{error}</p>
              )}

              <button
                type="submit"
                disabled={enviando}
                className="w-full bg-sky-500 text-zinc-900 font-bold py-4 rounded-xl hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20 disabled:opacity-60 text-sm"
              >
                {enviando ? 'Enviando...' : 'Enviar petición — os contactamos en menos de 24h'}
              </button>

              <p className="text-center text-zinc-600 text-xs">
                Sin spam. Solo nos pondremos en contacto para analizar vuestra situación.
              </p>
            </form>
          </>
        )}
      </main>

      <MarketingFooter />
    </div>
  )
}
