import { FC, useEffect, useState } from 'react'
import { Col, Row } from 'antd'

import ProductCard from '../../../components/ProductCard'
import axiosInstance from '../../../apis'
import ProductCategories from '../ProductCategories'

import { useProductFilters } from '../../../hooks/useProductFilters'

import { convertProductFiltersToApiRequest } from '../../../helpers'

import { IProduct } from '../../../types'

import './style.scss'

const ProductList: FC = () => {
  const { currentProductFilters, currentProductFiltersTimestamp } =
    useProductFilters()

  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    axiosInstance
      .get<IProduct[]>('/products', {
        params: convertProductFiltersToApiRequest(currentProductFilters),
      })
      .then(res => setProducts(res.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProductFiltersTimestamp])

  return (
    <div className="product-list-wrapper">
      <ProductCategories />
      <Row className="product-list-wrapper-inner" gutter={[40, 40]}>
        {products.map(product => (
          <Col key={product.id} xxl={6} md={8} sm={12}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ProductList
