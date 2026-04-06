import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'Home',          to: '/' },
  { label: 'Training',      to: '/categoria/Training' },
  { label: 'Alimentazione', to: '/categoria/Alimentazione' },
  { label: 'Basket Lab',    to: '/categoria/Basket Lab' },
  { label: 'Medicina',      to: '/categoria/Medicina sportiva' },
  { label: 'Scienza',       to: "/categoria/Scienza dell'esercizio" },
]

/* ─── hamburger → X ─────────────────────────────────────── */
function MenuToggle({ open, onClick }) {
  const s = { display:'block', height:2, background:'#C9A052',
              borderRadius:2, transformOrigin:'center' }
  return (
    <button onClick={onClick} aria-label={open ? 'Chiudi' : 'Menu'}
      style={{ display:'flex', flexDirection:'column', justifyContent:'center',
               gap:5, width:38, height:38, background:'none', border:'none',
               cursor:'pointer', padding:0, flexShrink:0 }}>
      <motion.span style={{ ...s, width:26 }}
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration:0.25, ease:[0.25,0.1,0.25,1] }} />
      <motion.span style={{ ...s, width:18 }}
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration:0.15 }} />
      <motion.span style={{ ...s, width:22 }}
        animate={open ? { rotate:-45, y:-7 } : { rotate:0, y:0 }}
        transition={{ duration:0.25, ease:[0.25,0.1,0.25,1] }} />
    </button>
  )
}

