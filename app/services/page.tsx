// FIX 7 — structured to accept live Firestore data later.
// Currently renders hardcoded seed data. When Firebase is wired, replace
// the `services` array with a Firestore fetch from the `services` collection.
'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, scaleIn } from '@/lib/motionVariants'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

const SEED_SERVICES = [
  {
    id: 'studio-rental',
    name: 'Studio Rental',
    description: 'Perfect for independent creators and brands seeking a professional environment. Multiple backdrops, modular lighting, and a dedicated team to support your vision.',
    priceLabel: 'Starting at ₦25,000/hr',
    features: ['Multiple Backdrops', 'Professional Lighting Included', 'Changing Room Access'],
    image: '/studio-2.jpg',
    tag: 'Most Popular',
  },
  {
    id: 'podcast-production',
    name: 'Podcast Production',
    description: 'Professional audio & video recording. We handle the tech; you bring the talk. Broadcast-ready quality in a fully soundproofed suite.',
    priceLabel: 'Custom Packages Available',
    features: ['Multi-cam Setup', 'High-end Microphones', 'Live Monitoring', 'Soundproofed Room'],
    image: '/studio-3.jpg',
    tag: 'Audio & Video',
  },
  {
    id: 'content-creation',
    name: 'Content Creation',
    description: 'High-energy Reels, TikToks, and Brand Videos tailored for your audience and social growth. Trend-focused directing and professional post-production.',
    priceLabel: 'Project-based Pricing',
    features: ['Trend-focused Directing', 'Professional Editing', 'Lighting Design'],
    image: '/studio-4.jpg',
    tag: 'Social Media',
  },
]

export default function ServicesPage() {
  const [services] = useState(SEED_SERVICES)
  // TODO (Firebase): replace useState above with a useEffect Firestore fetch

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--nav-height)' }}>

        {/* ── Page Hero ── */}
        <section style={{ position: 'relative', minHeight: '340px', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
          {/* Background image */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <Image
              src="/studio-5.jpg"
              alt="Services hero"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center 40%', opacity: 0.18 }}
            />
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--bg-secondary) 0%, rgba(15,15,15,0.7) 60%, transparent 100%)' }} />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: 'var(--container-max)', margin: '0 auto', padding: '5rem 2.5rem' }}>
            <motion.span className="section-label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
              The Menu
            </motion.span>
            <motion.h1 className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1} style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              Services & Pricing
            </motion.h1>
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2}
              style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '480px', marginTop: '1rem' }}
            >
              Choose the experience that fits your creative vision. Every package is designed to deliver world-class results.
            </motion.p>
          </div>
        </section>

        {/* ── Service Cards ── */}
        <section style={{ padding: 'var(--section-padding) 2.5rem', background: 'var(--bg-primary)' }}>
          <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} custom={(i + 1) * 0.1}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '420px 1fr',
                  overflow: 'hidden',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-card)',
                  transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
                }}
                className="service-card"
                onMouseOver={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-accent)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 16px 60px rgba(0,0,0,0.5)'
                }}
                onMouseOut={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                {/* Image half */}
                <div style={{ position: 'relative', minHeight: '300px', overflow: 'hidden' }}>
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    style={{ objectFit: 'cover', transition: 'transform 0.7s var(--ease-out-expo)' }}
                    onMouseOver={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)')}
                    onMouseOut={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, var(--bg-card) 100%)' }} />
                  {/* Tag badge */}
                  <span style={{
                    position: 'absolute',
                    top: '1.25rem',
                    left: '1.25rem',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.6rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: 'var(--text-inverse)',
                    background: 'var(--accent-gold)',
                    padding: '0.3rem 0.75rem',
                  }}>
                    {s.tag}
                  </span>
                </div>

                {/* Content half */}
                <div style={{ padding: '2.5rem 2.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                    <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: 'var(--text-primary)' }}>
                      {s.name}
                    </h2>
                    <span className="tag-pill">{s.priceLabel}</span>
                  </div>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.75rem' }}>
                    {s.description}
                  </p>

                  {/* Feature checkmarks */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
                    {s.features.map(f => (
                      <span key={f} style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.72rem',
                        fontFamily: 'DM Sans, sans-serif',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-subtle)',
                        padding: '0.3rem 0.8rem',
                        background: 'var(--bg-secondary)',
                      }}>
                        <span style={{ color: 'var(--accent-gold)', fontSize: '0.8rem' }}>✓</span>
                        {f}
                      </span>
                    ))}
                  </div>

                  <Link href="/contact" className="btn-gold-fill" style={{ alignSelf: 'flex-start', fontSize: '0.7rem' }}>
                    Inquire Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section style={{ padding: '5rem 2.5rem', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <span className="section-label" style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }}>
              Not sure which package?
            </span>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--text-primary)', marginBottom: '1.25rem', lineHeight: 1.2 }}>
              Let's Build a Custom Plan
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Every session is different. Reach out and our team will craft a package tailored to your exact vision and budget.
            </p>
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .service-card { grid-template-columns: 1fr !important; }
          .service-card > div:first-child { min-height: 240px !important; }
          .service-card > div:first-child > div[style*="gradient(to right"] { background: linear-gradient(to bottom, transparent 60%, var(--bg-card) 100%) !important; }
        }
      `}</style>
    </>
  )
}
