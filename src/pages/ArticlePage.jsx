import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { articles } from '../data/articles'
import { getArticleImage } from '../data/images'
import Footer from '../components/Footer'

/* ── JSON-LD structured data for BlogPosting ────────────── */
function ArticleStructuredData({ article, imageUrl }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: imageUrl,
    author: { '@type': 'Person', name: article.author },
    datePublished: article.date,
    inLanguage: 'it',
    url: `https://www.fitforin.it/articolo/${article.slug}`,
    publisher: { '@type': 'Person', name: 'Fabio Forin' },
    articleSection: article.category,
    timeRequired: `PT${article.readTime}M`,
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrollTop = el.scrollTop || document.body.scrollTop
      const scrollHeight = el.scrollHeight - el.clientHeight
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return progress
}

function ArticleBlock({ block }) {
  const baseText = { color: 'rgba(201,160,82,0.68)', lineHeight: '1.85', fontSize: '15px' }
  const heading2 = {
    fontWeight: 800,
    fontSize: 'clamp(18px,3vw,24px)',
    letterSpacing: '-0.03em',
    color: '#E8DCBA',
    marginTop: '2.5rem',
    marginBottom: '0.75rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid rgba(201,160,82,0.1)',
  }
  const heading3 = {
    fontWeight: 700,
    fontSize: '15px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: '#C9A052',
    marginTop: '1.5rem',
    marginBottom: '0.5rem',
  }

  if (block.type === 'intro') {
    return (
      <p style={{
        ...baseText,
        fontSize: '17px',
        color: 'rgba(201,160,82,0.8)',
        borderLeft: '2px solid rgba(201,160,82,0.3)',
        paddingLeft: '1.25rem',
        marginBottom: '1.5rem',
      }}>
        {block.text}
      </p>
    )
  }
  if (block.type === 'h2') return <h2 style={heading2}>{block.text}</h2>
  if (block.type === 'h3') return <h3 style={heading3}>{block.text}</h3>
  if (block.type === 'p') return <p style={{ ...baseText, marginBottom: '1rem' }}>{block.text}</p>
  if (block.type === 'list') {
    return (
      <ul style={{ marginBottom: '1rem', paddingLeft: '0' }}>
        {block.items.map((item, i) => (
          <li key={i} style={{
            ...baseText,
            display: 'flex',
            gap: '0.75rem',
            marginBottom: '0.5rem',
          }}>
            <span style={{ color: '#C9A052', flexShrink: 0 }}>◆</span>
            {item}
          </li>
        ))}
      </ul>
    )
  }
  return null
}

