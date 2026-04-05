import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const KEY = 'fitforin_cookie_consent'

function DumbbellIcon({ size = 26 }) {
  const h = Math.round(size * 34 / 64)
  return (
    <svg width={size} height={h} viewBox="0 0 64 34" fill="none">
      <rect x="0"  y="1"  width="10" height="32" rx="4" fill="#C9A052"/>
      <rect x="11" y="7"  width="8"  height="20" rx="3" fill="#9A7830"/>
      <rect x="20" y="13" width="24" height="8"  rx="4" fill="#2E2410"/>
      <rect x="45" y="7"  width="8"  height="20" rx="3" fill="#9A7830"/>
      <rect x="54" y="1"  width="10" height="32" rx="4" fill="#C9A052"/>
    </svg>
  )
}

const COOKIES_INFO = [
  {
    name: 'Cookie tecnici',
    badge: 'Sempre attivi',
    active: true,
    desc: 'Indispensabili come il riscaldamento pre-allenamento. Gestiscono sessione, preferenze utente e sicurezza. Non richiedono consenso e non si possono disabilitare.',
  },
  {
    name: 'Google Analytics (anonimizzato)',
    badge: 'Opzionale',
    active: false,
    desc: 'Statistiche di traffico anonime — nessun dato personale, IP anonimizzato. Ci aiuta a capire quali contenuti funzionano, come un monitor HRV per il sito.',
  },
]

export default function CookieBanner() {
  const [show,     setShow]     = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(KEY)) {
      const t = setTimeout(() => setShow(true), 900)
      return () => clearTimeout(t)
    }
  }, [])

  const save = (v) => { localStorage.setItem(KEY, v); setShow(false) }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="cookie"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          exit={{ y: 100,    opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="fixed bottom-0 left-0 right-0 z-[300]
                     sm:bottom-5 sm:left-5 sm:right-auto sm:w-[460px]"
        >
          {/* card */}
          <div
            className="rounded-t-2xl sm:rounded-2xl overflow-hidden"
            style={{
              background: '#0D0B08',
              border: '1px solid rgba(201,160,82,0.22)',
              borderBottom: '1px solid rgba(201,160,82,0.1)',
              boxShadow: '0 -4px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,160,82,0.04)',
            }}
          >
            {/* top gold line */}
            <div style={{ height: 3, background: 'linear-gradient(90deg,#6A4A10,#C9A052 50%,#6A4A10)' }} />

            <div className="p-5">

              {/* ── HEADER ── */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="flex-shrink-0 mt-0.5 w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(201,160,82,0.08)', border: '1px solid rgba(201,160,82,0.2)' }}
                >
                  <DumbbellIcon size={28} />
                </div>
                <div>
                  <p className="text-[14px] font-black leading-tight" style={{ color: '#E8DCBA' }}>
                    Zero additivi. Solo la roba buona.
                  </p>
                  <p className="text-[10px] mt-0.5 leading-snug" style={{ color: 'rgba(201,160,82,0.42)' }}>
                    FitforIN · cookie clean, GDPR compliant
                  </p>
                </div>
              </div>

              {/* ── BODY ── */}
              <p className="text-[12px] leading-[1.72] mb-3" style={{ color: 'rgba(201,160,82,0.52)' }}>
                Come una scheda di allenamento ottimizzata, usiamo solo l'essenziale:
                cookie tecnici necessari e analisi statistica anonima per migliorare i contenuti.
              </p>

              {/* ── DETTAGLI ESPANDIBILI ── */}
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    key="details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      className="rounded-xl p-4 mb-3 space-y-3"
                      style={{
                        background: 'rgba(201,160,82,0.04)',
                        border: '1px solid rgba(201,160,82,0.1)',
                      }}
                    >
                      {COOKIES_INFO.map(({ name, badge, active, desc }) => (
                        <div key={name} className="flex gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-[11px] font-bold" style={{ color: '#C9A052' }}>{name}</span>
                              <span
                                className="text-[8px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full"
                                style={{
                                  background: active ? 'rgba(201,160,82,0.14)' : 'rgba(255,255,255,0.04)',
                                  color: active ? '#C9A052' : 'rgba(201,160,82,0.32)',
                                  border: active ? '1px solid rgba(201,160,82,0.22)' : '1px solid rgba(255,255,255,0.07)',
                                }}
                              >{badge}</span>
                            </div>
                            <p className="text-[10.5px] leading-[1.6]" style={{ color: 'rgba(201,160,82,0.38)' }}>
                              {desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── LINK SECONDARI ── */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {[
                  { label: expanded ? 'Nascondi dettagli ↑' : 'Dettagli ↓', action: () => setExpanded(v => !v), isBtn: true },
                  { label: 'Privacy Policy', to: '/privacy' },
                  { label: 'Cookie Policy', to: '/cookie' },
                ].map(({ label, action, isBtn, to }) =>
                  isBtn ? (
                    <button
                      key={label}
                      onClick={action}
                      className="text-[10px] cursor-pointer"
                      style={{
                        color: 'rgba(201,160,82,0.36)',
                        textDecoration: 'underline',
                        textUnderlineOffset: 3,
                      }}
                    >{label}</button>
                  ) : (
                    <Link
                      key={label}
                      to={to}
                      onClick={() => save('necessary')}
                      className="text-[10px]"
                      style={{
                        color: 'rgba(201,160,82,0.36)',
                        textDecoration: 'underline',
                        textUnderlineOffset: 3,
                      }}
                    >{label}</Link>
                  )
                )}
              </div>

              {/* ── CTA ── */}
              <div className="flex gap-2.5">
                <button
                  onClick={() => save('all')}
                  className="btn-gold flex-1 py-3 cursor-pointer"
                  style={{ justifyContent: 'center', textAlign: 'center' }}
                >
                  Accetta tutto
                </button>
                <button
                  onClick={() => save('necessary')}
                  className="btn-outline-gold flex-1 py-3 cursor-pointer"
                  style={{ justifyContent: 'center' }}
                >
                  Solo necessari
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
