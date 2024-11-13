import { FC, ReactNode } from 'react'
import { Button } from 'antd'

import { useProductListQuery } from '../../../hooks/useProductListQuery'

import { ProductCategory } from '../../../enums/product'

import './style.scss'

const displayCategories: { label: ReactNode; category: ProductCategory }[] = [
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

const ProductCategories: FC = () => {
  const { updateCategory, currentCategory } = useProductListQuery()

  return (
    <div className="product-categories-wrapper">
      {displayCategories.map(({ label, category }) => (
        <Button
          key={category}
          size="large"
          type={currentCategory === category ? 'primary' : 'default'}
          onClick={() => updateCategory(category)}
        >
          {label}
        </Button>
      ))}
    </div>
  )
}

export default ProductCategories
