import { FC } from 'react'
import { CloseCircleFilled, SearchOutlined } from '@ant-design/icons'
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Select,
  Slider,
  theme,
} from 'antd'

import { ProductTheme, ProductTier } from '../../../types'

import './style.scss'

const ProductFilters: FC = () => {
  const { token } = theme.useToken()

  console.log(token)

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: 'transparent',
          colorBgElevated: '#000',
          controlItemBgActive: token.colorPrimary,
          controlItemBgHover: '#89888b',
          colorTextPlaceholder: '#89888b',
          colorTextQuaternary: '#D6D6D6', // Arrow color
          colorFillTertiary: '#da458f3d', // Button text hover color
        },
      }}
      componentSize="large"
    >
      <Form className="product-filters-wrapper" labelCol={{ span: 24 }}>
        <Form.Item name={'search'}>
          <Input placeholder="Quick search" prefix={<SearchOutlined />} />
        </Form.Item>
        <Form.Item name={'priceRange'} label="Price">
          <Slider
            range
            max={200}
            min={0.01}
            marks={{
              0.01: '0.01 ETH',
              200: '200 ETH',
            }}
          />
        </Form.Item>
        <Form.Item name={'tier'} label="Tier">
          <Select
            options={[
              { label: 'All', value: 'All' },
              ...[
                ProductTier.Basic,
                ProductTier.Premium,
                ProductTier.Deluxe,
              ].map(tier => ({
                label: tier,
                value: tier,
              })),
            ]}
            // arrow
          />
        </Form.Item>
        <Form.Item name={'theme'} label="Theme">
          <Select
            options={[
              { label: 'All', value: 'All' },
              ...[
                ProductTheme.Dark,
                ProductTheme.Light,
                ProductTheme.Colorful,
                ProductTheme.Halloween,
              ].map(theme => ({
                label: theme,
                value: theme,
              })),
            ]}
          />
        </Form.Item>
        <Form.Item name={'time'} label="Time">
          <Select
            options={[
              { label: 'Latest', value: 'Latest' },
              { label: 'Earliest', value: 'Earliest' },
            ]}
          />
        </Form.Item>
        <Form.Item name={'priceSort'} label="Price">
          <Select
            options={[
              { label: 'Low to high', value: 'LowToHigh' },
              { label: 'High to low', value: 'HighToLow' },
            ]}
          />
        </Form.Item>
        <div className="action-buttons">
          <Button type="text" icon={<CloseCircleFilled />}>
            Reset filter
          </Button>
          <Button type="primary">Search</Button>
        </div>
      </Form>
    </ConfigProvider>
  )
}

export default ProductFilters
