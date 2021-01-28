import React from 'react'
import { useSelector } from 'react-redux'
import { TimeAgo } from '../posts/TimeAgo'
import { selectPostsByUser } from '../posts/postsSlice'
import { selectExperiencesByUserId } from '../experiences/experiencesSlice'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import './UserPage.scss'
import { loadState } from '../../helpers/localStorage'
import UserPagePostExcerpt from './UserPagePostExcerpt';
import { selectUserById } from './usersSlice'

export const UserPage = () => {
  const userId = loadState()

  const user = useSelector((state) => selectUserById(state, userId))

  const postsForUser = useSelector((state) => selectPostsByUser(state, userId))

  const experiencesForUser = useSelector((state) => selectExperiencesByUserId(state, userId))

  if (!user || !postsForUser || !experiencesForUser) {
    return null;
  }

  const experience = (experiencesForUser.length * 29)

  const renderedPosts = postsForUser.map((post, index) => 
    <UserPagePostExcerpt key={index} postId={post.id} />
    )


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
          <ProgressBar experience={experience} />
        </div>
      </div>
      <p>Previous Postings</p>
      <section className="">  
        {renderedPosts}
      </section>
    </section>
  )
}
