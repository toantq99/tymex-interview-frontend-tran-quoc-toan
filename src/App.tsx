import { FC } from 'react'
import { ConfigProvider } from 'antd'

import Router from './Router'

const App: FC = () => (
  <ConfigProvider
    theme={{
      token: {
        fontFamily: 'Inter, sans-serif',
        borderRadius: 4,
        colorPrimary: '#da458f',
        colorText: '#fff',
      },
    }}
  >
    <Router />
  </ConfigProvider>
)

export default App
