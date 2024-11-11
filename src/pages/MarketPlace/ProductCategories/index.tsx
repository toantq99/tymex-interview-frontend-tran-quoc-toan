import { FC } from 'react'
import { Button } from 'antd'

import { ProductCategory } from '../../../types'

import './style.scss'

const categories = [
  ProductCategory.UpperBody,
  ProductCategory.LowerBody,
  ProductCategory.Hat,
  ProductCategory.Shoes,
  ProductCategory.Accessory,
  ProductCategory.Legendary,
  ProductCategory.Mythic,
  ProductCategory.Epic,
  ProductCategory.Rare,
]

const ProductCategories: FC = () => (
  <div className="product-categories-wrapper">
    {['All', ...categories].map(category => {
      const isActive = category === 'All'

      return (
        <Button
          key={category}
          size="large"
          type={isActive ? 'primary' : 'default'}
        >
          {category}
        </Button>
      )
    })}
  </div>
)

export default ProductCategories
