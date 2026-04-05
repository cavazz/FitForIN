import { Link } from 'react-router-dom'
import { categories } from '../data/articles'
import Logo from './Logo'

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

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
  </svg>
)

const YouTubeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
  </svg>
)

// ── colori footer ─────────────────────────────
const C = {
  text:       '#9A7E56',   // corpo principale — ben leggibile
  textMuted:  '#6A5438',   // testo secondario
  label:      '#C9A052',   // intestazioni sezioni (gold)
  link:       '#8A6E48',   // link a riposo
  linkHover:  '#C9A052',   // link hover
  count:      '#6A5438',   // conteggio categorie
  border:     'rgba(201,160,82,0.1)',
  bottom:     '#7A6240',   // copyright bar
}

export default function Footer() {
  const year = new Date().getFullYear()
  const catList = categories.filter(c => c.name !== 'Tutti')

  return (
    <footer style={{ background: '#0E0C09', borderTop: `1px solid ${C.border}` }}>

      {/* ── MAIN 3 colonne ── */}
      <div
        className="grid gap-10 px-7 md:px-12 pt-14 pb-12"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        {/* COL 1 — Brand */}
        <div>
          <div className="mb-5">
            <Logo height={36} />
          </div>
          <p className="text-[12px] leading-[1.7] mb-2" style={{ color: C.text }}>
            La Scienza applicata allo Sport.<br />
            Articoli tecnici su training, nutrizione e performance.
          </p>
          <p className="text-[11px] font-mono mb-7" style={{ color: C.textMuted }}>
            fitforin.it
          </p>

          <p className="text-[9px] font-bold tracking-[0.3em] uppercase mb-3" style={{ color: C.label }}>
            Seguici
          </p>
          <div className="flex gap-2">
            {[
              { icon: <InstagramIcon />, label: 'Instagram', href: 'https://www.instagram.com/fitforin/' },
              { icon: <YouTubeIcon />,   label: 'YouTube',   href: '#' },
            ].map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{ color: C.link, border: `1px solid ${C.border}` }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = C.linkHover
                  e.currentTarget.style.borderColor = 'rgba(201,160,82,0.4)'
                  e.currentTarget.style.background = 'rgba(201,160,82,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = C.link
                  e.currentTarget.style.borderColor = C.border
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* COL 2 — Navigazione + Legale */}
        <div>
          <p className="text-[9px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.label }}>
            Navigazione
          </p>
          <ul className="space-y-3 mb-8">
            {navLinks.map(([label, to]) => (
              <li key={label}>
                <Link
                  to={to}
                  className="group inline-flex items-center gap-1.5 text-[13px] transition-colors duration-150"
                  style={{ color: C.link }}
                  onMouseEnter={e => e.currentTarget.style.color = C.linkHover}
                  onMouseLeave={e => e.currentTarget.style.color = C.link}
                >
                  {label}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">↗</span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-[9px] font-bold tracking-[0.3em] uppercase mb-3" style={{ color: C.label }}>
            Legale
          </p>
          <ul className="space-y-2.5">
            {legalLinks.map(([label, to]) => (
              <li key={label}>
                <Link
                  to={to}
                  className="group inline-flex items-center gap-1.5 text-[13px] transition-colors duration-150"
                  style={{ color: C.link }}
                  onMouseEnter={e => e.currentTarget.style.color = C.linkHover}
                  onMouseLeave={e => e.currentTarget.style.color = C.link}
                >
                  {label}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 3 — Categorie */}
        <div>
          <p className="text-[9px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.label }}>
            Articoli per categoria
          </p>
          <div>
            {catList.map(({ name, count }) => (
              <Link
                key={name}
                to={`/categoria/${name}`}
                className="flex justify-between items-center py-2.5 group transition-colors duration-150"
                style={{ borderBottom: `1px solid rgba(201,160,82,0.06)` }}
              >
                <span
                  className="text-[12px] transition-colors group-hover:text-[#C9A052]"
                  style={{ color: C.link }}
                >
                  {name}
                </span>
                <span
                  className="text-[10px] font-mono transition-colors group-hover:text-[#C9A052]"
                  style={{ color: C.count }}
                >
                  {count} art.
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="flex justify-between items-center px-7 md:px-12 py-5 flex-wrap gap-3">
        <span className="text-[11px]" style={{ color: C.bottom }}>
          © {year} FitforIN — La Scienza applicata allo Sport · di Fabio Forin
        </span>

        {/* pill "Digital Experience" */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-bold tracking-[0.18em] uppercase"
          style={{
            color: C.textMuted,
            border: `1px solid rgba(201,160,82,0.14)`,
            background: 'rgba(201,160,82,0.04)',
          }}
        >
          <span className="relative w-1.5 h-1.5 flex-shrink-0" aria-hidden="true">
            <span
              className="absolute inset-0 rounded-full"
              style={{ background: '#C9A052', opacity: 0.35, animation: 'ping 1.4s ease-in-out infinite' }}
            />
            <span className="absolute inset-[1px] rounded-full" style={{ background: '#9A7040' }} />
          </span>
          Digital Experience by{' '}
          <span style={{ color: C.text, fontWeight: 800 }}>ACWebD</span>
        </div>
      </div>
    </footer>
  )
}
