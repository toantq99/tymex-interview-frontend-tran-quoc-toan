import { FC } from 'react'
import { Button, Grid, Layout, Space } from 'antd'
import classNames from 'classnames'

import MobileNavigationMenu from '../MobileNavigationMenu'
import NavigationMenu from '../NavigationMenu'
import RegionSelector from '../RegionSelector'

import './style.scss'

const DefaultLayoutHeader: FC = () => {
  const { xl } = Grid.useBreakpoint()

  const useMobileHeader = !xl

  return (
    <Layout.Header
      className={classNames('default-layout-header-wrapper', {
        useMobileHeader,
      })}
    >
      {useMobileHeader ? <MobileNavigationMenu /> : <NavigationMenu />}
      <Space size="large">
        <Button type="primary" size="large">
          Connect Wallet
        </Button>
        <RegionSelector />
      </Space>
    </Layout.Header>
  )
}

export default DefaultLayoutHeader
