import React from 'react'
import { useSelector } from 'react-redux'

import { selectUserById } from '../users/usersSlice'

export const PostAuthor = ({ userId }) => {
  const author = useSelector((state) => selectUserById(state, userId))
  function getRandomInt() {
    return Math.floor(Math.random() * (10000 - 5)) + 4;
  }
  const imgUrl = "http://graph.facebook.com/v2.5/" + getRandomInt() + "/picture";

  const fullName = author ? `${author.first_name} ${author.last_name}` : "";
  // const avatar = author ? `${author.avatar}` : "";
  return (
    <span className="flex items-center space-x-2">
      <img className="rounded-full p-2 border-2 border-solid border-green-500" alt="avatar" src={imgUrl} />
      <p className="text-lg font-bold text-blue-500">{author ? fullName : 'Unknown author'}</p>
    </span>
  )
}
