import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PageLoader from '../PageLoader'

jest.mock('antd', () => ({
  __esModule: true,
  Spin: () => <div data-testid="spin" />,
  Flex: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="flex">{children}</div>
  ),
}))

describe('PageLoader', () => {
  it('renders Spin inside Flex component', () => {
    render(<PageLoader />)

    expect(screen.getByTestId('spin')).toBeInTheDocument()

    expect(screen.getByTestId('flex')).toContainElement(
      screen.getByTestId('spin')
    )
  })
})
