# Technology Stack

**Project:** Heartland Plumbing Co. — Portfolio Demo Website
**Researched:** 2026-04-05
**Research mode:** Ecosystem (stack dimension only)

---

## Research Constraints

Most external tool permissions (WebSearch, WebFetch, npm registry) were unavailable during this research session. Version numbers are drawn from training data (knowledge cutoff: August 2025) and flagged with confidence levels. **Before installing, run `npm show [package] version` to confirm current stable versions.** The stack choices themselves are HIGH confidence — they are constrained by the project's existing decisions in PROJECT.md, the Vercel/Next.js deployment target, and NSI's established preferences.

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.x (verify) | Full framework — routing, SSG, Image optimization, API routes | App Router + static generation gives near-CDN performance. `next/image` handles WebP conversion and lazy loading automatically. Server Components eliminate client JS for most content. The project's constraints already mandate this. |
| React | 19.x (verify) | UI component model | Ships with Next.js 15; no separate install decision needed. |
| TypeScript | 5.x (verify) | Type safety | Catches schema/prop errors before they reach production. Worth the overhead even on a small site — catches bugs like passing wrong props to SEO metadata components. |

**Confidence: HIGH** — Project.md explicitly requires Next.js + SSG. Next.js 15 / React 19 are the current stable pair as of August 2025. Verify exact patch versions before install.

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.x (verify) | Utility-first CSS | v4 dropped the `tailwind.config.js` in favor of CSS-first config. Produces smaller bundles than v3 via improved tree-shaking. Pairs with Next.js App Router without any special configuration. The project already has brand tokens (teal #1a7a6e, copper #b8733a) that map cleanly to Tailwind custom properties. |
| `@tailwindcss/typography` | latest | Prose styles for FAQ and About content | Service page FAQ sections and the About page need readable long-form text. This plugin provides consistent, accessible prose styling without hand-rolling it. |

**Confidence: MEDIUM** — Tailwind v4 was released in early 2025 and is stable. The config-in-CSS change is a breaking change from v3. If the hero HTML prototype was built against v3 utilities, port carefully. Flag: verify whether `@tailwindcss/typography` has a v4-compatible release.

**Note on Tailwind v4 vs v3:** If you encounter ecosystem friction (e.g., shadcn/ui components not yet updated for v4), fall back to Tailwind v3.4.x. For a custom-designed site without a component library dependency, v4 is fine.

### Fonts

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Bitter (Google Fonts) | — | Display / headings | Already chosen for brand. Serif display font communicates reliability and craftsmanship — appropriate for a 25-year plumbing business. |
| Nunito Sans (Google Fonts) | — | Body text | Already chosen for brand. Humanist sans-serif, highly readable on mobile. Pairs well with Bitter. |
| `next/font/google` | (ships with Next.js) | Font loading | Load both fonts through `next/font/google`, NOT via a `<link>` tag. This eliminates render-blocking font requests and enables automatic font subsetting. Critical for LCP on mobile. |

**Confidence: HIGH** — Font choices are fixed by brand decisions. `next/font` is the correct loading mechanism for Lighthouse 95+.

### Form Handling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Resend | latest | Transactional email on form submission | Free tier: 3,000 emails/month, 100/day — sufficient for a demo and a real client's lead volume. Simple REST API, excellent Next.js App Router compatibility via Server Actions. No third-party form service dependency. |
| React Hook Form | 7.x (verify) | Client-side form state and validation | Minimal re-renders, small bundle (~25KB). Integrates with Zod for schema validation. Avoids controlled input performance issues. |
| Zod | 3.x (verify) | Schema validation (client + server) | Validate form data on both client (React Hook Form resolver) and server (API route / Server Action) with the same schema. Prevents invalid data reaching Resend. TypeScript-first. |

**Confidence: MEDIUM** — Resend is the current standard for Next.js email (as of 2025). Verify Resend free tier limits haven't changed. React Hook Form v7 + Zod v3 are stable and widely used. Alternative: use Nodemailer with SMTP credentials instead of Resend if the client has an existing email provider — but Resend is simpler to configure.

**What NOT to use:**
- **Formspree / EmailJS / Netlify Forms** — third-party dependencies, vendor risk, free tier limitations, no server-side validation.
- **`useState` + `fetch` for form** — leads to more re-renders and more client JS than React Hook Form.
- **SendGrid** — overkill for contact form volume, more complex setup than Resend.

### SEO & Metadata

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js Metadata API | (ships with Next.js 15) | Title tags, meta descriptions, Open Graph, Twitter cards, canonical URLs, robots | Built into App Router. Define metadata per-page via `export const metadata` or `generateMetadata()`. No external SEO library needed. |
| `next-sitemap` | 4.x (verify) | Sitemap generation | Generates `sitemap.xml` and `robots.txt` at build time. Supports per-page priority and changefreq settings. Essential for 13+ page site to signal crawl priority to Google. |
| JSON-LD (inline script) | — | Schema markup (LocalBusiness, Service, FAQPage, etc.) | Implement as `<script type="application/ld+json">` in each page's `<head>`. No library needed — write objects directly in TypeScript for type safety. Google's structured data testing tool validates these directly. |

**Confidence: HIGH** — Next.js Metadata API is the current standard. `next-sitemap` is the community-standard solution for Next.js sitemap generation.

**What NOT to use:**
- **`next-seo`** — was the pre-App-Router standard. Now redundant; Next.js Metadata API does everything it did natively.
- **`react-helmet`** — React Pages Router pattern. Not compatible with App Router without workarounds.

### Image Optimization

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `next/image` | (ships with Next.js) | Automatic WebP conversion, lazy loading, size optimization, CLS prevention | Handles all image optimization automatically. Prevents layout shift with required `width`/`height` props. Serves modern formats (WebP, AVIF) based on browser support. Critical for LCP and CLS Lighthouse scores. |
| Sharp | latest | Server-side image processing (required by next/image in production) | Next.js uses Sharp under the hood for image optimization. Must be installed explicitly: `npm install sharp`. Without it, Next.js falls back to a slower optimizer. |

**Confidence: HIGH** — `next/image` + Sharp is the standard and required combination for Lighthouse 95+ on a Next.js site.

### Infrastructure & Deployment

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vercel | — | Hosting, CDN, deployment | Project constraint. Zero-config Next.js deployment. Global edge network, automatic HTTPS, preview deployments per branch. Free tier sufficient for demo site. |
| GitHub | — | Source control, Vercel integration | Project constraint. Push-to-deploy via Vercel's GitHub integration. |

**Confidence: HIGH** — Project constraints.

### Performance & Bundle Analysis

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `@next/bundle-analyzer` | latest | Visualize JS bundle composition | Run this before final deployment to confirm no large dependencies snuck into client bundles. A 300KB+ client bundle is a Lighthouse killer. One-time analysis tool, not a runtime dependency. |

**Confidence: HIGH** — Standard debugging tool for Next.js performance work.

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Next.js 15 (App Router) | Next.js 14 (Pages Router) | App Router gives Server Components, eliminating client JS for static content. Better for Lighthouse scores. Pages Router is legacy. |
| Framework | Next.js 15 | Astro | Astro would give better default Lighthouse scores with less configuration. However, the project constraint is Next.js — portfolio demo must showcase NSI's Next.js capability. |
| Framework | Next.js 15 | Remix | Remix excels at data-heavy apps. Overkill for a mostly-static contractor site. |
| Styling | Tailwind CSS v4 | CSS Modules | Tailwind faster to develop with, better responsive utilities. CSS Modules fine but more verbose. |
| Styling | Tailwind CSS v4 | Styled-components | Runtime CSS-in-JS adds client bundle weight. Incompatible with Server Components. Do not use. |
| Email | Resend | Nodemailer + SMTP | Both work. Nodemailer requires managing SMTP credentials. Resend simpler, more reliable delivery. |
| Email | Resend | Formspree | Third-party form handler, data leaves your control, free tier limits 50 submissions/month. |
| Schema | Inline JSON-LD | `schema-dts` library | `schema-dts` adds TypeScript types for schema objects. Useful for large sites. Overkill here — 13 pages, manually typed JSON-LD is fine. |
| Fonts | `next/font/google` | `<link rel="preconnect">` + CDN | CDN loading adds a render-blocking network request. `next/font` downloads at build time and serves locally. Measurably better LCP. |
| Sitemap | `next-sitemap` | Manual `sitemap.xml` | Manual works but breaks when pages are added. `next-sitemap` auto-discovers routes. |
| Form validation | Zod | Yup | Both work. Zod is TypeScript-first, better error inference, more actively maintained in 2025. |

---

## Installation

```bash
# Initialize Next.js project with TypeScript and Tailwind
npx create-next-app@latest heartland-plumbing \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

# Image processing (required for next/image in production)
npm install sharp

# Typography plugin
npm install -D @tailwindcss/typography

# Form handling
npm install react-hook-form zod @hookform/resolvers

# Email
npm install resend

# Sitemap
npm install -D next-sitemap

# Bundle analysis (dev only)
npm install -D @next/bundle-analyzer
```

**Before running the above:** Verify current versions with `npm show [package] version` for each package. The `create-next-app` scaffolding will lock Next.js, React, and Tailwind to current stable versions automatically.

---

## Version Verification Checklist

Run before starting development to confirm current stable versions:

```bash
npm show next version
npm show tailwindcss version
npm show react version
npm show typescript version
npm show react-hook-form version
npm show zod version
npm show resend version
npm show next-sitemap version
npm show sharp version
```

---

## What NOT to Include

| Package | Category | Reason |
|---------|----------|--------|
| `framer-motion` | Animation | Adds ~100KB client bundle. Use CSS transitions and `@keyframes` instead for the minimal animation this site needs. |
| `shadcn/ui` | Component library | Heavy dependency, not needed for custom-designed site. Build components directly with Tailwind. |
| `react-query` / `SWR` | Data fetching | No client-side data fetching needed. SSG + Server Components handles everything. |
| `redux` / `zustand` | State management | No complex client state. `useState` for form is sufficient. |
| `next-auth` | Authentication | No authenticated routes on this site. |
| `prisma` / Supabase client | Database | No dynamic data. All content is static. |
| `styled-components` / `emotion` | CSS-in-JS | Runtime cost, breaks Server Components, conflicts with Tailwind approach. |
| `next-seo` | SEO | Redundant with App Router's built-in Metadata API. |
| `react-helmet` | SEO | Pages Router pattern, not App Router compatible. |
| Google Fonts via `<link>` tag | Fonts | Render-blocking. Use `next/font/google` instead. |
| Any analytics SDK (GA4, Plausible) | Analytics | Out of scope for portfolio demo per PROJECT.md. |

---

## Sources

| Claim | Source | Confidence |
|-------|--------|------------|
| Next.js 15 + App Router as current standard | Training data (Aug 2025) — verify at nextjs.org/docs | MEDIUM — version may have incremented |
| Tailwind v4 config-in-CSS change | Training data (Apr 2025 release) | MEDIUM — verify @tailwindcss/typography v4 compat |
| `next/font/google` eliminates render-blocking fonts | Next.js official docs (multiple sources) | HIGH |
| `next/image` + Sharp for image optimization | Next.js official docs | HIGH |
| Resend as standard Next.js email solution | Training data, community consensus | MEDIUM — verify free tier limits |
| `next-sitemap` for sitemap generation | Community standard, training data | MEDIUM — verify App Router v4 compat |
| `next-seo` deprecated by Metadata API | Training data | HIGH — confirmed by Next.js docs |
| React Hook Form + Zod as standard form stack | Community standard, training data | HIGH |

---

*Note: This research was conducted with external tool access restricted. The stack recommendations are HIGH confidence because they are constrained by the project's existing decisions (Next.js, Tailwind, Vercel) and align with well-established patterns in the Next.js ecosystem as of August 2025. Version numbers require verification via npm registry before installation.*
