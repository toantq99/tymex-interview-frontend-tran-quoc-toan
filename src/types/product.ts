import { ProductCategory, ProductTheme, ProductTier } from '../enums/product'

export interface IProduct {
  id: number
  title: string
  category: ProductCategory
  price: number
  isFavorite: boolean
  createdAt: number
  theme: ProductTheme
  tier: ProductTier
  imageId: number
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
