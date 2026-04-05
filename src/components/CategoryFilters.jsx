import { motion } from 'framer-motion'
import { categories } from '../data/articles'

export default function CategoryFilters({ active, onChange }) {
  return (
    <div
      className="flex items-center gap-2 px-7 py-3 flex-wrap"
      style={{
        background: '#161412',
        borderBottom: '1px solid rgba(201,160,82,0.07)',
      }}
    >
      <span className="text-[8px] tracking-[0.2em] uppercase mr-1" style={{ color: '#2A1E0C' }}>
        Categoria:
      </span>
      {categories.map(({ name }) => {
        const isActive = active === name
        return (
          <motion.button
            key={name}
            onClick={() => onChange(name)}
            className="text-[9px] px-[14px] py-[5px] rounded-full transition-all duration-150 cursor-pointer"
            style={{
              border: isActive ? '1px solid rgba(201,160,82,0.45)' : '1px solid rgba(201,160,82,0.1)',
              color: isActive ? '#C9A052' : '#3A2C18',
              background: isActive ? 'rgba(201,160,82,0.08)' : 'transparent',
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
