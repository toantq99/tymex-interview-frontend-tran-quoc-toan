import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import MarketPlaceBanner from '../MarketPlaceBanner'

describe('MarketPlaceBanner Component', () => {
  it('renders the banner image with correct attributes', () => {
    render(<MarketPlaceBanner />)

    const bannerImage = screen.getByAltText('market-place-banner')
    expect(bannerImage).toBeInTheDocument()
    expect(bannerImage).toHaveAttribute(
      'src',
      '/assets/images/market-place-banner.png'
    )
    expect(bannerImage).toHaveAttribute('width', '100%')
  })
})
