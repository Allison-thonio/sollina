'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, scaleIn } from '@/lib/motionVariants'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollChevron from '@/components/ScrollChevron'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  const heroSectionRef = useRef<HTMLElement>(null)
  const [heroOffset, setHeroOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setHeroOffset(window.scrollY * 0.4)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Navbar />
      <main>

        {/* ── SECTION 1: HERO ── */}
        <section ref={heroSectionRef} style={{ position: 'relative', height: '100vh', minHeight: '600px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, transform: `translateY(${heroOffset}px)`, top: '-20%', height: '120%' }}>
            <Image
              src="https://images.unsplash.com/photo-1605296867424-35fc25c9212a?q=80&w=2070&auto=format&fit=crop"
              alt="Solalina Studios"
              fill
              priority
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.88) 100%)' }} />

          <div style={{ position: 'relative', zIndex: 2, padding: '0 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <motion.span className="section-label-gold" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0}>
              Warri's Premier Hub for Visual Excellence
            </motion.span>
            <motion.h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 300,
              fontSize: 'clamp(3.5rem, 8vw, 7rem)',
              lineHeight: 1.0,
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
            }} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.1}>
              Where Visions<br />Become Masterpieces
            </motion.h1>
            <motion.p style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '460px', lineHeight: 1.7, marginBottom: '2.5rem' }} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.2}>
              A world-class creative ecosystem dedicated to Photography, Videography, and Content Production in the heart of Warri, Nigeria.
            </motion.p>
            <motion.div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.3}>
              {/* FIX 6 — Explore the Hub scrolls to #services anchor */}
              <button
                className="btn-primary"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore the Hub
              </button>
              <Link href="/contact" className="btn-ghost">Book a Session</Link>
            </motion.div>
          </div>

          <ScrollChevron />
        </section>

        {/* ── SECTION 2: AMENITIES STRIP ── */}
        {/* FIX 6 — id="services" anchor so Explore the Hub scroll works */}
        <section id="services" style={{ background: 'var(--bg-secondary)', padding: '5rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.span className="section-label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0}>Amenities</motion.span>
            <motion.h2 className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.1} style={{ marginBottom: '3rem' }}>More Than Just a Space.</motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {['Premium Lighting Equipment', 'Fully Soundproofed Studio Room', 'Private Dressing Rooms', 'High-Speed Fiber Internet'].map((item, i) => (
                <motion.div key={item} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={(i + 1) * 0.1} style={{ border: '1px solid var(--border-subtle)', padding: '1.25rem 1.5rem', background: 'var(--bg-card)' }}>
                  <span style={{ display: 'block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-gold)', marginBottom: '0.75rem' }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 400 }}>{item}</span>
                </motion.div>
              ))}
            </div>
            <motion.p style={{ fontStyle: 'italic', color: 'var(--accent-gold)', opacity: 0.8, fontSize: '0.85rem' }} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0}>
              "Trusted by brands and creators across the Niger Delta."
            </motion.p>
          </div>
        </section>

        {/* ── SECTION 3: CREATIVE SPACES SPLIT ── */}
        <section style={{ padding: '7rem 2rem', background: 'var(--bg-primary)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <motion.div style={{ position: 'relative', height: '520px', overflow: 'hidden' }} variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
              <Image
                src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=2070&auto=format&fit=crop"
                alt="Creative Spaces"
                fill
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.2}>
              <span className="section-label-gold">Creative Spaces</span>
              <h2 className="section-heading" style={{ marginBottom: '1.5rem' }}>Production,<br />Refined</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem', fontSize: '0.9rem' }}>
                Each space is a meditation in creative flow. High ceilings and modular layouts frame your vision, while premium acoustics invite you to capture extraordinary clarity.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.9rem' }}>
                From high-end fashion shoots to intimate podcast recordings, every setup tells a story of creative excellence.
              </p>
              <Link href="/services" className="btn-primary">Explore Our Spaces</Link>
            </motion.div>
          </div>
          <style>{`
            @media (max-width: 768px) {
              section > div[style*="grid-template-columns: 1fr 1fr"] {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </section>

        {/* ── SECTION 4: THE CREATIVE EDGE ── */}
        <section style={{ padding: '7rem 2rem', background: 'var(--bg-secondary)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '5rem' }}>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0}>
              <span className="section-label">The Creative Edge</span>
              <h2 className="section-heading" style={{ marginBottom: '1.5rem' }}>Modular Spaces</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '2rem' }}>
                Solalina Studios represents the pinnacle of creative infrastructure in the Niger Delta, where contemporary African aesthetics meet international standards of excellence. Every detail has been meticulously considered.
              </p>
              {['Locally sourced design elements', 'Sustainable studio practices', 'Artisan craftsmanship'].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-gold)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item}</span>
                </div>
              ))}
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border-subtle)' }}>
              {[
                { title: 'SET DESIGN', desc: 'Modular sets that evolve with your vision, from minimalist chic to high-end editorial.' },
                { title: 'GEAR COLLECTION', desc: 'Industry-standard lighting and camera support for every production scale.' },
                { title: 'CREATIVE HUB', desc: 'A collaborative environment designed for photographers, videographers, and creators.' },
                { title: 'POST-PRODUCTION', desc: 'High-speed editing suites and Fiber internet for seamless content turnaround.' },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={(i + 1) * 0.1}
                  style={{ background: 'var(--bg-card)', padding: '2rem', transition: 'border-color 0.3s ease', border: '1px solid transparent', cursor: 'default' }}
                  onMouseOver={e => (e.currentTarget.style.borderColor = 'var(--border-accent)')}
                  onMouseOut={e => (e.currentTarget.style.borderColor = 'transparent')}
                >
                  <span className="section-label" style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>{card.title}</span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 5: VISUAL ALCHEMY ── */}
        <section style={{ padding: '7rem 2rem', background: 'var(--bg-primary)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.span className="section-label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0}>The Work</motion.span>
            <motion.h2 className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.1} style={{ marginBottom: '3rem' }}>Visual Alchemy</motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[
                {
                  img: 'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?q=80&w=2069&auto=format&fit=crop',
                  title: 'THE GALLERY',
                  desc: 'A curation of commercial masterpieces captured within our walls. From high-fashion editorials to sleek product shoots.',
                  link: '/portfolio',
                  cta: 'Explore Shoots',
                },
                {
                  img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2078&auto=format&fit=crop',
                  title: 'EDITORIAL SETS',
                  desc: 'Explore our modular set designs engineered for versatility. Custom lighting rigs and bespoke setups to match your vision.',
                  link: '/services',
                  cta: 'View Set Details',
                },
              ].map((card, i) => (
                <motion.div key={card.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={(i + 1) * 0.1} style={{ position: 'relative', overflow: 'hidden' }}>
                  <motion.div style={{ position: 'relative', height: '420px' }} variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
                    <Image src={card.img} alt={card.title} fill style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
                      onMouseOver={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)')}
                      onMouseOut={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)' }} />
                  </motion.div>
                  <div style={{ padding: '1.5rem 0' }}>
                    <span className="section-label" style={{ color: 'var(--accent-gold)' }}>{card.title}</span>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>{card.desc}</p>
                    <Link href={card.link} className="btn-ghost" style={{ fontSize: '0.7rem' }}>{card.cta} →</Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 6: STUDIO PERKS ── */}
        <section style={{ padding: '7rem 2rem', background: 'var(--bg-secondary)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.span className="section-label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0}>Studio Perks</motion.span>
            <motion.h2 className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.1} style={{ marginBottom: '3rem' }}>More Than Just a Space</motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
              {[
                { num: '01', title: 'STUDIO ROOM', desc: 'Professionally lit and equipped for any shoot format.' },
                { num: '02', title: 'DRESSING ROOMS', desc: 'Private spaces for styling, wardrobe, and mirror prep.' },
                { num: '03', title: 'HIGH-SPEED FIBER', desc: 'Fiber-optic internet for instant uploads and transfers.' },
                { num: '04', title: 'PODCAST SUITE', desc: 'Soundproofed and mic\'d for crystal-clear audio recording.' },
              ].map((item, i) => (
                <motion.div key={item.num} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={(i + 1) * 0.1} style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', fontWeight: 300, color: 'var(--accent-gold)', opacity: 0.6, display: 'block', marginBottom: '0.5rem' }}>{item.num}</span>
                  <span className="section-label" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{item.title}</span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 7: BOOK A SESSION CTA ── */}
        {/* FIX 4 — noise-overlay class applies the CSS noise texture */}
        <section className="noise-overlay" style={{ padding: '8rem 2rem', background: 'var(--bg-primary)', textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <motion.span className="section-label-gold" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0} style={{ textAlign: 'center', display: 'block' }}>Begin Your Session</motion.span>
            <motion.h2 className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.1} style={{ marginBottom: '1.25rem' }}>Ready to Capture Your Story?</motion.h2>
            <motion.p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2.5rem' }} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.2}>
              Our team is prepared to craft a bespoke studio experience tailored to your every creative need.
            </motion.p>
            <motion.div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.3}>
              <Link href="/contact" className="btn-primary">Reserve Now</Link>
              <Link href="/contact" className="btn-ghost">Contact Studio Team</Link>
            </motion.div>
            <motion.div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.4}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-label)' }}>+234 (0) 806 000 0000</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-label)' }}>bookings@solalina.com</span>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
