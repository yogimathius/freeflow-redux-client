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
import { PostAuthor } from '../posts/PostAuthor'

export default function UserPage() {
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

  function getRandomInt() {
    return Math.floor(Math.random() * (10000 - 5)) + 4;
  }
  const imgUrl = "http://graph.facebook.com/v2.5/" + getRandomInt() + "/picture";

  return (
    <section>
      <div className="">
        <div className="user_info">
          <PostAuthor userId={user.id} />
          <p>
            <span className="field_name">Location:</span> {user.location}
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
