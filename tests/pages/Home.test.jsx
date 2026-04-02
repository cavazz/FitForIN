import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from '../../src/pages/Home'

test('renders hero section', () => {
  render(<MemoryRouter><Home /></MemoryRouter>)
  expect(screen.getByText('SPORT')).toBeInTheDocument()
})

test('renders featured section', () => {
  render(<MemoryRouter><Home /></MemoryRouter>)
  expect(screen.getByText(/in evidenza/i)).toBeInTheDocument()
})
