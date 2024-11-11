import { createContext } from 'react'

import { IProduct } from '../types'

export const ProductsContext = createContext<{
  products: IProduct[]
  hasMore: boolean
  skip: number
  take: number
}>({
  products: [],
  hasMore: false,
  skip: 0,
  take: 20,
})
