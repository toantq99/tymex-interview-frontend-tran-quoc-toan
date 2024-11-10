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
