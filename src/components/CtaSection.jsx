import { Link } from 'react-router-dom'
import { useGsapReveal } from '../hooks/useGsapReveal'

export default function CtaSection() {
  const containerRef = useGsapReveal('[data-cta-line]', { stagger: 0.15 })

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden px-7 pt-14 pb-12 noise"
      style={{
        background: 'linear-gradient(175deg,#1A1714 0%,#1E1B15 50%,#201C16 100%)',
        borderBottom: '1px solid rgba(201,160,82,0.07)',
      }}
    >
      {/* freccia decorativa sfondo */}
      <span
        aria-hidden="true"
        className="absolute bottom-[-30px] right-[-10px] text-[220px] font-black leading-none pointer-events-none select-none"
        style={{
          background: 'linear-gradient(180deg,rgba(201,160,82,0.04) 0%,transparent 80%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        →
      </span>

      {/* eyebrow */}
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <span className="block w-5 h-px" style={{ background: 'rgba(201,160,82,0.25)' }} />
        <span className="text-[8px] tracking-[0.4em] uppercase" style={{ color: 'rgba(201,160,82,0.38)' }}>
          FitforIN · Blog
        </span>
      </div>

      {/* titolo */}
      <div
        className="font-display relative z-10 mb-9"
        style={{
          fontSize: 'clamp(44px,8vw,82px)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 0.88,
          textTransform: 'uppercase',
        }}
      >
        <span data-cta-line className="block" style={{ color: '#E8DCBA' }}>Allenati</span>
        <span data-cta-line className="block" style={{ color: 'rgba(201,160,82,0.72)' }}>con</span>
        <span data-cta-line className="block text-outline">metodo.</span>
      </div>

      {/* row inferiore */}
      <div className="relative z-10 flex justify-between items-end">
        <p
          className="text-[11px] leading-[1.7] max-w-[220px] border-l pl-4"
          style={{ color: 'rgba(201,160,82,0.52)', borderColor: 'rgba(201,160,82,0.18)' }}
        >
          Articoli scientifici su training, nutrizione e performance. Gratis, sempre.
        </p>
        <div className="flex flex-col items-end gap-3">
          <Link
            to="/"
            className="btn-gold px-7 py-3"
          >
            Leggi gli articoli ↗
          </Link>
          <span className="text-[8px] tracking-[0.1em] uppercase" style={{ color: 'rgba(201,160,82,0.32)' }}>
            80+ articoli disponibili
          </span>
        </div>
      </div>
    </section>
  )
}
