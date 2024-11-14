import { FC } from 'react'
import { Button, Flex } from 'antd'
import classNames from 'classnames'

import { useProductListQuery } from '../../../hooks/useProductListQuery'

import { DISPLAY_CATEGORIES } from '../../../constants/category'

import './style.scss'

const ProductCategories: FC = () => {
  const { updateCategory, currentCategory } = useProductListQuery()

  return (
    <div className={classNames('product-categories-wrapper')}>
      <Flex className="product-categories-wrapper-inner" gap={20} wrap>
        {DISPLAY_CATEGORIES.map(({ label, category }) => (
          <Button
            key={category}
            size={'large'}
            type={currentCategory === category ? 'primary' : 'default'}
            onClick={() => updateCategory(category)}
          >
            {label}
          </Button>
        ))}
      </Flex>
    </div>
  )
}

export default ProductCategories
