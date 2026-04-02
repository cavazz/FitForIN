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
