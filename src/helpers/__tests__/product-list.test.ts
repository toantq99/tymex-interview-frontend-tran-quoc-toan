/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  composeProductListUrlSearchParams,
  convertProductListQueryToApiRequest,
  extractProductListQuery,
} from '../product-list'

import { SortType } from '../../enums/general'
import { ProductCategory, ProductTheme, ProductTier } from '../../enums/product'

describe('composeProductListUrlSearchParams function', () => {
  it('should correctly compose URL search params for filters, sorters, and category', () => {
    expect(
      composeProductListUrlSearchParams({
        filters: {
          theme: ProductTheme.Light,
          tier: ProductTier.Basic,
          search: 'abc',
          priceRange: [500, 1500],
        },
        sorters: {
          timeSort: SortType.Ascending,
          priceSort: SortType.Descending,
        },
        category: ProductCategory.Accessory,
      })
    ).toBe(
      'theme=Light&tier=Basic&search=abc&priceRange=500%2C1500&timeSort=asc&priceSort=desc&category=Accessory'
    )
  })

  it('should return an empty string when no filters, sorters, or category are provided', () => {
    expect(
      composeProductListUrlSearchParams({
        filters: {},
        sorters: {},
        category: ProductCategory.All,
      })
    ).toBe('')

    expect(
      composeProductListUrlSearchParams({
        filters: null as any,
        sorters: null as any,
        category: null as any,
      })
    ).toBe('')

    expect(composeProductListUrlSearchParams({} as any)).toBe('')
  })

  it('should not include undefined values in the URL', () => {
    const query = {
      filters: {
        theme: ProductTheme.Dark,
        tier: undefined,
        search: '',
        priceRange: undefined,
      },
      sorters: {
        timeSort: undefined,
        priceSort: undefined,
      },
      category: ProductCategory.All,
    }

    const result = composeProductListUrlSearchParams(query)
    expect(result).toBe('theme=Dark')
  })

  it('should correctly handle array values', () => {
    const query = {
      filters: {
        theme: undefined,
        price: [0.3, 100.25],
      },
      sorters: {},
      category: ProductCategory.All,
    }

    const result = composeProductListUrlSearchParams(query)
    expect(result).toBe('price=0.3%2C100.25')
  })
})

describe('extractProductListQuery function', () => {
  it('should correctly extract filters, sorters, and category from the search query', () => {
    const search =
      'theme=Halloween&tier=Deluxe&search=metal&priceRange=500%2C1500&timeSort=asc&priceSort=desc&category=Hat'
    const result = extractProductListQuery(search)

    expect(result.filters).toEqual({
      theme: ProductTheme.Halloween,
      tier: ProductTier.Deluxe,
      search: 'metal',
      priceRange: [500, 1500],
    })
    expect(result.sorters).toEqual({
      timeSort: SortType.Ascending,
      priceSort: SortType.Descending,
    })
    expect(result.category).toBe(ProductCategory.Hat)
  })

  it('should handle missing query parameters gracefully', () => {
    const search = ''
    const result = extractProductListQuery(search)

    expect(result.filters).toEqual({
      theme: undefined,
      tier: undefined,
      search: undefined,
      priceRange: undefined,
    })
    expect(result.sorters).toEqual({
      timeSort: undefined,
      priceSort: undefined,
    })
    expect(result.category).toBe(ProductCategory.All)
  })

  it('should parse priceRange correctly when it has a valid value', () => {
    const search = 'priceRange=1000%2C2000'
    const result = extractProductListQuery(search)

    expect(result.filters?.priceRange).toEqual([1000, 2000])
  })

  it('should return undefined for priceRange when it is invalid', () => {
    const search = 'priceRange=invalid'
    const result = extractProductListQuery(search)

    expect(result.filters?.priceRange).toBeUndefined()
  })
})

describe('convertProductListQueryToApiRequest function', () => {
  it('should correctly convert a query object with filters, sorters, and category to API request format', () => {
    const query = {
      filters: {
        theme: ProductTheme.Halloween,
        tier: ProductTier.Premium,
        search: 'metal',
        priceRange: [500, 1500],
      },
      sorters: {
        timeSort: SortType.Ascending,
        priceSort: SortType.Descending,
      },
      category: ProductCategory.Mythic,
    }

    const pagination = { offset: 0, limit: 24 }
    const result = convertProductListQueryToApiRequest(query, pagination)

    expect(result).toEqual({
      category: ProductCategory.Mythic,
      theme: ProductTheme.Halloween,
      tier: ProductTier.Premium,
      q: 'metal',
      price_gte: 500,
      price_lte: 1500,
      _sort: 'createdAt,price',
      _order: 'asc,desc',
      _start: 0,
      _limit: 24,
    })
  })

  it('should exclude undefined filters and sorters from the API request', () => {
    const query = {
      filters: {
        theme: ProductTheme.Colorful,
        tier: undefined,
        search: undefined,
        priceRange: undefined,
      },
      sorters: {
        timeSort: undefined,
        priceSort: undefined,
      },
      category: ProductCategory.All,
    }

    const pagination = { offset: 0, limit: 24 }
    const result = convertProductListQueryToApiRequest(query, pagination)

    expect(result).toEqual({
      theme: ProductTheme.Colorful,
      _start: 0,
      _limit: 24,
    })
  })

  it('should use default pagination when not provided', () => {
    const query = {
      filters: {
        theme: ProductTheme.Colorful,
        tier: undefined,
        search: undefined,
        priceRange: undefined,
      },
      sorters: {
        timeSort: undefined,
        priceSort: undefined,
      },
      category: ProductCategory.All,
    }

    const result = convertProductListQueryToApiRequest(query, {} as any)

    expect(result).toEqual({
      theme: ProductTheme.Colorful,
      _start: 0,
      _limit: 24,
    })
  })
})
