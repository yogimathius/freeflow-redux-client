import React from 'react'
import { Link } from 'react-router-dom'
import { UserNameAndLogo } from '../../../../users/UserNameAndLogo'

const UserLink = ({ post, saveState }) => {
  return (
    <Link
      to={`/userprofile/${post.owner_id}`}
      onClick={() => saveState(post.owner_id)}
    >
      <UserNameAndLogo
        onClick={saveState(post.owner_id)}
        userId={post.owner_id}
      />
    </Link>
  )
}

export default UserLink