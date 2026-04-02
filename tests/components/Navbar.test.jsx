import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from '../../src/components/Navbar'

const wrap = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

test('renders logo text', () => {
  wrap(<Navbar />)
  expect(screen.getByText('FitforIN')).toBeInTheDocument()
})

test('renders nav links', () => {
  wrap(<Navbar />)
  expect(screen.getByText('Blog')).toBeInTheDocument()
  expect(screen.getByText('Training')).toBeInTheDocument()
  expect(screen.getByText('Basket Lab')).toBeInTheDocument()
})
