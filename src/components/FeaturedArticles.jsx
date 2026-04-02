import { Link } from 'react-router-dom'
import { featuredArticles } from '../data/articles'

export default function FeaturedArticles() {
  const [main, ...rest] = featuredArticles

  return (
    <section style={{ background: 'linear-gradient(135deg,#0e0e0e 0%,#1a1a1a 100%)' }}>
      {/* header */}
      <div className="flex justify-between items-center px-7 pt-5">
        <span className="flex items-center gap-3 text-[8px] tracking-[0.4em] uppercase text-muted">
          <span className="text-[#1a1a1a] font-bold">01</span>
          In evidenza
        </span>
        <Link to="/" className="text-[9px] tracking-[0.1em] uppercase text-muted hover:text-dim transition-colors">
          Vedi tutti →
        </Link>
      </div>

      {/* grid asimmetrica */}
      <div
        className="mt-5"
        style={{
          display: 'grid',
          gridTemplateColumns: '5fr 3fr',
          gridTemplateRows: 'auto auto',
          gap: '1px',
          background: 'rgba(255,255,255,0.04)',
        }}
      >
        {/* articolo grande — span 2 righe */}
        <Link
          to={`/articolo/${main.slug}`}
          className="block p-7 relative overflow-hidden transition-colors"
          style={{ background: '#0c0c0c', gridRow: 'span 2' }}
        >
          {/* numero sfondo */}
          <div
            aria-hidden="true"
            className="text-[100px] font-black leading-none mb-[-20px]"
            style={{
              background: 'linear-gradient(180deg,rgba(255,255,255,0.06) 0%,transparent 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-6px',
            }}
          >
            01
          </div>

          {/* immagine placeholder */}
          <div
            className="h-[120px] rounded-lg mb-4 flex items-center justify-center text-3xl"
            style={{
              background: 'linear-gradient(135deg,#141414,#1c1c1c)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {main.emoji}
          </div>

          <div className="text-[7px] tracking-[0.3em] uppercase text-muted mb-2">
            {main.category}
          </div>
          <h2
            className="text-[15px] font-extrabold leading-[1.2] mb-3"
            style={{
              background: 'linear-gradient(135deg,#fff 30%,#888 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.03em',
            }}
          >
            {main.title}
          </h2>
          <p className="text-[10px] text-[#333] leading-[1.6] mb-4">{main.excerpt}</p>
          <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-dim border-b border-muted pb-0.5">
            Leggi l'articolo
          </span>
          <span className="absolute bottom-7 right-7 text-[22px] text-[#1a1a1a]">↗</span>
        </Link>

        {/* articoli secondari */}
        {rest.map((article, idx) => (
          <Link
            key={article.id}
            to={`/articolo/${article.slug}`}
            className="flex flex-col justify-between p-5 relative transition-colors"
            style={{ background: '#0a0a0a' }}
            onMouseEnter={e => e.currentTarget.style.background = '#0e0e0e'}
            onMouseLeave={e => e.currentTarget.style.background = '#0a0a0a'}
          >
            <span className="absolute top-5 right-5 text-[14px] text-[#1e1e1e]">↗</span>
            <div>
              <div className="text-[11px] font-black text-[#1e1e1e] tracking-[0.1em] mb-3 font-mono">
                — 0{idx + 2}
              </div>
              <div className="text-[7px] tracking-[0.2em] uppercase text-muted mb-1.5">
                {article.category}
              </div>
              <h3 className="text-[13px] font-bold text-[#666] leading-[1.3]">
                {article.title}
              </h3>
            </div>
            <div className="text-[8px] tracking-[0.1em] uppercase text-[#222]">
              {article.readTime} min lettura
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
