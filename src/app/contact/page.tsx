import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { generateBreadcrumbSchema } from '@/lib/schema/breadcrumb'
import { generatePageMetadata } from '@/lib/metadata'
import { BUSINESS } from '@/lib/data/business'
import { ContactForm } from '@/components/ContactForm'

export const metadata = generatePageMetadata({
  title: 'Contact Us | Heartland Plumbing Co.',
  description:
    'Contact Heartland Plumbing Co. in Omaha, NE. Request a free estimate or call (402) 555-0147 for same-day service and 24/7 emergency plumbing.',
  path: '/contact',
})

const yearsInBusiness = new Date().getFullYear() - BUSINESS.yearsFounded

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.heartlandplumbingomaha.com/' },
    { name: 'Contact', url: 'https://www.heartlandplumbingomaha.com/contact' },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      {/* ─── BANNER ─────────────────────────────────────────────────────── */}
      <section
        className="bg-dark pt-[110px] pb-14"
        aria-label="Contact page header"
      >
        <div className="max-w-[1320px] mx-auto px-9">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-white/50 hover:text-primary-light transition-colors"
                >
                  Home
                </Link>
              </li>
              <li className="text-white/30" aria-hidden="true">/</li>
              <li className="text-primary-light font-semibold">Contact</li>
            </ol>
          </nav>

          <h1 className="font-display font-black text-white text-4xl lg:text-5xl leading-tight mb-4">
            Contact Heartland Plumbing
          </h1>
          <p className="font-body text-white/70 text-lg max-w-xl leading-relaxed">
            Send us a message and we&apos;ll call you back within the hour. For
            emergencies, call us directly — we&apos;re available 24/7.
          </p>
        </div>
      </section>

      {/* ─── MAIN CONTENT ───────────────────────────────────────────────── */}
      <section className="py-16 bg-off-white" aria-label="Contact form and info">
        <div className="max-w-[1320px] mx-auto px-9">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* ── LEFT: Contact Form ── */}
            <div>
              <h2 className="font-display font-bold text-text-primary text-2xl mb-2">
                Send Us a Message
              </h2>
              <p className="font-body text-text-secondary text-sm mb-6">
                Fill out the form below and a member of our team will call you within 1 hour.
              </p>
              <ContactForm />
            </div>

            {/* ── RIGHT: Contact Info Card ── */}
            <div className="flex flex-col gap-6">

              {/* Contact details card */}
              <div className="bg-white border border-border rounded-lg p-8">
                <h2 className="font-display font-bold text-text-primary text-xl mb-6">
                  Get in Touch
                </h2>

                {/* Phone */}
                <div className="flex items-start gap-4 pb-5 border-b border-border">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                      aria-hidden="true"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l1.65-1.84a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary text-sm mb-0.5">Phone</div>
                    <a
                      href={BUSINESS.phoneHref}
                      className="font-display font-bold text-primary text-xl hover:text-primary-dark transition-colors"
                    >
                      {BUSINESS.phone}
                    </a>
                    <p className="text-text-muted text-xs mt-1 font-semibold">
                      24/7 emergency line — always answered
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 py-5 border-b border-border">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                      aria-hidden="true"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary text-sm mb-0.5">Address</div>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {BUSINESS.address.street}<br />
                      {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 py-5 border-b border-border">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary text-sm mb-1.5">Business Hours</div>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between gap-6 text-sm">
                        <span className="text-text-secondary">Mon – Fri</span>
                        <span className="text-text-primary font-semibold">7:00 AM – 6:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-6 text-sm">
                        <span className="text-text-secondary">Saturday</span>
                        <span className="text-text-primary font-semibold">8:00 AM – 2:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-6 text-sm">
                        <span className="text-text-secondary">Emergencies</span>
                        <span className="text-primary font-bold">24 / 7</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency callout */}
                <div className="mt-5 bg-copper/5 border border-copper/20 rounded-lg p-4 flex items-start gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-copper shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    <strong className="text-text-primary">For emergencies,</strong> don&apos;t
                    wait for a callback — call us directly at{' '}
                    <a href={BUSINESS.phoneHref} className="text-copper font-bold hover:underline">
                      {BUSINESS.phone}
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Trust badges card */}
              <div className="bg-white border border-border rounded-lg p-6">
                <h3 className="font-display font-bold text-text-primary text-base mb-4">
                  Why Omaha Trusts Heartland
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center text-primary shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-text-primary text-xs">License #{BUSINESS.license}</div>
                      <div className="text-text-muted text-xs">State Certified</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center text-primary shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                        <circle cx="12" cy="8" r="6" />
                        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-text-primary text-xs">BBB A+ Rated</div>
                      <div className="text-text-muted text-xs">Accredited Business</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-gold/10 rounded flex items-center justify-center text-gold shrink-0">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-text-primary text-xs">{BUSINESS.rating.value} Stars</div>
                      <div className="text-text-muted text-xs">{BUSINESS.rating.count} Reviews</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center text-primary shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-text-primary text-xs">{yearsInBusiness}+ Years</div>
                      <div className="text-text-muted text-xs">Since {BUSINESS.yearsFounded}</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}
