import { ProductCategory } from '../../enums/product'
import { DISPLAY_CATEGORIES } from '../category'

describe('DISPLAY_CATEGORIES constant', () => {
  it('should have the correct categories and labels', () => {
    DISPLAY_CATEGORIES.forEach(item => {
      expect(Object.values(ProductCategory)).toContain(item.category)

      if (item.category === ProductCategory.All) {
        expect(item.label).toBe('All')
      } else {
        expect(item.label).toBe(item.category)
      }
    })
  })

  it('should contain the correct number of categories', () => {
    expect(DISPLAY_CATEGORIES).toHaveLength(
      Object.values(ProductCategory).length
    )
  })
})
