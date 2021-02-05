import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { addNewComment } from './commentsSlice'

export const AddCommentForm = ({ postId }) => {
  const [content, setContent] = useState('')
	const loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ""
  const userId = loggedInUser.id;
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()

  const onContentChanged = (e) => setContent(e.target.value)

  const canSave =
    [content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSaveCommentClicked = async (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();

    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewComment({
            commenter_id: userId,
            post_id: postId,
            content,
          })
        )
        unwrapResult(resultAction)
        setContent('')
      } catch (err) {
        console.error('Failed to save the comment: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }
  }

  return (
    <section className="">
      <form>
        <div className="m-1 flex">
          <label 
          htmlFor="commentContent"></label>
          <textarea 
            placeholder="Leave a comment..."
            className="w-full  border-1 border-solid border-gray-400 rounded-xl p-2" 
            name="commentContent"
            value={content}
            onChange={onContentChanged}
            onKeyDown={onSaveCommentClicked}
          />
          
        </div>
      </form>
    </section>
  )
}
