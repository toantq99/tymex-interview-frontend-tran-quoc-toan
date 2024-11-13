import {
  IProduct,
  IProductListFilters,
  IProductListQuery,
  IProductListSorters,
  ProductCategory,
  ProductTheme,
  ProductTier,
} from '../types'

export const delay = (timeout?: number) =>
  new Promise(resolve => setTimeout(resolve, timeout))

export const formatPrice = (rawPrice: number): string => {
  if (Number.isNaN(Number(rawPrice))) return ''

  return `${rawPrice.toLocaleString('vi-VN')} ETH`
}

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
        searchParams.set(queryProp, encodeURIComponent(queryValue.toString()))
      }

      return searchParams
    }, new URLSearchParams())
    .toString()
}

export const extractProductListQuery = (search: string): IProductListQuery => {
  const searchParams = new URLSearchParams(search)

  const getSearchParam = (key: string) => {
    const rawUrlValue = searchParams.get(key)

    return rawUrlValue ? decodeURIComponent(rawUrlValue) : undefined
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

export const mockProduct = (): IProduct => ({
  id: 0,
  title: '',
  category: ProductCategory.All,
  price: 0,
  isFavorite: false,
  createdAt: 0,
  theme: ProductTheme.Colorful,
  tier: ProductTier.Basic,
  imageId: 0,
  author: {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    avatar: '',
    onlineStatus: '',
  },
})

export const isEqual = <T extends object>(obj1: T, obj2: T) => {
  // Check properties in obj1
  for (const key in obj1) {
    if (Object.hasOwn(obj1, key)) {
      if (Object.hasOwn(obj2, key)) {
        // If values are different
        if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
          return false
        }
      } else {
        // Property exists in obj1 but not in obj2
        return false
      }
    }
  }

  // Check properties in obj2 that are not in obj1
  for (const key in obj2) {
    if (Object.hasOwn(obj2, key) && !Object.hasOwn(obj1, key)) {
      return false
    }
  }

  return true
}
