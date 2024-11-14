import { FC } from 'react'
import { Button, Space } from 'antd'
import classNames from 'classnames'

import MobileNavigationMenu from '../MobileNavigationMenu'
import NavigationMenu from '../NavigationMenu'
import RegionSelector from '../RegionSelector'
import TransparentNavbar from '../TransparentNavbar'

import './style.scss'
import { useBreakpoint } from '../../hooks/useBreakpoint'

const DefaultLayoutHeader: FC = () => {
  const { isCollapsed } = useBreakpoint()

  return (
    <TransparentNavbar
      className={classNames('default-layout-header-wrapper', {
        isCollapsed,
      })}
      innerClassName="default-layout-header-wrapper-inner"
    >
      {isCollapsed ? <MobileNavigationMenu /> : <NavigationMenu />}
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
