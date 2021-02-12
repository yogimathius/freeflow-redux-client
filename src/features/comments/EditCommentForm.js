import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {  selectCommentsById, updateComment } from './commentsSlice'

export const EditCommentForm = ({ CommentId, onSaveEdit, value }) => {
  const comment = useSelector((state) => selectCommentsById(state, CommentId))
  
  const [content, setContent] = useState(value)

  const dispatch = useDispatch()

  
  const onContentChanged = (e) => setContent(e.target.value)
  // eslint-disable-next-line no-unused-vars
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const onSaveCommentClicked  = async () => {
    if (content) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          updateComment({ text_body: content,  comment_id: comment.id, changes: { text_body: content} })
        )
        unwrapResult(resultAction)

      } catch (err) {
        console.error('Failed to update Comment: ', err)
      } finally {
        setAddRequestStatus('idle')
        onSaveEdit()
      }
    }
  }

  return (
    <section className="flex flex-col justify-center px-12 py-5 space-y-2">
      <form className="">
        <label htmlFor="CommentContent"></label>
        <textarea
          className="bg-gray-200 w-full border-1 border-solid border-gray-300 rounded-xl p-3"
          id="CommentContent"
          name="CommentContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <div className="flex justify-center">
        <button className="btn btn-tertiary" type="button" onClick={onSaveCommentClicked}>
          Save Comment
        </button>
      </div>
    </section>
  )
}
