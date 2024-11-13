import { FC } from 'react'
import { Avatar, Badge } from 'antd'

import SvgIcon from '../SvgIcon'

import { IAuthor } from '../../types/product'

import './style.scss'

const AuthorAvatar: FC<{ author: IAuthor }> = ({ author }) => (
  <Badge
    className="author-avatar-wrapper"
    count={
      <Avatar
        className="author-avatar-status"
        size={12}
        icon={
          <SvgIcon
            iconName={author.onlineStatus === 'online' ? 'online' : 'offline'}
          />
        }
      />
    }
  >
    <Avatar src={author?.avatar} size={32} />
  </Badge>
)

export default AuthorAvatar
