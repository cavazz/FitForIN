import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import FeaturedArticles from '../../src/components/FeaturedArticles'
import { featuredArticles } from '../../src/data/articles'

const wrap = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

test('renders first featured article title', () => {
  wrap(<FeaturedArticles />)
  expect(screen.getByText(featuredArticles[0].title)).toBeInTheDocument()
})

test('renders section label', () => {
  wrap(<FeaturedArticles />)
  expect(screen.getByText(/in evidenza/i)).toBeInTheDocument()
})
