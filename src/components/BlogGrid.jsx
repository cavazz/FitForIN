import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { latestArticles } from '../data/articles'
import BlogCard from './BlogCard'
import CategoryFilters from './CategoryFilters'

export default function BlogGrid() {
  const { cat } = useParams()
  const [activeCategory, setActiveCategory] = useState(cat || 'Tutti')

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
        <div className="flex justify-between items-end mb-7">
          <div>
            <div className="text-[9px] font-bold tracking-[0.2em] font-mono mb-1" style={{ color: 'rgba(201,160,82,0.25)' }}>
              — 02
            </div>
            <h2
              className="font-black leading-none"
              style={{
                fontSize: 'clamp(28px,4vw,40px)',
                letterSpacing: '-0.05em',
                background: 'linear-gradient(135deg,#E8DCBA 0%,#7A5E28 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Ultimi articoli.
            </h2>
          </div>
          <Link
            to="/"
            className="text-[9px] tracking-[0.1em] uppercase self-end transition-colors"
            style={{ color: 'rgba(201,160,82,0.38)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A052'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(201,160,82,0.38)'}
          >
            Vedi tutti →
          </Link>
        </div>

        <motion.div
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
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
