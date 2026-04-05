# Phase 1: Foundation - Research

**Researched:** 2026-04-05
**Domain:** Next.js 15 App Router scaffold, Tailwind v4 brand tokens, layout shell, data architecture
**Confidence:** HIGH (stack choices locked by prior decisions; verified against official docs and current search results)

---

## Summary

Phase 1 builds the complete project skeleton: Next.js 15 with App Router, Tailwind CSS v4 CSS-first config, `next/font` for render-blocking prevention, a Server+Client layout shell (sticky header, footer, mobile CTA bar), and TypeScript data files for all services and areas. No content pages are built — only the infrastructure every page will consume.

The standard approach is well-established: create-next-app scaffolds the project with TypeScript + Tailwind in one command, Tailwind v4's `@theme` directive replaces `tailwind.config.js`, and `next/font/google` with CSS variables is the canonical way to load Bitter + Nunito Sans without render-blocking. The Server Component header + Client Component mobile nav split minimizes client JS.

**Primary recommendation:** Scaffold with `create-next-app@latest`, immediately upgrade Tailwind to v4, map all hero HTML CSS variables to `@theme` in `globals.css`, and structure the Header as a Server Component wrapper with a `MobileNav` Client Component island for the hamburger toggle.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 15.x (latest) | App Router, SSG, Image, Font | Locked decision; current stable |
| react / react-dom | 19.x | React runtime | Bundled with Next 15 |
| typescript | 5.x | Type safety | Locked decision |
| tailwindcss | 4.x | CSS-first utility styling | Locked; v4 CSS-first config |
| @tailwindcss/postcss | 4.x | PostCSS plugin for Tailwind v4 | Required by v4 (replaces tailwindcss PostCSS plugin) |
| sharp | latest | Image optimization for self-hosted | Auto-installed on Vercel; install locally for dev warnings |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| resend | latest | Contact form email | Route Handler for contact form (Phase 4+) |
| postcss | 8.x | Build pipeline | Required by @tailwindcss/postcss |

### Alternatives Considered (LOCKED — do not substitute)
| Instead of | Could Use | Why we're not |
|------------|-----------|---------------|
| Tailwind v4 | Tailwind v3 | v3 is default in create-next-app but v4 is correct choice for new projects in 2026 |
| next/font/google | Google CDN link tag | CDN links are render-blocking; next/font self-hosts with zero layout shift |
| No component library | shadcn/ui | Client JS budget <30KB — locked decision |
| No framer-motion | framer-motion | Locked out; CSS transitions only |

**Installation:**
```bash
# Scaffold (v3 Tailwind installs by default — we upgrade immediately after)
npx create-next-app@latest heartland-plumbing --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Upgrade to Tailwind v4 (run inside project directory)
npm install tailwindcss@latest @tailwindcss/postcss@latest postcss@latest

# Sharp for local dev (auto-installed on Vercel)
npm install sharp
```

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout — Server Component, fonts, metadata
│   ├── page.tsx            # Homepage
│   ├── globals.css         # @import "tailwindcss"; @theme { ... }
│   ├── services/
│   │   └── [slug]/
│   │       └── page.tsx    # Dynamic service pages (generateStaticParams)
│   └── service-areas/
│       └── [slug]/
│           └── page.tsx    # Dynamic area pages (generateStaticParams)
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Server Component — logo, desktop nav, phone CTA
│   │   ├── MobileNav.tsx   # 'use client' — hamburger toggle, mobile menu
│   │   ├── Footer.tsx      # Server Component
│   │   └── MobileCTA.tsx   # 'use client' — fixed bottom Call Now bar (always visible)
│   └── ui/                 # Shared presentational components (Phase 2+)
└── lib/
    └── data/
        ├── services.ts         # All 4 services with full content
        ├── service-areas.ts    # All 8 areas with local content
        └── testimonials.ts     # Testimonials pool, tagged by service
