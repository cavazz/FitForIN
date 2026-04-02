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
