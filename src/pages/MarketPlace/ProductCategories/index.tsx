import { FC, ReactNode } from 'react'
import { Button } from 'antd'

import { useProductFilters } from '../../../hooks/useProductFilters'

import { ProductCategory } from '../../../types'

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
  const { updateFilters, currentProductFilters } = useProductFilters()

  return (
    <div className="product-categories-wrapper">
      {displayCategories.map(({ label, category }) => {
        const isActive = currentProductFilters?.category === category

        return (
          <Button
            key={category}
            size="large"
            type={isActive ? 'primary' : 'default'}
            onClick={() =>
              updateFilters({
                ...currentProductFilters,
                category,
              })
            }
          >
            {label}
          </Button>
        )
      })}
    </div>
  )
}

export default ProductCategories
