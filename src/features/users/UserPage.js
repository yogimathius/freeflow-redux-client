import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostsByUser } from '../posts/reducers/postsSlice'
import { selectHelperExperiencesByUserId } from '../../reducers/experiencesSlice'
import { loadState } from '../../helpers/localStorage'
import { selectUserById } from '../../reducers/usersSlice'
import PostExcerpt from '../posts/components/PostExcerpt/PostExcerpt'
import UserCard from './UserCard'
// import AddPostForm from '../posts/AddPostForm';
// import {Link} from 'react-router-dom'

export default function UserPage () {
  const loggedInUser = loadState()
  const userId = loggedInUser.id
  const postsForUser = useSelector((state) => selectPostsByUser(state, userId))

  const user = useSelector(state => selectUserById(state, userId))

  const experiencesForUser = useSelector((state) => selectHelperExperiencesByUserId(state, userId))

  if (!userId || !postsForUser || !experiencesForUser) {
    return null
  }

  const sortedArr = [...postsForUser].sort((a, b) => new Date(b.time_posted) - new Date(a.time_posted))

  const renderedPosts = sortedArr.map((post, index) =>
    <PostExcerpt key={index} postId={post.id} index={index} />
  )

  return (
    <section className="space-y-4 pt-2 mx-4">
      <div className="">
        <UserCard
          user={user}
        />
      </div>
      <div className="">
        <h2 className="text-2xl font-semibold text-center border-2 border-green-500 rounded-xl bg-green-500 text-white">Timeline: </h2>
      </div>
      <section className="">
        {renderedPosts}
      </section>
    </section>
  )
}
