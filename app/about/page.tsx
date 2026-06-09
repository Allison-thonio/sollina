'use client'
import { motion } from 'framer-motion'
import { fadeUp, scaleIn } from '@/lib/motionVariants'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'

const VALUES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'UNCOMPROMISING EXCELLENCE',
    desc: 'Every pixel, soundwave, and set layout is crafted to match international standards. We do not settle for "good enough" in the Niger Delta.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'CREATIVE FREEDOM',
    desc: 'A flexible, fully-equipped workspace built to bend to the wildest imaginations of modern photographers, filmmakers, and podcasters.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'COMMUNITY INTEGRITY',
    desc: 'Empowering local talent by making high-end production facilities accessible, fostering collaboration, and mentoring the next generation.'
  }
]

const TEAM = [
  {
    name: 'Allison Thonio',
    role: 'Founder & Creative Director',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    bio: 'Visionary architect behind Solalina. Driven by the mission to establish a world-class creative ecosystem in Bayelsa State.'
  },
  {
    name: 'Ogene Karo',
    role: 'Lead Cinematographer',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    bio: 'Lighting specialist and visual storyteller with over a decade of capturing the essence of the Niger Delta.'
  },
  {
    name: 'Blessing Alero',
    role: 'Studio Operations Manager',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop',
    bio: 'The organizational force ensuring every booking, client need, and production runs with absolute precision.'
  }
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        
        {/* HERO SECTION */}
        <section style={{ 
          position: 'relative', 
          height: '65vh', 
          minHeight: '400px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          overflow: 'hidden',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          {/* Background image overlay */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image
              src="/studio-3.jpg"
              alt="Solalina Studios atmosphere"
              fill
              priority
              style={{ objectFit: 'cover', opacity: 0.22, filter: 'grayscale(20%)' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(8,8,8,0.4) 0%, var(--bg-primary) 95%)'
            }} />
          </div>

          <div className="section-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 1rem' }}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
            >
              <span className="section-label" style={{ display: 'inline-block', marginBottom: '1rem', letterSpacing: '0.2em' }}>
                THE IDENTITY
              </span>
              <h1 className="hero-heading" style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
                fontWeight: 300,
                lineHeight: 1.0,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem'
              }}>
                A Creative <span className="gradient-text italic font-serif">Sanctuary</span>
              </h1>
              <p style={{
                maxWidth: '650px',
                margin: '0 auto',
                fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                fontWeight: 300
              }}>
                Designed to empower visionaries in the Niger Delta. We build space for world-class ideas, high-end editorial visuals, and premium digital audio.
              </p>
            </motion.div>
          </div>
        </section>

        {/* THE MISSION / BRAND STORY */}
        <section style={{ padding: 'var(--section-padding) 0', position: 'relative' }}>
          <div className="section-container">
            <div className="grid-2col" style={{ gap: 'clamp(2.5rem, 6vw, 6rem)', alignItems: 'center' }}>
              
              <motion.div 
                variants={fadeUp} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, amount: 0.2 }}
                custom={0}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: '12px', height: '1px', background: 'var(--accent-gold)' }} />
                  <span className="section-label" style={{ marginBottom: 0 }}>OUR ORIGIN</span>
                </div>
                <h2 className="section-heading" style={{ marginBottom: '2rem' }}>
                  Elevating the Creative Narrative in Bayelsa State
                </h2>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                  Solalina Studios was established in 2024 to dismantle the barrier of access to premium media production tools in the region. We recognized an immense pool of local talent that lacked the infrastructure to express their vision at a global standard.
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: '2.5rem' }}>
                  By providing modular set designs, elite lighting configurations, and crystal-clear acoustic isolation suites, we offer creators an environment where imagination is the only limit. This isn't just a rental space; it is a movement of visual and sonic storytelling.
                </p>

                <div style={{ 
                  borderLeft: '2px solid var(--accent-gold)', 
                  paddingLeft: '1.5rem', 
                  margin: '2rem 0',
                  fontStyle: 'italic'
                }}>
                  <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', lineHeight: 1.7, fontFamily: 'var(--font-display)' }}>
                    "Our goal is to build an environment where creators do not just produce work, but craft masterpieces that command respect globally."
                  </p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginTop: '0.5rem' }}>
                    — Allison Thonio, Founder
                  </span>
                </div>
              </motion.div>

              <motion.div 
                style={{ position: 'relative', height: 'clamp(380px, 45vw, 580px)', width: '100%', overflow: 'hidden', borderRadius: '4px' }} 
                variants={scaleIn} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, amount: 0.15 }}
              >
                <Image
                  src="/studio-3.jpg"
                  alt="Solalina studio production desk"
                  fill
                  style={{ objectFit: 'cover', filter: 'brightness(85%) contrast(105%)' }}
                />
                {/* Visual border highlight */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  border: '1px solid rgba(201,168,76,0.15)',
                  pointerEvents: 'none'
                }} />
              </motion.div>

            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section style={{ 
          padding: 'var(--section-padding) 0', 
          background: 'var(--bg-secondary)', 
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div className="section-container">
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <span className="section-label">HOW WE WORK</span>
              <h2 className="section-heading">Our Core Philosophy</h2>
              <div style={{ width: '40px', height: '1px', background: 'var(--accent-gold)', margin: '1.5rem auto 0' }} />
            </div>

            <div className="grid-3col" style={{ gap: '2rem' }}>
              {VALUES.map((val, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx * 0.1}
                  className="card-hover-scale"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    padding: '3rem 2rem',
                    borderRadius: '4px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color var(--duration-base) var(--ease-out-expo), box-shadow var(--duration-base) var(--ease-out-expo)'
                  }}
                >
                  {/* Subtle top light bar */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    background: 'var(--gold-gradient)',
                    opacity: 0,
                    transition: 'opacity var(--duration-base) var(--ease-out-expo)'
                  }} className="card-top-bar" />

                  <div style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem' }}>
                    {val.icon}
                  </div>
                  <h3 style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: '1.25rem', 
                    letterSpacing: '0.05em', 
                    color: 'var(--text-primary)', 
                    marginBottom: '1rem' 
                  }}>
                    {val.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.8 }}>
                    {val.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section style={{ padding: 'var(--section-padding) 0' }}>
          <div className="section-container">
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <span className="section-label">THE VISIONARIES</span>
              <h2 className="section-heading">Behind the Lens & Board</h2>
              <div style={{ width: '40px', height: '1px', background: 'var(--accent-gold)', margin: '1.5rem auto 0' }} />
            </div>

            <div className="grid-3col" style={{ gap: '2.5rem' }}>
              {TEAM.map((member, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx * 0.15}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  {/* Image container with Ken Burns style zoom */}
                  <div style={{ 
                    position: 'relative', 
                    height: '380px', 
                    width: '100%', 
                    overflow: 'hidden', 
                    borderRadius: '4px',
                    marginBottom: '1.5rem',
                    border: '1px solid var(--border-subtle)'
                  }} className="group">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      style={{ 
                        objectFit: 'cover', 
                        filter: 'grayscale(100%) contrast(110%) brightness(90%)',
                        transition: 'transform var(--duration-slow) var(--ease-out-expo), filter var(--duration-slow) var(--ease-out-expo)'
                      }}
                      className="group-hover-zoom"
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, transparent 60%, rgba(8,8,8,0.9) 100%)'
                    }} />
                  </div>

                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500, marginBottom: '0.5rem', display: 'block' }}>
                    {member.role}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 300, marginBottom: '0.75rem', letterSpacing: '0.02em' }}>
                    {member.name}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section style={{ 
          padding: 'var(--section-padding) 0', 
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center',
          position: 'relative'
        }}>
          {/* Subtle background text */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(6rem, 15vw, 15rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            color: 'rgba(201,168,76,0.015)',
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 0,
            whiteSpace: 'nowrap'
          }}>
            CREATIVE HUB
          </div>

          <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="section-heading" style={{ fontSize: 'var(--fs-display)', marginBottom: '1.5rem' }}>
                Ready to Create Something <span className="gradient-text italic font-serif">Legendary</span>?
              </h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '550px', margin: '0 auto 2.5rem', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Book a session in our premium Bayelsa studio today and experience the difference of working in a space built purely for excellence.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn-gold">
                  Book a Session
                </Link>
                <Link href="/services" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.9rem 2.2rem',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  borderRadius: '4px',
                  border: '1px solid var(--border-mid)',
                  transition: 'all var(--duration-base) var(--ease-out-expo)'
                }} className="btn-secondary-hover">
                  Explore Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
