import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import BlogGrid from '../../src/components/BlogGrid'

test('renders blog grid section', () => {
  render(<BrowserRouter><BlogGrid /></BrowserRouter>)
  expect(screen.getByText(/ultimi articoli/i)).toBeInTheDocument()
})
