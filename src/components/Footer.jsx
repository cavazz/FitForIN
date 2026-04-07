import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { categories } from '../data/articles'

const navLinks = [
  ['Training',               '/categoria/Training'],
  ['Alimentazione',          '/categoria/Alimentazione'],
  ['Basket Lab',             '/categoria/Basket Lab'],
  ['Medicina sportiva',      '/categoria/Medicina sportiva'],
  ["Scienza dell'esercizio", "/categoria/Scienza dell'esercizio"],
  ['Contatti',               '/contatti'],
]

const legalLinks = [
  ['Privacy Policy', '/privacy'],
  ['Cookie Policy',  '/cookie'],
]

export default function Footer() {
  const year    = new Date().getFullYear()
  const catList = categories.filter(c => c.name !== 'Tutti')
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      style={{
        background: '#0C0A07',
        borderTop: '1px solid rgba(201,160,82,0.1)',
      }}
    >
      {/* ── MAIN BODY — 2 col asymmetric ── */}
      <div
        className="grid px-7 md:px-12 py-12 gap-12"
        style={{ gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)' }}
      >
        {/* LEFT — brand description (wide col) */}
        <div>
          <p
            className="font-display font-extrabold uppercase leading-[0.9] tracking-[-0.03em] mb-6"
            style={{
              fontSize: 'clamp(36px,5vw,64px)',
              color: '#E8DCBA',
            }}
          >
            Fitness<br />
            <span style={{ color: 'rgba(201,160,82,0.55)' }}>fondato</span><br />
            <span className="text-outline" style={{ fontSize: '0.9em' }}>sulla scienza.</span>
          </p>
          <p
            className="text-[13px] leading-[1.75] max-w-[360px]"
            style={{ color: 'rgba(201,160,82,0.5)' }}
          >
            Articoli tecnici su allenamento, nutrizione e performance sportiva.
            Contenuti gratuiti per chi prende lo sport sul serio.
          </p>
        </div>

        {/* RIGHT — navigation (narrow col) */}
        <div>
          <p
            className="text-[9px] font-bold tracking-[0.35em] uppercase mb-5"
            style={{ color: 'rgba(201,160,82,0.35)' }}
          >
            Navigazione
          </p>
          <ul className="mb-8">
            {navLinks.map(([label, to]) => (
              <li key={label} style={{ borderBottom: '1px solid rgba(201,160,82,0.06)' }}>
                <Link
                  to={to}
                  className="footer-link flex items-center justify-between py-2.5 text-[13px]"
                >
                  {label}
                  <span className="footer-link-arrow text-[10px]" style={{ color: '#C9A052' }}>↗</span>
                </Link>
              </li>
            ))}
          </ul>

          <p
            className="text-[9px] font-bold tracking-[0.35em] uppercase mb-4"
            style={{ color: 'rgba(201,160,82,0.35)' }}
          >
            Legale
          </p>
          <ul className="flex gap-4">
            {legalLinks.map(([label, to]) => (
              <li key={label}>
                <Link
                  to={to}
                  className="footer-link text-[11px]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── CATEGORIES STRIP ── */}
      <div
        className="px-7 md:px-12 py-5 flex flex-wrap gap-x-6 gap-y-2"
        style={{ borderTop: '1px solid rgba(201,160,82,0.07)' }}
      >
        <span
          className="text-[9px] tracking-[0.3em] uppercase self-center mr-2"
          style={{ color: 'rgba(201,160,82,0.25)' }}
        >
          Categorie
        </span>
        {catList.map(({ name, count }) => (
          <Link
            key={name}
            to={`/categoria/${name}`}
            className="footer-cat-pill"
          >
            {name}
            <span className="footer-cat-count font-mono">{count}</span>
          </Link>
        ))}
      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        className="flex justify-between items-center px-7 md:px-12 py-4 flex-wrap gap-3"
        style={{ borderTop: '1px solid rgba(201,160,82,0.07)' }}
      >
        <span className="text-[11px]" style={{ color: 'rgba(201,160,82,0.28)' }}>
          © {year} FitforIN · di Fabio Forin
        </span>

        {/* ping pill */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-bold tracking-[0.15em] uppercase"
          style={{
            color: 'rgba(201,160,82,0.4)',
            border: '1px solid rgba(201,160,82,0.12)',
            background: 'rgba(201,160,82,0.03)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
          }}
        >
          <span className="relative w-1.5 h-1.5 flex-shrink-0" aria-hidden="true">
            <span
              className="absolute inset-0 rounded-full"
              style={{ background: '#C9A052', opacity: 0.3, animation: 'ping 1.4s ease-in-out infinite' }}
            />
            <span className="absolute inset-[1px] rounded-full" style={{ background: '#7A5E28' }} />
          </span>
          Digital Experience by{' '}
          <span style={{ color: 'rgba(201,160,82,0.7)', fontWeight: 800 }}>ACWebD</span>
        </div>
      </div>
    </motion.footer>
  )
}
