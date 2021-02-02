import React from 'react'

const Link = ({ active, children, setVisibilityFilter, filter }) => {
  return (
    <div
      className="text-blue-500 cursor-pointer "
      onClick={() => setVisibilityFilter(filter)}
      disabled={active}
    >
      {children}
    </div>
  )
}

export default Link
