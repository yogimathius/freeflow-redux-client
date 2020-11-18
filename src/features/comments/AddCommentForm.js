import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { addNewComment } from './commentsSlice'
import { selectAllUsers } from '../users/usersSlice'

export const AddCommentForm = (props) => {
  // const [title, setTitle] = useState('')
  const { postId } = props;
  console.log(props)
 
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [deleted, setDeleted] = useState('false');
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  // console.log("users in addpostform: ", users);

  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const canSave =
    [ content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSaveCommentClicked = async () => {
    if (canSave) {
      try {
        // console.log('userid in postclicked fun: ', userId)
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewComment({
            commenter_id: userId,
            posting_id: postId,
            content,
            deleted
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
    <section>
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
        <button
          type="button"
          onClick={onSaveCommentClicked}
          disabled={!canSave}
        >
          Save COMMENT
        </button>
      </form>
    </section>
  )
}
