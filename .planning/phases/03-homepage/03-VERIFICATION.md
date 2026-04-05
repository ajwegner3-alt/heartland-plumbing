---
phase: 03-homepage
verified: 2026-04-05T23:55:00Z
status: gaps_found
score: 4/5 must-haves verified
gaps:
  - truth: Footer is present with service area links, hours, address, phone, and social links
    status: failed
    reason: Footer.tsx exists and passes most checks but social links are entirely absent and address is partial (city+zip only)
    artifacts:
      - path: src/components/layout/Footer.tsx
        issue: No social link elements rendered. BUSINESS.socialLinks data (facebook + google URLs) exists but Footer.tsx does not import BUSINESS. Street address 4521 S 84th St is in BUSINESS.address.street but only Omaha NE 68102 is displayed.
    missing:
      - Social links section in Footer using BUSINESS.socialLinks.facebook and BUSINESS.socialLinks.google
      - Full street address rendered from BUSINESS.address.street + city + state + zip
---

# Phase 3: Homepage Verification Report

**Phase Goal:** A visitor landing on the homepage sees a fast-loading, professional page that communicates trust, lists services, shows reviews, and offers multiple paths to contact - all above and below the fold.
**Verified:** 2026-04-05T23:55:00Z
**Status:** gaps_found
**Re-verification:** No - initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Hero loads with teal + copper brand, primary CTA above fold, LCP image marked priority | VERIFIED | next/image priority prop line 98; bg-copper on submit button line 344; dual CTAs (tel: + /contact) lines 166-180; fill+priority image avoids CLS |
| 2 | Services grid lists all four services with links to dedicated pages | VERIFIED | services.map() over 4-item array, each card is Link href=/services/slug lines 391-416; all 4 slugs confirmed in services.ts |
| 3 | Trust signals section shows years, reviews, stars, licensed+insured adjacent to CTA | VERIFIED | 4 trust cards lines 433-477: Card1 yearsInBusiness+ (28+), Card2 4.9 star + 312 reviews, Card3 90min emergency, Card4 PL-28541 Licensed+Insured; CTA immediately follows lines 481-491 |
| 4 | Testimonials section displays at least 3 customer quotes with first name and city | VERIFIED | featuredTestimonials: Mike R./Omaha, Sarah T./Papillion, Linda P./La Vista; name and city+NE rendered lines 527-530; gold StarRating on each card |
| 5 | Footer present with service area links, hours, address, phone, and social links | FAILED | 8 area links confirmed. Hours confirmed. Phone tel: confirmed. MISSING: social links not rendered anywhere in Footer.tsx. Address partial: only city+zip shown, no street. |

**Score:** 4/5 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|--------|
| src/app/page.tsx | Full homepage with all sections | VERIFIED | 584 lines, all 5 sections fully implemented, correct metadata export, schema injected at page root |
| src/components/ScrollReveal.tsx | Client island for scroll animation | VERIFIED | 39 lines, real IntersectionObserver, prefers-reduced-motion support, imported and used in page.tsx |
| src/components/layout/Footer.tsx | Footer with all required elements | PARTIAL | 162 lines, substantive, wired via layout.tsx. Missing: social links absent, address partial |
| src/components/JsonLd.tsx | Schema injection component | VERIFIED | 8 lines, script tag component, used twice at page root lines 84-85 |
| src/lib/schema/local-business.ts | LocalBusiness schema generator | VERIFIED | 48 lines, typed WithContext output using schema-dts, wired from page.tsx |
| src/lib/schema/aggregate-rating.ts | AggregateRating schema generator | VERIFIED | 17 lines, typed output, wired from page.tsx |
| src/lib/metadata.ts | generatePageMetadata helper | EXISTS, not used on homepage | 48 lines, substantive. Homepage uses direct export const metadata - omits openGraph and twitter tags. |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|--------|
| page.tsx | /services/slug | Link href line 392 | WIRED | All 4 service slugs link correctly |
| page.tsx | /service-areas/slug | Link href line 554 | WIRED | All 8 area slugs link correctly |
| page.tsx | generateLocalBusinessSchema | import + call line 79 | WIRED | Called in component body, passed to JsonLd |
| page.tsx | generateAggregateRatingSchema | import + call line 80 | WIRED | Called in component body, passed to JsonLd |
| page.tsx | ScrollReveal | import line 11, used lines 381/424/499/542 | WIRED | Wraps all 4 below-fold sections |
| Footer.tsx | BUSINESS.socialLinks | NOT imported | NOT WIRED | Social URLs exist in data but Footer.tsx does not import BUSINESS constant |
| page.tsx | generatePageMetadata | NOT called | NOT WIRED | Direct metadata export used - OG/Twitter tags absent from homepage |

