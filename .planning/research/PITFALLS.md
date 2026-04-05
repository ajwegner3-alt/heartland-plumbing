# Domain Pitfalls

**Domain:** Next.js SSG plumbing contractor website (Lighthouse 95+, local SEO, conversion-optimized)
**Researched:** 2026-04-05
**Confidence:** HIGH for Next.js/Lighthouse mechanics, HIGH for local SEO patterns, MEDIUM for Omaha-market specifics

---

## Critical Pitfalls

Mistakes that cause rewrites, Lighthouse score collapse, or SEO penalties.

---

### Pitfall 1: Google Fonts Killing LCP and Performance Score

**What goes wrong:** Importing Google Fonts via `<link>` in `_document.tsx` or `layout.tsx` without `display=swap` and font preloading causes render-blocking requests. The font loads late, LCP degrades, and Performance drops from 95+ to 70s. With Bitter + Nunito Sans loaded naively, you lose 10-20 Lighthouse points.

**Why it happens:** Developers copy the standard Google Fonts embed snippet without realizing Next.js has a built-in font optimization system (`next/font/google`) that inlines critical font CSS, eliminates the external network round-trip, and self-hosts the font files at build time.

**Consequences:** Performance score fails the 95+ threshold. LCP blows past 2.5s target. The Cumulative Layout Shift (CLS) also spikes if fallback fonts have different metrics.

**Prevention:**
- Use `next/font/google` exclusively. Import `Bitter` and `Nunito_Sans` via the Next.js font module, apply via CSS variables, never via `<link>` tags.
- Set `display: 'swap'` in the font config.
- Declare `preload: true` for the primary display font (Bitter).
- Use `adjustFontFallback: true` to minimize CLS from font metric mismatch.

**Warning signs:** `preload` resource hints are missing for fonts in the HTML source. Lighthouse flags "Eliminate render-blocking resources." CLS score is non-zero in Lighthouse report.

**Phase:** Address in Phase 1 (project setup / layout scaffolding) — wrong at the start means fixing it later requires touching every component.

---

### Pitfall 2: Service Area Pages with Thin / Duplicate Content

**What goes wrong:** All 8 service area pages (Omaha, Bellevue, Papillion, etc.) share the same boilerplate content with only the city name swapped. Google detects this as duplicate content, discounts the pages, and may penalize the domain's crawl budget. Pages rank for nothing because they offer no unique value.

**Why it happens:** It's fast to copy-paste a template and find-replace the city. The temptation is high, especially on a portfolio demo where the content is fictional anyway.

**Consequences:** Pages don't rank. Google consolidates them into one canonical URL (usually the first one crawled), defeating the entire local SEO strategy. 15+ pages become worthless.

**Prevention:**
- Each service area page must contain at least 3 genuinely unique content elements: a neighborhood-specific paragraph (e.g., Bellevue is near Offutt AFB, older housing stock, specific pipe age concerns), area-specific FAQs, and a unique headline.
- Do not share the same H1 across pages. "Plumber in Bellevue NE" and "Plumber in Papillion NE" are different headlines.
- Even for a demo, write realistic differentiated copy per city. AI-generated content works here if it's genuinely varied.
- Set unique canonical tags per page.

**Warning signs:** `og:description` is identical across service area pages. H1 tags follow an identical pattern with only the city name changing. No unique paragraph content below the hero.

**Phase:** Address in Phase 2 (service area page creation) — plan unique content briefs per city before writing a single page.

---

### Pitfall 3: Next.js Image Component Misuse Causing CLS

**What goes wrong:** Using `next/image` without explicit `width` and `height` props (or `fill` with a sized container) causes Cumulative Layout Shift as the page loads and the image box collapses/expands. A hero image with unspecified dimensions can blow CLS past 0.1, failing Best Practices and Performance simultaneously.

**Why it happens:** Developers assume `next/image` handles everything automatically. It does handle optimization, but it does NOT infer dimensions — you must supply them or use `fill` with a parent container that has explicit dimensions.

**Consequences:** CLS score above 0.1 drops the Performance Lighthouse score out of the 95+ range. The hero section visually "jumps" on load, which also hurts conversion on mobile.

**Prevention:**
- Always provide `width` and `height` for non-fill images.
- For hero/full-bleed images, use `fill` with a parent `div` that has `position: relative` and an explicit height (e.g., `h-[500px]` via Tailwind or `aspect-ratio` CSS).
- Set `priority={true}` on the hero/LCP image to preload it — this is the single biggest LCP win.
- Set `loading="lazy"` (default) on all below-fold images.
- Verify with Chrome DevTools "Layout Shift Regions" overlay before each push.

