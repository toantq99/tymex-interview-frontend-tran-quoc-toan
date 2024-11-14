import { FC, useState } from 'react'
import { FilterOutlined } from '@ant-design/icons'
import { Button, Drawer, Select, Space, Typography } from 'antd'

import InvertColorConfigProvider from '../../../components/InvertColorConfigProvider'
import TransparentNavbar from '../../../components/TransparentNavbar'
import ProductFiltersForm from '../ProductFiltersForm'

import { useProductListQuery } from '../../../hooks/useProductListQuery'

import { DISPLAY_CATEGORIES } from '../../../constants/category'

import './style.scss'

const MobileProductFiltersForm: FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const { updateCategory, currentCategory } = useProductListQuery()

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
        <InvertColorConfigProvider>
          <Space>
            <Typography.Text strong>Category</Typography.Text>
            <Select
              className="product-categories-select"
              options={DISPLAY_CATEGORIES.map(({ label, category }) => ({
                label,
                value: category,
              }))}
              value={currentCategory}
              onChange={updateCategory}
              popupMatchSelectWidth={false}
            />
          </Space>
        </InvertColorConfigProvider>
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
