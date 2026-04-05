# Phase 4: Service Pages - Research

**Researched:** 2026-04-05
**Domain:** Next.js 16 dynamic routes, CSS-only FAQ accordion, schema injection, cross-link sections
**Confidence:** HIGH — all key patterns verified directly from the live codebase

---

## Summary

Phase 4 adds four pre-rendered service pages at `/services/[slug]`. All data structures, schema generators, metadata utilities, and design tokens are already in place from earlier phases. The codebase uses Next.js 16 (package.json shows `"next": "16.2.2"`) with React 19. This version continues the App Router convention where `params` is a `Promise` — it must be awaited before use.

The primary engineering work is: (1) create `src/app/services/[slug]/page.tsx` with `generateStaticParams` and `generateMetadata`, (2) compose the page sections from existing data, (3) implement CSS-only `<details>`/`<summary>` FAQ accordion with the established design language, and (4) build a cross-link section using area pills and service cards matching the homepage style.

**Primary recommendation:** Build a single `page.tsx` that renders all four services from data. Conditional emergency styling (`service.slug === 'emergency-plumbing'`) handles the urgency treatment without a separate component file.

---

## Standard Stack

### Core (already installed — no new packages needed)

| Library / Feature | Version | Purpose | Status |
|---|---|---|---|
| Next.js App Router | 16.2.2 | Dynamic `[slug]` route, `generateStaticParams`, `generateMetadata` | Installed |
| React | 19.2.4 | Component model | Installed |
| Tailwind CSS v4 | via globals.css `@import "tailwindcss"` | Styling via design tokens | Installed |
| `schema-dts` | (installed) | Type-safe JSON-LD objects | Installed |
| `next/font` (Bitter + Nunito Sans) | bundled with Next.js | Font CSS variables | Active in layout |

### Already-Built Utilities (use these, don't rebuild)

| Utility | File | What It Does |
|---|---|---|
| `services` array | `src/lib/data/services.ts` | 4 services with full content, FAQs, pricing, relatedServices[] |
| `areas` array | `src/lib/data/service-areas.ts` | 8 areas with city/slug |
| `generateServiceSchema()` | `src/lib/schema/service.ts` | Returns `WithContext<Service>` |
| `generateFAQPageSchema()` | `src/lib/schema/faq-page.ts` | Returns `WithContext<FAQPage>` from FAQ array |
| `generateBreadcrumbSchema()` | `src/lib/schema/breadcrumb.ts` | Returns breadcrumb JSON-LD |
| `generatePageMetadata()` | `src/lib/metadata.ts` | Returns Next.js `Metadata` with OG/Twitter/canonical |
| `JsonLd` component | `src/components/JsonLd.tsx` | Injects `<script type="application/ld+json">` |
| `ScrollReveal` | `src/components/ScrollReveal.tsx` | Client component — intersection observer fade-in |
| `BUSINESS` | `src/lib/data/business.ts` | Phone, phoneHref, address, license, yearsFounded |

### No New Installation Required

All dependencies for Phase 4 are in place. Do not install any new packages.

---

## Architecture Patterns

### Recommended File Structure

```
src/app/services/
└── [slug]/
    └── page.tsx        ← single file handles all 4 services
```

No `layout.tsx` needed at the services level — the root layout already applies Header, Footer, and MobileCTA to all routes.

### Pattern 1: Dynamic Route with Async Params (Next.js 15+)

Next.js 15 made `params` a Promise. Next.js 16 continues this convention.

```typescript
// src/app/services/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { services } from '@/lib/data/services'

// Pre-render all 4 slugs at build time
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

// Generate per-page metadata from services.ts data
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  return generatePageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  })
}

// Page component
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()
  // ... render page
}
```

**CRITICAL:** `params` must be awaited. Accessing `params.slug` directly without `await` will cause a build-time type error in Next.js 16.

### Pattern 2: CSS-Only FAQ Accordion

Use native `<details>`/`<summary>` — zero JavaScript, works on all browsers, collapses by default.

