# Phase 6: About and Contact - Research

**Researched:** 2026-04-05
**Domain:** Next.js App Router Route Handler, Resend email API, form validation, honeypot spam protection
**Confidence:** HIGH (Resend API), HIGH (Route Handler pattern), MEDIUM (form validation approach)

---

## Summary

Phase 6 builds two pages: an About page (static, Server Component) and a Contact page containing the site's only interactive form and the only Route Handler in the project. The About page is straightforward — static content using existing BUSINESS constants and design tokens. The Contact page is the technical core: a React client component form that POSTs to `/api/contact`, which calls Resend to send a branded HTML notification email.

Resend is not yet installed (`package.json` confirms no Resend dependency). It must be added before anything works. Resend requires a **verified domain** before you can send from a custom `@heartlandplumbingomaha.com` address — without verification, sends are limited to `onboarding@resend.dev` as the from address, and the to address is restricted to only the account's own email. This means the live email flow depends on a manual step: Andrew must add DNS records to Namecheap and wait for Resend domain verification before the form delivers to `info@heartlandplumbingomaha.com`.

The CONTEXT.md locks in a Route Handler at `/api/contact` (not a Server Action). This is intentional — it is the only server-side endpoint in the project, and the contact form is a Client Component that manages inline success/error state with `useState`. The Route Handler + fetch pattern is the correct approach here since the form needs client-side state management for the inline success message.

**Primary recommendation:** Install `resend`, build a `'use client'` contact form component using `useState` for form state + success state, POST to `/api/contact` route handler with `fetch`, and verify the domain with Resend/Namecheap before live testing.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `resend` | latest (^4.x as of research) | Transactional email sending | Official SDK, works on Vercel serverless, no SMTP config needed |
| Next.js built-ins | 16.2.2 (already installed) | Route Handler (`app/api/contact/route.ts`) | Web API Request/Response, no extra packages |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| React `useState` | 19.2.4 (already installed) | Client-side form state + success/error display | This project — form is a Client Component |
| No React Email | — | Email template | Plain HTML string passed to Resend's `html` field is sufficient for a single branded notification |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Route Handler + fetch | Server Action + useActionState | Server Actions are modern best practice for forms, but require the form to be a Server Component boundary — the locked decision is Route Handler, and Client Component + fetch is a perfectly valid pattern |
| Plain HTML email string | `@react-email/components` | React Email is excellent for complex templates; for a single lead notification with a few fields, it adds a dependency with no meaningful benefit |
| Honeypot field only | reCAPTCHA, Cloudflare Turnstile | Third-party services add user friction and external dependencies; honeypot is zero-friction and sufficient for a local plumber site's volume |

**Installation:**
```bash
npm install resend
```

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── about/
│   │   └── page.tsx          # Server Component — static content
│   ├── contact/
│   │   └── page.tsx          # Server Component shell — imports ContactForm
│   └── api/
│       └── contact/
│           └── route.ts      # POST handler — validates, calls Resend
├── components/
│   └── ContactForm.tsx       # 'use client' — useState form with success state
└── lib/
    └── email/
        └── lead-notification.ts  # Branded HTML email template function
```

### Pattern 1: Route Handler (POST /api/contact)
**What:** An exported `POST` function in `app/api/contact/route.ts`. Reads JSON body, validates required fields, checks honeypot, calls Resend, returns JSON success/error.
**When to use:** The locked decision for this project.

```typescript
// Source: https://resend.com/docs/send-with-nextjs + Next.js route handler conventions
// app/api/contact/route.ts
import { Resend } from 'resend'
import { buildLeadEmail } from '@/lib/email/lead-notification'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Honeypot check — bots fill hidden field, humans leave it empty
    if (body._gotcha) {
      // Return 200 so bots don't know they were caught
      return Response.json({ success: true })
    }

    // Required field validation
    const { name, phone, service, zip, message } = body
    if (!name?.trim() || !phone?.trim()) {
      return Response.json(
        { error: 'Name and phone are required.' },
        { status: 400 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: 'Heartland Plumbing <noreply@heartlandplumbingomaha.com>',
      to: ['info@heartlandplumbingomaha.com'],
      subject: `New Lead: ${name.trim()} — ${service || 'Not specified'}`,
      html: buildLeadEmail({ name, phone, service, zip, message }),
    })

    if (error) {
      console.error('Resend error:', error)
      return Response.json({ error: 'Failed to send message.' }, { status: 500 })
    }

    return Response.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Contact route error:', err)
    return Response.json({ error: 'Server error.' }, { status: 500 })
  }
}
```

### Pattern 2: Client Component Form with Inline Success State
**What:** A `'use client'` component using `useState` for `status: 'idle' | 'submitting' | 'success' | 'error'`. On submit, prevents default, calls `fetch('/api/contact', { method: 'POST', ... })`, then transitions state.
**When to use:** When form needs inline state swap (success message replaces form) without page reload or redirect — the locked requirement.

```typescript
// Source: standard React pattern verified against Next.js 16 + React 19 conventions
'use client'
import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      })
      const json = await res.json()
      if (!res.ok) {
        setErrorMsg(json.error || 'Something went wrong.')
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setErrorMsg('Network error. Please call us directly.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <SuccessMessage /> // Green success panel — form unmounts
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot field — visually hidden, bots fill it, humans don't */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
      />
      {/* ... form fields ... */}
    </form>
  )
}
```

### Pattern 3: Branded HTML Email (plain string, no React Email)
**What:** A TypeScript function that returns an HTML string. Uses inline styles because email clients don't support external CSS or Tailwind classes.
**When to use:** Single notification email with known fields — no need for `@react-email/components`.

```typescript
// src/lib/email/lead-notification.ts
interface LeadData {
  name: string
  phone: string
  service?: string
  zip?: string
  message?: string
}

