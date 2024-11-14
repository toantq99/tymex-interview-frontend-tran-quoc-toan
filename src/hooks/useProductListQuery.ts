import { useCallback } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { isEqual } from '../helpers/general'
import {
  composeProductListUrlSearchParams,
  extractProductListQuery,
} from '../helpers/product-list'

import { ProductCategory } from '../enums/product'

import {
  IProductListHistoryState,
  IProductListQuery,
} from '../types/product-list'

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
    updateProductListUrl,
  }
}
