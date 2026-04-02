import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const links = [
  { label: 'Blog',          to: '/' },
  { label: 'Training',      to: '/categoria/Training' },
  { label: 'Alimentazione', to: '/categoria/Alimentazione' },
  { label: 'Basket Lab',    to: '/categoria/Basket Lab' },
  { label: 'Medicina',      to: '/categoria/Medicina sportiva' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-7 py-5 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.85)' : '#000000',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      {/* Left: logo + tagline */}
      <div className="flex items-center gap-8">
        <Link to="/" className="grad-text text-[13px] font-black tracking-[0.3em] uppercase">
          FitforIN
        </Link>
        <span className="hidden md:block text-[8px] tracking-[0.2em] uppercase text-muted border-l border-muted pl-4">
          La Scienza applicata allo Sport
        </span>
      </div>

      {/* Right: links */}
      <div className="hidden md:flex items-center gap-6">
        {links.map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            className="text-[9px] tracking-[0.1em] uppercase text-muted hover:text-dim transition-colors duration-150"
          >
            {label}
          </Link>
        ))}
      </div>
    </motion.nav>
  )
}
