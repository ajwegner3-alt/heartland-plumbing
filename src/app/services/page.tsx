import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { services } from '@/lib/data/services'
import { BUSINESS } from '@/lib/data/business'
import { JsonLd } from '@/components/JsonLd'
import { generateBreadcrumbSchema } from '@/lib/schema/breadcrumb'
import { ScrollReveal } from '@/components/ScrollReveal'

export const metadata = generatePageMetadata({
  title: 'Plumbing Services in Omaha, NE | Heartland Plumbing',
  description:
    'Licensed plumbing services in Omaha, NE — drain cleaning, water heaters, sewer line repair, and 24/7 emergency plumbing. Free estimates. Call (402) 555-0147.',
  path: '/services',
})

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

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: BUSINESS.url },
          { name: 'Services', url: `${BUSINESS.url}/services` },
        ])}
      />

      {/* Banner */}
      <section className="bg-dark py-16 lg:py-20" aria-label="Our Services">
        <div className="max-w-[1320px] mx-auto px-[36px]">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-white/30" aria-hidden="true">/</li>
              <li className="text-white/80" aria-current="page">Services</li>
            </ol>
          </nav>
          <h1 className="font-display font-black text-white text-4xl lg:text-5xl leading-tight mb-4">
            Plumbing Services in Omaha, NE
          </h1>
          <p className="font-body text-white/70 text-lg leading-relaxed max-w-2xl mb-8">
            Licensed and insured plumbing services for Omaha homeowners since {BUSINESS.yearsFounded}. Same-day scheduling, honest estimates, and 24/7 emergency response.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-base px-7 py-4 rounded-sm transition-colors min-h-[52px]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l1.65-1.84a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call {BUSINESS.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-white/60 hover:border-white text-white font-bold text-base px-7 py-4 rounded-sm transition-colors min-h-[52px] hover:bg-white/10"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white" aria-label="All Services">
        <div className="max-w-[1320px] mx-auto px-[36px]">
          <ScrollReveal>
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
                    <h2 className="font-display font-bold text-text-primary text-xl mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h2>
                    <p className="font-body text-text-secondary text-sm leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-primary font-bold text-sm mt-auto">
                    View Service Details
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
    </>
  )
}
