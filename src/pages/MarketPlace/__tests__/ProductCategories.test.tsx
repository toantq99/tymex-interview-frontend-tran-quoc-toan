import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { useProductListQuery } from '../../../hooks/useProductListQuery'
import { DISPLAY_CATEGORIES } from '../../../constants/category'
import ProductCategories from '../ProductCategories'

jest.mock('../../../hooks/useProductListQuery')

describe('ProductCategories', () => {
  const mockUpdateCategory = jest.fn()

  beforeEach(() => {
    ;(useProductListQuery as jest.Mock).mockReturnValue({
      updateCategory: mockUpdateCategory,
      currentCategory: DISPLAY_CATEGORIES[0].category,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders all category buttons', () => {
    render(<ProductCategories />)

    DISPLAY_CATEGORIES.forEach(({ label }) => {
      expect(
        screen.getByRole('button', { name: label as string })
      ).toBeInTheDocument()
    })
  })

  it('applies "primary" type to the button of the current category', () => {
    render(<ProductCategories />)

    const currentCategoryButton = screen.getByRole('button', {
      name: DISPLAY_CATEGORIES[0].label as string,
    })
    expect(currentCategoryButton).toHaveClass('ant-btn-primary')
  })

  it('calls updateCategory with the correct category when a button is clicked', () => {
    render(<ProductCategories />)

    const targetCategory = DISPLAY_CATEGORIES[1]
    const targetButton = screen.getByRole('button', {
      name: targetCategory.label as string,
    })

    fireEvent.click(targetButton)

    expect(mockUpdateCategory).toHaveBeenCalledWith(targetCategory.category)
  })
})
