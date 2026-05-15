// Captura screenshots de páginas autenticadas de Saldea.
// Lee cookies del Chrome del usuario (vía script Python con browser-cookie3),
// las inyecta en Playwright y captura facturas/ajustes/importar.

import { chromium } from 'playwright'
import { execSync } from 'node:child_process'
import { writeFileSync, unlinkSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, 'public', 'images', 'saldea')

console.log('▸ Extrayendo cookies de Chrome…')
const pyOut = execSync(`python "${join(__dirname, 'extract-cookies.py')}"`, { encoding: 'utf8' })
const cookies = JSON.parse(pyOut.trim().split('\n').pop())
console.log(`  ${cookies.length} cookies extraídas`)

// Normalizar para Playwright: necesita sameSite y url correcto
const playwrightCookies = cookies.map(c => ({
  name: c.name,
  value: c.value,
  domain: c.domain.startsWith('.') ? c.domain : '.' + c.domain.replace(/^www\./, ''),
  path: c.path || '/',
  secure: c.secure,
  httpOnly: c.httpOnly,
  expires: c.expires > 0 ? c.expires : -1,
  sameSite: 'Lax',
}))

console.log('▸ Lanzando Chromium headless…')
const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({
  viewport: { width: 1400, height: 900 },
  deviceScaleFactor: 2,
})
await ctx.addCookies(playwrightCookies)

const page = await ctx.newPage()

const targets = [
  { url: 'https://www.marsof.es/facturas', file: 'facturas.png' },
  { url: 'https://www.marsof.es/ajustes', file: 'ajustes.png' },
  { url: 'https://www.marsof.es/importar', file: 'importar.png' },
]

for (const t of targets) {
  console.log(`▸ Capturando ${t.url}…`)
  await page.goto(t.url, { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(1500)
  const finalUrl = page.url()
  if (finalUrl.includes('/login')) {
    console.error(`  ✗ Redirigido a login — sesión no válida. URL final: ${finalUrl}`)
    continue
  }
  const outPath = join(OUT_DIR, t.file)
  await page.screenshot({ path: outPath, fullPage: false })
  console.log(`  ✓ ${t.file}`)
}

await ctx.close()
await browser.close()
console.log('▸ Listo.')
