// FIX 8 — empty state fallback to placeholder images when Firestore is empty
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp } from '@/lib/motionVariants'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'

const PLACEHOLDER_IMAGES = [
  { id: '1', imageUrl: '/studio-4.jpg', title: 'Brand Editorial', category: 'Photography' },
  { id: '2', imageUrl: '/studio-2.jpg', title: 'Fashion Shoot', category: 'Photography' },
  { id: '3', imageUrl: '/studio-3.jpg', title: 'Podcast Session', category: 'Podcast' },
  { id: '4', imageUrl: '/studio-1.jpg', title: 'Studio Session', category: 'Videography' },
  { id: '5', imageUrl: '/studio-5.jpg', title: 'Product Shoot', category: 'Photography' },
  { id: '6', imageUrl: '/studio-1.jpg', title: 'Content Creation', category: 'Videography' },
]

const CATEGORIES = ['All', 'Photography', 'Videography', 'Podcast']

export default function PortfolioPage() {
  // TODO (Firebase): fetch from Firestore `portfolio` collection.
  // If result is empty or loading, show PLACEHOLDER_IMAGES.
  const [items] = useState(PLACEHOLDER_IMAGES)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => item.category === activeCategory)

  // ESC key + arrow navigation for lightbox
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (lightboxIndex === null) return
    if (e.key === 'Escape') setLightboxIndex(null)
    if (e.key === 'ArrowRight') setLightboxIndex(prev => prev !== null ? (prev + 1) % filteredItems.length : null)
    if (e.key === 'ArrowLeft') setLightboxIndex(prev => prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null)
  }, [lightboxIndex, filteredItems.length])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--nav-height)' }}>

        {/* ── Page Hero ── */}
        <section style={{ position: 'relative', minHeight: '320px', display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <Image
              src="/studio-4.jpg"
              alt="Portfolio hero"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center 35%', opacity: 0.15 }}
            />
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--bg-secondary) 0%, rgba(15,15,15,0.85) 100%)' }} />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: 'var(--container-max)', margin: '0 auto', padding: '5rem 2.5rem' }}>
            <motion.span className="section-label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
              The Work
            </motion.span>
            <motion.h1 className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1} style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              Our Portfolio
            </motion.h1>
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2}
              style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '440px', marginTop: '1rem' }}
            >
              A curated showcase of commercial masterpieces captured within our walls.
            </motion.p>
          </div>
        </section>

        {/* ── Gallery ── */}
        <section style={{ padding: 'var(--section-padding) 2.5rem', background: 'var(--bg-primary)' }}>
          <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>

            {/* Category Filter Pills */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
              style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '3rem' }}
            >
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.65rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    padding: '0.55rem 1.3rem',
                    border: '1px solid',
                    borderColor: activeCategory === cat ? 'var(--accent-gold)' : 'var(--border-mid)',
                    color: activeCategory === cat ? 'var(--text-inverse)' : 'var(--text-muted)',
                    background: activeCategory === cat ? 'var(--accent-gold)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseOver={e => {
                    if (activeCategory !== cat) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent-gold)'
                      ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--accent-gold)'
                    }
                  }}
                  onMouseOut={e => {
                    if (activeCategory !== cat) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-mid)'
                      ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'
                    }
                  }}
                >
                  {cat}
                  <span style={{ marginLeft: '0.4rem', opacity: 0.6, fontSize: '0.6rem' }}>
                    ({cat === 'All' ? items.length : items.filter(i => i.category === cat).length})
                  </span>
                </button>
              ))}
            </motion.div>

            {/* Masonry Grid */}
            <div style={{ columns: '3 260px', gap: '1.25rem' }}>
              <AnimatePresence>
                {filteredItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, delay: (i % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    style={{ position: 'relative', breakInside: 'avoid', marginBottom: '1.25rem', overflow: 'hidden', cursor: 'pointer' }}
                    onClick={() => setLightboxIndex(i)}
                  >
                    <div style={{ position: 'relative', paddingBottom: i % 3 === 0 ? '125%' : '75%' }}>
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover', transition: 'transform 0.65s var(--ease-out-expo)' }}
                        onMouseOver={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)')}
                        onMouseOut={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                      />

                      {/* Hover overlay — slides up */}
                      <div
                        style={{
                          position: 'absolute', inset: 0,
                          background: 'linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 55%)',
                          opacity: 0,
                          transition: 'opacity 0.35s ease',
                          display: 'flex',
                          alignItems: 'flex-end',
                        }}
                        onMouseOver={e => {
                          (e.currentTarget as HTMLElement).style.opacity = '1'
                        }}
                        onMouseOut={e => {
                          (e.currentTarget as HTMLElement).style.opacity = '0'
                        }}
                      >
                        <div style={{ padding: '1.25rem', width: '100%' }}>
                          <span className="section-label" style={{ color: 'var(--accent-gold)', marginBottom: '0.2rem' }}>{item.category}</span>
                          <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
                            {item.title}
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
                            <span style={{ fontSize: '0.62rem', fontFamily: 'DM Sans, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-label)' }}>
                              View
                            </span>
                            <span style={{ color: 'var(--accent-gold)', fontSize: '0.75rem' }}>→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredItems.length === 0 && (
              <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                <p style={{ color: 'var(--text-label)', fontSize: '0.9rem' }}>No items in this category yet.</p>
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />

      {/* ── Enhanced Lightbox ── */}
      <AnimatePresence>
        {currentLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.96)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
            }}
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
              style={{
                position: 'fixed',
                top: '1.5rem',
                right: '1.75rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border-mid)',
                color: 'var(--text-primary)',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.1rem',
                transition: 'background 0.2s, color 0.2s',
                zIndex: 10000,
              }}
              onMouseOver={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-gold)'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-inverse)'
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'
              }}
            >
              ✕
            </button>

            {/* Previous arrow */}
            {filteredItems.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); setLightboxIndex(prev => prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null) }}
                aria-label="Previous image"
                style={{
                  position: 'fixed',
                  left: '1.25rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-mid)',
                  color: 'var(--text-primary)',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  zIndex: 10000,
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-gold)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-inverse)'; }}
                onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'; }}
              >
                ←
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              style={{ position: 'relative', maxWidth: '1100px', maxHeight: '85vh', width: '100%', aspectRatio: '16/10' }}
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={currentLightboxItem.imageUrl}
                alt={currentLightboxItem.title}
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 1200px) 100vw, 1100px"
              />
            </motion.div>

            {/* Next arrow */}
            {filteredItems.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); setLightboxIndex(prev => prev !== null ? (prev + 1) % filteredItems.length : null) }}
                aria-label="Next image"
                style={{
                  position: 'fixed',
                  right: '1.25rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-mid)',
                  color: 'var(--text-primary)',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  zIndex: 10000,
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-gold)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-inverse)'; }}
                onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'; }}
              >
                →
              </button>
            )}

            {/* Caption + counter */}
            <div style={{
              position: 'fixed',
              bottom: '1.75rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              zIndex: 10000,
            }}>
              <span className="section-label" style={{ color: 'var(--accent-gold)', margin: 0 }}>{currentLightboxItem.category}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
                {currentLightboxItem.title}
              </span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-label)', fontFamily: 'DM Sans, sans-serif' }}>
                {lightboxIndex !== null ? lightboxIndex + 1 : 0} / {filteredItems.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
