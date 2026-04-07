import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { featuredArticles } from '../data/articles'
import { getArticleImage } from '../data/images'

export default function FeaturedArticles() {
  const sectionRef = useRef(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-60px' })

  const [main, ...rest] = featuredArticles

  return (
    <section ref={sectionRef} style={{ background: 'linear-gradient(135deg,#1A1714 0%,#1E1A14 100%)' }}>

      {/* header */}
      <motion.div
        className="flex justify-between items-center px-7 pt-5"
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        <span
          className="flex items-center gap-3 text-[8px] tracking-[0.4em] uppercase"
          style={{ color: 'rgba(201,160,82,0.4)' }}
        >
          <span className="font-bold" style={{ color: 'rgba(201,160,82,0.25)' }}>01</span>
          In evidenza
        </span>
        <Link
          to="/blog"
          className="text-[9px] tracking-[0.1em] uppercase transition-colors"
          style={{ color: 'rgba(201,160,82,0.38)' }}
          onMouseEnter={e => e.currentTarget.style.color = '#C9A052'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(201,160,82,0.38)'}
        >
          Vedi tutti →
        </Link>
      </motion.div>

      {/* grid asimmetrica */}
      <div className="mt-5 featured-grid">

        {/* articolo grande */}
        <motion.div
          className="featured-grid-main"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.62, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
        >
          <Link
            to={`/articolo/${main.slug}`}
            className="block relative overflow-hidden group"
            style={{ background: '#161412', height: '100%' }}
          >
            <div className="relative h-[200px] overflow-hidden">
              <img
                src={getArticleImage(main.slug, main.category)}
                alt={main.title}
                className="img-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom, rgba(22,20,18,0.2) 0%, rgba(22,20,18,0.85) 100%)' }}
              />
              <span
                className="absolute bottom-3 left-5 text-[7px] tracking-[0.25em] uppercase px-2 py-1 rounded"
                style={{ background: 'rgba(201,160,82,0.15)', color: '#C9A052', backdropFilter: 'blur(4px)' }}
              >
                {main.category}
              </span>
            </div>

            <div className="p-5">
              <div
                aria-hidden="true"
                className="text-[60px] font-black leading-none mb-[-12px]"
                style={{
                  background: 'linear-gradient(180deg,rgba(201,160,82,0.07) 0%,transparent 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-4px',
                }}
              >
                01
              </div>
              <h2
                className="font-display text-[15px] font-extrabold leading-[1.2] mb-3 mt-2"
                style={{ color: '#E8DCBA', letterSpacing: '-0.03em' }}
              >
                {main.title}
              </h2>
              <p className="text-[10px] leading-[1.6] mb-4" style={{ color: '#907050' }}>
                {main.excerpt}
              </p>
              <span
                className="text-[8px] font-bold tracking-[0.2em] uppercase pb-0.5 transition-colors group-hover:text-gold-l"
                style={{ color: '#C9A052', borderBottom: '1px solid rgba(201,160,82,0.3)' }}
              >
                Leggi l&apos;articolo
              </span>
            </div>

            <span
              className="absolute bottom-5 right-5 text-[22px] opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: '#C9A052' }}
            >↗</span>
          </Link>
        </motion.div>

        {/* articoli secondari — stagger */}
        {rest.map((article, idx) => (
          <motion.div
            key={article.id}
            style={{ minHeight: 0 }}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.14 + idx * 0.07, ease: [0.23, 1, 0.32, 1] }}
          >
            <Link
              to={`/articolo/${article.slug}`}
              className="flex flex-col group relative overflow-hidden"
              style={{ background: '#141210', height: '100%' }}
            >
              <div className="relative h-[110px] overflow-hidden">
                <img
                  src={getArticleImage(article.slug, article.category)}
                  alt={article.title}
                  className="img-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, rgba(20,18,16,0.15), rgba(20,18,16,0.75))' }}
                />
              </div>

              <div className="flex flex-col justify-between flex-1 p-4">
                <div>
                  <div
                    className="text-[11px] font-black tracking-[0.1em] mb-2 font-mono"
                    style={{ color: 'rgba(201,160,82,0.2)' }}
                  >
                    — 0{idx + 2}
                  </div>
                  <div className="text-[8px] tracking-[0.2em] uppercase mb-1.5 font-semibold" style={{ color: 'rgba(201,160,82,0.48)' }}>
                    {article.category}
                  </div>
                  <h3
                    className="font-display text-[12px] font-bold leading-[1.3] transition-colors group-hover:text-[#E8DCBA]"
                    style={{ color: '#B89060' }}
                  >
                    {article.title}
                  </h3>
                </div>
                <div className="text-[9px] tracking-[0.1em] uppercase mt-3" style={{ color: 'rgba(201,160,82,0.28)' }}>
                  {article.readTime} min lettura
                </div>
              </div>

              <span
                className="absolute top-4 right-4 text-[14px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: '#C9A052' }}
              >↗</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
