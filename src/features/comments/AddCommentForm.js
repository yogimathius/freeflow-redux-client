import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { addNewComment } from './commentsSlice'

export const AddCommentForm = ({ postId }) => {
  const [content, setContent] = useState('')
	const loggedInUser = JSON.parse(localStorage.getItem('user'))
  const userId = loggedInUser.id;
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()

  const onContentChanged = (e) => setContent(e.target.value)

  const canSave =
    [content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSaveCommentClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewComment({
            commenter_id: userId,
            posting_id: postId,
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

  return (
    <section className="commentForm">
      <h2>Leave a Comment</h2>
      <form>

        <div className="commentFormInner">
          <label htmlFor="commentContent">Content:</label>
          <textarea
            id="commentContent"
            name="commentContent"
            value={content}
            onChange={onContentChanged}
          />
        </div>
        <button
          type="button"
          onClick={onSaveCommentClicked}
          disabled={!canSave}
        >
          Save Comment
        </button>
      </form>
    </section>
  )
}