```tsx
// All collapsed by default — no JS needed
<div className="flex flex-col divide-y divide-border">
  {service.faqs.map((faq, i) => (
    <details key={i} className="group py-5">
      <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
        <span className="font-display font-bold text-text-primary text-[16px] leading-snug">
          {faq.q}
        </span>
        {/* + when closed, – when open */}
        <span className="shrink-0 w-6 h-6 flex items-center justify-center text-primary font-bold text-xl
                         group-open:rotate-45 transition-transform" aria-hidden="true">
          +
        </span>
      </summary>
      <p className="mt-3 font-body text-text-secondary text-[15px] leading-relaxed">
        {faq.a}
      </p>
    </details>
  ))}
</div>
```

Key details:
- `list-none` on `<summary>` removes the default browser disclosure triangle
- `group` on `<details>` + `group-open:` Tailwind variant targets the open state
- `group-open:rotate-45` on `+` creates a visual `×` when expanded — matches "– when open" requirement without needing a separate minus character
- No `open` attribute on `<details>` = collapsed by default — matches CONTEXT.md decision

### Pattern 3: Schema Injection (multiple schemas per page)

Each service page needs 3 schemas: Service, FAQPage, Breadcrumb.

```tsx
// All three schemas injected at page root
<JsonLd data={generateServiceSchema(service)} />
<JsonLd data={generateFAQPageSchema(service.faqs)} />
<JsonLd data={generateBreadcrumbSchema([
  { name: 'Home', url: BUSINESS.url },
  { name: 'Services', url: `${BUSINESS.url}/services` },
  { name: service.title, url: `${BUSINESS.url}/services/${service.slug}` },
])} />
```

### Pattern 4: Related Services Cross-Links

The `relatedServices` field in each service is an array of slugs (e.g., `['sewer-line-repair', 'emergency-plumbing']`). Resolve these slugs to full `ServiceData` objects and render as cards matching the homepage services grid.

```typescript
const relatedServiceData = service.relatedServices
  .map((slug) => services.find((s) => s.slug === slug))
  .filter(Boolean) as ServiceData[]
```

Cards should use the same visual style as the homepage: `bg-white border border-border rounded-lg p-8 hover:border-primary hover:shadow-card`. Include the service icon, title, short description, and a "Learn More →" link.

### Pattern 5: Area Pills Cross-Links

All 8 areas from `service-areas.ts` displayed as pill/tag-shaped links:

```tsx
<div className="flex flex-wrap gap-2.5">
  {areas.map((area) => (
    <Link
      key={area.slug}
      href={`/service-areas/${area.slug}`}
      className="inline-flex items-center gap-1.5 border border-border hover:border-primary
                 text-text-secondary hover:text-primary font-semibold text-sm px-4 py-2
                 rounded-full transition-colors"
    >
      <svg>/* location pin icon */</svg>
      {area.city}
    </Link>
  ))}
</div>
```

### Pattern 6: Emergency Page Conditional Styling

The emergency page uses conditional classes based on `service.slug`. No separate component needed.

```tsx
const isEmergency = service.slug === 'emergency-plumbing'

// Banner accent: red for emergency, primary teal for all others
const bannerBg = isEmergency ? 'bg-[#7f1d1d]' : 'bg-dark'  // or use a specific red token
const ctaColor = isEmergency ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary-dark'
```

Emergency-specific elements at page top:
- Giant phone number with `tel:` link — `text-5xl` or larger, immediately visible
- "24/7 Emergency Service" badge — red background, bold, above the fold
- CTA button color shifts from teal primary to red

For the emergency banner background, use an explicit red hex (`#991b1b` or `#7f1d1d`) since no red token exists in `globals.css`. Red inline or Tailwind `bg-red-800` / `bg-red-900` works.

### Pattern 7: Recommended Section Order

Based on conversion principles from CLAUDE.md and the emergency vs. standard distinction:

