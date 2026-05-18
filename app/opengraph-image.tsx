import { ImageResponse } from 'next/og'

export const alt = 'Marsof — Software especializado para autónomos y pymes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f172a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800, color: '#3b82f6', marginBottom: 16 }}>
          Marsof
        </div>
        <div style={{ fontSize: 32, color: '#94a3b8', textAlign: 'center', maxWidth: 700 }}>
          Software especializado para autónomos y pymes españolas
        </div>
      </div>
    ),
    { ...size }
  )
}
