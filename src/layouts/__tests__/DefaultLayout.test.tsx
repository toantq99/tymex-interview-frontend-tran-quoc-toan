import { render, screen } from '@testing-library/react'
import DefaultLayout from '../DefaultLayout'

jest.mock('../../components/DefaultLayoutHeader', () => () => (
  <header>Mock Header</header>
))

jest.mock('../../components/DefaultLayoutFooter', () => () => (
  <footer>Mock Footer</footer>
))

describe('DefaultLayout', () => {
  it('should render the DefaultLayout component with header, footer, and children', () => {
    render(
      <DefaultLayout>
        <div>Test Content</div>
      </DefaultLayout>
    )

    expect(screen.getByText('Mock Header')).toBeInTheDocument()
    expect(screen.getByText('Mock Footer')).toBeInTheDocument()

    expect(screen.getByText('Test Content')).toBeInTheDocument()

    const layoutWrapper = screen.getByRole('img', { name: /footer-frame/i })
    expect(layoutWrapper).toHaveAttribute(
      'src',
      '/assets/images/footer-frame.png'
    )
    expect(
      screen.getByRole('img', { name: /footer-frame/i })
    ).toBeInTheDocument()
  })
})
