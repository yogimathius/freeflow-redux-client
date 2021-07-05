/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { saveState } from '../../helpers/localStorage'
import { TimeAgo } from '../posts/TimeAgo'
import useVisualMode from '../../hooks/useVisualMode'
import UserImage from '../users/UserImage'
import { selectUserById } from '../users/usersSlice'

const SHOW = 'SHOW'
// const CONFIRM = "CONFIRM";
// const SAVING = "SAVING";
// const EDITING = 'EDITING'
// const ERROR_SAVE = "ERROR_SAVE";
// const ERROR_DELETE = "ERROR_DELETE";

const UserMessageDetail = ({ message, userId }) => {
  const user = useSelector((state) => selectUserById(state, message.senderid))

  const { mode, transition } = useVisualMode(SHOW)

  // function onEdit () {
  //   transition(EDITING)
  // }

  // function onSaveEdit () {
  //   transition(SHOW)
  // }

  let fullname
  let placementStyle

  if (user.id === userId) {
    fullname = 'You'
    placementStyle = ''
  } else {
    fullname = user.first_name + ' ' + user.last_name
    placementStyle = 'col-start-2'
  }
  // const fullname = user.first_name + ' ' + user.last_name
  return (
      <div className="grid grid-cols-3">
          <div key={message.id} className={`${placementStyle} col-span-2 bg-white  mx-1 border-2 border-solid border-green-500 border-opacity-25 my-2 rounded-xl`}>
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
                { userId === message.senderid
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
