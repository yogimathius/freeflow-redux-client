import React from 'react'
import { useSelector } from 'react-redux'
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

  return (
    <section>
      <div className="">
        <div className="user_info">
          <PostAuthor userId={user.id} />
          <p>
            <span className="field_name">Location:</span> {user.location}
          </p>
          {/* <p>
            <span className="field_name">About Me:</span> {user.description}
          </p> */}
          <ProgressBar experience={experience} />
        </div>
      </div>
      <p>Previous Postings</p>
      <ul className="user_posting_history">{renderedPosts}</ul>
    </section>
  )
}