**Standard pages (Drain Cleaning, Water Heaters, Sewer Line Repair):**
1. Page Banner — service name, short description, CTA (phone + estimate)
2. Problem Matcher — "Common Signs You Need This Service" (commonProblems[])
3. Service Description — 3–4 body paragraphs (description[])
4. Pricing Context — inline paragraph with pricingRange
5. FAQ Accordion — bordered rows, CSS-only
6. Related Services — 2-3 cards (homepage card style)
7. Service Areas — pill links, all 8 cities
8. Bottom CTA strip — phone number, estimate link

**Emergency page:**
1. Emergency Banner — red accent, giant phone, "24/7" badge, no scrolling required to reach CTA
2. What's a True Emergency — FAQ question logic inlined (or pulled from FAQs)
3. Response Times & Process — description paragraphs
4. FAQ Accordion
5. Related Services
6. Service Areas pills
7. Bottom CTA (redundant phone number)

---

## Design Token Reference

Extracted from `globals.css` — use these everywhere:

| Token | Value | Use |
|---|---|---|
| `--color-primary` | `#1a7a6e` | Primary teal — standard service CTAs, icons |
| `--color-primary-dark` | `#145f56` | CTA hover state |
| `--color-primary-light` | `#22a190` | Highlights, links on dark |
| `--color-copper` | `#b8733a` | Secondary accent (avoid for service pages unless matching homepage) |
| `--color-dark` | `#1a1f1e` | Dark section backgrounds |
| `--color-dark-mid` | `#232928` | Dark card backgrounds |
| `--color-text-primary` | `#1c2422` | Body text, headings |
| `--color-text-secondary` | `#465a54` | Subtext, descriptions |
| `--color-text-muted` | `#6e847b` | Labels, small print |
| `--color-off-white` | `#f5f7f6` | Alternating section bg |
| `--color-border` | `#dce5e1` | All borders, dividers |
| `--color-gold` | `#e8a32e` | Star ratings only |
| `--color-green` | `#2d8659` | Trust check icons |
| `--font-display` | `var(--font-bitter)` | All headings (Bitter, 400/700/900) |
| `--font-body` | `var(--font-nunito)` | Body copy (Nunito Sans, 400/600/700) |
| Container | `max-w-[1320px] mx-auto px-[36px]` | All section containers |
| Breakpoint | `lg` = 1024px | Main responsive breakpoint |
| `shadow-card` | `0 12px 32px rgba(0,0,0,0.08)` | Card hover shadow |

Emergency accent: no red token in globals.css. Use Tailwind `bg-red-800` (`#991b1b`) for banner and `bg-red-600 hover:bg-red-700` for CTAs. These are one-off uses, no need to add a token.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---|---|---|---|
| Schema JSON-LD | Custom script tag | `JsonLd` component | Already built, handles stringify correctly |
| FAQ toggle | JavaScript state/useState | CSS `<details>`/`<summary>` | Zero JS, no hydration, required by CONTEXT.md |
| Service data lookup | Hardcode per-page | `services.find((s) => s.slug === slug)` | All content already in services.ts |
| Per-page metadata | Hardcode | `generatePageMetadata()` | Handles OG, Twitter, canonical, robots |
| Font loading | Google CDN link tags | `next/font` (already in layout) | Fonts loaded via CSS vars — no extra link needed |
| Scroll animation | Custom CSS | `ScrollReveal` component | Already built, handles prefers-reduced-motion |

**Key insight:** The codebase is highly data-driven. Service page content, FAQs, metadata, and related services are all pre-populated in `services.ts`. The builder pattern is: read from data, render from data, inject schema from data. Don't hardcode anything.

---

## Common Pitfalls

### Pitfall 1: Not Awaiting `params` in Next.js 15+

**What goes wrong:** `const { slug } = params` causes a TypeScript error and possible runtime error in Next.js 15/16. The `params` prop is a `Promise<{ slug: string }>`, not a plain object.

**How to avoid:** Always `const { slug } = await params` in both `generateMetadata` and the page component.

**Warning signs:** TypeScript shows `Type 'Promise<...>' has no property 'slug'`.

