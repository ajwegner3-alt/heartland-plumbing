import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { generateLocalBusinessSchema } from '@/lib/schema/local-business'
import { generateAggregateRatingSchema } from '@/lib/schema/aggregate-rating'
import { generatePageMetadata } from '@/lib/metadata'
import { BUSINESS } from '@/lib/data/business'
import { services } from '@/lib/data/services'
import { testimonials } from '@/lib/data/testimonials'
import { areas } from '@/lib/data/service-areas'
import { ScrollReveal } from '@/components/ScrollReveal'

export const metadata = generatePageMetadata({
  title: 'Plumber in Omaha, NE',
  description:
    'Licensed Omaha plumber since 1998. 4.9-star rating, 312 reviews. Same-day service, 24/7 emergency calls. Free estimates — call (402) 555-0147.',
  path: '/',
})

// Star rating helper — server-rendered SVG stars
function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
          className={i < rating ? 'text-gold' : 'text-white/30'}
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

// Service icon map — inline SVG paths matched to each service
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'drain-cleaning': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  'water-heaters': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  ),
  'sewer-line-repair': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  'emergency-plumbing': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
}

const yearsInBusiness = new Date().getFullYear() - BUSINESS.yearsFounded

// Select 3 representative testimonials
const featuredTestimonials = [
  testimonials.find((t) => t.name === 'Mike R.'),
  testimonials.find((t) => t.name === 'Sarah T.'),
  testimonials.find((t) => t.name === 'Linda P.'),
].filter(Boolean) as typeof testimonials

