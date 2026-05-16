// FIX 7 — structured to accept live Firestore data later.
// Currently renders hardcoded seed data. When Firebase is wired, replace
// the `services` array with a Firestore fetch from the `services` collection.
'use client'
import { useEffect, useState } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const SEED_SERVICES = [
  {
    id: 'studio-rental',
    name: 'Studio Rental',
    description: 'Perfect for independent creators and brands seeking a professional environment.',
    priceLabel: 'Starting at ₦25,000/hr',
    features: ['Multiple Backdrops', 'Professional Lighting Included', 'Changing Room Access'],
  },
  {
    id: 'podcast-production',
    name: 'Podcast Production',
    description: 'Professional audio & video recording. We handle the tech; you bring the talk.',
    priceLabel: 'Custom Packages Available',
    features: ['Multi-cam Setup', 'High-end Microphones', 'Live Monitoring', 'Soundproofed Room'],
  },
  {
    id: 'content-creation',
    name: 'Content Creation',
    description: 'High-energy Reels, TikToks, and Brand Videos tailored for your audience and social growth.',
    priceLabel: 'Project-based Pricing',
    features: ['Trend-focused Directing', 'Professional Editing', 'Lighting Design'],
  },
]

export default function ServicesPage() {
  useScrollAnimation()
  const [services] = useState(SEED_SERVICES)
  // TODO (Firebase): replace useState above with a useEffect Firestore fetch

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>
        <section style={{ padding: '7rem 2rem', background: 'var(--bg-primary)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <span className="section-label animate-on-scroll">The Menu</span>
            <h1 className="section-heading animate-on-scroll delay-1" style={{ marginBottom: '4rem' }}>Services & Pricing</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {services.map((s, i) => (
                <div
                  key={s.id}
                  className={`animate-on-scroll delay-${i + 1}`}
                  style={{ border: '1px solid var(--border-subtle)', padding: '2.5rem', background: 'var(--bg-card)', transition: 'border-color 0.3s ease' }}
                  onMouseOver={e => (e.currentTarget.style.borderColor = 'var(--border-accent)')}
                  onMouseOut={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                    <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '1.75rem', color: 'var(--text-primary)' }}>{s.name}</h2>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: 'var(--accent-gold)', border: '1px solid var(--border-accent)', padding: '0.3rem 0.9rem' }}>{s.priceLabel}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{s.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
                    {s.features.map(f => (
                      <span key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-gold)', flexShrink: 0 }} />
                        {f}
                      </span>
                    ))}
                  </div>
                  <Link href="/contact" className="btn-ghost">Inquire Now</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
