# Phase 3: Homepage - Context

**Gathered:** 2025-04-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Full homepage: hero section (adapted from existing HTML prototype), services grid, trust signals section, testimonials, service area overview, and breadcrumb. All wired with LocalBusiness + AggregateRating schema via the Phase 2 generators. This is the first content page — it validates all component patterns before they're replicated across service and area pages.

</domain>

<decisions>
## Implementation Decisions

### Hero Section Adaptation
- Proof/stats bar (25+ Years, 312 Reviews, etc.) stays INSIDE the hero section, adjacent to the CTA
- Hero fidelity, background treatment, and whether to include an inline form vs CTA buttons: Claude's discretion — port what works from the existing HTML, improve what doesn't

### Section Ordering & Density
- Sections alternate background colors for visual rhythm: white → off-white → white → dark pattern
- Section order and content density: Claude's discretion — pick the highest-converting flow for plumber sites

### Testimonial Presentation
- Card grid layout: 3 testimonial cards in a row on desktop
- Each card shows: quote text, customer name + city, gold star rating icons (filled/unfilled)
- Show 3 testimonials total on the homepage (not more)

### Trust Signals Section
- Icon + stat cards: 4 cards in a row (shield icon + "25+ Years", star icon + "4.9★ Rating", etc.)
- License #PL-28541 displayed as one of the trust signal cards
- Include a CTA alongside trust signals ("Call for a Free Estimate" button) to capitalize on credibility

### Claude's Discretion
- Hero fidelity level (exact port vs spirit match vs reimagined)
- Hero background (CSS gradient vs photo placeholder vs other)
- Hero form vs CTA buttons decision
- Section ordering (services → trust → testimonials → areas → CTA, or alternative flow)
- Content density per section (compact vs moderate)
- Scroll animations (port from hero HTML or skip for performance)

</decisions>

<specifics>
## Specific Ideas

- The existing hero HTML at `google-business-profile-htmls/heartland-plumbing-omaha.html` is the design reference — use it for layout patterns, spacing, and visual weight
- Hero HTML has a services grid, process steps, testimonials, about section, FAQ, and areas — the homepage should cover the same ground but adapted for Next.js components
- Trust signals must be within visual proximity of CTAs per CLAUDE.md conversion rules
- All homepage sections should link to their corresponding detail pages (services → /services/*, areas → /service-areas/*)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-homepage*
*Context gathered: 2025-04-05*
