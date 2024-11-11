import { FC, useEffect } from 'react'
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

import { useProductFilters } from '../../../hooks/useProductFilters'

import { formatPrice } from '../../../helpers'

import { IProductFilters, ProductTheme, ProductTier } from '../../../types'

import './style.scss'

type IProductFiltersForm = Pick<
  IProductFilters,
  'priceRange' | 'priceSort' | 'search' | 'theme' | 'tier' | 'timeSort'
>

const ProductFilters: FC = () => {
  const { token } = theme.useToken()

  const { currentProductFilters, updateFilters, resetFilters } =
    useProductFilters()

  const [form] = Form.useForm<IProductFiltersForm>()

  useEffect(() => {
    form.resetFields()
  }, [form, currentProductFilters])

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
      <Form<IProductFiltersForm>
        className="product-filters-wrapper"
        labelCol={{ span: 24 }}
        form={form}
        initialValues={currentProductFilters}
        onFinish={updatedFilters =>
          updateFilters({
            ...updatedFilters,
            category: currentProductFilters?.category,
          })
        }
      >
        <Form.Item name={'search'}>
          <Input placeholder="Quick search" prefix={<SearchOutlined />} />
        </Form.Item>
        <Form.Item name={'priceRange'} label="Price">
          <Slider
            range
            max={200}
            min={0.01}
            marks={{
              0.01: formatPrice(0.01),
              200: formatPrice(200),
            }}
          />
        </Form.Item>
        <Form.Item name={'tier'} label="Tier">
          <Select
            options={[
              ProductTier.Basic,
              ProductTier.Premium,
              ProductTier.Deluxe,
            ].map(tier => ({
              label: tier,
              value: tier,
            }))}
            allowClear
          />
        </Form.Item>
        <Form.Item name={'theme'} label="Theme">
          <Select
            options={[
              ProductTheme.Dark,
              ProductTheme.Light,
              ProductTheme.Colorful,
              ProductTheme.Halloween,
            ].map(theme => ({
              label: theme,
              value: theme,
            }))}
            allowClear
          />
        </Form.Item>
        <Form.Item name={'timeSort'} label="Time">
          <Select
            options={[
              { label: 'Latest', value: 'desc' },
              { label: 'Earliest', value: 'asc' },
            ]}
            allowClear
          />
        </Form.Item>
        <Form.Item name={'priceSort'} label="Price">
          <Select
            options={[
              { label: 'Low to high', value: 'asc' },
              { label: 'High to low', value: 'desc' },
            ]}
            allowClear
          />
        </Form.Item>
        <div className="action-buttons">
          <Button
            type="text"
            icon={<CloseCircleFilled />}
            onClick={() => resetFilters()}
          >
            Reset filter
          </Button>
          <Button type="primary" onClick={() => form.submit()}>
            Search
          </Button>
        </div>
      </Form>
    </ConfigProvider>
  )
}

export default ProductFilters
