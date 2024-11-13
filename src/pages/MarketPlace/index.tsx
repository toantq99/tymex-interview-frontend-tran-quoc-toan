import { FC } from 'react'

import MarketPlaceBanner from './MarketPlaceBanner'
import ProductCategories from './ProductCategories'
import ProductFiltersForm from './ProductFiltersForm'
import ProductList from './ProductList'

import './style.scss'

const MarketPlace: FC = () => (
  <article className="market-place-wrapper">
    <MarketPlaceBanner />
    <div className="market-place-wrapper-inner">
      <ProductFiltersForm />
      <div className="product-list-result-container">
        <ProductCategories />
        <ProductList />
      </div>
    </div>
  </article>
)

export default MarketPlace
