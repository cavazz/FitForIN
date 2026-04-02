import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Anima gli elementi figli con stagger dal basso.
 * @param {string} selector  - selettore CSS dei figli da animare
 * @param {object} options   - opzioni GSAP opzionali
 */
export function useGsapReveal(selector = '[data-reveal]', options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: options.stagger ?? 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
          ...options,
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [selector, options])

  return containerRef
}
