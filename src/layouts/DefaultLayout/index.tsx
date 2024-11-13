import { FC, PropsWithChildren } from 'react'
import { Layout } from 'antd'

import DefaultLayoutFooter from '../../components/DefaultLayoutFooter'
import DefaultLayoutHeader from '../../components/DefaultLayoutHeader'

import './style.scss'

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => (
  <Layout
    className="default-layout-wrapper"
    style={{ backgroundImage: "url('/assets/images/background.png')" }}
  >
    <DefaultLayoutHeader />
    <Layout.Content>
      {children}
      <img src="/assets/images/footer-frame.png" width="100%" />
    </Layout.Content>
    <DefaultLayoutFooter />
  </Layout>
)
export default DefaultLayout
