import { FC } from 'react'
import { Col, Row } from 'antd'
import classNames from 'classnames'

import MarketPlaceBanner from './MarketPlaceBanner'
import MobileProductFiltersForm from './MobileProductFiltersForm'
import ProductCategories from './ProductCategories'
import ProductFiltersForm from './ProductFiltersForm'
import ProductList from './ProductList'

import './style.scss'
import { useBreakpoint } from '../../hooks/useBreakpoint'

const MarketPlace: FC = () => {
  const { isCollapsed } = useBreakpoint()

  return (
    <article className={classNames('market-place-wrapper', { isCollapsed })}>
      <MarketPlaceBanner />
      <div className="market-place-wrapper-inner">
        {isCollapsed && <MobileProductFiltersForm />}
        <Row gutter={16}>
          {!isCollapsed && (
            <Col xl={6}>
              <ProductFiltersForm searchOnTyping />
            </Col>
          )}
          <Col xl={18} lg={24}>
            <div className="product-list-result-container">
              {!isCollapsed && <ProductCategories />}
              <ProductList />
            </div>
          </Col>
        </Row>
      </div>
    </article>
  )
}

export default MarketPlace