export default function HomePage() {
  const lbSchema = generateLocalBusinessSchema()
  const arSchema = generateAggregateRatingSchema()

  return (
    <>
      <JsonLd data={lbSchema} />
      <JsonLd data={arSchema} />

      {/* ─── HERO SECTION ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden flex items-center bg-dark"
        style={{ minHeight: '95vh', paddingTop: '90px', paddingBottom: '190px' }}
        aria-label="Hero"
      >
        {/* Background image — LCP element, priority load */}
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

        {/* Dark gradient overlay — heavier on left for text legibility */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(to right, rgba(26,31,30,0.88) 0%, rgba(26,31,30,0.72) 40%, rgba(26,31,30,0.52) 70%, rgba(26,31,30,0.38) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Wave divider — fill matches Services section (white) */}
        <div
          className="absolute bottom-[-2px] left-0 w-full z-[3] leading-none pointer-events-none"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="block w-full"
            style={{ height: '80px' }}
          >
            <path
              d="M0,40 C120,70 240,80 360,60 C480,40 540,10 720,20 C900,30 960,70 1080,65 C1200,60 1320,30 1440,45 L1440,80 L0,80 Z"
              fill="#ffffff"
            />
          </svg>
        </div>

        {/* Content grid */}
        <div className="relative z-[4] max-w-[1320px] mx-auto px-9 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 items-center">

            {/* ── LEFT COLUMN: headline + CTA + proof ── */}
            <div className="flex flex-col gap-7">

              {/* H1 */}
              <h1 className="font-display font-black text-white text-5xl lg:text-[3.4rem] leading-[1.08] tracking-tight">
                Expert Plumbing Services<br />
                <span className="text-primary-light">in Omaha, NE</span>
              </h1>

              {/* Subheadline */}
              <p className="font-body text-white/80 text-lg leading-relaxed max-w-[480px]">
                Licensed since {BUSINESS.yearsFounded}. Same-day service, <span className="text-red-300 font-semibold">24/7</span> emergency dispatch, and honest estimates before we start any work. Proudly serving Omaha and the surrounding metro.
              </p>

              {/* Dual CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={BUSINESS.phoneHref}
                  className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-base px-7 py-4 rounded-sm transition-colors min-h-[52px]"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l1.65-1.84a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Call {BUSINESS.phone}
                  <span className="text-red-300 text-sm font-bold">(24/7)</span>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border-2 border-white/60 hover:border-white text-white font-bold text-base px-7 py-4 rounded-sm transition-colors min-h-[52px] hover:bg-white/10"
                >
                  Get Free Estimate
                </Link>
              </div>

              {/* Trust signals row — badge-style containers for visual weight parity */}
              <div className="flex items-stretch gap-3 flex-wrap">
                {/* Google rating badge */}
                <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-md px-4 py-2.5">
                  <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-white font-bold text-sm">{BUSINESS.rating.value}</span>
                      <StarRating rating={5} size={12} />
                    </div>
                    <span className="text-white/60 text-[11px] font-medium">{BUSINESS.rating.count} Reviews</span>
                  </div>
                </div>

                {/* Licensed & Insured badge */}
                <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-md px-4 py-2.5">
                  <div className="w-9 h-9 bg-primary/30 rounded-full flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] text-primary-light" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm">Licensed &amp; Insured</span>
                    <span className="text-white/60 text-[11px] font-medium">NE #{BUSINESS.license}</span>
                  </div>
                </div>

                {/* BBB Accredited Business seal — height matches frosted badge row (48px) */}
                <div className="flex items-center shrink-0">
                  <svg width="206" height="48" viewBox="0 0 240 56" xmlns="http://www.w3.org/2000/svg" className="rounded-md" aria-label="BBB Accredited Business A+ Rating">
                    <rect width="240" height="56" rx="6" fill="#00607B"/>
                    <g transform="translate(10,6)">
                      <path d="M12 0C12 0 8 6 8 10c0 2.2 1.8 4 4 4s4-1.8 4-4C16 6 12 0 12 0z" fill="#FFB81C"/>
                      <path d="M12 3C12 3 10 7 10 9.5c0 1.1.9 2 2 2s2-.9 2-2C14 7 12 3 12 3z" fill="#FF6B00"/>
                      <rect x="10.5" y="14" width="3" height="24" rx="1.5" fill="white"/>
                      <rect x="7" y="38" width="10" height="3" rx="1" fill="white"/>
                      <rect x="8.5" y="41" width="7" height="2" rx="0.5" fill="white"/>
                    </g>
                    <text x="36" y="24" fontFamily="Arial,Helvetica,sans-serif" fontWeight="900" fontSize="22" fill="white" letterSpacing="1">BBB</text>
                    <line x1="36" y1="29" x2="88" y2="29" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
                    <text x="36" y="40" fontFamily="Arial,Helvetica,sans-serif" fontWeight="400" fontSize="8.5" fill="rgba(255,255,255,0.85)" letterSpacing="1.5">ACCREDITED</text>
                    <text x="36" y="50" fontFamily="Arial,Helvetica,sans-serif" fontWeight="400" fontSize="8.5" fill="rgba(255,255,255,0.85)" letterSpacing="1.5">BUSINESS</text>
                    <line x1="105" y1="8" x2="105" y2="48" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
                    <text x="118" y="22" fontFamily="Arial,Helvetica,sans-serif" fontWeight="400" fontSize="9" fill="rgba(255,255,255,0.7)" letterSpacing="1">RATING</text>
                    <text x="113" y="46" fontFamily="Arial,Helvetica,sans-serif" fontWeight="900" fontSize="24" fill="white">A+</text>
                  </svg>
                </div>
              </div>

              {/* Proof stats strip — frosted bar matching badge aesthetic */}
              <div className="flex items-center gap-0 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-md overflow-hidden mt-1">
                <div className="flex-1 flex items-center gap-3 px-5 py-3">
                  <span className="font-display font-black text-2xl text-primary-light leading-none">{yearsInBusiness}+</span>
                  <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Years</span>
                </div>
                <div className="w-px h-8 bg-white/10" aria-hidden="true" />
                <div className="flex-1 flex items-center gap-3 px-5 py-3">
                  <span className="font-display font-black text-2xl text-red-400 leading-none">24/7</span>
                  <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Available</span>
                </div>
                <div className="w-px h-8 bg-white/10" aria-hidden="true" />
                <div className="flex-1 flex items-center gap-3 px-5 py-3">
                  <span className="font-display font-black text-2xl text-primary-light leading-none">Free</span>
                  <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Estimates</span>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: lead capture form card ── */}
            <div className="w-full">
              <div
                className="bg-white rounded-lg p-8"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
              >
                {/* Card header */}
                <h2 className="font-display font-bold text-text-primary text-2xl mb-1">
                  Request a Free Estimate
                </h2>
                <p className="text-text-muted text-sm mb-6">
                  Tell us about your project — we&apos;ll respond within the hour.
                </p>

                {/* Form — TODO: Wire form submission in Phase 6 */}
                <form action="/contact" method="GET" className="flex flex-col gap-4" aria-label="Free estimate request">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="hero-first-name" className="block text-sm font-semibold text-text-secondary mb-1.5">
                        First Name
                      </label>
                      <input
                        id="hero-first-name"
                        name="firstName"
                        type="text"
                        placeholder="John"
                        className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-text-primary font-body placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="hero-last-name" className="block text-sm font-semibold text-text-secondary mb-1.5">
                        Last Name
                      </label>
                      <input
                        id="hero-last-name"
                        name="lastName"
                        type="text"
                        placeholder="Smith"
                        className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-text-primary font-body placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="hero-phone" className="block text-sm font-semibold text-text-secondary mb-1.5">
                      Phone <span className="text-copper font-bold">*</span>
                    </label>
                    <input
                      id="hero-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="(402) 555-0000"
                      className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-text-primary font-body placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="hero-email" className="block text-sm font-semibold text-text-secondary mb-1.5">
                      Email <span className="text-text-muted font-normal text-xs">(optional)</span>
                    </label>
                    <input
                      id="hero-email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-text-primary font-body placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="hero-service" className="block text-sm font-semibold text-text-secondary mb-1.5">
                      Service Needed
                    </label>
                    <select
                      id="hero-service"
                      name="service"
                      className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-text-primary font-body bg-white focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Select a service...</option>
                      {services.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {s.title}
                        </option>
                      ))}
                      <option value="other">Other / Not Sure</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="hero-message" className="block text-sm font-semibold text-text-secondary mb-1.5">
                      Brief Description
                    </label>
                    <textarea
                      id="hero-message"
                      name="message"
                      rows={3}
                      placeholder="What's happening? Any details help us prepare..."
                      className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-text-primary font-body placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-copper hover:bg-copper-dark text-white font-bold text-base py-3.5 rounded-sm transition-colors mt-1"
                  >
                    Get Your Free Estimate
                  </button>
                </form>

                {/* Trust micro-copy */}
                <div className="flex items-center justify-center gap-5 mt-5 pt-5 border-t border-border">
                  <div className="flex items-center gap-1.5 text-text-muted text-xs font-semibold">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-green" aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Your info is safe
                  </div>
                  <div className="flex items-center gap-1.5 text-text-muted text-xs font-semibold">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-green" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                    Response in &lt; 1 hour
                  </div>
                  <div className="flex items-center gap-1.5 text-text-muted text-xs font-semibold">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-green" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    100% Free
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SERVICES GRID ────────────────────────────────────────────── */}
      <section className="py-20 bg-white" aria-label="Our Services">
        <div className="max-w-[1320px] mx-auto px-9">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-display font-black text-text-primary text-4xl mb-3">
                Plumbing Services in Omaha &amp; Surrounding Metro
              </h2>
              <p className="font-body text-text-secondary text-lg max-w-2xl mx-auto">
                From routine drain maintenance to emergency burst pipes — licensed, insured, and ready same day.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex flex-col gap-4 bg-white border border-border rounded-lg p-8 hover:border-primary hover:shadow-card transition-all"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {SERVICE_ICONS[service.slug]}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-text-primary text-xl mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="font-body text-text-secondary text-sm leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-primary font-bold text-sm mt-auto">
                    Learn More
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── TRUST SIGNALS SECTION ───────────────────────────────────── */}
      <section className="py-20 bg-off-white" aria-label="Why Heartland Plumbing">
        <div className="max-w-[1320px] mx-auto px-9">
          <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display font-black text-text-primary text-4xl mb-3">
              Why Omaha Homeowners Choose Heartland
            </h2>
            <p className="font-body text-text-secondary text-lg max-w-xl mx-auto">
              We built our reputation one honest service call at a time — since 1998.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Years */}
            <div className="bg-white border border-border rounded-lg p-7 text-center shadow-card">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="font-display font-black text-4xl text-text-primary mb-1">{yearsInBusiness}+</div>
              <div className="font-display font-bold text-text-secondary text-base">Years Serving Omaha</div>
              <p className="text-text-muted text-sm mt-2">Family-owned since 1998</p>
            </div>
            {/* Card 2: Reviews */}
            <div className="bg-white border border-border rounded-lg p-7 text-center shadow-card">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className="font-display font-black text-4xl text-text-primary">{BUSINESS.rating.value}</span>
                <StarRating rating={5} size={16} />
              </div>
              <div className="font-display font-bold text-text-secondary text-base">{BUSINESS.rating.count} Reviews</div>
            </div>
            {/* Card 3: Response */}
            <div className="bg-white border border-border rounded-lg p-7 text-center shadow-card">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l1.65-1.84a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="font-display font-black text-4xl text-text-primary mb-1">90 min</div>
              <div className="font-display font-bold text-text-secondary text-base">Emergency Response</div>
              <p className="text-sm mt-2"><span className="text-red-600 font-bold">24/7</span> <span className="text-text-muted">dispatch, all metro areas</span></p>
            </div>
            {/* Card 4: License */}
            <div className="bg-white border border-border rounded-lg p-7 text-center shadow-card">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="font-display font-black text-3xl text-text-primary mb-1">#{BUSINESS.license}</div>
              <div className="font-display font-bold text-text-secondary text-base">Licensed &amp; Insured</div>
              <p className="text-text-muted text-sm mt-2">BBB A+ · Fully bonded</p>
            </div>
          </div>

          {/* CTA adjacent to trust cards — conversion principle */}
          <div className="text-center mt-12">
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-base px-8 py-4 rounded-sm transition-colors min-h-[52px]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l1.65-1.84a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call for a Free Estimate — {BUSINESS.phone}
              <span className="text-red-300 text-sm font-bold">(24/7)</span>
            </a>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── TESTIMONIALS SECTION ─────────────────────────────────────── */}
      <section className="py-20 bg-white" aria-label="Customer Testimonials">
        <div className="max-w-[1320px] mx-auto px-9">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-display font-black text-text-primary text-4xl mb-3">
                What Our Customers Say
              </h2>
              <p className="font-body text-text-secondary text-lg max-w-xl mx-auto">
                Real reviews from homeowners across the Omaha metro.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTestimonials.map((t) => (
                <div
                  key={t.name}
                  className="bg-off-white border border-border rounded-lg p-7 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-1">
                    <StarRating rating={t.rating} size={16} />
                  </div>
                  <blockquote className="font-body text-text-secondary text-[15px] leading-relaxed flex-1">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <footer className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-display font-bold text-base shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary text-sm">{t.name}</div>
                      <div className="text-text-muted text-xs">{t.city}, NE</div>
                    </div>
                  </footer>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── SERVICE AREAS SECTION ───────────────────────────────────── */}
      <section className="py-20 bg-dark" aria-label="Service Areas">
        <div className="max-w-[1320px] mx-auto px-9">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-display font-black text-white text-4xl mb-3">
                Serving Omaha &amp; the Surrounding Metro
              </h2>
              <p className="font-body text-white/70 text-lg max-w-xl mx-auto">
                Licensed plumber available same day across Douglas, Sarpy, and Washington counties.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {areas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/service-areas/${area.slug}`}
                  className="group flex items-center gap-3 bg-dark-mid border border-white/10 hover:border-primary-light rounded-lg px-5 py-4 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary-light shrink-0" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="font-semibold text-white/80 group-hover:text-white text-sm transition-colors">
                    {area.city}
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/service-areas"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white/80 hover:text-white font-semibold text-sm px-6 py-3 rounded-sm transition-colors"
              >
                View All Service Areas
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
