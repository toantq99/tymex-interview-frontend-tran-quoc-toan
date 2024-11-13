import { FC, useEffect } from 'react'
import { Button, ConfigProvider, Flex, List } from 'antd'

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
  } = useFetchProductList()

  useEffect(() => {
    if (productListHistoryState?.timestamp === 0) return

    if (productListHistoryState?.fetchAction === 'reload') {
      refreshProducts({ query: currentProductListQuery })
    } else {
      intialLoadProducts({ query: currentProductListQuery })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productListHistoryState?.timestamp])

  const loadMoreButton =
    !isLoading && hasMore ? (
      <Flex align="center" justify="center" className="view-more-btn">
        <Button
          type="primary"
          size="large"
          onClick={() => loadMoreProducts({ query: currentProductListQuery })}
        >
          View more
        </Button>
      </Flex>
    ) : null

  return (
    <div className="product-list-wrapper">
      <ConfigProvider
        theme={{
          token: {
            // For skeleton
            colorFillContent: '#ffffff42',
            colorFill: '#ffffff6b',
          },
        }}
      >
        <List
          grid={{
            gutter: [40, 40],
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 4,
          }}
          dataSource={displayProducts}
          loading={isLoading && !displayProducts.length}
          itemLayout="horizontal"
          loadMore={loadMoreButton}
          rowKey="id"
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
