import { useParams, Link } from 'react-router-dom'
import { articles } from '../data/articles'
import Footer from '../components/Footer'

export default function ArticlePage() {
  const { slug } = useParams()
  const article = articles.find(a => a.slug === slug)

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted text-sm mb-4">Articolo non trovato</p>
          <Link to="/" className="text-dim text-xs tracking-widest uppercase hover:text-white transition-colors">
            ← Torna alla home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* progress bar */}
      <div
        className="fixed top-0 left-0 h-px z-50 transition-all"
        style={{ background: 'linear-gradient(90deg,#fff,#666)', width: '0%' }}
        id="progress-bar"
      />

      <article className="pt-28 pb-20 px-7 max-w-[680px] mx-auto">
        {/* breadcrumb */}
        <div className="flex items-center gap-3 mb-8">
          <Link to="/" className="text-[8px] tracking-[0.3em] uppercase text-muted hover:text-dim transition-colors">
            Home
          </Link>
          <span className="text-muted text-xs">·</span>
          <span className="text-[8px] tracking-[0.3em] uppercase text-muted">{article.category}</span>
        </div>

        {/* header articolo */}
        <div className="mb-10">
          <div className="text-[7px] tracking-[0.3em] uppercase text-muted mb-3">
            {article.emoji} {article.category} · {article.readTime} min lettura
          </div>
          <h1
            className="font-black leading-[1.05] mb-6"
            style={{
              fontSize: 'clamp(32px,5vw,52px)',
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg,#fff 0%,#aaa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {article.title}
          </h1>
          <p className="text-[13px] text-[#555] leading-[1.7]">{article.excerpt}</p>
        </div>

        {/* immagine hero articolo */}
        <div
          className="w-full h-[280px] rounded-xl flex items-center justify-center text-5xl mb-10"
          style={{ background: 'linear-gradient(135deg,#111,#1c1c1c)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          {article.emoji}
        </div>

        {/* corpo articolo — placeholder */}
        <div className="space-y-5 text-[14px] text-[#555] leading-[1.8]">
          <p>Questo è il contenuto dell'articolo. In produzione verrà caricato dal CMS.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

        {/* back link */}
        <div className="mt-14 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link to="/" className="text-[9px] tracking-[0.3em] uppercase text-muted hover:text-dim transition-colors">
            ← Torna alla home
          </Link>
        </div>
      </article>

      <Footer />
    </>
  )
}
