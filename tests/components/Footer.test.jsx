import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Footer from '../../src/components/Footer'

const wrap = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

test('renders brand name', () => {
  wrap(<Footer />)
  expect(screen.getByText('FitforIN')).toBeInTheDocument()
})

test('renders navigation links', () => {
  wrap(<Footer />)
  expect(screen.getAllByText('Training').length).toBeGreaterThan(0)
  expect(screen.getAllByText('Basket Lab').length).toBeGreaterThan(0)
})

test('renders copyright', () => {
  wrap(<Footer />)
  expect(screen.getAllByText(/FitforIN/).length).toBeGreaterThan(0)
})