/* ─── mask reveal (testo sale dal basso) ─────────────────── */
function Reveal({ children, delay = 0 }) {
  return (
    <div style={{ overflow:'hidden', paddingBottom:1 }}>
      <motion.div
        initial={{ y:'105%' }}
        animate={{ y:0 }}
        exit={{ y:'105%', transition:{ duration:0.18, ease:[0.4,0,1,1] } }}
        transition={{ duration:0.55, delay, ease:[0.16,1,0.3,1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────── */

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [open,     setOpen]       = useState(false)
  const savedScroll               = useRef(0)
  const location                  = useLocation()

  /* scroll state */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* chiudi al cambio pagina */
  useEffect(() => { setOpen(false) }, [location.pathname])

  /* ── scroll lock iOS-safe ─────────────────────────────── */
  useEffect(() => {
    if (open) {
      savedScroll.current = window.scrollY
      document.body.style.position   = 'fixed'
      document.body.style.top        = `-${savedScroll.current}px`
      document.body.style.width      = '100%'
      document.body.style.overflowY  = 'scroll'   /* evita layout shift */
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

  const isActive = (to) => location.pathname === to

  /* Il file logo ha ~64% di spazio bianco (32% top + 32% bottom).
     VISIBLE = altezza del marchio visibile che vogliamo mostrare.
     RAW     = altezza a cui renderizziamo l'immagine (VISIBLE / 0.36 ≈ ×2.78).
     Il wrapper taglia il whitespace con overflow:hidden + flex center. */
  const VISIBLE = scrolled ? 50  : 78
  const RAW     = Math.round(VISIBLE * 2.78)
  const NAV_H   = scrolled ? 70  : 108

  return (
    <>
      {/* ══════════════════════════════════════════
          GRADIENTE superiore — navbar visibile
          su qualsiasi sfondo prima dello scroll
      ══════════════════════════════════════════ */}
      <div
        aria-hidden
        className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
        style={{
          height: 220,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%)',
          opacity: scrolled ? 0 : 1,
          transition: 'opacity 0.4s',
        }}
      />

      {/* ══════════════════════════════════════════
          BARRA
      ══════════════════════════════════════════ */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        animate={{
          height: NAV_H,
          backgroundColor: scrolled ? 'rgba(10,8,5,0.97)' : 'rgba(0,0,0,0)',
        }}
        transition={{ duration:0.4, ease:[0.25,0.1,0.25,1] }}
        style={{
          backdropFilter:       scrolled ? 'blur(36px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(36px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,160,82,0.12)' : '1px solid transparent',
          paddingLeft:  'clamp(20px, 3vw, 44px)',
          paddingRight: 'clamp(20px, 3vw, 44px)',
        }}
      >
        {/* LOGO — wrapper che taglia il whitespace del file */}
        <Link to="/" onClick={() => setOpen(false)} aria-label="FitforIN"
          style={{ lineHeight:0, flexShrink:0, transition:'opacity 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.opacity='0.72'}
          onMouseLeave={e => e.currentTarget.style.opacity='1'}
        >
          <div style={{
            height: VISIBLE,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            transition: 'height 0.4s cubic-bezier(0.25,0.1,0.25,1)',
            flexShrink: 0,
          }}>
            <img
              src="/logo.svg" alt="FIT FORIN"
              style={{
                height: RAW,
                width: 'auto',
                display: 'block',
                flexShrink: 0,
                transition: 'height 0.4s cubic-bezier(0.25,0.1,0.25,1)',
              }}
              draggable={false}
            />
          </div>
        </Link>

        {/* DESKTOP LINKS — lg+ */}
        <nav className="hidden lg:flex items-center" style={{ gap:'clamp(8px,2vw,36px)' }}>
          {LINKS.map(({ label, to }) => (
            <Link key={label} to={to} className="nav-link"
              data-active={isActive(to) ? 'true' : 'false'}>
              {label}
            </Link>
          ))}
        </nav>

        {/* MOBILE TOGGLE */}
        <div className="lg:hidden">
          <MenuToggle open={open} onClick={() => setOpen(v => !v)} />
        </div>
      </motion.header>

      {/* ══════════════════════════════════════════
          MOBILE OVERLAY
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 lg:hidden flex flex-col"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0, transition:{ duration:0.22, delay:0.12 } }}
            transition={{ duration:0.18 }}
            style={{ background:'#0C0A07' }}
          >
            {/* glow */}
            <div aria-hidden style={{
              position:'absolute', top:0, left:0, right:0, height:360, pointerEvents:'none',
              background:'radial-gradient(ellipse 90% 55% at 50% -15%, rgba(201,160,82,0.08) 0%, transparent 65%)',
            }} />

            {/* header: logo + X */}
            <div className="flex items-center justify-between flex-shrink-0 relative z-10"
              style={{
                height: 108,
                paddingLeft:  'clamp(20px,3vw,44px)',
                paddingRight: 'clamp(20px,3vw,44px)',
                borderBottom: '1px solid rgba(201,160,82,0.09)',
              }}
            >
              <Reveal delay={0}>
                <Link to="/" onClick={() => setOpen(false)} style={{ lineHeight:0 }}>
                  <div style={{ height:78, overflow:'hidden', display:'flex', alignItems:'center' }}>
                    <img src="/logo.svg" alt="FIT FORIN"
                      style={{ height:217, width:'auto', display:'block' }}
                      draggable={false}
                    />
                  </div>
                </Link>
              </Reveal>
              <MenuToggle open={open} onClick={() => setOpen(false)} />
            </div>

            {/* LINKS */}
            <nav className="flex-1 flex flex-col justify-center relative z-10"
              style={{ paddingLeft:'clamp(24px,5vw,52px)', paddingRight:28 }}>
              {LINKS.map(({ label, to }, i) => (
                <div key={label} style={{ borderBottom:'1px solid rgba(201,160,82,0.07)' }}>
                  <Reveal delay={0.06 + i * 0.065}>
                    <Link to={to} onClick={() => setOpen(false)}
                      className="flex items-center justify-between"
                      style={{ paddingTop:14, paddingBottom:14, textDecoration:'none' }}
                    >
                      <span style={{
                        fontSize:      'clamp(32px, 9vw, 58px)',
                        fontWeight:    900,
                        textTransform: 'uppercase',
                        letterSpacing: '-0.025em',
                        lineHeight:    1,
                        color: isActive(to) ? '#C9A052' : 'rgba(232,220,186,0.58)',
                      }}>
                        {label}
                      </span>
                      <span style={{
                        color:'#C9A052',
                        fontSize: isActive(to) ? 8 : 17,
                        opacity:  isActive(to) ? 1 : 0.22,
                        lineHeight:1, marginLeft:14, flexShrink:0,
                      }}>
                        {isActive(to) ? '●' : '→'}
                      </span>
                    </Link>
                  </Reveal>
                </div>
              ))}
            </nav>

            {/* footer */}
            <div className="flex-shrink-0 relative z-10">
              <Reveal delay={0.48}>
                <div className="flex justify-between items-center"
                  style={{ borderTop:'1px solid rgba(201,160,82,0.07)', padding:'14px clamp(24px,5vw,52px)' }}>
                  <span style={{ fontSize:8, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(201,160,82,0.2)' }}>
                    La Scienza applicata allo Sport
                  </span>
                  <span style={{ fontSize:8, fontFamily:'monospace', color:'rgba(201,160,82,0.12)' }}>
                    © {new Date().getFullYear()} FitforIN
                  </span>
                </div>
              </Reveal>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
