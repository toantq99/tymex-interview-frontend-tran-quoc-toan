import { ReactNode } from 'react'

import { ProductCategory } from '../enums/product'

export const DISPLAY_CATEGORIES: {
  label: ReactNode
  category: ProductCategory
}[] = [
  ProductCategory.All,
  ProductCategory.UpperBody,
  ProductCategory.LowerBody,
  ProductCategory.Hat,
  ProductCategory.Shoes,
  ProductCategory.Accessory,
  ProductCategory.Legendary,
  ProductCategory.Mythic,
  ProductCategory.Epic,
  ProductCategory.Rare,
].map(category => ({
  category,
  label: category === ProductCategory.All ? 'All' : category,
}))
