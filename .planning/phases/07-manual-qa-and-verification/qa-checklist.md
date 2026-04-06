# Heartland Plumbing — Manual QA Checklist

**Project:** Heartland Plumbing Co. website  
**Repo:** https://github.com/ajwegner3-alt/heartland-plumbing  
**Domain:** https://www.heartlandplumbingomaha.com  
**QA Date:** ___________  
**Reviewer:** Andrew Wegner

---

## PREREQUISITE: Vercel Setup

Before any browser-based QA can begin, confirm these steps are complete:

- [ ] GitHub repo connected to Vercel (Dashboard → Import Git Repository → `ajwegner3-alt/heartland-plumbing`)
- [ ] `RESEND_API_KEY` added to Vercel environment variables
- [ ] `RESEND_FROM_EMAIL` added to Vercel environment variables (use `onboarding@resend.dev` initially)
- [ ] Deployment triggered and shows "Ready" status in Vercel dashboard
- [ ] Live URL confirmed (either `heartlandplumbingomaha.com` or the Vercel preview URL)

**Note:** All manual visual checks below require the live Vercel URL. The domain `heartlandplumbingomaha.com` may not resolve until DNS is configured, so use the Vercel preview URL (e.g., `heartland-plumbing-xxx.vercel.app`) if the custom domain is not yet set up.

---

## Section A: Automated Checks (Pre-filled by Claude)

### A1. Build Status

| Check | Result |
|-------|--------|
| `npm run build` exits with no errors | **PASS** — 0 TypeScript errors, 0 compile errors |
| Total static pages generated | **PASS** — 24 pages total (16 content routes + system routes) |
| Content routes confirmed | **PASS** — See route list below |
| No dynamic routes fail static generation | **PASS** — All [slug] pages use generateStaticParams |

**Content routes verified in build output:**

| Route | Type |
|-------|------|
| `/` | Static (Homepage) |
| `/about` | Static |
| `/contact` | Static |
| `/services` | Static (index) |
| `/services/drain-cleaning` | SSG |
| `/services/water-heaters` | SSG |
| `/services/sewer-line-repair` | SSG |
| `/services/emergency-plumbing` | SSG |
| `/service-areas` | Static (index) |
| `/service-areas/omaha` | SSG |
| `/service-areas/bellevue` | SSG |
| `/service-areas/papillion` | SSG |
| `/service-areas/la-vista` | SSG |
| `/service-areas/ralston` | SSG |
| `/service-areas/elkhorn` | SSG |
| `/service-areas/gretna` | SSG |
| `/service-areas/bennington` | SSG |

Total content pages: **17** (16 listed + `/api/contact` dynamic route excluded from count per plan)

### A2. Console.log Check

| Check | Result |
|-------|--------|
| No `console.log` in source files | **PASS** — Zero console.log statements found in `src/` |

### A3. Sitemap Verification

| Check | Result |
|-------|--------|
| `sitemap.ts` references homepage | **PASS** — `https://www.heartlandplumbingomaha.com/` included |
| `sitemap.ts` references `/about` | **PASS** — included |
| `sitemap.ts` references `/contact` | **PASS** — included |
| `sitemap.ts` references `/services` | **PASS** — included |
| `sitemap.ts` references `/service-areas` | **PASS** — included |
| `sitemap.ts` generates all 4 service pages | **PASS** — via `services.map()` |
| `sitemap.ts` generates all 8 area pages | **PASS** — via `areas.map()` |
| Total URLs in sitemap | **PASS** — 15 URLs (homepage + about + contact + services index + service-areas index + 4 service pages + 8 area pages) |

### A4. Robots.txt Verification

| Check | Result |
|-------|--------|
| `robots.ts` allows all crawling (`allow: '/'`) | **PASS** |
| Sitemap URL declared in robots.txt | **PASS** — `https://www.heartlandplumbingomaha.com/sitemap.xml` |
| No important pages blocked | **PASS** |

### A5. Schema Markup Presence (Source-Level)

| Page | Schema Types Present | Result |
|------|---------------------|--------|
| Homepage (`/`) | LocalBusiness (Plumber) + AggregateRating | **PASS** |
| About (`/about`) | LocalBusiness + BreadcrumbList | **PASS** |
| Contact (`/contact`) | BreadcrumbList | **PASS** |
| Services index (`/services`) | BreadcrumbList (via JsonLd) | **PASS** |
| Service pages (`/services/[slug]`) | Service + FAQPage + BreadcrumbList | **PASS** |
| Service-Areas index (`/service-areas`) | BreadcrumbList | **PASS** |
| Area pages (`/service-areas/[slug]`) | LocalBusiness (area) + BreadcrumbList | **PASS** |

### A6. WCAG Contrast (From Phase 07-01 Audit)