```

### Pattern 1: Tailwind v4 CSS-First Brand Token Config
**What:** All design tokens defined in `globals.css` using `@theme` directive — no `tailwind.config.js`
**When to use:** Every project using Tailwind v4 — this IS the config in v4

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* ── Colors mapped from hero HTML :root ──────────────── */
  --color-primary: #1a7a6e;
  --color-primary-dark: #145f56;
  --color-primary-light: #22a190;
  --color-copper: #b8733a;
  --color-copper-light: #d4914e;
  --color-copper-dark: #8f5a2c;
  --color-dark: #1a1f1e;
  --color-dark-mid: #232928;
  --color-text-primary: #1c2422;
  --color-text-secondary: #465a54;
  --color-text-muted: #6e847b;
  --color-off-white: #f5f7f6;
  --color-warm-white: #faf8f5;
  --color-border: #dce5e1;
  --color-gold: #e8a32e;
  --color-green: #2d8659;

  /* ── Typography ──────────────────────────────────────── */
  /* CSS vars injected by next/font (see layout.tsx) */
  --font-display: var(--font-bitter);
  --font-body: var(--font-nunito);

  /* ── Spacing tokens (hero HTML specific values) ──────── */
  /* container max-width: 1320px, horizontal padding: 36px  */
  --spacing-container-pad: 2.25rem;  /* 36px */

  /* ── Border radius ───────────────────────────────────── */
  --radius-sm: 0.375rem;   /* 6px  — buttons */
  --radius-md: 0.5rem;     /* 8px  — logo icon, cards */
  --radius-lg: 0.75rem;    /* 12px — about image */

  /* ── Shadows ─────────────────────────────────────────── */
  --shadow-card: 0 12px 32px rgba(0,0,0,0.08);
  --shadow-hero-form: 0 20px 60px rgba(0,0,0,0.3);
  --shadow-header: 0 2px 20px rgba(0,0,0,0.08);
  --shadow-mobile-cta: 0 -4px 20px rgba(0,0,0,0.10);
}
```

**NOTE on color naming:** Tailwind v4 generates utility classes from `@theme` token names. `--color-primary: #1a7a6e` produces `bg-primary`, `text-primary`, `border-primary` utilities. This matches the hero HTML's `var(--primary)` pattern exactly.

### Pattern 2: next/font/google with CSS Variables (Tailwind v4 compatible)
**What:** Load Bitter (display) + Nunito Sans (body) via `next/font/google`, expose as CSS variables, consume in `@theme`
**When to use:** Root layout.tsx — define once, apply globally

```typescript
// src/app/layout.tsx
import { Bitter, Nunito_Sans } from 'next/font/google'

const bitter = Bitter({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-bitter',
  display: 'swap',
})

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-nunito',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bitter.variable} ${nunitoSans.variable}`}>
      <body className="font-body text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
```

**Critical:** Variables go on `<html>`, not `<body>`. The `display: 'swap'` prevents invisible text during font load (FOIT). `next/font` self-hosts fonts — zero external network requests, zero render-blocking.

### Pattern 3: Server Component Header + Client Component Mobile Nav
**What:** Header is a Server Component (no JS shipped) with a Client Component island for interactive hamburger
**When to use:** Any Next.js 15 site where the desktop header has no interactive state

```typescript
// src/components/layout/Header.tsx — Server Component (no 'use client')
import MobileNav from './MobileNav'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border 
                       transition-shadow duration-300">
      <div className="max-w-[1320px] mx-auto px-[36px]">
        <div className="flex justify-between items-center py-[14px] gap-6">
          {/* Logo — Server rendered */}
          <Logo />
          {/* Desktop nav — Server rendered */}
          <DesktopNav />
          {/* Phone + CTA — Server rendered */}
          <HeaderRight />
          {/* Hamburger — Client island */}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
```

```typescript
// src/components/layout/MobileNav.tsx — Client Component
'use client'
import { useState } from 'react'

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  // hamburger toggle + mobile menu drawer
}
```

**Why this split:** The `MobileNav` island is the only interactive piece. Server Component headers ship zero JS for the static parts, keeping client bundle under 30KB.

**Scroll shadow on header:** The hero HTML adds `box-shadow` on scroll via a JS event. In Next.js, this logic lives in a `'use client'` hook that adds a CSS class to the header. Implement as a small `HeaderScrollEffect` client component that wraps nothing but adds a data attribute or class to the header via a ref or `document.getElementById`.

### Pattern 4: Mobile Sticky CTA Bar (Always Visible)
**What:** Fixed bottom bar, teal background, single "Call Now" button — per CONTEXT.md decision
**When to use:** Applied in root layout, hidden on desktop, visible on mobile

```typescript
// src/components/layout/MobileCTA.tsx
// Per CONTEXT.md: always visible, primary teal, phone only
// 'use client' only needed if adding interaction beyond a link

