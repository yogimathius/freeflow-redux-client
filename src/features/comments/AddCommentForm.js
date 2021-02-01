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
    <section className="space-y-2">
      <h2 className="text-center text-lg font-semibold">Leave a Comment</h2>
      <form>

        <div className="">
          <label htmlFor="commentContent"></label>
          <textarea
            className="w-full"
            id="commentContent"
            name="commentContent"
            value={content}
            onChange={onContentChanged}
          />
        </div>
        <div
        className="btn btn-secondary flex justify-center"
          type="button"
          onClick={onSaveCommentClicked}
          disabled={!canSave}
        >
          Save Comment
        </div>
      </form>
    </section>
  )
}
