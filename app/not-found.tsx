import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(2rem, 8vw, 4rem)', color: 'var(--text-primary)', textAlign: 'center' }}>
        Page Not Found
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.875rem, 3vw, 1rem)', textAlign: 'center', maxWidth: '400px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/" 
        className="btn-primary"
        style={{
          padding: '1rem 2rem',
          background: 'var(--accent-gold)',
          color: 'var(--bg-primary)',
          border: 'none',
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'inline-block'
        }}
      >
        Back to Home
      </Link>
    </div>
  )
}
