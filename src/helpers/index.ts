import { IProductFilters, ProductCategory } from '../types'

export const formatPrice = (rawPrice: number): string => {
  if (Number.isNaN(Number(rawPrice))) return ''

  return `${rawPrice.toLocaleString('vi-VN')} ETH`
}

export const toProductFiltersSearchParams = (productFilters: IProductFilters) =>
  Object.keys(productFilters)
    .reduce<URLSearchParams>((searchParams, filterProp) => {
      const filterValue =
        productFilters[filterProp as keyof typeof productFilters]

      if (filterValue) {
        searchParams.set(filterProp, encodeURIComponent(filterValue.toString()))
      }

      return searchParams
    }, new URLSearchParams())
    .toString()

export const extractProductFilters = (search: string): IProductFilters => {
  const searchParams = new URLSearchParams(search)

  const getSearchParam = (key: keyof IProductFilters) => {
    const rawUrlValue = searchParams.get(key)

    return rawUrlValue ? decodeURIComponent(rawUrlValue) : undefined
  }

  return {
    category:
      (getSearchParam('category') as IProductFilters['category']) ??
      ProductCategory.All,
    theme: getSearchParam('theme') as IProductFilters['theme'],
    tier: getSearchParam('tier') as IProductFilters['tier'],
    search: getSearchParam('search') as IProductFilters['search'],
    timeSort: getSearchParam('timeSort') as IProductFilters['timeSort'],
    priceSort: getSearchParam('priceSort') as IProductFilters['priceSort'],
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
  }
}
