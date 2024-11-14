import { Grid } from 'antd'
import { renderHook } from '@testing-library/react'
import { useBreakpoint } from '../useBreakpoint'

// Mock the Grid.useBreakpoint hook from Ant Design
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  Grid: {
    ...jest.requireActual('antd').Grid,
    useBreakpoint: jest.fn(),
  },
}))

describe('useBreakpoint Hook', () => {
  it('should return isCollapsed as false when xl breakpoint is present', () => {
    // Mock useBreakpoint to return a value where 'xl' is true
    ;(Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: true, sm: true })

    const { result } = renderHook(() => useBreakpoint())

    // Assert that isCollapsed is false when xl breakpoint is present
    expect(result.current.isCollapsed).toBe(false)
  })

  it('should return isCollapsed as true when xl breakpoint is absent', () => {
    // Mock useBreakpoint to return a value where 'xl' is false
    ;(Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: false, sm: true })

    const { result } = renderHook(() => useBreakpoint())

    // Assert that isCollapsed is true when xl breakpoint is absent
    expect(result.current.isCollapsed).toBe(true)
  })

  it('should return breakpoints correctly', () => {
    // Mock useBreakpoint to return specific breakpoints
    ;(Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: true, sm: false })

    const { result } = renderHook(() => useBreakpoint())

    // Assert that breakpoints are spread correctly and isCollapsed is false
    expect(result.current.xl).toBe(true)
    expect(result.current.sm).toBe(false)
    expect(result.current.isCollapsed).toBe(false)
  })
})
