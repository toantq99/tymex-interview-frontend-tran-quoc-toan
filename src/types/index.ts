/* eslint-disable no-unused-vars */
// TODO: Fix eslint

export enum ProductTier {
  Basic = 'Basic',
  Premium = 'Premium',
  Deluxe = 'Deluxe',
}

export enum ProductTheme {
  Dark = 'Dark',
  Light = 'Light',
  Colorful = 'Colorful',
  Halloween = 'Halloween',
}

export enum ProductCategory {
  All = '',
  UpperBody = 'Upper Body',
  LowerBody = 'Lower Body',
  Hat = 'Hat',
  Shoes = 'Shoes',
  Accessory = 'Accessory',
  Legendary = 'Legendary',
  Mythic = 'Mythic',
  Epic = 'Epic',
  Rare = 'Rare',
}

export interface IProduct {
  id: number
  title: string
  category: ProductCategory
  price: number
  isFavorite: boolean
  createdAt: number
  theme: ProductTheme
  tier: ProductTier
  imageId: number // 1 -> 20 (integer)
  author: IAuthor
}

export interface IAuthor {
  firstName: string
  lastName: string
  email: string
  gender: string
  avatar: string
  onlineStatus: string
}

export interface IProductListFilters
  extends Partial<Pick<IProduct, 'theme' | 'tier'>> {
  search?: string
  priceRange?: number[]
}

export enum SortType {
  Ascending = 'asc',
  Descending = 'desc',
}

export interface IProductListSorters {
  timeSort?: SortType
  priceSort?: SortType
}

export interface IProductListQuery {
  filters: IProductListFilters
  sorters: IProductListSorters
  category: ProductCategory
}

export interface IProductListState {
  products: IProduct[]
  displayProducts: (IProduct & { isLoading?: boolean })[]
  hasMore: boolean
  isLoading: boolean
  offset: number
  limit: number
  totalProducts: number
}

export enum ProductListActionType {
  SetLoading,
  SetOffset,
  SetLimit,
  SetHasMore,
  SetTotalProducts,
  AppendLoadingProducts,
  AppendProducts,
  ResetProducts,
}

export type IProductListAction =
  | {
      type: ProductListActionType.ResetProducts
    }
  | {
      type: ProductListActionType.SetLoading
      payload: { isLoading: boolean }
    }
  | {
      type: ProductListActionType.SetLimit
      payload: { limit: number }
    }
  | {
      type: ProductListActionType.SetOffset
      payload: { offset: number }
    }
  | {
      type: ProductListActionType.SetHasMore
      payload: { hasMore: boolean }
    }
  | {
      type: ProductListActionType.SetTotalProducts
      payload: { totalProducts: number }
    }
  | {
      type: ProductListActionType.AppendLoadingProducts
      payload: { limit: number; productCategory: ProductCategory }
    }
  | {
      type: ProductListActionType.AppendProducts
      payload: { newProducts: IProduct[] }
    }

export interface IProductListHistoryState {
  timestamp?: number
  fetchAction?: 'reload' | 'initialize'
}