export default function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] 
                    bg-primary md:hidden
                    shadow-mobile-cta">
      <div className="px-4 py-3">
        <a
          href="tel:4025550147"
          className="flex items-center justify-center gap-2 
                     w-full py-3 rounded-md
                     text-white font-bold text-sm"
        >
          {/* Phone SVG icon */}
          Call Now — (402) 555-0147
        </a>
      </div>
    </div>
  )
}
```

**Critical CSS pitfall:** The footer needs `pb-[80px]` on mobile (or equivalent) so content isn't hidden behind the sticky bar. The hero HTML solves this with `.footer { padding-bottom: 80px; }` at the ≤1024px breakpoint.

### Pattern 5: generateStaticParams for Dynamic Service/Area Pages
**What:** Pre-renders all service and area pages at build time from the TypeScript data files
**When to use:** Any `[slug]` dynamic route that maps to a known finite set (Phase 2+, but data files built now)

```typescript
// src/app/services/[slug]/page.tsx (Phase 2 — but data structure must support it now)
import { services } from '@/lib/data/services'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>  // Next.15: params is a Promise
}) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  // ...
}
```

**CRITICAL Next.js 15 change:** In Next.js 15, `params` (and `searchParams`) are now **Promises** — they must be awaited. This is a breaking change from Next.js 14. Data files must be defined now so generateStaticParams works in Phase 2 without data rework.

### Pattern 6: next.config.ts for Vercel Deployment
**What:** TypeScript config file with image optimization, headers, and Turbopack
```typescript
// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Turbopack is default dev server in Next.js 15
}

export default config
```

**Vercel note:** Sharp is auto-installed on Vercel — do not add it as a required dependency, only as a dev dependency or optional. The `images.domains` config is deprecated — use `remotePatterns` only.

### Pattern 7: TypeScript Data File Structure
**What:** Strongly-typed data constants in `lib/data/` consumed by generateStaticParams and page components
**When to use:** Phase 1 — define schemas now, fill content now, consume in Phase 2+

```typescript
// src/lib/data/services.ts
export interface ServiceData {
  title: string
  slug: string
  shortDescription: string
  description: string[]          // Array of paragraphs
  commonProblems: string[]
  pricingRange: string
  faqs: Array<{ q: string; a: string }>
  relatedServices: string[]      // slugs
  metaTitle: string
  metaDescription: string
}

