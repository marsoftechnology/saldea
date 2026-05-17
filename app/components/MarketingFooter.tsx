import Link from 'next/link'

/**
 * Footer reutilizable para todas las paginas publicas (marketing).
 * Importante para SEO: linking interno + datos de empresa visibles en cada pagina.
 */
export default function MarketingFooter() {
  const ano = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 bg-black/30 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <p className="text-sm font-bold text-zinc-100 mb-3">Marsof</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/sobre-marsof" className="text-zinc-400 hover:text-zinc-100 transition-colors">Sobre Marsof</Link></li>
              <li><Link href="/contacto" className="text-zinc-400 hover:text-zinc-100 transition-colors">Contacto</Link></li>
              <li><Link href="/blog" className="text-zinc-400 hover:text-zinc-100 transition-colors">Blog</Link></li>
              <li><Link href="/recursos" className="text-zinc-400 hover:text-zinc-100 transition-colors">Recursos gratis</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold text-zinc-100 mb-3">Producto</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/saldea" className="text-zinc-400 hover:text-zinc-100 transition-colors">Saldea</Link></li>
              <li><Link href="/gestorias" className="text-zinc-400 hover:text-zinc-100 transition-colors">Para gestorías</Link></li>
              <li><Link href="/autonomos" className="text-zinc-400 hover:text-zinc-100 transition-colors">Para autónomos</Link></li>
              <li><Link href="/preguntas-frecuentes" className="text-zinc-400 hover:text-zinc-100 transition-colors">Preguntas frecuentes</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold text-zinc-100 mb-3">Aprender</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/ley-3-2004-morosidad-explicada" className="text-zinc-400 hover:text-zinc-100 transition-colors">Ley 3/2004</Link></li>
              <li><Link href="/blog/como-cobrar-cliente-moroso" className="text-zinc-400 hover:text-zinc-100 transition-colors">Cobrar morosos</Link></li>
              <li><Link href="/glosario" className="text-zinc-400 hover:text-zinc-100 transition-colors">Glosario</Link></li>
              <li><Link href="/comparativa/saldea-vs-holded" className="text-zinc-400 hover:text-zinc-100 transition-colors">Saldea vs Holded</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold text-zinc-100 mb-3">Legal</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/legal/terminos" className="text-zinc-400 hover:text-zinc-100 transition-colors">Términos</Link></li>
              <li><Link href="/legal/privacidad" className="text-zinc-400 hover:text-zinc-100 transition-colors">Privacidad</Link></li>
              <li><Link href="/legal/cookies" className="text-zinc-400 hover:text-zinc-100 transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-xs text-zinc-500">
            © {ano} <strong className="text-zinc-300">Marsof Technology</strong>. Hecho en Niebla, Huelva (España).
          </p>
          <p className="text-xs text-zinc-500">
            Datos en servidores europeos · RGPD · Soporte en español
          </p>
        </div>
      </div>
    </footer>
  )
}
