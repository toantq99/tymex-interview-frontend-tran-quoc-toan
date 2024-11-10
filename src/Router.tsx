import { FC, lazy, Suspense } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import DefaultLayout from './layouts/DefaultLayout'

const delay = (time?: number) =>
  new Promise(resolve => setTimeout(resolve, time))

const MarketPlace = lazy(() =>
  delay(0).then(() => import('./pages/MarketPlace'))
)

const Router: FC = () => (
  <BrowserRouter>
    <DefaultLayout>
      <Switch>
        <Suspense fallback="..Loading">
          <Route path="/market-place">
            <MarketPlace />
          </Route>
          <Route
            path="/"
            exact
            render={() => <Redirect to="/market-place" />}
          ></Route>
        </Suspense>
      </Switch>
    </DefaultLayout>
  </BrowserRouter>
)

export default Router
