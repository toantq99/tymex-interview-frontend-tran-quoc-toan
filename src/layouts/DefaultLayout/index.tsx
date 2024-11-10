import { FC, PropsWithChildren } from 'react'
import { Layout, Space } from 'antd'

import NavigationMenu from '../../components/NavigationMenu'
import PrimaryButton from '../../components/PrimaryButton'
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
        <PrimaryButton>Connect Wallet</PrimaryButton>
        <RegionSelector />
      </Space>
    </Layout.Header>
    <Layout.Content>{children}</Layout.Content>
    <Layout.Footer>Footer</Layout.Footer>
  </Layout>
)
export default DefaultLayout
