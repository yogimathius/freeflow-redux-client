import React from 'react'
import { Link } from 'react-router-dom'
import UserNameAndLogo from '../../../../users/components/UserNameAndLogo'

const UserLink = ({ post, saveState }) => {
  return (
    <div className='w-min'>
      <Link
        to={`/userprofile/${post.owner_id}`}
        onClick={() => saveState(post.owner_id)}
      >
        <UserNameAndLogo
          onClick={saveState(post.owner_id)}
          userId={post.owner_id}
        />
      </Link>
    </div>
  )
}

export default UserLink
