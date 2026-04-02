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
