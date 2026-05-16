// FIX 8 — empty state fallback to placeholder images when Firestore is empty
'use client'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { useState } from 'react'

const PLACEHOLDER_IMAGES = [
  { id: '1', imageUrl: 'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?w=800', title: 'Brand Editorial', category: 'Photography' },
  { id: '2', imageUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800', title: 'Fashion Shoot', category: 'Photography' },
  { id: '3', imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e531b4?w=800', title: 'Podcast Session', category: 'Podcast' },
  { id: '4', imageUrl: 'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=800', title: 'Studio Session', category: 'Videography' },
  { id: '5', imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800', title: 'Product Shoot', category: 'Photography' },
  { id: '6', imageUrl: 'https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?w=800', title: 'Content Creation', category: 'Videography' },
]

export default function PortfolioPage() {
  useScrollAnimation()
  // TODO (Firebase): fetch from Firestore `portfolio` collection.
  // If result is empty or loading, show PLACEHOLDER_IMAGES.
  const [items] = useState(PLACEHOLDER_IMAGES)

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>
        <section style={{ padding: '7rem 2rem', background: 'var(--bg-primary)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <span className="section-label animate-on-scroll">The Work</span>
            <h1 className="section-heading animate-on-scroll delay-1" style={{ marginBottom: '3rem' }}>Our Portfolio</h1>
            <div style={{ columns: '3 280px', gap: '1rem' }}>
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className={`animate-on-scroll delay-${(i % 4) + 1}`}
                  style={{ position: 'relative', breakInside: 'avoid', marginBottom: '1rem', overflow: 'hidden', cursor: 'pointer' }}
                >
                  <div style={{ position: 'relative', paddingBottom: i % 3 === 0 ? '120%' : '75%' }}>
                    <Image src={item.imageUrl} alt={item.title} fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseOver={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)')}
                      onMouseOut={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)',
                      opacity: 0, transition: 'opacity 0.3s ease',
                    }}
                      onMouseOver={e => (e.currentTarget.style.opacity = '1')}
                      onMouseOut={e => (e.currentTarget.style.opacity = '0')}
                    >
                      <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem' }}>
                        <span className="section-label" style={{ color: 'var(--accent-gold)', marginBottom: '0.25rem' }}>{item.category}</span>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>{item.title}</p>
                      </div>
                    </div>
                  </div>
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
