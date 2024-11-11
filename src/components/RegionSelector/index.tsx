import { FC } from 'react'
import { Flex } from 'antd'

const RegionSelector: FC = () => (
  <Flex className="region-selector-wrapper" align="center" gap={8}>
    <img src="/assets/icons/globe.svg" />
    <img src="/assets/icons/caret-down.svg" />
  </Flex>
)

export default RegionSelector
