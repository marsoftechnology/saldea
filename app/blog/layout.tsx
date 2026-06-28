import WhatsAppWidget from '../components/WhatsAppWidget'
import ScrollToTop from '../components/ScrollToTop'

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Marsof', item: 'https://www.marsof.es' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.marsof.es/blog' },
  ],
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
      <WhatsAppWidget />
      <ScrollToTop />
    </>
  )
}
