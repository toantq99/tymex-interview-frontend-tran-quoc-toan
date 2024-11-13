import { FC, useEffect, useState } from 'react'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Skeleton, Tag, Typography } from 'antd'
import classNames from 'classnames'

import AuthorAvatar from '../AuthorAvatar'

import { formatPrice } from '../../helpers'

import { IProduct } from '../../types'

import './style.scss'

const getThumbnailUrl = (imageId: number) =>
  `/assets/images/product-${(imageId % 5) + 1}.png`

const ProductCard: FC<{ product: IProduct; isLoading?: boolean }> = ({
  product,
  isLoading,
}) => {
  const [isFav, setIsFav] = useState(product.isFavorite)

  useEffect(() => {
    setIsFav(product.isFavorite)
  }, [product.isFavorite])

  return (
    <Card className="product-card-wrapper" bordered={false}>
      <div
        className={classNames(
          'product-image-container',
          product.category.split(' ').join('-').toLowerCase()
        )}
      >
        {isLoading ? (
          <Skeleton.Image
            active
            rootClassName="product-thumbnail product-thumbnail-skeleton"
          />
        ) : (
          <>
            <img
              className="product-thumbnail product-thumbnail-image"
              loading="lazy"
              src={getThumbnailUrl(product.imageId)}
            />
            <Tag className="product-category">{product.category}</Tag>
            <Button
              type="link"
              className="product-wishlist-btn"
              icon={isFav ? <HeartFilled /> : <HeartOutlined />}
              onClick={() => setIsFav(fav => !fav)}
            />
          </>
        )}
      </div>
      <Flex
        className="product-detail"
        align="flex-start"
        justify="space-between"
        gap={12}
      >
        <Skeleton title paragraph={false} active loading={isLoading}>
          <Typography.Text ellipsis className="product-name">
            {product.title}
          </Typography.Text>
        </Skeleton>
        <Skeleton title paragraph={false} active loading={isLoading}>
          <Flex className="product-price" gap={8} align="center">
            <img src="/assets/icons/ethereum.svg" />
            <span>{formatPrice(product.price)}</span>
          </Flex>
        </Skeleton>
      </Flex>
      <Flex className="author-detail" align="center" gap={12}>
        {isLoading ? (
          <Skeleton.Avatar size={32} active />
        ) : (
          <AuthorAvatar author={product.author} />
        )}
        <Skeleton title paragraph={false} active loading={isLoading}>
          <span className="author-name">
            {[product.author?.firstName, product.author?.lastName]
              .filter(Boolean)
              .join(' ')}
          </span>
        </Skeleton>
      </Flex>
    </Card>
  )
}

export default ProductCard
