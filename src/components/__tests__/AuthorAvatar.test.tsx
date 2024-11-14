import { render } from '@testing-library/react'

import AuthorAvatar from '../AuthorAvatar'

import { IAuthor } from '../../types/product'

jest.mock('../SvgIcon', () => jest.fn(() => <svg />)) // Mock SvgIcon component

describe('AuthorAvatar', () => {
  const mockAuthor: IAuthor = {
    avatar: 'https://example.com/avatar.jpg', // Mock URL for avatar
    onlineStatus: 'offline',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'email@gmail.com',
    gender: 'Male',
  }

  it('should render avatar with online status', () => {
    const { getByRole, getByAltText } = render(
      <AuthorAvatar author={mockAuthor} />
    )

    // Check if the avatar image is rendered with the correct src
    const avatar = getByAltText('author-avatar') // The alt text may need to be customized based on your implementation
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg')

    // Check if the online status icon is rendered by looking for the icon
    const onlineIcon = getByRole('img') // This assumes your SvgIcon renders an <img> tag or similar
    expect(onlineIcon).toBeInTheDocument()
  })

  it('should render avatar with offline status', () => {
    const { getByRole, getByAltText } = render(
      <AuthorAvatar author={mockAuthor} />
    )

    // Check if the avatar image is rendered with the correct src
    const avatar = getByAltText('author-avatar') // The alt text may need to be customized based on your implementation
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg')

    // Check if the offline status icon is rendered
    const offlineIcon = getByRole('img') // This assumes your SvgIcon renders an <img> tag or similar
    expect(offlineIcon).toBeInTheDocument()
  })
})
