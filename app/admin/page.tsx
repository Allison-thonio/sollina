import Link from 'next/link'

export default function AdminPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem' }}>
      <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-label)' }}>Admin Console</span>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '2.5rem', color: 'var(--text-primary)' }}>Solalina Console</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Admin features coming soon.</p>
      <Link href="/" style={{ color: 'var(--accent-gold)', fontSize: '0.8rem', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.15em' }}>← Back to Site</Link>
    </div>
  )
}
