import { FC, lazy, Suspense } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import DefaultLayout from './layouts/DefaultLayout'

import { NAVIGATION_ITEMS } from './constants/navigation'

import { delay } from './helpers/general'

const MarketPlace = lazy(() =>
  delay(0).then(() => import('./pages/MarketPlace'))
)

const Router: FC = () => (
  <BrowserRouter>
    <DefaultLayout>
      <Switch>
        <Suspense fallback="..Loading">
          <Route path={NAVIGATION_ITEMS.MARKETPLACE.path}>
            <MarketPlace />
          </Route>
          <Route
            path="/"
            exact
            render={() => <Redirect to="/market-place" />}
          />
        </Suspense>
      </Switch>
    </DefaultLayout>
  </BrowserRouter>
)

export default Router
