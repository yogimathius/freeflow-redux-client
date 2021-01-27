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
	const loggedInUser = JSON.parse(localStorage.getItem('currentUser'))

	const userId = loggedInUser.id

	const user = useSelector((state) => selectUserById(state, userId))
  const postsForUser = useSelector((state) => selectPostsByUser(state, loggedInUser.id))

	// console.log(postsForUser);
  const experiencesForUser = useSelector((state) => selectExperiencesByUserId(state, loggedInUser.id))
  console.log("user experiences in userpage: ", experiencesForUser);

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
            {loggedInUser.first_name} {loggedInUser.last_name}
          </h2>
          <p>
            Joined Freeflow <TimeAgo timestamp={loggedInUser.created_at} />
          </p>
          <p>
            <span className="field_name">Location:</span> {loggedInUser.location}
          </p>
          <p>
            <span className="field_name">About Me:</span> {loggedInUser.description}
          </p>
          <ProgressBar experience={experience} />
        </div>
      </div>
      <p>Previous Postings</p>
      <ul className="user_posting_history">{postTitles}</ul>
    </section>
  )
}
