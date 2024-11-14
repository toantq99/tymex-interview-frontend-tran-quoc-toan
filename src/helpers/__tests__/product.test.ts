import { mockProduct } from '../product'

import { ProductCategory, ProductTheme, ProductTier } from '../../enums/product'

describe('mockProduct', () => {
  it('should return a product object with the expected default values', () => {
    const product = mockProduct()

    // Check basic properties
    expect(product).toEqual({
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
  })
})