export const services: ServiceData[] = [
  {
    title: 'Drain Cleaning',
    slug: 'drain-cleaning',
    // ... full content
  },
  // ...
]
```

```typescript
// src/lib/data/service-areas.ts
export interface AreaData {
  city: string
  slug: string
  neighborhoods: string[]
  localContext: string[]         // Paragraphs with genuine local detail
  areaFacts: string[]            // Local plumbing-relevant facts (hard water, etc.)
  metaTitle: string
  metaDescription: string
}
```

```typescript
// src/lib/data/testimonials.ts
export interface Testimonial {
  name: string
  city: string
  rating: number
  text: string
  serviceType: string[]          // slugs — used for filtering on service pages
}
```

### Anti-Patterns to Avoid
- **`tailwind.config.js` in a v4 project:** v4 uses `@theme` in CSS. Do not create a JS config file — it conflicts.
- **`<link>` tags for Google Fonts in layout.tsx:** Render-blocking. Use `next/font/google` exclusively.
- **`images.domains` in next.config:** Deprecated in favor of `remotePatterns`.
- **Marking the entire Header as `'use client'`:** Kills SSR benefits for static content. Only the interactive toggle slice needs the directive.
- **No `display: 'swap'` on next/font:** Causes invisible text flash (FOIT) — always set `display: 'swap'`.
- **Sync `params` access in Next.js 15:** `params` is a Promise — must `await params` before destructuring slug.
- **Forgetting `pb-20` on mobile footer/body:** Sticky bottom CTA bar covers last content section.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading | Manual CSS `@font-face` or CDN `<link>` | `next/font/google` | Eliminates render-blocking, handles subsetting, self-hosts automatically |
| Image optimization | `<img>` tags + manual WebP conversion | `next/image` | Automatic WebP/AVIF, lazy load, CLS prevention via reserved space |
| Scroll-based shadow on header | Custom IntersectionObserver | Simple `useEffect` + `scroll` event with `window.scrollY > 0` threshold | Minimal JS, mirrors hero HTML pattern exactly |
| SVG icons | Icon library | Inline SVG copied from hero HTML | Zero dependency, exact visual match to approved design |

**Key insight:** The hero HTML is the design source of truth. The job of Phase 1 is to port its CSS variables and layout patterns into the Next.js config layer — not to redesign anything.

---

## Common Pitfalls

### Pitfall 1: Tailwind v4 Config Not Applied
**What goes wrong:** Running `create-next-app` installs Tailwind v3. If you then `npm install tailwindcss@latest` without also updating `postcss.config.mjs`, the v4 `@theme` directive is silently ignored — utilities don't generate.
**Why it happens:** v3 uses `tailwindcss` as the PostCSS plugin name; v4 uses `@tailwindcss/postcss`.
**How to avoid:** After upgrading to v4, update `postcss.config.mjs`:
```js
export default { plugins: { '@tailwindcss/postcss': {} } }
```
And replace `globals.css` content — remove the v3 `@tailwind base/components/utilities` directives, replace with `@import "tailwindcss"`.
**Warning signs:** `bg-primary` doesn't apply; `@theme` variables aren't in the computed `:root`.

### Pitfall 2: Font Variable Not Available in @theme
**What goes wrong:** `next/font` CSS variables (`--font-bitter`, `--font-nunito`) are injected on the `<html>` element at runtime. If `@theme` in globals.css references them with `var(--font-bitter)`, they ARE correctly available because `@theme` tokens that use `var()` are evaluated at runtime as CSS custom properties — not at build time.
**Why it happens:** Developers assume `@theme` is build-time only.
**How to avoid:** `--font-display: var(--font-bitter)` in `@theme` is correct. At runtime, Tailwind's generated `--font-display` token will resolve through to the next/font injected variable.
**Warning signs:** Font class applies, but custom font doesn't render — check that `bitter.variable` and `nunitoSans.variable` are included in the `<html>` className.

### Pitfall 3: Sticky CTA Bar Covers Page Footer
**What goes wrong:** The `position: fixed; bottom: 0` bar sits over the last few items in the footer on mobile. Users can't read copyright or contact info.
**Why it happens:** No bottom padding added to body/footer to compensate.
**How to avoid:** Add `pb-20 md:pb-0` to `<body>` or the `<footer>` wrapper — 80px matches the sticky bar height.
**Warning signs:** Last footer link is cut off on iPhone.

### Pitfall 4: Next.js 15 params Breaking Change
**What goes wrong:** Code that does `{ params }: { params: { slug: string } }` and then `params.slug` directly will throw a warning or error in Next.js 15.
**Why it happens:** Next.js 15 made `params` and `searchParams` async (Promises) to improve streaming performance.
**How to avoid:** Always type `params: Promise<{ slug: string }>` and `await params` before use.
**Warning signs:** Build warning: "params should be awaited before using its properties."

### Pitfall 5: Turbopack + Sharp WebP Issue (Local Dev)
**What goes wrong:** In local dev with Turbopack (default in Next.js 15 `npm run dev`), some versions had issues with WebP image processing when Sharp wasn't installed.
**Why it happens:** Sharp is optional but Turbopack may require it locally for image optimization.
**How to avoid:** Run `npm install sharp` as a dev dependency during project init.
**Warning signs:** Console error about image optimization failing during `npm run dev`.

---

## Code Examples

### PostCSS Config for Tailwind v4
```javascript
// postcss.config.mjs
// Source: tailwindcss.com/blog/tailwindcss-v4
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### Complete globals.css Structure
```css
/* src/app/globals.css */
/* Source: tailwindcss.com/blog/tailwindcss-v4 */
@import "tailwindcss";

@theme {
  /* Brand colors from hero HTML :root */
  --color-primary: #1a7a6e;
  --color-primary-dark: #145f56;
  --color-primary-light: #22a190;
  --color-copper: #b8733a;
  --color-copper-light: #d4914e;
  --color-copper-dark: #8f5a2c;
  --color-dark: #1a1f1e;
  --color-dark-mid: #232928;
  --color-text-primary: #1c2422;
  --color-text-secondary: #465a54;
  --color-text-muted: #6e847b;
  --color-off-white: #f5f7f6;
  --color-warm-white: #faf8f5;
  --color-border: #dce5e1;
  --color-gold: #e8a32e;
  --color-green: #2d8659;

  /* Fonts — CSS vars injected by next/font at runtime */
  --font-display: var(--font-bitter);
  --font-body: var(--font-nunito);

  /* Border radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}
```

