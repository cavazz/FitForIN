import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { categories } from '../data/articles'

/* ── category counts map ─────────────────────────────────── */
const CAT_COUNT = Object.fromEntries(
  categories
    .filter(c => c.name !== 'Tutti')
    .map(c => [c.name, String(c.count).padStart(2, '0')])
)

const LINKS = [
  { label: 'Home',          num: '00', to: '/',                                  count: null },
  { label: 'Training',      num: '01', to: '/categoria/Training',                count: CAT_COUNT['Training'] },
  { label: 'Alimentazione', num: '02', to: '/categoria/Alimentazione',           count: CAT_COUNT['Alimentazione'] },
  { label: 'Basket Lab',    num: '03', to: '/categoria/Basket Lab',              count: CAT_COUNT['Basket Lab'] },
  { label: 'Medicina',      num: '04', to: '/categoria/Medicina sportiva',       count: CAT_COUNT['Medicina sportiva'] },
  { label: 'Scienza',       num: '05', to: "/categoria/Scienza dell'esercizio",  count: CAT_COUNT["Scienza dell'esercizio"] },
]

/* ── hamburger → X ──────────────────────────────────────── */
function MenuToggle({ open, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Chiudi menu' : 'Apri menu'}
      aria-expanded={open}
      style={{
        width: 40, height: 40,
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-end', justifyContent: 'center',
        gap: 5, background: 'none', border: 'none',
        cursor: 'pointer', padding: 0, flexShrink: 0,
      }}
    >
      <motion.span
        style={{ display: 'block', height: 1.5, background: '#C9A052', borderRadius: 2, transformOrigin: 'center' }}
        animate={open ? { rotate: 45, y: 6.5, width: 22 } : { rotate: 0, y: 0, width: 26 }}
        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
      />
      <motion.span
        style={{ display: 'block', height: 1.5, width: 16, background: 'rgba(201,160,82,0.4)', borderRadius: 2 }}
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.12 }}
      />
      <motion.span
        style={{ display: 'block', height: 1.5, background: '#C9A052', borderRadius: 2, transformOrigin: 'center' }}
        animate={open ? { rotate: -45, y: -6.5, width: 22 } : { rotate: 0, y: 0, width: 20 }}
        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
      />
    </button>
  )
}

