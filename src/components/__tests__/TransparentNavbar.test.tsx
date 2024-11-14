import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import TransparentNavbar from '../TransparentNavbar'

describe('TransparentNavbar Component', () => {
  it('should render with the correct className and innerClassName', () => {
    const { container } = render(
      <TransparentNavbar
        className="custom-navbar-class"
        innerClassName="custom-inner-class"
      >
        <div>Test Content</div>
      </TransparentNavbar>
    )

    const navbarWrapper = container.querySelector('.transparent-navbar-wrapper')
    expect(navbarWrapper).toHaveClass('custom-navbar-class')

    const navbarInner = container.querySelector(
      '.transparent-navbar-wrapper-inner'
    )
    expect(navbarInner).toHaveClass('custom-inner-class')

    expect(navbarInner).toHaveTextContent('Test Content')
  })

  it('should apply default classes if no className or innerClassName are provided', () => {
    const { container } = render(
      <TransparentNavbar>
        <div>Test Content</div>
      </TransparentNavbar>
    )

    const navbarWrapper = container.querySelector('.transparent-navbar-wrapper')
    expect(navbarWrapper).toHaveClass('transparent-navbar-wrapper')

    const navbarInner = container.querySelector(
      '.transparent-navbar-wrapper-inner'
    )
    expect(navbarInner).toHaveClass('transparent-navbar-wrapper-inner')
  })
})
