import React from 'react'
import { useSelector } from 'react-redux'

import { selectUserById } from '../users/usersSlice'

export const PostAuthor = ({ userId }) => {
  const author = useSelector((state) => selectUserById(state, userId))
  const fullName = `${author.first_name} ${author.last_name}`
  return <span>{author ? fullName : 'Unknown author'}</span>
}
