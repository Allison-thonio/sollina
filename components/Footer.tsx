import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', padding: '4rem 2rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.1rem', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
                <span style={{ fontWeight: 400 }}>Solalina</span>
                <span style={{ fontWeight: 300, color: 'var(--text-muted)' }}>Studios</span>
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '280px' }}>
              Where Visions Become Masterpieces. Warri's premier content hub for photography, videography, and content creation.
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-label)', marginTop: '1rem', lineHeight: 1.6 }}>
              Solalina Studios, Warri,<br />Delta State, Nigeria.
            </p>
          </div>

          {/* Studio links */}
          <div>
            <span className="section-label" style={{ marginBottom: '1.25rem' }}>Studio</span>
            {[['Home', '/'], ['Services', '/services'], ['Portfolio', '/portfolio'], ['About Us', '/about']].map(([label, href]) => (
              <Link key={href} href={href} style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '0.75rem', transition: 'color 0.3s ease' }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--accent-gold)')}
                onMouseOut={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >{label}</Link>
            ))}
          </div>

          {/* Connect */}
          <div>
            <span className="section-label" style={{ marginBottom: '1.25rem' }}>Connect</span>
            {[
              ['Instagram', 'https://instagram.com/solalina.studios'],
              ['TikTok', '#'],
              ['Facebook', '#'],
              ['Admin Console', '/admin'],
            ].map(([label, href]) => (
              <a key={label} href={href} style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '0.75rem', transition: 'color 0.3s ease' }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--accent-gold)')}
                onMouseOut={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >{label}</a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-label)' }}>
            © 2026 Solalina Studios. All rights reserved. Developed with Luxury.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy', 'Terms'].map(label => (
              <a key={label} href="#" style={{ fontSize: '0.72rem', color: 'var(--text-label)', textDecoration: 'none' }}>{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
