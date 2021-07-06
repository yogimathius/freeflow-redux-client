import React from 'react'
import { useSelector } from 'react-redux'

import { selectUserById } from './usersSlice'

export const UserNameAndLogo = ({ userId }) => {
  const author = useSelector((state) => selectUserById(state, userId))
  function getRandomInt () {
    return Math.floor(Math.random() * (10000 - 5)) + 4
  }
  // const imgUrl = "http://graph.facebook.com/v2.5/" + getRandomInt() + "/picture";

  const fullName = author ? `${author.first_name} ${author.last_name}` : ''
  const isActive = author && author.active ? <p className="text-green-400 text-sm font-semibold">Online</p> : <p className="text-gray-500 text-sm font-semibold">Offline</p>

  return (
    <div className="flex items-center space-x-2 w-max ml-2">
      <div className="w-10 md:w-full">
        {/* <img className="inline-block rounded-full p-2 border-2 border-solid border-green-500" alt="avatar" src={imgUrl} /> */}
      </div>

      <div className="inline-block">
        <p className="inline-block text-sm md:text-lg font-bold text-blue-500">{author ? fullName : 'Unknown author'}</p>
        {isActive}
      </div>
    </div>
  )
}
