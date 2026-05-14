import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #6ee7b7 0%, #10b981 55%, #047857 100%)',
          borderRadius: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 34,
          fontWeight: 900,
          letterSpacing: '-0.06em',
          color: '#0a0a0b',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        MS
      </div>
    ),
    { ...size },
  )
}
