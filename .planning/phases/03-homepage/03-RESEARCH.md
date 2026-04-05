# Phase 3: Homepage - Research

**Researched:** 2026-04-05
**Domain:** Next.js App Router page composition, hero section porting, server component patterns
**Confidence:** HIGH

---

## Summary

Phase 3 builds the full homepage as a Next.js server component at `src/app/page.tsx`, replacing the current placeholder. The design reference is the existing HTML prototype (`heartland-plumbing-omaha.html`), which contains complete CSS, markup, and visual patterns already aligned with the brand tokens in `globals.css`. The bulk of the work is a faithful port of hero, services, trust signals, testimonials, and service area sections from vanilla HTML to Tailwind class-based JSX — with schema injection via the already-built generators.

The existing codebase provides everything needed: brand tokens in `@theme`, data files for all content, schema generators for structured data, `JsonLd` for injection, `generatePageMetadata()` for SEO metadata, and `Header`/`Footer`/`MobileCTA` already wired in the root layout. Phase 3 is purely additive — no new dependencies, no infrastructure changes.

The key implementation decision resolved by context: the proof/stats bar moves **inside the hero section** (adjacent to the CTA), not below it. This changes the hero layout from the HTML prototype which had the proof bar as a separate `<section class="proof-bar">` beneath the hero. The hero content column will stack: headline → subheadline → CTA buttons → trust signals row → proof stats bar.

**Primary recommendation:** Build the homepage as a single server component file with inline sub-components (no separate files needed for sections). Use `IntersectionObserver` via a single lightweight client island for scroll reveal animations — all other sections are pure server HTML.

---

## Standard Stack

### Core (already installed — no new deps)

| Package | Purpose | Notes |
|---------|---------|-------|
| Next.js 15 App Router | Page routing, RSC, metadata API | `src/app/page.tsx` is the target |
| Tailwind CSS v4 | All styling via utility classes | Brand tokens already in `@theme` via `globals.css` |
| `schema-dts` | TypeScript types for schema.org | Already used in Phase 2 generators |
| `next/font` | Font loading (Bitter + Nunito Sans) | Already wired in `layout.tsx` via CSS vars |
| `next/image` | LCP-optimized hero background | `priority` prop for above-fold image |

### No new installation required.

---

## Architecture Patterns

### Recommended File Structure

```
src/app/
├── page.tsx              ← Homepage (replace placeholder, ~300-400 lines)
src/components/
├── home/
│   ├── HeroSection.tsx           ← Can be inlined or extracted
│   ├── ServicesGrid.tsx          ← Can be inlined or extracted
│   ├── TrustSignalsSection.tsx   ← Can be inlined or extracted
│   ├── TestimonialsSection.tsx   ← Can be inlined or extracted
│   └── ServiceAreasSection.tsx   ← Can be inlined or extracted
```

**Recommendation:** Keep all sections inlined in `page.tsx` for Phase 3. The page is a single route with no reuse of these sections elsewhere. Extracting into `src/components/home/` is valid but adds file management overhead with no benefit in this phase.

### Pattern 1: Server Component Homepage with Metadata

```typescript
// src/app/page.tsx
import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { generateLocalBusinessSchema } from '@/lib/schema/local-business'
import { generateAggregateRatingSchema } from '@/lib/schema/aggregate-rating'
import { services } from '@/lib/data/services'
import { areas } from '@/lib/data/service-areas'
import { testimonials } from '@/lib/data/testimonials'
import { BUSINESS } from '@/lib/data/business'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Plumber in Omaha, NE | Heartland Plumbing Co.',
  description: 'Licensed Omaha plumber since 1998. 4.9★ · 312 reviews. Same-day service, 24/7 emergency. Free estimates — call (402) 555-0147.',
  alternates: { canonical: '/' },
  // openGraph/twitter inherited from root layout + metadataBase
}

export default function HomePage() {
  const lbSchema = generateLocalBusinessSchema()
  const arSchema = generateAggregateRatingSchema()
  return (
    <>
      <JsonLd data={lbSchema} />
      <JsonLd data={arSchema} />
      {/* sections */}
    </>
  )
}
```

### Pattern 2: Hero Section Structure (adapted from HTML prototype)

The HTML prototype hero is a CSS grid `1.15fr / 1fr` (left content, right form card). Port directly to Tailwind:

```tsx
<section className="relative min-h-[95vh] bg-dark overflow-hidden flex items-center py-[90px_0_190px]">
  {/* Background image */}
  <div className="absolute inset-0 z-0">
    <Image
      src="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1920&q=80"
      alt=""
      fill
      className="object-cover object-center"
      priority  // ← REQUIRED for LCP
      sizes="100vw"
    />
  </div>
  {/* Dark overlay */}
  <div className="absolute inset-0 z-[1]" style={{background: 'linear-gradient(to right, rgba(26,31,30,0.48) 0%, rgba(26,31,30,0.32) 50%, rgba(26,31,30,0.22) 100%)'}} />
  {/* Wave divider */}
  <div className="absolute bottom-[-2px] left-0 w-full z-[3] leading-none">
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block w-full h-20">
      <path d="M0,40 C120,70 240,80 360,60 C480,40 540,10 720,20 C900,30 960,70 1080,65 C1200,60 1320,30 1440,45 L1440,80 L0,80 Z" fill="#f5f7f6"/>
    </svg>
  </div>
  {/* Content grid */}
  <div className="relative z-[4] max-w-[1320px] mx-auto px-[36px] w-full">
    <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
      {/* Left: headline + CTA + proof bar */}
      {/* Right: form card */}
    </div>
  </div>
</section>
```

**Key difference from prototype:** The proof/stats bar lives inside the left column of the hero, below the trust signals row. It is NOT a separate section with `background: var(--off-white)`.

### Pattern 3: Proof/Stats Bar Inside Hero

In the HTML prototype, `proof-bar` is a standalone off-white section. Per the CONTEXT.md decision, it moves inside the hero, adjacent to the CTA. Render it below the trust signals row:

```tsx
{/* Trust signals row */}
<div className="flex items-center gap-6 flex-wrap">
  {/* Google reviews, BBB seal, Licensed & Insured */}
</div>

{/* Proof stats — inside hero, below trust row */}
<div className="grid grid-cols-4 gap-6 mt-8 pt-8 border-t border-white/10">
  <div>
    <div className="font-display font-black text-[2.2rem] text-primary-light leading-none mb-1">25+</div>
    <div className="text-white/70 text-sm font-semibold">Years in Business</div>
  </div>
  <div>
    <div className="font-display font-black text-[2.2rem] text-primary-light leading-none mb-1">312</div>
    <div className="text-white/70 text-sm font-semibold">Google Reviews</div>
  </div>
  <div>
    <div className="font-display font-black text-[2.2rem] text-primary-light leading-none mb-1">4.9</div>
    <div className="text-white/70 text-sm font-semibold">Star Rating</div>
  </div>
  <div>
    <div className="font-display font-black text-[2.2rem] text-primary-light leading-none mb-1">A+</div>
    <div className="text-white/70 text-sm font-semibold">BBB Rating</div>
  </div>
</div>
```

On mobile (below `lg`), the grid collapses to 2 columns (`grid-cols-2`).

### Pattern 4: Background Color Alternation

Section background sequence (locked decision):

| Section | Background | Tailwind class |
|---------|-----------|---------------|
| Hero | Dark (`#1a1f1e`) | `bg-dark` |
| Services Grid | White | `bg-white` |
| Trust Signals | Off-white (`#f5f7f6`) | `bg-off-white` |
| Testimonials | White | `bg-white` |
| Service Area Overview | Dark pattern | `bg-dark` (with subtle pattern or gradient) |

### Pattern 5: Trust Signals Section (4-card row)

```tsx
<section className="py-20 bg-off-white">
  <div className="max-w-[1320px] mx-auto px-[36px]">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Card 1: 25+ Years */}
      {/* Card 2: 312 Reviews */}
      {/* Card 3: 4.9 Stars */}
      {/* Card 4: Licensed #PL-28541 */}
    </div>
    {/* CTA adjacent to trust cards */}
    <div className="text-center mt-10">
      <a href="tel:4025550147" ...>Call for a Free Estimate</a>
    </div>
  </div>
</section>
```

Each card: centered icon + big number + label. License card uses a shield icon and shows `PL-28541`.

### Pattern 6: Testimonials (3-card grid)

Use the first 3 testimonials from `testimonials.ts` (Mike R., Sarah T., James K. — strong, diverse stories). Each card matches the HTML prototype style:

```tsx
<div className="bg-off-white border border-border p-7">
  {/* Gold stars */}
  {/* Blockquote text */}
  {/* Author: name + city */}
</div>
```

All 3 in `grid-cols-1 md:grid-cols-3`. No carousel needed (card grid is locked).

### Pattern 7: Service Area Overview (dark section)