### Root layout.tsx
```typescript
// src/app/layout.tsx
// Source: nextjs.org/docs/app/getting-started/fonts
import type { Metadata } from 'next'
import { Bitter, Nunito_Sans } from 'next/font/google'
import './globals.css'

const bitter = Bitter({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-bitter',
  display: 'swap',
})

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.heartlandplumbingomaha.com'),
  title: {
    template: '%s | Heartland Plumbing Co.',
    default: 'Plumber in Omaha, NE | Heartland Plumbing Co.',
  },
  description: 'Licensed Omaha plumber. 4.9★ rated, 25+ years. Same-day service. Free estimates — call (402) 555-0147.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bitter.variable} ${nunitoSans.variable}`}>
      <body className="font-body text-text-primary antialiased pb-20 md:pb-0">
        {children}
      </body>
    </html>
  )
}
```

### next.config.ts
```typescript
// next.config.ts
// Source: nextjs.org/docs/app/api-reference/config/next-config-js/images
import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

export default config
```

---

## Hero HTML Color Palette — Complete Token Map

Extracted from `heartland-plumbing-omaha.html` `:root` block. These are the exact values to preserve:

| CSS Variable (hero HTML) | Hex | Tailwind Token | Usage |
|--------------------------|-----|----------------|-------|
| `--primary` | `#1a7a6e` | `primary` | Teal — links, accents, sticky CTA bg |
| `--primary-dark` | `#145f56` | `primary-dark` | Hover states |
| `--primary-light` | `#22a190` | `primary-light` | Trust signal icons |
| `--copper` | `#b8733a` | `copper` | CTA buttons, service card accent |
| `--copper-light` | `#d4914e` | `copper-light` | Hero headline accent span |
| `--copper-dark` | `#8f5a2c` | `copper-dark` | Button hover |
| `--dark` | `#1a1f1e` | `dark` | Footer background |
| `--dark-mid` | `#232928` | `dark-mid` | Dark section variants |
| `--text-primary` | `#1c2422` | `text-primary` | Body text |
| `--text-secondary` | `#465a54` | `text-secondary` | Secondary text, nav links |
| `--text-muted` | `#6e847b` | `text-muted` | Labels, placeholders |
| `--white` | `#ffffff` | `white` (built-in) | — |
| `--off-white` | `#f5f7f6` | `off-white` | Section backgrounds |
| `--warm-white` | `#faf8f5` | `warm-white` | About section bg |
| `--border` | `#dce5e1` | `border` | Card/input borders |
| `--gold` | `#e8a32e` | `gold` | Star ratings |
| `--green` | `#2d8659` | `green` | Checkmark/trust icons |

**Note on naming collision:** Tailwind v4 has built-in `--color-green-*` scale tokens. Use `--color-green: #2d8659` in `@theme` — this overrides/extends Tailwind's default green with a custom value, which is intentional. Same for `--color-border` — Tailwind doesn't have a `border` semantic token by default, so this is purely additive.

---

## Hero HTML Spacing & Layout Values

Key pixel values from the hero HTML that need to become Tailwind tokens or inline values:

| Property | Value | Where Used |
|----------|-------|-----------|
| Container max-width | `1320px` | `.container` — every section |
| Container padding | `36px` horizontal | `.container` |
| Header padding | `14px` top/bottom | `.header-inner` |
| Logo icon size | `44x44px` | `.logo-icon` |
| Nav gap | `28px` | `.nav` |
| Header-right gap | `16px` | `.header-right` |
| Header CTA padding | `10px 22px` | `.header-cta` |
| Hero padding | `90px 0 190px` | `.hero` (desktop) |
| Hero padding mobile | `60px 0 140px` | `.hero` (≤1024px) |
| Hero grid gap | `48px` | `.hero-inner` |
| Hero grid columns | `1.15fr 1fr` | `.hero-inner` |
| Section padding | `80px 0` | Most content sections |
| Services grid gap | `24px` | `.services-grid` |
| Card padding | `32px 28px` | `.service-card` |
| Footer padding | `60px 0 24px` | `.footer` |
| Footer padding mobile | `80px bottom` | `.footer` (≤1024px, for sticky bar) |

