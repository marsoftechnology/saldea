import { ImageResponse } from 'next/og'

export const alt = 'Saldea — Cobra tus facturas sin esfuerzo con IA'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #020617 0%, #0c1f33 60%, #0a2540 100%)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Resplandor sky en la esquina */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(14,165,233,0.45) 0%, rgba(14,165,233,0) 70%)',
            display: 'flex',
          }}
        />

        {/* Header: marca */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#02101c',
              boxShadow: '0 12px 32px rgba(14,165,233,0.45)',
            }}
          >
            ms
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: '#e0f2fe' }}>
              Saldea
            </span>
            <span style={{ fontSize: 16, color: '#7dd3fc', marginTop: -4 }}>by Marsof Technology</span>
          </div>
        </div>

        {/* Titular */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 920 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(14,165,233,0.12)',
              border: '1px solid rgba(14,165,233,0.35)',
              color: '#7dd3fc',
              padding: '8px 18px',
              borderRadius: 9999,
              fontSize: 18,
              width: 'fit-content',
              fontWeight: 500,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 9999, background: '#0ea5e9', display: 'flex' }} />
            7 días gratis · cancela en 1 clic
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ color: 'white' }}>Cobra tus facturas</span>
            <span
              style={{
                background: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              sin perseguir a nadie.
            </span>
          </div>
          <div style={{ fontSize: 28, color: '#cbd5e1', lineHeight: 1.4, maxWidth: 880 }}>
            La IA escribe los recordatorios por ti y escala el tono hasta que tus clientes pagan.
          </div>
        </div>

        {/* Footer: URL */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <span style={{ fontSize: 22, color: '#94a3b8', fontWeight: 500 }}>marsof.es/saldea</span>
          <div style={{ display: 'flex', gap: 24, fontSize: 18, color: '#64748b' }}>
            <span>Free · 49€/mes · 499€/año</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
