/* eslint-disable @typescript-eslint/no-explicit-any */
import { initialProductListState, productListReducer } from '../product-list'

import { mockProduct } from '../../helpers/product'

import { ProductCategory } from '../../enums/product'
import { ProductListActionType } from '../../enums/product-list'

describe('productListReducer', () => {
  it('should return initial state by default', () => {
    const state = productListReducer(initialProductListState, {
      type: '',
    } as any)
    expect(state).toEqual(initialProductListState)
  })

  it('should handle SetLoading action correctly', () => {
    expect(
      productListReducer(initialProductListState, {
        type: ProductListActionType.SetLoading,
        payload: { isLoading: true },
      }).isLoading
    ).toBe(true)

    expect(
      productListReducer(initialProductListState, {
        type: ProductListActionType.SetLoading,
        payload: { isLoading: false },
      }).isLoading
    ).toBe(false)
  })

  it('should handle SetLimit action correctly', () => {
    expect(
      productListReducer(initialProductListState, {
        type: ProductListActionType.SetLimit,
        payload: { limit: 10 },
      }).limit
    ).toBe(10)
  })

  it('should handle SetOffset action correctly', () => {
    expect(
      productListReducer(initialProductListState, {
        type: ProductListActionType.SetOffset,
        payload: { offset: 6 },
      }).offset
    ).toBe(6)
  })

  it('should handle SetHasMore action', () => {
    expect(
      productListReducer(initialProductListState, {
        type: ProductListActionType.SetHasMore,
        payload: { hasMore: true },
      }).hasMore
    ).toBe(true)
  })

  it('should handle SetTotalProducts action', () => {
    expect(
      productListReducer(initialProductListState, {
        type: ProductListActionType.SetTotalProducts,
        payload: { totalProducts: 50 },
      }).totalProducts
    ).toBe(50)
  })

  it('should handle AppendLoadingProducts action', () => {
    const state = productListReducer(initialProductListState, {
      type: ProductListActionType.AppendLoadingProducts,
      payload: { limit: 3, productCategory: ProductCategory.Legendary },
    })

    state.displayProducts.forEach(product => {
      expect(product.isLoading).toBe(true)
      expect(product.category).toBe(ProductCategory.Legendary)
      expect(product.id).toBeGreaterThan(0)
    })
  })

  it('should calculate correct loading products in AppendLoadingProducts', () => {
    expect(
      productListReducer(initialProductListState, {
        type: ProductListActionType.AppendLoadingProducts,
        payload: { limit: 24, productCategory: ProductCategory.Legendary },
      }).displayProducts.length
    ).toBe(24)

    expect(
      productListReducer(
        { ...initialProductListState, offset: 24, totalProducts: 30 },
        {
          type: ProductListActionType.AppendLoadingProducts,
          payload: { limit: 24, productCategory: ProductCategory.Legendary },
        }
      ).displayProducts.length
    ).toBe(6)

    expect(
      productListReducer(
        {
          ...initialProductListState,
          offset: 24,
          totalProducts: 20,
          displayProducts: [...new Array(20).keys()].map(() => mockProduct()),
        },
        {
          type: ProductListActionType.AppendLoadingProducts,
          payload: { limit: 24, productCategory: ProductCategory.Legendary },
        }
      ).displayProducts.length
    ).toBe(20)
  })

  it('should handle AppendProducts action', () => {
    const newProducts = [mockProduct(), mockProduct()]
    const state = productListReducer(initialProductListState, {
      type: ProductListActionType.AppendProducts,
      payload: { newProducts },
    })
    expect(state.displayProducts).toEqual(newProducts)
    expect(state.products).toEqual(newProducts)
  })

  it('should handle ResetProducts action', () => {
    const state = productListReducer(initialProductListState, {
      type: ProductListActionType.ResetProducts,
    })
    expect(state).toEqual(initialProductListState)
  })
})
