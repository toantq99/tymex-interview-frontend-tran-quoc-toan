import { FC, useState } from 'react'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Tag, Typography } from 'antd'
import classNames from 'classnames'

import AuthorAvatar from '../AuthorAvatar'

import { IProduct } from '../../types'

import './style.scss'

const ProductCard: FC<{ product: IProduct }> = ({ product }) => {
  const [isFav, setIsFav] = useState(false)

  return (
    <Card className="product-card-wrapper" bordered={false}>
      <div
        className={classNames(
          'product-image',
          product.category.split(' ').join('-').toLowerCase()
        )}
      >
        <img
          className="product-thumbnail"
          src={`/assets/images/product-${(product.imageId % 5) + 1}.png`}
        />
        <Tag className="product-category">{product.category}</Tag>
        <Button
          type="link"
          className="product-wishlist-btn"
          icon={isFav ? <HeartFilled /> : <HeartOutlined />}
          onClick={() => setIsFav(fav => !fav)}
        ></Button>
      </div>
      <Flex
        className="product-detail"
        align="flex-start"
        justify="space-between"
        gap={12}
      >
        <Typography.Text ellipsis className="product-name">
          {product.title}
        </Typography.Text>
        <Flex className="product-price" gap={8} align="center">
          <img src="/assets/icons/ethereum.svg" />
          <span>{product.price}</span>
        </Flex>
      </Flex>
      <Flex className="author-detail" align="center" gap={12}>
        <AuthorAvatar author={product.author} />
        <span className="author-name">
          {[product.author?.firstName, product.author?.lastName]
            .filter(Boolean)
            .join(' ')}
        </span>
      </Flex>
    </Card>
  )
}

export default ProductCard
