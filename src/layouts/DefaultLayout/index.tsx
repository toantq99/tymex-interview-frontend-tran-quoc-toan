import { FC, PropsWithChildren } from 'react'
import { Layout, Menu } from 'antd'

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => (
  <Layout>
    <Layout.Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={[]}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Layout.Header>
    <Layout.Content>{children}</Layout.Content>
    <Layout.Footer>Footer</Layout.Footer>
  </Layout>
)

export default DefaultLayout
