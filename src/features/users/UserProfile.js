import React from 'react'
import { useSelector } from 'react-redux'
import { TimeAgo } from '../posts/TimeAgo'
import UserPagePostExcerpt from './UserPagePostExcerpt';
import { selectUserById } from '../users/usersSlice'
import { selectPostsByUser } from '../posts/postsSlice'
import { selectExperiencesByUserId } from '../experiences/experiencesSlice'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import './UserPage.scss'
import { PostAuthor } from '../posts/PostAuthor';

export const UserProfile = () => {
	const loggedInUser = JSON.parse(localStorage.getItem('user'))
	const userId = loggedInUser.id
  const user = useSelector((state) => selectUserById(state, userId))
  
  const postsForUser = useSelector((state) => selectPostsByUser(state, userId))

  const experiencesForUser = useSelector((state) => selectExperiencesByUserId(state, loggedInUser.id))

  if (user === undefined) {
    return null;
  }
  const experience = (experiencesForUser.length * 29)

  const renderedPosts = postsForUser.map((post, index) => 
  <UserPagePostExcerpt key={index} postId={post.id} />
  )

  function getRandomInt() {
    return Math.floor(Math.random() * (10000 - 5)) + 4;
  }
  const imgUrl = "http://graph.facebook.com/v2.5/" + getRandomInt() + "/picture";

  return (
    <section>
      <div className="user_profile">
        <img alt="avatar" src={imgUrl} />
        <div className="user_info">
          <PostAuthor userId={user.id} />
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
      <ul className="user_posting_history">{renderedPosts}</ul>
    </section>
  )
}
