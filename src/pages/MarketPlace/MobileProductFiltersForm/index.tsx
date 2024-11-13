import { FC, useState } from 'react'
import { FilterOutlined } from '@ant-design/icons'
import { Button, Drawer, Typography } from 'antd'

import TransparentNavbar from '../../../components/TransparentNavbar'
import ProductFiltersForm from '../ProductFiltersForm'

import './style.scss'

const MobileProductFiltersForm: FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <>
      <TransparentNavbar
        className={'mobile-product-filters-form-navbar-wrapper'}
        innerClassName="mobile-product-filters-form-navbar-wrapper-inner"
      >
        <Button
          icon={<FilterOutlined />}
          ghost
          onClick={() => setOpenDrawer(open => !open)}
          className="toggle-mobile-product-filters-form-wrapper"
        >
          Filter & Sort by
        </Button>
      </TransparentNavbar>
      <Drawer
        rootClassName="mobile-product-filters-form-drawer-wrapper"
        placement="left"
        width={'100%'}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title={<Typography.Title level={3}>Filter & Sort by</Typography.Title>}
      >
        <ProductFiltersForm closeDrawer={() => setOpenDrawer(false)} />
      </Drawer>
    </>
  )
}

export default MobileProductFiltersForm
