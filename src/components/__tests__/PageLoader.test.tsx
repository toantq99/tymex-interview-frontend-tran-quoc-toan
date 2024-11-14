import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PageLoader from '../PageLoader'

jest.mock('antd', () => ({
  __esModule: true,
  Spin: () => <div data-testid="spin" />, // Mocking Spin component
  Flex: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="flex">{children}</div>
  ), // Mocking Flex component
}))

describe('PageLoader', () => {
  it('renders Spin inside Flex component', () => {
    render(<PageLoader />)

    // Check if the Spin component is rendered
    expect(screen.getByTestId('spin')).toBeInTheDocument()

    // Check if the Flex component is rendered with the Spin component as its child
    expect(screen.getByTestId('flex')).toContainElement(
      screen.getByTestId('spin')
    )
  })
})
