import { FC } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Col,
  Divider,
  Flex,
  Input,
  Layout,
  Row,
  Typography,
} from 'antd'

import InvertColorConfigProvider from '../InvertColorConfigProvider'
import SvgIcon from '../SvgIcon'

import { NAVIGATION_ITEMS } from '../../constants/navigation'

import './style.scss'

const renderNavigationItem = ({
  path,
  label,
}: {
  path: string
  label: string
}) => (
  <Link key={path} to={path}>
    <Typography.Text>{label}</Typography.Text>
  </Link>
)

const renderNavigationItems = (
  navigationItems: {
    path: string
    label: string
  }[]
) => (
  <Flex vertical gap={12}>
    {navigationItems.map(renderNavigationItem)}
  </Flex>
)

const DefaultLayoutFooter: FC = () => (
  <InvertColorConfigProvider>
    <Layout.Footer className="default-layout-footer-wrapper">
      <Row gutter={48}>
        <Col span={8}>
          <Typography.Title level={4}>Navigation</Typography.Title>
          <Row gutter={32}>
            <Col>
              {renderNavigationItems([
                NAVIGATION_ITEMS.HOME,
                NAVIGATION_ITEMS.ABOUT_US,
                NAVIGATION_ITEMS.OUR_TEAMS,
              ])}
            </Col>
            <Col>
              {renderNavigationItems([
                NAVIGATION_ITEMS.WHITEPAPER,
                NAVIGATION_ITEMS.MARKETPLACE,
                NAVIGATION_ITEMS.ROADMAP,
              ])}
            </Col>
            <Col>
              {renderNavigationItems([
                NAVIGATION_ITEMS.FAQS,
                NAVIGATION_ITEMS.NEWS,
                NAVIGATION_ITEMS.COMMUNITY,
              ])}
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Typography.Title level={4}>Contact Us</Typography.Title>
          <Flex vertical gap={32}>
            <a href="tel:+01234568910" target="_blank" rel="noreferrer">
              <Flex gap={8}>
                <SvgIcon iconName="phone" />
                <Typography.Text>01234568910</Typography.Text>
              </Flex>
            </a>
            <a
              href="mailto:tymex-talent@tyme.com"
              target="_blank"
              rel="noreferrer"
            >
              <Flex gap={8}>
                <SvgIcon iconName="email" />
                <Typography.Text>tymex-talent@tyme.com</Typography.Text>
              </Flex>
            </a>
          </Flex>
        </Col>
        <Col span={10}>
          <Typography.Title level={4}>
            Subcribe to receive our latest update
          </Typography.Title>
          <Flex gap={20}>
            <Input size="large" placeholder="Your email address" />

            <Button size="large" type="primary">
              Subcribe
            </Button>
          </Flex>
        </Col>
      </Row>
      <Divider />
      <Flex justify="space-between">
        <Typography.Text>
          ©2023 Tyme - Edit. All Rights reserved.
        </Typography.Text>
        <Flex gap={60}>
          {[
            NAVIGATION_ITEMS.SECURITY,
            NAVIGATION_ITEMS.LEGAL,
            NAVIGATION_ITEMS.PRIVACY,
          ].map(renderNavigationItem)}
        </Flex>
      </Flex>
    </Layout.Footer>
  </InvertColorConfigProvider>
)

export default DefaultLayoutFooter