/* ─────────────────────────────────────────────────────────── */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const savedScroll             = useRef(0)
  const location                = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  useEffect(() => {
    if (open) {
      savedScroll.current = window.scrollY
      document.body.style.position  = 'fixed'
      document.body.style.top       = `-${savedScroll.current}px`
      document.body.style.width     = '100%'
      document.body.style.overflowY = 'scroll'
    } else {
      document.body.style.position  = ''
      document.body.style.top       = ''
      document.body.style.width     = ''
      document.body.style.overflowY = ''
      window.scrollTo(0, savedScroll.current)
    }
    return () => {
      document.body.style.position  = ''
      document.body.style.top       = ''
      document.body.style.width     = ''
      document.body.style.overflowY = ''
    }
  }, [open])

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  const VISIBLE = scrolled ? 46 : 70
  const RAW     = Math.round(VISIBLE * 2.78)
  const NAV_H   = scrolled ? 62 : 96

  return (
    <>
      {/* ── hero gradient overlay ──────────────────────── */}
      <div
        aria-hidden
        className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
        style={{
          height: 200,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%)',
          opacity: scrolled ? 0 : 1,
          transition: 'opacity 360ms ease',
        }}
      />

      {/* ── header bar ─────────────────────────────────── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        animate={{ height: NAV_H }}
        transition={{ duration: 0.36, ease: [0.23, 1, 0.32, 1] }}
        style={{
          backgroundColor:      scrolled ? 'rgba(9,7,4,0.95)'              : 'transparent',
          backdropFilter:       scrolled ? 'blur(40px) saturate(200%)'     : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(40px) saturate(200%)'     : 'none',
          borderBottom:         scrolled ? '1px solid rgba(201,160,82,0.1)' : '1px solid transparent',
          paddingLeft:  'clamp(20px,3vw,44px)',
          paddingRight: 'clamp(20px,3vw,44px)',
          transition: 'background-color 360ms ease, border-color 360ms ease',
        }}
      >
        {/* LOGO — sempre cliccabile, torna alla home */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          aria-label="FitforIN — torna alla home"
          className="logo-link"
          style={{ lineHeight: 0, flexShrink: 0 }}
        >
          <motion.div
            animate={{ height: VISIBLE }}
            transition={{ duration: 0.36, ease: [0.23, 1, 0.32, 1] }}
            style={{ overflow: 'hidden', display: 'flex', alignItems: 'center' }}
          >
            <motion.img
              src="/logo.svg"
              alt="FIT FORIN"
              animate={{ height: RAW }}
              transition={{ duration: 0.36, ease: [0.23, 1, 0.32, 1] }}
              style={{ width: 'auto', display: 'block' }}
              draggable={false}
            />
          </motion.div>
        </Link>

        {/* ── DESKTOP LINKS — indicatore scorrevole ─── */}
        <nav
          className="hidden lg:flex items-center"
          style={{ gap: 'clamp(4px,1.6vw,28px)' }}
          aria-label="Navigazione principale"
        >
          {LINKS.map(({ label, num, to }) => (
            <Link
              key={label}
              to={to}
              className="nav-link-v2"
              data-active={isActive(to) ? 'true' : 'false'}
              aria-current={isActive(to) ? 'page' : undefined}
            >
              <span className="nav-link-num" aria-hidden="true">{num}</span>
              <span className="nav-link-label">{label}</span>
              {/* indicatore scorrevole con layoutId */}
              {isActive(to) && (
                <motion.span
                  layoutId="desk-nav-indicator"
                  className="nav-link-indicator"
                  transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* MOBILE TOGGLE */}
        <div className="lg:hidden">
          <MenuToggle open={open} onClick={() => setOpen(v => !v)} />
        </div>
      </motion.header>

      {/* ══════════════════════════════════════════════════
          MOBILE OVERLAY — Athletic Dashboard
      ══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu di navigazione"
            className="fixed inset-0 z-[60] lg:hidden flex flex-col"
            initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
            animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
            exit={{
              clipPath: 'inset(0 0 100% 0)', opacity: 0,
              transition: { duration: 0.28, ease: [0.77, 0, 0.175, 1] },
            }}
            transition={{ duration: 0.46, ease: [0.23, 1, 0.32, 1] }}
            style={{ background: '#050302' }}
          >
            {/* sport court grid texture */}
            <div
              aria-hidden
              style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: `
                  linear-gradient(rgba(201,160,82,0.018) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(201,160,82,0.018) 1px, transparent 1px)
                `,
                backgroundSize: '52px 52px',
              }}
            />
            {/* gold radial glow top */}
            <div
              aria-hidden
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 320,
                background: 'radial-gradient(ellipse 70% 42% at 50% -8%, rgba(201,160,82,0.13) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* ── HEADER ────────────────────────────────── */}
            <div
              className="relative z-10 flex items-center justify-between flex-shrink-0"
              style={{
                height: 96,
                paddingLeft:  'clamp(20px,3vw,44px)',
                paddingRight: 'clamp(20px,3vw,44px)',
                borderBottom: '1px solid rgba(201,160,82,0.08)',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
              >
                <Link to="/" onClick={() => setOpen(false)} aria-label="FitforIN — home" style={{ lineHeight: 0 }}>
                  <div style={{ height: 70, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                    <img
                      src="/logo.svg" alt="FIT FORIN"
                      style={{ height: 195, width: 'auto', display: 'block' }}
                      draggable={false}
                    />
                  </div>
                </Link>
              </motion.div>
              <MenuToggle open={open} onClick={() => setOpen(false)} />
            </div>

            {/* ── STATS STRIP — live scoreboard feel ─── */}
            <motion.div
              className="relative z-10 flex items-center gap-4 flex-shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.18, ease: 'easeOut' }}
              style={{
                padding: '10px clamp(20px,3vw,44px)',
                borderBottom: '1px solid rgba(201,160,82,0.07)',
              }}
            >
              {/* pulsing live dot */}
              <span
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,160,82,0.5)' }}
              >
                <span style={{ position: 'relative', display: 'inline-block', width: 6, height: 6 }}>
                  <span style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    background: '#C9A052', opacity: 0.3,
                    animation: 'ping 1.4s ease-in-out infinite',
                  }} />
                  <span style={{
                    position: 'absolute', inset: 1, borderRadius: '50%',
                    background: '#C9A052',
                  }} />
                </span>
                Live
              </span>
              <span style={{ color: 'rgba(201,160,82,0.18)', fontSize: 10 }}>·</span>
              <span style={{ fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201,160,82,0.32)' }}>80+ articoli</span>
              <span style={{ color: 'rgba(201,160,82,0.18)', fontSize: 10 }}>·</span>
              <span style={{ fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201,160,82,0.32)' }}>6 categorie</span>
            </motion.div>

            {/* ── NAV LINKS — athletic lineup card ─────── */}
            <nav
              className="flex-1 flex flex-col justify-center relative z-10 overflow-y-auto"
              aria-label="Menu mobile"
            >
              {LINKS.map(({ label, num, to, count }, i) => {
                const active = isActive(to)
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                    animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.14, delay: 0, ease: 'easeIn' },
                    }}
                    transition={{ duration: 0.52, delay: 0.14 + i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <Link
                      to={to}
                      onClick={() => setOpen(false)}
                      className="mobile-nav-row"
                      data-active={active ? 'true' : 'false'}
                      aria-current={active ? 'page' : undefined}
                    >
                      {/* left accent bar */}
                      <span className="mobile-nav-row-bar" aria-hidden="true" />

                      {/* number */}
                      <span className="mobile-nav-row-num" aria-hidden="true">{num}</span>

                      {/* label */}
                      <span className="mobile-nav-row-label">{label}</span>

                      {/* article count badge */}
                      {count ? (
                        <span className="mobile-nav-row-count" aria-label={`${count} articoli`}>{count}</span>
                      ) : (
                        <span className="mobile-nav-row-arrow" aria-hidden="true">↗</span>
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* ── FOOTER STRIP ─────────────────────────── */}
            <motion.div
              className="relative z-10 flex-shrink-0 flex justify-between items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.58, ease: 'easeOut' }}
              style={{
                borderTop: '1px solid rgba(201,160,82,0.07)',
                padding: '13px clamp(20px,3vw,44px)',
              }}
            >
              <span style={{ fontSize: 8, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,160,82,0.2)' }}>
                La Scienza applicata allo Sport
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(201,160,82,0.14)' }}>
                © {new Date().getFullYear()} FitforIN
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
