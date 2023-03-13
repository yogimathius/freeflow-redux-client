/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useSelector, connect } from 'react-redux'
import PostExcerpt from './components/PostExcerpt/PostExcerpt'
import AddPostForm from './components/AddPostForm/AddPostForm'

import Filter from '../filters/Filter'
import { OnSavePostClicked } from './utils/onSavePostClicked'
import { onCancelDelete, onConfirmDelete, onEdit, onSaveEdit } from './utils/visualModeTransitions'
import { Input } from '@material-ui/core'

const PostsList = ({ posts, loggedInUser }) => {
  const postStatus = useSelector((state) => state.posts.status)
  const postError = useSelector((state) => state.posts.error)
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

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
        <input type="text" id="first_name" className="cursor-pointer border border-gray-400 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-auto" placeholder="Add a post..." onClick={() => openModal()}/>
      </div>
      {showModal
        ? (
          <AddPostForm OnSavePostClicked={OnSavePostClicked} closeModal={closeModal} />
          )
        : null}
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
