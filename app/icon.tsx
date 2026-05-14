import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
          borderRadius: 7,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          fontWeight: 900,
          letterSpacing: '-0.05em',
          color: '#0a0a0b',
        }}
      >
        MS
      </div>
    ),
    { ...size },
  )
}
