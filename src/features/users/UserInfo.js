/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from 'react'

const UserInfo = ({ profession, tagline, location, position }) => {
  return (
    <div className={`flex flex-col justify-between space-y-1 md:${position}`}>
      <div className="md:text-lg font-bold">{profession}</div>
      <div className="hidden md:block md:text-base italic">"{tagline}"</div>
      <div className="text-sm md:text-base font-semibold text-green-500">{location}</div>
    </div>
  )
}

export default UserInfo
