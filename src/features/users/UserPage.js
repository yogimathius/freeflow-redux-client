import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, selectPostsByUser } from '../posts/reducers/postsSlice'
import { selectHelperExperiencesByUserId, fetchExperiences } from '../../reducers/experiencesSlice'
import { loadState } from '../../helpers/localStorage'
import { selectUserById, fetchUsers } from '../../reducers/usersSlice'
import PostExcerpt from '../posts/components/PostExcerpt/PostExcerpt'
import UserCard from './components/UserCard/UserCard'

export default function UserPage () {
  const loggedInUser = loadState()
  const userId = loggedInUser.id

  const usersStatus = useSelector((state) => state.users.status)
  const postsStatus = useSelector((state) => state.posts.status)
  const userError = useSelector((state) => state.users.error)

  const user = useSelector(state => selectUserById(state, userId))
  const experiencesForUser = useSelector((state) => selectHelperExperiencesByUserId(state, userId))
  const postsForUser = useSelector((state) => selectPostsByUser(state, userId))

  if (!userId || !postsForUser || !experiencesForUser) {
    return null
  }

  const sortedArr = [...postsForUser].sort((a, b) => new Date(b.time_posted) - new Date(a.time_posted))

  const renderedPosts = sortedArr.map((post, index) =>
    <PostExcerpt key={index} postId={post.id} index={index} />
  )

  if (usersStatus === 'idle') {
    return <div className="loader">Loading...</div>
  } else if (usersStatus === 'succeeded') {
    return (
      <section className="space-y-4 pt-2 mx-4 mt-16">
        <div className="w-1/2 border-1 border-gray-200 rounded-lg">
          <UserCard
            user={user}
          />
        </div>
        <div className="">
          <h2 className="text-2xl font-semibold text-center border-2 border-green-500 rounded-xl bg-green-500 text-white">Timeline: </h2>
        </div>
        <section className="">
          {postsStatus === 'succeeded' ? renderedPosts : <div>Loading...</div>}
        </section>
      </section>
    )
  } else if (usersStatus === 'failed') {
    return <div>{userError}</div>
  }
}
