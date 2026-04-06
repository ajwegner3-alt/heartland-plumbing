'use client'

import { useState } from 'react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface FieldErrors {
  name?: string
  phone?: string
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const data = new FormData(form)

    const name = (data.get('name') as string)?.trim() ?? ''
    const phone = (data.get('phone') as string)?.trim() ?? ''
    const service = (data.get('service') as string)?.trim() ?? ''
    const zip = (data.get('zip') as string)?.trim() ?? ''
    const message = (data.get('message') as string)?.trim() ?? ''
    const gotcha = (data.get('_gotcha') as string) ?? ''

    // Client-side validation
    const errors: FieldErrors = {}
    if (!name) errors.name = 'Your name is required.'
    if (!phone) {
      errors.phone = 'Your phone number is required.'
    } else if (phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Please enter a valid 10-digit phone number.'
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})
    setStatus('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, service, zip, message, _gotcha: gotcha }),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        const json = await res.json().catch(() => ({}))
        setErrorMsg(
          (json as { error?: string }).error ||
            'Something went wrong. Please call us directly or try again.',
        )
        setStatus('error')
      }
    } catch {
      setErrorMsg('Unable to send. Please call us directly at (402) 555-0147.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white border border-border rounded-lg p-10 flex flex-col items-center text-center gap-5">
        {/* Checkmark icon */}
        <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 text-green"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <h2 className="font-display font-bold text-text-primary text-2xl mb-2">
            Message Sent!
          </h2>
          <p className="font-body text-text-secondary text-base leading-relaxed max-w-xs mx-auto">
            We&apos;ll call you within 1 hour. If it&apos;s an emergency, call us directly at{' '}
            <a href="tel:+14025550147" className="text-primary font-semibold">
              (402) 555-0147
            </a>
            .
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="border border-border text-text-secondary hover:text-text-primary hover:border-text-secondary font-semibold text-sm px-6 py-2.5 rounded-sm transition-colors"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5"
      aria-label="Contact form"
    >
      {/* Honeypot — hidden from real users, traps bots */}
      <input
        name="_gotcha"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
      />

      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-semibold text-text-secondary mb-1.5"
        >
          Full Name <span className="text-copper font-bold">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="John Smith"
          aria-required="true"
          aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
          className={`w-full border rounded-sm px-3.5 py-2.5 text-sm text-text-primary font-body placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition-colors ${
            fieldErrors.name ? 'border-copper' : 'border-border'
          }`}
        />
        {fieldErrors.name && (
          <p id="contact-name-error" className="text-copper text-xs mt-1 font-semibold">
            {fieldErrors.name}
          </p>
        )}
      </div>

      {/* Phone — most important field for contractors, listed first after name */}
      <div>
        <label
          htmlFor="contact-phone"
          className="block text-sm font-semibold text-text-secondary mb-1.5"
        >
          Phone Number <span className="text-copper font-bold">*</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="(402) 555-0000"
          aria-required="true"
          aria-describedby={fieldErrors.phone ? 'contact-phone-error' : undefined}
          className={`w-full border rounded-sm px-3.5 py-2.5 text-sm text-text-primary font-body placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition-colors ${
            fieldErrors.phone ? 'border-copper' : 'border-border'
          }`}
        />
        {fieldErrors.phone && (
          <p id="contact-phone-error" className="text-copper text-xs mt-1 font-semibold">
            {fieldErrors.phone}
          </p>
        )}
      </div>

      {/* Service dropdown */}
      <div>
        <label
          htmlFor="contact-service"
          className="block text-sm font-semibold text-text-secondary mb-1.5"
        >
          Service Needed{' '}
          <span className="text-text-muted font-normal text-xs">(optional)</span>
        </label>
        <select
          id="contact-service"
          name="service"
          className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-text-primary font-body bg-white focus:outline-none focus:border-primary transition-colors"
        >
          <option value="">Select a service...</option>
          <option value="Drain Cleaning">Drain Cleaning</option>
          <option value="Water Heaters">Water Heaters</option>
          <option value="Sewer Line Repair">Sewer Line Repair</option>
          <option value="Emergency Plumbing">Emergency Plumbing</option>
          <option value="Other">Other / Not Sure</option>
        </select>
      </div>

      {/* Zip code */}
      <div>
        <label
          htmlFor="contact-zip"
          className="block text-sm font-semibold text-text-secondary mb-1.5"
        >
          Zip Code{' '}
          <span className="text-text-muted font-normal text-xs">(optional)</span>
        </label>
        <input
          id="contact-zip"
          name="zip"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="68127"
          maxLength={10}
          className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-text-primary font-body placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-semibold text-text-secondary mb-1.5"
        >
          Message{' '}
          <span className="text-text-muted font-normal text-xs">(optional)</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Tell us what's going on — any details help us prepare..."
          className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-text-primary font-body placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition-colors resize-none"
        />
      </div>

      {/* Error banner */}
      {status === 'error' && (
        <div className="bg-copper/10 border border-copper/30 text-copper text-sm font-semibold px-4 py-3 rounded-sm">
          {errorMsg}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base py-3.5 rounded-sm transition-colors mt-1"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>

      {/* Trust micro-copy */}
      <div className="flex items-center justify-center gap-5 pt-4 border-t border-border">
        <div className="flex items-center gap-1.5 text-text-muted text-xs font-semibold">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 text-green"
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Your info is safe
        </div>
        <div className="flex items-center gap-1.5 text-text-muted text-xs font-semibold">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 text-green"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Response in &lt; 1 hour
        </div>
        <div className="flex items-center gap-1.5 text-text-muted text-xs font-semibold">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 text-green"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          No spam, ever
        </div>
      </div>
    </form>
  )
}
