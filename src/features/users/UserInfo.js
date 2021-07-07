/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from 'react'

const UserInfo = ({ profession, tagline, location }) => {
  return (
    <div className="space-y-3 text-right">
      <div className="ml-1 text-sm md:text-lg font-bold">{profession}</div>
      <div className="text-xs md:text-base italic">"{tagline}"</div>
      <div className="font-semibold text-green-500">{location}</div>
    </div>
  )
}

export default UserInfo
