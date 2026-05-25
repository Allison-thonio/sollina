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
    const { fullName, email, phone, service, preferredDate, sessionNotes } = body

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

    // TODO (Firebase): replace this with actual Firestore save
    // For now, just log and return success
    console.log('[Booking] New booking request:', {
      fullName: trimmedFullName,
      email: trimmedEmail,
      phone: trimmedPhone,
      service: trimmedService,
      preferredDate: trimmedPreferredDate,
      sessionNotes: trimmedSessionNotes,
      submittedAt: new Date().toISOString(),
    })

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
