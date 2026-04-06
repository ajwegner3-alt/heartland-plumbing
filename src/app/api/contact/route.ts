import { Resend } from 'resend'
import { BUSINESS } from '@/lib/data/business'
import { buildLeadEmail } from '@/lib/email/lead-notification'

export async function POST(request: Request) {
  // Guard: API key must be configured
  if (!process.env.RESEND_API_KEY) {
    console.error('[contact/route] RESEND_API_KEY is not set.')
    return Response.json({ error: 'Email not configured.' }, { status: 500 })
  }

  // Initialize Resend inside handler — defers to runtime so build succeeds without the key
  const resend = new Resend(process.env.RESEND_API_KEY)

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const service = typeof body.service === 'string' ? body.service.trim() : ''
  const zip = typeof body.zip === 'string' ? body.zip.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  const gotcha = typeof body._gotcha === 'string' ? body._gotcha : ''

  // Honeypot check — return 200 silently to confuse bots
  if (gotcha) {
    return Response.json({ success: true })
  }

  // Server-side required field validation
  if (!name) {
    return Response.json({ error: 'Name is required.' }, { status: 400 })
  }
  if (!phone) {
    return Response.json({ error: 'Phone number is required.' }, { status: 400 })
  }
  if (phone.replace(/\D/g, '').length < 10) {
    return Response.json({ error: 'Phone number must have at least 10 digits.' }, { status: 400 })
  }

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Heartland Plumbing <onboarding@resend.dev>',
      to: [BUSINESS.email],
      subject: `New Lead: ${name} — ${service || 'General Inquiry'}`,
      html: buildLeadEmail({ name, phone, service, zip, message }),
    })

    if (error) {
      console.error('[contact/route] Resend error:', error)
      return Response.json({ error: 'Failed to send email. Please call us directly.' }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('[contact/route] Unexpected error:', err)
    return Response.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
