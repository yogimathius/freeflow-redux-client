import React from 'react'
import { useSelector } from 'react-redux'

import { selectUserById } from '../users/usersSlice'

export const PostAuthor = ({ userId }) => {
  const author = useSelector((state) => selectUserById(state, userId))
  const fullName = `${author.first_name} ${author.last_name}`
  const avatar = `${author.avatar}`
  return (
    <span className="post_author">
      <img alt="avatar" src={avatar} />
      <p className="post_author_name">{author ? fullName : 'Unknown author'}</p>
    </span>
  )
}
