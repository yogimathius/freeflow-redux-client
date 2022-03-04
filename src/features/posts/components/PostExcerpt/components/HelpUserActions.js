import React from 'react'
import { Link } from 'react-router-dom'

const HelpUserActions = ({ userId, experienceOption }) => {
  return (
    <div className="text-blue-500 font-bold text-sm">
      <Link
        to={{ pathname: `${userId}/experiences`, query: { owner: experienceOption } }}
        onClick={() => localStorage.setItem('selected_user', JSON.stringify(experienceOption))}
      >
        Offer Help
      </Link>
      <Link
        to={{ pathname: `${userId}/experiences`, query: { owner: experienceOption } }}
        onClick={() => localStorage.setItem('selected_user', JSON.stringify(experienceOption))}
      >
        Send Message
      </Link>
    </div>
  )
}

export default HelpUserActions
