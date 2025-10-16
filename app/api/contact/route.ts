import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get IP address and user agent
    const ip_address = request.headers.get('x-forwarded-for') || 
                       request.headers.get('x-real-ip') || 
                       'unknown'
    const user_agent = request.headers.get('user-agent') || 'unknown'

    // Prepare data
    const submissionData = {
      name,
      email,
      phone: phone || null,
      subject,
      message,
      status: 'unread',
      ip_address,
      user_agent
    }

    console.log('Attempting direct REST API call...')

    // Use Supabase REST API directly
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const response = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(submissionData)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ REST API Error:', errorText)
      return NextResponse.json(
        { error: 'Failed to save submission', details: errorText },
        { status: 500 }
      )
    }

    const data = await response.json()
    console.log('✅ Contact form submitted successfully:', data)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for contacting us! We will get back to you soon.',
        data 
      },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('❌ Contact API Error:', error.message)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    )
  }
}