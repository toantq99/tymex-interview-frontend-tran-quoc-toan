import { Reducer } from 'react'

import { mockProduct } from '../helpers/product'

import { ProductListActionType } from '../enums/product-list'

import { IProductListAction, IProductListState } from '../types/product-list'

export const initialProductListState: IProductListState = {
  products: [],
  displayProducts: [],
  hasMore: false,
  isLoading: false,
  offset: 0,
  limit: 24,
  totalProducts: 0,
}

export const productListReducer: Reducer<
  IProductListState,
  IProductListAction
> = (state, action) => {
  switch (action.type) {
    case ProductListActionType.SetLoading:
      return { ...state, isLoading: action.payload.isLoading }

    case ProductListActionType.SetLimit:
      return { ...state, limit: action.payload.limit }

    case ProductListActionType.SetOffset:
      return { ...state, offset: action.payload.offset }

    case ProductListActionType.SetHasMore:
      return { ...state, hasMore: action.payload.hasMore }

    case ProductListActionType.SetTotalProducts:
      return { ...state, totalProducts: action.payload.totalProducts }

    case ProductListActionType.AppendLoadingProducts: {
      const timestamp = Date.now()

      let numberOfLoadingProducts = action.payload.limit

      if (state.totalProducts) {
        numberOfLoadingProducts = Math.min(
          numberOfLoadingProducts,
          Math.max(state.totalProducts - state.offset, 0)
        )
      }

      return {
        ...state,
        displayProducts: state.displayProducts.concat(
          [...new Array(numberOfLoadingProducts).keys()].map(index => ({
            ...mockProduct(),
            id: timestamp + index,
            category: action.payload.productCategory,
            isLoading: true,
          }))
        ),
      }
    }

    case ProductListActionType.AppendProducts: {
      const newProducts = state.products.concat(action.payload.newProducts)
      return {
        ...state,
        displayProducts: newProducts,
        products: newProducts,
      }
    }

    case ProductListActionType.ResetProducts:
      return initialProductListState

    default:
      return state
  }
}
