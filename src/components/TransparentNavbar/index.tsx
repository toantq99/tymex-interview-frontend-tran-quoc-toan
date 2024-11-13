import { FC } from 'react'
import { Layout } from 'antd'
import { BasicProps } from 'antd/es/layout/layout'
import classNames from 'classnames'

import './style.scss'

const TransparentNavbar: FC<
  BasicProps & React.RefAttributes<HTMLElement> & { innerClassName?: string }
> = ({ className, innerClassName, children, ...props }) => (
  <Layout.Header
    className={classNames('transparent-navbar-wrapper', className)}
    {...props}
  >
    <nav
      className={classNames('transparent-navbar-wrapper-inner', innerClassName)}
    >
      {children}
    </nav>
  </Layout.Header>
)

export default TransparentNavbar
