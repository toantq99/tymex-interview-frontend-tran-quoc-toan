import { useHistory, useLocation } from 'react-router-dom'

import { extractProductFilters, toProductFiltersSearchParams } from '../helpers'

import { IProductFilters } from '../types'

export const useProductFilters = () => {
  const { search, state } = useLocation<{ t: number }>()
  const { push } = useHistory()

  const currentProductFilters = extractProductFilters(search)

  const currentProductFiltersTimestamp = state?.t

  const updateFilters = (productFilters: IProductFilters) =>
    push({
      search: toProductFiltersSearchParams(productFilters),
      state: { t: Date.now() },
    })

  const resetFilters = () =>
    push({
      search: toProductFiltersSearchParams({
        category: currentProductFilters?.category,
      }),
      state: { t: Date.now() },
    })

  return {
    currentProductFilters,
    currentProductFiltersTimestamp,
    updateFilters,
    resetFilters,
  }
}
