import { FC } from 'react'
import { Flex } from 'antd'

import SvgIcon from '../SvgIcon'

const RegionSelector: FC = () => (
  <Flex className="region-selector-wrapper" align="center" gap={8}>
    <SvgIcon iconName="globe" />
    <SvgIcon iconName="caret-down" />
  </Flex>
)

export default RegionSelector
