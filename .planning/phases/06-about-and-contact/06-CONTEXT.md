# Phase 6: About and Contact - Context

**Gathered:** 2025-04-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Two pages: About page with company story, owner spotlight, and credentials badge cards. Contact page with form (name, phone required; service, zip optional), honeypot spam protection, inline success message, and Resend email notification with branded HTML and lead-notification subject line. The contact form is the only Route Handler in the entire site.

</domain>

<decisions>
## Implementation Decisions

### About Page Content & Layout
- Brief narrative: 2-3 paragraphs covering founding, mission, what sets Heartland apart
- Owner spotlight: single owner/founder card with name, title, brief bio — personal touch
- Credentials as badge cards: visual badge-style cards for Licensed (#PL-28541), Insured ($2M), BBB A+, etc.

### Contact Form Behavior
- Inline success message after submission — form replaces with green success message + "We'll call you within 1 hour", no page redirect
- Required fields: name and phone only — service and zip are optional (low friction)
- Phone format validation: Claude's discretion
- Honeypot field for spam protection — hidden field that bots fill out, no third-party services, no user friction

### Form Email Content
- Send to: info@heartlandplumbingomaha.com (from BUSINESS constants)
- Email format: branded HTML email with Heartland branding, formatted nicely
- Subject line: "New Lead: [Name] — [Service]" — scannable in inbox
- Email body should include all submitted fields: name, phone, service, zip, message

### Claude's Discretion
- About page section order and visual layout
- Phone format validation strictness
- Contact page layout (form placement, map placeholder, hours display)
- Resend "from" address configuration
- Whether to add the contact form to the hero on the homepage (it's already there from Phase 3)

</decisions>

<specifics>
## Specific Ideas

- BUSINESS constants in business.ts have the email, phone, address, hours — use for contact page display
- The homepage hero already has a lead capture form from Phase 3 — this Contact page is the standalone version
- Resend API key needs to be added to Vercel environment variables (manual step for Andrew)
- The Route Handler at /api/contact is the ONLY server-side endpoint in the entire site

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 06-about-and-contact*
*Context gathered: 2025-04-06*
