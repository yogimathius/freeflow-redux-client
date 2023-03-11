/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import PostExcerpt from './components/PostExcerpt/PostExcerpt'
import AddPostForm from './components/AddPostForm/AddPostForm'

import {
  fetchPosts
} from './reducers/postsSlice'
import Filter from '../filters/Filter'
import { fetchSkills } from '../../reducers/dbSkillsSlice'
import { fetchUserSkills } from '../../reducers/userSkillsSlice'
import { OnSavePostClicked } from './utils/onSavePostClicked'
import { onCancelDelete, onConfirmDelete, onEdit, onSaveEdit } from './utils/visualModeTransitions'

const PostsList = ({ posts, loggedInUser }) => {
  const postStatus = useSelector((state) => state.posts.status)
  const postError = useSelector((state) => state.posts.error)

  let content

  if (postStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (postStatus === 'succeeded') {
    content = posts.map((post, index) => (
      <PostExcerpt
        key={index}
        postId={post.id}
        index={index}
        loggedInUser={loggedInUser}
        onCancelDelete={onCancelDelete}
        onConfirmDelete={onConfirmDelete}
        onEdit={onEdit}
        onSaveEdit={onSaveEdit}
      />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{postError}</div>
  }

  return (
    <div className="mx-4">
      <AddPostForm OnSavePostClicked={OnSavePostClicked} />
      <Filter />
      {posts.length !== 0
        ? <section className="mt-4">
            {content}
          </section>
        : <div className="flex justify-center h-24 items-center bg-white mt-2 rounded-lg border-1 border-gray-300 mb-3">Sorry! None found.</div>
      }
    </div>
  )
}

export default connect(null)(PostsList)
