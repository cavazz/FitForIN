export default function Logo({ height = 48 }) {
  return (
    <img
      src="/logo.svg"
      alt="FIT FORIN"
      height={height}
      style={{ height, width: 'auto', display: 'block', objectFit: 'contain' }}
      draggable={false}
    />
  )
}
