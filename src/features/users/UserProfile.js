import React from 'react'
import { useSelector } from 'react-redux'
import UserPagePostExcerpt from './UserPagePostExcerpt';
import { selectUserById } from '../users/usersSlice'
import { selectPostsByUser } from '../posts/postsSlice'
import { selectExperiencesByUserId } from '../experiences/experiencesSlice'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import { UserNameAndLogo } from '../posts/UserNameAndLogo';
import UserSkills from './UserSkills';

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
          <UserNameAndLogo userId={user.id} />
          <p>
            <span className="field_name">Location:</span> {user.location}
          </p>
          <ProgressBar experience={experience} />
        </div>
        <UserSkills userId={user.id} />
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-center border-2 border-green-500 rounded-xl bg-green-500 text-white">Timeline: </h2>
      </div>
      <section>
        {renderedPosts}
      </section>
    </section>
  )
}
