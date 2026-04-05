---
phase: 01-foundation
verified: 2026-04-05T00:00:00Z
status: gaps_found
score: 10/13 must-haves verified
gaps:
  - truth: Footer service-area links match the data file slugs
    status: failed
    reason: Footer.tsx hardcodes href /service-areas/millard but service-areas.ts exports slug bennington as the 8th area. No millard slug exists. This will 404 when dynamic area pages are built.
    artifacts:
      - path: src/components/layout/Footer.tsx
        issue: Line 17 has href /service-areas/millard but millard is not in service-areas.ts
      - path: src/lib/data/service-areas.ts
        issue: 8th area has slug bennington not millard
    missing:
      - Change Footer.tsx areaLinks[6] to { name: Bennington, href: /service-areas/bennington }
human_verification:
  - test: Open the Vercel deploy URL in a browser
    expected: Working Next.js page loads with sticky header, placeholder body, dark footer. No 404.
    why_human: Cannot make HTTP requests to Vercel from CLI
  - test: Open site at mobile viewport under 768px in browser DevTools
    expected: Teal Call Now bar pinned to bottom. Header shows hamburger only.
    why_human: CSS responsive visibility requires browser rendering
  - test: Scroll down on the page in a browser
    expected: Header gains drop shadow at scrollY > 0, shadow removed at top
    why_human: JavaScript scroll event requires browser execution
  - test: Tap hamburger icon on mobile viewport
    expected: Menu drawer with 4 service links, Areas, About, Contact, Call Now CTA. Tap any link closes menu.
    why_human: React useState toggle requires browser rendering
  - test: Hover Services in desktop nav at viewport over 1024px
    expected: Dropdown shows Drain Cleaning, Water Heaters, Sewer Line Repair, Emergency Plumbing
    why_human: CSS group-hover requires browser rendering
  - test: Check DevTools Network tab filtered for google
    expected: Zero requests to fonts.googleapis.com. Fonts load from /_next/static/media/
    why_human: Network tab requires browser DevTools
---

# Phase 01: Foundation Verification Report

**Phase Goal:** The project skeleton is live on Vercel, renders correctly at every viewport, and all patterns that prevent Lighthouse failure are locked in before any content page is built.
**Verified:** 2026-04-05
**Status:** gaps_found
**Re-verification:** No -- initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | npm run build completes with zero errors | UNCERTAIN | Build not run in this session; GitHub push implies CI passed but requires human confirm |
| 2 | Bitter and Nunito Sans render via next/font with no render-blocking | VERIFIED | layout.tsx imports both from next/font/google with display swap, applied to html element |
| 3 | Tailwind v4 @theme tokens generate working utility classes | VERIFIED | globals.css uses @import tailwindcss + @theme; postcss.config.mjs uses @tailwindcss/postcss; no tailwind.config.ts present |
| 4 | Project on GitHub, Vercel deploy returns a working page | UNCERTAIN | GitHub remote confirmed (ajwegner3-alt/heartland-plumbing); Vercel unverifiable from CLI |
| 5 | Header is sticky, phone is tappable tel: link, collapses to hamburger | VERIFIED | sticky top-0 z-50; tel:4025550147 on CTA with min-h-[48px]; MobileNav lg:hidden hamburger |
| 6 | Header gains box-shadow on scroll | VERIFIED | MobileNav.tsx useEffect adds/removes shadow-header class via scrollY > 0 targeting site-header |
| 7 | Services dropdown shows all 4 service links | VERIFIED | navServices array in Header.tsx maps 4 services; CSS group-hover dropdown implemented |
| 8 | Sticky Call Now bar visible on mobile, hidden on desktop | VERIFIED | MobileCTA.tsx: fixed bottom-0 z-[9999] bg-primary md:hidden; body has pb-20 md:pb-0 |
| 9 | Footer displays service areas, hours, contact info | VERIFIED | Footer.tsx 162 lines; 4-column grid with company info, service links, area links, hours |
| 10 | Footer area links match data file slugs | FAILED | Footer.tsx line 17 has /service-areas/millard but service-areas.ts has slug bennington as 8th area |
| 11 | 4 services, 8 areas, 8-10 testimonials all populated | VERIFIED | services.ts 187 lines / 4 services; service-areas.ts 221 lines / 8 areas; testimonials.ts 80 lines / 10 entries |
| 12 | Every service has 4 FAQs with substantive answers | VERIFIED | 16 FAQ questions across 4 services; all multi-sentence Omaha-specific answers |
| 13 | All URLs follow lowercase hyphen-separated pattern | VERIFIED | All nav/footer hrefs are lowercase hyphen-separated; data file slugs match |

