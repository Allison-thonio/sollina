'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, scaleIn } from '@/lib/motionVariants'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollChevron from '@/components/ScrollChevron'
import Link from 'next/link'
import Image from 'next/image'

const TESTIMONIALS = [
  {
    name: 'Chinyere Okafor',
    title: 'Brand Director, Lagos',
    quote: 'Solalina Studios completely transformed our brand shoot. The team understood our vision from the first call, and the results were world-class.',
    stars: 5,
  },
  {
    name: 'Emeka Nwosu',
    title: 'Content Creator, Bayelsa',
    quote: 'I\'ve recorded in studios across Nigeria, and nothing compares to the quality and attention to detail at Solalina. The podcast suite is absolutely elite.',
    stars: 5,
  },
  {
    name: 'Adaeze Umeh',
    title: 'Fashion Photographer',
    quote: 'The modular lighting rigs and the creative space gave me the flexibility I\'ve always dreamed of. Booking was seamless, and the team was incredible.',
    stars: 5,
  },
]

const AMENITIES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
    label: 'Premium Lighting Equipment',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
    label: 'Fully Soundproofed Studio',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    label: 'Private Dressing Rooms',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
        <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
        <line x1="12" y1="20" x2="12.01" y2="20"/>
      </svg>
    ),
    label: 'High-Speed Fiber Internet',
  },
]

const CREATIVE_EDGE_CARDS = [
  { num: '01', title: 'SET DESIGN', desc: 'Modular sets that evolve with your vision — from minimalist chic to high-end editorial.' },
  { num: '02', title: 'GEAR COLLECTION', desc: 'Industry-standard lighting and camera support for every production scale.' },
  { num: '03', title: 'CREATIVE HUB', desc: 'A collaborative environment designed for photographers, videographers, and creators.' },
  { num: '04', title: 'POST-PRODUCTION', desc: 'High-speed editing suites and Fiber internet for seamless content turnaround.' },
]

const STUDIO_PERKS = [
  { num: '01', title: 'STUDIO ROOM', desc: 'Professionally lit and equipped for any shoot format.' },
  { num: '02', title: 'DRESSING ROOMS', desc: 'Private spaces for styling, wardrobe, and mirror prep.' },
  { num: '03', title: 'HIGH-SPEED FIBER', desc: 'Fiber-optic internet for instant uploads and transfers.' },
  { num: '04', title: 'PODCAST SUITE', desc: 'Soundproofed and mic\'d for crystal-clear audio recording.' },
]

const GALLERY_CARDS = [
  {
    img: '/studio-4.jpg',
    title: 'THE GALLERY',
    desc: 'A curation of commercial masterpieces captured within our walls. From high-fashion editorials to sleek product shoots.',
    link: '/portfolio',
    cta: 'Explore Shoots',
  },
  {
    img: '/studio-5.jpg',
    title: 'EDITORIAL SETS',
    desc: 'Explore our modular set designs engineered for versatility. Custom lighting rigs and bespoke setups to match your vision.',
    link: '/services',
    cta: 'View Set Details',
  },
  {
    img: '/studio-3.jpg',
    title: 'PODCAST SESSIONS',
    desc: 'Crystal-clear audio and cinematic video. Our podcast suite transforms every recording into broadcast-quality content.',
    link: '/services',
    cta: 'Book a Session',
  },
]

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent-gold)" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}

