import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { useBreakpoint } from '../../hooks/useBreakpoint'
import DefaultLayoutHeader from '../DefaultLayoutHeader'

jest.mock('../MobileNavigationMenu/', () => () => (
  <div>Mobile Navigation Menu</div>
))
jest.mock('../NavigationMenu', () => () => <div>Navigation Menu</div>)
jest.mock('../RegionSelector', () => () => <div>Region Selector</div>)
jest.mock(
  '../TransparentNavbar',
  () =>
    ({ children }: { children: React.ReactNode }) => <header>{children}</header>
)
jest.mock('../../hooks/useBreakpoint')

describe('DefaultLayoutHeader', () => {
  it('renders MobileNavigationMenu when isCollapsed is true', () => {
    ;(useBreakpoint as jest.Mock).mockReturnValue({ isCollapsed: true })

    render(<DefaultLayoutHeader />)

    expect(screen.getByText('Mobile Navigation Menu')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Connect Wallet/i })
    ).toBeInTheDocument()
    expect(screen.getByText('Region Selector')).toBeInTheDocument()
  })

  it('renders NavigationMenu when isCollapsed is false', () => {
    ;(useBreakpoint as jest.Mock).mockReturnValue({ isCollapsed: false })

    render(<DefaultLayoutHeader />)

    expect(screen.getByText('Navigation Menu')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Connect Wallet/i })
    ).toBeInTheDocument()
    expect(screen.getByText('Region Selector')).toBeInTheDocument()
  })
})
