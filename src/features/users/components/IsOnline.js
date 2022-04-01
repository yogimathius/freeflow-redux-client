import React from 'react'

const IsOnline = ({ author }) => {
  const isActive = author && author.active ? <p className="text-green-400 text-sm font-semibold">Online</p> : <p className="text-gray-500 text-sm font-semibold">Offline</p>
  return (
    <div>
      {isActive}
    </div>
  )
}

export default IsOnline
