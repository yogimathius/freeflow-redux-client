import React from 'react'
import { useSelector } from 'react-redux'

import { selectUserById } from '../users/usersSlice'

export const PostAuthor = ({ userId }) => {
  const author = useSelector((state) => selectUserById(state, userId))
  console.log(author)
  const fullName = `${author.first_name} ${author.last_name}`
  const avatar = `${author.avatar}`
  return (
    <span>
      <img alt="avatar" src={avatar} />
      {author ? fullName : 'Unknown author'}
    </span>
  )
}
