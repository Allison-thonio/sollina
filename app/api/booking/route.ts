import nodemailer from 'nodemailer';

// In-memory rate limiting store
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 10 * 60 * 1000 })
    return true
  }

  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 10 * 60 * 1000 })
    return true
  }

  if (record.count >= 3) {
    return false
  }

  record.count++
  return true
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateNigerianPhone(phone: string): boolean {
  // Accept formats: +234... or 0...
  const phoneRegex = /^(\+234|0)[789]\d{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

function validateNotInPast(dateString: string): boolean {
  const preferredDate = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return preferredDate >= today
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Validate form data
    const { fullName, email, phone, service, preferredDate, sessionNotes, ownerEmail } = body;
    const trimmedOwnerEmail = ownerEmail?.trim();

    // Strip whitespace
    const trimmedFullName = fullName?.trim() || ''
    const trimmedEmail = email?.trim() || ''
    const trimmedPhone = phone?.trim() || ''
    const trimmedService = service?.trim() || ''
    const trimmedPreferredDate = preferredDate?.trim() || ''
    const trimmedSessionNotes = sessionNotes?.trim() || ''

    // Required field validation
    if (!trimmedFullName || !trimmedEmail || !trimmedPhone || !trimmedService || !trimmedPreferredDate) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    if (!validateEmail(trimmedEmail)) {
      return Response.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Phone validation (Nigerian formats)
    if (!validateNigerianPhone(trimmedPhone)) {
      return Response.json(
        { error: 'Invalid phone number. Use Nigerian format: +234... or 0...' },
        { status: 400 }
      )
    }

    // Date validation (not in past)
    if (!validateNotInPast(trimmedPreferredDate)) {
      return Response.json(
        { error: 'Preferred date cannot be in the past' },
        { status: 400 }
      )
    }

    // Length validations
    if (trimmedFullName.length > 100) {
      return Response.json(
        { error: 'Full name must be 100 characters or less' },
        { status: 400 }
      )
    }

    if (trimmedSessionNotes.length > 1000) {
      return Response.json(
        { error: 'Session notes must be 1000 characters or less' },
        { status: 400 }
      )
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'solalinastudiouse@gmail.com',
        pass: process.env.EMAIL_PASS
      }
    })

    // Setup email data
    const recipientEmail = trimmedOwnerEmail || 'allisonfezyy@gmail.com';
    const mailOptions = {
      from: process.env.EMAIL_USER || 'solalinastudiouse@gmail.com',
      to: recipientEmail,
      subject: `New Booking Request: ${trimmedService} for ${trimmedFullName}`,
      text: `
You have received a new booking request from Sollina Studios website.

Details:
- Full Name: ${trimmedFullName}
- Email: ${trimmedEmail}
- Phone: ${trimmedPhone}
- Service Requested: ${trimmedService}
- Preferred Date: ${trimmedPreferredDate}
- Session Notes: ${trimmedSessionNotes || 'None'}
      `,
      html: `
        <h2>New Booking Request</h2>
        <p>You have received a new booking request from the Sollina Studios website.</p>
        <table border="1" cellpadding="10" style="border-collapse: collapse;">
          <tr><td><strong>Full Name</strong></td><td>${trimmedFullName}</td></tr>
          <tr><td><strong>Email</strong></td><td>${trimmedEmail}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${trimmedPhone}</td></tr>
          <tr><td><strong>Service</strong></td><td>${trimmedService}</td></tr>
          <tr><td><strong>Preferred Date</strong></td><td>${trimmedPreferredDate}</td></tr>
          <tr><td><strong>Session Notes</strong></td><td>${trimmedSessionNotes || 'None'}</td></tr>
        </table>
      `
    }

    // Send the email
    await transporter.sendMail(mailOptions)
    console.log('[Booking] Email sent successfully for:', trimmedFullName)

    return Response.json(
      { message: 'Booking request received successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Booking] Error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