export default function ArticlePage() {
  const { slug } = useParams()
  const article = articles.find(a => a.slug === slug)
  const progress = useScrollProgress()

  const relatedArticles = articles
    .filter(a => a.slug !== slug && a.category === article?.category)
    .slice(0, 3)

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm mb-4" style={{ color: 'rgba(201,160,82,0.42)' }}>Articolo non trovato</p>
          <Link
            to="/"
            className="text-xs tracking-widest uppercase transition-colors"
            style={{ color: 'rgba(201,160,82,0.42)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A052'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(201,160,82,0.42)'}
          >
            ← Torna alla home
          </Link>
        </div>
      </div>
    )
  }

  const imageUrl = getArticleImage(article.slug, article.category)

  return (
    <>
      <ArticleStructuredData article={article} imageUrl={imageUrl} />

      {/* scroll progress bar — gold */}
      <div
        aria-hidden="true"
        aria-label="Progresso lettura"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="fixed top-0 left-0 h-[2px] z-50 transition-none"
        style={{
          background: 'linear-gradient(90deg,#C9A052,#E8DCBA)',
          width: `${progress}%`,
        }}
      />

      <article id="main-content" className="pt-28 pb-20 px-7 max-w-[720px] mx-auto">
        {/* breadcrumb */}
        <div className="flex items-center gap-3 mb-10">
          <Link
            to="/"
            className="text-[8px] tracking-[0.3em] uppercase transition-colors"
            style={{ color: 'rgba(201,160,82,0.42)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A052'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(201,160,82,0.42)'}
          >
            Home
          </Link>
          <span style={{ color: 'rgba(201,160,82,0.2)' }} aria-hidden="true">·</span>
          <Link
            to={`/categoria/${article.category}`}
            className="text-[8px] tracking-[0.3em] uppercase transition-colors"
            style={{ color: 'rgba(201,160,82,0.42)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A052'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(201,160,82,0.42)'}
          >
            {article.category}
          </Link>
        </div>

        {/* header articolo */}
        <header className="mb-10">
          <div
            className="text-[7px] tracking-[0.3em] uppercase mb-4 flex items-center gap-3"
            style={{ color: 'rgba(201,160,82,0.42)' }}
          >
            <span
              className="px-2 py-1 rounded"
              style={{ background: 'rgba(201,160,82,0.1)', color: '#C9A052', fontSize: '7px' }}
            >
              {article.category}
            </span>
            <span>{article.readTime} min lettura</span>
            <span>·</span>
            <span>{article.author}</span>
            <span>·</span>
            <span>{new Date(article.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <h1
            className="font-black leading-[1.05] mb-6"
            style={{
              fontSize: 'clamp(28px,4.5vw,48px)',
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg,#E8DCBA 0%,#C9A052 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {article.title}
          </h1>
        </header>

        {/* immagine hero articolo */}
        <div
          className="w-full h-[260px] rounded-xl overflow-hidden mb-10 relative"
          style={{ border: '1px solid rgba(201,160,82,0.1)' }}
        >
          <img
            src={imageUrl}
            alt={article.title}
            className="img-cover"
            fetchpriority="high"
            decoding="async"
            width="720"
            height="260"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(22,20,18,0.6) 100%)' }}
          />
          <span
            className="absolute bottom-4 right-4 text-3xl"
            aria-hidden="true"
          >
            {article.emoji}
          </span>
        </div>

        {/* corpo articolo — contenuto reale */}
        <div>
          {article.content
            ? article.content.map((block, i) => <ArticleBlock key={i} block={block} />)
            : <p style={{ color: 'rgba(201,160,82,0.68)', lineHeight: '1.8', fontSize: '15px' }}>{article.excerpt}</p>
          }
        </div>

        {/* divider */}
        <div
          className="my-14"
          style={{ borderTop: '1px solid rgba(201,160,82,0.1)' }}
        />

        {/* Articoli correlati */}
        {relatedArticles.length > 0 && (
          <div className="mb-14">
            <p
              className="text-[9px] tracking-[0.3em] uppercase mb-5"
              style={{ color: 'rgba(201,160,82,0.42)' }}
            >
              Articoli correlati — {article.category}
            </p>
            <div className="space-y-3">
              {relatedArticles.map(related => (
                <Link
                  key={related.id}
                  to={`/articolo/${related.slug}`}
                  className="flex items-center justify-between p-4 rounded-lg group transition-all"
                  style={{
                    background: '#141008',
                    border: '1px solid rgba(201,160,82,0.07)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,160,82,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,160,82,0.07)'}
                >
                  <div>
                    <div className="text-[12px] font-semibold mb-1" style={{ color: 'rgba(201,160,82,0.72)' }}>
                      {related.title}
                    </div>
                    <div className="text-[9px]" style={{ color: 'rgba(201,160,82,0.42)' }}>
                      {related.readTime} min lettura
                    </div>
                  </div>
                  <span
                    className="text-[16px] opacity-0 group-hover:opacity-100 transition-opacity ml-4"
                    style={{ color: '#C9A052' }}
                  >↗</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* back link */}
        <Link
          to="/"
          className="text-[9px] tracking-[0.3em] uppercase transition-colors"
          style={{ color: 'rgba(201,160,82,0.42)' }}
          onMouseEnter={e => e.currentTarget.style.color = '#C9A052'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(201,160,82,0.42)'}
        >
          ← Torna alla home
        </Link>
      </article>

      <Footer />
    </>
  )
}
