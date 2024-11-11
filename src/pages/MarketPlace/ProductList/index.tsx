import { FC, useEffect, useState } from 'react'
import { Col, Row } from 'antd'

import ProductCard from '../../../components/ProductCard'
import ProductCategories from '../ProductCategories'

import { IProduct } from '../../../types'

import './style.scss'

const ProductList: FC = () => {
  const [products, setproducts] = useState<IProduct[]>([])

  useEffect(() => {
    fetch('http://localhost:5005/products?_page=1')
      .then(res => res.json())
      .then(setproducts)
  }, [])

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
