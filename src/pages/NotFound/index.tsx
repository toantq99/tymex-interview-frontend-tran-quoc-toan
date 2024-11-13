import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button, Result, Typography } from 'antd'

import { NAVIGATION_ITEMS } from '../../constants/navigation'

const NotFound: FC = () => (
  <Result
    status="404"
    title="404"
    subTitle={
      <Typography.Title level={4}>
        Sorry, the page you visited does not exist.
      </Typography.Title>
    }
    extra={
      <Link to={NAVIGATION_ITEMS.MARKETPLACE.path}>
        <Button size="large" type="primary">
          Go to Marketplace
        </Button>
      </Link>
    }
  />
)

export default NotFound
