import { type NextRequest, NextResponse } from "next/server"

// Airtable configuration
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
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Submit to Airtable
    console.log('Environment variables:', {
      AIRTABLE_BASE_ID,
      AIRTABLE_TABLE_ID,
      AIRTABLE_API_KEY: AIRTABLE_API_KEY ? 'Present' : 'Missing'
    })
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
          Source: leadSource,
          Status: "New Lead",
        },
      }),
    })

    if (!airtableResponse.ok) {
      const errorText = await airtableResponse.text()
      console.error('Airtable API error:', {
        status: airtableResponse.status,
        statusText: airtableResponse.statusText,
        body: errorText
      })
      throw new Error(`Failed to submit to Airtable: ${airtableResponse.status} ${airtableResponse.statusText}`)
    }

    const airtableData = await airtableResponse.json()
    console.log('Airtable response:', airtableData)

    return NextResponse.json({
      success: true,
      recordId: airtableData.id,
    })
  } catch (error) {
    console.error("Contact form submission error:", error)
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 })
  }
}

