import React from 'react'

const UserInfo = ({ profession, tagline, location, position, isHidden }) => {
  return (
    <div className={`${isHidden} flex flex-col justify-center space-y-1 md:${position}`}>
      <div className="md:text-lg font-bold">{profession}</div>
      <div className="hidden md:block md:text-base italic">{`"${tagline}"`}</div>
      {/* <div className="text-sm font-semibold">From: {location}</div> */}
    </div>
  )
}

export default UserInfo
