import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostsByUser } from '../posts/postsSlice'
import { selectExperiencesByUserId } from '../experiences/experiencesSlice'
import { loadState } from '../../helpers/localStorage'
import { selectUserById } from './usersSlice'
import UserCard from './UserCard'
import UserSkillsList from '../userSkills/fetchUserSkills'
import UserSkills from './UserSkills'
import PostExcerpt from '../posts/PostExcerpt';
import AddPostForm from '../posts/AddPostForm';
export default function UserPage() {
  const userId = loadState()
  console.log("id in userpage: ", userId);
  const loggedInUser = useSelector(state => state.user)
  console.log("localstate id: ", loggedInUser);
  const user = useSelector((state) => selectUserById(state, userId))

  const postsForUser = useSelector((state) => selectPostsByUser(state, userId))

  const experiencesForUser = useSelector((state) => selectExperiencesByUserId(state, userId))

  if (!user || !postsForUser || !experiencesForUser) {
    return null;
  }

  const renderedPosts = postsForUser.map((post, index) => 
    <PostExcerpt key={index} postId={post.id} />
    )
  console.log("types: ", typeof loggedInUser.user.id, typeof user.id);
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
      {loggedInUser.user.id === user.id ? <AddPostForm /> : ""}
      <div className="">
        <h2 className="text-2xl font-semibold text-center border-2 border-green-500 rounded-xl bg-green-500 text-white mx-12">Timeline: </h2>
      </div>
      <section className="">  
        {renderedPosts}
      </section>
    </section>
  )
}
