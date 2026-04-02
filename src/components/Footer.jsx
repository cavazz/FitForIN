import { Link } from 'react-router-dom'
import { categories } from '../data/articles'

const navLinks = [
  ['Training',          '/categoria/Training'],
  ['Alimentazione',     '/categoria/Alimentazione'],
  ['Basket Lab',        '/categoria/Basket Lab'],
  ['Medicina sportiva', '/categoria/Medicina sportiva'],
  ['Contatti',          '/contatti'],
]

const legalLinks = [
  ['Privacy Policy', '/privacy'],
  ['Cookie Policy',  '/cookie'],
]

const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
  </svg>
)

const YouTubeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
  </svg>
)

export default function Footer() {
  const year = new Date().getFullYear()
  const catList = categories.filter(c => c.name !== 'Tutti')

  return (
    <footer style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.05)' }}>

      {/* MAIN 3 colonne */}
      <div
        className="grid gap-12 px-7 pt-12 pb-10"
        style={{
          gridTemplateColumns: '1.2fr 1fr 1fr',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* COL 1 — Brand */}
        <div>
          <span className="block text-[18px] font-black tracking-[0.3em] uppercase mb-3 grad-text">
            FitforIN
          </span>
          <p className="text-[11px] text-[#333] leading-[1.6] mb-1.5">
            La Scienza applicata allo Sport.<br />
            Articoli tecnici su training, nutrizione e performance.
          </p>
          <p className="text-[10px] font-mono text-[#1e1e1e] mb-6">fitforin.it</p>

          <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#1e1e1e] mb-3">Seguici</p>
          <div className="flex gap-2">
            {[
              { icon: <InstagramIcon />, label: 'Instagram', href: '#' },
              { icon: <YouTubeIcon />,   label: 'YouTube',   href: '#' },
            ].map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-[#333] transition-all duration-200 hover:text-dim"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* COL 2 — Navigazione + Legale */}
        <div>
          <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#1e1e1e] mb-4">Navigazione</p>
          <ul className="space-y-2.5 mb-7">
            {navLinks.map(([label, to]) => (
              <li key={label}>
                <Link
                  to={to}
                  className="group inline-flex items-center gap-1.5 text-[12px] text-[#333] hover:text-dim transition-colors duration-150"
                >
                  {label}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px]">↗</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#1e1e1e] mb-3">Legale</p>
          <ul className="space-y-2">
            {legalLinks.map(([label, to]) => (
              <li key={label}>
                <Link
                  to={to}
                  className="group inline-flex items-center gap-1.5 text-[12px] text-[#333] hover:text-dim transition-colors duration-150"
                >
                  {label}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px]">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 3 — Categorie con conteggio */}
        <div>
          <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#1e1e1e] mb-3">Articoli per categoria</p>
          <div>
            {catList.map(({ name, count }) => (
              <div
                key={name}
                className="flex justify-between items-center py-2.5 cursor-pointer group"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
              >
                <span className="text-[11px] text-[#2a2a2a] group-hover:text-dim transition-colors">{name}</span>
                <span className="text-[9px] font-mono text-[#1a1a1a] group-hover:text-muted transition-colors">{count} art.</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="flex justify-between items-center px-7 py-4 flex-wrap gap-2">
        <span className="text-[10px] text-[#1e1e1e]">
          © {year} FitforIN — La Scienza applicata allo Sport
        </span>

        {/* pill con ping dot — stile dierreimpianti */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-bold tracking-[0.2em] uppercase text-[#1e1e1e] transition-all duration-200 hover:border-white/10 cursor-pointer"
          style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}
        >
          {/* animated ping dot */}
          <span className="relative w-1.5 h-1.5" aria-hidden="true">
            <span
              className="absolute inset-0 rounded-full bg-white opacity-30"
              style={{ animation: 'ping 1.4s ease-in-out infinite' }}
            />
            <span className="absolute inset-[1px] rounded-full bg-[#666]" />
          </span>
          Digital Experience by{' '}
          <span
            style={{
              background: 'linear-gradient(90deg,#888,#555)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ACWebD
          </span>
        </div>
      </div>
    </footer>
  )
}
