import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  const studioLinks = [
    ['Home', '/'],
    ['Services', '/services'],
    ['Portfolio', '/portfolio'],
    ['About Us', '/about'],
    ['Contact', '/contact'],
  ]

  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://instagram.com/solalina.studios',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
    },
    {
      label: 'TikTok',
      href: '#',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.22 8.22 0 0 0 4.83 1.56V6.83a4.85 4.85 0 0 1-1.07-.14z"/>
        </svg>
      ),
    },
    {
      label: 'Facebook',
      href: '#',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      ),
    },
  ]

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>

      {/* ── Gold top accent rule ── */}
      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--accent-gold), transparent)' }} />

      {/* ── Main footer content ── */}
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '4rem 2rem 2rem' }}>

        {/* Top: Brand + Nav columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '3rem',
          marginBottom: '3.5rem',
        }}
          className="grid-footer-cols"
        >

          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <span style={{
                display: 'inline-block',
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'var(--accent-gold)',
                boxShadow: '0 0 6px var(--accent-gold)',
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.15rem',
                color: 'var(--text-primary)',
                fontWeight: 300,
                fontStyle: 'italic',
                letterSpacing: '0.04em',
              }}>
                Solalina{' '}
                <span style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--text-muted)',
                }}>
                  Studios
                </span>
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '270px', marginBottom: '1.5rem' }}>
              Where Visions Become Masterpieces. Bayelsa's premier content hub for photography, videography, and content creation.
            </p>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-label)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-gold)', display: 'inline-block', flexShrink: 0 }} />
                Solalina Studios, Yenagoa, Bayelsa State, Nigeria.
              </span>
            </p>

            <Link href="/contact" className="btn-primary" style={{ fontSize: '0.65rem', padding: '0.6rem 1.5rem' }}>
              Book a Session
            </Link>
          </div>

          {/* Studio Links */}
          <div>
            <span className="section-label" style={{ marginBottom: '1.5rem' }}>Studio</span>
            {studioLinks.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  marginBottom: '0.85rem',
                  transition: 'color 0.25s ease, padding-left 0.25s ease',
                  fontFamily: 'DM Sans, sans-serif',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.color = 'var(--accent-gold)';
                  e.currentTarget.style.paddingLeft = '6px';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.paddingLeft = '0';
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Connect + Social */}
          <div>
            <span className="section-label" style={{ marginBottom: '1.5rem' }}>Connect</span>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.75rem' }}>
              {socialLinks.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={s.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    border: '1px solid var(--border-mid)',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.25s ease, border-color 0.25s ease, background 0.25s ease',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.color = 'var(--accent-gold)';
                    e.currentTarget.style.borderColor = 'var(--accent-gold)';
                    e.currentTarget.style.background = 'var(--accent-gold-glow)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'var(--border-mid)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Contact info */}
            <a href="tel:+2348060000000" style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '0.6rem', transition: 'color 0.25s ease' }}
              onMouseOver={e => (e.currentTarget.style.color = 'var(--accent-gold)')}
              onMouseOut={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              +234 (0) 806 000 0000
            </a>
            <a href="mailto:bookings@solalina.com" style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '1.25rem', transition: 'color 0.25s ease' }}
              onMouseOver={e => (e.currentTarget.style.color = 'var(--accent-gold)')}
              onMouseOut={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              bookings@solalina.com
            </a>

            <a
              href="/admin"
              style={{
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--text-label)',
                textDecoration: 'none',
                transition: 'color 0.25s ease',
                fontFamily: 'DM Sans, sans-serif',
              }}
              onMouseOver={e => (e.currentTarget.style.color = 'var(--accent-gold)')}
              onMouseOut={e => (e.currentTarget.style.color = 'var(--text-label)')}
            >
              Admin Console
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-label)', lineHeight: 1.6 }}>
            © {year} Solalina Studios. All rights reserved.{' '}
            <span style={{ color: 'var(--border-mid)' }}>·</span>{' '}
            Yenagoa, Bayelsa State, Nigeria.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {['Privacy', 'Terms'].map(label => (
              <a key={label} href="#" style={{ fontSize: '0.7rem', color: 'var(--text-label)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--accent-gold)')}
                onMouseOut={e => (e.currentTarget.style.color = 'var(--text-label)')}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .grid-footer-cols {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </footer>
  )
}
