const ITEMS = [
  'Training', 'Alimentazione', 'Basket Lab',
  'Medicina Sportiva', "Scienza dell'Esercizio", 'Stretching',
  'Preparazione Fisica', 'Biomeccanica', 'Core Stability', 'Recovery',
]

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div
      className="overflow-hidden py-[10px]"
      style={{
        background: '#1A1714',
        borderTop:    '1px solid rgba(201,160,82,0.08)',
        borderBottom: '1px solid rgba(201,160,82,0.08)',
      }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'ticker 22s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-7 text-[9px] tracking-[0.3em] uppercase flex-shrink-0"
            style={{
              color: 'rgba(201,160,82,0.28)',
              borderRight: '1px solid rgba(201,160,82,0.07)',
            }}
          >
            <span style={{ color: '#C9A052', fontSize: '5px' }}>◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
