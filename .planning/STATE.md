# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-05)

**Core value:** Every page must load fast, rank well, and convert visitors into phone calls or form submissions.
**Current focus:** Phase 2 — SEO Infrastructure

## Current Position

Phase: 2 of 7 (SEO Infrastructure)
Plan: 2 of 2 in current phase (Phase 2 COMPLETE)
Status: Phase complete
Last activity: 2026-04-05 — Completed 02-02-PLAN.md (sitemap, robots, OG image, metadata helper)

Progress: [█████░░░░░] ~30%

## Performance Metrics

**Velocity:**
- Total plans completed: 5
- Average duration: 5 min
- Total execution time: ~21 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 3/3 | 17 min | ~6 min |
| 02-seo-infrastructure | 2/2 | ~4 min | ~2 min |

**Recent Trend:**
- Last 5 plans: 01-01 (6 min), 01-02 (2 min), 01-03 (9 min), 02-01 (~2 min), 02-02 (~2 min)
- Trend: SEO infrastructure plans fast — mostly file creation with build verification

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
- [02-02]: Native MetadataRoute.Sitemap/Robots used — no next-sitemap package (redundant for App Router)
- [02-02]: opengraph-image.png placed in app/ not public/ — Next.js auto-detection requires app/ placement
- [02-02]: generatePageMetadata() takes relative path; metadataBase in layout.tsx resolves to full URL
- [02-02]: 'as const' on changeFrequency in .map() callbacks prevents TS literal widening

### Pending Todos

- [ ] Andrew: Connect GitHub repo to Vercel via dashboard (see 01-01-SUMMARY.md User Setup section)

### Blockers/Concerns

- [Phase 2]: Resend API key must be added to Vercel dashboard before Phase 6 — test live form on first deploy, not locally
- [General]: Tailwind v4 + @tailwindcss/typography compatibility unconfirmed — run `npm show @tailwindcss/typography version` before install; fall back to Tailwind v3.4.x if needed
- [Phase 2+]: Vercel not yet connected — must be done before first deploy of layout shell
- [RESOLVED]: Footer Millard→Bennington slug mismatch fixed in orchestrator commit 8f7b31a
- [RESOLVED 01-03]: Area content briefs no longer needed — all 8 areas have unique content authored in service-areas.ts

## Session Continuity

Last session: 2026-04-05T22:00:41Z
Stopped at: Phase 2 complete. Both plans (02-01 schema generators, 02-02 sitemap/robots/OG/metadata) finished.
Resume file: None