Matches `areas` section from HTML prototype. 8 city links in a `grid-cols-2 sm:grid-cols-4` grid. Each link: map-pin icon + city name. Dark background (`bg-dark`) with subtle teal border on each link cell.

### Pattern 8: Services Grid (4 services → 2×2 or 1×4)

Use `services` data from `services.ts`. Each card:
- Service icon (SVG from HTML prototype patterns)
- Title from `service.title`
- `service.shortDescription` (truncate to first ~100 chars or use as-is — it fits)
- "Learn More →" linking to `/services/${service.slug}`

Grid: `grid-cols-1 sm:grid-cols-2` (2×2 on desktop). The HTML prototype had a 3-column services grid with 6 items, but we have exactly 4 services mapping to dedicated pages. Use 2×2.

### Pattern 9: Scroll Animations (Claude's Discretion)

The HTML prototype uses a JS `IntersectionObserver` with `.reveal` / `.reveal.visible` classes. In Next.js with the 30KB client JS budget constraint:

**Recommendation:** Use a single `'use client'` `ScrollReveal` component that wraps children and adds a reveal animation. Keep it minimal — one 20-line client component that the server renders children into. Only `MobileNav` is currently `'use client'`; adding one more small island is within budget.

```typescript
// src/components/ScrollReveal.tsx
'use client'
import { useEffect, useRef } from 'react'

export function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return <div ref={ref} className={`opacity-0 translate-y-8 transition-all duration-700 [&.visible]:opacity-100 [&.visible]:translate-y-0 ${className}`}>{children}</div>
}
```

**Alternative (simpler):** Use CSS-only animation with `@keyframes` triggered by `animation-timeline: view()`. Browser support is ~80% (Chrome/Edge/Safari 17+). Given the contractor audience (mixed mobile/desktop), this may miss too many users. Stick with IntersectionObserver.

### Anti-Patterns to Avoid

- **Do NOT use `next/image` with a remote URL without configuring `remotePatterns`** in `next.config.ts`. Add `images.unsplash.com` and `images.pexels.com` to allowed domains.
- **Do NOT put `'use client'` on the homepage** — it would negate SSR benefits and hurt LCP.
- **Do NOT import `ScrollReveal` as a wrapper around the entire page** — wrap only individual sections/elements that need the animation.
- **Do NOT duplicate schema** — `generateLocalBusinessSchema()` already includes `aggregateRating`. Injecting both `generateLocalBusinessSchema()` and `generateAggregateRatingSchema()` standalone is fine since they serve different purposes (one for the business entity, one standalone for the rating widget), but be aware the rating data appears twice in the `<head>`.
- **Do NOT skip `priority` on the hero background image** — this is the LCP element and must be marked priority for Core Web Vitals.
- **Do NOT use `<img>` for the hero background** — use `next/image` with `fill` and `priority` inside a positioned container.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Schema injection | Custom `<script>` tag | `JsonLd` component (already exists) | Already built in Phase 2 |
| Page metadata | Manual `<head>` tags | `generatePageMetadata()` + `export const metadata` | Already built, handles OG/Twitter/canonical |
| Business data | Hardcoded strings | Import from `BUSINESS` constant | Consistent with rest of codebase |
| Service links | Hardcoded hrefs | Map over `services` array | Data-driven, stays in sync |
| Area links | Hardcoded city list | Map over `areas` array | Data-driven |
| Testimonial selection | Hardcoded text | Slice from `testimonials` array | Data-driven |
| Font loading | `<link>` to Google Fonts | Already in `layout.tsx` via `next/font` | Fonts already loaded, just use `font-display` / `font-body` classes |

---

## Common Pitfalls

### Pitfall 1: `next/image` Remote Domain Not Configured

**What goes wrong:** Build fails or images don't render with "hostname not configured" error when using Unsplash/Pexels URLs.

**Why it happens:** Next.js blocks remote image domains by default for security.

