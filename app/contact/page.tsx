// FIX 9 — form POSTs to /api/booking (Firebase backend), NOT a fake success state
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motionVariants'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inputStyle = {
  width: '100%',
  padding: '0.85rem 1rem',
  background: 'var(--bg-card)',
  border: '1px solid var(--border-subtle)',
  color: 'var(--text-primary)',
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '16px',
  fontWeight: 300,
  outline: 'none',
  transition: 'border-color 0.3s ease',
}

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    service: '', preferredDate: '', sessionNotes: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed.')
      setStatus('success')
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>
        <section style={{ padding: '7rem 2rem', background: 'var(--bg-primary)', minHeight: '100vh' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }} className="contact-grid">

            {/* Left — contact info */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0}>
              <span className="section-label">Begin Your Session</span>
              <h1 className="section-heading" style={{ marginBottom: '2.5rem' }}>Book a Session</h1>
              {[
                { label: 'Address', value: 'Solalina Studios\nWarri, Delta State, Nigeria.' },
                { label: 'Phone', value: '+234 (0) 806 000 0000' },
                { label: 'Email', value: 'bookings@solalina.com' },
                { label: 'Instagram', value: '@solalina.studios' },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: '1.75rem' }}>
                  <span className="section-label" style={{ marginBottom: '0.4rem' }}>{item.label}</span>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', whiteSpace: 'pre-line', lineHeight: 1.7 }}>{item.value}</p>
                </div>
              ))}
            </motion.div>

            {/* Right — form */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.2}>
              {status === 'success' ? (
                <div style={{ border: '1px solid var(--border-accent)', padding: '3rem', textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '2rem', marginBottom: '1rem' }}>✦</span>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '1.75rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                    Booking Request Received
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>
                    Your booking request has been received. We&apos;ll be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Chukwuemeka Obi' },
                    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'hello@example.com' },
                    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+234 801 234 5678' },
                  ].map(field => (
                    <div key={field.name}>
                      <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-label)', marginBottom: '0.5rem' }}>{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={(form as any)[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required
                        style={inputStyle as React.CSSProperties}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent-gold)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                      />
                    </div>
                  ))}

                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-label)', marginBottom: '0.5rem' }}>Service Required</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      required
                      style={{ ...inputStyle, cursor: 'pointer' } as React.CSSProperties}
                      onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent-gold)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="studio_rental">Studio Rental</option>
                      <option value="podcast_production">Podcast Production</option>
                      <option value="content_creation">Content Creation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-label)', marginBottom: '0.5rem' }}>Preferred Date</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={form.preferredDate}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      style={{ ...inputStyle, colorScheme: 'dark' } as React.CSSProperties}
                      onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent-gold)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-label)', marginBottom: '0.5rem' }}>Session Notes</label>
                    <textarea
                      name="sessionNotes"
                      value={form.sessionNotes}
                      onChange={handleChange}
                      placeholder="Tell us about your session, references, requirements..."
                      rows={4}
                      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 } as React.CSSProperties}
                      onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent-gold)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                    />
                  </div>

                  {status === 'error' && (
                    <p style={{ fontSize: '0.8rem', color: '#e05c5c', padding: '0.75rem 1rem', border: '1px solid rgba(224,92,92,0.3)', background: 'rgba(224,92,92,0.05)' }}>
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary"
                    style={{ width: '100%', opacity: status === 'loading' ? 0.6 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}
                  >
                    {status === 'loading' ? 'Submitting...' : 'Submit Booking Request'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </section>
        <style>{`
          @media (max-width: 768px) {
            .contact-grid {
              grid-template-columns: 1fr !important;
              gap: 3rem !important;
            }
          }
        `}</style>
      </main>
      <Footer />
    </>
  )
}
