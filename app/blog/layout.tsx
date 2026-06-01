import WhatsAppWidget from '../components/WhatsAppWidget'
import ScrollToTop from '../components/ScrollToTop'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <WhatsAppWidget />
      <ScrollToTop />
    </>
  )
}
