import { useCallback, useReducer } from 'react'

import axiosInstance from '../apis'
import {
  initialProductListState,
  productListReducer,
} from '../reducers/product-list'

import { convertProductListQueryToApiRequest } from '../helpers/product-list'

import { ProductCategory } from '../enums/product'
import { ProductListActionType } from '../enums/product-list'

import { IProduct } from '../types/product'
import { IProductListQuery, IProductListState } from '../types/product-list'

export const useFetchProductList = () => {
  const [productListState, dispatch] = useReducer(
    productListReducer,
    initialProductListState
  )

  const loadProducts = useCallback(
    async ({
      limit,
      offset,
      query,
    }: Pick<IProductListState, 'limit' | 'offset'> & {
      query: IProductListQuery
    }) => {
      dispatch({
        type: ProductListActionType.SetLoading,
        payload: { isLoading: true },
      })

      dispatch({
        type: ProductListActionType.AppendLoadingProducts,
        payload: {
          limit,
          productCategory: query.category ?? ProductCategory.All,
        },
      })

      await axiosInstance
        .get<IProduct[]>('/products', {
          params: convertProductListQueryToApiRequest(query, {
            offset,
            limit,
          }),
        })
        .then(response => {
          dispatch({
            type: ProductListActionType.AppendProducts,
            payload: { newProducts: response.data },
          })

          const totalProducts = Number(response.headers?.['x-total-count'])

          if (!Number.isNaN(totalProducts)) {
            const hasMore =
              response.data?.length === limit && offset + limit < totalProducts

            dispatch({
              type: ProductListActionType.SetTotalProducts,
              payload: { totalProducts },
            })
            dispatch({
              type: ProductListActionType.SetHasMore,
              payload: { hasMore },
            })
          } else {
            dispatch({
              type: ProductListActionType.SetTotalProducts,
              payload: { totalProducts: 0 },
            })
            dispatch({
              type: ProductListActionType.SetHasMore,
              payload: { hasMore: false },
            })
          }
        })
        .catch(() => {
          dispatch({
            type: ProductListActionType.AppendProducts,
            payload: { newProducts: [] },
          })

          dispatch({
            type: ProductListActionType.SetHasMore,
            payload: { hasMore: false },
          })
        })
        .finally(() =>
          dispatch({
            type: ProductListActionType.SetLoading,
            payload: { isLoading: false },
          })
        )
    },
    []
  )

  const intialLoadProducts = useCallback(
    ({ query }: { query: IProductListQuery }) => {
      dispatch({ type: ProductListActionType.ResetProducts })

      return loadProducts({
        limit: productListState.limit,
        offset: initialProductListState.offset,
        query,
      })
    },
    [loadProducts, productListState.limit]
  )

  const loadMoreProducts = useCallback(
    ({ query }: { query: IProductListQuery }) => {
      const newOffset = productListState.offset + productListState.limit

      dispatch({
        type: ProductListActionType.SetOffset,
        payload: {
          offset: newOffset,
        },
      })

      return loadProducts({
        limit: productListState.limit,
        offset: newOffset,
        query,
      })
    },
    [loadProducts, productListState.limit, productListState.offset]
  )

  const refreshProducts = useCallback(
    async ({ query }: { query: IProductListQuery }) => {
      if (!productListState.products.length) {
        return intialLoadProducts({ query })
      }

      dispatch({ type: ProductListActionType.ResetProducts })

      const currentOffset = productListState.offset

      await loadProducts({
        limit: productListState.products.length,
        offset: initialProductListState.offset,
        query,
      })

      dispatch({
        type: ProductListActionType.SetOffset,
        payload: {
          offset: currentOffset,
        },
      })
    },
    [
      intialLoadProducts,
      loadProducts,
      productListState.offset,
      productListState.products.length,
    ]
  )

  return {
    ...productListState,
    intialLoadProducts,
    refreshProducts,
    loadMoreProducts,
  }
}
