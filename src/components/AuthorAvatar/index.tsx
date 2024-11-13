import { FC } from 'react'
import { Avatar, Badge } from 'antd'

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
          <img
            src={`/assets/icons/${author.onlineStatus === 'online' ? 'online' : 'offline'}.svg`}
          />
        }
      />
    }
  >
    <Avatar src={author?.avatar} size={32} />
  </Badge>
)

export default AuthorAvatar
