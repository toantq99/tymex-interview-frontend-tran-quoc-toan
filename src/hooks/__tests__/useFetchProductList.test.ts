import { act } from 'react'
import { renderHook, waitFor } from '@testing-library/react'

import axiosInstance from '../../apis'
import { initialProductListState } from '../../reducers/product-list'
import { useFetchProductList } from '../useFetchProductList'

import { mockProduct } from '../../helpers/product'

import { ProductCategory } from '../../enums/product'

import { IProductListQuery } from '../../types/product-list'

// Mock axiosInstance to control API response
jest.mock('../../apis/', () => ({
  get: jest.fn(),
}))

describe('useFetchProductList', () => {
  const initialQuery: IProductListQuery = {
    filters: {},
    sorters: {},
    category: ProductCategory.All,
  }

  const mockApiResponse = ({
    response,
    total,
  }: {
    response: number
    total: number
  }) => {
    const mockProducts = [...new Array(response).keys()].map(index => ({
      ...mockProduct(),
      id: index,
    }))

    const mockHeaders = { 'x-total-count': total.toString() }

    ;(axiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockProducts,
      headers: mockHeaders,
    })

    return {
      mockProducts,
      mockHeaders,
    }
  }

  const renderHookUseFetchProductList = () =>
    renderHook(() => useFetchProductList())

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should load products and update state correctly on api success', async () => {
    const { mockProducts } = mockApiResponse({ response: 24, total: 30 })

    const { result } = renderHookUseFetchProductList()

    await act(async () => {
      result.current.intialLoadProducts({ query: initialQuery })
    })

    await waitFor(() => {
      expect(result.current.products).toEqual(mockProducts)
      expect(result.current.displayProducts).toEqual(mockProducts)
      expect(result.current.hasMore).toBe(true)
      expect(result.current.totalProducts).toBe(30)
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('should update hasMore to false if returned products less than limit', async () => {
    const { result } = renderHookUseFetchProductList()

    mockApiResponse({ response: 20, total: 20 })

    await act(async () => {
      result.current.intialLoadProducts({ query: initialQuery })
    })

    await waitFor(() => {
      expect(result.current.hasMore).toBe(false)
    })

    mockApiResponse({ response: 24, total: 30 })
    await act(async () => {
      result.current.intialLoadProducts({ query: initialQuery })
    })

    mockApiResponse({ response: 6, total: 30 })
    await act(async () => {
      result.current.intialLoadProducts({ query: initialQuery })
    })

    await waitFor(() => {
      expect(result.current.hasMore).toBe(false)
    })

    mockApiResponse({ response: 24, total: 48 })
    await act(async () => {
      result.current.intialLoadProducts({ query: initialQuery })
    })

    mockApiResponse({ response: 24, total: 48 })
    await act(async () => {
      result.current.loadMoreProducts({ query: initialQuery })
    })

    await waitFor(() => {
      expect(result.current.hasMore).toBe(false)
    })
  })

  it('should handle errors and set hasMore to false on API failure', async () => {
    ;(axiosInstance.get as jest.Mock).mockRejectedValueOnce(
      new Error('API error')
    )

    const { result } = renderHookUseFetchProductList()

    await act(async () => {
      result.current.intialLoadProducts({ query: initialQuery })
    })

    await waitFor(() => {
      expect(result.current.products).toEqual([])
      expect(result.current.hasMore).toBe(false)
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('should append products when loadMoreProducts is called', async () => {
    const { result } = renderHookUseFetchProductList()

    expect(result.current.products.length).toBe(0)

    const { mockProducts } = mockApiResponse({ response: 24, total: 30 })

    await act(async () => {
      result.current.intialLoadProducts({ query: initialQuery })
    })

    await waitFor(() => {
      expect(result.current.products.length).toBe(mockProducts.length)
    })

    const { mockProducts: secondMockProducts } = mockApiResponse({
      response: 6,
      total: 30,
    })

    await act(async () => {
      result.current.loadMoreProducts({ query: initialQuery })
    })

    await waitFor(() => {
      expect(result.current.products.length).toBe(
        mockProducts.length + secondMockProducts.length
      )
    })
  })

  it('should reset product list when resetProductList is called', async () => {
    const { result } = renderHookUseFetchProductList()

    await act(async () => {
      result.current.resetProductList()
    })

    expect(result.current.products).toEqual([])
    expect(result.current.displayProducts).toEqual([])
    expect(result.current.hasMore).toBe(false)
  })

  it('should reinitialize products when refreshProducts is called and product is empty', async () => {
    const { result } = renderHookUseFetchProductList()

    const spyIntialLoadProducts = jest.spyOn(
      result.current,
      'intialLoadProducts'
    )

    mockApiResponse({ response: 0, total: 0 })

    await act(async () => {
      result.current.intialLoadProducts({ query: initialQuery })
    })

    await waitFor(() => {
      expect(result.current.products.length).toBe(0)
    })

    await act(async () => {
      result.current.refreshProducts({ query: initialQuery })
    })

    await waitFor(() => {
      expect(spyIntialLoadProducts).toHaveBeenCalledWith({
        query: initialQuery,
      })
    })
  })

  it('should retain current offset when refreshProducts is called', async () => {
    const { result } = renderHookUseFetchProductList()

    mockApiResponse({ response: 24, total: 100 })

    await act(async () => {
      result.current.loadMoreProducts({ query: initialQuery })
    })

    await waitFor(() => {
      expect(result.current.offset).toBe(initialProductListState.limit)
    })

    mockApiResponse({ response: 24, total: 100 })

    await act(async () => {
      result.current.loadMoreProducts({ query: initialQuery })
    })

    await waitFor(() => {
      expect(result.current.offset).toBe(initialProductListState.limit * 2)
    })

    mockApiResponse({ response: 24, total: 100 })

    await act(async () => {
      result.current.refreshProducts({ query: initialQuery })
    })

    await waitFor(() => {
      expect(result.current.offset).toBe(initialProductListState.limit * 2)
    })
  })
})
