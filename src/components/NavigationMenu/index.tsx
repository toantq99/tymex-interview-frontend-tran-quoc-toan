import { FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Menu } from 'antd'

import { NAVIGATION_ITEMS } from '../../constants/navigation'

import './style.scss'

const NavigationMenu: FC = () => {
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
      ].map(navigationItem => ({
        key: navigationItem.path,
        label: navigationItem.label,
        onClick: () => push(navigationItem.path),
      }))}
    />
  )
}

export default NavigationMenu