**Score:** 10/13 truths verified (1 failed -- slug mismatch; 2 uncertain -- build and Vercel require human)

---

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| next.config.ts | remotePatterns + image formats | VERIFIED | remotePatterns for unsplash, formats avif/webp |
| postcss.config.mjs | @tailwindcss/postcss plugin | VERIFIED | plugin configured |
| src/app/globals.css | @theme directive with brand tokens | VERIFIED | 39 lines; 16 color tokens, font/radius/shadow vars |
| src/app/layout.tsx | next/font + imports + wiring | VERIFIED | Both fonts, variables on html, Header/Footer/MobileCTA imported and rendered |
| src/components/layout/Header.tsx | Sticky server component with nav | VERIFIED | 144 lines; sticky top-0, desktop nav, phone CTA, MobileNav island |
| src/components/layout/MobileNav.tsx | Client component hamburger | VERIFIED | 157 lines; use client, useState toggle, scroll shadow useEffect |
| src/components/layout/Footer.tsx | Server component footer | PARTIAL | 162 lines; substantive BUT contains slug mismatch on line 17 |
| src/components/layout/MobileCTA.tsx | Fixed bottom Call Now bar | VERIFIED | 28 lines; fixed bottom-0 md:hidden, tel: link |
| src/lib/data/services.ts | 4 services with full content | VERIFIED | 187 lines; ServiceData interface + 4 fully-populated services |
| src/lib/data/service-areas.ts | 8 areas with unique local content | VERIFIED | 221 lines; AreaData interface + 8 areas, genuinely unique localContext per city |
| src/lib/data/testimonials.ts | 8-10 testimonials tagged by service | VERIFIED | 80 lines; 10 testimonials with serviceType tags |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| src/app/layout.tsx | src/app/globals.css | import ./globals.css | WIRED | Line 3 in layout.tsx |
| src/app/layout.tsx | Header.tsx | import + render | WIRED | Imported and rendered before main |
| src/app/layout.tsx | Footer.tsx | import + render | WIRED | Imported and rendered after main |
| src/app/layout.tsx | MobileCTA.tsx | import + render | WIRED | Imported as last element in body |
| Header.tsx | MobileNav.tsx | import + render | WIRED | MobileNav rendered inside header element |
| postcss.config.mjs | globals.css | @tailwindcss/postcss processes @theme | WIRED | Plugin present; no tailwind.config.ts (v4 correct) |
| Footer.tsx | service-areas.ts data | areaLinks href values | BROKEN | Footer has /service-areas/millard; data file has slug bennington |

---

## Requirements Coverage

| Requirement | Status | Notes |
|-------------|--------|-------|
| PERF-01 -- next/font no render-blocking | SATISFIED | Both fonts via next/font with display:swap |
| PERF-02 -- Tailwind v4 tokens | SATISFIED | @theme in globals.css, @tailwindcss/postcss plugin |
| PERF-03 -- Sharp for image optimization | SATISFIED | sharp in package.json |
| PERF-04 -- avif/webp formats | SATISFIED | formats: [image/avif, image/webp] in next.config.ts |
| PERF-05 -- pb-20 clearance for mobile CTA | SATISFIED | body className includes pb-20 md:pb-0 |
| NAV-01 -- sticky header | SATISFIED | sticky top-0 z-50 |
| NAV-02 -- desktop nav with dropdown | SATISFIED | Services dropdown via CSS group-hover |
| NAV-03 -- hamburger on mobile | SATISFIED | MobileNav with lg:hidden, useState toggle |
| NAV-05 -- tel: link in header | SATISFIED | Phone text and CTA button are both tel:4025550147 |
| NAV-06 -- minimum 48px tap target | SATISFIED | min-h-[48px] on CTA button |
| CONV-01 -- sticky mobile CTA bar | SATISFIED | MobileCTA.tsx fixed bottom-0 md:hidden |
| CONV-02 -- footer with service/area links | PARTIAL | Footer exists and wired, but millard slug does not match data file |
| SEO-18 -- metadataBase + title template | SATISFIED | metadataBase set, title template configured |

