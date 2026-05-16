'use client'
import { useEffect } from 'react'

export function useScrollAnimation() {
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            // Once visible, stop watching — no re-animation on scroll back up
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,       // trigger when 15% of element is visible
        rootMargin: '0px 0px -40px 0px',  // slight offset from bottom of viewport
      }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
