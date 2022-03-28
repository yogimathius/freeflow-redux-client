import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../../reducers/usersSlice'
import { unwrapResult } from '@reduxjs/toolkit'

import UserImage from '../users/UserImage'
import { removeComment } from '../../reducers/commentsSlice'
import { Link } from 'react-router-dom'
import { loadState, saveState } from '../../helpers/localStorage'
import { TimeAgo } from '../../components/TimeAgo'
import useVisualMode from '../../hooks/useVisualMode'
import { EditCommentForm } from './EditCommentForm'

const SHOW = 'SHOW'
// const CONFIRM = "CONFIRM";
// const SAVING = "SAVING";
const EDITING = 'EDITING'
// const ERROR_SAVE = "ERROR_SAVE";
// const ERROR_DELETE = "ERROR_DELETE";
const CommentListItem = ({ comment, postId }) => {
  const userId = loadState()
  const dispatch = useDispatch()
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const { mode, transition } = useVisualMode(SHOW)

  function onEdit () {
    transition(EDITING)
  }

  function onSaveEdit () {
    transition(SHOW)
  }

  const users = useSelector(selectAllUsers)

  const user = users.find((user) => user.id === comment.commenter_id) || {
    name: 'Unknown User'
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
    <li key={comment.id} className="flex space-x-2 my-2 ">
      <div className='w-12 mx-2'>
        <Link to={`/userprofile/${user.id}`} onClick={() => saveState(user.id)}>
          <UserImage />
        </Link>
      </div>

      <div className="p-3 bg-gray-100 rounded-xl w-max">
        <div className="flex justify-between">
          <Link to={`/userprofile/${user.id}`} onClick={() => saveState(user.id)}>
            <div className="font-semibold text-sm mr-2">{`${user.first_name} ${user.last_name}`}</div>
          </Link>
          <div className="">

            { userId === comment.commenter_id
              ? <div className="space-x-1 flex justify-end mr-2">

              <button onClick={() => onEdit()} className="text-red-600 cursor-pointer text-sm">Edit</button>
              <button onClick={() => onDeleteCommentClicked()} className="text-red-600 cursor-pointer text-sm">Delete</button>
              </div>

              : ''
            }
          </div>

        </div>
        {mode === SHOW && (
          <div className='max-w-3xl'>{comment.text_body}</div>
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
      <div className='text-sm'>
        <TimeAgo timestamp={comment.time_posted} />
      </div>
    </li>
  )
}

export default CommentListItem
