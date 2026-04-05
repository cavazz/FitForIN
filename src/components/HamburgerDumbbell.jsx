/**
 * HamburgerDumbbell
 *
 * Hamburger → 3 linee orizzontali (top / middle / bottom)
 * Dumbbell  → manubrio visto di fronte, fedele all'immagine:
 *
 *  ┌──┐ ┌─┐          ┌─┐ ┌──┐
 *  │  │ │ ├──────────┤ │ │  │
 *  │  │ │ │          │ │ │  │
 *  │  │ │ ├──────────┤ │ │  │
 *  └──┘ └─┘          └─┘ └──┘
 *  outerL innerL   bar   innerR outerR
 *
 * ViewBox 84 × 38 — molto piatta e larga come un vero manubrio
 *
 * Mapping:
 *   r1 (top)    → outer SX
 *   r2 (mid×3)  → inner SX
 *   r3 (mid×3)  → barra centrale
 *   r4 (mid×3)  → inner DX
 *   r5 (bottom) → outer DX
 */
import { motion } from 'framer-motion'

// ─── HAMBURGER ───────────────────────────────────────────────────
// [x, y, w, h, rx, fill]
const B = [
  [4,   1.5, 76, 6, 3,   '#C9A052'],  // top
  [4,   16,  76, 6, 3,   '#C9A052'],  // mid stack ×3
  [4,   16,  76, 6, 3,   '#C9A052'],
  [4,   16,  76, 6, 3,   '#C9A052'],
  [4,  30.5, 76, 6, 3,   '#C9A052'],  // bottom
]

// ─── DUMBBELL ────────────────────────────────────────────────────
//  outer plate:  w=14, h=38 (full height), rx=6
//  inner plate:  w=10, h=26 (centrato: y=6), rx=4
//  bar:          w=26, h=8  (centrato: y=15), rx=3
const D = [
  [0,    0,  14, 38, 6,   '#B89040'],  // outer SX — gold
  [16,   6,  10, 26, 4,   '#7A5E28'],  // inner SX — bronzo
  [27,  15,  30,  8, 3,   '#241C08'],  // bar      — quasi-nero profondità
  [57,   6,  10, 26, 4,   '#7A5E28'],  // inner DX
  [70,   0,  14, 38, 6,   '#B89040'],  // outer DX
]

//  apertura:  outer(0) → inner(0.10) → bar(0.20)
//  chiusura:  bar(0)   → inner(0.08) → outer(0.16)
const OD = [0,    0.10, 0.20, 0.10, 0   ]
const CD = [0.16, 0.08, 0,    0.08, 0.16]

const SPR = { type: 'spring', damping: 30, stiffness: 120, mass: 1.1 }

export default function HamburgerDumbbell({ isOpen, onClick }) {
  const T = isOpen ? D : B
  const delays = isOpen ? OD : CD

  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center cursor-pointer focus-visible:outline-none"
      style={{
        width:  76,
        height: 56,
        borderRadius: 13,
        border: `1px solid ${isOpen ? 'rgba(201,160,82,0.4)' : 'rgba(201,160,82,0.18)'}`,
        background: isOpen ? 'rgba(201,160,82,0.06)' : 'transparent',
        transition: 'background 0.4s, border-color 0.4s',
        flexShrink: 0,
      }}
      aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
      aria-expanded={isOpen}
    >
      <svg
        width={54}
        height={Math.round(54 * 38 / 84)}
        viewBox="0 0 84 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        {T.map(([x, y, width, height, rx, fill], i) => (
          <motion.rect
            key={i}
            initial={false}
            animate={{ x, y, width, height, rx, fill }}
            transition={{ ...SPR, delay: delays[i] }}
          />
        ))}
      </svg>
    </button>
  )
}
