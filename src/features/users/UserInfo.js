/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from 'react'

const UserInfo = ({ profession, tagline, location, position }) => {
  return (
    <div className={`space-y-1 ${position}`}>
      <div className="text-sm md:text-lg font-bold">{profession}</div>
      <div className="text-xs md:text-base italic">"{tagline}"</div>
      <div className="font-semibold text-green-500">{location}</div>
    </div>
  )
}

export default UserInfo
