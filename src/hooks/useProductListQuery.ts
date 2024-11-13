import { useCallback } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import {
  composeProductListUrlSearchParams,
  extractProductListQuery,
  isEqual,
} from '../helpers'

import {
  IProductListHistoryState,
  IProductListQuery,
  ProductCategory,
} from '../types'

export const useProductListQuery = () => {
  const { search, state: productListHistoryState } =
    useLocation<IProductListHistoryState>()

  const { push } = useHistory<IProductListHistoryState>()

  const currentProductListQuery = extractProductListQuery(search)

  const {
    filters: currentFilters,
    sorters: currentSorters,
    category: currentCategory,
  } = currentProductListQuery

  const updateProductListUrl = useCallback(
    ({
      query,
      fetchAction,
    }: {
      query: IProductListQuery
      fetchAction?: IProductListHistoryState['fetchAction']
    }) =>
      push({
        search: composeProductListUrlSearchParams(query),
        state: {
          timestamp: fetchAction ? Date.now() : 0,
          fetchAction,
        },
      }),
    [push]
  )

  const updateFiltersAndSorters = useCallback(
    ({ filters, sorters }: Pick<IProductListQuery, 'filters' | 'sorters'>) => {
      const isFiltersChanged = !isEqual(currentFilters, filters)

      return updateProductListUrl({
        query: {
          ...currentProductListQuery,
          filters,
          sorters,
        },
        fetchAction: isFiltersChanged ? 'initialize' : 'reload',
      })
    },
    [currentFilters, currentProductListQuery, updateProductListUrl]
  )

  const resetFiltersAndSorters = useCallback(
    () =>
      updateFiltersAndSorters({
        filters: {},
        sorters: {},
      }),
    [updateFiltersAndSorters]
  )

  const updateCategory = useCallback(
    (category: ProductCategory) =>
      updateProductListUrl({
        query: {
          ...currentProductListQuery,
          category,
        },
        fetchAction: 'initialize',
      }),
    [currentProductListQuery, updateProductListUrl]
  )

  return {
    currentProductListQuery,
    currentFilters,
    currentSorters,
    currentCategory,
    productListHistoryState,
    updateFiltersAndSorters,
    resetFiltersAndSorters,
    updateCategory,
  }
}
