import { FC } from 'react'

import MarketPlaceBanner from './MarketPlaceBanner'
import ProductFilters from './ProductFilters'
import ProductList from './ProductList'

import './style.scss'

const MarketPlace: FC = () => (
  <article className="market-place-wrapper">
    <MarketPlaceBanner />
    <div className="market-place-wrapper-inner">
      <ProductFilters />
      <ProductList />
    </div>
  </article>
)

export default MarketPlace
