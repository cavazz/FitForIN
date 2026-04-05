import { Link } from 'react-router-dom'
import { getArticleImage } from '../data/images'

export default function BlogCard({ article, index }) {
  const num = String(index + 4).padStart(2, '0')

  return (
    <Link
      to={`/articolo/${article.slug}`}
      className="block relative rounded-[10px] overflow-hidden transition-all duration-200 group"
      style={{
        background: '#1E1A14',
        border: '1px solid rgba(201,160,82,0.08)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201,160,82,0.22)'
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(201,160,82,0.08)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* bordo superiore gradient gold */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(201,160,82,0.2),transparent)' }}
      />

      {/* Cover image */}
      <div className="relative h-[130px] overflow-hidden">
        <img
          src={getArticleImage(article.slug, article.category)}
          alt={article.title}
          className="img-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(30,26,20,0.92) 100%)' }}
        />
        {/* numero */}
        <div
          aria-hidden="true"
          className="absolute top-2 left-3 text-[28px] font-black leading-none"
          style={{
            background: 'linear-gradient(180deg,rgba(201,160,82,0.18) 0%,transparent 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-2px',
          }}
        >
          {num}
        </div>
      </div>

      {/* Content */}
      <div className="p-[14px]">
        <div
          className="text-[8px] tracking-[0.2em] uppercase mb-2 font-semibold"
          style={{ color: 'rgba(201,160,82,0.5)' }}
        >
          {article.category}
        </div>
        <h3
          className="text-[12px] font-semibold leading-[1.4] mb-3 transition-colors group-hover:text-[#E8DCBA]"
          style={{ color: '#B89060' }}
        >
          {article.title}
        </h3>
        <div className="text-[9px] tracking-wide" style={{ color: 'rgba(201,160,82,0.32)' }}>
          {article.readTime} min · {article.author}
        </div>
      </div>

      <span
        className="absolute bottom-4 right-4 text-[13px] opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: '#C9A052' }}
      >↗</span>
    </Link>
  )
}
