import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

export default function Hero() {
  const titleRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // titolo stagger
    const lines = titleRef.current?.querySelectorAll('[data-line]')
    if (lines) {
      tl.fromTo(
        lines,
        { opacity: 0, y: 55 },
        { opacity: 1, y: 0, duration: 0.95, ease: 'power3.out', stagger: 0.11 }
      )
    }
  }, [])

  return (
    <section
      className="relative overflow-hidden pb-0 noise"
      style={{
        background: 'linear-gradient(175deg, #0E0C09 0%, #131108 55%, #181408 100%)',
        paddingTop: 'clamp(132px, 18vh, 164px)',
      }}
    >
      {/* numero decorativo */}
      <span
        aria-hidden="true"
        className="absolute top-0 right-4 text-[220px] font-black leading-none pointer-events-none select-none"
        style={{
          background: 'linear-gradient(180deg, rgba(201,160,82,0.05) 0%, transparent 80%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-14px',
        }}
      >
        FF
      </span>

      <div className="relative z-10 px-7 md:px-14">
        {/* eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <span className="block w-6 h-px" style={{ background: 'rgba(201,160,82,0.4)' }} />
          <span className="text-[9px] tracking-[0.45em] uppercase" style={{ color: 'rgba(201,160,82,0.55)' }}>
            La Scienza applicata allo Sport
          </span>
        </div>

        {/* TITOLO GIGANTE */}
        <div ref={titleRef} className="mb-10 overflow-visible">
          <span
            data-line
            className="block font-black uppercase leading-[0.88] tracking-[-0.05em] grad-text"
            style={{ fontSize: 'clamp(64px,13vw,140px)' }}
          >
            SPORT
          </span>
          <span
            data-line
            className="block font-black uppercase leading-[0.88] tracking-[-0.05em] grad-text-mid"
            style={{ fontSize: 'clamp(64px,13vw,140px)', marginLeft: 'clamp(2rem,5vw,5rem)' }}
          >
            SCIENCE
          </span>
          <span
            data-line
            className="block font-black uppercase leading-[0.88] tracking-[-0.05em] text-outline"
            style={{ fontSize: 'clamp(64px,13vw,140px)', marginLeft: 'clamp(1rem,2.5vw,2rem)' }}
          >
            BLOG.
          </span>
        </div>

        {/* sub-row */}
        <div
          className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 pb-10"
          style={{ borderBottom: '1px solid rgba(201,160,82,0.08)' }}
        >
          <p
            className="text-[12px] leading-[1.8] max-w-[320px] border-l-2 pl-4"
            style={{ color: 'rgba(201,160,82,0.5)', borderColor: 'rgba(201,160,82,0.25)' }}
          >
            Articoli tecnici su allenamento, nutrizione e performance sportiva.
            Per chi prende lo sport sul serio.
          </p>

          <div className="flex items-center gap-6">
            {[['80+', 'Articoli'], ['6', 'Categorie']].map(([num, label]) => (
              <div key={label} className="text-right">
                <div className="text-xl font-black leading-tight grad-text">{num}</div>
                <div className="text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(201,160,82,0.3)' }}>
                  {label}
                </div>
              </div>
            ))}
            <button
              onClick={() => document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-gold px-7 py-3 ml-2"
            >
              Leggi gli articoli →
            </button>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div className="flex items-center justify-end gap-2 px-7 md:px-14 py-5 z-10 relative">
        <span className="block w-6 h-px" style={{ background: 'rgba(201,160,82,0.25)' }} />
        <span className="text-[8px] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,160,82,0.3)' }}>Scroll</span>
      </div>
    </section>
  )
}
