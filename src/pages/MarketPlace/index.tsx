import { FC } from 'react'
import { Col, Grid, Row } from 'antd'
import classNames from 'classnames'

import MarketPlaceBanner from './MarketPlaceBanner'
import MobileProductFiltersForm from './MobileProductFiltersForm'
import ProductCategories from './ProductCategories'
import ProductFiltersForm from './ProductFiltersForm'
import ProductList from './ProductList'

import './style.scss'

const MarketPlace: FC = () => {
  const { xl } = Grid.useBreakpoint()

  const useMobileForm = !xl

  return (
    <article className={classNames('market-place-wrapper', { useMobileForm })}>
      <MarketPlaceBanner />
      <div className="market-place-wrapper-inner">
        {useMobileForm && <MobileProductFiltersForm />}
        <Row gutter={16}>
          {!useMobileForm && (
            <Col xl={6}>
              <ProductFiltersForm searchOnTyping />
            </Col>
          )}
          <Col xl={18} lg={24}>
            <div className="product-list-result-container">
              {!useMobileForm && <ProductCategories />}
              <ProductList />
            </div>
          </Col>
        </Row>
      </div>
    </article>
  )
}

export default MarketPlace
