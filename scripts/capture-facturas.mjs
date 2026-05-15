// Captura /facturas como mock estilizado.
// Navegamos a una página de Saldea que NO requiere auth (la landing) para
// cargar las fonts y los stylesheets de Tailwind, y luego reemplazamos
// el body con el HTML demo de /facturas en paleta sky.

import { chromium } from 'playwright'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT = join(ROOT, 'public', 'images', 'saldea', 'facturas.png')

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({
  viewport: { width: 1400, height: 900 },
  deviceScaleFactor: 2,
})
const page = await ctx.newPage()

// Usar /login para que cargue el CSS de Saldea
await page.goto('https://www.marsof.es/login', { waitUntil: 'networkidle', timeout: 30000 })

// Sustituir el body por la maqueta de facturas con sidebar
await page.evaluate(() => {
  document.body.innerHTML = `
    <div class="min-h-screen bg-[#0a0a0b] text-zinc-100 flex">
      <!-- Sidebar -->
      <aside class="w-60 bg-zinc-950 border-r border-white/5 flex flex-col">
        <div class="px-6 py-6 border-b border-white/5">
          <div class="flex items-center gap-2">
            <span class="text-2xl font-bold bg-gradient-to-r from-sky-300 to-sky-500 bg-clip-text text-transparent">Saldea</span>
          </div>
          <p class="text-xs text-zinc-500 mt-0.5">BY MARSOF</p>
          <p class="text-xs text-zinc-400 mt-3">gestoriaespaña</p>
        </div>
        <nav class="flex-1 px-3 py-4 space-y-1 text-sm">
          <a class="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:bg-white/5"><span>📊</span> Inicio</a>
          <a class="flex items-center gap-3 px-3 py-2 rounded-lg bg-sky-500/10 text-sky-300"><span>📄</span> Facturas</a>
          <a class="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:bg-white/5"><span>👥</span> Clientes</a>
          <a class="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:bg-white/5"><span>📈</span> Informes</a>
          <a class="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:bg-white/5"><span>📥</span> Importar CSV</a>
        </nav>
        <div class="px-3 py-3 border-t border-white/5 space-y-1 text-sm">
          <a class="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400"><span>⚙️</span> Ajustes</a>
          <a class="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400"><span>🚪</span> Cerrar sesión</a>
        </div>
      </aside>

      <!-- Contenido -->
      <main class="flex-1 px-10 py-8">
        <div class="flex items-start justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold text-white tracking-tight">Facturas</h1>
            <p class="text-zinc-400 text-sm mt-1">4 facturas en total</p>
          </div>
          <button class="bg-sky-500 text-zinc-900 px-5 py-2.5 rounded-lg font-semibold hover:bg-sky-400 transition shadow-lg shadow-sky-500/20">+ Nueva factura</button>
        </div>

        <div class="rounded-2xl border border-white/10 bg-zinc-950/50 overflow-hidden">
          <div class="grid grid-cols-[2fr_1fr_1fr_140px] gap-4 px-6 py-3 text-xs uppercase tracking-wider text-zinc-500 border-b border-white/10">
            <span>Cliente</span><span>Importe</span><span>Vencimiento</span><span>Estado</span>
          </div>
          ${[
            ['Test E2E Cliente','Factura E2E-EXTREMO-001','750,00 €','07/05/2026','Vencida','rose'],
            ['Test E2E Cliente','Factura E2E-TEST-001','500,00 €','08/05/2026','Cobrada','sky'],
            ['Pedro García','Factura 765','500,00 €','11/05/2026','Cobrada','sky'],
            ['Pedro García','Factura 001','1.234,89 €','15/05/2026','Cobrada','sky'],
          ].map(r => `
            <div class="grid grid-cols-[2fr_1fr_1fr_140px] gap-4 px-6 py-5 items-center border-b border-white/5 last:border-0">
              <div>
                <div class="text-white font-medium">${r[0]}</div>
                <div class="text-zinc-500 text-xs mt-1">${r[1]}</div>
              </div>
              <div class="text-white font-semibold">${r[2]}</div>
              <div class="text-zinc-400 text-sm">${r[3]}</div>
              <div>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-${r[5]}-500/30 bg-${r[5]}-500/10 text-${r[5]}-300">${r[4]}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </main>
    </div>
  `
  // Asegurarnos de que el body tenga fondo dark
  document.body.style.background = '#0a0a0b'
  document.body.style.margin = '0'
})

await page.waitForTimeout(800)
await page.screenshot({ path: OUT, fullPage: false })
console.log('▸ ✓ facturas.png guardado')

await ctx.close()
await browser.close()
