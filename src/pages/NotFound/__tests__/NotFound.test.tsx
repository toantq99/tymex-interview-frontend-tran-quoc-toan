import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import NotFound from '../index'
import { NAVIGATION_ITEMS } from '../../../constants/navigation'

describe('NotFound Component', () => {
  it('should render the 404 page with the correct title and subtitle', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    )

    // Check if the 404 title is present
    expect(screen.getByText('404')).toBeInTheDocument()

    // Check if the subtitle is present
    expect(
      screen.getByText(/Sorry, the page you visited does not exist/i)
    ).toBeInTheDocument()
  })

  it('should have a button that links to the Marketplace', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    )

    // Check if the button exists and links to the correct path
    const button = screen.getByRole('link')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('href', NAVIGATION_ITEMS.MARKETPLACE.path)
  })
})