| Check | Result |
|-------|--------|
| Body text on white (#374151 on #fff) | **PASS** — 10.47:1 |
| Copper buttons white text (#fff on #8f5a2c) | **PASS** — 5.73:1 |
| Muted text (#596e67 on #fff) | **PASS** — 5.45:1 |
| Emergency red text (#dc2626 on #fff) | **PASS** — 5.53:1 |
| Teal on dark background | **PASS** — 6.2:1 |

---

## Section B: Global / Sitewide Checks (Manual)

Open the live URL in Chrome on both **desktop** (1280px+) and **mobile** (iPhone-sized, ~390px).

### B1. Header

| Check | Desktop | Mobile |
|-------|---------|--------|
| Logo "Heartland Plumbing Co." visible | [ ] | [ ] |
| Phone number `(402) 555-0147` visible and tappable | [ ] | [ ] |
| Navigation links present (Services dropdown, Areas, About, Contact) | [ ] | N/A |
| Hamburger menu icon appears on mobile | N/A | [ ] |
| Mobile menu opens and closes correctly | N/A | [ ] |
| All nav links route to correct pages | [ ] | [ ] |
| Header is sticky (stays visible when scrolling down) | [ ] | [ ] |

### B2. Mobile CTA Strip (Bottom of Screen)

| Check | Result |
|-------|--------|
| Fixed CTA bar visible at bottom on mobile | [ ] |
| "Call Now" button links to `tel:4025550147` | [ ] |
| "Free Estimate" button links to `/contact` | [ ] |
| Bar does NOT appear on desktop (hidden at md:) | [ ] |

### B3. Footer

| Check | Desktop | Mobile |
|-------|---------|--------|
| Company name and description present | [ ] | [ ] |
| Service area list (8 cities) visible | [ ] | [ ] |
| Hours listed (Mon–Fri 7am–7pm, 24/7 Emergency) | [ ] | [ ] |
| Phone number clickable | [ ] | [ ] |
| All footer nav links work | [ ] | [ ] |
| Copyright year correct (2024 or 2025) | [ ] | [ ] |

### B4. Open Graph / Social

| Check | Result |
|-------|--------|
| `/opengraph-image.png` loads (visit the URL directly) | [ ] |

---

## Section C: Page-by-Page Visual Checks (Manual)

Open DevTools Console (F12) on each page and check for red errors.

### C1. Homepage (`/`)

| Check | Desktop | Mobile |
|-------|---------|--------|
| Hero headline readable and above fold | [ ] | [ ] |
| Hero subheadline present | [ ] | [ ] |
| "Call (402) 555-0147" CTA button visible | [ ] | [ ] |
| "Get a Free Estimate" CTA button visible | [ ] | [ ] |
| Proof stats bar (years, reviews, response time) present | [ ] | [ ] |
| Services section shows 4 service cards | [ ] | [ ] |
| Service cards link to correct service pages | [ ] | [ ] |
| Testimonials section shows review cards | [ ] | [ ] |
| Star ratings display correctly | [ ] | [ ] |
| Service areas grid shows 8 cities | [ ] | [ ] |
| Area links route correctly | [ ] | [ ] |
| Scroll reveal animations trigger on scroll | [ ] | [ ] |
| No console errors | [ ] | [ ] |

### C2. About Page (`/about`)

| Check | Desktop | Mobile |
|-------|---------|--------|
| Page title "About Heartland Plumbing" visible | [ ] | [ ] |
| Owner name (Marcus Webb) and bio present | [ ] | [ ] |
| Owner avatar (teal circle with "M") renders | [ ] | [ ] |
| License and insurance info displayed | [ ] | [ ] |
| Trust signals (BBB, certifications) present | [ ] | [ ] |
| No console errors | [ ] | [ ] |

### C3. Contact Page (`/contact`)

| Check | Desktop | Mobile |
|-------|---------|--------|
| Contact form visible with all fields | [ ] | [ ] |
| Fields present: Name, Phone, Service, Zip, Message | [ ] | [ ] |
| Phone number and address visible alongside form | [ ] | [ ] |
| Emergency notice visible | [ ] | [ ] |
| No console errors | [ ] | [ ] |

### C4. Services Index (`/services`)

| Check | Desktop | Mobile |
|-------|---------|--------|
| All 4 service cards displayed | [ ] | [ ] |
| Each card links to correct service page | [ ] | [ ] |
| No console errors | [ ] | [ ] |

### C5. Service Pages (check each)

Visit each URL: `/services/drain-cleaning`, `/services/water-heaters`, `/services/sewer-line-repair`, `/services/emergency-plumbing`

| Check | Drain | Water Heaters | Sewer | Emergency |
|-------|-------|--------------|-------|-----------|
| Page loads (no 404) | [ ] | [ ] | [ ] | [ ] |
| H1 heading present and correct | [ ] | [ ] | [ ] | [ ] |
| Service description (3–4 paragraphs) | [ ] | [ ] | [ ] | [ ] |
| Common problems list visible | [ ] | [ ] | [ ] | [ ] |
| Pricing range displayed | [ ] | [ ] | [ ] | [ ] |
| FAQ accordion section present | [ ] | [ ] | [ ] | [ ] |
| FAQ items expand/collapse on click | [ ] | [ ] | [ ] | [ ] |
| Sidebar CTA with phone number visible (desktop) | [ ] | [ ] | [ ] | [ ] |
| Related services links present | [ ] | [ ] | [ ] | [ ] |
| Emergency page: red 24/7 alert strip at top | N/A | N/A | N/A | [ ] |
| Breadcrumb navigation visible | [ ] | [ ] | [ ] | [ ] |
| No console errors | [ ] | [ ] | [ ] | [ ] |

### C6. Service Area Pages (check each)

Visit each URL: `/service-areas/omaha`, `/service-areas/bellevue`, `/service-areas/papillion`, `/service-areas/la-vista`, `/service-areas/ralston`, `/service-areas/elkhorn`, `/service-areas/gretna`, `/service-areas/bennington`

| Check | Omaha | Bellevue | Papillion | La Vista | Ralston | Elkhorn | Gretna | Bennington |
|-------|-------|----------|-----------|----------|---------|---------|--------|------------|
| Page loads (no 404) | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| City name in H1 | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Neighborhoods list | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Local context (2 paragraphs) | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Services grid (4 cards) | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| "We Also Serve" links | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| No console errors | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

---

## Section D: Contact Form Testing (Manual)

**Prerequisite:** `RESEND_API_KEY` and `RESEND_FROM_EMAIL` must be set in Vercel env vars before this test will work.

### D1. Client-Side Validation

| Check | Result |
|-------|--------|
| Submit empty form → validation errors appear on all required fields | [ ] |
| Enter invalid phone format → phone error appears | [ ] |
| Enter invalid zip (not 5 digits) → zip error appears | [ ] |

### D2. Successful Submission

| Check | Result |
|-------|--------|
| Fill in: Name, valid Phone, select a Service, valid Zip, optional Message | [ ] |
| Click "Send Message" → loading state appears (button shows spinner or disabled state) | [ ] |
| Success message appears after submission (green confirmation box) | [ ] |
| Email received at the configured `RESEND_FROM_EMAIL` address | [ ] |
| Email contains: sender name, phone, service, zip, message | [ ] |

### D3. Error State (Optional — only if easy to test)

| Check | Result |
|-------|--------|
| If Resend key is wrong/missing → error message displayed (not a crash) | [ ] |

---

## Section E: Schema Markup Validation (Manual — Google)

Visit https://search.google.com/test/rich-results and test these URLs:

| URL | Schema Type to Validate | Result |
|-----|------------------------|--------|
| `[your-vercel-url]/` | Local Business + AggregateRating | [ ] PASS / [ ] FAIL |
| `[your-vercel-url]/services/drain-cleaning` | Service + FAQPage | [ ] PASS / [ ] FAIL |
| `[your-vercel-url]/services/water-heaters` | Service + FAQPage | [ ] PASS / [ ] FAIL |
| `[your-vercel-url]/about` | Local Business | [ ] PASS / [ ] FAIL |

**Note:** The Rich Results Test may not index a Vercel preview URL if it's password-protected. Use the public URL. If it times out, copy/paste the page source into the "Code" tab instead.

---

## Section F: Sitemap and Robots (Manual)

| Check | Result |
|-------|--------|
| Visit `[live-url]/sitemap.xml` → XML file loads with 15 URLs | [ ] |
| All URLs in sitemap begin with `https://www.heartlandplumbingomaha.com/` | [ ] |
| Visit `[live-url]/robots.txt` → shows `Allow: /` and sitemap URL | [ ] |

---

## Section G: Mobile UX Spot Check

On a real phone or Chrome DevTools mobile emulation (iPhone 14 Pro, 393×852):

| Check | Result |
|-------|--------|
| Homepage hero text readable without horizontal scroll | [ ] |
| Phone CTA button tap target large enough (at least 48px height) | [ ] |
| Service cards stack vertically (not cropped) | [ ] |
| FAQ accordion works on touch (tap to expand) | [ ] |
| Contact form fields are large enough to tap (no mis-tapping) | [ ] |
| Footer stacks cleanly (no overlapping columns) | [ ] |
| Bottom CTA bar does not overlap footer | [ ] |

---

## Section H: Performance Spot Check (Manual)

Visit https://pagespeed.web.dev and test the homepage URL.

| Metric | Target | Actual |
|--------|--------|--------|
| Performance score (mobile) | 90+ | ___ |
| LCP | < 2.5s | ___ |
| CLS | < 0.1 | ___ |
| INP | < 200ms | ___ |

*(Reference: Phase 07-01 code-level audit projected 95+ — this is live confirmation)*

---

## Section I: Issues Log

Document any FAIL items here before signing off:

| # | Page | Issue | Severity | Fixed? |
|---|------|-------|----------|--------|
| — | — | — | — | — |

---

## Final Sign-Off

- [ ] All automated checks: **PASS**
- [ ] All global/sitewide checks: **PASS**
- [ ] All page-by-page visual checks: **PASS**
- [ ] Contact form: **working end-to-end**
- [ ] Schema markup: **validates in Google Rich Results Test**
- [ ] Sitemap + robots.txt: **accessible at live URL**
- [ ] Mobile UX: **verified**
- [ ] No outstanding FAIL items

**Signed off by:** ___________________  
**Date:** ___________________  
**Project status:** COMPLETE