---

## Responsive Breakpoints from Hero HTML

| Breakpoint | Max-width | Changes |
|------------|-----------|---------|
| Tablet/Mobile | ≤1024px | Hide desktop nav + phone + CTA button; show hamburger; show sticky CTA bar; single-column hero |
| Small mobile | ≤640px | Hero h2 shrinks 3.5rem → 2.1rem; proof grid 4→2 cols; services/process/testimonials → 1 col; areas → 2 col |

Tailwind v4 default breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`. The hero HTML's `≤1024px` maps to `lg:` prefix — use `lg:flex` for desktop nav, `lg:hidden` for hamburger.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` | `@theme` in CSS | Tailwind v4 (Jan 2025) | Fewer files, CSS vars at runtime |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` | Tailwind v4 | Simpler globals.css |
| `tailwindcss` PostCSS plugin | `@tailwindcss/postcss` | Tailwind v4 | Different package name |
| `images.domains` in next.config | `images.remotePatterns` | Next.js 13+ | More secure, flexible |
| `params.slug` sync access | `await params` then `.slug` | Next.js 15 | params is now a Promise |
| `next.config.js` | `next.config.ts` | Next.js 15 | Native TypeScript support |

**Deprecated/outdated:**
- `tailwind.config.js`: Do not create for v4 projects
- `images.domains`: Use `remotePatterns` exclusively
- Sync params destructuring in page components: Always await in Next.js 15

---

## Open Questions

1. **Tailwind v4 custom `--color-border` vs. default Tailwind border utilities**
   - What we know: Tailwind v4 has built-in `border-*` utilities using its own scale. Our `--color-border: #dce5e1` will create a `border-border` utility.
   - What's unclear: Whether `border-border` conflicts with any built-in Tailwind border color names.
   - Recommendation: Use `border-border` for the brand border color; test in dev that it generates correctly. If there's a collision, rename token to `--color-brand-border`.

2. **Scroll shadow on sticky header — Server vs Client**
   - What we know: Sticky header is a Server Component. The scroll shadow effect requires `window.scrollY` which is client-side.
   - What's unclear: The cleanest pattern — a wrapper `'use client'` component vs a global scroll listener.
   - Recommendation: Add a minimal `HeaderScrollWatcher` Client Component (`'use client'`) placed in the root layout that listens to scroll and toggles a CSS class on `document.getElementById('site-header')`. This keeps Header as a Server Component while the scroll effect is handled by a zero-DOM client island.

---

## Sources

### Primary (HIGH confidence)
- `tailwindcss.com/blog/tailwindcss-v4` — @theme directive syntax, PostCSS plugin name, globals.css structure, CSS-first config
- WebSearch verified against official Tailwind v4 announcement — CSS-first config, @theme tokens, v4 performance claims
- WebSearch verified against official Next.js docs — create-next-app flags, next/font/google variable pattern, layout.tsx structure, generateStaticParams, params as Promise in Next.js 15, remotePatterns syntax

### Secondary (MEDIUM confidence)
- Multiple concordant sources on next/font/google + CSS variables pattern with Tailwind v4 (`buildwithmatija.com` + official Next.js font docs referenced in search)
- GitHub discussion #66303 + official Next.js docs: Sharp auto-installed on Vercel; install locally for dev
- `devanddeliver.com` + official generateStaticParams docs: confirmed pattern for dynamic slug pages

### Tertiary (LOW confidence — verify during implementation)
- HeaderScrollWatcher pattern (applying class via DOM from client island) — common React pattern, not specifically documented by Next.js

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Tailwind v4 + Next.js 15 + next/font verified against official sources
- Architecture: HIGH — Server/Client component split is official Next.js guidance; layout patterns verified
- Brand token map: HIGH — extracted directly from source hero HTML file
- Pitfalls: HIGH (Tailwind v4 PostCSS, params Promise) — verified against official changelogs; MEDIUM (scroll watcher) — common pattern, no single authoritative source

**Research date:** 2026-04-05
**Valid until:** 2026-07-05 (Next.js 15 and Tailwind v4 are stable; re-verify if major versions release)
