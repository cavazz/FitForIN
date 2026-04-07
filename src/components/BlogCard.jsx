import { Link } from 'react-router-dom'
import { getArticleImage } from '../data/images'

export default function BlogCard({ article, index }) {
  const num = String(index + 4).padStart(2, '0')

  return (
    <Link
      to={`/articolo/${article.slug}`}
      className="blog-card group block relative overflow-hidden"
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
          className="card-img img-cover"
          loading="lazy"
          decoding="async"
          width="800"
          height="520"
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
            color: 'rgba(201,160,82,0.18)',
          }}
        >{num}</span>
        {/* category badge on image */}
        <span
          className="absolute bottom-3 left-3 text-[7px] font-bold tracking-[0.22em] uppercase px-2 py-[3px] rounded"
          style={{
            background: 'rgba(201,160,82,0.12)',
            color: '#C9A052',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(201,160,82,0.12)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {article.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="font-display font-bold leading-[1.3] mb-3"
          style={{ fontSize: 13, color: 'rgba(232,220,186,0.72)', transition: 'color 160ms ease' }}
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
            className="text-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ color: '#C9A052' }}
          >↗</span>
        </div>
      </div>
    </Link>
  )
}
