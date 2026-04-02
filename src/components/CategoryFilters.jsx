import { motion } from 'framer-motion'
import { categories } from '../data/articles'

export default function CategoryFilters({ active, onChange }) {
  return (
    <div
      className="flex items-center gap-2 px-7 py-3 flex-wrap"
      style={{
        background: '#080808',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <span className="text-[8px] tracking-[0.2em] uppercase text-muted mr-1">Categoria:</span>
      {categories.map(({ name }) => {
        const isActive = active === name
        return (
          <motion.button
            key={name}
            onClick={() => onChange(name)}
            className="text-[9px] px-[14px] py-[5px] rounded-full transition-all duration-150"
            style={{
              border: isActive ? '1px solid rgba(255,255,255,0.3)' : '1px solid #1e1e1e',
              color: isActive ? '#999' : '#3a3a3a',
              background: isActive ? 'rgba(255,255,255,0.03)' : 'transparent',
            }}
            layout
            layoutId={isActive ? 'active-filter' : undefined}
          >
            {name}
          </motion.button>
        )
      })}
    </div>
  )
}
