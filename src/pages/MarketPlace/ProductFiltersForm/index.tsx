import { FC, useEffect, useMemo } from 'react'
import { CloseCircleFilled, SearchOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, Slider } from 'antd'

import InvertColorConfigProvider from '../../../components/InvertColorConfigProvider'

import { useProductListQuery } from '../../../hooks/useProductListQuery'

import { debounce, formatPrice } from '../../../helpers/general'

import { SortType } from '../../../enums/general'
import { ProductTheme, ProductTier } from '../../../enums/product'

import { IProductListQuery } from '../../../types/product-list'

import './style.scss'

type IProductFiltersForm = Pick<IProductListQuery, 'filters' | 'sorters'>

const ProductFiltersForm: FC<{
  closeDrawer?: () => void
  searchOnTyping?: boolean
}> = ({ closeDrawer, searchOnTyping }) => {
  const {
    currentFilters,
    currentSorters,
    productListHistoryState,
    updateFiltersAndSorters,
    resetFiltersAndSorters,
  } = useProductListQuery()

  const debouncedUpdateFiltersAndSorters = useMemo(
    () => debounce(updateFiltersAndSorters, 1000),
    [updateFiltersAndSorters]
  )

  const [form] = Form.useForm<IProductFiltersForm>()

  const initialValues: IProductFiltersForm = {
    filters: currentFilters,
    sorters: currentSorters,
  }

  useEffect(() => {
    form.setFieldsValue(initialValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, productListHistoryState?.timestamp])

  return (
    <InvertColorConfigProvider componentSize="large">
      <Form<IProductFiltersForm>
        className="product-filters-wrapper"
        labelCol={{ span: 24 }}
        form={form}
        initialValues={initialValues}
        onFinish={updateFiltersAndSorters}
        {...(searchOnTyping && {
          onValuesChange: (
            changedValue: Partial<IProductFiltersForm>,
            values
          ) => {
            if (Object.hasOwn(changedValue?.filters || {}, 'search')) {
              debouncedUpdateFiltersAndSorters(values)
            }
          },
        })}
      >
        <Form.Item name={['filters', 'search']}>
          <Input placeholder="Quick search" prefix={<SearchOutlined />} />
        </Form.Item>
        <Form.Item name={['filters', 'priceRange']} label="Price">
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
        <Form.Item name={['filters', 'tier']} label="Tier">
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
        <Form.Item name={['filters', 'theme']} label="Theme">
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
        <Form.Item name={['sorters', 'timeSort']} label="Time">
          <Select
            options={[
              { label: 'Latest', value: SortType.Descending },
              { label: 'Earliest', value: SortType.Ascending },
            ]}
            allowClear
          />
        </Form.Item>
        <Form.Item name={['sorters', 'priceSort']} label="Price">
          <Select
            options={[
              { label: 'Low to high', value: SortType.Ascending },
              { label: 'High to low', value: SortType.Descending },
            ]}
            allowClear
          />
        </Form.Item>
        <div className="action-buttons">
          <Button
            type="text"
            icon={<CloseCircleFilled />}
            onClick={() => {
              resetFiltersAndSorters()
              closeDrawer?.()
            }}
          >
            Reset filter
          </Button>
          <Button
            type="primary"
            onClick={() => {
              form.submit()
              closeDrawer?.()
            }}
          >
            Search
          </Button>
        </div>
      </Form>
    </InvertColorConfigProvider>
  )
}

export default ProductFiltersForm
