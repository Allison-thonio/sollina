'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close drawer on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handleOutside = (e: MouseEvent) => {
      const drawer = document.getElementById('mobile-drawer')
      const btn = document.getElementById('hamburger-btn')
      if (
        drawer && !drawer.contains(e.target as Node) &&
        btn && !btn.contains(e.target as Node)
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [menuOpen])

  // Prevent body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close drawer on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'About', href: '/about' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav
        id="solalina-nav"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 'var(--nav-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2.5rem',
          background: scrolled
            ? 'rgba(8,8,8,0.98)'
            : 'rgba(8,8,8,0.75)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: `1px solid ${scrolled ? 'var(--border-subtle)' : 'rgba(255,255,255,0.04)'}`,
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* ── Logo ── */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            display: 'inline-block',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: 'var(--accent-gold)',
            flexShrink: 0,
            boxShadow: '0 0 8px var(--accent-gold)',
          }} />
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', color: 'var(--text-primary)', letterSpacing: '0.04em', fontWeight: 300, fontStyle: 'italic' }}>
            Solalina{' '}
            <span style={{ fontWeight: 400, fontStyle: 'normal', color: 'var(--text-muted)', letterSpacing: '0.08em', fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', textTransform: 'uppercase' }}>
              Studios
            </span>
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.72rem',
                fontWeight: 400,
                color: isActive(link.href) ? 'var(--text-primary)' : 'var(--text-muted)',
                textDecoration: 'none',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'color 0.3s ease',
              }}
              className={`nav-link${isActive(link.href) ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-ghost" style={{ padding: '0.5rem 1.2rem', fontSize: '0.68rem' }}>
            Contact
          </Link>
          <Link href="/contact" className="btn-gold-fill" style={{ padding: '0.55rem 1.5rem', fontSize: '0.68rem' }}>
            Book a Session
          </Link>
        </div>

        {/* ── Hamburger (mobile only) ── */}
        <button
          id="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '5px',
            width: '40px',
            height: '40px',
            alignItems: 'center',
          }}
          className="hamburger-btn"
        >
          <span style={{
            display: 'block',
            width: '22px',
            height: '1.5px',
            background: menuOpen ? 'var(--accent-gold)' : 'var(--text-primary)',
            transition: 'transform 0.35s var(--ease-out-expo), opacity 0.3s ease, background 0.3s ease',
            transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
            transformOrigin: 'center',
          }} />
          <span style={{
            display: 'block',
            width: '22px',
            height: '1.5px',
            background: 'var(--text-primary)',
            transition: 'opacity 0.25s ease',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block',
            width: '22px',
            height: '1.5px',
            background: menuOpen ? 'var(--accent-gold)' : 'var(--text-primary)',
            transition: 'transform 0.35s var(--ease-out-expo), opacity 0.3s ease, background 0.3s ease',
            transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            transformOrigin: 'center',
          }} />
        </button>
      </nav>

      {/* ── Mobile Backdrop ── */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 98,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.35s ease',
        }}
        aria-hidden="true"
      />

      {/* ── Mobile Slide-in Drawer ── */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(300px, 85vw)',
          zIndex: 99,
          background: 'var(--bg-secondary)',
          borderLeft: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.42s var(--ease-out-expo)',
          overflowY: 'auto',
        }}
      >
        {/* Drawer Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem 1.75rem',
          borderBottom: '1px solid var(--border-subtle)',
          minHeight: 'var(--nav-height)',
        }}>
          <span style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.05rem',
            color: 'var(--text-primary)',
            fontWeight: 300,
            fontStyle: 'italic',
            letterSpacing: '0.04em',
          }}>
            Solalina <span style={{ fontFamily: 'DM Sans, sans-serif', fontStyle: 'normal', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Studios</span>
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              background: 'none',
              border: '1px solid var(--border-mid)',
              color: 'var(--text-muted)',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent-gold)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent-gold)'; }}
            onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-mid)'; }}
          >
            ✕
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav style={{ padding: '2rem 1.75rem', flex: 1 }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <span className="section-label" style={{ marginBottom: '1.25rem' }}>Navigation</span>
          </div>
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 0',
                borderBottom: '1px solid var(--border-subtle)',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.5rem',
                fontWeight: 300,
                color: isActive(link.href) ? 'var(--accent-gold)' : 'var(--text-primary)',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'color 0.25s ease',
                animationDelay: `${i * 60}ms`,
              }}
              onMouseOver={e => { if (!isActive(link.href)) (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-gold)'; }}
              onMouseOut={e => { if (!isActive(link.href)) (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-primary)'; }}
            >
              <span>{link.label}</span>
              {isActive(link.href) && (
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-gold)' }} />
              )}
            </Link>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div style={{ padding: '1.75rem', borderTop: '1px solid var(--border-subtle)' }}>
          <Link
            href="/contact"
            className="btn-gold-fill"
            onClick={() => setMenuOpen(false)}
            style={{ width: '100%', justifyContent: 'center', marginBottom: '1.25rem', fontSize: '0.7rem' }}
          >
            Book a Session
          </Link>
          {/* Social links */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {[
              { label: 'Instagram', href: 'https://instagram.com/solalina.studios' },
              { label: 'TikTok', href: '#' },
              { label: 'Facebook', href: '#' },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  fontSize: '0.62rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text-label)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  fontFamily: 'DM Sans, sans-serif',
                }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--accent-gold)')}
                onMouseOut={e => (e.currentTarget.style.color = 'var(--text-label)')}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
