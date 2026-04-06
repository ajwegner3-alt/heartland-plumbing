import Link from 'next/link'
import MobileNav from './MobileNav'

const navServices = [
  { name: 'Drain Cleaning', href: '/services/drain-cleaning' },
  { name: 'Water Heaters', href: '/services/water-heaters' },
  { name: 'Sewer Line Repair', href: '/services/sewer-line-repair' },
  { name: 'Emergency Plumbing', href: '/services/emergency-plumbing' },
]

export default function Header() {
  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 bg-white border-b border-border transition-shadow duration-300"
    >
      <div className="max-w-[1320px] mx-auto px-[36px]">
        <div className="flex justify-between items-center py-[14px] gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 bg-primary rounded-md flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2h1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1V4a1 1 0 0 0-1-1H3z" />
                <circle cx="10" cy="12" r="1" fill="white" stroke="none" />
              </svg>
            </div>
            <span className="font-display font-bold text-[17px] text-text-primary leading-tight">
              Heartland Plumbing Co.
            </span>
          </Link>

          {/* Desktop nav — hidden below lg */}
          <nav
            className="hidden lg:flex items-center gap-[28px]"
            aria-label="Main navigation"
          >
            {/* Services with CSS hover dropdown */}
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 text-text-secondary hover:text-primary font-semibold text-[15px] transition-colors cursor-pointer"
              >
                Services
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:rotate-180"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Dropdown panel */}
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white border border-border rounded-md shadow-card min-w-[200px] py-2">
                  {navServices.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block px-4 py-2.5 text-[14px] font-semibold text-text-secondary hover:text-primary hover:bg-off-white transition-colors"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/service-areas"
              className="text-text-secondary hover:text-primary font-semibold text-[15px] transition-colors"
            >
              Areas
            </Link>
            <Link
              href="/about"
              className="text-text-secondary hover:text-primary font-semibold text-[15px] transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-text-secondary hover:text-primary font-semibold text-[15px] transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Header right — phone + CTA, hidden below lg */}
          <div className="hidden lg:flex items-center gap-[16px]">
            <div className="text-right">
              <a
                href="tel:4025550147"
                className="text-text-secondary font-semibold text-[14px] hover:text-primary transition-colors"
              >
                (402) 555-0147
              </a>
              <div className="text-text-muted text-[11px] font-medium">Available 24/7</div>
            </div>
            <a
              href="tel:4025550147"
              className="inline-flex items-center gap-2 bg-copper hover:bg-copper-dark text-white font-bold text-sm px-[22px] py-[10px] rounded-sm transition-colors min-h-[48px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l1.65-1.84a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call Now
            </a>
          </div>

          {/* Mobile hamburger — Client Component island */}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
