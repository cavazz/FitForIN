import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { latestArticles } from '../data/articles'
import BlogCard from './BlogCard'
import CategoryFilters from './CategoryFilters'

export default function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState('Tutti')

  const filtered = activeCategory === 'Tutti'
    ? latestArticles
    : latestArticles.filter(a => a.category === activeCategory)

  return (
    <section style={{ background: 'linear-gradient(180deg,#111 0%,#0a0a0a 100%)' }}>
      <CategoryFilters active={activeCategory} onChange={setActiveCategory} />

      <div className="px-7 pt-7 pb-8">
        {/* header */}
        <div className="flex justify-between items-end mb-7">
          <div>
            <div className="text-[9px] font-bold text-[#1a1a1a] tracking-[0.2em] font-mono mb-1">— 02</div>
            <h2
              className="font-black leading-none"
              style={{
                fontSize: 'clamp(28px,4vw,40px)',
                letterSpacing: '-0.05em',
                background: 'linear-gradient(135deg,#fff 0%,#444 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Ultimi articoli.
            </h2>
          </div>
          <span className="text-[9px] tracking-[0.1em] uppercase text-muted self-end">
            Vedi tutti →
          </span>
        </div>

        {/* BROKEN GRID: 3 colonne, 1ª e 5ª card span 2 */}
        <motion.div
          layout
          className="grid gap-2"
          style={{ gridTemplateColumns: 'repeat(3,1fr)' }}
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
                  style={isWide ? { gridColumn: 'span 2' } : {}}
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
