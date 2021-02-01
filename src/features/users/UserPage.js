import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostsByUser } from '../posts/postsSlice'
import { selectExperiencesByUserId } from '../experiences/experiencesSlice'
import './UserPage.scss'
import { loadState } from '../../helpers/localStorage'
import UserPagePostExcerpt from './UserPagePostExcerpt';
import { selectUserById } from './usersSlice'
import UserCard from './UserCard'
import UserSkillsList from '../userSkills/fetchUserSkills'

export default function UserPage() {
  const userId = loadState()

  const user = useSelector((state) => selectUserById(state, userId))

  const postsForUser = useSelector((state) => selectPostsByUser(state, userId))

  const experiencesForUser = useSelector((state) => selectExperiencesByUserId(state, userId))

  if (!user || !postsForUser || !experiencesForUser) {
    return null;
  }

  const renderedPosts = postsForUser.map((post, index) => 
    <UserPagePostExcerpt key={index} postId={post.id} />
    )

  // function getRandomInt() {
  //   return Math.floor(Math.random() * (10000 - 5)) + 4;
  // }
  // const imgUrl = "http://graph.facebook.com/v2.5/" + getRandomInt() + "/picture";

  return (
    <section className="space-y-3">
      <UserSkillsList />
      <div className="">
        <div className="user_info">
          <UserCard id={user.id} />
          <p>
            <span className="field_name">Location:</span> {user.location}
          </p>
        </div>
      </div>
      <div>
        <p>Previous Posts</p>
      </div>
      <section className="">  
        {renderedPosts}
      </section>
    </section>
  )
}
