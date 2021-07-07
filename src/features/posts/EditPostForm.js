/* eslint-disable react/prop-types */
import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectPostById, updatePost } from './postsSlice'

export const EditPostForm = ({ postId, onSaveEdit, value }) => {
  const post = useSelector((state) => selectPostById(state, postId))

  const [content, setContent] = useState(value)

  const dispatch = useDispatch()

  const onContentChanged = (e) => setContent(e.target.value)
  // eslint-disable-next-line no-unused-vars
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const onSavePostClicked = async () => {
    if (content) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          updatePost({ text_body: content, post_id: post.id, changes: { text_body: content } })
        )
        unwrapResult(resultAction)
      } catch (err) {
        console.error('Failed to update post: ', err)
      } finally {
        setAddRequestStatus('idle')
        onSaveEdit()
      }
    }
  }

  return (
    <section className="flex flex-col justify-center py-5 space-y-2">
      <form className="">
        <label htmlFor="postContent"></label>
        <textarea
          className="bg-gray-200 w-full border-1 border-solid border-gray-300 rounded-xl p-3"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <div className="flex justify-center">
        <button className="btn btn-tertiary" type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </div>
    </section>
  )
}
