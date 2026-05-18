import { ImageResponse } from 'next/og'

export const alt = 'Marsof — Software español para automatizar tu negocio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow de fondo */}
        <div style={{
          position: 'absolute',
          top: -100,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)',
        }} />

        {/* Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(14,165,233,0.1)',
          border: '1px solid rgba(14,165,233,0.25)',
          borderRadius: 999,
          padding: '6px 20px',
          marginBottom: 32,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#38bdf8' }} />
          <span style={{ color: '#38bdf8', fontSize: 18, fontWeight: 600, letterSpacing: 2 }}>
            MARSOF TECHNOLOGY
          </span>
        </div>

        {/* Título principal */}
        <div style={{
          fontSize: 80,
          fontWeight: 800,
          color: '#ffffff',
          textAlign: 'center',
          lineHeight: 1.1,
          marginBottom: 24,
          letterSpacing: -2,
        }}>
          Marsof
        </div>

        {/* Subtítulo */}
        <div style={{
          fontSize: 30,
          color: '#94a3b8',
          textAlign: 'center',
          maxWidth: 700,
          lineHeight: 1.4,
        }}>
          Software español para automatizar tu negocio
        </div>

        {/* URL */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          fontSize: 20,
          color: '#475569',
          letterSpacing: 1,
        }}>
          marsof.es
        </div>
      </div>
    ),
    { ...size }
  )
}
