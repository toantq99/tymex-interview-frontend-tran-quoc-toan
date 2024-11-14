import { act } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { renderHook } from '@testing-library/react'

import { useProductListQuery } from '../useProductListQuery'

import { isEqual } from '../../helpers/general'
import {
  composeProductListUrlSearchParams,
  extractProductListQuery,
} from '../../helpers/product-list'

import { SortType } from '../../enums/general'
import { ProductCategory, ProductTheme, ProductTier } from '../../enums/product'

import { IProductListQuery } from '../../types/product-list'

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
  useLocation: jest.fn(),
}))

jest.mock('../../helpers/product-list', () => ({
  composeProductListUrlSearchParams: jest.fn(),
  extractProductListQuery: jest.fn(),
}))

jest.mock('../../helpers/general', () => ({
  isEqual: jest.fn(),
}))

describe('useProductListQuery', () => {
  const mockPush = jest.fn()

  const initialQuery: IProductListQuery = {
    filters: {},
    sorters: {},
    category: ProductCategory.All,
  }

  const renderHookUseProductListQuery = ({
    composeSearchParamsResult = '',
    isEqualResult = false,
    currentQuery = initialQuery,
  }: {
    composeSearchParamsResult?: string
    isEqualResult?: boolean
    currentQuery?: IProductListQuery
  } = {}) => {
    ;(extractProductListQuery as jest.Mock).mockReturnValue(currentQuery)
    ;(composeProductListUrlSearchParams as jest.Mock).mockReturnValue(
      composeSearchParamsResult
    )
    ;(isEqual as jest.Mock).mockReturnValue(isEqualResult)

    return renderHook(() => useProductListQuery())
  }

  beforeEach(() => {
    ;(useHistory as jest.Mock).mockReturnValue({ push: mockPush })
    ;(useLocation as jest.Mock).mockReturnValue({
      search: '',
      state: { fetchAction: 'initialize', timestamp: Date.now() },
    })

    mockPush.mockClear()
  })

  it('should return correct query and state values', () => {
    const currentQuery: IProductListQuery = {
      filters: { priceRange: [1, 100] },
      sorters: { timeSort: SortType.Descending },
      category: ProductCategory.Accessory,
    }

    const { result } = renderHookUseProductListQuery({ currentQuery })

    expect(result.current.currentProductListQuery).toEqual(currentQuery)
    expect(result.current.currentFilters).toEqual(currentQuery.filters)
    expect(result.current.currentSorters).toEqual(currentQuery.sorters)
    expect(result.current.currentCategory).toBe(currentQuery.category)
  })

  it('should call push with new search params on updateFiltersAndSorters', () => {
    const newFilters = { theme: ProductTheme.Dark }
    const newSorters = { priceSort: SortType.Ascending }

    const composeSearchParamsResult =
      'filters=theme%3Ddark&sorters=priceSort%3Dasc'

    const { result } = renderHookUseProductListQuery({
      composeSearchParamsResult,
    })

    act(() => {
      result.current.updateFiltersAndSorters({
        filters: newFilters,
        sorters: newSorters,
      })
    })

    expect(mockPush).toHaveBeenCalledWith({
      search: composeSearchParamsResult,
      state: {
        timestamp: expect.any(Number),
        fetchAction: 'initialize',
      },
    })
  })

  it('should call push with initialize flag when filters changes', () => {
    const { result } = renderHookUseProductListQuery()

    act(() => {
      result.current.updateFiltersAndSorters({
        filters: { tier: ProductTier.Basic },
        sorters: {},
      })
    })

    expect(mockPush).toHaveBeenCalledWith({
      search: expect.any(String),
      state: {
        timestamp: expect.any(Number),
        fetchAction: 'initialize',
      },
    })
  })

  it('should call push with reload flag when filters not changes', () => {
    const { result } = renderHookUseProductListQuery({
      isEqualResult: true,
    })

    act(() => {
      result.current.updateFiltersAndSorters({
        filters: {},
        sorters: { priceSort: SortType.Ascending },
      })
    })

    expect(mockPush).toHaveBeenCalledWith({
      search: expect.any(String),
      state: {
        timestamp: expect.any(Number),
        fetchAction: 'reload',
      },
    })
  })

  it('should call push with empty filters and sorters and initialize flag on resetFiltersAndSorters', () => {
    const { result } = renderHookUseProductListQuery({
      composeSearchParamsResult: '',
    })

    act(() => {
      result.current.resetFiltersAndSorters()
    })

    expect(mockPush).toHaveBeenCalledWith({
      search: '',
      state: {
        timestamp: expect.any(Number),
        fetchAction: 'initialize',
      },
    })
  })

  it('should call push with updated category and initialize flag on updateCategory', () => {
    const newCategory = ProductCategory.Legendary

    const composeSearchParamsResult = 'category=Legendary'

    const { result } = renderHookUseProductListQuery({
      composeSearchParamsResult,
    })

    act(() => {
      result.current.updateCategory(newCategory)
    })

    expect(mockPush).toHaveBeenCalledWith({
      search: composeSearchParamsResult,
      state: {
        timestamp: expect.any(Number),
        fetchAction: 'initialize',
      },
    })
  })

  it('should call push with empty timestamp when there is no fetch action on updateProductListUrl', () => {
    ;(isEqual as jest.Mock).mockReturnValue(false)
    const composeSearchParamsResult = 'category=Legendary'

    const { result } = renderHookUseProductListQuery({
      composeSearchParamsResult,
    })

    act(() => {
      result.current.updateProductListUrl({ query: initialQuery })
    })

    expect(mockPush).toHaveBeenCalledWith({
      search: composeSearchParamsResult,
      state: {
        timestamp: 0,
        fetchAction: undefined,
      },
    })
  })
})
