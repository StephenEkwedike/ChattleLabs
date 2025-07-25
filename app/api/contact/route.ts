import { type NextRequest, NextResponse } from "next/server"

// Airtable configuration (fallback if not configured)
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID || "Leads"
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY

export async function POST(request: NextRequest) {
  try {
    console.log('Contact form API called')
    const body = await request.json()
    console.log('Request body:', body)
    const { name, email, phone, business, industry, leadSource, message } = body

    // Validate required fields
    if (!name || !email || !phone || !business || !industry || !leadSource) {
      console.error('Missing required fields:', { name, email, phone, business, industry, leadSource })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Try Airtable first if configured
    if (AIRTABLE_BASE_ID && AIRTABLE_API_KEY) {
      try {
        console.log('Attempting Airtable submission...')
        const airtableResponse = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              Name: name,
              Email: email,
              Phone: phone,
              Business: business,
              Industry: industry,
              "Lead Source": leadSource,
              Message: message || "",
              Status: "New Lead",
              "Created At": new Date().toISOString(),
            },
          }),
        })

        if (airtableResponse.ok) {
          const airtableData = await airtableResponse.json()
          console.log('Successfully submitted to Airtable:', airtableData.id)
          return NextResponse.json({
            success: true,
            recordId: airtableData.id,
            method: 'airtable'
          })
        } else {
          console.error('Airtable failed, falling back to console logging')
        }
      } catch (airtableError) {
        console.error('Airtable error, falling back:', airtableError)
      }
    }

    // Fallback: Log to console (Vercel logs)
    console.log('=== NEW LEAD SUBMISSION ===')
    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Phone:', phone)
    console.log('Business:', business)
    console.log('Industry:', industry)
    console.log('Lead Source:', leadSource)
    console.log('Message:', message)
    console.log('Timestamp:', new Date().toISOString())
    console.log('=== END LEAD ===')

    // You can check these logs in Vercel dashboard under Functions tab
    return NextResponse.json({
      success: true,
      method: 'console',
      message: 'Form submitted successfully. Check Vercel logs for details.'
    })

  } catch (error) {
    console.error("Contact form submission error:", error)
    return NextResponse.json({ 
      error: "Failed to submit form", 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}