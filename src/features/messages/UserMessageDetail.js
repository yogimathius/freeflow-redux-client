/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { saveState } from '../../helpers/localStorage'
import { TimeAgo } from '../../components/TimeAgo'
import useVisualMode from '../../hooks/useVisualMode'
import UserImage from '../users/components/UserImage'
import { selectUserById } from '../../reducers/usersSlice'
import { removeMessage } from '../../reducers/userConversationsSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import DynamicDropDown from '../../components/DynamicDropDown'
import EditMessageForm from './EditMessageForm'

const SHOW = 'SHOW'
// const CONFIRM = "CONFIRM";
// const SAVING = "SAVING";
const EDITING = 'EDITING'
// const ERROR_SAVE = "ERROR_SAVE";
// const ERROR_DELETE = "ERROR_DELETE";

const UserMessageDetail = ({ message, userId }) => {
  const user = useSelector((state) => selectUserById(state, message.sender_id))

  const { mode, transition } = useVisualMode(SHOW)
  function onEdit () {
    transition(EDITING)
  }

  // function onSaveEdit () {
  //   transition(SHOW)
  // }

  let placementStyle, myMessage, textBodyStyle, nameAndTimeStyle
  const fullname = user.first_name + ' ' + user.last_name

  if (user.id === userId) {
    textBodyStyle = 'bg-green-500 text-white font-semibold mr-7'
    placementStyle = 'col-start-2 '
    nameAndTimeStyle = ''
    myMessage = true
  } else {
    placementStyle = ''
    textBodyStyle = 'ml-7'
    nameAndTimeStyle = 'ml-7'
    myMessage = false
  }

  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()
  const canDelete =
  [userId].every(Boolean) && addRequestStatus === 'idle'

  const onDeleteMessageClicked = async () => {
    const receiver = message.receiver
    if (canDelete) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(removeMessage({ messageId: message.id, receiver }))
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

  return (
      <div className="grid grid-cols-6 mx-4">
          <div key={message.id} className={`${placementStyle} col-span-5`}>

          <div className="p-3">
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
              <EditMessageForm
                messageId={message.id}
                value={message.text_body}
                senderId={message.sender_id}
                receiverId={message.receiver_id}
              />
            )} */}
          </div>
        </div>
      </div>
  )
}

export default UserMessageDetail
