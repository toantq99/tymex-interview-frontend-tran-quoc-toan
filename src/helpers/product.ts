import { ProductCategory, ProductTheme, ProductTier } from '../enums/product'

import { IProduct } from '../types/product'

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