---

## Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| src/app/page.tsx | 9 | Homepage placeholder text | Info | Intentional Phase 1 placeholder. Not a blocker. |
| src/components/layout/Footer.tsx | 17 | href: /service-areas/millard | Blocker | millard does not exist in service-areas.ts. Will 404 when area pages are built in Phase 2. |

---

## Human Verification Required

### 1. Vercel Deploy URL

**Test:** Open the Vercel deploy URL for the heartland-plumbing repo in a browser.
**Expected:** A working Next.js page loads -- sticky header with logo, placeholder body text, and a dark footer. No 404, no build error page.
**Why human:** Cannot make HTTP requests to Vercel from CLI.

### 2. Mobile Viewport -- Sticky Call Now Bar

**Test:** Open the site on mobile or use Chrome DevTools at width under 768px.
**Expected:** Teal Call Now bar is fixed to the bottom of the screen. Header shows hamburger only, no desktop nav or phone text.
**Why human:** CSS responsive visibility requires browser rendering.

### 3. Scroll Shadow Effect

**Test:** Scroll down on any page in a browser.
**Expected:** Header gains a visible drop shadow as soon as the page scrolls past y=0. Scrolling back to the top removes the shadow.
**Why human:** JavaScript scroll event listener requires browser execution.

### 4. Hamburger Menu Toggle

**Test:** Tap the hamburger icon in the header on mobile viewport.
**Expected:** Menu drawer slides down with 4 service links, Service Areas, About, Contact, and a Call Now CTA. Tapping any link closes the menu.
**Why human:** React useState toggle requires browser rendering.

### 5. Desktop Services Dropdown

**Test:** On a viewport wider than 1024px, hover over Services in the header nav.
**Expected:** Dropdown panel shows Drain Cleaning, Water Heaters, Sewer Line Repair, Emergency Plumbing -- each linking to /services/[slug].
**Why human:** CSS group-hover behavior requires browser rendering.

### 6. Font Loading Check

**Test:** Open DevTools Network tab, reload the page, filter for google.
**Expected:** Zero requests to fonts.googleapis.com. Fonts load from /_next/static/media/ (self-hosted via next/font).
**Why human:** Network tab requires browser DevTools.


---

## Gaps Summary

One confirmed code bug and one Vercel deployment check pending human verification.

**Gap 1 -- Footer/Data Slug Mismatch (code bug, one-line fix):**
Footer.tsx lists Millard with href /service-areas/millard as the 8th service area link. The data source of truth -- service-areas.ts -- defines the 8th area as city Bennington with slug bennington. Millard is a real Omaha neighborhood but is not one of the 8 configured service areas. When Phase 2 builds the dynamic /service-areas/[slug] route, any user clicking Millard in the footer will get a 404. Fix: change Footer.tsx line 17 to { name: Bennington, href: /service-areas/bennington }.

**Gap 2 -- Vercel Deploy Confirmation (human needed):**
The GitHub remote is confirmed pointing to ajwegner3-alt/heartland-plumbing and the working tree is clean. Whether Vercel has successfully built and deployed cannot be determined from the CLI. Human should confirm the deploy URL returns a working page.

All other Phase 01 must-haves are fully verified in the codebase: brand tokens, font config, postcss setup, all 4 layout components with correct wiring, scroll shadow behavior, mobile CTA clearance, and the 3 data files with complete Omaha-specific content.


---

_Verified: 2026-04-05_
_Verifier: Claude (gsd-verifier)_
