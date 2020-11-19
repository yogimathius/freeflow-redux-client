import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { addNewComment } from './commentsSlice'
import { selectAllUsers } from '../users/usersSlice'

export const AddCommentForm = ({ postId }) => {
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  // const [title, setTitle] = useState('')

  // const [deleted, setDeleted] = useState('false')

  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)

  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

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
        setUserId('')
      } catch (err) {
        console.error('Failed to save the comment: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.first_name} {user.last_name}
    </option>
  ))

  return (
    <section className="commentForm">
      <h2>Leave a Comment</h2>
      <form>
        {/* <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        /> */}
        <div className="commentFormInner">
          <label htmlFor="commentAuthor">Author:</label>
          <select id="commentAuthor" value={userId} onChange={onAuthorChanged}>
            <option value=""></option>
            {usersOptions}
          </select>
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
