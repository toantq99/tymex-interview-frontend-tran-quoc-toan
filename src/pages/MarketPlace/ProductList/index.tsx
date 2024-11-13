import { FC, useEffect, useRef } from 'react'
import { Button, ConfigProvider, Empty, Flex, List, Typography } from 'antd'
import classNames from 'classnames'

import ProductCard from '../../../components/ProductCard'

import { useFetchProductList } from '../../../hooks/useFetchProductList'
import { useProductListQuery } from '../../../hooks/useProductListQuery'

import './style.scss'

const ProductList: FC = () => {
  const { productListHistoryState, currentProductListQuery } =
    useProductListQuery()

  const {
    isLoading,
    displayProducts,
    hasMore,
    refreshProducts,
    intialLoadProducts,
    loadMoreProducts,
    resetProductList,
  } = useFetchProductList()

  const refreshProductsInterval = useRef<NodeJS.Timer>()

  useEffect(() => {
    // TODO: Better handle concurrent requests
    if (productListHistoryState?.timestamp === 0 || isLoading) return

    if (productListHistoryState?.fetchAction === 'reload') {
      refreshProducts({ query: currentProductListQuery })
    } else {
      intialLoadProducts({ query: currentProductListQuery })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productListHistoryState?.timestamp])

  useEffect(() => {
    if (!isLoading) {
      refreshProductsInterval.current = setInterval(
        () => refreshProducts({ query: currentProductListQuery }),
        60 * 1000
      )
    }

    return () => {
      clearInterval(refreshProductsInterval.current)
      refreshProductsInterval.current = undefined
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  useEffect(() => () => resetProductList(), [resetProductList])

  const loadMoreButton = (
    <Flex align="center" justify="center" className="view-more-btn">
      <Button
        className={classNames({ hidden: !hasMore })}
        type="primary"
        size="large"
        onClick={async () => {
          if (isLoading) return

          const lastProductCard = document?.querySelector(
            '.product-list-wrapper .ant-list .ant-row > div:last-child'
          )

          await loadMoreProducts({ query: currentProductListQuery })

          if (lastProductCard?.nextElementSibling) {
            lastProductCard.nextElementSibling.scrollIntoView({
              behavior: 'smooth',
            })
          }
        }}
      >
        View more
      </Button>
    </Flex>
  )

  return (
    <div className="product-list-wrapper">
      <ConfigProvider
        theme={{
          token: {
            // Invert skeleton color for dark background
            colorFillContent: '#ffffff42',
            colorFill: '#ffffff6b',
          },
        }}
      >
        <List
          grid={{
            gutter: [36, 36],
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 4,
          }}
          dataSource={displayProducts}
          loading={isLoading && !displayProducts.length}
          itemLayout="horizontal"
          loadMore={loadMoreButton}
          rowKey="id"
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <Typography.Title level={4}>No items found</Typography.Title>
                }
              />
            ),
          }}
          renderItem={product => (
            <List.Item>
              <ProductCard product={product} isLoading={product.isLoading} />
            </List.Item>
          )}
        />
      </ConfigProvider>
    </div>
  )
}

export default ProductList
