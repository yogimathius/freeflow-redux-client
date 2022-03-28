import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { addNewComment } from '../../reducers/commentsSlice'
import { loadState } from '../../helpers/localStorage'
import UserImage from '../users/UserImage'

export const AddCommentForm = ({ postId }) => {
  const [content, setContent] = useState('')
  const userId = loadState().id
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  console.log({ userId })
  const dispatch = useDispatch()

  const onContentChanged = (e) => setContent(e.target.value)

  const canSave =
    [content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSaveCommentClicked = async (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()

      if (canSave) {
        try {
          setAddRequestStatus('pending')
          const resultAction = await dispatch(
            addNewComment({
              commenter_id: userId,
              post_id: postId,
              content
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
    <section className="flex space-x-2 mt-2">
      <UserImage />
      <form className='w-full'>
        <div className="flex">
          <label
          htmlFor="commentContent"></label>
          <textarea
            placeholder="Leave a comment..."
            className="w-full border-1 border-solid border-gray-400 rounded-lg p-2"
            name="commentContent"
            rows="1"
            value={content}
            onChange={onContentChanged}
            onKeyDown={onSaveCommentClicked}
          />

        </div>
      </form>
    </section>
  )
}
