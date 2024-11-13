import { IProduct } from './product'

import { SortType } from '../enums/general'
import { ProductCategory } from '../enums/product'
import { ProductListActionType } from '../enums/product-list'

export interface IProductListFilters
  extends Partial<Pick<IProduct, 'theme' | 'tier'>> {
  search?: string
  priceRange?: number[]
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

export interface IProductListHistoryState {
  timestamp?: number
  fetchAction?: 'reload' | 'initialize'
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
