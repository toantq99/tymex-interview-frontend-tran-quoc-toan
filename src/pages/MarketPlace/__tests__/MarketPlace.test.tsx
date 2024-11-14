import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MarketPlace from '../index'
import { useBreakpoint } from '../../../hooks/useBreakpoint'

jest.mock('../../../hooks/useBreakpoint', () => ({
  useBreakpoint: jest.fn(),
}))

jest.mock('../MarketPlaceBanner', () => () => <div>MarketPlaceBanner</div>)
jest.mock('../MobileProductFiltersForm', () => () => (
  <div>MobileProductFiltersForm</div>
))
jest.mock('../ProductCategories', () => () => <div>ProductCategories</div>)
jest.mock('../ProductFiltersForm', () => () => <div>ProductFiltersForm</div>)
jest.mock('../ProductList', () => () => <div>ProductList</div>)

describe('MarketPlace', () => {
  it('renders MarketPlace with full layout when not collapsed', () => {
    ;(useBreakpoint as jest.Mock).mockReturnValue({ isCollapsed: false })

    render(<MarketPlace />)

    expect(screen.getByText('MarketPlaceBanner')).toBeInTheDocument()
    expect(screen.getByText('ProductFiltersForm')).toBeInTheDocument()
    expect(screen.getByText('ProductCategories')).toBeInTheDocument()
    expect(screen.getByText('ProductList')).toBeInTheDocument()

    expect(
      screen.queryByText('MobileProductFiltersForm')
    ).not.toBeInTheDocument()
  })

  it('renders MarketPlace with mobile layout when collapsed', () => {
    ;(useBreakpoint as jest.Mock).mockReturnValue({ isCollapsed: true })

    render(<MarketPlace />)

    expect(screen.getByText('MarketPlaceBanner')).toBeInTheDocument()
    expect(screen.getByText('MobileProductFiltersForm')).toBeInTheDocument()
    expect(screen.getByText('ProductList')).toBeInTheDocument()

    expect(screen.queryByText('ProductFiltersForm')).not.toBeInTheDocument()
    expect(screen.queryByText('ProductCategories')).not.toBeInTheDocument()
  })
})
