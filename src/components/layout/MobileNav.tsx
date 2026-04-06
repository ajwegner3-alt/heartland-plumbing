'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const services = [
  { name: 'Drain Cleaning', href: '/services/drain-cleaning' },
  { name: 'Water Heaters', href: '/services/water-heaters' },
  { name: 'Sewer Line Repair', href: '/services/sewer-line-repair' },
  { name: 'Emergency Plumbing', href: '/services/emergency-plumbing' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  // Scroll shadow effect — target the server-rendered header
  useEffect(() => {
    const header = document.getElementById('site-header')
    if (!header) return

    function handleScroll() {
      if (window.scrollY > 0) {
        header!.classList.add('shadow-header')
      } else {
        header!.classList.remove('shadow-header')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Run once on mount in case page loads scrolled
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function closeMenu() {
    setOpen(false)
  }

  return (
    <>
      {/* Hamburger button — visible below lg only */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-md hover:bg-off-white transition-colors"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span
          className={`block w-5 h-[2px] bg-text-primary rounded-full transition-transform duration-300 ${
            open ? 'rotate-45 translate-y-[7px]' : ''
          }`}
        />
        <span
          className={`block w-5 h-[2px] bg-text-primary rounded-full transition-opacity duration-300 ${
            open ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-5 h-[2px] bg-text-primary rounded-full transition-transform duration-300 ${
            open ? '-rotate-45 -translate-y-[7px]' : ''
          }`}
        />
      </button>

      {/* Mobile menu drawer */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[73px] z-40 bg-white border-b border-border shadow-card transition-all duration-300 overflow-hidden ${
          open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-6 py-4 flex flex-col gap-1">
          {/* Services section */}
          <div className="py-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-2">
              Services
            </p>
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={closeMenu}
                className="block py-2 pl-3 text-[15px] font-semibold text-text-secondary hover:text-primary transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-border pt-2">
            <Link
              href="/service-areas"
              onClick={closeMenu}
              className="block py-2 text-[15px] font-semibold text-text-secondary hover:text-primary transition-colors"
            >
              Service Areas
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="block py-2 text-[15px] font-semibold text-text-secondary hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="block py-2 text-[15px] font-semibold text-text-secondary hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Phone CTA in mobile menu */}
          <div className="border-t border-border pt-4 pb-2 flex flex-col gap-3">
            <div className="text-center">
              <a
                href="tel:4025550147"
                className="text-text-secondary font-semibold text-sm"
              >
                (402) 555-0147
              </a>
              <div className="text-text-muted text-xs">Available 24/7</div>
            </div>
            <a
              href="tel:4025550147"
              className="flex items-center justify-center gap-2 bg-copper hover:bg-copper-dark text-white font-bold text-sm px-6 py-3 rounded-sm transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
        </nav>
      </div>

      {/* Backdrop overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 top-[73px] z-30 bg-dark/20"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  )
}
