import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { postUpdated, selectPostById, updatePost } from './postsSlice'

export const EditPostForm = ({ postId, onSaveEdit }) => {

  const post = useSelector((state) => selectPostById(state, postId))

  const [content, setContent] = useState(post.content)

  const dispatch = useDispatch()

  
  const onContentChanged = (e) => setContent(e.target.value)
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const onSavePostClicked  = async () => {
    console.log("edit button clicked!");
    if (content) {

    try {
      setAddRequestStatus('pending')
      const resultAction = await dispatch(
        updatePost({ text_body: content,  post_id: post.id })
      )
      unwrapResult(resultAction)

    } catch (err) {
      console.error('Failed to remove like from post: ', err)
    } finally {
      setAddRequestStatus('idle')
      onSaveEdit()
    }
  }
  }

  return (
    <section>
      <form>
        <label htmlFor="postContent"></label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}
