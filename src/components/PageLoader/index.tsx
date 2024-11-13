import { FC } from 'react'
import { Flex, Spin } from 'antd'

import './style.scss'

const PageLoader: FC = () => (
  <Flex className="page-loader-wrapper" justify="center" align="center">
    <Spin size="large" />
  </Flex>
)

export default PageLoader
