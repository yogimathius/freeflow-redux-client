import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostsByUser } from '../posts/postsSlice'
import { selectExperiencesByUserId } from '../experiences/experiencesSlice'
import { loadState } from '../../helpers/localStorage'
import { selectUserById } from './usersSlice'
import UserCard from './UserCard'
import UserSkillsList from '../userSkills/fetchUserSkills'
import UserSkills from './UserSkills'
import PostExcerpt from '../posts/PostExcerpt'

export default function UserPage() {
  const userId = loadState()

  const user = useSelector((state) => selectUserById(state, userId))

  const postsForUser = useSelector((state) => selectPostsByUser(state, userId))

  const experiencesForUser = useSelector((state) => selectExperiencesByUserId(state, userId))

  if (!user || !postsForUser || !experiencesForUser) {
    return null;
  }

  const renderedPosts = postsForUser.map((post, index) => 
    <PostExcerpt key={index} postId={post.id} />
    )

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
        <UserSkills userId={user.id} />

      </div>
      <div>
        <h2 className="text-2xl font-semibold text-center border-2 border-green-500 rounded-xl bg-green-500 text-white">Timeline: </h2>
      </div>
      <section className="">  
        {renderedPosts}
      </section>
    </section>
  )
}
