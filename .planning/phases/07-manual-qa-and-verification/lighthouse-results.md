# Lighthouse Audit Results

## Environment Note

Lighthouse CLI and Vercel CLI are not available in this execution environment.
Scores below are from a **code-level static audit** (structural analysis + WCAG contrast math),
not a live browser run. Per the plan's fallback guidance, this audit approach was used when
CLI tooling was unavailable after one attempt.

**Vercel Deployment:** Not yet confirmed live (see Pending Todos in STATE.md). Connection
requires Andrew's manual action via the Vercel dashboard. Once live, Andrew should run
`npx lighthouse https://heartlandplumbingomaha.com --output html` locally to confirm numeric scores.

---

## Run 1 — Code Audit — 2026-04-06

### WCAG Color Contrast Analysis

All brand colors checked against WCAG 2.1 AA thresholds (4.5:1 normal text, 3:1 large text).

| Color Pair | Ratio | Required | Status |
|-----------|-------|----------|--------|
| `text-primary` (#1c2422) on white | 15.85 | 4.5 | PASS |
| `text-secondary` (#465a54) on white | 7.37 | 4.5 | PASS |
| `text-muted` (#596e67) on white | 5.45 | 4.5 | PASS (fixed) |
| `text-muted` (#596e67) on off-white | 5.07 | 4.5 | PASS (fixed) |
| `primary` (#1a7a6e) on white | 5.18 | 4.5 | PASS |
| `primary-light` (#22a190) on dark bg | 5.22 | 4.5 | PASS |
| `copper` (#8f5a2c) on white | 5.73 | 4.5 | PASS (fixed) |
| White on `copper` (#8f5a2c) | 5.73 | 4.5 | PASS (fixed) |
| White on `copper-dark` (#7a4a22) | 7.42 | 4.5 | PASS |
| White on `dark` (#1a1f1e) | 16.68 | 4.5 | PASS |
| `gold` (#e8a32e) on dark bg | 7.71 | 4.5 | PASS |
| `green` (#2d8659) on white | 4.50 | 4.5 | PASS |
| `red-600` (#dc2626) on white | 4.83 | 4.5 | PASS |
| `red-400` (#f87171) on dark bg | 6.03 | 4.5 | PASS |

**Fixes applied (Rule 1 - Bug):**
- `text-muted` darkened: `#6e847b` → `#596e67` (was 4.00 on white, now 5.45)
- `copper` scale shifted darker: `#b8733a` → `#8f5a2c` (was 3.78 on white, now 5.73)
- `copper-dark` updated: `#8f5a2c` → `#7a4a22` (hover state remains darker than base)
- `copper-light` set to `#b8733a` (the old copper value, used on dark backgrounds only — 4.41:1)

### Accessibility Audit

| Check | Pages Audited | Status |
|-------|--------------|--------|
| Hamburger button `aria-label` (Open/Close menu) | MobileNav.tsx | PASS |
| `aria-expanded` on hamburger | MobileNav.tsx | PASS |
| Social links `aria-label` (Facebook, Google) | Footer.tsx | PASS |
| All decorative SVGs have `aria-hidden="true"` | All pages | PASS |
| BBB seal SVG has `aria-label` | page.tsx | PASS |
| Star ratings wrapped with `aria-label` | page.tsx | PASS |
| All form fields have associated `<label>` via `htmlFor`/`id` | ContactForm.tsx, page.tsx | PASS |
| Error messages use `aria-describedby` | ContactForm.tsx | PASS |
| Required fields use `aria-required="true"` | ContactForm.tsx | PASS |
| Breadcrumb nav has `aria-label="Breadcrumb"` | All pages | PASS |
| `aria-current="page"` on active breadcrumb | about/page.tsx | PASS |
| ScrollReveal respects `prefers-reduced-motion` | ScrollReveal.tsx | PASS |
| Heading hierarchy H1 → H2 → H3 | All pages | PASS |
| `lang="en"` on `<html>` | layout.tsx | PASS |
| Backdrop overlay has `aria-hidden="true"` | MobileNav.tsx | PASS |

### SEO Audit

| Check | Status |
|-------|--------|
| Unique title tags on all 24 pages | PASS — `generatePageMetadata()` enforces uniqueness |
| Meta descriptions on all pages | PASS — 144–156 chars, all unique |
| `metadataBase` set for canonical URL resolution | PASS — `https://www.heartlandplumbingomaha.com` |
| Canonical tags (`alternates.canonical`) | PASS — set on every page |
| robots.txt allows all | PASS — `/robots.ts` returns `allow: '/'` |
| No pages set to `noindex: true` | PASS — only the optional parameter, unused |
| Sitemap at `/sitemap.xml` | PASS — 24 URLs generated |
| Open Graph tags on all pages | PASS — via `generatePageMetadata()` |
| Twitter Card tags | PASS — `summary_large_image` on all pages |
| LocalBusiness schema | PASS — homepage + about |
| Service schema on service pages | PASS — all 4 service pages |
| FAQPage schema on service pages | PASS — all 4 service pages |
| BreadcrumbList schema | PASS — all inner pages |
| AggregateRating schema | PASS — homepage |
| H1 on every page | PASS |
| Descriptive URLs (no IDs, query params) | PASS |

### Best Practices Audit

| Check | Status |
|-------|--------|
| No `console.log` statements | PASS — grep confirms zero matches |
| All `target="_blank"` links have `rel="noopener noreferrer"` | PASS — Footer.tsx lines 88, 99 |
| No raw `<img>` tags (all use `next/image`) | PASS |
| Background decorative image has `alt=""` + `aria-hidden` | PASS — hero image |
| `font-display: swap` on web fonts | PASS — Bitter + Nunito_Sans both use `display: 'swap'` |
| HTTPS enforced by Vercel (when live) | EXPECTED — Vercel provides HTTPS automatically |

### Performance Indicators

| Check | Status |
|-------|--------|
| All 24 pages pre-rendered as static HTML (SSG) | PASS |
| Hero image has `priority={true}` + `fill` + `sizes="100vw"` | PASS |
| `next/font/google` for zero-layout-shift fonts | PASS |
| No component libraries loaded (zero framer-motion, shadcn) | PASS |
| `ScrollReveal` uses CSS transforms (no layout shift) | PASS |
| Sharp image optimization package installed | PASS |
| API route only used for contact form POST | PASS — minimal server-side surface |
| JSON-LD rendered as inline scripts (no HTTP fetch) | PASS |

---

## Issues Found (Fixed in Task 2)

### Color Contrast Failures (WCAG 2.1 AA)

1. **`text-muted` on white: 4.00** (required 4.5)
   - Affects: `text-xs` helper text, "(optional)" labels, testimonial city names, trust badges
   - Fix: Darkened `--color-text-muted` from `#6e847b` to `#596e67`
   - New ratio: 5.45 on white, 5.07 on off-white

2. **`copper` on white: 3.78** (required 4.5)
   - Affects: Required field asterisk (*) labels, field error messages, emergency callout text
   - Fix: Shifted copper scale darker — `--color-copper` from `#b8733a` to `#8f5a2c`
   - New ratio: 5.73 on white (also fixes white-on-copper button at 5.73)
   - `copper-dark` updated from `#8f5a2c` to `#7a4a22` (hover state)
   - `copper-light` set to `#b8733a` (dark-background only use — 4.41:1, passes 3:1 large text)

---

## Projected Scores (Code Analysis Basis)

| Category | Projected | Notes |
|----------|-----------|-------|
| Performance | 95–100 | SSG, priority hero image, next/font, no runtime JS bundles |
| Accessibility | 95–100 | All WCAG AA contrast fixes applied; aria attributes complete |
| Best Practices | 95–100 | No console.log, HTTPS on Vercel, rel=noopener on blank links |
| SEO | 100 | Full metadata, schema, sitemap, robots, canonical tags |

**To confirm with actual browser Lighthouse:** Once Vercel is connected and deployed, run:
```bash
npx lighthouse https://heartlandplumbingomaha.com --output html --output-path ./lighthouse-report.html --chrome-flags="--headless --no-sandbox"
```

---

## Run 2 — Post-Fix Verification

Build status: PASS (`npm run build` — 24/24 pages generated, 0 TypeScript errors)

All contrast fixes verified via WCAG contrast ratio calculator (node.js script).
All structural accessibility checks verified via code inspection.

**Final color scale (globals.css):**
```css
--color-copper: #8f5a2c;        /* 5.73:1 on white — WCAG AA */
--color-copper-light: #b8733a;  /* 4.41:1 on dark — WCAG large text */
--color-copper-dark: #7a4a22;   /* 7.42:1 on white — WCAG AAA */
--color-text-muted: #596e67;    /* 5.45:1 on white — WCAG AA */
```
