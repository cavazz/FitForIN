import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { articles } from '../data/articles'
import { getArticleImage, categoryImages } from '../data/images'
import Footer from '../components/Footer'

/* ── per-category config ── */
const CAT_CONFIG = {
  'Training': {
    label:    'Training',
    headline: 'Allenati con metodo.',
    sub:      'Periodizzazione, forza, ipertrofia, mobilità. Tutto ciò che serve per costruire un atleta migliore.',
    accent:   '#7EA8BE',   // steel blue tint
    emoji:    '🏋️',
  },
  'Alimentazione': {
    label:    'Alimentazione',
    headline: 'Mangi come ti alleni?',
    sub:      'Nutrizione sportiva, timing proteico, supplementazione e strategie alimentari evidence-based.',
    accent:   '#7EBE8A',   // earthy green tint
    emoji:    '🥗',
  },
  'Basket Lab': {
    label:    'Basket Lab',
    headline: 'Il basket sotto la lente.',
    sub:      'Analisi tecnica, tattica e scientifica del gioco del basket. Ricerca applicata al campo.',
    accent:   '#BE9A7E',   // amber/court tint
    emoji:    '🏀',
  },
  'Medicina sportiva': {
    label:    'Medicina Sportiva',
    headline: 'Il corpo che compete.',
    sub:      'Prevenzione degli infortuni, riabilitazione e medicina dello sport per atleti e professionisti.',
    accent:   '#7EBEAE',   // teal tint
    emoji:    '🩺',
  },
  "Scienza dell'esercizio": {
    label:    "Scienza dell'Esercizio",
    headline: 'La fisiologia che non mente.',
    sub:      "Fisiologia dell'esercizio, biomeccanica e ricerca applicata alla performance sportiva.",
    accent:   '#9A7EBE',   // purple tint
    emoji:    '🔬',
  },
}

const DEFAULT_CONFIG = {
  label: 'Categoria', headline: 'Articoli.', sub: '', accent: '#C9A052', emoji: '📄',
}

/* ─────────────────────────────────────────────── */

