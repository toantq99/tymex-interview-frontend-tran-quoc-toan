import { FC } from 'react'
import { CaretDownOutlined, GlobalOutlined } from '@ant-design/icons'
import { Space } from 'antd'

import './style.scss'

const RegionSelector: FC = () => (
  <Space className="region-selector-wrapper">
    <GlobalOutlined />
    <CaretDownOutlined />
  </Space>
)

export default RegionSelector
