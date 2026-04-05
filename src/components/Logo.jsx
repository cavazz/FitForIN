export default function Logo({ height = 48 }) {
  return (
    <img
      src="/logo.webp"
      alt="FIT FORIN"
      height={height}
      style={{ height, width: 'auto', display: 'block', objectFit: 'contain' }}
      draggable={false}
    />
  )
}
