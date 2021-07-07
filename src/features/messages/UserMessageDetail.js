/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { saveState } from '../../helpers/localStorage'
import { TimeAgo } from '../posts/TimeAgo'
import useVisualMode from '../../hooks/useVisualMode'
import UserImage from '../users/UserImage'
import { selectUserById } from '../users/usersSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { removeMessage } from './messagesSlice'
import { unwrapResult } from '@reduxjs/toolkit'

const SHOW = 'SHOW'
// const CONFIRM = "CONFIRM";
// const SAVING = "SAVING";
// const EDITING = 'EDITING'
// const ERROR_SAVE = "ERROR_SAVE";
// const ERROR_DELETE = "ERROR_DELETE";

const UserMessageDetail = ({ message, userId }) => {
  const user = useSelector((state) => selectUserById(state, message.sender_id))

  const { mode, transition } = useVisualMode(SHOW)

  // function onEdit () {
  //   transition(EDITING)
  // }

  // function onSaveEdit () {
  //   transition(SHOW)
  // }

  let fullname, placementStyle, myMessage
  if (user.id === userId) {
    fullname = 'You'
    placementStyle = ''
    myMessage = true
  } else {
    fullname = user.first_name + ' ' + user.last_name
    placementStyle = 'col-start-2'
    myMessage = false
  }

  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()
  const canDelete =
  [userId].every(Boolean) && addRequestStatus === 'idle'

  const onDeleteMessageClicked = async () => {
    if (canDelete) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(removeMessage({ messageId: message.id }))
        unwrapResult(resultAction)
      } catch (err) {
        console.error('Failed to remove Message: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }
  // const fullname = user.first_name + ' ' + user.last_name
  return (
      <div className="grid grid-cols-3">
          <div key={message.id} className={`${placementStyle} col-span-2 bg-white mx-1 border-2 border-solid border-green-500 border-opacity-25 my-2 rounded-xl`}>
            { myMessage
              ? <button className="float-right mt-1 mr-1" onClick={() => onDeleteMessageClicked()}>
                  <FontAwesomeIcon className="text-red-500" icon={faMinusCircle} />
                </button>
              : ''
            }

          <div className=" p-3">
            <div className="flex justify-between">
              <Link to={`/userprofile/${fullname}`} onClick={() => saveState(user.id)}>
                <div className="flex items-center space-x-2">
                  <UserImage />
                    <span className="font-semibold text-blue-500">{fullname}</span>
                </div>
              </Link>
              <div className="">
                <TimeAgo timestamp={message.time_posted} />
                { userId === message.sender_id
                  ? <div className="space-x-1 flex justify-end mr-2">

                  {/* <button onClick={() => onEdit()} className="text-red-600 cursor-pointer text-sm">Edit</button> */}
                  {/* <button onClick={() => onDeleteCommentClicked()} className="text-red-600 cursor-pointer text-sm">Delete</button> */}
                  </div>

                  : ''
                }
              </div>

            </div>
            {mode === SHOW && (
              <div>{message.text_body}</div>
            )}
            {/* {mode === EDITING && (
              <EditCommentForm
                postId={postId}
                commentId={comment.id}
                onSaveEdit={onSaveEdit}
                value={comment.text_body}
              />
            )} */}
          </div>
        </div>
      </div>
  )
}

export default UserMessageDetail
