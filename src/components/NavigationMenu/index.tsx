import { FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Menu, MenuProps } from 'antd'
import { MenuItemType } from 'antd/es/menu/interface'

import { NAVIGATION_ITEMS } from '../../constants/navigation'

import './style.scss'

const NavigationMenu: FC<
  MenuProps & { onItemClick?: MenuItemType['onClick'] }
> = ({ onItemClick, ...props }) => {
  const { pathname } = useLocation()
  const { push } = useHistory()

  return (
    <Menu
      className="navigation-menu-wrapper"
      theme="dark"
      mode="horizontal"
      selectedKeys={[pathname]}
      items={[
        NAVIGATION_ITEMS.HOME,
        NAVIGATION_ITEMS.ABOUT_US,
        NAVIGATION_ITEMS.OUR_TEAMS,
        NAVIGATION_ITEMS.MARKETPLACE,
        NAVIGATION_ITEMS.ROADMAP,
        NAVIGATION_ITEMS.WHITEPAPER,
      ].map<MenuItemType>(navigationItem => ({
        key: navigationItem.path,
        label: navigationItem.label,
        onClick: menu => {
          push(navigationItem.path)
          onItemClick?.(menu)
        },
      }))}
      {...props}
    />
  )
}

export default NavigationMenu
