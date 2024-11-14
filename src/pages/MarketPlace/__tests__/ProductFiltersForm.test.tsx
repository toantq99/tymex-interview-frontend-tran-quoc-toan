import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { useProductListQuery } from '../../../hooks/useProductListQuery'
import { ProductTier, ProductTheme } from '../../../enums/product'
import { SortType } from '../../../enums/general'
import ProductFiltersForm from '../ProductFiltersForm'

jest.mock('../../../hooks/useProductListQuery')

describe('ProductFiltersForm', () => {
  const mockUpdateFiltersAndSorters = jest.fn()
  const mockResetFiltersAndSorters = jest.fn()
  const mockCloseDrawer = jest.fn()

  beforeEach(() => {
    ;(useProductListQuery as jest.Mock).mockReturnValue({
      currentFilters: { priceRange: [0, 200] },
      currentSorters: { timeSort: SortType.Descending },
      updateFiltersAndSorters: mockUpdateFiltersAndSorters,
      resetFiltersAndSorters: mockResetFiltersAndSorters,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly with initial values', () => {
    render(<ProductFiltersForm />)

    expect(screen.getByPlaceholderText('Quick search')).toBeInTheDocument()
    expect(screen.getByText('Price')).toBeInTheDocument()
    expect(screen.getByText('Tier')).toBeInTheDocument()
    expect(screen.getByText('Theme')).toBeInTheDocument()
    expect(screen.getByText('Time')).toBeInTheDocument()
    expect(screen.getByText('Price')).toBeInTheDocument()
  })

  it('calls updateFiltersAndSorters on search input submit', () => {
    render(<ProductFiltersForm searchOnTyping={false} />)

    fireEvent.change(screen.getByPlaceholderText('Quick search'), {
      target: { value: 'test search' },
    })
    fireEvent.click(screen.getByText('Search'))

    expect(mockUpdateFiltersAndSorters).toHaveBeenCalled()
  })

  it('calls resetFiltersAndSorters and closeDrawer on "Reset filter" button click', () => {
    render(<ProductFiltersForm closeDrawer={mockCloseDrawer} />)

    fireEvent.click(screen.getByText('Reset filter'))

    expect(mockResetFiltersAndSorters).toHaveBeenCalled()
    expect(mockCloseDrawer).toHaveBeenCalled()
  })

  it('updates the price range filter', () => {
    render(<ProductFiltersForm />)

    const priceSlider = screen.getByRole('slider')
    fireEvent.change(priceSlider, { target: { value: [10, 150] } })

    expect(screen.getByDisplayValue('10')).toBeInTheDocument()
    expect(screen.getByDisplayValue('150')).toBeInTheDocument()
  })

  it('sets the correct sort type for time and price', () => {
    render(<ProductFiltersForm />)

    fireEvent.mouseDown(screen.getByLabelText('Time'))
    fireEvent.click(screen.getByText('Earliest'))

    fireEvent.mouseDown(screen.getByLabelText('Price'))
    fireEvent.click(screen.getByText('High to low'))

    expect(mockUpdateFiltersAndSorters).toHaveBeenCalledWith(
      expect.objectContaining({
        sorters: {
          timeSort: SortType.Ascending,
          priceSort: SortType.Descending,
        },
      })
    )
  })

  it('updates tier and theme filters', () => {
    render(<ProductFiltersForm />)

    fireEvent.mouseDown(screen.getByLabelText('Tier'))
    fireEvent.click(screen.getByText(ProductTier.Premium))

    fireEvent.mouseDown(screen.getByLabelText('Theme'))
    fireEvent.click(screen.getByText(ProductTheme.Colorful))

    expect(mockUpdateFiltersAndSorters).toHaveBeenCalledWith(
      expect.objectContaining({
        filters: {
          tier: ProductTier.Premium,
          theme: ProductTheme.Colorful,
        },
      })
    )
  })
})
