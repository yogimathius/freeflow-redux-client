import React from 'react'

const Link = ({ active, children, setVisibilityFilter, filter }) => {
  return (
    <div
      className=""
      onClick={() => setVisibilityFilter(filter)}
      disabled={active}
    >
      {children}
    </div>
  )
}

export default Link
