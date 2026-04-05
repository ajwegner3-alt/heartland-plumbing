---
phase: 03-homepage
plan: 02
subsystem: ui
tags: [nextjs, react, tailwind, server-components, scroll-animation, homepage]

# Dependency graph
requires:
  - phase: 03-01
    provides: Complete homepage with all 5 sections, ScrollReveal client island, StarRating function, SERVICE_ICONS map

provides:
  - ScrollReveal animation wrapping all 4 below-fold homepage sections
  - Services grid with IntersectionObserver scroll reveal
  - Trust signals section with IntersectionObserver scroll reveal
  - Testimonials section with IntersectionObserver scroll reveal
  - Service areas section with IntersectionObserver scroll reveal
  - Cleanup of Plan 03-02 placeholder comment labels in section headers

affects:
  - 04-service-pages (scroll reveal pattern established, reuse ScrollReveal on content sections)
  - 05-area-pages (same pattern applies)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "ScrollReveal wraps section content (not the section element) inside the container div"
    - "4 import + 4 open + 4 close = 8 ScrollReveal tags per page — one per below-fold section"

key-files:
  created: []
  modified:
    - src/app/page.tsx

key-decisions:
  - "Wave 1 (03-01) fully built all 5 sections — 03-02 added scroll reveal animation only"
  - "ScrollReveal wraps inner content div, not the <section> element — preserves section aria-label and semantic structure"
  - "Single atomic commit covers both tasks since all edits were structurally uniform and build-verified together"

patterns-established:
  - "ScrollReveal placement: inside container div, wrapping header + grid together as one animated unit"

# Metrics
duration: 3min
completed: 2026-04-05
---

# Phase 03 Plan 02: Homepage Remaining Sections Summary

**ScrollReveal IntersectionObserver scroll animations added to all 4 below-fold homepage sections — services grid, trust signals, testimonials, and service areas all fade-in on scroll with prefers-reduced-motion support.**

## Performance

- **Duration:** 3 min
- **Started:** 2026-04-05T23:14:36Z
- **Completed:** 2026-04-05T23:17:00Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Imported ScrollReveal client island (created in 03-01) into page.tsx
- Wrapped services grid section content in ScrollReveal — heading + service cards animate in on scroll
- Wrapped trust signals section content in ScrollReveal — heading + stat cards + CTA animate in on scroll
- Wrapped testimonials section content in ScrollReveal — heading + review cards animate in on scroll
- Wrapped service areas section content in ScrollReveal — heading + area links + CTA animate in on scroll
- All sections already verified complete from 03-01 — plan truth conditions fully satisfied
- Build passes zero errors, pushed to remote (master)

## Task Commits

1. **Task 1 + Task 2: Add ScrollReveal to all below-fold homepage sections** - `0051720` (feat)

**Plan metadata:** (in final docs commit)

## Files Created/Modified

- `src/app/page.tsx` - Added ScrollReveal import and wrapped all 4 below-fold sections with scroll animation

## Decisions Made

- Wave 1 executor (03-01) built all 5 sections completely — 03-02 scope reduced to adding ScrollReveal animation only. This is the correct outcome per the locked decision in STATE.md.
- ScrollReveal wraps the inner content (heading + grid together), not the `<section>` element, to preserve semantic HTML structure and section aria-labels.
- Tasks 1 and 2 committed in a single atomic commit since the changes were structurally identical (ScrollReveal wrapping) and build was verified once after all 4 edits.

## Deviations from Plan

None — plan executed within its stated intent. The objective (all 5 sections complete with scroll reveal and working internal links) was already satisfied by 03-01 except for the ScrollReveal animation wrapping, which this plan added.

## Issues Encountered

None — `npm run build` passed on first attempt after all edits. No TypeScript errors.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Homepage is fully complete with all 5 sections, correct background alternation, working internal links, schema injection, metadata, and scroll animations
- Phase 04 (service pages) can begin immediately
- ScrollReveal pattern is established: import from `@/components/ScrollReveal`, wrap section content inside container div
- Service icon map (SERVICE_ICONS), StarRating function, and featuredTestimonials selection pattern are all available in page.tsx as reference for Phase 04-05

---
*Phase: 03-homepage*
*Completed: 2026-04-05*