**How to avoid:** Add to `next.config.ts`:
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'images.pexels.com' },
  ],
}
```

**Warning signs:** `Error: Invalid src prop` in dev console.

### Pitfall 2: Hero LCP Image Not Prioritized

**What goes wrong:** LCP score tanks because the hero background image loads lazily.

**Why it happens:** `next/image` lazy-loads by default for performance, but the hero is above-fold.

**How to avoid:** Always add `priority` prop to the hero image component. Also ensure the hero `<div>` container has explicit dimensions so the image doesn't cause layout shift.

### Pitfall 3: Tailwind v4 `@theme` Token Names

**What goes wrong:** Tailwind utility classes like `bg-primary` or `text-text-primary` don't apply because of naming mismatch.

**Why it happens:** In Tailwind v4 `@theme`, the CSS variable `--color-primary` maps to the utility `bg-primary` (not `bg-color-primary`). The `--color-` prefix is stripped.

**How to avoid:** Use the already-working class names from `Header.tsx` and `Footer.tsx` as the source of truth:
- `bg-primary`, `text-primary`, `text-primary-light`
- `bg-copper`, `bg-dark`, `bg-off-white`, `bg-warm-white`
- `text-text-primary`, `text-text-secondary`, `text-text-muted`
- `border-border`
- `font-display`, `font-body`
- `shadow-card`, `shadow-hero-form`

### Pitfall 4: Section Background Mismatch with Wave Divider

**What goes wrong:** The SVG wave divider at the bottom of the hero references `fill="#f5f7f6"` (off-white) but if the next section is white, there's a visible seam.

**Why it happens:** The wave fill must match the background of the following section.

**How to avoid:** The Services section background is `bg-white` (`#ffffff`). Update the hero wave SVG fill to `#ffffff` OR make the Services section `bg-off-white`. Per the locked section ordering, Services is white — so the wave fill must be `#ffffff`.

### Pitfall 5: Metadata Title Duplication

**What goes wrong:** The homepage title becomes "Plumber in Omaha, NE | Heartland Plumbing Co. | Heartland Plumbing Co." because the root layout has `template: '%s | Heartland Plumbing Co.'`.

**Why it happens:** The layout template appends the business name, and if the page title already includes it, it doubles.

**How to avoid:** Set the homepage `metadata.title` to just the non-template part: `'Plumber in Omaha, NE'`. The layout template handles appending `| Heartland Plumbing Co.`. OR override by using `title: { absolute: '...' }` to bypass the template entirely.

### Pitfall 6: Client Component Budget

**What goes wrong:** Adding `'use client'` to sections that don't need interactivity bloats the JS bundle past 30KB.

**Why it happens:** Any component marked `'use client'` ships its full JS to the browser.

**How to avoid:** Only two client components needed: `MobileNav` (already built) and optionally `ScrollReveal` (new, tiny). All hero, services, trust, testimonial, and area content is pure HTML — keep it in server components.

---

## Code Examples

### Hero Image with `next/image` (verified pattern)

```tsx
// Source: next/image docs — fill + priority for LCP above-fold
import Image from 'next/image'

<div className="absolute inset-0 z-0">
  <Image
    src="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1920&q=80"
    alt=""
    fill
    priority
    sizes="100vw"
    className="object-cover object-center"
    aria-hidden="true"
  />
</div>
```

### Schema Injection Pattern (verified — matches existing `JsonLd` usage)

```tsx
import { JsonLd } from '@/components/JsonLd'
import { generateLocalBusinessSchema } from '@/lib/schema/local-business'
import { generateAggregateRatingSchema } from '@/lib/schema/aggregate-rating'

// In page component:
const lbSchema = generateLocalBusinessSchema()
const arSchema = generateAggregateRatingSchema()

return (
  <>
    <JsonLd data={lbSchema} />
    <JsonLd data={arSchema} />
    {/* page sections */}
  </>
)
```

### Metadata Export (verified — Next.js 15 App Router)

```typescript
// The layout template is '%s | Heartland Plumbing Co.'
// So set title to just the page-specific part:
export const metadata: Metadata = {
  title: 'Plumber in Omaha, NE',
  description: 'Licensed Omaha plumber since 1998. 4.9★ · 312 reviews. Same-day service, 24/7 emergency. Free estimates — call (402) 555-0147.',
  alternates: {
    canonical: '/',  // metadataBase in layout.tsx resolves to full URL
  },
}
```

### Gold Star Rating Icons (from HTML prototype)

```tsx
// 5 filled stars for 5-star reviews, 4 for 4-star
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-gold">
      {Array.from({ length: rating }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}
```

### Service Icons (from HTML prototype — 4 services)

```tsx
// Drain Cleaning: water drop icon
// path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"

// Water Heaters: thermometer icon
// path d="M12 9a4 4 0 0 0-2 7.5" + "M12 3v2" etc.

// Sewer Line Repair: horizontal lines icon
// path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" etc.

// Emergency Plumbing: clock icon
// circle cx="12" cy="12" r="10" + polyline points="12 6 12 12 16 14"
```

---

## Content Decisions

### Testimonial Selection (3 of 10)

Pick the 3 that best represent service diversity and quote quality:

1. **Mike R., Omaha** — Emergency plumbing (burst pipe, 11pm response). Best urgency/reliability story.
2. **Sarah T., Papillion** — Drain + sewer (camera found tree roots, no recurrence). Best diagnostic story.
3. **Linda P., La Vista** — Water heater (honest advice over upsell). Best trust/honesty story.

These three cover all service types and geography.

### Hero CTA Approach (Claude's Discretion: Recommendation)

The HTML prototype uses dual CTAs (primary: phone call, secondary: anchor to form) + a right-column lead form card. **Recommendation: Keep the lead form card** in the hero. It is the primary conversion mechanism for visitors who are not ready to call. The form card is the most battle-tested pattern for contractor homepages and matches the prototype fidelity expected.

Form fields (from prototype): First Name, Last Name, Phone (primary), Email (optional), Service dropdown, Submit.
Form trust micro-copy: "Your info is safe" | "Response in < 1 hour" | "100% Free"

### Hero Background Image

Use the Unsplash URL from the prototype:
`https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1920&q=80`

This shows a plumber working on pipes — trade-appropriate, high quality, already proven in the design.

### Section Order (Claude's Discretion: Recommendation)

```
1. Hero (dark bg)               ← headline + form + proof stats inside
2. Services Grid (white)        ← 4 service cards, links to /services/*
3. Trust Signals (off-white)    ← 4 stat cards + CTA
4. Testimonials (white)         ← 3 cards
5. Service Areas (dark)         ← 8 city links grid
```

No FAQ section on the homepage (the HTML prototype's FAQ is better suited to the individual service pages). No "How It Works" process section (adds length without direct conversion value on homepage; defer to individual service pages). This 5-section structure keeps the page lean and fast.

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|-----------------|--------|
| `<img>` with `loading="lazy"` | `next/image` with `priority` for LCP images | LCP improvement, no layout shift |
| Separate schema `<script>` in HTML | `JsonLd` component with `dangerouslySetInnerHTML` | Consistent, typed schema injection |
| `document.querySelectorAll` for reveal | `IntersectionObserver` in `'use client'` island | Works with React hydration |
| Google Fonts `<link>` in `<head>` | `next/font` with CSS variable | Self-hosted, no render-blocking |

---

## Open Questions

1. **`next.config.ts` remote image domains**
   - What we know: The current `next.config.ts` may not have Unsplash/Pexels configured.
   - What's unclear: Whether this was added in Phase 1 or 2.
   - Recommendation: Plan task 03-01 to check and add `remotePatterns` as first step.

2. **Hero form submission target**
   - What we know: The form in the HTML prototype has no `action` — it's a UI placeholder.
   - What's unclear: Phase 3 scope doesn't include backend form handling. The form should be a static UI with `action="/contact"` for now.
   - Recommendation: Route form submission to `/contact` page (to be built in a later phase). Add a `TODO` comment.

3. **Scroll reveal performance on mobile**
   - What we know: `IntersectionObserver` is well-supported (97%+ globally).
   - What's unclear: Whether `prefers-reduced-motion` is respected.
   - Recommendation: Add `window.matchMedia('(prefers-reduced-motion: reduce)').matches` check in the `ScrollReveal` component to skip animation when motion is reduced.

---

## Sources

### Primary (HIGH confidence)
- Codebase: `src/app/layout.tsx` — font variables, root metadata structure confirmed
- Codebase: `src/app/globals.css` — all `@theme` token names confirmed
- Codebase: `src/components/layout/Header.tsx` — Tailwind class usage patterns verified
- Codebase: `src/lib/schema/*.ts` — schema generator signatures confirmed
- Codebase: `src/components/JsonLd.tsx` — injection pattern confirmed
- Codebase: `src/lib/metadata.ts` — `generatePageMetadata()` signature confirmed
- HTML Prototype: `heartland-plumbing-omaha.html` — full design reference read (hero structure, CSS vars, section markup)

### Secondary (MEDIUM confidence)
- Next.js docs (training knowledge, stable API): `next/image` `fill` + `priority` props for LCP
- Next.js docs: `export const metadata` with `template` interaction (title doubling pitfall)
- Tailwind v4 `@theme` token behavior: CSS variable naming convention (`--color-X` → `bg-X`)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all verified against codebase
- Architecture patterns: HIGH — directly derived from existing codebase and HTML prototype
- Pitfalls: HIGH (for codebase-specific) / MEDIUM (for Next.js best practices)
- Content decisions: HIGH — data files read directly

**Research date:** 2026-04-05
**Valid until:** 2026-05-05 (stable stack, no fast-moving dependencies)
