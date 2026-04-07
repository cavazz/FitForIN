import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { latestArticles } from '../data/articles'
import BlogCard from './BlogCard'
import CategoryFilters from './CategoryFilters'

export default function BlogGrid() {
  const { cat } = useParams()
  const [activeCategory, setActiveCategory] = useState(cat || 'Tutti')

  const headerRef = useRef(null)
  const gridRef   = useRef(null)
  const headerIn  = useInView(headerRef, { once: true, margin: '-40px' })

  useEffect(() => {
    setActiveCategory(cat || 'Tutti')
  }, [cat])

  const filtered = activeCategory === 'Tutti'
    ? latestArticles
    : latestArticles.filter(a => a.category === activeCategory)

  return (
    <section id="blog" style={{ background: 'linear-gradient(180deg,#1A1714 0%,#161412 100%)' }}>
      <CategoryFilters active={activeCategory} onChange={setActiveCategory} />

      <div className="px-7 pt-7 pb-8">
        {/* header */}
        <motion.div
          ref={headerRef}
          className="flex justify-between items-end mb-7"
          initial={{ opacity: 0, y: 20 }}
          animate={headerIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <div>
            <div className="text-[9px] font-bold tracking-[0.2em] font-mono mb-1" style={{ color: 'rgba(201,160,82,0.25)' }}>
              — 02
            </div>
            <h2
              className="font-display font-extrabold leading-none"
              style={{ fontSize: 'clamp(28px,4vw,40px)', letterSpacing: '-0.04em', color: '#E8DCBA' }}
            >
              Ultimi articoli.
            </h2>
          </div>
          <Link
            to="/blog"
            className="text-[9px] tracking-[0.1em] uppercase self-end transition-colors"
            style={{ color: 'rgba(201,160,82,0.38)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A052'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(201,160,82,0.38)'}
          >
            Vedi tutti →
          </Link>
        </motion.div>

        <motion.div
          ref={gridRef}
          layout
          className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filtered.map((article, idx) => {
              const isWide = idx === 0 || idx === 4
              return (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.42, delay: idx * 0.04, ease: [0.23, 1, 0.32, 1] }}
                  className={isWide ? 'sm:col-span-2' : ''}
                >
                  <BlogCard article={article} index={idx} />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
