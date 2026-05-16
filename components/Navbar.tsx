'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // FIX 5 — close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return
    const handleOutside = (e: MouseEvent) => {
      const nav = document.getElementById('solalina-nav')
      if (nav && !nav.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [menuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'About', href: '/about' },
  ]

  return (
    <nav
      id="solalina-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(10,10,10,0.97)' : 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'background 0.3s ease',
        padding: '0 2rem',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
          <span style={{ fontWeight: 400 }}>Solalina</span>
          <span style={{ fontWeight: 300, color: 'var(--text-muted)' }}>Studios</span>
        </span>
      </Link>

      {/* Desktop nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="desktop-nav">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.8rem',
              fontWeight: 300,
              color: 'var(--text-muted)',
              textDecoration: 'none',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              position: 'relative',
              paddingBottom: '2px',
              transition: 'color 0.3s ease',
            }}
            className="nav-link"
          >
            {link.label}
          </Link>
        ))}
        <Link href="/contact" className="btn-ghost" style={{ padding: '0.5rem 1.2rem', fontSize: '0.7rem' }}>Contact</Link>
        <Link href="/contact" className="btn-primary" style={{ padding: '0.55rem 1.4rem', fontSize: '0.7rem' }}>Book a Session</Link>
      </div>

      {/* Hamburger — mobile only */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem',
          flexDirection: 'column',
          gap: '5px',
        }}
        className="hamburger-btn"
      >
        <span style={{ display: 'block', width: '24px', height: '1px', background: menuOpen ? 'var(--accent-gold)' : 'var(--text-primary)', transition: 'transform 0.3s ease, opacity 0.3s ease', transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }} />
        <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--text-primary)', transition: 'opacity 0.3s ease', opacity: menuOpen ? 0 : 1 }} />
        <span style={{ display: 'block', width: '24px', height: '1px', background: menuOpen ? 'var(--accent-gold)' : 'var(--text-primary)', transition: 'transform 0.3s ease, opacity 0.3s ease', transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
      </button>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '68px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(10,10,10,0.98)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
          zIndex: 99,
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '2.5rem',
                fontWeight: 300,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'color 0.3s ease',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary" onClick={() => setMenuOpen(false)}>Book a Session</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--accent-gold);
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: var(--text-primary) !important; }
        .nav-link:hover::after { width: 100%; }
      `}</style>
    </nav>
  )
}
