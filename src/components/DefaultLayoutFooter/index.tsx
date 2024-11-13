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
      <div className="default-layout-footer-wrapper-inner">
        <Row gutter={[0, 48]}>
          <Col xl={8} md={14} xs={24}>
            <Typography.Title level={4}>Navigation</Typography.Title>
            <Flex gap={32}>
              {renderNavigationItems([
                NAVIGATION_ITEMS.HOME,
                NAVIGATION_ITEMS.ABOUT_US,
                NAVIGATION_ITEMS.OUR_TEAMS,
              ])}
              {renderNavigationItems([
                NAVIGATION_ITEMS.WHITEPAPER,
                NAVIGATION_ITEMS.MARKETPLACE,
                NAVIGATION_ITEMS.ROADMAP,
              ])}
              {renderNavigationItems([
                NAVIGATION_ITEMS.FAQS,
                NAVIGATION_ITEMS.NEWS,
                NAVIGATION_ITEMS.COMMUNITY,
              ])}
            </Flex>
          </Col>
          <Col xl={6} md={10} xs={24}>
            <Typography.Title level={4}>Contact Us</Typography.Title>
            <Flex vertical gap={24}>
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
          <Col xl={10} xs={24}>
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
        <Row justify="space-between" gutter={[0, 24]}>
          <Col xs={24} md={12}>
            <Typography.Text>
              ©2023 Tyme - Edit. All Rights reserved.
            </Typography.Text>
          </Col>
          <Col xs={24} md={12}>
            <Flex gap={60} justify="flex-end" align="center">
              {[
                NAVIGATION_ITEMS.SECURITY,
                NAVIGATION_ITEMS.LEGAL,
                NAVIGATION_ITEMS.PRIVACY,
              ].map(renderNavigationItem)}
            </Flex>
          </Col>
        </Row>
      </div>
    </Layout.Footer>
  </InvertColorConfigProvider>
)

export default DefaultLayoutFooter