function FeaturedCatCard({ article }) {
  const img = getArticleImage(article.slug, article.category)
  return (
    <Link
      to={`/articolo/${article.slug}`}
      className="block relative overflow-hidden rounded-xl group"
      style={{ border: '1px solid rgba(201,160,82,0.1)' }}
    >
      <div className="relative h-[280px] md:h-[360px] overflow-hidden">
        <img src={img} alt={article.title} className="img-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(22,20,18,0.1) 0%, rgba(22,20,18,0.88) 100%)' }} />
      </div>
      <div className="p-6 md:p-8" style={{ background: '#1A1714' }}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[7px] tracking-[0.3em] uppercase px-2 py-1 rounded" style={{ background: 'rgba(201,160,82,0.1)', color: '#C9A052' }}>
            {article.category}
          </span>
          <span className="text-[8px]" style={{ color: 'rgba(201,160,82,0.42)' }}>{article.readTime} min lettura</span>
        </div>
        <h2
          className="font-black leading-[1.1] mb-3"
          style={{
            fontSize: 'clamp(20px,3.5vw,32px)',
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg,#E8DCBA 0%,#C9A052 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {article.title}
        </h2>
        <p className="text-[13px] leading-[1.7] mb-4" style={{ color: 'rgba(201,160,82,0.52)' }}>{article.excerpt}</p>
        <span
          className="text-[9px] font-bold tracking-[0.2em] uppercase transition-colors group-hover:opacity-80"
          style={{ color: '#C9A052', borderBottom: '1px solid rgba(201,160,82,0.35)', paddingBottom: '2px' }}
        >
          Leggi l'articolo →
        </span>
      </div>
    </Link>
  )
}

function CatArticleRow({ article, index }) {
  const img = getArticleImage(article.slug, article.category)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/articolo/${article.slug}`}
        className="flex gap-4 group p-4 rounded-xl transition-all"
        style={{ border: '1px solid rgba(201,160,82,0.07)' }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(201,160,82,0.2)'
          e.currentTarget.style.background = 'rgba(201,160,82,0.03)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(201,160,82,0.07)'
          e.currentTarget.style.background  = 'transparent'
        }}
      >
        {/* thumbnail */}
        <div className="flex-shrink-0 w-[90px] h-[64px] rounded-lg overflow-hidden">
          <img src={img} alt={article.title} className="img-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        {/* text */}
        <div className="flex-1 min-w-0">
          <div className="text-[7px] tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(201,160,82,0.38)' }}>
            {article.readTime} min · {new Date(article.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
          <h3
            className="text-[13px] font-semibold leading-[1.35] transition-colors group-hover:text-gold-l truncate"
            style={{ color: 'rgba(232,220,186,0.72)' }}
          >
            {article.title}
          </h3>
          <p className="text-[11px] leading-[1.5] mt-1 line-clamp-2" style={{ color: 'rgba(201,160,82,0.38)' }}>
            {article.excerpt}
          </p>
        </div>
        <span
          className="self-center text-[18px] opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0"
          style={{ color: '#C9A052' }}
        >↗</span>
      </Link>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────── */

export default function CategoriaPage() {
  const { cat } = useParams()
  const cfg     = CAT_CONFIG[cat] || DEFAULT_CONFIG
  const bgImage = categoryImages[cat] || categoryImages['Training']

  const catArticles = articles.filter(a => a.category === cat)
  const [featured, ...rest] = catArticles

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative pt-[120px] pb-0 overflow-hidden">
        {/* full-bleed bg image */}
        <div className="absolute inset-0 overflow-hidden">
          <img src={bgImage} alt={cfg.label} className="img-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to bottom,
                rgba(22,20,18,0.7) 0%,
                rgba(22,20,18,0.85) 60%,
                #161412 100%
              )`,
            }}
          />
          {/* accent tint */}
          <div
            className="absolute inset-0 mix-blend-color opacity-10"
            style={{ background: cfg.accent }}
          />
        </div>

        <div className="relative z-10 px-6 md:px-10 pt-10 pb-14 max-w-4xl mx-auto">
          {/* breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Link
              to="/"
              className="text-[8px] tracking-[0.3em] uppercase transition-colors"
              style={{ color: 'rgba(201,160,82,0.42)' }}
              onMouseEnter={e => e.currentTarget.style.color = '#C9A052'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(201,160,82,0.42)'}
            >
              Home
            </Link>
            <span style={{ color: 'rgba(201,160,82,0.2)' }}>·</span>
            <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: '#C9A052' }}>
              {cfg.label}
            </span>
          </div>

          {/* eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[8px] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,160,82,0.42)' }}>
              {catArticles.length} articoli disponibili
            </span>
          </div>

          {/* headline */}
          <h1
            className="font-black leading-[0.9] mb-5"
            style={{
              fontSize: 'clamp(52px,10vw,100px)',
              letterSpacing: '-0.05em',
              background: 'linear-gradient(135deg,#F0E6C4 0%,#C9A052 55%,#7A5E28 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {cfg.headline}
          </h1>
          <p
            className="text-[14px] leading-[1.7] max-w-[480px]"
            style={{ color: 'rgba(201,160,82,0.55)' }}
          >
            {cfg.sub}
          </p>

          {/* stat pills */}
          <div className="flex gap-3 mt-8 flex-wrap">
            {[
              [`${catArticles.length}`, 'Articoli'],
              [`${Math.round(catArticles.reduce((s, a) => s + a.readTime, 0) / catArticles.length || 0)} min`, 'Lettura media'],
              ['Fabio Forin', 'Autore'],
            ].map(([val, lbl]) => (
              <div
                key={lbl}
                className="px-4 py-2 rounded-full flex items-center gap-2"
                style={{ background: 'rgba(201,160,82,0.08)', border: '1px solid rgba(201,160,82,0.15)' }}
              >
                <span className="text-[13px] font-bold" style={{ color: '#C9A052' }}>{val}</span>
                <span className="text-[9px] tracking-[0.1em] uppercase" style={{ color: 'rgba(201,160,82,0.42)' }}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <div className="px-6 md:px-10 pb-20 max-w-4xl mx-auto" style={{ background: '#161412' }}>

        {/* Featured article */}
        {featured && (
          <div className="mb-10">
            <p className="text-[8px] tracking-[0.35em] uppercase mb-4" style={{ color: 'rgba(201,160,82,0.4)' }}>
              — Articolo in evidenza
            </p>
            <FeaturedCatCard article={featured} />
          </div>
        )}

        {/* Remaining articles */}
        {rest.length > 0 && (
          <div>
            <div
              className="flex justify-between items-center mb-5 pb-3"
              style={{ borderBottom: '1px solid rgba(201,160,82,0.08)' }}
            >
              <p className="text-[8px] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,160,82,0.4)' }}>
                Tutti gli articoli — {cfg.label}
              </p>
              <span className="text-[9px]" style={{ color: 'rgba(201,160,82,0.35)' }}>
                {rest.length} articoli
              </span>
            </div>
            <div className="space-y-3">
              {rest.map((article, i) => (
                <CatArticleRow key={article.id} article={article} index={i} />
              ))}
            </div>
          </div>
        )}

        {catArticles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[13px]" style={{ color: 'rgba(201,160,82,0.4)' }}>
              Nessun articolo in questa categoria al momento.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
