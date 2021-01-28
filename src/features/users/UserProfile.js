import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TimeAgo } from '../posts/TimeAgo'

import { selectUserById } from '../users/usersSlice'
import { selectPostsByUser } from '../posts/postsSlice'
import { selectExperiencesByUserId } from '../experiences/experiencesSlice'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import './UserPage.scss'

export const UserProfile = () => {
  // const { userId } = match.params
	const loggedInUser = JSON.parse(localStorage.getItem('user'))
  // console.log(loggedInUser);
	const userId = loggedInUser.id
  // console.log("user id: ", userId);
  const user = useSelector((state) => selectUserById(state, userId))
  console.log("user: ", user);
  
  const postsForUser = useSelector((state) => selectPostsByUser(state, userId))

  const experiencesForUser = useSelector((state) => selectExperiencesByUserId(state, loggedInUser.id))

  if (user === undefined) {
    return null;
  }
  const experience = (experiencesForUser.length * 29)
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
        <img alt="avatar" src={loggedInUser.avatar} />
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
          <ProgressBar experience={experience} />
        </div>
      </div>
      <p>Previous Postings</p>
      <ul className="user_posting_history">{postTitles}</ul>
    </section>
  )
}
