import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import BlogCard from '../../src/components/BlogCard'

const article = {
  id: 4, slug: 'test-slug', title: 'Test Article',
  category: 'Training', readTime: 5, emoji: '💪', excerpt: 'Test excerpt',
}

test('renders article title', () => {
  render(<BrowserRouter><BlogCard article={article} index={0} /></BrowserRouter>)
  expect(screen.getByText('Test Article')).toBeInTheDocument()
})

test('renders category', () => {
  render(<BrowserRouter><BlogCard article={article} index={0} /></BrowserRouter>)
  expect(screen.getAllByText(/Training/i).length).toBeGreaterThan(0)
})