**Warning signs:** Lighthouse CLS score is non-zero. "Avoid large layout shifts" appears in the Lighthouse report. Hero section visually jumps during initial page load in slow-network throttled testing.

**Phase:** Address in Phase 1 (component scaffolding) — establish image usage patterns before any real images are placed.

---

### Pitfall 4: Schema Markup Errors Breaking Rich Results

**What goes wrong:** JSON-LD schema is written manually, contains syntax errors, uses wrong property names, or nests types incorrectly (e.g., `AggregateRating` inside `LocalBusiness` with a mistyped `ratingCount` vs `reviewCount`). Google's Rich Results Test rejects the schema, no rich snippets appear, and the SEO score drops.

**Why it happens:** Schema is verbose and JSON-LD is unforgiving. A missing comma, wrong key, or incorrect `@type` value silently breaks validation. There's no runtime error — you only find out when you check the Search Console or Rich Results Test.

**Consequences:** No star ratings in search results. No FAQ dropdowns in SERPs. Loss of click-through rate advantage that schema provides. Lighthouse SEO score may drop if structured data is invalid.

**Prevention:**
- Centralize all schema in typed TypeScript helper functions in `lib/schema.ts`. Never inline ad-hoc JSON in page components.
- Validate every schema type with Google's Rich Results Test (https://search.google.com/test/rich-results) before finalizing.
- For `LocalBusiness`: required fields are `name`, `address` (PostalAddress), `telephone`, `url`. Optional but high-value: `openingHoursSpecification`, `aggregateRating`, `areaServed`.
- For `AggregateRating`: use `ratingValue`, `reviewCount`, `bestRating`. Do NOT use `ratingCount` (wrong property name).
- For `FAQPage`: each `mainEntity` must be a `Question` type with `acceptedAnswer` containing an `Answer` type.
- For `BreadcrumbList`: `ListItem` positions must start at 1 (not 0), and each item needs `name` and `item` (URL).

**Warning signs:** Google Search Console shows "Invalid items" in the Enhancements section. Rich Results Test returns red X on any schema type. Any JSON-LD rendered as escaped HTML entities instead of raw JSON.

**Phase:** Address in Phase 2 (SEO infrastructure) — build schema helpers before page content, not after.

---

### Pitfall 5: Tailwind CSS Purging Real Classes at Build Time

**What goes wrong:** Dynamic class names constructed with string interpolation (e.g., `text-${color}-500` or `bg-${variant}`) get purged by Tailwind's JIT compiler at build time because the full class string never appears in source. Components render with no styles applied.

**Why it happens:** Tailwind scans source files for complete class name strings. Interpolated/dynamic class strings are invisible to the scanner. This is a well-documented limitation but easy to forget when building reusable components (e.g., a `TrustBadge` component that accepts a `color` prop).

**Consequences:** Production build has broken styles. Development server works fine (JIT generates all classes on-demand). Bug only surfaces after `next build` — discovered on first Vercel deploy.

**Prevention:**
- Never construct class names dynamically. Use complete strings: `text-teal-600`, not `text-${color}-600`.
- For conditional classes, use a lookup object: `const colorMap = { teal: 'text-teal-600', copper: 'text-amber-600' }`.
- Use `clsx` or `cn` utility for conditional class composition — these still use complete string literals.
- If a class truly must be dynamic, add it to `safelist` in `tailwind.config.js`.

**Warning signs:** Component looks correct in `next dev` but broken after `next build`. Styles are absent in Vercel preview deployments. Searching the compiled CSS bundle for the expected class name returns no results.

**Phase:** Address in Phase 1 (component design patterns) — establish the `colorMap` pattern before building any reusable components.

---

### Pitfall 6: Form Submission Silently Failing on Vercel

**What goes wrong:** A contact form using a Next.js API route (`/api/contact`) for email notification works locally but fails silently in production because: (a) environment variables aren't set in Vercel, or (b) the email sending library (e.g., Nodemailer with Gmail SMTP) is blocked by Vercel's serverless execution environment (port 25/465/587 restrictions vary by provider).

**Why it happens:** Local `.env.local` variables don't auto-deploy to Vercel. Developers forget to add them in the Vercel dashboard. Gmail SMTP also requires App Passwords (not account passwords) and may rate-limit serverless origins.

**Consequences:** The form appears to work (no visible error), but no emails arrive. For a portfolio demo this is embarrassing; for a real client it means lost leads.

