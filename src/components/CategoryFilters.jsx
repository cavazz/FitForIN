import { motion } from 'framer-motion'
import { categories } from '../data/articles'

export default function CategoryFilters({ active, onChange }) {
  return (
    <div
      role="group"
      aria-label="Filtra per categoria"
      className="flex items-center gap-2 px-7 py-3 flex-wrap"
      style={{
        background: '#161412',
        borderBottom: '1px solid rgba(201,160,82,0.07)',
      }}
    >
      <span
        className="text-[8px] tracking-[0.2em] uppercase mr-1"
        style={{ color: 'rgba(201,160,82,0.32)' }}
        aria-hidden="true"
      >
        Categoria:
      </span>
      {categories.map(({ name }) => {
        const isActive = active === name
        return (
          <motion.button
            key={name}
            onClick={() => onChange(name)}
            aria-pressed={isActive}
            className="text-[9px] px-[14px] py-[5px] rounded-full cursor-pointer"
            style={{
              border: isActive ? '1px solid rgba(201,160,82,0.45)' : '1px solid rgba(201,160,82,0.15)',
              color: isActive ? '#C9A052' : 'rgba(201,160,82,0.5)',
              background: isActive ? 'rgba(201,160,82,0.08)' : 'transparent',
              transition: 'border-color 160ms ease, color 160ms ease, background 160ms ease',
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
