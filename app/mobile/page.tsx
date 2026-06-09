'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function MobilePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [navBg, setNavBg] = useState('transparent')
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const drawerWrapRef = useRef<HTMLDivElement>(null)

  // Scroll-based nav background
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      setNavBg(container.scrollTop > 60 ? 'rgba(10,10,10,0.95)' : 'transparent')
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // Drawer backdrop click to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === drawerWrapRef.current || (e.target as HTMLElement).classList.contains('backdrop')) {
      setIsDrawerOpen(false)
    }
  }

  // Scroll reveal animation
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1, root: container }
    )

    const animatedElements = container.querySelectorAll('.animate-on-scroll')
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', backgroundColor: '#0a0a0a' }}>
      {/* Navigation Bar */}
      <nav style={{ 
        position: 'relative', 
        flexShrink: 0, 
        height: '56px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '0 24px',
        backgroundColor: navBg,
        transition: 'background 0.3s ease',
        zIndex: 50
      }}>
        <span style={{ 
          fontFamily: 'Playfair Display, serif', 
          fontSize: '15px', 
          color: '#c9a84c', 
          letterSpacing: '0.04em',
          fontWeight: 400
        }}>
          SolalinaStudios
        </span>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          style={{ 
            width: '44px', 
            height: '44px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            minHeight: '44px',
            minWidth: '44px'
          }}
        >
          <span style={{ width: '20px', height: '2px', backgroundColor: '#c9a84c' }} />
          <span style={{ width: '20px', height: '2px', backgroundColor: '#c9a84c' }} />
          <span style={{ width: '20px', height: '2px', backgroundColor: '#c9a84c' }} />
        </button>
      </nav>

      {/* Scroll Container */}
      <div 
        ref={scrollContainerRef}
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          overflowX: 'hidden', 
          position: 'relative' 
        }}
      >
        {/* Drawer Wrapper */}
        <div 
          ref={drawerWrapRef}
          onClick={handleBackdropClick}
          className={`drawer-wrap ${isDrawerOpen ? 'open' : ''}`}
          style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: '100%', pointerEvents: isDrawerOpen ? 'all' : 'none' }}
        >
          {/* Backdrop */}
          <div className="backdrop" style={{ 
            position: 'absolute', 
            inset: 0, 
            pointerEvents: 'none', 
            background: 'rgba(0,0,0,0)', 
            transition: 'background 0.3s ease' 
          }} />
          
          {/* Drawer */}
          <div className="drawer" style={{
            position: 'absolute',
            top: 0,
            right: isDrawerOpen ? '0' : '-320px',
            width: 'min(85vw, 300px)',
            maxWidth: '300px',
            height: '100%',
            backgroundColor: '#0f0f0f',
            borderLeft: '1px solid rgba(201,168,76,0.2)',
            transition: 'right 0.3s ease',
            pointerEvents: 'all',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <span style={{ 
                fontFamily: 'Playfair Display, serif', 
                fontSize: '16px', 
                color: '#c9a84c', 
                letterSpacing: '0.04em' 
              }}>
                SolalinaStudios
              </span>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#c9a84c', 
                  fontSize: '24px', 
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                ✕
              </button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
              {['Home', 'Services', 'Portfolio', 'About', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/mobile' : `/${item.toLowerCase()}`}
                  onClick={() => setIsDrawerOpen(false)}
                  style={{
                    borderBottom: '1px solid rgba(201,168,76,0.1)',
                    padding: '20px 0',
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '18px',
                    color: '#f5f5f0',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#c9a84c'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#f5f5f0'}
                >
                  {item}
                </Link>
              ))}
            </nav>

            <div style={{ marginTop: 'auto' }}>
              <Link 
                href="/contact"
                style={{
                  width: '100%',
                  height: '48px',
                  backgroundColor: '#c9a84c',
                  color: '#0a0a0a',
                  border: 'none',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  minHeight: '44px'
                }}
              >
                Book a Session
              </Link>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                {['Instagram', 'TikTok', 'Facebook'].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#c9a84c', fontSize: '20px', cursor: 'pointer', textDecoration: 'none', minHeight: '44px', minWidth: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1 — HERO */}
        <section style={{ position: 'relative', height: '100svh', minHeight: '100svh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Image
            src="/studio-1.jpg"
            alt="Solalina Studios"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)' }} />

          <div style={{ position: 'relative', zIndex: 2, padding: '0 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <span className="animate-on-scroll" style={{ fontSize: '10px', color: '#c9a84c', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500 }}>
              Yenagoa's Premier Hub for Visual Excellence
            </span>
            <h1 className="animate-on-scroll delay-1" style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(28px, 8vw, 42px)',
              color: '#f5f5f0',
              lineHeight: 1.15,
              marginTop: '12px',
              fontWeight: 400,
              letterSpacing: '0.04em'
            }}>
              Where Visions<br />Become Masterpieces
            </h1>
            <p className="animate-on-scroll delay-2" style={{ 
              fontFamily: 'Inter, sans-serif', 
              fontSize: 'clamp(13px, 4vw, 15px)', 
              color: '#888888', 
              lineHeight: 1.6, 
              marginTop: '16px',
              maxWidth: 'clamp(280px, 80vw, 340px)'
            }}>
              A world-class creative ecosystem dedicated to Photography, Videography, and Content Production in the heart of Bayelsa State, Nigeria.
            </p>
            <div className="animate-on-scroll delay-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 'clamp(16px, 4vw, 24px)' }}>
              <button style={{
                width: '100%',
                height: 'clamp(44px, 12vw, 50px)',
                backgroundColor: '#c9a84c',
                color: '#0a0a0a',
                border: 'none',
                fontSize: 'clamp(11px, 3vw, 13px)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                borderRadius: 0,
                minHeight: '44px'
              }}>
                Explore the Hub
              </button>
              <button style={{
                width: '100%',
                height: 'clamp(44px, 12vw, 50px)',
                backgroundColor: 'transparent',
                color: '#c9a84c',
                border: '1px solid #c9a84c',
                fontSize: 'clamp(11px, 3vw, 13px)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                borderRadius: 0,
                minHeight: '44px'
              }}>
                Book a Session
              </button>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: '24px', left: 0, right: 0, textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#888888' }}>Scroll ↓</span>
          </div>
        </section>

        {/* SECTION 2 — AMENITIES TICKER */}
        <section style={{ height: '80px', backgroundColor: '#111111', borderTop: '1px solid rgba(201,168,76,0.15)', borderBottom: '1px solid rgba(201,168,76,0.15)', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            display: 'flex', 
            whiteSpace: 'nowrap',
            animation: 'marquee 30s linear infinite',
            willChange: 'transform'
          }}>
            <span style={{ fontSize: '13px', color: '#c9a84c', textTransform: 'uppercase', letterSpacing: '0.1em', paddingRight: '60px' }}>
              Premium Lighting Equipment · Fully Soundproofed Studio Room · Private Dressing Rooms · High-Speed Fiber Internet · Trusted by brands and creators across Bayelsa State · Premium Lighting Equipment · Fully Soundproofed Studio Room · Private Dressing Rooms · High-Speed Fiber Internet · Trusted by brands and creators across Bayelsa State ·
            </span>
          </div>
        </section>

        {/* SECTION 3 — CREATIVE SPACES */}
        <section style={{ position: 'relative', width: '100vw', aspectRatio: '4/5', overflow: 'hidden' }}>
          <Image
            src="/studio-2.jpg"
            alt="Creative Spaces"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 60%)' }} />

          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 24px 40px' }}>
            <span className="animate-on-scroll" style={{ fontSize: '10px', color: '#c9a84c', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500 }}>
              Creative Spaces
            </span>
            <h2 className="animate-on-scroll delay-1" style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '28px',
              color: '#f5f5f0',
              marginTop: '8px',
              fontWeight: 400,
              letterSpacing: '0.04em'
            }}>
              Production, Refined
            </h2>
            <p className="animate-on-scroll delay-2" style={{ 
              fontFamily: 'Inter, sans-serif', 
              fontSize: '13px', 
              color: '#888888', 
              lineHeight: 1.6, 
              marginTop: '8px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              Each space is a meditation in creative flow. High ceilings and modular layouts frame your vision.
            </p>
            <Link 
              href="/services"
              className="animate-on-scroll delay-3 inline-block underline underline-offset-4"
              style={{ 
                fontSize: '13px', 
                color: '#c9a84c', 
                marginTop: '16px', 
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Explore Our Spaces →
            </Link>
          </div>
        </section>

        {/* SECTION 4 — MODULAR SPACES */}
        <section style={{ backgroundColor: '#0a0a0a', padding: '24px', paddingTop: '64px', paddingBottom: '64px' }}>
          <span className="animate-on-scroll" style={{ fontSize: '10px', color: '#c9a84c', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500 }}>
            The Creative Edge
          </span>
          <h2 className="animate-on-scroll delay-1" style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '30px',
            color: '#f5f5f0',
            marginTop: '8px',
            fontWeight: 400,
            letterSpacing: '0.04em'
          }}>
            Modular Spaces
          </h2>
          <p className="animate-on-scroll delay-2" style={{ 
            fontFamily: 'Inter, sans-serif', 
            fontSize: '13px', 
            color: '#888888', 
            lineHeight: 1.65, 
            marginTop: '16px'
          }}>
            Solalina Studios represents the pinnacle of creative infrastructure in the Niger Delta, where contemporary African aesthetics meet international standards of excellence.
          </p>

          <div className="animate-on-scroll delay-3" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '24px' }}>
            {['Locally sourced design elements', 'Sustainable studio practices', 'Artisan craftsmanship'].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#c9a84c', fontSize: '13px' }}>—</span>
                <span style={{ fontSize: '13px', color: '#f5f5f0', fontFamily: 'Inter, sans-serif' }}>{item}</span>
              </div>
            ))}
          </div>

          <div className="animate-on-scroll delay-4 grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(12px, 3vw, 16px)', marginTop: 'clamp(32px, 8vw, 40px)' }}>
            {[
              { title: 'SET DESIGN', desc: 'Modular sets that evolve with your vision' },
              { title: 'GEAR COLLECTION', desc: 'Industry-standard lighting and camera support' },
              { title: 'CREATIVE HUB', desc: 'Collaborative environment for creators' },
              { title: 'POST-PRODUCTION', desc: 'High-speed editing suites and Fiber internet' }
            ].map((card) => (
              <div key={card.title} style={{ 
                backgroundColor: '#1a1a1a', 
                border: '1px solid rgba(201,168,76,0.15)', 
                padding: '20px',
                borderRadius: '2px'
              }}>
                <span style={{ fontSize: '10px', color: '#c9a84c', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
                  {card.title}
                </span>
                <p style={{ fontSize: '12px', color: '#888888', lineHeight: 1.5, fontFamily: 'Inter, sans-serif' }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5 — VISUAL ALCHEMY */}
        <section style={{ padding: 'clamp(12px, 3vw, 16px) 0', paddingTop: 'clamp(48px, 12vw, 56px)', paddingBottom: 'clamp(48px, 12vw, 56px)', backgroundColor: '#0a0a0a' }}>
          <div style={{ padding: '0 clamp(12px, 3vw, 16px)' }}>
            <span className="animate-on-scroll" style={{ fontSize: '10px', color: '#c9a84c', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500 }}>
              The Work
            </span>
            <h2 className="animate-on-scroll delay-1" style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(24px, 6vw, 28px)',
              color: '#f5f5f0',
              marginTop: '8px',
              fontWeight: 400,
              letterSpacing: '0.04em'
            }}>
              Visual Alchemy
            </h2>
          </div>

          {/* Card 1 */}
          <div className="animate-on-scroll delay-2" style={{ marginTop: 'clamp(24px, 6vw, 32px)' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden' }}>
              <Image
                src="/studio-4.jpg"
                alt="The Gallery"
                fill
                style={{ objectFit: 'cover', transition: 'transform 0.2s ease' }}
              />
            </div>
            <div style={{ padding: '0 16px', paddingTop: '16px' }}>
              <span style={{ fontSize: '10px', color: '#c9a84c', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500 }}>
                THE GALLERY
              </span>
              <p style={{ fontSize: '12px', color: '#888888', lineHeight: 1.6, marginTop: '4px', fontFamily: 'Inter, sans-serif' }}>
                A curation of commercial masterpieces captured within our walls.
              </p>
              <Link 
                href="/portfolio"
                className="inline-block underline underline-offset-4"
                style={{ 
                  fontSize: '13px', 
                  color: '#c9a84c', 
                  marginTop: '12px', 
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Explore Shoots →
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="animate-on-scroll delay-3" style={{ marginTop: 'clamp(24px, 6vw, 32px)' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden' }}>
              <Image
                src="/studio-5.jpg"
                alt="Editorial Sets"
                fill
                style={{ objectFit: 'cover', transition: 'transform 0.2s ease' }}
              />
            </div>
            <div style={{ padding: '0 clamp(12px, 3vw, 16px)', paddingTop: 'clamp(12px, 3vw, 16px)' }}>
              <span style={{ fontSize: '10px', color: '#c9a84c', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500 }}>
                EDITORIAL SETS
              </span>
              <p style={{ fontSize: '12px', color: '#888888', lineHeight: 1.6, marginTop: '4px', fontFamily: 'Inter, sans-serif' }}>
                Explore our modular set designs engineered for versatility.
              </p>
              <Link 
                href="/services"
                className="inline-block underline underline-offset-4"
                style={{ 
                  fontSize: '13px', 
                  color: '#c9a84c', 
                  marginTop: '12px', 
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                View Set Details →
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 6 — STUDIO PERKS */}
        <section style={{ backgroundColor: '#0a0a0a', padding: 'clamp(16px, 4vw, 24px)', paddingTop: 'clamp(56px, 14vw, 64px)', paddingBottom: 'clamp(56px, 14vw, 64px)' }}>
          <span className="animate-on-scroll" style={{ fontSize: '10px', color: '#c9a84c', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500 }}>
            Studio Perks
          </span>
          <h2 className="animate-on-scroll delay-1" style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '30px',
            color: '#f5f5f0',
            marginTop: '8px',
            fontWeight: 400,
            letterSpacing: '0.04em'
          }}>
            More Than<br />Just a Space
          </h2>

          <div className="animate-on-scroll delay-2" style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 'clamp(24px, 6vw, 32px)', borderTop: '1px solid rgba(201,168,76,0.2)' }}>
            {[
              { num: '01', title: 'STUDIO ROOM', desc: 'Professionally lit for any shoot format' },
              { num: '02', title: 'DRESSING ROOMS', desc: 'Private styling and wardrobe spaces' },
              { num: '03', title: 'HIGH-SPEED FIBER', desc: 'Instant uploads and file transfers' },
              { num: '04', title: 'PODCAST SUITE', desc: 'Soundproofed, mic\'d for clear audio' }
            ].map((item) => (
              <div key={item.num} className="perk-row" style={{ 
                borderBottom: '1px solid rgba(201,168,76,0.2)', 
                padding: 'clamp(16px, 4vw, 20px) 0', 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '11px', color: '#c9a84c', letterSpacing: '0.15em', fontWeight: 500 }}>
                  {item.num}
                </span>
                <span style={{ fontSize: '15px', color: '#f5f5f0', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  {item.title}
                </span>
                <span style={{ fontSize: '12px', color: '#888888', textAlign: 'right', maxWidth: '140px', fontFamily: 'Inter, sans-serif' }}>
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7 — CTA / BOOKING */}
        <section style={{ backgroundColor: '#0d0d0d', padding: 'clamp(16px, 4vw, 24px)', paddingTop: 'clamp(64px, 16vw, 80px)', paddingBottom: 'clamp(64px, 16vw, 80px)', textAlign: 'center' }}>
          <span className="animate-on-scroll" style={{ fontSize: '10px', color: '#c9a84c', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500 }}>
            Begin Your Session
          </span>
          <h2 className="animate-on-scroll delay-1" style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(26px, 7vw, 30px)',
            color: '#f5f5f0',
            marginTop: '12px',
            fontWeight: 400,
            letterSpacing: '0.04em'
          }}>
            Ready to Capture<br />Your Story?
          </h2>
          <p className="animate-on-scroll delay-2" style={{ 
            fontFamily: 'Inter, sans-serif', 
            fontSize: 'clamp(13px, 4vw, 15px)', 
            color: '#888888', 
            lineHeight: 1.6, 
            marginTop: '16px'
          }}>
            Our team is prepared to craft a bespoke studio experience tailored to your every creative need.
          </p>

          <div className="animate-on-scroll delay-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 'clamp(24px, 6vw, 32px)' }}>
            <button style={{
              width: '100%',
              height: 'clamp(44px, 12vw, 50px)',
              backgroundColor: '#c9a84c',
              color: '#0a0a0a',
              border: 'none',
              fontSize: 'clamp(11px, 3vw, 13px)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              borderRadius: 0,
              minHeight: '44px'
            }}>
              Reserve Now
            </button>
            <button style={{
              width: '100%',
              height: 'clamp(44px, 12vw, 50px)',
              backgroundColor: 'transparent',
              color: '#c9a84c',
              border: '1px solid #c9a84c',
              fontSize: 'clamp(11px, 3vw, 13px)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              borderRadius: 0,
              minHeight: '44px'
            }}>
              Contact Studio Team
            </button>
          </div>

          <div className="animate-on-scroll delay-4" style={{ marginTop: '40px' }}>
            <div style={{ fontSize: '12px', color: '#888888', fontFamily: 'Inter, sans-serif', lineHeight: 2 }}>
              <div style={{ color: '#c9a84c' }}>+234 (0) 806 000 0000</div>
              <div style={{ color: '#c9a84c' }}>bookings@solalina.com</div>
            </div>
          </div>
        </section>

        {/* SECTION 8 — FOOTER */}
        <footer style={{ backgroundColor: '#080808', padding: '24px', paddingTop: '48px', paddingBottom: '48px' }}>
          <span style={{ 
            fontFamily: 'Playfair Display, serif', 
            fontSize: '16px', 
            color: '#c9a84c', 
            letterSpacing: '0.04em',
            fontWeight: 400
          }}>
            SolalinaStudios
          </span>
          <p style={{ fontSize: '12px', color: '#888888', marginTop: '4px', fontFamily: 'Inter, sans-serif' }}>
            Where Visions Become Masterpieces.
          </p>
          <p style={{ fontSize: '12px', color: '#888888', marginTop: '8px', fontFamily: 'Inter, sans-serif' }}>
            Solalina Studios, Yenagoa, Bayelsa State, Nigeria.
          </p>

          <div style={{ height: '1px', backgroundColor: 'rgba(201,168,76,0.1)', margin: '32px 0' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#888888', lineHeight: 2, fontFamily: 'Inter, sans-serif' }}>
                <Link href="/mobile" style={{ color: '#888888', textDecoration: 'none' }}>Home</Link><br />
                <Link href="/services" style={{ color: '#888888', textDecoration: 'none' }}>Services</Link><br />
                <Link href="/portfolio" style={{ color: '#888888', textDecoration: 'none' }}>Portfolio</Link><br />
                <Link href="/about" style={{ color: '#888888', textDecoration: 'none' }}>About Us</Link>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#888888', lineHeight: 2, fontFamily: 'Inter, sans-serif' }}>
                <span style={{ color: '#c9a84c', cursor: 'pointer' }}>Instagram</span><br />
                <span style={{ color: '#c9a84c', cursor: 'pointer' }}>TikTok</span><br />
                <span style={{ color: '#c9a84c', cursor: 'pointer' }}>Facebook</span><br />
                <span style={{ color: '#c9a84c', cursor: 'pointer' }}>Admin Console</span>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(201,168,76,0.1)', marginTop: '40px', paddingTop: '24px' }}>
            <p style={{ fontSize: '11px', color: '#888888', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
              © 2026 Solalina Studios. All rights reserved. Developed with Luxury.
            </p>
            <div style={{ fontSize: '11px', color: '#c9a84c', marginTop: '8px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
              <span style={{ cursor: 'pointer' }}>Privacy</span> · <span style={{ cursor: 'pointer' }}>Terms</span>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .drawer-wrap.open .backdrop {
          pointer-events: all;
          background: rgba(0,0,0,0.65);
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .animate-on-scroll.delay-1 { transition-delay: 0.1s; }
        .animate-on-scroll.delay-2 { transition-delay: 0.2s; }
        .animate-on-scroll.delay-3 { transition-delay: 0.3s; }
        .animate-on-scroll.delay-4 { transition-delay: 0.4s; }

        @media (max-width: 360px) {
          .grid-responsive {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 400px) {
          .perk-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .perk-row span:last-child {
            max-width: 100%;
            text-align: left;
          }
        }
      `}</style>
    </div>
  )
}