export function buildLeadEmail(data: LeadData): string {
  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; background: #f5f7f6; padding: 24px;">
      <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden;">
        <div style="background: #1a7a6e; padding: 24px;">
          <h1 style="color: white; margin: 0; font-size: 20px;">
            New Lead — Heartland Plumbing Co.
          </h1>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6e847b; font-size: 13px; width: 100px;">Name</td>
                <td style="padding: 8px 0; font-weight: bold;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #6e847b; font-size: 13px;">Phone</td>
                <td style="padding: 8px 0; font-weight: bold;">
                  <a href="tel:${data.phone}" style="color: #1a7a6e;">${data.phone}</a>
                </td></tr>
            <tr><td style="padding: 8px 0; color: #6e847b; font-size: 13px;">Service</td>
                <td style="padding: 8px 0;">${data.service || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0; color: #6e847b; font-size: 13px;">Zip</td>
                <td style="padding: 8px 0;">${data.zip || '—'}</td></tr>
          </table>
          ${data.message ? `<p style="margin-top: 16px; padding: 12px; background: #f5f7f6; border-radius: 4px;">${data.message}</p>` : ''}
        </div>
      </div>
    </body>
    </html>
  `
}
```

### Anti-Patterns to Avoid
- **Sending `html` containing user input without sanitization:** XSS in email body is low-risk but escape user strings with a simple helper (replace `<`, `>`, `&`) before interpolating into HTML.
- **Using Resend's `react` field without React Email:** The `react` field sends a React component rendered to HTML — but this requires proper JSX handling in route handlers. The `html` field with a plain string avoids this complexity entirely.
- **Throwing errors from the route handler instead of returning JSON:** `resend.emails.send()` returns `{ data, error }` and does not throw — always check the `error` property, don't rely on try/catch alone for Resend errors.
- **Creating the Resend client inside the request handler:** Initialize `const resend = new Resend(process.env.RESEND_API_KEY)` once at module scope, not inside POST — avoids per-request instantiation overhead.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Email delivery | Custom SMTP/Nodemailer | Resend SDK | Vercel serverless blocks outbound SMTP connections on port 25/587; Resend uses HTTPS API |
| Honeypot CSS hiding | Complex visibility tricks | `position: absolute; left: -9999px; opacity: 0` | Simple, effective, not caught by CSS parsers that check `display:none` |
| Phone validation | Full regex library | Simple regex + user-friendly message | Phone formats are highly varied; strict validation causes user friction |

**Key insight:** The entire email delivery problem is solved by Resend + a verified domain. The only "hard" part is the manual DNS verification step on Namecheap.

---

## Common Pitfalls

### Pitfall 1: Resend Domain Not Verified — Sends Silently Fail
**What goes wrong:** The route handler calls Resend, Resend returns an error because the from domain isn't verified, the error is logged but the user sees a success state.
**Why it happens:** Resend requires DNS records (SPF, DKIM) added to Namecheap before it will accept sends from `@heartlandplumbingomaha.com`. Without verification, sends to `info@heartlandplumbingomaha.com` are rejected.
**How to avoid:** During development/testing, use `onboarding@resend.dev` as the from address, and test delivery to the Resend account's own email only. Log the full error from Resend in the route handler console for debugging. Switch to the real domain after Andrew completes DNS setup.
**Warning signs:** `resend.emails.send()` returns `{ error: { message: 'You can only send testing emails to your own email address...' } }` or similar domain-related error.

### Pitfall 2: RESEND_API_KEY Not in Vercel Environment
**What goes wrong:** The route handler throws `Error: Missing API key` or sends unauthenticated, and the deployed form never delivers email.
**Why it happens:** `process.env.RESEND_API_KEY` is undefined at runtime if the key was not added to Vercel project settings.
**How to avoid:** Add a guard in the route handler: if `!process.env.RESEND_API_KEY` return a 500 immediately. Document the manual step clearly.
**Warning signs:** Route handler returns 500 on first deploy even though code looks correct.

### Pitfall 3: Honeypot Field Visible on Accessibility Tools / Autofill
**What goes wrong:** Screen readers announce the honeypot field; or browser autofill fills it; or the field is tab-reachable.
**Why it happens:** `display: none` alone is insufficient — some bots check for it. But fields hidden without `aria-hidden` are still announced.
**How to avoid:** Use `tabIndex={-1}`, `autoComplete="off"`, `aria-hidden="true"`, and absolute positioning off-screen. Do NOT use `display:none` (some bots skip those).

### Pitfall 4: Form Submits Twice (React 19 / Strict Mode)
**What goes wrong:** In development with React Strict Mode, effects run twice — but `handleSubmit` is triggered once per user action, not by effects. This is a non-issue for event handlers.
**Why it happens:** Confusion with `useEffect` double-firing in Strict Mode.
**How to avoid:** Non-issue for form submit handlers. No action needed.

### Pitfall 5: Phone Validation Too Strict
**What goes wrong:** Users type `402-555-0147` or `(402) 555-0147` and the form rejects them.
**Why it happens:** Regex requires a specific format.
**How to avoid:** Strip non-digits before validating length: `phone.replace(/\D/g, '').length >= 10`. Show helpful error: "Please enter a 10-digit phone number."

### Pitfall 6: Missing `email` Field in BUSINESS Constants
**What goes wrong:** The contact destination email `info@heartlandplumbingomaha.com` is hardcoded in the route handler instead of imported from BUSINESS constants.
**Why it happens:** The `BUSINESS` object in `src/lib/data/business.ts` does **not currently have an `email` field** — grep confirmed only phone/phoneHref/address fields exist.
**How to avoid:** Add `email: 'info@heartlandplumbingomaha.com'` to the BUSINESS object in `business.ts` as part of this phase, then import it in the route handler. Keeps the source of truth centralized.

---

## Code Examples

### Route Handler — Full Pattern
```typescript
// Source: https://resend.com/docs/send-with-nextjs (official docs)
// app/api/contact/route.ts
import { Resend } from 'resend'
import { buildLeadEmail } from '@/lib/email/lead-notification'
import { BUSINESS } from '@/lib/data/business'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    // Guard: API key must be present
    if (!process.env.RESEND_API_KEY) {
      return Response.json({ error: 'Email not configured.' }, { status: 500 })
    }

    const body = await request.json()

    // Honeypot: return success to fool bots
    if (body._gotcha) {
      return Response.json({ success: true })
    }

    // Required field validation
    const name = body.name?.trim()
    const phone = body.phone?.trim()
    if (!name || !phone) {
      return Response.json({ error: 'Name and phone are required.' }, { status: 400 })
    }

    // Phone length check (strip non-digits)
    if (phone.replace(/\D/g, '').length < 10) {
      return Response.json({ error: 'Please enter a valid 10-digit phone number.' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: `Heartland Plumbing <noreply@heartlandplumbingomaha.com>`,
      to: [BUSINESS.email],    // 'info@heartlandplumbingomaha.com' — add this field to business.ts
      subject: `New Lead: ${name} — ${body.service || 'General Inquiry'}`,
      html: buildLeadEmail({
        name,
        phone,
        service: body.service,
        zip: body.zip,
        message: body.message,
      }),
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return Response.json({ error: 'Failed to send. Please call us directly.' }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return Response.json({ error: 'Server error.' }, { status: 500 })
  }
}
```

### About Page — Static Server Component Pattern
```typescript
// app/about/page.tsx — matches existing page patterns in the project
import { generatePageMetadata } from '@/lib/metadata'
import { BUSINESS } from '@/lib/data/business'
import { JsonLd } from '@/components/JsonLd'
import { ScrollReveal } from '@/components/ScrollReveal'

export const metadata = generatePageMetadata({
  title: 'About Heartland Plumbing Co.',
  description: '...150-155 chars...',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <JsonLd data={/* LocalBusiness schema */} />
      {/* sections: hero, story, owner card, credentials badges, CTA */}
    </>
  )
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router API routes (`pages/api/contact.ts`) | App Router Route Handlers (`app/api/contact/route.ts`) | Next.js 13+ | Different export syntax, uses Web Request/Response APIs |
| `res.json()` (Pages Router) | `Response.json()` (App Router) | Next.js 13+ | Breaking difference — Pages Router pattern will not work in App Router |
| Nodemailer/SMTP | Resend / Postmark / SendGrid API | ~2022+ for Vercel | Vercel serverless blocks SMTP ports; API-based services are required |
| `useFormState` (React 18 experimental) | `useActionState` (React 19 stable) | React 19 release | Renamed and stabilized — but not relevant here since we use useState + fetch |

**Deprecated/outdated:**
- `pages/api/contact.ts` pattern: Only works in Pages Router. App Router uses `app/api/contact/route.ts`.
- `bodyParser: false` config: Not needed in App Router — request body is read directly via `request.json()`.

---

## Open Questions

1. **Resend domain verification timing**
   - What we know: Resend requires DNS records (SPF, DKIM) added to Namecheap before sending from `@heartlandplumbingomaha.com`. Verification can take minutes to 48 hours.
   - What's unclear: Whether the DNS propagation will be complete before Andrew wants to test the live form.
   - Recommendation: Plan a testing phase with `onboarding@resend.dev` as the from address. The route handler should use an env var `RESEND_FROM_EMAIL` that defaults to `onboarding@resend.dev` during dev and is overridden to `noreply@heartlandplumbingomaha.com` in Vercel after domain verification.

2. **BUSINESS.email field missing**
   - What we know: `src/lib/data/business.ts` does not have an `email` field. The destination address `info@heartlandplumbingomaha.com` needs to come from somewhere.
   - Recommendation: Add `email: 'info@heartlandplumbingomaha.com'` to the BUSINESS interface and constant as part of this phase's first task.

3. **XSS in email HTML**
   - What we know: User-submitted strings (name, message) are interpolated into the HTML email string.
   - Recommendation: Escape `<`, `>`, `&`, `"` in user input before HTML interpolation. A simple 4-line helper is sufficient — no library needed.

---

## Codebase Integration Notes

From reading the existing codebase:

- **Design tokens are in `src/app/globals.css`** — use `--color-primary: #1a7a6e`, `--color-dark: #1a1f1e`, `--color-border: #dce5e1`, etc. Both pages must use these Tailwind CSS variables.
- **Fonts:** `font-display` = Bitter (headings), `font-body` = Nunito Sans (body text). Both pages must follow this.
- **Form field styling reference** exists in `src/app/page.tsx` (hero form): `border border-border rounded-sm px-3.5 py-2.5 text-sm text-text-primary font-body placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition-colors` — the Contact page form should match this exactly.
- **Page structure:** All pages use `generatePageMetadata()` from `src/lib/metadata.ts` for metadata, `ScrollReveal` for animation, `JsonLd` for schema markup. About page needs LocalBusiness schema (already used on homepage — check for duplication vs. extending).
- **`BUSINESS` constants:** Contains license (`PL-28541`), yearsFounded (1998), rating, address, phone, hours — all needed for About page. Missing: `email` field (must add).
- **Hero form in `page.tsx`:** Already has a lead capture form with `action="/contact" method="GET"` — this should be updated to point to the Contact page properly after Phase 6 is complete.

---

## Sources

### Primary (HIGH confidence)
- `https://resend.com/docs/send-with-nextjs` — Official Resend + Next.js integration guide with route handler example
- `https://resend.com/docs/api-reference/emails/send-email` — Send email API: required fields, `from`, `to`, `subject`, `html`, `react`
- `https://resend.com/docs/dashboard/emails/send-test-emails` — Test addresses (`delivered@resend.dev`, etc.)
- Codebase reading: `package.json`, `src/lib/data/business.ts`, `src/app/globals.css`, `src/app/page.tsx`, `src/app/layout.tsx`, `src/components/layout/Footer.tsx`

### Secondary (MEDIUM confidence)
- WebSearch verified: Resend requires domain verification before sending from custom domain. Without it, only the Resend account's own email can receive. Free tier: 100/day, 3,000/month.
- WebSearch verified: Next.js App Router route handlers use `request.json()` to read body, `Response.json()` to respond — no `bodyParser` config needed.
- WebSearch verified: Honeypot implementation — hidden field with `tabIndex={-1}`, `aria-hidden="true"`, off-screen positioning. Server checks if field has value.

### Tertiary (LOW confidence)
- WebSearch: Server Actions with `useActionState` are the current recommended pattern for forms in 2026. Route Handler + `useState` + `fetch` is still fully valid and is the locked decision for this project.

---

## Metadata

**Confidence breakdown:**
- Standard stack (Resend, no React Email): HIGH — verified against official docs
- Architecture (Route Handler pattern, Client Component form): HIGH — matches official Next.js + Resend patterns
- Honeypot implementation: MEDIUM — well-established pattern, verified via multiple sources
- Resend domain verification requirement: HIGH — confirmed by official docs and multiple community sources
- About page (static Server Component): HIGH — identical pattern to existing pages in codebase

**Research date:** 2026-04-05
**Valid until:** 2026-07-05 (stable ecosystem, 90 days)
