import { FC, lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PageLoader from './components/PageLoader'
import NotFound from './pages/NotFound'

import DefaultLayout from './layouts/DefaultLayout'

import { NAVIGATION_ITEMS } from './constants/navigation'
import { delay } from './helpers/general'

const MarketPlace = lazy(() =>
  delay(1000).then(() => import('./pages/MarketPlace'))
)

const Router: FC = () => (
  <BrowserRouter>
    <DefaultLayout>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path={NAVIGATION_ITEMS.MARKETPLACE.path}>
            <MarketPlace />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </DefaultLayout>
  </BrowserRouter>
)

export default Router
