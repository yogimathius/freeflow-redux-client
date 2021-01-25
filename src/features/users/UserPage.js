import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TimeAgo } from '../posts/TimeAgo'

import { selectUserById } from '../users/usersSlice'
import { selectPostsByUser } from '../posts/postsSlice'
import { selectExperiencesByUserId } from '../experiences/experiencesSlice'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import './UserPage.scss'

export const UserPage = ({ match }) => {
  const { userId } = match.params
  console.log(userId);
  const user = useSelector((state) => selectUserById(state, userId))

  const postsForUser = useSelector((state) => selectPostsByUser(state, userId))

  // const karmasForUser = useSelector((state) => selectExperiencesByUserId(state, userId))
  // console.log("user karmas in userpage: ", karmasForUser);

  // const experience = (karmasForUser.length * 29)
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
          {/* <ProgressBar experience={experience} /> */}
        </div>
      </div>
      <p>Previous Postings</p>
      <ul className="user_posting_history">{postTitles}</ul>
    </section>
  )
}
