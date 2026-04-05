# Phase 1: Foundation - Context

**Gathered:** 2025-04-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Next.js project scaffold with layout shell (header, footer, mobile nav, sticky CTA), brand token configuration, TypeScript data files for all services and areas, font/image optimization patterns, and initial Vercel deployment. No content pages — just the skeleton and data that every page will consume.

</domain>

<decisions>
## Implementation Decisions

### Header & Navigation Layout
- Keep icon + text logo pattern from existing hero HTML (teal rounded square with pipe SVG + "Heartland Plumbing Co." text in Bitter font)
- Navigation links: Services (dropdown showing all 4 services), Areas, About, Contact
- Phone number in desktop header as a copper-colored button with phone icon — stands out as CTA
- Shadow on scroll behavior: header gains box-shadow when user scrolls past hero, matching existing HTML pattern

### Mobile CTA Bar
- Phone only — single "Call Now" button with phone icon, maximum simplicity
- Always visible — fixed at bottom from page load, always one tap away
- Primary teal color (#1a7a6e) background for the sticky bar

### Data Structure
- Full content in TypeScript data files for services: title, slug, description paragraphs, common problems list, pricing ranges, FAQ Q&As, related services — all inline in `lib/data/services.ts`
- Full content in TypeScript data files for areas: city name, slug, neighborhoods, local context paragraphs, area-specific facts — all inline in `lib/data/service-areas.ts`
- FAQ questions are unique per service — no shared pool, each service has its own dedicated FAQ set
- Testimonials in a central pool (`lib/data/testimonials.ts`) — pages pull relevant ones by service type

### Brand Token Mapping
- Spacing: match the hero HTML's specific pixel values as custom Tailwind spacing tokens (not default scale)
- Border radius: subtle rounds (rounded-lg / 8px) — professional, not playful
- Shadows: subtle soft shadows (shadow-sm to shadow-md) — modern, clean

### Claude's Discretion
- Color palette mapping: Claude maps the full hero HTML palette (primary teal, copper accent, dark, off-white, gold, green) to Tailwind config tokens — user trusts Claude's judgment on which CSS variables to preserve vs simplify
- Shadow intensity and elevation scale specifics

</decisions>

<specifics>
## Specific Ideas

- The existing hero HTML at `google-business-profile-htmls/heartland-plumbing-omaha.html` is the design source of truth — port its patterns (colors, fonts, spacing, shadows, border radius) faithfully to Tailwind config
- Hero HTML uses CSS custom properties (--primary, --copper, --dark, etc.) — these should map directly to Tailwind theme extensions
- The existing HTML's `container` class uses `max-width: 1320px; padding: 0 36px` — preserve this in Tailwind config

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2025-04-05*
