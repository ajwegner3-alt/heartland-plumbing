import { notFound } from 'next/navigation'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { ScrollReveal } from '@/components/ScrollReveal'
import { generatePageMetadata } from '@/lib/metadata'
import { generateServiceAreaSchema } from '@/lib/schema/service-area'
import { generateBreadcrumbSchema } from '@/lib/schema/breadcrumb'
import { areas } from '@/lib/data/service-areas'
import { services } from '@/lib/data/services'
import { BUSINESS } from '@/lib/data/business'

// ── Static generation: pre-render all 8 area slugs at build time ─────────────
export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }))
}

// ── Per-page metadata from service-areas.ts data ─────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const area = areas.find((a) => a.slug === slug)
  if (!area) return {}
  return generatePageMetadata({
    title: area.metaTitle,
    description: area.metaDescription,
    path: `/service-areas/${area.slug}`,
  })
}

// ── Service icon map (mirrors services/page.tsx) ──────────────────────────────
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'drain-cleaning': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  'water-heaters': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  ),
  'sewer-line-repair': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  'emergency-plumbing': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
}

// ── Phone icon ────────────────────────────────────────────────────────────────
function PhoneIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l1.65-1.84a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

// ── Map pin icon ──────────────────────────────────────────────────────────────
function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

// ── Main page component ───────────────────────────────────────────────────────
export default async function ServiceAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const area = areas.find((a) => a.slug === slug)
  if (!area) notFound()

  const otherAreas = areas.filter((a) => a.slug !== area.slug)

  return (
    <>
      {/* ── JSON-LD Schemas ──────────────────────────────────────────────── */}
      <JsonLd data={generateServiceAreaSchema(area)} />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: BUSINESS.url },
          { name: 'Service Areas', url: `${BUSINESS.url}/service-areas` },
          { name: `Plumber in ${area.city}, NE`, url: `${BUSINESS.url}/service-areas/${area.slug}` },
        ])}
      />

      {/* ── PAGE BANNER ──────────────────────────────────────────────────── */}
      <section className="bg-dark py-16 lg:py-20" aria-label={`Plumbing Service in ${area.city}`}>
        <div className="max-w-[1320px] mx-auto px-[36px]">

          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-white/30" aria-hidden="true">/</li>
              <li>
                <Link href="/service-areas" className="text-white/50 hover:text-white/80 transition-colors">
                  Service Areas
                </Link>
              </li>
              <li className="text-white/30" aria-hidden="true">/</li>
              <li className="text-white/80" aria-current="page">
                {area.city}
              </li>
            </ol>
          </nav>

          {/* H1 */}
          <h1 className="font-display font-black text-white text-4xl lg:text-5xl leading-tight mb-4">
            Plumber in {area.city}, NE
          </h1>

          <p className="font-body text-white/70 text-lg leading-relaxed max-w-2xl mb-8">
            Licensed, insured plumbing service throughout {area.city} — drain cleaning, water heaters, sewer repair, and 24/7 emergency response. Free estimates on every job.
          </p>

          {/* Dual CTA */}
          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-base px-7 py-4 rounded-sm transition-colors min-h-[52px]"
            >
              <PhoneIcon />
              Call {BUSINESS.phone} <span className="text-red-300 text-sm font-bold">(24/7)</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-white/60 hover:border-white text-white font-bold text-base px-7 py-4 rounded-sm transition-colors min-h-[52px] hover:bg-white/10"
            >
              Get Free Estimate
            </Link>
          </div>

          {/* Trust micro-bar */}
          <div className="flex items-center gap-4 flex-wrap text-sm font-semibold text-primary-light">
            <span>Licensed &amp; Insured · #{BUSINESS.license}</span>
            <span className="text-white/20" aria-hidden="true">·</span>
            <span>{BUSINESS.rating.value}★ ({BUSINESS.rating.count} Reviews)</span>
            <span className="text-white/20" aria-hidden="true">·</span>
            <span>Same-Day Service Available</span>
          </div>
        </div>
      </section>

      {/* ── NEIGHBORHOODS ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-white" aria-label={`Neighborhoods in ${area.city}`}>
        <div className="max-w-[1320px] mx-auto px-[36px]">
          <ScrollReveal>
            <h2 className="font-display font-black text-text-primary text-3xl lg:text-4xl mb-3">
              Neighborhoods We Serve in {area.city}
            </h2>
            <p className="font-body text-text-secondary text-base mb-8 max-w-2xl">
              Our crews are based in central Omaha and reach all {area.city} neighborhoods quickly for both scheduled appointments and emergency calls.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {area.neighborhoods.map((hood) => (
                <span
                  key={hood}
                  className="inline-flex items-center border border-border rounded-full px-4 py-2 text-sm font-semibold text-text-secondary"
                >
                  {hood}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── LOCAL CONTEXT + AREA FACTS ───────────────────────────────────── */}
      <section className="py-16 bg-off-white" aria-label={`About Plumbing in ${area.city}`}>
        <div className="max-w-[1320px] mx-auto px-[36px]">
          <ScrollReveal>
            <h2 className="font-display font-black text-text-primary text-3xl lg:text-4xl mb-8">
              About Our Plumbing Services in {area.city}
            </h2>
            <div className="space-y-6 mb-10">
              {area.localContext.map((para, i) => (
                <p key={i} className="font-body text-text-secondary text-[16px] leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Area facts callout */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h3 className="font-display font-bold text-text-primary text-lg mb-4">
                Plumbing Facts About {area.city}
              </h3>
              <ul className="space-y-3">
                {area.areaFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="shrink-0 mt-0.5 text-green" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="font-body text-text-secondary text-[15px] leading-snug">
                      {fact}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── OUR SERVICES IN CITY ──────────────────────────────────────────── */}
      <section className="py-16 bg-white" aria-label={`Plumbing Services in ${area.city}`}>
        <div className="max-w-[1320px] mx-auto px-[36px]">
          <ScrollReveal>
            <h2 className="font-display font-black text-text-primary text-3xl lg:text-4xl mb-3">
              Our Services in {area.city}
            </h2>
            <p className="font-body text-text-secondary text-base mb-8 max-w-2xl">
              Full-service plumbing for {area.city} homeowners — from routine maintenance to emergency repairs. Same-day appointments available in most cases.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex flex-col gap-4 bg-white border border-border rounded-lg p-8 hover:border-primary hover:shadow-card transition-all"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {SERVICE_ICONS[service.slug]}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-text-primary text-lg mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="font-body text-text-secondary text-sm leading-relaxed">
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

      {/* ── WE ALSO SERVE ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-off-white" aria-label="Other Service Areas">
        <div className="max-w-[1320px] mx-auto px-[36px]">
          <ScrollReveal>
            <h2 className="font-display font-black text-text-primary text-3xl lg:text-4xl mb-3">
              We Also Serve
            </h2>
            <p className="font-body text-text-secondary text-base mb-8 max-w-2xl">
              Heartland Plumbing Co. covers the entire Omaha metro. Find your city below.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {otherAreas.map((other) => (
                <Link
                  key={other.slug}
                  href={`/service-areas/${other.slug}`}
                  className="inline-flex items-center gap-1.5 border border-border rounded-full px-4 py-2 text-sm font-semibold text-text-secondary hover:border-primary hover:text-primary transition-colors"
                >
                  <MapPinIcon />
                  {other.city}
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── BOTTOM CTA STRIP ─────────────────────────────────────────────── */}
      <section className="bg-dark py-14" aria-label={`Contact Heartland Plumbing in ${area.city}`}>
        <div className="max-w-[1320px] mx-auto px-[36px] text-center">
          <ScrollReveal>
            <h2 className="font-display font-black text-white text-3xl lg:text-4xl mb-3">
              Need a Plumber in {area.city}?
            </h2>
            <p className="font-body text-white/70 text-base mb-8 max-w-xl mx-auto">
              Call for a free estimate or send us a message — we respond within the hour during business hours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-base px-8 py-4 rounded-sm transition-colors min-h-[52px]"
              >
                <PhoneIcon />
                Call {BUSINESS.phone} <span className="text-red-300 text-sm font-bold">(24/7)</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-white/60 hover:border-white text-white font-bold text-base px-8 py-4 rounded-sm transition-colors min-h-[52px] hover:bg-white/10"
              >
                Get Free Estimate
              </Link>
            </div>
            <p className="text-white/40 text-sm mt-6">
              Licensed &amp; Insured · #{BUSINESS.license} · {BUSINESS.rating.value}★ {BUSINESS.rating.count} Reviews
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
