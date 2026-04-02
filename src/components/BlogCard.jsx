import { Link } from 'react-router-dom'

export default function BlogCard({ article, index }) {
  const num = String(index + 4).padStart(2, '0')

  return (
    <Link
      to={`/articolo/${article.slug}`}
      className="block relative rounded-[10px] p-[14px] overflow-hidden transition-all duration-150 group"
      style={{
        background: 'linear-gradient(135deg,#161616,#111)',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* bordo superiore gradient */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)' }}
      />

      <div
        aria-hidden="true"
        className="text-[30px] font-black leading-none mb-2"
        style={{
          background: 'linear-gradient(180deg,rgba(255,255,255,0.06) 0%,transparent 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-2px',
        }}
      >
        {num}
      </div>

      <div className="text-[7px] tracking-[0.2em] uppercase text-muted mb-1.5">
        {article.emoji} {article.category}
      </div>
      <h3 className="text-[11px] font-semibold text-[#777] leading-[1.4] mb-2">
        {article.title}
      </h3>
      <div className="text-[8px] text-[#2a2a2a]">{article.readTime} min lettura</div>

      <span className="absolute bottom-4 right-4 text-[13px] text-[#1e1e1e] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
    </Link>
  )
}
