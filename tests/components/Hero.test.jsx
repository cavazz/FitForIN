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