### Pitfall 2: CSS `list-none` Missing on `<summary>`

**What goes wrong:** The browser renders a disclosure triangle (▶) before the summary text, overriding the custom +/- icon.

**How to avoid:** Add `list-none` className to `<summary>`. Also add `::marker { display: none }` fallback if needed (Tailwind's `list-none` should handle this).

### Pitfall 3: `notFound()` Missing for Invalid Slugs

**What goes wrong:** If someone navigates to `/services/bad-slug`, the page renders with undefined service data and throws errors.

**How to avoid:** Always `if (!service) notFound()` after the `services.find()` call. This renders the 404 page and is already the established pattern in Next.js App Router.

### Pitfall 4: Using ScrollReveal on Server Components

**What goes wrong:** `ScrollReveal` has `'use client'` and uses `useEffect` / `useRef`. Wrapping server-only content in it is fine, but nesting another client component inside ScrollReveal without marking it client can cause issues.

**How to avoid:** `ServicePage` itself is an async Server Component. `ScrollReveal` wraps static sections — no issue. The only client component in this page tree will be `ScrollReveal` itself.

### Pitfall 5: Forgetting `generateStaticParams`

**What goes wrong:** Without `generateStaticParams`, Next.js renders service pages dynamically at request time instead of statically at build. This violates the success criterion "each returns unique pre-rendered page."

**How to avoid:** Export `generateStaticParams()` returning `services.map((s) => ({ slug: s.slug }))`. This is a simple one-liner.

### Pitfall 6: Emergency Phone Number Not `tel:` Link

**What goes wrong:** A giant phone number rendered as plain text is not tappable on mobile — breaking the core conversion requirement.

**How to avoid:** Always wrap phone numbers in `<a href={BUSINESS.phoneHref}>`. Use `BUSINESS.phoneHref` (which equals `'tel:+14025550147'`) from the business data file.

---

## Code Examples

### Full Route File Skeleton

```typescript
// src/app/services/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { ScrollReveal } from '@/components/ScrollReveal'
import { generatePageMetadata } from '@/lib/metadata'
import { generateServiceSchema } from '@/lib/schema/service'
import { generateFAQPageSchema } from '@/lib/schema/faq-page'
import { generateBreadcrumbSchema } from '@/lib/schema/breadcrumb'
import { services } from '@/lib/data/services'
import { areas } from '@/lib/data/service-areas'
import { BUSINESS } from '@/lib/data/business'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  return generatePageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  })
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const isEmergency = service.slug === 'emergency-plumbing'
  const relatedServiceData = service.relatedServices
    .map((s) => services.find((svc) => svc.slug === s))
    .filter(Boolean)

  return (
    <>
      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateFAQPageSchema(service.faqs)} />
      <JsonLd data={generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS.url },
        { name: 'Services', url: `${BUSINESS.url}/services` },
        { name: service.title, url: `${BUSINESS.url}/services/${service.slug}` },
      ])} />

      {/* Emergency banner or standard banner */}
      {/* ... sections ... */}
    </>
  )
}
```

### FAQ Accordion (CSS-Only)

```tsx
<section aria-label="Frequently Asked Questions">
  <div className="max-w-[1320px] mx-auto px-[36px] py-20">
    <h2 className="font-display font-black text-text-primary text-3xl mb-8">
      Frequently Asked Questions
    </h2>
    <div className="flex flex-col border border-border rounded-lg overflow-hidden">
      {service.faqs.map((faq, i) => (
        <details key={i} className="group border-b border-border last:border-b-0">
          <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none hover:bg-off-white transition-colors">
            <span className="font-display font-bold text-text-primary text-[16px] leading-snug">
              {faq.q}
            </span>
            <span
              className="shrink-0 w-7 h-7 rounded-full border border-border flex items-center justify-center
                         text-primary-light font-bold text-lg group-open:rotate-45 transition-transform"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <div className="px-6 pb-5 pt-1">
            <p className="font-body text-text-secondary text-[15px] leading-relaxed">{faq.a}</p>
          </div>
        </details>
      ))}
    </div>
  </div>
</section>
```

### Area Pills

```tsx
<div className="flex flex-wrap gap-2.5">
  {areas.map((area) => (
    <Link
      key={area.slug}
      href={`/service-areas/${area.slug}`}
      className="inline-flex items-center gap-1.5 border border-border rounded-full
                 px-4 py-2 text-sm font-semibold text-text-secondary
                 hover:border-primary hover:text-primary transition-colors"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
           strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0"
           aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
      {area.city}
    </Link>
  ))}
</div>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|---|---|---|---|
| `params.slug` direct access | `const { slug } = await params` | Next.js 15 (still in 16) | Breaking if skipped — TypeScript error |
| `getStaticProps` / `getStaticPaths` | `generateStaticParams` + async Server Component | Next.js 13 App Router | New pattern for static generation |
| External JS accordion libs | CSS `<details>`/`<summary>` | Native HTML, widely supported | Zero JS, no bundle cost |

---

## Open Questions

1. **Service page hero image**
   - What we know: Homepage uses Unsplash images via `next/image` with `images.remotePatterns` allowing `images.unsplash.com`
   - What's unclear: Should each service page have a unique hero photo, or a color/text-only banner?
   - Recommendation: Use a compact dark banner (no background photo) rather than a full-bleed hero. Service pages are content-first — visitors have already decided on the service; the banner just confirms they're in the right place. This also avoids the need for 4 unique Unsplash URLs and keeps LCP fast.

2. **`/services` index page**
   - What we know: Footer links to individual service pages. Homepage links to individual service pages. No `src/app/services/page.tsx` exists yet.
   - What's unclear: Phase scope says "four dedicated service pages" — the index is not explicitly included.
   - Recommendation: Breadcrumb schema references `${BUSINESS.url}/services` as a middle item. If no index page is created, this URL will 404. Consider either creating a minimal `/services` index that lists all 4 services (very simple) or removing the `/services` middle breadcrumb and going directly Home → [Service Name]. Flagging for planner decision — lean toward creating the simple index to avoid a 404 in breadcrumb navigation.

---

## Sources

### Primary (HIGH confidence)
- Direct codebase read: `src/app/page.tsx` — homepage pattern for section structure, design tokens usage, service card implementation
- Direct codebase read: `src/lib/data/services.ts` — complete ServiceData interface and 4 service objects
- Direct codebase read: `src/lib/data/service-areas.ts` — 8 area objects with city/slug
- Direct codebase read: `src/lib/schema/service.ts`, `faq-page.ts`, `breadcrumb.ts` — all schema generators
- Direct codebase read: `src/lib/metadata.ts` — generatePageMetadata signature and behavior
- Direct codebase read: `src/components/JsonLd.tsx`, `ScrollReveal.tsx` — component APIs
- Direct codebase read: `src/app/globals.css` — all design tokens
- Direct codebase read: `src/components/layout/Footer.tsx`, `Header.tsx` — layout container pattern `max-w-[1320px] mx-auto px-[36px]`
- Direct codebase read: `package.json` — Next.js 16.2.2, React 19.2.4
- Direct codebase read: `next.config.ts` — `images.remotePatterns` allows unsplash.com
- Direct codebase read: `.planning/phases/04-service-pages/04-CONTEXT.md` — locked decisions

### Secondary (MEDIUM confidence)
- Next.js async params pattern verified against prior phases in this codebase (prior phase notes indicate "Next.js 15: params is a Promise — must await params")

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — read directly from package.json and node_modules
- Architecture patterns: HIGH — derived from actual homepage implementation in src/app/page.tsx
- Pitfalls: HIGH — params-as-Promise confirmed by prior phase notes; others derived from codebase patterns
- CSS accordion: HIGH — native HTML feature, no library dependency

**Research date:** 2026-04-05
**Valid until:** 2026-05-05 (stable codebase; valid until Next.js major version bump)
