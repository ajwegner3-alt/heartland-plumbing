---
phase: 01-foundation
plan: 02
subsystem: layout
tags: [nextjs, tailwind, header, footer, mobile-nav, server-components, client-components]

# Dependency graph
requires:
  - 01-01 (brand tokens, font vars, pb-20 body class, project scaffold)
provides:
  - Sticky Server Component header with logo, desktop nav, services dropdown, phone CTA
  - MobileNav Client Component with hamburger toggle, slide drawer, scroll shadow effect
  - Server Component footer with 4-col grid (services, areas, hours, contact info)
  - MobileCTA fixed bottom bar (teal, md:hidden, tel: link)
  - Root layout.tsx wiring all four layout components around page content
affects:
  - 01-03 (data layer — layout shell already renders; data files can be consumed immediately)
  - All subsequent phases (every page inherits this layout from root layout.tsx)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Server Component header + Client Component MobileNav island — zero JS for static header"
    - "Scroll shadow via useEffect in MobileNav targeting #site-header by ID"
    - "CSS hover group pattern for desktop services dropdown — no JS"
    - "MobileCTA: Server Component with fixed bottom-0, md:hidden, shadow-mobile-cta token"

key-files:
  created:
    - src/components/layout/Header.tsx
    - src/components/layout/MobileNav.tsx
    - src/components/layout/Footer.tsx
    - src/components/layout/MobileCTA.tsx
  modified:
    - src/app/layout.tsx
    - src/app/page.tsx

key-decisions:
  - "Scroll shadow lives in MobileNav (already 'use client') — avoids creating a separate HeaderScrollWatcher component"
  - "Services dropdown implemented via CSS group-hover — no JS, no state"
  - "MobileCTA is a Server Component — it's just a link, no interaction state needed"
  - "Footer mobile padding handled by body's pb-20 md:pb-0 (set in 01-01) — no separate footer class needed"

patterns-established:
  - "All layout components imported and rendered in src/app/layout.tsx"
  - "Header > main > Footer > MobileCTA render order"
  - "Client Component islands stay minimal — MobileNav is the only 'use client' in layout"

# Metrics
duration: ~2min
completed: 2026-04-05
---

# Phase 1 Plan 2: Layout Shell Summary

**Sticky header with desktop nav + mobile hamburger, dark footer with service/area grid, and teal mobile CTA bar — all wired into root layout and deployed**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-04-05T19:21:05Z
- **Completed:** 2026-04-05T19:23:25Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Header is a Server Component (zero client JS) with sticky positioning, logo, desktop nav, services dropdown, and copper "Call Now" CTA button
- Services dropdown uses CSS group-hover pattern — shows all 4 service links with zero JavaScript
- MobileNav Client Component handles hamburger toggle with animated three-bar icon, slide drawer, and all nav links
- Scroll shadow effect lives inside MobileNav via `useEffect` — targets `#site-header` by ID, no separate wrapper component needed
- Footer covers all 4 columns: company info + phone, services links, 8 service area links, hours with 24/7 emergency callout
- MobileCTA is a pure Server Component (just a link) — fixed bottom-0, teal, hidden on md+
- Root layout wires Header > main > Footer > MobileCTA; body's existing `pb-20 md:pb-0` prevents footer content from hiding behind sticky bar
- All commits pushed to GitHub; Vercel auto-deploy triggered

## Task Commits

Each task was committed atomically:

1. **Task 1: Build Header and MobileNav** - `7b33952` (feat)
2. **Task 2: Build Footer, MobileCTA, wire root layout** - `5784b9f` (feat)

## Files Created/Modified

- `src/components/layout/Header.tsx` — Server Component; sticky header with logo, desktop nav, services dropdown, copper CTA
- `src/components/layout/MobileNav.tsx` — Client Component; hamburger toggle, slide drawer, scroll shadow effect
- `src/components/layout/Footer.tsx` — Server Component; 4-col grid, dark bg, emergency callout, license number
- `src/components/layout/MobileCTA.tsx` — Server Component; fixed teal bar, hidden on md+, tel: link
- `src/app/layout.tsx` — Updated to import and render all 4 layout components
- `src/app/page.tsx` — Placeholder confirming layout shell renders; will be replaced in Phase 3

## Decisions Made

- **Scroll shadow in MobileNav:** Rather than creating a separate `HeaderScrollWatcher` component, the `useEffect` scroll listener lives inside `MobileNav.tsx` (which is already `'use client'`). This keeps the component count minimal and avoids an invisible DOM-only component.
- **CSS-only services dropdown:** Used Tailwind's `group` / `group-hover` pattern for the services dropdown. No state, no `useEffect`, no JS bundle cost.
- **MobileCTA stays Server Component:** The plan noted it could be Server-only since it's just a link. Implemented as a Server Component — no `'use client'` directive needed.
- **Footer padding delegation:** Footer itself has no extra mobile padding. The `pb-20 md:pb-0` on `<body>` (set in 01-01) is sufficient to prevent the sticky CTA bar from covering content.

## Deviations from Plan

None — plan executed exactly as written.

## Next Phase Readiness

- Layout shell is live — Phase 2 (homepage hero and content sections) will render correctly inside Header/Footer
- All 4 service slugs and 8 area slugs are hardcoded in Footer and MobileNav — data layer (01-03) should match these slugs exactly
- `pb-20 md:pb-0` body class confirmed working — no content hidden behind sticky CTA bar

---
*Phase: 01-foundation*
*Completed: 2026-04-05*
