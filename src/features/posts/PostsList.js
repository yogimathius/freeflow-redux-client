/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useSelector, connect } from 'react-redux'
import PostExcerpt from './components/PostExcerpt/PostExcerpt'

import Filter from '../filters/Filter'
import { onCancelDelete, onConfirmDelete, onEdit, onSaveEdit } from './utils/visualModeTransitions'

const PostsList = ({ posts, loggedInUser, openModal, isDisabled }) => {
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
    <div className="mx-4 mt-16 py-4">
      <div className='bg-white py-4 rounded-lg border-1 border-gray-300'>
        <input
          type="text"
          id="first_name"
          className="cursor-pointer border border-gray-400 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 mx-auto pointer-events-auto"
          placeholder="Add a post..."
          onClick={() => openModal()}
          disabled={isDisabled}
          />
      </div>
      <Filter />
      {posts.length !== 0
        ? <section>
            {content}
          </section>
        : <div className="flex justify-center h-24 items-center bg-white mt-2 rounded-lg border-1 border-gray-300 mb-3">Sorry! None found.</div>
      }
    </div>
  )
}

export default connect(null)(PostsList)
