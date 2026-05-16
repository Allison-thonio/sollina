export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // FIX 9 — validate form data
    const { fullName, email, phone, service, preferredDate, sessionNotes } = body
    
    if (!fullName || !email || !phone || !service || !preferredDate) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // TODO (Firebase): replace this with actual Firestore save
    // For now, just log and return success
    console.log('[Booking] New booking request:', {
      fullName,
      email,
      phone,
      service,
      preferredDate,
      sessionNotes,
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
