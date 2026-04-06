# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-05)

**Core value:** Every page must load fast, rank well, and convert visitors into phone calls or form submissions.
**Current focus:** Phase 7 — Manual QA and Verification

## Current Position

Phase: 7 of 7 (Manual QA and Verification)
Plan: 1 of 2 complete in current phase (Plan 07-01 COMPLETE — Lighthouse audit + WCAG fixes)
Status: In progress — 07-01 complete, 07-02 (human verify) is next
Last activity: 2026-04-06 — Completed 07-01 (WCAG contrast fixes, full code audit, lighthouse-results.md)

Progress: [██████████████] ~93%

## Performance Metrics

**Velocity:**
- Total plans completed: 9
- Average duration: ~4 min
- Total execution time: ~38 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 3/3 | 17 min | ~6 min |
| 02-seo-infrastructure | 2/2 | ~4 min | ~2 min |
| 03-homepage | 2/2 | ~7 min | ~3.5 min |
| 04-service-pages | 2/2 | ~7 min | ~3.5 min |
| 05-service-area-pages | 2/2 | ~4 min | ~2 min |
| 06-about-and-contact | 2/2 | ~16 min | ~8 min |

**Recent Trend:**
- Last 5 plans: 03-02 (3 min), 04-01 (4 min), 04-02 (3 min), 05-01+05-02 (~4 min), 06-01 (~7 min)
- Trend: Fast execution — Wave 1 plans often pre-build Wave 2 scope

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Init]: Next.js App Router with SSG — every page pre-rendered; only contact form uses a Route Handler
- [Init]: next/font/google for Bitter + Nunito Sans — highest-impact LCP optimization; never use link tags
- [Init]: No component libraries (no shadcn/ui, no framer-motion) — client JS budget under 30KB
- [Init]: Resend for contact form email — Gmail SMTP blocked on Vercel serverless
- [01-01]: Tailwind v4 is already default in create-next-app@16 — no manual upgrade needed
- [01-01]: Sharp installed as runtime dep (not devDep) — works on Vercel which auto-installs it anyway
- [01-01]: Vercel connection requires manual dashboard setup — CLI not authenticated
- [01-02]: Scroll shadow lives in MobileNav useEffect — avoids a separate HeaderScrollWatcher component
- [01-02]: Services dropdown uses CSS group-hover — no JS state, zero client bundle cost
- [01-02]: MobileCTA is a Server Component — it's just a link, no 'use client' needed
- [01-02]: Footer mobile padding delegated to body's pb-20 md:pb-0 (set in 01-01)
- [01-03]: 4 services chosen: drain-cleaning, water-heaters, sewer-line-repair, emergency-plumbing
- [01-03]: 8 areas: omaha, bellevue, papillion, la-vista, ralston, elkhorn, gretna, bennington
- [01-03]: meta descriptions 144-156 chars (±5 variance from 150-155 target — acceptable)
- [01-03]: testimonials.serviceType[] enables per-service page filtering without a database
- [02-01]: JSON-LD via plain <script dangerouslySetInnerHTML> — next/Script causes RSC payload duplication
- [02-01]: Plumber @type used (more specific than generic LocalBusiness) for schema classification
- [02-01]: as unknown as WithContext<T> casting for schema-dts strict union types on nested objects
- [02-01]: BUSINESS constant in business.ts is single source of truth — never hardcode in generators
- [02-02]: Native MetadataRoute.Sitemap/Robots used — no next-sitemap package (redundant for App Router)
- [02-02]: opengraph-image.png placed in app/ not public/ — Next.js auto-detection requires app/ placement
- [02-02]: generatePageMetadata() takes relative path; metadataBase in layout.tsx resolves to full URL
- [02-02]: 'as const' on changeFrequency in .map() callbacks prevents TS literal widening
- [03-01]: Proof stats bar moves INSIDE hero adjacent to CTA — not a separate section (locked context decision)
- [03-01]: Wave SVG fill=#ffffff to match white Services section below (not off-white from HTML prototype)
- [03-01]: metadata.title = 'Plumber in Omaha, NE' only — template appends company name; full string causes duplication
- [03-01]: yearsInBusiness computed dynamically from current year — stat auto-updates annually
- [03-01]: All 4 homepage sections fully built in Plan 01 (not deferred to Plan 02)
- [03-01]: Service icon map: Record<slug, ReactNode> pattern for icon-to-service association
- [03-01]: StarRating as server-rendered SVG function — zero client JS cost
- [03-02]: ScrollReveal wraps section content inside container div (not the section element) — preserves semantic HTML
- [03-02]: 03-01 built all sections; 03-02 scope was adding scroll reveal animation only (expected per Wave 1 decision)
- [04-01]: isEmergency = service.slug === 'emergency-plumbing' — single boolean drives all conditional styling, no separate component
- [04-01]: 24/7 alert strip added above banner on emergency page — ensures urgency is above-fold on all screen sizes
- [04-01]: /services index created as Rule 2 fix — breadcrumb schema + nav both reference /services URL, would 404 without it
- [04-01]: Sticky sidebar on description section (lg:sticky lg:top-6) for pricing callout + CTA visible while reading paragraphs
- [04-01]: CSS FAQ accordion: <details>/<summary> with group-open:rotate-45 on + icon — zero JS, no hydration cost
- [04-02]: Wave 2 plan was verification-only — 04-01 pre-built entire 04-02 scope in a single execution
- [04-02]: Three JSON-LD schemas per service page render at JSX root (before banner) — crawler-visible immediately
- [05-01]: SERVICE_ICONS map duplicated in area page (same pattern as Phase 4 — no shared file extraction, accepted shortcut)
- [05-01]: /services index was also missing from sitemap — added alongside /service-areas as a one-line fix (Rule 2)
- [05-01]: No FAQ on area pages — AreaData has no faqs field; areaFacts[] used as callout box instead
- [05-01]: Area page structure: banner → neighborhoods → localContext+facts → services grid → We Also Serve → bottom CTA
- [06-01]: BUSINESS.email added to both interface and constant — Plan 02 route handler imports from here, never hardcodes
- [06-01]: buildLeadEmail uses plain HTML string with inline styles — no React Email dependency for single lead notification
- [06-01]: escapeHtml() wraps ALL user-supplied fields before HTML interpolation — XSS prevention without a library
- [06-01]: About page is pure Server Component — zero client JS cost, no 'use client'
- [06-01]: Owner avatar: teal circle with initial "M" — no external image dependency for owner spotlight card
- [06-02]: Lazy Resend init inside POST handler body — module-scope constructor throws during build-time page collection when API key missing
- [06-02]: ContactForm uses hardcoded service option strings — avoids pulling full services data module into client bundle for a select dropdown
- [06-02]: Honeypot returns 200 { success: true } silently — bots can't detect the protection triggered, reducing adaptive attacks
- [06-02]: Server-side validation mirrors client-side rules — defense in depth; required even when client validates first
- [07-01]: Copper scale shifted darker (base #b8733a → #8f5a2c) so white-on-copper buttons AND small copper text both pass WCAG AA 4.5:1
- [07-01]: text-muted darkened (#6e847b → #596e67) — was failing 4.5:1 on white (4.00), now 5.45:1
- [07-01]: copper-light set to old copper value (#b8733a) for dark-bg-only use; passes 3:1 large text (4.41:1 on dark)
- [07-01]: Lighthouse audit via code analysis when CLI unavailable — node.js contrast math + grep-based structural checks

### Pending Todos

- [ ] Andrew: Connect GitHub repo to Vercel via dashboard (see 01-01-SUMMARY.md User Setup section)
- [ ] Andrew: Add RESEND_API_KEY to Vercel env vars (Vercel Dashboard → Project → Settings → Environment Variables)
- [ ] Andrew: Add RESEND_FROM_EMAIL to Vercel env vars (use onboarding@resend.dev initially; update after domain verification)
- [ ] Andrew: Verify heartlandplumbingomaha.com domain in Resend (Resend Dashboard → Domains → add SPF/DKIM to Namecheap DNS)

### Blockers/Concerns

- [Phase 6 ACTIVE]: Resend API key must be added to Vercel dashboard before testing live form — /api/contact returns 500 "Email not configured" without it
- [General]: Tailwind v4 + @tailwindcss/typography compatibility unconfirmed — run `npm show @tailwindcss/typography version` before install; fall back to Tailwind v3.4.x if needed
- [Phase 2+]: Vercel not yet connected — must be done before first deploy of layout shell
- [RESOLVED]: Footer Millard→Bennington slug mismatch fixed in orchestrator commit 8f7b31a
- [RESOLVED 01-03]: Area content briefs no longer needed — all 8 areas have unique content authored in service-areas.ts

## Session Continuity

Last session: 2026-04-06T03:25:00Z
Stopped at: 07-01 complete. WCAG contrast fixes committed (3d19441, 63dea87) and pushed to master. Next: 07-02 (human verify — Andrew visits live site, checks all pages, form, mobile).
Resume file: None
