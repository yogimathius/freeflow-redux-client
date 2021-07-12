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
import { removeMessage } from './messagesSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import DynamicDropDown from '../../components/DynamicDropDown'

const SHOW = 'SHOW'
// const CONFIRM = "CONFIRM";
// const SAVING = "SAVING";
const EDITING = 'EDITING'
// const ERROR_SAVE = "ERROR_SAVE";
// const ERROR_DELETE = "ERROR_DELETE";

const UserMessageDetail = ({ message, userId }) => {
  const user = useSelector((state) => selectUserById(state, message.sender_id))

  const { mode, transition } = useVisualMode(SHOW)
  console.log('message: ', message)
  function onEdit () {
    transition(EDITING)
  }

  // function onSaveEdit () {
  //   transition(SHOW)
  // }

  let placementStyle, myMessage, textBodyStyle, nameAndTimeStyle
  const fullname = user.first_name + ' ' + user.last_name

  if (user.id === userId) {
    textBodyStyle = 'mr-7'
    placementStyle = ''
    nameAndTimeStyle = ''
    myMessage = true
  } else {
    placementStyle = 'col-start-2 '
    textBodyStyle = 'bg-green-500 text-white font-semibold ml-7'
    nameAndTimeStyle = 'ml-7'
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
  const editKeys = {
    linkText: 'edit',
    onClickCallback: onEdit
  }

  const deleteKeys = {
    linkText: 'delete',
    onClickCallback: onDeleteMessageClicked
  }
  const linkTextList = [editKeys, deleteKeys]
  console.log(linkTextList)

  return (
      <div className="grid grid-cols-6 mx-4">
          <div key={message.id} className={`${placementStyle} col-span-5`}>

          <div className=" p-3">
            <div className={`flex justify-between items-center ${nameAndTimeStyle}`}>
              <Link to={`/userprofile/${fullname}`} onClick={() => saveState(user.id)}>
                <div className="flex items-center space-x-2">
                  <UserImage />
                    <span className="font-semibold text-blue-500">{fullname}</span>
                </div>
              </Link>
              <div className="">
                <TimeAgo timestamp={message.time_sent} />
              </div>

            </div>
            {mode === SHOW && (
              <div>
              { myMessage
                ? <div className="float-right ">
                    <DynamicDropDown linkTextList={linkTextList} />
                  </div>
                : ''
              }
              <div className={` bg-white mx-1 my-2 rounded-xl p-4 ${textBodyStyle}`}>
                {message.text_body}

              </div>
              </div>
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
