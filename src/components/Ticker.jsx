const ITEMS = [
  'Training', 'Alimentazione', 'Basket Lab',
  'Medicina Sportiva', "Scienza dell'Esercizio", 'Stretching', 'Preparazione Fisica',
]

export default function Ticker() {
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
