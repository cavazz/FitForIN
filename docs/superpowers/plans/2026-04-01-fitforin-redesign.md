# FitforIN Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ricostruire fitforin.it come blog sport-science premium con React + Vite, design grayscale multi-layer, layout broken-grid ispirato a Marcelo Design X / Lando Norris / Charles Leclerc.

**Architecture:** SPA React con React Router v6. Homepage con sezioni stacked (Hero → Ticker → Featured → Blog Grid → CTA → Footer). Pagina articolo separata. Mock data JSON locale, struttura pronta per CMS headless futuro. Animazioni scroll via GSAP ScrollTrigger, transizioni componenti via Framer Motion.

**Tech Stack:** React 18, Vite, Tailwind CSS v3, Framer Motion, GSAP + ScrollTrigger, React Router v6, Vitest + @testing-library/react

---

## File Map

```
fitforin/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx                        # entry point
│   ├── App.jsx                         # router + layout wrapper
│   ├── index.css                       # tailwind directives + CSS custom props + noise
│   ├── data/
│   │   └── articles.js                 # mock articles array
│   ├── hooks/
│   │   └── useGsapReveal.js            # GSAP ScrollTrigger reveal hook
│   ├── components/
│   │   ├── Navbar.jsx                  # sticky nav con blur
│   │   ├── Hero.jsx                    # titolo oversize + GSAP stagger
│   │   ├── Ticker.jsx                  # striscia categorie animata CSS
│   │   ├── FeaturedArticles.jsx        # grid asimmetrica 1 grande + 2 piccoli
│   │   ├── CategoryFilters.jsx         # pill filtro categoria
│   │   ├── BlogGrid.jsx                # broken grid + Framer Motion stagger
│   │   ├── BlogCard.jsx                # singola card articolo
│   │   ├── CtaSection.jsx              # sezione full-bleed tipografia grande
│   │   └── Footer.jsx                  # 3 colonne + bottom bar + ping dot
│   └── pages/
│       ├── Home.jsx                    # assembly di tutte le sezioni
│       └── ArticlePage.jsx             # layout lettura articolo
├── tests/
│   ├── components/
│   │   ├── Navbar.test.jsx
│   │   ├── Hero.test.jsx
│   │   ├── Ticker.test.jsx
│   │   ├── FeaturedArticles.test.jsx
│   │   ├── BlogGrid.test.jsx
│   │   ├── BlogCard.test.jsx
│   │   ├── CtaSection.test.jsx
│   │   └── Footer.test.jsx
│   └── pages/
│       └── Home.test.jsx
```

---

## Task 1: Project Bootstrap

**Files:**
- Create: `fitforin/` (directory radice — eseguire da `D:/Alberto/Programmi/`)
- Create: `vite.config.js`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`

- [ ] **Step 1: Scaffold Vite + React**

```bash
cd D:/Alberto/Programmi
npm create vite@latest fitforin -- --template react
cd fitforin
npm install
```

- [ ] **Step 2: Installa dipendenze**

```bash
npm install framer-motion gsap react-router-dom
npm install -D tailwindcss postcss autoprefixer vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
npx tailwindcss init -p
```

- [ ] **Step 3: Configura Vite per Vitest**

Sostituisci `vite.config.js` con:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
})
```

- [ ] **Step 4: Crea test setup**

Crea `tests/setup.js`:

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Configura Tailwind**

Sostituisci `tailwind.config.js` con:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg':       '#080808',
        'nav':      '#000000',
        's1':       '#111111',
        's2':       '#0c0c0c',
        'card':     '#161616',
        'elevated': '#1c1c1c',
        'dim':      '#888888',
        'muted':    '#3a3a3a',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-0.05em',
        'display':  '-0.04em',
        'wide4':    '0.25em',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 6: Configura CSS globale**

Sostituisci `src/index.css` con:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');

