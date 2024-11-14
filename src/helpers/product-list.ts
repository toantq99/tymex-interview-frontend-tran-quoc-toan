import { ProductCategory } from '../enums/product'

import {
  IProductListFilters,
  IProductListQuery,
  IProductListSorters,
} from '../types/product-list'

export const composeProductListUrlSearchParams = ({
  filters,
  sorters,
  category,
}: IProductListQuery) => {
  const flatQuery = { ...(filters || {}), ...(sorters || {}), category }

  return Object.keys(flatQuery)
    .reduce<URLSearchParams>((searchParams, queryProp) => {
      const queryValue = flatQuery[queryProp as keyof typeof flatQuery]

      if (queryValue) {
        searchParams.set(queryProp, queryValue.toString())
      }

      return searchParams
    }, new URLSearchParams())
    .toString()
}

export const extractProductListQuery = (search: string): IProductListQuery => {
  const searchParams = new URLSearchParams(search)

  const getSearchParam = (key: string) => {
    const rawUrlValue = searchParams.get(key)

    return rawUrlValue ?? undefined
  }

  return {
    filters: {
      theme: getSearchParam('theme') as IProductListFilters['theme'],
      tier: getSearchParam('tier') as IProductListFilters['tier'],
      search: getSearchParam('search') as IProductListFilters['search'],
      priceRange: (() => {
        const range = getSearchParam('priceRange')

        if (range) {
          const [min, max] = range.split(',')

          if (Number(min) && Number(max)) {
            return [Number(min), Number(max)]
          }
        }

        return undefined
      })(),
    },
    sorters: {
      timeSort: getSearchParam('timeSort') as IProductListSorters['timeSort'],
      priceSort: getSearchParam(
        'priceSort'
      ) as IProductListSorters['priceSort'],
    },
    category:
      (getSearchParam('category') as ProductCategory) ?? ProductCategory.All,
  }
}

export const convertProductListQueryToApiRequest = (
  { filters, sorters, category }: IProductListQuery,
  pagination: {
    offset: number
    limit: number
  }
) => ({
  ...(category && { category }),
  ...(filters.theme && { theme: filters.theme }),
  ...(filters.tier && { tier: filters.tier }),
  ...(filters.search && { q: filters.search }),
  ...(filters.priceRange && {
    price_gte: filters.priceRange[0],
    price_lte: filters.priceRange[1],
  }),
  ...((sorters.priceSort || sorters.timeSort) && {
    _sort: [sorters.timeSort && 'createdAt', sorters.priceSort && 'price']
      .filter(Boolean)
      .toString(),
    _order: [sorters.timeSort, sorters.priceSort].filter(Boolean).toString(),
  }),
  _start: pagination.offset ?? 0,
  _limit: pagination.limit ?? 24,
})
