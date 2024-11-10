import { FC } from 'react'
import { ConfigProvider } from 'antd'

import Router from './Router'

const App: FC = () => (
  <ConfigProvider
    theme={{
      token: {
        fontFamily: 'Inter, sans-serif',
      },
    }}
  >
    <Router />
  </ConfigProvider>
)

export default App
