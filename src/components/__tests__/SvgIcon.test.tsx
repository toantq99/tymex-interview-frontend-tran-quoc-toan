import { render, screen } from '@testing-library/react'
import SvgIcon from '../SvgIcon'

describe('SvgIcon Component', () => {
  it('renders an image with the correct src based on iconName', () => {
    const iconName = 'online'
    render(<SvgIcon iconName={iconName} />)

    const imgElement = screen.getByRole('img', { name: iconName })
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute('src', `/assets/icons/${iconName}.svg`)
  })

  it('renders an image with the correct alt attribute', () => {
    const iconName = 'offline'
    render(<SvgIcon iconName={iconName} />)

    const imgElement = screen.getByRole('img', { name: iconName })
    expect(imgElement).toHaveAttribute('alt', iconName)
  })

  it('passes additional props to the img element', () => {
    const iconName = 'status'
    const title = 'User Status Icon'
    render(<SvgIcon iconName={iconName} title={title} />)

    const imgElement = screen.getByRole('img', { name: iconName })
    expect(imgElement).toHaveAttribute('title', title)
  })

  it('renders match snap shot', () => {
    const iconName = 'ethereum'

    render(<SvgIcon iconName={iconName} />)

    const imgElement = screen.getByRole('img', { name: iconName })
    expect(imgElement).toMatchSnapshot()
  })
})
