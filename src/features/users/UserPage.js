import React from 'react'
import { useSelector } from 'react-redux'
import { TimeAgo } from '../posts/TimeAgo'
import { selectPostsByUser } from '../posts/postsSlice'
import { selectExperiencesByUserId } from '../experiences/experiencesSlice'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import './UserPage.scss'
import { loadState } from '../../helpers/localStorage'
import { PostExcerpt } from '../posts/PostsList';

export const UserPage = () => {
  const user = loadState()

  const postsForUser = useSelector((state) => selectPostsByUser(state, user.id))
  console.log(postsForUser);
  const experiencesForUser = useSelector((state) => selectExperiencesByUserId(state, user.id))

  const experience = (experiencesForUser.length * 29)

  const renderedPosts = postsForUser.map((post, index) => 
    <PostExcerpt key={index} postId={post.id} />
    )

  const fullName = user.firstName + ' ' + user.lastName;

  return (
    <section>
      <div className="user_profile">
        <h1>{fullName}</h1>
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
