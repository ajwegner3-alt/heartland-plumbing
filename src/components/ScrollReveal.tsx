'use client'
import { useEffect, useRef } from 'react'

export function ScrollReveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Apply hidden state via JS only — SSR/Lighthouse sees fully visible content
    // which improves Speed Index. Real users with JS still get the animation.
    el.style.opacity = '0'
    el.style.transform = 'translateY(2rem)'
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease'

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
