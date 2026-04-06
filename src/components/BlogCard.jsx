import { Link } from 'react-router-dom'
import { getArticleImage } from '../data/images'

export default function BlogCard({ article, index }) {
  const num = String(index + 4).padStart(2, '0')

  return (
    <Link
      to={`/articolo/${article.slug}`}
      className="group block relative overflow-hidden"
      style={{
        background: '#1A1714',
        borderRadius: 12,
        border: '1px solid rgba(201,160,82,0.1)',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.borderColor = 'rgba(201,160,82,0.28)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,160,82,0.08)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(201,160,82,0.1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* top gradient accent */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(201,160,82,0.25),transparent)' }}
      />

      {/* Cover image */}
      <div className="relative overflow-hidden" style={{ height: 160 }}>
        <img
          src={getArticleImage(article.slug, article.category)}
          alt={article.title}
          className="img-cover"
          style={{ transition: 'transform 0.6s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform='scale(1.06)'}
          onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
          loading="lazy"
        />
        {/* gradient over image */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 20%, rgba(26,23,20,0.9) 100%)' }}
        />
        {/* article number watermark */}
        <span
          aria-hidden="true"
          className="absolute top-3 left-3 font-black leading-none select-none pointer-events-none"
          style={{
            fontSize: 32,
            letterSpacing: '-2px',
            background: 'linear-gradient(180deg,rgba(201,160,82,0.22) 0%,transparent 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >{num}</span>
        {/* category badge on image */}
        <span
          className="absolute bottom-3 left-3 text-[7px] font-bold tracking-[0.22em] uppercase px-2 py-[3px] rounded"
          style={{ background: 'rgba(201,160,82,0.14)', color: '#C9A052', backdropFilter: 'blur(6px)' }}
        >
          {article.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="font-semibold leading-[1.35] mb-3 transition-colors"
          style={{
            fontSize: 13,
            color: 'rgba(232,220,186,0.72)',
            transition: 'color 0.18s',
          }}
          onMouseEnter={e => e.currentTarget.style.color='#E8DCBA'}
          onMouseLeave={e => e.currentTarget.style.color='rgba(232,220,186,0.72)'}
        >
          {article.title}
        </h3>
        <div className="flex items-center justify-between">
          <span
            className="text-[9px] tracking-[0.08em]"
            style={{ color: 'rgba(201,160,82,0.38)' }}
          >
            {article.readTime} min · {article.author}
          </span>
          <span
            className="text-[11px] opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: '#C9A052' }}
          >↗</span>
        </div>
      </div>
    </Link>
  )
}