:root {
  --noise: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E");
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html { overflow-x: hidden; }

body {
  background: #080808;
  color: #fff;
  font-family: 'Inter', -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* noise overlay utility */
.noise::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: var(--noise);
  z-index: 1;
}

/* gradient text utility */
.grad-text {
  background: linear-gradient(135deg, #ffffff 0%, #aaaaaa 60%, #333333 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.grad-text-mid {
  background: linear-gradient(135deg, #aaaaaa 0%, #555555 60%, #222222 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* outline text utility */
.text-outline {
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);
  color: transparent;
}

/* ticker animation */
@keyframes ticker {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ping animation footer */
@keyframes ping {
  0%   { transform: scale(1); opacity: 0.3; }
  70%  { transform: scale(2.2); opacity: 0; }
  100% { transform: scale(2.2); opacity: 0; }
}
```

- [ ] **Step 7: Verifica setup**

```bash
npm run dev
```

Atteso: server su `http://localhost:5173`, pagina React default visibile.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: bootstrap Vite + React + Tailwind + GSAP + Framer Motion"
```

---

## Task 2: Mock Data

**Files:**
- Create: `src/data/articles.js`

- [ ] **Step 1: Crea struttura dati articoli**

Crea `src/data/articles.js`:

```js
export const articles = [
  {
    id: 1,
    slug: 'cervello-playmaker',
    title: 'Il cervello del playmaker',
    excerpt: 'Esplora il decision making e il carico cognitivo negli atleti d\'élite nel basket.',
    category: 'Basket Lab',
    readTime: 8,
    featured: true,
    emoji: '🧠',
    date: '2025-03-10',
  },
  {
    id: 2,
    slug: 'quiet-eye-basket',
    title: 'Il Quiet Eye nel basket',
    excerpt: 'Cosa fanno gli occhi dei grandi tiratori: la scienza dietro la visione periferica.',
    category: 'Basket Lab',
    readTime: 6,
    featured: true,
    emoji: '👁️',
    date: '2025-03-05',
  },
  {
    id: 3,
    slug: 'allenare-gesto-atleta',
    title: 'Allenare il gesto o l\'atleta?',
    excerpt: 'Vincoli, variabilità e apprendimento motorio: un cambio di paradigma.',
    category: 'Training',
    readTime: 7,
    featured: true,
    emoji: '🏃',
    date: '2025-02-28',
  },
  {
    id: 4,
    slug: 'post-activation-potentiation',
    title: 'Post-Activation Potentiation',
    excerpt: 'Come sfruttare il PAP per migliorare la performance esplosiva.',
    category: 'Training',
    readTime: 6,
    featured: false,
    emoji: '💪',
    date: '2025-02-20',
  },
  {
    id: 5,
    slug: 'epigenetica-sport',
    title: 'Epigenetica e sport',
    excerpt: 'Come l\'allenamento modifica l\'espressione genica nel lungo periodo.',
    category: 'Scienza',
    readTime: 10,
    featured: false,
    emoji: '🧬',
    date: '2025-02-15',
  },
  {
    id: 6,
    slug: 'decelerazione-basket',
    title: 'Decelerazione nel basket',
    excerpt: 'Biomeccanica e strategie di allenamento per la decelerazione sicura.',
    category: 'Basket Lab',
    readTime: 5,
    featured: false,
    emoji: '🏀',
    date: '2025-02-10',
  },
  {
    id: 7,
    slug: 'acsm-linee-guida-forza',
    title: 'ACSM: nuove linee guida forza',
    excerpt: 'L\'ACSM aggiorna le raccomandazioni sull\'allenamento della forza nel 2025.',
    category: 'Training',
    readTime: 8,
    featured: false,
    emoji: '🏋️',
    date: '2025-02-05',
  },
  {
    id: 8,
    slug: 'repeated-sprint-ability',
    title: 'Repeated Sprint Ability nel basket',
    excerpt: 'Come allenare la capacità di sprint ripetuti ad alta intensità.',
    category: 'Basket Lab',
    readTime: 7,
    featured: false,
    emoji: '⚡',
    date: '2025-01-30',
  },
  {
    id: 9,
    slug: 'warm-up-durata-ottimale',
    title: 'Warm-up: durata ottimale',
    excerpt: 'Quanto deve durare il riscaldamento? La ricerca risponde.',
    category: 'Training',
    readTime: 4,
    featured: false,
    emoji: '⏱',
    date: '2025-01-25',
  },
]

export const categories = [
  { name: 'Tutti', count: null },
  { name: 'Training', count: 24 },
  { name: 'Alimentazione', count: 16 },
  { name: 'Basket Lab', count: 18 },
  { name: 'Medicina sportiva', count: 12 },
  { name: 'Scienza dell\'esercizio', count: 10 },
]

export const featuredArticles = articles.filter(a => a.featured).slice(0, 3)
export const latestArticles = articles.filter(a => !a.featured)
```

- [ ] **Step 2: Commit**

```bash
git add src/data/articles.js
git commit -m "feat: add mock articles data"
```

---

## Task 3: Hook GSAP Reveal

**Files:**
- Create: `src/hooks/useGsapReveal.js`
- Create: `tests/hooks/useGsapReveal.test.js` (skippato in jsdom — GSAP non anima)

- [ ] **Step 1: Crea hook**

Crea `src/hooks/useGsapReveal.js`:

```js
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Anima gli elementi figli con stagger dal basso.
 * @param {string} selector  - selettore CSS dei figli da animare
 * @param {object} options   - opzioni GSAP opzionali
 */
export function useGsapReveal(selector = '[data-reveal]', options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: options.stagger ?? 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
          ...options,
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [selector, options])

  return containerRef
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useGsapReveal.js
git commit -m "feat: add useGsapReveal hook for scroll animations"
```

---

## Task 4: Navbar

**Files:**
- Create: `src/components/Navbar.jsx`
- Create: `tests/components/Navbar.test.jsx`

- [ ] **Step 1: Scrivi il test**

Crea `tests/components/Navbar.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from '../../src/components/Navbar'

const wrap = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

test('renders logo text', () => {
  wrap(<Navbar />)
  expect(screen.getByText('FitforIN')).toBeInTheDocument()
})

test('renders nav links', () => {
  wrap(<Navbar />)
  expect(screen.getByText('Blog')).toBeInTheDocument()
  expect(screen.getByText('Training')).toBeInTheDocument()
  expect(screen.getByText('Basket Lab')).toBeInTheDocument()
})
```

- [ ] **Step 2: Esegui test — deve fallire**

```bash
npx vitest run tests/components/Navbar.test.jsx
```

Atteso: FAIL — `Cannot find module '../../src/components/Navbar'`

- [ ] **Step 3: Crea componente**

Crea `src/components/Navbar.jsx`:

```jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const links = [
  { label: 'Blog',              to: '/' },
  { label: 'Training',          to: '/categoria/Training' },
  { label: 'Alimentazione',     to: '/categoria/Alimentazione' },
  { label: 'Basket Lab',        to: '/categoria/Basket Lab' },
  { label: 'Medicina',          to: '/categoria/Medicina sportiva' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-7 py-5 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.85)' : '#000000',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      {/* Left: logo + tagline */}
      <div className="flex items-center gap-8">
        <Link to="/" className="grad-text text-[13px] font-black tracking-[0.3em] uppercase">
          FitforIN
        </Link>
        <span className="hidden md:block text-[8px] tracking-[0.2em] uppercase text-muted border-l border-muted pl-4">
          La Scienza applicata allo Sport
        </span>
      </div>

      {/* Right: links */}
      <div className="hidden md:flex items-center gap-6">
        {links.map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            className="text-[9px] tracking-[0.1em] uppercase text-muted hover:text-dim transition-colors duration-150"
          >
            {label}
          </Link>
        ))}
      </div>
    </motion.nav>
  )
}
```

- [ ] **Step 4: Esegui test — deve passare**

```bash
npx vitest run tests/components/Navbar.test.jsx
```

Atteso: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.jsx tests/components/Navbar.test.jsx
git commit -m "feat: add Navbar component"
```

---

## Task 5: Hero

**Files:**
- Create: `src/components/Hero.jsx`
- Create: `tests/components/Hero.test.jsx`

- [ ] **Step 1: Scrivi il test**

Crea `tests/components/Hero.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import Hero from '../../src/components/Hero'

test('renders hero headline words', () => {
  render(<Hero />)
  expect(screen.getByText('SPORT')).toBeInTheDocument()
  expect(screen.getByText('SCIENCE')).toBeInTheDocument()
})

test('renders CTA button', () => {
  render(<Hero />)
  expect(screen.getByText(/Leggi gli articoli/i)).toBeInTheDocument()
})

test('renders article count stat', () => {
  render(<Hero />)
  expect(screen.getByText('80+')).toBeInTheDocument()
})
```

- [ ] **Step 2: Esegui test — deve fallire**

```bash
npx vitest run tests/components/Hero.test.jsx
```

Atteso: FAIL

- [ ] **Step 3: Crea componente**

Crea `src/components/Hero.jsx`:

```jsx
import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const titleRef = useRef(null)

  useEffect(() => {
    const lines = titleRef.current?.querySelectorAll('[data-line]')
    if (!lines) return
    gsap.fromTo(
      lines,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.2 }
    )
  }, [])

  return (
    <section
      className="relative overflow-hidden pt-40 pb-0 noise"
      style={{ background: 'linear-gradient(175deg, #000 0%, #111 55%, #1c1c1c 100%)' }}
    >
      {/* numero decorativo sfondo */}
      <span
        aria-hidden="true"
        className="absolute top-[-20px] right-4 text-[200px] font-black leading-none pointer-events-none select-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-12px',
        }}
      >
        01
      </span>

      <div className="relative z-10 px-7">
        {/* eyebrow */}
        <div className="flex items-center gap-3 mb-7">
          <span className="block w-5 h-px bg-muted" />
          <span className="text-[8px] tracking-[0.4em] uppercase text-muted">
            La Scienza applicata allo Sport
          </span>
        </div>

        {/* TITOLO GIGANTE — sborda intenzionalmente */}
        <div ref={titleRef} className="mb-7 overflow-visible">
          <span
            data-line
            className="block text-[clamp(72px,14vw,140px)] font-black uppercase leading-[0.88] tracking-[-0.05em] grad-text"
          >
            SPORT
          </span>
          <span
            data-line
            className="block text-[clamp(72px,14vw,140px)] font-black uppercase leading-[0.88] tracking-[-0.05em] grad-text-mid"
            style={{ marginLeft: '3.5rem' }}
          >
            SCIENCE
          </span>
          <span
            data-line
            className="block text-[clamp(72px,14vw,140px)] font-black uppercase leading-[0.88] tracking-[-0.05em] text-outline"
            style={{ marginLeft: '1.25rem' }}
          >
            BLOG.
          </span>
        </div>

        {/* sub-row */}
        <div className="flex justify-between items-end pb-9 border-b border-white/5">
          <p className="text-[11px] text-[#3a3a3a] leading-[1.7] max-w-[280px] border-l border-muted pl-4">
            Articoli tecnici su allenamento, nutrizione e performance sportiva.
            Per chi prende lo sport sul serio.
          </p>
          <div className="flex flex-col items-end gap-4">
            <button className="text-[9px] font-black tracking-[0.2em] uppercase px-6 py-3 rounded-sm"
              style={{ background: 'linear-gradient(135deg,#fff,#ccc)', color: '#000' }}>
              Leggi gli articoli →
            </button>
            <div className="flex gap-5">
              {[['80+', 'Articoli'], ['6', 'Categorie']].map(([num, label]) => (
                <div key={label} className="text-right">
                  <div className="text-lg font-black text-muted leading-tight">{num}</div>
                  <div className="text-[7px] tracking-[0.2em] uppercase text-[#222]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-6 right-7 flex items-center gap-2 z-10">
        <span className="block w-6 h-px bg-muted" />
        <span className="text-[8px] tracking-[0.3em] uppercase text-muted">Scroll</span>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Esegui test — deve passare**

```bash
npx vitest run tests/components/Hero.test.jsx
```

Atteso: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.jsx tests/components/Hero.test.jsx
git commit -m "feat: add Hero component with GSAP stagger animation"
```

---

## Task 6: Ticker

**Files:**
- Create: `src/components/Ticker.jsx`
- Create: `tests/components/Ticker.test.jsx`

- [ ] **Step 1: Scrivi il test**

Crea `tests/components/Ticker.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import Ticker from '../../src/components/Ticker'

test('renders category items', () => {
  render(<Ticker />)
  const items = screen.getAllByText('Training')
  expect(items.length).toBeGreaterThan(0)
})
```

- [ ] **Step 2: Esegui test — deve fallire**

```bash
npx vitest run tests/components/Ticker.test.jsx
```

Atteso: FAIL

- [ ] **Step 3: Crea componente**

Crea `src/components/Ticker.jsx`:

```jsx
const ITEMS = [
  'Training', 'Alimentazione', 'Basket Lab',
  'Medicina Sportiva', "Scienza dell'Esercizio", 'Stretching', 'Preparazione Fisica',
]

export default function Ticker() {
  // duplica per loop seamless
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div
      className="overflow-hidden py-[10px]"
      style={{
        background: '#111',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'ticker 18s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-7 text-[9px] tracking-[0.3em] uppercase text-muted flex-shrink-0"
            style={{ borderRight: '1px solid #1a1a1a' }}
          >
            <span className="text-[5px] text-[#1e1e1e]">◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Esegui test — deve passare**

```bash
npx vitest run tests/components/Ticker.test.jsx
```

Atteso: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Ticker.jsx tests/components/Ticker.test.jsx
git commit -m "feat: add Ticker animated categories strip"
```

---

## Task 7: FeaturedArticles

**Files:**
- Create: `src/components/FeaturedArticles.jsx`
- Create: `tests/components/FeaturedArticles.test.jsx`

- [ ] **Step 1: Scrivi il test**

Crea `tests/components/FeaturedArticles.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import FeaturedArticles from '../../src/components/FeaturedArticles'
import { featuredArticles } from '../../src/data/articles'

const wrap = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

test('renders first featured article title', () => {
  wrap(<FeaturedArticles />)
  expect(screen.getByText(featuredArticles[0].title)).toBeInTheDocument()
})

test('renders section label', () => {
  wrap(<FeaturedArticles />)
  expect(screen.getByText(/in evidenza/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Esegui test — deve fallire**

```bash
npx vitest run tests/components/FeaturedArticles.test.jsx
```

Atteso: FAIL

- [ ] **Step 3: Crea componente**

Crea `src/components/FeaturedArticles.jsx`:

```jsx
import { Link } from 'react-router-dom'
import { featuredArticles } from '../data/articles'

export default function FeaturedArticles() {
  const [main, ...rest] = featuredArticles

  return (
    <section style={{ background: 'linear-gradient(135deg,#0e0e0e 0%,#1a1a1a 100%)' }}>
      {/* header */}
      <div className="flex justify-between items-center px-7 pt-5">
        <span className="flex items-center gap-3 text-[8px] tracking-[0.4em] uppercase text-muted">
          <span className="text-[#1a1a1a] font-bold">01</span>
          In evidenza
        </span>
        <Link to="/" className="text-[9px] tracking-[0.1em] uppercase text-muted hover:text-dim transition-colors">
          Vedi tutti →
        </Link>
      </div>

      {/* grid asimmetrica */}
      <div
        className="mt-5"
        style={{
          display: 'grid',
          gridTemplateColumns: '5fr 3fr',
          gridTemplateRows: 'auto auto',
          gap: '1px',
          background: 'rgba(255,255,255,0.04)',
        }}
      >
        {/* articolo grande — span 2 righe */}
        <Link
          to={`/articolo/${main.slug}`}
          className="block p-7 relative overflow-hidden transition-colors"
          style={{ background: '#0c0c0c', gridRow: 'span 2' }}
        >
          {/* numero sfondo */}
          <div
            aria-hidden="true"
            className="text-[100px] font-black leading-none mb-[-20px]"
            style={{
              background: 'linear-gradient(180deg,rgba(255,255,255,0.06) 0%,transparent 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-6px',
            }}
          >
            01
          </div>

          {/* immagine placeholder */}
          <div
            className="h-[120px] rounded-lg mb-4 flex items-center justify-center text-3xl"
            style={{
              background: 'linear-gradient(135deg,#141414,#1c1c1c)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {main.emoji}
          </div>

          <div className="text-[7px] tracking-[0.3em] uppercase text-muted mb-2">
            {main.category}
          </div>
          <h2
            className="text-[15px] font-extrabold leading-[1.2] mb-3"
            style={{
              background: 'linear-gradient(135deg,#fff 30%,#888 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.03em',
            }}
          >
            {main.title}
          </h2>
          <p className="text-[10px] text-[#333] leading-[1.6] mb-4">{main.excerpt}</p>
          <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-dim border-b border-muted pb-0.5">
            Leggi l'articolo
          </span>
          <span className="absolute bottom-7 right-7 text-[22px] text-[#1a1a1a]">↗</span>
        </Link>

        {/* articoli secondari */}
        {rest.map((article, idx) => (
          <Link
            key={article.id}
            to={`/articolo/${article.slug}`}
            className="flex flex-col justify-between p-5 relative transition-colors"
            style={{ background: '#0a0a0a' }}
            onMouseEnter={e => e.currentTarget.style.background = '#0e0e0e'}
            onMouseLeave={e => e.currentTarget.style.background = '#0a0a0a'}
          >
            <span className="absolute top-5 right-5 text-[14px] text-[#1e1e1e]">↗</span>
            <div>
              <div className="text-[11px] font-black text-[#1e1e1e] tracking-[0.1em] mb-3 font-mono">
                — 0{idx + 2}
              </div>
              <div className="text-[7px] tracking-[0.2em] uppercase text-muted mb-1.5">
                {article.category}
              </div>
              <h3 className="text-[13px] font-bold text-[#666] leading-[1.3]">
                {article.title}
              </h3>
            </div>
            <div className="text-[8px] tracking-[0.1em] uppercase text-[#222]">
              {article.readTime} min lettura
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Esegui test — deve passare**

```bash
npx vitest run tests/components/FeaturedArticles.test.jsx
```

Atteso: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/FeaturedArticles.jsx tests/components/FeaturedArticles.test.jsx
git commit -m "feat: add FeaturedArticles asymmetric grid"
```

---

## Task 8: BlogCard + BlogGrid

**Files:**
- Create: `src/components/BlogCard.jsx`
- Create: `src/components/CategoryFilters.jsx`
- Create: `src/components/BlogGrid.jsx`
- Create: `tests/components/BlogCard.test.jsx`
- Create: `tests/components/BlogGrid.test.jsx`

- [ ] **Step 1: Scrivi i test**

Crea `tests/components/BlogCard.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import BlogCard from '../../src/components/BlogCard'

const article = {
  id: 4, slug: 'test-slug', title: 'Test Article',
  category: 'Training', readTime: 5, emoji: '💪', excerpt: 'Test excerpt',
}

test('renders article title', () => {
  render(<BrowserRouter><BlogCard article={article} index={0} /></BrowserRouter>)
  expect(screen.getByText('Test Article')).toBeInTheDocument()
})

test('renders category', () => {
  render(<BrowserRouter><BlogCard article={article} index={0} /></BrowserRouter>)
  expect(screen.getByText('Training')).toBeInTheDocument()
})
```

Crea `tests/components/BlogGrid.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import BlogGrid from '../../src/components/BlogGrid'

test('renders blog grid section', () => {
  render(<BrowserRouter><BlogGrid /></BrowserRouter>)
  expect(screen.getByText(/ultimi articoli/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Esegui test — devono fallire**

```bash
npx vitest run tests/components/BlogCard.test.jsx tests/components/BlogGrid.test.jsx
```

Atteso: FAIL

- [ ] **Step 3: Crea BlogCard**

Crea `src/components/BlogCard.jsx`:

```jsx
import { Link } from 'react-router-dom'

export default function BlogCard({ article, index }) {
  const num = String(index + 4).padStart(2, '0')

  return (
    <Link
      to={`/articolo/${article.slug}`}
      className="block relative rounded-[10px] p-[14px] overflow-hidden transition-all duration-150 group"
      style={{
        background: 'linear-gradient(135deg,#161616,#111)',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* bordo superiore gradient */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)' }}
      />

      <div
        aria-hidden="true"
        className="text-[30px] font-black leading-none mb-2"
        style={{
          background: 'linear-gradient(180deg,rgba(255,255,255,0.06) 0%,transparent 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-2px',
        }}
      >
        {num}
      </div>

      <div className="text-[7px] tracking-[0.2em] uppercase text-muted mb-1.5">
        {article.emoji} {article.category}
      </div>
      <h3 className="text-[11px] font-semibold text-[#777] leading-[1.4] mb-2">
        {article.title}
      </h3>
      <div className="text-[8px] text-[#2a2a2a]">{article.readTime} min lettura</div>

      <span className="absolute bottom-4 right-4 text-[13px] text-[#1e1e1e] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
    </Link>
  )
}
```

- [ ] **Step 4: Crea CategoryFilters**

Crea `src/components/CategoryFilters.jsx`:

```jsx
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
```

- [ ] **Step 5: Crea BlogGrid**

Crea `src/components/BlogGrid.jsx`:

```jsx
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
```

- [ ] **Step 6: Esegui test — devono passare**

```bash
npx vitest run tests/components/BlogCard.test.jsx tests/components/BlogGrid.test.jsx
```

Atteso: PASS

- [ ] **Step 7: Commit**

```bash
git add src/components/BlogCard.jsx src/components/CategoryFilters.jsx src/components/BlogGrid.jsx tests/components/BlogCard.test.jsx tests/components/BlogGrid.test.jsx
git commit -m "feat: add BlogCard, CategoryFilters, BlogGrid broken layout"
```

---

## Task 9: CtaSection

**Files:**
- Create: `src/components/CtaSection.jsx`
- Create: `tests/components/CtaSection.test.jsx`

- [ ] **Step 1: Scrivi il test**

Crea `tests/components/CtaSection.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import CtaSection from '../../src/components/CtaSection'

test('renders cta headline', () => {
  render(<CtaSection />)
  expect(screen.getByText('Allenati')).toBeInTheDocument()
})

test('renders cta button', () => {
  render(<CtaSection />)
  expect(screen.getByText(/Leggi gli articoli/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Esegui test — deve fallire**

```bash
npx vitest run tests/components/CtaSection.test.jsx
```

Atteso: FAIL

- [ ] **Step 3: Crea componente**

Crea `src/components/CtaSection.jsx`:

```jsx
import { useRef } from 'react'
import { useGsapReveal } from '../hooks/useGsapReveal'

export default function CtaSection() {
  const containerRef = useGsapReveal('[data-cta-line]', { stagger: 0.15 })

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden px-7 pt-14 pb-12 noise"
      style={{
        background: 'linear-gradient(175deg,#0c0c0c 0%,#111 50%,#161616 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* freccia decorativa sfondo */}
      <span
        aria-hidden="true"
        className="absolute bottom-[-30px] right-[-10px] text-[220px] font-black leading-none pointer-events-none select-none"
        style={{
          background: 'linear-gradient(180deg,rgba(255,255,255,0.03) 0%,transparent 80%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        →
      </span>

      {/* eyebrow */}
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <span className="block w-5 h-px bg-[#2a2a2a]" />
        <span className="text-[8px] tracking-[0.4em] uppercase text-[#2a2a2a]">FitforIN · Blog</span>
      </div>

      {/* titolo su 3 righe */}
      <div
        className="relative z-10 mb-9"
        style={{ fontSize: 'clamp(44px,8vw,82px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.88, textTransform: 'uppercase' }}
      >
        <span data-cta-line className="block grad-text">Allenati</span>
        <span data-cta-line className="block grad-text">con</span>
        <span data-cta-line className="block text-outline">metodo.</span>
      </div>

      {/* row inferiore */}
      <div className="relative z-10 flex justify-between items-end">
        <p className="text-[11px] text-[#333] leading-[1.7] max-w-[220px] border-l border-[#1e1e1e] pl-4">
          Articoli scientifici su training, nutrizione e performance. Gratis, sempre.
        </p>
        <div className="flex flex-col items-end gap-3">
          <button
            className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase px-[30px] py-[13px] rounded-sm"
            style={{ background: 'linear-gradient(135deg,#fff,#ccc)', color: '#000' }}
          >
            Leggi gli articoli <span>↗</span>
          </button>
          <span className="text-[8px] tracking-[0.1em] uppercase text-[#1e1e1e]">
            80+ articoli disponibili
          </span>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Esegui test — deve passare**

```bash
npx vitest run tests/components/CtaSection.test.jsx
```

Atteso: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/CtaSection.jsx tests/components/CtaSection.test.jsx
git commit -m "feat: add CtaSection full-bleed typography"
```

---

## Task 10: Footer

**Files:**
- Create: `src/components/Footer.jsx`
- Create: `tests/components/Footer.test.jsx`

- [ ] **Step 1: Scrivi il test**

Crea `tests/components/Footer.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Footer from '../../src/components/Footer'

const wrap = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

test('renders brand name', () => {
  wrap(<Footer />)
  expect(screen.getByText('FitforIN')).toBeInTheDocument()
})

test('renders navigation links', () => {
  wrap(<Footer />)
  expect(screen.getByText('Training')).toBeInTheDocument()
  expect(screen.getByText('Basket Lab')).toBeInTheDocument()
})

test('renders copyright', () => {
  wrap(<Footer />)
  expect(screen.getByText(/FitforIN/)).toBeInTheDocument()
})
```

- [ ] **Step 2: Esegui test — deve fallire**

```bash
npx vitest run tests/components/Footer.test.jsx
```

Atteso: FAIL

- [ ] **Step 3: Crea componente**

Crea `src/components/Footer.jsx`:

```jsx
import { Link } from 'react-router-dom'
import { categories } from '../data/articles'

const navLinks = [
  ['Training',           '/categoria/Training'],
  ['Alimentazione',      '/categoria/Alimentazione'],
  ['Basket Lab',         '/categoria/Basket Lab'],
  ['Medicina sportiva',  '/categoria/Medicina sportiva'],
  ['Contatti',           '/contatti'],
]

const legalLinks = [
  ['Privacy Policy', '/privacy'],
  ['Cookie Policy',  '/cookie'],
]

const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
  </svg>
)

const YouTubeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
  </svg>
)

export default function Footer() {
  const year = new Date().getFullYear()
  const catList = categories.filter(c => c.name !== 'Tutti')

  return (
    <footer style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.05)' }}>

      {/* MAIN 3 colonne */}
      <div
        className="grid gap-12 px-7 pt-12 pb-10"
        style={{
          gridTemplateColumns: '1.2fr 1fr 1fr',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* COL 1 — Brand */}
        <div>
          <span
            className="block text-[18px] font-black tracking-[0.3em] uppercase mb-3 grad-text"
          >
            FitforIN
          </span>
          <p className="text-[11px] text-[#333] leading-[1.6] mb-1.5">
            La Scienza applicata allo Sport.<br />
            Articoli tecnici su training, nutrizione e performance.
          </p>
          <p className="text-[10px] font-mono text-[#1e1e1e] mb-6">fitforin.it</p>

          <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#1e1e1e] mb-3">Seguici</p>
          <div className="flex gap-2">
            {[
              { icon: <InstagramIcon />, label: 'Instagram', href: '#' },
              { icon: <YouTubeIcon />,   label: 'YouTube',   href: '#' },
            ].map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-[#333] transition-all duration-200 hover:text-dim"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* COL 2 — Navigazione + Legale */}
        <div>
          <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#1e1e1e] mb-4">Navigazione</p>
          <ul className="space-y-2.5 mb-7">
            {navLinks.map(([label, to]) => (
              <li key={label}>
                <Link
                  to={to}
                  className="group inline-flex items-center gap-1.5 text-[12px] text-[#333] hover:text-dim transition-colors duration-150"
                >
                  {label}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px]">↗</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#1e1e1e] mb-3">Legale</p>
          <ul className="space-y-2">
            {legalLinks.map(([label, to]) => (
              <li key={label}>
                <Link
                  to={to}
                  className="group inline-flex items-center gap-1.5 text-[12px] text-[#333] hover:text-dim transition-colors duration-150"
                >
                  {label}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px]">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 3 — Categorie con conteggio */}
        <div>
          <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#1e1e1e] mb-3">Articoli per categoria</p>
          <div>
            {catList.map(({ name, count }) => (
              <div
                key={name}
                className="flex justify-between items-center py-2.5 cursor-pointer group"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
              >
                <span className="text-[11px] text-[#2a2a2a] group-hover:text-dim transition-colors">{name}</span>
                <span className="text-[9px] font-mono text-[#1a1a1a] group-hover:text-muted transition-colors">{count} art.</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="flex justify-between items-center px-7 py-4 flex-wrap gap-2">
        <span className="text-[10px] text-[#1e1e1e]">
          © {year} FitforIN — La Scienza applicata allo Sport
        </span>

        {/* pill con ping dot — stile dierreimpianti */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-bold tracking-[0.2em] uppercase text-[#1e1e1e] transition-all duration-200 hover:border-white/10 cursor-pointer"
          style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}
        >
          {/* animated ping dot */}
          <span className="relative w-1.5 h-1.5" aria-hidden="true">
            <span
              className="absolute inset-0 rounded-full bg-white opacity-30"
              style={{ animation: 'ping 1.4s ease-in-out infinite' }}
            />
            <span className="absolute inset-[1px] rounded-full bg-[#666]" />
          </span>
          Digital Experience by{' '}
          <span
            style={{
              background: 'linear-gradient(90deg,#888,#555)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ACWebD
          </span>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Esegui test — deve passare**

```bash
npx vitest run tests/components/Footer.test.jsx
```

Atteso: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.jsx tests/components/Footer.test.jsx
git commit -m "feat: add Footer 3-column + ping dot bottom bar"
```

---

## Task 11: Home Page + Router

**Files:**
- Create: `src/pages/Home.jsx`
- Create: `src/pages/ArticlePage.jsx`
- Modify: `src/App.jsx`
- Create: `tests/pages/Home.test.jsx`

- [ ] **Step 1: Scrivi il test**

Crea `tests/pages/Home.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from '../../src/pages/Home'

test('renders hero section', () => {
  render(<MemoryRouter><Home /></MemoryRouter>)
  expect(screen.getByText('SPORT')).toBeInTheDocument()
})

test('renders featured section', () => {
  render(<MemoryRouter><Home /></MemoryRouter>)
  expect(screen.getByText(/in evidenza/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Esegui test — deve fallire**

```bash
npx vitest run tests/pages/Home.test.jsx
```

Atteso: FAIL

- [ ] **Step 3: Crea Home page**

Crea `src/pages/Home.jsx`:

```jsx
import Hero from '../components/Hero'
import Ticker from '../components/Ticker'
import FeaturedArticles from '../components/FeaturedArticles'
import BlogGrid from '../components/BlogGrid'
import CtaSection from '../components/CtaSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <FeaturedArticles />
      <BlogGrid />
      <CtaSection />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 4: Crea ArticlePage**

Crea `src/pages/ArticlePage.jsx`:

```jsx
import { useParams, Link } from 'react-router-dom'
import { articles } from '../data/articles'
import Footer from '../components/Footer'

export default function ArticlePage() {
  const { slug } = useParams()
  const article = articles.find(a => a.slug === slug)

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted text-sm mb-4">Articolo non trovato</p>
          <Link to="/" className="text-dim text-xs tracking-widest uppercase hover:text-white transition-colors">
            ← Torna alla home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* progress bar */}
      <div
        className="fixed top-0 left-0 h-px z-50 transition-all"
        style={{ background: 'linear-gradient(90deg,#fff,#666)', width: '0%' }}
        id="progress-bar"
      />

      <article className="pt-28 pb-20 px-7 max-w-[680px] mx-auto">
        {/* breadcrumb */}
        <div className="flex items-center gap-3 mb-8">
          <Link to="/" className="text-[8px] tracking-[0.3em] uppercase text-muted hover:text-dim transition-colors">
            Home
          </Link>
          <span className="text-muted text-xs">·</span>
          <span className="text-[8px] tracking-[0.3em] uppercase text-muted">{article.category}</span>
        </div>

        {/* header articolo */}
        <div className="mb-10">
          <div className="text-[7px] tracking-[0.3em] uppercase text-muted mb-3">
            {article.emoji} {article.category} · {article.readTime} min lettura
          </div>
          <h1
            className="font-black leading-[1.05] mb-6"
            style={{
              fontSize: 'clamp(32px,5vw,52px)',
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg,#fff 0%,#aaa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {article.title}
          </h1>
          <p className="text-[13px] text-[#555] leading-[1.7]">{article.excerpt}</p>
        </div>

        {/* immagine hero articolo */}
        <div
          className="w-full h-[280px] rounded-xl flex items-center justify-center text-5xl mb-10"
          style={{ background: 'linear-gradient(135deg,#111,#1c1c1c)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          {article.emoji}
        </div>

        {/* corpo articolo — placeholder */}
        <div className="space-y-5 text-[14px] text-[#555] leading-[1.8]">
          <p>Questo è il contenuto dell'articolo. In produzione verrà caricato dal CMS.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

        {/* back link */}
        <div className="mt-14 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link to="/" className="text-[9px] tracking-[0.3em] uppercase text-muted hover:text-dim transition-colors">
            ← Torna alla home
          </Link>
        </div>
      </article>

      <Footer />
    </>
  )
}
```

- [ ] **Step 5: Configura App.jsx con router**

Sostituisci `src/App.jsx` con:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ArticlePage from './pages/ArticlePage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"                      element={<Home />} />
        <Route path="/articolo/:slug"        element={<ArticlePage />} />
        <Route path="/categoria/:cat"        element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
```

- [ ] **Step 6: Aggiorna main.jsx**

Sostituisci `src/main.jsx` con:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

- [ ] **Step 7: Esegui test — deve passare**

```bash
npx vitest run tests/pages/Home.test.jsx
```

Atteso: PASS

- [ ] **Step 8: Verifica visiva nel browser**

```bash
npm run dev
```

Apri `http://localhost:5173` — deve vedere la homepage completa.

- [ ] **Step 9: Esegui tutti i test**

```bash
npx vitest run
```

Atteso: tutti PASS

- [ ] **Step 10: Commit finale**

```bash
git add -A
git commit -m "feat: complete FitforIN homepage and routing"
```

---

## Self-Review

**Spec coverage:**
- ✅ Nav sticky con blur — Task 4
- ✅ Hero tipografia oversize + GSAP stagger — Task 5
- ✅ Ticker animato — Task 6
- ✅ Featured grid asimmetrica — Task 7
- ✅ Category filters + Blog broken grid — Task 8
- ✅ CTA full-bleed — Task 9
- ✅ Footer 3 colonne + ping dot stile dierreimpianti — Task 10
- ✅ Routing home + articolo — Task 11
- ✅ Design system Tailwind + CSS utilities — Task 1
- ✅ Mock data — Task 2
- ✅ GSAP hook riutilizzabile — Task 3
- ✅ Gradiente grayscale su titoli e hero — CSS utilities Task 1

**Placeholder scan:** Nessun TBD o TODO nel codice. ArticlePage ha corpo placeholder esplicito — corretto, da sostituire con CMS in futuro.

**Type consistency:** `article.slug`, `article.title`, `article.category`, `article.readTime`, `article.emoji` — usati consistentemente in BlogCard, FeaturedArticles, ArticlePage. `featuredArticles` e `latestArticles` esportati da `articles.js` e importati nei componenti corretti.
