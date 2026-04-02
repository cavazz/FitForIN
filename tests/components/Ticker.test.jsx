import { render, screen } from '@testing-library/react'
import Ticker from '../../src/components/Ticker'

test('renders category items', () => {
  render(<Ticker />)
  const items = screen.getAllByText('Training')
  expect(items.length).toBeGreaterThan(0)
})
