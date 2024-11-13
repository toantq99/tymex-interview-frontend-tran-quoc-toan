import { FC } from 'react'
import { Button, Grid, Space } from 'antd'
import classNames from 'classnames'

import MobileNavigationMenu from '../MobileNavigationMenu'
import NavigationMenu from '../NavigationMenu'
import RegionSelector from '../RegionSelector'
import TransparentNavbar from '../TransparentNavbar'

import './style.scss'

const DefaultLayoutHeader: FC = () => {
  const { xl } = Grid.useBreakpoint()

  const useMobileHeader = !xl

  return (
    <TransparentNavbar
      className={classNames('default-layout-header-wrapper', {
        useMobileHeader,
      })}
      innerClassName="default-layout-header-wrapper-inner"
    >
      {useMobileHeader ? <MobileNavigationMenu /> : <NavigationMenu />}
      <Space size="large">
        <Button type="primary" size="large">
          Connect Wallet
        </Button>
        <RegionSelector />
      </Space>
    </TransparentNavbar>
  )
}

export default DefaultLayoutHeader
