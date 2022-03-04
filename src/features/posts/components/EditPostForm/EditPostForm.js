/* eslint-disable react/prop-types */
import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectPostById, updatePost } from '../../reducers/postsSlice'
import EditForm from './components/EditForm'
import SaveEditButton from './components/SaveEditButton'

export const EditPostForm = ({
  postId,
  onSaveEdit,
  value,
  onEditPostClicked
}) => {
  const [error, setError] = useState('')
  const [content, setContent] = useState(value)

  const post = useSelector((state) => selectPostById(state, postId))

  const dispatch = useDispatch()

  const onContentChanged = (e) => setContent(e.target.value)
  // eslint-disable-next-line no-unused-vars
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const validPost = () => {
    if (!content) {
      setError('Post cannot be blank')
      setTimeout(() => {
        setError('')
      }, 2000)
    } else {
      return true
    }
  }

  return (
    <section className="flex flex-col justify-center py-5 space-y-2">
      <EditForm
        content={content}
        onContentChanged={onContentChanged}
      />
      <SaveEditButton
        validPost={validPost}
        content={content}
        onEditPostClicked={onEditPostClicked}
        setAddRequestStatus={setAddRequestStatus}
        dispatch={dispatch}
        updatePost={updatePost}
        unwrapResult={unwrapResult}
        onSaveEdit={onSaveEdit}
        post={post}
      />
      <div
        data-testid="errorMessage"
        className="flex justify-center text-red-500 text-sm h-4 errorMessage">
          {error}
      </div>
    </section>
  )
}
