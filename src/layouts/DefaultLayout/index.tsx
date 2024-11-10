import { FC, PropsWithChildren } from 'react'
import { Button, Layout, Space } from 'antd'

import NavigationMenu from '../../components/NavigationMenu'
import RegionSelector from '../../components/RegionSelector'

import './style.scss'

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => (
  <Layout
    className="default-layout-wrapper"
    style={{ backgroundImage: "url('/assets/images/background.png')" }}
  >
    <Layout.Header>
      <NavigationMenu />
      <Space size="large">
        <Button type="primary" size="large">
          Connect Wallet
        </Button>
        <RegionSelector />
      </Space>
    </Layout.Header>
    <Layout.Content>{children}</Layout.Content>
    <Layout.Footer>Footer</Layout.Footer>
  </Layout>
)
export default DefaultLayout
