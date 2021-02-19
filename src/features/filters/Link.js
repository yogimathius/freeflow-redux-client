import React from 'react'

const Link = ({ active, children, setVisibilityFilter, filter }) => {
  return (
    <div>
      {active === true ? 
        <div
        className="bg-green-500 text-white   btn btn-disabled mr-1 mt-1"
        onClick={() => setVisibilityFilter(filter)}
        disabled={active}
      >
        {children}
      </div> :       
      <div
      className="btn btn-secondary mr-1 mt-1"
        onClick={() => setVisibilityFilter(filter)}
        disabled={active}
      >
        {children}
      </div>
      }
    </div>
  )
}

export default Link
