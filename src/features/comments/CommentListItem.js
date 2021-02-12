import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { unwrapResult } from '@reduxjs/toolkit'

import UserImage from '../users/UserImage'
import { removeComment } from './commentsSlice'
import { Link } from 'react-router-dom'
import { saveState } from '../../helpers/localStorage'
import { TimeAgo } from '../posts/TimeAgo'
import useVisualMode from '../../hooks/useVisualMode'
import { EditCommentForm } from './EditCommentForm'

const SHOW = "SHOW";
// const CONFIRM = "CONFIRM";
// const SAVING = "SAVING";
const EDITING = "EDITING";
// const ERROR_SAVE = "ERROR_SAVE";
// const ERROR_DELETE = "ERROR_DELETE";
const CommentListItem = ({comment, postId}) => {

  const loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ""
  const userId = loggedInUser.id;

  const dispatch = useDispatch()
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const { mode, transition } = useVisualMode(SHOW);

  function onEdit() {
    transition(EDITING);
  }

  function onSaveEdit() {
    transition(SHOW);
  }

  const users = useSelector(selectAllUsers)

  const user = users.find((user) => user.id === comment.commenter_id) || {
    name: 'Unknown User',
  }

  const canEditOrDelete = [userId].every(Boolean) && addRequestStatus === 'idle'


  const onDeleteCommentClicked = async () => {
    if (canEditOrDelete) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          removeComment({
            id: comment.id,
            post_id: postId,
            commenter_id: comment.commenter_id
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
    <div key={comment.id} className="bg-white  mx-1 border-2 border-solid border-green-500 border-opacity-25 rounded my-2 rounded-xl">
      <div className="p-3">
        <div className="flex justify-between">
          <Link to={`/userprofile/${user.id}`} onClick={() => saveState(user.id)}>
            <div className="flex items-center space-x-2">
              <UserImage />
                <span className="font-semibold text-blue-500">{`${user.first_name} ${user.last_name}`}</span>
            </div>
          </Link>
          <div className="flex flex-col space-y-2">
            <TimeAgo timestamp={comment.time_posted} />
            { userId === comment.commenter_id ?
              <button onClick={() => onEdit()} className="text-red-600 cursor-pointer text-sm">Edit</button>
                : ""
            }
            { userId === comment.commenter_id ?
              <button onClick={() => onDeleteCommentClicked()} className="text-red-600 cursor-pointer text-sm">Delete</button>
              : ""
            }
          </div>

        </div>
        {mode === SHOW && (          
          <div>{comment.text_body}</div>
        )}
        {mode === EDITING && (
          <EditCommentForm 
            postId={postId}
            commentId={comment.id}
            onSaveEdit={onSaveEdit}
            value={comment.text_body}
          />
        )}
      </div>
    </div>
  )
};

export default CommentListItem;