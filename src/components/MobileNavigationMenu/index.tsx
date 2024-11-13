import { FC, useState } from 'react'
import { MenuOutlined } from '@ant-design/icons'
import { Button, Drawer } from 'antd'

import NavigationMenu from '../NavigationMenu'

import './style.scss'

const MobileNavigationMenu: FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <>
      <Button
        className={'toggle-mobile-navigation-menu-btn-wrapper'}
        icon={<MenuOutlined />}
        type="text"
        size="large"
        onClick={() => setOpenDrawer(open => !open)}
      />
      <Drawer
        rootClassName="mobile-navigation-menu-wrapper"
        placement="left"
        width={300}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <NavigationMenu mode="vertical" />
      </Drawer>
    </>
  )
}

export default MobileNavigationMenu