export default function HomePage() {
  const heroSectionRef = useRef<HTMLElement>(null)
  const [heroOffset, setHeroOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setHeroOffset(window.scrollY * 0.35)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Navbar />
      <main>

        {/* ═══════════════════════════════════════
            SECTION 1 — HERO
        ═══════════════════════════════════════ */}
        <section
          ref={heroSectionRef}
          style={{ position: 'relative', height: '100vh', minHeight: '600px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}
        >
          {/* Parallax image */}
          <div style={{ position: 'absolute', inset: 0, transform: `translateY(${heroOffset}px)`, top: '-20%', height: '120%' }}>
            <Image
              src="/studio-1.jpg"
              alt="Solalina Studios"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>

          {/* Gradient overlay — cinematic */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.7) 50%, rgba(8,8,8,0.4) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to top, rgba(8,8,8,1) 0%, transparent 100%)' }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2, padding: '0 2.5rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

            {/* Location badge */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}
            >
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.62rem',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
                border: '1px solid var(--border-accent)',
                padding: '0.35rem 0.9rem',
                background: 'var(--accent-gold-glow)',
              }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-gold)', display: 'inline-block', animation: 'pulseGold 2s ease infinite' }} />
                Bayelsa State · Premier Content Hub
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              className="hero-heading"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.1}
              style={{ marginBottom: '1.75rem', maxWidth: '750px' }}
            >
              Where Visions<br />
              <span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>Become</span>{' '}
              Masterpieces
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.2}
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)', color: 'var(--text-muted)', maxWidth: '440px', lineHeight: 1.8, marginBottom: '2.75rem' }}
            >
              A world-class creative ecosystem dedicated to Photography, Videography, and Content Production in the heart of Bayelsa State, Nigeria.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.3}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <button
                className="btn-gold-fill"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Services
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              <Link href="/contact" className="btn-ghost">
                Book a Session
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.4}
              style={{ display: 'flex', gap: '2.5rem', marginTop: '3.5rem', flexWrap: 'wrap' }}
            >
              {[
                { num: '3+', label: 'Studio Spaces' },
                { num: '500+', label: 'Sessions Booked' },
                { num: '100%', label: 'Client Satisfaction' },
              ].map(stat => (
                <div key={stat.label} style={{ borderLeft: '1px solid var(--border-accent)', paddingLeft: '1rem' }}>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', fontWeight: 300, color: 'var(--accent-gold)', display: 'block', lineHeight: 1 }}>
                    {stat.num}
                  </span>
                  <span style={{ fontSize: '0.65rem', fontFamily: 'DM Sans, sans-serif', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-label)', marginTop: '0.35rem', display: 'block' }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          <ScrollChevron />
        </section>

        {/* ═══════════════════════════════════════
            SECTION 2 — AMENITIES STRIP
        ═══════════════════════════════════════ */}
        <section id="services" style={{ background: 'var(--bg-secondary)', padding: '5rem 2.5rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
              <div>
                <motion.span className="section-label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0}>
                  Amenities
                </motion.span>
                <motion.h2 className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.1}>
                  More Than Just a Space.
                </motion.h2>
              </div>
              <motion.blockquote
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.2}
                style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1rem', color: 'var(--accent-gold)', maxWidth: '280px', lineHeight: 1.6, opacity: 0.85, borderLeft: '2px solid var(--border-accent)', paddingLeft: '1rem' }}
              >
                "Trusted by brands and creators across the Niger Delta."
              </motion.blockquote>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
              {AMENITIES.map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={(i + 1) * 0.08}
                  style={{
                    border: '1px solid var(--border-subtle)',
                    padding: '1.5rem',
                    background: 'var(--bg-card)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'border-color 0.3s ease, background 0.3s ease',
                    cursor: 'default',
                  }}
                  onMouseOver={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-accent)'
                    ;(e.currentTarget as HTMLElement).style.background = 'var(--bg-card-hover)'
                  }}
                  onMouseOut={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)'
                    ;(e.currentTarget as HTMLElement).style.background = 'var(--bg-card)'
                  }}
                >
                  <span style={{ color: 'var(--accent-gold)', flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 400, lineHeight: 1.4 }}>{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 3 — CREATIVE SPACES SPLIT
        ═══════════════════════════════════════ */}
        <section style={{ padding: 'var(--section-padding) 2.5rem', background: 'var(--bg-primary)' }}>
          <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}
            className="grid-2col"
          >
            <motion.div
              style={{ position: 'relative', height: '520px', overflow: 'hidden' }}
              variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
            >
              <Image
                src="/studio-2.jpg"
                alt="Creative Spaces"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              {/* Gold accent strip */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, var(--accent-gold), transparent)' }} />
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.2}>
              <div className="gold-rule" />
              <span className="section-label-gold">Creative Spaces</span>
              <h2 className="section-heading" style={{ marginBottom: '1.5rem' }}>
                Production,<br />Refined
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: '1.25rem', fontSize: '0.9rem' }}>
                Each space is a meditation in creative flow. High ceilings and modular layouts frame your vision, while premium acoustics invite you to capture extraordinary clarity.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: '2.5rem', fontSize: '0.9rem' }}>
                From high-end fashion shoots to intimate podcast recordings, every setup tells a story of creative excellence.
              </p>
              <Link href="/services" className="btn-primary">Explore Our Spaces</Link>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 4 — THE CREATIVE EDGE
        ═══════════════════════════════════════ */}
        <section style={{ padding: 'var(--section-padding) 2.5rem', background: 'var(--bg-secondary)' }}>
          <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '5rem' }}
            className="grid-2col"
          >
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0}>
              <div className="gold-rule" />
              <span className="section-label">The Creative Edge</span>
              <h2 className="section-heading" style={{ marginBottom: '1.5rem' }}>Modular Spaces</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, fontSize: '0.9rem', marginBottom: '2rem' }}>
                Solalina Studios represents the pinnacle of creative infrastructure in the Niger Delta, where contemporary African aesthetics meet international standards of excellence.
              </p>
              {['Locally sourced design elements', 'Sustainable studio practices', 'Artisan craftsmanship'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-gold)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item}</span>
                </div>
              ))}
              {/* "Since" badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '2rem', padding: '0.5rem 1rem', border: '1px solid var(--border-accent)', background: 'var(--accent-gold-glow)' }}>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontWeight: 300, color: 'var(--accent-gold)' }}>✦</span>
                <span style={{ fontSize: '0.65rem', fontFamily: 'DM Sans, sans-serif', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--accent-gold)' }}>Est. 2024 · Bayelsa State, Nigeria</span>
              </div>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border-subtle)' }}>
              {CREATIVE_EDGE_CARDS.map((card, i) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={(i + 1) * 0.1}
                  style={{ background: 'var(--bg-card)', padding: '2rem', transition: 'background 0.3s ease, box-shadow 0.3s ease', cursor: 'default', position: 'relative', overflow: 'hidden' }}
                  onMouseOver={e => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--bg-card-hover)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'inset 0 0 30px var(--accent-gold-glow)'
                  }}
                  onMouseOut={e => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  }}
                >
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 300, color: 'var(--accent-gold)', opacity: 0.35, position: 'absolute', top: '1rem', right: '1.25rem' }}>
                    {card.num}
                  </span>
                  <span className="section-label" style={{ color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>{card.title}</span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.75 }}>{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 5 — VISUAL ALCHEMY (Gallery preview)
        ═══════════════════════════════════════ */}
        <section style={{ padding: 'var(--section-padding) 2.5rem', background: 'var(--bg-primary)' }}>
          <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
            <motion.span className="section-label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0}>
              The Work
            </motion.span>
            <motion.h2 className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.1} style={{ marginBottom: '3rem' }}>
              Visual Alchemy
            </motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="gallery-grid">
              {GALLERY_CARDS.map((card, i) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={(i + 1) * 0.12}
                  style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
                    <Image
                      src={card.img}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover', transition: 'transform 0.7s var(--ease-out-expo)' }}
                      onMouseOver={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)')}
                      onMouseOut={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                    />
                    {/* Gradient overlay (always visible slightly) */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.1) 55%, transparent 100%)' }} />
                    {/* Hover overlay text */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '1.5rem',
                      }}
                    >
                      <span className="section-label" style={{ color: 'var(--accent-gold)', marginBottom: '0.3rem' }}>{card.title}</span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '1.25rem 0.5rem 1rem' }}>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '1.1rem' }}>{card.desc}</p>
                    <Link href={card.link} className="btn-ghost" style={{ fontSize: '0.65rem', padding: '0.5rem 1.1rem' }}>
                      {card.cta} →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 900px) {
              .gallery-grid { grid-template-columns: 1fr 1fr !important; }
            }
            @media (max-width: 540px) {
              .gallery-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 6 — STUDIO PERKS
        ═══════════════════════════════════════ */}
        <section style={{ padding: 'var(--section-padding) 2.5rem', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
          {/* Background text */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'clamp(6rem, 18vw, 16rem)', fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: 'var(--text-primary)', opacity: 0.025, whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.02em' }}>
            STUDIO
          </div>

          <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative' }}>
            <motion.span className="section-label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0}>Studio Perks</motion.span>
            <motion.h2 className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.1} style={{ marginBottom: '3.5rem' }}>
              More Than Just a Space
            </motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}>
              {STUDIO_PERKS.map((item, i) => (
                <motion.div key={item.num} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={(i + 1) * 0.1}
                  style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.75rem', position: 'relative' }}
                >
                  {/* Connecting dot */}
                  <span style={{ position: 'absolute', top: '-4px', left: 0, width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-gold)', display: 'block' }} />
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3.5rem', fontWeight: 300, color: 'var(--accent-gold)', opacity: 0.5, display: 'block', lineHeight: 1, marginBottom: '0.75rem' }}>
                    {item.num}
                  </span>
                  <span className="section-label" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{item.title}</span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.75 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 7 — TESTIMONIALS
        ═══════════════════════════════════════ */}
        <section style={{ padding: 'var(--section-padding) 2.5rem', background: 'var(--bg-primary)' }}>
          <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
            <motion.span className="section-label-gold" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0}>
              Client Stories
            </motion.span>
            <motion.h2 className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.1} style={{ marginBottom: '3rem' }}>
              What Creators Say
            </motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="testimonials-grid">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={t.name}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={(i + 1) * 0.1}
                  style={{
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-card)',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseOver={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-accent)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(0,0,0,0.35)'
                  }}
                  onMouseOut={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  }}
                >
                  {/* Stars */}
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {Array.from({ length: t.stars }).map((_, s) => <StarIcon key={s} />)}
                  </div>
                  {/* Quote */}
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.7, flex: 1 }}>
                    "{t.quote}"
                  </p>
                  {/* Author */}
                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                    <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{t.name}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-label)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{t.title}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 900px) { .testimonials-grid { grid-template-columns: 1fr 1fr !important; } }
            @media (max-width: 560px) { .testimonials-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 8 — LOCATION
        ═══════════════════════════════════════ */}
        <section style={{ padding: 'var(--section-padding) 2.5rem', background: 'var(--bg-secondary)' }}>
          <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'center' }}
            className="grid-2col"
          >
            {/* Left: info */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0}>
              <div className="gold-rule" />
              <span className="section-label">Find Us</span>
              <h2 className="section-heading" style={{ marginBottom: '1.5rem' }}>
                Visit the<br />Studio
              </h2>

              {/* Address info card */}
              <div style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', padding: '1.75rem', marginBottom: '1.5rem' }}>
                {[
                  { label: 'Address', value: 'Solalina Studios\nYenagoa, Bayelsa State, Nigeria.' },
                  { label: 'Phone', value: '+234 (0) 806 000 0000', href: 'tel:+2348060000000' },
                  { label: 'Email', value: 'bookings@solalina.com', href: 'mailto:bookings@solalina.com' },
                  { label: 'Hours', value: 'Mon–Sat: 8am – 8pm\nSunday: By Appointment' },
                ].map(item => (
                  <div key={item.label} style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
                    {item === [item].slice(-1)[0] ? null : null}
                    <span className="section-label" style={{ marginBottom: '0.35rem' }}>{item.label}</span>
                    {item.href ? (
                      <a href={item.href} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, display: 'block', transition: 'color 0.2s ease' }}
                        onMouseOver={e => (e.currentTarget.style.color = 'var(--accent-gold)')}
                        onMouseOut={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                      >{item.value}</a>
                    ) : (
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', whiteSpace: 'pre-line', lineHeight: 1.7 }}>{item.value}</p>
                    )}
                  </div>
                ))}
              </div>

              <a
                href="https://www.google.com/maps/place/SOLALINA+STUDIOS/@4.9215245,6.3054213,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Get Directions
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </motion.div>

            {/* Right: embedded map */}
            <motion.div
              variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
              style={{ position: 'relative', overflow: 'hidden', height: '460px', border: '1px solid var(--border-subtle)' }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.1!2d6.3054213!3d4.9215245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSolalina+Studios!5e0!3m2!1sen!2sng!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Solalina Studios Location"
              />
              {/* Gold accent bottom line */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, var(--accent-gold), transparent)' }} />
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 9 — BOOK CTA
        ═══════════════════════════════════════ */}
        <section className="noise-overlay" style={{ padding: 'var(--section-padding) 2.5rem', background: 'var(--bg-primary)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Faint background text */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'clamp(6rem, 20vw, 18rem)', fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: 'var(--text-primary)', opacity: 0.025, whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.02em' }}>
            BOOK
          </div>
          {/* Gold glow */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, var(--accent-gold-glow) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative' }}>
            <motion.span className="section-label-gold" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0} style={{ textAlign: 'center', display: 'block' }}>
              Begin Your Session
            </motion.span>
            <motion.h2 className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.1} style={{ marginBottom: '1.25rem' }}>
              Ready to Capture<br />Your Story?
            </motion.h2>
            <motion.p
              style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.85, marginBottom: '2.75rem' }}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.2}
            >
              Our team is prepared to craft a bespoke studio experience tailored to your every creative need.
            </motion.p>
            <motion.div
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.75rem' }}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.3}
            >
              <Link href="/contact" className="btn-gold-fill">Reserve Now</Link>
              <Link href="/contact" className="btn-ghost">Contact Studio Team</Link>
            </motion.div>
            <motion.div
              style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.4}
            >
              <a href="tel:+2348060000000" style={{ fontSize: '0.78rem', color: 'var(--text-label)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--accent-gold)')}
                onMouseOut={e => (e.currentTarget.style.color = 'var(--text-label)')}
              >
                +234 (0) 806 000 0000
              </a>
              <a href="mailto:bookings@solalina.com" style={{ fontSize: '0.78rem', color: 'var(--text-label)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--accent-gold)')}
                onMouseOut={e => (e.currentTarget.style.color = 'var(--text-label)')}
              >
                bookings@solalina.com
              </a>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
