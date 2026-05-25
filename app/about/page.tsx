'use client'
import { motion } from 'framer-motion'
import { fadeUp, scaleIn } from '@/lib/motionVariants'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>
        <section style={{ padding: '7rem 2rem', background: 'var(--bg-primary)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0}>
              <span className="section-label">The Identity</span>
              <h1 className="section-heading" style={{ marginBottom: '2rem' }}>Solalina Studios</h1>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Solalina Studios is a creative sanctuary located in the heart of Warri, Delta State. Founded to empower visionaries in the Niger Delta, we provide the tools and atmosphere needed to capture victories and celebrate milestones.
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '2.5rem' }}>
                Our space is more than just a studio; it's a hub where ideas transform into high-quality visual and audio experiences. From editorial photography to professional podcasting, we are the playground for the Niger Delta's most ambitious creators.
              </p>
              <span className="section-label" style={{ marginBottom: '0.5rem' }}>Location</span>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Solalina Studios<br />Warri, Delta State, Nigeria.
              </p>
            </motion.div>
            <motion.div style={{ position: 'relative', height: '560px', overflow: 'hidden' }} variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
              <Image
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e531b4?q=80&w=1000&auto=format&fit=crop"
                alt="Solalina Studios atmosphere"
                fill
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
