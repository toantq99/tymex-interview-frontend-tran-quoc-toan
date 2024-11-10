import { FC } from 'react'
import { Button, ButtonProps } from 'antd'
import classNames from 'classnames'

import './style.scss'

const PrimaryButton: FC<ButtonProps> = ({ className, ...props }) => (
  <Button
    className={classNames('primary-button-wrapper', className)}
    type="primary"
    {...props}
  />
)

export default PrimaryButton
