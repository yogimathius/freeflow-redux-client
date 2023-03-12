/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'

import { selectUserById } from '../../../../reducers/usersSlice'
import IsOnline from '../IsOnline'

const UserNameAndLogo = ({ userId, isSideBar }) => {
  const author = useSelector((state) => selectUserById(state, userId))
  function getRandomInt () {
    return Math.floor(Math.random() * (10000 - 5)) + 4
  }
  const imgUrl = 'http://graph.facebook.com/v2.5/' + getRandomInt() + '/picture'

  const fullName = author ? `${author.first_name} ${author.last_name}` : ''

  const isSideBarFont = isSideBar ? '' : 'md:text-lg'

  const isSideBarLogo = isSideBar ? 'w-1/4' : 'w-max'
  return (
    <div className="flex space-x-1 items-center">
      <div className={`${isSideBarLogo} mr-4`}>
        <img className="inline-block rounded-full p-2" alt="avatar" src={imgUrl} />
      </div>

      <div className="w-max">
        <p className={`inline-block text-sm ${isSideBarFont} font-bold`}>{author ? fullName : 'Unknown author'}</p>
        {isSideBar ? null : <IsOnline author={author} />}
      </div>
    </div>
  )
}

export default UserNameAndLogo
