import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TimeAgo } from '../posts/TimeAgo'

import { selectUserById } from '../users/usersSlice'
import { selectPostsByUser } from '../posts/postsSlice'

import './UserPage.scss'

export const UserPage = ({ match }) => {
  const { userId } = match.params

  const user = useSelector((state) => selectUserById(state, userId))

  const postsForUser = useSelector((state) => selectPostsByUser(state, userId))

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
      <p className="posts_timestamp">
        <TimeAgo timestamp={post.created_at} />
      </p>
      <p>{post.content}</p>
    </li>
  ))

  return (
    <section>
      <div className="user_profile">
        <img alt="avatar" src={user.avatar} />
        <div className="user_info">
          <h2>
            {user.first_name} {user.last_name}
          </h2>
          <p>
            Joined Freeflow <TimeAgo timestamp={user.created_at} />
          </p>
          <p>
            <span className="field_name">Location:</span> {user.location}
          </p>
          <p>
            <span className="field_name">About Me:</span> {user.description}
          </p>
        </div>
      </div>
      <p>Previous Postings</p>
      <ul className="user_posting_history">{postTitles}</ul>
    </section>
  )
}