**Prevention:**
- Use Resend (resend.com) or Nodemailer with a transactional SMTP service (SendGrid, Postmark) rather than Gmail SMTP for Vercel deployments.
- Resend has a generous free tier (3,000 emails/month) and an SDK designed for serverless/edge environments.
- Add all required env vars to Vercel immediately after initial deploy: `RESEND_API_KEY`, `CONTACT_EMAIL`, etc.
- Build in explicit error responses from the API route and surface them in the UI (don't just `console.log` errors).
- Test the deployed form on the first Vercel deploy — not just locally.

**Warning signs:** Form submission returns 200 but no email arrives. Vercel Function logs show `SMTP connection refused` or `Environment variable not found`. No environment variables visible in Vercel project settings.

**Phase:** Address in Phase 3 (contact/forms) — test email delivery on first deploy before building any success state UI.

---

## Moderate Pitfalls

Mistakes that cause delays or technical debt.

---

### Pitfall 7: Missing Canonical Tags Causing Self-Competition

**What goes wrong:** Service area pages and service pages that are thematically close (e.g., "Drain Cleaning in Omaha" as a service page vs "Omaha Plumber" as a service area page) compete against each other in Google rankings. Without canonical tags, Google may deindex one or alternate between them unpredictably.

**Prevention:**
- Every page must set `<link rel="canonical" href="[absolute-URL]" />` pointing to itself.
- In Next.js App Router, use the `alternates.canonical` field in `generateMetadata()`. In Pages Router, use `next/head`.
- Never let two pages target the exact same keyword phrase. Service pages target the service keyword; service area pages target the city + generic plumber keyword. The overlap is managed by internal linking, not keyword stuffing.

**Phase:** Address in Phase 2 (SEO infrastructure) alongside schema setup.

---

### Pitfall 8: Lighthouse Accessibility Failures from Icon-Only Buttons

**What goes wrong:** Click-to-call buttons, hamburger menus, and social links rendered as icon-only elements (no visible text) fail Lighthouse Accessibility because they have no accessible name. This is a common drop from 100 to 85 on the Accessibility score.

**Prevention:**
- All icon-only interactive elements must have `aria-label` set to a descriptive string (e.g., `aria-label="Call Heartland Plumbing at (402) 555-0147"`).
- Use `<span className="sr-only">` for screen-reader-only text within buttons as an alternative.
- Run `axe` or Lighthouse Accessibility audit after every new interactive component is added.

**Phase:** Address as components are built in each phase — build the `aria-label` pattern from the first button created.

---

### Pitfall 9: Open Graph Images Missing or Wrong Dimensions

**What goes wrong:** Social shares of service pages show either a broken image, a random first image from the page, or an image that crops badly on Twitter/LinkedIn because it isn't 1200x630px. This hurts click-through when the URL is shared.

**Prevention:**
- Create a dedicated OG image for the site (1200x630px WebP or PNG) and store in `/public/og/`.
- In `generateMetadata()`, explicitly set `openGraph.images` with the absolute URL, width (1200), height (630), and alt text.
- Avoid using the hero photo directly as the OG image — it's rarely the right aspect ratio.
- For a portfolio demo, a single branded OG image across all pages is acceptable.

**Phase:** Address in Phase 2 (SEO infrastructure) before any pages are pushed live.

---

### Pitfall 10: Internal Linking Matrix Incomplete at Launch

**What goes wrong:** Service pages and service area pages are created in isolation. Each service page links to the contact page but not to related service area pages. Each service area page lists services but doesn't link to the individual service pages. The internal link graph is sparse, PageRank doesn't flow to deep pages, and cross-page topical authority is lost.

**Prevention:**
- Build a linking matrix before writing any page content:
  - Each service page → links to all 8 service area pages ("Serving [City]")
  - Each service area page → links to all 4 service pages ("Services in [City]")
  - Homepage → links to all service pages and all service area pages (via nav or footer)
- Implement via reusable `RelatedServices` and `ServiceAreas` components that render from a shared data file — don't hardcode links per page.
- Verify with a site crawl tool (Screaming Frog free tier or ahrefs free audit) after launch.

**Phase:** Address in Phase 2 (information architecture) — define the data schema for services and areas before building any page.

---

### Pitfall 11: Sticky Mobile Header Overlapping Anchor Links

**What goes wrong:** In-page anchor links (e.g., `#faq`, `#services`) scroll the target element directly to the top of the viewport, behind the sticky header. FAQ sections and service sections appear cut off. This is a UX defect that also hurts Accessibility scores.

**Prevention:**
- Apply `scroll-margin-top` (CSS) or `scroll-padding-top` on the `<html>` element equal to the sticky header height.
- In Tailwind: add `[scroll-margin-top:80px]` to any anchored section, or set `scroll-padding-top: 80px` on `html` in the global CSS.
- Test every anchor link on mobile after adding the sticky header.

**Phase:** Address in Phase 1 when the sticky header is built — don't wait until anchor links are added later.

---

## Minor Pitfalls

Mistakes that cause annoyance but are fixable.

---

### Pitfall 12: 404 on Trailing Slash Inconsistency

**What goes wrong:** Some links use `/services/drain-cleaning` and others use `/services/drain-cleaning/` (with trailing slash). Vercel's default behavior may 301-redirect trailing-slash URLs, creating unnecessary redirect chains that slow down crawling.

**Prevention:**
- Set `trailingSlash: false` in `next.config.js` explicitly.
- Audit all `<Link href>` values in the codebase to ensure no trailing slashes are used.

**Phase:** Address in Phase 1 (Next.js config) — one-line fix at setup time.

---

### Pitfall 13: Missing `robots.txt` and `sitemap.xml` at Launch

**What goes wrong:** The site launches without a `robots.txt` or `sitemap.xml`. Google has to discover all 15+ pages by crawling links rather than following a sitemap. Deep pages (service area pages) may take weeks to index.

**Prevention:**
- Generate `sitemap.xml` using Next.js built-in `sitemap.ts` route (App Router) or `next-sitemap` package (Pages Router).
- Verify sitemap includes all service pages and service area pages with correct absolute URLs.
- Create `public/robots.txt` with `Sitemap: https://[domain]/sitemap.xml` directive.
- Submit sitemap to Google Search Console on day one.

**Phase:** Address in Phase 2 (SEO infrastructure) — do not launch without these.

---

### Pitfall 14: Lighthouse "Best Practices" Drop from Console Errors

**What goes wrong:** Any `console.error` or `console.warn` in the browser during Lighthouse audit drops the Best Practices score. Common causes: deprecated React prop warnings, missing image `alt` attributes logged by Next.js, or hydration mismatch warnings.

**Prevention:**
- Run `next build` locally and check for warnings in the terminal output.
- Open the browser console in production and verify zero errors before Lighthouse run.
- Treat all React warnings as blocking issues, not cosmetic noise.

**Phase:** Ongoing — check before every Lighthouse audit run.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Phase 1: Project setup & layout | Font loading (Pitfall 1), Tailwind dynamic classes (Pitfall 5), trailing slash config (Pitfall 12), scroll-margin-top (Pitfall 11) | Set up `next/font`, establish color/variant maps, set `trailingSlash: false` on day one |
| Phase 2: SEO infrastructure | Duplicate service area content (Pitfall 2), schema errors (Pitfall 4), missing canonicals (Pitfall 7), OG images (Pitfall 9), incomplete internal linking (Pitfall 10), sitemap/robots (Pitfall 13) | Build data schema first, write schema helpers before pages, validate with Rich Results Test |
| Phase 3: Service & area pages | Thin area page content (Pitfall 2), internal link matrix gaps (Pitfall 10) | Write unique content briefs per city before building, implement RelatedServices component |
| Phase 3: Contact form | Silent form failures on Vercel (Pitfall 6) | Use Resend, add env vars to Vercel on first deploy, test immediately |
| Phase 4: Component polish | Image CLS (Pitfall 3), icon accessibility (Pitfall 8), console errors (Pitfall 14) | Audit Lighthouse before marking any phase complete |
| Pre-launch | robots.txt / sitemap (Pitfall 13), OG images (Pitfall 9), console errors (Pitfall 14) | Full Lighthouse audit on deployed Vercel URL, not localhost |

---

## Sources

**Confidence levels:**

- Next.js `next/font` behavior, Image component CLS mechanics, Tailwind JIT purging: HIGH — directly from Next.js and Tailwind documentation patterns.
- Lighthouse scoring thresholds (LCP <2.5s, CLS <0.1, INP <200ms): HIGH — Google Web Vitals specification.
- Schema property names (`reviewCount` vs `ratingCount`, `ListItem` 1-indexed positions): HIGH — schema.org specification.
- Vercel SMTP restrictions and serverless email delivery patterns: MEDIUM — based on documented Vercel serverless constraints and community patterns (Resend/Nodemailer).
- Local SEO duplicate content penalties for service area pages: MEDIUM — well-established SEO community consensus, Google guidelines on thin content.
- Omaha-market specific content: LOW — fictional demo; competitive landscape not directly researched.

**Note on research constraints:** WebSearch and external file reads were unavailable in this session. All findings are drawn from direct knowledge of Next.js, Lighthouse, Tailwind, Google Schema, and local SEO patterns. Pitfalls involving specific library versions should be verified against current Next.js documentation before implementation.
