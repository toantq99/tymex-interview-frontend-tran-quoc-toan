import { FC } from 'react'
import { Button, Layout, Space } from 'antd'

import NavigationMenu from '../NavigationMenu'
import RegionSelector from '../RegionSelector'

import './style.scss'

const DefaultLayoutHeader: FC = () => (
  <Layout.Header className="default-layout-header-wrapper">
    <NavigationMenu />
    <Space size="large">
      <Button type="primary" size="large">
        Connect Wallet
      </Button>
      <RegionSelector />
    </Space>
  </Layout.Header>
)

export default DefaultLayoutHeader
