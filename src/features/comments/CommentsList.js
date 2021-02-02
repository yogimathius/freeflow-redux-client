import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { unwrapResult } from '@reduxjs/toolkit'

import UserImage from '../users/UserImage'
import { fetchComments, selectCommentsByPostId, removeComment } from './commentsSlice'
import { Link } from 'react-router-dom'
import { saveState } from '../../helpers/localStorage'

export const CommentsList = ({ postId }) => {
  const comments = useSelector((state) => selectCommentsByPostId(state, parseInt(postId)))
	const loggedInUser = JSON.parse(localStorage.getItem('user'))
  const userId = loggedInUser.id;
  console.log(userId);
  const dispatch = useDispatch()
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  let content

  const commentsStatus = useSelector((state) => state.comments.status)
  const error = useSelector((state) => state.comments.error)

  useEffect(() => {
    if (commentsStatus === 'idle') {
      dispatch(fetchComments())
    }
  }, [commentsStatus, dispatch])

  if (commentsStatus === 'pending') {
    content = <div className="loader">Loading...</div>
  } else if (commentsStatus === 'fulfilled') {

  } else if (commentsStatus === 'rejected') {
    content = <div>{error}</div>
  }
  
  const users = useSelector(selectAllUsers)
  
  const renderedComments = comments.map((comment) => {

    const user = users.find((user) => user.id === comment.commenter_id) || {
      name: 'Unknown User',
    }

  const canEditOrDelete = [userId].every(Boolean) && addRequestStatus === 'idle'

  const onDeleteCommentClicked = async () => {
    console.log("button clicked to remove!");
    if (canEditOrDelete) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          removeComment({
            id: comment.id
          })
        )
        unwrapResult(resultAction)
      } catch (err) {
        console.error('Failed to save the comment: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const onEditCommentClicked = async () => {
    console.log("button clicked to remove!");
    if (canEditOrDelete) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          removeComment({
            commenter_id: userId,
            post_id: postId,
          })
        )
        unwrapResult(resultAction)
      } catch (err) {
        console.error('Failed to save the comment: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }
    return (
      <div key={comment.id} className="bg-white  mx-1 border-2 border-solid border-green-500 border-opacity-25 rounded">
        <div className="p-3">
            <div className="flex justify-between">
              <Link to={`/userprofile/${user.id}`} onClick={() => saveState(user.id)}>
              <div className="flex items-center space-x-2">
                <UserImage />
                <span className="font-semibold text-blue-500">{`${user.first_name} ${user.last_name}`}</span>
              </div>
              </Link>
              <div className="flex flex-col space-y-2">
              { userId === comment.commenter_id ?
                <button onClick={() => onEditCommentClicked()} className="text-red-600 cursor-pointer text-sm">Edit</button>
                : ""
              }
              { userId === comment.commenter_id ?
                <button onClick={() => onDeleteCommentClicked()} className="text-red-600 cursor-pointer text-sm">Delete</button>
                : ""
              }
              </div>

            </div>
          {comment.text_body}
        </div>
      </div>
    )
  })

  return (
    <section className="commentsList">
      {content}
      {renderedComments}
    </section>
  )
}
