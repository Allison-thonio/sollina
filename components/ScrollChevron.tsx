'use client'
export default function ScrollChevron() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '2.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
    }}
      onClick={() => {
        const el = document.getElementById('services')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }}
    >
      <span style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '0.6rem',
        textTransform: 'uppercase',
        letterSpacing: '0.25em',
        color: 'var(--text-label)',
      }}>
        Scroll
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: '1px',
              height: '8px',
              background: 'var(--accent-gold)',
              animation: 'scrollPulse 1.6s ease infinite',
              animationDelay: `${i * 0.2}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes scrollPulse {
          0% { opacity: 0; transform: translateY(-4px); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateY(4px); }
        }
      `}</style>
    </div>
  )
}
