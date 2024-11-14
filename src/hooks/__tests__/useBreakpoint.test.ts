import { Grid } from 'antd'
import { renderHook } from '@testing-library/react'
import { useBreakpoint } from '../useBreakpoint'

jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  Grid: {
    ...jest.requireActual('antd').Grid,
    useBreakpoint: jest.fn(),
  },
}))

describe('useBreakpoint Hook', () => {
  it('should return isCollapsed as false when xl breakpoint is present', () => {
    ;(Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: true, sm: true })

    const { result } = renderHook(() => useBreakpoint())

    expect(result.current.isCollapsed).toBe(false)
  })

  it('should return isCollapsed as true when xl breakpoint is absent', () => {
    ;(Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: false, sm: true })

    const { result } = renderHook(() => useBreakpoint())

    expect(result.current.isCollapsed).toBe(true)
  })

  it('should return breakpoints correctly', () => {
    ;(Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: true, sm: false })

    const { result } = renderHook(() => useBreakpoint())

    expect(result.current.xl).toBe(true)
    expect(result.current.sm).toBe(false)
    expect(result.current.isCollapsed).toBe(false)
  })
})