---

### Requirements Coverage

| Requirement | Status | Notes |
|-------------|--------|-------|
| HOME-01: Hero with brand, CTA, LCP image | SATISFIED | priority prop, teal + copper, dual CTAs above fold |
| HOME-02: Services grid linking to /services/* | SATISFIED | All 4 services with correct hrefs |
| HOME-03: Trust signals adjacent to CTA | SATISFIED | 4 cards + CTA button immediately after |
| HOME-04: Testimonials with name/city | SATISFIED | 3 cards, Mike R./Sarah T./Linda P. |
| HOME-05: Service areas section | SATISFIED | 8 area links in dark section |
| HOME-06: Footer with complete info | PARTIAL | Service+area+hours+phone present. Social links absent. Address partial. |
| CONV-03: Form with phone as primary field | SATISFIED | Phone field with required attribute, prominent in hero form |
| CONV-06: Trust signals adjacent to CTA | SATISFIED | Trust microbar in hero + trust section CTA |
| CONV-07: Social proof displayed prominently | SATISFIED | StarRating + 312 reviews + 3 testimonial cards |
| NAV-04: Footer navigation | PARTIAL | Service + area links present, social links absent |

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| src/app/page.tsx | 254 | TODO: Wire form submission in Phase 6 | Info | Expected intentional deferral. Form uses action=/contact GET as placeholder. Not a broken stub. |

No blocker anti-patterns found. The single TODO is a scoped deferral with documented Phase 6 resolution.

---

### Locked Design Decisions - Status

| Decision | Expected | Actual | Status |
|----------|----------|--------|--------|
| Proof stats bar inside hero | Inside hero adjacent to CTA, not a separate section | Lines 211-237 inside section aria-label=Hero | VERIFIED |
| Alternating section backgrounds | white, off-white, white, dark | Services bg-white, Trust bg-off-white, Testimonials bg-white, Areas bg-dark | VERIFIED |
| 3 testimonial cards with gold stars | Mike R., Sarah T., Linda P. with StarRating | Lines 511-536, all 3 present with StarRating | VERIFIED |
| 4 trust signal cards with license PL-28541 | Card 4 shows BUSINESS.license | Line 474 renders PL-28541 dynamically | VERIFIED |
| ScrollReveal wraps section content not section element | Inner content div wrapped | Lines 381/424/499/542 inside container divs | VERIFIED |

---

### Human Verification Required

#### 1. Hero Section Visual and Fold Position

**Test:** Visit the deployed Vercel URL on 1080p desktop and mobile (375px). Confirm H1, call button, and Get Free Estimate link are visible without scrolling.
**Expected:** Both CTAs above the fold. Background image loads with no flash or layout shift.
**Why human:** LCP and CLS values require DevTools or Lighthouse on the live URL - cannot verify from static code.

#### 2. ScrollReveal Animation Behavior

**Test:** Scroll through the page on a live browser. Confirm each section fades in from below as it enters viewport.
**Expected:** Smooth fade-in + translate-y animation. No section stays permanently invisible.
**Why human:** IntersectionObserver behavior requires a live browser.

#### 3. Hero Form Redirect Behavior

**Test:** Fill in the hero form and submit. Confirm redirect to /contact does not 404.
**Expected:** Browser navigates to /contact route with GET query parameters appended.
**Why human:** Requires live browser interaction to confirm redirect target exists.

#### 4. Mobile Sticky CTA Bar

**Test:** On mobile, confirm the sticky CTA bar is pinned at the bottom of the screen throughout scrolling.
**Expected:** CTA bar visible on mobile, hidden on desktop. Tel: link functions on tap.
**Why human:** CSS sticky/fixed behavior requires live browser.

---

### Gaps Summary

One gap blocks full goal achievement against success criterion 5.

The footer is missing social links. The ROADMAP requires social links in the footer. BUSINESS.socialLinks contains facebook and google profile URLs but Footer.tsx does not import the BUSINESS constant and renders no social link elements. The footer also displays only Omaha NE 68102 rather than the full street address 4521 S 84th St Omaha NE 68127, making the address incomplete against criterion 5.

Secondary observation flagged for Phase 7 (not a Phase 3 ROADMAP blocker):

The homepage uses a direct export const metadata object rather than generatePageMetadata(). This omits openGraph and twitter metadata from the homepage. The helper exists and is correct - the homepage just needs to use it. This conflicts with project SEO standards in CLAUDE.md but does not appear in the Phase 3 success criteria.

---

*Verified: 2026-04-05T23:55:00Z*
*Verifier: Claude (gsd-verifier)*
