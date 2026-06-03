// FIX 9 — form POSTs to /api/booking (Firebase backend), NOT a fake success state
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp } from '@/lib/motionVariants'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ────────────────────────────────────────────────────────────
// Form state type — EXACTLY the same as original
// ────────────────────────────────────────────────────────────
type FormState = {
  fullName: string
  email: string
  phone: string
  service: string
  preferredDate: string
  sessionNotes: string
}

const SERVICES_OPTIONS = [
  { value: 'studio_rental', label: 'Studio Rental', icon: '📷', price: 'From ₦25,000/hr', desc: 'Full studio access with professional lighting' },
  { value: 'podcast_production', label: 'Podcast Production', icon: '🎙️', price: 'Custom packages', desc: 'Multi-cam setup, soundproofed suite' },
  { value: 'content_creation', label: 'Content Creation', icon: '🎬', price: 'Project-based', desc: 'Reels, TikToks, brand videos' },
  { value: 'other', label: 'Other / Custom', icon: '✦', price: 'Let\'s discuss', desc: 'Tell us what you have in mind' },
]

// ────────────────────────────────────────────────────────────
// Step indicator component
// ────────────────────────────────────────────────────────────
function StepIndicator({ current, total }: { current: number; total: number }) {
  const steps = ['Service', 'Details', 'Confirm']
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: '2.5rem' }}>
      {steps.map((label, i) => {
        const stepNum = i + 1
        const done = stepNum < current
        const active = stepNum === current
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center', flex: i < total - 1 ? 1 : 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: `1px solid ${done || active ? 'var(--accent-gold)' : 'var(--border-mid)'}`,
                background: done ? 'var(--accent-gold)' : active ? 'var(--accent-gold-glow)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                color: done ? 'var(--text-inverse)' : active ? 'var(--accent-gold)' : 'var(--text-label)',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: done ? 600 : 400,
                transition: 'all 0.3s ease',
                flexShrink: 0,
              }}>
                {done ? '✓' : stepNum}
              </div>
              <span style={{
                fontSize: '0.6rem',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: active ? 'var(--accent-gold)' : done ? 'var(--text-muted)' : 'var(--text-label)',
                whiteSpace: 'nowrap',
                transition: 'color 0.3s ease',
              }}>
                {label}
              </span>
            </div>
            {i < total - 1 && (
              <div style={{
                flex: 1,
                height: '1px',
                background: done ? 'var(--accent-gold)' : 'var(--border-mid)',
                margin: '0 0.5rem',
                marginBottom: '1.2rem',
                transition: 'background 0.4s ease',
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// Main page
// ────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    fullName: '', email: '', phone: '',
    service: '', preferredDate: '', sessionNotes: '',
  })
  const [step, setStep] = useState(1) // 1=Service, 2=Details, 3=Review
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Original submit logic — UNCHANGED
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

  const selectedService = SERVICES_OPTIONS.find(s => s.value === form.service)

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '1rem 1.1rem',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-subtle)',
    color: 'var(--text-primary)',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '16px',
    fontWeight: 300,
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    colorScheme: 'dark',
    appearance: 'none',
    WebkitAppearance: 'none',
  }

  const focusHandlers = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = 'var(--accent-gold)'
      e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-gold-glow)'
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = 'var(--border-subtle)'
      e.currentTarget.style.boxShadow = 'none'
    },
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--nav-height)' }}>

        {/* ── Page Hero ── */}
        <section style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', padding: '4rem 2.5rem 3rem' }}>
          <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
            <motion.span className="section-label" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              Begin Your Session
            </motion.span>
            <motion.h1
              className="section-heading"
              variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '0.75rem' }}
            >
              Book a Session
            </motion.h1>
            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
              style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '440px' }}
            >
              Tell us about your vision and we'll craft the perfect studio experience for you.
            </motion.p>
          </div>
        </section>

        {/* ── Main content ── */}
        <section style={{ padding: 'var(--section-padding) 2.5rem', background: 'var(--bg-primary)', minHeight: '60vh' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '5rem', alignItems: 'start' }}
            className="contact-grid"
          >

            {/* ── Left — contact info ── */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0}>
              <div className="gold-rule" />
              <span className="section-label">Studio Info</span>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '2rem', lineHeight: 1.2 }}>
                We'd love to work<br />with you.
              </h2>

              {/* Info items */}
              {[
                { label: 'Address', value: 'Solalina Studios\nYenagoa, Bayelsa State, Nigeria.', href: undefined },
                { label: 'Phone', value: '+234 (0) 806 000 0000', href: 'tel:+2348060000000' },
                { label: 'Email', value: 'bookings@solalina.com', href: 'mailto:bookings@solalina.com' },
                { label: 'Instagram', value: '@solalina.studios', href: 'https://instagram.com/solalina.studios' },
              ].map(item => (
                <div
                  key={item.label}
                  style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingLeft: '1rem', borderLeft: '2px solid var(--border-accent)' }}
                >
                  <span className="section-label" style={{ marginBottom: '0.35rem' }}>{item.label}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textDecoration: 'none', display: 'block', lineHeight: 1.7, transition: 'color 0.2s ease' }}
                      onMouseOver={e => (e.currentTarget.style.color = 'var(--accent-gold)')}
                      onMouseOut={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', whiteSpace: 'pre-line', lineHeight: 1.7 }}>{item.value}</p>
                  )}
                </div>
              ))}

              {/* Mini map link */}
              <a
                href="https://www.google.com/maps/place/SOLALINA+STUDIOS/@4.9215245,6.3054213,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ fontSize: '0.65rem', padding: '0.6rem 1.25rem', marginTop: '0.5rem' }}
              >
                Get Directions →
              </a>
            </motion.div>

            {/* ── Right — multi-step form ── */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0.2}>

              {status === 'success' ? (
                /* ── SUCCESS STATE ── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ border: '1px solid var(--border-accent)', padding: '3.5rem 3rem', textAlign: 'center', background: 'var(--bg-card)', position: 'relative', overflow: 'hidden' }}
                >
                  {/* Gold glow */}
                  <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, var(--accent-gold-glow) 0%, transparent 70%)', pointerEvents: 'none' }} />

                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    style={{ display: 'block', fontSize: '2.5rem', marginBottom: '1.25rem', color: 'var(--accent-gold)' }}
                  >
                    ✦
                  </motion.span>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '2rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                    Booking Request Received
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.8, maxWidth: '360px', margin: '0 auto 2rem' }}>
                    Your booking request has been received. We'll be in touch within 24 hours to confirm your session.
                  </p>
                  {/* Summary */}
                  <div style={{ border: '1px solid var(--border-subtle)', padding: '1.5rem', background: 'var(--bg-secondary)', textAlign: 'left', marginBottom: '1.5rem' }}>
                    {selectedService && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span className="section-label" style={{ margin: 0 }}>Service</span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>{selectedService.label}</span>
                      </div>
                    )}
                    {form.preferredDate && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span className="section-label" style={{ margin: 0 }}>Preferred Date</span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>{new Date(form.preferredDate).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className="section-label" style={{ margin: 0 }}>Name</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>{form.fullName}</span>
                    </div>
                  </div>
                </motion.div>

              ) : (
                /* ── MULTI-STEP FORM ── */
                <form onSubmit={handleSubmit}>
                  <StepIndicator current={step} total={3} />

                  <AnimatePresence mode="wait">

                    {/* ── STEP 1: Select Service ── */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                          Select Your Service
                        </h3>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-label)', marginBottom: '1.75rem', fontFamily: 'DM Sans, sans-serif' }}>
                          Choose the type of session you'd like to book.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                          {SERVICES_OPTIONS.map(svc => (
                            <button
                              key={svc.value}
                              type="button"
                              onClick={() => setForm(prev => ({ ...prev, service: svc.value }))}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.25rem',
                                padding: '1.1rem 1.4rem',
                                border: `1px solid ${form.service === svc.value ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                                background: form.service === svc.value ? 'var(--accent-gold-glow)' : 'var(--bg-card)',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.25s ease',
                                width: '100%',
                              }}
                              onMouseOver={e => {
                                if (form.service !== svc.value) {
                                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-accent)'
                                }
                              }}
                              onMouseOut={e => {
                                if (form.service !== svc.value) {
                                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-subtle)'
                                }
                              }}
                            >
                              <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{svc.icon}</span>
                              <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                                  <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}>{svc.label}</span>
                                  <span style={{ fontSize: '0.68rem', color: 'var(--accent-gold)', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.05em' }}>{svc.price}</span>
                                </div>
                                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>{svc.desc}</span>
                              </div>
                              {/* Selected indicator */}
                              <div style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                border: `1px solid ${form.service === svc.value ? 'var(--accent-gold)' : 'var(--border-mid)'}`,
                                background: form.service === svc.value ? 'var(--accent-gold)' : 'transparent',
                                flexShrink: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.6rem',
                                color: 'var(--text-inverse)',
                                transition: 'all 0.25s ease',
                              }}>
                                {form.service === svc.value && '✓'}
                              </div>
                            </button>
                          ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                          <button
                            type="button"
                            className="btn-gold-fill"
                            disabled={!form.service}
                            onClick={() => setStep(2)}
                            style={{ opacity: form.service ? 1 : 0.4, cursor: form.service ? 'pointer' : 'not-allowed' }}
                          >
                            Continue
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                            </svg>
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ── STEP 2: Details ── */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                      >
                        <div>
                          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                            Your Details
                          </h3>
                          <p style={{ fontSize: '0.82rem', color: 'var(--text-label)', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>
                            Selected: <span style={{ color: 'var(--accent-gold)' }}>{selectedService?.label}</span>
                          </p>
                        </div>

                        {[
                          { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Chukwuemeka Obi' },
                          { name: 'email', label: 'Email Address', type: 'email', placeholder: 'hello@example.com' },
                          { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+234 801 234 5678' },
                        ].map(field => (
                          <div key={field.name}>
                            <label className="form-label">{field.label}</label>
                            <input
                              type={field.type}
                              name={field.name}
                              value={(form as any)[field.name]}
                              onChange={handleChange}
                              placeholder={field.placeholder}
                              required
                              style={inputStyle}
                              {...focusHandlers}
                            />
                          </div>
                        ))}

                        <div>
                          <label className="form-label">Preferred Date</label>
                          <input
                            type="date"
                            name="preferredDate"
                            value={form.preferredDate}
                            onChange={handleChange}
                            required
                            min={new Date().toISOString().split('T')[0]}
                            style={{ ...inputStyle, colorScheme: 'dark' }}
                            {...focusHandlers}
                          />
                        </div>

                        <div>
                          <label className="form-label">Session Notes</label>
                          <textarea
                            name="sessionNotes"
                            value={form.sessionNotes}
                            onChange={handleChange}
                            placeholder="Tell us about your session, references, requirements..."
                            rows={4}
                            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.75 } as React.CSSProperties}
                            {...focusHandlers}
                          />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
                          <button type="button" className="btn-ghost" onClick={() => setStep(1)} style={{ fontSize: '0.68rem' }}>
                            ← Back
                          </button>
                          <button
                            type="button"
                            className="btn-gold-fill"
                            disabled={!form.fullName || !form.email || !form.phone || !form.preferredDate}
                            onClick={() => setStep(3)}
                            style={{ opacity: (form.fullName && form.email && form.phone && form.preferredDate) ? 1 : 0.4, cursor: (form.fullName && form.email && form.phone && form.preferredDate) ? 'pointer' : 'not-allowed' }}
                          >
                            Review Booking
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                            </svg>
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ── STEP 3: Review + Submit ── */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                          Confirm Your Booking
                        </h3>

                        {/* Summary card */}
                        <div style={{ border: '1px solid var(--border-accent)', background: 'var(--bg-card)', padding: '1.75rem', marginBottom: '1.75rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
                            <span style={{ fontSize: '1.5rem' }}>{selectedService?.icon}</span>
                            <div>
                              <span style={{ display: 'block', fontSize: '1rem', fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: 'var(--text-primary)' }}>
                                {selectedService?.label}
                              </span>
                              <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontFamily: 'DM Sans, sans-serif' }}>
                                {selectedService?.price}
                              </span>
                            </div>
                          </div>

                          {[
                            { label: 'Name', value: form.fullName },
                            { label: 'Email', value: form.email },
                            { label: 'Phone', value: form.phone },
                            { label: 'Preferred Date', value: form.preferredDate ? new Date(form.preferredDate).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '' },
                            ...(form.sessionNotes ? [{ label: 'Notes', value: form.sessionNotes }] : []),
                          ].map(item => (
                            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.85rem', paddingBottom: '0.85rem', borderBottom: '1px solid var(--border-subtle)' }}>
                              <span className="section-label" style={{ margin: 0, flexShrink: 0 }}>{item.label}</span>
                              <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)', textAlign: 'right', lineHeight: 1.5 }}>{item.value}</span>
                            </div>
                          ))}
                        </div>

                        {status === 'error' && (
                          <p style={{ fontSize: '0.8rem', color: '#e05c5c', padding: '0.85rem 1rem', border: '1px solid rgba(224,92,92,0.3)', background: 'rgba(224,92,92,0.05)', marginBottom: '1rem' }}>
                            {errorMsg}
                          </p>
                        )}

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
                          <button type="button" className="btn-ghost" onClick={() => setStep(2)} style={{ fontSize: '0.68rem' }}>
                            ← Edit Details
                          </button>
                          <button
                            type="submit"
                            className="btn-gold-fill"
                            disabled={status === 'loading'}
                            style={{ opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer', minWidth: '180px', justifyContent: 'center' }}
                          >
                            {status === 'loading' ? (
                              <>
                                <svg style={{ animation: 'spin 1s linear infinite' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                                </svg>
                                Submitting...
                              </>
                            ) : (
                              <>
                                Confirm Booking ✦
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
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
