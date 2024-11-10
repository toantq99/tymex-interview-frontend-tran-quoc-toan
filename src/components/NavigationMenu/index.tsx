import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu } from 'antd'

import './style.scss'

const NavigationMenu: FC = () => {
  const { pathname } = useLocation()

  return (
    <Menu
      className="navigation-menu-wrapper"
      theme="dark"
      mode="horizontal"
      selectedKeys={[pathname]}
      items={[
        {
          key: '/',
          label: 'Home',
        },
        {
          key: '/about-us',
          label: 'About Us',
        },
        {
          key: '/our-teams',
          label: 'Our Teams',
        },
        {
          key: '/market-place',
          label: 'MarketPlace',
        },
        {
          key: '/roadmap',
          label: 'RoadMap',
        },
        {
          key: '/whitepaper',
          label: 'WhitePaper',
        },
      ]}
    />
  )
}

export default NavigationMenu
