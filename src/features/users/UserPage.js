import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TimeAgo } from '../posts/TimeAgo'

import { selectUserById } from '../users/usersSlice'
import { selectPostsByUser } from '../posts/postsSlice'

export const UserPage = ({ match }) => {
  const { userId } = match.params

  const user = useSelector((state) => selectUserById(state, userId))

  const postsForUser = useSelector((state) => selectPostsByUser(state, userId))
  
  console.log("user for user: ", user);
  console.log("Save");
  const postTitles = postsForUser.map((post) => ( 
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
      <p>{post.content}</p>
    </li>
  ))

  return (
    <section>
      <h2>{user.first_name} {user.last_name}</h2>
      <img alt="avatar" src={user.avatar}/>
      <h3>Location: {user.location}</h3>
      <ul>{postTitles}</ul>
      <p>Joined Freeflow <TimeAgo timestamp={user.created_at} /></p>
    </section>
  )
}
